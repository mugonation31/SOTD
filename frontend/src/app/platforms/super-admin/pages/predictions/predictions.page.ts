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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonBadge,
  IonList,
  IonIcon,
  IonButton,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  footballOutline,
  trophyOutline,
  starOutline,
  timeOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  peopleOutline,
  star,
} from 'ionicons/icons';

interface Prediction {
  id: string;
  userId: string;
  userName: string;
  groupId: string;
  groupName: string;
  gameweek: number;
  matches: {
    homeTeam: string;
    awayTeam: string;
    prediction: {
      home: number;
      away: number;
    };
    actual?: {
      home: number;
      away: number;
    };
    points?: number;
    isJoker?: boolean;
  }[];
  submittedAt: Date;
  totalPoints?: number;
  status: 'pending' | 'scored' | 'late';
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
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonBadge,
    IonList,
    IonIcon,
    IonButton,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
  ],
})
export class PredictionsPage {
  activeTab = 'current';
  searchTerm = '';
  selectedGroup = 'all';
  selectedGameweek = 15;
  currentGameweek = 15;

  stats = {
    totalPlayers: 143,
    submittedPredictions: 128,
    jokersUsed: 15,
    perfectScores: 45,
    correctResults: 287,
    averagePoints: 6.8,
    highestScore: 19,
    firstJokerUsed: 85,
    secondJokerUsed: 32,
  };

  groups = [
    { id: '1', name: 'Premier League A' },
    { id: '2', name: 'Premier League B' },
  ];

  gameweeks = Array.from({ length: 38 }, (_, i) => i + 1);

  filteredPredictions: Prediction[] = [
    // Mock data for current predictions
    {
      id: '1',
      userId: 'user1',
      userName: 'John Smith',
      groupId: '1',
      groupName: 'Premier League A',
      gameweek: 15,
      matches: [
        {
          homeTeam: 'Arsenal',
          awayTeam: 'Chelsea',
          prediction: { home: 2, away: 1 },
          isJoker: true,
        },
        {
          homeTeam: 'Liverpool',
          awayTeam: 'Man City',
          prediction: { home: 1, away: 1 },
        },
        {
          homeTeam: 'Man United',
          awayTeam: 'Tottenham',
          prediction: { home: 2, away: 0 },
        },
      ],
      submittedAt: new Date(),
      status: 'pending',
    },
  ];

  historicalPredictions: Prediction[] = [
    // Mock data for historical predictions
    {
      id: '2',
      userId: 'user1',
      userName: 'John Smith',
      groupId: '1',
      groupName: 'Premier League A',
      gameweek: 14,
      matches: [
        {
          homeTeam: 'Arsenal',
          awayTeam: 'Chelsea',
          prediction: { home: 2, away: 1 },
          actual: { home: 2, away: 1 },
          points: 9,
        },
      ],
      submittedAt: new Date('2024-03-10'),
      totalPoints: 9,
      status: 'scored',
    },
  ];

  constructor() {
    addIcons({
      footballOutline,
      trophyOutline,
      starOutline,
      timeOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      peopleOutline,
      star,
    });
  }

  getPredictionStatusColor(status: string): string {
    switch (status) {
      case 'scored':
        return 'success';
      case 'late':
        return 'warning';
      default:
        return 'medium';
    }
  }

  applyFilters() {
    // TODO: Implement filtering logic
    console.log('Applying filters:', {
      search: this.searchTerm,
      group: this.selectedGroup,
      gameweek: this.selectedGameweek,
    });
  }
}
