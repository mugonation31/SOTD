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
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Predictions Overview</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment [(ngModel)]="activeTab">
          <ion-segment-button value="current">
            <ion-label>Current Gameweek</ion-label>
          </ion-segment-button>
          <ion-segment-button value="history">
            <ion-label>History</ion-label>
          </ion-segment-button>
          <ion-segment-button value="stats">
            <ion-label>Statistics</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Filters -->
      <ion-card>
        <ion-card-content>
          <div class="filters-container">
            <ion-searchbar
              [(ngModel)]="searchTerm"
              placeholder="Search users or groups..."
              (ionInput)="applyFilters()"
              class="search-bar"
            ></ion-searchbar>

            <div class="select-filters">
              <ion-select
                [(ngModel)]="selectedGroup"
                placeholder="Filter by Group"
                (ionChange)="applyFilters()"
                class="filter-select"
              >
                <ion-select-option value="all">All Groups</ion-select-option>
                <ion-select-option
                  *ngFor="let group of groups"
                  [value]="group.id"
                >
                  {{ group.name }}
                </ion-select-option>
              </ion-select>

              <ion-select
                [(ngModel)]="selectedGameweek"
                placeholder="Gameweek"
                (ionChange)="applyFilters()"
                class="filter-select"
              >
                <ion-select-option value="all">All Gameweeks</ion-select-option>
                <ion-select-option *ngFor="let gw of gameweeks" [value]="gw">
                  Gameweek {{ gw }}
                </ion-select-option>
              </ion-select>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Current Gameweek View -->
      <div *ngIf="activeTab === 'current'">
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              Gameweek {{ currentGameweek }} Overview
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="stats-grid">
              <div class="stat-item">
                <ion-icon name="people-outline"></ion-icon>
                <div class="stat-details">
                  <h3>Total Players</h3>
                  <p>{{ stats.totalPlayers }}</p>
                </div>
              </div>
              <div class="stat-item">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <div class="stat-details">
                  <h3>Predictions Submitted</h3>
                  <p>
                    {{ stats.submittedPredictions }}/{{ stats.totalPlayers }}
                  </p>
                </div>
              </div>
              <div class="stat-item">
                <ion-icon name="star-outline"></ion-icon>
                <div class="stat-details">
                  <h3>Jokers Used</h3>
                  <p>{{ stats.jokersUsed }}</p>
                </div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Latest Predictions</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item *ngFor="let prediction of filteredPredictions">
                <ion-label>
                  <h2>{{ prediction.userName }}</h2>
                  <p>Group: {{ prediction.groupName }}</p>
                  <div class="predictions-grid">
                    <div
                      *ngFor="let match of prediction.matches"
                      class="match-prediction"
                    >
                      {{ match.homeTeam }} {{ match.prediction.home }} -
                      {{ match.prediction.away }} {{ match.awayTeam }}
                      <ion-icon
                        *ngIf="match.isJoker"
                        name="star"
                        color="warning"
                        title="Joker Used"
                      ></ion-icon>
                    </div>
                  </div>
                </ion-label>
                <ion-badge
                  [color]="getPredictionStatusColor(prediction.status)"
                >
                  {{ prediction.status }}
                </ion-badge>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Historical View -->
      <div *ngIf="activeTab === 'history'">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Historical Predictions</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item *ngFor="let prediction of historicalPredictions">
                <ion-label>
                  <h2>{{ prediction.userName }}</h2>
                  <p>Gameweek {{ prediction.gameweek }}</p>
                  <p>Group: {{ prediction.groupName }}</p>
                  <div class="predictions-grid">
                    <div
                      *ngFor="let match of prediction.matches"
                      class="match-prediction"
                    >
                      {{ match.homeTeam }} {{ match.prediction.home }} -
                      {{ match.prediction.away }} {{ match.awayTeam }}
                      <div class="actual-score" *ngIf="match.actual">
                        (Actual: {{ match.actual.home }} -
                        {{ match.actual.away }})
                        <ion-badge color="success" *ngIf="match.points">
                          +{{ match.points }} pts
                        </ion-badge>
                      </div>
                    </div>
                  </div>
                </ion-label>
                <ion-badge color="primary">
                  Total: {{ prediction.totalPoints }} pts
                </ion-badge>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Statistics View -->
      <div *ngIf="activeTab === 'stats'">
        <ion-card>
          <ion-card-header>
            <ion-card-title>System Statistics</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="stats-grid">
              <div class="stat-item">
                <h3>Perfect Scores</h3>
                <p>{{ stats.perfectScores }}</p>
              </div>
              <div class="stat-item">
                <h3>Correct Results</h3>
                <p>{{ stats.correctResults }}</p>
              </div>
              <div class="stat-item">
                <h3>Average Points</h3>
                <p>{{ stats.averagePoints }}</p>
              </div>
              <div class="stat-item">
                <h3>Highest Score</h3>
                <p>{{ stats.highestScore }}</p>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Joker Usage</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="joker-stats">
              <div class="joker-item">
                <h3>First Joker</h3>
                <p>Used: {{ stats.firstJokerUsed }}/{{ stats.totalPlayers }}</p>
              </div>
              <div class="joker-item">
                <h3>Second Joker</h3>
                <p>
                  Used: {{ stats.secondJokerUsed }}/{{ stats.totalPlayers }}
                </p>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .filters-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .search-bar {
        --background: var(--ion-color-light);
        --border-radius: 8px;
      }

      .select-filters {
        display: flex;
        gap: 16px;
      }

      .filter-select {
        flex: 1;
        max-width: 200px;
        --background: var(--ion-color-light);
        --border-radius: 8px;
        padding: 8px;
      }

      @media (max-width: 576px) {
        .select-filters {
          flex-direction: column;
        }

        .filter-select {
          max-width: 100%;
        }
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
      }

      .stat-item {
        padding: 1rem;
        background: var(--ion-color-light);
        border-radius: 8px;
        text-align: center;
      }

      .predictions-grid {
        display: grid;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }

      .match-prediction {
        font-size: 0.9em;
        color: var(--ion-color-medium);
      }

      .actual-score {
        font-size: 0.8em;
        color: var(--ion-color-medium);
        margin-top: 0.2rem;
      }

      .joker-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        text-align: center;
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
