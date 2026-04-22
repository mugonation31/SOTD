-- ============================================================================
-- !!  WARNING — DO NOT RUN AGAINST PRODUCTION
-- ----------------------------------------------------------------------------
-- This test file writes directly to public.sync_metadata (the singleton
-- cooldown row) and temporarily SETs LOCAL ROLE to authenticated to verify
-- the privilege REVOKE. The entire script is wrapped in BEGIN ... ROLLBACK
-- so nothing should persist — BUT:
--   1. If you paste sections individually and skip the final ROLLBACK;,
--      the synthetic timestamps will poison the cooldown window and block
--      real syncs for up to 5 minutes.
--   2. The script also writes to auth.users / profiles so the
--      `authenticated` privilege test has a valid session user. Those
--      rows use the fixed UUID 13000000-... to avoid colliding with the
--      010/011/012 test fixtures.
-- Recommended: run ONLY against a local Supabase or a disposable staging
-- project. If you must run in prod, execute the whole file in a single
-- transaction (don't split) and verify the ROLLBACK ran at the end:
--   SELECT * FROM auth.users WHERE id = '13000000-0000-0000-0000-000000000001';
--   -- should return zero rows.
-- ============================================================================
-- Test Script: 013_claim_sync_slot_test.sql
-- Description: Integration tests for migration 013 (claim_sync_slot RPC).
--              Verifies the atomic-claim behaviour that closes the TOCTOU
--              race in the sync-matches Edge Function.
--
-- Covers:
--   1. Fresh state (last_sync_at IS NULL) — first claim succeeds.
--   2. Concurrent claim blocked — a second call while status='in_progress'
--      returns claimed=FALSE, cooldown_remaining_seconds > 0, and
--      in_progress_since equal to the first claim's timestamp.
--   3. Cooldown expired — a claim 6 minutes after the last 'ok' sync
--      succeeds.
--   4. Error-retry bypass — a claim immediately after an 'error' status
--      succeeds without waiting out the 5-minute cooldown.
--   5. Privilege check — authenticated role cannot EXECUTE the function;
--      invocation raises insufficient_privilege (or permission denied).
--
-- Dependencies: migrations 001..013 applied.
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
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- SEED: auth.users + profiles for the privilege test (Test 5).
-- ----------------------------------------------------------------------------

INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
    ('13000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'claim-player@example.com', '', NOW(), NOW(), NOW());

INSERT INTO public.profiles (id, email, role, username, first_name, last_name)
VALUES
    ('13000000-0000-0000-0000-000000000001', 'claim-player@example.com', 'player', 'claim_player', 'Claim', 'Player');

-- ----------------------------------------------------------------------------
-- SEED: reset sync_metadata to the post-migration-008 seed state so every
-- test starts from a known baseline. Migration 008 seeds the singleton row
-- with all timestamp/status columns NULL.
-- ----------------------------------------------------------------------------

UPDATE public.sync_metadata
   SET last_sync_at     = NULL,
       last_sync_status = NULL,
       last_sync_error  = NULL
 WHERE id = 1;

-- ============================================================================
-- TEST 1 — Fresh state: first claim succeeds
-- ============================================================================
-- sync_metadata.last_sync_at IS NULL → predicate (a) matches → claim wins.
-- Expect claimed=TRUE, cooldown_remaining_seconds=0.

DO $$
DECLARE
    v_claimed BOOLEAN;
    v_remaining INTEGER;
    v_since TIMESTAMPTZ;
BEGIN
    SELECT claimed, cooldown_remaining_seconds, in_progress_since
      INTO v_claimed, v_remaining, v_since
      FROM public.claim_sync_slot();

    IF v_claimed IS DISTINCT FROM TRUE THEN
        RAISE EXCEPTION 'Test 1a FAIL: expected claimed=TRUE on fresh state, got %', v_claimed;
    END IF;
    IF v_remaining IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 1b FAIL: expected cooldown_remaining_seconds=0 on successful claim, got %', v_remaining;
    END IF;
    IF v_since IS NULL THEN
        RAISE EXCEPTION 'Test 1c FAIL: expected in_progress_since to be non-NULL on successful claim';
    END IF;

    RAISE NOTICE 'Test 1 PASS: fresh-state claim succeeds (claimed=%, remaining=%, since=%)',
        v_claimed, v_remaining, v_since;
END $$;

-- Verify the side-effect: sync_metadata.last_sync_status is now 'in_progress'.
DO $$
DECLARE
    v_status TEXT;
BEGIN
    SELECT last_sync_status INTO v_status FROM public.sync_metadata WHERE id = 1;
    IF v_status IS DISTINCT FROM 'in_progress' THEN
        RAISE EXCEPTION 'Test 1d FAIL: expected sync_metadata.last_sync_status=in_progress after claim, got %', v_status;
    END IF;
    RAISE NOTICE 'Test 1d PASS: sync_metadata flipped to in_progress';
END $$;

-- ============================================================================
-- TEST 2 — Concurrent claim blocked while status='in_progress'
-- ============================================================================
-- Test 1 claimed the slot, which stamped BOTH last_sync_status='in_progress'
-- AND last_sync_at=NOW() in a single atomic UPDATE. The second call below
-- must fail because every predicate branch is false:
--   (a) last_sync_at IS NOT NULL           -- stamped by Test 1's claim
--   (b) last_sync_at is ~0 seconds old      -- << 5 minutes
--   (c) last_sync_status is 'in_progress'   -- not 'error'
-- No test seed needed — the RPC's self-fencing behaviour handles it.

DO $$
DECLARE
    v_claimed BOOLEAN;
    v_remaining INTEGER;
    v_since TIMESTAMPTZ;
    v_expected_since TIMESTAMPTZ;
BEGIN
    SELECT last_sync_at INTO v_expected_since FROM public.sync_metadata WHERE id = 1;

    SELECT claimed, cooldown_remaining_seconds, in_progress_since
      INTO v_claimed, v_remaining, v_since
      FROM public.claim_sync_slot();

    IF v_claimed IS DISTINCT FROM FALSE THEN
        RAISE EXCEPTION 'Test 2a FAIL: expected claimed=FALSE when holder present, got %', v_claimed;
    END IF;
    IF v_remaining <= 0 THEN
        RAISE EXCEPTION 'Test 2b FAIL: expected cooldown_remaining_seconds > 0, got %', v_remaining;
    END IF;
    IF v_remaining > 300 THEN
        RAISE EXCEPTION 'Test 2c FAIL: expected cooldown_remaining_seconds <= 300 (5 minutes), got %', v_remaining;
    END IF;
    IF v_since IS DISTINCT FROM v_expected_since THEN
        RAISE EXCEPTION 'Test 2d FAIL: in_progress_since should match holder timestamp (expected %, got %)',
            v_expected_since, v_since;
    END IF;

    RAISE NOTICE 'Test 2 PASS: concurrent claim blocked (claimed=%, remaining=%s, since=%)',
        v_claimed, v_remaining, v_since;
END $$;

-- ============================================================================
-- TEST 3 — Cooldown expired allows new claim
-- ============================================================================
-- Seed last_sync_at = NOW() - 6 minutes, last_sync_status='ok'. Predicate
-- (b) matches (6 minutes > 5 minutes) → claim succeeds.

UPDATE public.sync_metadata
   SET last_sync_at     = NOW() - INTERVAL '6 minutes',
       last_sync_status = 'ok',
       last_sync_error  = NULL
 WHERE id = 1;

DO $$
DECLARE
    v_claimed BOOLEAN;
    v_remaining INTEGER;
BEGIN
    SELECT claimed, cooldown_remaining_seconds
      INTO v_claimed, v_remaining
      FROM public.claim_sync_slot();

    IF v_claimed IS DISTINCT FROM TRUE THEN
        RAISE EXCEPTION 'Test 3a FAIL: expected claimed=TRUE after cooldown expiry, got %', v_claimed;
    END IF;
    IF v_remaining IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 3b FAIL: expected cooldown_remaining_seconds=0 on successful claim, got %', v_remaining;
    END IF;
    RAISE NOTICE 'Test 3 PASS: cooldown-expired claim succeeds';
END $$;

-- Verify the side-effect.
DO $$
DECLARE
    v_status TEXT;
BEGIN
    SELECT last_sync_status INTO v_status FROM public.sync_metadata WHERE id = 1;
    IF v_status IS DISTINCT FROM 'in_progress' THEN
        RAISE EXCEPTION 'Test 3c FAIL: expected last_sync_status=in_progress after cooldown-expiry claim, got %', v_status;
    END IF;
    RAISE NOTICE 'Test 3c PASS: sync_metadata flipped to in_progress';
END $$;

-- ============================================================================
-- TEST 4 — Error status allows immediate retry
-- ============================================================================
-- Seed last_sync_at = NOW() (well within the cooldown window) but
-- last_sync_status='error'. Predicate (c) matches → claim succeeds
-- even though normally we'd be rate-limited.

UPDATE public.sync_metadata
   SET last_sync_at     = NOW(),
       last_sync_status = 'error',
       last_sync_error  = 'simulated football-data.org 500'
 WHERE id = 1;

DO $$
DECLARE
    v_claimed BOOLEAN;
    v_remaining INTEGER;
BEGIN
    SELECT claimed, cooldown_remaining_seconds
      INTO v_claimed, v_remaining
      FROM public.claim_sync_slot();

    IF v_claimed IS DISTINCT FROM TRUE THEN
        RAISE EXCEPTION 'Test 4a FAIL: expected claimed=TRUE when previous sync errored, got %', v_claimed;
    END IF;
    IF v_remaining IS DISTINCT FROM 0 THEN
        RAISE EXCEPTION 'Test 4b FAIL: expected cooldown_remaining_seconds=0 on successful claim, got %', v_remaining;
    END IF;
    RAISE NOTICE 'Test 4 PASS: error-status retry bypasses cooldown';
END $$;

-- ============================================================================
-- TEST 5 — authenticated role cannot EXECUTE the function
-- ============================================================================
-- The migration REVOKEs EXECUTE from PUBLIC/anon/authenticated and only
-- GRANTs to service_role. A player calling the RPC directly (e.g. via
-- supabase-js) must be rejected at the Postgres level.

SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" TO '13000000-0000-0000-0000-000000000001';

DO $$
DECLARE
    v_call_succeeded BOOLEAN := FALSE;
    v_claimed BOOLEAN;
BEGIN
    BEGIN
        SELECT claimed INTO v_claimed FROM public.claim_sync_slot();
        v_call_succeeded := TRUE;
    EXCEPTION
        -- Narrow catch: only the expected denial code (42501). Bare
        -- `OTHERS` would swallow schema drift and make this test a
        -- no-op against real failures.
        WHEN insufficient_privilege THEN
            NULL;
    END;

    IF v_call_succeeded THEN
        RAISE EXCEPTION 'Test 5 FAIL: authenticated user was able to EXECUTE claim_sync_slot()';
    END IF;
    RAISE NOTICE 'Test 5 PASS: authenticated user cannot EXECUTE claim_sync_slot() (privilege denied)';
END $$;

RESET ROLE;

-- ============================================================================
-- All tests passed if we got here. ROLLBACK to discard seeded data and
-- restore the sync_metadata singleton to whatever state it was in before.
-- ============================================================================

DO $$ BEGIN RAISE NOTICE 'ALL TESTS PASSED — rolling back transaction.'; END $$;

ROLLBACK;
