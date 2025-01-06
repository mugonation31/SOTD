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
  IonIcon,
  IonBadge,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonNote,
  IonAvatar,
} from '@ionic/angular/standalone';
import {
  NgFor,
  NgIf,
  DatePipe,
  CurrencyPipe,
  TitleCasePipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline,
  peopleOutline,
  personAddOutline,
  filterOutline,
  searchOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  warningOutline,
  createOutline,
  trashOutline,
  trophyOutline,
  shieldOutline,
  shieldCheckmarkOutline,
  personRemoveOutline,
} from 'ionicons/icons';

interface Member {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
  groupName: string;
  role: 'admin' | 'player';
  hasPaid?: boolean;
  predictions?: number;
  status: 'active' | 'removed';
  removedAt?: Date;
}

@Component({
  selector: 'app-members',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Members Management</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <!-- Filters -->
        <ion-row>
          <ion-col size="12">
            <ion-segment
              [value]="selectedFilter"
              (ionChange)="filterMembers($event)"
            >
              <ion-segment-button value="all">
                <ion-label>All Members</ion-label>
              </ion-segment-button>
              <ion-segment-button value="admins">
                <ion-label>Admins</ion-label>
              </ion-segment-button>
              <ion-segment-button value="players">
                <ion-label>Players</ion-label>
              </ion-segment-button>
              <ion-segment-button value="removed">
                <ion-label>Removed</ion-label>
              </ion-segment-button>
            </ion-segment>

            <ion-searchbar
              placeholder="Search members"
              (ionInput)="searchMembers($event)"
            ></ion-searchbar>
          </ion-col>
        </ion-row>

        <!-- Members List -->
        <ion-row>
          <ion-col size="12">
            <ion-list>
              <ion-item *ngFor="let member of filteredMembers">
                <ion-avatar slot="start">
                  <ion-icon
                    size="large"
                    [name]="
                      member.role === 'admin'
                        ? 'shield-outline'
                        : 'person-outline'
                    "
                    [color]="member.role === 'admin' ? 'primary' : 'medium'"
                  ></ion-icon>
                </ion-avatar>

                <ion-label>
                  <h2>{{ member.name }}</h2>
                  <p>{{ member.email }}</p>
                  <p class="member-meta">
                    Joined: {{ member.joinedAt | date : 'medium' }}
                  </p>
                </ion-label>

                <!-- Member Actions -->
                <div class="member-actions" slot="end">
                  <!-- Admin Management -->
                  <ion-button
                    *ngIf="
                      (selectedFilter === 'all' ||
                        selectedFilter === 'players') &&
                      member.role !== 'admin' &&
                      member.status === 'active'
                    "
                    fill="outline"
                    size="small"
                    class="make-admin-btn"
                  >
                    Make Admin
                  </ion-button>

                  <!-- Revoke Admin -->
                  <ion-button
                    *ngIf="
                      (selectedFilter === 'all' ||
                        selectedFilter === 'admins') &&
                      member.role === 'admin' &&
                      member.id !== currentAdminId &&
                      member.status === 'active'
                    "
                    fill="outline"
                    size="small"
                    class="revoke-btn"
                  >
                    Revoke Admin
                  </ion-button>

                  <!-- Remove Member -->
                  <ion-button
                    *ngIf="
                      selectedFilter !== 'removed' &&
                      member.id !== currentAdminId &&
                      member.status === 'active'
                    "
                    fill="outline"
                    size="small"
                    class="remove-btn"
                  >
                    Remove
                  </ion-button>

                  <!-- Readmit Member -->
                  <ion-button
                    *ngIf="selectedFilter === 'removed'"
                    fill="outline"
                    size="small"
                    class="readmit-btn"
                  >
                    Readmit
                  </ion-button>
                </div>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [
    `
      /* Container Styles */
      ion-grid {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
      }

      /* Segment Control Styles */
      ion-segment {
        margin-bottom: 1rem;
        max-width: 100%;
        overflow-x: auto;
      }

      ion-segment-button {
        min-width: 100px;
      }

      /* Search Bar Styles */
      ion-searchbar {
        margin: 1rem 0;
        max-width: 100%;
      }

      /* Member List Styles */
      ion-list {
        background: transparent;
      }

      ion-item {
        --padding-start: 1rem;
        --padding-end: 1rem;
        --padding-top: 0.75rem;
        --padding-bottom: 0.75rem;
        margin-bottom: 0.5rem;
        border-radius: 8px;
      }

      /* Avatar and Icon Styles */
      ion-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--ion-color-light);
        width: 40px;
        height: 40px;
        margin-right: 1rem;
      }

      ion-avatar ion-icon {
        font-size: 1.5rem;
      }

      /* Member Info Styles */
      .member-meta {
        font-size: 0.85rem;
        color: var(--ion-color-medium);
        margin-top: 0.25rem;
      }

      /* Action Buttons Styles */
      .member-actions {
        display: flex;
        gap: 0.75rem;
        align-items: center;
      }

      .member-actions ion-button {
        --padding-start: 1rem;
        --padding-end: 1rem;
        height: 2.25rem;
        font-weight: 500;
        text-transform: none;
        letter-spacing: 0;
        --border-radius: 8px;
        --border-width: 1.5px;
        transition: all 0.2s ease;
      }

      /* Make Admin Button */
      .make-admin-btn {
        --color: var(--ion-color-primary);
        --border-color: var(--ion-color-primary);
        --background: transparent;
        --background-hover: var(--ion-color-primary);
        --color-hover: var(--ion-color-primary-contrast);
      }

      /* Revoke Admin Button */
      .revoke-btn {
        --color: var(--ion-color-warning);
        --border-color: var(--ion-color-warning);
        --background: transparent;
        --background-hover: var(--ion-color-warning);
        --color-hover: var(--ion-color-warning-contrast);
      }

      /* Remove Button */
      .remove-btn {
        --color: var(--ion-color-danger);
        --border-color: var(--ion-color-danger);
        --background: transparent;
        --background-hover: var(--ion-color-danger);
        --color-hover: var(--ion-color-danger-contrast);
      }

      /* Readmit Button */
      .readmit-btn {
        --color: var(--ion-color-success);
        --border-color: var(--ion-color-success);
        --background: transparent;
        --background-hover: var(--ion-color-success);
        --color-hover: var(--ion-color-success-contrast);
      }

      /* Desktop Hover Effects */
      @media (min-width: 1025px) {
        .member-actions ion-button:hover {
          --background: var(--background-hover);
          --color: var(--color-hover);
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }

      /* Active/Pressed State */
      .member-actions ion-button:active {
        transform: translateY(0);
        box-shadow: none;
      }

      /* Responsive Styles */
      @media (max-width: 768px) {
        .member-actions {
          flex-direction: column;
          align-items: stretch;
          gap: 0.5rem;
        }

        .member-actions ion-button {
          width: 100%;
          margin: 0;
          --padding-top: 0.5rem;
          --padding-bottom: 0.5rem;
        }
      }

      @media (max-width: 480px) {
        .member-actions ion-button {
          font-size: 0.9rem;
          height: 2rem;
        }
      }

      /* Responsive Styles */
      @media (max-width: 768px) {
        ion-grid {
          padding: 0.5rem;
        }

        ion-item {
          --padding-start: 0.75rem;
          --padding-end: 0.75rem;
        }

        .member-actions {
          flex-direction: column;
          align-items: flex-end;
        }

        .member-actions ion-button {
          width: 100%;
        }
      }

      @media (max-width: 480px) {
        ion-avatar {
          width: 32px;
          height: 32px;
        }

        ion-item {
          --padding-top: 0.5rem;
          --padding-bottom: 0.5rem;
        }

        .member-meta {
          font-size: 0.75rem;
        }

        ion-segment-button {
          min-width: 80px;
          font-size: 0.9rem;
        }
      }

      /* Tablet Optimizations */
      @media (min-width: 769px) and (max-width: 1024px) {
        ion-grid {
          padding: 1.5rem;
        }

        .member-actions {
          gap: 0.75rem;
        }
      }

      /* Desktop Enhancements */
      @media (min-width: 1025px) {
        ion-item:hover {
          --background: var(--ion-color-light);
        }

        .member-actions ion-button {
          opacity: 0.8;
          transition: opacity 0.2s ease;
        }

        .member-actions ion-button:hover {
          opacity: 1;
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
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonAvatar,
    IonSegment,
    IonSegmentButton,
    IonSearchbar,
    NgFor,
    NgIf,
    DatePipe,
    CurrencyPipe,
    TitleCasePipe,
    RouterLink,
  ],
})
export class MembersPage implements OnInit {
  selectedFilter = 'all';
  searchTerm = '';
  currentAdminId = '1';

  // Add more mock data to test with
  members: Member[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      joinedAt: new Date(),
      groupName: 'Premier League 2024',
      role: 'admin',
      status: 'active',
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      joinedAt: new Date(),
      groupName: 'Premier League 2024',
      role: 'admin',
      status: 'active',
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      joinedAt: new Date(),
      groupName: 'Premier League 2024',
      role: 'player',
      status: 'active',
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@example.com',
      joinedAt: new Date(),
      groupName: 'Premier League 2024',
      role: 'player',
      status: 'removed',
      removedAt: new Date(),
    },
  ];

  filteredMembers: Member[] = [];

  constructor() {
    addIcons({
      personOutline,
      peopleOutline,
      personAddOutline,
      filterOutline,
      searchOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      warningOutline,
      createOutline,
      trashOutline,
      trophyOutline,
      shieldOutline,
      shieldCheckmarkOutline,
      personRemoveOutline,
    });
  }

  ngOnInit() {
    this.applyFilters();
  }

  filterMembers(event: any) {
    this.selectedFilter = event.detail.value;
    this.applyFilters();
  }

  searchMembers(event: any) {
    this.searchTerm = event.detail.value?.toLowerCase() || '';
    this.applyFilters();
  }

  applyFilters() {
    console.log('Applying filters, current filter:', this.selectedFilter);

    this.filteredMembers = this.members.filter((member) => {
      if (this.selectedFilter === 'removed') {
        return member.status === 'removed';
      }

      // For other tabs, only show active members
      if (member.status !== 'active') {
        return false;
      }

      switch (this.selectedFilter) {
        case 'admins':
          return member.role === 'admin';
        case 'players':
          return member.role === 'player';
        default: // 'all'
          return true;
      }
    });

    console.log('Filtered members:', this.filteredMembers);
  }

  async makeAdmin(member: Member) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Make Admin';
    alert.message = `Make ${member.name} an admin? They will have full management privileges.`;
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Confirm',
        handler: () => {
          member.role = 'admin';
          // Force UI update
          this.members = [...this.members];
          this.applyFilters();
          this.showToast(`${member.name} is now an admin`);
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  async revokeAdminStatus(member: Member) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Revoke Admin';
    alert.message = `Remove admin privileges from ${member.name}?`;
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Confirm',
        handler: () => {
          member.role = 'player';
          // Force UI update
          this.members = [...this.members];
          this.applyFilters();
          this.showToast(`Admin privileges removed from ${member.name}`);
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  async removeMember(member: Member) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Remove Member';
    alert.message = `Remove ${member.name} from the group?`;
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Remove',
        handler: () => {
          member.status = 'removed';
          member.removedAt = new Date();
          // Force UI update
          this.members = [...this.members];
          this.applyFilters();
          this.showToast(`${member.name} has been removed`);
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  async readmitMember(member: Member) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Readmit Member';
    alert.message = `Readmit ${member.name} as:`;
    alert.inputs = [
      {
        type: 'radio',
        label: 'Player',
        value: 'player',
        checked: true,
      },
      {
        type: 'radio',
        label: 'Admin',
        value: 'admin',
      },
    ];
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Readmit',
        handler: (role) => {
          member.status = 'active';
          member.role = role;
          member.removedAt = undefined;
          // Force UI update
          this.members = [...this.members];
          this.applyFilters();
          this.showToast(`${member.name} has been readmitted as ${role}`);
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  private async showToast(message: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 2000;
    toast.position = 'bottom';
    toast.color = 'dark';

    document.body.appendChild(toast);
    await toast.present();
  }
}
