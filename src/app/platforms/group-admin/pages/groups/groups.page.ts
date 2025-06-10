import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  AlertController,
  IonRange,
  IonNote,
  IonCardSubtitle,
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
  eyeOutline,
  addCircleOutline,
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
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
    CurrencyPipe,
    IonRange,
    IonNote,
    IonCardSubtitle,
  ],
})
export class GroupsPage implements OnInit {
  isLoading = false;
  groups: Group[] = [];
  selectedGroup: Group | null = null;
  selectedTab = 'members';
  searchTerm = '';
  filteredMembers: GroupMember[] = [];
  showCreateForm = false;
  groupForm!: FormGroup;
  currentMemberCount = 0;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private groupService: GroupService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    addIcons({
      peopleOutline,
      trophyOutline,
      cashOutline,
      createOutline,
      trashOutline,
      settingsOutline,
      searchOutline,
      banOutline,
      checkmarkCircleOutline,
      personRemoveOutline,
      shieldOutline,
      shieldCheckmarkOutline,
      copyOutline,
      addOutline,
      starOutline,
      closeOutline,
      personOutline,
      personAddOutline,
      lockClosedOutline,
      lockOpenOutline,
      eyeOutline,
      addCircleOutline,
    });
  }

  ngOnInit() {
    this.loadGroups();
    this.initForm();
  }

  private initForm() {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['casual', Validators.required],
      entryFee: [null],
      settings: this.fb.group({
        allowPlayerInvites: [true],
        autoApproveJoins: [false],
        showLeaderboard: [true],
        allowMemberChat: [true],
      }),
    });

    // Reset entry fee when type changes
    this.groupForm.get('type')?.valueChanges.subscribe((type) => {
      if (type === 'casual') {
        this.groupForm.patchValue({ entryFee: null });
      }
    });
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (this.showCreateForm) {
      this.initForm();
    }
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
    if (memberCount <= 5) {
      return { 1: 1.0, 2: 0, 3: 0 };
    } else if (memberCount <= 10) {
      return { 1: 0.7, 2: 0.3, 3: 0 };
    } else if (memberCount <= 20) {
      return { 1: 0.5, 2: 0.3, 3: 0.2 };
    } else {
      return { 1: 0.45, 2: 0.35, 3: 0.2 };
    }
  }

  onEntryFeeChange(event: any) {
    const value = event.detail.value;
    const roundedValue = Math.round(value / 5) * 5;
    this.groupForm.patchValue({ entryFee: roundedValue }, { emitEvent: false });
  }

  onManualFeeInput(event: any) {
    let value = event.detail.value;

    if (value === '' || value === null) {
      this.groupForm.patchValue({ entryFee: null }, { emitEvent: false });
      const input = event.target;
      input.classList.remove('has-value');
      return;
    }

    value = Number(value);
    if (value < 1) value = 1;
    if (value > 100) value = 100;

    const input = event.target;
    input.classList.add('has-value');
    this.groupForm.patchValue({ entryFee: value }, { emitEvent: false });
  }

  async onCreateGroup() {
    if (this.groupForm.valid) {
      try {
        this.isLoading = true;
        const formValue = this.groupForm.value;

        this.groupService
          .createGroup({
            name: formValue.name,
            description: `${formValue.name} - A prediction group`,
            entryFee: formValue.type === 'prize' ? formValue.entryFee : 0,
            isPrivate: false,
          })
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.toastService.showToast(
                'Group created successfully!',
                'success'
              );
              this.loadGroups(); // Refresh the groups list
              this.showCreateForm = false; // Close the modal
              this.groupForm.reset(); // Reset the form
              this.initForm(); // Reinitialize the form with default values
            },
            error: (error) => {
              console.error('Error creating group:', error);
              this.isLoading = false;
              this.toastService.showToast(
                'Failed to create group. Please try again.',
                'danger'
              );
            },
          });
      } catch (error) {
        console.error('Error creating group:', error);
        this.isLoading = false;
        await this.toastService.showToast(
          'Failed to create group. Please try again.',
          'danger'
        );
      }
    } else {
      await this.toastService.showToast(
        'Please fill in all required fields.',
        'warning'
      );
    }
  }

  private loadGroups() {
    this.groups = this.groupService.getAllGroups();
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

  navigateToCreateGroup() {
    this.router.navigate(['/group-admin/create-group']);
  }

  async copyGroupCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      await this.toastService.showToast('Group code copied to clipboard', 'success');
    } catch (error) {
      await this.toastService.showToast('Failed to copy code', 'error');
    }
  }
}
