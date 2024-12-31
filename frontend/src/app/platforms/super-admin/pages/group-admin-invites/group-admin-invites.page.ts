import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  copyOutline,
  personAddOutline,
  refreshOutline,
  trashOutline,
} from 'ionicons/icons';
import { GroupAdminInvitation } from '@core/interfaces/group-admin.interface';
import { TokenService } from '@core/services/token.service';
import { ToastService } from '@core/services/toast.service';
import { InvitationStorageService } from '@core/services/invitation-storage.service';

@Component({
  selector: 'app-group-admin-invites',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Group Admin Invitations</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
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
                label="Email"
                labelPlacement="floating"
              ></ion-input>
            </ion-item>
            <ion-button
              (click)="generateInvitation()"
              [disabled]="!newInviteEmail"
              expand="block"
            >
              <ion-icon name="person-add-outline" slot="start"></ion-icon>
              Generate Invitation
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Active Invitations</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item *ngFor="let invite of invitations">
              <ion-label>
                <h2>{{ invite.email }}</h2>
                <p>Expires: {{ invite.expiresAt | date : 'medium' }}</p>
                <p>
                  Status:
                  <ion-badge
                    [color]="
                      invite.status === 'pending' ? 'warning' : 'success'
                    "
                  >
                    {{ invite.status }}
                  </ion-badge>
                </p>
              </ion-label>
              <ion-button
                slot="end"
                fill="clear"
                (click)="copyInviteLink(invite.token)"
              >
                <ion-icon name="copy-outline"></ion-icon>
              </ion-button>
              <ion-button
                slot="end"
                fill="clear"
                color="danger"
                (click)="revokeInvitation(invite.id)"
              >
                <ion-icon name="trash-outline"></ion-icon>
              </ion-button>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
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
    IonButton,
    IonInput,
    IonIcon,
    IonBadge,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
  ],
})
export class GroupAdminInvitesPage implements OnInit {
  newInviteEmail: string = '';
  invitations: GroupAdminInvitation[] = [];
  isLoading = false;

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
    });
  }

  ngOnInit() {
    this.loadInvitations();
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
}
