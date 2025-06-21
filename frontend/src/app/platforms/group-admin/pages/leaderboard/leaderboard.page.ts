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
  IonButton,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  trophyOutline,
  arrowUpOutline,
  arrowDownOutline,
  removeOutline,
  peopleOutline,
  searchOutline,
  starOutline,
  footballOutline,
  timeOutline,
} from 'ionicons/icons';

interface PlayerStats {
  userId: string;
  position: number;
  previousPosition: number;
  name: string;
  avatar?: string;
  played: number;
  points: number;
  correctScores: number;
  correctResults: number;
  homeWins: number;
  awayWins: number;
  draws: number;
  jokersUsed: number;
  perfectWeeks: number;
  lastFiveResults: Array<'correct' | 'incorrect' | 'partial'>;
  form: string;
}

@Component({
  selector: 'app-leaderboard',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Group Leaderboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Search and Filter -->
      <ion-searchbar
        [(ngModel)]="searchTerm"
        placeholder="Search players..."
        (ionInput)="filterPlayers()"
      ></ion-searchbar>

      <!-- Stats Overview Card -->
      <ion-card class="stats-card">
        <ion-card-header>
          <ion-card-title>Group Statistics</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="stats-grid">
            <div class="stat-item">
              <ion-icon name="people-outline" color="primary"></ion-icon>
              <div class="stat-value">{{ totalPlayers }}</div>
              <div class="stat-label">Players</div>
            </div>
            <div class="stat-item">
              <ion-icon name="football-outline" color="success"></ion-icon>
              <div class="stat-value">{{ totalPredictions }}</div>
              <div class="stat-label">Predictions</div>
            </div>
            <div class="stat-item">
              <ion-icon name="star-outline" color="warning"></ion-icon>
              <div class="stat-value">{{ perfectScores }}</div>
              <div class="stat-label">Perfect Scores</div>
            </div>
            <div class="stat-item">
              <ion-icon name="time-outline" color="tertiary"></ion-icon>
              <div class="stat-value">{{ currentGameweek }}</div>
              <div class="stat-label">Gameweek</div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Leaderboard -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Current Standings</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item *ngFor="let player of filteredPlayers">
              <div class="standing-container">
                <div class="position">
                  <span class="number">{{ player.position }}</span>
                  <ion-icon
                    [name]="
                      getPositionIcon(
                        getPositionChange(
                          player.position,
                          player.previousPosition
                        )
                      )
                    "
                    [color]="
                      getPositionColor(
                        getPositionChange(
                          player.position,
                          player.previousPosition
                        )
                      )
                    "
                  ></ion-icon>
                </div>
                <div class="player-info">
                  <ion-avatar *ngIf="player.avatar">
                    <img [src]="player.avatar" alt="avatar" />
                  </ion-avatar>
                  <div class="player-details">
                    <span class="name">{{ player.name }}</span>
                    <div class="form-guide">
                      <span
                        *ngFor="let result of player.lastFiveResults"
                        class="form-indicator"
                        [ngClass]="result"
                      ></span>
                    </div>
                  </div>
                </div>
                <div class="stats">
                  <div class="stat">
                    <span class="label">Played</span>
                    <span class="value">{{ player.played }}</span>
                  </div>
                  <div class="stat">
                    <span class="label">Perfect</span>
                    <span class="value">{{ player.correctScores }}</span>
                  </div>
                  <div class="stat">
                    <span class="label">Results</span>
                    <span class="value">{{ player.correctResults }}</span>
                  </div>
                  <div class="stat">
                    <span class="label">Jokers</span>
                    <span class="value">{{ player.jokersUsed }}/2</span>
                  </div>
                  <div class="stat points">
                    <span class="label">Points</span>
                    <span class="value">{{ player.points }}</span>
                  </div>
                </div>
              </div>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [
    `
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        padding: 8px;
      }

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        ion-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
          line-height: 1;
        }

        .stat-label {
          font-size: 12px;
          color: var(--ion-color-medium);
          margin-top: 4px;
        }
      }

      .standing-container {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .position {
        display: flex;
        align-items: center;
        gap: 4px;
        min-width: 50px;

        .number {
          font-size: 1.1rem;
          font-weight: 600;
          min-width: 24px;
        }

        ion-icon {
          font-size: 16px;
        }
      }

      .player-info {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;

        ion-avatar {
          width: 32px;
          height: 32px;
        }

        .player-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .name {
          font-weight: 500;
        }

        .form-guide {
          display: flex;
          gap: 2px;
        }

        .form-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;

          &.correct {
            background-color: var(--ion-color-success);
          }

          &.incorrect {
            background-color: var(--ion-color-danger);
          }

          &.partial {
            background-color: var(--ion-color-warning);
          }
        }
      }

      .stats {
        display: flex;
        align-items: center;
        gap: 16px;

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 50px;

          .label {
            font-size: 0.7rem;
            color: var(--ion-color-medium);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .value {
            font-weight: 600;
            font-size: 0.95rem;
          }

          &.points {
            min-width: 60px;

            .value {
              color: var(--ion-color-primary);
              font-size: 1.1rem;
            }
          }
        }
      }

      @media (max-width: 768px) {
        .stats {
          flex-wrap: wrap;
          justify-content: space-around;

          .stat {
            min-width: 70px;
            margin: 4px 0;
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
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonAvatar,
    IonButton,
    IonSearchbar,
    NgFor,
    NgIf,
    NgClass,
    DatePipe,
    FormsModule,
  ],
})
export class LeaderboardPage {
  searchTerm = '';
  totalPlayers = 24;
  totalPredictions = 720;
  perfectScores = 45;
  currentGameweek = 15;

  players: PlayerStats[] = [
    {
      userId: '1',
      position: 1,
      previousPosition: 1,
      name: 'John Smith',
      played: 15,
      points: 245,
      correctScores: 18,
      correctResults: 35,
      homeWins: 12,
      awayWins: 15,
      draws: 8,
      jokersUsed: 1,
      perfectWeeks: 2,
      lastFiveResults: [
        'correct',
        'correct',
        'partial',
        'incorrect',
        'correct',
      ],
      form: 'WWDLW',
    },
    {
      userId: '2',
      position: 2,
      previousPosition: 3,
      name: 'Sarah Wilson',
      played: 15,
      points: 230,
      correctScores: 16,
      correctResults: 32,
      homeWins: 10,
      awayWins: 14,
      draws: 8,
      jokersUsed: 1,
      perfectWeeks: 1,
      lastFiveResults: [
        'correct',
        'incorrect',
        'correct',
        'correct',
        'partial',
      ],
      form: 'WLWWD',
    },
    // Add more mock players...
  ];

  filteredPlayers: PlayerStats[] = [...this.players];

  constructor() {
    addIcons({
      trophyOutline,
      arrowUpOutline,
      arrowDownOutline,
      removeOutline,
      peopleOutline,
      searchOutline,
      starOutline,
      footballOutline,
      timeOutline,
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

  filterPlayers() {
    if (!this.searchTerm.trim()) {
      this.filteredPlayers = [...this.players];
      return;
    }

    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredPlayers = this.players.filter((player) =>
      player.name.toLowerCase().includes(searchTerm)
    );
  }
}
