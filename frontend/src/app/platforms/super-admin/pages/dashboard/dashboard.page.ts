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
import { NgFor, NgIf, DatePipe, TitleCasePipe, DecimalPipe } from '@angular/common';
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
  trendingUpOutline,
  cashOutline,
  pulseOutline,
  statsChartOutline,
  phonePortraitOutline,
  desktopOutline,
  chatbubbleOutline } from 'ionicons/icons';

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



interface BusinessIntelligence {
  growth: {
    newUsersThisWeek: number;
    newUsersThisMonth: number;
    newGroupsThisWeek: number;
    newGroupsThisMonth: number;
    growthRateWeekly: number; // percentage
    growthRateMonthly: number; // percentage
  };
  revenue: {
    monthlyRecurringRevenue: number; // in currency
    totalRevenue: number;
    conversionRate: number; // percentage
    averageRevenuePerUser: number;
    churnRate: number; // percentage
  };
  engagement: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    averageSessionDuration: number; // minutes
    predictionsPerUser: number;
    retentionRate: number; // percentage
  };
  adoption: {
    featuresUsed: {
      predictions: number; // percentage of users
      jokers: number;
      groupChat: number;
      leaderboards: number;
    };
    platformUsage: {
      mobile: number; // percentage
      web: number;
    };
    topGroups: {
      name: string;
      members: number;
      engagement: number; // percentage
    }[];
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
    DecimalPipe,
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



  businessIntelligence: BusinessIntelligence = {
    growth: {
      newUsersThisWeek: 47,
      newUsersThisMonth: 203,
      newGroupsThisWeek: 5,
      newGroupsThisMonth: 18,
      growthRateWeekly: 12.5,
      growthRateMonthly: 28.7,
    },
    revenue: {
      monthlyRecurringRevenue: 3240,
      totalRevenue: 18650,
      conversionRate: 8.3,
      averageRevenuePerUser: 23.50,
      churnRate: 3.2,
    },
    engagement: {
      dailyActiveUsers: 89,
      weeklyActiveUsers: 127,
      averageSessionDuration: 14.5,
      predictionsPerUser: 8.7,
      retentionRate: 76.4,
    },
    adoption: {
      featuresUsed: {
        predictions: 94.2,
        jokers: 67.8,
        groupChat: 43.1,
        leaderboards: 82.5,
      },
      platformUsage: {
        mobile: 68.3,
        web: 31.7,
      },
      topGroups: [
        { name: 'Premier League Fanatics', members: 24, engagement: 91.2 },
        { name: 'Champions League Elite', members: 18, engagement: 87.5 },
        { name: 'Football Madness', members: 22, engagement: 84.8 },
      ],
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
    addIcons({layersOutline,peopleOutline,footballOutline,timeOutline,starOutline,calendarOutline,walletOutline,trophyOutline,alertCircleOutline,lockClosedOutline,checkmarkCircleOutline,trendingUpOutline,cashOutline,pulseOutline,statsChartOutline,phonePortraitOutline,desktopOutline,chatbubbleOutline,});
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

  }

  async manageJokers() {
    // TODO: Implement joker management modal

  }

  async managePayments() {
    // TODO: Implement payment overview modal

  }



  // Business Intelligence Helper Methods
  getGrowthTrend(percentage: number): string {
    if (percentage > 20) return 'Excellent';
    if (percentage > 10) return 'Good';
    if (percentage > 0) return 'Positive';
    return 'Declining';
  }

  getRetentionStatus(rate: number): string {
    if (rate > 80) return 'Excellent';
    if (rate > 60) return 'Good';
    if (rate > 40) return 'Fair';
    return 'Needs Improvement';
  }

  getConversionRateColor(rate: number): string {
    if (rate > 10) return 'success';
    if (rate > 5) return 'warning';
    return 'danger';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  formatPercentage(value: number, decimals: number = 1): string {
    return `${value.toFixed(decimals)}%`;
  }
}
