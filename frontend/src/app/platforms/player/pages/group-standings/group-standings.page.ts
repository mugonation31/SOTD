import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trophyOutline,
  arrowUpOutline,
  arrowDownOutline,
  removeOutline,
  peopleOutline,
  arrowBackOutline
} from 'ionicons/icons';
import { GroupService, Standing } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';

interface GroupDetails {
  id: string;
  name: string;
  code: string;
  memberCount: number;
}

@Component({
  selector: 'app-group-standings',
  templateUrl: './group-standings.page.html',
  styleUrls: ['./group-standings.page.scss'],
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
    IonButtons,
    IonBackButton,
    CommonModule
  ],
})
export class GroupStandingsPage implements OnInit {
  groupId: string = '';
  currentUserId: string | null = null;
  isLoading = false;
  group: GroupDetails | null = null;
  standings: Standing[] = [];
  userPosition: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    addIcons({
      trophyOutline,
      arrowUpOutline,
      arrowDownOutline,
      removeOutline,
      peopleOutline,
      arrowBackOutline
    });
  }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('groupId') || '';
    this.currentUserId = this.authService.getCurrentUser()?.id || null;

    this.loadGroupStandings();
  }

  private async loadGroupStandings() {
    this.isLoading = true;
    try {
      const groupWithStandings = await this.groupService.getGroupWithStandings(this.groupId);

      if (groupWithStandings) {
        this.group = groupWithStandings.group;
        this.standings = groupWithStandings.leaderboard;
        this.userPosition = groupWithStandings.userPosition;
      } else {
        // Group not found, navigate back
        this.router.navigate(['/player/standings']);
      }
    } catch (error) {
      console.error('Error loading group standings:', error);
      this.router.navigate(['/player/standings']);
    } finally {
      this.isLoading = false;
    }
  }

  getPositionChange(current: number, previous: number): string {
    if (current === previous) return 'same';
    return current < previous ? 'up' : 'down';
  }

  getPositionIcon(change: string): string {
    switch (change) {
      case 'up':
        return 'arrow-up-outline';
      case 'down':
        return 'arrow-down-outline';
      default:
        return 'remove-outline';
    }
  }

  getPositionColor(change: string): string {
    switch (change) {
      case 'up':
        return 'success';
      case 'down':
        return 'danger';
      default:
        return 'medium';
    }
  }

  isCurrentUser(userId: string): boolean {
    return userId === this.currentUserId;
  }

  goBack() {
    this.router.navigate(['/player/standings']);
  }
} 