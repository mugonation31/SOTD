import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

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
export class GroupStandingsPage implements OnInit, OnDestroy {
  groupId: string = '';
  currentUserId: string | null = null;
  group: GroupDetails | null = null;
  standings: Standing[] = [];
  userPosition: number | null = null;
  private groupsSubscription?: Subscription;

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
    
    // Subscribe to group updates
    this.groupsSubscription = this.groupService.groups$.subscribe(() => {
      this.loadGroupStandings();
    });
  }

  ngOnDestroy() {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
  }

  private loadGroupStandings() {
    // Use the new optimized method from group service
    const groupWithStandings = this.groupService.getGroupWithStandings(this.groupId);
    
    if (groupWithStandings) {
      this.group = groupWithStandings.group;
      this.standings = groupWithStandings.leaderboard;
      this.userPosition = groupWithStandings.userPosition;
    } else {
      // Group not found, navigate back
      this.router.navigate(['/player/standings']);
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