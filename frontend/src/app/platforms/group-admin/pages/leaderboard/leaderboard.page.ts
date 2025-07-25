import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

interface GroupStanding {
  group: {
    id: string;
    name: string;
    code: string;
    memberCount: number;
    type: 'casual' | 'prize';
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
    NgFor,
    NgIf,
  ],
})
export class LeaderboardPage implements OnInit, OnDestroy {
  currentUserId: string | null = null;
  groupStandings: GroupStanding[] = [];
  private groupsSubscription?: Subscription;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    addIcons({
      footballOutline,
      personOutline,
      peopleOutline,
      chevronForwardOutline,
      addOutline,
    });
  }

  ngOnInit() {
    console.log('🚀 Leaderboard: Initializing...');
    this.currentUserId = this.authService.getCurrentUser()?.id || null;
    this.loadGroupStandings();
    
    // Subscribe to group updates for real-time member count and standings updates
    this.groupsSubscription = this.groupService.groups$.subscribe(() => {
      console.log('🔄 Leaderboard: Received group update, reloading standings...');
      this.loadGroupStandings();
    });
  }

  ngOnDestroy() {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
  }

  private loadGroupStandings() {
    console.log('📊 Leaderboard: Loading group standings...');
    const groupsWithLeaderboards = this.groupService.getAdminGroupsWithLeaderboards();
    
    this.groupStandings = groupsWithLeaderboards.map(item => {
      // Use the centralized conversion function from the service
      const convertedLeaderboard = this.groupService.convertToStandings(item.leaderboard);
      
      // Ensure member count is synced with actual members
      const actualMemberCount = item.group.members.length;
      
      console.log(`📋 Group "${item.group.name}": memberCount=${item.group.memberCount}, actualMembers=${actualMemberCount}`);
      
      return {
        group: {
          id: item.group.id,
          name: item.group.name,
          code: item.group.code,
          memberCount: actualMemberCount, // Use actual member count
          type: item.group.type
        },
        leaderboard: convertedLeaderboard,
        adminPosition: item.adminPosition
      };
    });
    
    console.log('✅ Leaderboard: Loaded standings for', this.groupStandings.length, 'groups');
    console.log('📊 Member counts:', this.groupStandings.map(gs => ({ 
      name: gs.group.name, 
      memberCount: gs.group.memberCount,
      leaderboardEntries: gs.leaderboard.length
    })));
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
