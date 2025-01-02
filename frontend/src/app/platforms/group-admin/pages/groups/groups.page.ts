import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonBadge,
  IonIcon,
  IonList,
  IonModal,
  IonListHeader,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonToggle,
  IonAlert,
  IonRippleEffect,
} from '@ionic/angular/standalone';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  copyOutline,
  addOutline,
  starOutline,
  trashOutline,
  settingsOutline,
  searchOutline,
  banOutline,
  checkmarkCircleOutline,
  personRemoveOutline,
  shieldOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface GroupMember {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
  status: 'active' | 'inactive';
  role: 'admin' | 'player';
}

interface GroupSettings {
  allowPlayerInvites: boolean;
  autoApproveJoins: boolean;
  showLeaderboard: boolean;
  allowMemberChat: boolean;
}

interface Group {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  createdAt: Date;
  members: GroupMember[];
  settings: GroupSettings;
}

@Component({
  selector: 'app-groups',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>My Groups</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Create New Group Card -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Create New Group</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form [formGroup]="groupForm" (ngSubmit)="createGroup()">
            <ion-item>
              <ion-input
                type="text"
                formControlName="name"
                placeholder="Group Name"
                [clearInput]="true"
              ></ion-input>
            </ion-item>

            <div class="ion-margin-top">
              <ion-button
                expand="block"
                type="submit"
                [disabled]="!groupForm.valid || isLoading"
              >
                <ion-icon name="add-outline" slot="start"></ion-icon>
                <ion-spinner *ngIf="isLoading"></ion-spinner>
                <span *ngIf="!isLoading">Create Group</span>
              </ion-button>
            </div>
          </form>
        </ion-card-content>
      </ion-card>

      <!-- Existing Groups List -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>My Groups</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item
              *ngFor="let group of groups"
              button
              detail
              (click)="showGroupDetails(group)"
            >
              <ion-label>
                <h2>{{ group.name }}</h2>
                <p>Created: {{ group.createdAt | date }}</p>
                <p>
                  Members:
                  <ion-badge color="primary">{{ group.memberCount }}</ion-badge>
                </p>
                <p>
                  Group Code:
                  <strong>{{ group.code }}</strong>
                  <ion-button
                    fill="clear"
                    size="small"
                    (click)="copyCode($event, group.code)"
                  >
                    <ion-icon name="copy-outline"></ion-icon>
                  </ion-button>
                </p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <!-- Enhanced Group Details Modal -->
      <ion-modal [isOpen]="!!selectedGroup" (didDismiss)="selectedGroup = null">
        <ng-template>
          <ion-header>
            <ion-toolbar>
              <ion-title>{{ selectedGroup?.name }}</ion-title>
              <ion-buttons slot="end">
                <ion-button (click)="selectedGroup = null">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-toolbar>
              <ion-segment [(ngModel)]="selectedTab">
                <ion-segment-button value="members">
                  <ion-label>Members</ion-label>
                </ion-segment-button>
                <ion-segment-button value="settings">
                  <ion-label>Settings</ion-label>
                </ion-segment-button>
              </ion-segment>
            </ion-toolbar>
          </ion-header>

          <ion-content class="ion-padding" *ngIf="selectedGroup">
            <!-- Members Tab -->
            <div *ngIf="selectedTab === 'members'">
              <ion-searchbar
                placeholder="Search members"
                [(ngModel)]="searchTerm"
                (ionInput)="filterMembers()"
              ></ion-searchbar>

              <ion-list>
                <ion-list-header>
                  <ion-label>Members ({{ filteredMembers.length }})</ion-label>
                </ion-list-header>

                <ion-item *ngFor="let member of filteredMembers">
                  <ion-label>
                    <h2>{{ member.name }}</h2>
                    <p>{{ member.email }}</p>
                    <p>Joined: {{ member.joinedAt | date }}</p>
                    <p>Status: {{ member.status }}</p>
                  </ion-label>
                  <ion-badge
                    slot="end"
                    [color]="member.role === 'admin' ? 'warning' : 'primary'"
                  >
                    {{ member.role }}
                  </ion-badge>
                  <ion-buttons slot="end">
                    <ion-button
                      fill="clear"
                      (click)="manageMemberRole(member)"
                      [title]="
                        member.role === 'admin'
                          ? 'Demote to Player'
                          : 'Promote to Admin'
                      "
                      class="role-button"
                      [class.admin-role]="member.role === 'admin'"
                    >
                      <ion-icon
                        [name]="
                          member.role === 'admin'
                            ? 'shield-checkmark-outline'
                            : 'shield-outline'
                        "
                        slot="icon-only"
                      ></ion-icon>
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-button>
                    <ion-button
                      fill="clear"
                      [color]="
                        member.status === 'active' ? 'warning' : 'success'
                      "
                      (click)="toggleMemberStatus(member)"
                      title="Toggle Status"
                    >
                      <ion-icon
                        [name]="
                          member.status === 'active'
                            ? 'ban-outline'
                            : 'checkmark-circle-outline'
                        "
                        slot="icon-only"
                      ></ion-icon>
                    </ion-button>
                    <ion-button
                      fill="clear"
                      color="danger"
                      (click)="removeMember(member)"
                      title="Remove Member"
                    >
                      <ion-icon
                        name="trash-outline"
                        slot="icon-only"
                      ></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-item>
              </ion-list>
            </div>

            <!-- Settings Tab -->
            <div *ngIf="selectedTab === 'settings'" class="ion-padding">
              <ion-list>
                <ion-item>
                  <ion-label>Allow Player Invites</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup.settings.allowPlayerInvites"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>

                <ion-item>
                  <ion-label>Auto-approve Joins</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup.settings.autoApproveJoins"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>

                <ion-item>
                  <ion-label>Show Leaderboard</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup.settings.showLeaderboard"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>

                <ion-item>
                  <ion-label>Allow Member Chat</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup.settings.allowMemberChat"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>
              </ion-list>
            </div>
          </ion-content>
        </ng-template>
      </ion-modal>
    </ion-content>
  `,
  styles: [
    `
      ion-item {
        margin-bottom: 10px;
        --background: transparent;
      }
      ion-badge {
        margin-right: 8px;
      }
      ion-segment {
        --background: var(--ion-color-light);
      }
      ion-searchbar {
        margin-bottom: 1rem;
      }
      .settings-section {
        margin-bottom: 2rem;
      }
      ion-toggle {
        padding-right: 1rem;
      }
      .role-button {
        transition: all 0.3s ease;
      }
      .role-button.admin-role {
        color: var(--ion-color-warning);
      }
      @keyframes roleChange {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
      .role-changed {
        animation: roleChange 0.5s ease;
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
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSpinner,
    IonBadge,
    IonIcon,
    IonList,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    DatePipe,
    IonModal,
    IonListHeader,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    IonSearchbar,
    IonToggle,
    IonAlert,
    IonRippleEffect,
  ],
})
export class GroupsPage {
  groupForm: FormGroup;
  isLoading = false;
  groups: Group[] = [];
  selectedGroup: Group | null = null;
  selectedTab = 'members';
  searchTerm = '';
  filteredMembers: GroupMember[] = [];

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    addIcons({
      copyOutline,
      addOutline,
      starOutline,
      trashOutline,
      settingsOutline,
      searchOutline,
      banOutline,
      checkmarkCircleOutline,
      personRemoveOutline,
      shieldOutline,
      shieldCheckmarkOutline,
    });

    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });

    // Load mock data
    this.loadMockGroups();
  }

  private loadMockGroups() {
    this.groups = [
      {
        id: '1',
        name: 'Premier League Predictions',
        code: 'PREM2024',
        memberCount: 12,
        createdAt: new Date('2024-01-15'),
        members: [],
        settings: {
          allowPlayerInvites: true,
          autoApproveJoins: false,
          showLeaderboard: true,
          allowMemberChat: true,
        },
      },
      {
        id: '2',
        name: 'Champions League Group',
        code: 'UCL2024',
        memberCount: 8,
        createdAt: new Date('2024-02-01'),
        members: [],
        settings: {
          allowPlayerInvites: true,
          autoApproveJoins: false,
          showLeaderboard: true,
          allowMemberChat: true,
        },
      },
    ];
  }

  async createGroup() {
    if (this.groupForm.valid) {
      this.isLoading = true;
      try {
        // Generate a unique code (this will be done by backend)
        const code =
          'GROUP' + Math.random().toString(36).substring(2, 7).toUpperCase();

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newGroup: Group = {
          id: Date.now().toString(),
          name: this.groupForm.value.name,
          code: code,
          memberCount: 0,
          createdAt: new Date(),
          members: [],
          settings: {
            allowPlayerInvites: true,
            autoApproveJoins: false,
            showLeaderboard: true,
            allowMemberChat: true,
          },
        };

        this.groups.unshift(newGroup);
        this.groupForm.reset();

        await this.toastService.showToast(
          'Group created successfully! Share the code with players to join.',
          'success'
        );
      } catch (error) {
        await this.toastService.showToast(
          'Error creating group. Please try again.',
          'error'
        );
      } finally {
        this.isLoading = false;
      }
    }
  }

  async copyCode(event: Event, code: string) {
    event.stopPropagation(); // Prevent group details from opening
    try {
      await navigator.clipboard.writeText(code);
      await this.toastService.showToast(
        'Group code copied to clipboard',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error copying code', 'error');
    }
  }

  async showGroupDetails(group: Group) {
    this.selectedGroup = group;
    this.filteredMembers = [...group.members];
  }

  filterMembers() {
    if (!this.selectedGroup) return;

    const term = this.searchTerm.toLowerCase();
    this.filteredMembers = this.selectedGroup.members.filter(
      (member) =>
        member.name.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term)
    );
  }

  async manageMemberRole(member: GroupMember) {
    const isPromotion = member.role === 'player';
    const action = isPromotion ? 'promote' : 'demote';
    const newRole = isPromotion ? 'admin' : 'player';

    const alert = document.createElement('ion-alert');
    alert.header = `${isPromotion ? 'Promote' : 'Demote'} Member`;
    alert.message = `
      <p>Are you sure you want to ${action} <strong>${
      member.name
    }</strong> to ${newRole}?</p>
      ${
        isPromotion
          ? `
        <p>As an admin, they will be able to:</p>
        <ul>
          <li>Manage group members</li>
          <li>Change group settings</li>
          <li>View all predictions</li>
          <li>Manage deadlines</li>
        </ul>
      `
          : `
        <p>They will lose all admin privileges and become a regular player.</p>
      `
      }
    `;
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Confirm',
        role: 'confirm',
        handler: async () => {
          try {
            // Mock API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Update role
            member.role = newRole;

            // Add animation class
            const memberElement = document.querySelector(
              `[data-member-id="${member.id}"]`
            );
            memberElement?.classList.add('role-changed');
            setTimeout(() => {
              memberElement?.classList.remove('role-changed');
            }, 500);

            await this.toastService.showToast(
              `${member.name} has been ${action}d to ${newRole}`,
              'success'
            );
          } catch (error) {
            await this.toastService.showToast(
              `Failed to ${action} member`,
              'error'
            );
          }
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  async removeMember(member: GroupMember) {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (this.selectedGroup) {
        this.selectedGroup.members = this.selectedGroup.members.filter(
          (m) => m.id !== member.id
        );
        this.selectedGroup.memberCount--;
      }
      await this.toastService.showToast(
        'Member removed successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to remove member', 'error');
    }
  }

  async toggleMemberStatus(member: GroupMember) {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      member.status = member.status === 'active' ? 'inactive' : 'active';
      await this.toastService.showToast(
        `Member ${member.status === 'active' ? 'activated' : 'deactivated'}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast(
        'Failed to update member status',
        'error'
      );
    }
  }

  async saveSettings() {
    if (!this.selectedGroup) return;

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.toastService.showToast(
        'Settings saved successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to save settings', 'error');
    }
  }
}
