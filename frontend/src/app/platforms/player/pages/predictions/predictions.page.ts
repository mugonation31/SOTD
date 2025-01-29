import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonToast,
  IonButton,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf, NgClass } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  footballOutline,
  closeCircleOutline,
  timeOutline,
  checkmarkCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

interface Prediction {
  id: number;
  gameweek: number;
  match: {
    homeTeam: string;
    awayTeam: string;
    kickoff: string;
    venue: string;
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
  };
  prediction: {
    home: number;
    away: number;
  };
  points?: number;
  status: 'pending' | 'correct' | 'incorrect';
}

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.page.html',
  styleUrls: ['./predictions.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonButton,
    NgFor,
    NgIf,
    NgClass,
    DatePipe,
    FormsModule,
    IonToast,
  ],
})
export class PredictionsPage {
  selectedSegment = 'current';
  currentGameweek = 15; // This should come from a service
  currentPredictions: Prediction[] = [];
  historicalPredictions: Prediction[] = [];
  showNewPredictionsToast = false;
  selectedHistoryGameweek = 14; // Start with previous gameweek
  historicalGameweeks: number[] = []; // To track available historical gameweeks
  liveScoreUpdateInterval: any;

  constructor() {
    addIcons({
      footballOutline,
      closeCircleOutline,
      timeOutline,
      checkmarkCircleOutline,
      chevronBackOutline,
      chevronForwardOutline,
    });
  }

  ionViewWillEnter() {
    this.loadPredictions();
    // Start live score updates
    this.startLiveScoreUpdates();
  }

  ionViewWillLeave() {
    // Clean up interval when leaving the page
    if (this.liveScoreUpdateInterval) {
      clearInterval(this.liveScoreUpdateInterval);
    }
  }

  loadPredictions() {
    // Load current predictions from localStorage
    const storedPredictions = JSON.parse(
      localStorage.getItem('playerPredictions') || '[]'
    );
    const previousCurrentCount = this.currentPredictions.length;

    // Get current gameweek predictions
    this.currentPredictions = [];
    const currentGameweekPredictions = storedPredictions.find(
      (submission: any) => submission.gameweek === this.currentGameweek
    );

    if (currentGameweekPredictions) {
      this.currentPredictions = currentGameweekPredictions.predictions;
    }

    // Load historical predictions
    const historicalPredictions = JSON.parse(
      localStorage.getItem('historicalPredictions') || '[]'
    );

    // Get unique gameweeks from history and cast to number array
    this.historicalGameweeks = Array.from(
      new Set(historicalPredictions.map((pred: any) => Number(pred.gameweek)))
    ) as number[];
    this.historicalGameweeks.sort((a, b) => b - a); // Sort descending

    // If we have historical gameweeks, set the selected one
    if (this.historicalGameweeks.length > 0) {
      this.selectedHistoryGameweek = this.historicalGameweeks[0];
    }

    // Get predictions for selected historical gameweek
    this.updateHistoricalPredictions();

    // Show toast if new predictions were added
    if (
      this.currentPredictions.length > previousCurrentCount &&
      previousCurrentCount > 0
    ) {
      this.showNewPredictionsToast = true;
    }
  }

  updateHistoricalPredictions() {
    const historicalPredictions = JSON.parse(
      localStorage.getItem('historicalPredictions') || '[]'
    );
    const selectedGameweekPredictions = historicalPredictions.find(
      (submission: any) => submission.gameweek === this.selectedHistoryGameweek
    );

    this.historicalPredictions = selectedGameweekPredictions
      ? selectedGameweekPredictions.predictions
      : [];
  }

  navigateHistoryGameweek(delta: number) {
    const currentIndex = this.historicalGameweeks.indexOf(
      this.selectedHistoryGameweek
    );
    const newIndex = currentIndex + delta;

    if (newIndex >= 0 && newIndex < this.historicalGameweeks.length) {
      this.selectedHistoryGameweek = this.historicalGameweeks[newIndex];
      this.updateHistoricalPredictions();
    }
  }

  canNavigateHistory(direction: 'back' | 'forward'): boolean {
    const currentIndex = this.historicalGameweeks.indexOf(
      this.selectedHistoryGameweek
    );
    return direction === 'back'
      ? currentIndex < this.historicalGameweeks.length - 1
      : currentIndex > 0;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'correct':
        return 'success';
      case 'incorrect':
        return 'danger';
      default:
        return 'warning';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'correct':
        return 'checkmark-circle-outline';
      case 'incorrect':
        return 'close-circle-outline';
      default:
        return 'time-outline';
    }
  }

  startLiveScoreUpdates() {
    // Update live scores every minute
    this.liveScoreUpdateInterval = setInterval(() => {
      this.updateLiveScores();
    }, 60000); // 60000ms = 1 minute

    // Initial update
    this.updateLiveScores();
  }

  updateLiveScores() {
    // TODO: Replace with actual API call
    // For now, using mock data to demonstrate
    const mockLiveScores = [
      {
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        home: 1,
        away: 0,
        isLive: true,
        minute: this.calculateMatchMinute('2024-01-20T15:00:00'),
        additionalTime: 2,
        points: this.isMatchFinished({ kickoff: '2024-01-20T15:00:00' })
          ? 3
          : undefined,
        status: this.isMatchFinished({ kickoff: '2024-01-20T15:00:00' })
          ? 'correct'
          : 'pending',
      },
      // Add more mock live scores as needed
    ];

    // Update current predictions with live scores
    this.currentPredictions = this.currentPredictions.map((pred) => {
      const liveMatch = mockLiveScores.find(
        (score) =>
          score.homeTeam === pred.match.homeTeam &&
          score.awayTeam === pred.match.awayTeam
      );

      if (liveMatch) {
        return {
          ...pred,
          match: {
            ...pred.match,
            liveScore: {
              home: liveMatch.home,
              away: liveMatch.away,
              isLive: true,
              minute: liveMatch.minute,
              additionalTime: liveMatch.additionalTime,
            },
          },
          points: liveMatch.points,
          status: liveMatch.status as 'pending' | 'correct' | 'incorrect',
        };
      }
      return pred;
    });
  }

  calculateMatchMinute(kickoff: string): number {
    const kickoffTime = new Date(kickoff);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - kickoffTime.getTime()) / 60000
    );

    // Handle half time (45-60 minutes shows as 45+)
    if (diffInMinutes >= 45 && diffInMinutes < 60) {
      return 45;
    }

    // Handle full time (90+ minutes)
    if (diffInMinutes >= 90) {
      return 90;
    }

    // Handle second half (subtract 15 minutes for half time)
    if (diffInMinutes > 60) {
      return diffInMinutes - 15;
    }

    return diffInMinutes;
  }

  getMatchTime(match: any): string {
    if (!match.liveScore?.isLive) return '';

    // Check if match is finished
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

  isMatchFinished(match: any): boolean {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    // Match is finished if it's more than 2 hours after kickoff
    return now > new Date(kickoff.getTime() + 2 * 60 * 60 * 1000);
  }

  isMatchLive(match: any): boolean {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    // Match is live if it's within the 2-hour window after kickoff and not finished
    return (
      now >= kickoff &&
      now <= new Date(kickoff.getTime() + 2 * 60 * 60 * 1000) &&
      !this.isMatchFinished(match)
    );
  }

  getScoreClass(match: any): string {
    if (this.isMatchFinished(match)) {
      return 'finished';
    }
    return 'live';
  }
}
