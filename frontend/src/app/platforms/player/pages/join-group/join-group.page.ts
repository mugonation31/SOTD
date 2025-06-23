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
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { GroupService } from '@core/services/group.service';

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

  // Mock current player data - in a real app, this would come from an auth service
  currentPlayer = {
    id: crypto.randomUUID(),
    name: 'Player User',
    email: 'player@example.com',
  };

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
    private groupService: GroupService
  ) {
    addIcons({
      peopleCircleOutline,
      arrowForwardOutline,
      footballOutline,
      personOutline,
    });
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
    const allGroups = this.groupService.getAllGroups();
    this.myGroups = allGroups.filter((group) =>
      group.members.some((member) => member.email === this.currentPlayer.email)
    );
  }

  async confirmJoinGroup() {
    if (!this.foundGroup || this.isJoining) return;

    this.isJoining = true;

    try {
      const newMember = {
        id: this.currentPlayer.id,
        name: this.currentPlayer.name,
        email: this.currentPlayer.email,
        joinedAt: new Date(),
        status: 'active' as const,
        role: 'player' as const,
      };

      const updatedGroup = this.groupService.joinGroup(
        this.foundGroup.code,
        newMember
      );

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
