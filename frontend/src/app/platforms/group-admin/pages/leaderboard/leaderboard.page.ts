import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonBadge,
  IonIcon,
  IonButtons,
  IonButton,
  IonSpinner,
  ToastController,
} from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  footballOutline,
  personOutline,
  chevronForwardOutline,
  addOutline,
} from 'ionicons/icons';
import { GroupService, Standing } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';

interface GroupStanding {
  group: {
    id: string;
    name: string;
    code: string;
    memberCount: number;
  };
  leaderboard: Standing[];
  adminPosition: number | null;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonBadge,
    IonIcon,
    IonButtons,
    IonButton,
    IonSpinner,
    NgFor,
    NgIf,
  ],
})
export class LeaderboardPage implements OnInit {
  currentUserId: string | null = null;
  isLoading = false;
  groupStandings: GroupStanding[] = [];

  constructor(
    private router: Router,
    private groupService: GroupService,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    addIcons({
      footballOutline,
      personOutline,
      peopleOutline,
      chevronForwardOutline,
      addOutline,
    });
  }

  // Ionic fires ionViewWillEnter on every entry (first + subsequent) so
  // it is the single refresh hook. ngOnInit only resolves the current
  // user id once — no data fetch — so we avoid a double round-trip on
  // first navigation.
  async ngOnInit(): Promise<void> {
    this.currentUserId = this.authService.getCurrentUser()?.id || null;
  }

  async ionViewWillEnter() {
    this.currentUserId = this.authService.getCurrentUser()?.id || null;
    await this.loadGroupStandings();
  }

  private async loadGroupStandings() {
    this.isLoading = true;
    try {
      const adminGroups = await this.groupService.getAdminGroups();

      const results: GroupStanding[] = [];
      for (const group of adminGroups) {
        const leaderboard = await this.groupService.getGroupLeaderboard(group.id);

        // Find admin position in leaderboard
        const adminIndex = leaderboard.findIndex(
          (entry: any) => entry.user_id === this.currentUserId
        );

        results.push({
          group: {
            id: group.id,
            name: group.name,
            code: group.code,
            memberCount: group.current_members || 0,
          },
          leaderboard: leaderboard.map((entry: any, index: number) => ({
            position: index + 1,
            previousPosition: index + 1,
            userId: entry.user_id,
            name: entry.profiles?.username || 'Unknown',
            avatar: entry.profiles?.avatar_url || undefined,
            played: entry.games_played || 0,
            points: entry.total_points || 0,
            correctScores: entry.correct_scores || 0,
            correctResults: entry.correct_results || 0,
            jokerUsed: entry.jokers_used || 0,
            isAdmin: entry.user_id === group.admin_id,
          })),
          adminPosition: adminIndex >= 0 ? adminIndex + 1 : null,
        });
      }

      this.groupStandings = results;
    } catch (error) {
      console.error('Error loading group standings:', error);
      this.groupStandings = [];
      await this.showErrorToast('Unable to load standings. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }

  // Track by function for better performance when rendering groups
  trackByGroupId(index: number, item: GroupStanding): string {
    return item.group.id;
  }

  viewGroupLeaderboard(groupId: string) {
    this.router.navigate(['/group-admin/groups', groupId, 'leaderboard']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  createNewGroup() {
    this.router.navigate(['/group-admin/groups']);
  }
}
