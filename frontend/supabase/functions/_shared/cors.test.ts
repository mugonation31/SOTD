/**
 * Spot-check Deno tests for corsHeaders().
 *
 * How to run:
 *   cd frontend/supabase/functions/_shared
 *   deno test cors.test.ts
 *
 * These tests are NOT part of the Jest test suite (that's Angular-only).
 * They're optional and intended for local verification that the CORS
 * helper's allowlist behaviour matches the spec. End-to-end validation
 * happens integration-style when 4.2.5.4 / 4.2.5.5 wire the helper into
 * sync-matches and admin-signout.
 *
 * Coverage:
 *   1. Allowed origin returns a fully-populated headers object.
 *   2. Disallowed origin returns null.
 *   3. Request with no Origin header returns null.
 */

import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { corsHeaders } from './cors.ts';

Deno.test('corsHeaders: returns headers for an allowed origin', () => {
  const req = new Request('https://example.test/', {
    headers: { origin: 'http://localhost:3048' },
  });

  const headers = corsHeaders(req);

  if (headers === null) {
    throw new Error('Expected headers object, got null');
  }
  assertEquals(headers['Access-Control-Allow-Origin'], 'http://localhost:3048');
  assertEquals(headers['Access-Control-Allow-Methods'], 'POST, OPTIONS');
  assertEquals(
    headers['Access-Control-Allow-Headers'],
    'authorization, x-client-info, apikey, content-type'
  );
  assertEquals(headers['Access-Control-Max-Age'], '86400');
  assertEquals(headers['Access-Control-Allow-Credentials'], 'true');
  assertEquals(headers['Vary'], 'Origin');
});

Deno.test('corsHeaders: returns null for a disallowed origin', () => {
  const req = new Request('https://example.test/', {
    headers: { origin: 'https://evil.example.com' },
  });

  const headers = corsHeaders(req);

  assertEquals(headers, null);
});

Deno.test('corsHeaders: returns null when request has no Origin header', () => {
  // Server-to-server request — no browser Origin. The caller treats
  // null as "no CORS needed" and responds without Allow-* headers.
  const req = new Request('https://example.test/');

  const headers = corsHeaders(req);

  assertEquals(headers, null);
});
