import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
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
} from 'ionicons/icons';
import { MetricsService } from '../../../../core/services/metrics.service';
import { SystemMetrics } from '../../../../core/interfaces/system-metrics.interface';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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

  constructor(private metricsService: MetricsService) {
    addIcons({
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
    });
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
        console.log('Historical data:', data);
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

  getPerformanceValue(metric: keyof SystemMetrics['performance']): number {
    if (metric === 'lastDeployment') return 0; // Skip string value
    return this.metrics?.performance?.[metric] || 0;
  }

  getActiveUsersValue(metric: keyof SystemMetrics['activeUsers']): number {
    return this.metrics?.activeUsers?.[metric] || 0;
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
}
