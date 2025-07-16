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
  IonButtons,
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
  personOutline,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MockDataService } from '../../../../core/services/mock-data.service';

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
    IonButtons,
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
  currentGameweek: number;
  currentPredictions: Prediction[] = [];
  historicalPredictions: Prediction[] = [];
  showNewPredictionsToast = false;
  selectedHistoryGameweek = 14; // Start with previous gameweek
  historicalGameweeks: number[] = []; // To track available historical gameweeks
  liveScoreUpdateInterval: any;

  constructor(private router: Router, private mockDataService: MockDataService) {
    addIcons({
      footballOutline,
      closeCircleOutline,
      timeOutline,
      checkmarkCircleOutline,
      chevronBackOutline,
      chevronForwardOutline,
      personOutline,
    });
    
    // Initialize current gameweek from MockDataService
    this.currentGameweek = this.mockDataService.getCurrentGameweek();
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
    // Load current predictions from MockDataService
    const previousCurrentCount = this.currentPredictions.length;

    // Get current gameweek predictions
    this.currentPredictions = this.mockDataService.getPlayerPredictions(this.currentGameweek);

    // Get available historical gameweeks from MockDataService
    this.historicalGameweeks = this.mockDataService.getAvailableHistoricalGameweeks();

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
    // Get historical predictions from MockDataService
    this.historicalPredictions = this.mockDataService.getHistoricalPredictions(this.selectedHistoryGameweek);
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
    // Update live scores using MockDataService
    this.mockDataService.updateLiveScores();
    
    // Reload current predictions with updated live scores
    this.currentPredictions = this.mockDataService.getPlayerPredictions(this.currentGameweek);
  }

  getMatchTime(match: any): string {
    return this.mockDataService.getMatchTime(match);
  }

  isMatchFinished(match: any): boolean {
    return this.mockDataService.isMatchFinished(match);
  }

  isMatchLive(match: any): boolean {
    return this.mockDataService.isMatchLive(match);
  }

  getScoreClass(match: any): string {
    if (this.isMatchFinished(match)) {
      return 'finished';
    }
    return 'live';
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
