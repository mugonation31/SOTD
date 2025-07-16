import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScoringService } from './scoring.service';

// Core Data Interfaces
export interface Match {
  id: number;
  gameweek: number;
  homeTeam: string;
  awayTeam: string;
  kickoff: string;
  venue: string;
  homeScore?: number | null;
  awayScore?: number | null;
  liveScore?: {
    home: number;
    away: number;
    isLive: boolean;
    minute: number;
    additionalTime?: number;
  };
  finalScore?: {
    home: number;
    away: number;
  };
  status: 'scheduled' | 'live' | 'finished';
}

export interface Prediction {
  id: number;
  gameweek: number;
  match: Match;
  prediction: {
    home: number;
    away: number;
  };
  points?: number;
  status: 'pending' | 'correct' | 'incorrect';
}

export interface GameWeek {
  number: number;
  isSpecial: boolean;
  specialType?: string;
  status: 'pending' | 'active' | 'completed';
  deadline: Date;
  matches: Match[];
}

export interface PlayerPrediction {
  playerName: string;
  avatar?: string;
  totalPoints: number;
  jokerUsed: boolean;
  predictions: PredictionWithResult[];
  isCurrentUser?: boolean;
}

export interface PredictionWithResult extends Match {
  points?: number;
  isCorrectScore?: boolean;
  isCorrectResult?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private readonly STORAGE_KEYS = {
    PLAYER_PREDICTIONS: 'playerPredictions',
    HISTORICAL_PREDICTIONS: 'historicalPredictions',
    HISTORICAL_MATCHES: 'historicalMatches',
    GROUP_ADMIN_PREDICTIONS: 'groupAdminPredictions'
  };

  // Current season data
  private currentGameweek = 15;
  private currentSeason = '2023-24';
  
  // Reactive subjects for real-time updates
  private predictionsSubject = new BehaviorSubject<Prediction[]>([]);
  private gameweeksSubject = new BehaviorSubject<GameWeek[]>([]);

  constructor(private scoringService: ScoringService) {
    this.initializeMockData();
  }

  // ====================================
  // 🔄 SUPABASE INTEGRATION POINTS
  // ====================================
  // When ready to connect Supabase, replace these methods:
  // - getMatchesForGameweek() -> supabase.from('matches').select()
  // - savePredictions() -> supabase.from('predictions').upsert()
  // - getPlayerPredictions() -> supabase.from('predictions').select()
  // - updateMatchResults() -> supabase.from('matches').update()

  /**
   * Get current gameweek number
   */
  getCurrentGameweek(): number {
    return this.currentGameweek;
  }

  /**
   * Get matches for a specific gameweek
   */
  getMatchesForGameweek(gameweek: number): Match[] {
    const gameweekData = this.getGameweekData(gameweek);
    return gameweekData ? gameweekData.matches : [];
  }

  /**
   * Get current gameweek data
   */
  getCurrentGameweekData(): GameWeek {
    return this.getGameweekData(this.currentGameweek) || this.createEmptyGameweek(this.currentGameweek);
  }

  /**
   * Get historical gameweeks with data
   */
  getAvailableHistoricalGameweeks(): number[] {
    const historical = this.getStoredData(this.STORAGE_KEYS.HISTORICAL_PREDICTIONS);
    const gameweeks = historical.map((pred: any) => Number(pred.gameweek));
    return Array.from(new Set(gameweeks)).sort((a, b) => b - a);
  }

  /**
   * Get player predictions for current gameweek
   */
  getPlayerPredictions(gameweek?: number): Prediction[] {
    const targetGameweek = gameweek || this.currentGameweek;
    const stored = this.getStoredData(this.STORAGE_KEYS.PLAYER_PREDICTIONS);
    const gameweekData = stored.find((submission: any) => submission.gameweek === targetGameweek);
    return gameweekData ? gameweekData.predictions : [];
  }

  /**
   * Save player predictions
   */
  savePredictions(predictions: Prediction[]): void {
    if (predictions.length === 0) return;

    const gameweek = predictions[0].gameweek;
    const stored = this.getStoredData(this.STORAGE_KEYS.PLAYER_PREDICTIONS);
    
    // Remove existing predictions for this gameweek
    const filtered = stored.filter((submission: any) => submission.gameweek !== gameweek);
    
    // Add new predictions
    filtered.push({
      gameweek,
      predictions,
      submittedAt: new Date().toISOString()
    });

    this.setStoredData(this.STORAGE_KEYS.PLAYER_PREDICTIONS, filtered);
    this.predictionsSubject.next(predictions);
  }

  /**
   * Get historical predictions
   */
  getHistoricalPredictions(gameweek: number): Prediction[] {
    const historical = this.getStoredData(this.STORAGE_KEYS.HISTORICAL_PREDICTIONS);
    const gameweekData = historical.find((pred: any) => pred.gameweek === gameweek);
    
    if (!gameweekData) return [];

    // Calculate points and status for historical predictions
    return gameweekData.predictions.map((pred: any) => {
      if (pred.match.finalScore) {
        const isCorrect = 
          pred.prediction.home === pred.match.finalScore.home &&
          pred.prediction.away === pred.match.finalScore.away;
        
        return {
          ...pred,
          points: this.scoringService.calculatePoints([{
            prediction: pred.prediction,
            actual: pred.match.finalScore,
            isJokerRound: false
          }]),
          status: isCorrect ? 'correct' : 'incorrect'
        };
      }
      return pred;
    });
  }

  /**
   * Get all group admin predictions for a gameweek
   */
  getGroupAdminPredictions(gameweek: number): PlayerPrediction[] {
    // This would come from Supabase in real implementation
    return this.generateSampleGroupPredictions(gameweek);
  }

  /**
   * Update live scores for matches
   */
  updateLiveScores(): void {
    // TODO: Replace with real API call to get live EPL scores
    const currentPredictions = this.getPlayerPredictions();
    const updatedPredictions = currentPredictions.map(pred => {
      if (this.isMatchLive(pred.match)) {
        pred.match.liveScore = this.generateMockLiveScore(pred.match);
      }
      return pred;
    });

    if (updatedPredictions.length > 0) {
      this.savePredictions(updatedPredictions);
    }
  }

  /**
   * Check if match is currently live
   */
  isMatchLive(match: Match): boolean {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    return now >= kickoff && now <= new Date(kickoff.getTime() + 2 * 60 * 60 * 1000);
  }

  /**
   * Check if match is finished
   */
  isMatchFinished(match: Match): boolean {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    return now > new Date(kickoff.getTime() + 2 * 60 * 60 * 1000);
  }

  /**
   * Get match time display
   */
  getMatchTime(match: Match): string {
    if (!match.liveScore?.isLive) return '';

    if (this.isMatchFinished(match)) {
      return 'FT';
    }

    const minute = match.liveScore.minute;
    const additionalTime = match.liveScore.additionalTime;

    if (minute === 45 && additionalTime) {
      return `45+${additionalTime}'`;
    }
    if (minute === 90 && additionalTime) {
      return `90+${additionalTime}'`;
    }
    return `${minute}'`;
  }

  // ====================================
  // 🏗️ PRIVATE HELPER METHODS
  // ====================================

  private initializeMockData(): void {
    // Initialize historical predictions if not exists
    if (!this.hasStoredData(this.STORAGE_KEYS.HISTORICAL_PREDICTIONS)) {
      this.setStoredData(this.STORAGE_KEYS.HISTORICAL_PREDICTIONS, this.generateHistoricalPredictions());
    }
  }

  private getGameweekData(gameweek: number): GameWeek | null {
    const gameweeks = this.generateGameweeks();
    return gameweeks.find(gw => gw.number === gameweek) || null;
  }

  private createEmptyGameweek(gameweek: number): GameWeek {
    return {
      number: gameweek,
      isSpecial: false,
      status: 'active',
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      matches: []
    };
  }

  private generateGameweeks(): GameWeek[] {
    // Mock EPL gameweeks - in real app this comes from Supabase
    return [
      {
        number: 15,
        isSpecial: false,
        status: 'active',
        deadline: new Date('2024-01-20T11:30:00'),
        matches: this.generateMatchesForGameweek(15)
      },
      {
        number: 16,
        isSpecial: true,
        specialType: 'christmas',
        status: 'pending',
        deadline: new Date('2024-01-27T11:30:00'),
        matches: this.generateMatchesForGameweek(16)
      },
      {
        number: 14,
        isSpecial: false,
        status: 'completed',
        deadline: new Date('2024-01-13T11:30:00'),
        matches: this.generateMatchesForGameweek(14)
      }
    ];
  }

  private generateMatchesForGameweek(gameweek: number): Match[] {
    const teams = this.getPremierLeagueTeams();
    const venues = this.getPremierLeagueVenues();
    
    // Generate realistic fixture list for gameweek
    const fixtures = this.getFixturesForGameweek(gameweek);
    
    return fixtures.map((fixture, index) => ({
      id: gameweek * 100 + index + 1,
      gameweek,
      homeTeam: fixture.home,
      awayTeam: fixture.away,
      venue: venues[fixture.home] || 'Stadium',
      kickoff: this.getKickoffTime(gameweek, index),
      homeScore: null,
      awayScore: null,
      status: 'scheduled' as const
    }));
  }

  private getPremierLeagueTeams(): string[] {
    return [
      'Arsenal', 'Aston Villa', 'Brighton', 'Burnley', 'Chelsea',
      'Crystal Palace', 'Everton', 'Fulham', 'Liverpool', 'Luton Town',
      'Manchester City', 'Manchester United', 'Newcastle', 'Nottingham Forest',
      'Sheffield United', 'Tottenham', 'West Ham', 'Wolves', 'Bournemouth', 'Brentford'
    ];
  }

  private getPremierLeagueVenues(): { [team: string]: string } {
    return {
      'Arsenal': 'Emirates Stadium',
      'Aston Villa': 'Villa Park',
      'Brighton': 'Amex Stadium',
      'Burnley': 'Turf Moor',
      'Chelsea': 'Stamford Bridge',
      'Crystal Palace': 'Selhurst Park',
      'Everton': 'Goodison Park',
      'Fulham': 'Craven Cottage',
      'Liverpool': 'Anfield',
      'Luton Town': 'Kenilworth Road',
      'Manchester City': 'Etihad Stadium',
      'Manchester United': 'Old Trafford',
      'Newcastle': 'St. James Park',
      'Nottingham Forest': 'City Ground',
      'Sheffield United': 'Bramall Lane',
      'Tottenham': 'Tottenham Hotspur Stadium',
      'West Ham': 'London Stadium',
      'Wolves': 'Molineux',
      'Bournemouth': 'Vitality Stadium',
      'Brentford': 'Gtech Community Stadium'
    };
  }

  private getFixturesForGameweek(gameweek: number): { home: string, away: string }[] {
    // Mock fixture generation - in real app this comes from API
    const fixtures = [
      { home: 'Manchester United', away: 'Liverpool' },
      { home: 'Arsenal', away: 'Chelsea' },
      { home: 'Manchester City', away: 'Tottenham' },
      { home: 'Newcastle', away: 'Aston Villa' },
      { home: 'Brighton', away: 'Crystal Palace' },
      { home: 'Brentford', away: 'Nottingham Forest' },
      { home: 'Sheffield United', away: 'West Ham' },
      { home: 'Bournemouth', away: 'Luton Town' },
      { home: 'Wolves', away: 'Everton' },
      { home: 'Burnley', away: 'Fulham' }
    ];
    
    return fixtures;
  }

  private getKickoffTime(gameweek: number, matchIndex: number): string {
    const baseDate = new Date('2024-01-20T15:00:00');
    const matchDate = new Date(baseDate.getTime() + (gameweek - 15) * 7 * 24 * 60 * 60 * 1000);
    
    // Vary kickoff times realistically
    const kickoffTimes = ['15:00', '17:30', '20:00'];
    const timeIndex = matchIndex % kickoffTimes.length;
    
    const [hours, minutes] = kickoffTimes[timeIndex].split(':');
    matchDate.setHours(parseInt(hours), parseInt(minutes));
    
    return matchDate.toISOString();
  }

  private generateMockLiveScore(match: Match): any {
    return {
      home: Math.floor(Math.random() * 4),
      away: Math.floor(Math.random() * 4),
      isLive: true,
      minute: 45 + Math.floor(Math.random() * 45),
      additionalTime: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : undefined
    };
  }

  private generateHistoricalPredictions(): any[] {
    return [
      {
        gameweek: 14,
        predictions: [
          {
            id: 1,
            gameweek: 14,
            match: {
              homeTeam: 'Arsenal',
              awayTeam: 'Brighton',
              kickoff: '2024-01-17T19:45:00',
              venue: 'Emirates Stadium',
              finalScore: { home: 2, away: 1 }
            },
            prediction: { home: 2, away: 1 },
            status: 'correct'
          },
          {
            id: 2,
            gameweek: 14,
            match: {
              homeTeam: 'Brentford',
              awayTeam: 'Chelsea',
              kickoff: '2024-01-17T20:00:00',
              venue: 'Gtech Community Stadium',
              finalScore: { home: 0, away: 2 }
            },
            prediction: { home: 1, away: 1 },
            status: 'incorrect'
          }
        ]
      }
    ];
  }

  private generateSampleGroupPredictions(gameweek: number): PlayerPrediction[] {
    return [
      {
        playerName: 'John Smith',
        avatar: 'assets/avatars/john.jpg',
        totalPoints: 156,
        jokerUsed: true,
        predictions: [
          {
            id: 1,
            gameweek,
            homeTeam: 'Manchester United',
            awayTeam: 'Liverpool',
            homeScore: 2,
            awayScore: 1,
            venue: 'Old Trafford',
            kickoff: '2024-01-20T15:00:00',
            points: 9,
            isCorrectScore: true,
            isCorrectResult: true,
            status: 'finished'
          }
        ]
      }
    ];
  }

  private getStoredData(key: string): any[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private setStoredData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private hasStoredData(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
} 