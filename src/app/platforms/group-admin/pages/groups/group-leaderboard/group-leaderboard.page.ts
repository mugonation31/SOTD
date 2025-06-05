import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  IonButton,
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
  chevronBackOutline,
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
          <ion-back-button
            text="Groups"
            defaultHref="/group-admin/groups"
          ></ion-back-button>
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
          <!-- Table Header -->
          <div class="table-header">
            <div class="position-col">Position</div>
            <div class="name-col">Name</div>
            <div class="gameweek-col">Game Week</div>
            <div class="joker-col">Played Joker</div>
            <div class="points-col">Points</div>
          </div>

          <!-- Table Body -->
          <div class="table-body">
            <div class="table-row" *ngFor="let entry of sortedLeaderboard">
              <div class="position-col">{{ entry.position }}</div>
              <div class="name-col">{{ entry.name }}</div>
              <div class="gameweek-col">{{ entry.played }}</div>
              <div class="joker-col">{{ entry.jokerUsed }}/2</div>
              <div class="points-col">{{ entry.totalPoints }}</div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [
    `
      .table-header {
        display: grid;
        grid-template-columns: 80px 1fr 100px 100px 80px;
        padding: 12px 16px;
        background: var(--ion-color-light);
        font-weight: 600;
        border-bottom: 2px solid var(--ion-color-medium);
        gap: 16px;
      }

      .table-body {
        .table-row {
          display: grid;
          grid-template-columns: 80px 1fr 100px 100px 80px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--ion-color-light);
          gap: 16px;
          align-items: center;

          &:hover {
            background: var(--ion-color-light-tint);
          }
        }
      }

      .position-col {
        font-weight: 600;
      }

      .name-col {
        font-weight: 500;
      }

      .gameweek-col,
      .joker-col {
        text-align: center;
      }

      .points-col {
        text-align: right;
        font-weight: 600;
        color: var(--ion-color-primary);
      }

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

      ion-back-button {
        display: block;
        --color: var(--ion-color-primary);
        --icon-font-size: 24px;
        --padding-start: 0;
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
    IonButton,
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
    public seasonService: SeasonService,
    private router: Router
  ) {
    addIcons({
      trophyOutline,
      arrowUpOutline,
      arrowDownOutline,
      removeOutline,
      footballOutline,
      timeOutline,
      chevronBackOutline,
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

  goBack() {
    this.router.navigate(['/group-admin/groups']);
  }
}
