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
  IonModal,
  IonList,
  IonListHeader,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonProgressBar,
  IonChip,
  ModalController,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersPage } from '../users/users.page';
import { ToastService } from '@core/services/toast.service';
import { addIcons } from 'ionicons';
import { eyeOutline, trashOutline, shieldOutline, 
         warningOutline, checkmarkCircleOutline, alertCircleOutline, 
         trendingUpOutline, trendingDownOutline, pulseOutline, 
         timeOutline, peopleOutline, statsChartOutline, 
         medicalOutline, flashOutline, sparklesOutline } from 'ionicons/icons';

interface GroupMember {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
  status: 'active' | 'inactive';
  role: 'admin' | 'player';
}

interface GroupHealth {
  score: number; // 0-100
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  activityLevel: 'very-high' | 'high' | 'medium' | 'low' | 'very-low';
  engagementRate: number; // percentage
  lastActivity: Date;
  alerts: string[];
}

interface GroupPerformance {
  predictionAccuracy: number; // percentage
  memberRetentionRate: number; // percentage
  growthTrend: 'increasing' | 'stable' | 'decreasing';
  averageSessionDuration: number; // minutes
  jokerUsageRate: number; // percentage
  weeklyActiveUsers: number;
  predictionsPerWeek: number;
}

interface GroupLifecycle {
  daysActive: number;
  membershipTrend: Array<{
    week: string;
    count: number;
  }>;
  peakMembership: number;
  currentPhase: 'growth' | 'mature' | 'decline' | 'stable';
  riskFactors: string[];
}

interface Group {
  id: string;
  name: string;
  code: string;
  adminName: string;
  memberCount: number;
  members: GroupMember[];
  createdAt: Date;
  health: GroupHealth;
  performance: GroupPerformance;
  lifecycle: GroupLifecycle;
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
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
    IonModal,
    IonList,
    IonListHeader,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    IonProgressBar,
    IonChip,
    NgFor,
    NgIf,
    DatePipe,
    TitleCasePipe,
    FormsModule,
    UsersPage,
  ],
})
export class GroupsPage {
  activeTab = 'groups';
  groupSearchTerm = '';
  filteredGroups: Group[] = [];
  groups: Group[] = [];
  selectedGroup: Group | null = null;

  constructor(private toastService: ToastService) {
    addIcons({
      eyeOutline,
      trashOutline,
      shieldOutline,
      warningOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      trendingUpOutline,
      trendingDownOutline,
      pulseOutline,
      timeOutline,
      peopleOutline,
      statsChartOutline,
      medicalOutline,
      flashOutline,
      sparklesOutline,
    });
    this.loadMockGroups();
  }

  private loadMockGroups() {
    this.groups = [
      {
        id: '1',
        name: 'Premier League A',
        code: 'PLA2024',
        adminName: 'John Admin',
        memberCount: 12,
        createdAt: new Date('2024-01-01'),
        members: [
          {
            id: '1',
            name: 'Player One',
            email: 'player1@example.com',
            joinedAt: new Date('2024-01-15'),
            status: 'active',
            role: 'player',
          },
          // ... more mock members
        ],
        health: {
          score: 95,
          status: 'excellent',
          activityLevel: 'very-high',
          engagementRate: 98,
          lastActivity: new Date('2024-03-20'),
          alerts: [],
        },
        performance: {
          predictionAccuracy: 92,
          memberRetentionRate: 95,
          growthTrend: 'increasing',
          averageSessionDuration: 15,
          jokerUsageRate: 85,
          weeklyActiveUsers: 12,
          predictionsPerWeek: 100,
        },
        lifecycle: {
          daysActive: 80,
          membershipTrend: [
            { week: '2024-03-10', count: 10 },
            { week: '2024-03-17', count: 12 },
            { week: '2024-03-24', count: 15 },
          ],
          peakMembership: 15,
          currentPhase: 'growth',
          riskFactors: [],
        },
      },
      {
        id: '2',
        name: 'Championship United',
        code: 'CHU2024',
        adminName: 'Sarah Manager',
        memberCount: 8,
        createdAt: new Date('2024-02-01'),
        members: [],
        health: {
          score: 82,
          status: 'good',
          activityLevel: 'high',
          engagementRate: 85,
          lastActivity: new Date('2024-03-19'),
          alerts: [],
        },
        performance: {
          predictionAccuracy: 78,
          memberRetentionRate: 88,
          growthTrend: 'stable',
          averageSessionDuration: 12,
          jokerUsageRate: 75,
          weeklyActiveUsers: 7,
          predictionsPerWeek: 65,
        },
        lifecycle: {
          daysActive: 48,
          membershipTrend: [
            { week: '2024-03-10', count: 8 },
            { week: '2024-03-17', count: 8 },
            { week: '2024-03-24', count: 8 },
          ],
          peakMembership: 10,
          currentPhase: 'stable',
          riskFactors: ['Low growth rate'],
        },
      },
      {
        id: '3',
        name: 'Football Friends',
        code: 'FF2024',
        adminName: 'Mike Captain',
        memberCount: 15,
        createdAt: new Date('2024-01-15'),
        members: [],
        health: {
          score: 68,
          status: 'fair',
          activityLevel: 'medium',
          engagementRate: 72,
          lastActivity: new Date('2024-03-18'),
          alerts: ['Declining activity detected'],
        },
        performance: {
          predictionAccuracy: 65,
          memberRetentionRate: 78,
          growthTrend: 'decreasing',
          averageSessionDuration: 8,
          jokerUsageRate: 60,
          weeklyActiveUsers: 9,
          predictionsPerWeek: 45,
        },
        lifecycle: {
          daysActive: 65,
          membershipTrend: [
            { week: '2024-03-10', count: 18 },
            { week: '2024-03-17', count: 16 },
            { week: '2024-03-24', count: 15 },
          ],
          peakMembership: 20,
          currentPhase: 'decline',
          riskFactors: ['Member attrition', 'Low prediction accuracy'],
        },
      },
      {
        id: '4',
        name: 'Weekend Warriors',
        code: 'WW2024',
        adminName: 'Lisa Coach',
        memberCount: 6,
        createdAt: new Date('2024-03-01'),
        members: [],
        health: {
          score: 45,
          status: 'poor',
          activityLevel: 'low',
          engagementRate: 45,
          lastActivity: new Date('2024-03-16'),
          alerts: ['Low engagement warning', 'Admin inactive for 4 days'],
        },
        performance: {
          predictionAccuracy: 52,
          memberRetentionRate: 60,
          growthTrend: 'decreasing',
          averageSessionDuration: 5,
          jokerUsageRate: 35,
          weeklyActiveUsers: 3,
          predictionsPerWeek: 18,
        },
        lifecycle: {
          daysActive: 20,
          membershipTrend: [
            { week: '2024-03-10', count: 8 },
            { week: '2024-03-17', count: 7 },
            { week: '2024-03-24', count: 6 },
          ],
          peakMembership: 10,
          currentPhase: 'decline',
          riskFactors: ['Admin disengagement', 'Low prediction quality', 'Member exodus'],
        },
      },
      {
        id: '5',
        name: 'Goal Diggers',
        code: 'GD2024',
        adminName: 'Tom Leader',
        memberCount: 3,
        createdAt: new Date('2024-02-20'),
        members: [],
        health: {
          score: 25,
          status: 'critical',
          activityLevel: 'very-low',
          engagementRate: 25,
          lastActivity: new Date('2024-03-12'),
          alerts: ['Group at risk of disbandment', 'No predictions in 7 days', 'Admin absent for 8 days'],
        },
        performance: {
          predictionAccuracy: 38,
          memberRetentionRate: 30,
          growthTrend: 'decreasing',
          averageSessionDuration: 2,
          jokerUsageRate: 15,
          weeklyActiveUsers: 1,
          predictionsPerWeek: 5,
        },
        lifecycle: {
          daysActive: 30,
          membershipTrend: [
            { week: '2024-03-10', count: 7 },
            { week: '2024-03-17', count: 5 },
            { week: '2024-03-24', count: 3 },
          ],
          peakMembership: 12,
          currentPhase: 'decline',
          riskFactors: ['Critical member loss', 'Admin abandonment', 'Zero engagement', 'Imminent disbandment'],
        },
      },
    ];
    this.filterGroups();
  }

  filterGroups() {
    let filtered = [...this.groups];

    if (this.groupSearchTerm) {
      const term = this.groupSearchTerm.toLowerCase();
      filtered = filtered.filter(
        (group) =>
          group.name.toLowerCase().includes(term) ||
          group.code.toLowerCase().includes(term) ||
          group.adminName.toLowerCase().includes(term)
      );
    }

    this.filteredGroups = filtered;
  }

  viewGroupDetails(group: Group) {
    this.selectedGroup = group;
  }

  async deleteGroup(group: Group) {
    if (confirm(`Are you sure you want to delete group ${group.name}?`)) {
      try {
        this.groups = this.groups.filter((g) => g.id !== group.id);
        this.filterGroups();
        await this.toastService.showToast(
          'Group deleted successfully',
          'success'
        );
      } catch (error) {
        await this.toastService.showToast('Error deleting group', 'error');
      }
    }
  }

  async overrideAccess(member: GroupMember) {
    if (
      confirm(`Are you sure you want to override access for ${member.name}?`)
    ) {
      try {
        member.role = member.role === 'admin' ? 'player' : 'admin';
        await this.toastService.showToast(
          `Member role updated to ${member.role}`,
          'success'
        );
      } catch (error) {
        await this.toastService.showToast(
          'Error updating member role',
          'error'
        );
      }
    }
  }

  async removeMember(member: GroupMember) {
    if (confirm(`Are you sure you want to remove ${member.name}?`)) {
      try {
        if (this.selectedGroup) {
          this.selectedGroup.members = this.selectedGroup.members.filter(
            (m) => m.id !== member.id
          );
          this.selectedGroup.memberCount--;
        }
        await this.toastService.showToast(
          'Member removed successfully',
          'success'
        );
      } catch (error) {
        await this.toastService.showToast('Error removing member', 'error');
      }
    }
  }

  // Group Health Helper Methods
  getHealthStatusColor(status: string): string {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'primary';
      case 'fair': return 'warning';
      case 'poor': return 'danger';
      case 'critical': return 'danger';
      default: return 'medium';
    }
  }

  getActivityLevelColor(level: string): string {
    switch (level) {
      case 'very-high': return 'success';
      case 'high': return 'primary';
      case 'medium': return 'warning';
      case 'low': return 'danger';
      case 'very-low': return 'danger';
      default: return 'medium';
    }
  }

  getGrowthTrendColor(trend: string): string {
    switch (trend) {
      case 'increasing': return 'success';
      case 'stable': return 'primary';
      case 'decreasing': return 'danger';
      default: return 'medium';
    }
  }

  getGrowthTrendIcon(trend: string): string {
    switch (trend) {
      case 'increasing': return 'trending-up-outline';
      case 'stable': return 'pulse-outline';
      case 'decreasing': return 'trending-down-outline';
      default: return 'pulse-outline';
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

  // Steward Intervention Tools
  async sendGroupAlert(group: Group, alertType: string) {
    try {
      await this.toastService.showToast(
        `Alert sent to ${group.name} admin: ${alertType}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error sending alert', 'error');
    }
  }

  async scheduleIntervention(group: Group) {
    try {
      await this.toastService.showToast(
        `Intervention scheduled for ${group.name}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error scheduling intervention', 'error');
    }
  }

  async boostGroup(group: Group) {
    try {
      // Simulate boosting group visibility/features
      await this.toastService.showToast(
        `${group.name} has been boosted with enhanced features`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error boosting group', 'error');
    }
  }

  // Group Analysis Methods
  getGroupsNeedingAttention(): Group[] {
    return this.groups.filter(group => 
      group.health.status === 'poor' || 
      group.health.status === 'critical' ||
      group.health.alerts.length > 0
    );
  }

  getHighPerformingGroups(): Group[] {
    return this.groups.filter(group => 
      group.health.status === 'excellent' && 
      group.performance.growthTrend === 'increasing'
    );
  }

  getAverageGroupHealth(): number {
    const total = this.groups.reduce((sum, group) => sum + group.health.score, 0);
    return Math.round(total / this.groups.length);
  }

  getTotalActiveUsers(): number {
    return this.groups.reduce((sum, group) => sum + group.performance.weeklyActiveUsers, 0);
  }

  formatDaysActive(days: number): string {
    if (days < 7) return `${days} days`;
    const weeks = Math.floor(days / 7);
    return `${weeks} weeks`;
  }
}
