import { Component, OnInit, OnDestroy } from '@angular/core';
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
  peopleOutline,
  trophyOutline,
  createOutline,
  closeOutline,
  personOutline,
  personAddOutline,
  lockClosedOutline,
  lockOpenOutline, 
  calendarOutline, 
  eyeOutline,
  removeOutline, checkmarkOutline, warningOutline, bugOutline } from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { Router } from '@angular/router';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { Subscription } from 'rxjs';

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
  templateUrl: './groups.page.html',
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
  ],
})
export class GroupsPage implements OnInit, OnDestroy {
  groupForm!: FormGroup;
  isLoading = false;
  isCreateModalOpen = false;
  groups: Group[] = [];
  selectedGroup: Group | null = null;
  selectedTab = 'members';
  searchTerm = '';
  filteredMembers: GroupMember[] = [];
  currentAdmin: CurrentAdmin = {
    id: '',
    name: '',
    email: '',
    members: []
  };
  private subscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private alertController: AlertController,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    addIcons({bugOutline,personOutline,calendarOutline,copyOutline,peopleOutline,checkmarkCircleOutline,trophyOutline,eyeOutline,trashOutline,closeOutline,settingsOutline,lockClosedOutline,createOutline,addOutline,checkmarkOutline,personAddOutline,personRemoveOutline,lockOpenOutline,removeOutline,warningOutline,});
    this.initForm();
    this.loadGroups();
  }

  ngOnInit() {
    this.initCurrentAdmin();
    this.initForm();
    this.loadGroups();

    // Check if this is a first-time group admin and mark first login complete
    this.handleFirstTimeUser();

    // Subscribe to group updates for real-time member changes
    this.subscription = this.groupService.groups$.subscribe(() => {
      this.loadGroups();
      
      // If a group is currently selected, refresh its data
      if (this.selectedGroup) {
        const updatedGroup = this.groups.find(g => g.id === this.selectedGroup!.id);
        if (updatedGroup) {
          this.selectedGroup = updatedGroup;
          this.filteredMembers = [...updatedGroup.members];
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private async handleFirstTimeUser() {
    // Check if this is a first-time user
    if (this.authService.isFirstTimeUser()) {
      console.log('🆕 GroupsPage: First-time group admin detected - marking login as complete');
      try {
        await this.authService.markFirstLoginComplete();
        console.log('✅ GroupsPage: First login marked complete for group admin');
      } catch (error) {
        console.error('❌ GroupsPage: Error marking first login complete:', error);
      }
    }
  }

  private initCurrentAdmin() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentAdmin = {
        id: currentUser.id,
        name: currentUser.firstName && currentUser.lastName 
          ? `${currentUser.firstName} ${currentUser.lastName}`
          : currentUser.username,
        email: currentUser.email || '',
        members: []
      };
    }
  }

  private initForm() {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      settings: this.fb.group({
        allowPlayerInvites: [true],
        autoApproveJoins: [false],
        showLeaderboard: [true],
        allowMemberChat: [true],
      }),
    });
  }

  private loadGroups() {
    // Only load groups where the current user is an admin
    this.groups = this.groupService.getAdminGroups();
    
    // Ensure memberCount is synced with actual members array length
    this.groups = this.groups.map(group => ({
      ...group,
      memberCount: group.members.length
    }));
  }

  async createGroup() {
    if (this.groupForm.valid) {
      try {
        this.isLoading = true;
        const formValue = this.groupForm.value;

        // Use GroupService createGroup method
        const createGroupData = {
          name: formValue.name,
          description: '', // Add description if needed
        };

        // Create group using GroupService
        this.groupService.createGroup(createGroupData).subscribe({
          next: async (newGroup) => {
            // Show success message and close modal
            this.toastService.showToast(
              `Group "${newGroup.name}" created successfully! Code: ${newGroup.code}`,
              'success'
            );

            // Reset form to clean state and close create form
            this.resetCreateForm();
            this.isCreateModalOpen = false;

            // Groups will be reloaded automatically via subscription
          },
          error: (error) => {
            console.error('Error creating group:', error);
            this.toastService.showToast(
              'Failed to create group. Please try again.',
              'danger'
            );
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      } catch (error) {
        console.error('Error creating group:', error);
        await this.toastService.showToast(
          'Failed to create group. Please try again.',
          'danger'
        );
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
    // Get the latest group data from the service to ensure we have current members
    const latestGroup = this.groupService.getAllGroups().find(g => g.id === group.id);
    this.selectedGroup = latestGroup || group;
    this.filteredMembers = [...this.selectedGroup.members];
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
    // Get the latest group data from the service to ensure we have current members
    const latestGroup = this.groupService.getAllGroups().find(g => g.id === group.id);
    this.selectedGroup = latestGroup || group;
    this.selectedTab = 'members';
    this.filteredMembers = [...this.selectedGroup.members];
  }

  viewGroupLeaderboard(group: Group) {
    this.router.navigate(['/group-admin/groups', group.id, 'leaderboard']);
  }

  // Reset form to clean default state
  private resetCreateForm() {
    this.groupForm.reset({
      name: '',
      settings: {
        allowPlayerInvites: true,
        autoApproveJoins: false,
        showLeaderboard: true,
        allowMemberChat: true,
      },
    });
  }

  // Add method to handle create button click
  toggleCreateForm() {
    if (this.isCreateModalOpen) {
      // Close the form
      this.isCreateModalOpen = false;
    } else {
      // Reset form before showing with clean state
      this.resetCreateForm();
      this.isCreateModalOpen = true;
    }
  }

}
