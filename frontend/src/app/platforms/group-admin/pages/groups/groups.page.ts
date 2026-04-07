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
export class GroupsPage implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private alertController: AlertController,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    addIcons({bugOutline,personOutline,calendarOutline,copyOutline,peopleOutline,checkmarkCircleOutline,trophyOutline,eyeOutline,trashOutline,closeOutline,settingsOutline,lockClosedOutline,createOutline,addOutline,checkmarkOutline,personAddOutline,personRemoveOutline,lockOpenOutline,removeOutline,warningOutline,});
  }

  ngOnInit() {
    this.initCurrentAdmin();
    this.initForm();
    this.loadGroups();

    // Check if this is a first-time group admin and mark first login complete
    this.handleFirstTimeUser();
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

  private async loadGroups() {
    this.isLoading = true;
    try {
      // Only load groups where the current user is an admin
      const groups = await this.groupService.getAdminGroups();
      this.groups = groups;
    } catch (error) {
      console.error('Error loading groups:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async createGroup() {
    if (this.groupForm.valid) {
      try {
        this.isLoading = true;
        const formValue = this.groupForm.value;

        const newGroup = await this.groupService.createGroup({
          name: formValue.name,
          description: '',
        });

        this.toastService.showToast(
          `Group "${newGroup.name}" created successfully! Code: ${newGroup.code}`,
          'success'
        );

        this.resetCreateForm();
        this.isCreateModalOpen = false;
        this.loadGroups();
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
              // TODO: Implement deleteGroup in GroupService when backend supports it

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
