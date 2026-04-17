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
} from 'ionicons/icons';
import { SeasonService } from '@core/services/season.service';
import {
  SupabaseDataService,
} from '@core/services/supabase-data.service';
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
                  <div class="venue">
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
    });
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.seasonService.init();
    this.totalGameweeks = this.seasonService.getTotalGameweeks();
    const gameweekNumber = this.seasonService.getCurrentGameweek();

    // Populate deadline + isSpecial for the SAME gameweek whose matches we're
    // about to load, so the countdown + lock state can never disagree with
    // the fixtures on screen. Uses the cached allGameweeks lookup shared
    // with navigateGameweek — single source of truth.
    await this.applyGameweekMeta(gameweekNumber);

    await this.loadMatchesForGameweek(gameweekNumber);
    await this.hydrateSavedPredictions(gameweekNumber);
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
    try {
      const rows = await this.supabaseDataService.getMatches(gameweek);
      this.matches = rows.map((row) => this.toViewModel(row));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Failed to load matches for gameweek ${gameweek}: ${message}`);
      this.matches = [];
      await this.showErrorToast('Unable to load matches. Please try again.');
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
   * from rendering. The underlying error is logged to `console.error` so
   * it surfaces in dev without breaking the user.
   */
  private async hydrateSavedPredictions(gameweekNumber: number): Promise<void> {
    try {
      const rows = await this.supabaseDataService.getPredictions(gameweekNumber);
      const byId = new Map(this.matches.map((m) => [m.id, m]));
      for (const row of rows) {
        const match = byId.get(row.match_id);
        if (!match) continue;
        match.prediction.homeScore = row.home_score;
        match.prediction.awayScore = row.away_score;
      }
      this.updatePredictionCount();
      this.predictionsCompleted =
        this.selectedPredictionCount >= this.getRequiredPredictionCount();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(
        `Failed to hydrate predictions for gameweek ${gameweekNumber}: ${message}`,
      );
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

    const rows = this.buildPredictionRows();

    this.isSubmitting = true;
    try {
      await this.supabaseDataService.submitPredictions(rows);
      this.resetPredictions();
      this.predictionsCompleted = true;
      this.showSuccessToast = true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Failed to submit predictions: ${message}`);
      await this.showErrorToast('Unable to save predictions. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Build the payload sent to `SupabaseDataService.submitPredictions`.
   * Filters out any match where either score is null so partial
   * predictions are never persisted. `joker_used` is always false here;
   * Task 3.4 will wire the real joker flag.
   */
  private buildPredictionRows() {
    return this.matches
      .filter(
        (match) =>
          match.prediction.homeScore !== null &&
          match.prediction.awayScore !== null,
      )
      .map((match) => ({
        match_id: match.id,
        home_score: match.prediction.homeScore!,
        away_score: match.prediction.awayScore!,
        gameweek_number: this.currentGameweek.number,
        gameweek_id: this.currentGameweekId,
        joker_used: false,
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
    try {
      if (this.allGameweeks === null) {
        this.allGameweeks = await this.supabaseDataService.getGameweeks();
      }
      const match = (this.allGameweeks ?? []).find((gw) => gw.number === target);
      this.setGameweekMeta(match?.id, match?.deadline, match?.is_special);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Failed to load gameweek meta for ${target}: ${message}`);
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
