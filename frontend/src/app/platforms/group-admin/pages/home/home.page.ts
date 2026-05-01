import { Component, OnInit } from '@angular/core';
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
  IonSkeletonText,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trophyOutline,
  timeOutline,
  ribbonOutline,
  arrowForwardOutline,
  flameOutline,
  copyOutline,
  peopleOutline,
  settingsOutline,
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
  selector: 'app-group-admin-home',
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
    IonSkeletonText,
    CountdownTimerComponent,
  ],
})
export class GroupAdminHomePage implements OnInit {
  isLoading = true;

  // Player-facing cards (admin is also a competitor).
  lastWeek: LastWeekRecap | null = null;
  leaderboardPreview: Standing[] = [];
  callerStanding: Standing | null = null;
  nextGameweek: NextGameweekCard | null = null;

  // Admin-only block.
  groupId: string | null = null;
  groupName = '';
  groupCode = '';
  memberCount = 0;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private supabaseDataService: SupabaseDataService,
    private authService: AuthService,
    private logger: LoggerService,
    private toastController: ToastController,
  ) {
    addIcons({
      trophyOutline,
      timeOutline,
      ribbonOutline,
      arrowForwardOutline,
      flameOutline,
      copyOutline,
      peopleOutline,
      settingsOutline,
    });
  }

  ngOnInit(): void {
    void this.load();
  }

  /**
   * Same load shape as player home: group → leaderboard → next-GW →
   * last-week. Admin home additionally surfaces the group's join code
   * and member count for the admin block at the top.
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

      const adminGroups = await this.groupService.getAdminGroups();
      const primary = adminGroups[0];
      if (!primary) {
        // First-login admin who hasn't created their group yet — send to
        // the create-group flow (which migrates into the new /group page
        // empty-state in Phase 6 / Phase 1 cleanup).
        this.router.navigate(['/group-admin/groups']);
        return;
      }
      this.groupId = primary.id;
      this.groupName = primary.name;
      this.groupCode = primary.code;
      this.memberCount = primary.current_members ?? 0;

      // Build the leaderboard via the shared standings pipeline so the
      // ADMIN/YOU badges are computed consistently with the player home.
      const standings = await this.groupService.getUserGroupsWithStandings();
      const matched = standings.find((s) => s.group.id === primary.id);
      if (matched) {
        const leaderboard = matched.leaderboard;
        const top = leaderboard.slice(0, 3);
        const caller = leaderboard.find((s) => s.userId === userId) ?? null;
        this.leaderboardPreview = top;
        this.callerStanding =
          caller && !top.some((t) => t.userId === userId) ? caller : null;
      }

      // Active gameweek + caller's predictions for it.
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

        if (active.gameweek_number > 1) {
          const previousGw = sorted.find(
            (gw) => gw.gameweek_number === active.gameweek_number - 1,
          );
          if (previousGw) {
            await this.buildLastWeekRecap(previousGw.gameweek_number);
          }
        }
      }
    } catch (error) {
      this.logger.error('group-admin-home.load', error);
    } finally {
      this.isLoading = false;
    }
  }

  private async buildLastWeekRecap(gameweekNumber: number): Promise<void> {
    try {
      const predictions =
        await this.supabaseDataService.getPredictions(gameweekNumber);
      if (!predictions.length) {
        this.lastWeek = null;
        return;
      }
      const totalPoints = predictions.reduce(
        (sum, p) => sum + (p.points_earned ?? 0),
        0,
      );
      const correctScores = predictions.filter(
        (p) =>
          p.points_earned !== undefined &&
          p.points_earned !== null &&
          p.points_earned >= 5,
      ).length;
      this.lastWeek = {
        gameweekNumber,
        pointsEarned: totalPoints,
        predictionCount: predictions.length,
        perfectRound: correctScores >= 3,
      };
    } catch (error) {
      this.logger.warn('group-admin-home.buildLastWeekRecap', error);
      this.lastWeek = null;
    }
  }

  async copyGroupCode(): Promise<void> {
    if (!this.groupCode) return;
    try {
      await navigator.clipboard.writeText(this.groupCode);
      const toast = await this.toastController.create({
        message: `Group code ${this.groupCode} copied`,
        duration: 1800,
        color: 'success',
        position: 'top',
      });
      await toast.present();
    } catch {
      // Clipboard API can be unavailable on insecure contexts (file://,
      // some embedded webviews). Fall back to silent no-op rather than
      // throwing — the code is still visible on screen for manual copy.
    }
  }

  goToPredictions(): void {
    this.router.navigate(['/group-admin/predictions']);
  }

  goToFullLeaderboard(): void {
    if (this.groupId) {
      this.router.navigate(['/group-admin/leaderboard']);
    }
  }

  goToGroupManagement(): void {
    this.router.navigate(['/group-admin/group']);
  }

  goToHistory(): void {
    this.router.navigate(['/group-admin/history']);
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
