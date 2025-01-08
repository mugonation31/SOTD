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
} from '@ionic/angular/standalone';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-predictions',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Predictions</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="admin-note">
              <ion-note>
                As group admin, you can only view other players' predictions
                after the deadline has passed
              </ion-note>
            </div>

            <!-- Current Game Week Predictions -->
            <ion-card>
              <ion-card-header>
                <ion-card-title>Game Week {{ currentGameWeek }}</ion-card-title>
                <ion-note
                  >Deadline: {{ gameWeekDeadline | date : 'medium' }}</ion-note
                >
              </ion-card-header>

              <ion-card-content>
                <form (ngSubmit)="submitPredictions()">
                  <ion-list>
                    <ion-item
                      *ngFor="let match of currentMatches; let i = index"
                    >
                      <div class="match-row">
                        <span class="team">{{ match.homeTeam }}</span>
                        <div class="score-inputs">
                          <ion-input
                            class="score-input"
                            type="text"
                            maxlength="2"
                            [(ngModel)]="match.homeScore"
                            [name]="'home' + i"
                          ></ion-input>
                          <span class="score-separator">-</span>
                          <ion-input
                            class="score-input"
                            type="text"
                            maxlength="2"
                            [(ngModel)]="match.awayScore"
                            [name]="'away' + i"
                          ></ion-input>
                        </div>
                        <span class="team">{{ match.awayTeam }}</span>
                      </div>
                    </ion-item>
                  </ion-list>

                  <div class="submit-button">
                    <ion-button
                      type="submit"
                      expand="block"
                      [disabled]="!isValidPredictions()"
                    >
                      Submit Predictions
                    </ion-button>
                  </div>
                </form>
              </ion-card-content>
            </ion-card>

            <!-- Past Predictions -->
            <ion-card *ngIf="hasPastPredictions">
              <ion-card-header>
                <ion-card-title>Past Predictions</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <ion-list>
                  <ion-item *ngFor="let prediction of pastPredictions">
                    <div class="past-match">
                      <span class="team">{{ prediction.homeTeam }}</span>
                      <span class="score">
                        {{ prediction.homeScore }} - {{ prediction.awayScore }}
                      </span>
                      <span class="team">{{ prediction.awayTeam }}</span>
                    </div>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [
    `
      .match-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 8px 0;
      }

      .team {
        flex: 1;
        font-weight: 500;
      }

      .team:first-child {
        text-align: right;
        padding-right: 1rem;
      }

      .team:last-child {
        text-align: left;
        padding-left: 1rem;
      }

      .score-inputs {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 120px;
        justify-content: center;
        padding: 8px 0;
      }

      .score-input {
        width: 40px;
        height: 28px;
        text-align: center;
        --padding-start: 0;
        --padding-end: 0;
        --background: #ffffff;
        border: 2px solid #d1d1d1;
        border-radius: 4px;
        --highlight-height: 0;
        --highlight-color-focused: none;
        --border-width: 0;
        margin: 0;
        display: block;
        overflow: visible;
      }

      /* Ensure no arrows appear */
      .score-input::part(native) {
        padding: 0;
        margin: 0;
        -moz-appearance: textfield;
        font-size: 15px;
      }

      .score-input::part(native)::-webkit-outer-spin-button,
      .score-input::part(native)::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .score-separator {
        color: var(--ion-color-medium);
        font-weight: 500;
      }

      .submit-button {
        margin: 1.5rem 0 0.5rem;
      }

      .past-match {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0.5rem 0;
      }

      .score {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        min-width: 60px;
        justify-content: center;
        font-weight: 500;
        color: var(--ion-color-dark);
      }

      .admin-note {
        padding: 1rem;
        text-align: center;
        background: var(--ion-color-light);
        margin: 1rem;
        border-radius: 8px;
      }

      @media (max-width: 768px) {
        .team {
          font-size: 0.9rem;
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
    DatePipe,
    NgIf,
    NgFor,
    FormsModule,
  ],
})
export class PredictionsPage implements OnInit {
  currentGameWeek = 1;
  gameWeekDeadline = new Date();
  hasPastPredictions = false;
  currentMatches = [
    {
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      homeScore: null,
      awayScore: null,
    },
    {
      homeTeam: 'Liverpool',
      awayTeam: 'Man City',
      homeScore: null,
      awayScore: null,
    },
    {
      homeTeam: 'Man United',
      awayTeam: 'Tottenham',
      homeScore: null,
      awayScore: null,
    },
  ];

  pastPredictions = [
    {
      homeTeam: 'Arsenal',
      awayTeam: 'Liverpool',
      homeScore: 2,
      awayScore: 1,
    },
    {
      homeTeam: 'Chelsea',
      awayTeam: 'Man City',
      homeScore: 0,
      awayScore: 3,
    },
    {
      homeTeam: 'Tottenham',
      awayTeam: 'Man United',
      homeScore: 1,
      awayScore: 1,
    },
  ];

  ngOnInit() {
    this.loadPredictions();
  }

  loadPredictions() {
    // This would be replaced with actual API calls
    this.hasPastPredictions = this.pastPredictions.length > 0;
  }

  isValidPredictions(): boolean {
    return this.currentMatches.every(
      (match) =>
        match.homeScore !== null &&
        match.awayScore !== null &&
        match.homeScore >= 0 &&
        match.awayScore >= 0
    );
  }

  async submitPredictions() {
    if (this.isValidPredictions()) {
      console.log('Submitting predictions:', this.currentMatches);
      // Add API call here
    }
  }
}
