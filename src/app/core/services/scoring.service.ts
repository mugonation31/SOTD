import { Injectable } from '@angular/core';
import { SeasonService } from './season.service';
import { firstValueFrom } from 'rxjs';

export interface MatchResult {
  homeScore: number;
  awayScore: number;
}

export interface PredictionResult {
  prediction: MatchResult;
  actual: MatchResult;
  isJokerRound: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ScoringService {
  constructor(private seasonService: SeasonService) {}

  calculatePoints(predictions: PredictionResult[]): number {
    let totalPoints = 0;
    let correctScores = 0;

    predictions.forEach((prediction) => {
      // Calculate base points for correct result
      const basePoints = this.calculateBasePoints(
        prediction.prediction,
        prediction.actual
      );

      // Add points for correct score
      if (this.isCorrectScore(prediction.prediction, prediction.actual)) {
        totalPoints += 3;
        correctScores++;
      }

      // Add base points
      totalPoints += basePoints;
    });

    // Add bonus for 3 perfect scores
    if (correctScores === 3) {
      totalPoints += 10;
    }

    // Double points if joker used
    if (predictions[0]?.isJokerRound) {
      totalPoints *= 2;
    }

    return totalPoints;
  }

  private calculateBasePoints(
    prediction: MatchResult,
    actual: MatchResult
  ): number {
    const predictionResult = this.getMatchResult(prediction);
    const actualResult = this.getMatchResult(actual);

    if (predictionResult !== actualResult) {
      return 0;
    }

    switch (actualResult) {
      case 'HOME_WIN':
        return 3;
      case 'AWAY_WIN':
        return 4;
      case 'DRAW':
        return 6;
      default:
        return 0;
    }
  }

  private getMatchResult(
    result: MatchResult
  ): 'HOME_WIN' | 'AWAY_WIN' | 'DRAW' {
    if (result.homeScore > result.awayScore) return 'HOME_WIN';
    if (result.homeScore < result.awayScore) return 'AWAY_WIN';
    return 'DRAW';
  }

  private isCorrectScore(
    prediction: MatchResult,
    actual: MatchResult
  ): boolean {
    return (
      prediction.homeScore === actual.homeScore &&
      prediction.awayScore === actual.awayScore
    );
  }

  isBoxingDay(date: Date): boolean {
    return date.getMonth() === 11 && date.getDate() === 26;
  }

  async isFinalDay(date: Date): Promise<boolean> {
    const seasonInfo = await firstValueFrom(this.seasonService.getSeasonInfo());
    // Check if the date is the final day of the season
    return (
      date.toDateString() === new Date(seasonInfo.seasonEndDate).toDateString()
    );
  }

  async shouldForceJokerUse(date: Date, jokersUsed: number): Promise<boolean> {
    if (jokersUsed >= 2) return false;

    const isBeforeBoxingDay = date < new Date('2023-12-26');
    const isAfterBoxingDay = date > new Date('2023-12-26');
    const isFinalRound = await this.isFinalDay(date);

    // Force first joker before Boxing Day
    if (jokersUsed === 0 && !isBeforeBoxingDay) return true;

    // Force second joker before final round
    if (jokersUsed === 1 && isAfterBoxingDay && !isFinalRound) return true;

    return false;
  }
}
