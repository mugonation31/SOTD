import { Component, OnInit } from '@angular/core';
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
  IonSpinner,
  AlertController,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  logOutOutline,
} from 'ionicons/icons';
import { GroupService } from '@core/services/group.service';
import { ToastService } from '@core/services/toast.service';
import { AuthService } from '@core/services/auth.service';
import { LoggerService } from '@core/services/logger.service';
import { SupabaseError } from '@core/errors/supabase-error';

interface Group {
  id: string;
  name: string;
  code: string;
  admin_id: string;
  adminName: string;
  memberCount: number;
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
    IonSpinner,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
  ],
})
export class GroupsPage implements OnInit {
  isJoinModalOpen = false;
  joinCode = '';
  isJoining = false;
  isLoading = false;
  myGroups: Group[] = [];
  currentUserId: string | null = null;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private toastService: ToastService,
    private alertController: AlertController,
    private authService: AuthService,
    private logger: LoggerService,
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
      logOutOutline,
    });
  }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.currentUserId = user?.id || null;
    this.loadUserGroups();
  }

  private async loadUserGroups() {
    this.isLoading = true;
    try {
      this.myGroups = await this.groupService.getUserGroups();
    } catch (error) {
      this.logger.error('player-groups.loadUserGroups', error);
    } finally {
      this.isLoading = false;
    }
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
      const group = await this.groupService.findGroupByCode(this.joinCode);

      if (!group) {
        await this.toastService.showToast('Group not found with that code', 'error');
        return;
      }

      await this.groupService.joinGroup(this.joinCode);

      await this.toastService.showToast(
        `Successfully joined ${group.name}!`,
        'success'
      );
      this.closeJoinModal();
      this.loadUserGroups();
    } catch (error) {
      this.logger.error('player-groups.joinGroup', error);
      // Only SupabaseError carries a curated userMessage safe to render.
      // Native fetch / generic Error `.message` may contain URLs, tokens,
      // or backend hints — never echo them to the user.
      const message =
        error instanceof SupabaseError ? error.userMessage : 'Error joining group';
      await this.toastService.showToast(message, 'error');
    } finally {
      this.isJoining = false;
    }
  }

  async leaveGroup(group: Group) {
    const alert = await this.alertController.create({
      header: 'Leave Group',
      message: `Are you sure you want to leave "${group.name}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Leave', role: 'confirm', cssClass: 'danger' },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === 'confirm') {
      try {
        await this.groupService.leaveGroup(group.id);
        await this.toastService.showToast(`You have left "${group.name}"`, 'success');
        await this.loadUserGroups();
      } catch {
        await this.toastService.showToast('Failed to leave group. Please try again.', 'error');
      }
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
