// Supabase Edge Function: admin-signout
// Terminates a target user's auth sessions when a super-admin deactivates
// them. Invoked from the super-admin user-management UI.
//
// Environment variables required:
//   SUPABASE_URL              - Supabase project URL
//   SUPABASE_ANON_KEY         - Supabase anon key (used for the JWT-scoped
//                               client that performs the role check)
//   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (used ONLY for
//                               the final auth.admin.signOut call). NEVER
//                               returned in responses or written to logs.
//
// ---------------------------------------------------------------------------
// AUTHORISATION MODEL
// ---------------------------------------------------------------------------
// Two Supabase clients are used to keep privilege escalation explicit:
//
//   1. supabaseUser: created with SUPABASE_ANON_KEY plus the caller's
//      Authorization: Bearer <jwt> header. RLS applies. We use this client
//      to look up the caller's profile row and verify role = 'super-admin'.
//      If the caller is not a super-admin, the request is rejected before
//      we ever instantiate the service-role client.
//
//   2. supabaseAdmin: created with SUPABASE_SERVICE_ROLE_KEY. Bypasses RLS
//      and exposes the auth admin API. Used ONLY to call
//      auth.admin.signOut(userId, 'global') on the target user. The key
//      itself never leaves this function.
//
// This split prevents a non-super-admin caller from ever causing a
// privileged operation to execute, and guarantees the service-role key
// stays inside the function boundary.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Strip newlines, control chars, and clamp length so error text is safe to
// return to the client and to write to logs.
function sanitizeError(message: unknown): string {
  const raw = message instanceof Error ? message.message : String(message ?? 'Unknown error');
  return raw.replace(/[\r\n\t]+/g, ' ').trim().slice(0, 500);
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ---------------------------------------------------------------------------
// Edge Function handler
// ---------------------------------------------------------------------------

serve(async (req: Request) => {
  // CORS preflight — match sync-matches behaviour (204 No Content).
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  // Method gate: only POST.
  if (req.method !== 'POST') {
    return jsonResponse({ ok: false, reason: 'method_not_allowed' }, 405);
  }

  // Auth header required.
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
      return jsonResponse(
        { ok: false, reason: 'server_misconfigured' },
        500
      );
    }

    // -----------------------------------------------------------------------
    // Step 1: Authorisation check using the caller's JWT (RLS-scoped client).
    // -----------------------------------------------------------------------
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userResult, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !userResult?.user) {
      console.warn('admin-signout: invalid JWT', sanitizeError(userError));
      return jsonResponse({ ok: false, reason: 'unauthorized' }, 401);
    }

    const callerId = userResult.user.id;

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
      return jsonResponse({ ok: false, reason: 'forbidden' }, 403);
    }

    if (!profile || profile.role !== 'super-admin') {
      console.warn(
        'admin-signout: non-super-admin attempted signout',
        { callerId, role: profile?.role ?? null }
      );
      return jsonResponse({ ok: false, reason: 'forbidden' }, 403);
    }

    // -----------------------------------------------------------------------
    // Step 2: Parse + validate body.
    // -----------------------------------------------------------------------
    let body: { userId?: unknown };
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ ok: false, reason: 'invalid_user_id' }, 400);
    }

    const targetUserId = body?.userId;
    if (typeof targetUserId !== 'string' || !UUID_REGEX.test(targetUserId)) {
      return jsonResponse({ ok: false, reason: 'invalid_user_id' }, 400);
    }

    // -----------------------------------------------------------------------
    // Step 3: Perform global signout with the service-role client.
    // -----------------------------------------------------------------------
    // The service-role key is created here (after auth + authz pass) and
    // is never returned to the caller or logged.
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { error: signOutError } = await supabaseAdmin.auth.admin.signOut(
      targetUserId,
      'global'
    );

    if (signOutError) {
      console.error(
        'admin-signout: signOut failed',
        { callerId, targetUserId, error: sanitizeError(signOutError) }
      );
      return jsonResponse(
        {
          ok: false,
          reason: 'signout_failed',
          error: sanitizeError(signOutError),
        },
        500
      );
    }

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
