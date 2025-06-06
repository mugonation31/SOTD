import { Component, OnInit } from '@angular/core';
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
  IonCardSubtitle,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonRange,
  AlertController,
} from '@ionic/angular/standalone';
import { NgIf, NgFor, DatePipe, CurrencyPipe } from '@angular/common';
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
  peopleOutline,
  trophyOutline,
  cashOutline,
  createOutline,
  closeOutline,
  personOutline,
  personAddOutline,
  lockClosedOutline,
  lockOpenOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { Router } from '@angular/router';
import { GroupService } from '@core/services/group.service';

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

interface GroupLeaderboardEntry {
  position: number;
  name: string;
  played: number;
  jokerUsed: number;
  totalPoints: number;
}

interface Group {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  createdAt: Date;
  members: GroupMember[];
  settings: GroupSettings;
  type: 'casual' | 'prize';
  entryFee?: number;
  paidMembers: number;
  totalPrizePool?: number;
  adminName: string;
  leaderboard: GroupLeaderboardEntry[];
}

interface CurrentAdmin {
  id: string;
  name: string;
  email: string;
  members: GroupMember[];
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
      <!-- Create Group Button -->
      <ion-button expand="block" (click)="showCreateForm()" class="create-group-btn">
        <ion-icon slot="start" name="add-outline"></ion-icon>
        Create New Group
      </ion-button>

      <!-- Create Group Form -->
      <ion-card *ngIf="isCreateModalOpen">
        <ion-card-header>
          <ion-card-title>Create New Group</ion-card-title>
          <ion-button fill="clear" (click)="isCreateModalOpen = false" slot="end">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </ion-card-header>

        <ion-card-content>
          <form [formGroup]="groupForm" (ngSubmit)="createGroup()">
            <!-- Group Name -->
            <ion-item>
              <ion-label position="stacked">Group Name</ion-label>
              <ion-input 
                formControlName="name" 
                placeholder="Enter a memorable name for your group"
                [clearInput]="true"
              ></ion-input>
            </ion-item>

            <!-- Group Type Selection -->
            <ion-list-header>
              <ion-label>Group Type</ion-label>
            </ion-list-header>
            
            <ion-segment formControlName="type" (ionChange)="onGroupTypeChange()">
              <ion-segment-button value="casual">
                <ion-icon name="trophy-outline"></ion-icon>
                <ion-label>Casual</ion-label>
              </ion-segment-button>
              <ion-segment-button value="prize">
                <ion-icon name="cash-outline"></ion-icon>
                <ion-label>Prize</ion-label>
              </ion-segment-button>
            </ion-segment>

            <!-- Entry Fee (only for prize groups) -->
            <div *ngIf="groupForm.get('type')?.value === 'prize'" class="ion-margin-top">
              <ion-item>
                <ion-label position="stacked">Entry Fee (£)</ion-label>
                <ion-input
                  type="number"
                  formControlName="entryFee"
                  [min]="1"
                  [max]="100"
                  placeholder="Enter amount between £1-£100"
                ></ion-input>
              </ion-item>
            </div>

            <!-- Submit Button -->
            <div class="ion-margin-top">
              <ion-button 
                expand="block" 
                type="submit"
                [disabled]="!groupForm.valid || isLoading"
              >
                <ion-spinner *ngIf="isLoading"></ion-spinner>
                <span *ngIf="!isLoading">Create Group</span>
              </ion-button>
            </div>
          </form>
        </ion-card-content>
      </ion-card>

      <!-- Welcome Message - Only show if no groups -->
      <ion-card *ngIf="groups.length === 0">
        <ion-card-header>
          <ion-card-title>Welcome to Group Admin</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            You haven't created any groups yet. Click the "Create Group" button above to get started!
          </p>
        </ion-card-content>
      </ion-card>

      <!-- Existing Groups List -->
      <ion-card *ngIf="groups.length > 0">
        <ion-card-header>
          <ion-card-title>My Groups</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="group-list-item" *ngFor="let group of groups">
            <div class="group-info">
              <h2>{{ group.name }}</h2>
              <div class="group-meta">
                <ion-badge [color]="group.type === 'prize' ? 'primary' : 'medium'">
                  {{ group.type === 'prize' ? 'Prize Group' : 'Casual Group' }}
                </ion-badge>
                <span>
                  <ion-icon name="person-outline"></ion-icon>
                  Admin: {{ group.adminName }}
                </span>
                <span>
                  <ion-icon name="calendar-outline"></ion-icon>
                  Created: {{ group.createdAt | date:'medium' }}
                </span>
                <span *ngIf="group.type === 'prize'">
                  <ion-icon name="cash-outline"></ion-icon>
                  Entry Fee: {{ group.entryFee | currency:'GBP' }}
                </span>
              </div>

              <div class="group-stats">
                <div class="group-code">
                  <span>Group Code: {{ group.code }}</span>
                  <ion-button fill="clear" (click)="copyGroupCode(group.code)">
                    <ion-icon name="copy-outline"></ion-icon>
                  </ion-button>
                </div>
                
                <div class="member-stats">
                  <span>
                    <ion-icon name="people-outline"></ion-icon>
                    {{ group.memberCount }} Members
                  </span>
                  <span *ngIf="group.type === 'prize'">
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                    {{ group.paidMembers }}/{{ group.memberCount }} Paid
                  </span>
                </div>
              </div>
            </div>

            <div class="group-actions">
              <ion-button fill="clear" (click)="showGroupDetails(group)">
                <ion-icon slot="start" name="eye-outline"></ion-icon>
                VIEW
              </ion-button>
              <ion-button fill="clear" color="danger" (click)="deleteGroup(group)">
                <ion-icon slot="start" name="trash-outline"></ion-icon>
                DELETE
              </ion-button>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Group Details Modal -->
      <ion-modal [isOpen]="!!selectedGroup" (didDismiss)="selectedGroup = null">
        <ng-template>
          <ion-header>
            <ion-toolbar>
              <ion-title>{{ selectedGroup?.name }}</ion-title>
              <ion-buttons slot="end">
                <ion-button (click)="selectedGroup = null">
                  <ion-icon name="close-outline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-toolbar>
              <ion-segment [(ngModel)]="selectedTab">
                <ion-segment-button value="members">
                  <ion-icon name="people-outline"></ion-icon>
                  <ion-label>Members</ion-label>
                </ion-segment-button>
                <ion-segment-button value="settings">
                  <ion-icon name="settings-outline"></ion-icon>
                  <ion-label>Settings</ion-label>
                </ion-segment-button>
              </ion-segment>
            </ion-toolbar>
          </ion-header>

          <ion-content class="ion-padding">
            <!-- Members Tab -->
            <div *ngIf="selectedTab === 'members'">
              <ion-searchbar
                placeholder="Search members"
                [(ngModel)]="searchTerm"
                (ionInput)="filterMembers()"
              ></ion-searchbar>

              <ion-list>
                <ion-item *ngFor="let member of filteredMembers">
                  <ion-label>
                    <h2>{{ member.name }}</h2>
                    <p>{{ member.email }}</p>
                    <p>Joined: {{ member.joinedAt | date }}</p>
                  </ion-label>
                  <ion-badge slot="end" [color]="member.role === 'admin' ? 'warning' : 'primary'">
                    {{ member.role }}
                  </ion-badge>
                  <ion-badge slot="end" [color]="member.status === 'active' ? 'success' : 'medium'">
                    {{ member.status }}
                  </ion-badge>
                  <ion-buttons slot="end">
                    <ion-button (click)="manageMemberRole(member)">
                      <ion-icon [name]="member.role === 'admin' ? 'arrow-down-outline' : 'arrow-up-outline'"></ion-icon>
                    </ion-button>
                    <ion-button (click)="toggleMemberStatus(member)">
                      <ion-icon [name]="member.status === 'active' ? 'lock-open-outline' : 'lock-closed-outline'"></ion-icon>
                    </ion-button>
                    <ion-button color="danger" (click)="removeMember(member)">
                      <ion-icon name="trash-outline"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-item>
              </ion-list>
            </div>

            <!-- Settings Tab -->
            <div *ngIf="selectedTab === 'settings'">
              <ion-list>
                <ion-item>
                  <ion-label>Allow Player Invites</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup!.settings.allowPlayerInvites"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>
                <ion-item>
                  <ion-label>Auto-approve Joins</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup!.settings.autoApproveJoins"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>
                <ion-item>
                  <ion-label>Show Leaderboard</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup!.settings.showLeaderboard"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>
                <ion-item>
                  <ion-label>Allow Member Chat</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup!.settings.allowMemberChat"
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
  styleUrls: ['./groups.page.scss'],
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
    IonCardSubtitle,
    IonSelect,
    IonSelectOption,
    IonNote,
    IonRange,
    CurrencyPipe,
  ],
})
export class GroupsPage implements OnInit {
  groupForm!: FormGroup;
  isLoading = false;
  isCreateModalOpen = false;
  groups: Group[] = [];
  selectedGroup: Group | null = null;
  selectedTab = 'members';
  searchTerm = '';
  filteredMembers: GroupMember[] = [];
  entryFeeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  currentMemberCount = 0;
  currentAdmin: CurrentAdmin = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    members: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        joinedAt: new Date(),
        status: 'active',
        role: 'admin',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private alertController: AlertController,
    private groupService: GroupService
  ) {
    addIcons({
      peopleOutline,
      trophyOutline,
      cashOutline,
      createOutline,
      trashOutline,
      addOutline,
      closeOutline,
      personOutline,
      personAddOutline,
      personRemoveOutline,
      lockClosedOutline,
      lockOpenOutline,
      copyOutline,
    });
    this.initForm();
    this.loadGroups();
  }

  ngOnInit() {
    this.initForm();
    this.loadGroups();
  }

  private initForm() {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['casual', Validators.required],
      entryFee: [{ value: 10, disabled: true }],
      settings: this.fb.group({
        allowPlayerInvites: [true],
        autoApproveJoins: [false],
        showLeaderboard: [true],
        allowMemberChat: [true],
      }),
    });

    // Listen to type changes to enable/disable entry fee
    this.groupForm.get('type')?.valueChanges.subscribe((type) => {
      const entryFeeControl = this.groupForm.get('entryFee');
      if (type === 'prize') {
        entryFeeControl?.enable();
      } else {
        entryFeeControl?.disable();
      }
    });
  }

  private loadGroups() {
    this.groups = this.groupService.getAllGroups();
  }

  onGroupTypeChange() {
    const type = this.groupForm.get('type')?.value;
    if (type === 'casual') {
      this.groupForm.get('entryFee')?.setValue(null);
      this.groupForm.get('entryFee')?.clearValidators();
    } else {
      this.groupForm.get('entryFee')?.setValidators(Validators.required);
    }
    this.groupForm.get('entryFee')?.updateValueAndValidity();
  }

  calculatePrize(position: number): number {
    const totalPool = this.calculateTotalPool();
    const distribution = this.getPrizeDistribution(this.currentMemberCount);
    return totalPool * distribution[position];
  }

  calculateTotalPool(): number {
    const entryFee = this.groupForm.get('entryFee')?.value || 0;
    return entryFee * this.currentMemberCount;
  }

  getPrizeDistribution(memberCount: number): { [key: number]: number } {
    // For very small groups (3-5 members)
    if (memberCount <= 5) {
      return {
        1: 1.0, // 100% for first place when very few members
        2: 0, // No second place prize
        3: 0, // No third place prize
      };
    }
    // For small groups (6-10 members)
    else if (memberCount <= 10) {
      return {
        1: 0.7, // 70% for first place
        2: 0.3, // 30% for second place
        3: 0, // No third place prize
      };
    }
    // For medium groups (11-20 members)
    else if (memberCount <= 20) {
      return {
        1: 0.5, // 50% for first place
        2: 0.3, // 30% for second place
        3: 0.2, // 20% for third place
      };
    }
    // For large groups (21+ members)
    else {
      return {
        1: 0.45, // 45% for first place
        2: 0.35, // 35% for second place
        3: 0.2, // 20% for third place
      };
    }
  }

  async createGroup() {
    if (this.groupForm.valid) {
      try {
        this.isLoading = true;
        const formValue = this.groupForm.value;

        // Create initial leaderboard with members in alphabetical order
        const initialLeaderboard: GroupLeaderboardEntry[] = [];

        const newGroup: Group = {
          id: crypto.randomUUID(),
          name: formValue.name,
          code: this.generateGroupCode(),
          memberCount: 1,
          createdAt: new Date(),
          members: [
            {
              id: this.currentAdmin.id,
              name: this.currentAdmin.name,
              email: this.currentAdmin.email,
              joinedAt: new Date(),
              status: 'active',
              role: 'admin',
            },
          ],
          settings: {
            allowPlayerInvites: true,
            autoApproveJoins: false,
            showLeaderboard: true,
            allowMemberChat: true,
          },
          type: formValue.type,
          entryFee: formValue.type === 'prize' ? formValue.entryFee : undefined,
          paidMembers: 0,
          totalPrizePool: 0,
          adminName: this.currentAdmin.name,
          leaderboard: initialLeaderboard,
        };

        // Save group to storage
        this.groupService.saveGroup(newGroup);

        // Update local groups array by appending the new group
        this.groups = [...this.groups, newGroup];

        // Show success message and close modal
        await this.toastService.showToast(
          'Group created successfully!',
          'success'
        );

        // Reset form and close create form
        this.groupForm.reset({
          name: '',
          type: 'casual',
          entryFee: 10,
          settings: {
            allowPlayerInvites: true,
            autoApproveJoins: false,
            showLeaderboard: true,
            allowMemberChat: true,
          },
        });
        this.isCreateModalOpen = false;
      } catch (error) {
        console.error('Error creating group:', error);
        await this.toastService.showToast(
          'Failed to create group. Please try again.',
          'danger'
        );
      } finally {
        this.isLoading = false;
      }
    } else {
      await this.toastService.showToast(
        'Please fill in all required fields.',
        'warning'
      );
    }
  }

  private generateGroupCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
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

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update member's role
      member.role = newRole;

      // Update the filteredMembers array to reflect the change
      this.filteredMembers = this.filteredMembers.map((m) =>
        m.id === member.id ? { ...m, role: newRole } : m
      );

      // Update the selected group's members array
      if (this.selectedGroup) {
        this.selectedGroup.members = this.selectedGroup.members.map((m) =>
          m.id === member.id ? { ...m, role: newRole } : m
        );
      }

      await this.toastService.showToast(
        `Member ${action}d to ${newRole} successfully`,
        'success'
      );
    } catch (error) {
      console.error(`Error ${action}ing member:`, error);
      await this.toastService.showToast(
        `Failed to ${action} member. Please try again.`,
        'danger'
      );

      // Revert the role change in case of error
      member.role = isPromotion ? 'player' : 'admin';
    }
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

  onEntryFeeChange(event: any) {
    const value = event.detail.value;
    // Ensure the value is a multiple of 5
    const roundedValue = Math.round(value / 5) * 5;
    this.groupForm.patchValue({ entryFee: roundedValue }, { emitEvent: false });
  }

  onManualFeeInput(event: any) {
    let value = event.detail.value;

    // Allow empty value
    if (value === '' || value === null) {
      this.groupForm.patchValue({ entryFee: null }, { emitEvent: false });
      const input = event.target;
      input.classList.remove('has-value');
      return;
    }

    // Convert to number and validate
    value = Number(value);
    if (value < 1) value = 1;
    if (value > 100) value = 100;

    const input = event.target;
    input.classList.add('has-value');
    this.groupForm.patchValue({ entryFee: value }, { emitEvent: false });
  }

  async copyGroupCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      await this.toastService.showToast(
        'Group code copied to clipboard',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to copy code', 'error');
    }
  }

  viewGroupDetails(group: Group) {
    this.selectedGroup = group;
    // You could also navigate to a details view or show a modal
    // this.router.navigate(['/group-admin/groups', group.id]);
  }

  async deleteGroup(group: Group) {
    const alert = await this.alertController.create({
      header: 'Delete Group',
      subHeader: `Are you sure you want to delete "${group.name}"?`,
      message:
        'This action cannot be undone. All group data including members and predictions will be permanently deleted.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            try {
              // Delete group from storage
              this.groupService.deleteGroup(group.id);

              // Update local groups array
              this.groups = this.groups.filter((g) => g.id !== group.id);

              // Clear selected group if it was the deleted one
              if (this.selectedGroup?.id === group.id) {
                this.selectedGroup = null;
              }

              await this.toastService.showToast(
                'Group deleted successfully',
                'success'
              );
            } catch (error) {
              console.error('Error deleting group:', error);
              await this.toastService.showToast(
                'Failed to delete group. Please try again.',
                'danger'
              );
            }
          },
        },
      ],
    });

    await alert.present();
  }

  viewGroupMembers(group: Group) {
    this.selectedGroup = group;
    this.selectedTab = 'members';
    this.filteredMembers = [...group.members];
  }

  viewGroupLeaderboard(group: Group) {
    this.router.navigate(['/group-admin/groups', group.id, 'leaderboard']);
  }

  // Add method to handle create button click
  showCreateForm() {
    // Reset form before showing
    this.groupForm.reset({
      name: '',
      type: 'casual',
      entryFee: 10,
      settings: {
        allowPlayerInvites: true,
        autoApproveJoins: false,
        showLeaderboard: true,
        allowMemberChat: true,
      },
    });
    this.isCreateModalOpen = true;
  }
}
