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

interface PrizePosition {
  percentage: number;
}

interface PrizeBreakdown {
  positions: PrizePosition[];
  isLocked: boolean;
  lockedAt?: Date;
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
  prizeBreakdown?: PrizeBreakdown;
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
    IonRange,
    CurrencyPipe,
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
  entryFeeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  currentMemberCount = 0;
  prizePositions: PrizePosition[] = [{ percentage: 100 }];
  isEditingLockedBreakdown = false;
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
    addIcons({cashOutline,bugOutline,personOutline,calendarOutline,copyOutline,peopleOutline,checkmarkCircleOutline,trophyOutline,eyeOutline,trashOutline,closeOutline,settingsOutline,lockClosedOutline,createOutline,addOutline,checkmarkOutline,personAddOutline,personRemoveOutline,lockOpenOutline,removeOutline,warningOutline,});
    this.initForm();
    this.loadGroups();
  }

  ngOnInit() {
    this.initCurrentAdmin();
    this.initForm();
    this.loadGroups();
    
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
    // Only load groups where the current user is an admin
    this.groups = this.groupService.getAdminGroups();
    console.log('🔄 Group-admin: Loaded groups with updated member counts:', 
      this.groups.map(g => ({ name: g.name, memberCount: g.memberCount, actualMembers: g.members.length })));
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

  selectGroupType(type: 'casual' | 'prize') {
    this.groupForm.patchValue({ type });
    this.onGroupTypeChange();
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
          entryFee: formValue.type === 'prize' ? formValue.entryFee : 0,
          isPrivate: false // Add privacy setting if needed
        };

        // Create group using GroupService
        this.groupService.createGroup(createGroupData).subscribe({
          next: (newGroup) => {
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
    
    console.log(`🔍 Group modal: "${this.selectedGroup.name}" showing ${this.selectedGroup.members.length} members:`, 
      this.selectedGroup.members.map(m => ({ name: m.name, role: m.role })));
    
    // Load existing prize breakdown if available
    if (this.selectedGroup.prizeBreakdown?.positions) {
      this.prizePositions = [...this.selectedGroup.prizeBreakdown.positions];
    } else {
      // Reset to default if no existing breakdown
      this.prizePositions = [{ percentage: 100 }];
    }
    
    // Reset edit state
    this.isEditingLockedBreakdown = false;
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
    // Get the latest group data from the service to ensure we have current members
    const latestGroup = this.groupService.getAllGroups().find(g => g.id === group.id);
    this.selectedGroup = latestGroup || group;
    this.selectedTab = 'members';
    this.filteredMembers = [...this.selectedGroup.members];
    
    console.log(`👥 Group members tab: "${this.selectedGroup.name}" showing ${this.selectedGroup.members.length} members:`, 
      this.selectedGroup.members.map(m => ({ name: m.name, role: m.role })));
  }

  viewGroupLeaderboard(group: Group) {
    this.router.navigate(['/group-admin/groups', group.id, 'leaderboard']);
  }

  // Reset form to clean default state
  private resetCreateForm() {
    this.groupForm.reset({
      name: '',
      type: 'casual',
      entryFee: 10, // Clean default starting value
      settings: {
        allowPlayerInvites: true,
        autoApproveJoins: false,
        showLeaderboard: true,
        allowMemberChat: true,
      },
    });
    
    // Ensure entry fee control state is properly reset
    const entryFeeControl = this.groupForm.get('entryFee');
    if (entryFeeControl) {
      entryFeeControl.disable(); // Start with casual (disabled state)
    }
    
    // Trigger change detection to ensure UI is updated
    this.onGroupTypeChange();
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

  // Prize Management Methods
  calculateTotalPrizePool(): number {
    if (!this.selectedGroup || this.selectedGroup.type !== 'prize') return 0;
    return (this.selectedGroup.entryFee || 0) * (this.selectedGroup.paidMembers || 0);
  }

  calculatePositionPrize(percentage: number): number {
    const totalPool = this.calculateTotalPrizePool();
    return (totalPool * percentage) / 100;
  }

  getTotalPercentage(): number {
    return this.prizePositions.reduce((total, position) => total + (position.percentage || 0), 0);
  }

  onPercentageChange(): void {
    // Trigger change detection for total percentage
  }

  addPrizePosition(): void {
    if (this.prizePositions.length < 10) {
      this.prizePositions.push({ percentage: 0 });
    }
  }

  removePrizePosition(index: number): void {
    if (this.prizePositions.length > 1) {
      this.prizePositions.splice(index, 1);
    }
  }

  getPositionLabel(position: number): string {
    const suffixes = ['st', 'nd', 'rd'];
    const suffix = position <= 3 ? suffixes[position - 1] : 'th';
    return `${position}${suffix}`;
  }

  getPositionClass(position: number): string {
    switch (position) {
      case 1: return 'first-place';
      case 2: return 'second-place';
      case 3: return 'third-place';
      default: return 'other-place';
    }
  }

  applyPreset(preset: string): void {
    switch (preset) {
      case 'winner-takes-all':
        this.prizePositions = [{ percentage: 100 }];
        break;
      case '70-30':
        this.prizePositions = [
          { percentage: 70 },
          { percentage: 30 }
        ];
        break;
      case '50-30-20':
        this.prizePositions = [
          { percentage: 50 },
          { percentage: 30 },
          { percentage: 20 }
        ];
        break;
      case 'equal-split':
        const memberCount = this.selectedGroup?.memberCount || 1;
        const equalPercentage = Math.floor(100 / Math.min(memberCount, 5));
        const positions = Math.min(memberCount, 5);
        this.prizePositions = Array(positions).fill(null).map(() => ({ percentage: equalPercentage }));
        // Adjust for rounding
        const remainder = 100 - (equalPercentage * positions);
        if (remainder > 0) {
          this.prizePositions[0].percentage += remainder;
        }
        break;
    }
  }

  async savePrizeBreakdown(): Promise<void> {
    if (this.getTotalPercentage() !== 100) {
      await this.toastService.showToast(
        'Prize percentages must total exactly 100%',
        'warning'
      );
      return;
    }

    try {
      if (this.selectedGroup) {
        // Save the prize breakdown and lock it
        this.selectedGroup.prizeBreakdown = {
          positions: [...this.prizePositions],
          isLocked: true,
          lockedAt: new Date()
        };

        // Reset edit state
        this.isEditingLockedBreakdown = false;

        // Here you would save the prize breakdown to your backend/storage
        // For now, we'll just show a success message
        await this.toastService.showToast(
          'Prize breakdown saved and locked successfully!',
          'success'
        );
      }
    } catch (error) {
      console.error('Error saving prize breakdown:', error);
      await this.toastService.showToast(
        'Failed to save prize breakdown. Please try again.',
        'danger'
      );
    }
  }

  isPrizeBreakdownLocked(): boolean {
    return this.selectedGroup?.prizeBreakdown?.isLocked ?? false;
  }

  canEditPrizeBreakdown(): boolean {
    return !this.isPrizeBreakdownLocked() || this.isEditingLockedBreakdown;
  }

  async editLockedPrizeBreakdown(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Edit Prize Configuration',
      message: 'Are you sure you want to edit this locked configuration?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Edit',
          handler: () => {
            this.isEditingLockedBreakdown = true;
            // Load existing breakdown for editing
            if (this.selectedGroup?.prizeBreakdown?.positions) {
              this.prizePositions = [...this.selectedGroup.prizeBreakdown.positions];
            }
          }
        }
      ]
    });

    await alert.present();
  }

  cancelEditLockedBreakdown(): void {
    this.isEditingLockedBreakdown = false;
    // Restore original positions
    if (this.selectedGroup?.prizeBreakdown?.positions) {
      this.prizePositions = [...this.selectedGroup.prizeBreakdown.positions];
    }
  }
}
