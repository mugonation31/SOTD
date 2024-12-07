import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  IonBadge,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  footballOutline,
  trophyOutline,
  statsChartOutline,
  timeOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
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
    IonBadge,
    IonList,
    IonItem,
    IonLabel,
    RouterLink,
    DatePipe,
    NgFor,
  ],
})
export class DashboardPage {
  // Mock data - will be replaced with real data later
  currentGameweek = {
    number: 15,
    deadline: '2024-01-20T11:30:00',
    predictionsSubmitted: false,
  };

  playerStats = {
    totalPoints: 245,
    rank: 12,
    correctScores: 18,
    correctResults: 35,
  };

  recentPredictions = [
    { match: 'Arsenal vs Chelsea', prediction: '2-1', points: 9 },
    { match: 'Liverpool vs Man City', prediction: '1-1', points: 6 },
    { match: 'Man United vs Tottenham', prediction: '0-2', points: 4 },
  ];

  constructor() {
    addIcons({
      footballOutline,
      trophyOutline,
      statsChartOutline,
      timeOutline,
    });
  }
}
