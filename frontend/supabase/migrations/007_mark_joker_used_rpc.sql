-- ============================================================================
-- Migration: 007_mark_joker_used_rpc
-- Description: Atomic joker-usage marker function to close a non-atomic
--              read-modify-write race on the client.
-- Created: 2026-04-18
-- Dependencies: 004_groups_and_members (group_members table)
-- ============================================================================

-- Problem:
--   The client-side `markJokerUsed` performed a SELECT, branched on the
--   current `jokers_used` count, then UPDATE. Two concurrent submissions
--   on DIFFERENT gameweeks (e.g. user on two tabs) could both observe
--   `used=0`, both write `used=1` but with different `first_joker_gameweek`
--   values — last write wins, one joker spend silently lost.
--
-- Solution:
--   A SECURITY DEFINER function that wraps the read+branch+write in a single
--   transaction with row-level locking (`FOR UPDATE`). Idempotent: if the
--   passed gameweek already matches `first_joker_gameweek` or
--   `second_joker_gameweek`, the function returns without modification.
--
-- Authorization:
--   Scoped to the calling user via `auth.uid()`. SECURITY DEFINER is required
--   because the function takes the explicit `FOR UPDATE` lock which must
--   see the row regardless of RLS. We re-enforce the user scope inside the
--   function by filtering on `user_id = auth.uid()`.

CREATE OR REPLACE FUNCTION public.mark_joker_used(p_gameweek_number INTEGER)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_used INTEGER;
    v_first_gw INTEGER;
    v_second_gw INTEGER;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Lock all the user's group_members rows so no concurrent caller
    -- can observe the same state and race with us.
    PERFORM 1
      FROM public.group_members
     WHERE user_id = v_user_id
       FOR UPDATE;

    -- Read the current state from any one row (all rows for this user
    -- are kept in sync, so any is representative).
    SELECT jokers_used, first_joker_gameweek, second_joker_gameweek
      INTO v_used, v_first_gw, v_second_gw
      FROM public.group_members
     WHERE user_id = v_user_id
     LIMIT 1;

    -- No memberships → nothing to mark.
    IF NOT FOUND THEN
        RETURN;
    END IF;

    v_used := COALESCE(v_used, 0);

    -- Idempotency: the passed gameweek is already recorded as a joker slot.
    IF v_first_gw = p_gameweek_number OR v_second_gw = p_gameweek_number THEN
        RETURN;
    END IF;

    -- Defensive no-op: user already played both jokers. UI prevents this,
    -- but we never want to corrupt state if a stale client slips through.
    IF v_used >= 2 THEN
        RETURN;
    END IF;

    IF v_used = 0 THEN
        UPDATE public.group_members
           SET jokers_used = 1,
               first_joker_gameweek = p_gameweek_number
         WHERE user_id = v_user_id;
    ELSIF v_used = 1 THEN
        UPDATE public.group_members
           SET jokers_used = 2,
               second_joker_gameweek = p_gameweek_number
         WHERE user_id = v_user_id;
    END IF;
END;
$$;

COMMENT ON FUNCTION public.mark_joker_used(INTEGER) IS
    'Atomically records that the authenticated user has played a joker on '
    'the given gameweek. Idempotent on resubmit of the same gameweek. '
    'Locks all the user''s group_members rows to serialise concurrent '
    'submissions from multiple clients (tabs). See Task 3.4 in docs/plans/mvp-plan.md.';

GRANT EXECUTE ON FUNCTION public.mark_joker_used(INTEGER) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.mark_joker_used(INTEGER) FROM anon, public;

-- ============================================================================
-- Migration Complete: mark_joker_used RPC
-- ============================================================================
