// Supabase Edge Function: sync-matches
// Fetches EPL match data from football-data.org and upserts into Supabase.
//
// Environment variables required:
//   FOOTBALL_DATA_API_KEY  - API key for football-data.org
//   SUPABASE_URL           - Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (bypasses RLS)
//
// ---------------------------------------------------------------------------
// COOLDOWN INVARIANT (Task 4.0.6)
// ---------------------------------------------------------------------------
// A 5-minute (300s) server-side cooldown is enforced via the singleton
// public.sync_metadata row (id = 1). Before each sync attempt:
//
//   1. Read sync_metadata.last_sync_at + last_sync_status.
//   2. If last_sync_at is within the last 300s AND last_sync_status != 'error',
//      reject with HTTP 429 and { ok: false, reason: 'cooldown',
//      cooldownRemainingSeconds: N }. football-data.org is NOT called.
//   3. Failed syncs (status = 'error') are exempt — the user can retry
//      immediately. NULL last_sync_at (never run) also bypasses cooldown.
//
// On every completed attempt (success or failure), sync_metadata is updated
// with last_sync_at = NOW() so subsequent calls see the cooldown window.
// Successful syncs clear last_sync_error; failed syncs record a sanitised
// message and set last_sync_status = 'error' (re-runnable immediately).

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

const COOLDOWN_SECONDS = 300; // 5 minutes — see COOLDOWN INVARIANT at top.

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
  const { error: updateError } = await supabase
    .from('sync_metadata')
    .update({
      last_sync_at: new Date().toISOString(),
      last_sync_status: status,
      last_sync_error: error,
    })
    .eq('id', 1);
  if (updateError) {
    console.error('Failed to update sync_metadata:', updateError);
  }
}

// ---------------------------------------------------------------------------
// Edge Function handler
// ---------------------------------------------------------------------------

serve(async (req: Request) => {
  // Only allow POST requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Authenticate: require a valid Supabase JWT or the service role key
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
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
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // -----------------------------------------------------------------------
    // Cooldown check (Task 4.0.6)
    // -----------------------------------------------------------------------
    // Read the singleton sync_metadata row. If the previous sync succeeded
    // within COOLDOWN_SECONDS, reject with HTTP 429. Errors are exempt so a
    // failed run can be retried immediately. A missing row or NULL
    // last_sync_at also bypasses the cooldown.
    const { data: meta, error: metaError } = await supabase
      .from('sync_metadata')
      .select('last_sync_at, last_sync_status')
      .eq('id', 1)
      .maybeSingle();

    if (metaError) {
      console.error('Failed to read sync_metadata:', metaError);
      return new Response(
        JSON.stringify({ ok: false, reason: 'sync_failed', error: 'Could not read sync metadata' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (meta?.last_sync_at && meta.last_sync_status !== 'error') {
      const elapsedSeconds = (Date.now() - new Date(meta.last_sync_at).getTime()) / 1000;
      if (elapsedSeconds < COOLDOWN_SECONDS) {
        const cooldownRemainingSeconds = Math.ceil(COOLDOWN_SECONDS - elapsedSeconds);
        return new Response(
          JSON.stringify({ ok: false, reason: 'cooldown', cooldownRemainingSeconds }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Fetch all PL matches for the current season
    const response = await fetch(
      'https://api.football-data.org/v4/competitions/PL/matches',
      { headers: { 'X-Auth-Token': apiKey } }
    );

    if (!response.ok) {
      const errMsg = `Football API returned ${response.status}: ${response.statusText}`;
      await recordSyncOutcome(supabase, 'error', sanitizeError(errMsg));
      return new Response(
        JSON.stringify({
          success: false,
          ok: false,
          reason: 'sync_failed',
          error: errMsg,
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
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
      await recordSyncOutcome(supabase, 'error', sanitizeError(errMsg));
      return new Response(
        JSON.stringify({
          success: false,
          ok: false,
          reason: 'sync_failed',
          error: errMsg,
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
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
        errors.push(`Gameweek ${matchday}: ${gwError.message}`);
        continue;
      }

      // Batch upsert all matches for this gameweek
      const dbMatches = matches.map((m) => mapApiMatchToDbMatch(m, gameweek.id, seasonYear));

      const { error: matchError } = await supabase
        .from('matches')
        .upsert(dbMatches, { onConflict: 'external_id' });

      if (matchError) {
        errors.push(`Gameweek ${matchday} matches: ${matchError.message}`);
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
      headers: { 'Content-Type': 'application/json' },
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
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
