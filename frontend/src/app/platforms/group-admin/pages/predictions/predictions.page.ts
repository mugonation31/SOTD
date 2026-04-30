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
  IonButtons,
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
  IonBadge,
  IonAlert,
  IonSpinner,
  IonToggle,
  ToastController,
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
  alertCircleOutline,
  timeOutline,
  refreshOutline,
  footballOutline,
  closeCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  personOutline,
  informationCircleOutline,
  checkmarkCircleOutline,
  lockClosedOutline,
  starOutline,
} from 'ionicons/icons';
import { GroupService } from '@core/services/group.service';
import { SeasonService } from '@core/services/season.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { LoggerService } from '@core/services/logger.service';
import { SupabaseError } from '@core/errors/supabase-error';
import { Match as SupabaseMatch } from '../../../../services/supabase.service';
import { Router } from '@angular/router';

interface GameWeek {
  number: number;
  isSpecial: boolean;
  specialType?: string;
  status: 'pending' | 'active' | 'completed';
  deadline: Date;
  matches: Match[];
}

interface Match {
  id: number;
  matchUuid?: string;
  gameweek: number;
  homeTeam: string;
  awayTeam: string;
  kickoff: string;
  venue: string;
  homeScore?: number | null;
  awayScore?: number | null;
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

interface PlayerPrediction {
  playerName: string;
  avatar?: string;
  totalPoints: number;
  jokerUsed: boolean;
  predictions: PredictionWithResult[];
  isCurrentUser?: boolean;
}

interface PredictionWithResult extends Match {
  points?: number;
  isCorrectScore?: boolean;
  isCorrectResult?: boolean;
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
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonButtons,
    IonCardTitle,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonNote,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonList,
    IonItem,
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
    IonBadge,
    IonAlert,
    IonSpinner,
    IonToggle,
  ],
})
export class PredictionsPage implements OnInit {
  selectedTab = 'my';
  selectedSegment = 'current';
  searchTerm = '';
  filterStatus = 'all';
  currentGameweekIndex = 0;
  selectedGameweek: GameWeek;
  gameweeks: GameWeek[] = [];
  filteredPredictions: PlayerPrediction[] = [];
  allPredictions: PlayerPrediction[] = [];
  showTooManyPredictionsWarning = false;
  currentGameWeek: GameWeek;
  pastPredictions: Match[] = [];
  canSubmit = false;
  selectedPredictionCount = 0;
  currentGameweek: number;
  currentGameweekId: string | null = null;
  jokersRemaining: number = 2;
  jokerUsedThisGameweek: boolean = false;
  isSubmitting: boolean = false;
  currentMatches: Match[] = [];
  historicalMatches: Match[] = [];
  selectedHistoryGameweek = 14;
  historicalGameweeks: number[] = [];
  liveScoreUpdateInterval: any;

  // Task 3.3.3 — visibility gating for "All Predictions" tab
  predictionsLocked = false;
  groupPredictions: any[] = [];
  adminGroupId: string | null = null;
  private allPredictionsLoaded = false;

  /**
   * Task 4.2.4.2 — true during the initial admin-group resolution fetch so
   * the template can render a loading spinner instead of flashing the tab UI
   * over stale state. Reset in the `finally` of `ngOnInit`.
   */
  isLoading = false;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private seasonService: SeasonService,
    private supabaseDataService: SupabaseDataService,
    private toastController: ToastController,
    private logger: LoggerService,
  ) {
    addIcons({footballOutline,personOutline,chevronBackOutline,chevronForwardOutline,timeOutline,refreshOutline,chevronBack,star,starOutline,chevronForward,informationCircleOutline,checkmarkCircleOutline,checkmarkCircle,closeCircle,alertCircleOutline,closeCircleOutline,lockClosedOutline,});

    // Task 4.2.11: seed sane defaults synchronously so the template can render
    // immediately. Real values are hydrated asynchronously from SupabaseData /
    // SeasonService in `ngOnInit` → `loadCurrentGameweek()`.
    this.currentGameweek = 1;
    this.gameweeks = this.getSampleGameweeks();
    this.selectedGameweek = this.gameweeks[0];
    this.allPredictions = [];
    this.filteredPredictions = [];
    this.currentGameWeek = {
      number: 1,
      isSpecial: false,
      status: 'active',
      deadline: new Date(0),
      matches: [],
    };
    this.pastPredictions = [];
  }

  async ngOnInit() {
    this.isLoading = true;
    try {
      await this.loadCurrentGameweek();
      await this.resolveAdminGroupId();
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Task 4.2.11: resolve the current gameweek number via `SeasonService` so
   * downstream match fetches hit the real season state. Falls back silently
   * to `1` on any error — the page stays usable with an empty matches state.
   */
  private async loadCurrentGameweek(): Promise<void> {
    try {
      await this.seasonService.init();
      this.currentGameweek = this.seasonService.getCurrentGameweek();
      await this.hydrateGameweekView(this.currentGameweek);
    } catch (err) {
      this.logger.error('group-admin-predictions.loadCurrentGameweek', err);
    }
  }

  /**
   * Task 4.2.11: hydrate `currentGameWeek` (the template-bound view-model)
   * from real DB state for a given gameweek number — deadline, is_special,
   * and the fixtures list all come from Supabase here. Called by
   * `loadCurrentGameweek` on init and by `navigateGameweek` when the admin
   * steps through weeks. Keeping the deadline + matches hydration in ONE
   * helper prevents the "1970-01-01 deadline + empty matches list" regression
   * that surfaced in review (template binds `currentGameWeek.matches`, not
   * `currentMatches`, so the fields must move together).
   */
  private async hydrateGameweekView(gameweekNumber: number): Promise<void> {
    // Find the gameweek row so we can read deadline + is_special + UUID.
    let gameweekRow: { id?: string; deadline?: string; is_special?: boolean } | null = null;
    try {
      const gameweeks = await this.supabaseDataService.getGameweeks();
      gameweekRow =
        (gameweeks || []).find(
          (gw: { gameweek_number: number }) =>
            gw.gameweek_number === gameweekNumber
        ) || null;
      this.currentGameweekId = gameweekRow?.id ?? null;
    } catch (err) {
      this.logger.error('group-admin-predictions.hydrateGameweekView.gw', err);
    }

    // Load joker state; fail-open (default jokersRemaining=2) on error.
    try {
      const usage = await this.supabaseDataService.getJokerUsage();
      this.jokersRemaining = Math.max(0, 2 - (usage?.usedCount ?? 0));
    } catch (err) {
      this.logger.error('group-admin-predictions.hydrateGameweekView.joker', err);
      this.jokersRemaining = 2;
    }

    // Fetch matches for this gameweek.
    let matches: Match[] = [];
    try {
      const rows = await this.supabaseDataService.getMatches(gameweekNumber);
      matches = rows.map((row) => this.toMatchViewModel(row));
    } catch (err) {
      this.logger.error(
        'group-admin-predictions.hydrateGameweekView.matches',
        err
      );
      const msg =
        err instanceof SupabaseError
          ? err.userMessage
          : 'Unable to load matches';
      await this.showErrorToast(msg);
    }

    this.currentGameweek = gameweekNumber;
    this.currentMatches = matches;
    this.currentGameWeek = {
      ...this.currentGameWeek,
      number: gameweekNumber,
      isSpecial: gameweekRow?.is_special ?? false,
      deadline: gameweekRow?.deadline
        ? new Date(gameweekRow.deadline)
        : new Date(0),
      matches,
    };
    this.jokerUsedThisGameweek = false;
  }

  async tabChanged() {
    if (this.selectedTab !== 'all') {
      return;
    }

    if (this.allPredictionsLoaded) {
      return;
    }

    if (!this.adminGroupId) {
      this.predictionsLocked = false;
      this.groupPredictions = [];
      return;
    }

    const gameweek = this.seasonService.getCurrentGameweek();
    const loaded = await this.loadVisibilityAndPredictions(
      this.adminGroupId,
      gameweek,
    );
    // Only latch when we actually fetched post-deadline data. Locking
    // is transient — if the deadline passes mid-session, the next tab
    // activation should re-check and fetch.
    this.allPredictionsLoaded = loaded;
  }

  /**
   * MVP single-group assumption: picks `adminGroups[0]` silently. A multi-
   * group admin UI (selector / route param) is queued for 4.3 ("admin
   * multi-group handling" in Admin UX nitpicks). Acceptable for MVP because
   * the first real cohort is a single-admin-single-group setup.
   */
  private async resolveAdminGroupId(): Promise<void> {
    try {
      const adminGroups = await this.groupService.getAdminGroups();
      this.adminGroupId = adminGroups && adminGroups.length > 0
        ? adminGroups[0].id
        : null;
    } catch {
      this.adminGroupId = null;
    }
  }

  /**
   * Decide whether group predictions are visible to this admin and, if so,
   * load them. Mirrors the RLS rule: predictions for a gameweek are only
   * visible once the deadline has passed. Admins follow the same rule.
   */
  private async loadVisibilityAndPredictions(
    groupId: string,
    gameweek: number,
  ): Promise<boolean> {
    let isPast = false;
    try {
      const result = await this.supabaseDataService.getGameweekDeadline(gameweek);
      isPast = result.isPast;
    } catch (err) {
      this.logger.error('group-admin-predictions.loadGameweekDeadline', err);
      this.predictionsLocked = false;
      this.groupPredictions = [];
      return false;
    }

    this.predictionsLocked = !isPast;
    if (!isPast) {
      this.groupPredictions = [];
      return false;
    }

    try {
      this.groupPredictions = await this.supabaseDataService.getGroupPredictions(
        groupId,
        gameweek,
      );
      return true;
    } catch (err) {
      this.logger.error('group-admin-predictions.loadGroupPredictions', err);
      this.groupPredictions = [];
      const msg =
        err instanceof SupabaseError ? err.userMessage : 'Unable to load group predictions';
      await this.showErrorToast(msg);
      return false;
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

  private async showSuccessToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'top',
    });
    await toast.present();
  }

  onScoreChange(match: Match) {
    // Ensure scores are numbers or null
    match.homeScore =
      match.homeScore === null ||
      match.homeScore === undefined ||
      match.homeScore.toString() === ''
        ? null
        : Number(match.homeScore);
    match.awayScore =
      match.awayScore === null ||
      match.awayScore === undefined ||
      match.awayScore.toString() === ''
        ? null
        : Number(match.awayScore);

    // Count valid predictions (both home and away scores are filled)
    const validPredictions = this.currentGameWeek.matches.filter(
      (m) => m.homeScore !== null && m.awayScore !== null
    ).length;

    // Show warning if more than 3 predictions in regular gameweek
    this.showTooManyPredictionsWarning =
      !this.currentGameWeek.isSpecial && validPredictions > 3;

    // Update submit button state
    if (this.currentGameWeek.isSpecial) {
      // All matches must be predicted in special gameweeks
      this.canSubmit = validPredictions === this.currentGameWeek.matches.length;
    } else {
      // Exactly 3 predictions required in regular gameweeks
      this.canSubmit = validPredictions === 3;
    }

    // For debugging


  }

  private getSampleCurrentGameWeek(): GameWeek {
    return {
      number: 15,
      isSpecial: false,
      status: 'active',
      deadline: new Date('2024-01-20T11:30:00'),
      matches: [
        {
          id: 1,
          gameweek: 15,
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          homeScore: null,
          awayScore: null,
          venue: 'Old Trafford',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 2,
          gameweek: 15,
          homeTeam: 'Arsenal',
          awayTeam: 'Chelsea',
          homeScore: null,
          awayScore: null,
          venue: 'Emirates Stadium',
          kickoff: '2024-01-20T17:30:00',
          status: 'scheduled',
        },
        {
          id: 3,
          gameweek: 15,
          homeTeam: 'Manchester City',
          awayTeam: 'Tottenham',
          homeScore: null,
          awayScore: null,
          venue: 'Etihad Stadium',
          kickoff: '2024-01-20T20:00:00',
          status: 'scheduled',
        },
        {
          id: 4,
          gameweek: 15,
          homeTeam: 'Newcastle',
          awayTeam: 'Aston Villa',
          homeScore: null,
          awayScore: null,
          venue: 'St. James Park',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 5,
          gameweek: 15,
          homeTeam: 'Brighton',
          awayTeam: 'Crystal Palace',
          homeScore: null,
          awayScore: null,
          venue: 'Amex Stadium',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 6,
          gameweek: 15,
          homeTeam: 'Brentford',
          awayTeam: 'Nottingham Forest',
          homeScore: null,
          awayScore: null,
          venue: 'Gtech Community Stadium',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 7,
          gameweek: 15,
          homeTeam: 'Sheffield United',
          awayTeam: 'West Ham',
          homeScore: null,
          awayScore: null,
          venue: 'Bramall Lane',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 8,
          gameweek: 15,
          homeTeam: 'Bournemouth',
          awayTeam: 'Luton Town',
          homeScore: null,
          awayScore: null,
          venue: 'Vitality Stadium',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 9,
          gameweek: 15,
          homeTeam: 'Wolves',
          awayTeam: 'Everton',
          homeScore: null,
          awayScore: null,
          venue: 'Molineux',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 10,
          gameweek: 15,
          homeTeam: 'Burnley',
          awayTeam: 'Fulham',
          homeScore: null,
          awayScore: null,
          venue: 'Turf Moor',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
      ],
    };
  }

  canUseJoker(): boolean {
    if (this.currentGameWeek.isSpecial) return false;
    if (this.jokersRemaining <= 0) return false;
    if (this.predictionsLocked) return false;
    return true;
  }

  async onSubmitPredictions(): Promise<void> {
    if (this.isSubmitting || !this.canSubmit || !this.currentGameweekId) return;
    this.isSubmitting = true;
    try {
      const rows = this.currentGameWeek.matches
        .filter((m) => m.homeScore !== null && m.awayScore !== null && m.matchUuid)
        .map((m) => ({
          match_id: m.matchUuid!,
          gameweek_id: this.currentGameweekId!,
          gameweek_number: this.currentGameWeek.number,
          home_score: Number(m.homeScore),
          away_score: Number(m.awayScore),
          joker_used: this.jokerUsedThisGameweek,
        }));

      await this.supabaseDataService.submitPredictions(rows);

      if (this.jokerUsedThisGameweek) {
        await this.supabaseDataService.markJokerUsed(this.currentGameWeek.number);
        this.jokersRemaining = Math.max(0, this.jokersRemaining - 1);
        this.jokerUsedThisGameweek = false;
      }

      this.resetPredictions();
      await this.showSuccessToast('Predictions saved!');
    } catch (err) {
      this.logger.error('group-admin-predictions.submit', err);
      const msg =
        err instanceof SupabaseError
          ? err.userMessage
          : 'Unable to save predictions. Please try again.';
      await this.showErrorToast(msg);
    } finally {
      this.isSubmitting = false;
    }
  }

  resetPredictions() {
    // Reset all match scores
    this.currentGameWeek.matches.forEach((match) => {
      match.homeScore = null;
      match.awayScore = null;
    });

    // Reset states
    this.canSubmit = false;
    this.showTooManyPredictionsWarning = false;
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
            id: 1,
            gameweek: 15,
            homeTeam: 'Manchester United',
            awayTeam: 'Liverpool',
            homeScore: 2,
            awayScore: 1,
            venue: 'Old Trafford',
            kickoff: '2024-01-20T15:00:00',
            points: 9,
            isCorrectScore: true,
            isCorrectResult: true,
            status: 'finished',
          },
          {
            id: 2,
            gameweek: 15,
            homeTeam: 'Arsenal',
            awayTeam: 'Chelsea',
            homeScore: 1,
            awayScore: 1,
            venue: 'Emirates Stadium',
            kickoff: '2024-01-20T17:30:00',
            points: 6,
            isCorrectScore: false,
            isCorrectResult: true,
            status: 'finished',
          },
          {
            id: 3,
            gameweek: 15,
            homeTeam: 'Manchester City',
            awayTeam: 'Tottenham',
            homeScore: 3,
            awayScore: 0,
            venue: 'Etihad Stadium',
            kickoff: '2024-01-20T20:00:00',
            points: 0,
            isCorrectScore: false,
            isCorrectResult: false,
            status: 'finished',
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
            id: 1,
            gameweek: 15,
            homeTeam: 'Manchester United',
            awayTeam: 'Liverpool',
            homeScore: 1,
            awayScore: 2,
            venue: 'Old Trafford',
            kickoff: '2024-01-20T15:00:00',
            points: 6,
            isCorrectScore: false,
            isCorrectResult: true,
            status: 'finished',
          },
          {
            id: 2,
            gameweek: 15,
            homeTeam: 'Arsenal',
            awayTeam: 'Chelsea',
            homeScore: 2,
            awayScore: 2,
            venue: 'Emirates Stadium',
            kickoff: '2024-01-20T17:30:00',
            points: 9,
            isCorrectScore: true,
            isCorrectResult: true,
            status: 'finished',
          },
          {
            id: 3,
            gameweek: 15,
            homeTeam: 'Manchester City',
            awayTeam: 'Tottenham',
            homeScore: 4,
            awayScore: 1,
            venue: 'Etihad Stadium',
            kickoff: '2024-01-20T20:00:00',
            points: 6,
            isCorrectScore: false,
            isCorrectResult: true,
            status: 'finished',
          },
        ],
      },
    ];
  }

  navigateGameweek(delta: number) {
    const newGameweek = this.currentGameWeek.number + delta;
    if (newGameweek >= 1 && newGameweek <= 38) {
      // Fire-and-forget: hydration updates `currentGameWeek` (deadline +
      // is_special + matches) for the new gameweek. Admin clicks prev/next
      // and sees the real fixtures for that week.
      void this.hydrateGameweekView(newGameweek);
    }
  }

  async ionViewWillEnter() {
    // Re-hydrate the current gameweek view (deadline + is_special + matches)
    // on every entry so navigating away and back picks up any new matches
    // synced by the Edge Function. Also refresh the historical selector list.
    await this.hydrateGameweekView(this.currentGameweek);
    await this.loadMatches();
  }

  ionViewWillLeave() {
    // Clean up interval when leaving the page. `liveScoreUpdateInterval` is
    // never scheduled post-4.2.11 (live polling was a mock-era affordance),
    // so this is an idempotent no-op today. Leaving the guard in place keeps
    // the page defensive if live polling ever returns via realtime.
    if (this.liveScoreUpdateInterval) {
      clearInterval(this.liveScoreUpdateInterval);
    }
  }

  /**
   * Task 4.2.11: derive the historical-gameweek selector list from completed
   * rows in the `gameweeks` table + seed `selectedHistoryGameweek` to the
   * most recent completed one. Current-gameweek fixtures are handled by
   * `hydrateGameweekView` — this method only covers the history sidebar.
   * Errors fail-open (empty history) so the main "Make Predictions" tab is
   * unaffected.
   */
  async loadMatches(): Promise<void> {
    try {
      const gameweeks = await this.supabaseDataService.getGameweeks();
      this.historicalGameweeks = (gameweeks || [])
        .filter((gw: any) => gw.is_completed === true)
        .map((gw: any) => gw.gameweek_number)
        .sort((a: number, b: number) => b - a);
    } catch (err) {
      this.logger.error('group-admin-predictions.loadHistoricalGameweeks', err);
      this.historicalGameweeks = [];
    }

    if (this.historicalGameweeks.length > 0) {
      this.selectedHistoryGameweek = this.historicalGameweeks[0];
    }

    await this.updateHistoricalMatches();
  }

  async updateHistoricalMatches(): Promise<void> {
    if (!this.selectedHistoryGameweek || this.historicalGameweeks.length === 0) {
      this.historicalMatches = [];
      return;
    }
    try {
      const rows = await this.supabaseDataService.getMatches(this.selectedHistoryGameweek);
      this.historicalMatches = rows.map((row) => this.toMatchViewModel(row));
    } catch (err) {
      this.logger.error('group-admin-predictions.updateHistoricalMatches', err);
      this.historicalMatches = [];
      const msg =
        err instanceof SupabaseError ? err.userMessage : 'Unable to load historical matches';
      await this.showErrorToast(msg);
    }
  }

  /**
   * Translate a Supabase DB-shape `matches` row into the camelCase local
   * view-model the template binds to (`homeTeam`, `awayTeam`, `kickoff`,
   * `homeScore`, `awayScore`). Also maps `status: 'completed'` →
   * `'finished'` to match the legacy template contract. The DB table has no
   * `venue` column (migration 003), so `venue` is set to the empty string
   * — template bindings tolerate empty strings via `*ngIf` guards.
   */
  private toMatchViewModel(row: SupabaseMatch): Match {
    // Map DB status union to the local view-model status. The DB's
    // `'cancelled'` (per migration 003) is collapsed to `'scheduled'` — the
    // local view-model union has no dedicated cancelled state yet. Admins
    // should recognize a cancelled match by the empty final-score column.
    // If PL cancellations/postponements during GW34-38 surface as a real UX
    // issue, extend the local `Match['status']` union in 4.3 to carry
    // `'cancelled'` explicitly.
    const status: Match['status'] =
      row.status === 'completed'
        ? 'finished'
        : row.status === 'live'
          ? 'live'
          : 'scheduled';
    return {
      id: (row as any).external_id ?? 0,
      matchUuid: row.id,
      gameweek: row.gameweek,
      homeTeam: row.home_team,
      awayTeam: row.away_team,
      kickoff: row.kickoff_time,
      venue: '',
      homeScore: row.home_score ?? null,
      awayScore: row.away_score ?? null,
      status,
    };
  }

  // Task 4.2.11 — live-minute tracking is not in the MVP DB schema. Returning
  // an empty string is correct for MVP; revisit for a 4.3 realtime feature if
  // user feedback demands in-match status strings.
  getMatchTime(_match: any): string {
    return '';
  }

  isMatchFinished(match: any): boolean {
    return match?.status === 'finished' || match?.status === 'completed';
  }

  isMatchLive(match: any): boolean {
    return match?.status === 'live';
  }

  getScoreClass(match: any): string {
    if (this.isMatchFinished(match)) {
      return 'finished';
    }
    if (this.isMatchLive(match)) {
      return 'live';
    }
    return 'scheduled';
  }

  navigateHistoryGameweek(delta: number) {
    const currentIndex = this.historicalGameweeks.indexOf(
      this.selectedHistoryGameweek
    );
    const newIndex = currentIndex + delta;

    if (newIndex >= 0 && newIndex < this.historicalGameweeks.length) {
      this.selectedHistoryGameweek = this.historicalGameweeks[newIndex];
      this.updateHistoricalMatches();
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

  getShortTeamName(teamName: string): string {
    // Common team name abbreviations for better mobile display
    const abbreviations: { [key: string]: string } = {
      'Manchester United': 'Man Utd',
      'Manchester City': 'Man City',
      'Liverpool': 'Liverpool',
      'Arsenal': 'Arsenal',
      'Chelsea': 'Chelsea',
      'Tottenham': 'Spurs',
      'Newcastle': 'Newcastle',
      'Brighton': 'Brighton',
      'West Ham': 'West Ham',
      'Crystal Palace': 'Palace',
      'Aston Villa': 'Villa',
      'Sheffield United': 'Sheffield',
      'Wolverhampton': 'Wolves',
      'Leicester City': 'Leicester',
      'Everton': 'Everton',
      'Leeds United': 'Leeds',
      'Burnley': 'Burnley',
      'Southampton': 'Saints',
      'Watford': 'Watford',
      'Norwich City': 'Norwich',
      'Brentford': 'Brentford',
      'Fulham': 'Fulham',
      'Bournemouth': 'Bournemouth',
      'Nottingham Forest': 'Forest',
      'Luton Town': 'Luton'
    };

    // Return abbreviation if available, otherwise use first word or limit to 10 chars
    if (abbreviations[teamName]) {
      return abbreviations[teamName];
    }

    // If no abbreviation found, take first word or limit length
    const firstWord = teamName.split(' ')[0];
    return firstWord.length <= 10 ? firstWord : teamName.substring(0, 10);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  validateScore(match: Match, isHome: boolean, event: any) {
    const value = event.detail.value;
    if (value === '') {
      if (isHome) {
        match.homeScore = null;
      } else {
        match.awayScore = null;
      }
      this.onScoreChange(match);
      return;
    }

    const score = parseInt(value, 10);
    if (isNaN(score) || score < 0 || score > 99) {
      if (isHome) {
        match.homeScore = null;
      } else {
        match.awayScore = null;
      }
    } else {
      if (isHome) {
        match.homeScore = score;
      } else {
        match.awayScore = score;
      }
    }
    this.onScoreChange(match);
  }
}

