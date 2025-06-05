import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonTextarea,
  IonDatetime,
  IonToggle,
  IonChip,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  refreshOutline,
  closeCircleOutline,
  timeOutline,
  checkmarkCircleOutline,
  warningOutline,
  createOutline,
  trashOutline,
} from 'ionicons/icons';

interface GroupAdminInvitation {
  id: string;
  email: string;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  invitationToken: string;
  createdAt: Date;
  expiresAt: Date;
  acceptedAt?: Date;
  revokedAt?: Date;
  lastEmailSent?: Date;
  emailsSent: number;
  customMessage?: string;
  invitedBy: string;
}

@Component({
  selector: 'app-invitation-management',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Group Admin Invitations</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Action Buttons -->
      <div class="action-buttons">
        <ion-button (click)="openSingleInvite()">
          <ion-icon name="mail-outline" slot="start"></ion-icon>
          Send Invitation
        </ion-button>
        <ion-button (click)="openBulkInvite()">
          <ion-icon name="mail-outline" slot="start"></ion-icon>
          Bulk Invite
        </ion-button>
        <ion-button (click)="openTemplateEditor()">
          <ion-icon name="create-outline" slot="start"></ion-icon>
          Edit Templates
        </ion-button>
      </div>

      <!-- Filters and Search -->
      <div class="filters-container">
        <ion-searchbar
          [(ngModel)]="searchTerm"
          placeholder="Search by email"
          (ionInput)="filterInvitations()"
        ></ion-searchbar>
        <ion-select
          [(ngModel)]="statusFilter"
          (ionChange)="filterInvitations()"
          placeholder="Filter by status"
        >
          <ion-select-option value="all">All Status</ion-select-option>
          <ion-select-option value="pending">Pending</ion-select-option>
          <ion-select-option value="accepted">Accepted</ion-select-option>
          <ion-select-option value="expired">Expired</ion-select-option>
          <ion-select-option value="revoked">Revoked</ion-select-option>
        </ion-select>
      </div>

      <!-- Invitations List -->
      <ion-list>
        <ion-item *ngFor="let invitation of filteredInvitations">
          <div class="invitation-item">
            <div class="invitation-header">
              <div class="email-status">
                <h3>{{ invitation.email }}</h3>
                <ion-chip [color]="getStatusColor(invitation.status)">
                  {{ invitation.status | titlecase }}
                </ion-chip>
              </div>
              <div class="dates">
                <span class="date-label">
                  <ion-icon name="time-outline"></ion-icon>
                  Expires: {{ invitation.expiresAt | date:'medium' }}
                </span>
                <span class="date-label" *ngIf="invitation.lastEmailSent">
                  Last Sent: {{ invitation.lastEmailSent | date:'medium' }}
                </span>
              </div>
            </div>

            <div class="invitation-actions">
              <ion-button
                fill="clear"
                [disabled]="invitation.status !== 'pending'"
                (click)="resendInvitation(invitation)"
              >
                <ion-icon name="refresh-outline" slot="icon-only"></ion-icon>
              </ion-button>
              <ion-button
                fill="clear"
                [disabled]="invitation.status !== 'pending'"
                (click)="revokeInvitation(invitation)"
              >
                <ion-icon name="close-circle-outline" slot="icon-only"></ion-icon>
              </ion-button>
              <ion-button
                fill="clear"
                (click)="viewInvitationHistory(invitation)"
              >
                <ion-icon name="time-outline" slot="icon-only"></ion-icon>
              </ion-button>
            </div>
          </div>
        </ion-item>
      </ion-list>

      <!-- Single Invite Modal -->
      <ion-modal [isOpen]="showSingleInviteModal">
        <ng-template>
          <ion-header>
            <ion-toolbar>
              <ion-title>Send Invitation</ion-title>
              <ion-buttons slot="end">
                <ion-button (click)="closeSingleInvite()">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input type="email" [(ngModel)]="newInvitation.email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Expiry Date</ion-label>
              <ion-datetime
                [(ngModel)]="newInvitation.expiresAt"
                [min]="minExpiryDate"
                [max]="maxExpiryDate"
              ></ion-datetime>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Custom Message</ion-label>
              <ion-textarea
                [(ngModel)]="newInvitation.customMessage"
                rows="4"
              ></ion-textarea>
            </ion-item>
            <ion-button expand="block" (click)="sendInvitation()">
              Send Invitation
            </ion-button>
          </ng-template>
        </ion-modal>

        <!-- Bulk Invite Modal -->
        <ion-modal [isOpen]="showBulkInviteModal">
          <ng-template>
            <ion-header>
              <ion-toolbar>
                <ion-title>Bulk Invite</ion-title>
                <ion-buttons slot="end">
                  <ion-button (click)="closeBulkInvite()">Close</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
              <ion-item>
                <ion-label position="stacked">Emails (one per line)</ion-label>
                <ion-textarea
                  [(ngModel)]="bulkEmails"
                  rows="10"
                  placeholder="Enter email addresses, one per line"
                ></ion-textarea>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Expiry Date</ion-label>
                <ion-datetime
                  [(ngModel)]="bulkExpiryDate"
                  [min]="minExpiryDate"
                  [max]="maxExpiryDate"
                ></ion-datetime>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Custom Message</ion-label>
                <ion-textarea
                  [(ngModel)]="bulkCustomMessage"
                  rows="4"
                ></ion-textarea>
              </ion-item>
              <ion-button expand="block" (click)="sendBulkInvitations()">
                Send Invitations
              </ion-button>
            </ng-template>
          </ion-modal>

          <!-- Template Editor Modal -->
          <ion-modal [isOpen]="showTemplateEditor">
            <ng-template>
              <ion-header>
                <ion-toolbar>
                  <ion-title>Email Templates</ion-title>
                  <ion-buttons slot="end">
                    <ion-button (click)="closeTemplateEditor()">Close</ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                <ion-segment [(ngModel)]="selectedTemplate">
                  <ion-segment-button value="invitation">
                    <ion-label>Invitation</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="reminder">
                    <ion-label>Reminder</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="expiry">
                    <ion-label>Expiry</ion-label>
                  </ion-segment-button>
                </ion-segment>

                <div class="template-editor">
                  <ion-item>
                    <ion-label position="stacked">Subject</ion-label>
                    <ion-input [(ngModel)]="emailTemplates[selectedTemplate].subject"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Content</ion-label>
                    <ion-textarea
                      [(ngModel)]="emailTemplates[selectedTemplate].content"
                      rows="10"
                    ></ion-textarea>
                  </ion-item>
                  <div class="template-variables">
                    <h4>Available Variables:</h4>
                    <ion-chip *ngFor="let variable of availableVariables">
                      {{variable}}
                    </ion-chip>
                  </div>
                  <ion-button expand="block" (click)="saveTemplate()">
                    Save Template
                  </ion-button>
                </div>
              </ion-content>
            </ng-template>
          </ion-modal>
    </ion-content>
  `,
  styles: [
    `
      .action-buttons {
        display: flex;
        gap: 16px;
        margin-bottom: 20px;
      }

      .filters-container {
        display: flex;
        gap: 16px;
        margin-bottom: 20px;

        ion-searchbar {
          flex: 1;
        }

        ion-select {
          width: 200px;
        }
      }

      .invitation-item {
        width: 100%;
        padding: 12px;
      }

      .invitation-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }

      .email-status {
        display: flex;
        align-items: center;
        gap: 12px;

        h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
        }
      }

      .dates {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 12px;
        color: #666;

        .date-label {
          display: flex;
          align-items: center;
          gap: 4px;

          ion-icon {
            font-size: 14px;
          }
        }
      }

      .invitation-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }

      .template-editor {
        padding: 16px;

        .template-variables {
          margin-top: 16px;
          padding: 16px;
          background: #f5f5f5;
          border-radius: 8px;

          h4 {
            margin: 0 0 8px 0;
            font-size: 14px;
            color: #666;
          }

          ion-chip {
            font-size: 12px;
          }
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
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonItem,
    IonLabel,
    IonList,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonModal,
    IonTextarea,
    IonDatetime,
    IonToggle,
    IonChip,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
  ],
})
export class InvitationManagementPage implements OnInit {
  // States
  showSingleInviteModal = false;
  showBulkInviteModal = false;
  showTemplateEditor = false;
  searchTerm = '';
  statusFilter = 'all';
  selectedTemplate: 'invitation' | 'reminder' | 'expiry' = 'invitation';

  // Data
  invitations: GroupAdminInvitation[] = [];
  filteredInvitations: GroupAdminInvitation[] = [];

  // New invitation form
  newInvitation = {
    email: '',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    customMessage: '',
  };

  // Bulk invite form
  bulkEmails = '';
  bulkExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  bulkCustomMessage = '';

  // Email templates
  emailTemplates = {
    invitation: {
      subject: 'Invitation to become a Group Admin',
      content: 'Hello,\n\nYou have been invited to become a Group Admin...',
    },
    reminder: {
      subject: 'Reminder: Your Group Admin invitation is pending',
      content: 'Hello,\n\nThis is a reminder about your pending invitation...',
    },
    expiry: {
      subject: 'Your Group Admin invitation is expiring soon',
      content:
        'Hello,\n\nYour invitation to become a Group Admin will expire soon...',
    },
  } as const;

  availableVariables = [
    '{{recipientEmail}}',
    '{{expiryDate}}',
    '{{invitationLink}}',
    '{{invitedBy}}',
    '{{customMessage}}',
  ];

  constructor() {
    addIcons({
      mailOutline,
      refreshOutline,
      closeCircleOutline,
      timeOutline,
      checkmarkCircleOutline,
      warningOutline,
      createOutline,
      trashOutline,
    });
  }

  ngOnInit() {
    this.loadInvitations();
  }

  // Modal controls
  openSingleInvite() {
    this.showSingleInviteModal = true;
  }

  closeSingleInvite() {
    this.showSingleInviteModal = false;
    this.resetNewInvitation();
  }

  openBulkInvite() {
    this.showBulkInviteModal = true;
  }

  closeBulkInvite() {
    this.showBulkInviteModal = false;
    this.resetBulkInvite();
  }

  openTemplateEditor() {
    this.showTemplateEditor = true;
  }

  closeTemplateEditor() {
    this.showTemplateEditor = false;
  }

  // Invitation management
  async loadInvitations() {
    // TODO: Replace with actual API call
    this.invitations = [
      {
        id: '1',
        email: 'test@example.com',
        status: 'pending',
        invitationToken: 'token123',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        emailsSent: 1,
        invitedBy: 'Super Admin',
      },
    ] as GroupAdminInvitation[];
    this.filterInvitations();
  }

  filterInvitations() {
    this.filteredInvitations = this.invitations.filter((invitation) => {
      const matchesSearch = invitation.email
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesStatus =
        this.statusFilter === 'all' || invitation.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  async sendInvitation() {
    // TODO: Implement sending single invitation
    console.log('Sending invitation:', this.newInvitation);
    this.closeSingleInvite();
  }

  async sendBulkInvitations() {
    // TODO: Implement sending bulk invitations
    const emails = this.bulkEmails
      .split('\n')
      .map((email) => email.trim())
      .filter((email) => email);
    console.log('Sending bulk invitations:', {
      emails,
      expiryDate: this.bulkExpiryDate,
    });
    this.closeBulkInvite();
  }

  async resendInvitation(invitation: GroupAdminInvitation) {
    // TODO: Implement resending invitation
    console.log('Resending invitation:', invitation);
  }

  async revokeInvitation(invitation: GroupAdminInvitation) {
    // TODO: Implement revoking invitation
    console.log('Revoking invitation:', invitation);
  }

  async viewInvitationHistory(invitation: GroupAdminInvitation) {
    // TODO: Implement viewing invitation history
    console.log('Viewing history for:', invitation);
  }

  async saveTemplate() {
    // TODO: Implement saving email template
    console.log('Saving template:', this.emailTemplates[this.selectedTemplate]);
  }

  // Utility functions
  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'expired':
        return 'medium';
      case 'revoked':
        return 'danger';
      default:
        return 'medium';
    }
  }

  private resetNewInvitation() {
    this.newInvitation = {
      email: '',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      customMessage: '',
    };
  }

  private resetBulkInvite() {
    this.bulkEmails = '';
    this.bulkExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    this.bulkCustomMessage = '';
  }

  get minExpiryDate() {
    return new Date().toISOString();
  }

  get maxExpiryDate() {
    const date = new Date();
    date.setDate(date.getDate() + 30); // Max 30 days in future
    return date.toISOString();
  }
}
