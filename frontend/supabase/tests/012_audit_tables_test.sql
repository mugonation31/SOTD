-- ============================================================================
-- !!  WARNING — DO NOT RUN AGAINST PRODUCTION
-- ----------------------------------------------------------------------------
-- This test file inserts directly into auth.users / profiles / matches /
-- gameweeks / admin_audit_log / matches_audit using predictable fixed UUIDs
-- (1111..., 2222..., 3333..., aa11..., etc.) and @example.com emails. The
-- entire script is wrapped in BEGIN ... ROLLBACK so nothing should persist
-- — BUT:
--   1. If you paste sections individually and skip the final ROLLBACK;,
--      the test rows remain permanently.
--   2. The fixed UUIDs are guessable; if they leak into a live DB they can
--      be referenced by external callers.
-- Recommended: run ONLY against a local Supabase or a disposable staging
-- project. If you must run in prod, execute the whole file in a single
-- transaction (don't split) and verify the ROLLBACK ran at the end:
--   SELECT * FROM auth.users WHERE id IN (
--     '11111111-1111-1111-1111-111111111111',
--     '22222222-2222-2222-2222-222222222222',
--     '33333333-3333-3333-3333-333333333333'
--   );  -- should return zero rows.
-- ============================================================================
-- Test Script: 012_audit_tables_test.sql
-- Description: Integration tests for migration 012 (audit tables). Covers:
--                * admin_audit_log INSERT under service_role succeeds.
--                * admin_audit_log SELECT is gated to super-admins.
--                * matches_audit trigger fires on score/status UPDATE.
--                * matches_audit trigger is a NOOP when no score/status
--                  changed (e.g. a touch of home_team_logo).
--                * matches_audit trigger does NOT fire on INSERT.
--                * matches_audit SELECT is gated to super-admins.
--                * Regular authenticated users cannot INSERT into either
--                  audit table (RLS denies).
--
-- Dependencies: migrations 001..012 applied.
--
-- How to run:
--   Paste the entire file into the Supabase SQL editor and execute.
--   The whole script is wrapped in BEGIN ... ROLLBACK so nothing persists.
--   PASS: the script completes silently with `NOTICE: ... PASS` lines.
--   FAIL: the script aborts at the first failing assertion with an
--         `ERROR: Test N FAIL: expected X, got Y` message.
--
-- Role switching:
--   The SQL editor connects as `postgres` (superuser) which can SET ROLE
--   to any other role — authenticated, service_role, anon. We use
--   SET LOCAL ROLE inside the transaction so the role resets at ROLLBACK.
--   Between tests we RESET ROLE back to postgres so seeding remains
--   unrestricted.
--
-- Assertion style:
--   Each test uses a DO $$ ... $$ block, SELECTs / counts the actual state,
--   compares against expected, and either RAISE EXCEPTIONs (fail) or
--   RAISE NOTICEs (pass). RAISE EXCEPTION inside a DO block aborts the
--   surrounding transaction, which the final ROLLBACK would do anyway —
--   so a failed assertion is surfaced loudly without ever persisting rows.
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- SEED: auth.users
-- ----------------------------------------------------------------------------
-- User 1: regular player (authenticated role, not super-admin).
-- User 2: super-admin (will have profiles.role = 'super-admin').
-- User 3: target of an admin_audit_log row.

INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
    ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'audit-player@example.com',     '', NOW(), NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'audit-superadmin@example.com', '', NOW(), NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'audit-target@example.com',     '', NOW(), NOW(), NOW());

-- ----------------------------------------------------------------------------
-- SEED: profiles
-- ----------------------------------------------------------------------------

INSERT INTO public.profiles (id, email, role, username, first_name, last_name)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'audit-player@example.com',     'player',      'audit_player',     'Audit', 'Player'),
    ('22222222-2222-2222-2222-222222222222', 'audit-superadmin@example.com', 'super-admin', 'audit_superadmin', 'Audit', 'Super'),
    ('33333333-3333-3333-3333-333333333333', 'audit-target@example.com',     'player',      'audit_target',     'Audit', 'Target');

-- ----------------------------------------------------------------------------
-- SEED: gameweeks + matches (needed for trigger tests)
-- ----------------------------------------------------------------------------

INSERT INTO public.gameweeks (id, gameweek_number, season_year, start_date, end_date, deadline, is_special, special_type)
VALUES
    ('11111111-aaaa-aaaa-aaaa-111111111111', 1, '2025-26',
        NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days', NOW() - INTERVAL '8 days',
        FALSE, NULL);

INSERT INTO public.matches (id, gameweek_id, gameweek_number, home_team, away_team, kickoff_time, status, season_year)
VALUES
    ('aa111111-1111-1111-1111-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Arsenal',   'Chelsea',  NOW() - INTERVAL '6 days', 'scheduled', '2025-26'),
    ('aa222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Liverpool', 'Man City', NOW() - INTERVAL '6 days', 'scheduled', '2025-26'),
    ('aa333333-3333-3333-3333-333333333333', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Spurs',     'Man Utd',  NOW() - INTERVAL '6 days', 'scheduled', '2025-26');

-- ============================================================================
-- TEST 1 — service_role can INSERT into admin_audit_log
-- ============================================================================
-- Simulates what an Edge Function (e.g. admin-signout) does after completing
-- a privileged op: it writes a row describing caller + target + action.
-- We SET LOCAL ROLE service_role to exercise the same code path.

SET LOCAL ROLE service_role;

INSERT INTO public.admin_audit_log (id, caller_id, target_user_id, action, details)
VALUES (
    'e1111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    'signout',
    '{"reason": "admin test", "request_id": "test-req-1"}'::jsonb
);

RESET ROLE;

DO $$
DECLARE
    n INT;
BEGIN
    SELECT COUNT(*) INTO n
      FROM public.admin_audit_log
     WHERE id = 'e1111111-1111-1111-1111-111111111111';

    IF n IS DISTINCT FROM 1 THEN
        RAISE EXCEPTION 'Test 1 FAIL: service_role INSERT — expected 1 row, got %', n;
    END IF;
    RAISE NOTICE 'Test 1 PASS: service_role can INSERT into admin_audit_log';
END $$;

-- ============================================================================
-- TEST 2 — super-admin can SELECT from admin_audit_log
-- ============================================================================
-- SET LOCAL ROLE authenticated + SET LOCAL "request.jwt.claim.sub" to the
-- super-admin's uuid so auth.uid() resolves correctly inside is_super_admin().

SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" TO '22222222-2222-2222-2222-222222222222';

DO $$
DECLARE
    n INT;
BEGIN
    SELECT COUNT(*) INTO n
      FROM public.admin_audit_log
     WHERE id = 'e1111111-1111-1111-1111-111111111111';

    IF n IS DISTINCT FROM 1 THEN
        RAISE EXCEPTION 'Test 2 FAIL: super-admin SELECT admin_audit_log — expected 1 row, got %', n;
    END IF;
    RAISE NOTICE 'Test 2 PASS: super-admin can SELECT from admin_audit_log';
END $$;

RESET ROLE;

-- ============================================================================
-- TEST 3 — regular authenticated user CANNOT SELECT from admin_audit_log
-- ============================================================================
-- Role = authenticated, uid = regular player. RLS policy requires
-- is_super_admin() = TRUE; player is not a super-admin, so zero rows visible.

SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" TO '11111111-1111-1111-1111-111111111111';

DO $$
DECLARE
    n INT;
BEGIN
    SELECT COUNT(*) INTO n FROM public.admin_audit_log;

    IF n IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 3 FAIL: regular user should see zero admin_audit_log rows, got %', n;
    END IF;
    RAISE NOTICE 'Test 3 PASS: regular user cannot SELECT admin_audit_log (RLS denies)';
END $$;

RESET ROLE;

-- ============================================================================
-- TEST 4 — matches_audit trigger fires on UPDATE with score change
-- ============================================================================
-- UPDATE match 1 from scheduled+NULL scores to completed+3-1. Expect exactly
-- one matches_audit row with before/after matching the transition.
--
-- Note: the score_match_on_completion trigger from 010/011 also fires on
-- this UPDATE, but it only touches predictions / group_members — it does
-- not write to matches, so there's no cascading audit row.

UPDATE public.matches
   SET status = 'completed', home_score = 3, away_score = 1
 WHERE id = 'aa111111-1111-1111-1111-111111111111';

DO $$
DECLARE
    n INT;
    row_before_home INT;
    row_after_home  INT;
    row_before_away INT;
    row_after_away  INT;
    row_before_status TEXT;
    row_after_status  TEXT;
BEGIN
    SELECT COUNT(*) INTO n
      FROM public.matches_audit
     WHERE match_id = 'aa111111-1111-1111-1111-111111111111';

    IF n IS DISTINCT FROM 1 THEN
        RAISE EXCEPTION 'Test 4a FAIL: expected 1 matches_audit row after UPDATE, got %', n;
    END IF;

    SELECT before_home_score, after_home_score,
           before_away_score, after_away_score,
           before_status,     after_status
      INTO row_before_home, row_after_home,
           row_before_away, row_after_away,
           row_before_status, row_after_status
      FROM public.matches_audit
     WHERE match_id = 'aa111111-1111-1111-1111-111111111111';

    IF row_before_home IS DISTINCT FROM NULL THEN
        RAISE EXCEPTION 'Test 4b FAIL: before_home_score — expected NULL, got %', row_before_home;
    END IF;
    IF row_after_home IS DISTINCT FROM 3 THEN
        RAISE EXCEPTION 'Test 4c FAIL: after_home_score — expected 3, got %', row_after_home;
    END IF;
    IF row_before_away IS DISTINCT FROM NULL THEN
        RAISE EXCEPTION 'Test 4d FAIL: before_away_score — expected NULL, got %', row_before_away;
    END IF;
    IF row_after_away IS DISTINCT FROM 1 THEN
        RAISE EXCEPTION 'Test 4e FAIL: after_away_score — expected 1, got %', row_after_away;
    END IF;
    IF row_before_status IS DISTINCT FROM 'scheduled' THEN
        RAISE EXCEPTION 'Test 4f FAIL: before_status — expected scheduled, got %', row_before_status;
    END IF;
    IF row_after_status IS DISTINCT FROM 'completed' THEN
        RAISE EXCEPTION 'Test 4g FAIL: after_status — expected completed, got %', row_after_status;
    END IF;

    RAISE NOTICE 'Test 4 PASS: matches_audit row captured score+status transition correctly';
END $$;

-- ============================================================================
-- TEST 5 — matches_audit trigger fires on status-only UPDATE
-- ============================================================================
-- Match 2 transitions from scheduled -> cancelled (no score change). The
-- trigger's IS DISTINCT FROM check must still detect the status delta.

UPDATE public.matches
   SET status = 'cancelled'
 WHERE id = 'aa222222-2222-2222-2222-222222222222';

DO $$
DECLARE
    n INT;
    row_before_status TEXT;
    row_after_status  TEXT;
BEGIN
    SELECT COUNT(*) INTO n
      FROM public.matches_audit
     WHERE match_id = 'aa222222-2222-2222-2222-222222222222';

    IF n IS DISTINCT FROM 1 THEN
        RAISE EXCEPTION 'Test 5a FAIL: expected 1 matches_audit row after status-only UPDATE, got %', n;
    END IF;

    SELECT before_status, after_status
      INTO row_before_status, row_after_status
      FROM public.matches_audit
     WHERE match_id = 'aa222222-2222-2222-2222-222222222222';

    IF row_before_status IS DISTINCT FROM 'scheduled' OR row_after_status IS DISTINCT FROM 'cancelled' THEN
        RAISE EXCEPTION 'Test 5b FAIL: status transition — expected scheduled->cancelled, got %->%',
            row_before_status, row_after_status;
    END IF;
    RAISE NOTICE 'Test 5 PASS: matches_audit row captured status-only transition';
END $$;

-- ============================================================================
-- TEST 6 — matches_audit trigger does NOT fire on UPDATE with no score/status delta
-- ============================================================================
-- Update a non-audited column (home_team_logo) on match 3. The
-- handle_matches_updated_at trigger still fires (bumps updated_at) but our
-- audit trigger must short-circuit because home_score/away_score/status are
-- unchanged.

UPDATE public.matches
   SET home_team_logo = 'https://example.com/new-logo.png'
 WHERE id = 'aa333333-3333-3333-3333-333333333333';

DO $$
DECLARE
    n INT;
BEGIN
    SELECT COUNT(*) INTO n
      FROM public.matches_audit
     WHERE match_id = 'aa333333-3333-3333-3333-333333333333';

    IF n IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 6 FAIL: expected 0 matches_audit rows for non-score UPDATE, got %', n;
    END IF;
    RAISE NOTICE 'Test 6 PASS: matches_audit trigger correctly skipped UPDATE with no score/status delta';
END $$;

-- ============================================================================
-- TEST 7 — matches_audit trigger does NOT fire on INSERT
-- ============================================================================
-- Insert a new match. The trigger is AFTER UPDATE only — INSERTs should
-- never produce an audit row.

INSERT INTO public.matches (id, gameweek_id, gameweek_number, home_team, away_team, kickoff_time, status, season_year)
VALUES
    ('aa444444-4444-4444-4444-444444444444', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Newcastle', 'Everton', NOW() - INTERVAL '6 days', 'scheduled', '2025-26');

DO $$
DECLARE
    n INT;
BEGIN
    SELECT COUNT(*) INTO n
      FROM public.matches_audit
     WHERE match_id = 'aa444444-4444-4444-4444-444444444444';

    IF n IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 7 FAIL: INSERT should not create audit row, got %', n;
    END IF;
    RAISE NOTICE 'Test 7 PASS: matches_audit trigger correctly skipped INSERT';
END $$;

-- ============================================================================
-- TEST 8 — super-admin can SELECT from matches_audit
-- ============================================================================

SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" TO '22222222-2222-2222-2222-222222222222';

DO $$
DECLARE
    n INT;
BEGIN
    SELECT COUNT(*) INTO n FROM public.matches_audit;
    -- Tests 4 and 5 each inserted one row; test 6 and 7 inserted none.
    IF n IS DISTINCT FROM 2 THEN
        RAISE EXCEPTION 'Test 8 FAIL: super-admin SELECT matches_audit — expected 2 rows, got %', n;
    END IF;
    RAISE NOTICE 'Test 8 PASS: super-admin can SELECT from matches_audit (rows=%)', n;
END $$;

RESET ROLE;

-- ============================================================================
-- TEST 9 — regular authenticated user CANNOT SELECT from matches_audit
-- ============================================================================

SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" TO '11111111-1111-1111-1111-111111111111';

DO $$
DECLARE
    n INT;
BEGIN
    SELECT COUNT(*) INTO n FROM public.matches_audit;

    IF n IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 9 FAIL: regular user should see zero matches_audit rows, got %', n;
    END IF;
    RAISE NOTICE 'Test 9 PASS: regular user cannot SELECT matches_audit (RLS denies)';
END $$;

RESET ROLE;

-- ============================================================================
-- TEST 10 — authenticated user CANNOT INSERT into admin_audit_log
-- ============================================================================
-- There is no INSERT policy for authenticated. The INSERT must raise an
-- RLS error. We catch it in an EXCEPTION block and assert the error code.

SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" TO '22222222-2222-2222-2222-222222222222';  -- even a super-admin is blocked

DO $$
DECLARE
    insert_succeeded BOOLEAN := FALSE;
BEGIN
    BEGIN
        INSERT INTO public.admin_audit_log (caller_id, target_user_id, action, details)
        VALUES (
            '22222222-2222-2222-2222-222222222222',
            '33333333-3333-3333-3333-333333333333',
            'signout',
            '{"forged": true}'::jsonb
        );
        insert_succeeded := TRUE;
    EXCEPTION
        -- Narrow catch: only the expected denial codes.
        -- `insufficient_privilege` = GRANT revoked (42501).
        -- `check_violation` isn't expected here but including the specific
        -- codes guards against future schema drift masking real failures.
        WHEN insufficient_privilege THEN
            NULL;
    END;

    IF insert_succeeded THEN
        RAISE EXCEPTION 'Test 10 FAIL: authenticated user was able to INSERT into admin_audit_log';
    END IF;
    RAISE NOTICE 'Test 10 PASS: authenticated user cannot INSERT into admin_audit_log (RLS denies)';
END $$;

RESET ROLE;

-- ============================================================================
-- TEST 11 — authenticated user CANNOT INSERT into matches_audit
-- ============================================================================

SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" TO '22222222-2222-2222-2222-222222222222';

DO $$
DECLARE
    insert_succeeded BOOLEAN := FALSE;
BEGIN
    BEGIN
        INSERT INTO public.matches_audit (
            match_id, caller_id,
            before_home_score, before_away_score,
            after_home_score,  after_away_score,
            before_status,     after_status
        ) VALUES (
            'aa111111-1111-1111-1111-111111111111',
            '22222222-2222-2222-2222-222222222222',
            0, 0, 9, 9,
            'scheduled', 'completed'
        );
        insert_succeeded := TRUE;
    EXCEPTION
        -- Narrow catch: only the expected denial. Bare `OTHERS` would
        -- mask schema drift (e.g. a future CHECK constraint violation
        -- would silently appear to pass the test).
        WHEN insufficient_privilege THEN
            NULL;
    END;

    IF insert_succeeded THEN
        RAISE EXCEPTION 'Test 11 FAIL: authenticated user was able to INSERT into matches_audit';
    END IF;
    RAISE NOTICE 'Test 11 PASS: authenticated user cannot INSERT into matches_audit (RLS denies)';
END $$;

RESET ROLE;

-- ============================================================================
-- All tests passed if we got here. ROLLBACK to discard seeded data.
-- ============================================================================

DO $$ BEGIN RAISE NOTICE 'ALL TESTS PASSED — rolling back transaction.'; END $$;

ROLLBACK;
