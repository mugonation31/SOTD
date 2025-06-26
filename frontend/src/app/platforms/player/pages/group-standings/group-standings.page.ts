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
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { Subscription } from 'rxjs';

interface Standing {
  position: number;
  previousPosition: number;
  userId: string;
  name: string;
  played: number;
  points: number;
  correctScores: number;
  correctResults: number;
  jokerUsed: number;
}

interface GroupDetails {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  type: 'casual' | 'prize';
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
    const allGroups = this.groupService.getAllGroups();
    const group = allGroups.find(g => g.id === this.groupId);
    
    if (group) {
      this.group = {
        id: group.id,
        name: group.name,
        code: group.code,
        memberCount: group.memberCount,
        type: group.type
      };
      
      const leaderboard = this.groupService.getGroupLeaderboard(this.groupId);
      this.standings = this.convertToStandings(leaderboard);
      this.userPosition = this.currentUserId 
        ? this.standings.findIndex(entry => entry.userId === this.currentUserId) + 1 || null
        : null;
    } else {
      // Group not found, navigate back
      this.router.navigate(['/player/standings']);
    }
  }

  // Convert GroupLeaderboardEntry to Standing format
  private convertToStandings(entries: any[]): Standing[] {
    return entries.map(entry => ({
      position: entry.position,
      previousPosition: entry.position, // Use same as position for now
      userId: entry.memberId,
      name: entry.name,
      played: entry.played,
      points: entry.points,
      correctScores: Math.floor(entry.points * 0.1), // Mock calculation
      correctResults: Math.floor(entry.points * 0.2), // Mock calculation
      jokerUsed: entry.jokerUsed
    }));
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