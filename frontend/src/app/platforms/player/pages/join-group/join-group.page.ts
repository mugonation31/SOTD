import { Component, OnInit } from '@angular/core';
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

// Use the Group interface that matches GroupService
interface Group {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  createdAt: Date;
  members: any[];
  settings: any;
  adminName: string;
  leaderboard: any[];
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
export class JoinGroupPage implements OnInit {
  groupCode: string = '';
  isSearching: boolean = false;
  isJoining: boolean = false;
  isValidCode: boolean = false;
  showGroupDetails: boolean = false;
  foundGroup: Group | null = null;
  myGroups: Group[] = [];
  isLoading: boolean = false;
  groupDetailsMessage: string = '';

  currentPlayer = this.authService.getCurrentUser();

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {

        this.showGroupDetails = false;
        this.foundGroup = null;
        this.groupDetailsMessage = '';
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
  }

  ngOnInit() {
    this.loadMyGroups();

    // Phase 12.1 (H3): the first-login flag must NOT flip just because this
    // page rendered — that would strand a first-time user who bounces before
    // joining. The flip now happens inside confirmJoinGroup() after a real
    // successful join (mirrors the group-admin createGroup flow).
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
      const group = await this.groupService.findGroupByCode(this.groupCode);

      if (group) {

        this.foundGroup = group;
        
        // Generate the message once and store it
        this.groupDetailsMessage = this.getGroupDetailsMessage();

        
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
    if (!this.foundGroup) {
      return '';
    }

    try {
      let message = `Group Name: ${this.foundGroup.name}\n`;
      message += `Admin: ${this.foundGroup.adminName}\n`;
      message += `Members: ${this.foundGroup.memberCount}\n`;
      message += '\nDo you want to join this group?';

      return message;
    } catch (error) {
      console.error('❌ Error generating group details message:', error);
      return 'Error loading group details';
    }
  }

  private async loadMyGroups() {
    this.isLoading = true;
    try {
      this.myGroups = await this.groupService.getUserGroups();
    } catch (error) {
      console.error('Error loading groups:', error);
    } finally {
      this.isLoading = false;
    }
  }

  viewGroupStandings(groupId: string) {
    this.router.navigate(['/player/group-standings', groupId]);
  }

  async confirmJoinGroup() {



    
    if (!this.foundGroup || this.isJoining) {

      return;
    }

    this.isJoining = true;
    const groupName = this.foundGroup.name;


    try {
      // Use enhanced join method that automatically uses current user data
      const updatedGroup = await this.groupService.joinGroup(this.foundGroup.code);


      if (updatedGroup) {
        // Close dialog immediately
        this.showGroupDetails = false;
        this.foundGroup = null;
        this.groupDetailsMessage = '';

        await this.toastService.showToast(
          `Successfully joined ${groupName}.`,
          'success'
        );

        // Phase 12.1 (H3): flip the first-login flag ONLY after a real join
        // succeeds. Mirrors group-admin/pages/group/group.page.ts:215 — same
        // try/catch since the join itself already succeeded and the flag
        // flip is non-fatal (we'll re-attempt next login if it fails).
        if (this.authService.isFirstTimeUser()) {
          try {
            await this.authService.markFirstLoginComplete();
          } catch (firstLoginErr) {
            console.warn(
              'join-group.confirmJoinGroup.markFirstLoginComplete',
              firstLoginErr
            );
          }
        }

        // Task 9.1: route back to standings so the new group surfaces in
        // the player's groups list (replaces the old in-page reload).
        await this.router.navigate(['/player/standings']);
      } else {

        throw new Error('Failed to join group');
      }
    } catch (error) {
      console.error('❌ Error in confirmJoinGroup:', error);
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
