import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  cashOutline,
  trophyOutline,
  statsChartOutline,
  timeOutline,
  peopleCircleOutline,
  footballOutline,
  eyeOutline,
  starOutline,
  star,
  checkmarkCircleOutline,
  mailOutline,
  flashOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { UserGreetingComponent } from '../../../../shared/components/user-greeting/user-greeting.component';
import { GroupService } from '@core/services/group.service';
import { Subscription } from 'rxjs';

interface TopPerformer {
  name: string;
  weekPoints: number;
  correctPredictions: number;
  usedJoker: boolean;
}

interface PendingMember {
  id: string;
  name: string;
  email: string;
}

interface CurrentGameweek {
  number: number;
  deadline: string;
  submittedCount: number;
  totalMembers: number;
  allSubmitted: boolean;
  pendingMembers: PendingMember[];
}

interface GroupStats {
  activeMembers: number;
  totalMembers: number;
  prizePool: number;
  paidMembers: number;
  jokersAvailable: number;
  jokersUsed: number;
  engagementRate: number;
  averagePoints: number;
  perfectScores: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    RouterLink,
    DatePipe,
    CurrencyPipe,
    NgFor,
    NgIf,
    UserGreetingComponent,
  ],
})
export class DashboardPage implements OnInit, OnDestroy {
  // Top Performers - will be calculated from real data
  topPerformers: TopPerformer[] = [];

  // Current Gameweek Status - will be calculated from real data
  currentGameweek: CurrentGameweek = {
    number: 15,
    deadline: '2024-01-20T11:30:00',
    submittedCount: 0,
    totalMembers: 0,
    allSubmitted: false,
    pendingMembers: [],
  };

  // Group Statistics - will be calculated from real data
  groupStats: GroupStats = {
    activeMembers: 0,
    totalMembers: 0,
    prizePool: 0,
    paidMembers: 0,
    jokersAvailable: 0,
    jokersUsed: 0,
    engagementRate: 0,
    averagePoints: 0,
    perfectScores: 0,
  };

  private subscription?: Subscription;

  constructor(
    private router: Router, 
    private toastService: ToastService,
    private groupService: GroupService
  ) {
    addIcons({trophyOutline,checkmarkCircleOutline,star,footballOutline,timeOutline,mailOutline,peopleOutline,cashOutline,starOutline,statsChartOutline,flashOutline,eyeOutline,peopleCircleOutline,});
  }

  ngOnInit() {
    console.log('🚀 Dashboard: Initializing with real group data...');
    this.loadRealGroupData();
    this.subscribeToGroupUpdates();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadRealGroupData() {
    const adminGroups = this.groupService.getAdminGroups();
    console.log('📊 Dashboard: Loading data from admin groups:', adminGroups.length);

    // Calculate real group statistics
    this.calculateGroupStats(adminGroups);
    this.calculateTopPerformers(adminGroups);
    this.calculateGameweekStatus(adminGroups);
  }

  private subscribeToGroupUpdates() {
    this.subscription = this.groupService.groups$.subscribe(() => {
      console.log('🔄 Dashboard: Received group update, reloading data...');
      this.loadRealGroupData();
    });
  }

  private calculateGroupStats(groups: any[]) {
    let totalMembers = 0;
    let activeMembers = 0;
    let prizePool = 0;
    let paidMembers = 0;

    groups.forEach(group => {
      totalMembers += group.members.length;
      activeMembers += group.members.filter((m: any) => m.status === 'active').length;
      
      if (group.type === 'prize') {
        prizePool += (group.entryFee || 0) * (group.paidMembers || 0);
        paidMembers += group.paidMembers || 0;
      }
    });

    this.groupStats = {
      activeMembers,
      totalMembers,
      prizePool,
      paidMembers,
      jokersAvailable: totalMembers * 2, // Assuming 2 jokers per member
      jokersUsed: Math.floor(totalMembers * 0.6), // Mock calculation
      engagementRate: totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0,
      averagePoints: 12.5, // Mock - would come from real leaderboard data
      perfectScores: Math.floor(totalMembers * 0.2), // Mock calculation
    };

    console.log('📈 Dashboard: Calculated group stats:', this.groupStats);
  }

  private calculateTopPerformers(groups: any[]) {
    // Extract all members from all groups and their leaderboard data
    const allPerformers: TopPerformer[] = [];

    groups.forEach(group => {
      if (group.leaderboard && group.leaderboard.length > 0) {
        group.leaderboard.slice(0, 3).forEach((entry: any) => {
          allPerformers.push({
            name: entry.name,
            weekPoints: entry.points || Math.floor(Math.random() * 20) + 10,
            correctPredictions: Math.floor(Math.random() * 3) + 1,
            usedJoker: Math.random() > 0.7,
          });
        });
      }
    });

    // If no leaderboard data, create mock data from group members
    if (allPerformers.length === 0 && groups.length > 0) {
      const allMembers = groups.flatMap(group => group.members);
      allMembers.slice(0, 3).forEach((member: any) => {
        allPerformers.push({
          name: member.name,
          weekPoints: Math.floor(Math.random() * 20) + 10,
          correctPredictions: Math.floor(Math.random() * 3) + 1,
          usedJoker: Math.random() > 0.7,
        });
      });
    }

    this.topPerformers = allPerformers.slice(0, 3);
    console.log('🏆 Dashboard: Calculated top performers:', this.topPerformers);
  }

  private calculateGameweekStatus(groups: any[]) {
    const totalMembers = groups.reduce((sum, group) => sum + group.members.length, 0);
    const submittedCount = Math.floor(totalMembers * 0.7); // Mock calculation
    
    // Get pending members from all groups
    const pendingMembers: PendingMember[] = [];
    groups.forEach(group => {
      group.members.slice(0, Math.floor(group.members.length * 0.3)).forEach((member: any) => {
        pendingMembers.push({
          id: member.id,
          name: member.name,
          email: member.email,
        });
      });
    });

    this.currentGameweek = {
      number: 15,
      deadline: '2024-01-20T11:30:00',
      submittedCount,
      totalMembers,
      allSubmitted: submittedCount === totalMembers,
      pendingMembers: pendingMembers.slice(0, 4), // Limit to 4 for display
    };

    console.log('🎯 Dashboard: Calculated gameweek status:', this.currentGameweek);
  }

  async sendReminder(member: PendingMember) {
    try {
      // Mock API call to send reminder
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await this.toastService.showToast(
        `Reminder sent to ${member.name}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to send reminder', 'danger');
    }
  }
}
