import { Component, OnInit } from '@angular/core';
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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonBadge,
  IonList,
  IonIcon,
  IonButton,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonProgressBar,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '@core/services/toast.service';
import { addIcons } from 'ionicons';
import {
  footballOutline,
  trophyOutline,
  starOutline,
  timeOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  peopleOutline,
  star,
  pulseOutline,
  trendingUpOutline,
  statsChartOutline,
  warningOutline,
  medicalOutline,
  sparklesOutline,
} from 'ionicons/icons';

// Platform Steward Prediction Analytics Interfaces
interface PlatformHealthMetrics {
  healthScore: number; // 0-100
  engagementRate: number; // percentage
  averageAccuracy: number; // percentage
  topPerformersCount: number;
  underperformersCount: number;
  jokerOptimizationRate: number; // percentage
}

interface SubmissionMetrics {
  currentSubmissions: number;
  totalActivePlayers: number;
  timeRemaining: string;
  lateSubmissions: number;
  averageSubmissionQuality: number; // 0-10
}

interface TopPerformer {
  id: string;
  name: string;
  groupName: string;
  accuracy: number;
  strategy: string;
  jokerEfficiency: number;
  consistencyScore: number;
}

interface UserTier {
  users: any[];
  averageAccuracy: number;
  retentionRate?: number;
  growthRate?: number;
  potential?: number;
  supportCount?: number;
  interventionCount?: number;
}

interface PredictionIntervention {
  id: string;
  userName: string;
  groupName?: string;
  currentAccuracy?: number;
  issue?: string;
  recommendation?: string;
  missedSubmissions?: number;
  pattern?: string;
  action?: string;
  behaviorType?: string;
  opportunity?: string;
  strategy?: string;
}

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.page.html',
  styleUrls: ['./predictions.page.scss'],
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
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonBadge,
    IonList,
    IonIcon,
    IonButton,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonProgressBar,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
  ],
})
export class PredictionsPage implements OnInit {
  activeTab = 'analytics';
  currentGameweek = 15;

  // Platform Health Data
  platformHealth: PlatformHealthMetrics = {
    healthScore: 87,
    engagementRate: 78,
    averageAccuracy: 64,
    topPerformersCount: 23,
    underperformersCount: 45,
    jokerOptimizationRate: 71,
  };

  // Submission Monitoring Data
  submissionData: SubmissionMetrics = {
    currentSubmissions: 128,
    totalActivePlayers: 156,
    timeRemaining: '2d 14h 32m',
    lateSubmissions: 12,
    averageSubmissionQuality: 7.8,
  };

  // Performance Tiers Data
  performanceTiers = {
    elite: { users: Array(23).fill({}), averageAccuracy: 92, retentionRate: 96 },
    champion: { users: Array(41).fill({}), averageAccuracy: 79, growthRate: 15 },
    contender: { users: Array(67).fill({}), averageAccuracy: 58, potential: 22 },
    developing: { users: Array(45).fill({}), supportCount: 32, interventionCount: 18 },
  };

  // Top Performers Mock Data
  topPerformers: TopPerformer[] = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      groupName: 'Champions League Elite',
      accuracy: 94,
      strategy: 'Data-Driven Conservative',
      jokerEfficiency: 89,
      consistencyScore: 9.2,
    },
    {
      id: '2',
      name: 'Sarah Chen',
      groupName: 'Premier Predictions',
      accuracy: 91,
      strategy: 'Balanced Risk-Reward',
      jokerEfficiency: 92,
      consistencyScore: 8.7,
    },
    {
      id: '3',
      name: 'Michael Turner',
      groupName: 'Analytics FC',
      accuracy: 89,
      strategy: 'High-Risk High-Reward',
      jokerEfficiency: 78,
      consistencyScore: 8.9,
    },
  ];

  // Intervention Data
  interventionData = {
    performance: [
      {
        id: 'p1',
      userName: 'John Smith',
        groupName: 'Weekend Warriors',
        currentAccuracy: 38,
        issue: 'Consistently overestimating home advantage',
        recommendation: 'Focus on away team form analysis',
      },
      {
        id: 'p2',
        userName: 'Emma Wilson',
        groupName: 'Football Fanatics',
        currentAccuracy: 42,
        issue: 'Poor joker timing strategy',
        recommendation: 'Use data-driven joker placement guide',
      },
    ],
    engagement: [
      {
        id: 'e1',
        userName: 'David Brown',
        missedSubmissions: 4,
        pattern: 'Dropping engagement after losses',
        action: 'Send motivational content after difficult gameweeks',
      },
      {
        id: 'e2',
        userName: 'Lisa Garcia',
        missedSubmissions: 3,
        pattern: 'Irregular submission timing',
        action: 'Personalized reminder schedule',
      },
    ],
    behavior: [
      {
        id: 'b1',
        userName: 'Mark Johnson',
        behaviorType: 'Emotional Predictor',
        opportunity: 'Reduce bias toward favorite teams',
        strategy: 'Implement objective analysis framework',
      },
      {
        id: 'b2',
        userName: 'Anna Lee',
        behaviorType: 'Conservative Over-Cautious',
        opportunity: 'Strategic risk-taking in high-confidence matches',
        strategy: 'Graduated risk exposure training',
      },
    ],
  };

  constructor(private toastService: ToastService) {
    addIcons({
      footballOutline,
      trophyOutline,
      starOutline,
      timeOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      peopleOutline,
      star,
      pulseOutline,
      trendingUpOutline,
      statsChartOutline,
      warningOutline,
      medicalOutline,
      sparklesOutline,
    });
  }

  ngOnInit(): void {
    // Initialize analytics data
    console.log('Prediction Intelligence Center initialized');
  }

  // Platform Health Analytics Methods
  getPlatformHealthScore(): number {
    return this.platformHealth.healthScore;
  }

  getPredictionEngagementRate(): number {
    return this.platformHealth.engagementRate;
  }

  getAveragePredictionAccuracy(): number {
    return this.platformHealth.averageAccuracy;
  }

  getTopPerformersCount(): number {
    return this.platformHealth.topPerformersCount;
  }

  getUnderperformersCount(): number {
    return this.platformHealth.underperformersCount;
  }

  getJokerOptimizationRate(): number {
    return this.platformHealth.jokerOptimizationRate;
  }

  // Submission Monitoring Methods
  getCurrentSubmissions(): number {
    return this.submissionData.currentSubmissions;
  }

  getTotalActivePlayers(): number {
    return this.submissionData.totalActivePlayers;
  }

  getSubmissionProgress(): number {
    return this.submissionData.currentSubmissions / this.submissionData.totalActivePlayers;
  }

  getSubmissionProgressColor(): string {
    const progress = this.getSubmissionProgress();
    if (progress >= 0.8) return 'success';
    if (progress >= 0.6) return 'warning';
    return 'danger';
  }

  getTimeRemaining(): string {
    return this.submissionData.timeRemaining;
  }

  getLateSubmissions(): number {
    return this.submissionData.lateSubmissions;
  }

  getAverageSubmissionQuality(): number {
    return this.submissionData.averageSubmissionQuality;
  }

  // Performance Tier Methods
  getElitePredictors(): any[] {
    return this.performanceTiers.elite.users;
  }

  getEliteAverageAccuracy(): number {
    return this.performanceTiers.elite.averageAccuracy;
  }

  getEliteRetentionRate(): number {
    return this.performanceTiers.elite.retentionRate || 0;
  }

  getChampionPredictors(): any[] {
    return this.performanceTiers.champion.users;
  }

  getChampionAverageAccuracy(): number {
    return this.performanceTiers.champion.averageAccuracy;
  }

  getChampionGrowthRate(): number {
    return this.performanceTiers.champion.growthRate || 0;
  }

  getContenderPredictors(): any[] {
    return this.performanceTiers.contender.users;
  }

  getContenderAverageAccuracy(): number {
    return this.performanceTiers.contender.averageAccuracy;
  }

  getContenderPotential(): number {
    return this.performanceTiers.contender.potential || 0;
  }

  getDevelopingPredictors(): any[] {
    return this.performanceTiers.developing.users;
  }

  getDevelopingSupportCount(): number {
    return this.performanceTiers.developing.supportCount || 0;
  }

  getDevelopingInterventionCount(): number {
    return this.performanceTiers.developing.interventionCount || 0;
  }

  getTopPerformers(): TopPerformer[] {
    return this.topPerformers;
  }

  // User Behavior Analytics Methods
  getEarlySubmitters(): number {
    return 32; // percentage
  }

  getStrategicSubmitters(): number {
    return 45; // percentage
  }

  getLastMinuteSubmitters(): number {
    return 23; // percentage
  }

  getConservativePredictors(): number {
    return 38; // percentage
  }

  getBalancedPredictors(): number {
    return 47; // percentage
  }

  getAggressivePredictors(): number {
    return 15; // percentage
  }

  getOptimalJokerUsers(): number {
    return 34; // percentage
  }

  getEmotionalJokerUsers(): number {
    return 41; // percentage
  }

  getJokerEfficiencyRate(): number {
    return 67; // percentage
  }

  // Intervention Methods
  getPerformanceInterventions(): PredictionIntervention[] {
    return this.interventionData.performance;
  }

  getEngagementInterventions(): PredictionIntervention[] {
    return this.interventionData.engagement;
  }

  getBehaviorInterventions(): PredictionIntervention[] {
    return this.interventionData.behavior;
  }

  // Intervention Impact Methods
  getInterventionSuccessRate(): number {
    return 73; // percentage
  }

  getEngagementImprovement(): number {
    return 28; // percentage
  }

  getAccuracyImprovement(): number {
    return 15; // percentage
  }

  getRetentionImprovement(): number {
    return 34; // percentage
  }

  // Intervention Action Methods
  async sendPredictionTips(intervention: PredictionIntervention): Promise<void> {
    await this.toastService.showToast(
      `Prediction tips sent to ${intervention.userName}`,
      'success'
    );
  }

  async assignMentor(intervention: PredictionIntervention): Promise<void> {
    await this.toastService.showToast(
      `Mentor assigned to ${intervention.userName}`,
      'success'
    );
  }

  async sendReEngagementCampaign(intervention: PredictionIntervention): Promise<void> {
    await this.toastService.showToast(
      `Re-engagement campaign sent to ${intervention.userName}`,
      'success'
    );
  }

  async offerIncentive(intervention: PredictionIntervention): Promise<void> {
    await this.toastService.showToast(
      `Incentive offered to ${intervention.userName}`,
      'success'
    );
  }

  async sendPersonalizedCoaching(intervention: PredictionIntervention): Promise<void> {
    await this.toastService.showToast(
      `Personalized coaching sent to ${intervention.userName}`,
      'success'
    );
  }

  async recommendStrategy(intervention: PredictionIntervention): Promise<void> {
    await this.toastService.showToast(
      `Strategy guide recommended to ${intervention.userName}`,
      'success'
    );
  }
}
