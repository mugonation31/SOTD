-- ============================================================================
-- Migration: 010_scoring_trigger
-- Description: Auto-scoring pipeline for predictions and group_members
--              aggregates when a match transitions to `completed` (or when
--              a completed match's scores are later corrected by an admin).
--
--              Five pieces:
--                1. score_predictions_for_match(match_id)
--                     - Re-scores every prediction for a given match using
--                       the EXISTING calculate_prediction_points(...) helper
--                       from migration 005. Writes points_earned.
--                2. count_exact_scores_in_gameweek(user_id, gameweek_id)
--                     - Helper. Returns how many predictions the user made
--                       in the given gameweek where home/away were called
--                       exactly right. Used by the perfect-round bonus.
--                3. is_gameweek_fully_completed(gameweek_id)
--                     - Helper. TRUE iff every match in the gameweek has
--                       status='completed' (and the gameweek has at least
--                       one match). Used by the perfect-round bonus.
--                4. recompute_group_member_aggregates(user_id)
--                     - Full idempotent recompute of total_points,
--                       correct_scores, correct_results and gameweeks_played
--                       across every group_members row for the user, derived
--                       from that user's scored predictions. Folds in the
--                       perfect-round (+10) bonus for every fully-completed
--                       NON-special gameweek where the user has >= 3 exact
--                       scores.
--                5. trg_score_on_match_completed
--                     - AFTER UPDATE trigger on matches that fires when the
--                       status first becomes 'completed' OR when a completed
--                       match's scores change. Calls (1) then (4) for every
--                       affected user. The perfect-round bonus surfaces
--                       automatically once the final match of a regular
--                       gameweek completes, because recompute always runs
--                       from scratch.
--
-- Created: 2026-04-17
-- Dependencies:
--   * 002_gameweeks_table      (gameweeks.is_special)
--   * 003_matches_table        (matches.status, home_score, away_score,
--                               matches.gameweek_id)
--   * 004_groups_and_members   (group_members aggregate columns)
--   * 005_predictions_table    (predictions.points_earned, joker_used,
--                               calculate_prediction_points())
--
-- Scope:
--   * Per-match result scoring.
--   * Per-user aggregate recomputation across every group the user is in.
--   * Perfect-round bonus: +10 flat, regular gameweeks only, applied when
--     all matches in the gameweek are completed and the user called >= 3
--     exact scores. NOT doubled by joker (joker only doubles match-level
--     points; the bonus is a round-level add-on).
--
-- Special gameweeks (Boxing Day, Final Day): excluded from the perfect-round
-- bonus per the MVP spec.
--
-- Idempotent: CREATE OR REPLACE on every helper, DROP TRIGGER IF EXISTS
-- before CREATE TRIGGER. `recompute_group_member_aggregates` recomputes
-- total_points from scratch every call (base sum + deterministic bonus
-- iteration), so repeated fires cannot double-apply the bonus.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- PART 1: score_predictions_for_match(p_match_id UUID)
-- ----------------------------------------------------------------------------
-- Loops every prediction row for the given match, calls the existing
-- calculate_prediction_points(prediction_id, home_actual, away_actual) helper,
-- and writes points_earned. SECURITY DEFINER so the trigger context can
-- bypass the predictions RLS policies (which otherwise only allow users to
-- update their own rows before the deadline).
--
-- No-op when:
--   * the match row does not exist,
--   * the match is not status='completed',
--   * the match has NULL scores (should not happen given the
--     valid_scores CHECK constraint, but guarded defensively),
--   * there are no predictions for the match.
--
-- Note on the joker: calculate_prediction_points() already applies the
-- per-match joker doubling when predictions.joker_used = TRUE, so
-- points_earned is stored already-doubled on the joker row. The aggregate
-- function in PART 2 therefore must NOT re-double at the gameweek level —
-- it simply SUMs points_earned.

CREATE OR REPLACE FUNCTION public.score_predictions_for_match(p_match_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_status TEXT;
    v_home_score INTEGER;
    v_away_score INTEGER;
    v_prediction RECORD;
    v_points INTEGER;
BEGIN
    -- Fetch the match and short-circuit if it is not a completed result.
    SELECT m.status, m.home_score, m.away_score
    INTO v_status, v_home_score, v_away_score
    FROM public.matches m
    WHERE m.id = p_match_id;

    IF NOT FOUND THEN
        RETURN;
    END IF;

    IF v_status IS DISTINCT FROM 'completed' THEN
        RETURN;
    END IF;

    IF v_home_score IS NULL OR v_away_score IS NULL THEN
        RETURN;
    END IF;

    -- Re-score every prediction for this match. Using a cursor loop keeps
    -- the function readable and lets us reuse calculate_prediction_points
    -- exactly as-is (it takes a prediction id and reads joker_used itself).
    FOR v_prediction IN
        SELECT id FROM public.predictions WHERE match_id = p_match_id
    LOOP
        v_points := public.calculate_prediction_points(
            v_prediction.id,
            v_home_score,
            v_away_score
        );

        UPDATE public.predictions
        SET points_earned = v_points,
            updated_at = NOW()
        WHERE id = v_prediction.id;
    END LOOP;
END;
$$;

COMMENT ON FUNCTION public.score_predictions_for_match(UUID) IS
    'Re-scores every prediction for the given completed match by calling calculate_prediction_points. SECURITY DEFINER so it can bypass predictions RLS in the trigger context. No-op if the match is not completed.';

-- ----------------------------------------------------------------------------
-- PART 2: count_exact_scores_in_gameweek(p_user_id, p_gameweek_id)
-- ----------------------------------------------------------------------------
-- Returns the number of predictions the given user made in the given
-- gameweek where BOTH home_score and away_score matched the actual match
-- result exactly. Only counts predictions against matches that are already
-- status='completed' (in-progress matches cannot yet be judged exact).
--
-- This is the primitive the perfect-round bonus is built on: ">= 3 exact
-- scores in a fully-completed regular gameweek". The MVP spec has players
-- making exactly 3 predictions per regular gameweek, so ">= 3" and
-- "all of their 3 picks exact" are equivalent. The ">= 3" formulation is
-- used so the rule remains sensible if future rules allow more picks.
-- Also: only predictions against completed matches count (in-progress
-- matches can't yet be judged exact).
--
-- STABLE: pure read-only, no side effects. SECURITY DEFINER so it can be
-- called from within the recompute function's SECURITY DEFINER context
-- without RLS interfering with the join against matches/predictions.

CREATE OR REPLACE FUNCTION public.count_exact_scores_in_gameweek(
    p_user_id UUID,
    p_gameweek_id UUID
)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT COALESCE(COUNT(*), 0)::INTEGER
    FROM public.predictions p
    JOIN public.matches m ON m.id = p.match_id
    WHERE p.user_id = p_user_id
      AND p.gameweek_id = p_gameweek_id
      AND m.status = 'completed'
      AND p.home_score = m.home_score
      AND p.away_score = m.away_score;
$$;

COMMENT ON FUNCTION public.count_exact_scores_in_gameweek(UUID, UUID) IS
    'Returns how many predictions the user called exactly right (both home and away) in the given gameweek, limited to completed matches. Used by the perfect-round bonus.';

-- ----------------------------------------------------------------------------
-- PART 3: is_gameweek_fully_completed(p_gameweek_id)
-- ----------------------------------------------------------------------------
-- TRUE iff every match in the gameweek is status='completed' AND the
-- gameweek has at least one match row. A gameweek with zero matches is
-- NOT considered "fully completed" — we do not want to award a round
-- bonus on an empty schedule.
--
-- STABLE read-only helper. SECURITY DEFINER so trigger-context recompute
-- can see every match row regardless of the calling user's RLS view.

CREATE OR REPLACE FUNCTION public.is_gameweek_fully_completed(
    p_gameweek_id UUID
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT
        EXISTS (
            SELECT 1 FROM public.matches
             WHERE gameweek_id = p_gameweek_id
        )
        AND NOT EXISTS (
            SELECT 1 FROM public.matches
             WHERE gameweek_id = p_gameweek_id
               AND status IS DISTINCT FROM 'completed'
        );
$$;

COMMENT ON FUNCTION public.is_gameweek_fully_completed(UUID) IS
    'TRUE iff every match in the gameweek has status=completed and the gameweek has at least one match. Used by the perfect-round bonus gate.';

-- ----------------------------------------------------------------------------
-- PART 4: recompute_group_member_aggregates(p_user_id UUID)
-- ----------------------------------------------------------------------------
-- Full idempotent recompute of the user's group_members aggregate columns
-- in every group they belong to. Derived purely from scored predictions
-- (points_earned), joined against matches so we can detect exact-score
-- predictions reliably.
--
-- Column semantics:
--   * total_points
--       SUM(points_earned) across the user's predictions whose match is
--       completed, PLUS a +10 perfect-round bonus for every fully-completed
--       NON-special gameweek where the user called >= 3 exact scores.
--       Joker doubling is already baked into points_earned (see
--       calculate_prediction_points), so the base sum is taken as-is. The
--       perfect-round bonus is a flat +10 and is NOT doubled by the joker
--       (joker doubles match-level totals; bonus is a round-level add-on).
--   * correct_scores
--       COUNT of predictions where pred.home == match.home AND
--       pred.away == match.away (exact score called). This is the robust
--       definition — comparing home/away pairs directly avoids the fragile
--       `points_earned >= 6` heuristic which collides with the draw-only
--       result (6pts) and joker doubling.
--   * correct_results
--       COUNT of predictions with points_earned > 0. Any positive score
--       means at least the result was correct.
--   * gameweeks_played
--       COUNT DISTINCT gameweek_number where the user has at least one
--       prediction on a completed match.
--
-- Perfect-round bonus idempotency:
--   The bonus is NOT persisted as a separate column. Instead, every call
--   to this function recomputes total_points from scratch: base sum plus
--   a fresh pass over the user's gameweeks to add +10 where the perfect
--   round rule triggers. Re-running on an already-bonused gameweek yields
--   the SAME total, so the trigger can fire any number of times (e.g., on
--   admin score corrections) without double-applying.
--
-- Note: The aggregate is deliberately independent of group_id — a user's
-- prediction history is global (one prediction per match in the season),
-- so every group they belong to gets the same totals. We UPDATE every
-- group_members row for the user in one statement.
--
-- SECURITY DEFINER so the trigger can update group_members regardless of
-- the acting user's group admin status.

CREATE OR REPLACE FUNCTION public.recompute_group_member_aggregates(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_total_points INTEGER := 0;
    v_correct_scores INTEGER := 0;
    v_correct_results INTEGER := 0;
    v_gameweeks_played INTEGER := 0;
    v_gameweek RECORD;
BEGIN
    IF p_user_id IS NULL THEN
        RETURN;
    END IF;

    -- Compute base totals from scored predictions joined to completed
    -- matches. COALESCE(..., 0) guards the "user has no scored predictions
    -- yet" case, which would otherwise leave the locals NULL.
    SELECT
        COALESCE(SUM(p.points_earned), 0),
        COALESCE(SUM(
            CASE
                WHEN p.home_score = m.home_score
                 AND p.away_score = m.away_score
                THEN 1 ELSE 0
            END
        ), 0),
        COALESCE(SUM(
            CASE WHEN p.points_earned > 0 THEN 1 ELSE 0 END
        ), 0),
        COALESCE(COUNT(DISTINCT p.gameweek_number), 0)
    INTO
        v_total_points,
        v_correct_scores,
        v_correct_results,
        v_gameweeks_played
    FROM public.predictions p
    JOIN public.matches m ON m.id = p.match_id
    WHERE p.user_id = p_user_id
      AND m.status = 'completed';

    -- Perfect-round bonus: +10 for every fully-completed NON-special
    -- gameweek where the user called >= 3 exact scores. Iterating the
    -- distinct gameweek ids the user has predicted in keeps the loop
    -- bounded to the user's actual activity.
    --
    -- Special gameweeks (Boxing Day, Final Day) are excluded via
    -- g.is_special = FALSE per MVP spec.
    --
    -- Because the base v_total_points was computed from scratch above,
    -- and this loop is deterministic for a given DB state, repeated
    -- invocations of this function produce the same total — the bonus
    -- cannot double-apply.
    FOR v_gameweek IN
        SELECT DISTINCT g.id AS gameweek_id
        FROM public.predictions p
        JOIN public.gameweeks g ON g.id = p.gameweek_id
        WHERE p.user_id = p_user_id
          AND g.is_special = FALSE
    LOOP
        IF public.is_gameweek_fully_completed(v_gameweek.gameweek_id)
           AND public.count_exact_scores_in_gameweek(
                   p_user_id,
                   v_gameweek.gameweek_id
               ) >= 3
        THEN
            v_total_points := v_total_points + 10;
        END IF;
    END LOOP;

    -- Push the recomputed aggregates to every group the user is in.
    UPDATE public.group_members
    SET total_points = v_total_points,
        correct_scores = v_correct_scores,
        correct_results = v_correct_results,
        gameweeks_played = v_gameweeks_played,
        updated_at = NOW()
    WHERE user_id = p_user_id;
END;
$$;

COMMENT ON FUNCTION public.recompute_group_member_aggregates(UUID) IS
    'Idempotent recompute of total_points / correct_scores / correct_results / gameweeks_played on every group_members row for the user. Folds in the perfect-round +10 bonus for every fully-completed non-special gameweek with >= 3 exact scores. SECURITY DEFINER.';

-- ----------------------------------------------------------------------------
-- PART 5: Trigger — fire scoring pipeline when matches reach `completed`
-- ----------------------------------------------------------------------------
-- Fires AFTER UPDATE on matches when EITHER:
--   * the status transitioned INTO 'completed' (first-time scoring), OR
--   * the match is already 'completed' and home_score/away_score was
--     corrected (re-score on admin fix).
-- Captured in a single WHEN clause so we only register one trigger.
--
-- Body:
--   1. Score every prediction for this match.
--   2. For each distinct user who predicted on this match, recompute
--      their group_members aggregates in every group they belong to.
--      The recompute automatically folds in the perfect-round +10 bonus
--      once the final match of a regular gameweek completes.

CREATE OR REPLACE FUNCTION public.trg_score_match_on_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Step 1: score predictions for this match.
    PERFORM public.score_predictions_for_match(NEW.id);

    -- Step 2: recompute aggregates for every affected user.
    FOR v_user_id IN
        SELECT DISTINCT user_id
        FROM public.predictions
        WHERE match_id = NEW.id
    LOOP
        PERFORM public.recompute_group_member_aggregates(v_user_id);
    END LOOP;

    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.trg_score_match_on_completion() IS
    'Trigger function: scores predictions for the completed match and recomputes group_members aggregates for every affected user.';

DROP TRIGGER IF EXISTS score_match_on_completion ON public.matches;

CREATE TRIGGER score_match_on_completion
    AFTER UPDATE ON public.matches
    FOR EACH ROW
    WHEN (
        NEW.status = 'completed'
        AND (
            OLD.status IS DISTINCT FROM 'completed'
            OR OLD.home_score IS DISTINCT FROM NEW.home_score
            OR OLD.away_score IS DISTINCT FROM NEW.away_score
        )
    )
    EXECUTE FUNCTION public.trg_score_match_on_completion();

COMMENT ON TRIGGER score_match_on_completion ON public.matches IS
    'Auto-scores predictions and refreshes group_members aggregates when a match is first completed or when a completed match''s scores are corrected.';

-- ----------------------------------------------------------------------------
-- PRIVILEGES: lock down the SECURITY DEFINER surface
-- ----------------------------------------------------------------------------
-- Postgres grants EXECUTE on new functions to PUBLIC by default. Because
-- every function below is SECURITY DEFINER, any authenticated caller could
-- RPC them via PostgREST and bypass RLS. These functions are only meant to
-- run from trigger context (i.e., service_role / postgres), so revoke
-- EXECUTE from every non-privileged role. Same pattern as migration 007's
-- mark_joker_used RPC (which is the one function we INTENTIONALLY expose
-- to authenticated).

REVOKE EXECUTE ON FUNCTION public.score_predictions_for_match(UUID)
    FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.count_exact_scores_in_gameweek(UUID, UUID)
    FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.is_gameweek_fully_completed(UUID)
    FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.recompute_group_member_aggregates(UUID)
    FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.trg_score_match_on_completion()
    FROM PUBLIC, anon, authenticated;

-- ============================================================================
-- Migration Complete: scoring trigger
-- ============================================================================
