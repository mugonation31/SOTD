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
import { NgFor, NgIf, DatePipe, TitleCasePipe } from '@angular/common';
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
  walletOutline,
  serverOutline,
  speedometerOutline,
  syncOutline,
  shieldOutline,
  warningOutline,
  cloudOutline } from 'ionicons/icons';

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

interface SystemHealth {
  platform: {
    uptime: number; // percentage
    lastOutage: Date | null;
    status: 'healthy' | 'warning' | 'critical';
  };
  performance: {
    avgResponseTime: number; // milliseconds
    errorRate: number; // percentage
    activeConnections: number;
  };
  dataSync: {
    footballApiStatus: 'connected' | 'disconnected' | 'error';
    lastSync: Date;
    nextSync: Date;
    failedSyncs: number;
  };
  security: {
    failedLogins: number;
    suspiciousActivity: number;
    lastSecurityScan: Date;
    vulnerabilities: number;
  };
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
    TitleCasePipe,
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

  systemHealth: SystemHealth = {
    platform: {
      uptime: 99.8,
      lastOutage: new Date('2024-03-18T09:15:00'),
      status: 'healthy',
    },
    performance: {
      avgResponseTime: 245,
      errorRate: 0.02,
      activeConnections: 1247,
    },
    dataSync: {
      footballApiStatus: 'connected',
      lastSync: new Date('2024-03-20T14:30:00'),
      nextSync: new Date('2024-03-20T18:00:00'),
      failedSyncs: 0,
    },
    security: {
      failedLogins: 3,
      suspiciousActivity: 0,
      lastSecurityScan: new Date('2024-03-20T02:00:00'),
      vulnerabilities: 0,
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
    addIcons({layersOutline,peopleOutline,footballOutline,timeOutline,starOutline,calendarOutline,walletOutline,trophyOutline,alertCircleOutline,lockClosedOutline,checkmarkCircleOutline,serverOutline,speedometerOutline,syncOutline,shieldOutline,warningOutline,cloudOutline,});
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

  // System Health Helper Methods
  getSystemHealthStatusColor(status: string): string {
    switch (status) {
      case 'healthy':
        return 'success';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getApiSyncStatusColor(status: string): string {
    switch (status) {
      case 'connected':
        return 'success';
      case 'disconnected':
        return 'warning';
      case 'error':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }

  getTimeUntil(date: Date): string {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m`;
    return 'Now';
  }
}
