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
  IonSegment,
  IonSegmentButton,
  IonInput,
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
  cameraOutline,
  mailOutline,
  callOutline,
  businessOutline,
  calendarOutline,
  peopleOutline,
  closeOutline,
  imageOutline,
  saveOutline,
  informationCircleOutline,
  openOutline,
  personCircleOutline,
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
  profilePicture?: string;
  phone?: string;
  role?: string;
  lastActivity?: {
    action: string;
    timestamp: Date;
  }[];
  associatedGroups?: {
    id: string;
    name: string;
    role: string;
  }[];
}

interface GroupDetails {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  createdAt: Date;
  status: 'active' | 'inactive';
  adminRole: string;
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
            <ion-title>Admin Profile</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="selectedAdmin = null">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" *ngIf="selectedAdmin">
          <div class="profile-header">
            <div class="profile-picture-container">
              <div
                class="profile-picture"
                [class.no-image]="!selectedAdmin.profilePicture"
              >
                <img
                  *ngIf="selectedAdmin.profilePicture"
                  [src]="selectedAdmin.profilePicture"
                  alt="Profile picture"
                />
                <ion-icon
                  *ngIf="!selectedAdmin.profilePicture"
                  name="person-circle-outline"
                ></ion-icon>
              </div>
              <input
                type="file"
                #fileInput
                (change)="onFileSelected($event)"
                accept="image/*"
                style="display: none"
              />
              <ion-button
                fill="clear"
                class="edit-picture-button"
                (click)="fileInput.click()"
              >
                <ion-icon name="camera-outline"></ion-icon>
              </ion-button>
            </div>
            <div class="profile-info">
              <h1>{{ selectedAdmin.name }}</h1>
              <p class="role">
                {{ selectedAdmin.role || 'Group Administrator' }}
              </p>
              <ion-chip
                [color]="
                  selectedAdmin.status === 'active' ? 'success' : 'medium'
                "
              >
                <ion-icon
                  [name]="
                    selectedAdmin.status === 'active'
                      ? 'checkmark-circle-outline'
                      : 'close-circle-outline'
                  "
                ></ion-icon>
                <ion-label>{{ selectedAdmin.status | titlecase }}</ion-label>
              </ion-chip>
            </div>
          </div>

          <ion-segment [(ngModel)]="profileSection" class="profile-sections">
            <ion-segment-button value="info">
              <ion-label>Information</ion-label>
            </ion-segment-button>
            <ion-segment-button value="groups">
              <ion-label>Groups</ion-label>
            </ion-segment-button>
            <ion-segment-button value="activity">
              <ion-label>Activity</ion-label>
            </ion-segment-button>
          </ion-segment>

          <div [ngSwitch]="profileSection">
            <div *ngSwitchCase="'info'">
              <ion-list>
                <ion-item>
                  <ion-icon name="mail-outline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>Email</h2>
                    <p>{{ selectedAdmin.email }}</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon name="call-outline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>Phone</h2>
                    <p>{{ selectedAdmin.phone || 'Not provided' }}</p>
                  </ion-label>
                  <ion-button
                    slot="end"
                    fill="clear"
                    (click)="editContactInfo()"
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </ion-button>
                </ion-item>
                <ion-item>
                  <ion-icon name="time-outline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>Last Login</h2>
                    <p>{{ selectedAdmin.lastLogin | date : 'medium' }}</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon name="calendar-outline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>Account Created</h2>
                    <p>{{ selectedAdmin.createdAt | date : 'medium' }}</p>
                  </ion-label>
                </ion-item>
                <ion-item lines="none">
                  <ion-icon name="shield-outline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>Permissions</h2>
                    <div class="permissions-container">
                      <ion-chip
                        *ngFor="let perm of selectedAdmin.permissions"
                        color="primary"
                      >
                        {{ perm }}
                      </ion-chip>
                    </div>
                  </ion-label>
                </ion-item>
              </ion-list>
            </div>

            <div *ngSwitchCase="'groups'">
              <ion-list>
                <ion-item *ngFor="let group of selectedAdmin.associatedGroups">
                  <ion-icon name="people-outline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>{{ group.name }}</h2>
                    <p>Role: {{ group.role }}</p>
                  </ion-label>
                  <ion-button
                    slot="end"
                    fill="clear"
                    (click)="viewGroup(group)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </ion-button>
                </ion-item>
              </ion-list>
            </div>

            <div *ngSwitchCase="'activity'">
              <ion-list>
                <ion-item *ngFor="let activity of selectedAdmin.lastActivity">
                  <ion-icon name="time-outline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>{{ activity.action }}</h2>
                    <p>{{ activity.timestamp | date : 'medium' }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </div>
          </div>
        </ion-content>
      </ng-template>
    </ion-modal>

    <!-- Profile Picture Upload Modal -->
    <ion-modal [isOpen]="!!selectedImage" (didDismiss)="cancelImageUpload()">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title>Upload Profile Picture</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="cancelImageUpload()">
                <ion-icon name="close-outline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="preview-container" *ngIf="selectedImage">
            <img [src]="selectedImage" alt="Preview" class="image-preview" />
            <div class="preview-actions">
              <ion-button expand="block" (click)="uploadProfilePicture()">
                <ion-icon name="cloud-upload-outline" slot="start"></ion-icon>
                Upload Picture
              </ion-button>
              <ion-button
                expand="block"
                fill="outline"
                color="medium"
                (click)="cancelImageUpload()"
              >
                <ion-icon name="close-outline" slot="start"></ion-icon>
                Cancel
              </ion-button>
            </div>
          </div>
        </ion-content>
      </ng-template>
    </ion-modal>

    <!-- Contact Info Edit Modal -->
    <ion-modal [isOpen]="isEditingContact" (didDismiss)="cancelContactEdit()">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title>Edit Contact Information</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="cancelContactEdit()">
                <ion-icon name="close-outline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <form
            *ngIf="editingAdmin"
            (ngSubmit)="saveContactInfo()"
            #contactForm="ngForm"
          >
            <ion-list>
              <ion-item>
                <ion-label position="stacked">Phone Number</ion-label>
                <ion-input
                  type="tel"
                  [(ngModel)]="editingAdmin.phone"
                  name="phone"
                  placeholder="Enter phone number"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Role</ion-label>
                <ion-input
                  type="text"
                  [(ngModel)]="editingAdmin.role"
                  name="role"
                  placeholder="Enter role"
                  readonly
                ></ion-input>
              </ion-item>
            </ion-list>

            <div class="form-actions">
              <ion-button expand="block" type="submit">
                <ion-icon name="save-outline" slot="start"></ion-icon>
                Save Changes
              </ion-button>
              <ion-button
                expand="block"
                fill="outline"
                color="medium"
                (click)="cancelContactEdit()"
              >
                <ion-icon name="close-outline" slot="start"></ion-icon>
                Cancel
              </ion-button>
            </div>
          </form>
        </ion-content>
      </ng-template>
    </ion-modal>

    <!-- Group Details Modal -->
    <ion-modal [isOpen]="!!selectedGroup" (didDismiss)="selectedGroup = null">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title>Group Details</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="selectedGroup = null">
                <ion-icon name="close-outline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-card *ngIf="selectedGroup">
            <ion-card-header>
              <ion-card-title>{{ selectedGroup.name }}</ion-card-title>
              <ion-chip
                [color]="
                  selectedGroup.status === 'active' ? 'success' : 'medium'
                "
              >
                {{ selectedGroup.status | titlecase }}
              </ion-chip>
            </ion-card-header>
            <ion-card-content>
              <ion-list>
                <ion-item>
                  <ion-icon
                    name="information-circle-outline"
                    slot="start"
                  ></ion-icon>
                  <ion-label>
                    <h2>Description</h2>
                    <p>
                      {{
                        selectedGroup.description || 'No description available'
                      }}
                    </p>
                  </ion-label>
                </ion-item>

                <ion-item>
                  <ion-icon name="people-outline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>Members</h2>
                    <p>{{ selectedGroup.memberCount }} members</p>
                  </ion-label>
                </ion-item>

                <ion-item>
                  <ion-icon name="shield-outline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>Admin Role</h2>
                    <p>{{ selectedGroup.adminRole }}</p>
                  </ion-label>
                </ion-item>

                <ion-item>
                  <ion-icon name="calendar-outline" slot="start"></ion-icon>
                  <ion-label>
                    <h2>Created</h2>
                    <p>{{ selectedGroup.createdAt | date : 'medium' }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>

              <div class="group-actions">
                <ion-button
                  expand="block"
                  (click)="navigateToGroup(selectedGroup)"
                >
                  <ion-icon name="open-outline" slot="start"></ion-icon>
                  View Full Details
                </ion-button>
              </div>
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

      .profile-header {
        display: flex;
        align-items: center;
        padding: 20px;
        background: var(--ion-color-light);
        border-radius: 8px;
        margin-bottom: 20px;
      }

      .profile-picture-container {
        position: relative;
        margin-right: 20px;
      }

      .profile-picture {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: var(--ion-color-light);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .profile-picture img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .profile-picture.no-image {
        border: 3px solid var(--ion-color-medium);
      }

      .profile-picture ion-icon {
        font-size: 64px;
        color: var(--ion-color-medium);
      }

      .edit-picture-button {
        position: absolute;
        bottom: -5px;
        right: -5px;
        --padding-start: 8px;
        --padding-end: 8px;
        --padding-top: 8px;
        --padding-bottom: 8px;
        --border-radius: 50%;
        margin: 0;
        background: var(--ion-color-light);
      }

      .profile-info {
        flex: 1;
      }

      .profile-info h1 {
        margin: 0 0 5px 0;
        font-size: 24px;
        font-weight: bold;
      }

      .role {
        color: var(--ion-color-medium);
        margin: 0 0 10px 0;
      }

      .profile-sections {
        margin-bottom: 20px;
      }

      .permissions-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 8px;
      }

      .preview-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      }

      .image-preview {
        max-width: 300px;
        max-height: 300px;
        border-radius: 8px;
        margin-bottom: 20px;
      }

      .preview-actions {
        width: 100%;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .form-actions {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .group-actions {
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
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
    IonSegment,
    IonSegmentButton,
    IonInput,
  ],
})
export class GroupAdminListPage implements OnInit {
  selectedImage: string | null = null;
  isEditingContact = false;
  editingAdmin: GroupAdmin | null = null;
  selectedGroup: GroupDetails | null = null;
  selectedAdmin: GroupAdmin | null = null;
  searchTerm = '';
  statusFilter = 'all';
  sortBy = 'name';
  profileSection = 'info';

  admins: GroupAdmin[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      status: 'active',
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      groupCount: 3,
      permissions: ['manage_users', 'view_reports', 'edit_settings'],
      phone: '+1 234 567 8900',
      role: 'Group Admin',
      lastActivity: [
        {
          action: 'Updated group settings',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          action: 'Added new member',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
      ],
      associatedGroups: [
        {
          id: 'g1',
          name: 'Premier League Predictions A',
          role: 'Group Admin',
        },
        {
          id: 'g2',
          name: 'Premier League Predictions B',
          role: 'Group Admin',
        },
        {
          id: 'g3',
          name: 'Premier League Predictions C',
          role: 'Group Admin',
        },
      ],
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      status: 'active',
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      groupCount: 2,
      permissions: ['manage_users', 'view_reports'],
      phone: '+1 234 567 8901',
      role: 'Group Admin',
      lastActivity: [
        {
          action: 'Approved new player request',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
        },
      ],
      associatedGroups: [
        {
          id: 'g4',
          name: 'Premier League Predictions D',
          role: 'Group Admin',
        },
        {
          id: 'g5',
          name: 'Premier League Predictions E',
          role: 'Group Admin',
        },
      ],
    },
  ];

  filteredAdmins: GroupAdmin[] = [];

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
      cameraOutline,
      mailOutline,
      callOutline,
      businessOutline,
      calendarOutline,
      peopleOutline,
      closeOutline,
      imageOutline,
      saveOutline,
      informationCircleOutline,
      openOutline,
      personCircleOutline,
    });
  }

  ngOnInit() {
    this.filteredAdmins = [...this.admins];
  }

  filterAdmins() {
    this.filteredAdmins = this.admins.filter((admin) => {
      const matchesSearch =
        !this.searchTerm ||
        admin.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        this.statusFilter === 'all' || admin.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sort the filtered admins
    this.filteredAdmins.sort((a, b) => {
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

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        await this.toastService.showToast(
          'Please select an image file',
          'error'
        );
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        await this.toastService.showToast(
          'Image size should be less than 5MB',
          'error'
        );
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadProfilePicture() {
    if (!this.selectedImage || !this.selectedAdmin) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the admin's profile picture
      this.selectedAdmin.profilePicture = this.selectedImage;

      await this.toastService.showToast(
        'Profile picture updated successfully',
        'success'
      );
      this.cancelImageUpload();
    } catch (error) {
      await this.toastService.showToast(
        'Failed to update profile picture',
        'error'
      );
    }
  }

  cancelImageUpload() {
    this.selectedImage = null;
  }

  editContactInfo() {
    if (!this.selectedAdmin) return;

    // Create a copy of the admin for editing
    this.editingAdmin = {
      ...this.selectedAdmin,
      phone: this.selectedAdmin.phone || '',
      role: this.selectedAdmin.role || '',
    };
    this.isEditingContact = true;
  }

  async saveContactInfo() {
    if (!this.editingAdmin || !this.selectedAdmin) return;

    try {
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the admin's contact information
      this.selectedAdmin.phone = this.editingAdmin.phone;
      this.selectedAdmin.role = this.editingAdmin.role;

      await this.toastService.showToast(
        'Contact information updated successfully',
        'success'
      );
      this.cancelContactEdit();
    } catch (error) {
      await this.toastService.showToast(
        'Failed to update contact information',
        'error'
      );
    }
  }

  cancelContactEdit() {
    this.isEditingContact = false;
    this.editingAdmin = null;
  }

  async viewGroup(group: any) {
    try {
      // TODO: Replace with actual API call
      // Simulating API call to get group details
      await new Promise((resolve) => setTimeout(resolve, 500));

      this.selectedGroup = {
        id: group.id,
        name: group.name,
        description: 'Sample group description',
        memberCount: Math.floor(Math.random() * 50) + 1,
        createdAt: new Date(),
        status: 'active',
        adminRole: group.role,
      };
    } catch (error) {
      await this.toastService.showToast(
        'Failed to load group details',
        'error'
      );
    }
  }

  async navigateToGroup(group: GroupDetails) {
    // TODO: Replace with actual navigation
    await this.toastService.showToast(
      'Navigating to group details...',
      'success'
    );
    this.selectedGroup = null;
  }
}
