import {
  mapMatchStatus,
  calculateGameweekDeadline,
  detectSpecialType,
  mapApiMatchToDbMatch,
  deriveSeasonYear,
  mapMatchdayToGameweek,
} from './football-api-mapper';

describe('football-api-mapper', () => {
  describe('mapMatchStatus', () => {
    it('should map SCHEDULED status to scheduled', () => {
      expect(mapMatchStatus('SCHEDULED')).toBe('scheduled');
    });

    it('should map TIMED status to scheduled', () => {
      expect(mapMatchStatus('TIMED')).toBe('scheduled');
    });

    it('should map IN_PLAY status to live', () => {
      expect(mapMatchStatus('IN_PLAY')).toBe('live');
    });

    it('should map PAUSED status to live', () => {
      expect(mapMatchStatus('PAUSED')).toBe('live');
    });

    it('should map FINISHED status to completed', () => {
      expect(mapMatchStatus('FINISHED')).toBe('completed');
    });

    it('should map CANCELLED status to cancelled', () => {
      expect(mapMatchStatus('CANCELLED')).toBe('cancelled');
    });

    it('should map POSTPONED status to postponed', () => {
      expect(mapMatchStatus('POSTPONED')).toBe('postponed');
    });

    it('should default unknown status to scheduled', () => {
      expect(mapMatchStatus('SOME_UNKNOWN_STATUS')).toBe('scheduled');
    });
  });

  describe('calculateGameweekDeadline', () => {
    it('should calculate gameweek deadline as 1hr before earliest kickoff', () => {
      const matchDates = [
        '2025-12-20T15:00:00Z',
        '2025-12-20T12:30:00Z',
        '2025-12-20T17:30:00Z',
      ];
      const deadline = calculateGameweekDeadline(matchDates);
      expect(deadline).toBe('2025-12-20T11:30:00.000Z');
    });
  });

  describe('detectSpecialType', () => {
    it('should detect Boxing Day gameweek (matches on Dec 26)', () => {
      const matchDates = [
        '2025-12-26T12:30:00Z',
        '2025-12-26T15:00:00Z',
        '2025-12-26T17:30:00Z',
      ];
      expect(detectSpecialType(18, matchDates)).toBe('boxing-day');
    });

    it('should detect Final Day gameweek (matchday 38)', () => {
      const matchDates = ['2026-05-24T15:00:00Z'];
      expect(detectSpecialType(38, matchDates)).toBe('final-day');
    });

    it('should return null special type for normal gameweek', () => {
      const matchDates = ['2025-10-04T15:00:00Z'];
      expect(detectSpecialType(7, matchDates)).toBeNull();
    });
  });

  describe('mapApiMatchToDbMatch', () => {
    const sampleApiMatch = {
      id: 12345,
      matchday: 10,
      utcDate: '2025-11-08T15:00:00Z',
      status: 'FINISHED',
      homeTeam: { name: 'Arsenal FC', crest: 'https://crests.football-data.org/57.png' },
      awayTeam: { name: 'Chelsea FC', crest: 'https://crests.football-data.org/61.png' },
      score: {
        fullTime: { home: 2, away: 1 },
      },
    };

    it('should map football-data.org match to our DB match format', () => {
      const result = mapApiMatchToDbMatch(sampleApiMatch, 'gw-uuid-123', '2025-26');
      expect(result).toEqual({
        external_id: 12345,
        gameweek_id: 'gw-uuid-123',
        gameweek_number: 10,
        home_team: 'Arsenal FC',
        away_team: 'Chelsea FC',
        home_team_logo: 'https://crests.football-data.org/57.png',
        away_team_logo: 'https://crests.football-data.org/61.png',
        kickoff_time: '2025-11-08T15:00:00Z',
        status: 'completed',
        home_score: 2,
        away_score: 1,
        season_year: '2025-26',
      });
    });

    it('should handle null scores for scheduled matches', () => {
      const scheduledMatch = {
        ...sampleApiMatch,
        status: 'SCHEDULED',
        score: { fullTime: { home: null, away: null } },
      };
      const result = mapApiMatchToDbMatch(scheduledMatch, 'gw-uuid-456', '2025-26');
      expect(result).toEqual(
        expect.objectContaining({
          status: 'scheduled',
          home_score: null,
          away_score: null,
        })
      );
    });
  });

  describe('deriveSeasonYear', () => {
    it('should derive season year as "2025-26" format', () => {
      expect(deriveSeasonYear('2025-08-16', '2026-05-24')).toBe('2025-26');
    });
  });

  describe('mapMatchdayToGameweek', () => {
    it('should map a group of API matches to gameweek data', () => {
      const apiMatches = [
        {
          id: 101,
          matchday: 5,
          utcDate: '2025-09-27T14:00:00Z',
          status: 'SCHEDULED',
          homeTeam: { name: 'Liverpool FC', crest: 'https://crests.football-data.org/64.png' },
          awayTeam: { name: 'Everton FC', crest: 'https://crests.football-data.org/62.png' },
          score: { fullTime: { home: null, away: null } },
        },
        {
          id: 102,
          matchday: 5,
          utcDate: '2025-09-27T16:30:00Z',
          status: 'SCHEDULED',
          homeTeam: { name: 'Arsenal FC', crest: 'https://crests.football-data.org/57.png' },
          awayTeam: { name: 'Tottenham Hotspur FC', crest: 'https://crests.football-data.org/73.png' },
          score: { fullTime: { home: null, away: null } },
        },
      ];

      const result = mapMatchdayToGameweek(5, apiMatches, '2025-26');
      expect(result).toEqual({
        gameweek_number: 5,
        season_year: '2025-26',
        start_date: '2025-09-27T14:00:00Z',
        end_date: '2025-09-27T16:30:00Z',
        deadline: '2025-09-27T13:00:00.000Z',
        is_special: false,
        special_type: null,
      });
    });
  });
});
