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
  walletOutline,
} from 'ionicons/icons';

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
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>System Overview</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Quick Stats -->
      <ion-grid>
        <ion-row>
          <ion-col size="12" sizeMd="6" sizeLg="3">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="layers-outline" color="primary"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>{{ overview.totalGroups }}</h3>
                  <p>Total Groups</p>
                  <ion-badge color="success"
                    >{{ overview.activeGroups }} Active</ion-badge
                  >
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" sizeMd="6" sizeLg="3">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="people-outline" color="secondary"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>{{ overview.totalUsers }}</h3>
                  <p>Total Users</p>
                  <ion-badge color="success"
                    >{{ overview.activeUsers }} Active</ion-badge
                  >
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" sizeMd="6" sizeLg="3">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="football-outline" color="tertiary"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Gameweek {{ overview.currentGameweek }}</h3>
                  <p>Current Gameweek</p>
                  <ion-badge color="warning">
                    {{ overview.submittedPredictions }}/{{
                      overview.totalPredictions
                    }}
                    Predictions
                  </ion-badge>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" sizeMd="6" sizeLg="3">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="time-outline" color="danger"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Next Deadline</h3>
                  <p>{{ overview.nextDeadline | date : 'short' }}</p>
                  <ion-badge color="danger">{{
                    getTimeUntilDeadline()
                  }}</ion-badge>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <!-- New Stats Row -->
        <ion-row>
          <ion-col size="12" sizeMd="4">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="star-outline" color="warning"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Joker Usage</h3>
                  <p>
                    First Joker: {{ overview.jokerStats.firstJokerUsed }}/{{
                      overview.jokerStats.totalEligible
                    }}
                  </p>
                  <p>
                    Second Joker: {{ overview.jokerStats.secondJokerUsed }}/{{
                      overview.jokerStats.totalEligible
                    }}
                  </p>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" sizeMd="4">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="calendar-outline" color="tertiary"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Special Events</h3>
                  <p>{{ getNextEventDisplay() }}</p>
                  <ion-badge
                    color="tertiary"
                    *ngIf="overview.specialEvents.nextEvent"
                  >
                    In {{ overview.specialEvents.daysUntil }} days
                  </ion-badge>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" sizeMd="4">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="wallet-outline" color="success"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Payment Status</h3>
                  <p>
                    {{ overview.paymentStats.totalPaid }}/{{
                      overview.paymentStats.totalGroups
                    }}
                    Groups Paid
                  </p>
                  <ion-badge
                    color="warning"
                    *ngIf="overview.paymentStats.totalPending > 0"
                  >
                    {{ overview.paymentStats.totalPending }} Pending
                  </ion-badge>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- System Status & Actions -->
      <ion-grid>
        <ion-row>
          <ion-col size="12" sizeMd="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Quick Actions</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-button
                  expand="block"
                  routerLink="/super-admin/group-admins/invites"
                  class="ion-margin-bottom"
                >
                  <ion-icon name="person-add-outline" slot="start"></ion-icon>
                  Invite Group Admin
                </ion-button>
                <ion-button
                  expand="block"
                  routerLink="/super-admin/groups"
                  class="ion-margin-bottom"
                >
                  <ion-icon name="layers-outline" slot="start"></ion-icon>
                  Manage Groups
                </ion-button>

                <ion-button
                  expand="block"
                  (click)="manageSpecialEvent()"
                  class="ion-margin-bottom"
                >
                  <ion-icon name="calendar-outline" slot="start"></ion-icon>
                  Manage Special Events
                </ion-button>

                <ion-button
                  expand="block"
                  (click)="manageJokers()"
                  class="ion-margin-bottom"
                >
                  <ion-icon name="star-outline" slot="start"></ion-icon>
                  Manage Joker Rules
                </ion-button>

                <ion-button expand="block" (click)="managePayments()">
                  <ion-icon name="wallet-outline" slot="start"></ion-icon>
                  Payment Overview
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" sizeMd="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Recent Activity</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item *ngFor="let activity of recentActivities">
                    <ion-icon
                      [name]="getActivityIcon(activity.type)"
                      slot="start"
                      [color]="getActivityColor(activity.type)"
                    >
                    </ion-icon>
                    <ion-label>
                      <h3>{{ activity.description }}</h3>
                      <p>{{ activity.timestamp | date : 'short' }}</p>
                    </ion-label>
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
      .stat-card {
        height: 100%;
      }

      .stat-card ion-card-content {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .stat-icon {
        font-size: 2.5rem;
        padding: 0.5rem;
        border-radius: 50%;
        background: var(--ion-color-light);
      }

      .stat-info {
        flex: 1;
      }

      .stat-info h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
      }

      .stat-info p {
        margin: 0.25rem 0;
        color: var(--ion-color-medium);
      }
    `,
  ],
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
    addIcons({
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
    });
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
