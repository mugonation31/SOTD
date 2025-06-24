import { Component } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
} from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  footballOutline,
  trophyOutline,
  statsChartOutline,
  timeOutline,
  starOutline,
  checkmarkCircleOutline,
  arrowUpOutline,
  arrowDownOutline,
  removeOutline,
  personOutline,
} from 'ionicons/icons';
import { UserGreetingComponent } from '../../../../shared/components/user-greeting/user-greeting.component';

interface GameweekMatch {
  homeTeam: string;
  awayTeam: string;
  prediction: string;
}

interface Prediction {
  match: string;
  prediction: string;
  points: number;
  correctScore?: boolean;
  correctResult?: boolean;
}

interface LastGameweek {
  totalPoints: number;
  correctScores: number;
  correctResults: number;
  predictions: Prediction[];
}

interface LeaderboardPlayer {
  position: number;
  previousPosition: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
  positionChange: 'up' | 'down' | 'same';
}

@Component({
  selector: 'app-player-dashboard',
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
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    RouterLink,
    DatePipe,
    NgFor,
    NgIf,
    UserGreetingComponent,
  ],
})
export class DashboardPage {
  // Current Gameweek
  currentGameweek = {
    number: 15,
    deadline: '2024-01-20T11:30:00',
    predictionsSubmitted: true,
    selectedMatches: [
      {
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        prediction: '2-1',
      },
      {
        homeTeam: 'Liverpool',
        awayTeam: 'Man City',
        prediction: '1-1',
      },
      {
        homeTeam: 'Man United',
        awayTeam: 'Tottenham',
        prediction: '0-2',
      },
    ] as GameweekMatch[],
  };

  // Last Gameweek Results
  lastGameweek: LastGameweek = {
    totalPoints: 19,
    correctScores: 1,
    correctResults: 2,
    predictions: [
      {
        match: 'Arsenal vs Chelsea',
        prediction: '2-1',
        points: 9,
        correctScore: true,
        correctResult: true,
      },
      {
        match: 'Liverpool vs Man City',
        prediction: '1-1',
        points: 6,
        correctScore: false,
        correctResult: true,
      },
      {
        match: 'Man United vs Tottenham',
        prediction: '0-2',
        points: 4,
        correctScore: false,
        correctResult: true,
      },
    ],
  };

  // Player Stats
  playerStats = {
    totalPoints: 245,
    rank: 12,
    jokersUsed: 1,
    correctResults: 35,
  };

  // Top Players for Mini Leaderboard
  topPlayers: LeaderboardPlayer[] = [
    {
      position: 1,
      previousPosition: 1,
      name: 'John Smith',
      points: 245,
      isCurrentUser: false,
      positionChange: 'same',
    },
    {
      position: 2,
      previousPosition: 4,
      name: 'Sarah Wilson',
      points: 238,
      isCurrentUser: false,
      positionChange: 'up',
    },
    {
      position: 3,
      previousPosition: 2,
      name: 'Mike Johnson',
      points: 232,
      isCurrentUser: false,
      positionChange: 'down',
    },
    {
      position: 4,
      previousPosition: 3,
      name: 'Your Name',
      points: 230,
      isCurrentUser: true,
      positionChange: 'down',
    },
    {
      position: 5,
      previousPosition: 5,
      name: 'David Brown',
      points: 225,
      isCurrentUser: false,
      positionChange: 'same',
    },
  ];

  constructor(private router: Router) {
    addIcons({
      footballOutline,
      trophyOutline,
      statsChartOutline,
      timeOutline,
      starOutline,
      checkmarkCircleOutline,
      arrowUpOutline,
      arrowDownOutline,
      removeOutline,
      personOutline,
    });
  }

  getPositionIcon(change: string): string {
    switch (change) {
      case 'up':
        return 'arrow-up-outline';
      case 'down':
        return 'arrow-down-outline';
      default:
        return 'remove-outline';
    }
  }

  getPositionColor(change: string): string {
    switch (change) {
      case 'up':
        return 'success';
      case 'down':
        return 'danger';
      default:
        return 'medium';
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
