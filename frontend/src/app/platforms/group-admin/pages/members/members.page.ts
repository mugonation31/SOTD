import { Component, OnInit, OnDestroy } from '@angular/core';
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
  IonSkeletonText,
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
  banOutline,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { Subscription } from 'rxjs';

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
            <div class="member-segments">
              <ion-segment
                [(ngModel)]="selectedFilter"
                (ionChange)="filterMembers($event)"
                mode="ios"
              >
                <ion-segment-button value="all" title="View all members">
                  <div class="segment-label">
                    <ion-icon name="people-outline"></ion-icon>
                    <span>All Members</span>
                    <span class="member-count">{{
                      getMemberCount('all')
                    }}</span>
                  </div>
                </ion-segment-button>

                <ion-segment-button value="admins" title="View admin members">
                  <div class="segment-label">
                    <ion-icon name="shield-outline"></ion-icon>
                    <span>Admins</span>
                    <span class="member-count">{{
                      getMemberCount('admins')
                    }}</span>
                  </div>
                </ion-segment-button>

                <ion-segment-button value="players" title="View player members">
                  <div class="segment-label">
                    <ion-icon name="person-outline"></ion-icon>
                    <span>Players</span>
                    <span class="member-count">{{
                      getMemberCount('players')
                    }}</span>
                  </div>
                </ion-segment-button>

                <ion-segment-button
                  value="removed"
                  title="View removed members"
                >
                  <div class="segment-label">
                    <ion-icon name="ban-outline"></ion-icon>
                    <span>Removed</span>
                    <span class="member-count">{{
                      getMemberCount('removed')
                    }}</span>
                  </div>
                </ion-segment-button>
              </ion-segment>
            </div>

            <ion-searchbar
              placeholder="Search members"
              (ionInput)="searchMembers($event)"
              class="member-searchbar"
              [debounce]="300"
            ></ion-searchbar>
          </ion-col>
        </ion-row>

        <!-- Members List -->
        <ion-row>
          <ion-col size="12">
            <ion-list class="member-list" [class.loading]="isLoading">
              <!-- Loading Skeleton -->
              <ion-item *ngIf="isLoading" lines="none">
                <ion-avatar slot="start">
                  <ion-skeleton-text [animated]="true"></ion-skeleton-text>
                </ion-avatar>
                <ion-label>
                  <h2>
                    <ion-skeleton-text
                      [animated]="true"
                      style="width: 50%"
                    ></ion-skeleton-text>
                  </h2>
                  <p>
                    <ion-skeleton-text
                      [animated]="true"
                      style="width: 70%"
                    ></ion-skeleton-text>
                  </p>
                </ion-label>
              </ion-item>

              <!-- Member Items -->
              <ion-item
                *ngFor="let member of filteredMembers"
                lines="none"
                class="member-item"
              >
                <ion-avatar
                  slot="start"
                  [class.admin-avatar]="member.role === 'admin'"
                >
                  <ion-icon
                    size="large"
                    [name]="
                      member.role === 'admin'
                        ? 'shield-outline'
                        : 'person-outline'
                    "
                    [color]="member.role === 'admin' ? 'dark' : 'medium'"
                  ></ion-icon>
                </ion-avatar>

                <ion-label>
                  <h2>{{ member.name }}</h2>
                  <p>{{ member.email }}</p>
                  <p class="member-meta">
                    <span class="join-date"
                      >Joined: {{ member.joinedAt | date : 'medium' }}</span
                    >
                    <ion-badge
                      [color]="
                        member.status === 'active' ? 'success' : 'danger'
                      "
                      class="status-badge"
                    >
                      {{ member.status | titlecase }}
                    </ion-badge>
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
                    fill="clear"
                    size="small"
                    class="action-button make-admin-btn"
                    (click)="makeAdmin(member)"
                  >
                    <ion-icon name="shield-outline" slot="start"></ion-icon>
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
                    fill="clear"
                    size="small"
                    class="action-button revoke-btn"
                    (click)="revokeAdminStatus(member)"
                  >
                    <ion-icon
                      name="person-remove-outline"
                      slot="start"
                    ></ion-icon>
                    Revoke Admin
                  </ion-button>

                  <!-- Remove Member -->
                  <ion-button
                    *ngIf="
                      selectedFilter !== 'removed' &&
                      member.id !== currentAdminId &&
                      member.status === 'active'
                    "
                    fill="clear"
                    size="small"
                    color="danger"
                    class="action-button remove-btn"
                    (click)="removeMember(member)"
                  >
                    <ion-icon name="trash-outline" slot="start"></ion-icon>
                    Remove
                  </ion-button>

                  <!-- Readmit Member -->
                  <ion-button
                    *ngIf="selectedFilter === 'removed'"
                    fill="clear"
                    size="small"
                    color="success"
                    class="action-button readmit-btn"
                    (click)="readmitMember(member)"
                  >
                    <ion-icon
                      name="checkmark-circle-outline"
                      slot="start"
                    ></ion-icon>
                    Readmit
                  </ion-button>
                </div>
              </ion-item>

              <!-- Empty State -->
              <ion-item
                *ngIf="filteredMembers.length === 0 && !isLoading"
                lines="none"
                class="empty-state"
              >
                <ion-label class="ion-text-center">
                  <ion-icon name="people-outline" size="large"></ion-icon>
                  <h2>No members found</h2>
                  <p>Try adjusting your search or filters</p>
                </ion-label>
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

      /* Member Segments */
      .member-segments {
        padding: 8px 16px;
        background: var(--ion-color-light);
        border-radius: 12px;
        margin-bottom: 16px;

        ion-segment {
          --background: transparent;

          ion-segment-button {
            --background: transparent;
            --background-checked: transparent;
            --color: var(--ion-color-medium);
            --color-checked: var(--ion-color-dark);
            --indicator-color: transparent;
            min-height: 40px;
            font-size: 14px;
            font-weight: 500;
            text-transform: none;
            transition: all 0.3s ease;
            position: relative;

            &::part(indicator) {
              display: none;
            }

            &.segment-button-checked {
              --background: transparent;
              --color: var(--ion-color-dark);
              font-weight: 600;

              &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 25%;
                width: 50%;
                height: 3px;
                background: var(--ion-color-dark);
                border-radius: 2px;
              }

              .member-count {
                background: var(--ion-color-dark);
                color: var(--ion-color-light);
              }

              ion-icon {
                color: var(--ion-color-dark);
              }
            }
          }
        }
      }

      .segment-label {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 8px;

        ion-icon {
          font-size: 18px;
          color: var(--ion-color-medium);
          transition: color 0.3s ease;
        }
      }

      .member-count {
        background: var(--ion-color-light-shade);
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
        transition: all 0.3s ease;
      }

      /* Search Bar */
      .member-searchbar {
        margin: 1rem 0;
        --border-radius: 8px;
        --box-shadow: none;
        --background: var(--ion-color-light);
      }

      /* Member List */
      .member-list {
        background: transparent;

        &.loading {
          opacity: 0.7;
        }
      }

      .member-item {
        --padding-start: 1rem;
        --padding-end: 1rem;
        --padding-top: 1rem;
        --padding-bottom: 1rem;
        --background: var(--ion-color-light);
        margin-bottom: 0.5rem;
        border-radius: 8px;
        transition: transform 0.2s ease;

        &:hover {
          transform: translateX(4px);
        }
      }

      /* Avatar Styles */
      ion-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--ion-color-light-shade);
        width: 48px;
        height: 48px;
        margin-right: 1rem;
        transition: background 0.3s ease;

        &.admin-avatar {
          background: var(--ion-color-light-shade);
        }

        ion-icon {
          font-size: 24px;
        }
      }

      /* Member Info */
      ion-label {
        h2 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: var(--ion-color-dark);
        }

        p {
          font-size: 0.9rem;
          color: var(--ion-color-medium);
          margin: 2px 0;
        }
      }

      .member-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 8px;

        .join-date {
          font-size: 0.8rem;
        }

        .status-badge {
          font-size: 0.7rem;
          font-weight: 500;
          padding: 4px 8px;
        }
      }

      /* Action Buttons */
      .member-actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .action-button {
        --padding-start: 8px;
        --padding-end: 8px;
        height: 32px;
        font-size: 0.9rem;

        ion-icon {
          font-size: 16px;
          margin-right: 4px;
        }

        &:hover {
          opacity: 0.8;
        }
      }

      /* Empty State */
      .empty-state {
        --background: transparent;
        margin-top: 2rem;

        ion-label {
          text-align: center;

          ion-icon {
            font-size: 48px;
            color: var(--ion-color-medium);
            margin-bottom: 1rem;
          }

          h2 {
            font-size: 1.2rem;
            color: var(--ion-color-dark);
            margin-bottom: 0.5rem;
          }

          p {
            font-size: 0.9rem;
            color: var(--ion-color-medium);
          }
        }
      }

      /* Responsive Adjustments */
      @media (max-width: 768px) {
        .member-segments {
          padding: 4px 8px;
        }

        .segment-label {
          flex-direction: column;
          gap: 4px;

          ion-icon {
            font-size: 20px;
          }
        }

        .member-actions {
          flex-direction: column;
          align-items: flex-end;
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
    IonSkeletonText,
    NgFor,
    NgIf,
    DatePipe,
    CurrencyPipe,
    TitleCasePipe,
    RouterLink,
    FormsModule,
  ],
})
export class MembersPage implements OnInit, OnDestroy {
  selectedFilter = 'all';
  searchTerm = '';
  currentAdminId = '1';
  isLoading = false;

  // Initialize empty - will be populated from real group data
  members: Member[] = [];

  filteredMembers: Member[] = [];

  private subscription?: Subscription;

  constructor(
    private groupService: GroupService,
    private authService: AuthService
  ) {
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
      banOutline,
    });
  }

  ngOnInit() {
    console.log('🚀 Members page: Initializing...');
    
    // Set current admin ID from logged-in user
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentAdminId = currentUser.id;
    }
    
    this.loadMembersFromGroups();
    this.applyFilters();
    this.subscribeToGroupUpdates();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadMembersFromGroups() {
    // Get all groups where current user is admin and extract members
    const groups = this.groupService.getAdminGroups();
    const allMembers: Member[] = [];

    console.log('🔄 Members page: Loading members from admin groups:', groups.length);

    groups.forEach(group => {
      console.log(`📋 Group "${group.name}": ${group.members.length} members`, 
        group.members.map(m => ({ name: m.name, role: m.role, email: m.email })));
      
      group.members.forEach(member => {
        allMembers.push({
          id: member.id,
          name: member.name,
          email: member.email,
          joinedAt: member.joinedAt,
          groupName: group.name,
          role: member.role,
          predictions: 0, // TODO: Get from predictions service
          status: member.status === 'inactive' ? 'removed' : member.status,
        });
      });
    });

    this.members = allMembers;
    console.log('✅ Members page: Total members loaded:', allMembers.length);
    console.log('📊 Members breakdown:', {
      total: allMembers.length,
      admins: allMembers.filter(m => m.role === 'admin').length,
      players: allMembers.filter(m => m.role === 'player').length,
      active: allMembers.filter(m => m.status === 'active').length
    });
  }

  getMemberCount(filter: string): number {
    switch (filter) {
      case 'all':
        return this.members.length;
      case 'admins':
        return this.members.filter(
          (m) => m.role === 'admin' && m.status === 'active'
        ).length;
      case 'players':
        return this.members.filter(
          (m) => m.role === 'player' && m.status === 'active'
        ).length;
      case 'removed':
        return this.members.filter((m) => m.status === 'removed').length;
      default:
        return 0;
    }
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
    this.isLoading = true;

    // Simulate API delay
    setTimeout(() => {
      let filtered = [...this.members];

      // Apply status/role filter
      switch (this.selectedFilter) {
        case 'admins':
          filtered = filtered.filter(
            (m) => m.role === 'admin' && m.status === 'active'
          );
          break;
        case 'players':
          filtered = filtered.filter(
            (m) => m.role === 'player' && m.status === 'active'
          );
          break;
        case 'removed':
          filtered = filtered.filter((m) => m.status === 'removed');
          break;
        default: // 'all'
          filtered = filtered.filter((m) => m.status === 'active');
      }

      // Apply search filter
      if (this.searchTerm) {
        filtered = filtered.filter(
          (m) =>
            m.name.toLowerCase().includes(this.searchTerm) ||
            m.email.toLowerCase().includes(this.searchTerm)
        );
      }

      this.filteredMembers = filtered;
      this.isLoading = false;
    }, 300);
  }

  async makeAdmin(member: Member) {
    try {
      this.isLoading = true;
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      member.role = 'admin';
      this.applyFilters();

      // Show success message (implement your toast service)
      console.log('Member promoted to admin successfully');
    } catch (error) {
      console.error('Error making member admin:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async revokeAdminStatus(member: Member) {
    try {
      this.isLoading = true;
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      member.role = 'player';
      this.applyFilters();

      // Show success message
      console.log('Admin status revoked successfully');
    } catch (error) {
      console.error('Error revoking admin status:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async removeMember(member: Member) {
    try {
      this.isLoading = true;
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      member.status = 'removed';
      member.removedAt = new Date();
      this.applyFilters();

      // Show success message
      console.log('Member removed successfully');
    } catch (error) {
      console.error('Error removing member:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async readmitMember(member: Member) {
    try {
      this.isLoading = true;
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      member.status = 'active';
      member.removedAt = undefined;
      this.applyFilters();

      // Show success message
      console.log('Member readmitted successfully');
    } catch (error) {
      console.error('Error readmitting member:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private subscribeToGroupUpdates() {
    this.subscription = this.groupService.groups$.subscribe(() => {
      console.log('🔄 Members page: Received group update, reloading members...');
      this.loadMembersFromGroups();
      this.applyFilters();
    });
  }
}
