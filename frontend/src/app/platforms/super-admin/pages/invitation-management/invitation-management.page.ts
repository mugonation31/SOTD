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
  IonButtons,
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
  IonSegment,
  IonSegmentButton,
  IonInput,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe, TitleCasePipe } from '@angular/common';
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
  templateUrl: './invitation-management.page.html',
  styleUrls: ['./invitation-management.page.scss'],
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
    IonButtons,
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
    IonSegment,
    IonSegmentButton,
    IonInput,
    NgFor,
    NgIf,
    DatePipe,
    TitleCasePipe,
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
