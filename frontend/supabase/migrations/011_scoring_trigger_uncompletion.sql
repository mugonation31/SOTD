-- ============================================================================
-- Migration: 011_scoring_trigger_uncompletion
-- Description: Extend migration 010's scoring pipeline to handle the REVERSE
--              transition — i.e. when an admin corrects a wrongly-completed
--              match back to `scheduled` (or any non-`completed` status).
--
--              Migration 010 only reacted to:
--                (1) first-time completion (status -> 'completed'), or
--                (2) score corrections on an already-completed match.
--              Neither covers the case where a match was completed in error
--              and has to be un-completed. Without this migration, predictions
--              for that match keep their stale points_earned and
--              group_members totals stay inflated.
--
-- What this migration does:
--   1. Rewrites trg_score_match_on_completion() with a branching body:
--        * Forward branch (NEW.status = 'completed'): unchanged from 010 —
--          score predictions and recompute aggregates for affected users.
--        * Reverse branch (OLD.status = 'completed' AND NEW.status is NOT):
--          zero out predictions.points_earned for every row on this match,
--          then recompute aggregates for every affected user. recompute
--          sums points_earned so zeros propagate cleanly; the perfect-round
--          bonus also drops because the gameweek is no longer "fully
--          completed".
--   2. Drops and recreates the score_match_on_completion trigger with an
--      extended WHEN clause that ALSO fires on the reverse transition.
--
-- Created: 2026-04-17
-- Dependencies:
--   * 010_scoring_trigger  (score_predictions_for_match,
--                           recompute_group_member_aggregates,
--                           trg_score_match_on_completion,
--                           score_match_on_completion trigger)
--
-- Idempotent:
--   * CREATE OR REPLACE FUNCTION on the trigger body.
--   * DROP TRIGGER IF EXISTS + CREATE TRIGGER (Postgres cannot CREATE OR
--     REPLACE a trigger directly).
--   * Un-completion zeros predictions.points_earned to match the column's
--     DEFAULT 0 in migration 005 — the "un-scored" state is 0, not NULL.
--
-- NOT modified / dropped:
--   * All helper functions from 010 (score_predictions_for_match,
--     count_exact_scores_in_gameweek, is_gameweek_fully_completed,
--     recompute_group_member_aggregates). They remain CREATE OR REPLACEd
--     by 010 and untouched here.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- PART 1: rewrite trg_score_match_on_completion() with two branches
-- ----------------------------------------------------------------------------
-- Branching logic:
--   * Forward branch fires when NEW.status = 'completed'. Exactly 010's body:
--     score this match then recompute every affected user's aggregates.
--   * Reverse branch fires when OLD.status = 'completed' AND NEW.status is
--     something else (scheduled, postponed, etc.). We:
--       a) Capture the affected user_ids BEFORE zeroing (they still point at
--          this match_id; zeroing doesn't change user_id, so order doesn't
--          strictly matter, but we capture once to keep the loop body pure).
--       b) Zero points_earned for every prediction on this match. 0 matches
--          the column default in migration 005.
--       c) Recompute aggregates for every affected user. Because
--          recompute_group_member_aggregates joins predictions to matches
--          WHERE m.status = 'completed', the now-non-completed match drops
--          out of the base sum naturally, AND is_gameweek_fully_completed
--          flips to FALSE so the +10 perfect-round bonus (if previously
--          earned via this gameweek) is removed.
--
-- SECURITY DEFINER so the trigger can UPDATE predictions and group_members
-- regardless of the acting user's RLS / admin status. Same pattern as 010.

CREATE OR REPLACE FUNCTION public.trg_score_match_on_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
BEGIN
    IF NEW.status = 'completed' THEN
        -- ------------------------------------------------------------------
        -- FORWARD BRANCH: first-time completion OR score correction on an
        -- already-completed match. Identical to migration 010's body.
        -- ------------------------------------------------------------------
        PERFORM public.score_predictions_for_match(NEW.id);

        FOR v_user_id IN
            SELECT DISTINCT user_id
            FROM public.predictions
            WHERE match_id = NEW.id
        LOOP
            PERFORM public.recompute_group_member_aggregates(v_user_id);
        END LOOP;

    ELSIF OLD.status = 'completed' AND NEW.status IS DISTINCT FROM 'completed' THEN
        -- ------------------------------------------------------------------
        -- REVERSE BRANCH: the match was completed but is being un-completed
        -- (admin correction back to scheduled / postponed / etc.). Zero every
        -- prediction's points_earned for this match, then recompute
        -- aggregates so totals and perfect-round bonuses reflect reality.
        -- ------------------------------------------------------------------
        UPDATE public.predictions
           SET points_earned = 0,
               updated_at    = NOW()
         WHERE match_id = NEW.id;

        FOR v_user_id IN
            SELECT DISTINCT user_id
            FROM public.predictions
            WHERE match_id = NEW.id
        LOOP
            PERFORM public.recompute_group_member_aggregates(v_user_id);
        END LOOP;
    END IF;

    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.trg_score_match_on_completion() IS
    'Trigger function: on forward transition (match -> completed) scores predictions and recomputes aggregates; on reverse transition (completed -> scheduled/postponed/etc.) zeros points_earned for the match and recomputes aggregates so totals and perfect-round bonuses reverse cleanly.';

-- ----------------------------------------------------------------------------
-- PART 2: drop + recreate trigger with extended WHEN clause
-- ----------------------------------------------------------------------------
-- WHEN fires on EITHER direction:
--   Forward  — NEW.status = 'completed' AND (first-time OR scores changed).
--   Reverse  — OLD.status = 'completed' AND NEW.status is something else.
--
-- Grouped as a single OR so we still register exactly one trigger on matches.

DROP TRIGGER IF EXISTS score_match_on_completion ON public.matches;

CREATE TRIGGER score_match_on_completion
    AFTER UPDATE ON public.matches
    FOR EACH ROW
    WHEN (
        -- Forward path: completion or score correction on a completed match.
        (
            NEW.status = 'completed'
            AND (
                OLD.status IS DISTINCT FROM 'completed'
                OR OLD.home_score IS DISTINCT FROM NEW.home_score
                OR OLD.away_score IS DISTINCT FROM NEW.away_score
            )
        )
        OR
        -- Reverse path: un-completion (admin correction back out of completed).
        (
            OLD.status = 'completed'
            AND NEW.status IS DISTINCT FROM 'completed'
        )
    )
    EXECUTE FUNCTION public.trg_score_match_on_completion();

COMMENT ON TRIGGER score_match_on_completion ON public.matches IS
    'Auto-scores predictions and refreshes group_members aggregates on forward (-> completed) OR reverse (completed -> anything else) status transitions. Reverse path zeros points_earned and recomputes aggregates so totals and perfect-round bonuses unwind cleanly.';

-- ----------------------------------------------------------------------------
-- PRIVILEGES
-- ----------------------------------------------------------------------------
-- Mirror migration 010: the trigger function is SECURITY DEFINER and must NOT
-- be RPC-callable by authenticated users, otherwise a client could zero out
-- any match's predictions. REVOKE EXECUTE from every non-privileged role.
-- (Trigger firing uses the function owner's privileges directly — it does not
-- go through the EXECUTE grant.)

REVOKE EXECUTE ON FUNCTION public.trg_score_match_on_completion()
    FROM PUBLIC, anon, authenticated;

-- ============================================================================
-- Migration Complete: scoring trigger un-completion
-- ============================================================================
