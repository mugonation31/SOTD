-- ============================================================================
-- Migration: 017_multi_admin_per_group
-- Description: Promotes group_members.is_admin to the source of truth for
--              group-admin status, allowing up to 3 admins per group.
--              groups.admin_id remains as "creator" but is no longer the
--              only admin signal.
--
-- Why:
--   Until now, exactly one user could administer a group (the creator,
--   whose UUID lived in groups.admin_id). The MVP cohort needs the
--   ability for the creator to promote a co-admin (e.g. delegating
--   member management when away). To avoid an unbounded power list, the
--   max is capped at 3 admins per group.
--
--   Switching to a per-membership flag (group_members.is_admin) is
--   cleaner than a co_admins UUID[] on groups because:
--     * Existing membership row is the natural place for per-user
--       per-group state (already carries joined_at, total_points, etc).
--     * RLS policies can read it without a JOIN through groups.
--     * Demote = simple UPDATE; promote = simple UPDATE; cap enforcement
--       sits on the same row in a single trigger.
--
-- Compatibility:
--   * groups.admin_id is preserved. It still identifies the CREATOR of
--     the group, which is meaningful (the creator can never be demoted —
--     enforced in application code, not RLS, because schema-level
--     enforcement of "creator stays admin" would block legitimate
--     ownership transfers if we add that later).
--   * Every existing group's admin_id is backfilled into the new
--     is_admin flag, so no group ends up admin-less after this migration.
--
-- Created: 2026-04-27
-- Dependencies:
--   * 001_profiles_table.sql        (auth.uid())
--   * 004_groups_and_members.sql    (groups, group_members + their RLS)
--   * 008_superadmin_infrastructure (is_user_active())
-- ============================================================================

-- ----------------------------------------------------------------------------
-- PART 1: Add is_admin column to group_members
-- ----------------------------------------------------------------------------
ALTER TABLE public.group_members
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN public.group_members.is_admin IS
  'TRUE iff this user can administer the parent group (manage members, '
  'edit group settings). Capped at 3 admins per group via the '
  'enforce_max_admins_per_group trigger. Backfilled from groups.admin_id '
  'in migration 017.';

-- Partial index for fast "give me the admins of group X" lookups, which
-- the new is_group_admin() helper does on every RLS evaluation.
CREATE INDEX IF NOT EXISTS idx_group_members_is_admin
  ON public.group_members(group_id, user_id) WHERE is_admin = TRUE;

-- ----------------------------------------------------------------------------
-- PART 2: Backfill — every existing creator becomes an admin
-- ----------------------------------------------------------------------------
-- Idempotent. Re-running this migration on a healthy DB is a no-op.
UPDATE public.group_members gm
SET is_admin = TRUE
FROM public.groups g
WHERE gm.group_id = g.id
  AND gm.user_id = g.admin_id
  AND gm.is_admin = FALSE;

-- ----------------------------------------------------------------------------
-- PART 3: Helper function — is_group_admin(group_id)
-- ----------------------------------------------------------------------------
-- Mirrors the is_super_admin() / is_group_co_member() pattern. SECURITY
-- DEFINER so the lookup bypasses group_members RLS (which would otherwise
-- recurse). STABLE because the membership graph doesn't change within a
-- single statement. search_path pinned for SECURITY DEFINER hygiene.
CREATE OR REPLACE FUNCTION public.is_group_admin(target_group_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.group_members
    WHERE group_id = target_group_id
      AND user_id = auth.uid()
      AND is_admin = TRUE
  );
$$;

COMMENT ON FUNCTION public.is_group_admin(UUID) IS
  'Returns TRUE iff the caller is a current admin of the target group. '
  'Replaces the inline `groups.admin_id = auth.uid()` checks scattered '
  'across migration 004/008 RLS policies. SECURITY DEFINER to avoid '
  'recursion through group_members RLS.';

GRANT EXECUTE ON FUNCTION public.is_group_admin(UUID) TO authenticated;

-- ----------------------------------------------------------------------------
-- PART 4: Cap — at most 3 admins per group
-- ----------------------------------------------------------------------------
-- BEFORE INSERT OR UPDATE OF is_admin so the row never lands on disk if
-- it would push the group over 3. We exclude the row being modified from
-- the count via OLD.id check (UPDATE) so flipping an existing admin to
-- non-admin and back doesn't false-positive.
CREATE OR REPLACE FUNCTION public.enforce_max_admins_per_group()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_admin_count INTEGER;
BEGIN
  -- Only relevant when the new state is admin.
  IF NEW.is_admin IS NOT TRUE THEN
    RETURN NEW;
  END IF;

  -- On UPDATE, exclude the row being modified from the count to avoid
  -- false positives when someone re-saves an already-admin row.
  SELECT COUNT(*) INTO current_admin_count
  FROM public.group_members
  WHERE group_id = NEW.group_id
    AND is_admin = TRUE
    AND (TG_OP = 'INSERT' OR id <> OLD.id);

  IF current_admin_count >= 3 THEN
    RAISE EXCEPTION 'Group % already has the maximum of 3 admins', NEW.group_id
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_max_admins ON public.group_members;
CREATE TRIGGER enforce_max_admins
  BEFORE INSERT OR UPDATE OF is_admin ON public.group_members
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_max_admins_per_group();

COMMENT ON FUNCTION public.enforce_max_admins_per_group() IS
  'Trigger function: rejects INSERT/UPDATE that would push a group above '
  '3 admins. Per migration 017.';

-- ----------------------------------------------------------------------------
-- PART 5: Update RLS policies that previously keyed on groups.admin_id
-- ----------------------------------------------------------------------------
-- The old predicates only matched the creator. Replace them with calls
-- to is_group_admin() so any current admin (creator or promoted) passes.
--
-- NOTE: re-doing the policies created in migration 008 with the new
-- predicate. Keep the is_user_active() guard so deactivated admins
-- can't act.

-- group_members: admins can update / remove members
DROP POLICY IF EXISTS "Group admins can update members" ON public.group_members;
CREATE POLICY "Group admins can update members" ON public.group_members
    FOR UPDATE USING (
      public.is_user_active()
      AND public.is_group_admin(group_members.group_id)
    );

DROP POLICY IF EXISTS "Group admins can remove members" ON public.group_members;
CREATE POLICY "Group admins can remove members" ON public.group_members
    FOR DELETE USING (
      public.is_user_active()
      AND public.is_group_admin(group_members.group_id)
    );

-- group_members: leaving a group — admins must demote first.
-- Old policy blocked only the creator; new policy blocks any current admin.
DROP POLICY IF EXISTS "Users can leave groups" ON public.group_members;
CREATE POLICY "Users can leave groups" ON public.group_members
    FOR DELETE USING (
      auth.uid() = user_id
      AND public.is_user_active()
      AND NOT public.is_group_admin(group_members.group_id)
    );

-- groups: only admins can edit / delete the group row itself.
DROP POLICY IF EXISTS "Group admins can update own groups" ON public.groups;
CREATE POLICY "Group admins can update own groups" ON public.groups
    FOR UPDATE USING (public.is_group_admin(id));

DROP POLICY IF EXISTS "Group admins can delete own groups" ON public.groups;
CREATE POLICY "Group admins can delete own groups" ON public.groups
    FOR DELETE USING (public.is_group_admin(id));

-- "Users can view their groups" already accepts any member via
-- is_group_member() OR the creator via admin_id; that view-policy is
-- semantically still correct (members + creator can read), so we leave it.

-- ============================================================================
-- Migration Complete: multi-admin per group with cap of 3
-- ============================================================================
