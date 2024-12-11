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
  IonAvatar,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  trophyOutline,
  arrowUpOutline,
  arrowDownOutline,
  removeOutline,
  peopleOutline,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

interface Standing {
  position: number;
  previousPosition: number;
  userId: string;
  name: string;
  avatar?: string;
  played: number;
  points: number;
  correctScores: number;
  correctResults: number;
}

@Component({
  selector: 'app-standings',
  templateUrl: './standings.page.html',
  styleUrls: ['./standings.page.scss'],
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
    IonAvatar,
    DatePipe,
    NgFor,
    NgIf,
    FormsModule,
  ],
})
export class StandingsPage {
  selectedSegment = 'overall';
  currentUserId = '2'; // Mock current user ID

  // Mock data for overall standings
  overallStandings: Standing[] = [
    {
      position: 1,
      previousPosition: 1,
      userId: '1',
      name: 'John Smith',
      played: 15,
      points: 245,
      correctScores: 18,
      correctResults: 35,
    },
    {
      position: 2,
      previousPosition: 3,
      userId: '2',
      name: 'You',
      played: 15,
      points: 230,
      correctScores: 16,
      correctResults: 32,
    },
    {
      position: 3,
      previousPosition: 2,
      userId: '3',
      name: 'Sarah Wilson',
      played: 15,
      points: 225,
      correctScores: 15,
      correctResults: 33,
    },
    // Add more players...
  ];

  // Mock data for group standings
  groupStandings: Standing[] = [
    {
      position: 1,
      previousPosition: 2,
      userId: '2',
      name: 'You',
      played: 15,
      points: 230,
      correctScores: 16,
      correctResults: 32,
    },
    {
      position: 2,
      previousPosition: 1,
      userId: '4',
      name: 'Mike Johnson',
      played: 15,
      points: 220,
      correctScores: 14,
      correctResults: 30,
    },
    // Add more group members...
  ];

  constructor() {
    addIcons({
      trophyOutline,
      arrowUpOutline,
      arrowDownOutline,
      removeOutline,
      peopleOutline,
    });
  }

  getPositionChange(current: number, previous: number): string {
    if (current === previous) return 'same';
    return current < previous ? 'up' : 'down';
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

  isCurrentUser(userId: string): boolean {
    return userId === this.currentUserId;
  }
}
