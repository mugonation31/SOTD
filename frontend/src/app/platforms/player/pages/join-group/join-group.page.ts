import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

// Use the Group interface that matches GroupService
interface Group {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  createdAt: Date;
  members: any[];
  settings: any;
  type: 'casual' | 'prize';
  entryFee?: number;
  paidMembers: number;
  totalPrizePool?: number;
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
export class JoinGroupPage implements OnInit, OnDestroy {
  groupCode: string = '';
  isSearching: boolean = false;
  isJoining: boolean = false;
  isValidCode: boolean = false;
  showGroupDetails: boolean = false;
  foundGroup: Group | null = null;
  myGroups: Group[] = [];
  private groupsSubscription?: Subscription;
  groupDetailsMessage: string = '';

  currentPlayer = this.authService.getCurrentUser();

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('🚫 User cancelled group join dialog');
        this.showGroupDetails = false;
        this.foundGroup = null;
        this.groupDetailsMessage = '';
      },
    },
    {
      text: 'Join Group',
      handler: () => {
        console.log('✅ User confirmed group join');
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
    
    // Subscribe to group updates for real-time UI updates
    this.groupsSubscription = this.groupService.groups$.subscribe(() => {
      this.loadMyGroups();
    });
  }

  ngOnDestroy() {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
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
      console.log('🔍 Searching for group with code:', this.groupCode);
      
      // Debug: Check all available groups
      const allGroups = this.groupService.getAllGroups();
      console.log('📋 All available groups:', allGroups);
      console.log('📋 Group codes in storage:', allGroups.map(g => ({ name: g.name, code: g.code })));
      
      // Find group by code
      const group = this.groupService.findGroupByCode(this.groupCode);
      console.log('🎯 Found group:', group);

      if (group) {
        console.log('✅ Setting foundGroup and showing details dialog');
        this.foundGroup = group;
        
        // Generate the message once and store it
        this.groupDetailsMessage = this.getGroupDetailsMessage();
        console.log('📝 Generated message:', this.groupDetailsMessage);
        
        this.showGroupDetails = true;
        console.log('🔄 showGroupDetails set to:', this.showGroupDetails);
        console.log('📊 foundGroup set to:', this.foundGroup);
        
        // Clear input after finding group
        this.groupCode = '';
        this.isValidCode = false;
      } else {
        console.log('❌ No group found with code:', this.groupCode);
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
      message += `Type: ${
        this.foundGroup.type === 'prize' ? 'Prize Pool' : 'Casual'
      }\n`;

      if (this.foundGroup.type === 'prize') {
        message += `Entry Fee: £${this.foundGroup.entryFee}\n`;
      }

      message += '\nDo you want to join this group?';

      return message;
    } catch (error) {
      console.error('❌ Error generating group details message:', error);
      return 'Error loading group details';
    }
  }

  private loadMyGroups() {
    // Use enhanced group service to get user's groups
    this.myGroups = this.groupService.getUserGroups();
  }

  viewGroupStandings(groupId: string) {
    this.router.navigate(['/player/group-standings', groupId]);
  }

  async confirmJoinGroup() {
    console.log('🚀 Starting confirmJoinGroup process');
    console.log('📊 Current foundGroup:', this.foundGroup);
    console.log('🔄 Current isJoining status:', this.isJoining);
    
    if (!this.foundGroup || this.isJoining) {
      console.log('❌ Cannot proceed - no foundGroup or already joining');
      return;
    }

    this.isJoining = true;
    const groupName = this.foundGroup.name;
    console.log('💼 Attempting to join group:', groupName);

    try {
      // Use enhanced join method that automatically uses current user data
      console.log('🔗 Calling groupService.joinGroup with code:', this.foundGroup.code);
      const updatedGroup = this.groupService.joinGroup(this.foundGroup.code);
      console.log('📥 joinGroup result:', updatedGroup);

      if (updatedGroup) {
        console.log('✅ Successfully joined group, closing dialog');
        // Close dialog immediately
        this.showGroupDetails = false;
        this.foundGroup = null;
        this.groupDetailsMessage = '';
        
        // Show success message with enhanced feedback
        await this.toastService.showToast(
          `🎉 Successfully joined ${groupName}! Check "My Groups" below.`,
          'success'
        );
        
        // Note: My Groups list will automatically update via the groups$ subscription
        
        // Stay on the same page - no navigation redirect
        // User can see their updated "My Groups" section and join more groups if needed
      } else {
        console.log('❌ joinGroup returned null/undefined');
        throw new Error('Failed to join group');
      }
    } catch (error) {
      console.error('❌ Error in confirmJoinGroup:', error);
      let message = 'Error joining group';
      if (error instanceof Error) {
        message = error.message;
      }
      console.log('📢 Showing error toast:', message);
      await this.toastService.showToast(message, 'error');
    } finally {
      this.isJoining = false;
      console.log('🏁 confirmJoinGroup process completed');
    }
  }

}
