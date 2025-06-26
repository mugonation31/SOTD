import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
  IonSpinner,
  IonAlert,
  IonBadge,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  peopleCircleOutline,
  arrowForwardOutline,
  footballOutline,
  personOutline,
  logOutOutline, peopleOutline, chevronForwardOutline } from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';

interface Group {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  adminName: string;
  type: 'casual' | 'prize';
  entryFee?: number;
}

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.page.html',
  styleUrls: ['./join-group.page.scss'],
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
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonButtons,
    IonSpinner,
    IonAlert,
    IonBadge,
    FormsModule,
    NgIf,
    NgFor,
  ],
})
export class JoinGroupPage {
  groupCode: string = '';
  isSearching: boolean = false;
  isJoining: boolean = false;
  isValidCode: boolean = false;
  showGroupDetails: boolean = false;
  foundGroup: Group | null = null;
  myGroups: Group[] = [];

  currentPlayer = this.authService.getCurrentUser();

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.showGroupDetails = false;
        this.foundGroup = null;
      },
    },
    {
      text: 'Join Group',
      handler: () => {
        this.confirmJoinGroup();
      },
    },
  ];

  constructor(
    private router: Router,
    private toastService: ToastService,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    addIcons({footballOutline,personOutline,arrowForwardOutline,peopleOutline,chevronForwardOutline,peopleCircleOutline,logOutOutline,});
    this.loadMyGroups();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onGroupCodeInput(event: any) {
    const value = event.target.value.toUpperCase();
    this.groupCode = value;
    this.isValidCode = this.validateGroupCode(value);
  }

  validateGroupCode(code: string): boolean {
    // Group code should be 6 characters long, alphanumeric
    const regex = /^[A-Z0-9]{6}$/;
    return regex.test(code);
  }

  async joinGroup() {
    if (!this.isValidCode || this.isSearching) return;

    this.isSearching = true;

    try {
      // Find group by code
      const group = this.groupService.findGroupByCode(this.groupCode);

      if (group) {
        this.foundGroup = group;
        this.showGroupDetails = true;
        // Clear input after finding group
        this.groupCode = '';
        this.isValidCode = false;
      } else {
        await this.toastService.showToast('Group not found with that code', 'error');
        // Clear the input if group is not found
        this.groupCode = '';
        this.isValidCode = false;
      }
    } catch (error) {
      console.error('Error finding group:', error);
      await this.toastService.showToast('Error searching for group', 'error');
      // Clear the input on error
      this.groupCode = '';
      this.isValidCode = false;
    } finally {
      this.isSearching = false;
    }
  }

  getGroupDetailsMessage(): string {
    if (!this.foundGroup) return '';

    let message = `Group Name: ${this.foundGroup.name}\n`;
    message += `Admin: ${this.foundGroup.adminName}\n`;
    message += `Members: ${this.foundGroup.memberCount}\n`;
    message += `Type: ${
      this.foundGroup.type === 'prize' ? 'Prize Pool' : 'Casual'
    }\n`;

    if (this.foundGroup.type === 'prize') {
      message += `Entry Fee: £${this.foundGroup.entryFee}\n`;
    }

    message += '\nDo you want to join this group?';

    return message;
  }

  private loadMyGroups() {
    // Use enhanced group service to get user's groups
    this.myGroups = this.groupService.getUserGroups();
  }

  viewGroupStandings(groupId: string) {
    this.router.navigate(['/player/group-standings', groupId]);
  }

  async confirmJoinGroup() {
    if (!this.foundGroup || this.isJoining) return;

    this.isJoining = true;

    try {
      // Use enhanced join method that automatically uses current user data
      const updatedGroup = this.groupService.joinGroup(this.foundGroup.code);

      if (updatedGroup) {
        // Close dialog immediately
        this.showGroupDetails = false;
        this.foundGroup = null;
        
        // Reload the groups list after joining
        this.loadMyGroups();
        
        await this.toastService.showToast(
          `Successfully joined ${updatedGroup.name}!`,
          'success'
        );
        
        // Navigate to standings page to see the new membership
        this.router.navigate(['/player/standings'], { replaceUrl: true });
      } else {
        throw new Error('Failed to join group');
      }
    } catch (error) {
      let message = 'Error joining group';
      if (error instanceof Error) {
        message = error.message;
      }
      await this.toastService.showToast(message, 'error');
    } finally {
      this.isJoining = false;
    }
  }


}
