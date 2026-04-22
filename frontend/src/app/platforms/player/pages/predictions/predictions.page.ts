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
  IonToast,
  IonButton,
  IonButtons,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf, NgClass } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  footballOutline,
  closeCircleOutline,
  timeOutline,
  checkmarkCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  personOutline,
  peopleOutline,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SeasonService } from '@core/services/season.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { LoggerService } from '@core/services/logger.service';

/**
 * View model bound to the predictions template. `id` is a UUID string from
 * the Supabase `predictions` row; historical `finalScore` is set only when
 * the parent match has `status === 'completed'`.
 */
interface Prediction {
  id: string;
  gameweek: number;
  match: {
    homeTeam: string;
    awayTeam: string;
    kickoff: string;
    venue: string;
    // Live scores are not yet populated in the DB for MVP; keep the shape so
    // existing template bindings (`pred.match.liveScore?.isLive/.home/.away`)
    // compile under strictTemplates, but leave the value null.
    liveScore: { isLive: boolean; home: number; away: number } | null;
    finalScore: { home: number; away: number } | null;
  };
  prediction: {
    home: number;
    away: number;
  };
  points: number;
  status: 'pending' | 'correct' | 'incorrect';
}

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.page.html',
  styleUrls: ['./predictions.page.scss'],
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
    IonButton,
    IonButtons,
    IonSelect,
    IonSelectOption,
    NgFor,
    NgIf,
    NgClass,
    DatePipe,
    FormsModule,
    IonToast,
    RouterLink,
  ],
})
export class PredictionsPage {
  selectedSegment = 'current';
  currentGameweek = 1;
  currentPredictions: Prediction[] = [];
  historicalPredictions: Prediction[] = [];
  showNewPredictionsToast = false;
  selectedHistoryGameweek = 0;
  historicalGameweeks: number[] = [];
  isLoading = false;
  availableGroups: Array<{ id: string; name: string }> = [];
  selectedGroupId: string | null = null;
  hasNoGroups = false;

  constructor(
    private router: Router,
    private seasonService: SeasonService,
    private supabaseDataService: SupabaseDataService,
    private logger: LoggerService,
  ) {
    addIcons({
      footballOutline,
      closeCircleOutline,
      timeOutline,
      checkmarkCircleOutline,
      chevronBackOutline,
      chevronForwardOutline,
      personOutline,
      peopleOutline,
    });
  }

  async ionViewWillEnter(): Promise<void> {
    this.isLoading = true;
    try {
      await this.seasonService.init();
      this.currentGameweek = this.seasonService.getCurrentGameweek();

      // Load groups first — the selector sets the context for Task 3.3
      // (visibility of OTHER players' predictions). If the user has no
      // group, there is nothing meaningful to show so we short-circuit.
      //
      // `getGroups` is guarded because legacy test doubles may only stub
      // `getPredictionsWithMatches`; without the guard those suites would
      // fail even though they predate Task 3.2.5. In production the method
      // is always present on the real service.
      if (typeof this.supabaseDataService.getGroups === 'function') {
        let groups: Array<{ id: string; name: string }> = [];
        try {
          groups = (await this.supabaseDataService.getGroups()) ?? [];
        } catch (err) {
          this.logger.error('predictions.loadGroups', err);
          groups = [];
        }

        if (groups.length === 0) {
          this.availableGroups = [];
          this.selectedGroupId = null;
          this.hasNoGroups = true;
          this.currentPredictions = [];
          return;
        }

        this.availableGroups = groups;
        this.selectedGroupId = groups[0].id;
        this.hasNoGroups = false;
      }

      const rows = await this.supabaseDataService.getPredictionsWithMatches(
        this.currentGameweek,
      );
      this.currentPredictions = rows.map((row) => this.toViewModel(row));
      this.historicalGameweeks = this.buildHistoricalGameweeks(
        this.currentGameweek,
      );
      if (
        this.historicalGameweeks.length > 0 &&
        this.selectedHistoryGameweek === 0
      ) {
        this.selectedHistoryGameweek = this.historicalGameweeks[0];
        // Populate the history list eagerly so the History tab has data on
        // first entry instead of requiring the user to tap the nav chevrons.
        await this.updateHistoricalPredictions();
      }
    } catch (err) {
      this.logger.error('predictions.loadPredictions', err);
      this.currentPredictions = [];
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Update the active group context. Predictions themselves are per-player
   * (UNIQUE(user_id, match_id)) so this does not refetch the current user's
   * own predictions. Task 3.3 will use `selectedGroupId` to fetch other
   * players' predictions for the selected group.
   */
  onGroupChange(groupId: string): void {
    this.selectedGroupId = groupId;
  }

  /**
   * Map a raw Supabase `predictions` row (with joined `matches`) to the
   * page's `Prediction` view model. Safe against partially-populated rows
   * so the empty state never crashes.
   */
  private toViewModel(row: any): Prediction {
    const match = row.matches ?? {};
    const completed = match.status === 'completed';
    const points = row.points_earned ?? 0;
    return {
      id: row.id,
      gameweek: row.gameweek_number,
      match: {
        homeTeam: match.home_team,
        awayTeam: match.away_team,
        kickoff: match.kickoff_time,
        venue: '',
        liveScore: null,
        finalScore: completed
          ? { home: match.home_score, away: match.away_score }
          : null,
      },
      prediction: {
        // Defensive `?? 0` (Task 4.2.4.1): saved rows should always carry
        // scores, but a partial sync could leave a null slipping through.
        // Keep the `Prediction.prediction.home/away` shape as `number` so
        // template bindings never receive null.
        home: row.home_score ?? 0,
        away: row.away_score ?? 0,
      },
      points,
      status: this.deriveStatus(match.status, points),
    };
  }

  /**
   * Status derivation:
   *  - completed + points > 0 -> 'correct'
   *  - completed + points === 0 -> 'incorrect'
   *  - anything else -> 'pending'
   * Kept in one helper so template colouring and status logic stay in sync.
   */
  private deriveStatus(
    matchStatus: string | undefined,
    points: number,
  ): 'pending' | 'correct' | 'incorrect' {
    if (matchStatus !== 'completed') {
      return 'pending';
    }
    return points > 0 ? 'correct' : 'incorrect';
  }

  /**
   * List of gameweek numbers prior to the current one that are candidates
   * for the history segment (lazy fetch by gameweek is handled by
   * `updateHistoricalPredictions`). Returns [] for gameweek 1 or before.
   */
  private buildHistoricalGameweeks(current: number): number[] {
    if (current <= 1) return [];
    // Newest first, e.g. current=5 -> [4, 3, 2, 1]
    const out: number[] = [];
    for (let gw = current - 1; gw >= 1; gw--) {
      out.push(gw);
    }
    return out;
  }

  async updateHistoricalPredictions(): Promise<void> {
    if (!this.selectedHistoryGameweek) {
      this.historicalPredictions = [];
      return;
    }
    try {
      const rows = await this.supabaseDataService.getPredictionsWithMatches(
        this.selectedHistoryGameweek,
      );
      this.historicalPredictions = rows.map((row) => this.toViewModel(row));
    } catch (err) {
      this.logger.error('predictions.loadHistoricalPredictions', err);
      this.historicalPredictions = [];
    }
  }

  navigateHistoryGameweek(delta: number) {
    const currentIndex = this.historicalGameweeks.indexOf(
      this.selectedHistoryGameweek,
    );
    const newIndex = currentIndex + delta;

    if (newIndex >= 0 && newIndex < this.historicalGameweeks.length) {
      this.selectedHistoryGameweek = this.historicalGameweeks[newIndex];
      void this.updateHistoricalPredictions();
    }
  }

  canNavigateHistory(direction: 'back' | 'forward'): boolean {
    const currentIndex = this.historicalGameweeks.indexOf(
      this.selectedHistoryGameweek,
    );
    return direction === 'back'
      ? currentIndex < this.historicalGameweeks.length - 1
      : currentIndex > 0;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'correct':
        return 'success';
      case 'incorrect':
        return 'danger';
      default:
        return 'warning';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'correct':
        return 'checkmark-circle-outline';
      case 'incorrect':
        return 'close-circle-outline';
      default:
        return 'time-outline';
    }
  }

  // MVP: live scores not yet wired to DB; these helpers always report false
  // so the existing template bindings hide live/finished badges cleanly.
  isMatchFinished(match: any): boolean {
    return !!match?.finalScore;
  }

  isMatchLive(_match: any): boolean {
    return false;
  }

  getMatchTime(_match: any): string {
    return '';
  }

  getScoreClass(match: any): string {
    return this.isMatchFinished(match) ? 'finished' : 'live';
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
