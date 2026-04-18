-- ============================================================================
-- Migration: 008_superadmin_infrastructure
-- Description: Adds super-admin infrastructure for the MVP:
--                * profiles.is_active column (deactivation flag)
--                * sync_metadata table (singleton row holding EPL sync state
--                  and cooldown for the manual sync button)
--                * is_user_active() helper (mirrors is_super_admin() pattern)
--                * RLS hardening: writes to predictions and group_members
--                  now require the actor's profile to be active.
--
-- Created: 2026-04-17
-- Dependencies:
--   * 001_profiles_table   (profiles, is_super_admin())
--   * 004_groups_and_members (group_members RLS policies)
--   * 005_predictions_table  (predictions RLS policies)
--
-- Idempotent: every statement uses IF NOT EXISTS / DROP POLICY IF EXISTS /
-- ON CONFLICT DO NOTHING / CREATE OR REPLACE so the file can be re-applied
-- safely.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- PART 1: profiles.is_active
-- ----------------------------------------------------------------------------
-- Defaults to TRUE so every existing user remains active and existing tests
-- continue to pass. Deactivated users keep read access (so they can still see
-- their own data and the leaderboards they participated in) but RLS denies
-- writes to predictions and group_members (see Parts 4 & 5 below).
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;

COMMENT ON COLUMN public.profiles.is_active IS
    'Account active flag. Deactivated users (FALSE) retain read access but '
    'RLS blocks writes to predictions and group_members. Toggled by '
    'super-admins via the admin console.';

-- Partial index on FALSE: deactivated users are the rare case we filter on.
CREATE INDEX IF NOT EXISTS idx_profiles_is_active
    ON public.profiles(is_active) WHERE is_active = FALSE;

-- ----------------------------------------------------------------------------
-- PART 2: sync_metadata (singleton)
-- ----------------------------------------------------------------------------
-- Single-row table holding the last EPL sync attempt's timestamp, status, and
-- (if applicable) error. The CHECK (id = 1) constraint plus a SMALLINT PK with
-- DEFAULT 1 means INSERTs always target the singleton row, and a second
-- INSERT errors on the PK conflict — kept simple by ON CONFLICT DO NOTHING.
CREATE TABLE IF NOT EXISTS public.sync_metadata (
    id               SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    last_sync_at     TIMESTAMPTZ,
    last_sync_status TEXT CHECK (last_sync_status IN ('ok', 'error', 'in_progress')),
    last_sync_error  TEXT,
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.sync_metadata IS
    'Single-row table holding EPL sync state. The CHECK (id = 1) constraint '
    'enforces the singleton pattern — only one row may ever exist.';
COMMENT ON COLUMN public.sync_metadata.last_sync_status IS
    'Most recent sync outcome: ok | error | in_progress. NULL until first run.';
COMMENT ON COLUMN public.sync_metadata.last_sync_error IS
    'Free-form error message from the most recent failed sync (NULL when ok).';

-- Seed the singleton row so the cooldown read can rely on it always existing.
INSERT INTO public.sync_metadata (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Reuse the shared timestamp trigger from migration 001.
DROP TRIGGER IF EXISTS handle_sync_metadata_updated_at ON public.sync_metadata;
CREATE TRIGGER handle_sync_metadata_updated_at
    BEFORE UPDATE ON public.sync_metadata
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- PART 3: RLS for sync_metadata
-- ----------------------------------------------------------------------------
-- Only super-admins (and the service_role, which bypasses RLS via GRANT ALL)
-- may read the sync state. Regular authenticated users see nothing.
ALTER TABLE public.sync_metadata ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Super admins can view sync metadata" ON public.sync_metadata;
CREATE POLICY "Super admins can view sync metadata" ON public.sync_metadata
    FOR SELECT USING (public.is_super_admin());

-- No INSERT/UPDATE/DELETE policies for the authenticated role — writes are
-- performed by the Edge Function under the service_role key, which bypasses
-- RLS entirely via the GRANT ALL below.

-- Authenticated users get no DML at all on this table; only the service role
-- writes here (via the EPL sync Edge Function). Super-admins read via the
-- policy above; no other writers exist.
GRANT SELECT ON public.sync_metadata TO authenticated;
GRANT ALL    ON public.sync_metadata TO service_role;

-- ----------------------------------------------------------------------------
-- HELPER: is_user_active()
-- ----------------------------------------------------------------------------
-- Mirrors is_super_admin() from migration 001. SECURITY DEFINER so the lookup
-- bypasses the profiles RLS policies (which would otherwise force the
-- planner to recurse). STABLE because the result is constant within a
-- statement. Returns FALSE for unauthenticated callers (auth.uid() IS NULL
-- → no row matches).
CREATE OR REPLACE FUNCTION public.is_user_active()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

COMMENT ON FUNCTION public.is_user_active() IS
    'Returns TRUE iff the calling user has a profile with is_active = TRUE. '
    'Used in RLS policies to block writes from deactivated accounts. Mirrors '
    'is_super_admin() in pattern (SECURITY DEFINER, STABLE).';

GRANT EXECUTE ON FUNCTION public.is_user_active() TO authenticated;

-- ----------------------------------------------------------------------------
-- PART 4: Enforce is_active on writes to predictions
-- ----------------------------------------------------------------------------
-- Replaces the INSERT and UPDATE policies from migration 005. The bodies are
-- preserved verbatim with an additional `AND public.is_user_active()` clause.
-- Super-admins continue to bypass via the existing
-- "Super admins can manage all predictions" FOR ALL policy.

DROP POLICY IF EXISTS "Users can create predictions before deadline" ON public.predictions;
CREATE POLICY "Users can create predictions before deadline" ON public.predictions
    FOR INSERT WITH CHECK (
        auth.uid() = user_id
        AND public.is_user_active()
        AND EXISTS (
            SELECT 1 FROM public.gameweeks
            WHERE id = gameweek_id AND deadline > NOW()
        )
    );

DROP POLICY IF EXISTS "Users can update predictions before deadline" ON public.predictions;
CREATE POLICY "Users can update predictions before deadline" ON public.predictions
    FOR UPDATE USING (
        auth.uid() = user_id
        AND public.is_user_active()
        AND NOT is_locked
        AND EXISTS (
            SELECT 1 FROM public.gameweeks
            WHERE id = gameweek_id AND deadline > NOW()
        )
    );

-- ----------------------------------------------------------------------------
-- PART 5: Enforce is_active on writes to group_members
-- ----------------------------------------------------------------------------
-- Replaces the INSERT/UPDATE/DELETE policies from migration 004. The original
-- predicates are preserved verbatim with an `AND public.is_user_active()`
-- clause appended. Super-admins continue to bypass via the existing
-- "Super admins can manage members" FOR ALL policy.

-- INSERT: a user joins a group (only as themselves)
DROP POLICY IF EXISTS "Users can join groups" ON public.group_members;
CREATE POLICY "Users can join groups" ON public.group_members
    FOR INSERT WITH CHECK (
        auth.uid() = user_id
        AND public.is_user_active()
    );

-- DELETE: a user leaves a group themselves (admins still can't leave their own)
DROP POLICY IF EXISTS "Users can leave groups" ON public.group_members;
CREATE POLICY "Users can leave groups" ON public.group_members
    FOR DELETE USING (
        auth.uid() = user_id
        AND public.is_user_active()
        AND NOT EXISTS (
            SELECT 1 FROM public.groups
            WHERE id = group_id AND admin_id = auth.uid()
        )
    );

-- UPDATE: group admins update member stats (e.g. scoring writes)
DROP POLICY IF EXISTS "Group admins can update members" ON public.group_members;
CREATE POLICY "Group admins can update members" ON public.group_members
    FOR UPDATE USING (
        public.is_user_active()
        AND EXISTS (
            SELECT 1 FROM public.groups
            WHERE id = group_members.group_id AND admin_id = auth.uid()
        )
    );

-- DELETE: group admins remove a member from their group
DROP POLICY IF EXISTS "Group admins can remove members" ON public.group_members;
CREATE POLICY "Group admins can remove members" ON public.group_members
    FOR DELETE USING (
        public.is_user_active()
        AND EXISTS (
            SELECT 1 FROM public.groups
            WHERE id = group_members.group_id AND admin_id = auth.uid()
        )
    );

-- ============================================================================
-- Migration Complete: 008_superadmin_infrastructure
-- ============================================================================
