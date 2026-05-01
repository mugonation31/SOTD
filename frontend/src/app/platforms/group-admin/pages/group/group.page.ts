import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonSkeletonText,
  IonInput,
  IonItem,
  IonLabel,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  personAddOutline,
  arrowDownOutline,
  copyOutline,
  shieldOutline,
  trashOutline,
} from 'ionicons/icons';
import { GroupService, Standing } from '@core/services/group.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { AuthService } from '@core/services/auth.service';
import { LoggerService } from '@core/services/logger.service';
import { SupabaseError } from '@core/errors/supabase-error';
import { LeaderboardComponent } from '../../../../shared/components/leaderboard/leaderboard.component';

interface ViewMember {
  membershipId: string;
  userId: string;
  username: string;
  joinedAt: Date;
  isAdmin: boolean;
  isCreator: boolean; // matches groups.admin_id; can never be demoted
  isCaller: boolean;  // matches auth.uid(); used to suppress self-demote of creator
}

@Component({
  selector: 'app-group-admin-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonSkeletonText,
    IonInput,
    IonItem,
    IonLabel,
    LeaderboardComponent,
  ],
})
export class GroupAdminGroupPage implements OnInit {
  isLoading = true;
  hasGroup = false;

  // Group fields (only meaningful when hasGroup === true).
  groupId = '';
  groupName = '';
  groupCode = '';
  creatorUserId = '';
  members: ViewMember[] = [];

  // Full leaderboard for the group, used by the leaderboard card
  // rendered above the members list. Same shape as the player
  // group-standings page; admin home's "View full leaderboard" button
  // routes here now.
  leaderboard: Standing[] = [];

  // Shared LeaderboardComponent inputs
  currentUserId: string | null = null;
  userPosition: number | null = null;

  // Empty-state form fields.
  newGroupName = '';
  isCreating = false;

  // Caps the UI promote button — server enforces too via the DB trigger.
  readonly MAX_ADMINS = 3;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private supabaseDataService: SupabaseDataService,
    private authService: AuthService,
    private logger: LoggerService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    addIcons({
      peopleOutline,
      personAddOutline,
      arrowDownOutline,
      copyOutline,
      shieldOutline,
      trashOutline,
    });
  }

  ngOnInit(): void {
    void this.load();
  }

  private async load(): Promise<void> {
    this.isLoading = true;
    try {
      const callerId = this.authService.getCurrentUser()?.id ?? '';
      const adminGroups = await this.groupService.getAdminGroups();
      const primary = adminGroups[0];
      if (!primary) {
        // Empty-state: admin hasn't created a group yet. Inline create
        // form replaces the deleted /create-group route.
        this.hasGroup = false;
        return;
      }
      this.hasGroup = true;
      this.groupId = primary.id;
      this.groupName = primary.name;
      this.groupCode = primary.code;
      this.creatorUserId = primary.admin_id;

      // getAdminGroups already attaches `members` via getGroupMembers
      // (which goes through the slim member_profiles view from
      // migration 015), so we don't need a second query here.
      const raw = (primary.members ?? []) as Array<{
        id: string;
        user_id: string;
        joined_at: string;
        is_admin: boolean;
        profiles: { username: string } | null;
      }>;

      this.members = raw
        .map((m) => ({
          membershipId: m.id,
          userId: m.user_id,
          username: m.profiles?.username ?? 'Unknown',
          joinedAt: m.joined_at ? new Date(m.joined_at) : new Date(0),
          isAdmin: m.is_admin === true,
          isCreator: m.user_id === this.creatorUserId,
          isCaller: m.user_id === callerId,
        }))
        // Admins first (creator at the very top), then players, alpha
        // within each band — predictable order for promote/demote.
        .sort((a, b) => {
          if (a.isCreator !== b.isCreator) return a.isCreator ? -1 : 1;
          if (a.isAdmin !== b.isAdmin) return a.isAdmin ? -1 : 1;
          return a.username.localeCompare(b.username);
        });

      // Pull the full Standing[] for the leaderboard card. Reuses the
      // same group.service.getUserGroupsWithStandings pipeline as the
      // player home so badges (ADMIN, YOU) are computed identically.
      this.currentUserId = callerId || null;
      try {
        const standings = await this.groupService.getUserGroupsWithStandings();
        const matched = standings.find((s) => s.group.id === this.groupId);
        this.leaderboard = matched ? matched.leaderboard : [];
        this.userPosition = this.leaderboard.find(s => s.userId === callerId)?.position ?? null;
      } catch (lbErr) {
        this.logger.warn('group-admin-group.loadLeaderboard', lbErr);
        this.leaderboard = [];
      }
    } catch (error) {
      this.logger.error('group-admin-group.load', error);
      await this.errorToast('Failed to load group');
    } finally {
      this.isLoading = false;
    }
  }

  get adminCount(): number {
    return this.members.filter((m) => m.isAdmin).length;
  }



  get atAdminCap(): boolean {
    return this.adminCount >= this.MAX_ADMINS;
  }

  async createGroup(): Promise<void> {
    const name = this.newGroupName.trim();
    if (!name || this.isCreating) return;
    this.isCreating = true;
    try {
      await this.groupService.createGroup({ name });
      // First-time admin onboarding: flip profiles.first_login = false so
      // subsequent logins route to /group-admin/home (not the create-group
      // empty-state). Same call the player join-group page makes when a
      // new player joins their first group.
      try {
        await this.authService.markFirstLoginComplete();
      } catch (firstLoginErr) {
        // Non-fatal — group is already created. Just log; the user can
        // still proceed and we'll re-attempt the flag flip next login.
        this.logger.warn(
          'group-admin-group.createGroup.markFirstLoginComplete',
          firstLoginErr,
        );
      }
      await this.successToast(`Created "${name}"`);
      await this.load();
    } catch (error) {
      this.logger.error('group-admin-group.createGroup', error);
      await this.errorToast(
        error instanceof SupabaseError ? error.userMessage : 'Failed to create group',
      );
    } finally {
      this.isCreating = false;
    }
  }

  async promote(member: ViewMember): Promise<void> {
    if (member.isAdmin || this.atAdminCap) return;
    const alert = await this.alertController.create({
      header: 'Promote to admin',
      message: `Promote ${member.username} to admin? They'll be able to manage members and edit group settings.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Promote', role: 'confirm' },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role !== 'confirm') return;

    try {
      await this.supabaseDataService.promoteMemberToAdmin(member.membershipId);
      await this.successToast(`${member.username} promoted to admin`);
      await this.load();
    } catch (error) {
      this.logger.error('group-admin-group.promote', error);
      await this.errorToast(
        error instanceof SupabaseError ? error.userMessage : 'Failed to promote',
      );
    }
  }

  async demote(member: ViewMember): Promise<void> {
    if (!member.isAdmin || member.isCreator) return;
    const alert = await this.alertController.create({
      header: 'Demote to player',
      message: `Demote ${member.username}? They'll lose admin rights but stay in the group.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Demote', role: 'confirm', cssClass: 'danger' },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role !== 'confirm') return;

    try {
      await this.supabaseDataService.demoteAdminToMember(member.membershipId);
      await this.successToast(`${member.username} demoted`);
      await this.load();
    } catch (error) {
      this.logger.error('group-admin-group.demote', error);
      await this.errorToast(
        error instanceof SupabaseError ? error.userMessage : 'Failed to demote',
      );
    }
  }

  async copyGroupCode(): Promise<void> {
    if (!this.groupCode) return;
    try {
      await navigator.clipboard.writeText(this.groupCode);
      await this.successToast(`Code ${this.groupCode} copied`);
    } catch {
      // Clipboard unavailable — code is on screen, no fallback needed.
    }
  }

  private async successToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 1800,
      color: 'success',
      position: 'top',
    });
    await toast.present();
  }

  private async errorToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2400,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }
}
