import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonBadge,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { footballOutline, saveOutline } from 'ionicons/icons';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  kickoff: Date;
  competition: string;
  status: 'upcoming' | 'live' | 'finished';
}

interface Prediction {
  matchId: string;
  homeScore: number;
  awayScore: number;
  points?: number;
  submitted: boolean;
}

@Component({
  selector: 'app-match-predictions',
  template: `
    <ion-card *ngFor="let match of matches">
      <ion-card-header>
        <ion-card-title>{{ match.competition }}</ion-card-title>
        <div class="gameweek">Gameweek {{ currentGameweek }}</div>
      </ion-card-header>
      <ion-card-content>
        <div class="match-details">
          <div class="team home">
            <span class="team-name">{{ match.homeTeam }}</span>
            <ion-input
              type="number"
              [disabled]="match.status !== 'upcoming'"
              [(ngModel)]="getPrediction(match.id).homeScore"
              (ionChange)="updatePrediction(match.id)"
            ></ion-input>
          </div>
          <div class="vs">vs</div>
          <div class="team away">
            <ion-input
              type="number"
              [disabled]="match.status !== 'upcoming'"
              [(ngModel)]="getPrediction(match.id).awayScore"
              (ionChange)="updatePrediction(match.id)"
            ></ion-input>
            <span class="team-name">{{ match.awayTeam }}</span>
          </div>
        </div>
        <div class="match-info">
          <span class="kickoff"
            >Kickoff: {{ match.kickoff | date : 'short' }}</span
          >
          <ion-badge [color]="getStatusColor(match.status)">{{
            match.status
          }}</ion-badge>
          <div
            class="points"
            *ngIf="getPrediction(match.id).points !== undefined"
          >
            Points: {{ getPrediction(match.id).points }}
          </div>
        </div>
        <ion-button
          expand="block"
          [disabled]="
            match.status !== 'upcoming' || !isPredictionValid(match.id)
          "
          (click)="submitPrediction(match.id)"
        >
          <ion-icon name="save-outline"></ion-icon>
          Submit Prediction
        </ion-button>
      </ion-card-content>
    </ion-card>
  `,
  styles: [
    `
      .match-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 1rem 0;
      }
      .team {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .team.away {
        flex-direction: row-reverse;
      }
      .team-name {
        font-weight: bold;
      }
      ion-input {
        width: 60px;
        text-align: center;
      }
      .vs {
        font-weight: bold;
        color: var(--ion-color-medium);
      }
      .match-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;
        font-size: 0.9em;
      }
      .points {
        font-weight: bold;
        color: var(--ion-color-success);
      }
      .gameweek {
        font-size: 0.9em;
        color: var(--ion-color-medium);
        margin-top: 0.5rem;
      }
    `,
  ],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonBadge,
    FormsModule,
    NgFor,
    NgIf,
    DatePipe,
  ],
})
export class MatchPredictionsComponent {
  @Input() matches: Match[] = [];
  @Input() currentGameweek: number = 1;
  @Output() predictionsSubmitted = new EventEmitter<Prediction[]>();

  predictions: Map<string, Prediction> = new Map();

  constructor() {
    addIcons({ footballOutline, saveOutline });
  }

  getPrediction(matchId: string): Prediction {
    if (!this.predictions.has(matchId)) {
      this.predictions.set(matchId, {
        matchId,
        homeScore: 0,
        awayScore: 0,
        submitted: false,
      });
    }
    return this.predictions.get(matchId)!;
  }

  updatePrediction(matchId: string) {
    // Implement prediction update logic
    console.log('Prediction updated for match:', matchId);
  }

  submitPrediction(matchId: string) {
    const prediction = this.predictions.get(matchId);
    if (prediction) {
      prediction.submitted = true;
      // Emit the updated predictions
      this.predictionsSubmitted.emit(Array.from(this.predictions.values()));
    }
  }

  isPredictionValid(matchId: string): boolean {
    const prediction = this.predictions.get(matchId);
    return prediction
      ? prediction.homeScore >= 0 && prediction.awayScore >= 0
      : false;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'live':
        return 'success';
      case 'finished':
        return 'medium';
      default:
        return 'medium';
    }
  }
}
