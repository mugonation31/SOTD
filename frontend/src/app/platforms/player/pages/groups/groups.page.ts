import { Component, OnInit, OnDestroy } from '@angular/core';
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
  IonBadge,
  IonIcon,
  IonButton,
  IonFab,
  IonFabButton,
  IonModal,
  IonInput,
  IonNote,
  IonButtons,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  trophyOutline,
  personAddOutline,
  addOutline,
  closeOutline,
  enterOutline,
  footballOutline,
  personOutline,
  eyeOutline,
  cashOutline,
  hourglassOutline,
} from 'ionicons/icons';
import { GroupService } from '@core/services/group.service';
import { ToastService } from '@core/services/toast.service';

interface Group {
  id: string;
  name: string;
  code: string;
  adminName: string;
  memberCount: number;
  type: 'casual' | 'prize';
  entryFee?: number;
  members: any[];
  createdAt: Date;
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
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonIcon,
    IonButton,
    IonFab,
    IonFabButton,
    IonModal,
    IonInput,
    IonNote,
    IonButtons,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
  ],
})
export class GroupsPage implements OnInit, OnDestroy {
  isJoinModalOpen = false;
  joinCode = '';
  isJoining = false;
  myGroups: Group[] = [];
  private groupsSubscription?: Subscription;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private toastService: ToastService
  ) {
    addIcons({
      peopleOutline,
      trophyOutline,
      personAddOutline,
      addOutline,
      closeOutline,
      enterOutline,
      footballOutline,
      personOutline,
      eyeOutline,
      cashOutline,
      hourglassOutline,
    });
  }

  ngOnInit() {
    this.loadUserGroups();
    
    // Subscribe to real-time group updates
    this.groupsSubscription = this.groupService.groups$.subscribe(() => {
      this.loadUserGroups();
    });
  }

  ngOnDestroy() {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
  }

  private loadUserGroups() {
    this.myGroups = this.groupService.getUserGroups();
  }

  openJoinModal() {
    this.isJoinModalOpen = true;
    this.joinCode = '';
  }

  closeJoinModal() {
    this.isJoinModalOpen = false;
    this.joinCode = '';
  }

  onJoinCodeInput(event: any) {
    const value = event.target.value.toUpperCase();
    this.joinCode = value;
  }

  validateGroupCode(code: string): boolean {
    const regex = /^[A-Z0-9]{6}$/;
    return regex.test(code);
  }

  async joinGroup() {
    if (!this.validateGroupCode(this.joinCode) || this.isJoining) return;

    this.isJoining = true;

    try {
      const group = this.groupService.findGroupByCode(this.joinCode);
      
      if (!group) {
        await this.toastService.showToast('Group not found with that code', 'error');
        return;
      }

      const updatedGroup = this.groupService.joinGroup(this.joinCode);
      
      if (updatedGroup) {
        await this.toastService.showToast(
          `Successfully joined ${updatedGroup.name}!`,
          'success'
        );
        this.closeJoinModal();
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

  viewGroupDetails(group: Group) {
    // Navigate to group details/leaderboard
    this.router.navigate(['/player/standings'], { 
      queryParams: { groupId: group.id } 
    });
  }

  viewGroupMembers(group: Group) {
    // Show group members in a modal or navigate to members page
    console.log('Viewing members for group:', group.name, group.members);
  }

  getPositionSuffix(position: number): string {
    if (position > 3 && position < 21) return 'th';
    switch (position % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  getUserPosition(group: Group): number {
    // TODO: Implement actual leaderboard position calculation
    return Math.floor(Math.random() * group.memberCount) + 1;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
