import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trophyOutline,
  timeOutline,
  ribbonOutline,
  arrowForwardOutline,
  flameOutline,
} from 'ionicons/icons';
import { GroupService, Standing } from '@core/services/group.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { AuthService } from '@core/services/auth.service';
import { LoggerService } from '@core/services/logger.service';
import { CountdownTimerComponent } from '../../../../shared/components/countdown-timer/countdown-timer.component';

interface LastWeekRecap {
  gameweekNumber: number;
  pointsEarned: number;
  predictionCount: number;
  perfectRound: boolean;
}

interface NextGameweekCard {
  gameweekNumber: number;
  deadline: Date;
  alreadyPredicted: boolean;
}

@Component({
  selector: 'app-player-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonSpinner,
    CountdownTimerComponent,
  ],
})
export class PlayerHomePage implements OnInit, OnDestroy {
  isLoading = true;

  // Card 1 — Last week recap. null = hide the card (no completed GW yet,
  // or the user simply didn't predict last week).
  lastWeek: LastWeekRecap | null = null;

  // Card 2 — Leaderboard preview. Top 3 plus the caller's row if outside
  // the top 3. groupName + groupId so "View full" can deep-link.
  leaderboardPreview: Standing[] = [];
  callerStanding: Standing | null = null;
  groupId: string | null = null;
  groupName = '';

  // Card 3 — Next gameweek countdown.
  nextGameweek: NextGameweekCard | null = null;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private supabaseDataService: SupabaseDataService,
    private authService: AuthService,
    private logger: LoggerService,
  ) {
    addIcons({
      trophyOutline,
      timeOutline,
      ribbonOutline,
      arrowForwardOutline,
      flameOutline,
    });
  }

  ngOnInit(): void {
    void this.load();
  }

  ngOnDestroy(): void {
    // No active subscriptions; CountdownTimerComponent owns its own interval.
  }

  /**
   * Sequential load — group → leaderboard → predictions for last/next GW.
   * Sequential rather than parallel because the leaderboard call drives
   * the groupId we need for the prediction queries. For 1-group MVP cohort
   * the latency cost is negligible.
   */
  private async load(): Promise<void> {
    this.isLoading = true;
    try {
      const currentUser = this.authService.getCurrentUser();
      const userId = currentUser?.id;
      if (!userId) {
        this.router.navigate(['/auth/login']);
        return;
      }

      // 1. Find caller's group(s). MVP cohort = exactly 1 group.
      const groupsWithStandings =
        await this.groupService.getUserGroupsWithStandings();
      const primary = groupsWithStandings[0];
      if (!primary) {
        // Belt-and-braces — first-login flow should already have routed
        // a no-group user to /player/join-group. Guard the edge case
        // (e.g. user left their last group, then refreshed).
        this.router.navigate(['/player/join-group']);
        return;
      }
      this.groupId = primary.group.id;
      this.groupName = primary.group.name;

      // 2. Top-3 + caller's row for the preview card.
      this.buildLeaderboardPreview(primary.leaderboard, userId);

      // 3. Next gameweek = the active one (set by sync-matches).
      const allGameweeks = await this.supabaseDataService.getGameweeks();
      const sorted = [...allGameweeks].sort(
        (a, b) => a.gameweek_number - b.gameweek_number,
      );
      const active = sorted.find((gw) => gw.is_active);
      if (active) {
        const myPredictions =
          await this.supabaseDataService.getPredictions(active.gameweek_number);
        this.nextGameweek = {
          gameweekNumber: active.gameweek_number,
          deadline: new Date(active.deadline),
          alreadyPredicted: myPredictions.length > 0,
        };
      }

      // 4. Last week = the gameweek immediately before the active one.
      //    Only show the recap card if the user actually predicted that GW.
      if (active && active.gameweek_number > 1) {
        const previousGw = sorted.find(
          (gw) => gw.gameweek_number === active.gameweek_number - 1,
        );
        if (previousGw) {
          await this.buildLastWeekRecap(previousGw.gameweek_number);
        }
      }
    } catch (error) {
      this.logger.error('player-home.load', error);
    } finally {
      this.isLoading = false;
    }
  }

  private buildLeaderboardPreview(
    leaderboard: Standing[],
    userId: string,
  ): void {
    if (!leaderboard.length) {
      this.leaderboardPreview = [];
      this.callerStanding = null;
      return;
    }
    const top = leaderboard.slice(0, 3);
    const caller = leaderboard.find((s) => s.userId === userId) ?? null;
    this.leaderboardPreview = top;
    // Only show the "+ you in position N" row if caller is OUTSIDE top 3.
    this.callerStanding =
      caller && !top.some((t) => t.userId === userId) ? caller : null;
  }

  private async buildLastWeekRecap(gameweekNumber: number): Promise<void> {
    try {
      const predictions =
        await this.supabaseDataService.getPredictions(gameweekNumber);
      if (!predictions.length) {
        // User didn't predict last week — nothing to recap.
        this.lastWeek = null;
        return;
      }
      const totalPoints = predictions.reduce(
        (sum, p) => sum + (p.points_earned ?? 0),
        0,
      );
      // "Perfect round" = the +10 bonus is awarded by the scoring trigger
      // (migration 010) when every match in a non-special GW is predicted
      // exactly. Here we approximate: 3 correct scores in this GW. Pre-
      // launch the trigger fires after a match completes; until then
      // points_earned will be 0 for everyone and this card just shows 0
      // points / N predictions, which is fine.
      const correctScores = predictions.filter(
        (p) =>
          p.points_earned !== undefined && p.points_earned !== null && p.points_earned >= 5,
      ).length;
      this.lastWeek = {
        gameweekNumber,
        pointsEarned: totalPoints,
        predictionCount: predictions.length,
        perfectRound: correctScores >= 3,
      };
    } catch (error) {
      this.logger.warn('player-home.buildLastWeekRecap', error);
      this.lastWeek = null;
    }
  }

  goToPredictions(): void {
    // /player/matches is where predictions are MADE (joker toggle, score
    // inputs, submit). /player/predictions is the read-only "my picks"
    // view. Two-page split is intentional and we'll keep it for MVP.
    this.router.navigate(['/player/matches']);
  }

  goToFullLeaderboard(): void {
    if (this.groupId) {
      this.router.navigate(['/player/standings'], {
        queryParams: { groupId: this.groupId },
      });
    }
  }

  goToHistory(): void {
    this.router.navigate(['/player/history']);
  }

  positionSuffix(position: number): string {
    if (position > 3 && position < 21) return 'th';
    switch (position % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
