import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonButtons,
  IonText,
  IonToast,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  footballOutline,
  refreshOutline,
  alertCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  personOutline,
} from 'ionicons/icons';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  kickoff: string;
  venue: string;
  prediction: {
    homeScore: number | null;
    awayScore: number | null;
  };
}

interface GameWeek {
  number: number;
  isSpecial: boolean;
  status: 'open' | 'closed' | 'in_progress';
  deadline: string;
  matches: Match[];
}

@Component({
  selector: 'app-matches',
  template: `
    <ion-header>
      <ion-toolbar>
        <div class="logo-container" (click)="navigateTo('/player/dashboard')">
          <ion-icon name="football-outline" class="football-icon"></ion-icon>
          <div class="logo-text">
            <span class="logo-sotd">SOTD</span>
            <span class="logo-subtitle">Predict 3</span>
          </div>
        </div>
        <ion-buttons slot="end">
          <ion-button (click)="navigateTo('/player/settings')">
            <ion-icon name="person-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="10" size-lg="8">
            <!-- Gameweek Navigation -->
            <div class="gameweek-navigation">
              <ion-button
                fill="clear"
                class="nav-button"
                [disabled]="currentGameweek.number <= 1"
                (click)="navigateGameweek(-1)"
              >
                <ion-icon
                  slot="icon-only"
                  name="chevron-back-outline"
                ></ion-icon>
              </ion-button>

              <div class="gameweek-title">
                <h2>Game Week {{ currentGameweek.number }}</h2>
                <ion-badge color="primary" class="prediction-badge"
                  >Predict 3</ion-badge
                >
              </div>

              <ion-button
                fill="clear"
                class="nav-button"
                [disabled]="currentGameweek.number >= 38"
                (click)="navigateGameweek(1)"
              >
                <ion-icon
                  slot="icon-only"
                  name="chevron-forward-outline"
                ></ion-icon>
              </ion-button>
            </div>

            <!-- Deadline Info Card -->
            <ion-card class="deadline-card">
              <ion-card-content>
                <div class="deadline-info">
                  <div class="deadline-section">
                    <p class="deadline">
                      <ion-icon name="time-outline"></ion-icon>
                      Deadline:
                      {{
                        currentGameweek.deadline | date : 'MMM d, yyyy, h:mm a'
                      }}
                    </p>
                    <p class="selection-info">
                      Make any 3 predictions for this game week
                    </p>
                  </div>
                  <ion-button
                    fill="clear"
                    class="reset-button"
                    (click)="resetPredictions()"
                  >
                    <ion-icon name="refresh-outline" slot="start"></ion-icon>
                    RESET ALL
                  </ion-button>
                </div>

                <!-- Warning Message -->
                <div
                  class="warning-container"
                  *ngIf="showTooManyPredictionsWarning"
                >
                  <div class="warning-message">
                    <ion-icon
                      name="alert-circle-outline"
                      color="danger"
                    ></ion-icon>
                    <span
                      >You can't make more than 3 predictions for this game
                      week</span
                    >
                  </div>
                </div>
              </ion-card-content>
            </ion-card>

            <!-- Matches List -->
            <div class="matches-container">
              <div class="match-card" *ngFor="let match of matches">
                <div class="match-header">
                  <div class="venue">
                    <ion-icon name="football-outline"></ion-icon>
                    {{ match.venue }}
                  </div>
                  <div class="kickoff">
                    <ion-icon name="time-outline"></ion-icon>
                    {{ match.kickoff | date : 'EEEE d MMM HH:mm' }}
                  </div>
                </div>

                <div class="match-content">
                  <div class="team home">{{ match.homeTeam }}</div>
                  <div class="score-inputs">
                    <input
                      type="number"
                      class="score-input"
                      [(ngModel)]="match.prediction.homeScore"
                      (ngModelChange)="onScoreChange(match)"
                      min="0"
                      max="99"
                      placeholder="-"
                    />
                    <span class="score-separator">-</span>
                    <input
                      type="number"
                      class="score-input"
                      [(ngModel)]="match.prediction.awayScore"
                      (ngModelChange)="onScoreChange(match)"
                      min="0"
                      max="99"
                      placeholder="-"
                    />
                  </div>
                  <div class="team away">{{ match.awayTeam }}</div>
                </div>
              </div>
            </div>

            <div class="submit-container">
              <ion-button
                expand="block"
                class="submit-button"
                [disabled]="!canSubmit()"
                (click)="onSubmit()"
              >
                Submit Predictions
              </ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-toast
        [isOpen]="showSuccessToast"
        message="Predictions submitted successfully! View them in the My Predictions tab."
        duration="3000"
        color="success"
        position="top"
        icon="checkmark-circle-outline"
      ></ion-toast>
    </ion-content>
  `,
  styles: [
    `
      :host {
        --page-margin: 16px;
        --card-border-radius: 8px;
        --card-background: #ffffff;
      }

      ion-content {
        --background: #f4f5f8;
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .football-icon {
        font-size: 24px;
        color: var(--ion-color-primary);
      }

      .logo-text {
        display: flex;
        flex-direction: column;
      }

      .logo-sotd {
        font-size: 18px;
        font-weight: 600;
        color: var(--ion-color-dark);
      }

      .logo-subtitle {
        font-size: 12px;
        color: var(--ion-color-medium);
      }

      .profile-button {
        --padding-start: 8px;
        --padding-end: 8px;
        font-size: 22px;
        --color: var(--ion-color-medium);
      }

      .gameweek-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--page-margin);
      }

      .nav-button {
        --padding-start: 8px;
        --padding-end: 8px;
        height: 36px;
        --color: var(--ion-color-medium);

        &[disabled] {
          opacity: 0.5;
        }

        ion-icon {
          font-size: 24px;
        }
      }

      .gameweek-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: var(--ion-color-dark);
        }
      }

      .prediction-badge {
        font-size: 12px;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 4px;
      }

      .deadline-card {
        margin-bottom: var(--page-margin);
        border-radius: var(--card-border-radius);
        box-shadow: none;
        border: 1px solid var(--ion-color-light-shade);
        background: var(--card-background);
      }

      .deadline-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
      }

      .deadline-section {
        flex: 1;
      }

      .deadline {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 500;
        color: var(--ion-color-dark);
        margin: 0 0 8px;

        ion-icon {
          font-size: 18px;
          color: var(--ion-color-medium);
        }
      }

      .selection-info {
        color: var(--ion-color-medium);
        font-size: 14px;
        margin: 0;
      }

      .reset-button {
        --color: var(--ion-color-medium);
        text-transform: uppercase;
        font-weight: 500;
        font-size: 14px;
        height: 36px;
        margin: 0;
      }

      .matches-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
      }

      .match-card {
        background: var(--card-background);
        border: 1px solid var(--ion-color-light-shade);
        border-radius: var(--card-border-radius);
        overflow: hidden;
      }

      .match-header {
        background: rgba(var(--ion-color-light-rgb), 0.5);
        padding: 12px var(--page-margin);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--ion-color-light-shade);
      }

      .venue,
      .kickoff {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--ion-color-medium);

        ion-icon {
          font-size: 16px;
        }
      }

      .match-content {
        padding: var(--page-margin);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--page-margin);
      }

      .team {
        flex: 1;
        font-weight: 500;
        color: var(--ion-color-dark);
        font-size: 15px;
      }

      .home {
        text-align: right;
      }

      .away {
        text-align: left;
      }

      .score-inputs {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 120px;
        justify-content: center;
      }

      .score-input {
        width: 48px;
        height: 48px;
        text-align: center;
        border: 1px solid var(--ion-color-light-shade);
        border-radius: 4px;
        font-size: 16px;
        color: var(--ion-color-dark);
        background: rgba(var(--ion-color-light-rgb), 0.5);

        &::placeholder {
          color: var(--ion-color-medium);
        }

        &:focus {
          outline: none;
          border-color: var(--ion-color-primary);
          background: var(--card-background);
        }
      }

      .score-separator {
        font-size: 20px;
        color: var(--ion-color-medium);
        font-weight: 500;
      }

      .submit-container {
        padding: 0 var(--page-margin) 32px;
      }

      .submit-button {
        --border-radius: var(--card-border-radius);
        --padding-top: 16px;
        --padding-bottom: 16px;
        font-weight: 600;
        font-size: 16px;
        margin: 0;
      }

      @media (max-width: 576px) {
        :host {
          --page-margin: 12px;
        }

        .match-content {
          flex-direction: column;
          gap: 12px;
          text-align: center;
        }

        .team {
          text-align: center;
        }

        .home {
          order: 1;
        }

        .score-inputs {
          order: 2;
        }

        .away {
          order: 3;
        }

        .score-input {
          width: 44px;
          height: 44px;
        }
      }

      ion-buttons ion-button {
        --padding-start: 8px;
        --padding-end: 8px;
        height: 36px;
      }

      ion-buttons ion-icon {
        font-size: 18px;
        color: var(--ion-color-medium);
      }

      .warning-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 16px;
        background: rgba(var(--ion-color-danger-rgb), 0.1);
        animation: slideDown 0.3s ease-out;
      }

      .warning-message {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        max-width: 600px;
        margin: 0 auto;
        padding: 12px 16px;
        border-radius: 8px;
        background: var(--ion-color-danger-contrast);
        box-shadow: 0 2px 8px rgba(var(--ion-color-danger-rgb), 0.2);
        border: 1px solid rgba(var(--ion-color-danger-rgb), 0.2);
        color: var(--ion-color-danger-shade);
        font-weight: 500;
        font-size: 14px;
      }

      .warning-message ion-icon {
        font-size: 20px;
        flex-shrink: 0;
      }

      @keyframes slideDown {
        from {
          transform: translateY(-100%);
        }
        to {
          transform: translateY(0);
        }
      }
    `,
  ],
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
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonButtons,
    IonText,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
    IonToast,
  ],
})
export class MatchesPage {
  currentGameweek: GameWeek = {
    number: 15,
    isSpecial: false,
    status: 'open',
    deadline: '2024-01-20T11:30:00',
    matches: [],
  };

  matches: Match[] = [
    {
      id: 1,
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      kickoff: '2024-01-20T15:00:00',
      venue: 'Old Trafford',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 2,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      kickoff: '2024-01-20T17:30:00',
      venue: 'Emirates Stadium',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 3,
      homeTeam: 'Manchester City',
      awayTeam: 'Tottenham',
      kickoff: '2024-01-20T20:00:00',
      venue: 'Etihad Stadium',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 4,
      homeTeam: 'Newcastle',
      awayTeam: 'Aston Villa',
      kickoff: '2024-01-21T14:00:00',
      venue: 'St. James Park',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 5,
      homeTeam: 'Brighton',
      awayTeam: 'Crystal Palace',
      kickoff: '2024-01-21T16:30:00',
      venue: 'Amex Stadium',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 6,
      homeTeam: 'Brentford',
      awayTeam: 'Nottingham Forest',
      kickoff: '2024-01-21T14:00:00',
      venue: 'Gtech Community Stadium',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 7,
      homeTeam: 'West Ham',
      awayTeam: 'Bournemouth',
      kickoff: '2024-01-21T14:00:00',
      venue: 'London Stadium',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 8,
      homeTeam: 'Fulham',
      awayTeam: 'Everton',
      kickoff: '2024-01-21T14:00:00',
      venue: 'Craven Cottage',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 9,
      homeTeam: 'Luton Town',
      awayTeam: 'Burnley',
      kickoff: '2024-01-21T14:00:00',
      venue: 'Kenilworth Road',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 10,
      homeTeam: 'Sheffield United',
      awayTeam: 'Wolves',
      kickoff: '2024-01-21T14:00:00',
      venue: 'Bramall Lane',
      prediction: { homeScore: null, awayScore: null },
    },
  ];

  showTooManyPredictionsWarning = false;
  selectedPredictionCount = 0;
  showSuccessToast = false;
  predictionsCompleted = false;

  constructor(private router: Router) {
    addIcons({
      timeOutline,
      footballOutline,
      refreshOutline,
      alertCircleOutline,
      chevronBackOutline,
      chevronForwardOutline,
      personOutline,
    });
    this.checkPredictionsStatus();
  }

  checkPredictionsStatus() {
    // Load stored predictions
    const storedPredictions = JSON.parse(
      localStorage.getItem('playerPredictions') || '[]'
    );

    // Check if current gameweek predictions exist and are complete
    const currentGameweekPredictions = storedPredictions.find(
      (submission: any) => submission.gameweek === this.currentGameweek.number
    );

    if (currentGameweekPredictions) {
      const predictionCount = currentGameweekPredictions.predictions.length;
      this.predictionsCompleted = this.currentGameweek.isSpecial
        ? predictionCount === this.matches.length
        : predictionCount === 3;
    }
  }

  onScoreChange(match: Match) {
    if (this.predictionsCompleted) {
      // Reset the score if predictions are completed
      match.prediction.homeScore = null;
      match.prediction.awayScore = null;
      this.showTooManyPredictionsWarning = true;
      return;
    }

    // Validate scores are numbers and within range
    if (match.prediction.homeScore !== null) {
      match.prediction.homeScore = Math.max(
        0,
        Math.min(99, match.prediction.homeScore)
      );
    }
    if (match.prediction.awayScore !== null) {
      match.prediction.awayScore = Math.max(
        0,
        Math.min(99, match.prediction.awayScore)
      );
    }

    // Count valid predictions
    this.updatePredictionCount();
  }

  updatePredictionCount() {
    this.selectedPredictionCount = this.matches.filter(
      (match) =>
        match.prediction.homeScore !== null &&
        match.prediction.awayScore !== null
    ).length;

    // Show warning if more than 3 predictions in regular gameweek
    this.showTooManyPredictionsWarning =
      !this.currentGameweek.isSpecial && this.selectedPredictionCount > 3;
  }

  canSubmit(): boolean {
    if (this.predictionsCompleted) {
      return false;
    }

    if (this.currentGameweek.isSpecial) {
      return this.selectedPredictionCount === this.matches.length;
    } else {
      return this.selectedPredictionCount === 3;
    }
  }

  async onSubmit() {
    if (this.predictionsCompleted) {
      return;
    }

    // Get matches with predictions
    const predictedMatches = this.matches.filter(
      (match) =>
        match.prediction.homeScore !== null &&
        match.prediction.awayScore !== null
    );

    // Create prediction entry
    const submission = {
      gameweek: this.currentGameweek.number,
      submittedAt: new Date().toISOString(),
      predictions: predictedMatches.map((match) => ({
        id: match.id,
        gameweek: this.currentGameweek.number,
        match: {
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          kickoff: match.kickoff,
          venue: match.venue,
        },
        prediction: {
          home: match.prediction.homeScore,
          away: match.prediction.awayScore,
        },
        status: 'pending',
      })),
    };

    // Store in localStorage (replacing any existing predictions for current gameweek)
    const storedPredictions = JSON.parse(
      localStorage.getItem('playerPredictions') || '[]'
    );
    const updatedPredictions = storedPredictions.filter(
      (pred: any) => pred.gameweek !== this.currentGameweek.number
    );
    updatedPredictions.push(submission);
    localStorage.setItem(
      'playerPredictions',
      JSON.stringify(updatedPredictions)
    );

    // Reset predictions and update status
    this.resetPredictions();
    this.predictionsCompleted = true;

    // Show success toast
    this.showSuccessToast = true;
  }

  resetPredictions() {
    this.matches.forEach((match) => {
      match.prediction.homeScore = null;
      match.prediction.awayScore = null;
    });
    this.selectedPredictionCount = 0;
    this.showTooManyPredictionsWarning = false;
  }

  navigateGameweek(delta: number) {
    const newGameweek = this.currentGameweek.number + delta;
    if (newGameweek >= 1 && newGameweek <= 38) {
      // Move current gameweek predictions to history if completed
      if (this.predictionsCompleted) {
        this.moveCurrentPredictionsToHistory();
      }

      // Update current gameweek
      this.currentGameweek = {
        ...this.currentGameweek,
        number: newGameweek,
      };
      this.loadGameweekMatches(newGameweek);

      // Reset prediction status for new gameweek
      this.predictionsCompleted = false;
      this.resetPredictions();
    }
  }

  private moveCurrentPredictionsToHistory() {
    const storedPredictions = JSON.parse(
      localStorage.getItem('playerPredictions') || '[]'
    );
    const currentPredictions = storedPredictions.find(
      (pred: any) => pred.gameweek === this.currentGameweek.number
    );

    if (currentPredictions) {
      // Move to history
      const historicalPredictions = JSON.parse(
        localStorage.getItem('historicalPredictions') || '[]'
      );
      historicalPredictions.push(currentPredictions);
      localStorage.setItem(
        'historicalPredictions',
        JSON.stringify(historicalPredictions)
      );

      // Remove from current predictions
      const updatedPredictions = storedPredictions.filter(
        (pred: any) => pred.gameweek !== this.currentGameweek.number
      );
      localStorage.setItem(
        'playerPredictions',
        JSON.stringify(updatedPredictions)
      );
    }
  }

  loadGameweekMatches(gameweek: number) {
    // TODO: Implement service call to load matches for the gameweek

  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
