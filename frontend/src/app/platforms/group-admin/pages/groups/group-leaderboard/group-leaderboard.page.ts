import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  IonIcon,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  trophyOutline,
  arrowUpOutline,
  arrowDownOutline,
  removeOutline,
  footballOutline,
  timeOutline,
} from 'ionicons/icons';
import { SeasonService } from '@core/services/season.service';

interface GroupLeaderboardEntry {
  position: number;
  name: string;
  played: number;
  jokerUsed: number;
  totalPoints: number;
}

@Component({
  selector: 'app-group-leaderboard',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/group-admin/groups"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ groupName }} Leaderboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Current Standings</ion-card-title>
          <div class="season-info" *ngIf="!seasonService.isSeasonStarted()">
            <ion-icon name="information-circle-outline"></ion-icon>
            <span>Season not started - Players listed alphabetically</span>
          </div>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item *ngFor="let entry of sortedLeaderboard">
              <div class="standing-container">
                <div class="position">
                  <span class="number">{{ entry.position }}</span>
                </div>
                <div class="player-info">
                  <div class="player-details">
                    <span class="name">{{ entry.name }}</span>
                  </div>
                </div>
                <div class="stats">
                  <div class="stat">
                    <span class="label">Played</span>
                    <span class="value">{{ entry.played }}</span>
                  </div>
                  <div class="stat">
                    <span class="label">Jokers</span>
                    <span class="value">{{ entry.jokerUsed }}/2</span>
                  </div>
                  <div class="stat points">
                    <span class="label">Points</span>
                    <span class="value">{{ entry.totalPoints }}</span>
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
      .season-info {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
        color: var(--ion-color-medium);
        font-size: 0.9rem;

        ion-icon {
          font-size: 1.2rem;
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
      }

      .player-info {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;

        .player-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .name {
          font-weight: 500;
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
    IonIcon,
    IonBackButton,
    IonButtons,
    NgFor,
    NgIf,
    NgClass,
  ],
})
export class GroupLeaderboardPage implements OnInit {
  groupId: string = '';
  groupName: string = '';
  leaderboard: GroupLeaderboardEntry[] = [];
  sortedLeaderboard: GroupLeaderboardEntry[] = [];

  constructor(
    private route: ActivatedRoute,
    public seasonService: SeasonService
  ) {
    addIcons({
      trophyOutline,
      arrowUpOutline,
      arrowDownOutline,
      removeOutline,
      footballOutline,
      timeOutline,
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.groupId = params['id'];
      // Mock data for demonstration - replace with actual API call
      this.groupName = 'Premier League Predictions';
      this.leaderboard = [
        {
          position: 1,
          name: 'Alice Smith',
          played: 15,
          jokerUsed: 1,
          totalPoints: 45,
        },
        {
          position: 2,
          name: 'Bob Johnson',
          played: 15,
          jokerUsed: 2,
          totalPoints: 42,
        },
        {
          position: 3,
          name: 'Charlie Brown',
          played: 14,
          jokerUsed: 1,
          totalPoints: 38,
        },
        {
          position: 4,
          name: 'David Wilson',
          played: 15,
          jokerUsed: 0,
          totalPoints: 35,
        },
        {
          position: 5,
          name: 'Emma Davis',
          played: 13,
          jokerUsed: 1,
          totalPoints: 32,
        },
      ];
      this.sortLeaderboard();
    });
  }

  private sortLeaderboard() {
    if (this.seasonService.isSeasonStarted()) {
      // Sort by points when season has started
      this.sortedLeaderboard = [...this.leaderboard].sort(
        (a, b) => b.totalPoints - a.totalPoints
      );
    } else {
      // Sort alphabetically before season starts
      this.sortedLeaderboard = [...this.leaderboard].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    // Update positions after sorting
    this.sortedLeaderboard = this.sortedLeaderboard.map((entry, index) => ({
      ...entry,
      position: index + 1,
    }));
  }
}
