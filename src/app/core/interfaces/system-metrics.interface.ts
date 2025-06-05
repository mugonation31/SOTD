export interface SystemMetrics {
  performance: {
    apiLatency: number;
    errorRate: number;
    uptime: number;
    lastDeployment: string;
  };
  activeUsers: {
    total: number;
    today: number;
    lastHour: number;
    thisWeek: number;
  };
  predictions: {
    total: number;
    today: number;
    accuracy: number;
  };
  storage: {
    usedSpace: number;
    totalSize: number;
    backupStatus: 'Success' | 'Warning' | 'Error';
    lastBackup: string;
  };
}
