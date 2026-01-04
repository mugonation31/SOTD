"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_super-admin_pages_metrics_metrics_page_ts"],{

/***/ 3153:
/*!**************************************************!*\
  !*** ./src/app/core/services/metrics.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MetricsService: () => (/* binding */ MetricsService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 6443);
var _MetricsService;




class MetricsService {
  constructor(http) {
    this.http = http;
    this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
  }
  getSystemMetrics() {
    // Mock data for development
    const mockMetrics = {
      performance: {
        apiLatency: 150,
        errorRate: 0.5,
        uptime: 99.95,
        lastDeployment: new Date().toISOString()
      },
      activeUsers: {
        total: 1250,
        today: 450,
        lastHour: 85,
        thisWeek: 850
      },
      predictions: {
        total: 25000,
        today: 1200,
        accuracy: 78.5
      },
      storage: {
        usedSpace: 2.5 * 1024 * 1024 * 1024,
        // 2.5GB in bytes
        totalSize: 10 * 1024 * 1024 * 1024,
        // 10GB in bytes
        backupStatus: 'Success',
        lastBackup: new Date().toISOString()
      }
    };
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(mockMetrics);
    // TODO: Uncomment this when backend is ready
    // return this.http.get<SystemMetrics>(`${this.apiUrl}/admin/metrics`);
  }
  getRealtimeMetrics() {
    // Mock response for frontend development
    const mockRealtimeMetrics = {
      activeUsers: {
        total: Math.floor(Math.random() * 2000),
        lastHour: Math.floor(Math.random() * 100),
        today: Math.floor(Math.random() * 1000),
        thisWeek: Math.floor(Math.random() * 5000)
      },
      performance: {
        apiLatency: 120 + Math.random() * 50,
        errorRate: Math.random() * 0.5,
        uptime: 99.95 + Math.random() * 0.1,
        lastDeployment: new Date().toISOString()
      }
    };
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(mockRealtimeMetrics);
    // TODO: Uncomment this when backend is ready
    // return this.http.get<Partial<SystemMetrics>>(`${this.apiUrl}/admin/metrics/realtime`);
  }
  getMetricsHistory(timeframe) {
    // TODO: Implement historical metrics data
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)([]);
    // TODO: Uncomment this when backend is ready
    // return this.http.get<any>(`${this.apiUrl}/admin/metrics/history/${timeframe}`);
  }
}
_MetricsService = MetricsService;
_MetricsService.ɵfac = function MetricsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MetricsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
_MetricsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _MetricsService,
  factory: _MetricsService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 3301:
/*!*********************************************************************!*\
  !*** ./src/app/platforms/super-admin/pages/metrics/metrics.page.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MetricsPage: () => (/* binding */ MetricsPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 6196);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_metrics_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/services/metrics.service */ 3153);

var _MetricsPage;










function MetricsPage_p_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Last outage: ", ctx_r0.getTimeAgo(ctx_r0.systemHealth.platform.lastOutage), " ");
  }
}
function MetricsPage_div_131_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 41)(1, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const outcome_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](outcome_r2.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("width", outcome_r2.percentage, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", outcome_r2.percentage, "%");
  }
}
class MetricsPage {
  constructor(metricsService) {
    this.metricsService = metricsService;
    this.metrics = null;
    this.selectedTimeframe = 'day';
    this.storageUsagePercentage = 0;
    this.storageUsageColor = 'success';
    this.systemHealth = {
      platform: {
        uptime: 99.8,
        lastOutage: new Date('2024-03-18T09:15:00'),
        status: 'healthy'
      },
      performance: {
        avgResponseTime: 245,
        errorRate: 0.02,
        activeConnections: 1247
      },
      dataSync: {
        footballApiStatus: 'connected',
        lastSync: new Date('2024-03-20T14:30:00'),
        nextSync: new Date('2024-03-20T18:00:00'),
        failedSyncs: 0
      },
      security: {
        failedLogins: 3,
        suspiciousActivity: 0,
        lastSecurityScan: new Date('2024-03-20T02:00:00'),
        vulnerabilities: 0
      }
    };
    this.footballMetrics = {
      currentGameweek: 28,
      completionRate: 87.3,
      avgPredictionsPerUser: 9.2,
      peakSubmissionTime: '7:30 PM',
      lastMinuteSubmissions: 23.4,
      earlySubmissions: 41.2,
      popularOutcomes: [{
        label: 'Home Win',
        percentage: 42.3
      }, {
        label: 'Draw',
        percentage: 28.7
      }, {
        label: 'Away Win',
        percentage: 29.0
      }, {
        label: 'Over 2.5 Goals',
        percentage: 61.8
      }, {
        label: 'Under 2.5 Goals',
        percentage: 38.2
      }],
      jokerUsage: {
        firstJokerUsed: 892,
        secondJokerUsed: 743,
        totalEligible: 1250,
        optimalUsageRate: 78.4
      }
    };
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      serverOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.serverOutline,
      speedometerOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.speedometerOutline,
      syncOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.syncOutline,
      shieldOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.shieldOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.footballOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.peopleOutline,
      statsChartOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.statsChartOutline,
      cloudUploadOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.cloudUploadOutline,
      trendingUpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trendingUpOutline,
      trendingDownOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trendingDownOutline,
      alertCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.alertCircleOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.checkmarkCircleOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.timeOutline,
      warningOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.warningOutline
    });
  }
  ngOnInit() {
    this.loadMetrics();
  }
  ngOnDestroy() {
    var _this$metricsSubscrip;
    (_this$metricsSubscrip = this.metricsSubscription) === null || _this$metricsSubscrip === void 0 || _this$metricsSubscrip.unsubscribe();
  }
  refreshMetrics(event) {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        var _event$target;
        _this.metrics = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.firstValueFrom)(_this.metricsService.getSystemMetrics());
        _this.updateStorageMetrics();
        event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 || _event$target.complete();
      } catch (error) {
        var _event$target2;
        console.error('Error refreshing metrics:', error);
        event === null || event === void 0 || (_event$target2 = event.target) === null || _event$target2 === void 0 || _event$target2.complete();
      }
    })();
  }
  loadMetrics() {
    this.metricsSubscription = this.metricsService.getSystemMetrics().subscribe({
      next: data => {
        this.metrics = data;
        this.updateStorageMetrics();
      },
      error: error => {
        console.error('Error loading metrics:', error);
      }
    });
  }
  loadHistoricalData() {
    this.metricsService.getMetricsHistory(this.selectedTimeframe).subscribe({
      next: data => {},
      error: error => {
        console.error('Error loading historical data:', error);
      }
    });
  }
  updateStorageMetrics() {
    var _this$metrics;
    if ((_this$metrics = this.metrics) !== null && _this$metrics !== void 0 && _this$metrics.storage) {
      const {
        usedSpace,
        totalSize
      } = this.metrics.storage;
      this.storageUsagePercentage = usedSpace / totalSize * 100;
      this.storageUsageColor = this.getStorageUsageColor(this.storageUsagePercentage);
    }
  }
  getPredictionsValue(metric) {
    var _this$metrics2;
    return ((_this$metrics2 = this.metrics) === null || _this$metrics2 === void 0 || (_this$metrics2 = _this$metrics2.predictions) === null || _this$metrics2 === void 0 ? void 0 : _this$metrics2[metric]) || 0;
  }
  getBackupStatusColor() {
    var _this$metrics3;
    const status = (_this$metrics3 = this.metrics) === null || _this$metrics3 === void 0 || (_this$metrics3 = _this$metrics3.storage) === null || _this$metrics3 === void 0 ? void 0 : _this$metrics3.backupStatus;
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
  getStorageUsageColor(percentage) {
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'success';
  }
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  // System Health Helper Methods
  getSystemHealthStatusColor(status) {
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
  getApiSyncStatusColor(status) {
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
  getTimeAgo(date) {
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
  getTimeUntil(date) {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m`;
    return 'Now';
  }
}
_MetricsPage = MetricsPage;
_MetricsPage.ɵfac = function MetricsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MetricsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_metrics_service__WEBPACK_IMPORTED_MODULE_2__.MetricsService));
};
_MetricsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _MetricsPage,
  selectors: [["app-metrics"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 185,
  vars: 53,
  consts: [["slot", "fixed", 3, "ionRefresh"], [1, "system-health-section", "ion-padding"], [1, "health-grid"], [1, "health-card"], [1, "health-icon"], ["name", "server-outline", 3, "color"], [1, "health-info"], [3, "color"], ["class", "health-detail", 4, "ngIf"], ["name", "speedometer-outline", "color", "primary"], ["color", "secondary"], ["name", "sync-outline", 3, "color"], [1, "health-detail"], ["name", "shield-outline", 3, "color"], [1, "metrics-grid", "ion-padding"], [1, "metric-card", "predictions-enhanced"], ["name", "football-outline"], [1, "predictions-primary"], [1, "metric-item"], [1, "label"], [1, "value"], [1, "value", "success"], [1, "predictions-football"], [1, "metric-group"], [1, "popular-outcomes"], ["class", "outcome-item", 4, "ngFor", "ngForOf"], [1, "joker-stats"], [1, "metric-card"], ["name", "server-outline"], [1, "storage-usage"], [1, "usage-bar"], [3, "value", "color"], [1, "usage-text"], [1, "backup-status"], [1, "metrics-history", "ion-padding-horizontal"], [3, "ngModelChange", "ionChange", "ngModel"], ["value", "day"], ["value", "week"], ["value", "month"], [1, "chart-card"], [1, "chart-placeholder"], [1, "outcome-item"], [1, "outcome-label"], [1, "outcome-bar"], [1, "outcome-fill"], [1, "outcome-percentage"]],
  template: function MetricsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "System Metrics");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-content")(5, "ion-refresher", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionRefresh", function MetricsPage_Template_ion_refresher_ionRefresh_5_listener($event) {
        return ctx.refreshMetrics($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "ion-refresher-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 1)(8, "ion-card")(9, "ion-card-header")(10, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "System Health & Performance");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "ion-card-content")(13, "div", 2)(14, "div", 3)(15, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](16, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 6)(18, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Platform Status");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "ion-badge", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](24, "titlecase");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, MetricsPage_p_25_Template, 2, 1, "p", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "div", 3)(27, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](28, "ion-icon", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 6)(30, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, "Performance");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "ion-badge", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 3)(39, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](40, "ion-icon", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "div", 6)(42, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "Data Sync");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](45, "Football API");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "ion-badge", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](48, "titlecase");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "p", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "p", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](52);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "div", 3)(54, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](55, "ion-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](56, "div", 6)(57, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](58, "Security");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](62);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "ion-badge", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](64);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](65, "p", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](67, "div", 14)(68, "ion-card", 15)(69, "ion-card-header")(70, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](71, "ion-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](72, " Football Predictions Analytics ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "ion-card-content")(74, "div", 17)(75, "div", 18)(76, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](77, "Total Predictions");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](78, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](79);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](80, "div", 18)(81, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](82, "Today's Predictions");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](83, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](84);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](85, "div", 18)(86, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](87, "Accuracy Rate");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](88, "span", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](89);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "div", 22)(91, "div", 23)(92, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93, "Gameweek Performance");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](94, "div", 18)(95, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](96, "Current Gameweek");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](97, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](98);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](99, "div", 18)(100, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](101, "Completion Rate");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](102, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](103);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](104, "div", 18)(105, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](106, "Avg per User");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](107, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](108);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](109, "div", 23)(110, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](111, "Engagement Trends");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](112, "div", 18)(113, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](114, "Peak Submission Time");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](115, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](116);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](117, "div", 18)(118, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](119, "Last Minute Submissions");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](120, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](121);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](122, "div", 18)(123, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](124, "Early Submissions");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](125, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](126);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](127, "div", 23)(128, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](129, "Popular Predictions");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](130, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](131, MetricsPage_div_131_Template, 7, 4, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](132, "div", 23)(133, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](134, "Joker Usage");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](135, "div", 26)(136, "div", 18)(137, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](138, "First Joker Used");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](139, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](140);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](141, "div", 18)(142, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](143, "Second Joker Used");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](144, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](145);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](146, "div", 18)(147, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](148, "Optimal Usage Rate");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](149, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](150);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](151, "ion-card", 27)(152, "ion-card-header")(153, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](154, "ion-icon", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](155, " Storage Status ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](156, "ion-card-content")(157, "div", 29)(158, "div", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](159, "ion-progress-bar", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](160, "div", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](161);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](162, "div", 33)(163, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](164, "Last Backup");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](165, "span", 20)(166, "ion-badge", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](167);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](168);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](169, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](170, "div", 34)(171, "ion-segment", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function MetricsPage_Template_ion_segment_ngModelChange_171_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.selectedTimeframe, $event) || (ctx.selectedTimeframe = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionChange", function MetricsPage_Template_ion_segment_ionChange_171_listener() {
        return ctx.loadHistoricalData();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](172, "ion-segment-button", 36)(173, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](174, "24 Hours");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](175, "ion-segment-button", 37)(176, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](177, "7 Days");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](178, "ion-segment-button", 38)(179, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](180, "30 Days");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](181, "ion-card", 39)(182, "ion-card-content")(183, "div", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](184, " Chart visualization will be implemented with a charting library ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx.getSystemHealthStatusColor(ctx.systemHealth.platform.status));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx.systemHealth.platform.uptime, "% Uptime");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx.getSystemHealthStatusColor(ctx.systemHealth.platform.status));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](24, 46, ctx.systemHealth.platform.status), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.systemHealth.platform.lastOutage);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx.systemHealth.performance.avgResponseTime, "ms avg");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx.systemHealth.performance.errorRate, "% error rate");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.systemHealth.performance.activeConnections, " active ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx.getApiSyncStatusColor(ctx.systemHealth.dataSync.footballApiStatus));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx.getApiSyncStatusColor(ctx.systemHealth.dataSync.footballApiStatus));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](48, 48, ctx.systemHealth.dataSync.footballApiStatus), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Last sync: ", ctx.getTimeAgo(ctx.systemHealth.dataSync.lastSync), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Next sync: ", ctx.getTimeUntil(ctx.systemHealth.dataSync.nextSync), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx.systemHealth.security.vulnerabilities > 0 ? "danger" : "success");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx.systemHealth.security.failedLogins, " failed logins");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx.systemHealth.security.suspiciousActivity, " suspicious activities");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx.systemHealth.security.vulnerabilities > 0 ? "danger" : "success");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.systemHealth.security.vulnerabilities, " vulnerabilities ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Last scan: ", ctx.getTimeAgo(ctx.systemHealth.security.lastSecurityScan), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.getPredictionsValue("total"));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.getPredictionsValue("today"));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.getPredictionsValue("accuracy"), "% ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.footballMetrics.currentGameweek);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("warning", ctx.footballMetrics.completionRate < 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.footballMetrics.completionRate, "% ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.footballMetrics.avgPredictionsPerUser);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.footballMetrics.peakSubmissionTime);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx.footballMetrics.lastMinuteSubmissions, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx.footballMetrics.earlySubmissions, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.footballMetrics.popularOutcomes);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", ctx.footballMetrics.jokerUsage.firstJokerUsed, "/", ctx.footballMetrics.jokerUsage.totalEligible, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", ctx.footballMetrics.jokerUsage.secondJokerUsed, "/", ctx.footballMetrics.jokerUsage.totalEligible, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("success", ctx.footballMetrics.jokerUsage.optimalUsageRate > 75);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.footballMetrics.jokerUsage.optimalUsageRate, "% ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx.storageUsagePercentage / 100)("color", ctx.storageUsageColor);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"](" ", ctx.formatBytes((ctx.metrics == null ? null : ctx.metrics.storage == null ? null : ctx.metrics.storage.usedSpace) || 0), " / ", ctx.formatBytes((ctx.metrics == null ? null : ctx.metrics.storage == null ? null : ctx.metrics.storage.totalSize) || 0), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx.getBackupStatusColor());
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.metrics == null ? null : ctx.metrics.storage == null ? null : ctx.metrics.storage.backupStatus) || "N/A", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](169, 50, ctx.metrics == null ? null : ctx.metrics.storage == null ? null : ctx.metrics.storage.lastBackup, "medium"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedTimeframe);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.TitleCasePipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonRefresher, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonRefresherContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonSegment, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonSegmentButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonProgressBar],
  styles: ["[_nghost-%COMP%]   ion-content[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n\n.system-health-section[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.system-health-section[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\n.health-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1rem;\n}\n\n.health-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 1rem;\n  border-left: 4px solid var(--ion-color-primary);\n  background: var(--ion-color-light);\n  border-radius: 8px;\n  height: 100%;\n}\n\n.health-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  padding: 0.75rem;\n  border-radius: 50%;\n  background: var(--ion-color-step-50);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 3.5rem;\n  height: 3.5rem;\n}\n\n.health-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.health-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.health-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0;\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n}\n\n.health-detail[_ngcontent-%COMP%] {\n  font-size: 0.8rem !important;\n  color: var(--ion-color-medium-shade) !important;\n  margin-top: 0.5rem !important;\n}\n\n@media (max-width: 768px) {\n  .health-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .health-card[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .health-icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    min-width: 2.5rem;\n    height: 2.5rem;\n  }\n  .health-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n.metrics-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.metric-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.metric-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.metric-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: var(--ion-color-primary);\n}\n.metric-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n\n.metric-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.metric-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.metric-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n}\n.metric-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 1.1rem;\n  color: var(--ion-color-dark);\n}\n.metric-item[_ngcontent-%COMP%]   .value.success[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n}\n.metric-item[_ngcontent-%COMP%]   .value.warning[_ngcontent-%COMP%] {\n  color: var(--ion-color-warning);\n}\n.metric-item[_ngcontent-%COMP%]   .value.error[_ngcontent-%COMP%] {\n  color: var(--ion-color-danger);\n}\n\n.storage-usage[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.storage-usage[_ngcontent-%COMP%]   .usage-bar[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.storage-usage[_ngcontent-%COMP%]   .usage-bar[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%] {\n  height: 8px;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.storage-usage[_ngcontent-%COMP%]   .usage-text[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n  text-align: right;\n}\n\n.backup-status[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.backup-status[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n}\n.backup-status[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9rem;\n}\n.backup-status[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  text-transform: capitalize;\n  font-weight: 500;\n}\n\n.metrics-history[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.metrics-history[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  background: white;\n  border-radius: 8px;\n  padding: 4px;\n}\n.metrics-history[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n}\n.metrics-history[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%]   .chart-placeholder[_ngcontent-%COMP%] {\n  height: 300px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--ion-color-medium);\n  font-style: italic;\n}\n\n.predictions-enhanced[_ngcontent-%COMP%]   .predictions-primary[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid var(--ion-color-light-shade);\n}\n@media (max-width: 768px) {\n  .predictions-enhanced[_ngcontent-%COMP%]   .predictions-primary[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .predictions-football[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .metric-group[_ngcontent-%COMP%] {\n  background: var(--ion-color-light);\n  border-radius: 8px;\n  padding: 1rem;\n  border-left: 4px solid var(--ion-color-primary);\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .metric-group[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .metric-group[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n  margin-bottom: 0.75rem;\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .metric-group[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .metric-group[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .popular-outcomes[_ngcontent-%COMP%]   .outcome-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 0.75rem;\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .popular-outcomes[_ngcontent-%COMP%]   .outcome-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .popular-outcomes[_ngcontent-%COMP%]   .outcome-item[_ngcontent-%COMP%]   .outcome-label[_ngcontent-%COMP%] {\n  min-width: 80px;\n  font-size: 0.85rem;\n  color: var(--ion-color-medium-shade);\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .popular-outcomes[_ngcontent-%COMP%]   .outcome-item[_ngcontent-%COMP%]   .outcome-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 8px;\n  background: var(--ion-color-light-shade);\n  border-radius: 4px;\n  overflow: hidden;\n  position: relative;\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .popular-outcomes[_ngcontent-%COMP%]   .outcome-item[_ngcontent-%COMP%]   .outcome-bar[_ngcontent-%COMP%]   .outcome-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: linear-gradient(90deg, var(--ion-color-primary), var(--ion-color-primary-shade));\n  transition: width 0.3s ease;\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .popular-outcomes[_ngcontent-%COMP%]   .outcome-item[_ngcontent-%COMP%]   .outcome-percentage[_ngcontent-%COMP%] {\n  min-width: 40px;\n  text-align: right;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.predictions-enhanced[_ngcontent-%COMP%]   .joker-stats[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-family: \"Courier New\", monospace;\n  font-size: 0.9rem;\n}\n@media (max-width: 768px) {\n  .predictions-enhanced[_ngcontent-%COMP%]   .predictions-football[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .predictions-enhanced[_ngcontent-%COMP%]   .metric-group[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .predictions-enhanced[_ngcontent-%COMP%]   .popular-outcomes[_ngcontent-%COMP%]   .outcome-item[_ngcontent-%COMP%]   .outcome-label[_ngcontent-%COMP%] {\n    min-width: 60px;\n    font-size: 0.8rem;\n  }\n}\n\n@media (max-width: 768px) {\n  .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .metric-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .metric-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldHJpY3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0Usb0NBQUE7QUFBSjs7QUFLQTtFQUNFLG1CQUFBO0FBRkY7QUFJRTtFQUNFLFNBQUE7RUFDQSxtQkFBQTtFQUNBLHdDQUFBO0FBRko7O0FBTUE7RUFDRSxhQUFBO0VBQ0EsMkRBQUE7RUFDQSxTQUFBO0FBSEY7O0FBTUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLCtDQUFBO0VBQ0Esa0NBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUFIRjs7QUFNQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQUhGOztBQU1BO0VBQ0UsT0FBQTtBQUhGO0FBS0U7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQUhKO0FBTUU7RUFDRSxpQkFBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7QUFKSjs7QUFRQTtFQUNFLDRCQUFBO0VBQ0EsK0NBQUE7RUFDQSw2QkFBQTtBQUxGOztBQVNBO0VBQ0U7SUFDRSwwQkFBQTtFQU5GO0VBU0E7SUFDRSxnQkFBQTtFQVBGO0VBVUE7SUFDRSxpQkFBQTtJQUNBLGlCQUFBO0lBQ0EsY0FBQTtFQVJGO0VBV0E7SUFDRSxlQUFBO0VBVEY7QUFDRjtBQVlBO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBVkY7O0FBYUE7RUFDRSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSx3Q0FBQTtBQVZGO0FBWUU7RUFDRSxhQUFBO0FBVko7QUFZSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBVk47QUFZTTtFQUNFLGtCQUFBO0VBQ0EsK0JBQUE7QUFWUjtBQWVFO0VBQ0UsYUFBQTtBQWJKOztBQWlCQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFkRjtBQWdCRTtFQUNFLGdCQUFBO0FBZEo7QUFpQkU7RUFDRSw4QkFBQTtFQUNBLGlCQUFBO0FBZko7QUFrQkU7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsNEJBQUE7QUFoQko7QUFrQkk7RUFDRSwrQkFBQTtBQWhCTjtBQW1CSTtFQUNFLCtCQUFBO0FBakJOO0FBb0JJO0VBQ0UsOEJBQUE7QUFsQk47O0FBdUJBO0VBQ0UsbUJBQUE7QUFwQkY7QUFzQkU7RUFDRSxxQkFBQTtBQXBCSjtBQXNCSTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBcEJOO0FBd0JFO0VBQ0UsaUJBQUE7RUFDQSw4QkFBQTtFQUNBLGlCQUFBO0FBdEJKOztBQTBCQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0FBdkJGO0FBeUJFO0VBQ0UsOEJBQUE7RUFDQSxpQkFBQTtBQXZCSjtBQTBCRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtBQXhCSjtBQTBCSTtFQUNFLDBCQUFBO0VBQ0EsZ0JBQUE7QUF4Qk47O0FBNkJBO0VBQ0UsbUJBQUE7QUExQkY7QUE0QkU7RUFDRSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBMUJKO0FBNkJFO0VBQ0UsU0FBQTtFQUNBLG1CQUFBO0FBM0JKO0FBNkJJO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtBQTNCTjs7QUFrQ0U7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLHFEQUFBO0FBL0JKO0FBaUNJO0VBUkY7SUFTSSxzQkFBQTtJQUNBLFdBQUE7RUE5Qko7QUFDRjtBQWlDRTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFdBQUE7QUEvQko7QUFrQ0U7RUFDRSxrQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLCtDQUFBO0FBaENKO0FBa0NJO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUFoQ047QUFtQ0k7RUFDRSxzQkFBQTtBQWpDTjtBQW1DTTtFQUNFLGtCQUFBO0FBakNSO0FBb0NNO0VBQ0UsZUFBQTtBQWxDUjtBQXdDSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtBQXRDTjtBQXdDTTtFQUNFLGdCQUFBO0FBdENSO0FBeUNNO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7QUF2Q1I7QUEwQ007RUFDRSxPQUFBO0VBQ0EsV0FBQTtFQUNBLHdDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBeENSO0FBMENRO0VBQ0UsWUFBQTtFQUNBLDRGQUFBO0VBQ0EsMkJBQUE7QUF4Q1Y7QUE0Q007RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUExQ1I7QUFpRE07RUFDRSxxQ0FBQTtFQUNBLGlCQUFBO0FBL0NSO0FBb0RFO0VBQ0U7SUFDRSwwQkFBQTtJQUNBLFNBQUE7RUFsREo7RUFxREU7SUFDRSxnQkFBQTtFQW5ESjtFQXdETTtJQUNFLGVBQUE7SUFDQSxpQkFBQTtFQXREUjtBQUNGOztBQTZEQTtFQUNFO0lBQ0UsMEJBQUE7RUExREY7RUErREk7SUFDRSxlQUFBO0VBN0ROO0VBbUVFO0lBQ0UsZUFBQTtFQWpFSjtBQUNGIiwiZmlsZSI6Im1ldHJpY3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGlvbi1jb250ZW50IHtcclxuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFN5c3RlbSBIZWFsdGggTW9uaXRvcmluZyBTdHlsZXNcclxuLnN5c3RlbS1oZWFsdGgtc2VjdGlvbiB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgaW9uLWNhcmQge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgfVxyXG59XHJcblxyXG4uaGVhbHRoLWdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyODBweCwgMWZyKSk7XHJcbiAgZ2FwOiAxcmVtO1xyXG59XHJcblxyXG4uaGVhbHRoLWNhcmQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uaGVhbHRoLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMnJlbTtcclxuICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC01MCk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG1pbi13aWR0aDogMy41cmVtO1xyXG4gIGhlaWdodDogMy41cmVtO1xyXG59XHJcblxyXG4uaGVhbHRoLWluZm8ge1xyXG4gIGZsZXg6IDE7XHJcblxyXG4gIGgzIHtcclxuICAgIG1hcmdpbjogMCAwIDAuNXJlbSAwO1xyXG4gICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICB9XHJcblxyXG4gIHAge1xyXG4gICAgbWFyZ2luOiAwLjI1cmVtIDA7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICB9XHJcbn1cclxuXHJcbi5oZWFsdGgtZGV0YWlsIHtcclxuICBmb250LXNpemU6IDAuOHJlbSAhaW1wb3J0YW50O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlKSAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi10b3A6IDAuNXJlbSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4vLyBSZXNwb25zaXZlIGFkanVzdG1lbnRzIGZvciBoZWFsdGggY2FyZHNcclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLmhlYWx0aC1ncmlkIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xyXG4gIH1cclxuICBcclxuICAuaGVhbHRoLWNhcmQge1xyXG4gICAgcGFkZGluZzogMC43NXJlbTtcclxuICB9XHJcbiAgXHJcbiAgLmhlYWx0aC1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgbWluLXdpZHRoOiAyLjVyZW07XHJcbiAgICBoZWlnaHQ6IDIuNXJlbTtcclxuICB9XHJcbiAgXHJcbiAgLmhlYWx0aC1pbmZvIGgzIHtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICB9XHJcbn1cclxuXHJcbi5tZXRyaWNzLWdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgzMDBweCwgMWZyKSk7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XHJcbn1cclxuXHJcbi5tZXRyaWMtY2FyZCB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuXHJcbiAgaW9uLWNhcmQtaGVhZGVyIHtcclxuICAgIHBhZGRpbmc6IDFyZW07XHJcblxyXG4gICAgaW9uLWNhcmQtdGl0bGUge1xyXG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcblxyXG4gICAgICBpb24taWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjI1cmVtO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xyXG4gICAgcGFkZGluZzogMXJlbTtcclxuICB9XHJcbn1cclxuXHJcbi5tZXRyaWMtaXRlbSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG5cclxuICAmOmxhc3QtY2hpbGQge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcclxuICB9XHJcblxyXG4gIC5sYWJlbCB7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICB9XHJcblxyXG4gIC52YWx1ZSB7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG5cclxuICAgICYuc3VjY2VzcyB7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgJi53YXJuaW5nIHtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAmLmVycm9yIHtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLnN0b3JhZ2UtdXNhZ2Uge1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcblxyXG4gIC51c2FnZS1iYXIge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG5cclxuICAgIGlvbi1wcm9ncmVzcy1iYXIge1xyXG4gICAgICBoZWlnaHQ6IDhweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnVzYWdlLXRleHQge1xyXG4gICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICB9XHJcbn1cclxuXHJcbi5iYWNrdXAtc3RhdHVzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAubGFiZWwge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgfVxyXG5cclxuICAudmFsdWUge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG5cclxuICAgIGlvbi1iYWRnZSB7XHJcbiAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLm1ldHJpY3MtaGlzdG9yeSB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxuXHJcbiAgaW9uLXNlZ21lbnQge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgcGFkZGluZzogNHB4O1xyXG4gIH1cclxuXHJcbiAgLmNoYXJ0LWNhcmQge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuXHJcbiAgICAuY2hhcnQtcGxhY2Vob2xkZXIge1xyXG4gICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBFbmhhbmNlZCBQcmVkaWN0aW9ucyBDYXJkIFN0eWxlc1xyXG4ucHJlZGljdGlvbnMtZW5oYW5jZWQge1xyXG4gIC5wcmVkaWN0aW9ucy1wcmltYXJ5IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xyXG5cclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBnYXA6IDAuNXJlbTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5wcmVkaWN0aW9ucy1mb290YmFsbCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyODBweCwgMWZyKSk7XHJcbiAgICBnYXA6IDEuNXJlbTtcclxuICB9XHJcblxyXG4gIC5tZXRyaWMtZ3JvdXAge1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIHBhZGRpbmc6IDFyZW07XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuXHJcbiAgICBoNCB7XHJcbiAgICAgIG1hcmdpbjogMCAwIDFyZW0gMDtcclxuICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBnYXA6IDAuNXJlbTtcclxuICAgIH1cclxuXHJcbiAgICAubWV0cmljLWl0ZW0ge1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjc1cmVtO1xyXG5cclxuICAgICAgLmxhYmVsIHtcclxuICAgICAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAucG9wdWxhci1vdXRjb21lcyB7XHJcbiAgICAub3V0Y29tZS1pdGVtIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjc1cmVtO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjc1cmVtO1xyXG5cclxuICAgICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAub3V0Y29tZS1sYWJlbCB7XHJcbiAgICAgICAgbWluLXdpZHRoOiA4MHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5vdXRjb21lLWJhciB7XHJcbiAgICAgICAgZmxleDogMTtcclxuICAgICAgICBoZWlnaHQ6IDhweDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHJcbiAgICAgICAgLm91dGNvbWUtZmlsbCB7XHJcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSwgdmFyKC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGUpKTtcclxuICAgICAgICAgIHRyYW5zaXRpb246IHdpZHRoIDAuM3MgZWFzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5vdXRjb21lLXBlcmNlbnRhZ2Uge1xyXG4gICAgICAgIG1pbi13aWR0aDogNDBweDtcclxuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgICAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuam9rZXItc3RhdHMge1xyXG4gICAgLm1ldHJpYy1pdGVtIHtcclxuICAgICAgLnZhbHVlIHtcclxuICAgICAgICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgIC5wcmVkaWN0aW9ucy1mb290YmFsbCB7XHJcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xyXG4gICAgICBnYXA6IDFyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLm1ldHJpYy1ncm91cCB7XHJcbiAgICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLnBvcHVsYXItb3V0Y29tZXMge1xyXG4gICAgICAub3V0Y29tZS1pdGVtIHtcclxuICAgICAgICAub3V0Y29tZS1sYWJlbCB7XHJcbiAgICAgICAgICBtaW4td2lkdGg6IDYwcHg7XHJcbiAgICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFJlc3BvbnNpdmUgYWRqdXN0bWVudHNcclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLm1ldHJpY3MtZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcblxyXG4gIC5tZXRyaWMtY2FyZCB7XHJcbiAgICBpb24tY2FyZC1oZWFkZXIge1xyXG4gICAgICBpb24tY2FyZC10aXRsZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAubWV0cmljLWl0ZW0ge1xyXG4gICAgLnZhbHVlIHtcclxuICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3N1cGVyLWFkbWluL3BhZ2VzL21ldHJpY3MvbWV0cmljcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxvQ0FBQTtBQUFKOztBQUtBO0VBQ0UsbUJBQUE7QUFGRjtBQUlFO0VBQ0UsU0FBQTtFQUNBLG1CQUFBO0VBQ0Esd0NBQUE7QUFGSjs7QUFNQTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7QUFIRjs7QUFNQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsK0NBQUE7RUFDQSxrQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQUhGOztBQU1BO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FBSEY7O0FBTUE7RUFDRSxPQUFBO0FBSEY7QUFLRTtFQUNFLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBSEo7QUFNRTtFQUNFLGlCQUFBO0VBQ0EsOEJBQUE7RUFDQSxpQkFBQTtBQUpKOztBQVFBO0VBQ0UsNEJBQUE7RUFDQSwrQ0FBQTtFQUNBLDZCQUFBO0FBTEY7O0FBU0E7RUFDRTtJQUNFLDBCQUFBO0VBTkY7RUFTQTtJQUNFLGdCQUFBO0VBUEY7RUFVQTtJQUNFLGlCQUFBO0lBQ0EsaUJBQUE7SUFDQSxjQUFBO0VBUkY7RUFXQTtJQUNFLGVBQUE7RUFURjtBQUNGO0FBWUE7RUFDRSxhQUFBO0VBQ0EsMkRBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUFWRjs7QUFhQTtFQUNFLFNBQUE7RUFDQSxtQkFBQTtFQUNBLHdDQUFBO0FBVkY7QUFZRTtFQUNFLGFBQUE7QUFWSjtBQVlJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUFWTjtBQVlNO0VBQ0Usa0JBQUE7RUFDQSwrQkFBQTtBQVZSO0FBZUU7RUFDRSxhQUFBO0FBYko7O0FBaUJBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQWRGO0FBZ0JFO0VBQ0UsZ0JBQUE7QUFkSjtBQWlCRTtFQUNFLDhCQUFBO0VBQ0EsaUJBQUE7QUFmSjtBQWtCRTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSw0QkFBQTtBQWhCSjtBQWtCSTtFQUNFLCtCQUFBO0FBaEJOO0FBbUJJO0VBQ0UsK0JBQUE7QUFqQk47QUFvQkk7RUFDRSw4QkFBQTtBQWxCTjs7QUF1QkE7RUFDRSxtQkFBQTtBQXBCRjtBQXNCRTtFQUNFLHFCQUFBO0FBcEJKO0FBc0JJO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFwQk47QUF3QkU7RUFDRSxpQkFBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7QUF0Qko7O0FBMEJBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7QUF2QkY7QUF5QkU7RUFDRSw4QkFBQTtFQUNBLGlCQUFBO0FBdkJKO0FBMEJFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FBeEJKO0FBMEJJO0VBQ0UsMEJBQUE7RUFDQSxnQkFBQTtBQXhCTjs7QUE2QkE7RUFDRSxtQkFBQTtBQTFCRjtBQTRCRTtFQUNFLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUExQko7QUE2QkU7RUFDRSxTQUFBO0VBQ0EsbUJBQUE7QUEzQko7QUE2Qkk7RUFDRSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSw4QkFBQTtFQUNBLGtCQUFBO0FBM0JOOztBQWtDRTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EscURBQUE7QUEvQko7QUFpQ0k7RUFSRjtJQVNJLHNCQUFBO0lBQ0EsV0FBQTtFQTlCSjtBQUNGO0FBaUNFO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsV0FBQTtBQS9CSjtBQWtDRTtFQUNFLGtDQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsK0NBQUE7QUFoQ0o7QUFrQ0k7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQWhDTjtBQW1DSTtFQUNFLHNCQUFBO0FBakNOO0FBbUNNO0VBQ0Usa0JBQUE7QUFqQ1I7QUFvQ007RUFDRSxlQUFBO0FBbENSO0FBd0NJO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0FBdENOO0FBd0NNO0VBQ0UsZ0JBQUE7QUF0Q1I7QUF5Q007RUFDRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQ0FBQTtBQXZDUjtBQTBDTTtFQUNFLE9BQUE7RUFDQSxXQUFBO0VBQ0Esd0NBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUF4Q1I7QUEwQ1E7RUFDRSxZQUFBO0VBQ0EsNEZBQUE7RUFDQSwyQkFBQTtBQXhDVjtBQTRDTTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQTFDUjtBQWlETTtFQUNFLHFDQUFBO0VBQ0EsaUJBQUE7QUEvQ1I7QUFvREU7RUFDRTtJQUNFLDBCQUFBO0lBQ0EsU0FBQTtFQWxESjtFQXFERTtJQUNFLGdCQUFBO0VBbkRKO0VBd0RNO0lBQ0UsZUFBQTtJQUNBLGlCQUFBO0VBdERSO0FBQ0Y7O0FBNkRBO0VBQ0U7SUFDRSwwQkFBQTtFQTFERjtFQStESTtJQUNFLGVBQUE7RUE3RE47RUFtRUU7SUFDRSxlQUFBO0VBakVKO0FBQ0Y7QUFDQSxnaWFBQWdpYSIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBpb24tY29udGVudCB7XHJcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBTeXN0ZW0gSGVhbHRoIE1vbml0b3JpbmcgU3R5bGVzXHJcbi5zeXN0ZW0taGVhbHRoLXNlY3Rpb24ge1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcblxyXG4gIGlvbi1jYXJkIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIH1cclxufVxyXG5cclxuLmhlYWx0aC1ncmlkIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjgwcHgsIDFmcikpO1xyXG4gIGdhcDogMXJlbTtcclxufVxyXG5cclxuLmhlYWx0aC1jYXJkIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gIGdhcDogMXJlbTtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLmhlYWx0aC1pY29uIHtcclxuICBmb250LXNpemU6IDJyZW07XHJcbiAgcGFkZGluZzogMC43NXJlbTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBtaW4td2lkdGg6IDMuNXJlbTtcclxuICBoZWlnaHQ6IDMuNXJlbTtcclxufVxyXG5cclxuLmhlYWx0aC1pbmZvIHtcclxuICBmbGV4OiAxO1xyXG5cclxuICBoMyB7XHJcbiAgICBtYXJnaW46IDAgMCAwLjVyZW0gMDtcclxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgfVxyXG5cclxuICBwIHtcclxuICAgIG1hcmdpbjogMC4yNXJlbSAwO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgfVxyXG59XHJcblxyXG4uaGVhbHRoLWRldGFpbCB7XHJcbiAgZm9udC1zaXplOiAwLjhyZW0gIWltcG9ydGFudDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSkgIWltcG9ydGFudDtcclxuICBtYXJnaW4tdG9wOiAwLjVyZW0gIWltcG9ydGFudDtcclxufVxyXG5cclxuLy8gUmVzcG9uc2l2ZSBhZGp1c3RtZW50cyBmb3IgaGVhbHRoIGNhcmRzXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5oZWFsdGgtZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcbiAgXHJcbiAgLmhlYWx0aC1jYXJkIHtcclxuICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5oZWFsdGgtaWNvbiB7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIG1pbi13aWR0aDogMi41cmVtO1xyXG4gICAgaGVpZ2h0OiAyLjVyZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5oZWFsdGgtaW5mbyBoMyB7XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgfVxyXG59XHJcblxyXG4ubWV0cmljcy1ncmlkIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMzAwcHgsIDFmcikpO1xyXG4gIGdhcDogMXJlbTtcclxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG59XHJcblxyXG4ubWV0cmljLWNhcmQge1xyXG4gIG1hcmdpbjogMDtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcblxyXG4gIGlvbi1jYXJkLWhlYWRlciB7XHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG5cclxuICAgIGlvbi1jYXJkLXRpdGxlIHtcclxuICAgICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG5cclxuICAgICAgaW9uLWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpb24tY2FyZC1jb250ZW50IHtcclxuICAgIHBhZGRpbmc6IDFyZW07XHJcbiAgfVxyXG59XHJcblxyXG4ubWV0cmljLWl0ZW0ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgJjpsYXN0LWNoaWxkIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgfVxyXG5cclxuICAubGFiZWwge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgfVxyXG5cclxuICAudmFsdWUge1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuXHJcbiAgICAmLnN1Y2Nlc3Mge1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgICYud2FybmluZyB7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgJi5lcnJvciB7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5zdG9yYWdlLXVzYWdlIHtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG5cclxuICAudXNhZ2UtYmFyIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuXHJcbiAgICBpb24tcHJvZ3Jlc3MtYmFyIHtcclxuICAgICAgaGVpZ2h0OiA4cHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC51c2FnZS10ZXh0IHtcclxuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgfVxyXG59XHJcblxyXG4uYmFja3VwLXN0YXR1cyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgLmxhYmVsIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gIH1cclxuXHJcbiAgLnZhbHVlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuXHJcbiAgICBpb24tYmFkZ2Uge1xyXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5tZXRyaWNzLWhpc3Rvcnkge1xyXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XHJcblxyXG4gIGlvbi1zZWdtZW50IHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIHBhZGRpbmc6IDRweDtcclxuICB9XHJcblxyXG4gIC5jaGFydC1jYXJkIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcblxyXG4gICAgLmNoYXJ0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgaGVpZ2h0OiAzMDBweDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gRW5oYW5jZWQgUHJlZGljdGlvbnMgQ2FyZCBTdHlsZXNcclxuLnByZWRpY3Rpb25zLWVuaGFuY2VkIHtcclxuICAucHJlZGljdGlvbnMtcHJpbWFyeSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDFyZW07XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcclxuXHJcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAucHJlZGljdGlvbnMtZm9vdGJhbGwge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjgwcHgsIDFmcikpO1xyXG4gICAgZ2FwOiAxLjVyZW07XHJcbiAgfVxyXG5cclxuICAubWV0cmljLWdyb3VwIHtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcblxyXG4gICAgaDQge1xyXG4gICAgICBtYXJnaW46IDAgMCAxcmVtIDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLm1ldHJpYy1pdGVtIHtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMC43NXJlbTtcclxuXHJcbiAgICAgIC5sYWJlbCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAudmFsdWUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnBvcHVsYXItb3V0Y29tZXMge1xyXG4gICAgLm91dGNvbWUtaXRlbSB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGdhcDogMC43NXJlbTtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMC43NXJlbTtcclxuXHJcbiAgICAgICY6bGFzdC1jaGlsZCB7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLm91dGNvbWUtbGFiZWwge1xyXG4gICAgICAgIG1pbi13aWR0aDogODBweDtcclxuICAgICAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAub3V0Y29tZS1iYXIge1xyXG4gICAgICAgIGZsZXg6IDE7XHJcbiAgICAgICAgaGVpZ2h0OiA4cHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gICAgICAgIC5vdXRjb21lLWZpbGwge1xyXG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSksIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlKSk7XHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiB3aWR0aCAwLjNzIGVhc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAub3V0Y29tZS1wZXJjZW50YWdlIHtcclxuICAgICAgICBtaW4td2lkdGg6IDQwcHg7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmpva2VyLXN0YXRzIHtcclxuICAgIC5tZXRyaWMtaXRlbSB7XHJcbiAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgZm9udC1mYW1pbHk6ICdDb3VyaWVyIE5ldycsIG1vbm9zcGFjZTtcclxuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAucHJlZGljdGlvbnMtZm9vdGJhbGwge1xyXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICAgICAgZ2FwOiAxcmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5tZXRyaWMtZ3JvdXAge1xyXG4gICAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5wb3B1bGFyLW91dGNvbWVzIHtcclxuICAgICAgLm91dGNvbWUtaXRlbSB7XHJcbiAgICAgICAgLm91dGNvbWUtbGFiZWwge1xyXG4gICAgICAgICAgbWluLXdpZHRoOiA2MHB4O1xyXG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZXNwb25zaXZlIGFkanVzdG1lbnRzXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5tZXRyaWNzLWdyaWQge1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgfVxyXG5cclxuICAubWV0cmljLWNhcmQge1xyXG4gICAgaW9uLWNhcmQtaGVhZGVyIHtcclxuICAgICAgaW9uLWNhcmQtdGl0bGUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLm1ldHJpYy1pdGVtIHtcclxuICAgIC52YWx1ZSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 6196:
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/firstValueFrom.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   firstValueFrom: () => (/* binding */ firstValueFrom)
/* harmony export */ });
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/EmptyError */ 3335);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ 9285);


function firstValueFrom(source, config) {
  const hasConfig = typeof config === 'object';
  return new Promise((resolve, reject) => {
    const subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
      next: value => {
        resolve(value);
        subscriber.unsubscribe();
      },
      error: reject,
      complete: () => {
        if (hasConfig) {
          resolve(config.defaultValue);
        } else {
          reject(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__.EmptyError());
        }
      }
    });
    source.subscribe(subscriber);
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_super-admin_pages_metrics_metrics_page_ts.js.map