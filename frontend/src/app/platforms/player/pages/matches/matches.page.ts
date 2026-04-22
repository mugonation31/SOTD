import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonButtons,
  IonText,
  IonToast,
  IonToggle,
  IonLabel,
  IonSpinner,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  footballOutline,
  refreshOutline,
  alertCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  personOutline,
  lockClosedOutline,
  starOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import { SeasonService } from '@core/services/season.service';
import {
  SupabaseDataService,
} from '@core/services/supabase-data.service';
import { LoggerService } from '@core/services/logger.service';
import { SupabaseError } from '@core/errors/supabase-error';
import { Match as SupabaseMatch } from '../../../../services/supabase.service';
import { CountdownTimerComponent } from '../../../../shared/components/countdown-timer/countdown-timer.component';

/**
 * View model for a single match row in this page's template.
 *
 * Maps Supabase `Match` columns onto the camelCase fields the existing
 * inline template binds to (e.g. `match.homeTeam`, `match.kickoff`).
 */
interface MatchViewModel {
  id: string;
  homeTeam: string;
  awayTeam: string;
  kickoff: string;
  status: SupabaseMatch['status'];
  homeScore: number | null;
  awayScore: number | null;
  gameweek: number;
  venue: string;
  prediction: {
    homeScore: number | null;
    awayScore: number | null;
  };
}

interface GameWeek {
  number: number;
  isSpecial: boolean;
  status: 'open' | 'closed' | 'in_progress';
  deadline: string;
  matches: MatchViewModel[];
}

@Component({
  selector: 'app-matches',
  template: `
    <ion-header>
      <ion-toolbar>
        <div class="logo-container" (click)="navigateTo('/player/dashboard')">
          <ion-icon name="football-outline" class="football-icon"></ion-icon>
          <div class="logo-text">
            <span class="logo-predict3">Predict3</span>
            <span class="logo-subtitle">Predict3</span>
          </div>
        </div>
        <ion-buttons slot="end">
          <ion-button (click)="navigateTo('/player/settings')">
            <ion-icon name="person-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!--
        Spinner shows only when there's genuinely nothing else to render.
        On cached re-entries (or mid-page refreshes) we keep the existing
        grid visible so the user never sees content blank out.
      -->
      <div class="loading-state" *ngIf="isLoading && matches.length === 0">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="10" size-lg="8">
            <!-- Gameweek Navigation -->
            <div class="gameweek-navigation">
              <ion-button
                fill="clear"
                class="nav-button"
                [disabled]="isLoading || currentGameweek.number <= 1"
                (click)="navigateGameweek(-1)"
              >
                <ion-icon
                  slot="icon-only"
                  name="chevron-back-outline"
                ></ion-icon>
              </ion-button>

              <div class="gameweek-title">
                <h2>Game Week {{ currentGameweek.number }}</h2>
                <ion-icon
                  *ngIf="isLocked"
                  name="lock-closed-outline"
                  class="lock-icon"
                  aria-label="Predictions locked"
                ></ion-icon>
                <ion-badge color="primary" class="prediction-badge"
                  >Predict3</ion-badge
                >
              </div>

              <ion-button
                fill="clear"
                class="nav-button"
                [disabled]="isLoading || currentGameweek.number >= totalGameweeks"
                (click)="navigateGameweek(1)"
              >
                <ion-icon
                  slot="icon-only"
                  name="chevron-forward-outline"
                ></ion-icon>
              </ion-button>
            </div>

            <!-- Deadline Info Card -->
            <ion-card class="deadline-card">
              <ion-card-content>
                <div class="deadline-info">
                  <div class="deadline-section">
                    <p class="deadline">
                      <ion-icon name="time-outline"></ion-icon>
                      Deadline:
                      {{
                        currentGameweek.deadline | date : 'MMM d, yyyy, h:mm a'
                      }}
                    </p>
                    <app-countdown-timer
                      [deadline]="currentGameweek.deadline"
                      (deadlinePassed)="onDeadlinePassed()"
                    ></app-countdown-timer>
                    <p class="selection-info">
                      Make any 3 predictions for this game week
                    </p>
                  </div>
                  <ion-button
                    *ngIf="!isLocked"
                    fill="clear"
                    class="reset-button"
                    (click)="resetPredictions()"
                  >
                    <ion-icon name="refresh-outline" slot="start"></ion-icon>
                    RESET ALL
                  </ion-button>
                </div>

                <!-- Warning Message -->
                <div
                  class="warning-container"
                  *ngIf="showTooManyPredictionsWarning"
                >
                  <div class="warning-message">
                    <ion-icon
                      name="alert-circle-outline"
                      color="danger"
                    ></ion-icon>
                    <span
                      >You can't make more than 3 predictions for this game
                      week</span
                    >
                  </div>
                </div>

                <!-- Joker section (indicator, toggle, warning, disabled note) -->
                <div class="joker-section">
                  <div class="joker-indicator" *ngIf="!isLocked">
                    <ion-icon name="star-outline" color="warning"></ion-icon>
                    <span>{{ jokersRemaining }}/2 jokers remaining</span>
                  </div>

                  <div class="joker-toggle-row" *ngIf="canUseJoker()">
                    <ion-label>Play Joker this gameweek</ion-label>
                    <ion-toggle
                      [(ngModel)]="jokerUsedThisGameweek"
                      class="joker-toggle"
                      color="warning"
                    ></ion-toggle>
                  </div>

                  <div class="joker-warning" *ngIf="jokerDeadlineWarning">
                    <ion-icon
                      name="alert-circle-outline"
                      color="warning"
                    ></ion-icon>
                    <span>{{ jokerDeadlineWarning }}</span>
                  </div>

                  <div
                    class="joker-disabled-note"
                    *ngIf="currentGameweek.isSpecial && !isLocked"
                  >
                    <ion-icon name="information-circle-outline"></ion-icon>
                    <span>Jokers cannot be played on special rounds</span>
                  </div>
                </div>

                <div class="locked-banner" *ngIf="isLocked">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                  <span>Predictions Locked</span>
                </div>
              </ion-card-content>
            </ion-card>

            <!-- Matches List -->
            <div class="matches-container">
              <!-- Empty state -->
              <div class="empty-state" *ngIf="matches.length === 0">
                <ion-icon
                  name="football-outline"
                  class="empty-state-icon"
                ></ion-icon>
                <p class="empty-state-message">
                  No fixtures available for this gameweek
                </p>
              </div>

              <div class="match-card" *ngFor="let match of matches">
                <div class="match-header">
                  <div class="venue" *ngIf="match.venue">
                    <ion-icon name="football-outline"></ion-icon>
                    {{ match.venue }}
                  </div>
                  <div class="kickoff">
                    <ion-icon name="time-outline"></ion-icon>
                    {{ match.kickoff | date : 'EEEE d MMM HH:mm' }}
                  </div>
                </div>

                <div class="match-content">
                  <div class="team home">{{ match.homeTeam }}</div>
                  <div
                    class="final-score"
                    *ngIf="isCompleted(match)"
                  >
                    {{ match.homeScore }} - {{ match.awayScore }}
                  </div>
                  <div class="score-inputs" *ngIf="!isCompleted(match)">
                    <ion-badge
                      *ngIf="isLive(match)"
                      class="live-badge"
                      color="danger"
                      >LIVE</ion-badge
                    >
                    <input
                      type="number"
                      class="score-input"
                      [(ngModel)]="match.prediction.homeScore"
                      (ngModelChange)="onScoreChange(match)"
                      [disabled]="isInputDisabled(match)"
                      min="0"
                      max="99"
                      placeholder="-"
                    />
                    <span class="score-separator">-</span>
                    <input
                      type="number"
                      class="score-input"
                      [(ngModel)]="match.prediction.awayScore"
                      (ngModelChange)="onScoreChange(match)"
                      [disabled]="isInputDisabled(match)"
                      min="0"
                      max="99"
                      placeholder="-"
                    />
                  </div>
                  <div class="team away">{{ match.awayTeam }}</div>
                </div>
              </div>
            </div>

            <div class="submit-container">
              <ion-button
                expand="block"
                class="submit-button"
                [disabled]="!canSubmit()"
                (click)="onSubmit()"
              >
                Submit Predictions
              </ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-toast
        [isOpen]="showSuccessToast"
        message="Predictions submitted successfully! View them in the My Predictions tab."
        duration="3000"
        color="success"
        position="top"
        icon="checkmark-circle-outline"
      ></ion-toast>
    </ion-content>
  `,
  styles: [
    `
      :host {
        --page-margin: 16px;
        --card-border-radius: 8px;
        --card-background: #ffffff;
      }

      ion-content {
        --background: #f4f5f8;
      }

      .loading-state {
        display: flex;
        justify-content: center;
        padding: 32px;
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .football-icon {
        font-size: 24px;
        color: var(--ion-color-primary);
      }

      .logo-text {
        display: flex;
        flex-direction: column;
      }

      .logo-predict3 {
        font-size: 18px;
        font-weight: 600;
        color: var(--ion-color-dark);
      }

      .logo-subtitle {
        font-size: 12px;
        color: var(--ion-color-medium);
      }

      .profile-button {
        --padding-start: 8px;
        --padding-end: 8px;
        font-size: 22px;
        --color: var(--ion-color-medium);
      }

      .gameweek-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--page-margin);
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

      .prediction-badge {
        font-size: 12px;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 4px;
      }

      .deadline-card {
        margin-bottom: var(--page-margin);
        border-radius: var(--card-border-radius);
        box-shadow: none;
        border: 1px solid var(--ion-color-light-shade);
        background: var(--card-background);
      }

      .deadline-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
      }

      .deadline-section {
        flex: 1;
      }

      .deadline {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 500;
        color: var(--ion-color-dark);
        margin: 0 0 8px;

        ion-icon {
          font-size: 18px;
          color: var(--ion-color-medium);
        }
      }

      .selection-info {
        color: var(--ion-color-medium);
        font-size: 14px;
        margin: 0;
      }

      .reset-button {
        --color: var(--ion-color-medium);
        text-transform: uppercase;
        font-weight: 500;
        font-size: 14px;
        height: 36px;
        margin: 0;
      }

      .matches-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 48px 16px;
        background: var(--card-background);
        border: 1px dashed var(--ion-color-light-shade);
        border-radius: var(--card-border-radius);
        color: var(--ion-color-medium);
        text-align: center;
      }

      .empty-state-icon {
        font-size: 48px;
        color: var(--ion-color-medium);
      }

      .empty-state-message {
        margin: 0;
        font-size: 15px;
        font-weight: 500;
      }

      .match-card {
        background: var(--card-background);
        border: 1px solid var(--ion-color-light-shade);
        border-radius: var(--card-border-radius);
        overflow: hidden;
      }

      .match-header {
        background: rgba(var(--ion-color-light-rgb), 0.5);
        padding: 12px var(--page-margin);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--ion-color-light-shade);
      }

      .venue,
      .kickoff {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--ion-color-medium);

        ion-icon {
          font-size: 16px;
        }
      }

      .match-content {
        padding: var(--page-margin);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--page-margin);
      }

      .team {
        flex: 1;
        font-weight: 500;
        color: var(--ion-color-dark);
        font-size: 15px;
      }

      .home {
        text-align: right;
      }

      .away {
        text-align: left;
      }

      .score-inputs {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 120px;
        justify-content: center;
      }

      .score-input {
        width: 48px;
        height: 48px;
        text-align: center;
        border: 1px solid var(--ion-color-light-shade);
        border-radius: 4px;
        font-size: 16px;
        color: var(--ion-color-dark);
        background: rgba(var(--ion-color-light-rgb), 0.5);

        &::placeholder {
          color: var(--ion-color-medium);
        }

        &:focus {
          outline: none;
          border-color: var(--ion-color-primary);
          background: var(--card-background);
        }
      }

      .score-separator {
        font-size: 20px;
        color: var(--ion-color-medium);
        font-weight: 500;
      }

      .submit-container {
        padding: 0 var(--page-margin) 32px;
      }

      .submit-button {
        --border-radius: var(--card-border-radius);
        --padding-top: 16px;
        --padding-bottom: 16px;
        font-weight: 600;
        font-size: 16px;
        margin: 0;
      }

      @media (max-width: 576px) {
        :host {
          --page-margin: 12px;
        }

        .match-content {
          flex-direction: column;
          gap: 12px;
          text-align: center;
        }

        .team {
          text-align: center;
        }

        .home {
          order: 1;
        }

        .score-inputs {
          order: 2;
        }

        .away {
          order: 3;
        }

        .score-input {
          width: 44px;
          height: 44px;
        }
      }

      ion-buttons ion-button {
        --padding-start: 8px;
        --padding-end: 8px;
        height: 36px;
      }

      ion-buttons ion-icon {
        font-size: 18px;
        color: var(--ion-color-medium);
      }

      .warning-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 16px;
        background: rgba(var(--ion-color-danger-rgb), 0.1);
        animation: slideDown 0.3s ease-out;
      }

      .warning-message {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        max-width: 600px;
        margin: 0 auto;
        padding: 12px 16px;
        border-radius: 8px;
        background: var(--ion-color-danger-contrast);
        box-shadow: 0 2px 8px rgba(var(--ion-color-danger-rgb), 0.2);
        border: 1px solid rgba(var(--ion-color-danger-rgb), 0.2);
        color: var(--ion-color-danger-shade);
        font-weight: 500;
        font-size: 14px;
      }

      .warning-message ion-icon {
        font-size: 20px;
        flex-shrink: 0;
      }

      .joker-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 12px;
      }

      .joker-indicator,
      .joker-warning,
      .joker-disabled-note {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: var(--ion-color-medium);

        ion-icon {
          font-size: 16px;
          flex-shrink: 0;
        }
      }

      .joker-indicator {
        color: var(--ion-color-warning-shade);
        font-weight: 500;
      }

      .joker-warning {
        padding: 8px 10px;
        border-radius: 6px;
        background: rgba(var(--ion-color-warning-rgb), 0.1);
        border: 1px solid rgba(var(--ion-color-warning-rgb), 0.25);
        color: var(--ion-color-warning-shade);
        font-size: 13px;
      }

      .joker-toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;

        ion-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--ion-color-dark);
        }
      }

      .joker-disabled-note {
        font-style: italic;
      }

      @keyframes slideDown {
        from {
          transform: translateY(-100%);
        }
        to {
          transform: translateY(0);
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
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonButtons,
    IonText,
    IonToggle,
    IonLabel,
    IonSpinner,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
    IonToast,
    CountdownTimerComponent,
  ],
})
export class MatchesPage implements OnInit {
  currentGameweek: GameWeek = {
    number: 1,
    isSpecial: false,
    status: 'open',
    deadline: '',
    matches: [],
  };

  matches: MatchViewModel[] = [];

  totalGameweeks = 38;
  isLoading = false;
  isSubmitting = false;
  showTooManyPredictionsWarning = false;
  selectedPredictionCount = 0;
  showSuccessToast = false;
  predictionsCompleted = false;

  /**
   * True when the prediction form is locked because the gameweek deadline
   * has passed. Computed in `setGameweekMeta` on every init / navigation,
   * and flipped to true by `onDeadlinePassed()` when the countdown timer
   * emits its `deadlinePassed` event. Gates `canSubmit()` and
   * `isInputDisabled()`. When the deadline is unknown (null/empty) we
   * intentionally do NOT block — safer default than a false positive.
   */
  isLocked: boolean = false;

  /**
   * UUID of the currently-loaded gameweek row. Populated from the cached
   * `allGameweeks` lookup in `setGameweekMeta`. Used as the `gameweek_id`
   * FK when submitting predictions to Supabase. Empty string when the
   * gameweek row could not be resolved — `onSubmit` fails closed in that
   * case.
   */
  currentGameweekId: string = '';

  // -------------------------------------------------------------------------
  // Joker state (Task 3.4.2)
  //
  // Jokers are player-global (2 per season, Decision 1) but the page caches
  // just enough of the server state to drive the toggle + the deadline
  // warning banner. Template wiring and submit integration land in later
  // sub-tasks — fields here are intentionally free of UI coupling.
  // -------------------------------------------------------------------------

  /**
   * Toggle state for "use my joker on this gameweek". Hydrated from saved
   * predictions on load/navigation: if any row for the current GW already
   * has `joker_used=true`, this flips to `true` so the UI reflects the
   * saved choice. Reset to `false` whenever we leave a gameweek.
   */
  jokerUsedThisGameweek: boolean = false;

  /**
   * Derived from `getJokerUsage().usedCount`: `2 - usedCount`, clamped to
   * [0, 2]. Updated once on init (jokers are season-scoped, not per-GW).
   */
  jokersRemaining: number = 2;

  /**
   * Non-null when the current gameweek is within 2 GWs of an auto-apply
   * deadline AND the corresponding joker is still unused. Populated by
   * `recomputeJokerWarning()` on init and after every navigation.
   */
  jokerDeadlineWarning: string | null = null;

  /** Cached joker usage count for submit-time decisions (3.4.4). */
  private jokerUsageUsedCount: number = 0;

  /** Cached "last regular GW before Boxing Day" (auto-apply deadline). */
  private beforeBoxingDay: number | null = null;

  /** Cached "last regular GW before Final Day" (auto-apply deadline). */
  private beforeFinalDay: number | null = null;

  /**
   * True when the currently-loaded gameweek already has a saved prediction
   * row with `joker_used=true` — i.e. the user has already played their
   * joker on this GW. Used to skip the confirmation dialog on a resubmit
   * (the choice is already locked per Decision 2). Reset on every
   * navigation / init and refreshed during hydration.
   */
  private jokerAlreadyLockedForGameweek: boolean = false;

  /**
   * Cache of all gameweek rows fetched once from Supabase, used by
   * `navigateGameweek` to look up the `id`, `deadline` and `is_special`
   * flags for a target gameweek number without re-fetching on every nav.
   */
  private allGameweeks: Array<{
    id: string;
    number: number;
    deadline: string | null;
    is_special: boolean;
  }> | null = null;

  constructor(
    private router: Router,
    private seasonService: SeasonService,
    private supabaseDataService: SupabaseDataService,
    private toastController: ToastController,
    private alertController: AlertController,
    private logger: LoggerService,
  ) {
    addIcons({
      timeOutline,
      footballOutline,
      refreshOutline,
      alertCircleOutline,
      chevronBackOutline,
      chevronForwardOutline,
      personOutline,
      lockClosedOutline,
      starOutline,
      informationCircleOutline,
    });
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.seasonService.init();
    this.totalGameweeks = this.seasonService.getTotalGameweeks();
    const gameweekNumber = this.seasonService.getCurrentGameweek();

    // Populate season-level joker context BEFORE gameweek meta so the
    // deadline warning can be computed synchronously from cached values.
    await this.loadJokerContext();

    // Populate deadline + isSpecial for the SAME gameweek whose matches we're
    // about to load, so the countdown + lock state can never disagree with
    // the fixtures on screen. Uses the cached allGameweeks lookup shared
    // with navigateGameweek — single source of truth.
    await this.applyGameweekMeta(gameweekNumber);

    await this.loadMatchesForGameweek(gameweekNumber);
    // Hydration intentionally lives in `ionViewWillEnter` (Task 4.2.4.1) so
    // cached component re-entries also re-hydrate. See that method below.
  }

  /**
   * Ionic lifecycle hook — fires on every entry, including cached re-entry
   * after back-navigation. We re-hydrate saved predictions here so stale
   * state from a previous visit is always refreshed against the server.
   *
   * `ngOnInit` runs once per component creation and handles setup that
   * doesn't need to re-run (season init, joker season context, match list,
   * gameweek meta). Hydration is the only thing that must re-fire on every
   * re-entry — keeping it isolated here avoids duplicate fetches.
   */
  async ionViewWillEnter(): Promise<void> {
    await this.hydrateSavedPredictions(this.currentGameweek.number);
  }

  /**
   * Fetch the season-scoped joker context (current usage + auto-apply
   * deadlines) and cache it on the component. Called once per load/init.
   * Uses `typeof === 'function'` guards so existing specs that do not mock
   * these helpers keep working — in a real Supabase environment both
   * methods are always present. Errors are swallowed with safe defaults
   * so a joker fetch failure never blocks the matches page.
   */
  private async loadJokerContext(): Promise<void> {
    try {
      const service = this.supabaseDataService as any;
      const [usage, deadlines] = await Promise.all([
        typeof service.getJokerUsage === 'function'
          ? service.getJokerUsage()
          : Promise.resolve({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
        typeof service.getLastRegularGameweekBeforeSpecial === 'function'
          ? service.getLastRegularGameweekBeforeSpecial()
          : Promise.resolve({ beforeBoxingDay: null, beforeFinalDay: null }),
      ]);

      const usedCount = usage?.usedCount ?? 0;
      this.jokerUsageUsedCount = usedCount;
      this.jokersRemaining = Math.max(0, Math.min(2, 2 - usedCount));
      this.beforeBoxingDay = deadlines?.beforeBoxingDay ?? null;
      this.beforeFinalDay = deadlines?.beforeFinalDay ?? null;
    } catch (err) {
      this.logger.error('matches.loadJokerContext', err);
      this.jokerUsageUsedCount = 0;
      this.jokersRemaining = 2;
      this.beforeBoxingDay = null;
      this.beforeFinalDay = null;
    }
  }

  /**
   * Whether the joker toggle should be actionable for the current gameweek.
   * False on special rounds (jokers can't be spent there), when the
   * deadline has passed, when predictions are already complete, or when
   * the player has no jokers left. Template wiring lands in 3.4.3.
   */
  canUseJoker(): boolean {
    if (this.currentGameweek.isSpecial) return false;
    if (this.jokersRemaining <= 0) return false;
    if (this.isLocked) return false;
    if (this.predictionsCompleted) return false;
    return true;
  }

  /**
   * Recompute `jokerDeadlineWarning` for the current gameweek. Fires the
   * 1st-joker warning when we're within 2 GWs of `beforeBoxingDay` and the
   * player hasn't yet spent any joker; fires the 2nd-joker warning when
   * within 2 GWs of `beforeFinalDay` and exactly one joker has been spent.
   * Otherwise clears the warning.
   */
  private recomputeJokerWarning(): void {
    const current = this.currentGameweek.number;

    if (
      this.jokerUsageUsedCount === 0 &&
      this.beforeBoxingDay !== null &&
      this.beforeBoxingDay - current >= 0 &&
      this.beforeBoxingDay - current <= 2
    ) {
      this.jokerDeadlineWarning = `Play your 1st joker by Gameweek ${this.beforeBoxingDay} or it will be auto-applied`;
      return;
    }

    if (
      this.jokerUsageUsedCount === 1 &&
      this.beforeFinalDay !== null &&
      this.beforeFinalDay - current >= 0 &&
      this.beforeFinalDay - current <= 2
    ) {
      this.jokerDeadlineWarning = `Play your 2nd joker by Gameweek ${this.beforeFinalDay} or it will be auto-applied`;
      return;
    }

    this.jokerDeadlineWarning = null;
  }

  /**
   * Fetch matches for the supplied gameweek from Supabase and update the
   * current view-model. `isLoading` brackets the entire fetch so nav
   * buttons can be disabled while in flight.
   *
   * On any error (sync throw or async rejection), clears `matches` so the
   * empty state shows, releases `isLoading`, logs the error, and surfaces
   * a user-facing toast. Errors are intentionally swallowed so the page
   * stays usable.
   */
  private async loadMatchesForGameweek(gameweek: number): Promise<void> {
    this.isLoading = true;
    this.currentGameweek = { ...this.currentGameweek, number: gameweek };
    // Clear the joker toggle before hydration — if the new GW has a saved
    // joker it will be re-applied by `hydrateSavedPredictions`, otherwise
    // the toggle stays off instead of leaking from the previous GW.
    this.jokerUsedThisGameweek = false;
    this.jokerAlreadyLockedForGameweek = false;
    try {
      const rows = await this.supabaseDataService.getMatches(gameweek);
      this.matches = rows.map((row) => this.toViewModel(row));
    } catch (err) {
      this.logger.error('matches.loadMatches', err);
      this.matches = [];
      const msg =
        err instanceof SupabaseError ? err.userMessage : 'Unable to load matches. Please try again.';
      await this.showErrorToast(msg);
    } finally {
      this.isLoading = false;
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

  private toViewModel(row: SupabaseMatch): MatchViewModel {
    return {
      id: row.id,
      homeTeam: row.home_team,
      awayTeam: row.away_team,
      kickoff: row.kickoff_time,
      status: row.status,
      homeScore: row.home_score ?? null,
      awayScore: row.away_score ?? null,
      gameweek: row.gameweek,
      venue: '',
      prediction: { homeScore: null, awayScore: null },
    };
  }

  /**
   * Read the current user's saved predictions for `gameweekNumber` from
   * Supabase and splice their scores onto the matching `MatchViewModel`s
   * already loaded in `this.matches`. Rows whose `match_id` is not in the
   * current gameweek are silently ignored (e.g. a match was removed
   * upstream). After hydration, `selectedPredictionCount` and
   * `predictionsCompleted` are recomputed so the UI state matches the
   * server.
   *
   * Errors are swallowed — a hydration failure must not prevent the page
   * from rendering. The underlying error is logged via `LoggerService` so
   * it surfaces in dev without breaking the user.
   */
  private async hydrateSavedPredictions(gameweekNumber: number): Promise<void> {
    try {
      const rows = await this.supabaseDataService.getPredictions(gameweekNumber);
      const byId = new Map(this.matches.map((m) => [m.id, m]));
      let anyJoker = false;
      for (const row of rows) {
        if ((row as any).joker_used === true) anyJoker = true;
        const match = byId.get(row.match_id);
        if (!match) continue;
        // Defensive `?? 0`: saved rows always carry scores post-submit,
        // but a partial sync could leave a null slipping through. Coerce
        // to 0 so the number input bindings never receive null.
        match.prediction.homeScore = row.home_score ?? 0;
        match.prediction.awayScore = row.away_score ?? 0;
      }
      this.jokerUsedThisGameweek = anyJoker;
      // If the saved predictions already have joker=true, the choice is
      // locked for this GW (Decision 2: no reverse). Skip the confirm
      // dialog on a resubmit.
      this.jokerAlreadyLockedForGameweek = anyJoker;
      this.updatePredictionCount();
      this.predictionsCompleted =
        this.selectedPredictionCount >= this.getRequiredPredictionCount();
    } catch (err) {
      this.logger.error('matches.hydratePredictions', err);
    }
  }

  /**
   * Number of predictions a player must submit for the current gameweek to
   * be considered "complete". Regular gameweeks require exactly 3; special
   * gameweeks (Boxing Day, Final Day) require a score for every match in
   * the round. Kept as a helper so the rule lives in one place and both
   * `canSubmit()` and `hydrateSavedPredictions()` stay in sync.
   */
  private getRequiredPredictionCount(): number {
    return this.currentGameweek.isSpecial ? this.matches.length : 3;
  }

  onScoreChange(match: MatchViewModel) {
    if (this.predictionsCompleted) {
      // Reset the score if predictions are completed
      match.prediction.homeScore = null;
      match.prediction.awayScore = null;
      // Warning only applies to regular gameweeks — on special gameweeks
      // every match must be predicted, so there's no "too many" state.
      this.showTooManyPredictionsWarning = !this.currentGameweek.isSpecial;
      return;
    }

    // Validate scores are numbers and within range
    if (match.prediction.homeScore !== null) {
      match.prediction.homeScore = Math.max(
        0,
        Math.min(99, match.prediction.homeScore)
      );
    }
    if (match.prediction.awayScore !== null) {
      match.prediction.awayScore = Math.max(
        0,
        Math.min(99, match.prediction.awayScore)
      );
    }

    // Count valid predictions
    this.updatePredictionCount();
  }

  updatePredictionCount() {
    this.selectedPredictionCount = this.matches.filter(
      (match) =>
        match.prediction.homeScore !== null &&
        match.prediction.awayScore !== null
    ).length;

    // Show warning if more than 3 predictions in regular gameweek
    this.showTooManyPredictionsWarning =
      !this.currentGameweek.isSpecial && this.selectedPredictionCount > 3;
  }

  canSubmit(): boolean {
    if (this.isLocked) {
      return false;
    }

    if (this.isSubmitting) {
      return false;
    }

    if (this.predictionsCompleted) {
      return false;
    }

    if (this.matches.length === 0) {
      return false;
    }

    return this.selectedPredictionCount === this.getRequiredPredictionCount();
  }

  /**
   * Whether the score inputs for a given match should be disabled.
   * Inputs are disabled when the gameweek is locked (deadline passed) OR
   * the match itself is already live. Task 3.1.4 will bind this helper
   * to the template's `[disabled]` on the score inputs.
   */
  isInputDisabled(match: MatchViewModel): boolean {
    return this.isLocked || this.isLive(match);
  }

  async onSubmit() {
    // Belt-and-braces: the button is hidden when locked, but any direct
    // caller (test harness, hypothetical keyboard shortcut, future refactor)
    // must fail closed.
    if (this.isLocked) {
      return;
    }

    // Re-entrancy guard: prevent double-submit from a double-tap. The
    // backend upsert is idempotent (onConflict: user_id,match_id), but the
    // user would see two toasts and potentially an error after success.
    if (this.isSubmitting) {
      return;
    }

    if (this.predictionsCompleted) {
      return;
    }

    // Without a resolved gameweek UUID we cannot build the FK on the
    // prediction rows. Fail visibly rather than silently dropping the
    // submission.
    if (!this.currentGameweekId) {
      await this.showErrorToast('Gameweek not loaded — try again');
      return;
    }

    // Auto-assign jokers (Decision 2): forced on the last regular GW
    // before a special round when the player still has unspent jokers.
    // This path skips the confirmation dialog — it's not a choice.
    const wasAutoAssigned = this.applyJokerAutoAssign();

    // Confirmation dialog: user has opted in via the toggle, this isn't
    // an auto-assign, and we haven't already locked a joker for this GW
    // on a previous submit.
    if (
      this.jokerUsedThisGameweek &&
      !wasAutoAssigned &&
      !this.jokerAlreadyLockedForGameweek
    ) {
      const confirmed = await this.confirmJokerUse();
      if (!confirmed) {
        return; // User cancelled — leave all state intact.
      }
    }

    const rows = this.buildPredictionRows();

    this.isSubmitting = true;
    try {
      await this.supabaseDataService.submitPredictions(rows);

      // Mark the joker as used AFTER the prediction write succeeds — if
      // the joker write fails we still want the predictions saved.
      if (this.jokerUsedThisGameweek) {
        // Only advance local counters on a FRESH joker spend. On resubmit
        // of an already-marked gameweek, markJokerUsed no-ops at the DB
        // layer (idempotent), so a local increment would drift the UI
        // counter and strip the player of jokers they still hold.
        const isFreshJokerSpend = !this.jokerAlreadyLockedForGameweek;
        try {
          await this.supabaseDataService.markJokerUsed(
            this.currentGameweek.number,
          );
          if (isFreshJokerSpend) {
            this.jokerUsageUsedCount += 1;
            this.jokersRemaining = Math.max(0, 2 - this.jokerUsageUsedCount);
            this.jokerAlreadyLockedForGameweek = true;
          }
        } catch (err) {
          this.logger.error('matches.markJokerUsed', err);
          await this.showErrorToast(
            'Predictions saved but joker tracking failed. Contact support.',
          );
        }
      }

      this.resetPredictions();
      this.predictionsCompleted = true;
      this.showSuccessToast = true;
    } catch (err) {
      this.logger.error('matches.submitPredictions', err);
      const msg =
        err instanceof SupabaseError ? err.userMessage : 'Unable to save predictions. Please try again.';
      await this.showErrorToast(msg);
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * If the current gameweek is the last regular GW before Boxing Day /
   * Final Day AND the player still has the corresponding joker unspent,
   * force the joker flag ON and return `true`. Otherwise leave state
   * unchanged and return `false`. The caller uses the return value to
   * decide whether to skip the confirmation dialog.
   */
  private applyJokerAutoAssign(): boolean {
    const current = this.currentGameweek.number;
    if (current === this.beforeBoxingDay && this.jokerUsageUsedCount === 0) {
      this.jokerUsedThisGameweek = true;
      return true;
    }
    if (current === this.beforeFinalDay && this.jokerUsageUsedCount === 1) {
      this.jokerUsedThisGameweek = true;
      return true;
    }
    return false;
  }

  /**
   * Show the "Play your joker?" confirmation dialog and resolve to true
   * when the user confirms, false otherwise (Cancel or backdrop dismiss).
   * Extracted so `onSubmit` stays focused on the submit flow.
   */
  private async confirmJokerUse(): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'Play Your Joker?',
      message:
        'Are you sure you want to play your joker this gameweek? This will double your points for this gameweek but cannot be reversed.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Play Joker', role: 'confirm' },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
  }

  /**
   * Build the payload sent to `SupabaseDataService.submitPredictions`.
   * Filters out any match where either score is null so partial
   * predictions are never persisted. Every row for the current gameweek
   * carries the same `joker_used` flag (Decision: "flag every row") so
   * downstream scoring can identify joker-boosted gameweeks from any row.
   */
  private buildPredictionRows() {
    const jokerUsed = this.jokerUsedThisGameweek;
    return this.matches
      .filter(
        (match) =>
          match.prediction.homeScore !== null &&
          match.prediction.awayScore !== null,
      )
      .map((match) => ({
        match_id: match.id,
        // Belt-and-braces `?? 0`: the filter above excludes null, but if a
        // hydrated row ever lands here with a falsy-but-defined value, the
        // DB column (NOT NULL) would reject it.
        home_score: match.prediction.homeScore ?? 0,
        away_score: match.prediction.awayScore ?? 0,
        gameweek_number: this.currentGameweek.number,
        gameweek_id: this.currentGameweekId,
        joker_used: jokerUsed,
      }));
  }

  resetPredictions() {
    this.matches.forEach((match) => {
      match.prediction.homeScore = null;
      match.prediction.awayScore = null;
    });
    this.selectedPredictionCount = 0;
    this.showTooManyPredictionsWarning = false;
  }

  /**
   * Move the page to the previous (delta = -1) or next (delta = +1)
   * gameweek. Boundaries: gameweek 1 .. SeasonService.getTotalGameweeks().
   * Out-of-range deltas are no-ops. Predictions persistence is handled in
   * the predictions wiring task (3.2) — this method does not touch
   * localStorage.
   */
  async navigateGameweek(delta: number): Promise<void> {
    const target = this.currentGameweek.number + delta;
    if (target < 1 || target > this.totalGameweeks) {
      return;
    }

    await this.loadMatchesForGameweek(target);
    await this.applyGameweekMeta(target);
    // Start from a clean slate: wipe any previous gameweek's predictions and
    // the completed flag before hydration overlays the new gameweek's saved
    // rows. If none exist, the inputs stay blank — matching a fresh-load UX.
    this.predictionsCompleted = false;
    this.resetPredictions();
    await this.hydrateSavedPredictions(target);
  }

  /**
   * Populate `currentGameweek.deadline` and `currentGameweek.isSpecial` for
   * the supplied target gameweek number using a lazily-fetched, cached copy
   * of all gameweek rows. If the fetch fails, falls back to empty-string
   * deadline and isSpecial=false so the page stays usable.
   */
  private async applyGameweekMeta(target: number): Promise<void> {
    // Ensure `currentGameweek.number` reflects the target BEFORE
    // `setGameweekMeta` runs `recomputeJokerWarning`, otherwise the warning
    // is computed against a stale number (e.g. on init the default is 1).
    this.currentGameweek = { ...this.currentGameweek, number: target };
    try {
      if (this.allGameweeks === null) {
        this.allGameweeks = await this.supabaseDataService.getGameweeks();
      }
      const match = (this.allGameweeks ?? []).find((gw) => gw.number === target);
      this.setGameweekMeta(match?.id, match?.deadline, match?.is_special);
    } catch (err) {
      this.logger.error('matches.loadGameweekMeta', err);
      this.setGameweekMeta(null, null, false);
    }
  }

  /**
   * Assigns the id, deadline and isSpecial fields for the current gameweek,
   * coercing nullish inputs to safe defaults (empty string / false) so the
   * template never receives `null` or `undefined`. Also recomputes
   * `isLocked` from the deadline: past deadlines lock the form, future or
   * unknown deadlines leave it unlocked.
   */
  private setGameweekMeta(
    id: string | null | undefined,
    deadline: string | null | undefined,
    isSpecial: boolean | null | undefined,
  ): void {
    const resolvedDeadline = deadline ?? '';
    this.currentGameweekId = id ?? '';
    this.currentGameweek = {
      ...this.currentGameweek,
      deadline: resolvedDeadline,
      isSpecial: isSpecial ?? false,
    };
    this.isLocked = resolvedDeadline
      ? new Date(resolvedDeadline).getTime() <= Date.now()
      : false;
    // Joker deadline warning depends on the gameweek number + specials map,
    // both of which are finalised above. Keep this call at the end so every
    // meta mutation yields a fresh warning (init + nav share this path).
    this.recomputeJokerWarning();
  }

  /**
   * Handler for the countdown timer's `deadlinePassed` output. Flips the
   * form into locked state immediately without waiting for a navigation
   * or re-fetch. Safe to call multiple times.
   */
  onDeadlinePassed(): void {
    this.isLocked = true;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  isScheduled(match: MatchViewModel): boolean {
    return match.status === 'scheduled';
  }

  isLive(match: MatchViewModel): boolean {
    return match.status === 'live';
  }

  isCompleted(match: MatchViewModel): boolean {
    return match.status === 'completed';
  }
}
