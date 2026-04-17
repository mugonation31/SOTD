import { Injectable } from '@angular/core';

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

    // Double the full round total if this round is a joker round
    const isJokerRound = predictions[0]?.isJokerRound ?? false;
    return this.applyJokerDoubling(totalPoints, isJokerRound);
  }

  /**
   * Doubles the given points when the joker has been used on this round.
   * Kept as a thin, pure helper so callers (e.g. server-side scoring or UI
   * previews) can reuse the same rule without going through calculatePoints.
   */
  applyJokerDoubling(basePoints: number, jokerUsed: boolean): number {
    return jokerUsed ? basePoints * 2 : basePoints;
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
}
