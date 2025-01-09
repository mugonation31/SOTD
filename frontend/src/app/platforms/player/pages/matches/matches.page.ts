import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  footballOutline,
  checkmarkCircleOutline,
  informationCircleOutline,
} from 'ionicons/icons';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  kickoff: string;
  venue?: string;
  prediction: {
    homeScore: number | null;
    awayScore: number | null;
  };
}

@Component({
  selector: 'app-matches',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Gameweek {{ currentGameweek.number }} Matches</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Deadline Info -->
      <ion-card class="deadline-card">
        <ion-card-content>
          <h2>Game Week {{ currentGameweek.number }}</h2>
          <p class="deadline">
            Deadline:
            {{ currentGameweek.deadline | date : 'MMM d, yyyy, h:mm a' }}
          </p>
          <p class="selection-info" *ngIf="!currentGameweek.isSpecial">
            Make any 3 predictions for this game week
          </p>
          <p class="selection-info" *ngIf="currentGameweek.isSpecial">
            Special Game Week - Predict all 10 matches
          </p>

          <!-- Warning Message -->
          <div class="warning-message" *ngIf="showTooManyPredictionsWarning">
            You can't make more than 3 predictions for this game week
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Matches List -->
      <div class="predictions-list">
        <div class="match-row" *ngFor="let match of matches">
          <div class="match-info">
            <div class="venue">{{ match.venue }}</div>
            <div class="kickoff">
              {{ match.kickoff | date : 'EEE, MMM d • h:mm a' }}
            </div>
          </div>

          <div class="match-prediction">
            <div class="team home">{{ match.homeTeam }}</div>
            <div class="score-container">
              <input
                type="text"
                class="score-input"
                [(ngModel)]="match.prediction.homeScore"
                (ngModelChange)="onScoreChange(match)"
                maxlength="2"
              />
              <span class="separator">-</span>
              <input
                type="text"
                class="score-input"
                [(ngModel)]="match.prediction.awayScore"
                (ngModelChange)="onScoreChange(match)"
                maxlength="2"
              />
            </div>
            <div class="team away">{{ match.awayTeam }}</div>
          </div>
        </div>
      </div>

      <ion-button
        expand="block"
        class="submit-button"
        [disabled]="!canSubmit()"
        (click)="onSubmit()"
      >
        Submit Predictions
      </ion-button>
    </ion-content>
  `,
  styles: [
    `
      .match-info {
        padding: 8px 16px;
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .venue {
        color: #424242;
        font-weight: 600;
        text-align: left;
      }

      .kickoff {
        color: #424242;
        font-weight: 500;
        text-align: right;
      }

      .match-prediction {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 16px;
        width: 100%;
      }

      .team {
        width: 150px;
        font-size: 14px;
        font-weight: 500;
        color: #424242;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .home {
        text-align: right;
        padding-right: 24px;
      }

      .away {
        text-align: left;
        padding-left: 24px;
      }

      .score-container {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 90px;
        justify-content: center;
      }

      .score-input {
        width: 32px;
        height: 32px;
        text-align: center;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        background: #f5f5f5;
        color: #424242;
        font-size: 14px;
      }

      .separator {
        color: #424242;
        font-weight: 500;
      }

      .warning-message {
        background: #fff3e0;
        color: #e65100;
        padding: 12px;
        border-radius: 4px;
        margin: 8px 0;
        text-align: center;
        font-weight: 500;
      }

      .deadline {
        color: #424242;
        margin-bottom: 8px;
      }

      .selection-info {
        color: #424242;
        margin-bottom: 16px;
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
    IonCardContent,
    IonButton,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
  ],
})
export class MatchesPage {
  currentGameweek = {
    number: 15,
    deadline: '2024-01-20T11:30:00',
    isSpecial: false,
  };

  showAlert = false;
  alertMessage = '';

  // Mock data for available matches
  matches: Match[] = [
    {
      id: 1,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      venue: 'Emirates Stadium',
      kickoff: '2024-01-20T15:00:00',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 2,
      homeTeam: 'Liverpool',
      awayTeam: 'Man City',
      venue: 'Anfield',
      kickoff: '2024-01-20T17:30:00',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 3,
      homeTeam: 'Man United',
      awayTeam: 'Tottenham',
      venue: 'Old Trafford',
      kickoff: '2024-01-21T14:00:00',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 4,
      homeTeam: 'Newcastle',
      awayTeam: 'Aston Villa',
      venue: "St James' Park",
      kickoff: '2024-01-21T16:30:00',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 5,
      homeTeam: 'Brighton',
      awayTeam: 'Crystal Palace',
      venue: 'Amex Stadium',
      kickoff: '2024-01-21T14:00:00',
      prediction: { homeScore: null, awayScore: null },
    },
  ];

  showTooManyPredictionsWarning = false;

  constructor() {
    addIcons({
      timeOutline,
      footballOutline,
      checkmarkCircleOutline,
      informationCircleOutline,
    });
  }

  onScoreChange(match: any) {
    if (!this.currentGameweek.isSpecial) {
      // Show warning if more than 3 predictions
      this.showTooManyPredictionsWarning = this.completedPredictions > 3;
    }
  }

  get completedPredictions(): number {
    return this.matches.filter(
      (match) =>
        match.prediction.homeScore !== null &&
        match.prediction.homeScore !== undefined &&
        match.prediction.awayScore !== null &&
        match.prediction.awayScore !== undefined &&
        match.prediction.homeScore.toString().trim() !== '' &&
        match.prediction.awayScore.toString().trim() !== ''
    ).length;
  }

  canSubmit(): boolean {
    if (this.currentGameweek.isSpecial) {
      return this.matches.every(
        (match) =>
          match.prediction.homeScore !== null &&
          match.prediction.homeScore !== undefined &&
          match.prediction.awayScore !== null &&
          match.prediction.awayScore !== undefined &&
          match.prediction.homeScore.toString().trim() !== '' &&
          match.prediction.awayScore.toString().trim() !== ''
      );
    }
    return this.completedPredictions === 3;
  }

  onSubmit() {
    const predictions = this.matches
      .filter(
        (m) =>
          m.prediction.homeScore !== null && m.prediction.awayScore !== null
      )
      .map((m) => {
        const homeScore = m.prediction.homeScore;
        const awayScore = m.prediction.awayScore;

        if (
          homeScore === undefined ||
          homeScore === null ||
          awayScore === undefined ||
          awayScore === null
        ) {
          return null;
        }

        return {
          matchId: m.id,
          homeTeam: m.homeTeam,
          awayTeam: m.awayTeam,
          homeScore,
          awayScore,
          points: this.calculatePotentialPoints(homeScore, awayScore),
        };
      })
      .filter((pred): pred is NonNullable<typeof pred> => pred !== null);

    console.log('Submitting predictions:', predictions);
    // TODO: Submit predictions to backend
  }

  private calculatePotentialPoints(
    homeScore: number,
    awayScore: number
  ): string {
    let points = '';

    // Result points
    if (homeScore > awayScore) {
      points = '3 pts (home win)';
    } else if (awayScore > homeScore) {
      points = '4 pts (away win)';
    } else {
      points = '6 pts (draw)';
    }

    points += ' + 3 pts for correct score';
    return points;
  }
}
