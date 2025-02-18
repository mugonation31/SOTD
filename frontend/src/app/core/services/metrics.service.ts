import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SystemMetrics } from '@core/interfaces/system-metrics.interface';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSystemMetrics(): Observable<SystemMetrics> {
    // Mock data for development
    const mockMetrics: SystemMetrics = {
      performance: {
        apiLatency: 150,
        errorRate: 0.5,
        uptime: 99.95,
        lastDeployment: new Date().toISOString(),
      },
      activeUsers: {
        total: 1250,
        today: 450,
        lastHour: 85,
        thisWeek: 850,
      },
      predictions: {
        total: 25000,
        today: 1200,
        accuracy: 78.5,
      },
      storage: {
        usedSpace: 2.5 * 1024 * 1024 * 1024, // 2.5GB in bytes
        totalSize: 10 * 1024 * 1024 * 1024, // 10GB in bytes
        backupStatus: 'Success',
        lastBackup: new Date().toISOString(),
      },
    };

    return of(mockMetrics);

    // TODO: Uncomment this when backend is ready
    // return this.http.get<SystemMetrics>(`${this.apiUrl}/admin/metrics`);
  }

  getRealtimeMetrics(): Observable<Partial<SystemMetrics>> {
    // Mock response for frontend development
    const mockRealtimeMetrics: Partial<SystemMetrics> = {
      activeUsers: {
        total: Math.floor(Math.random() * 2000),
        lastHour: Math.floor(Math.random() * 100),
        today: Math.floor(Math.random() * 1000),
        thisWeek: Math.floor(Math.random() * 5000),
      },
      performance: {
        apiLatency: 120 + Math.random() * 50,
        errorRate: Math.random() * 0.5,
        uptime: 99.95 + Math.random() * 0.1,
        lastDeployment: new Date().toISOString(),
      },
    };

    return of(mockRealtimeMetrics);

    // TODO: Uncomment this when backend is ready
    // return this.http.get<Partial<SystemMetrics>>(`${this.apiUrl}/admin/metrics/realtime`);
  }

  getMetricsHistory(timeframe: 'day' | 'week' | 'month'): Observable<any> {
    // TODO: Implement historical metrics data
    return of([]);

    // TODO: Uncomment this when backend is ready
    // return this.http.get<any>(`${this.apiUrl}/admin/metrics/history/${timeframe}`);
  }
}
