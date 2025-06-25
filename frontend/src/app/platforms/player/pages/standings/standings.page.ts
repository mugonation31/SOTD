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
  IonBadge,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonAvatar,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  trophyOutline,
  arrowUpOutline,
  arrowDownOutline,
  removeOutline,
  peopleOutline,
  footballOutline,
  personOutline, personAddOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { Subscription } from 'rxjs';

interface Standing {
  position: number;
  previousPosition: number;
  userId: string;
  name: string;
  avatar?: string;
  played: number;
  points: number;
  correctScores: number;
  correctResults: number;
  jokerUsed: number;
}

interface GroupStanding {
  group: {
    id: string;
    name: string;
    code: string;
    memberCount: number;
    type: 'casual' | 'prize';
  };
  leaderboard: Standing[];
  userPosition: number | null;
}

@Component({
  selector: 'app-standings',
  templateUrl: './standings.page.html',
  styleUrls: ['./standings.page.scss'],
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
    IonSegment,
    IonSegmentButton,
    IonAvatar,
    DatePipe,
    NgFor,
    NgIf,
    FormsModule,
    IonButtons,
    IonButton,
  ],
})
export class StandingsPage implements OnInit, OnDestroy {
  selectedSegment = 'group';
  currentUserId: string | null = null;
  groupStandings: GroupStanding[] = [];
  selectedGroupIndex = 0;
  private groupsSubscription?: Subscription;

  // Mock data for overall standings (keep for now)
  overallStandings: Standing[] = [
    {
      position: 1,
      previousPosition: 1,
      userId: '1',
      name: 'John Smith',
      played: 15,
      points: 245,
      correctScores: 18,
      correctResults: 35,
      jokerUsed: 1,
    },
    {
      position: 2,
      previousPosition: 3,
      userId: '2',
      name: 'You',
      played: 15,
      points: 230,
      correctScores: 16,
      correctResults: 32,
      jokerUsed: 2,
    },
    {
      position: 3,
      previousPosition: 2,
      userId: '3',
      name: 'Sarah Wilson',
      played: 15,
      points: 225,
      correctScores: 15,
      correctResults: 33,
      jokerUsed: 1,
    },
  ];

  constructor(
    private router: Router,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    addIcons({footballOutline,personOutline,peopleOutline,trophyOutline,personAddOutline,arrowUpOutline,arrowDownOutline,removeOutline,});
  }

  ngOnInit() {
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
    const groupsWithLeaderboards = this.groupService.getUserGroupsWithLeaderboards();
    this.groupStandings = groupsWithLeaderboards.map(item => {
      const convertedLeaderboard = this.convertToStandings(item.leaderboard);
      const currentUser = this.authService.getCurrentUser();
      const userPosition = currentUser 
        ? convertedLeaderboard.findIndex(entry => entry.userId === currentUser.id) + 1
        : null;
      
      return {
        group: {
          id: item.group.id,
          name: item.group.name,
          code: item.group.code,
          memberCount: item.group.memberCount,
          type: item.group.type
        },
        leaderboard: convertedLeaderboard,
        userPosition: userPosition || null
      };
    });
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

  get currentGroupStandings(): Standing[] {
    return this.groupStandings[this.selectedGroupIndex]?.leaderboard || [];
  }

  get currentGroup(): GroupStanding | null {
    return this.groupStandings[this.selectedGroupIndex] || null;
  }

  selectGroup(index: number) {
    this.selectedGroupIndex = index;
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

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
