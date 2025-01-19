import { Component, OnInit, OnDestroy } from '@angular/core';
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
} from 'ionicons/icons';
import { GroupAdminInvitation } from '@core/interfaces/group-admin.interface';
import { TokenService } from '@core/services/token.service';
import { ToastService } from '@core/services/toast.service';
import { InvitationStorageService } from '@core/services/invitation-storage.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-group-admin-invites',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Group Admin Invitations</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-refresher slot="fixed" (ionRefresh)="refreshInvitations($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

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
              *ngFor="let invite of invitations"
              class="invitation-item"
            >
              <div class="invitation-content">
                <div class="invitation-header">
                  <ion-label>
                    <h2>{{ invite.email }}</h2>
                    <div class="status-container">
                      <ion-chip [class]="getStatusClass(invite.status)">
                        <ion-icon
                          [name]="getStatusIcon(invite.status)"
                        ></ion-icon>
                        <ion-label>{{ invite.status | titlecase }}</ion-label>
                      </ion-chip>
                      <ion-text
                        *ngIf="invite.status === 'pending'"
                        color="medium"
                        class="expiry-text"
                      >
                        {{ getExpiryText(invite.expiresAt) }}
                      </ion-text>
                    </div>
                  </ion-label>
                </div>

                <div class="invitation-details">
                  <p>Created: {{ invite.createdAt | date : 'medium' }}</p>
                  <p *ngIf="invite.status === 'pending'">
                    Expires: {{ invite.expiresAt | date : 'medium' }}
                  </p>
                  <p *ngIf="invite.status === 'accepted'">
                    Accepted by: {{ invite.acceptedBy?.name }}
                  </p>
                  <div
                    *ngIf="invite.status === 'pending'"
                    class="expiry-progress"
                  >
                    <ion-progress-bar
                      [value]="getExpiryProgress(invite.expiresAt)"
                      [color]="getExpiryProgressColor(invite.expiresAt)"
                    ></ion-progress-bar>
                  </div>
                </div>

                <div class="invitation-actions">
                  <ion-button
                    fill="clear"
                    (click)="copyInviteLink(invite.token)"
                    [disabled]="invite.status !== 'pending'"
                  >
                    <ion-icon name="copy-outline"></ion-icon>
                  </ion-button>
                  <ion-button
                    fill="clear"
                    (click)="resendInvitation(invite)"
                    [disabled]="invite.status !== 'pending'"
                  >
                    <ion-icon name="refresh-outline"></ion-icon>
                  </ion-button>
                  <ion-button
                    fill="clear"
                    color="danger"
                    (click)="revokeInvitation(invite.id)"
                    [disabled]="invite.status === 'revoked'"
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </ion-button>
                </div>
              </div>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styleUrls: ['./group-admin-invites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  ],
})
export class GroupAdminInvitesPage implements OnInit, OnDestroy {
  newInviteEmail: string = '';
  invitations: GroupAdminInvitation[] = [];
  isLoading = false;

  private refreshInterval?: Subscription;

  constructor(
    private tokenService: TokenService,
    private toastService: ToastService,
    private invitationStorage: InvitationStorageService
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

  getExpiryText(expiryDate: Date): string {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `Expires in ${days}d ${hours}h`;
    return `Expires in ${hours}h`;
  }

  getExpiryProgress(expiryDate: Date): number {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const created = new Date(expiry.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days before expiry

    const total = expiry.getTime() - created.getTime();
    const elapsed = now.getTime() - created.getTime();

    return Math.max(0, Math.min(1, 1 - elapsed / total));
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
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'pending',
        createdAt: new Date(),
        reminderCount: 0,
      };

      this.invitations.push(invitation);
      this.saveInvitations();
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
}
