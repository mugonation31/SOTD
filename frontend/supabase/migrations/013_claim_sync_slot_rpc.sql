-- ============================================================================
-- Migration: 013_claim_sync_slot_rpc
-- Description: Adds claim_sync_slot() — an atomic RPC that closes the TOCTOU
--              race in the sync-matches Edge Function.
--
-- Problem:
--   The current flow in functions/sync-matches/index.ts reads sync_metadata,
--   branches on whether the cooldown has expired, and only then calls
--   football-data.org. Two super-admins hitting the sync button within a
--   millisecond of each other can both observe `last_sync_at > 5 minutes ago`
--   and both proceed — burning two requests from our finite football-data.org
--   quota (10 requests / minute on the free tier). The read-then-act gap is
--   a classic TOCTOU race.
--
-- Solution:
--   A single UPDATE ... WHERE ... RETURNING that atomically flips
--   sync_metadata.last_sync_status to 'in_progress' only if the cooldown
--   predicate is TRUE at the moment of the UPDATE. Postgres serializes
--   concurrent UPDATEs on the same row — exactly one caller wins and gets
--   ROW_COUNT = 1; the loser gets ROW_COUNT = 0 and must back off.
--
--   The 'in_progress' status value already exists in the sync_metadata
--   CHECK constraint (migration 008) but was previously dead code. This
--   RPC wires it up: the Edge Function calls claim_sync_slot() as the
--   first step of a sync attempt; on claim_sync_slot() returning
--   claimed = TRUE the function proceeds, and on completion it writes
--   status = 'ok' or 'error' back itself.
--
-- Return shape:
--   claimed                     BOOLEAN     — TRUE if we won the race.
--   cooldown_remaining_seconds  INTEGER     — seconds until the next claim
--                                             would be permitted (0 when
--                                             claimed = TRUE, always >= 0).
--   in_progress_since           TIMESTAMPTZ — when the current holder
--                                             flipped to 'in_progress';
--                                             non-NULL ONLY when we lost
--                                             to another in-flight sync,
--                                             so the UI can show a stuck-
--                                             sync banner if it lingers.
--
-- Cooldown predicate:
--   We claim iff at least one of:
--     (a) last_sync_at IS NULL           (never synced — seed state)
--     (b) last_sync_at < NOW() - 5 min   (normal cooldown expired)
--     (c) last_sync_status = 'error'     (previous attempt failed;
--                                         allow immediate retry without
--                                         making the admin wait 5 minutes
--                                         for a transient feed glitch)
--
-- Why SECURITY DEFINER:
--   The Edge Function calls this RPC under the service_role key, which
--   bypasses RLS via GRANT anyway. But following the established convention
--   (see 007 mark_joker_used, 010 trg_score_match) we mark all write-path
--   helpers SECURITY DEFINER + REVOKE-then-GRANT to service_role only, so
--   this function cannot be invoked by anon / authenticated callers even if
--   the GRANT is accidentally widened later.
--
-- Privileges:
--   - REVOKE EXECUTE from PUBLIC, anon, authenticated (Postgres defaults
--     grant EXECUTE to PUBLIC — we pull that back first).
--   - GRANT EXECUTE to service_role (the only legitimate caller — the
--     sync-matches Edge Function).
--
-- Created: 2026-04-17
-- Dependencies:
--   * 008_superadmin_infrastructure (sync_metadata table + singleton seed)
--
-- Idempotent:
--   * CREATE OR REPLACE FUNCTION makes the file safe to re-apply.
--   * REVOKE ... FROM ... is a no-op when the grants already absent.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.claim_sync_slot()
RETURNS TABLE (
    claimed BOOLEAN,
    cooldown_remaining_seconds INTEGER,
    in_progress_since TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_updated_rows INTEGER;
    v_current_row public.sync_metadata%ROWTYPE;
BEGIN
    -- Atomic claim. Exactly one concurrent caller can match this predicate
    -- on the singleton row (id = 1) because Postgres serializes UPDATEs
    -- on the same row — the second caller re-reads post-commit and fails
    -- the predicate (both `last_sync_status = 'in_progress'` AND the
    -- freshly-stamped `last_sync_at` close the gate).
    --
    -- CRITICAL: we stamp `last_sync_at = NOW()` here, INSIDE the atomic
    -- UPDATE, so the second caller's predicate re-check also fails on the
    -- timestamp arm (`last_sync_at < NOW() - 5min`). If we only flipped
    -- status, a second caller could slip through during the brief window
    -- before the Edge Function updates the timestamp on completion.
    -- Stamping here makes the claim self-sufficient — no follow-up UPDATE
    -- by the caller is required to maintain the fencing invariant.
    --
    -- Side-effect: on completion (success or error), the Edge Function's
    -- `recordSyncOutcome` helper overwrites `last_sync_at` again. This is
    -- intentional: the timestamp now represents "most recent sync activity"
    -- (start OR end) — same concept, different phase. The 5-minute cooldown
    -- window is measured from the most recent activity, which is what we
    -- want semantically (no sync more often than once per 5 min regardless
    -- of whether the previous attempt succeeded, failed, or is still running).
    UPDATE public.sync_metadata
       SET last_sync_status = 'in_progress',
           last_sync_at = NOW(),
           updated_at = NOW()
     WHERE id = 1
       AND (
         last_sync_at IS NULL
         OR last_sync_at < NOW() - INTERVAL '5 minutes'
         OR last_sync_status = 'error'
       );

    GET DIAGNOSTICS v_updated_rows = ROW_COUNT;

    IF v_updated_rows = 1 THEN
        -- Claimed: 0 remaining cooldown, in_progress_since = NOW() since
        -- we just flipped the status. NULL is reserved for "the holder
        -- is someone else" below.
        RETURN QUERY SELECT TRUE, 0, NOW();
        RETURN;
    END IF;

    -- Lost the race (or cooldown still active). Read the current state to
    -- compute remaining seconds and report in_progress_since so the UI
    -- can differentiate "another admin is syncing right now" from
    -- "cooldown window is still open".
    SELECT * INTO v_current_row FROM public.sync_metadata WHERE id = 1;

    IF v_current_row.last_sync_at IS NULL THEN
        -- Row exists but last_sync_at is NULL AND we failed to claim.
        -- This shouldn't happen post-seed — but if it does (e.g. someone
        -- reset the row manually), return a safe default rather than
        -- divide-by-zero the caller.
        RETURN QUERY SELECT FALSE, 0, NULL::TIMESTAMPTZ;
        RETURN;
    END IF;

    RETURN QUERY SELECT
        FALSE,
        GREATEST(
            0,
            CAST(EXTRACT(EPOCH FROM (v_current_row.last_sync_at + INTERVAL '5 minutes' - NOW())) AS INTEGER)
        ),
        CASE WHEN v_current_row.last_sync_status = 'in_progress'
             THEN v_current_row.last_sync_at
             ELSE NULL::TIMESTAMPTZ
        END;
END;
$$;

COMMENT ON FUNCTION public.claim_sync_slot() IS
    'Atomically claims the sync_metadata cooldown slot. Returns claimed=TRUE '
    'if the caller successfully flipped status to in_progress, FALSE if '
    'another caller holds it or cooldown is active. Closes the TOCTOU race '
    'in the sync-matches Edge Function. See migration 013 header.';

-- Pull back the default PUBLIC EXECUTE grant so anon / authenticated cannot
-- RPC-invoke this function and burn cooldown slots. Only service_role (the
-- Edge Function key) should ever call this.
REVOKE EXECUTE ON FUNCTION public.claim_sync_slot() FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.claim_sync_slot() TO service_role;

-- ============================================================================
-- Migration Complete: 013_claim_sync_slot_rpc
-- ============================================================================
