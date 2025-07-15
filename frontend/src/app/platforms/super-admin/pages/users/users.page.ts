import { Component, OnInit, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSearchbar,
  IonBadge,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonProgressBar,
  IonChip,
  IonModal,
  IonButtons,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe, TitleCasePipe, SlicePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { banOutline, checkmarkCircleOutline, 
         starOutline, trendingUpOutline, trendingDownOutline,
         peopleOutline, chatboxOutline, schoolOutline,
         medicalOutline, sparklesOutline, warningOutline,
         alertCircleOutline, pulseOutline, timeOutline,
         statsChartOutline, eyeOutline, flashOutline,
         shieldOutline, calendarOutline, trophyOutline,
         flagOutline, rocketOutline, mailOutline,
         megaphoneOutline, removeOutline, helpOutline } from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface AdminPerformance {
  effectivenessScore: number; // 0-100
  groupsManaged: number;
  averageGroupHealth: number; // 0-100
  memberSatisfactionRate: number; // percentage
  issueResolutionTime: number; // hours
  engagementLevel: 'very-high' | 'high' | 'medium' | 'low' | 'very-low';
  leadershipStyle: 'collaborative' | 'directive' | 'supportive' | 'delegative';
}

interface AdminHealth {
  score: number; // 0-100
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  burnoutRisk: 'low' | 'medium' | 'high' | 'critical';
  workloadLevel: 'light' | 'moderate' | 'heavy' | 'excessive';
  lastActiveDate: Date;
  alerts: string[];
}

interface AdminLifecycle {
  daysAsAdmin: number;
  onboardingProgress: number; // percentage
  skillLevel: 'novice' | 'developing' | 'proficient' | 'expert';
  trainingCompletionRate: number; // percentage
  careerPhase: 'onboarding' | 'growth' | 'peak' | 'plateau' | 'decline';
  retentionRisk: 'low' | 'medium' | 'high' | 'critical';
}

interface AdminSupport {
  coachingSessionsCompleted: number;
  supportTicketsResolved: number;
  mentoringParticipation: boolean;
  resourcesAccessed: string[];
  improvementPlanActive: boolean;
}

interface UserEngagement {
  dailyActiveRate: number; // percentage of days active in last 30
  weeklyActiveRate: number; // percentage of weeks active in last 12
  sessionDuration: number; // average minutes per session
  predictionsPerWeek: number;
  groupParticipation: number; // number of groups joined
  featureUsage: {
    predictions: number; // percentage usage
    leaderboards: number;
    groupInteraction: number;
    jokerUsage: number;
  };
  lastActiveDate: Date;
}

interface UserLifecycle {
  stage: 'new' | 'growing' | 'established' | 'at-risk' | 'churning' | 'dormant';
  daysOnPlatform: number;
  onboardingProgress: number; // percentage
  engagementTrend: 'increasing' | 'stable' | 'declining' | 'critical';
  retentionRisk: 'low' | 'medium' | 'high' | 'critical';
  lifetimeValue: number; // engagement-based scoring
  churnProbability: number; // percentage
}

interface UserHealth {
  score: number; // 0-100 overall platform health
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  satisfactionRate: number; // inferred from behavior
  supportTickets: number;
  flaggedBehavior: string[];
  platformExperience: 'seamless' | 'good' | 'adequate' | 'poor' | 'problematic';
}

interface UserBehavior {
  predictionAccuracy: number; // percentage
  competitiveness: 'very-high' | 'high' | 'medium' | 'low' | 'very-low';
  socialEngagement: 'very-high' | 'high' | 'medium' | 'low' | 'very-low';
  platformUsage: 'mobile' | 'web' | 'mixed';
  peakActivityTime: string; // "morning", "afternoon", "evening", "night"
  preferredFeatures: string[];
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'group-admin' | 'player';
  status: 'active' | 'inactive';
  joinedAt: Date;
  performance?: AdminPerformance;
  health?: AdminHealth;
  lifecycle?: AdminLifecycle;
  support?: AdminSupport;
  // New platform user properties
  engagement?: UserEngagement;
  userLifecycle?: UserLifecycle;
  userHealth?: UserHealth;
  behavior?: UserBehavior;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
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
    IonSearchbar,
    IonBadge,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonList,
    IonSegment,
    IonSegmentButton,
    IonProgressBar,
    IonChip,
    IonModal,
    IonButtons,
    NgFor,
    NgIf,
    DatePipe,
    TitleCasePipe,
    SlicePipe,
    FormsModule,
    NgClass,
  ],
})
export class UsersPage implements OnInit {
  @Input() embedded = false; // When true, hides the header for embedded use
  activeTab = 'admins';
  searchTerm = '';
  users: SystemUser[] = [];
  filteredUsers: SystemUser[] = [];
  selectedAdmin: SystemUser | null = null;

  constructor(private toastService: ToastService) {
    addIcons({
      banOutline,
      checkmarkCircleOutline,
      starOutline,
      trendingUpOutline,
      trendingDownOutline,
      peopleOutline,
      chatboxOutline,
      schoolOutline,
      medicalOutline,
      sparklesOutline,
      warningOutline,
      alertCircleOutline,
      pulseOutline,
      timeOutline,
      statsChartOutline,
      eyeOutline,
      flashOutline,
      // New icons for user management
      shieldOutline,
      calendarOutline,
      trophyOutline,
      flagOutline,
      rocketOutline,
      mailOutline,
      megaphoneOutline,
      removeOutline,
      helpOutline,
    });
  }

  ngOnInit(): void {
    this.loadMockUsers();
  }

  private loadMockUsers() {
    this.users = [
      {
        id: '1',
        name: 'John Super',
        email: 'super@example.com',
        role: 'super-admin',
        status: 'active',
        joinedAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        name: 'Sarah Champion',
        email: 'sarah.champion@example.com',
        role: 'group-admin',
        status: 'active',
        joinedAt: new Date('2024-01-15'),
        performance: {
          effectivenessScore: 94,
          groupsManaged: 3,
          averageGroupHealth: 92,
          memberSatisfactionRate: 96,
          issueResolutionTime: 2.5,
          engagementLevel: 'very-high',
          leadershipStyle: 'collaborative',
        },
        health: {
          score: 95,
          status: 'excellent',
          burnoutRisk: 'low',
          workloadLevel: 'moderate',
          lastActiveDate: new Date('2024-03-20'),
          alerts: [],
        },
        lifecycle: {
          daysAsAdmin: 65,
          onboardingProgress: 100,
          skillLevel: 'expert',
          trainingCompletionRate: 95,
          careerPhase: 'peak',
          retentionRisk: 'low',
        },
        support: {
          coachingSessionsCompleted: 8,
          supportTicketsResolved: 15,
          mentoringParticipation: true,
          resourcesAccessed: ['Leadership Training', 'Conflict Resolution', 'Group Dynamics'],
          improvementPlanActive: false,
        },
      },
      {
        id: '3',
        name: 'Mike Steady',
        email: 'mike.steady@example.com',
        role: 'group-admin',
        status: 'active',
        joinedAt: new Date('2024-02-01'),
        performance: {
          effectivenessScore: 78,
          groupsManaged: 2,
          averageGroupHealth: 75,
          memberSatisfactionRate: 82,
          issueResolutionTime: 6,
          engagementLevel: 'high',
          leadershipStyle: 'supportive',
        },
        health: {
          score: 82,
          status: 'good',
          burnoutRisk: 'low',
          workloadLevel: 'moderate',
          lastActiveDate: new Date('2024-03-19'),
          alerts: [],
        },
        lifecycle: {
          daysAsAdmin: 48,
          onboardingProgress: 90,
          skillLevel: 'proficient',
          trainingCompletionRate: 75,
          careerPhase: 'growth',
          retentionRisk: 'low',
        },
        support: {
          coachingSessionsCompleted: 4,
          supportTicketsResolved: 8,
          mentoringParticipation: false,
          resourcesAccessed: ['Basic Training', 'Group Management'],
          improvementPlanActive: false,
        },
      },
      {
        id: '4',
        name: 'Lisa Struggling',
        email: 'lisa.struggling@example.com',
        role: 'group-admin',
        status: 'active',
        joinedAt: new Date('2024-02-15'),
        performance: {
          effectivenessScore: 62,
          groupsManaged: 2,
          averageGroupHealth: 58,
          memberSatisfactionRate: 64,
          issueResolutionTime: 12,
          engagementLevel: 'medium',
          leadershipStyle: 'directive',
        },
        health: {
          score: 68,
          status: 'fair',
          burnoutRisk: 'medium',
          workloadLevel: 'heavy',
          lastActiveDate: new Date('2024-03-18'),
          alerts: ['Declining group performance detected'],
        },
        lifecycle: {
          daysAsAdmin: 35,
          onboardingProgress: 70,
          skillLevel: 'developing',
          trainingCompletionRate: 60,
          careerPhase: 'onboarding',
          retentionRisk: 'medium',
        },
        support: {
          coachingSessionsCompleted: 2,
          supportTicketsResolved: 3,
          mentoringParticipation: false,
          resourcesAccessed: ['Basic Training'],
          improvementPlanActive: true,
        },
      },
      {
        id: '5',
        name: 'Tom Overwhelmed',
        email: 'tom.overwhelmed@example.com',
        role: 'group-admin',
        status: 'active',
        joinedAt: new Date('2024-01-20'),
        performance: {
          effectivenessScore: 45,
          groupsManaged: 4,
          averageGroupHealth: 42,
          memberSatisfactionRate: 48,
          issueResolutionTime: 24,
          engagementLevel: 'low',
          leadershipStyle: 'delegative',
        },
        health: {
          score: 38,
          status: 'poor',
          burnoutRisk: 'high',
          workloadLevel: 'excessive',
          lastActiveDate: new Date('2024-03-16'),
          alerts: ['Multiple group complaints', 'Extended absence periods', 'Low response rate'],
        },
        lifecycle: {
          daysAsAdmin: 60,
          onboardingProgress: 85,
          skillLevel: 'developing',
          trainingCompletionRate: 40,
          careerPhase: 'plateau',
          retentionRisk: 'high',
        },
        support: {
          coachingSessionsCompleted: 1,
          supportTicketsResolved: 1,
          mentoringParticipation: false,
          resourcesAccessed: ['Basic Training'],
          improvementPlanActive: true,
        },
      },
      {
        id: '6',
        name: 'Emma Disengaged',
        email: 'emma.disengaged@example.com',
        role: 'group-admin',
        status: 'active',
        joinedAt: new Date('2024-01-05'),
        performance: {
          effectivenessScore: 25,
          groupsManaged: 2,
          averageGroupHealth: 28,
          memberSatisfactionRate: 22,
          issueResolutionTime: 48,
          engagementLevel: 'very-low',
          leadershipStyle: 'delegative',
        },
        health: {
          score: 25,
          status: 'critical',
          burnoutRisk: 'critical',
          workloadLevel: 'light',
          lastActiveDate: new Date('2024-03-12'),
          alerts: ['Admin abandonment risk', 'Groups requesting new admin', 'No activity for 8 days'],
        },
        lifecycle: {
          daysAsAdmin: 75,
          onboardingProgress: 60,
          skillLevel: 'novice',
          trainingCompletionRate: 20,
          careerPhase: 'decline',
          retentionRisk: 'critical',
        },
        support: {
          coachingSessionsCompleted: 0,
          supportTicketsResolved: 0,
          mentoringParticipation: false,
          resourcesAccessed: [],
          improvementPlanActive: true,
        },
      },
      {
        id: '7',
        name: 'Alex PowerUser',
        email: 'alex.poweruser@example.com',
        role: 'player',
        status: 'active',
        joinedAt: new Date('2023-08-15'),
        engagement: {
          dailyActiveRate: 95,
          weeklyActiveRate: 100,
          sessionDuration: 25,
          predictionsPerWeek: 18,
          groupParticipation: 4,
          featureUsage: {
            predictions: 98,
            leaderboards: 90,
            groupInteraction: 85,
            jokerUsage: 95,
          },
          lastActiveDate: new Date('2024-03-20'),
        },
        userLifecycle: {
          stage: 'established',
          daysOnPlatform: 218,
          onboardingProgress: 100,
          engagementTrend: 'stable',
          retentionRisk: 'low',
          lifetimeValue: 950,
          churnProbability: 5,
        },
        userHealth: {
          score: 95,
          status: 'excellent',
          satisfactionRate: 96,
          supportTickets: 1,
          flaggedBehavior: [],
          platformExperience: 'seamless',
        },
        behavior: {
          predictionAccuracy: 78,
          competitiveness: 'very-high',
          socialEngagement: 'high',
          platformUsage: 'mixed',
          peakActivityTime: 'evening',
          preferredFeatures: ['Predictions', 'Leaderboards', 'Group Chat'],
        },
      },
      {
        id: '8',
        name: 'Jordan NewUser',
        email: 'jordan.new@example.com',
        role: 'player',
        status: 'active',
        joinedAt: new Date('2024-03-01'),
        engagement: {
          dailyActiveRate: 70,
          weeklyActiveRate: 85,
          sessionDuration: 18,
          predictionsPerWeek: 12,
          groupParticipation: 2,
          featureUsage: {
            predictions: 75,
            leaderboards: 45,
            groupInteraction: 30,
            jokerUsage: 60,
          },
          lastActiveDate: new Date('2024-03-19'),
        },
        userLifecycle: {
          stage: 'growing',
          daysOnPlatform: 19,
          onboardingProgress: 85,
          engagementTrend: 'increasing',
          retentionRisk: 'low',
          lifetimeValue: 420,
          churnProbability: 15,
        },
        userHealth: {
          score: 82,
          status: 'good',
          satisfactionRate: 85,
          supportTickets: 0,
          flaggedBehavior: [],
          platformExperience: 'good',
        },
        behavior: {
          predictionAccuracy: 65,
          competitiveness: 'high',
          socialEngagement: 'medium',
          platformUsage: 'mobile',
          peakActivityTime: 'afternoon',
          preferredFeatures: ['Predictions', 'Mobile App'],
        },
      },
      {
        id: '9',
        name: 'Sam AtRisk',
        email: 'sam.atrisk@example.com',
        role: 'player',
        status: 'active',
        joinedAt: new Date('2024-01-10'),
        engagement: {
          dailyActiveRate: 35,
          weeklyActiveRate: 60,
          sessionDuration: 8,
          predictionsPerWeek: 5,
          groupParticipation: 1,
          featureUsage: {
            predictions: 40,
            leaderboards: 20,
            groupInteraction: 15,
            jokerUsage: 25,
          },
          lastActiveDate: new Date('2024-03-17'),
        },
        userLifecycle: {
          stage: 'at-risk',
          daysOnPlatform: 70,
          onboardingProgress: 65,
          engagementTrend: 'declining',
          retentionRisk: 'high',
          lifetimeValue: 180,
          churnProbability: 75,
        },
        userHealth: {
          score: 45,
          status: 'poor',
          satisfactionRate: 55,
          supportTickets: 2,
          flaggedBehavior: ['Low engagement', 'Missed predictions'],
          platformExperience: 'adequate',
        },
        behavior: {
          predictionAccuracy: 52,
          competitiveness: 'low',
          socialEngagement: 'low',
          platformUsage: 'web',
          peakActivityTime: 'morning',
          preferredFeatures: ['Basic Predictions'],
        },
      },
      {
        id: '10',
        name: 'Casey Churning',
        email: 'casey.churning@example.com',
        role: 'player',
        status: 'active',
        joinedAt: new Date('2023-12-01'),
        engagement: {
          dailyActiveRate: 10,
          weeklyActiveRate: 25,
          sessionDuration: 3,
          predictionsPerWeek: 1,
          groupParticipation: 0,
          featureUsage: {
            predictions: 15,
            leaderboards: 5,
            groupInteraction: 0,
            jokerUsage: 10,
          },
          lastActiveDate: new Date('2024-03-14'),
        },
        userLifecycle: {
          stage: 'churning',
          daysOnPlatform: 110,
          onboardingProgress: 45,
          engagementTrend: 'critical',
          retentionRisk: 'critical',
          lifetimeValue: 85,
          churnProbability: 95,
        },
        userHealth: {
          score: 20,
          status: 'critical',
          satisfactionRate: 30,
          supportTickets: 3,
          flaggedBehavior: ['Minimal engagement', 'Long absence periods', 'Support complaints'],
          platformExperience: 'poor',
        },
        behavior: {
          predictionAccuracy: 45,
          competitiveness: 'very-low',
          socialEngagement: 'very-low',
          platformUsage: 'web',
          peakActivityTime: 'night',
          preferredFeatures: [],
        },
      },
      {
        id: '11',
        name: 'Riley Casual',
        email: 'riley.casual@example.com',
        role: 'player',
        status: 'active',
        joinedAt: new Date('2024-02-14'),
        engagement: {
          dailyActiveRate: 55,
          weeklyActiveRate: 75,
          sessionDuration: 12,
          predictionsPerWeek: 8,
          groupParticipation: 1,
          featureUsage: {
            predictions: 60,
            leaderboards: 35,
            groupInteraction: 25,
            jokerUsage: 40,
          },
          lastActiveDate: new Date('2024-03-18'),
        },
        userLifecycle: {
          stage: 'established',
          daysOnPlatform: 35,
          onboardingProgress: 90,
          engagementTrend: 'stable',
          retentionRisk: 'medium',
          lifetimeValue: 320,
          churnProbability: 35,
        },
        userHealth: {
          score: 72,
          status: 'good',
          satisfactionRate: 78,
          supportTickets: 0,
          flaggedBehavior: [],
          platformExperience: 'good',
        },
        behavior: {
          predictionAccuracy: 68,
          competitiveness: 'medium',
          socialEngagement: 'medium',
          platformUsage: 'mobile',
          peakActivityTime: 'evening',
          preferredFeatures: ['Predictions', 'Mobile Notifications'],
        },
      },
      {
        id: '12',
        name: 'Player Inactive',
        email: 'player.inactive@example.com',
        role: 'player',
        status: 'inactive',
        joinedAt: new Date('2024-02-01'),
        userLifecycle: {
          stage: 'dormant',
          daysOnPlatform: 48,
          onboardingProgress: 25,
          engagementTrend: 'critical',
          retentionRisk: 'critical',
          lifetimeValue: 15,
          churnProbability: 100,
        },
        userHealth: {
          score: 5,
          status: 'critical',
          satisfactionRate: 10,
          supportTickets: 1,
          flaggedBehavior: ['Account abandoned', 'Never completed onboarding'],
          platformExperience: 'problematic',
        },
      },
    ];
    this.filterUsers();
  }

  filterUsers() {
    let filtered = [...this.users];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term)
      );
    }

    this.filteredUsers = filtered;
  }

  async toggleUserStatus(user: SystemUser) {
    if (user.role === 'super-admin') {
      await this.toastService.showToast(
        'Cannot modify super admin status',
        'error'
      );
      return;
    }

    try {
      user.status = user.status === 'active' ? 'inactive' : 'active';
      await this.toastService.showToast(
        `User ${
          user.status === 'active' ? 'activated' : 'deactivated'
        } successfully`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error updating user status', 'error');
    }
  }

  // Admin Health Helper Methods
  getAdminHealthStatusColor(status: string): string {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'primary';
      case 'fair': return 'warning';
      case 'poor': return 'danger';
      case 'critical': return 'danger';
      default: return 'medium';
    }
  }

  getBurnoutRiskColor(risk: string): string {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      case 'critical': return 'danger';
      default: return 'medium';
    }
  }

  getEngagementLevelColor(level: string): string {
    switch (level) {
      case 'very-high': return 'success';
      case 'high': return 'primary';
      case 'medium': return 'warning';
      case 'low': return 'danger';
      case 'very-low': return 'danger';
      default: return 'medium';
    }
  }

  getRetentionRiskColor(risk: string): string {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      case 'critical': return 'danger';
      default: return 'medium';
    }
  }

  getSkillLevelColor(level: string): string {
    switch (level) {
      case 'expert': return 'success';
      case 'proficient': return 'primary';
      case 'developing': return 'warning';
      case 'novice': return 'tertiary';
      default: return 'medium';
    }
  }

  getHealthIcon(status: string): string {
    switch (status) {
      case 'excellent': return 'checkmark-circle-outline';
      case 'good': return 'checkmark-circle-outline';
      case 'fair': return 'warning-outline';
      case 'poor': return 'alert-circle-outline';
      case 'critical': return 'medical-outline';
      default: return 'pulse-outline';
    }
  }

  // Admin Analytics Methods
  getGroupAdmins(): SystemUser[] {
    const admins = this.users.filter(user => user.role === 'group-admin');
    return admins;
  }

  getAdminsNeedingAttention(): SystemUser[] {
    return this.getGroupAdmins().filter(admin => 
      admin.health?.status === 'poor' || 
      admin.health?.status === 'critical' ||
      admin.health?.burnoutRisk === 'high' ||
      admin.health?.burnoutRisk === 'critical' ||
      (admin.health?.alerts && admin.health.alerts.length > 0)
    );
  }

  getHighPerformingAdmins(): SystemUser[] {
    return this.getGroupAdmins().filter(admin => 
      admin.health?.status === 'excellent' && 
      admin.performance?.effectivenessScore && admin.performance.effectivenessScore > 85
    );
  }

  getAverageAdminHealth(): number {
    const admins = this.getGroupAdmins();
    if (admins.length === 0) return 0;
    const total = admins.reduce((sum, admin) => sum + (admin.health?.score || 0), 0);
    return Math.round(total / admins.length);
  }

  getAverageEffectivenessScore(): number {
    const admins = this.getGroupAdmins();
    if (admins.length === 0) return 0;
    const total = admins.reduce((sum, admin) => sum + (admin.performance?.effectivenessScore || 0), 0);
    return Math.round(total / admins.length);
  }

  getTotalGroupsManaged(): number {
    return this.getGroupAdmins().reduce((sum, admin) => sum + (admin.performance?.groupsManaged || 0), 0);
  }

  getAdminsInTraining(): number {
    return this.getGroupAdmins().filter(admin => 
      admin.lifecycle?.careerPhase === 'onboarding' || 
      admin.support?.improvementPlanActive
    ).length;
  }

  // Steward Intervention Tools
  async sendAdminAlert(admin: SystemUser, alertType: string) {
    try {
      await this.toastService.showToast(
        `Alert sent to ${admin.name}: ${alertType}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error sending alert', 'error');
    }
  }

  async scheduleCoaching(admin: SystemUser) {
    try {
      await this.toastService.showToast(
        `Coaching session scheduled for ${admin.name}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error scheduling coaching', 'error');
    }
  }

  async startImprovementPlan(admin: SystemUser) {
    try {
      if (admin.support) {
        admin.support.improvementPlanActive = true;
      }
      await this.toastService.showToast(
        `Improvement plan activated for ${admin.name}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error starting improvement plan', 'error');
    }
  }

  async assignMentor(admin: SystemUser) {
    try {
      if (admin.support) {
        admin.support.mentoringParticipation = true;
      }
      await this.toastService.showToast(
        `Mentor assigned to ${admin.name}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error assigning mentor', 'error');
    }
  }

  async recognizeAdmin(admin: SystemUser) {
    try {
      await this.toastService.showToast(
        `Recognition award sent to ${admin.name}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error sending recognition', 'error');
    }
  }

  // Utility Methods
  viewAdminDetails(admin: SystemUser) {
    this.selectedAdmin = admin;
  }

  formatDaysAsAdmin(days: number): string {
    if (days < 7) return `${days} days`;
    const weeks = Math.floor(days / 7);
    if (weeks < 8) return `${weeks} weeks`;
    const months = Math.floor(days / 30);
    return `${months} months`;
  }

  formatResolutionTime(hours: number): string {
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  }

  // Platform User Analytics Methods
  getPlatformUsers(): SystemUser[] {
    const users = this.users.filter(user => user.role === 'player');
    return users;
  }

  getUsersNeedingAttention(): SystemUser[] {
    return this.getPlatformUsers().filter(user => 
      user.userHealth?.status === 'poor' || 
      user.userHealth?.status === 'critical' ||
      user.userLifecycle?.retentionRisk === 'high' ||
      user.userLifecycle?.retentionRisk === 'critical' ||
      user.userLifecycle?.stage === 'churning' ||
      user.userLifecycle?.stage === 'at-risk'
    );
  }

  getHighValueUsers(): SystemUser[] {
    return this.getPlatformUsers().filter(user => 
      user.userHealth?.status === 'excellent' && 
      user.userLifecycle?.lifetimeValue && user.userLifecycle.lifetimeValue > 800
    );
  }

  getNewUsers(): SystemUser[] {
    return this.getPlatformUsers().filter(user => 
      user.userLifecycle?.stage === 'new' || 
      user.userLifecycle?.daysOnPlatform && user.userLifecycle.daysOnPlatform < 30
    );
  }

  getActiveUsers(): SystemUser[] {
    return this.getPlatformUsers().filter(user => 
      user.status === 'active' &&
      user.userLifecycle?.stage !== 'dormant' &&
      user.userLifecycle?.stage !== 'churning'
    );
  }

  getAverageUserHealth(): number {
    const users = this.getPlatformUsers();
    if (users.length === 0) return 0;
    const total = users.reduce((sum, user) => sum + (user.userHealth?.score || 0), 0);
    return Math.round(total / users.length);
  }

  getAverageEngagementRate(): number {
    const users = this.getPlatformUsers();
    if (users.length === 0) return 0;
    const total = users.reduce((sum, user) => sum + (user.engagement?.weeklyActiveRate || 0), 0);
    return Math.round(total / users.length);
  }

  getTotalPlatformUsers(): number {
    return this.getPlatformUsers().length;
  }

  getRetentionRate(): number {
    const users = this.getPlatformUsers();
    const retainedUsers = users.filter(user => 
      user.userLifecycle?.retentionRisk === 'low' || 
      user.userLifecycle?.retentionRisk === 'medium'
    );
    return users.length > 0 ? Math.round((retainedUsers.length / users.length) * 100) : 0;
  }

  // User Health Helper Methods
  getUserHealthStatusColor(status: string): string {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'primary';
      case 'fair': return 'warning';
      case 'poor': return 'danger';
      case 'critical': return 'danger';
      default: return 'medium';
    }
  }

  getUserLifecycleStageColor(stage: string): string {
    switch (stage) {
      case 'new': return 'tertiary';
      case 'growing': return 'secondary';
      case 'established': return 'success';
      case 'at-risk': return 'warning';
      case 'churning': return 'danger';
      case 'dormant': return 'dark';
      default: return 'medium';
    }
  }

  getEngagementTrendIcon(trend: string): string {
    switch (trend) {
      case 'increasing': return 'trending-up-outline';
      case 'stable': return 'remove-outline';
      case 'declining': return 'trending-down-outline';
      case 'critical': return 'alert-circle-outline';
      default: return 'help-outline';
    }
  }

  getEngagementTrendColor(trend: string): string {
    switch (trend) {
      case 'increasing': return 'success';
      case 'stable': return 'primary';
      case 'declining': return 'warning';
      case 'critical': return 'danger';
      default: return 'medium';
    }
  }

  // Platform Steward Intervention Tools
  async engageUser(user: SystemUser) {
    try {
      await this.toastService.showToast(
        `Engagement campaign initiated for ${user.name}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error initiating engagement campaign', 'error');
    }
  }

  async scheduleUserSupport(user: SystemUser) {
    try {
      await this.toastService.showToast(
        `Support session scheduled for ${user.name}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error scheduling support', 'error');
    }
  }

  async sendUserRetentionCampaign(user: SystemUser) {
    try {
      await this.toastService.showToast(
        `Retention campaign sent to ${user.name}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error sending retention campaign', 'error');
    }
  }

  async flagUserForReview(user: SystemUser) {
    try {
      await this.toastService.showToast(
        `${user.name} flagged for platform review`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error flagging user', 'error');
    }
  }

  // Utility Methods for User Management
  formatLifetimeValue(value: number): string {
    if (value < 100) return `${value}`;
    if (value < 1000) return `${value}`;
    return `${(value / 1000).toFixed(1)}k`;
  }

  formatDaysOnPlatform(days: number): string {
    if (days < 7) return `${days} days`;
    const weeks = Math.floor(days / 7);
    if (weeks < 8) return `${weeks} weeks`;
    const months = Math.floor(days / 30);
    return `${months} months`;
  }

  formatSessionDuration(minutes: number): string {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }

  getChurnProbabilityClass(user: SystemUser): string {
    const churnProbability = user.userLifecycle?.churnProbability || 0;
    if (churnProbability > 70) return 'churn-high';
    if (churnProbability > 40) return 'churn-medium';
    return 'churn-low';
  }

  hasFlaggedBehavior(user: SystemUser): boolean {
    return !!(user.userHealth?.flaggedBehavior?.length && user.userHealth.flaggedBehavior.length > 0);
  }
}
