// Supabase Edge Function: sync-matches
// Fetches EPL match data from football-data.org and upserts into Supabase.
//
// Environment variables required:
//   FOOTBALL_DATA_API_KEY  - API key for football-data.org
//   SUPABASE_URL           - Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (bypasses RLS)

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

    // Fetch all PL matches for the current season
    const response = await fetch(
      'https://api.football-data.org/v4/competitions/PL/matches',
      { headers: { 'X-Auth-Token': apiKey } }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Football API returned ${response.status}: ${response.statusText}`,
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
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Unexpected API response: no matches array',
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

    const result = {
      success: errors.length === 0,
      matchesSynced: totalMatchesSynced,
      gameweeksSynced: totalGameweeksSynced,
      rateLimitRemaining: remainingCalls,
      ...(errors.length > 0 && { errors }),
    };

    return new Response(JSON.stringify(result), {
      status: errors.length === 0 ? 200 : 207, // 207 Multi-Status if partial errors
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('sync-matches error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error. Check function logs for details.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
