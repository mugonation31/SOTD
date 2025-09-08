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
  IonProgressBar,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
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
  pulseOutline,
  trendingUpOutline,
  trendingDownOutline,
  warningOutline,
  alertCircleOutline,
  shieldCheckmarkOutline,
  chatbubbleOutline,
  sparklesOutline,
  medalOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { UserGreetingComponent } from '../../../../shared/components/user-greeting/user-greeting.component';
import { GroupService } from '@core/services/group.service';
import { Subscription } from 'rxjs';

// Existing interfaces - keeping all current functionality
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

// New Community Intelligence interfaces
interface CommunityHealthMetrics {
  healthScore: number; // 0-100
  engagementTrend: 'rising' | 'stable' | 'declining';
  participationRate: number;
  retentionRate: number;
  socialInteractionIndex: number;
  predictionQualityScore: number;
}

interface MemberInsight {
  id: string;
  name: string;
  engagementScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
  participationTrend: 'improving' | 'stable' | 'declining';
  lastActivity: string;
  predictionsSubmitted: number;
  averageAccuracy: number;
  socialInteractions: number;
  recommendedAction?: string;
}

interface CommunityAlert {
  id: string;
  type: 'engagement_drop' | 'member_risk' | 'participation_low' | 'celebration' | 'milestone';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionRequired: boolean;
  memberAffected?: string;
  timestamp: string;
}

interface EngagementInsight {
  category: string;
  currentValue: number;
  previousValue: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
  description: string;
  color: string;
}

interface CommunityMilestone {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  target: number;
  current: number;
  estimatedCompletion: string;
  celebration?: boolean;
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
    IonProgressBar,
    RouterLink,
    DatePipe,
    CurrencyPipe,
    TitleCasePipe,
    NgFor,
    NgIf,
    UserGreetingComponent,
  ],
})
export class DashboardPage implements OnInit, OnDestroy {
  // Existing properties - keeping all current functionality
  topPerformers: TopPerformer[] = [];

  currentGameweek: CurrentGameweek = {
    number: 15,
    deadline: '2024-01-20T11:30:00',
    submittedCount: 0,
    totalMembers: 0,
    allSubmitted: false,
    pendingMembers: [],
  };

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

  // New Community Intelligence properties
  communityHealth: CommunityHealthMetrics = {
    healthScore: 85,
    engagementTrend: 'rising',
    participationRate: 87,
    retentionRate: 92,
    socialInteractionIndex: 78,
    predictionQualityScore: 83,
  };

  memberInsights: MemberInsight[] = [];
  communityAlerts: CommunityAlert[] = [];
  engagementInsights: EngagementInsight[] = [];
  communityMilestones: CommunityMilestone[] = [];

  private subscription?: Subscription;

  constructor(
    private router: Router, 
    private toastService: ToastService,
    private groupService: GroupService
  ) {
    addIcons({
      trophyOutline,
      checkmarkCircleOutline,
      star,
      footballOutline,
      timeOutline,
      mailOutline,
      peopleOutline,
      cashOutline,
      starOutline,
      statsChartOutline,
      flashOutline,
      eyeOutline,
      peopleCircleOutline,
      pulseOutline,
      trendingUpOutline,
      trendingDownOutline,
      warningOutline,
      alertCircleOutline,
      shieldCheckmarkOutline,
      chatbubbleOutline,
      sparklesOutline,
      medalOutline,
    });
  }

  ngOnInit() {

    this.loadRealGroupData();
    this.subscribeToGroupUpdates();
    // Initialize Community Intelligence data
    this.initializeCommunityIntelligence();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadRealGroupData() {
    const adminGroups = this.groupService.getAdminGroups();


    // Calculate real group statistics (existing functionality)
    this.calculateGroupStats(adminGroups);
    this.calculateTopPerformers(adminGroups);
    this.calculateGameweekStatus(adminGroups);
    
    // Calculate Community Intelligence data (new functionality)
    this.calculateCommunityHealth(adminGroups);
    this.generateMemberInsights(adminGroups);
    this.generateCommunityAlerts(adminGroups);
  }

  private subscribeToGroupUpdates() {
    this.subscription = this.groupService.groups$.subscribe(() => {

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

  // Community Intelligence Methods
  private initializeCommunityIntelligence() {

    this.initializeEngagementInsights();
    this.initializeCommunityMilestones();
  }

  private calculateCommunityHealth(groups: any[]) {
    const totalMembers = groups.reduce((sum, group) => sum + group.members.length, 0);
    const activeMembers = groups.reduce((sum, group) => 
      sum + group.members.filter((m: any) => m.status === 'active').length, 0);
    
    // Calculate health metrics based on real data
    const participationRate = totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0;
    const engagementTrend = participationRate > 85 ? 'rising' : participationRate > 70 ? 'stable' : 'declining';
    
    this.communityHealth = {
      healthScore: Math.min(95, Math.max(60, participationRate + Math.floor(Math.random() * 15))),
      engagementTrend,
      participationRate,
      retentionRate: Math.min(98, participationRate + Math.floor(Math.random() * 10)),
      socialInteractionIndex: Math.floor(Math.random() * 30) + 65,
      predictionQualityScore: Math.floor(Math.random() * 20) + 75,
    };


  }

  private generateMemberInsights(groups: any[]) {
    const insights: MemberInsight[] = [];
    
    groups.forEach(group => {
      group.members.slice(0, 8).forEach((member: any, index: number) => {
        const engagementScore = Math.floor(Math.random() * 40) + 60;
        const riskLevel = engagementScore < 70 ? 'high' : engagementScore < 85 ? 'medium' : 'low';
        
        insights.push({
          id: member.id || `member-${index}`,
          name: member.name,
          engagementScore,
          riskLevel,
          participationTrend: Math.random() > 0.7 ? 'improving' : Math.random() > 0.5 ? 'stable' : 'declining',
          lastActivity: this.getRandomLastActivity(),
          predictionsSubmitted: Math.floor(Math.random() * 15) + 10,
          averageAccuracy: Math.floor(Math.random() * 30) + 60,
          socialInteractions: Math.floor(Math.random() * 20) + 5,
          recommendedAction: riskLevel === 'high' ? 'Send engagement boost' : riskLevel === 'medium' ? 'Monitor closely' : undefined,
        });
      });
    });

    this.memberInsights = insights.slice(0, 6); // Show top 6 insights

  }

  private generateCommunityAlerts(groups: any[]) {
    const alerts: CommunityAlert[] = [];
    const now = new Date();

    // Generate sample alerts based on community health
    if (this.communityHealth.engagementTrend === 'declining') {
      alerts.push({
        id: 'alert-1',
        type: 'engagement_drop',
        priority: 'high',
        title: 'Engagement Declining',
        description: 'Community engagement has dropped 15% this week',
        actionRequired: true,
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      });
    }

    // Add celebration alerts for milestones
    if (this.communityHealth.healthScore > 90) {
      alerts.push({
        id: 'alert-2',
        type: 'celebration',
        priority: 'medium',
        title: 'Community Thriving!',
        description: 'Your community health score reached 90+',
        actionRequired: false,
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      });
    }

    // Add member risk alerts
    const highRiskMembers = this.memberInsights.filter(m => m.riskLevel === 'high');
    if (highRiskMembers.length > 0) {
      alerts.push({
        id: 'alert-3',
        type: 'member_risk',
        priority: 'medium',
        title: `${highRiskMembers.length} Members at Risk`,
        description: 'Some members need engagement support',
        actionRequired: true,
        memberAffected: highRiskMembers[0].name,
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      });
    }

    this.communityAlerts = alerts;

  }

  private initializeEngagementInsights() {
    this.engagementInsights = [
      {
        category: 'Prediction Submissions',
        currentValue: 87,
        previousValue: 82,
        trend: 'up',
        percentage: 6,
        description: 'Weekly submission rate improved',
        color: 'success',
      },
      {
        category: 'Member Interaction',
        currentValue: 78,
        previousValue: 80,
        trend: 'down',
        percentage: -3,
        description: 'Social interactions slightly down',
        color: 'warning',
      },
      {
        category: 'Accuracy Average',
        currentValue: 83,
        previousValue: 83,
        trend: 'stable',
        percentage: 0,
        description: 'Prediction quality maintained',
        color: 'medium',
      },
      {
        category: 'Retention Rate',
        currentValue: 92,
        previousValue: 89,
        trend: 'up',
        percentage: 3,
        description: 'Member retention improving',
        color: 'success',
      },
    ];
  }

  private initializeCommunityMilestones() {
    this.communityMilestones = [
      {
        id: 'milestone-1',
        title: '100 Active Members',
        description: 'Reach 100 active participating members',
        progress: 78,
        target: 100,
        current: 78,
        estimatedCompletion: '2024-02-15',
      },
      {
        id: 'milestone-2',
        title: '90% Participation Rate',
        description: 'Achieve 90% weekly participation',
        progress: 87,
        target: 90,
        current: 87,
        estimatedCompletion: '2024-01-30',
      },
      {
        id: 'milestone-3',
        title: 'Community Champion',
        description: 'Maintain 95+ health score for 30 days',
        progress: 60,
        target: 30,
        current: 18,
        estimatedCompletion: '2024-02-20',
      },
    ];
  }

  private getRandomLastActivity(): string {
    const activities = [
      '2 hours ago',
      '5 hours ago',
      '1 day ago',
      '2 days ago',
      '3 days ago',
      '1 week ago',
    ];
    return activities[Math.floor(Math.random() * activities.length)];
  }

  // Helper methods for Community Intelligence display
  getCommunityHealthColor(): string {
    if (this.communityHealth.healthScore >= 85) return 'success';
    if (this.communityHealth.healthScore >= 70) return 'warning';
    return 'danger';
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up': case 'rising': case 'improving': return 'trending-up-outline';
      case 'down': case 'declining': return 'trending-down-outline';
      default: return 'pulse-outline';
    }
  }

  getTrendColor(trend: string): string {
    switch (trend) {
      case 'up': case 'rising': case 'improving': return 'success';
      case 'down': case 'declining': return 'danger';
      default: return 'medium';
    }
  }

  getRiskLevelColor(riskLevel: string): string {
    switch (riskLevel) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'medium';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'medium';
    }
  }
}
