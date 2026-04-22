// Supabase Edge Function: admin-signout
// Terminates a target user's auth sessions when a super-admin deactivates
// them. Invoked from the super-admin user-management UI.
//
// Environment variables required:
//   SUPABASE_URL              - Supabase project URL
//   SUPABASE_ANON_KEY         - Supabase anon key (used for the JWT-scoped
//                               client that performs the role check)
//   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (used for the
//                               final auth.admin.signOut call AND for the
//                               admin_audit_log INSERT). NEVER returned in
//                               responses or written to logs.
//
// ---------------------------------------------------------------------------
// AUTHORISATION MODEL
// ---------------------------------------------------------------------------
// Two Supabase clients are used to keep privilege escalation explicit:
//
//   1. supabaseUser: created with SUPABASE_ANON_KEY plus the caller's
//      Authorization: Bearer <jwt> header. RLS applies. We use this client
//      to look up the caller's profile row and verify role = 'super-admin'.
//      If the caller is not a super-admin, the request is rejected AND an
//      audit row is written before returning 403.
//
//   2. supabaseAdmin: created with SUPABASE_SERVICE_ROLE_KEY. Bypasses RLS
//      and exposes the auth admin API. Used for:
//        - auth.admin.signOut(userId, 'global') on the target user, AND
//        - INSERT into public.admin_audit_log for every terminal outcome
//          reached after authentication succeeds.
//      The key itself never leaves this function.
//
// ---------------------------------------------------------------------------
// AUDIT TRAIL (Task 4.2.5.5)
// ---------------------------------------------------------------------------
// Every authenticated attempt that reaches the parse/role/signout stages
// writes exactly one row to public.admin_audit_log with action='signout'
// and a details JSONB describing the outcome. Coverage:
//
//   * invalid_user_id  → body parse or UUID validation failed.
//                        target_user_id = NULL, caller_id = resolved.
//   * forbidden        → caller is authenticated but not a super-admin.
//                        target_user_id = parsed UUID, caller_id = resolved.
//   * ok               → signout succeeded.
//   * signout_failed   → service_role signOut call errored.
//
// Unauthenticated requests (no Bearer, invalid JWT) are rejected with 401
// BEFORE the audit stage — we deliberately do not log drive-by probes to
// keep the audit table signal-to-noise high. Authenticated reconnaissance
// (malformed body from a real session, non-super-admin role probing) IS
// logged because those are meaningful signals.
//
// Audit writes are fire-and-forget: wrapped in try/catch with failures
// logged to console.error only. A failing INSERT must NEVER prevent the
// primary response from reaching the caller.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

// Stricter than Postgres's UUID parser by design: accepts only RFC 4122
// variants 1-5 with the `[89ab]` variant bits. Postgres would also accept
// variant 6-8 / nil / max UUIDs, but no Supabase-issued user ID falls
// outside this range, so tightening here catches malformed-by-convention
// input before it touches the role-check path.
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Strip newlines, control chars, and clamp length so error text is safe to
// return to the client, write to logs, and persist in audit details.
function sanitizeError(message: unknown): string {
  const raw = message instanceof Error ? message.message : String(message ?? 'Unknown error');
  return raw.replace(/[\r\n\t]+/g, ' ').trim().slice(0, 500);
}

// deno-lint-ignore no-explicit-any
type SupabaseClient = any;

interface AuditEntry {
  caller_id: string | null;
  target_user_id: string | null;
  action: 'signout';
  details: Record<string, unknown>;
}

// Fire-and-forget audit write. A failing INSERT must NEVER prevent the
// primary Response from reaching the caller — errors are logged (sanitized)
// and swallowed. The row is persisted before the Response is returned so
// the trail survives a mid-response caller disconnect.
async function writeAudit(
  supabaseAdmin: SupabaseClient,
  entry: AuditEntry
): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from('admin_audit_log').insert(entry);
    if (error) {
      console.error('admin-signout: audit insert failed:', sanitizeError(error.message));
    }
  } catch (err) {
    console.error(
      'admin-signout: audit insert threw:',
      err instanceof Error ? sanitizeError(err.message) : sanitizeError(String(err))
    );
  }
}

// ---------------------------------------------------------------------------
// Edge Function handler
// ---------------------------------------------------------------------------

serve(async (req: Request) => {
  // Handle CORS preflight FIRST — browsers send OPTIONS with no Authorization
  // header, so this must come before the auth check below. See _shared/cors.ts
  // for the allowlist contract; `null` means origin absent or not allowed, in
  // which case we echo no CORS headers and the browser blocks the request.
  if (req.method === 'OPTIONS') {
    const preflightCors = corsHeaders(req);
    return new Response(null, { status: 204, headers: preflightCors ?? {} });
  }

  // Hoist CORS headers once for reuse across every response site below.
  // When `corsHeaders` returns null (no Origin header, e.g. server-to-server
  // curl, or origin not on allowlist), we fall back to `{}` so the header
  // spread is a no-op rather than a crash.
  const cors = corsHeaders(req) ?? {};

  const jsonResponse = (body: unknown, status: number): Response =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });

  // Method gate: only POST.
  if (req.method !== 'POST') {
    return jsonResponse({ ok: false, reason: 'method_not_allowed' }, 405);
  }

  // Auth header required. Unauthenticated requests are rejected here WITHOUT
  // an audit row — see AUDIT TRAIL notes at top of file.
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return jsonResponse({ ok: false, reason: 'unauthorized' }, 401);
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      console.error('admin-signout: missing required environment variables');
      return jsonResponse({ ok: false, reason: 'server_misconfigured' }, 500);
    }

    // -----------------------------------------------------------------------
    // Step 1: Resolve caller identity from JWT (RLS-scoped client).
    // -----------------------------------------------------------------------
    // Unauthenticated / invalid JWTs are rejected here with 401 and no audit
    // row (see AUDIT TRAIL notes). Everything past this point has a resolved
    // caller_id that we pin to each audit entry.
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userResult, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !userResult?.user) {
      console.warn('admin-signout: invalid JWT', sanitizeError(userError));
      return jsonResponse({ ok: false, reason: 'unauthorized' }, 401);
    }

    const callerId: string = userResult.user.id;

    // Service-role client — used for auth.admin.signOut AND for every audit
    // INSERT from this point onward. Created eagerly (after auth succeeds)
    // so the audit writer is available for the invalid_user_id branch below.
    // The key itself never leaves this function scope.
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // -----------------------------------------------------------------------
    // Step 2: Parse + validate body BEFORE the role check.
    // -----------------------------------------------------------------------
    // Reconnaissance attempts (authenticated caller, malformed body) must
    // leave a trace in the audit log. We parse + validate first so a
    // non-super-admin fishing for behaviour with a bad UUID still produces
    // an invalid_user_id audit row rather than a forbidden one — the more
    // specific signal wins.
    let body: { userId?: unknown };
    try {
      body = await req.json();
    } catch {
      await writeAudit(supabaseAdmin, {
        caller_id: callerId,
        target_user_id: null,
        action: 'signout',
        details: { outcome: 'invalid_user_id', reason: 'body_parse_failed' },
      });
      return jsonResponse({ ok: false, reason: 'invalid_user_id' }, 400);
    }

    const targetUserIdRaw = body?.userId;
    if (typeof targetUserIdRaw !== 'string' || !UUID_REGEX.test(targetUserIdRaw)) {
      await writeAudit(supabaseAdmin, {
        caller_id: callerId,
        target_user_id: null,
        action: 'signout',
        details: { outcome: 'invalid_user_id' },
      });
      return jsonResponse({ ok: false, reason: 'invalid_user_id' }, 400);
    }

    const targetUserId: string = targetUserIdRaw;

    // -----------------------------------------------------------------------
    // Step 3: Role check — only super-admins may proceed.
    // -----------------------------------------------------------------------
    const { data: profile, error: profileError } = await supabaseUser
      .from('profiles')
      .select('role')
      .eq('id', callerId)
      .maybeSingle();

    if (profileError) {
      console.error(
        'admin-signout: profile lookup failed for caller',
        callerId,
        sanitizeError(profileError)
      );
      await writeAudit(supabaseAdmin, {
        caller_id: callerId,
        target_user_id: targetUserId,
        action: 'signout',
        details: { outcome: 'forbidden', reason: 'profile_lookup_failed' },
      });
      return jsonResponse({ ok: false, reason: 'forbidden' }, 403);
    }

    if (!profile || profile.role !== 'super-admin') {
      console.warn(
        'admin-signout: non-super-admin attempted signout',
        { callerId, role: profile?.role ?? null }
      );
      await writeAudit(supabaseAdmin, {
        caller_id: callerId,
        target_user_id: targetUserId,
        action: 'signout',
        details: { outcome: 'forbidden', role: profile?.role ?? null },
      });
      return jsonResponse({ ok: false, reason: 'forbidden' }, 403);
    }

    // -----------------------------------------------------------------------
    // Step 4: Perform global signout with the service-role client.
    // -----------------------------------------------------------------------
    const { error: signOutError } = await supabaseAdmin.auth.admin.signOut(
      targetUserId,
      'global'
    );

    if (signOutError) {
      const sanitized = sanitizeError(signOutError);
      console.error(
        'admin-signout: signOut failed',
        { callerId, targetUserId, error: sanitized }
      );
      await writeAudit(supabaseAdmin, {
        caller_id: callerId,
        target_user_id: targetUserId,
        action: 'signout',
        details: { outcome: 'signout_failed', error: sanitized },
      });
      return jsonResponse(
        { ok: false, reason: 'signout_failed', error: sanitized },
        500
      );
    }

    await writeAudit(supabaseAdmin, {
      caller_id: callerId,
      target_user_id: targetUserId,
      action: 'signout',
      details: { outcome: 'ok' },
    });
    console.log('admin-signout: success', { callerId, targetUserId });
    return jsonResponse({ ok: true }, 200);
  } catch (error) {
    console.error('admin-signout: unexpected error', sanitizeError(error));
    return jsonResponse(
      {
        ok: false,
        reason: 'signout_failed',
        error: 'Internal server error. Check function logs for details.',
      },
      500
    );
  }
});
