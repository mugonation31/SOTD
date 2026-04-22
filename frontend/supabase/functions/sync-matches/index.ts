// Supabase Edge Function: sync-matches
// Fetches EPL match data from football-data.org and upserts into Supabase.
//
// Environment variables required:
//   FOOTBALL_DATA_API_KEY  - API key for football-data.org
//   SUPABASE_URL           - Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (bypasses RLS)
//
// ---------------------------------------------------------------------------
// COOLDOWN INVARIANT (Task 4.0.6 / Task 4.2.5.4)
// ---------------------------------------------------------------------------
// A 5-minute (300s) server-side cooldown is enforced via the singleton
// public.sync_metadata row (id = 1). The cooldown is claimed atomically
// via the `claim_sync_slot()` RPC (migration 013), which closes the TOCTOU
// race that existed in the previous read-then-act flow:
//
//   1. Call `supabase.rpc('claim_sync_slot')` as the first DB op.
//   2. RPC returns { claimed, cooldown_remaining_seconds, in_progress_since }.
//      - `claimed=true`  → we won the race; proceed to call football-data.org.
//      - `claimed=false` → either another caller holds the slot or the
//        cooldown window is still active. Reject with HTTP 429 and
//        { ok: false, reason: 'cooldown', cooldownRemainingSeconds: N }.
//        football-data.org is NOT called.
//   3. The RPC stamps BOTH `last_sync_status='in_progress'` AND
//      `last_sync_at=NOW()` in a single atomic UPDATE — no follow-through
//      is needed by this function to close the race.
//   4. Failed syncs (status = 'error') are exempt at claim time so a user
//      can retry immediately. NULL last_sync_at (never run) also bypasses.
//
// On every completed attempt (success or failure), `recordSyncOutcome`
// flips last_sync_status to 'ok' or 'error' and re-stamps last_sync_at.
// If this function crashes between claim and completion, the row stays in
// 'in_progress' — the 5-minute timeout on the NEXT claim attempt naturally
// unblocks it.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

// ---------------------------------------------------------------------------
// Mapping functions (inlined from frontend/src/app/core/utils/football-api-mapper.ts
// because Deno Edge Functions cannot import from the Angular project)
// ---------------------------------------------------------------------------

const DEADLINE_OFFSET_MS = 60 * 60 * 1000; // 1 hour before earliest kickoff

const STATUS_MAP: Record<string, string> = {
  SCHEDULED: 'scheduled',
  TIMED: 'scheduled',
  IN_PLAY: 'live',
  PAUSED: 'live',
  FINISHED: 'completed',
  CANCELLED: 'cancelled',
  POSTPONED: 'postponed',
};

function mapMatchStatus(apiStatus: string): string {
  return STATUS_MAP[apiStatus] ?? 'scheduled';
}

function calculateGameweekDeadline(matchDates: string[]): string {
  const earliest = matchDates
    .map((d) => new Date(d).getTime())
    .reduce((min, t) => Math.min(min, t), Infinity);
  const deadline = new Date(earliest - DEADLINE_OFFSET_MS);
  return deadline.toISOString();
}

function detectSpecialType(matchday: number, matchDates: string[]): string | null {
  if (matchday === 38) {
    return 'final-day';
  }
  const hasBoxingDay = matchDates.some((d) => {
    const date = new Date(d);
    return date.getUTCMonth() === 11 && date.getUTCDate() === 26;
  });
  if (hasBoxingDay) {
    return 'boxing-day';
  }
  return null;
}

function deriveSeasonYear(startDate: string, endDate: string): string {
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  return `${startYear}-${String(endYear).slice(2)}`;
}

interface ApiMatch {
  id: number;
  matchday: number;
  utcDate: string;
  status: string;
  homeTeam: { name: string; crest: string };
  awayTeam: { name: string; crest: string };
  score: { fullTime: { home: number | null; away: number | null } };
}

interface DbMatch {
  external_id: number;
  gameweek_id: string;
  gameweek_number: number;
  home_team: string;
  away_team: string;
  home_team_logo: string;
  away_team_logo: string;
  kickoff_time: string;
  status: string;
  home_score: number | null;
  away_score: number | null;
  season_year: string;
}

function mapApiMatchToDbMatch(apiMatch: ApiMatch, gameweekId: string, seasonYear: string): DbMatch {
  return {
    external_id: apiMatch.id,
    gameweek_id: gameweekId,
    gameweek_number: apiMatch.matchday,
    home_team: apiMatch.homeTeam.name,
    away_team: apiMatch.awayTeam.name,
    home_team_logo: apiMatch.homeTeam.crest,
    away_team_logo: apiMatch.awayTeam.crest,
    kickoff_time: apiMatch.utcDate,
    status: mapMatchStatus(apiMatch.status),
    home_score: apiMatch.score.fullTime.home,
    away_score: apiMatch.score.fullTime.away,
    season_year: seasonYear,
  };
}

function mapMatchdayToGameweek(matchday: number, apiMatches: ApiMatch[], seasonYear: string) {
  const matchDates = apiMatches.map((m) => m.utcDate);
  const sorted = [...matchDates].sort();
  const specialType = detectSpecialType(matchday, matchDates);

  return {
    gameweek_number: matchday,
    season_year: seasonYear,
    start_date: sorted[0],
    end_date: sorted[sorted.length - 1],
    deadline: calculateGameweekDeadline(matchDates),
    is_special: specialType !== null,
    special_type: specialType,
  };
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

// Cooldown window is enforced inside the `claim_sync_slot()` RPC
// (migration 013). See COOLDOWN INVARIANT at top of file.

// deno-lint-ignore no-explicit-any
type SupabaseClient = any;

// Strip newlines, control chars, and clamp length so error text is safe to
// store in sync_metadata.last_sync_error and return to the client.
function sanitizeError(message: unknown): string {
  const raw = message instanceof Error ? message.message : String(message ?? 'Unknown error');
  return raw.replace(/[\r\n\t]+/g, ' ').trim().slice(0, 500);
}

async function recordSyncOutcome(
  supabase: SupabaseClient,
  status: 'ok' | 'error',
  error: string | null
): Promise<void> {
  // Scope the completion write to the current holder. If status is no
  // longer 'in_progress' (e.g. a stale crashed sync's delayed write
  // lands after another claimer has taken over), skip the update so we
  // never overwrite a fresh holder's state with a stale result. This
  // closes the last race window around claim_sync_slot (migration 013).
  const { error: updateError, data } = await supabase
    .from('sync_metadata')
    .update({
      last_sync_at: new Date().toISOString(),
      last_sync_status: status,
      last_sync_error: error,
    })
    .eq('id', 1)
    .eq('last_sync_status', 'in_progress')
    .select();
  if (updateError) {
    console.error('Failed to update sync_metadata:', updateError);
    return;
  }
  if (!data || data.length === 0) {
    // Holder changed while this sync was running — log and move on.
    console.warn(
      'sync-matches: outcome write skipped; another claimer took over (stale completion)'
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

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { ...cors, 'Content-Type': 'application/json' } }
    );
  }

  // Authenticate: require a valid Supabase JWT or the service role key
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized' }),
      { status: 401, headers: { ...cors, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Validate environment variables
    const apiKey = Deno.env.get('FOOTBALL_DATA_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!apiKey || !supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required environment variables',
        }),
        { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // -----------------------------------------------------------------------
    // Atomic cooldown claim (Task 4.2.5.4 — migration 013)
    // -----------------------------------------------------------------------
    // Fences concurrent admins at the DB layer. The RPC flips
    // sync_metadata.last_sync_status to 'in_progress' and stamps
    // last_sync_at = NOW() in a single atomic UPDATE — if `claimed=false`,
    // another caller holds the slot (or cooldown is still active) and we
    // return 429 without hitting the football-data.org feed.
    const { data: claimRows, error: claimError } = await supabase.rpc('claim_sync_slot');

    if (claimError) {
      console.error('sync-matches: claim_sync_slot RPC failed', claimError.message);
      return new Response(
        JSON.stringify({
          ok: false,
          reason: 'sync_failed',
          error: 'Unable to check sync state',
        }),
        { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
      );
    }

    // PostgREST returns RPC results as an array even for single-row returns.
    const claim = Array.isArray(claimRows) ? claimRows[0] : claimRows;

    if (!claim?.claimed) {
      return new Response(
        JSON.stringify({
          ok: false,
          reason: 'cooldown',
          cooldownRemainingSeconds: claim?.cooldown_remaining_seconds ?? 0,
        }),
        { status: 429, headers: { ...cors, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch all PL matches for the current season
    const response = await fetch(
      'https://api.football-data.org/v4/competitions/PL/matches',
      { headers: { 'X-Auth-Token': apiKey } }
    );

    if (!response.ok) {
      const errMsg = `Football API returned ${response.status}: ${response.statusText}`;
      const safeErr = sanitizeError(errMsg);
      await recordSyncOutcome(supabase, 'error', safeErr);
      return new Response(
        JSON.stringify({
          success: false,
          ok: false,
          reason: 'sync_failed',
          error: safeErr,
        }),
        { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limiting headers
    const remainingCalls = parseInt(
      response.headers.get('X-Requests-Available-Minute') || '10',
      10
    );
    const resetSeconds = parseInt(
      response.headers.get('X-RequestCounter-Reset') || '60',
      10
    );

    if (remainingCalls <= 1) {
      console.log(
        `Rate limit near: ${remainingCalls} calls remaining. Reset in ${resetSeconds}s`
      );
    }

    const data = await response.json();

    if (!data.matches || !Array.isArray(data.matches)) {
      const errMsg = 'Unexpected API response: no matches array';
      const safeErr = sanitizeError(errMsg);
      await recordSyncOutcome(supabase, 'error', safeErr);
      return new Response(
        JSON.stringify({
          success: false,
          ok: false,
          reason: 'sync_failed',
          error: safeErr,
        }),
        { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } }
      );
    }

    // Derive season year from competition filters
    const seasonYear = data.filters?.season
      ? deriveSeasonYear(
          data.resultSet?.first || `${data.filters.season}-08-01`,
          data.resultSet?.last || `${Number(data.filters.season) + 1}-05-31`
        )
      : deriveSeasonYear(
          data.resultSet?.first || '2025-08-01',
          data.resultSet?.last || '2026-05-31'
        );

    // Group matches by matchday
    const matchesByDay = groupBy<ApiMatch>(data.matches, 'matchday');

    // Process each matchday
    let totalMatchesSynced = 0;
    let totalGameweeksSynced = 0;
    const errors: string[] = [];

    for (const [matchdayStr, matches] of Object.entries(matchesByDay)) {
      const matchday = parseInt(matchdayStr, 10);

      // Map to gameweek data
      const gameweekData = mapMatchdayToGameweek(matchday, matches, seasonYear);

      // Upsert gameweek (conflict on gameweek_number since it has a UNIQUE constraint)
      const { data: gameweek, error: gwError } = await supabase
        .from('gameweeks')
        .upsert(gameweekData, { onConflict: 'gameweek_number,season_year' })
        .select('id')
        .single();

      if (gwError) {
        // Sanitize raw Postgres error text before surfacing in the response
        // body — messages can embed constraint/schema names that leak
        // DB internals to API consumers.
        errors.push(`Gameweek ${matchday}: ${sanitizeError(gwError.message)}`);
        continue;
      }

      // Batch upsert all matches for this gameweek
      const dbMatches = matches.map((m) => mapApiMatchToDbMatch(m, gameweek.id, seasonYear));

      // Scoring hook: when this upsert flips a match's status to 'completed'
      // (or changes the scores on an already-completed match), migration 010's
      // `score_match_on_completion` trigger fires automatically and:
      //   1. Calls `score_predictions_for_match(match_id)` to populate
      //      `predictions.points_earned` for every prediction on this match
      //      via `calculate_prediction_points` (migration 005).
      //   2. Calls `recompute_group_member_aggregates(user_id)` for every user
      //      with a prediction on this match — updating `total_points`,
      //      `correct_scores`, `correct_results`, `gameweeks_played`, and the
      //      perfect-round bonus across ALL of that user's group_members rows.
      //
      // Idempotency: upserting the same completed match with the same scores
      // is a no-op at the DB level (row unchanged → trigger does not fire).
      // Upserting with corrected scores re-triggers scoring and aggregate
      // recompute from scratch — safe to run, no double-counting.
      //
      // Do NOT add a second scoring path here (e.g. an RPC call after this
      // upsert). Scoring lives in SQL for transactional safety; this function
      // is the dumb write path.
      const { error: matchError } = await supabase
        .from('matches')
        .upsert(dbMatches, { onConflict: 'external_id' });

      if (matchError) {
        errors.push(`Gameweek ${matchday} matches: ${sanitizeError(matchError.message)}`);
      } else {
        totalMatchesSynced += matches.length;
      }

      totalGameweeksSynced++;
    }

    const syncedAt = new Date().toISOString();

    // Record outcome in sync_metadata. Partial errors (some gameweeks failed)
    // are still recorded as 'error' so the user can immediately retry.
    if (errors.length === 0) {
      await recordSyncOutcome(supabase, 'ok', null);
    } else {
      await recordSyncOutcome(supabase, 'error', sanitizeError(errors.join('; ')));
    }

    const result = {
      success: errors.length === 0,
      ok: errors.length === 0,
      syncedAt,
      syncedGameweeks: totalGameweeksSynced,
      syncedMatches: totalMatchesSynced,
      // Legacy field names preserved for backwards compatibility.
      matchesSynced: totalMatchesSynced,
      gameweeksSynced: totalGameweeksSynced,
      rateLimitRemaining: remainingCalls,
      ...(errors.length > 0 && { reason: 'sync_failed', errors }),
    };

    return new Response(JSON.stringify(result), {
      status: errors.length === 0 ? 200 : 207, // 207 Multi-Status if partial errors
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('sync-matches error:', error);
    // Best-effort: re-create a service-role client and record the failure so
    // the cooldown does not block the next attempt. Wrapped in try/catch
    // because this path is already an error handler.
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await recordSyncOutcome(supabase, 'error', sanitizeError(error));
      }
    } catch (recordErr) {
      console.error('Failed to record sync error:', recordErr);
    }
    return new Response(
      JSON.stringify({
        success: false,
        ok: false,
        reason: 'sync_failed',
        error: 'Internal server error. Check function logs for details.',
      }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
    );
  }
});
