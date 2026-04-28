import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  IonButton,
  IonButtons,
  IonBackButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trophyOutline,
  arrowUpOutline,
  arrowDownOutline,
  removeOutline,
  peopleOutline,
  arrowBackOutline,
  lockClosedOutline
} from 'ionicons/icons';
import { GroupService, Standing } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { SeasonService } from '@core/services/season.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { LoggerService } from '@core/services/logger.service';
import { SupabaseError } from '@core/errors/supabase-error';
import { ToastController } from '@ionic/angular/standalone';

interface GroupDetails {
  id: string;
  name: string;
  code: string;
  memberCount: number;
}

@Component({
  selector: 'app-group-standings',
  templateUrl: './group-standings.page.html',
  styleUrls: ['./group-standings.page.scss'],
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
    IonButton,
    IonButtons,
    IonBackButton,
    IonSpinner,
    CommonModule
  ],
})
export class GroupStandingsPage implements OnInit {
  groupId: string = '';
  currentUserId: string | null = null;
  isLoading = false;
  group: GroupDetails | null = null;
  standings: Standing[] = [];
  userPosition: number | null = null;
  predictionsLocked = false;
  groupPredictions: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private authService: AuthService,
    private seasonService: SeasonService,
    private supabaseDataService: SupabaseDataService,
    private toastController: ToastController,
    private logger: LoggerService,
  ) {
    addIcons({
      trophyOutline,
      arrowUpOutline,
      arrowDownOutline,
      removeOutline,
      peopleOutline,
      arrowBackOutline,
      lockClosedOutline
    });
  }

  async ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('groupId') || '';
    this.currentUserId = this.authService.getCurrentUser()?.id || null;

    // Await so `isLoading` is cleared in the `finally` before ngOnInit
    // resolves. Callers (and tests) that `await component.ngOnInit()`
    // can then trust the DOM has been rendered, not still gated by the
    // loading spinner.
    await this.loadGroupStandings();

    // Skip the visibility flow if we don't have a real groupId —
    // otherwise getGroupPredictions('') would log an error and surface
    // a toast for an upstream routing bug.
    if (!this.groupId) {
      return;
    }

    await this.loadVisibilityAndPredictions(
      this.groupId,
      this.seasonService.getCurrentGameweek(),
    );
  }

  /**
   * Decide whether group predictions are visible to this player and, if so,
   * load them. Called during init. Mirrors the RLS rule: predictions for a
   * gameweek are only visible once the deadline has passed.
   */
  private async loadVisibilityAndPredictions(
    groupId: string,
    gameweek: number,
  ): Promise<void> {
    let isPast = false;
    try {
      const result = await this.supabaseDataService.getGameweekDeadline(gameweek);
      isPast = result.isPast;
    } catch (err) {
      this.logger.error('group-standings.loadGameweekDeadline', err);
      // Fail-open: without a deadline, don't lock the UI and don't attempt
      // to fetch predictions (which would also fail at the RLS boundary).
      this.predictionsLocked = false;
      this.groupPredictions = [];
      return;
    }

    this.predictionsLocked = !isPast;
    if (!isPast) {
      this.groupPredictions = [];
      return;
    }

    try {
      this.groupPredictions = await this.supabaseDataService.getGroupPredictions(
        groupId,
        gameweek,
      );
    } catch (err) {
      this.logger.error('group-standings.loadGroupPredictions', err);
      this.groupPredictions = [];
      const msg =
        err instanceof SupabaseError ? err.userMessage : 'Unable to load group predictions';
      await this.showErrorToast(msg);
    }
  }

  private async showErrorToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }

  private async loadGroupStandings() {
    this.isLoading = true;
    try {
      const groupWithStandings = await this.groupService.getGroupWithStandings(this.groupId);

      if (groupWithStandings) {
        this.group = groupWithStandings.group;
        this.standings = groupWithStandings.leaderboard;
        this.userPosition = groupWithStandings.userPosition;
      } else {
        // Group not found, navigate back
        this.router.navigate(['/player/standings']);
      }
    } catch (error) {
      this.logger.error('group-standings.loadGroupStandings', error);
      this.router.navigate(['/player/standings']);
    } finally {
      this.isLoading = false;
    }
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

  isCurrentUser(userId: string): boolean {
    return userId === this.currentUserId;
  }

  goBack() {
    this.router.navigate(['/player/standings']);
  }
} 