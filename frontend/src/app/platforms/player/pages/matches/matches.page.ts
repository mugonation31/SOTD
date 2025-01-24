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
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  footballOutline,
  refreshOutline,
  alertCircleOutline,
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
        <ion-title>Game Week {{ currentGameweek.number }}</ion-title>
        <ion-button
          slot="end"
          fill="clear"
          class="reset-button"
          (click)="resetPredictions()"
        >
          <ion-icon name="refresh-outline" slot="start"></ion-icon>
          RESET ALL
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="10" size-lg="8">
            <!-- Deadline Info Card -->
            <ion-card class="deadline-card">
              <ion-card-header>
                <ion-card-title class="ion-padding-bottom">
                  Game Week {{ currentGameweek.number }}
                  <ion-badge color="primary" class="prediction-badge"
                    >Predict 3</ion-badge
                  >
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="deadline-info">
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

                <!-- Warning Message -->
                <div
                  class="warning-message"
                  *ngIf="showTooManyPredictionsWarning"
                >
                  <ion-icon name="alert-circle-outline"></ion-icon>
                  You can't make more than 3 predictions for this game week
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

      ion-grid {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--page-margin);
      }

      .reset-button {
        margin-right: 8px;
        --color: var(--ion-color-medium);
        text-transform: uppercase;
        font-weight: 500;
        font-size: 14px;
        height: 36px;
      }

      .deadline-card {
        margin-bottom: var(--page-margin);
        border-radius: var(--card-border-radius);
        box-shadow: none;
        border: 1px solid var(--ion-color-light-shade);
        background: var(--card-background);
      }

      .deadline-card ion-card-header {
        padding: var(--page-margin);
        border-bottom: 1px solid var(--ion-color-light-shade);
        background: var(--card-background);
      }

      .deadline-card ion-card-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        color: var(--ion-color-dark);
        margin: 0;
        padding: 0;
      }

      .prediction-badge {
        font-size: 12px;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 4px;
      }

      .deadline-info {
        margin: var(--page-margin) 0;
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

      .warning-message {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(var(--ion-color-warning-rgb), 0.1);
        color: var(--ion-color-warning-shade);
        padding: 12px;
        border-radius: 4px;
        font-size: 14px;
        margin-top: 12px;

        ion-icon {
          font-size: 20px;
          color: var(--ion-color-warning);
        }
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
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
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

  constructor() {
    addIcons({
      timeOutline,
      footballOutline,
      refreshOutline,
      alertCircleOutline,
    });
  }

  onScoreChange(match: Match) {
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
    if (this.currentGameweek.isSpecial) {
      // All matches must be predicted in special gameweeks
      return this.selectedPredictionCount === this.matches.length;
    } else {
      // Exactly 3 predictions required in regular gameweeks
      return this.selectedPredictionCount === 3;
    }
  }

  resetPredictions() {
    this.matches.forEach((match) => {
      match.prediction.homeScore = null;
      match.prediction.awayScore = null;
    });
    this.showTooManyPredictionsWarning = false;
    this.selectedPredictionCount = 0;
  }

  onSubmit() {
    // TODO: Implement submission logic
    console.log('Submitting predictions:', this.matches);
  }
}
