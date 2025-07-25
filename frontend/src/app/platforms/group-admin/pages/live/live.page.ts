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
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
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
