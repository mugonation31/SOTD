import { Component, OnDestroy } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
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
  IonSpinner,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cloudDownloadOutline,
  timeOutline,
} from 'ionicons/icons';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { LoggerService } from '@core/services/logger.service';
import { SupabaseError } from '@core/errors/supabase-error';

type SyncStatus = 'ok' | 'error' | 'in_progress' | null;

const CLIENT_COUNTDOWN_SECONDS = 30;

@Component({
  selector: 'app-dashboard',
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
    IonSpinner,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    NgIf,
    DatePipe,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>System Overview</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="loading-state" *ngIf="isLoading">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <ion-grid *ngIf="!isLoading">
        <ion-row>
          <ion-col size="12" sizeMd="6" sizeLg="3">
            <ion-card class="stat-card">
              <ion-card-header>
                <ion-card-title>Total Users</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="stat-value">{{ totalUsers }}</div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" sizeMd="6" sizeLg="3">
            <ion-card class="stat-card">
              <ion-card-header>
                <ion-card-title>Total Groups</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="stat-value">{{ totalGroups }}</div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" sizeMd="6" sizeLg="3">
            <ion-card class="stat-card">
              <ion-card-header>
                <ion-card-title>Active Gameweek</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="stat-value">{{ activeGameweekNumber ?? '—' }}</div>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" sizeMd="6" sizeLg="3">
            <ion-card class="stat-card">
              <ion-card-header>
                <ion-card-title>Last Match Sync</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="sync-info">
                  <div class="sync-timestamp" *ngIf="lastSyncAt; else neverSynced">
                    {{ lastSyncAt | date : 'short' }}
                  </div>
                  <ng-template #neverSynced>
                    <div class="sync-timestamp">Never synced</div>
                  </ng-template>

                  <ion-badge
                    *ngIf="lastSyncStatus === 'ok'"
                    color="success"
                  >ok</ion-badge>
                  <ion-badge
                    *ngIf="lastSyncStatus === 'error'"
                    color="danger"
                  >error</ion-badge>
                  <ion-badge
                    *ngIf="lastSyncStatus === 'in_progress'"
                    color="warning"
                  >in progress</ion-badge>
                  <ion-badge
                    *ngIf="!lastSyncStatus"
                    color="medium"
                  >never synced</ion-badge>
                </div>

                <div class="sync-action">
                  <ion-button
                    *ngIf="!syncCountdownSeconds || syncCountdownSeconds <= 0"
                    expand="block"
                    [disabled]="isSyncing"
                    (click)="onSyncClick()"
                  >
                    <ion-icon name="cloud-download-outline" slot="start"></ion-icon>
                    Sync Matches Now
                  </ion-button>
                  <div
                    *ngIf="syncCountdownSeconds && syncCountdownSeconds > 0"
                    class="cooldown-text"
                  >
                    <ion-icon name="time-outline"></ion-icon>
                    Retry in {{ syncCountdownSeconds }}s
                  </div>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [
    `
      ion-content {
        --background: #f4f5f8;
      }
      .loading-state {
        display: flex;
        justify-content: center;
        padding: 32px;
      }
      .stat-card {
        margin: 0;
      }
      .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: var(--ion-color-dark);
      }
      .sync-info {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }
      .sync-timestamp {
        font-size: 14px;
        color: var(--ion-color-medium);
        flex: 1;
      }
      .sync-action {
        margin-top: 8px;
      }
      .cooldown-text {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--ion-color-medium);
        font-weight: 500;
      }
    `,
  ],
})
export class DashboardPage implements OnDestroy {
  totalUsers = 0;
  totalGroups = 0;
  activeGameweekNumber: number | null = null;

  lastSyncAt: string | null = null;
  lastSyncStatus: SyncStatus = null;
  lastSyncError: string | null = null;

  /**
   * Client-side countdown ticker (decremented every second). The
   * authoritative cooldown gate lives server-side (Edge Function, Task
   * 4.0.6) — this is UX-only so the admin sees a visible "wait" between
   * sync attempts. Initialised from `getLastMatchSync().cooldownRemainingSeconds`
   * on load and reset by the sync flow on success / cooldown response.
   */
  syncCountdownSeconds = 0;

  isLoading = false;
  isSyncing = false;

  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private supabaseDataService: SupabaseDataService,
    private toastController: ToastController,
    private logger: LoggerService,
  ) {
    addIcons({
      cloudDownloadOutline,
      timeOutline,
    });
  }

  /**
   * Re-fetches all dashboard stats every time the tab becomes active. Admin
   * may switch between dashboard and users tabs and expect fresh counts;
   * `ngOnInit` would only fire on the initial mount.
   */
  async ionViewWillEnter(): Promise<void> {
    this.isLoading = true;
    // Render cards independently. `getActiveGameweek` uses .single() which
    // rejects when no row has is_active=true (pre-season, between weeks,
    // fresh migrations). A single rejection shouldn't hide every other
    // stat, so use allSettled and log partial failures.
    // Use getAdminCounts() — a HEAD query that returns just the counts
    // via response headers (no row payload shipped). Prevents wastefully
    // transferring full user/group tables just to compute `.length`.
    const [countsResult, gameweekResult, syncResult] = await Promise.allSettled(
      [
        this.supabaseDataService.getAdminCounts(),
        this.supabaseDataService.getActiveGameweek(),
        this.supabaseDataService.getLastMatchSync(),
      ],
    );

    if (countsResult.status === 'fulfilled') {
      this.totalUsers = countsResult.value.userCount;
      this.totalGroups = countsResult.value.groupCount;
    } else {
      this.totalUsers = 0;
      this.totalGroups = 0;
    }
    this.activeGameweekNumber =
      gameweekResult.status === 'fulfilled'
        ? gameweekResult.value?.gameweek_number ?? null
        : null;
    if (syncResult.status === 'fulfilled') {
      const sync = syncResult.value;
      this.lastSyncAt = sync?.lastSyncAt ?? null;
      this.lastSyncStatus = sync?.lastSyncStatus ?? null;
      this.lastSyncError = sync?.lastSyncError ?? null;
      const remaining = sync?.cooldownRemainingSeconds ?? 0;
      if (remaining > 0) {
        this.startCountdown(remaining);
      }
    }

    const rejected = [countsResult, gameweekResult, syncResult].filter(
      (r) => r.status === 'rejected',
    ) as PromiseRejectedResult[];
    for (const r of rejected) {
      this.logger.error('dashboard.partialLoad', r.reason);
    }
    // Only surface a toast if EVERY stat failed — otherwise the UI shows
    // what it can and stays quiet about transient single-card misses.
    if (rejected.length === 3) {
      await this.showToast('Failed to load dashboard data');
    }

    this.isLoading = false;
  }

  /**
   * Triggers a server-side match sync. The Edge Function returns one of:
   * `{ ok: true }` (synced — start fresh client cooldown), `{ ok: false,
   * reason: 'cooldown', cooldownRemainingSeconds }` (server cooldown still
   * active — mirror the server's remaining seconds), or throws (network /
   * invoke failure — surface a generic error toast).
   */
  async onSyncClick(): Promise<void> {
    if (this.isSyncing) return;
    this.isSyncing = true;
    try {
      const result = await this.supabaseDataService.triggerMatchSync();

      if (result?.ok) {
        await this.showToast('Match data synced successfully');
        this.startCountdown(CLIENT_COUNTDOWN_SECONDS);
        return;
      }

      if (result?.reason === 'cooldown') {
        const remaining = result.cooldownRemainingSeconds ?? 0;
        await this.showToast(`Sync on cooldown — try again in ${remaining}s`);
        this.startCountdown(remaining);
        return;
      }

      // Non-ok response with no recognised reason — show whatever the
      // server returned, falling back to a generic message.
      const reason = result?.reason ?? 'unknown error';
      await this.showToast(`Sync failed: ${reason}`);
    } catch (err) {
      this.logger.error('dashboard.sync', err);
      // Only SupabaseError carries a curated `userMessage` that is safe
      // to render. Native fetch/CORS errors surface `.message` with URLs,
      // auth hints, or backend detail — never echo them into a toast.
      const message =
        err instanceof SupabaseError ? err.userMessage : 'Unknown error';
      await this.showToast(`Sync failed: ${message}`);
    } finally {
      this.isSyncing = false;
    }
  }

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  /**
   * Begin (or restart) the visible countdown. Clears any previous interval
   * so successive sync attempts don't stack tickers.
   */
  private startCountdown(seconds: number): void {
    this.clearCountdown();
    this.syncCountdownSeconds = seconds;
    this.countdownInterval = setInterval(() => {
      this.syncCountdownSeconds = Math.max(0, this.syncCountdownSeconds - 1);
      if (this.syncCountdownSeconds <= 0) {
        this.clearCountdown();
      }
    }, 1000);
  }

  private clearCountdown(): void {
    if (this.countdownInterval !== null) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
    });
    await toast.present();
  }
}
