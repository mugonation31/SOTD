import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonBadge,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  cashOutline,
  trophyOutline,
  statsChartOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  timeOutline,
  peopleCircleOutline,
  personAddOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Group Admin Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Quick Stats -->
      <ion-grid class="stats-grid">
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="3">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="people-outline" color="primary"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Total Groups</h3>
                  <p class="stat-value">{{ totalGroups }}</p>
                  <p class="stat-label">Active Groups</p>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" size-md="6" size-lg="3">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="cash-outline" color="success"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Prize Pools</h3>
                  <p class="stat-value">
                    {{ totalPrizePools | currency : 'GBP' }}
                  </p>
                  <p class="stat-label">Total Prize Money</p>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" size-md="6" size-lg="3">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="trophy-outline" color="warning"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Active Players</h3>
                  <p class="stat-value">{{ totalPlayers }}</p>
                  <p class="stat-label">Across All Groups</p>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" size-md="6" size-lg="3">
            <ion-card class="stat-card">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon
                    name="people-circle-outline"
                    color="tertiary"
                  ></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Group Members</h3>
                  <p class="stat-value">{{ paidMembers }}/{{ totalPlayers }}</p>
                  <p class="stat-label">Confirmed Members</p>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Recent Activity & Actions -->
      <ion-grid>
        <ion-row>
          <!-- Recent Groups -->
          <ion-col size="12" size-lg="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Recent Groups</ion-card-title>
                <ion-card-subtitle>Latest created groups</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item *ngFor="let group of recentGroups">
                    <ion-label>
                      <h2>{{ group.name }}</h2>
                      <p>Created: {{ group.createdAt | date : 'medium' }}</p>
                    </ion-label>
                    <ion-badge
                      slot="end"
                      [color]="group.type === 'prize' ? 'success' : 'primary'"
                    >
                      {{ group.type === 'prize' ? 'Prize' : 'Casual' }}
                    </ion-badge>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <!-- Pending Actions -->
          <ion-col size="12" size-lg="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Pending Actions</ion-card-title>
                <ion-card-subtitle>Items requiring attention</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item *ngFor="let action of pendingActions">
                    <ion-icon
                      [name]="
                        action.type === 'join'
                          ? 'person-add-outline'
                          : 'alert-circle-outline'
                      "
                      slot="start"
                      [color]="action.type === 'join' ? 'success' : 'warning'"
                    ></ion-icon>
                    <ion-label>
                      <h2>{{ action.message }}</h2>
                      <p>{{ action.group }}</p>
                    </ion-label>
                    <ion-button fill="clear" size="small"> Review </ion-button>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <!-- Quick Actions -->
        <ion-row>
          <ion-col size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Quick Actions</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="quick-actions">
                  <ion-button routerLink="/group-admin/groups" color="primary">
                    <ion-icon name="people-outline" slot="start"></ion-icon>
                    Manage Groups
                  </ion-button>
                  <ion-button color="success">
                    <ion-icon name="trophy-outline" slot="start"></ion-icon>
                    Prize Groups
                  </ion-button>
                  <ion-button color="warning">
                    <ion-icon name="person-add-outline" slot="start"></ion-icon>
                    Member Requests
                  </ion-button>
                  <ion-button color="tertiary">
                    <ion-icon
                      name="stats-chart-outline"
                      slot="start"
                    ></ion-icon>
                    Reports
                  </ion-button>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [
    `
      .stats-grid {
        padding: 1rem;
      }

      .stat-card {
        margin: 0;
        height: 100%;
      }

      .stat-card ion-card-content {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .stat-icon {
        background: var(--ion-color-light);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-icon ion-icon {
        font-size: 24px;
      }

      .stat-info h3 {
        margin: 0;
        font-size: 0.9rem;
        color: var(--ion-color-medium);
      }

      .stat-value {
        margin: 0.25rem 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--ion-color-dark);
      }

      .stat-label {
        margin: 0;
        font-size: 0.8rem;
        color: var(--ion-color-medium);
      }

      ion-card {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .quick-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      ion-badge {
        font-weight: 500;
        padding: 4px 8px;
      }

      ion-item {
        --padding-start: 1rem;
        --padding-end: 1rem;
        --padding-top: 0.5rem;
        --padding-bottom: 0.5rem;
      }

      ion-list {
        background: transparent;
      }

      @media (max-width: 768px) {
        .quick-actions {
          flex-direction: column;
        }

        .quick-actions ion-button {
          width: 100%;
        }
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
    IonIcon,
    IonBadge,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonCardSubtitle,
    NgFor,
    NgIf,
    DatePipe,
    CurrencyPipe,
    RouterLink,
  ],
})
export class DashboardPage implements OnInit {
  // Mock data
  totalGroups = 5;
  totalPrizePools = 2500;
  totalPlayers = 47;
  paidMembers = 47; // All members are paid since payment is required to join

  recentGroups = [
    {
      name: 'Premier League 2024',
      createdAt: new Date(),
      type: 'prize',
    },
    {
      name: 'Champions League',
      createdAt: new Date(Date.now() - 86400000),
      type: 'casual',
    },
    {
      name: 'World Cup Predictions',
      createdAt: new Date(Date.now() - 172800000),
      type: 'prize',
    },
  ];

  pendingActions = [
    {
      type: 'join',
      message: '2 new join requests',
      group: 'Champions League',
    },
    {
      type: 'group',
      message: 'Group starting soon',
      group: 'Premier League 2024',
    },
    {
      type: 'prize',
      message: 'Prize distribution ready',
      group: 'FA Cup Predictions',
    },
  ];

  constructor() {
    addIcons({
      peopleOutline,
      cashOutline,
      trophyOutline,
      statsChartOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      timeOutline,
      peopleCircleOutline,
      personAddOutline,
    });
  }

  ngOnInit() {
    // Initialize dashboard data
  }
}
