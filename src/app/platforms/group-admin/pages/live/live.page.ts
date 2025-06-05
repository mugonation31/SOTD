import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonBadge,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  footballOutline,
  chevronBackOutline,
  chevronForwardOutline,
} from 'ionicons/icons';

interface Match {
  id: number;
  gameweek: number;
  homeTeam: string;
  awayTeam: string;
  kickoff: string;
  venue: string;
  liveScore?: {
    home: number;
    away: number;
    isLive: boolean;
    minute: number;
    additionalTime?: number;
  };
  finalScore?: {
    home: number;
    away: number;
  };
  status: 'scheduled' | 'live' | 'finished';
}

@Component({
  selector: 'app-live',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Live Scores</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Segment Control -->
      <ion-segment [(ngModel)]="selectedSegment" class="scores-segment">
        <ion-segment-button value="current">
          <ion-label>Current Matches</ion-label>
        </ion-segment-button>
        <ion-segment-button value="history">
          <ion-label>History</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- Current Matches -->
      <div *ngIf="selectedSegment === 'current'">
        <ion-card *ngIf="currentMatches.length === 0">
          <ion-card-content>
            <div class="no-matches">No matches scheduled for today.</div>
          </ion-card-content>
        </ion-card>

        <ion-card *ngIf="currentMatches.length > 0">
          <ion-card-header>
            <ion-card-title>Today's Matches</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item *ngFor="let match of currentMatches">
                <div class="match-item">
                  <div class="match-info">
                    <div class="venue-info">{{ match.venue }}</div>
                    <div class="match-time">
                      <ion-icon name="time-outline"></ion-icon>
                      {{ match.kickoff | date : 'EEE d MMM, HH:mm' }}
                      <ion-badge
                        *ngIf="isMatchLive(match)"
                        color="danger"
                        class="live-badge"
                      >
                        LIVE {{ getMatchTime(match) }}
                      </ion-badge>
                    </div>
                  </div>
                  <div class="teams-score">
                    <div class="team home">{{ match.homeTeam }}</div>
                    <div class="score" [ngClass]="getScoreClass(match)">
                      <div class="score-label">
                        {{ getMatchStatus(match) }}
                      </div>
                      <div
                        class="score-value"
                        *ngIf="match.status === 'scheduled'"
                      >
                        - vs -
                      </div>
                      <div class="score-value" *ngIf="match.status === 'live'">
                        {{ match.liveScore?.home || 0 }} -
                        {{ match.liveScore?.away || 0 }}
                      </div>
                      <div
                        class="score-value"
                        *ngIf="match.status === 'finished'"
                      >
                        {{ match.finalScore?.home || 0 }} -
                        {{ match.finalScore?.away || 0 }}
                      </div>
                      <div class="match-minute" *ngIf="match.status === 'live'">
                        {{ getMatchTime(match) }}
                      </div>
                      <div
                        class="match-minute"
                        *ngIf="match.status === 'finished'"
                      >
                        FT
                      </div>
                    </div>
                    <div class="team away">{{ match.awayTeam }}</div>
                  </div>
                </div>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Historical Matches -->
      <div *ngIf="selectedSegment === 'history'">
        <div class="gameweek-navigation">
          <ion-button
            fill="clear"
            class="nav-button"
            [disabled]="!canNavigateHistory('back')"
            (click)="navigateHistoryGameweek(-1)"
          >
            <ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon>
          </ion-button>

          <div class="gameweek-title">
            <h2>Gameweek {{ selectedHistoryGameweek }}</h2>
          </div>

          <ion-button
            fill="clear"
            class="nav-button"
            [disabled]="!canNavigateHistory('forward')"
            (click)="navigateHistoryGameweek(1)"
          >
            <ion-icon
              slot="icon-only"
              name="chevron-forward-outline"
            ></ion-icon>
          </ion-button>
        </div>

        <ion-card *ngIf="historicalMatches.length === 0">
          <ion-card-content>
            <div class="no-matches">
              No matches found for Gameweek {{ selectedHistoryGameweek }}.
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card *ngIf="historicalMatches.length > 0">
          <ion-card-content>
            <ion-list>
              <ion-item *ngFor="let match of historicalMatches">
                <div class="match-item">
                  <div class="match-info">
                    <div class="venue-info">{{ match.venue }}</div>
                    <div class="match-time">
                      <ion-icon name="time-outline"></ion-icon>
                      {{ match.kickoff | date : 'EEE d MMM, HH:mm' }}
                    </div>
                  </div>
                  <div class="teams-score">
                    <div class="team home">{{ match.homeTeam }}</div>
                    <div class="score finished">
                      <div class="score-label">FINAL SCORE</div>
                      <div class="score-value">
                        {{ match.finalScore?.home || 0 }} -
                        {{ match.finalScore?.away || 0 }}
                      </div>
                      <div class="match-minute">FT</div>
                    </div>
                    <div class="team away">{{ match.awayTeam }}</div>
                  </div>
                </div>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .scores-segment {
        margin-bottom: 16px;
        --background: var(--ion-color-light);
      }

      .gameweek-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding: 0 8px;
      }

      .nav-button {
        --padding-start: 8px;
        --padding-end: 8px;
        height: 36px;
        --color: var(--ion-color-medium);

        &[disabled] {
          opacity: 0.5;
        }

        ion-icon {
          font-size: 24px;
        }
      }

      .gameweek-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: var(--ion-color-dark);
        }
      }

      .no-matches {
        text-align: center;
        padding: 32px 16px;
        color: var(--ion-color-medium);
        font-size: 16px;
      }

      .match-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px 0;
      }

      .match-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
      }

      .venue-info {
        font-size: 14px;
        color: var(--ion-color-medium);
      }

      .match-time {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--ion-color-medium);

        ion-icon {
          font-size: 16px;
        }

        .live-badge {
          font-size: 10px;
          padding: 4px 6px;
          margin-left: 6px;
        }
      }

      .teams-score {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin: 8px 0;
      }

      .team {
        flex: 1;
        font-size: 16px;
        font-weight: 500;

        &.home {
          text-align: right;
        }

        &.away {
          text-align: left;
        }
      }

      .score {
        min-width: 120px;
        padding: 8px 16px;
        border-radius: 8px;
        text-align: center;

        &.scheduled {
          background: var(--ion-color-light);
          color: var(--ion-color-medium);
        }

        &.live {
          background-color: rgba(var(--ion-color-danger-rgb), 0.08);
          color: var(--ion-color-danger);
        }

        &.finished {
          background-color: rgba(var(--ion-color-success-rgb), 0.08);
          color: var(--ion-color-success);
        }

        .score-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .score-value {
          font-size: 18px;
          font-weight: 600;
          margin: 4px 0;
        }

        .match-minute {
          font-size: 14px;
          margin-top: 2px;
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
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonBadge,
    IonIcon,
    IonButton,
    NgIf,
    NgFor,
    NgClass,
    DatePipe,
    FormsModule,
  ],
})
export class LivePage implements OnInit, OnDestroy {
  selectedSegment = 'current';
  currentMatches: Match[] = [];
  historicalMatches: Match[] = [];
  selectedHistoryGameweek = 14;
  historicalGameweeks: number[] = [];
  liveScoreUpdateInterval: any;

  constructor() {
    addIcons({
      timeOutline,
      footballOutline,
      chevronBackOutline,
      chevronForwardOutline,
    });
  }

  ngOnInit() {
    this.loadMatches();
    this.startLiveScoreUpdates();
  }

  ngOnDestroy() {
    if (this.liveScoreUpdateInterval) {
      clearInterval(this.liveScoreUpdateInterval);
    }
  }

  loadMatches() {
    // Mock current matches data
    const mockCurrentMatches: Match[] = [
      {
        id: 1,
        gameweek: 15,
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        kickoff: '2024-01-20T15:00:00',
        venue: 'Old Trafford',
        status: 'live',
        liveScore: {
          home: 2,
          away: 1,
          isLive: true,
          minute: 67,
        },
      },
      {
        id: 2,
        gameweek: 15,
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        kickoff: '2024-01-20T17:30:00',
        venue: 'Emirates Stadium',
        status: 'scheduled',
      },
      {
        id: 3,
        gameweek: 15,
        homeTeam: 'Manchester City',
        awayTeam: 'Tottenham',
        kickoff: '2024-01-20T20:00:00',
        venue: 'Etihad Stadium',
        status: 'scheduled',
      },
    ];

    this.currentMatches = mockCurrentMatches;

    // Mock historical matches data
    const mockHistoricalMatches: Match[] = [
      {
        id: 1,
        gameweek: 14,
        homeTeam: 'Arsenal',
        awayTeam: 'Brighton',
        kickoff: '2024-01-17T19:45:00',
        venue: 'Emirates Stadium',
        status: 'finished' as const,
        finalScore: {
          home: 2,
          away: 1,
        },
      },
      {
        id: 2,
        gameweek: 14,
        homeTeam: 'Brentford',
        awayTeam: 'Chelsea',
        kickoff: '2024-01-17T20:00:00',
        venue: 'Gtech Community Stadium',
        status: 'finished' as const,
        finalScore: {
          home: 0,
          away: 2,
        },
      },
      {
        id: 3,
        gameweek: 14,
        homeTeam: 'Manchester City',
        awayTeam: 'Tottenham',
        kickoff: '2024-01-17T20:15:00',
        venue: 'Etihad Stadium',
        status: 'finished' as const,
        finalScore: {
          home: 3,
          away: 3,
        },
      },
    ];

    this.historicalMatches = mockHistoricalMatches;
    this.historicalGameweeks = [14, 13, 12, 11, 10];
  }

  startLiveScoreUpdates() {
    // Update live scores every minute
    this.liveScoreUpdateInterval = setInterval(() => {
      this.updateLiveScores();
    }, 60000); // 60000ms = 1 minute

    // Initial update
    this.updateLiveScores();
  }

  updateLiveScores() {
    // In a real application, this would make an API call
    // For now, we'll just update the mock data
    this.currentMatches = this.currentMatches.map((match) => {
      if (match.status === 'live') {
        return {
          ...match,
          liveScore: {
            ...match.liveScore!,
            minute: this.calculateMatchMinute(match.kickoff),
          },
        };
      }
      if (this.shouldStartMatch(match)) {
        return {
          ...match,
          status: 'live',
          liveScore: {
            home: 0,
            away: 0,
            isLive: true,
            minute: 1,
          },
        };
      }
      if (this.shouldFinishMatch(match)) {
        const finalScore = match.liveScore || { home: 0, away: 0 };
        return {
          ...match,
          status: 'finished',
          finalScore: {
            home: finalScore.home,
            away: finalScore.away,
          },
        };
      }
      return match;
    });
  }

  shouldStartMatch(match: Match): boolean {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    return match.status === 'scheduled' && now >= kickoff;
  }

  shouldFinishMatch(match: Match): boolean {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    return (
      match.status === 'live' &&
      now >= new Date(kickoff.getTime() + 2 * 60 * 60 * 1000)
    );
  }

  calculateMatchMinute(kickoff: string): number {
    const kickoffTime = new Date(kickoff);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - kickoffTime.getTime()) / 60000
    );

    // Handle half time (45-60 minutes shows as 45+)
    if (diffInMinutes >= 45 && diffInMinutes < 60) {
      return 45;
    }

    // Handle full time (90+ minutes)
    if (diffInMinutes >= 90) {
      return 90;
    }

    // Handle second half (subtract 15 minutes for half time)
    if (diffInMinutes > 60) {
      return diffInMinutes - 15;
    }

    return diffInMinutes;
  }

  getMatchTime(match: Match): string {
    if (match.status !== 'live' || !match.liveScore?.isLive) return '';

    const minute = match.liveScore.minute;
    const additionalTime = match.liveScore.additionalTime;

    if (minute === 45 && additionalTime) {
      return `45+${additionalTime}'`;
    }
    if (minute === 90 && additionalTime) {
      return `90+${additionalTime}'`;
    }
    return `${minute}'`;
  }

  getMatchStatus(match: Match): string {
    switch (match.status) {
      case 'scheduled':
        return 'SCHEDULED';
      case 'live':
        return 'LIVE';
      case 'finished':
        return 'FINAL SCORE';
      default:
        return '';
    }
  }

  getScoreClass(match: Match): string {
    return match.status;
  }

  isMatchLive(match: Match): boolean {
    return match.status === 'live';
  }

  navigateHistoryGameweek(delta: number) {
    const currentIndex = this.historicalGameweeks.indexOf(
      this.selectedHistoryGameweek
    );
    const newIndex = currentIndex + delta;

    if (newIndex >= 0 && newIndex < this.historicalGameweeks.length) {
      this.selectedHistoryGameweek = this.historicalGameweeks[newIndex];
      // In a real app, this would fetch the matches for the selected gameweek
      // For now, we'll just keep the same matches
    }
  }

  canNavigateHistory(direction: 'back' | 'forward'): boolean {
    const currentIndex = this.historicalGameweeks.indexOf(
      this.selectedHistoryGameweek
    );
    return direction === 'back'
      ? currentIndex < this.historicalGameweeks.length - 1
      : currentIndex > 0;
  }
}
