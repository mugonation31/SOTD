import { Component } from '@angular/core';
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
import { NgFor, NgIf, DatePipe, TitleCasePipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { banOutline, checkmarkCircleOutline, 
         starOutline, trendingUpOutline, trendingDownOutline,
         peopleOutline, chatboxOutline, schoolOutline,
         medicalOutline, sparklesOutline, warningOutline,
         alertCircleOutline, pulseOutline, timeOutline,
         statsChartOutline, eyeOutline, flashOutline } from 'ionicons/icons';
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
  ],
})
export class UsersPage {
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
    });
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
        name: 'Player Example',
        email: 'player@example.com',
        role: 'player',
        status: 'inactive',
        joinedAt: new Date('2024-02-01'),
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
    return this.users.filter(user => user.role === 'group-admin');
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
}
