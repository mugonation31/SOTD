import { Component } from '@angular/core';
import { DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {
  AlertController,
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToggle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { SupabaseService } from '../../../../services/supabase.service';

interface AdminUser {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface AdminGroup {
  id: string;
  name: string;
  code: string;
  admin_id: string;
  current_members: number;
  max_members: number;
  is_active: boolean;
  created_at: string;
}

type SegmentValue = 'users' | 'groups';

/**
 * Combined Users & Groups admin page (Task 4.0.9).
 *
 * - `ion-segment` toggles between users and groups views
 * - User toggle deactivates / reactivates a profile via
 *   `toggleUserActive`. On deactivate, ALSO calls `signOutUser` to force
 *   immediate session termination (Decision 2 — `is_active` is the RLS
 *   write-block but existing JWTs remain valid until expiry).
 * - Group delete is gated behind a confirmation alert; on confirm calls
 *   `deleteGroup` and refreshes the list.
 *
 * Partial-failure handling: if `toggleUserActive` succeeds but
 * `signOutUser` fails, the user is write-locked but their session token
 * is still valid until expiry. We surface this distinctly so the admin
 * knows the deactivation is not fully effective until token expiry.
 */
@Component({
  selector: 'app-users-groups',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonButton,
    IonIcon,
    IonSpinner,
    IonBadge,
    NgFor,
    NgIf,
    DatePipe,
    TitleCasePipe,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Users &amp; Groups</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment
          [value]="activeSegment"
          (ionChange)="onSegmentChanged($event)"
        >
          <ion-segment-button value="users">
            <ion-label>Users</ion-label>
          </ion-segment-button>
          <ion-segment-button value="groups">
            <ion-label>Groups</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="loading-state" *ngIf="isLoading">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <!-- Users segment -->
      <div *ngIf="!isLoading && activeSegment === 'users'">
        <div class="empty-state" *ngIf="users.length === 0">
          <p>No users found</p>
        </div>

        <ion-list *ngIf="users.length > 0">
          <ion-item *ngFor="let user of users">
            <ion-label>
              <h2>{{ user.email }}</h2>
              <p>{{ user.username }} &middot; {{ user.role | titlecase }}</p>
            </ion-label>
            <ion-badge
              slot="end"
              [color]="user.is_active ? 'success' : 'medium'"
            >
              {{ user.is_active ? 'Active' : 'Inactive' }}
            </ion-badge>
            <ion-toggle
              slot="end"
              [checked]="user.is_active"
              [disabled]="isMutating"
              (ionChange)="onUserToggle(user)"
            ></ion-toggle>
          </ion-item>
        </ion-list>
      </div>

      <!-- Groups segment -->
      <div *ngIf="!isLoading && activeSegment === 'groups'">
        <div class="empty-state" *ngIf="groups.length === 0">
          <p>No groups found</p>
        </div>

        <ion-list *ngIf="groups.length > 0">
          <ion-item *ngFor="let group of groups">
            <ion-label>
              <h2>{{ group.name }}</h2>
              <p>
                Code: {{ group.code }} &middot; Admin: {{ group.admin_id }}
                &middot; Members: {{ group.current_members }}
              </p>
              <p class="created-at">
                Created {{ group.created_at | date : 'short' }}
              </p>
            </ion-label>
            <ion-button
              slot="end"
              color="danger"
              fill="outline"
              [disabled]="isMutating"
              (click)="onDeleteGroup(group)"
            >
              <ion-icon name="trash-outline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>
      </div>
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
      .empty-state {
        text-align: center;
        color: var(--ion-color-medium);
        padding: 48px 16px;
      }
      .created-at {
        font-size: 12px;
        color: var(--ion-color-medium);
      }
    `,
  ],
})
export class UsersGroupsPage {
  users: AdminUser[] = [];
  groups: AdminGroup[] = [];

  activeSegment: SegmentValue = 'users';
  isLoading = false;
  isMutating = false;

  constructor(
    private supabaseDataService: SupabaseDataService,
    private toastController: ToastController,
    private alertController: AlertController,
    private supabaseService: SupabaseService,
  ) {
    addIcons({ trashOutline });
  }

  /**
   * Load users + groups in parallel each time the tab becomes active so
   * stale lists never linger after a navigation away/back.
   */
  async ionViewWillEnter(): Promise<void> {
    this.isLoading = true;
    try {
      const [users, groups] = await Promise.all([
        this.supabaseDataService.getAllUsers(),
        this.supabaseDataService.getAllGroups(),
      ]);
      this.users = users ?? [];
      this.groups = groups ?? [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Failed to load users/groups: ${message}`);
      await this.showToast('Failed to load users and groups');
    } finally {
      this.isLoading = false;
    }
  }

  // Ionic's `IonSegmentCustomEvent<SegmentChangeEventDetail>` types
  // `detail.value` as `string | number | undefined`. Accept the loose
  // shape and narrow inside — safer than a cast, and works for both the
  // real event and the simple `{ detail: { value } }` shape used in specs.
  onSegmentChanged(event: { detail: { value?: string | number } }): void {
    const next = event?.detail?.value;
    if (next === 'users' || next === 'groups') {
      this.activeSegment = next;
    }
  }

  /**
   * Flip a user's `is_active` flag. On deactivate (active=false), chain
   * a `signOutUser` call so the deactivated user is force-signed-out
   * immediately rather than waiting for token expiry.
   *
   * Failure modes handled distinctly:
   * - `toggleUserActive` rejects → error toast; UI state untouched.
   * - `toggleUserActive` succeeds, `signOutUser` rejects → warning toast
   *   and KEEP the flipped `is_active` (server already persisted it).
   *   The admin must know the user's existing session is still valid
   *   until token expiry.
   */
  async onUserToggle(user: AdminUser): Promise<void> {
    if (this.isMutating) return;
    const newActive = !user.is_active;

    // Prevent self-deactivation: the super-admin would immediately be
    // signed out and RLS-locked on writes. Recovery requires logging back
    // in (auth still works since JWTs aren't gated on `is_active`), but
    // the UX is abrupt and error-prone. Block the flip at the UI layer.
    const selfId = this.supabaseService.currentProfile?.id;
    if (!newActive && selfId && selfId === user.id) {
      await this.showToast('You cannot deactivate your own account');
      // Revert the ion-toggle to its pre-click state on the next tick so
      // the checkbox doesn't appear flipped.
      setTimeout(() => (user.is_active = true), 0);
      return;
    }

    this.isMutating = true;

    try {
      await this.supabaseDataService.toggleUserActive(user.id, newActive);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Failed to toggle user ${user.id}: ${message}`);
      await this.showToast(`Failed to update user: ${message}`);
      this.isMutating = false;
      return;
    }

    // Toggle persisted — flip local state.
    user.is_active = newActive;

    if (!newActive) {
      // Deactivation: chain a signOut so the existing JWT is invalidated.
      try {
        await this.supabaseDataService.signOutUser(user.id);
        await this.showToast('User deactivated and signed out');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error(`Failed to sign out user ${user.id}: ${message}`);
        await this.showToast(
          'User deactivated but session not terminated — they may still be active until token expires',
        );
      }
    } else {
      await this.showToast('User reactivated');
    }

    this.isMutating = false;
  }

  /**
   * Delete a group, gated behind a confirmation alert. Cascades to
   * `group_members` via FK ON DELETE CASCADE (migration 004).
   * Predictions are per-player (UNIQUE(user_id, match_id)) and reference
   * `user_id`/`match_id`/`gameweek_id` — they are NOT deleted by this call,
   * so each member's season-long prediction history is preserved.
   */
  async onDeleteGroup(group: AdminGroup): Promise<void> {
    if (this.isMutating) return;

    const alert = await this.alertController.create({
      header: 'Delete Group',
      message:
        "Delete this group? All members will be removed from the group. Each member's predictions are kept for their own history. This cannot be undone.",
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', role: 'confirm' },
      ],
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    if (result?.role !== 'confirm') return;

    this.isMutating = true;
    try {
      await this.supabaseDataService.deleteGroup(group.id);
      await this.showToast('Group deleted');
      await this.refreshGroups();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Failed to delete group ${group.id}: ${message}`);
      await this.showToast(`Failed to delete group: ${message}`);
    } finally {
      this.isMutating = false;
    }
  }

  private async refreshGroups(): Promise<void> {
    try {
      const groups = await this.supabaseDataService.getAllGroups();
      this.groups = groups ?? [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Failed to refresh groups: ${message}`);
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
