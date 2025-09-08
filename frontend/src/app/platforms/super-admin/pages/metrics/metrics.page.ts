import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
  IonBadge,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  statsChartOutline,
  serverOutline,
  speedometerOutline,
  cloudUploadOutline,
  trendingUpOutline,
  trendingDownOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  timeOutline,
  syncOutline,
  shieldOutline,
  warningOutline, footballOutline } from 'ionicons/icons';
import { MetricsService } from '../../../../core/services/metrics.service';
import { SystemMetrics } from '../../../../core/interfaces/system-metrics.interface';
import { Subscription, firstValueFrom } from 'rxjs';

interface SystemHealth {
  platform: {
    uptime: number; // percentage
    lastOutage: Date | null;
    status: 'healthy' | 'warning' | 'critical';
  };
  performance: {
    avgResponseTime: number; // milliseconds
    errorRate: number; // percentage
    activeConnections: number;
  };
  dataSync: {
    footballApiStatus: 'connected' | 'disconnected' | 'error';
    lastSync: Date;
    nextSync: Date;
    failedSyncs: number;
  };
  security: {
    failedLogins: number;
    suspiciousActivity: number;
    lastSecurityScan: Date;
    vulnerabilities: number;
  };
}

interface FootballMetrics {
  currentGameweek: number;
  completionRate: number; // percentage
  avgPredictionsPerUser: number;
  peakSubmissionTime: string;
  lastMinuteSubmissions: number; // percentage
  earlySubmissions: number; // percentage
  popularOutcomes: Array<{
    label: string;
    percentage: number;
  }>;
  jokerUsage: {
    firstJokerUsed: number;
    secondJokerUsed: number;
    totalEligible: number;
    optimalUsageRate: number; // percentage
  };
}

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonRefresher,
    IonRefresherContent,
    IonBadge,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
    IonProgressBar,
  ],
})
export class MetricsPage implements OnInit, OnDestroy {
  metrics: SystemMetrics | null = null;
  selectedTimeframe: 'day' | 'week' | 'month' = 'day';
  private metricsSubscription?: Subscription;
  storageUsagePercentage = 0;
  storageUsageColor = 'success';

  systemHealth: SystemHealth = {
    platform: {
      uptime: 99.8,
      lastOutage: new Date('2024-03-18T09:15:00'),
      status: 'healthy',
    },
    performance: {
      avgResponseTime: 245,
      errorRate: 0.02,
      activeConnections: 1247,
    },
    dataSync: {
      footballApiStatus: 'connected',
      lastSync: new Date('2024-03-20T14:30:00'),
      nextSync: new Date('2024-03-20T18:00:00'),
      failedSyncs: 0,
    },
    security: {
      failedLogins: 3,
      suspiciousActivity: 0,
      lastSecurityScan: new Date('2024-03-20T02:00:00'),
      vulnerabilities: 0,
    },
  };

  footballMetrics: FootballMetrics = {
    currentGameweek: 28,
    completionRate: 87.3,
    avgPredictionsPerUser: 9.2,
    peakSubmissionTime: '7:30 PM',
    lastMinuteSubmissions: 23.4,
    earlySubmissions: 41.2,
    popularOutcomes: [
      { label: 'Home Win', percentage: 42.3 },
      { label: 'Draw', percentage: 28.7 },
      { label: 'Away Win', percentage: 29.0 },
      { label: 'Over 2.5 Goals', percentage: 61.8 },
      { label: 'Under 2.5 Goals', percentage: 38.2 },
    ],
    jokerUsage: {
      firstJokerUsed: 892,
      secondJokerUsed: 743,
      totalEligible: 1250,
      optimalUsageRate: 78.4,
    },
  };

  constructor(private metricsService: MetricsService) {
    addIcons({serverOutline,speedometerOutline,syncOutline,shieldOutline,footballOutline,peopleOutline,statsChartOutline,cloudUploadOutline,trendingUpOutline,trendingDownOutline,alertCircleOutline,checkmarkCircleOutline,timeOutline,warningOutline,});
  }

  ngOnInit() {
    this.loadMetrics();
  }

  ngOnDestroy() {
    this.metricsSubscription?.unsubscribe();
  }

  async refreshMetrics(event?: any) {
    try {
      this.metrics = await firstValueFrom(
        this.metricsService.getSystemMetrics()
      );
      this.updateStorageMetrics();
      event?.target?.complete();
    } catch (error) {
      console.error('Error refreshing metrics:', error);
      event?.target?.complete();
    }
  }

  private loadMetrics() {
    this.metricsSubscription = this.metricsService
      .getSystemMetrics()
      .subscribe({
        next: (data) => {
          this.metrics = data;
          this.updateStorageMetrics();
        },
        error: (error) => {
          console.error('Error loading metrics:', error);
        },
      });
  }

  loadHistoricalData() {
    this.metricsService.getMetricsHistory(this.selectedTimeframe).subscribe({
      next: (data) => {

      },
      error: (error) => {
        console.error('Error loading historical data:', error);
      },
    });
  }

  private updateStorageMetrics() {
    if (this.metrics?.storage) {
      const { usedSpace, totalSize } = this.metrics.storage;
      this.storageUsagePercentage = (usedSpace / totalSize) * 100;
      this.storageUsageColor = this.getStorageUsageColor(
        this.storageUsagePercentage
      );
    }
  }



  getPredictionsValue(metric: keyof SystemMetrics['predictions']): number {
    return this.metrics?.predictions?.[metric] || 0;
  }

  getBackupStatusColor(): string {
    const status = this.metrics?.storage?.backupStatus;
    switch (status) {
      case 'Success':
        return 'success';
      case 'Warning':
        return 'warning';
      case 'Error':
        return 'danger';
      default:
        return 'medium';
    }
  }

  private getStorageUsageColor(percentage: number): string {
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'success';
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // System Health Helper Methods
  getSystemHealthStatusColor(status: string): string {
    switch (status) {
      case 'healthy':
        return 'success';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getApiSyncStatusColor(status: string): string {
    switch (status) {
      case 'connected':
        return 'success';
      case 'disconnected':
        return 'warning';
      case 'error':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }

  getTimeUntil(date: Date): string {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m`;
    return 'Now';
  }
}
