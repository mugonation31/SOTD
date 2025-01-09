import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonCardTitle,
  IonInput,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface GameWeek {
  number: number;
  isSpecial: boolean; // true for Christmas/End of season weeks
  deadline: Date;
  matches: Match[];
}

interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  venue: string;
  kickoff: Date;
  capacity?: string;
  isSelected?: boolean; // For tracking user's 3 selections
}

interface PastPrediction {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  venue: string;
  kickoff: Date;
  result?: string;
}

@Component({
  selector: 'app-predictions',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Predictions</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-segment
        [(ngModel)]="selectedTab"
        (ionChange)="segmentChanged($event)"
      >
        <ion-segment-button value="make">
          <ion-label>Make Predictions</ion-label>
        </ion-segment-button>
        <ion-segment-button value="all">
          <ion-label>All Predictions</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- Make Predictions Tab -->
      <div *ngIf="selectedTab === 'make'">
        <div class="admin-note">
          As group admin, you can only view other players' predictions after the
          deadline has passed
        </div>

        <div class="gameweek-container">
          <h2>Game Week {{ currentGameWeek.number }}</h2>
          <p class="deadline">
            Deadline:
            {{ currentGameWeek.deadline | date : 'MMM d, yyyy, h:mm a' }}
          </p>
          <p class="selection-info" *ngIf="!currentGameWeek.isSpecial">
            Make any 3 predictions for this game week
          </p>
          <p class="selection-info" *ngIf="currentGameWeek.isSpecial">
            Special Game Week - Predict all 10 matches
          </p>

          <!-- Warning Message -->
          <div class="warning-message" *ngIf="showTooManyPredictionsWarning">
            You can't make more than 3 predictions for this game week
          </div>

          <div class="predictions-list">
            <div
              class="match-row"
              *ngFor="let match of currentGameWeek.matches; let i = index"
            >
              <div class="match-info">
                <div class="venue">{{ match.venue }}</div>
                <div class="kickoff">
                  {{ match.kickoff | date : 'EEEE d MMM HH:mm' }}
                </div>
              </div>

              <div class="match-prediction">
                <span class="team home">{{ match.homeTeam }}</span>
                <div class="score-container">
                  <input
                    type="text"
                    class="score-input"
                    maxlength="2"
                    [(ngModel)]="match.homeScore"
                    [name]="'home' + i"
                    (ngModelChange)="onScoreChange(match)"
                  />
                  <span class="separator">-</span>
                  <input
                    type="text"
                    class="score-input"
                    maxlength="2"
                    [(ngModel)]="match.awayScore"
                    [name]="'away' + i"
                    (ngModelChange)="onScoreChange(match)"
                  />
                </div>
                <span class="team away">{{ match.awayTeam }}</span>
              </div>
            </div>
          </div>

          <ion-button
            expand="full"
            type="submit"
            class="submit-button"
            [disabled]="!canSubmit"
          >
            SUBMIT PREDICTIONS
          </ion-button>
        </div>

        <!-- Past Predictions Section -->
        <div class="past-predictions" *ngIf="pastPredictions.length > 0">
          <h3>Previous Predictions</h3>
          <div class="predictions-list">
            <div class="match-row" *ngFor="let prediction of pastPredictions">
              <div class="match-info">
                <div class="venue">{{ prediction.venue }}</div>
                <div class="kickoff">
                  {{ prediction.kickoff | date : 'EEEE d MMM HH:mm' }}
                </div>
              </div>

              <div class="match-prediction">
                <span class="team home">{{ prediction.homeTeam }}</span>
                <div class="score-container">
                  <span class="past-score">
                    {{ prediction.homeScore }} - {{ prediction.awayScore }}
                  </span>
                </div>
                <span class="team away">{{ prediction.awayTeam }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- All Predictions Tab -->
      <div *ngIf="selectedTab === 'all'" class="all-predictions">
        <div class="gameweek-container">
          <h2>Game Week {{ currentGameWeek }} Predictions</h2>

          <div *ngIf="!hasDeadlinePassed" class="deadline-message">
            <ion-note>
              Predictions will be visible after the deadline:
              {{ currentGameWeek.deadline | date : 'MMM d, yyyy, h:mm a' }}
            </ion-note>
          </div>

          <div *ngIf="hasDeadlinePassed" class="predictions-list">
            <div class="match-row" *ngFor="let match of matchesWithPredictions">
              <div class="match-info">
                <div class="venue">{{ match.venue }}</div>
                <div class="kickoff">
                  {{ match.kickoff | date : 'EEEE d MMM HH:mm' }}
                </div>
              </div>

              <div class="match-header">
                <span class="team home">{{ match.homeTeam }}</span>
                <span>vs</span>
                <span class="team away">{{ match.awayTeam }}</span>
              </div>

              <div class="predictions-grid">
                <div
                  class="prediction-row"
                  *ngFor="let pred of match.predictions"
                >
                  <span class="player-name">{{ pred.playerName }}</span>
                  <span class="prediction-score">
                    {{ pred.homeScore }} - {{ pred.awayScore }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .gameweek-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 16px;
      }

      .predictions-list {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        margin-bottom: 20px;
      }

      .match-row {
        border-bottom: 1px solid #e0e0e0;
      }

      .match-row:last-child {
        border-bottom: none;
      }

      .match-info {
        display: flex;
        justify-content: space-between;
        padding: 8px 16px;
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
        font-size: 13px;
      }

      .venue {
        color: #000000;
        font-weight: 600;
      }

      .kickoff {
        color: #000000;
        margin-top: 2px;
        font-weight: 500;
      }

      .match-prediction {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 16px;
        width: 100%;
        min-width: 600px;
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
        color: #000000;
        font-size: 14px;
      }

      .separator {
        color: #424242;
        font-weight: 500;
      }

      .submit-button {
        --background: #4a90e2;
        --border-radius: 4px;
        margin: 20px 0;
        height: 44px;
      }

      .admin-note {
        text-align: center;
        background: #f8f9fa;
        padding: 12px;
        margin-bottom: 24px;
        border-radius: 4px;
      }

      h2 {
        text-align: center;
        margin-bottom: 4px;
        color: #000000;
        font-weight: 600;
      }

      .deadline {
        text-align: center;
        margin-bottom: 24px;
        color: #333333;
      }

      ion-segment {
        padding: 16px;
      }

      .all-predictions {
        margin-top: 16px;
      }

      .deadline-message {
        text-align: center;
        padding: 32px 16px;
        background: #f8f9fa;
        border-radius: 4px;
        margin-top: 16px;
      }

      .match-header {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        padding: 12px;
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
        font-weight: 500;
      }

      .predictions-grid {
        padding: 12px 16px;
      }

      .prediction-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .prediction-row:last-child {
        border-bottom: none;
      }

      .player-name {
        color: #666;
        font-size: 14px;
      }

      .prediction-score {
        font-weight: 500;
        color: #333;
        font-size: 14px;
      }

      .selection-info {
        text-align: center;
        color: #333333;
        margin-bottom: 16px;
      }

      .match-row {
        cursor: pointer;
        opacity: 0.6;
        transition: all 0.2s ease;
      }

      .match-row.selected {
        opacity: 1;
        background: white;
      }

      .match-row.disabled {
        cursor: not-allowed;
      }

      .gameweek-info {
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
        background: #f8f9fa;
      }

      .match-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
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
    `,
  ],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCardTitle,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonNote,
    DatePipe,
    NgIf,
    NgFor,
    FormsModule,
  ],
})
export class PredictionsPage implements OnInit {
  selectedTab = 'make';
  hasDeadlinePassed = false;
  currentGameWeek: GameWeek = {
    number: 24,
    isSpecial: false,
    deadline: new Date('2024-01-20T12:30:00'),
    matches: [
      {
        homeTeam: 'Arsenal',
        awayTeam: 'Crystal Palace',
        homeScore: null,
        awayScore: null,
        venue: 'Emirates Stadium, London',
        kickoff: new Date('2024-01-20T12:30:00'),
        capacity: '60,704',
        isSelected: false,
      },
      {
        homeTeam: 'Brentford',
        awayTeam: 'Nottingham Forest',
        homeScore: null,
        awayScore: null,
        venue: 'Gtech Community Stadium',
        kickoff: new Date('2024-01-20T15:00:00'),
        capacity: '17,250',
        isSelected: false,
      },
      // Add all 10 matches for the game week
      {
        homeTeam: 'Sheffield United',
        awayTeam: 'West Ham',
        homeScore: null,
        awayScore: null,
        venue: 'Bramall Lane',
        kickoff: new Date('2024-01-20T15:00:00'),
        isSelected: false,
      },
      {
        homeTeam: 'Brighton',
        awayTeam: 'Wolves',
        homeScore: null,
        awayScore: null,
        venue: 'Amex Stadium',
        kickoff: new Date('2024-01-20T15:00:00'),
        isSelected: false,
      },
      {
        homeTeam: 'Man United',
        awayTeam: 'Tottenham',
        homeScore: null,
        awayScore: null,
        venue: 'Old Trafford',
        kickoff: new Date('2024-01-20T17:30:00'),
        isSelected: false,
      },
      {
        homeTeam: 'Newcastle',
        awayTeam: 'Man City',
        homeScore: null,
        awayScore: null,
        venue: "St James' Park",
        kickoff: new Date('2024-01-21T17:30:00'),
        isSelected: false,
      },
      {
        homeTeam: 'Bournemouth',
        awayTeam: 'Liverpool',
        homeScore: null,
        awayScore: null,
        venue: 'Vitality Stadium',
        kickoff: new Date('2024-01-21T16:30:00'),
        isSelected: false,
      },
      {
        homeTeam: 'Chelsea',
        awayTeam: 'Fulham',
        homeScore: null,
        awayScore: null,
        venue: 'Stamford Bridge',
        kickoff: new Date('2024-01-21T14:00:00'),
        isSelected: false,
      },
      {
        homeTeam: 'Aston Villa',
        awayTeam: 'Everton',
        homeScore: null,
        awayScore: null,
        venue: 'Villa Park',
        kickoff: new Date('2024-01-21T14:00:00'),
        isSelected: false,
      },
      {
        homeTeam: 'Burnley',
        awayTeam: 'Luton Town',
        homeScore: null,
        awayScore: null,
        venue: 'Turf Moor',
        kickoff: new Date('2024-01-21T14:00:00'),
        isSelected: false,
      },
    ],
  };

  pastPredictions: PastPrediction[] = [
    {
      homeTeam: 'Man United',
      awayTeam: 'Tottenham',
      homeScore: 2,
      awayScore: 1,
      venue: 'Old Trafford, Manchester',
      kickoff: new Date('2024-01-14T16:30:00'),
      result: 'Correct Score',
    },
  ];

  matchesWithPredictions = [
    {
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      venue: 'Emirates Stadium, London',
      kickoff: new Date('2024-01-20T17:30:00'),
      predictions: [
        { playerName: 'John (Admin)', homeScore: 2, awayScore: 1 },
        { playerName: 'Sarah', homeScore: 1, awayScore: 1 },
        { playerName: 'Mike', homeScore: 3, awayScore: 0 },
      ],
    },
    // ... more matches
  ];

  showTooManyPredictionsWarning = false;

  segmentChanged(event: any) {
    this.selectedTab = event.detail.value;
  }

  ngOnInit() {
    // Check if deadline has passed
    this.hasDeadlinePassed = new Date() > this.currentGameWeek.deadline;
  }

  get completedPredictions(): number {
    return this.currentGameWeek.matches.filter(
      (match) =>
        match.homeScore !== null &&
        match.homeScore !== undefined &&
        match.awayScore !== null &&
        match.awayScore !== undefined &&
        match.homeScore.toString().trim() !== '' &&
        match.awayScore.toString().trim() !== ''
    ).length;
  }

  get canSubmit(): boolean {
    if (this.currentGameWeek.isSpecial) {
      // Special weeks require all matches to be predicted
      return this.currentGameWeek.matches.every(
        (match) =>
          match.homeScore !== null &&
          match.homeScore !== undefined &&
          match.awayScore !== null &&
          match.awayScore !== undefined &&
          match.homeScore.toString().trim() !== '' &&
          match.awayScore.toString().trim() !== ''
      );
    }
    // Regular weeks require exactly 3 complete predictions
    return this.completedPredictions === 3;
  }

  submitPredictions() {
    if (!this.canSubmit) {
      return;
    }

    const predictions = this.currentGameWeek.matches.filter(
      (match) =>
        match.homeScore !== null &&
        match.homeScore !== undefined &&
        match.awayScore !== null &&
        match.awayScore !== undefined &&
        match.homeScore.toString().trim() !== '' &&
        match.awayScore.toString().trim() !== ''
    );

    if (this.currentGameWeek.isSpecial || predictions.length === 3) {
      console.log('Submitting predictions:', predictions);
      // Add API call here
    }
  }

  onScoreChange(match: Match) {
    if (!this.currentGameWeek.isSpecial) {
      // Show warning if more than 3 predictions
      this.showTooManyPredictionsWarning = this.completedPredictions > 3;
    }
  }
}
