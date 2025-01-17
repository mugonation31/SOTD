import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonCardTitle,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonChip,
  IonAvatar,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from '@ionic/angular/standalone';
import { DatePipe, NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  chevronBack,
  chevronForward,
  star,
  checkmarkCircle,
  closeCircle,
} from 'ionicons/icons';

interface GameWeek {
  number: number;
  isSpecial: boolean;
  specialType?: string;
  status: 'pending' | 'active' | 'completed';
  deadline: Date;
  matches: Match[];
}

interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  venue: string;
  kickoff: Date;
  capacity?: string;
  isSelected?: boolean;
}

interface PlayerPrediction {
  playerName: string;
  avatar?: string;
  totalPoints: number;
  jokerUsed: boolean;
  predictions: PredictionWithResult[];
}

interface PredictionWithResult extends Match {
  points?: number;
  isCorrectScore?: boolean;
  isCorrectResult?: boolean;
}

@Component({
  selector: 'app-predictions',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Predictions</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment [(ngModel)]="selectedTab" (ionChange)="tabChanged()">
          <ion-segment-button value="my">
            <ion-label>Make Predictions</ion-label>
          </ion-segment-button>
          <ion-segment-button value="all">
            <ion-label>All Predictions</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- My Predictions Tab - Leave untouched -->
      <div *ngIf="selectedTab === 'my'">
        <!-- Existing Make Predictions content -->
      </div>

      <!-- All Predictions Tab -->
      <div *ngIf="selectedTab === 'all'">
        <!-- Gameweek Navigation -->
        <div class="gameweek-navigation">
          <ion-button
            fill="clear"
            (click)="previousGameweek()"
            [disabled]="currentGameweekIndex === 0"
          >
            <ion-icon name="chevron-back"></ion-icon>
          </ion-button>
          <div class="gameweek-info">
            <h2>Gameweek {{ selectedGameweek.number }}</h2>
            <ion-chip [color]="getGameweekStatusColor(selectedGameweek.status)">
              {{ selectedGameweek.status | titlecase }}
            </ion-chip>
            <div *ngIf="selectedGameweek.isSpecial" class="special-indicator">
              <ion-icon name="star" color="warning"></ion-icon>
              {{ getSpecialWeekLabel(selectedGameweek.specialType) }}
            </div>
          </div>
          <ion-button
            fill="clear"
            (click)="nextGameweek()"
            [disabled]="currentGameweekIndex === gameweeks.length - 1"
          >
            <ion-icon name="chevron-forward"></ion-icon>
          </ion-button>
        </div>

        <!-- Search and Filter -->
        <div class="search-filter">
          <ion-searchbar
            [(ngModel)]="searchTerm"
            placeholder="Search players..."
            (ionInput)="filterPredictions()"
            class="player-search"
          >
          </ion-searchbar>
          <ion-select
            [(ngModel)]="filterStatus"
            (ionChange)="filterPredictions()"
            placeholder="Filter by status"
            interface="popover"
          >
            <ion-select-option value="all">All Predictions</ion-select-option>
            <ion-select-option value="submitted">Submitted</ion-select-option>
            <ion-select-option value="pending">Pending</ion-select-option>
          </ion-select>
        </div>

        <!-- Players Predictions List -->
        <div class="players-list">
          <ion-card
            *ngFor="let player of filteredPredictions"
            class="player-card"
          >
            <ion-card-header>
              <div class="player-header">
                <ion-avatar *ngIf="player.avatar">
                  <img [src]="player.avatar" alt="avatar" />
                </ion-avatar>
                <div class="player-info">
                  <h3>{{ player.playerName }}</h3>
                  <p>Total Points: {{ player.totalPoints }}</p>
                </div>
                <ion-chip *ngIf="player.jokerUsed" color="warning">
                  <ion-icon name="star"></ion-icon>
                  <ion-label>Joker Used</ion-label>
                </ion-chip>
              </div>
            </ion-card-header>

            <ion-card-content>
              <div
                class="predictions-grid"
                [class.special-week]="selectedGameweek.isSpecial"
              >
                <div
                  *ngFor="let pred of player.predictions"
                  class="prediction-item"
                >
                  <!-- Match Info -->
                  <div class="match-info">
                    <div class="venue-info">
                      <span class="venue-name">{{ pred.venue }}</span>
                      <span class="kickoff">{{
                        pred.kickoff | date : 'EEE d MMM, HH:mm'
                      }}</span>
                    </div>
                    <div class="teams-score">
                      <span class="team home">{{ pred.homeTeam }}</span>
                      <div
                        class="score"
                        [class.pending]="!pred.homeScore && !pred.awayScore"
                      >
                        {{ pred.homeScore ?? '-' }} -
                        {{ pred.awayScore ?? '-' }}
                      </div>
                      <span class="team away">{{ pred.awayTeam }}</span>
                    </div>
                  </div>

                  <!-- Prediction Result -->
                  <div
                    class="prediction-result"
                    *ngIf="selectedGameweek.status === 'completed'"
                  >
                    <div
                      class="points"
                      [class.high-points]="(pred.points || 0) >= 9"
                    >
                      {{ pred.points }} pts
                    </div>
                    <div class="accuracy">
                      <div class="accuracy-item">
                        <ion-icon
                          [name]="
                            pred.isCorrectScore
                              ? 'checkmark-circle'
                              : 'close-circle'
                          "
                          [color]="pred.isCorrectScore ? 'success' : 'medium'"
                        >
                        </ion-icon>
                        <span>Score</span>
                      </div>
                      <div class="accuracy-item">
                        <ion-icon
                          [name]="
                            pred.isCorrectResult
                              ? 'checkmark-circle'
                              : 'close-circle'
                          "
                          [color]="pred.isCorrectResult ? 'success' : 'medium'"
                        >
                        </ion-icon>
                        <span>Result</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  `,
  styles: [
    // ... existing styles ...
  ],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCardTitle,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonNote,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonIcon,
    DatePipe,
    TitleCasePipe,
    NgIf,
    NgFor,
    FormsModule,
    IonChip,
    IonAvatar,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
  ],
})
export class PredictionsPage implements OnInit {
  selectedTab = 'my';
  searchTerm = '';
  filterStatus = 'all';
  currentGameweekIndex = 0;
  selectedGameweek: GameWeek;
  gameweeks: GameWeek[] = [];
  filteredPredictions: PlayerPrediction[] = [];
  allPredictions: PlayerPrediction[] = [];

  constructor() {
    addIcons({
      chevronBack,
      chevronForward,
      star,
      checkmarkCircle,
      closeCircle,
    });
    this.gameweeks = this.getSampleGameweeks();
    this.selectedGameweek = this.gameweeks[0];
    this.allPredictions = this.getSamplePredictions();
    this.filteredPredictions = [...this.allPredictions];
  }

  ngOnInit() {
    this.loadGameweekPredictions();
  }

  tabChanged() {
    if (this.selectedTab === 'all') {
      this.loadGameweekPredictions();
    }
  }

  previousGameweek() {
    if (this.currentGameweekIndex > 0) {
      this.currentGameweekIndex--;
      this.selectedGameweek = this.gameweeks[this.currentGameweekIndex];
      this.loadGameweekPredictions();
    }
  }

  nextGameweek() {
    if (this.currentGameweekIndex < this.gameweeks.length - 1) {
      this.currentGameweekIndex++;
      this.selectedGameweek = this.gameweeks[this.currentGameweekIndex];
      this.loadGameweekPredictions();
    }
  }

  getGameweekStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'primary';
      default:
        return 'medium';
    }
  }

  getSpecialWeekLabel(type: string | undefined): string {
    if (!type) return 'Special Week';

    switch (type) {
      case 'christmas':
        return 'Christmas Special';
      case 'endOfSeason':
        return 'End of Season Special';
      default:
        return 'Special Week';
    }
  }

  filterPredictions() {
    this.filteredPredictions = this.allPredictions.filter((player) => {
      const nameMatch = player.playerName
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const statusMatch =
        this.filterStatus === 'all' ||
        (this.filterStatus === 'submitted' && player.predictions.length > 0) ||
        (this.filterStatus === 'pending' && player.predictions.length === 0);
      return nameMatch && statusMatch;
    });
  }

  private loadGameweekPredictions() {
    // Replace with actual API call to load predictions for the selected gameweek
    this.allPredictions = this.getSamplePredictions();
    this.filterPredictions();
  }

  private getSampleGameweeks(): GameWeek[] {
    return [
      {
        number: 15,
        isSpecial: false,
        status: 'active',
        deadline: new Date('2024-01-20T11:30:00'),
        matches: [],
      },
      {
        number: 16,
        isSpecial: true,
        specialType: 'christmas',
        status: 'pending',
        deadline: new Date('2024-01-27T11:30:00'),
        matches: [],
      },
    ];
  }

  private getSamplePredictions(): PlayerPrediction[] {
    return [
      {
        playerName: 'John Smith',
        avatar: 'assets/avatars/john.jpg',
        totalPoints: 156,
        jokerUsed: true,
        predictions: [
          {
            homeTeam: 'Manchester United',
            awayTeam: 'Liverpool',
            homeScore: 2,
            awayScore: 1,
            venue: 'Old Trafford',
            kickoff: new Date('2024-01-20T15:00:00'),
            points: 9,
            isCorrectScore: true,
            isCorrectResult: true,
          },
          {
            homeTeam: 'Arsenal',
            awayTeam: 'Chelsea',
            homeScore: 1,
            awayScore: 1,
            venue: 'Emirates Stadium',
            kickoff: new Date('2024-01-20T17:30:00'),
            points: 6,
            isCorrectScore: false,
            isCorrectResult: true,
          },
          {
            homeTeam: 'Manchester City',
            awayTeam: 'Tottenham',
            homeScore: 3,
            awayScore: 0,
            venue: 'Etihad Stadium',
            kickoff: new Date('2024-01-20T20:00:00'),
            points: 0,
            isCorrectScore: false,
            isCorrectResult: false,
          },
        ],
      },
      {
        playerName: 'Sarah Johnson',
        avatar: 'assets/avatars/sarah.jpg',
        totalPoints: 178,
        jokerUsed: false,
        predictions: [
          {
            homeTeam: 'Manchester United',
            awayTeam: 'Liverpool',
            homeScore: 1,
            awayScore: 2,
            venue: 'Old Trafford',
            kickoff: new Date('2024-01-20T15:00:00'),
            points: 6,
            isCorrectScore: false,
            isCorrectResult: true,
          },
          {
            homeTeam: 'Arsenal',
            awayTeam: 'Chelsea',
            homeScore: 2,
            awayScore: 2,
            venue: 'Emirates Stadium',
            kickoff: new Date('2024-01-20T17:30:00'),
            points: 9,
            isCorrectScore: true,
            isCorrectResult: true,
          },
          {
            homeTeam: 'Manchester City',
            awayTeam: 'Tottenham',
            homeScore: 4,
            awayScore: 1,
            venue: 'Etihad Stadium',
            kickoff: new Date('2024-01-20T20:00:00'),
            points: 6,
            isCorrectScore: false,
            isCorrectResult: true,
          },
        ],
      },
    ];
  }
}
