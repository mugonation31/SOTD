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
  IonAlert,
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
  templateUrl: './group-admin-invites.page.html',
  styleUrls: ['./group-admin-invites.page.scss'],
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
    IonAlert,
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
  private inviteToAction: GroupAdminInvitation | null = null;
  private selectedInvites: GroupAdminInvitation[] = [];
  showRevokeAlert = false;
  showResetAlert = false;
  showBulkRevokeAlert = false;

  revokeButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Revoke',
      role: 'confirm',
      handler: () => this.confirmRevokeInvite(),
    },
  ];

  resetButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Reset',
      role: 'confirm',
      handler: () => this.confirmResetInvite(),
    },
  ];

  bulkRevokeButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Revoke All',
      role: 'confirm',
      handler: () => this.confirmBulkRevoke(),
    },
  ];

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

  async revokeInvite(invite: GroupAdminInvitation) {
    this.inviteToAction = invite;
    this.showRevokeAlert = true;
  }

  async resetInvite(invite: GroupAdminInvitation) {
    this.inviteToAction = invite;
    this.showResetAlert = true;
  }

  async bulkRevokeInvites(invites: GroupAdminInvitation[]) {
    this.selectedInvites = invites;
    this.showBulkRevokeAlert = true;
  }

  private async confirmRevokeInvite() {
    if (!this.inviteToAction) return;

    try {
      // TODO: Implement actual revoke logic
      await this.toastService.showToast(
        'Invitation revoked successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to revoke invitation', 'error');
    } finally {
      this.inviteToAction = null;
      this.showRevokeAlert = false;
    }
  }

  private async confirmResetInvite() {
    if (!this.inviteToAction) return;

    try {
      // TODO: Implement actual reset logic
      await this.toastService.showToast(
        'Invitation reset successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to reset invitation', 'error');
    } finally {
      this.inviteToAction = null;
      this.showResetAlert = false;
    }
  }

  private async confirmBulkRevoke() {
    if (!this.selectedInvites.length) return;

    try {
      // TODO: Implement actual bulk revoke logic
      await this.toastService.showToast(
        'Selected invitations revoked successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast(
        'Failed to revoke selected invitations',
        'error'
      );
    } finally {
      this.selectedInvites = [];
      this.showBulkRevokeAlert = false;
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
