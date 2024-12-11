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
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  footballOutline,
  trophyOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  timeOutline,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

interface Prediction {
  id: number;
  gameweek: number;
  match: {
    homeTeam: string;
    awayTeam: string;
    kickoff: string;
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
  selector: 'app-player-predictions',
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
    DatePipe,
    NgFor,
    NgIf,
    FormsModule,
  ],
})
export class PredictionsPage {
  selectedSegment = 'current';

  // Mock data for current gameweek
  currentGameweek = {
    number: 15,
    predictions: [
      {
        id: 1,
        gameweek: 15,
        match: {
          homeTeam: 'Arsenal',
          awayTeam: 'Chelsea',
          kickoff: '2024-01-20T15:00:00',
        },
        prediction: {
          home: 2,
          away: 1,
        },
        status: 'pending',
      },
      {
        id: 2,
        gameweek: 15,
        match: {
          homeTeam: 'Liverpool',
          awayTeam: 'Man City',
          kickoff: '2024-01-20T17:30:00',
        },
        prediction: {
          home: 1,
          away: 1,
        },
        status: 'pending',
      },
    ] as Prediction[],
  };

  // Mock data for historical predictions
  historicalPredictions = [
    {
      id: 3,
      gameweek: 14,
      match: {
        homeTeam: 'Man United',
        awayTeam: 'Tottenham',
        kickoff: '2024-01-14T14:00:00',
        finalScore: {
          home: 2,
          away: 1,
        },
      },
      prediction: {
        home: 2,
        away: 1,
      },
      points: 9,
      status: 'correct',
    },
    {
      id: 4,
      gameweek: 14,
      match: {
        homeTeam: 'Newcastle',
        awayTeam: 'Aston Villa',
        kickoff: '2024-01-14T16:30:00',
        finalScore: {
          home: 1,
          away: 2,
        },
      },
      prediction: {
        home: 2,
        away: 1,
      },
      points: 0,
      status: 'incorrect',
    },
  ] as Prediction[];

  stats = {
    totalPoints: 245,
    correctScores: 18,
    correctResults: 35,
    averagePoints: 6.8,
  };

  constructor() {
    addIcons({
      footballOutline,
      trophyOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      timeOutline,
    });
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
}
