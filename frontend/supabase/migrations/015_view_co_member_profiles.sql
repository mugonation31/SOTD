-- ============================================================================
-- Migration: 015_member_profiles_view
-- Description: Column-firewalled view that lets users read ONLY the
--              `username` + `avatar_url` of group co-members — never their
--              email, role, first/last name, first_login flag, etc.
--
-- Problem:
--   Migration 001 grants SELECT on profiles to:
--     * the row's own owner   (auth.uid() = id)
--     * super-admins          (is_super_admin())
--   Nothing else. The leaderboard / members list embeds
--   `profiles(username, avatar_url)` from group_members, so co-members'
--   profile rows arrive as NULL via PostgREST and the UI displays
--   "Unknown" for every user except the caller.
--
--   The naive fix — add a permissive SELECT policy on profiles for
--   co-group-members — would expose the ENTIRE profiles row (email, role,
--   first/last name, first_login) to every co-member. That's wrong: the
--   leaderboard only needs username + avatar.
--
-- Solution (column-firewall pattern):
--   Define a slim VIEW `public.member_profiles` that:
--     * SELECTs ONLY id, username, avatar_url from profiles
--     * runs as the view OWNER (security_invoker = false), so the underlying
--       profiles RLS doesn't filter out co-members' rows
--     * has a WHERE clause implementing access control at the view level:
--       caller's own row OR a co-member's row (and nothing else)
--     * is `security_barrier = true` so the planner never pushes user-
--       supplied predicates inside the WHERE — defends against malicious
--       LIKE/regex predicates that could leak rows the user shouldn't see
--
--   The base `profiles` table keeps its strict owner-only RLS untouched.
--   The view is the single (and tightly column-scoped) channel through
--   which one user can learn about another user's existence.
--
-- Application change:
--   Callers that previously embedded `profiles(username, avatar_url)` from
--   group_members must now run TWO queries — one for group_members, one
--   for member_profiles filtered by `id IN (user_ids…)` — and merge in
--   application code. PostgREST cannot follow a foreign key into a view,
--   so we don't try.
-- Created: 2026-04-27
-- Dependencies: 001_profiles_table.sql, 004_groups_and_members.sql
-- ============================================================================

-- ----------------------------------------------------------------------------
-- HELPER: public.is_group_co_member(target_user_id)
-- ----------------------------------------------------------------------------
-- Returns TRUE iff the caller (auth.uid()) and target_user_id appear in
-- the same group_members.group_id at least once.
--
-- SECURITY DEFINER so the EXISTS predicate runs unfiltered by group_members
-- RLS — otherwise a co-member check would recurse into another RLS
-- evaluation and produce wrong / surprising results.
--
-- search_path is pinned because SECURITY DEFINER functions with default
-- search_path are a known privilege-escalation vector.
CREATE OR REPLACE FUNCTION public.is_group_co_member(target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.group_members gm_caller
    JOIN public.group_members gm_target
      ON gm_caller.group_id = gm_target.group_id
    WHERE gm_caller.user_id = auth.uid()
      AND gm_target.user_id = target_user_id
  );
$$;

COMMENT ON FUNCTION public.is_group_co_member(UUID) IS
  'Returns TRUE iff the caller (auth.uid()) shares at least one group with '
  'the target user. SECURITY DEFINER to avoid recursing through group_members RLS.';

GRANT EXECUTE ON FUNCTION public.is_group_co_member(UUID) TO authenticated;

-- ----------------------------------------------------------------------------
-- VIEW: public.member_profiles  (column-firewalled, access-controlled)
-- ----------------------------------------------------------------------------
-- Idempotent: drop and recreate so we can iterate on the column whitelist
-- and the access predicate without leaving stale definitions behind.
DROP VIEW IF EXISTS public.member_profiles;

CREATE VIEW public.member_profiles
WITH (security_barrier = true, security_invoker = false)
AS
SELECT
    p.id,
    p.username,
    p.avatar_url
  FROM public.profiles p
  WHERE
    -- Caller's own row.
    p.id = auth.uid()
    -- OR a row of someone the caller shares a group with.
    OR public.is_group_co_member(p.id);

COMMENT ON VIEW public.member_profiles IS
  'Column-firewalled view of profiles for cross-user reads. Exposes ONLY '
  'id, username, avatar_url — never email, role, first_name, last_name, or '
  'first_login. Access is restricted to the caller''s own row plus any '
  'co-group-member rows. Bypasses profiles RLS via security_invoker = false; '
  'the WHERE clause implements ACL at the view level. security_barrier = true '
  'blocks predicate-pushdown attacks via user-supplied LIKE/regex/CTE inputs.';

-- Grant SELECT on the view to authenticated users. The underlying profiles
-- table grant is unchanged (still strictly owner + super-admin via RLS).
GRANT SELECT ON public.member_profiles TO authenticated;

-- ============================================================================
-- Migration Complete: column-firewalled member_profiles view
-- ============================================================================
