-- ============================================================================
-- Migration: 016_fix_group_member_count
-- Description: Repairs an off-by-one drift in `groups.current_members` and
--              hardens the column DEFAULT so new groups start at the
--              correct count.
--
-- Problem:
--   `createGroup` (frontend) inserts a `groups` row with
--   `current_members: 1` AND THEN inserts a `group_members` row for the
--   admin. The `increment_member_count_on_join` trigger fires on that
--   second insert and bumps `current_members` to 2. Net: every newly-
--   created group is born with current_members one higher than the actual
--   member count, and the drift compounds with every subsequent join.
--
--   The frontend bug is fixed in the same patch (createGroup now inserts
--   with current_members: 0 so the trigger lands the correct 1). This
--   migration handles two leftover concerns:
--     1. Backfill: every row created under the old code is already off
--        by N (where N is roughly however many members are in the group).
--        Recompute from the source of truth — group_members itself.
--     2. Defense: the column DEFAULT is currently 1 (migration 004), which
--        bakes the same bug into any future code path that omits an
--        explicit current_members on insert. Lower it to 0 so the trigger
--        is the single source of increments.
-- Created: 2026-04-27
-- Dependencies: 004_groups_and_members.sql
-- ============================================================================

-- ----------------------------------------------------------------------------
-- PART 1: Backfill current_members for all existing groups
-- ----------------------------------------------------------------------------
-- Recompute from group_members. Any row whose stored count disagrees with
-- the actual member count will be corrected. Idempotent — re-running this
-- migration is a no-op on a healthy database.
UPDATE public.groups g
SET current_members = COALESCE(member_counts.cnt, 0)
FROM (
  SELECT group_id, COUNT(*)::int AS cnt
  FROM public.group_members
  GROUP BY group_id
) member_counts
WHERE g.id = member_counts.group_id
  AND g.current_members <> COALESCE(member_counts.cnt, 0);

-- Also zero out groups that have NO members (e.g. all members left but
-- the count never decremented to zero). The above UPDATE only touches
-- groups that appear in group_members.
UPDATE public.groups g
SET current_members = 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.group_members gm WHERE gm.group_id = g.id
)
AND g.current_members <> 0;

-- ----------------------------------------------------------------------------
-- PART 2: Lower DEFAULT to 0 so the trigger is the only source of truth
-- ----------------------------------------------------------------------------
-- The valid_member_count CHECK still allows 0 (CHECK requires >= 0).
ALTER TABLE public.groups
  ALTER COLUMN current_members SET DEFAULT 0;

-- ============================================================================
-- Migration Complete: group member-count drift repaired
-- ============================================================================
