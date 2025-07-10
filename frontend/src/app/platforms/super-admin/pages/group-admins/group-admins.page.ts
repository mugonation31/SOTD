import { Component } from '@angular/core';
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
  IonIcon,
  IonBadge,
  IonToggle,
  IonSegment,
  IonSegmentButton,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  peopleCircleOutline,
  trashOutline,
  banOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GroupAdminInvitesPage } from '../group-admin-invites/group-admin-invites.page';

interface GroupAdmin {
  id: string;
  email: string;
  name: string;
  status: 'active' | 'inactive';
  lastLogin?: Date;
  groupsManaged: string[];
  joinedDate: Date;
}

@Component({
  selector: 'app-group-admins',
  templateUrl: './group-admins.page.html',
  styleUrls: ['./group-admins.page.scss'],
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
    IonIcon,
    IonBadge,
    IonToggle,
    NgFor,
    NgIf,
    DatePipe,
    IonSegment,
    IonSegmentButton,
    RouterModule,
    FormsModule,
    IonRouterOutlet,
    GroupAdminInvitesPage,
  ],
})
export class GroupAdminsPage {
  groupAdmins: GroupAdmin[] = [];
  filteredAdmins: GroupAdmin[] = [];
  activeTab = 'list';
  searchTerm = '';
  statusFilter = 'all';

  constructor(private toastService: ToastService) {
    addIcons({
      peopleCircleOutline,
      trashOutline,
      banOutline,
      checkmarkCircleOutline,
    });
    // Load mock data immediately
    this.loadMockAdmins();
    // Initialize filteredAdmins
    this.filteredAdmins = this.groupAdmins;
  }

  private loadMockAdmins() {
    this.groupAdmins = [
      {
        id: '1',
        email: 'admin1@example.com',
        name: 'John Admin',
        status: 'active',
        lastLogin: new Date('2024-03-15'),
        groupsManaged: ['Premier League A', 'Champions League'],
        joinedDate: new Date('2024-01-01'),
      },
      {
        id: '2',
        email: 'admin2@example.com',
        name: 'Sarah Manager',
        status: 'active',
        lastLogin: new Date('2024-03-14'),
        groupsManaged: ['Premier League B'],
        joinedDate: new Date('2024-01-15'),
      },
    ];
    this.filterAdmins();
  }

  filterAdmins() {
    let filtered = [...this.groupAdmins];

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter((admin) => admin.status === this.statusFilter);
    }

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (admin) =>
          admin.name.toLowerCase().includes(term) ||
          admin.email.toLowerCase().includes(term)
      );
    }

    this.filteredAdmins = filtered;
  }

  async toggleAdminStatus(admin: GroupAdmin) {
    try {
      admin.status = admin.status === 'active' ? 'inactive' : 'active';
      await this.toastService.showToast(
        `Admin status ${
          admin.status === 'active' ? 'activated' : 'deactivated'
        }`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error updating admin status', 'error');
    }
  }

  async confirmRevokeAccess(admin: GroupAdmin) {
    if (confirm(`Are you sure you want to revoke access for ${admin.name}?`)) {
      try {
        this.groupAdmins = this.groupAdmins.filter((a) => a.id !== admin.id);
        this.filterAdmins();
        await this.toastService.showToast(
          'Admin access revoked successfully',
          'success'
        );
      } catch (error) {
        await this.toastService.showToast(
          'Error revoking admin access',
          'error'
        );
      }
    }
  }
}
