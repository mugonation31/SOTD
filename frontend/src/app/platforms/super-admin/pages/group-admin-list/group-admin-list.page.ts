import { Component, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  IonSearchbar,
  IonBadge,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  eyeOutline,
  createOutline,
  trashOutline,
  shieldOutline,
  personOutline,
  timeOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface GroupAdmin {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  lastLogin?: Date;
  createdAt: Date;
  groupCount: number;
  permissions: string[];
}

@Component({
  selector: 'app-group-admin-list',
  template: `
    <ion-card>
      <ion-card-header>
        <ion-grid>
          <ion-row class="ion-align-items-center">
            <ion-col>
              <ion-card-title>Group Administrators</ion-card-title>
            </ion-col>
            <ion-col size="auto">
              <ion-button fill="clear" (click)="showActivityLog()">
                <ion-icon name="time-outline" slot="start"></ion-icon>
                Activity Log
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-header>
      <ion-card-content>
        <ion-grid>
          <ion-row>
            <ion-col size="12" sizeMd="4">
              <ion-searchbar
                [(ngModel)]="searchTerm"
                (ionInput)="filterAdmins()"
                placeholder="Search admins..."
              ></ion-searchbar>
            </ion-col>
            <ion-col size="12" sizeMd="4">
              <ion-select
                [(ngModel)]="statusFilter"
                (ionChange)="filterAdmins()"
                placeholder="Filter by status"
              >
                <ion-select-option value="all">All Statuses</ion-select-option>
                <ion-select-option value="active">Active</ion-select-option>
                <ion-select-option value="inactive">Inactive</ion-select-option>
              </ion-select>
            </ion-col>
            <ion-col size="12" sizeMd="4">
              <ion-select
                [(ngModel)]="sortBy"
                (ionChange)="filterAdmins()"
                placeholder="Sort by"
              >
                <ion-select-option value="name">Name</ion-select-option>
                <ion-select-option value="email">Email</ion-select-option>
                <ion-select-option value="status">Status</ion-select-option>
                <ion-select-option value="groups"
                  >Group Count</ion-select-option
                >
              </ion-select>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-list>
          <ion-item *ngFor="let admin of filteredAdmins" class="admin-item">
            <ion-grid>
              <ion-row class="ion-align-items-center">
                <ion-col size="12" sizeMd="4">
                  <ion-label>
                    <h2>{{ admin.name }}</h2>
                    <p>{{ admin.email }}</p>
                  </ion-label>
                </ion-col>
                <ion-col size="6" sizeMd="2">
                  <ion-chip
                    [color]="admin.status === 'active' ? 'success' : 'medium'"
                  >
                    <ion-icon
                      [name]="
                        admin.status === 'active'
                          ? 'checkmark-circle-outline'
                          : 'close-circle-outline'
                      "
                    ></ion-icon>
                    <ion-label>{{ admin.status | titlecase }}</ion-label>
                  </ion-chip>
                </ion-col>
                <ion-col size="6" sizeMd="2">
                  <ion-badge color="primary"
                    >{{ admin.groupCount }} Groups</ion-badge
                  >
                </ion-col>
                <ion-col size="12" sizeMd="4">
                  <ion-buttons class="ion-justify-content-end">
                    <ion-button fill="clear" (click)="viewDetails(admin)">
                      <ion-icon name="eye-outline"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" (click)="editPermissions(admin)">
                      <ion-icon name="shield-outline"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" (click)="toggleStatus(admin)">
                      <ion-icon
                        [name]="
                          admin.status === 'active'
                            ? 'close-circle-outline'
                            : 'checkmark-circle-outline'
                        "
                      ></ion-icon>
                    </ion-button>
                    <ion-button
                      fill="clear"
                      color="danger"
                      (click)="removeAdmin(admin)"
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>

    <!-- Details Modal -->
    <ion-modal [isOpen]="!!selectedAdmin" (didDismiss)="selectedAdmin = null">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title>Admin Details</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="selectedAdmin = null">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" *ngIf="selectedAdmin">
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ selectedAdmin.name }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-list>
                <ion-item>
                  <ion-label>
                    <h2>Email</h2>
                    <p>{{ selectedAdmin.email }}</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h2>Status</h2>
                    <ion-chip
                      [color]="
                        selectedAdmin.status === 'active' ? 'success' : 'medium'
                      "
                    >
                      {{ selectedAdmin.status | titlecase }}
                    </ion-chip>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h2>Last Login</h2>
                    <p>{{ selectedAdmin.lastLogin | date : 'medium' }}</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h2>Created</h2>
                    <p>{{ selectedAdmin.createdAt | date : 'medium' }}</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h2>Groups</h2>
                    <p>Managing {{ selectedAdmin.groupCount }} groups</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h2>Permissions</h2>
                    <ion-chip
                      *ngFor="let perm of selectedAdmin.permissions"
                      color="primary"
                    >
                      {{ perm }}
                    </ion-chip>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  styles: [
    `
      .admin-item {
        --padding-start: 0;
        --padding-end: 0;
        --padding-top: 8px;
        --padding-bottom: 8px;
      }

      ion-grid {
        padding: 0;
      }

      h2 {
        font-weight: 600;
        margin-bottom: 4px;
      }

      ion-badge {
        font-size: 0.9em;
      }

      ion-chip {
        font-size: 0.9em;
      }

      ion-buttons ion-button {
        --padding-start: 4px;
        --padding-end: 4px;
      }

      @media (max-width: 768px) {
        ion-buttons {
          justify-content: flex-start;
          padding-top: 8px;
        }
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonButtons,
    IonSearchbar,
    IonBadge,
    IonChip,
    IonGrid,
    IonRow,
    IonCol,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
  ],
})
export class GroupAdminListPage implements OnInit {
  admins: GroupAdmin[] = [];
  filteredAdmins: GroupAdmin[] = [];
  selectedAdmin: GroupAdmin | null = null;
  searchTerm = '';
  statusFilter = 'all';
  sortBy = 'name';

  constructor(private toastService: ToastService) {
    addIcons({
      eyeOutline,
      createOutline,
      trashOutline,
      shieldOutline,
      personOutline,
      timeOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
    });
  }

  ngOnInit() {
    // Load mock data for now
    this.loadMockAdmins();
    this.filterAdmins();
  }

  private loadMockAdmins() {
    this.admins = [
      {
        id: '1',
        name: 'John Admin',
        email: 'john.admin@example.com',
        status: 'active',
        lastLogin: new Date(),
        createdAt: new Date('2024-01-01'),
        groupCount: 3,
        permissions: ['manage_groups', 'manage_users', 'view_reports'],
      },
      // Add more mock data as needed
    ];
  }

  filterAdmins() {
    let filtered = [...this.admins];

    // Apply search filter
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (admin) =>
          admin.name.toLowerCase().includes(search) ||
          admin.email.toLowerCase().includes(search)
      );
    }

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter((admin) => admin.status === this.statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'groups':
          return b.groupCount - a.groupCount;
        default:
          return 0;
      }
    });

    this.filteredAdmins = filtered;
  }

  async viewDetails(admin: GroupAdmin) {
    this.selectedAdmin = admin;
  }

  async editPermissions(admin: GroupAdmin) {
    // TODO: Implement permissions editing
    await this.toastService.showToast(
      'Permissions editing coming soon',
      'warning'
    );
  }

  async toggleStatus(admin: GroupAdmin) {
    const newStatus = admin.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'activated' : 'deactivated';

    try {
      admin.status = newStatus;
      this.filterAdmins();
      await this.toastService.showToast(
        `Admin account ${action} successfully`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast(
        `Failed to ${action} admin account`,
        'error'
      );
    }
  }

  async removeAdmin(admin: GroupAdmin) {
    try {
      this.admins = this.admins.filter((a) => a.id !== admin.id);
      this.filterAdmins();
      await this.toastService.showToast(
        'Admin removed successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to remove admin', 'error');
    }
  }

  async showActivityLog() {
    await this.toastService.showToast('Activity log coming soon', 'warning');
  }
}
