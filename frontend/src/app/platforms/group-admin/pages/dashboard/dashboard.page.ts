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
  IonRippleEffect,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  cashOutline,
  trophyOutline,
  statsChartOutline,
  timeOutline,
  peopleCircleOutline,
  footballOutline,
  eyeOutline,
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
            <ion-card class="stat-card clickable" (click)="navigateToGroups()">
              <ion-card-content>
                <div class="stat-icon">
                  <ion-icon name="people-outline" color="primary"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Total Groups</h3>
                  <p class="stat-value">{{ totalGroups }}</p>
                  <p class="stat-label">Active Groups</p>
                </div>
                <ion-ripple-effect></ion-ripple-effect>
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
                  <ion-icon name="football-outline" color="tertiary"></ion-icon>
                </div>
                <div class="stat-info">
                  <h3>Current Gameweek</h3>
                  <p class="stat-value">{{ currentGameweek }}</p>
                  <p class="stat-label">Premier League</p>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

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

          <!-- Quick Actions -->
          <ion-col size="12" size-lg="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Quick Actions</ion-card-title>
                <ion-card-subtitle>Manage your groups</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <div class="quick-actions">
                  <ion-button color="primary" routerLink="/group-admin/groups">
                    <ion-icon name="people-outline" slot="start"></ion-icon>
                    MANAGE GROUPS
                  </ion-button>
                  <ion-button
                    color="success"
                    routerLink="/group-admin/predictions"
                  >
                    <ion-icon name="football-outline" slot="start"></ion-icon>
                    MATCH RESULTS
                  </ion-button>
                  <ion-button color="warning" routerLink="/group-admin/live">
                    <ion-icon name="eye-outline" slot="start"></ion-icon>
                    LIVE SCORES
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

        &.clickable {
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }

          &:active {
            transform: translateY(0);
          }
        }
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
        margin: 1rem;
      }

      .quick-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
      }

      ion-button {
        --padding-start: 1rem;
        --padding-end: 1rem;
        height: 48px;
        font-weight: 500;
      }

      ion-icon {
        font-size: 1.2rem;
      }

      @media (max-width: 768px) {
        .quick-actions {
          flex-direction: column;

          ion-button {
            width: 100%;
          }
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
    IonRippleEffect,
    NgFor,
    NgIf,
    DatePipe,
    CurrencyPipe,
    RouterLink,
  ],
})
export class DashboardPage implements OnInit {
  totalGroups = 5;
  totalPrizePools = 2500;
  totalPlayers = 87;
  currentGameweek = 15;

  recentGroups = [
    {
      name: 'Premier Predictions',
      createdAt: new Date('2024-01-15'),
      type: 'prize',
    },
    {
      name: 'Office League',
      createdAt: new Date('2024-01-14'),
      type: 'casual',
    },
    {
      name: 'Friends & Family',
      createdAt: new Date('2024-01-13'),
      type: 'prize',
    },
  ];

  constructor(private router: Router) {
    addIcons({
      peopleOutline,
      cashOutline,
      trophyOutline,
      statsChartOutline,
      timeOutline,
      peopleCircleOutline,
      footballOutline,
      eyeOutline,
    });
  }

  ngOnInit() {
    // Load dashboard data
  }

  navigateToGroups() {
    this.router.navigate(['/group-admin/groups']);
  }
}
