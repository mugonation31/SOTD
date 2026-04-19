-- ============================================================================
-- !!  WARNING — DO NOT RUN AGAINST PRODUCTION
-- ----------------------------------------------------------------------------
-- This test file inserts directly into auth.users / profiles / groups /
-- group_members / gameweeks / matches / predictions using predictable
-- fixed UUIDs (1111..., 2222..., 3333...) and @example.com emails. The entire
-- script is wrapped in BEGIN ... ROLLBACK so nothing should persist — BUT:
--   1. If you paste sections individually and skip the final ROLLBACK;,
--      the test rows remain permanently.
--   2. The fixed UUIDs are guessable; if they leak into a live DB they
--      can be referenced by external callers.
-- Recommended: run ONLY against a local Supabase or a disposable staging
-- project. If you must run in prod, execute the whole file in a single
-- transaction (don't split) and verify the ROLLBACK ran at the end:
--   SELECT * FROM auth.users WHERE id IN (
--     '11111111-1111-1111-1111-111111111111',
--     '22222222-2222-2222-2222-222222222222',
--     '33333333-3333-3333-3333-333333333333'
--   );  -- should return zero rows.
-- ============================================================================
-- Test Script: 010_scoring_trigger_test.sql
-- Description: Integration tests for the auto-scoring pipeline introduced in
--              migration 010 (Task 4.1). Exercises the full trigger path:
--              matches -> score_predictions_for_match -> points_earned ->
--              recompute_group_member_aggregates -> group_members totals.
--
-- Dependencies: migrations 001..010 applied.
--
-- How to run:
--   Paste the entire file into the Supabase SQL editor and execute.
--   The whole script is wrapped in BEGIN ... ROLLBACK so nothing persists.
--   PASS: the script completes silently with `NOTICE: ... PASS` lines.
--   FAIL: the script aborts at the first failing assertion with a
--         `ERROR: Test N FAIL: expected X, got Y` message.
--
-- Assertion style:
--   Each test uses a DO $$ ... $$ block, SELECTs the actual value into a
--   local INT/BOOL, compares it against the expected value, and either
--   RAISE EXCEPTIONs (fail) or RAISE NOTICEs (pass). RAISE EXCEPTION inside
--   a DO block aborts the surrounding transaction, which the final ROLLBACK
--   would do anyway — so a failed assertion is surfaced loudly without ever
--   persisting test rows.
--
-- Notes:
--   * All UUIDs are fixed literals so failing-test output is easy to trace.
--   * auth.users rows are inserted directly; the SQL editor runs as
--     postgres/superuser so this is permitted.
--   * Matches are seeded with status='scheduled' and NULL scores. Each test
--     then UPDATEs them to status='completed' with concrete scores, which
--     is exactly the path the real trigger fires on.
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- SEED: auth.users (FK target for profiles.id)
-- ----------------------------------------------------------------------------
-- Minimal columns required by auth.users. `instance_id` + `aud` + `role`
-- cover the NOT NULL constraints; `encrypted_password` defaults are fine.

INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
    ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'test-user-1@example.com', '', NOW(), NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'test-user-2@example.com', '', NOW(), NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'test-admin@example.com',  '', NOW(), NOW(), NOW());

-- ----------------------------------------------------------------------------
-- SEED: profiles (2 players + 1 admin for group ownership)
-- ----------------------------------------------------------------------------

INSERT INTO public.profiles (id, email, role, username, first_name, last_name)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'test-user-1@example.com', 'player',      'test_user_1', 'Test', 'User1'),
    ('22222222-2222-2222-2222-222222222222', 'test-user-2@example.com', 'player',      'test_user_2', 'Test', 'User2'),
    ('33333333-3333-3333-3333-333333333333', 'test-admin@example.com',  'group-admin', 'test_admin',  'Test', 'Admin');

-- ----------------------------------------------------------------------------
-- SEED: groups (2 groups — Group A owns all tests 1..6, Group B joins test 7)
-- ----------------------------------------------------------------------------

INSERT INTO public.groups (id, name, code, admin_id, season_year, current_members)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Test Group A', 'TESTAA', '33333333-3333-3333-3333-333333333333', '2025-26', 0),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Test Group B', 'TESTBB', '33333333-3333-3333-3333-333333333333', '2025-26', 0);

-- ----------------------------------------------------------------------------
-- SEED: group_members
-- ----------------------------------------------------------------------------
-- User1 is in both groups (for test 7).
-- User2 is in group A only.

INSERT INTO public.group_members (id, group_id, user_id)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'),
    ('c2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222'),
    ('c3333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111');

-- ----------------------------------------------------------------------------
-- SEED: gameweeks (GW1 regular, GW2 special Boxing Day)
-- ----------------------------------------------------------------------------

INSERT INTO public.gameweeks (id, gameweek_number, season_year, start_date, end_date, deadline, is_special, special_type)
VALUES
    ('11111111-aaaa-aaaa-aaaa-111111111111', 1, '2025-26',
        NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days', NOW() - INTERVAL '8 days',
        FALSE, NULL),
    ('22222222-aaaa-aaaa-aaaa-222222222222', 2, '2025-26',
        NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days', NOW() - INTERVAL '5 days',
        TRUE, 'boxing-day');

-- ----------------------------------------------------------------------------
-- SEED: matches — 3 in GW1 (regular), 10 in GW2 (special)
-- ----------------------------------------------------------------------------
-- Seeded as 'scheduled' with NULL scores. Each test completes them by UPDATE,
-- which is exactly the trigger path.

INSERT INTO public.matches (id, gameweek_id, gameweek_number, home_team, away_team, kickoff_time, status, season_year)
VALUES
    -- GW1 regular matches
    ('aa111111-1111-1111-1111-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Arsenal',       'Chelsea',    NOW() - INTERVAL '6 days', 'scheduled', '2025-26'),
    ('aa222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Liverpool',     'Man City',   NOW() - INTERVAL '6 days', 'scheduled', '2025-26'),
    ('aa333333-3333-3333-3333-333333333333', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Spurs',         'Man United', NOW() - INTERVAL '6 days', 'scheduled', '2025-26'),

    -- GW2 special matches (10)
    ('bb111111-1111-1111-1111-111111111111', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home1', 'Away1', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb222222-2222-2222-2222-222222222222', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home2', 'Away2', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb333333-3333-3333-3333-333333333333', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home3', 'Away3', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb444444-4444-4444-4444-444444444444', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home4', 'Away4', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb555555-5555-5555-5555-555555555555', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home5', 'Away5', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb666666-6666-6666-6666-666666666666', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home6', 'Away6', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb777777-7777-7777-7777-777777777777', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home7', 'Away7', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb888888-8888-8888-8888-888888888888', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home8', 'Away8', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb999999-9999-9999-9999-999999999999', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home9', 'Away9', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bbaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home10','Away10',NOW() - INTERVAL '3 days', 'scheduled', '2025-26');

-- ============================================================================
-- TEST 1 — Basic result correct (home win, wrong exact score)
-- ============================================================================
-- User1 predicts 2-0 Arsenal; actual 3-1 Arsenal. Result correct (home_win),
-- score not exact. Expected points_earned = 3 (home win).
-- Use a prediction id we can query back.

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES
    ('d1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111',
     'aa111111-1111-1111-1111-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 2, 0);

UPDATE public.matches
   SET status = 'completed', home_score = 3, away_score = 1
 WHERE id = 'aa111111-1111-1111-1111-111111111111';

DO $$
DECLARE
    actual INT;
    expected INT := 3;
BEGIN
    SELECT points_earned INTO actual
    FROM public.predictions
    WHERE id = 'd1111111-1111-1111-1111-111111111111';

    IF actual IS DISTINCT FROM expected THEN
        RAISE EXCEPTION 'Test 1 FAIL: basic result correct — expected %, got %', expected, actual;
    END IF;
    RAISE NOTICE 'Test 1 PASS: basic result correct (home win, wrong score) — %', actual;
END $$;

-- ============================================================================
-- TEST 2 — Exact score correct (home win exact)
-- ============================================================================
-- User2 predicts 2-1; we re-complete the same match at 2-1 so User2 gets
-- exact. User1's points_earned also updates (3 -> 0 since 2-0 no longer
-- matches 2-1; 2 > 1 still a home_win, so 3pts preserved — result still
-- correct, score still wrong). We only assert on User2's prediction here.

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES
    ('d2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222',
     'aa111111-1111-1111-1111-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 2, 1);

UPDATE public.matches
   SET home_score = 2, away_score = 1
 WHERE id = 'aa111111-1111-1111-1111-111111111111';

DO $$
DECLARE
    actual INT;
    expected INT := 6; -- 3 (home win) + 3 (exact score)
BEGIN
    SELECT points_earned INTO actual
    FROM public.predictions
    WHERE id = 'd2222222-2222-2222-2222-222222222222';

    IF actual IS DISTINCT FROM expected THEN
        RAISE EXCEPTION 'Test 2 FAIL: exact score — expected %, got %', expected, actual;
    END IF;
    RAISE NOTICE 'Test 2 PASS: exact score correct (home win + exact) — %', actual;
END $$;

-- ============================================================================
-- TEST 3 — Joker doubles per-match points
-- ============================================================================
-- Isolate joker doubling using User1 in GW1. Design:
--   Match 1 (aa111111): User1 predicts 2-0, actual is 2-1 (already set above).
--                       Result home_win correct, not exact -> 3 base.
--                       With joker:                        -> 6 (doubled).
--   Match 2 (aa222222): User1 predicts 1-0, actual 3-1.    -> 3 base (home win).
--   Match 3 (aa333333): User1 predicts 0-1, actual 0-2.    -> 4 base (away win).
-- User1 only has 1 exact score (none here actually), so no +10 perfect-round.
-- Expected total = 6 + 3 + 4 = 13.
--
-- Before inserting the GW1 match-2/3 predictions, we first upgrade User1's
-- existing match-1 prediction to use the joker. The trigger already fired on
-- match 1, so we manually re-run score_predictions_for_match + recompute to
-- pick up the new joker_used value. (Prod path is the 007_mark_joker_used_rpc
-- which sets the flag BEFORE the match completes; in tests we force it.)

UPDATE public.predictions
   SET joker_used = TRUE
 WHERE id = 'd1111111-1111-1111-1111-111111111111';

-- Add User1 predictions for matches 2 and 3.
INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES
    ('d1222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111',
     'aa222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 1, 0),
    ('d1333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111',
     'aa333333-3333-3333-3333-333333333333', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 0, 1);

-- Force re-score of match 1 so User1's joker doubling takes effect.
SELECT public.score_predictions_for_match('aa111111-1111-1111-1111-111111111111');

-- Complete matches 2 and 3 (these fire the trigger normally).
UPDATE public.matches SET status = 'completed', home_score = 3, away_score = 1 WHERE id = 'aa222222-2222-2222-2222-222222222222';
UPDATE public.matches SET status = 'completed', home_score = 0, away_score = 2 WHERE id = 'aa333333-3333-3333-3333-333333333333';

-- Refresh User1's aggregates once more to be sure the re-scored match 1 is folded in.
SELECT public.recompute_group_member_aggregates('11111111-1111-1111-1111-111111111111');

DO $$
DECLARE
    actual_match1 INT;
    actual_total  INT;
    expected_match1 INT := 6;   -- 3 (home correct) * 2 (joker)
    expected_total  INT := 13;  -- 6 + 3 + 4, no perfect-round bonus (<3 exact)
BEGIN
    SELECT points_earned INTO actual_match1
      FROM public.predictions
     WHERE id = 'd1111111-1111-1111-1111-111111111111';

    IF actual_match1 IS DISTINCT FROM expected_match1 THEN
        RAISE EXCEPTION 'Test 3a FAIL: joker match points — expected %, got %', expected_match1, actual_match1;
    END IF;

    SELECT total_points INTO actual_total
      FROM public.group_members
     WHERE user_id = '11111111-1111-1111-1111-111111111111'
       AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    IF actual_total IS DISTINCT FROM expected_total THEN
        RAISE EXCEPTION 'Test 3b FAIL: joker gameweek total — expected %, got %', expected_total, actual_total;
    END IF;
    RAISE NOTICE 'Test 3 PASS: joker doubles per-match, total=% (match1 doubled to %)', actual_total, actual_match1;
END $$;

-- ============================================================================
-- TEST 4 — Perfect-round bonus (+10) on a regular gameweek
-- ============================================================================
-- User2 predicts exact scores on all 3 GW1 matches. Once the final match
-- completes, total should be base_sum + 10.
--   Match 1: predict 2-1 actual 2-1 -> home exact -> 3+3 = 6  (already done)
--   Match 2: predict 3-1 actual 3-1 -> home exact -> 3+3 = 6
--   Match 3: predict 0-2 actual 0-2 -> away exact -> 4+3 = 7
-- Base = 6+6+7 = 19; +10 = 29.

-- User2 already has match 1 prediction (2-1 exact -> 6pts).
-- Add match 2 and match 3 for User2 BEFORE they were completed above? Matches
-- 2 and 3 are already completed in Test 3, so inserting a new prediction for
-- User2 now will NOT trigger scoring (trigger only fires on match UPDATE).
-- Manually score and recompute.

-- Update actual scores of matches 2 and 3 to match User2's intended exact calls.
UPDATE public.matches SET home_score = 3, away_score = 1 WHERE id = 'aa222222-2222-2222-2222-222222222222';
-- match 2 already at 3-1, NOOP-ish (status still completed). Trigger's WHEN
-- clause requires the scores to CHANGE, so we don't fire it. We re-score
-- manually to exercise the same functions deterministically.
UPDATE public.matches SET home_score = 0, away_score = 2 WHERE id = 'aa333333-3333-3333-3333-333333333333';
-- match 3 already at 0-2, same deal.

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES
    ('d2222223-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222',
     'aa222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 3, 1),
    ('d2222224-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222',
     'aa333333-3333-3333-3333-333333333333', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 0, 2);

SELECT public.score_predictions_for_match('aa222222-2222-2222-2222-222222222222');
SELECT public.score_predictions_for_match('aa333333-3333-3333-3333-333333333333');
SELECT public.recompute_group_member_aggregates('22222222-2222-2222-2222-222222222222');

DO $$
DECLARE
    actual_total INT;
    actual_exact INT;
    expected_total INT := 29; -- 6 + 6 + 7 = 19 base + 10 perfect-round bonus
    expected_exact INT := 3;
BEGIN
    SELECT total_points, correct_scores
      INTO actual_total, actual_exact
      FROM public.group_members
     WHERE user_id = '22222222-2222-2222-2222-222222222222'
       AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    IF actual_exact IS DISTINCT FROM expected_exact THEN
        RAISE EXCEPTION 'Test 4a FAIL: correct_scores — expected %, got %', expected_exact, actual_exact;
    END IF;
    IF actual_total IS DISTINCT FROM expected_total THEN
        RAISE EXCEPTION 'Test 4b FAIL: perfect-round bonus — expected %, got %', expected_total, actual_total;
    END IF;
    RAISE NOTICE 'Test 4 PASS: perfect-round bonus applied (total=%, exact=%)', actual_total, actual_exact;
END $$;

-- ============================================================================
-- TEST 5 — Special gameweek (Boxing Day) does NOT award the +10 bonus
-- ============================================================================
-- User2 has 3 exact scores in the 10-match special GW2. All 10 matches
-- complete. Expected: base sum only, NO +10 added.
--   Match 1 (bb111111): predict 2-0 actual 2-0 -> exact home  -> 6
--   Match 2 (bb222222): predict 1-2 actual 1-2 -> exact away  -> 7
--   Match 3 (bb333333): predict 1-1 actual 1-1 -> exact draw  -> 9
--   Matches 4..10: predict 0-0 actual 5-0 -> result wrong      -> 0 each
-- Special GW base = 6 + 7 + 9 + 0*7 = 22.
-- Plus User2's GW1 total (29) => grand total = 51.

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES
    ('d2b11111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'bb111111-1111-1111-1111-111111111111', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 2, 0),
    ('d2b22222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'bb222222-2222-2222-2222-222222222222', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 1, 2),
    ('d2b33333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'bb333333-3333-3333-3333-333333333333', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 1, 1),
    ('d2b44444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'bb444444-4444-4444-4444-444444444444', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('d2b55555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'bb555555-5555-5555-5555-555555555555', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('d2b66666-6666-6666-6666-666666666666', '22222222-2222-2222-2222-222222222222', 'bb666666-6666-6666-6666-666666666666', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('d2b77777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'bb777777-7777-7777-7777-777777777777', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('d2b88888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', 'bb888888-8888-8888-8888-888888888888', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('d2b99999-9999-9999-9999-999999999999', '22222222-2222-2222-2222-222222222222', 'bb999999-9999-9999-9999-999999999999', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('d2baaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'bbaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0);

UPDATE public.matches SET status='completed', home_score=2, away_score=0 WHERE id = 'bb111111-1111-1111-1111-111111111111';
UPDATE public.matches SET status='completed', home_score=1, away_score=2 WHERE id = 'bb222222-2222-2222-2222-222222222222';
UPDATE public.matches SET status='completed', home_score=1, away_score=1 WHERE id = 'bb333333-3333-3333-3333-333333333333';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb444444-4444-4444-4444-444444444444';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb555555-5555-5555-5555-555555555555';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb666666-6666-6666-6666-666666666666';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb777777-7777-7777-7777-777777777777';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb888888-8888-8888-8888-888888888888';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb999999-9999-9999-9999-999999999999';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bbaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

DO $$
DECLARE
    actual_total    INT;
    actual_special_base INT;
    expected_total  INT := 51; -- 29 from GW1 + 22 from GW2 base, NO +10 bonus for special
BEGIN
    SELECT total_points INTO actual_total
      FROM public.group_members
     WHERE user_id = '22222222-2222-2222-2222-222222222222'
       AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    -- Sanity check: confirm the special-GW base sum equals 22 exactly.
    SELECT COALESCE(SUM(points_earned), 0) INTO actual_special_base
      FROM public.predictions
     WHERE user_id = '22222222-2222-2222-2222-222222222222'
       AND gameweek_id = '22222222-aaaa-aaaa-aaaa-222222222222';

    IF actual_special_base IS DISTINCT FROM 22 THEN
        RAISE EXCEPTION 'Test 5a FAIL: special-GW base points — expected 22, got %', actual_special_base;
    END IF;
    IF actual_total IS DISTINCT FROM expected_total THEN
        RAISE EXCEPTION 'Test 5b FAIL: special GW should NOT get +10 — expected %, got %', expected_total, actual_total;
    END IF;
    RAISE NOTICE 'Test 5 PASS: special gameweek has no perfect-round bonus (total=%)', actual_total;
END $$;

-- ============================================================================
-- TEST 6 — Score-correction idempotency
-- ============================================================================
-- Admin corrects match aa111111's final score from 2-1 to 1-2 (away win).
-- User1's prediction (2-0 with joker): home_win prediction vs new away_win
--   actual -> 0 result pts, 0 exact -> 0 * 2 = 0.
-- User2's prediction (2-1): home_win vs away_win -> 0 pts.
-- The trigger refires because home_score/away_score changed. We assert:
--   * User1's points_earned for match 1 flips from 6 to 0.
--   * User1's total_points drops by 6 (was 13 from test 3 -> now 7).
--   * Running the trigger logic again on the SAME score produces the SAME
--     total (idempotent, no double-apply).

UPDATE public.matches
   SET home_score = 1, away_score = 2
 WHERE id = 'aa111111-1111-1111-1111-111111111111';

DO $$
DECLARE
    u1_match1 INT;
    u1_total_after_correction INT;
    u1_total_after_reprocess  INT;
BEGIN
    SELECT points_earned INTO u1_match1
      FROM public.predictions
     WHERE id = 'd1111111-1111-1111-1111-111111111111';

    IF u1_match1 IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 6a FAIL: corrected match points — expected 0, got %', u1_match1;
    END IF;

    SELECT total_points INTO u1_total_after_correction
      FROM public.group_members
     WHERE user_id = '11111111-1111-1111-1111-111111111111'
       AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    -- User1 GW1 points: match1=0 (was 6), match2=3, match3=4 -> 7 total.
    IF u1_total_after_correction IS DISTINCT FROM 7 THEN
        RAISE EXCEPTION 'Test 6b FAIL: recomputed total after correction — expected 7, got %', u1_total_after_correction;
    END IF;

    -- Idempotency: re-run the recompute directly and assert the total did not
    -- drift. If the function were double-applying, this would add another +10
    -- or otherwise increment the total.
    PERFORM public.recompute_group_member_aggregates('11111111-1111-1111-1111-111111111111');

    SELECT total_points INTO u1_total_after_reprocess
      FROM public.group_members
     WHERE user_id = '11111111-1111-1111-1111-111111111111'
       AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    IF u1_total_after_reprocess IS DISTINCT FROM u1_total_after_correction THEN
        RAISE EXCEPTION 'Test 6c FAIL: recompute is NOT idempotent — first=%, second=%',
            u1_total_after_correction, u1_total_after_reprocess;
    END IF;
    RAISE NOTICE 'Test 6 PASS: score correction recomputed cleanly (total=% stable across reruns)', u1_total_after_reprocess;
END $$;

-- ============================================================================
-- TEST 7 — Multi-group aggregation
-- ============================================================================
-- User1 is in Group A and Group B. After all the scoring above, both
-- group_members rows for User1 should have identical totals (aggregate is
-- per-player and written to every group the user is in).

DO $$
DECLARE
    a_total INT;
    b_total INT;
    a_exact INT;
    b_exact INT;
    a_results INT;
    b_results INT;
BEGIN
    -- Ensure both rows reflect the latest recompute.
    PERFORM public.recompute_group_member_aggregates('11111111-1111-1111-1111-111111111111');

    SELECT total_points, correct_scores, correct_results
      INTO a_total,      a_exact,        a_results
      FROM public.group_members
     WHERE user_id = '11111111-1111-1111-1111-111111111111'
       AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    SELECT total_points, correct_scores, correct_results
      INTO b_total,      b_exact,        b_results
      FROM public.group_members
     WHERE user_id = '11111111-1111-1111-1111-111111111111'
       AND group_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

    IF a_total IS DISTINCT FROM b_total THEN
        RAISE EXCEPTION 'Test 7a FAIL: total_points differ across groups — A=%, B=%', a_total, b_total;
    END IF;
    IF a_exact IS DISTINCT FROM b_exact THEN
        RAISE EXCEPTION 'Test 7b FAIL: correct_scores differ across groups — A=%, B=%', a_exact, b_exact;
    END IF;
    IF a_results IS DISTINCT FROM b_results THEN
        RAISE EXCEPTION 'Test 7c FAIL: correct_results differ across groups — A=%, B=%', a_results, b_results;
    END IF;
    RAISE NOTICE 'Test 7 PASS: multi-group aggregation identical across both groups (total=%)', a_total;
END $$;

-- ============================================================================
-- All tests passed if we got here. ROLLBACK to discard seeded data.
-- ============================================================================

DO $$ BEGIN RAISE NOTICE 'ALL TESTS PASSED — rolling back transaction.'; END $$;

ROLLBACK;
