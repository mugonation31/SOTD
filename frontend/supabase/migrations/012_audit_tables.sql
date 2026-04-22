-- ============================================================================
-- Migration: 012_audit_tables
-- Description: Adds two append-only audit tables that together give us a
--              persistent, tamper-resistant trail of privileged activity on
--              the platform.
--
--                * admin_audit_log — written by Edge Functions running under
--                  the service_role key (e.g. admin-signout, and future
--                  privileged ops like deactivate / delete_group). One row
--                  per invocation, capturing caller + target + action + a
--                  sanitized JSONB details blob + timestamp.
--
--                * matches_audit — written by an AFTER-UPDATE trigger on
--                  public.matches. One row per score/status change, capturing
--                  the match id, the human caller (auth.uid() — may be NULL
--                  when the writer is service_role via the sync-matches
--                  Edge Function), before/after scores + statuses, and a
--                  timestamp.
--
-- Why 2 tables (and not one):
--   * Different write paths. admin_audit_log is written by Edge Function code
--     under the service_role key. matches_audit is written by a database
--     trigger that sees every UPDATE, regardless of who issued it.
--   * Different schemas. admin_audit_log's payload is action-specific and
--     lives in a free-form JSONB column. matches_audit is strictly typed
--     around a scalar score/status diff, which makes it queryable and easier
--     to reason about.
--   * Different retention / compliance needs down the road. Keeping them
--     separate avoids shoehorning both shapes into one table.
--
-- INSERT-only semantics:
--   Neither table has INSERT / UPDATE / DELETE policies for the authenticated
--   role. Writes happen exclusively via:
--     1. service_role (GRANT ALL → bypasses RLS entirely), OR
--     2. the SECURITY DEFINER trigger below (runs as function owner).
--   A regular authenticated user cannot forge audit rows and cannot rewrite
--   history. The SELECT grant gated by is_super_admin() lets super-admins
--   read the trail; everyone else sees nothing.
--
-- matches_audit trigger fires on UPDATE ONLY:
--   INSERT writes to public.matches come from the sync-matches Edge Function
--   under the service_role key. There is no human attribution to capture for
--   a sync insert (the football-data.org feed is the source of truth for
--   fixture creation), so we deliberately skip INSERT. UPDATE is where
--   humans touch the table — specifically, super-admin score corrections —
--   and that is exactly what we need the audit trail to prove.
--
-- auth.uid() in trigger context:
--   * When the UPDATE comes from sync-matches (service_role), auth.uid() is
--     NULL and the audit row records caller_id = NULL. That's semantically
--     correct — "no human caller".
--   * When the UPDATE comes from a super-admin acting through a
--     user-scoped session (e.g. the future score-correction console),
--     auth.uid() returns their id and the audit row records them.
--   * The trigger still fires in both cases — it always captures the
--     before/after delta. Attribution is simply NULL when there is no
--     authenticated user on the connection.
--
-- RLS model:
--   * ENABLE ROW LEVEL SECURITY on both tables.
--   * SELECT policy: is_super_admin() (reused from migration 001).
--   * No INSERT / UPDATE / DELETE policies → default-deny for authenticated.
--   * service_role gets GRANT ALL (bypasses RLS).
--   * authenticated gets GRANT SELECT (gated by the policy above).
--
-- Created: 2026-04-17
-- Dependencies:
--   * 001_profiles_table      (is_super_admin())
--   * 003_matches_table       (matches table — trigger target)
--   * (auth.users exists — FK target for caller_id / target_user_id)
--
-- Idempotent:
--   * CREATE TABLE IF NOT EXISTS for both tables.
--   * CREATE INDEX IF NOT EXISTS for every index.
--   * DROP POLICY IF EXISTS + CREATE POLICY for both RLS policies.
--   * CREATE OR REPLACE FUNCTION for the trigger body.
--   * DROP TRIGGER IF EXISTS + CREATE TRIGGER for the trigger itself
--     (Postgres has no CREATE OR REPLACE TRIGGER).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE: admin_audit_log
-- ----------------------------------------------------------------------------
-- caller_id / target_user_id are nullable so we can still record:
--   * Malformed inputs (target unresolved).
--   * Unauthenticated / invalid-session attempts (caller unresolved).
-- ON DELETE SET NULL on both FKs so a user deletion does NOT cascade-purge
-- the audit trail — history outlives accounts.

CREATE TABLE IF NOT EXISTS public.admin_audit_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    caller_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    target_user_id  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    -- Intentionally NOT a CHECK-constrained enum. Audit writes are
    -- fire-and-forget (Edge Function writeAudit swallows INSERT errors
    -- to keep the primary response path clean). If we constrain `action`
    -- to a fixed list, a future privileged op with a new action label
    -- would INSERT-fail silently, leaving the op untraced — defeating
    -- the whole point of this table. Keep as plain NOT NULL TEXT.
    -- Length cap protects against pathological writes (buggy or malicious
    -- caller inserting multi-MB strings) without constraining labels;
    -- 100 chars covers every realistic operation name many times over.
    action          TEXT NOT NULL CHECK (length(action) <= 100),
    details         JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.admin_audit_log IS
    'Append-only audit trail for privileged super-admin operations. Rows '
    'are written exclusively by Edge Functions under the service_role key. '
    'Super-admins read via RLS; no authenticated writer is permitted.';
COMMENT ON COLUMN public.admin_audit_log.caller_id IS
    'The super-admin who performed the action. NULL when the Edge Function '
    'could not resolve a caller (e.g. rejected unauthenticated attempt).';
COMMENT ON COLUMN public.admin_audit_log.target_user_id IS
    'The user acted upon (signed out, deactivated, etc.). NULL for malformed '
    'inputs or group-targeted actions where no single user is the target.';
COMMENT ON COLUMN public.admin_audit_log.action IS
    'Free-form action kind (e.g. signout, deactivate, delete_group). No '
    'CHECK constraint by design — writeAudit is fire-and-forget and a '
    'constraint violation would silently lose the audit row.';
COMMENT ON COLUMN public.admin_audit_log.details IS
    'Sanitized JSONB payload — reason, error summary, request id, etc. '
    'Must never contain secrets or PII beyond what is already audited.';

CREATE INDEX IF NOT EXISTS idx_admin_audit_log_caller
    ON public.admin_audit_log(caller_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_target
    ON public.admin_audit_log(target_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created
    ON public.admin_audit_log(created_at DESC);

-- ----------------------------------------------------------------------------
-- TABLE: matches_audit
-- ----------------------------------------------------------------------------
-- Strictly typed score/status diff. match_id cascades on delete because a
-- match that no longer exists has no meaningful audit context. caller_id
-- uses ON DELETE SET NULL for the same reason as admin_audit_log: history
-- outlives accounts.

CREATE TABLE IF NOT EXISTS public.matches_audit (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id           UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
    caller_id          UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    before_home_score  INTEGER,
    before_away_score  INTEGER,
    after_home_score   INTEGER,
    after_away_score   INTEGER,
    before_status      TEXT,
    after_status       TEXT,
    changed_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.matches_audit IS
    'Append-only audit trail of score/status changes on public.matches. '
    'Written by an AFTER UPDATE trigger only — INSERTs (feed-sync) are not '
    'audited because they have no human attribution.';
COMMENT ON COLUMN public.matches_audit.caller_id IS
    'auth.uid() at the moment of the UPDATE. NULL when the UPDATE comes '
    'from service_role (e.g. sync-matches Edge Function).';

CREATE INDEX IF NOT EXISTS idx_matches_audit_match
    ON public.matches_audit(match_id);
CREATE INDEX IF NOT EXISTS idx_matches_audit_changed
    ON public.matches_audit(changed_at DESC);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ----------------------------------------------------------------------------

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches_audit   ENABLE ROW LEVEL SECURITY;

-- Super-admin SELECT only. No INSERT/UPDATE/DELETE policies → default-deny
-- for the authenticated role. service_role bypasses RLS via GRANT ALL below.

DROP POLICY IF EXISTS "Super admins can read admin audit log" ON public.admin_audit_log;
CREATE POLICY "Super admins can read admin audit log" ON public.admin_audit_log
    FOR SELECT USING (public.is_super_admin());

DROP POLICY IF EXISTS "Super admins can read matches audit" ON public.matches_audit;
CREATE POLICY "Super admins can read matches audit" ON public.matches_audit
    FOR SELECT USING (public.is_super_admin());

-- ----------------------------------------------------------------------------
-- PERMISSIONS
-- ----------------------------------------------------------------------------
-- authenticated: SELECT grant exists but RLS gates it to super-admins only.
-- service_role:  full access, bypasses RLS. Used by Edge Functions.
-- anon:          no grants (implicit). Unauthenticated users see nothing.

GRANT SELECT ON public.admin_audit_log TO authenticated;
GRANT ALL    ON public.admin_audit_log TO service_role;

GRANT SELECT ON public.matches_audit   TO authenticated;
GRANT ALL    ON public.matches_audit   TO service_role;

-- ----------------------------------------------------------------------------
-- TRIGGER FUNCTION: trg_audit_match_update()
-- ----------------------------------------------------------------------------
-- Fires AFTER UPDATE ON public.matches. Writes a row to matches_audit ONLY
-- when the score or status actually changed — a NOOP UPDATE (e.g. an admin
-- UI re-saving an unchanged record, or the existing handle_matches_updated_at
-- trigger bumping updated_at) produces no audit row.
--
-- SECURITY DEFINER so the INSERT into matches_audit always succeeds
-- regardless of the acting user's RLS grants. Same pattern as the scoring
-- trigger in migration 010/011. REVOKE EXECUTE below ensures this function
-- is never RPC-callable.
--
-- auth.uid() is evaluated in the calling session's context:
--   * service_role connection  → NULL → caller_id = NULL (correct: no human).
--   * authenticated user       → their uid → caller_id = their id.

CREATE OR REPLACE FUNCTION public.trg_audit_match_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Only log when something auditable changed. IS DISTINCT FROM treats
    -- NULLs as ordinary values (NULL vs NULL -> NOT distinct), which is
    -- exactly what we want for pre-completion matches.
    IF NEW.home_score IS DISTINCT FROM OLD.home_score
       OR NEW.away_score IS DISTINCT FROM OLD.away_score
       OR NEW.status IS DISTINCT FROM OLD.status
    THEN
        INSERT INTO public.matches_audit (
            match_id,
            caller_id,
            before_home_score, before_away_score,
            after_home_score,  after_away_score,
            before_status,     after_status
        ) VALUES (
            NEW.id,
            auth.uid(),
            OLD.home_score, OLD.away_score,
            NEW.home_score, NEW.away_score,
            OLD.status,     NEW.status
        );
    END IF;

    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.trg_audit_match_update() IS
    'Trigger function: records before/after score + status on matches UPDATE '
    'when any of those three columns change. Captures auth.uid() (NULL when '
    'the writer is service_role). Fires on UPDATE only; INSERTs are not audited.';

-- ----------------------------------------------------------------------------
-- TRIGGER: audit_match_update
-- ----------------------------------------------------------------------------
-- AFTER UPDATE so the trigger runs against the committed NEW row. No WHEN
-- clause — the function body does the filtering. Coexists with the scoring
-- trigger (score_match_on_completion) from migrations 010/011: Postgres
-- fires AFTER UPDATE triggers in alphabetical order, so `audit_match_update`
-- runs before `score_match_on_completion`. Both are independent and idempotent.

DROP TRIGGER IF EXISTS audit_match_update ON public.matches;
CREATE TRIGGER audit_match_update
    AFTER UPDATE ON public.matches
    FOR EACH ROW
    EXECUTE FUNCTION public.trg_audit_match_update();

COMMENT ON TRIGGER audit_match_update ON public.matches IS
    'Writes a matches_audit row whenever home_score, away_score, or status '
    'changes. Captures auth.uid() as caller_id (NULL for service_role writes).';

-- ----------------------------------------------------------------------------
-- REVOKE trigger function from regular roles
-- ----------------------------------------------------------------------------
-- The trigger body runs under the function owner's privileges via SECURITY
-- DEFINER — it does not need EXECUTE on the function to fire. Removing
-- EXECUTE from authenticated / anon / PUBLIC means nobody can RPC-call this
-- function directly and forge audit rows on arbitrary matches.

REVOKE EXECUTE ON FUNCTION public.trg_audit_match_update()
    FROM PUBLIC, anon, authenticated;

-- ============================================================================
-- Migration Complete: 012_audit_tables
-- ============================================================================
