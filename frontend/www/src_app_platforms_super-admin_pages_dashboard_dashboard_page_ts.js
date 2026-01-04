"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_super-admin_pages_dashboard_dashboard_page_ts"],{

/***/ 70:
/*!*************************************************************************!*\
  !*** ./src/app/platforms/super-admin/pages/dashboard/dashboard.page.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardPage: () => (/* binding */ DashboardPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);

var _DashboardPage;





function DashboardPage_ion_badge_79_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-badge", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" In ", ctx_r0.overview.specialEvents.daysUntil, " days ");
  }
}
function DashboardPage_ion_badge_90_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-badge", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.overview.paymentStats.totalPending, " Pending ");
  }
}
function DashboardPage_ion_item_215_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "ion-icon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ion-label")(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ion-badge", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const group_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](group_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", group_r2.members, " members");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", group_r2.engagement, "% ");
  }
}
function DashboardPage_ion_item_240_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "ion-icon", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ion-label")(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const activity_r3 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", ctx_r0.getActivityIcon(activity_r3.type))("color", ctx_r0.getActivityColor(activity_r3.type));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](activity_r3.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](7, 4, activity_r3.timestamp, "short"));
  }
}
class DashboardPage {
  constructor() {
    this.overview = {
      totalGroups: 15,
      activeGroups: 12,
      totalUsers: 156,
      activeUsers: 143,
      totalPredictions: 429,
      submittedPredictions: 398,
      currentGameweek: 15,
      nextDeadline: new Date('2024-03-23T11:30:00'),
      jokerStats: {
        firstJokerUsed: 85,
        secondJokerUsed: 32,
        totalEligible: 143
      },
      specialEvents: {
        nextEvent: 'boxing_day',
        daysUntil: 45
      },
      paymentStats: {
        totalPaid: 12,
        totalPending: 3,
        totalGroups: 15
      }
    };
    this.businessIntelligence = {
      growth: {
        newUsersThisWeek: 47,
        newUsersThisMonth: 203,
        newGroupsThisWeek: 5,
        newGroupsThisMonth: 18,
        growthRateWeekly: 12.5,
        growthRateMonthly: 28.7
      },
      revenue: {
        monthlyRecurringRevenue: 3240,
        totalRevenue: 18650,
        conversionRate: 8.3,
        averageRevenuePerUser: 23.50,
        churnRate: 3.2
      },
      engagement: {
        dailyActiveUsers: 89,
        weeklyActiveUsers: 127,
        averageSessionDuration: 14.5,
        predictionsPerUser: 8.7,
        retentionRate: 76.4
      },
      adoption: {
        featuresUsed: {
          predictions: 94.2,
          jokers: 67.8,
          groupChat: 43.1,
          leaderboards: 82.5
        },
        platformUsage: {
          mobile: 68.3,
          web: 31.7
        },
        topGroups: [{
          name: 'Premier League Fanatics',
          members: 24,
          engagement: 91.2
        }, {
          name: 'Champions League Elite',
          members: 18,
          engagement: 87.5
        }, {
          name: 'Football Madness',
          members: 22,
          engagement: 84.8
        }]
      }
    };
    this.recentActivities = [{
      type: 'group_created',
      description: 'New group "Premier League Fanatics" created',
      timestamp: new Date('2024-03-20T14:30:00')
    }, {
      type: 'user_joined',
      description: 'New user joined "Champions League Group"',
      timestamp: new Date('2024-03-20T13:15:00')
    }, {
      type: 'prediction_submitted',
      description: 'Batch of 25 predictions submitted for GW15',
      timestamp: new Date('2024-03-20T12:45:00')
    }, {
      type: 'deadline_passed',
      description: 'Gameweek 14 deadline passed, predictions locked',
      timestamp: new Date('2024-03-20T11:30:00')
    }];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_3__.a)({
      layersOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.layersOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.peopleOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.footballOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.timeOutline,
      starOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.starOutline,
      calendarOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.calendarOutline,
      walletOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.walletOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trophyOutline,
      alertCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.alertCircleOutline,
      lockClosedOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.lockClosedOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.checkmarkCircleOutline,
      trendingUpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trendingUpOutline,
      cashOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.cashOutline,
      pulseOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.pulseOutline,
      statsChartOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.statsChartOutline,
      phonePortraitOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.phonePortraitOutline,
      desktopOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.desktopOutline,
      chatbubbleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.chatbubbleOutline
    });
  }
  getTimeUntilDeadline() {
    const now = new Date();
    const diff = this.overview.nextDeadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 0) return 'Deadline passed';
    if (hours < 24) return `${hours}h remaining`;
    return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  }
  getActivityIcon(type) {
    switch (type) {
      case 'group_created':
        return 'layers-outline';
      case 'user_joined':
        return 'people-outline';
      case 'prediction_submitted':
        return 'football-outline';
      case 'deadline_passed':
        return 'time-outline';
      default:
        return 'alert-circle-outline';
    }
  }
  getActivityColor(type) {
    switch (type) {
      case 'group_created':
        return 'primary';
      case 'user_joined':
        return 'secondary';
      case 'prediction_submitted':
        return 'success';
      case 'deadline_passed':
        return 'warning';
      default:
        return 'medium';
    }
  }
  getNextEventDisplay() {
    if (!this.overview.specialEvents.nextEvent) return 'No upcoming events';
    return this.overview.specialEvents.nextEvent === 'boxing_day' ? 'Boxing Day Special' : 'Final Day Madness';
  }
  manageSpecialEvent() {
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  } // TODO: Implement special event management modal
  manageJokers() {
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  } // TODO: Implement joker management modal
  managePayments() {
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  } // TODO: Implement payment overview modal
  // Business Intelligence Helper Methods
  getGrowthTrend(percentage) {
    if (percentage > 20) return 'Excellent';
    if (percentage > 10) return 'Good';
    if (percentage > 0) return 'Positive';
    return 'Declining';
  }
  getRetentionStatus(rate) {
    if (rate > 80) return 'Excellent';
    if (rate > 60) return 'Good';
    if (rate > 40) return 'Fair';
    return 'Needs Improvement';
  }
  getConversionRateColor(rate) {
    if (rate > 10) return 'success';
    if (rate > 5) return 'warning';
    return 'danger';
  }
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  formatPercentage(value, decimals = 1) {
    return `${value.toFixed(decimals)}%`;
  }
}
_DashboardPage = DashboardPage;
_DashboardPage.ɵfac = function DashboardPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardPage)();
};
_DashboardPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _DashboardPage,
  selectors: [["app-dashboard"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
  decls: 241,
  vars: 58,
  consts: [[1, "ion-padding"], ["size", "12", "sizeMd", "6", "sizeLg", "3"], [1, "stat-card"], [1, "stat-icon"], ["name", "layers-outline", "color", "primary"], [1, "stat-info"], ["color", "success"], ["name", "people-outline", "color", "secondary"], ["name", "football-outline", "color", "tertiary"], ["color", "warning"], ["name", "time-outline", "color", "danger"], ["color", "danger"], ["size", "12", "sizeMd", "4"], ["name", "star-outline", "color", "warning"], ["name", "calendar-outline", "color", "tertiary"], ["color", "tertiary", 4, "ngIf"], ["name", "wallet-outline", "color", "success"], ["color", "warning", 4, "ngIf"], ["size", "12"], [1, "bi-card", "growth"], [1, "bi-icon"], ["name", "trending-up-outline", "color", "success"], [1, "bi-info"], [1, "bi-card", "revenue"], ["name", "cash-outline", "color", "warning"], [1, "bi-card", "engagement"], ["name", "pulse-outline", "color", "tertiary"], ["color", "tertiary"], [1, "bi-card", "adoption"], ["name", "stats-chart-outline", "color", "secondary"], ["color", "secondary"], ["size", "12", "sizeMd", "8"], [1, "analytics-details"], ["size", "6"], [1, "usage-stat"], ["name", "phone-portrait-outline", "color", "primary"], ["name", "desktop-outline", "color", "primary"], [1, "feature-stats"], [1, "feature-bar"], [1, "bar"], [1, "fill"], [1, "top-groups"], ["lines", "none", 4, "ngFor", "ngForOf"], ["size", "12", "sizeMd", "6"], ["expand", "block", 1, "ion-margin-bottom", 3, "click"], ["name", "calendar-outline", "slot", "start"], ["name", "star-outline", "slot", "start"], ["expand", "block", 3, "click"], ["name", "wallet-outline", "slot", "start"], [4, "ngFor", "ngForOf"], ["lines", "none"], ["name", "trophy-outline", "slot", "start", "color", "warning"], ["color", "success", "slot", "end"], ["slot", "start", 3, "name", "color"]],
  template: function DashboardPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "System Overview");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "ion-content", 0)(5, "ion-grid")(6, "ion-row")(7, "ion-col", 1)(8, "ion-card", 2)(9, "ion-card-content")(10, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 5)(13, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Total Groups");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "ion-badge", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "ion-col", 1)(20, "ion-card", 2)(21, "ion-card-content")(22, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](23, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 5)(25, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Total Users");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "ion-badge", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "ion-col", 1)(32, "ion-card", 2)(33, "ion-card-content")(34, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](35, "ion-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "div", 5)(37, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "Current Gameweek");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "ion-badge", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "ion-col", 1)(44, "ion-card", 2)(45, "ion-card-content")(46, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](47, "ion-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "div", 5)(49, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](50, "Next Deadline");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](53, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "ion-badge", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](55);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](56, "ion-row")(57, "ion-col", 12)(58, "ion-card", 2)(59, "ion-card-content")(60, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](61, "ion-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](62, "div", 5)(63, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](64, "Joker Usage");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](65, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](66);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](67, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](68);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](69, "ion-col", 12)(70, "ion-card", 2)(71, "ion-card-content")(72, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](73, "ion-icon", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](74, "div", 5)(75, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](76, "Special Events");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](77, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](78);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](79, DashboardPage_ion_badge_79_Template, 2, 1, "ion-badge", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](80, "ion-col", 12)(81, "ion-card", 2)(82, "ion-card-content")(83, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](84, "ion-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](85, "div", 5)(86, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](87, "Payment Status");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](88, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](89);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](90, DashboardPage_ion_badge_90_Template, 2, 1, "ion-badge", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](91, "ion-grid")(92, "ion-row")(93, "ion-col", 18)(94, "ion-card")(95, "ion-card-header")(96, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](97, "Business Intelligence & Analytics");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](98, "ion-card-content")(99, "ion-grid")(100, "ion-row")(101, "ion-col", 1)(102, "div", 19)(103, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](104, "ion-icon", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](105, "div", 22)(106, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](107, "Growth Metrics");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](108, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](109);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](110, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](111);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](112, "ion-badge", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](113);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](114, "ion-col", 1)(115, "div", 23)(116, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](117, "ion-icon", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](118, "div", 22)(119, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](120, "Revenue Analytics");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](121, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](122);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](123, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](124, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](125);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](126, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](127, "ion-badge", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](128);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](129, "ion-col", 1)(130, "div", 25)(131, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](132, "ion-icon", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](133, "div", 22)(134, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](135, "User Engagement");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](136, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](137);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](138, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](139);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](140, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](141, "ion-badge", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](142);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](143, "ion-col", 1)(144, "div", 28)(145, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](146, "ion-icon", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](147, "div", 22)(148, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](149, "Feature Adoption");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](150, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](151);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](152, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](153);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](154, "ion-badge", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](155);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](156, "ion-row")(157, "ion-col", 31)(158, "div", 32)(159, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](160, "Platform Usage Breakdown");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](161, "ion-grid")(162, "ion-row")(163, "ion-col", 33)(164, "div", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](165, "ion-icon", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](166, "div")(167, "strong");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](168);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](169, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](170, "Mobile Users");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](171, "ion-col", 33)(172, "div", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](173, "ion-icon", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](174, "div")(175, "strong");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](176);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](177, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](178, "Web Users");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](179, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](180, "Feature Usage Statistics");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](181, "div", 37)(182, "div", 38)(183, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](184, "Predictions");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](185, "div", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](186, "div", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](187, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](188);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](189, "div", 38)(190, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](191, "Leaderboards");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](192, "div", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](193, "div", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](194, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](195);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](196, "div", 38)(197, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](198, "Jokers");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](199, "div", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](200, "div", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](201, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](202);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](203, "div", 38)(204, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](205, "Group Chat");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](206, "div", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](207, "div", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](208, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](209);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](210, "ion-col", 12)(211, "div", 41)(212, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](213, "Top Performing Groups");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](214, "ion-list");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](215, DashboardPage_ion_item_215_Template, 9, 3, "ion-item", 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](216, "ion-grid")(217, "ion-row")(218, "ion-col", 43)(219, "ion-card")(220, "ion-card-header")(221, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](222, "Quick Actions");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](223, "ion-card-content")(224, "ion-button", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DashboardPage_Template_ion_button_click_224_listener() {
        return ctx.manageSpecialEvent();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](225, "ion-icon", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](226, " Manage Special Events ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](227, "ion-button", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DashboardPage_Template_ion_button_click_227_listener() {
        return ctx.manageJokers();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](228, "ion-icon", 46);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](229, " Manage Joker Rules ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](230, "ion-button", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DashboardPage_Template_ion_button_click_230_listener() {
        return ctx.managePayments();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](231, "ion-icon", 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](232, " Payment Overview ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](233, "ion-col", 43)(234, "ion-card")(235, "ion-card-header")(236, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](237, "Recent Activity");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](238, "ion-card-content")(239, "ion-list");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](240, DashboardPage_ion_item_240_Template, 8, 7, "ion-item", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.overview.totalGroups);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.overview.activeGroups, " Active");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.overview.totalUsers);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.overview.activeUsers, " Active");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Gameweek ", ctx.overview.currentGameweek, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", ctx.overview.submittedPredictions, "/", ctx.overview.totalPredictions, " Predictions ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](53, 46, ctx.overview.nextDeadline, "short"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.getTimeUntilDeadline());
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" First Joker: ", ctx.overview.jokerStats.firstJokerUsed, "/", ctx.overview.jokerStats.totalEligible, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" Second Joker: ", ctx.overview.jokerStats.secondJokerUsed, "/", ctx.overview.jokerStats.totalEligible, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.getNextEventDisplay());
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.overview.specialEvents.nextEvent);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", ctx.overview.paymentStats.totalPaid, "/", ctx.overview.paymentStats.totalGroups, " Groups Paid ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.overview.paymentStats.totalPending > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.growth.newUsersThisWeek, " new users this week");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.growth.newGroupsThisWeek, " new groups this week");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" +", ctx.businessIntelligence.growth.growthRateWeekly, "% weekly ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("$", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](123, 49, ctx.businessIntelligence.revenue.monthlyRecurringRevenue, "1.0-0"), " MRR");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("$", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](126, 52, ctx.businessIntelligence.revenue.averageRevenuePerUser, "1.2-2"), " ARPU");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.businessIntelligence.revenue.conversionRate, "% conversion ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.engagement.dailyActiveUsers, " daily active users");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](140, 55, ctx.businessIntelligence.engagement.averageSessionDuration, "1.1-1"), "min avg session");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.businessIntelligence.engagement.retentionRate, "% retention ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.adoption.featuresUsed.predictions, "% use predictions");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.adoption.featuresUsed.jokers, "% use jokers");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.businessIntelligence.adoption.platformUsage.mobile, "% mobile ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.adoption.platformUsage.mobile, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.adoption.platformUsage.web, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx.businessIntelligence.adoption.featuresUsed.predictions, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.adoption.featuresUsed.predictions, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx.businessIntelligence.adoption.featuresUsed.leaderboards, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.adoption.featuresUsed.leaderboards, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx.businessIntelligence.adoption.featuresUsed.jokers, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.adoption.featuresUsed.jokers, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx.businessIntelligence.adoption.featuresUsed.groupChat, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.businessIntelligence.adoption.featuresUsed.groupChat, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.businessIntelligence.adoption.topGroups);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.recentActivities);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonGrid, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonRow, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonCol, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DecimalPipe],
  styles: [".stat-card[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.stat-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.stat-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  padding: 0.5rem;\n  border-radius: 50%;\n  background: var(--ion-color-light);\n}\n\n.stat-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.stat-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: bold;\n}\n\n.stat-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0;\n  color: var(--ion-color-medium);\n}\n\n.bi-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 1rem;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  height: 100%;\n  background: var(--ion-color-light);\n  border-left: 4px solid var(--ion-color-secondary);\n}\n.bi-card.growth[_ngcontent-%COMP%] {\n  border-left-color: var(--ion-color-success);\n}\n.bi-card.revenue[_ngcontent-%COMP%] {\n  border-left-color: var(--ion-color-warning);\n}\n.bi-card.engagement[_ngcontent-%COMP%] {\n  border-left-color: var(--ion-color-tertiary);\n}\n.bi-card.adoption[_ngcontent-%COMP%] {\n  border-left-color: var(--ion-color-secondary);\n}\n\n.bi-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  padding: 0.75rem;\n  border-radius: 50%;\n  background: var(--ion-color-step-50);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 3.5rem;\n  height: 3.5rem;\n}\n\n.bi-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.bi-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.bi-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0;\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n}\n\n.analytics-details[_ngcontent-%COMP%] {\n  background: var(--ion-color-step-50);\n  padding: 1rem;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n}\n.analytics-details[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\n.usage-stat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.5rem;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n  text-align: center;\n}\n.usage-stat[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.usage-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: var(--ion-color-dark);\n}\n.usage-stat[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n}\n\n.feature-stats[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n\n.feature-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 0.75rem;\n  font-size: 0.9rem;\n}\n.feature-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  width: 100px;\n  font-weight: 500;\n}\n.feature-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  width: 50px;\n  text-align: right;\n  font-weight: 600;\n}\n\n.bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 8px;\n  background: var(--ion-color-step-200);\n  border-radius: 4px;\n  overflow: hidden;\n}\n.bar[_ngcontent-%COMP%]   .fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: linear-gradient(90deg, var(--ion-color-primary), var(--ion-color-primary-shade));\n  border-radius: 4px;\n  transition: width 0.3s ease;\n}\n\n.top-groups[_ngcontent-%COMP%] {\n  background: var(--ion-color-step-50);\n  padding: 1rem;\n  border-radius: 8px;\n}\n.top-groups[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.top-groups[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n  --border-radius: 8px;\n  margin-bottom: 0.5rem;\n}\n\n@media (max-width: 768px) {\n  .bi-card[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .bi-icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    min-width: 2.5rem;\n    height: 2.5rem;\n  }\n  .bi-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .feature-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n  .feature-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child, \n   .feature-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n    width: auto;\n  }\n  .usage-stat[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxPQUFBO0FBQ0Y7O0FBRUE7RUFDRSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSw4QkFBQTtBQUNGOztBQUtBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGtDQUFBO0VBQ0EsaURBQUE7QUFGRjtBQUlFO0VBQ0UsMkNBQUE7QUFGSjtBQUtFO0VBQ0UsMkNBQUE7QUFISjtBQU1FO0VBQ0UsNENBQUE7QUFKSjtBQU9FO0VBQ0UsNkNBQUE7QUFMSjs7QUFTQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQU5GOztBQVNBO0VBQ0UsT0FBQTtBQU5GO0FBUUU7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQU5KO0FBU0U7RUFDRSxpQkFBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7QUFQSjs7QUFZQTtFQUNFLG9DQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFURjtBQVdFO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQVRKOztBQWFBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQ0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFWRjtBQVlFO0VBQ0UsaUJBQUE7QUFWSjtBQWFFO0VBQ0UsaUJBQUE7RUFDQSw0QkFBQTtBQVhKO0FBY0U7RUFDRSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSw4QkFBQTtBQVpKOztBQWlCQTtFQUNFLGdCQUFBO0FBZEY7O0FBaUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7QUFkRjtBQWdCRTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQWRKO0FBaUJFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFmSjs7QUFtQkE7RUFDRSxPQUFBO0VBQ0EsV0FBQTtFQUNBLHFDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQWhCRjtBQWtCRTtFQUNFLFlBQUE7RUFDQSw0RkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7QUFoQko7O0FBcUJBO0VBQ0Usb0NBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUFsQkY7QUFvQkU7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBbEJKO0FBcUJFO0VBQ0Usb0NBQUE7RUFDQSxvQkFBQTtFQUNBLHFCQUFBO0FBbkJKOztBQXdCQTtFQUNFO0lBQ0UsZ0JBQUE7RUFyQkY7RUF3QkE7SUFDRSxpQkFBQTtJQUNBLGlCQUFBO0lBQ0EsY0FBQTtFQXRCRjtFQXlCQTtJQUNFLGVBQUE7RUF2QkY7RUEwQkE7SUFDRSxzQkFBQTtJQUNBLHVCQUFBO0lBQ0EsV0FBQTtFQXhCRjtFQTBCRTs7SUFFRSxXQUFBO0VBeEJKO0VBNEJBO0lBQ0Usc0JBQUE7SUFDQSxrQkFBQTtFQTFCRjtBQUNGIiwiZmlsZSI6ImRhc2hib2FyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3RhdC1jYXJkIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi5zdGF0LWNhcmQgaW9uLWNhcmQtY29udGVudCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMXJlbTtcclxufVxyXG5cclxuLnN0YXQtaWNvbiB7XHJcbiAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgcGFkZGluZzogMC41cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG59XHJcblxyXG4uc3RhdC1pbmZvIHtcclxuICBmbGV4OiAxO1xyXG59XHJcblxyXG4uc3RhdC1pbmZvIGgzIHtcclxuICBtYXJnaW46IDA7XHJcbiAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5zdGF0LWluZm8gcCB7XHJcbiAgbWFyZ2luOiAwLjI1cmVtIDA7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8vIEJ1c2luZXNzIEludGVsbGlnZW5jZSBTdHlsZXNcclxuLmJpLWNhcmQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcclxuXHJcbiAgJi5ncm93dGgge1xyXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICB9XHJcblxyXG4gICYucmV2ZW51ZSB7XHJcbiAgICBib3JkZXItbGVmdC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xyXG4gIH1cclxuXHJcbiAgJi5lbmdhZ2VtZW50IHtcclxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpO1xyXG4gIH1cclxuXHJcbiAgJi5hZG9wdGlvbiB7XHJcbiAgICBib3JkZXItbGVmdC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XHJcbiAgfVxyXG59XHJcblxyXG4uYmktaWNvbiB7XHJcbiAgZm9udC1zaXplOiAycmVtO1xyXG4gIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTUwKTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgbWluLXdpZHRoOiAzLjVyZW07XHJcbiAgaGVpZ2h0OiAzLjVyZW07XHJcbn1cclxuXHJcbi5iaS1pbmZvIHtcclxuICBmbGV4OiAxO1xyXG5cclxuICBoMyB7XHJcbiAgICBtYXJnaW46IDAgMCAwLjVyZW0gMDtcclxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgfVxyXG5cclxuICBwIHtcclxuICAgIG1hcmdpbjogMC4yNXJlbSAwO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgfVxyXG59XHJcblxyXG4vLyBBbmFseXRpY3MgRGV0YWlscyBTZWN0aW9uXHJcbi5hbmFseXRpY3MtZGV0YWlscyB7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcblxyXG4gIGg0IHtcclxuICAgIG1hcmdpbjogMCAwIDFyZW0gMDtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gIH1cclxufVxyXG5cclxuLnVzYWdlLXN0YXQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDAuNzVyZW07XHJcbiAgcGFkZGluZzogMC41cmVtO1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgaW9uLWljb24ge1xyXG4gICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgfVxyXG5cclxuICBzdHJvbmcge1xyXG4gICAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gIH1cclxuXHJcbiAgcCB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIEZlYXR1cmUgVXNhZ2UgQmFyc1xyXG4uZmVhdHVyZS1zdGF0cyB7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxufVxyXG5cclxuLmZlYXR1cmUtYmFyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDAuNzVyZW07XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcblxyXG4gIHNwYW46Zmlyc3QtY2hpbGQge1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICB9XHJcblxyXG4gIHNwYW46bGFzdC1jaGlsZCB7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcbn1cclxuXHJcbi5iYXIge1xyXG4gIGZsZXg6IDE7XHJcbiAgaGVpZ2h0OiA4cHg7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjAwKTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgLmZpbGwge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSksIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlKSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICB0cmFuc2l0aW9uOiB3aWR0aCAwLjNzIGVhc2U7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBUb3AgR3JvdXBzIFNlY3Rpb25cclxuLnRvcC1ncm91cHMge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTUwKTtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuXHJcbiAgaDQge1xyXG4gICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xyXG4gICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgfVxyXG5cclxuICBpb24taXRlbSB7XHJcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgICAtLWJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFJlc3BvbnNpdmUgYWRqdXN0bWVudHMgZm9yIEJJIGNhcmRzXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5iaS1jYXJkIHtcclxuICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5iaS1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgbWluLXdpZHRoOiAyLjVyZW07XHJcbiAgICBoZWlnaHQ6IDIuNXJlbTtcclxuICB9XHJcbiAgXHJcbiAgLmJpLWluZm8gaDMge1xyXG4gICAgZm9udC1zaXplOiAxcmVtO1xyXG4gIH1cclxuXHJcbiAgLmZlYXR1cmUtYmFyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIGdhcDogMC41cmVtO1xyXG5cclxuICAgIHNwYW46Zmlyc3QtY2hpbGQsXHJcbiAgICBzcGFuOmxhc3QtY2hpbGQge1xyXG4gICAgICB3aWR0aDogYXV0bztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC51c2FnZS1zdGF0IHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG59XHJcbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3N1cGVyLWFkbWluL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQ0FBQTtBQUNGOztBQUVBO0VBQ0UsT0FBQTtBQUNGOztBQUVBO0VBQ0UsU0FBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0EsOEJBQUE7QUFDRjs7QUFLQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxrQ0FBQTtFQUNBLGlEQUFBO0FBRkY7QUFJRTtFQUNFLDJDQUFBO0FBRko7QUFLRTtFQUNFLDJDQUFBO0FBSEo7QUFNRTtFQUNFLDRDQUFBO0FBSko7QUFPRTtFQUNFLDZDQUFBO0FBTEo7O0FBU0E7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG9DQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFORjs7QUFTQTtFQUNFLE9BQUE7QUFORjtBQVFFO0VBQ0Usb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFOSjtBQVNFO0VBQ0UsaUJBQUE7RUFDQSw4QkFBQTtFQUNBLGlCQUFBO0FBUEo7O0FBWUE7RUFDRSxvQ0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBVEY7QUFXRTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFUSjs7QUFhQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0NBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FBVkY7QUFZRTtFQUNFLGlCQUFBO0FBVko7QUFhRTtFQUNFLGlCQUFBO0VBQ0EsNEJBQUE7QUFYSjtBQWNFO0VBQ0UsU0FBQTtFQUNBLGlCQUFBO0VBQ0EsOEJBQUE7QUFaSjs7QUFpQkE7RUFDRSxnQkFBQTtBQWRGOztBQWlCQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0FBZEY7QUFnQkU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUFkSjtBQWlCRTtFQUNFLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBZko7O0FBbUJBO0VBQ0UsT0FBQTtFQUNBLFdBQUE7RUFDQSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFoQkY7QUFrQkU7RUFDRSxZQUFBO0VBQ0EsNEZBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0FBaEJKOztBQXFCQTtFQUNFLG9DQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBbEJGO0FBb0JFO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQWxCSjtBQXFCRTtFQUNFLG9DQUFBO0VBQ0Esb0JBQUE7RUFDQSxxQkFBQTtBQW5CSjs7QUF3QkE7RUFDRTtJQUNFLGdCQUFBO0VBckJGO0VBd0JBO0lBQ0UsaUJBQUE7SUFDQSxpQkFBQTtJQUNBLGNBQUE7RUF0QkY7RUF5QkE7SUFDRSxlQUFBO0VBdkJGO0VBMEJBO0lBQ0Usc0JBQUE7SUFDQSx1QkFBQTtJQUNBLFdBQUE7RUF4QkY7RUEwQkU7O0lBRUUsV0FBQTtFQXhCSjtFQTRCQTtJQUNFLHNCQUFBO0lBQ0Esa0JBQUE7RUExQkY7QUFDRjtBQUNBLG9yUEFBb3JQIiwic291cmNlc0NvbnRlbnQiOlsiLnN0YXQtY2FyZCB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uc3RhdC1jYXJkIGlvbi1jYXJkLWNvbnRlbnQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDFyZW07XHJcbn1cclxuXHJcbi5zdGF0LWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xyXG4gIHBhZGRpbmc6IDAuNXJlbTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxufVxyXG5cclxuLnN0YXQtaW5mbyB7XHJcbiAgZmxleDogMTtcclxufVxyXG5cclxuLnN0YXQtaW5mbyBoMyB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uc3RhdC1pbmZvIHAge1xyXG4gIG1hcmdpbjogMC4yNXJlbSAwO1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxufVxyXG5cclxuXHJcblxyXG4vLyBCdXNpbmVzcyBJbnRlbGxpZ2VuY2UgU3R5bGVzXHJcbi5iaS1jYXJkIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gIGdhcDogMXJlbTtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XHJcblxyXG4gICYuZ3Jvd3RoIHtcclxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgfVxyXG5cclxuICAmLnJldmVudWUge1xyXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcclxuICB9XHJcblxyXG4gICYuZW5nYWdlbWVudCB7XHJcbiAgICBib3JkZXItbGVmdC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcclxuICB9XHJcblxyXG4gICYuYWRvcHRpb24ge1xyXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xyXG4gIH1cclxufVxyXG5cclxuLmJpLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMnJlbTtcclxuICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC01MCk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG1pbi13aWR0aDogMy41cmVtO1xyXG4gIGhlaWdodDogMy41cmVtO1xyXG59XHJcblxyXG4uYmktaW5mbyB7XHJcbiAgZmxleDogMTtcclxuXHJcbiAgaDMge1xyXG4gICAgbWFyZ2luOiAwIDAgMC41cmVtIDA7XHJcbiAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gIH1cclxuXHJcbiAgcCB7XHJcbiAgICBtYXJnaW46IDAuMjVyZW0gMDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQW5hbHl0aWNzIERldGFpbHMgU2VjdGlvblxyXG4uYW5hbHl0aWNzLWRldGFpbHMge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTUwKTtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG5cclxuICBoNCB7XHJcbiAgICBtYXJnaW46IDAgMCAxcmVtIDA7XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICB9XHJcbn1cclxuXHJcbi51c2FnZS1zdGF0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAwLjc1cmVtO1xyXG4gIHBhZGRpbmc6IDAuNXJlbTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gIGlvbi1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIH1cclxuXHJcbiAgc3Ryb25nIHtcclxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICB9XHJcblxyXG4gIHAge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBGZWF0dXJlIFVzYWdlIEJhcnNcclxuLmZlYXR1cmUtc3RhdHMge1xyXG4gIG1hcmdpbi10b3A6IDFyZW07XHJcbn1cclxuXHJcbi5mZWF0dXJlLWJhciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMXJlbTtcclxuICBtYXJnaW4tYm90dG9tOiAwLjc1cmVtO1xyXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xyXG5cclxuICBzcGFuOmZpcnN0LWNoaWxkIHtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgfVxyXG5cclxuICBzcGFuOmxhc3QtY2hpbGQge1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgfVxyXG59XHJcblxyXG4uYmFyIHtcclxuICBmbGV4OiAxO1xyXG4gIGhlaWdodDogOHB4O1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTIwMCk7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcblxyXG4gIC5maWxsIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZSkpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC4zcyBlYXNlO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVG9wIEdyb3VwcyBTZWN0aW9uXHJcbi50b3AtZ3JvdXBzIHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC01MCk7XHJcbiAgcGFkZGluZzogMXJlbTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcblxyXG4gIGg0IHtcclxuICAgIG1hcmdpbjogMCAwIDFyZW0gMDtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gIH1cclxuXHJcbiAgaW9uLWl0ZW0ge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gICAgLS1ib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZXNwb25zaXZlIGFkanVzdG1lbnRzIGZvciBCSSBjYXJkc1xyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuYmktY2FyZCB7XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gIH1cclxuICBcclxuICAuYmktaWNvbiB7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIG1pbi13aWR0aDogMi41cmVtO1xyXG4gICAgaGVpZ2h0OiAyLjVyZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5iaS1pbmZvIGgzIHtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICB9XHJcblxyXG4gIC5mZWF0dXJlLWJhciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxuXHJcbiAgICBzcGFuOmZpcnN0LWNoaWxkLFxyXG4gICAgc3BhbjpsYXN0LWNoaWxkIHtcclxuICAgICAgd2lkdGg6IGF1dG87XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAudXNhZ2Utc3RhdCB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_super-admin_pages_dashboard_dashboard_page_ts.js.map