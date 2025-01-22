import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonButton,
  IonInput,
  IonIcon,
  IonBadge,
  IonChip,
  IonText,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  ModalController,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  copyOutline,
  personAddOutline,
  refreshOutline,
  trashOutline,
  timeOutline,
  mailOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  closeCircleOutline,
  statsChartOutline,
  filterOutline,
  peopleOutline,
  addCircleOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import { GroupAdminInvitation } from '@core/interfaces/group-admin.interface';
import { TokenService } from '@core/services/token.service';
import { ToastService } from '@core/services/toast.service';
import { InvitationStorageService } from '@core/services/invitation-storage.service';
import { interval, Subscription } from 'rxjs';
import { BulkInviteModalComponent } from './bulk-invite-modal/bulk-invite-modal.component';
import { RouterModule, Router } from '@angular/router';
import { GroupAdminListPage } from '../group-admin-list/group-admin-list.page';
import { Chart } from 'chart.js/auto';

interface InvitationStats {
  total: number;
  pending: number;
  accepted: number;
  expired: number;
  revoked: number;
  acceptanceRate: number;
}

@Component({
  selector: 'app-group-admin-invites',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Group Admin Management</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment [(ngModel)]="activeTab">
          <ion-segment-button value="invites">
            <ion-label>Invites</ion-label>
          </ion-segment-button>
          <ion-segment-button value="list">
            <ion-label>Admin List</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div *ngIf="activeTab === 'invites'">
        <ion-refresher slot="fixed" (ionRefresh)="refreshInvitations($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <!-- Statistics Cards with Charts -->
        <ion-grid>
          <ion-row>
            <ion-col size="12" sizeMd="6">
              <ion-card>
                <ion-card-header>
                  <ion-card-title
                    >Invitation Status Distribution</ion-card-title
                  >
                </ion-card-header>
                <ion-card-content>
                  <canvas #statusChart></canvas>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="12" sizeMd="6">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>Invitation Timeline</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <canvas #timelineChart></canvas>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>

        <!-- Statistics Cards -->
        <ion-grid>
          <ion-row>
            <ion-col size="12" sizeMd="6" sizeLg="3">
              <ion-card class="stat-card">
                <ion-card-content>
                  <div class="stat-header">
                    <ion-icon name="people-outline" color="primary"></ion-icon>
                    <h3>Total Invitations</h3>
                  </div>
                  <div class="stat-value">{{ stats.total }}</div>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="12" sizeMd="6" sizeLg="3">
              <ion-card class="stat-card">
                <ion-card-content>
                  <div class="stat-header">
                    <ion-icon name="time-outline" color="warning"></ion-icon>
                    <h3>Pending</h3>
                  </div>
                  <div class="stat-value">{{ stats.pending }}</div>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="12" sizeMd="6" sizeLg="3">
              <ion-card class="stat-card">
                <ion-card-content>
                  <div class="stat-header">
                    <ion-icon
                      name="checkmark-circle-outline"
                      color="success"
                    ></ion-icon>
                    <h3>Accepted</h3>
                  </div>
                  <div class="stat-value">{{ stats.accepted }}</div>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="12" sizeMd="6" sizeLg="3">
              <ion-card class="stat-card">
                <ion-card-content>
                  <div class="stat-header">
                    <ion-icon
                      name="stats-chart-outline"
                      color="tertiary"
                    ></ion-icon>
                    <h3>Acceptance Rate</h3>
                  </div>
                  <div class="stat-value">{{ stats.acceptanceRate }}%</div>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>

        <!-- Filters and Search -->
        <ion-card>
          <ion-card-content>
            <ion-grid>
              <ion-row>
                <ion-col size="12" sizeMd="4">
                  <ion-searchbar
                    [(ngModel)]="searchTerm"
                    (ionInput)="filterInvitations()"
                    placeholder="Search by email"
                  ></ion-searchbar>
                </ion-col>
                <ion-col size="12" sizeMd="4">
                  <ion-select
                    [(ngModel)]="statusFilter"
                    (ionChange)="filterInvitations()"
                    placeholder="Filter by status"
                  >
                    <ion-select-option value="all"
                      >All Statuses</ion-select-option
                    >
                    <ion-select-option value="pending"
                      >Pending</ion-select-option
                    >
                    <ion-select-option value="accepted"
                      >Accepted</ion-select-option
                    >
                    <ion-select-option value="expired"
                      >Expired</ion-select-option
                    >
                    <ion-select-option value="revoked"
                      >Revoked</ion-select-option
                    >
                  </ion-select>
                </ion-col>
                <ion-col size="12" sizeMd="4">
                  <ion-select
                    [(ngModel)]="sortBy"
                    (ionChange)="filterInvitations()"
                    placeholder="Sort by"
                  >
                    <ion-select-option value="newest"
                      >Newest First</ion-select-option
                    >
                    <ion-select-option value="oldest"
                      >Oldest First</ion-select-option
                    >
                    <ion-select-option value="email">Email</ion-select-option>
                  </ion-select>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-content>
        </ion-card>

        <!-- Generate New Invitation Card -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Generate New Invitation</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="invite-form">
              <ion-item>
                <ion-input
                  type="email"
                  [(ngModel)]="newInviteEmail"
                  placeholder="Enter email address"
                  [clearInput]="true"
                  (keyup.enter)="generateInvitation()"
                >
                  <ion-icon name="mail-outline" slot="start"></ion-icon>
                </ion-input>
              </ion-item>
              <ion-button
                (click)="generateInvitation()"
                [disabled]="!isValidEmail(newInviteEmail) || isLoading"
                expand="block"
              >
                <ion-icon name="person-add-outline" slot="start"></ion-icon>
                {{ isLoading ? 'Generating...' : 'Generate Invitation' }}
              </ion-button>
              <div class="bulk-invite-section">
                <ion-button
                  fill="outline"
                  expand="block"
                  (click)="openBulkInviteModal()"
                >
                  <ion-icon name="people-outline" slot="start"></ion-icon>
                  Bulk Invite
                </ion-button>
                <p class="helper-text">
                  Upload CSV file with email addresses or paste multiple emails
                </p>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Active Invitations Card -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Active Invitations</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item
                *ngFor="let invite of filteredInvitations"
                class="invitation-item"
              >
                <div class="invitation-content">
                  <div class="invitation-main">
                    <div class="invitation-info">
                      <h2>{{ invite.email }}</h2>
                      <div class="status-row">
                        <ion-chip
                          [class]="getStatusClass(invite.status)"
                          size="small"
                        >
                          <ion-icon
                            [name]="getStatusIcon(invite.status)"
                          ></ion-icon>
                          <ion-label>{{ invite.status | titlecase }}</ion-label>
                        </ion-chip>
                        <ion-text
                          *ngIf="invite.status === 'pending'"
                          [color]="getExpiryColor(invite.expiresAt)"
                          class="expiry-text"
                        >
                          {{ getExpiryCountdown(invite.expiresAt) }}
                        </ion-text>
                      </div>
                    </div>
                    <div class="invitation-actions">
                      <ion-button
                        fill="clear"
                        (click)="copyInviteLink(invite.token)"
                        [disabled]="invite.status !== 'pending'"
                        title="Copy Invitation Link"
                      >
                        <ion-icon
                          name="copy-outline"
                          slot="icon-only"
                        ></ion-icon>
                      </ion-button>
                      <ion-button
                        fill="clear"
                        (click)="resendInvitation(invite)"
                        [disabled]="invite.status !== 'pending'"
                        title="Resend Invitation"
                      >
                        <ion-icon
                          name="refresh-outline"
                          slot="icon-only"
                        ></ion-icon>
                      </ion-button>
                      <ion-button
                        fill="clear"
                        color="danger"
                        (click)="revokeInvitation(invite.id)"
                        [disabled]="invite.status === 'revoked'"
                        title="Revoke Invitation"
                      >
                        <ion-icon
                          name="trash-outline"
                          slot="icon-only"
                        ></ion-icon>
                      </ion-button>
                    </div>
                  </div>

                  <div class="invitation-details">
                    <div class="details-row">
                      <span class="detail-label">Created:</span>
                      <span>{{ invite.createdAt | date : 'medium' }}</span>
                    </div>
                    <div
                      class="details-row"
                      *ngIf="invite.status === 'pending'"
                    >
                      <span class="detail-label">Expires:</span>
                      <span>{{ invite.expiresAt | date : 'medium' }}</span>
                    </div>
                    <div
                      class="details-row"
                      *ngIf="invite.status === 'accepted'"
                    >
                      <span class="detail-label">Accepted by:</span>
                      <span>{{ invite.acceptedBy?.name }}</span>
                    </div>

                    <div
                      *ngIf="invite.status === 'pending'"
                      class="expiry-progress-container"
                    >
                      <ion-progress-bar
                        [value]="getExpiryProgress(invite.expiresAt)"
                        [color]="getExpiryProgressColor(invite.expiresAt)"
                      ></ion-progress-bar>
                    </div>

                    <div class="history-section" *ngIf="invite.history?.length">
                      <div class="history-header">
                        <ion-icon name="time-outline"></ion-icon>
                        <span>History</span>
                      </div>
                      <div class="history-timeline">
                        <div
                          class="timeline-event"
                          *ngFor="let event of invite.history"
                        >
                          <div class="event-icon">
                            <ion-icon
                              [name]="getHistoryIcon(event.type)"
                              [color]="getHistoryColor(event.type)"
                            ></ion-icon>
                          </div>
                          <div class="event-content">
                            <div class="event-message">{{ event.message }}</div>
                            <div class="event-time">
                              {{ event.timestamp | date : 'medium' }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>

      <div *ngIf="activeTab === 'list'">
        <app-group-admin-list></app-group-admin-list>
      </div>
    </ion-content>
  `,
  styles: [
    `
      // ... existing styles ...

      .history-log {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--ion-color-light);
      }

      .history-title {
        font-weight: 600;
        color: var(--ion-color-medium);
        margin-bottom: 8px;
      }

      .history-date {
        font-size: 0.8em;
        color: var(--ion-color-medium);
      }

      .expiry-text {
        margin-left: 8px;
        font-size: 0.9em;
      }

      .invitation-item {
        --padding-start: 0;
        --padding-end: 0;
        --inner-padding-end: 0;
        margin-bottom: 16px;
      }

      .invitation-content {
        width: 100%;
        padding: 16px;
      }

      .invitation-main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
      }

      .invitation-info h2 {
        font-size: 1.1em;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: var(--ion-color-dark);
      }

      .status-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      ion-chip {
        margin: 0;
      }

      .invitation-actions {
        display: flex;
        gap: 4px;
      }

      .invitation-details {
        background: var(--ion-color-light-tint);
        border-radius: 8px;
        padding: 12px;
        margin-top: 8px;
      }

      .details-row {
        display: flex;
        margin-bottom: 8px;
        font-size: 0.9em;
      }

      .detail-label {
        color: var(--ion-color-medium);
        width: 100px;
      }

      .expiry-progress-container {
        margin: 16px 0;
        width: 100%;
      }

      ion-progress-bar {
        height: 6px;
        border-radius: 3px;
        overflow: hidden;
      }

      .history-section {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--ion-color-light-shade);
      }

      .history-header {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--ion-color-medium);
        margin-bottom: 12px;
      }

      .history-timeline {
        padding-left: 8px;
      }

      .timeline-event {
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
        position: relative;
      }

      .timeline-event:not(:last-child):before {
        content: '';
        position: absolute;
        left: 12px;
        top: 24px;
        bottom: -12px;
        width: 2px;
        background: var(--ion-color-light-shade);
      }

      .event-icon {
        background: var(--ion-color-light);
        border-radius: 50%;
        padding: 4px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .event-content {
        flex: 1;
      }

      .event-message {
        font-size: 0.9em;
        margin-bottom: 2px;
      }

      .event-time {
        font-size: 0.8em;
        color: var(--ion-color-medium);
      }

      @media (max-width: 768px) {
        .invitation-main {
          flex-direction: column;
          gap: 16px;
        }

        .invitation-actions {
          justify-content: flex-end;
          width: 100%;
        }

        .details-row {
          flex-direction: column;
        }

        .detail-label {
          width: auto;
          margin-bottom: 4px;
        }
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
    IonButton,
    IonInput,
    IonIcon,
    IonBadge,
    IonChip,
    IonText,
    IonProgressBar,
    IonRefresher,
    IonRefresherContent,
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonSegment,
    IonSegmentButton,
    GroupAdminListPage,
  ],
})
export class GroupAdminInvitesPage implements OnInit, OnDestroy {
  activeTab = 'invites';
  newInviteEmail: string = '';
  invitations: GroupAdminInvitation[] = [];
  filteredInvitations: GroupAdminInvitation[] = [];
  isLoading = false;
  searchTerm: string = '';
  statusFilter: string = 'all';
  sortBy: string = 'newest';
  stats: InvitationStats = {
    total: 0,
    pending: 0,
    accepted: 0,
    expired: 0,
    revoked: 0,
    acceptanceRate: 0,
  };

  private refreshInterval?: Subscription;
  private statusChart: Chart | null = null;
  private timelineChart: Chart | null = null;

  constructor(
    private tokenService: TokenService,
    private toastService: ToastService,
    private invitationStorage: InvitationStorageService,
    private modalCtrl: ModalController,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    addIcons({
      copyOutline,
      personAddOutline,
      refreshOutline,
      trashOutline,
      timeOutline,
      mailOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      closeCircleOutline,
      statsChartOutline,
      filterOutline,
      peopleOutline,
      addCircleOutline,
      informationCircleOutline,
    });
  }

  ngOnInit() {
    this.loadInvitations();
    // Refresh status every minute
    this.refreshInterval = interval(60000).subscribe(() => {
      this.updateInvitationStatuses();
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  getStatusClass(status: string): string {
    const baseClass = 'status-chip';
    switch (status) {
      case 'pending':
        return `${baseClass} pending`;
      case 'accepted':
        return `${baseClass} accepted`;
      case 'expired':
        return `${baseClass} expired`;
      case 'revoked':
        return `${baseClass} revoked`;
      default:
        return baseClass;
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending':
        return 'time-outline';
      case 'accepted':
        return 'checkmark-circle-outline';
      case 'expired':
        return 'alert-circle-outline';
      case 'revoked':
        return 'close-circle-outline';
      default:
        return 'help-circle-outline';
    }
  }

  getExpiryCountdown(expiryDate: Date): string {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  }

  getExpiryColor(expiryDate: Date): string {
    const progress = this.getExpiryProgress(expiryDate);
    if (progress > 0.6) return 'success';
    if (progress > 0.3) return 'warning';
    return 'danger';
  }

  getExpiryProgress(expiryDate: Date): number {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const created = new Date(expiry.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days before expiry

    const total = expiry.getTime() - created.getTime();
    const elapsed = now.getTime() - created.getTime();
    const progress = Math.max(0, Math.min(1, 1 - elapsed / total));

    // Round to 2 decimal places to stabilize the value
    return Math.round(progress * 100) / 100;
  }

  getExpiryProgressColor(expiryDate: Date): string {
    const progress = this.getExpiryProgress(expiryDate);
    if (progress > 0.6) return 'success';
    if (progress > 0.3) return 'warning';
    return 'danger';
  }

  private loadInvitations() {
    try {
      this.invitations = this.invitationStorage.getInvitations();
      this.cleanupExpiredInvitations();
      this.updateStats();
      this.filterInvitations();
    } catch (error) {
      this.toastService.showToast('Error loading invitations', 'error');
    }
  }

  private cleanupExpiredInvitations() {
    const now = new Date();
    this.invitations = this.invitations.filter((invite) => {
      const isExpired = new Date(invite.expiresAt) < now;
      if (isExpired && invite.status === 'pending') {
        invite.status = 'expired';
      }
      return true;
    });
    this.saveInvitations();
  }

  private saveInvitations() {
    try {
      this.invitationStorage.saveInvitations(this.invitations);
    } catch (error) {
      this.toastService.showToast('Error saving invitations', 'error');
    }
  }

  async generateInvitation() {
    if (!this.newInviteEmail || !this.validateEmail(this.newInviteEmail)) {
      await this.toastService.showToast(
        'Please enter a valid email address',
        'warning'
      );
      return;
    }

    try {
      this.isLoading = true;

      // Check for existing invitation
      const existingInvite = this.invitations.find(
        (invite) =>
          invite.email === this.newInviteEmail && invite.status === 'pending'
      );

      if (existingInvite) {
        await this.toastService.showToast(
          'An active invitation already exists for this email',
          'warning'
        );
        return;
      }

      const token = this.tokenService.generateInvitationToken(
        this.newInviteEmail
      );
      const invitation: GroupAdminInvitation = {
        id: Date.now().toString(),
        email: this.newInviteEmail,
        token,
        status: 'pending',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        reminderCount: 0,
        history: [
          {
            type: 'created',
            message: 'Invitation created',
            timestamp: new Date(),
          },
        ],
      };

      this.invitations.push(invitation);
      this.saveInvitations();
      this.updateStats();
      this.filterInvitations();
      this.newInviteEmail = '';

      await this.toastService.showToast(
        'Invitation generated successfully',
        'success'
      );
    } catch (error) {
      console.error('Error generating invitation:', error);
      await this.toastService.showToast('Error generating invitation', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async copyInviteLink(token: string) {
    try {
      if (!this.tokenService.validateToken(token)) {
        await this.toastService.showToast(
          'This invitation has expired',
          'error'
        );
        return;
      }

      const link = `${window.location.origin}/group-admin/register?token=${token}`;
      await navigator.clipboard.writeText(link);
      await this.toastService.showToast(
        'Invitation link copied to clipboard',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast(
        'Error copying invitation link',
        'error'
      );
    }
  }

  async revokeInvitation(id: string) {
    try {
      this.invitations = this.invitations.filter((invite) => invite.id !== id);
      this.saveInvitations();
      await this.toastService.showToast(
        'Invitation revoked successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error revoking invitation', 'error');
    }
  }

  refreshInvitations(event: any) {
    this.loadInvitations();
    event.target.complete();
  }

  isValidEmail(email: string): boolean {
    return this.validateEmail(email);
  }

  async resendInvitation(invite: GroupAdminInvitation) {
    try {
      this.isLoading = true;
      // Generate new token and update expiry
      const newToken = this.tokenService.generateInvitationToken(invite.email);
      const updatedInvite = {
        ...invite,
        token: newToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      };

      // Update invitation in storage
      const index = this.invitations.findIndex((inv) => inv.id === invite.id);
      if (index !== -1) {
        this.invitations[index] = updatedInvite;
        this.saveInvitations();
      }

      await this.toastService.showToast(
        'Invitation resent successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to resend invitation', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  updateInvitationStatuses() {
    const now = new Date();
    let hasChanges = false;

    this.invitations = this.invitations.map((invite) => {
      if (invite.status === 'pending' && new Date(invite.expiresAt) < now) {
        hasChanges = true;
        return { ...invite, status: 'expired' };
      }
      return invite;
    });

    if (hasChanges) {
      this.saveInvitations();
    }
  }

  private updateStats() {
    this.stats = {
      total: this.invitations.length,
      pending: this.invitations.filter((i) => i.status === 'pending').length,
      accepted: this.invitations.filter((i) => i.status === 'accepted').length,
      expired: this.invitations.filter((i) => i.status === 'expired').length,
      revoked: this.invitations.filter((i) => i.status === 'revoked').length,
      acceptanceRate: this.calculateAcceptanceRate(),
    };
  }

  private calculateAcceptanceRate(): number {
    const accepted = this.invitations.filter(
      (i) => i.status === 'accepted'
    ).length;
    const total = this.invitations.filter((i) => i.status !== 'pending').length;
    return total === 0 ? 0 : Math.round((accepted / total) * 100);
  }

  filterInvitations() {
    let filtered = [...this.invitations];

    // Apply search filter
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter((invite) =>
        invite.email.toLowerCase().includes(search)
      );
    }

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(
        (invite) => invite.status === this.statusFilter
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case 'oldest':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case 'email':
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });

    this.filteredInvitations = filtered;
  }

  async openBulkInviteModal() {
    const modal = await this.modalCtrl.create({
      component: BulkInviteModalComponent,
    });

    await modal.present();

    const { data: emails } = await modal.onWillDismiss();
    if (emails && Array.isArray(emails)) {
      this.isLoading = true;
      try {
        for (const email of emails) {
          const token = this.tokenService.generateInvitationToken(email);
          const invitation: GroupAdminInvitation = {
            id: Date.now().toString(),
            email,
            token,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: 'pending',
            createdAt: new Date(),
            reminderCount: 0,
            history: [
              {
                type: 'created',
                message: 'Invitation created',
                timestamp: new Date(),
              },
            ],
          };
          this.invitations.push(invitation);
        }

        this.saveInvitations();
        this.updateStats();
        this.filterInvitations();

        await this.toastService.showToast(
          `Successfully generated ${emails.length} invitations`,
          'success'
        );
      } catch (error) {
        console.error('Error generating bulk invitations:', error);
        await this.toastService.showToast(
          'Error generating bulk invitations',
          'error'
        );
      } finally {
        this.isLoading = false;
      }
    }
  }

  ngAfterViewInit() {
    this.initCharts();
    this.cdr.detectChanges();
  }

  goToList() {
    this.router.navigate(['/super-admin/group-admins/list']);
  }

  getHistoryIcon(type: string): string {
    switch (type) {
      case 'created':
        return 'add-circle-outline';
      case 'resent':
        return 'refresh-outline';
      case 'accepted':
        return 'checkmark-circle-outline';
      case 'expired':
        return 'alert-circle-outline';
      case 'revoked':
        return 'close-circle-outline';
      default:
        return 'information-circle-outline';
    }
  }

  getHistoryColor(type: string): string {
    switch (type) {
      case 'created':
        return 'primary';
      case 'resent':
        return 'tertiary';
      case 'accepted':
        return 'success';
      case 'expired':
        return 'warning';
      case 'revoked':
        return 'danger';
      default:
        return 'medium';
    }
  }

  private initCharts() {
    // Initialize status distribution chart
    const statusCtx = document.getElementById(
      'statusChart'
    ) as HTMLCanvasElement;
    if (statusCtx) {
      this.statusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Pending', 'Accepted', 'Expired', 'Revoked'],
          datasets: [
            {
              data: [
                this.stats.pending,
                this.stats.accepted,
                this.stats.expired,
                this.stats.revoked,
              ],
              backgroundColor: [
                '#3880ff', // primary
                '#2dd36f', // success
                '#ffc409', // warning
                '#eb445a', // danger
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }

    // Initialize timeline chart
    const timelineCtx = document.getElementById(
      'timelineChart'
    ) as HTMLCanvasElement;
    if (timelineCtx) {
      const timelineData = this.getTimelineData();
      this.timelineChart = new Chart(timelineCtx, {
        type: 'line',
        data: {
          labels: timelineData.labels,
          datasets: [
            {
              label: 'Invitations',
              data: timelineData.data,
              borderColor: '#3880ff',
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    }
  }

  private getTimelineData() {
    // Get last 7 days
    const labels = [];
    const data = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString());

      const count = this.invitations.filter((invite) => {
        const inviteDate = new Date(invite.createdAt);
        return inviteDate.toDateString() === date.toDateString();
      }).length;

      data.push(count);
    }

    return { labels, data };
  }
}
