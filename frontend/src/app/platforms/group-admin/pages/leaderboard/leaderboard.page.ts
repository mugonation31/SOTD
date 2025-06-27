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
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { Subscription } from 'rxjs';

interface Standing {
  position: number;
  userId: string;
  name: string;
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
  adminPosition: number | null;
}

@Component({
  selector: 'app-leaderboard',
  template: `
    <ion-header>
      <ion-toolbar>
        <div class="logo-container" (click)="navigateTo('/group-admin/dashboard')">
          <ion-icon name="football-outline" class="football-icon"></ion-icon>
          <div class="logo-text">
            <span class="logo-sotd">SOTD</span>
            <span class="logo-subtitle">Predict 3</span>
          </div>
        </div>
        <ion-buttons slot="end">
          <ion-button (click)="navigateTo('/group-admin/settings')">
            <ion-icon name="person-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Page Title -->
      <div class="page-header">
        <h1>My Groups</h1>
        <p *ngIf="groupStandings.length > 0">{{ groupStandings.length }} group{{ groupStandings.length === 1 ? '' : 's' }} managed</p>
      </div>

      <!-- No Groups Message -->
      <ion-card *ngIf="groupStandings.length === 0" class="empty-state">
        <ion-card-content>
          <ion-icon name="people-outline" size="large" color="medium"></ion-icon>
          <h3>No Groups Created</h3>
          <p>Create your first group to see leaderboards!</p>
          <ion-button (click)="createNewGroup()" fill="outline">
            <ion-icon name="add-outline" slot="start"></ion-icon>
            Create Group
          </ion-button>
        </ion-card-content>
      </ion-card>

      <!-- Groups List -->
      <ion-list *ngIf="groupStandings.length > 0">
        <ion-item 
          *ngFor="let groupStanding of groupStandings; trackBy: trackByGroupId" 
          button 
          (click)="viewGroupLeaderboard(groupStanding.group.id)"
          class="group-item">
          
          <div class="group-content">
            <div class="group-main">
              <h3 class="group-name">{{ groupStanding.group.name }}</h3>
              <div class="group-details">
                                 <span class="member-count">{{ groupStanding.group.memberCount }} members</span>
                <span class="group-type" [class.prize]="groupStanding.group.type === 'prize'">
                  {{ groupStanding.group.type === 'prize' ? 'Prize Pool' : 'Casual' }}
                </span>
                </div>
              <p class="group-code">Code: {{ groupStanding.group.code }}</p>
                    </div>
            
            <div class="admin-info">
              <div class="admin-label">Admin</div>
              <div class="member-stats">{{ groupStanding.group.memberCount }} {{ groupStanding.group.memberCount === 1 ? 'player' : 'players' }}</div>
                  </div>
                </div>
          
          <ion-icon name="chevron-forward-outline" slot="end" color="medium"></ion-icon>
            </ion-item>
          </ion-list>
    </ion-content>
  `,
  styles: [`
    // Header styles
    .logo-container {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }

    .football-icon {
          font-size: 24px;
      color: var(--ion-color-primary);
    }

    .logo-text {
      display: flex;
      flex-direction: column;
          line-height: 1;
        }

    .logo-sotd {
      font-size: 18px;
      font-weight: 600;
      color: var(--ion-color-dark);
    }

    .logo-subtitle {
          font-size: 12px;
          color: var(--ion-color-medium);
    }

    // Page header
    .page-header {
      margin-bottom: 24px;
      
      h1 {
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: var(--ion-color-dark);
      }
      
      p {
        margin: 0;
        color: var(--ion-color-medium);
        font-size: 16px;
      }
    }

    // Empty state
    .empty-state {
      text-align: center;
      margin-top: 40px;
      border-radius: 12px;
      
      ion-card-content {
        padding: 40px 24px;
        }

        ion-icon {
        margin-bottom: 16px;
        opacity: 0.6;
      }
      
      h3 {
        font-size: 20px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: var(--ion-color-dark);
      }
      
      p {
        margin: 0 0 24px 0;
        color: var(--ion-color-medium);
        font-size: 16px;
      }
      
      ion-button {
        --border-radius: 8px;
        --padding-start: 20px;
        --padding-end: 20px;
        --padding-top: 12px;
        --padding-bottom: 12px;
          font-weight: 500;
        }
    }

    // Groups list
    ion-list {
      background: transparent;
      padding: 0;
    }

    .group-item {
      --background: white;
      --border-radius: 12px;
      --padding-start: 0;
      --padding-end: 0;
      --inner-padding-start: 16px;
      --inner-padding-end: 16px;
      --inner-padding-top: 16px;
      --inner-padding-bottom: 16px;
      --min-height: auto;
      
      margin-bottom: 12px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      
      &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        transform: translateY(-1px);
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }

    .group-content {
        display: flex;
        align-items: center;
      justify-content: space-between;
      width: 100%;
        gap: 16px;
    }

    .group-main {
      flex: 1;
      min-width: 0;
    }

    .group-name {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: var(--ion-color-dark);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .group-details {
          display: flex;
          align-items: center;
      gap: 12px;
      margin-bottom: 4px;
    }

    .member-count {
      font-size: 14px;
      color: var(--ion-color-medium);
      font-weight: 500;
    }

    .group-type {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 6px;
      background: var(--ion-color-light);
      color: var(--ion-color-medium);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      
      &.prize {
        background: var(--ion-color-primary);
        color: white;
      }
    }

    .group-code {
      font-size: 14px;
      color: var(--ion-color-medium);
      margin: 0;
      font-family: 'Courier New', monospace;
      font-weight: 500;
    }

    .admin-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      min-width: 80px;
    }

    .admin-label {
      font-size: 12px;
      color: var(--ion-color-primary);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .member-stats {
      font-size: 14px;
      color: var(--ion-color-medium);
      font-weight: 500;
    }
  `],
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
    const groupsWithLeaderboards = this.groupService.getAdminGroupsWithLeaderboards();
    
    this.groupStandings = groupsWithLeaderboards.map(item => {
      const convertedLeaderboard = this.convertToStandings(item.leaderboard);
      
      return {
        group: {
          id: item.group.id,
          name: item.group.name,
          code: item.group.code,
          memberCount: item.group.memberCount,
          type: item.group.type
        },
        leaderboard: convertedLeaderboard,
        adminPosition: item.adminPosition
      };
    });
  }

  // Convert GroupLeaderboardEntry to Standing format
  private convertToStandings(entries: any[]): Standing[] {
    return entries.map(entry => ({
      position: entry.position,
      userId: entry.memberId,
      name: entry.name,
      played: entry.played,
      points: entry.points,
      correctScores: Math.floor(entry.points * 0.1), // Mock calculation
      correctResults: Math.floor(entry.points * 0.2), // Mock calculation
      jokerUsed: entry.jokerUsed
    }));
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
