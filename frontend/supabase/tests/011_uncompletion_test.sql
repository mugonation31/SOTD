-- ============================================================================
-- !!  WARNING — DO NOT RUN AGAINST PRODUCTION
-- ----------------------------------------------------------------------------
-- This test file inserts directly into auth.users / profiles / groups /
-- group_members / gameweeks / matches / predictions using predictable
-- fixed UUIDs and @example.com emails. The entire script is wrapped in
-- BEGIN ... ROLLBACK so nothing should persist — BUT:
--   1. If you paste sections individually and skip the final ROLLBACK;,
--      the test rows remain permanently.
--   2. The fixed UUIDs are guessable; if they leak into a live DB they
--      can be referenced by external callers.
-- Recommended: run ONLY against a local Supabase or a disposable staging
-- project. If you must run in prod, execute the whole file in a single
-- transaction (don't split) and verify the ROLLBACK ran at the end.
-- ============================================================================
-- Test Script: 011_uncompletion_test.sql
-- Description: Integration tests for the reverse-transition branch added in
--              migration 011. Exercises the full un-completion path:
--                matches (completed -> scheduled)
--                  -> trigger fires reverse branch
--                  -> predictions.points_earned zeroed for that match
--                  -> recompute_group_member_aggregates
--                  -> group_members totals drop
--                  -> perfect-round bonus reverses if gameweek no longer fully
--                    completed.
--
-- Dependencies: migrations 001..011 applied.
--
-- How to run:
--   Paste the entire file into the Supabase SQL editor and execute.
--   The whole script is wrapped in BEGIN ... ROLLBACK so nothing persists.
--   PASS: the script completes silently with `NOTICE: ... PASS` lines.
--   FAIL: the script aborts at the first failing assertion with a
--         `ERROR: Test N FAIL: expected X, got Y` message.
--
-- Test cases:
--   1. Basic un-completion zeros points_earned and group_members.total_points
--      for a single-user single-match setup.
--   2. Multi-user un-completion — both affected users' aggregates drop.
--   3. Perfect-round bonus reverses — complete 3 matches in a regular
--      gameweek (user earns +10 bonus), un-complete 1 match, confirm bonus
--      is removed from total.
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- SEED: auth.users
-- ----------------------------------------------------------------------------

INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
    ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'uncomp-user-1@example.com', '', NOW(), NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'uncomp-user-2@example.com', '', NOW(), NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'uncomp-admin@example.com',  '', NOW(), NOW(), NOW());

-- ----------------------------------------------------------------------------
-- SEED: profiles
-- ----------------------------------------------------------------------------

INSERT INTO public.profiles (id, email, role, username, first_name, last_name)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'uncomp-user-1@example.com', 'player',      'uncomp_user_1', 'Uncomp', 'User1'),
    ('22222222-2222-2222-2222-222222222222', 'uncomp-user-2@example.com', 'player',      'uncomp_user_2', 'Uncomp', 'User2'),
    ('33333333-3333-3333-3333-333333333333', 'uncomp-admin@example.com',  'group-admin', 'uncomp_admin',  'Uncomp', 'Admin');

-- ----------------------------------------------------------------------------
-- SEED: groups + group_members
-- ----------------------------------------------------------------------------

INSERT INTO public.groups (id, name, code, admin_id, season_year, current_members)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Uncomp Group A', 'UNCAAA', '33333333-3333-3333-3333-333333333333', '2025-26', 0);

INSERT INTO public.group_members (id, group_id, user_id)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'),
    ('c2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222');

-- ----------------------------------------------------------------------------
-- SEED: gameweek (GW1 regular — so the perfect-round bonus is eligible)
-- ----------------------------------------------------------------------------

INSERT INTO public.gameweeks (id, gameweek_number, season_year, start_date, end_date, deadline, is_special, special_type)
VALUES
    ('11111111-aaaa-aaaa-aaaa-111111111111', 1, '2025-26',
        NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days', NOW() - INTERVAL '8 days',
        FALSE, NULL);

-- ----------------------------------------------------------------------------
-- SEED: 3 matches in GW1 (scheduled, NULL scores)
-- ----------------------------------------------------------------------------

INSERT INTO public.matches (id, gameweek_id, gameweek_number, home_team, away_team, kickoff_time, status, season_year)
VALUES
    ('aa111111-1111-1111-1111-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Arsenal',   'Chelsea',    NOW() - INTERVAL '6 days', 'scheduled', '2025-26'),
    ('aa222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Liverpool', 'Man City',   NOW() - INTERVAL '6 days', 'scheduled', '2025-26'),
    ('aa333333-3333-3333-3333-333333333333', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Spurs',     'Man United', NOW() - INTERVAL '6 days', 'scheduled', '2025-26');

-- ============================================================================
-- TEST 1 — Basic un-completion zeros points_earned and total_points
-- ============================================================================
-- User1 predicts 2-1 Arsenal, actual 2-1 -> exact score, 6pts earned.
-- Then admin reverts match back to 'scheduled'. We assert:
--   * predictions.points_earned = 0 (was 6).
--   * group_members.total_points = 0 (was 6).
--
-- Use match 1 (aa111111). Matches 2 and 3 remain scheduled throughout test 1.

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES
    ('d1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111',
     'aa111111-1111-1111-1111-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 2, 1);

-- Forward: complete the match. Trigger fires, points_earned = 6.
UPDATE public.matches
   SET status = 'completed', home_score = 2, away_score = 1
 WHERE id = 'aa111111-1111-1111-1111-111111111111';

-- Sanity: confirm forward path worked so a subsequent FAIL on the reverse
-- path cannot be masked by a no-op setup.
DO $$
DECLARE
    fwd_points INT;
    fwd_total  INT;
BEGIN
    SELECT points_earned INTO fwd_points
      FROM public.predictions
     WHERE id = 'd1111111-1111-1111-1111-111111111111';
    SELECT total_points INTO fwd_total
      FROM public.group_members
     WHERE user_id = '11111111-1111-1111-1111-111111111111'
       AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    IF fwd_points IS DISTINCT FROM 6 THEN
        RAISE EXCEPTION 'Test 1 SETUP FAIL: forward scoring broken — expected 6, got %', fwd_points;
    END IF;
    IF fwd_total IS DISTINCT FROM 6 THEN
        RAISE EXCEPTION 'Test 1 SETUP FAIL: forward aggregate broken — expected 6, got %', fwd_total;
    END IF;
END $$;

-- Reverse: revert match back to 'scheduled' (NULL out scores). Trigger fires
-- reverse branch -> zero predictions.points_earned -> recompute aggregates.
UPDATE public.matches
   SET status = 'scheduled', home_score = NULL, away_score = NULL
 WHERE id = 'aa111111-1111-1111-1111-111111111111';

DO $$
DECLARE
    rev_points INT;
    rev_total  INT;
BEGIN
    SELECT points_earned INTO rev_points
      FROM public.predictions
     WHERE id = 'd1111111-1111-1111-1111-111111111111';

    IF rev_points IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 1a FAIL: un-completion should zero points_earned — expected 0, got %', rev_points;
    END IF;

    SELECT total_points INTO rev_total
      FROM public.group_members
     WHERE user_id = '11111111-1111-1111-1111-111111111111'
       AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    IF rev_total IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 1b FAIL: aggregate should recompute to 0 — expected 0, got %', rev_total;
    END IF;
    RAISE NOTICE 'Test 1 PASS: basic un-completion zeros points_earned and total_points';
END $$;

-- ============================================================================
-- TEST 2 — Multi-user un-completion
-- ============================================================================
-- Two users both predict the same match. Complete -> both earn points.
-- Un-complete -> both users' aggregates drop to 0.
--
-- Reuse match 2 (aa222222). Fresh match, still scheduled at this point.

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES
    ('d2111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111',
     'aa222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 1, 0),
    ('d2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222',
     'aa222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 3, 1);

-- Complete match 2 at 3-1 (Liverpool home win).
--   User1 (1-0): home_win correct, not exact -> 3pts.
--   User2 (3-1): home_win correct, exact     -> 6pts.
UPDATE public.matches
   SET status = 'completed', home_score = 3, away_score = 1
 WHERE id = 'aa222222-2222-2222-2222-222222222222';

DO $$
DECLARE
    u1_pts INT;
    u2_pts INT;
    u1_total INT;
    u2_total INT;
BEGIN
    SELECT points_earned INTO u1_pts FROM public.predictions WHERE id = 'd2111111-1111-1111-1111-111111111111';
    SELECT points_earned INTO u2_pts FROM public.predictions WHERE id = 'd2222222-2222-2222-2222-222222222222';
    SELECT total_points INTO u1_total FROM public.group_members WHERE user_id = '11111111-1111-1111-1111-111111111111' AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    SELECT total_points INTO u2_total FROM public.group_members WHERE user_id = '22222222-2222-2222-2222-222222222222' AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    IF u1_pts IS DISTINCT FROM 3 OR u2_pts IS DISTINCT FROM 6 THEN
        RAISE EXCEPTION 'Test 2 SETUP FAIL: forward scoring — u1=%, u2=% (expected 3, 6)', u1_pts, u2_pts;
    END IF;
    -- User1 also had match 1 from test 1 (now 0). Totals should be just match 2.
    IF u1_total IS DISTINCT FROM 3 OR u2_total IS DISTINCT FROM 6 THEN
        RAISE EXCEPTION 'Test 2 SETUP FAIL: forward aggregate — u1=%, u2=% (expected 3, 6)', u1_total, u2_total;
    END IF;
END $$;

-- Un-complete match 2.
UPDATE public.matches
   SET status = 'scheduled', home_score = NULL, away_score = NULL
 WHERE id = 'aa222222-2222-2222-2222-222222222222';

DO $$
DECLARE
    u1_pts INT;
    u2_pts INT;
    u1_total INT;
    u2_total INT;
BEGIN
    SELECT points_earned INTO u1_pts FROM public.predictions WHERE id = 'd2111111-1111-1111-1111-111111111111';
    SELECT points_earned INTO u2_pts FROM public.predictions WHERE id = 'd2222222-2222-2222-2222-222222222222';
    SELECT total_points INTO u1_total FROM public.group_members WHERE user_id = '11111111-1111-1111-1111-111111111111' AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    SELECT total_points INTO u2_total FROM public.group_members WHERE user_id = '22222222-2222-2222-2222-222222222222' AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    IF u1_pts IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 2a FAIL: user1 points_earned — expected 0, got %', u1_pts;
    END IF;
    IF u2_pts IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 2b FAIL: user2 points_earned — expected 0, got %', u2_pts;
    END IF;
    IF u1_total IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 2c FAIL: user1 total_points — expected 0, got %', u1_total;
    END IF;
    IF u2_total IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 2d FAIL: user2 total_points — expected 0, got %', u2_total;
    END IF;
    RAISE NOTICE 'Test 2 PASS: multi-user un-completion zeros both users cleanly';
END $$;

-- ============================================================================
-- TEST 3 — Perfect-round bonus reverses on un-completion
-- ============================================================================
-- User1 predicts exact on all 3 GW1 matches. Complete all 3 -> +10 bonus.
-- Un-complete match 3 -> gameweek no longer "fully completed" -> bonus drops.
--
--   Match 1 (aa111111): user1 predicts 2-1, actual 2-1 -> home exact -> 6pts
--   Match 2 (aa222222): user1 predicts 1-0, actual 1-0 -> home exact -> 6pts
--   Match 3 (aa333333): user1 predicts 0-2, actual 0-2 -> away exact -> 7pts
-- Base = 6 + 6 + 7 = 19; with perfect-round bonus = 29.
--
-- After un-completing match 3:
--   points_earned on match 3 -> 0
--   base (completed matches only) = 6 + 6 = 12
--   gameweek no longer fully completed -> bonus NOT awarded
--   expected total = 12.

-- Clear User2's match 2 prediction so it doesn't interfere with the
-- gameweek's exact-score counting or fully-completed detection (it's fine
-- to leave it; it doesn't affect user1's totals or the gameweek completion
-- status since matches, not predictions, drive is_gameweek_fully_completed).
-- User1 already has a prediction on match 1 (d1111111: 2-1) and match 2
-- (d2111111: 1-0). Update match 1 back to 2-1 and adjust match 2's user1
-- prediction isn't needed — we'll align the actual scores to match the
-- existing predictions.

-- User1's match-1 prediction is already (2, 1). Match-2 prediction is (1, 0).
-- Add user1's match-3 prediction (0, 2).
INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES
    ('d3111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111',
     'aa333333-3333-3333-3333-333333333333', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 0, 2);

-- Complete all 3 matches with actuals matching user1's predictions exactly.
UPDATE public.matches SET status = 'completed', home_score = 2, away_score = 1 WHERE id = 'aa111111-1111-1111-1111-111111111111';
UPDATE public.matches SET status = 'completed', home_score = 1, away_score = 0 WHERE id = 'aa222222-2222-2222-2222-222222222222';
UPDATE public.matches SET status = 'completed', home_score = 0, away_score = 2 WHERE id = 'aa333333-3333-3333-3333-333333333333';

DO $$
DECLARE
    u1_total INT;
    u1_exact INT;
BEGIN
    SELECT total_points, correct_scores INTO u1_total, u1_exact
      FROM public.group_members
     WHERE user_id = '11111111-1111-1111-1111-111111111111'
       AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    IF u1_exact IS DISTINCT FROM 3 THEN
        RAISE EXCEPTION 'Test 3 SETUP FAIL: correct_scores — expected 3, got %', u1_exact;
    END IF;
    IF u1_total IS DISTINCT FROM 29 THEN
        RAISE EXCEPTION 'Test 3 SETUP FAIL: perfect-round total — expected 29 (19 + 10), got %', u1_total;
    END IF;
END $$;

-- Un-complete match 3. The gameweek is no longer fully complete, so the
-- perfect-round bonus should drop.
UPDATE public.matches
   SET status = 'scheduled', home_score = NULL, away_score = NULL
 WHERE id = 'aa333333-3333-3333-3333-333333333333';

DO $$
DECLARE
    m3_pts   INT;
    u1_total INT;
    u1_exact INT;
    expected_total INT := 12; -- 6 (match1) + 6 (match2) + 0 (match3 un-completed), NO bonus
BEGIN
    SELECT points_earned INTO m3_pts
      FROM public.predictions
     WHERE id = 'd3111111-1111-1111-1111-111111111111';

    IF m3_pts IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 3a FAIL: match 3 points_earned — expected 0 after un-completion, got %', m3_pts;
    END IF;

    SELECT total_points, correct_scores INTO u1_total, u1_exact
      FROM public.group_members
     WHERE user_id = '11111111-1111-1111-1111-111111111111'
       AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

    -- correct_scores only counts exact matches on completed matches — match 3
    -- is no longer completed, so exact count drops from 3 to 2.
    IF u1_exact IS DISTINCT FROM 2 THEN
        RAISE EXCEPTION 'Test 3b FAIL: correct_scores after un-completion — expected 2, got %', u1_exact;
    END IF;

    IF u1_total IS DISTINCT FROM expected_total THEN
        RAISE EXCEPTION 'Test 3c FAIL: perfect-round bonus should reverse — expected % (12, no bonus), got %', expected_total, u1_total;
    END IF;
    RAISE NOTICE 'Test 3 PASS: perfect-round bonus reverses cleanly on un-completion (total=%, exact=%)', u1_total, u1_exact;
END $$;

-- ============================================================================
-- All tests passed if we got here. ROLLBACK to discard seeded data.
-- ============================================================================

DO $$ BEGIN RAISE NOTICE 'ALL TESTS PASSED — rolling back transaction.'; END $$;

ROLLBACK;
