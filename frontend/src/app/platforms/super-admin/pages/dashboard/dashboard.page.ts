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
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonBadge,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  layersOutline,
  footballOutline,
  trophyOutline,
  alertCircleOutline,
  timeOutline,
  lockClosedOutline,
  checkmarkCircleOutline,
  starOutline,
  calendarOutline,
  walletOutline, personAddOutline } from 'ionicons/icons';

interface SystemOverview {
  totalGroups: number;
  activeGroups: number;
  totalUsers: number;
  activeUsers: number;
  totalPredictions: number;
  submittedPredictions: number;
  currentGameweek: number;
  nextDeadline: Date;
  jokerStats: {
    firstJokerUsed: number;
    secondJokerUsed: number;
    totalEligible: number;
  };
  specialEvents: {
    nextEvent: 'boxing_day' | 'final_day' | null;
    daysUntil: number;
  };
  paymentStats: {
    totalPaid: number;
    totalPending: number;
    totalGroups: number;
  };
}

interface RecentActivity {
  type:
    | 'group_created'
    | 'user_joined'
    | 'prediction_submitted'
    | 'deadline_passed';
  description: string;
  timestamp: Date;
}

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
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    IonBadge,
    IonList,
    IonItem,
    IonLabel,
    RouterLink,
    NgFor,
    NgIf,
    DatePipe,
  ],
})
export class DashboardPage {
  overview: SystemOverview = {
    totalGroups: 15,
    activeGroups: 12,
    totalUsers: 156,
    activeUsers: 143,
    totalPredictions: 429,
    submittedPredictions: 398,
    currentGameweek: 15,
    nextDeadline: new Date('2024-03-23T11:30:00'),
    jokerStats: {
      firstJokerUsed: 85,
      secondJokerUsed: 32,
      totalEligible: 143,
    },
    specialEvents: {
      nextEvent: 'boxing_day',
      daysUntil: 45,
    },
    paymentStats: {
      totalPaid: 12,
      totalPending: 3,
      totalGroups: 15,
    },
  };

  recentActivities: RecentActivity[] = [
    {
      type: 'group_created',
      description: 'New group "Premier League Fanatics" created',
      timestamp: new Date('2024-03-20T14:30:00'),
    },
    {
      type: 'user_joined',
      description: 'New user joined "Champions League Group"',
      timestamp: new Date('2024-03-20T13:15:00'),
    },
    {
      type: 'prediction_submitted',
      description: 'Batch of 25 predictions submitted for GW15',
      timestamp: new Date('2024-03-20T12:45:00'),
    },
    {
      type: 'deadline_passed',
      description: 'Gameweek 14 deadline passed, predictions locked',
      timestamp: new Date('2024-03-20T11:30:00'),
    },
  ];

  constructor() {
    addIcons({layersOutline,peopleOutline,footballOutline,timeOutline,starOutline,calendarOutline,walletOutline,personAddOutline,trophyOutline,alertCircleOutline,lockClosedOutline,checkmarkCircleOutline,});
  }

  getTimeUntilDeadline(): string {
    const now = new Date();
    const diff = this.overview.nextDeadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 0) return 'Deadline passed';
    if (hours < 24) return `${hours}h remaining`;
    return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'group_created':
        return 'layers-outline';
      case 'user_joined':
        return 'people-outline';
      case 'prediction_submitted':
        return 'football-outline';
      case 'deadline_passed':
        return 'time-outline';
      default:
        return 'alert-circle-outline';
    }
  }

  getActivityColor(type: string): string {
    switch (type) {
      case 'group_created':
        return 'primary';
      case 'user_joined':
        return 'secondary';
      case 'prediction_submitted':
        return 'success';
      case 'deadline_passed':
        return 'warning';
      default:
        return 'medium';
    }
  }

  getNextEventDisplay(): string {
    if (!this.overview.specialEvents.nextEvent) return 'No upcoming events';
    return this.overview.specialEvents.nextEvent === 'boxing_day'
      ? 'Boxing Day Special'
      : 'Final Day Madness';
  }

  async manageSpecialEvent() {
    // TODO: Implement special event management modal
    console.log('Managing special events');
  }

  async manageJokers() {
    // TODO: Implement joker management modal
    console.log('Managing joker rules');
  }

  async managePayments() {
    // TODO: Implement payment overview modal
    console.log('Managing payments');
  }
}
