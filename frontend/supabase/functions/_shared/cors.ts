/**
 * Shared CORS helper for Supabase Edge Functions.
 *
 * Allowlist-based — never uses `*` because credentials-bearing requests
 * (cookies, Authorization headers) require a specific origin echo. The
 * default allowlist covers local dev + the current Cloudflare Pages
 * production URL. Additional origins (custom domain, preview builds)
 * can be added via the ALLOWED_ORIGINS env var as a comma-separated list.
 *
 * Consumers:
 *   - functions/sync-matches/index.ts (task 4.2.5.4)
 *   - functions/admin-signout/index.ts (task 4.2.5.5)
 *
 * Return contract:
 *   corsHeaders(req) returns a headers object when the Origin header
 *   is on the allowlist, or null when either the header is missing
 *   or the origin is not allowed. Callers use null to distinguish
 *   "no CORS needed" (server-to-server, no Origin) from "origin
 *   blocked" (browser preflight will fail at the network layer).
 */

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:3048', // dev Docker
  'http://localhost:8080', // prod Docker local
  'https://sotd-bl7.pages.dev', // Cloudflare Pages production
];

function getAllowedOrigins(): string[] {
  const envOrigins = Deno.env.get('ALLOWED_ORIGINS') ?? '';
  const extra = envOrigins
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return [...DEFAULT_ALLOWED_ORIGINS, ...extra];
}

/**
 * Returns a headers object with CORS headers set for the given request's
 * Origin header, IF that origin is on the allowlist. Returns null for
 * disallowed origins (browser will block the preflight with no
 * Allow-Origin in the response).
 *
 * Usage in an Edge Function:
 *   const cors = corsHeaders(req);
 *   if (req.method === 'OPTIONS') {
 *     return new Response(null, { status: 204, headers: cors ?? {} });
 *   }
 *   return new Response(JSON.stringify(payload), {
 *     status: 200,
 *     headers: { ...cors, 'content-type': 'application/json' },
 *   });
 */
export function corsHeaders(req: Request): Record<string, string> | null {
  const origin = req.headers.get('origin');
  if (!origin) return null;

  const allowed = getAllowedOrigins();
  if (!allowed.includes(origin)) return null;

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'true',
    Vary: 'Origin',
  };
}
