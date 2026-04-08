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

export function mapMatchStatus(apiStatus: string): string {
  return STATUS_MAP[apiStatus] ?? 'scheduled';
}

export function calculateGameweekDeadline(matchDates: string[]): string {
  const earliest = matchDates
    .map((d) => new Date(d).getTime())
    .reduce((min, t) => Math.min(min, t), Infinity);
  const deadline = new Date(earliest - DEADLINE_OFFSET_MS);
  return deadline.toISOString();
}

export function detectSpecialType(matchday: number, matchDates: string[]): string | null {
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

export function mapApiMatchToDbMatch(
  apiMatch: any,
  gameweekId: string,
  seasonYear: string
): object {
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

export function deriveSeasonYear(startDate: string, endDate: string): string {
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  return `${startYear}-${String(endYear).slice(2)}`;
}

export function mapMatchdayToGameweek(
  matchday: number,
  apiMatches: any[],
  seasonYear: string
): object {
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
