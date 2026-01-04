"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_player_pages_dashboard_dashboard_page_ts"],{

/***/ 6378:
/*!********************************************************************!*\
  !*** ./src/app/platforms/player/pages/dashboard/dashboard.page.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardPage: () => (/* binding */ DashboardPage)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _shared_components_user_greeting_user_greeting_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/components/user-greeting/user-greeting.component */ 5341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
var _DashboardPage;








function DashboardPage_ion_card_subtitle_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-card-subtitle", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Deadline: ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](3, 1, ctx_r0.currentGameweek.deadline, "medium"), " ");
  }
}
function DashboardPage_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 45)(1, "p", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Make your predictions for this gameweek");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "ion-button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "ion-icon", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " Select Matches & Predict ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function DashboardPage_div_22_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 55)(1, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const match_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", match_r2.homeTeam, " vs ", match_r2.awayTeam, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](match_r2.prediction);
  }
}
function DashboardPage_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 49)(1, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "ion-icon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " Predictions Submitted ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 52)(5, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Your Predictions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, DashboardPage_div_22_div_8_Template, 5, 3, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r0.currentGameweek.selectedMatches);
  }
}
function DashboardPage_div_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 58)(1, "div", 59)(2, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 60)(7, "ion-badge", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const pred_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pred_r3.match);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Predicted: ", pred_r3.prediction, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", pred_r3.points > 0 ? "success" : "medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", pred_r3.points > 0 ? "+" + pred_r3.points : "0", " pts ");
  }
}
function DashboardPage_div_64_ion_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-icon", 64);
  }
  if (rf & 2) {
    const player_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", ctx_r0.getPositionIcon(player_r4.positionChange))("color", ctx_r0.getPositionColor(player_r4.positionChange));
  }
}
function DashboardPage_div_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 62)(1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, DashboardPage_div_64_ion_icon_3_Template, 1, 2, "ion-icon", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const player_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("current-user", player_r4.isCurrentUser);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", player_r4.position, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", player_r4.positionChange !== "same");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](player_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](player_r4.points);
  }
}
class DashboardPage {
  constructor(router) {
    this.router = router;
    // Current Gameweek
    this.currentGameweek = {
      number: 15,
      deadline: '2024-01-20T11:30:00',
      predictionsSubmitted: true,
      selectedMatches: [{
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        prediction: '2-1'
      }, {
        homeTeam: 'Liverpool',
        awayTeam: 'Man City',
        prediction: '1-1'
      }, {
        homeTeam: 'Man United',
        awayTeam: 'Tottenham',
        prediction: '0-2'
      }]
    };
    // Last Gameweek Results
    this.lastGameweek = {
      totalPoints: 19,
      correctScores: 1,
      correctResults: 2,
      predictions: [{
        match: 'Arsenal vs Chelsea',
        prediction: '2-1',
        points: 9,
        correctScore: true,
        correctResult: true
      }, {
        match: 'Liverpool vs Man City',
        prediction: '1-1',
        points: 6,
        correctScore: false,
        correctResult: true
      }, {
        match: 'Man United vs Tottenham',
        prediction: '0-2',
        points: 4,
        correctScore: false,
        correctResult: true
      }]
    };
    // Player Stats
    this.playerStats = {
      totalPoints: 245,
      rank: 12,
      jokersUsed: 1,
      correctResults: 35
    };
    // Top Players for Mini Leaderboard
    this.topPlayers = [{
      position: 1,
      previousPosition: 1,
      name: 'John Smith',
      points: 245,
      isCurrentUser: false,
      positionChange: 'same'
    }, {
      position: 2,
      previousPosition: 4,
      name: 'Sarah Wilson',
      points: 238,
      isCurrentUser: false,
      positionChange: 'up'
    }, {
      position: 3,
      previousPosition: 2,
      name: 'Mike Johnson',
      points: 232,
      isCurrentUser: false,
      positionChange: 'down'
    }, {
      position: 4,
      previousPosition: 3,
      name: 'Your Name',
      points: 230,
      isCurrentUser: true,
      positionChange: 'down'
    }, {
      position: 5,
      previousPosition: 5,
      name: 'David Brown',
      points: 225,
      isCurrentUser: false,
      positionChange: 'same'
    }];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_3__.a)({
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.trophyOutline,
      statsChartOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.statsChartOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.timeOutline,
      starOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.starOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.checkmarkCircleOutline,
      arrowUpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.arrowUpOutline,
      arrowDownOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.arrowDownOutline,
      removeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.removeOutline,
      personOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personOutline
    });
  }
  getPositionIcon(change) {
    switch (change) {
      case 'up':
        return 'arrow-up-outline';
      case 'down':
        return 'arrow-down-outline';
      default:
        return 'remove-outline';
    }
  }
  getPositionColor(change) {
    switch (change) {
      case 'up':
        return 'success';
      case 'down':
        return 'danger';
      default:
        return 'medium';
    }
  }
  navigateTo(path) {
    this.router.navigate([path]);
  }
}
_DashboardPage = DashboardPage;
_DashboardPage.ɵfac = function DashboardPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardPage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
_DashboardPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _DashboardPage,
  selectors: [["app-player-dashboard"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
  decls: 88,
  vars: 12,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], ["slot", "end"], [3, "click"], ["name", "person-outline", 1, "profile-icon"], [1, "ion-padding"], [1, "gameweek-card"], [1, "section-title"], ["name", "football-outline"], ["class", "deadline-warning", 4, "ngIf"], ["class", "prediction-cta", 4, "ngIf"], ["class", "predictions-preview", 4, "ngIf"], [1, "results-card"], ["name", "stats-chart-outline"], [1, "results-summary"], [1, "total-points"], [1, "points"], [1, "label"], [1, "points-breakdown"], [1, "breakdown-item"], [1, "value"], [1, "predictions-list"], ["class", "prediction-result", 4, "ngFor", "ngForOf"], ["expand", "block", "fill", "clear", "routerLink", "/player/predictions"], [1, "leaderboard-card"], ["name", "trophy-outline"], [1, "leaderboard-table"], [1, "table-header"], [1, "rank"], [1, "name"], ["class", "table-row", 3, "current-user", 4, "ngFor", "ngForOf"], ["expand", "block", "fill", "clear", "routerLink", "/player/standings"], [1, "stats-card"], [1, "stats-grid"], [1, "stat-item"], ["name", "trophy-outline", "color", "warning"], [1, "stat-value"], [1, "stat-label"], ["name", "stats-chart-outline", "color", "success"], ["name", "star-outline", "color", "primary"], [1, "deadline-warning"], ["name", "time-outline"], [1, "prediction-cta"], [1, "cta-text"], ["expand", "block", "color", "primary", "routerLink", "/player/matches"], ["name", "football-outline", "slot", "start"], [1, "predictions-preview"], [1, "status-banner", "success"], ["name", "checkmark-circle-outline"], [1, "selected-matches"], [1, "match-predictions"], ["class", "match-prediction", 4, "ngFor", "ngForOf"], [1, "match-prediction"], [1, "teams"], [1, "prediction"], [1, "prediction-result"], [1, "match-info"], [1, "points-earned"], [3, "color"], [1, "table-row"], ["class", "position-change", 3, "name", "color", 4, "ngIf"], [1, "position-change", 3, "name", "color"]],
  template: function DashboardPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DashboardPage_Template_div_click_2_listener() {
        return ctx.navigateTo("/player/dashboard");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 2)(5, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "SOTD");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "ion-buttons", 5)(10, "ion-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DashboardPage_Template_ion_button_click_10_listener() {
        return ctx.navigateTo("/player/settings");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "ion-content", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "app-user-greeting");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "ion-card", 9)(15, "ion-card-header")(16, "ion-card-title", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "ion-icon", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, DashboardPage_ion_card_subtitle_19_Template, 4, 4, "ion-card-subtitle", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "ion-card-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, DashboardPage_div_21_Template, 6, 0, "div", 13)(22, DashboardPage_div_22_Template, 9, 1, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "ion-card", 15)(24, "ion-card-header")(25, "ion-card-title", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](26, "ion-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, " Last Gameweek Results ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "ion-card-content")(29, "div", 17)(30, "div", 18)(31, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "Points Earned");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 21)(36, "div", 22)(37, "span", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "Perfect Scores");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 22)(42, "span", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, "Correct Results");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](47, DashboardPage_div_47_Template, 9, 4, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "ion-button", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](49, " View All Previous Predictions ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "ion-card", 27)(51, "ion-card-header")(52, "ion-card-title", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](53, "ion-icon", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](54, " Group Standings ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](55, "ion-card-content")(56, "div", 29)(57, "div", 30)(58, "div", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](59, "Pos");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](60, "div", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](61, "Player");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](62, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](63, "Points");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](64, DashboardPage_div_64_Template, 8, 6, "div", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](65, "ion-button", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](66, " View Full Standings ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](67, "ion-card", 35)(68, "ion-card-content")(69, "div", 36)(70, "div", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](71, "ion-icon", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](72, "div", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](73);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](74, "div", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](75, "Total Points");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](76, "div", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](77, "ion-icon", 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](78, "div", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](79);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](80, "div", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](81, "Current Rank");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](82, "div", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](83, "ion-icon", 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](84, "div", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](85);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](86, "div", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](87, "Jokers Played");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Gameweek ", ctx.currentGameweek.number, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.currentGameweek.predictionsSubmitted);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.currentGameweek.predictionsSubmitted);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.currentGameweek.predictionsSubmitted);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("+", ctx.lastGameweek.totalPoints, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.lastGameweek.correctScores);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.lastGameweek.correctResults);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.lastGameweek.predictions);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.topPlayers);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.playerStats.totalPoints);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("#", ctx.playerStats.rank, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.playerStats.jokersUsed, "/2");
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardSubtitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButtons, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _shared_components_user_greeting_user_greeting_component__WEBPACK_IMPORTED_MODULE_1__.UserGreetingComponent],
  styles: [".deadline-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 16px;\n  color: var(--ion-color-medium);\n}\n.deadline-info[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  text-align: center;\n  margin: 16px 0;\n}\n\n.stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.stat-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.stat-item[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  color: var(--ion-color-dark);\n}\n.stat-item[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-medium);\n}\n\nion-card[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  border-radius: 16px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  background: #ffffff;\n}\nion-card.gameweek-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-primary);\n}\nion-card.results-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-success);\n}\nion-card.leaderboard-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-warning);\n}\nion-card.stats-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-tertiary);\n}\n\nion-card-header[_ngcontent-%COMP%] {\n  padding: 16px;\n}\nion-card-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\nion-card-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n}\n\n.deadline-warning[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--ion-color-danger);\n  margin-top: 8px;\n  font-size: 0.9rem;\n}\n.deadline-warning[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n\n.prediction-cta[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 16px 0;\n}\n.prediction-cta[_ngcontent-%COMP%]   .cta-text[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  color: var(--ion-color-medium);\n}\n.prediction-cta[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  max-width: 300px;\n  margin: 0 auto;\n  height: 48px;\n  --border-radius: 24px;\n}\n\n.predictions-preview[_ngcontent-%COMP%]   .status-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  font-weight: 500;\n}\n.predictions-preview[_ngcontent-%COMP%]   .status-banner.success[_ngcontent-%COMP%] {\n  background: var(--ion-color-success-tint);\n  color: var(--ion-color-success-shade);\n}\n.predictions-preview[_ngcontent-%COMP%]   .status-banner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.predictions-preview[_ngcontent-%COMP%]   .selected-matches[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  color: var(--ion-color-dark);\n  font-size: 1rem;\n}\n.predictions-preview[_ngcontent-%COMP%]   .selected-matches[_ngcontent-%COMP%]   .match-predictions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.predictions-preview[_ngcontent-%COMP%]   .selected-matches[_ngcontent-%COMP%]   .match-predictions[_ngcontent-%COMP%]   .match-prediction[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 12px;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n}\n.predictions-preview[_ngcontent-%COMP%]   .selected-matches[_ngcontent-%COMP%]   .match-predictions[_ngcontent-%COMP%]   .match-prediction[_ngcontent-%COMP%]   .teams[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.predictions-preview[_ngcontent-%COMP%]   .selected-matches[_ngcontent-%COMP%]   .match-predictions[_ngcontent-%COMP%]   .match-prediction[_ngcontent-%COMP%]   .prediction[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-primary);\n}\n\n.results-summary[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding: 16px;\n  background: var(--ion-color-light);\n  border-radius: 12px;\n}\n.results-summary[_ngcontent-%COMP%]   .total-points[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.results-summary[_ngcontent-%COMP%]   .total-points[_ngcontent-%COMP%]   .points[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 2rem;\n  font-weight: 700;\n  color: var(--ion-color-success);\n}\n.results-summary[_ngcontent-%COMP%]   .total-points[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n}\n.results-summary[_ngcontent-%COMP%]   .points-breakdown[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n}\n.results-summary[_ngcontent-%COMP%]   .points-breakdown[_ngcontent-%COMP%]   .breakdown-item[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.results-summary[_ngcontent-%COMP%]   .points-breakdown[_ngcontent-%COMP%]   .breakdown-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.results-summary[_ngcontent-%COMP%]   .points-breakdown[_ngcontent-%COMP%]   .breakdown-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n}\n\n.predictions-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.predictions-list[_ngcontent-%COMP%]   .prediction-result[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n}\n.predictions-list[_ngcontent-%COMP%]   .prediction-result[_ngcontent-%COMP%]   .match-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.predictions-list[_ngcontent-%COMP%]   .prediction-result[_ngcontent-%COMP%]   .match-info[_ngcontent-%COMP%]   .teams[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--ion-color-dark);\n}\n.predictions-list[_ngcontent-%COMP%]   .prediction-result[_ngcontent-%COMP%]   .match-info[_ngcontent-%COMP%]   .prediction[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n}\n.predictions-list[_ngcontent-%COMP%]   .prediction-result[_ngcontent-%COMP%]   .points-earned[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  --padding-top: 4px;\n  --padding-bottom: 4px;\n}\n\n.leaderboard-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 80px 1fr 80px;\n  padding: 12px 16px;\n  background: var(--ion-color-light);\n  font-weight: 500;\n  color: var(--ion-color-medium);\n  border-radius: 8px;\n  margin-bottom: 8px;\n}\n.leaderboard-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 80px 1fr 80px;\n  padding: 12px 16px;\n  border-radius: 8px;\n  align-items: center;\n}\n.leaderboard-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:hover {\n  background: var(--ion-color-light-tint);\n}\n.leaderboard-table[_ngcontent-%COMP%]   .table-row.current-user[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary-tint);\n  font-weight: 500;\n}\n.leaderboard-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .rank[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-weight: 600;\n}\n.leaderboard-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .rank[_ngcontent-%COMP%]   .position-change[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.leaderboard-table[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]   .points[_ngcontent-%COMP%] {\n  text-align: right;\n  font-weight: 600;\n  color: var(--ion-color-primary);\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  padding: 8px;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 16px;\n  background: var(--ion-color-light);\n  border-radius: 12px;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin-bottom: 8px;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--ion-color-dark);\n  margin: 4px 0;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n}\n\n@media (max-width: 576px) {\n  .results-summary[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    text-align: center;\n  }\n  .results-summary[_ngcontent-%COMP%]   .points-breakdown[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .stats-grid[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]:last-child {\n    grid-column: span 2;\n  }\n}\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  cursor: pointer;\n}\n.logo-container[_ngcontent-%COMP%]   .football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1;\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-sotd[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n}\n\nion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  height: 44px;\n}\nion-buttons[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--ion-color-medium);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtBQURGO0FBR0U7RUFDRSxlQUFBO0FBREo7O0FBS0E7RUFDRSxhQUFBO0VBQ0EscUNBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBRkY7O0FBS0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFGRjtBQUlFO0VBQ0UsZUFBQTtBQUZKO0FBS0U7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSw0QkFBQTtBQUhKO0FBTUU7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUFKSjs7QUFTQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQ0FBQTtFQUNBLG1CQUFBO0FBTkY7QUFRRTtFQUNFLCtDQUFBO0FBTko7QUFTRTtFQUNFLCtDQUFBO0FBUEo7QUFVRTtFQUNFLCtDQUFBO0FBUko7QUFXRTtFQUNFLGdEQUFBO0FBVEo7O0FBY0E7RUFDRSxhQUFBO0FBWEY7QUFhRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBWEo7QUFhSTtFQUNFLGlCQUFBO0FBWE47O0FBaUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBZEY7QUFnQkU7RUFDRSxpQkFBQTtBQWRKOztBQW1CQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtBQWhCRjtBQWtCRTtFQUNFLG1CQUFBO0VBQ0EsOEJBQUE7QUFoQko7QUFtQkU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7QUFqQko7O0FBdUJFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBcEJKO0FBc0JJO0VBQ0UseUNBQUE7RUFDQSxxQ0FBQTtBQXBCTjtBQXVCSTtFQUNFLGlCQUFBO0FBckJOO0FBMEJJO0VBQ0Usa0JBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7QUF4Qk47QUEyQkk7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBekJOO0FBMkJNO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7QUF6QlI7QUEyQlE7RUFDRSxnQkFBQTtBQXpCVjtBQTRCUTtFQUNFLGdCQUFBO0VBQ0EsK0JBQUE7QUExQlY7O0FBa0NBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0FBL0JGO0FBaUNFO0VBQ0Usa0JBQUE7QUEvQko7QUFpQ0k7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7QUEvQk47QUFrQ0k7RUFDRSxpQkFBQTtFQUNBLDhCQUFBO0FBaENOO0FBb0NFO0VBQ0UsYUFBQTtFQUNBLFNBQUE7QUFsQ0o7QUFvQ0k7RUFDRSxrQkFBQTtBQWxDTjtBQW9DTTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFsQ1I7QUFxQ007RUFDRSxpQkFBQTtFQUNBLDhCQUFBO0FBbkNSOztBQTBDQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQXZDRjtBQXlDRTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7QUF2Q0o7QUF5Q0k7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBdkNOO0FBeUNNO0VBQ0UsZ0JBQUE7RUFDQSw0QkFBQTtBQXZDUjtBQTBDTTtFQUNFLGlCQUFBO0VBQ0EsOEJBQUE7QUF4Q1I7QUE0Q0k7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtBQTFDTjs7QUFpREU7RUFDRSxhQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtFQUNBLGtDQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4QkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUE5Q0o7QUFpREU7RUFDRSxhQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUEvQ0o7QUFpREk7RUFDRSx1Q0FBQTtBQS9DTjtBQWtESTtFQUNFLHlDQUFBO0VBQ0EsZ0JBQUE7QUFoRE47QUFtREk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7QUFqRE47QUFtRE07RUFDRSxlQUFBO0FBakRSO0FBcURJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0FBbkROOztBQXlEQTtFQUNFLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0FBdERGO0FBd0RFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0FBdERKO0FBd0RJO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0FBdEROO0FBeURJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0EsYUFBQTtBQXZETjtBQTBESTtFQUNFLGlCQUFBO0VBQ0EsOEJBQUE7QUF4RE47O0FBOERBO0VBQ0U7SUFDRSxzQkFBQTtJQUNBLFNBQUE7SUFDQSxrQkFBQTtFQTNERjtFQTZERTtJQUNFLFdBQUE7SUFDQSx1QkFBQTtFQTNESjtFQStEQTtJQUNFLHFDQUFBO0VBN0RGO0VBK0RFO0lBQ0UsbUJBQUE7RUE3REo7QUFDRjtBQWtFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFoRUY7QUFrRUU7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUFoRUo7QUFtRUU7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FBakVKO0FBbUVJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFqRU47QUFvRUk7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUFsRU47O0FBd0VFO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUFyRUo7QUF3RUU7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUF0RUoiLCJmaWxlIjoiZGFzaGJvYXJkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERhc2hib2FyZCBTdHlsZXNcblxuLmRlYWRsaW5lLWluZm8ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cbn1cblxuLnN0YXRzLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xuICBnYXA6IDE2cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiAxNnB4IDA7XG59XG5cbi5zdGF0LWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICB9XG5cbiAgLnN0YXQtdmFsdWUge1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB9XG5cbiAgLnN0YXQtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIH1cbn1cblxuLy8gQ2FyZCBTdHlsZXNcbmlvbi1jYXJkIHtcbiAgbWFyZ2luOiAwIDAgMTZweCAwO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG5cbiAgJi5nYW1ld2Vlay1jYXJkIHtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gICYucmVzdWx0cy1jYXJkIHtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgfVxuXG4gICYubGVhZGVyYm9hcmQtY2FyZCB7XG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XG4gIH1cblxuICAmLnN0YXRzLWNhcmQge1xuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcbiAgfVxufVxuXG4vLyBDYXJkIEhlYWRlcnNcbmlvbi1jYXJkLWhlYWRlciB7XG4gIHBhZGRpbmc6IDE2cHg7XG5cbiAgLnNlY3Rpb24tdGl0bGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxLjRyZW07XG4gICAgfVxuICB9XG59XG5cbi8vIERlYWRsaW5lIFdhcm5pbmdcbi5kZWFkbGluZS13YXJuaW5nIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBmb250LXNpemU6IDAuOXJlbTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxLjFyZW07XG4gIH1cbn1cblxuLy8gUHJlZGljdGlvbiBDVEFcbi5wcmVkaWN0aW9uLWN0YSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMTZweCAwO1xuXG4gIC5jdGEtdGV4dCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIH1cblxuICBpb24tYnV0dG9uIHtcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIGhlaWdodDogNDhweDtcbiAgICAtLWJvcmRlci1yYWRpdXM6IDI0cHg7XG4gIH1cbn1cblxuLy8gUHJlZGljdGlvbnMgUHJldmlld1xuLnByZWRpY3Rpb25zLXByZXZpZXcge1xuICAuc3RhdHVzLWJhbm5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIHBhZGRpbmc6IDhweCAxNnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG5cbiAgICAmLnN1Y2Nlc3Mge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludCk7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGUpO1xuICAgIH1cblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIH1cbiAgfVxuXG4gIC5zZWxlY3RlZC1tYXRjaGVzIHtcbiAgICBoNCB7XG4gICAgICBtYXJnaW46IDAgMCAxMnB4IDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgIH1cblxuICAgIC5tYXRjaC1wcmVkaWN0aW9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMTJweDtcblxuICAgICAgLm1hdGNoLXByZWRpY3Rpb24ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG5cbiAgICAgICAgLnRlYW1zIHtcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLnByZWRpY3Rpb24ge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBSZXN1bHRzIFN1bW1hcnlcbi5yZXN1bHRzLXN1bW1hcnkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG5cbiAgLnRvdGFsLXBvaW50cyB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgLnBvaW50cyB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICAgIH1cblxuICAgIC5sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gIH1cblxuICAucG9pbnRzLWJyZWFrZG93biB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDI0cHg7XG5cbiAgICAuYnJlYWtkb3duLWl0ZW0ge1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgICAudmFsdWUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICB9XG5cbiAgICAgIC5sYWJlbCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIFByZWRpY3Rpb25zIExpc3Rcbi5wcmVkaWN0aW9ucy1saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuXG4gIC5wcmVkaWN0aW9uLXJlc3VsdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxMnB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gICAgLm1hdGNoLWluZm8ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBnYXA6IDRweDtcblxuICAgICAgLnRlYW1zIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIH1cblxuICAgICAgLnByZWRpY3Rpb24ge1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5wb2ludHMtZWFybmVkIGlvbi1iYWRnZSB7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgICAgIC0tcGFkZGluZy10b3A6IDRweDtcbiAgICAgIC0tcGFkZGluZy1ib3R0b206IDRweDtcbiAgICB9XG4gIH1cbn1cblxuLy8gTGVhZGVyYm9hcmQgVGFibGVcbi5sZWFkZXJib2FyZC10YWJsZSB7XG4gIC50YWJsZS1oZWFkZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA4MHB4IDFmciA4MHB4O1xuICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIH1cblxuICAudGFibGUtcm93IHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogODBweCAxZnIgODBweDtcbiAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodC10aW50KTtcbiAgICB9XG5cbiAgICAmLmN1cnJlbnQtdXNlciB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS10aW50KTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuXG4gICAgLnJhbmsge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDRweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG5cbiAgICAgIC5wb3NpdGlvbi1jaGFuZ2Uge1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLnBvaW50cyB7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBTdGF0cyBHcmlkXG4uc3RhdHMtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gIGdhcDogMTZweDtcbiAgcGFkZGluZzogOHB4O1xuXG4gIC5zdGF0LWl0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICB9XG5cbiAgICAuc3RhdC12YWx1ZSB7XG4gICAgICBmb250LXNpemU6IDEuNHJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgbWFyZ2luOiA0cHggMDtcbiAgICB9XG5cbiAgICAuc3RhdC1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2ZSBBZGp1c3RtZW50c1xuQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XG4gIC5yZXN1bHRzLXN1bW1hcnkge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAxNnB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAgIC5wb2ludHMtYnJlYWtkb3duIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuICB9XG5cbiAgLnN0YXRzLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG5cbiAgICAuc3RhdC1pdGVtOmxhc3QtY2hpbGQge1xuICAgICAgZ3JpZC1jb2x1bW46IHNwYW4gMjtcbiAgICB9XG4gIH1cbn1cblxuLy8gTG9nbyBTdHlsZXNcbi5sb2dvLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA4cHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gIC5mb290YmFsbC1pY29uIHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gIC5sb2dvLXRleHQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBsaW5lLWhlaWdodDogMTtcblxuICAgIC5sb2dvLXNvdGQge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgfVxuXG4gICAgLmxvZ28tc3VidGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgfVxufVxuXG5pb24tYnV0dG9ucyB7XG4gIGlvbi1idXR0b24ge1xuICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgICBoZWlnaHQ6IDQ0cHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgfVxufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3BsYXllci9wYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0FBREY7QUFHRTtFQUNFLGVBQUE7QUFESjs7QUFLQTtFQUNFLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUFGRjs7QUFLQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQUZGO0FBSUU7RUFDRSxlQUFBO0FBRko7QUFLRTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLDRCQUFBO0FBSEo7QUFNRTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtBQUpKOztBQVNBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLDBDQUFBO0VBQ0EsbUJBQUE7QUFORjtBQVFFO0VBQ0UsK0NBQUE7QUFOSjtBQVNFO0VBQ0UsK0NBQUE7QUFQSjtBQVVFO0VBQ0UsK0NBQUE7QUFSSjtBQVdFO0VBQ0UsZ0RBQUE7QUFUSjs7QUFjQTtFQUNFLGFBQUE7QUFYRjtBQWFFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFYSjtBQWFJO0VBQ0UsaUJBQUE7QUFYTjs7QUFpQkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFkRjtBQWdCRTtFQUNFLGlCQUFBO0FBZEo7O0FBbUJBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0FBaEJGO0FBa0JFO0VBQ0UsbUJBQUE7RUFDQSw4QkFBQTtBQWhCSjtBQW1CRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtBQWpCSjs7QUF1QkU7RUFDRSxhQUFBO0VBQ0Es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LGVBQUE7RUFDQSwrQkFBQTtBQWhFSjtBQW1FRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7QUFqRUo7QUFtRUk7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQWpFTjtBQW9FSTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtBQWxFTjs7QUF3RUU7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQXJFSjtBQXdFRTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtBQXRFSjtBQUNBLHcxYUFBdzFhIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGFzaGJvYXJkIFN0eWxlc1xuXG4uZGVhZGxpbmUtaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxufVxuXG4uc3RhdHMtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gIGdhcDogMTZweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW46IDE2cHggMDtcbn1cblxuLnN0YXQtaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gIH1cblxuICAuc3RhdC12YWx1ZSB7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIH1cblxuICAuc3RhdC1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgfVxufVxuXG4vLyBDYXJkIFN0eWxlc1xuaW9uLWNhcmQge1xuICBtYXJnaW46IDAgMCAxNnB4IDA7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcblxuICAmLmdhbWV3ZWVrLWNhcmQge1xuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICB9XG5cbiAgJi5yZXN1bHRzLWNhcmQge1xuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICB9XG5cbiAgJi5sZWFkZXJib2FyZC1jYXJkIHtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcbiAgfVxuXG4gICYuc3RhdHMtY2FyZCB7XG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpO1xuICB9XG59XG5cbi8vIENhcmQgSGVhZGVyc1xuaW9uLWNhcmQtaGVhZGVyIHtcbiAgcGFkZGluZzogMTZweDtcblxuICAuc2VjdGlvbi10aXRsZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDEuNHJlbTtcbiAgICB9XG4gIH1cbn1cblxuLy8gRGVhZGxpbmUgV2FybmluZ1xuLmRlYWRsaW5lLXdhcm5pbmcge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgfVxufVxuXG4vLyBQcmVkaWN0aW9uIENUQVxuLnByZWRpY3Rpb24tY3RhIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4IDA7XG5cbiAgLmN0YS10ZXh0IHtcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgfVxuXG4gIGlvbi1idXR0b24ge1xuICAgIG1heC13aWR0aDogMzAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgaGVpZ2h0OiA0OHB4O1xuICAgIC0tYm9yZGVyLXJhZGl1czogMjRweDtcbiAgfVxufVxuXG4vLyBQcmVkaWN0aW9ucyBQcmV2aWV3XG4ucHJlZGljdGlvbnMtcHJldmlldyB7XG4gIC5zdGF0dXMtYmFubmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAgcGFkZGluZzogOHB4IDE2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcblxuICAgICYuc3VjY2VzcyB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy10aW50KTtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZSk7XG4gICAgfVxuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgfVxuICB9XG5cbiAgLnNlbGVjdGVkLW1hdGNoZXMge1xuICAgIGg0IHtcbiAgICAgIG1hcmdpbjogMCAwIDEycHggMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgfVxuXG4gICAgLm1hdGNoLXByZWRpY3Rpb25zIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgZ2FwOiAxMnB4O1xuXG4gICAgICAubWF0Y2gtcHJlZGljdGlvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZzogOHB4IDEycHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcblxuICAgICAgICAudGVhbXMge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIH1cblxuICAgICAgICAucHJlZGljdGlvbiB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIFJlc3VsdHMgU3VtbWFyeVxuLnJlc3VsdHMtc3VtbWFyeSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgcGFkZGluZzogMTZweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcblxuICAudG90YWwtcG9pbnRzIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICAucG9pbnRzIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgZm9udC1zaXplOiAycmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgfVxuXG4gICAgLmxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgfVxuXG4gIC5wb2ludHMtYnJlYWtkb3duIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogMjRweDtcblxuICAgIC5icmVha2Rvd24taXRlbSB7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICAgIC52YWx1ZSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIH1cblxuICAgICAgLmxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gUHJlZGljdGlvbnMgTGlzdFxuLnByZWRpY3Rpb25zLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG5cbiAgLnByZWRpY3Rpb24tcmVzdWx0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBhZGRpbmc6IDEycHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG5cbiAgICAubWF0Y2gtaW5mbyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogNHB4O1xuXG4gICAgICAudGVhbXMge1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgfVxuXG4gICAgICAucHJlZGljdGlvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLnBvaW50cy1lYXJuZWQgaW9uLWJhZGdlIHtcbiAgICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgLS1wYWRkaW5nLXRvcDogNHB4O1xuICAgICAgLS1wYWRkaW5nLWJvdHRvbTogNHB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyBMZWFkZXJib2FyZCBUYWJsZVxuLmxlYWRlcmJvYXJkLXRhYmxlIHtcbiAgLnRhYmxlLWhlYWRlciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDgwcHggMWZyIDgwcHg7XG4gICAgcGFkZGluZzogMTJweCAxNnB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgfVxuXG4gIC50YWJsZS1yb3cge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA4MHB4IDFmciA4MHB4O1xuICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQpO1xuICAgIH1cblxuICAgICYuY3VycmVudC11c2VyIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQpO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICAucmFuayB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcblxuICAgICAgLnBvc2l0aW9uLWNoYW5nZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAucG9pbnRzIHtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuICB9XG59XG5cbi8vIFN0YXRzIEdyaWRcbi5zdGF0cy1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcbiAgZ2FwOiAxNnB4O1xuICBwYWRkaW5nOiA4cHg7XG5cbiAgLnN0YXQtaXRlbSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgIH1cblxuICAgIC5zdGF0LXZhbHVlIHtcbiAgICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICBtYXJnaW46IDRweCAwO1xuICAgIH1cblxuICAgIC5zdGF0LWxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyBSZXNwb25zaXZlIEFkanVzdG1lbnRzXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgLnJlc3VsdHMtc3VtbWFyeSB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDE2cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgLnBvaW50cy1icmVha2Rvd24ge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB9XG4gIH1cblxuICAuc3RhdHMtZ3JpZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcblxuICAgIC5zdGF0LWl0ZW06bGFzdC1jaGlsZCB7XG4gICAgICBncmlkLWNvbHVtbjogc3BhbiAyO1xuICAgIH1cbiAgfVxufVxuXG4vLyBMb2dvIFN0eWxlc1xuLmxvZ28tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgLmZvb3RiYWxsLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICB9XG5cbiAgLmxvZ28tdGV4dCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGxpbmUtaGVpZ2h0OiAxO1xuXG4gICAgLmxvZ28tc290ZCB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICB9XG5cbiAgICAubG9nby1zdWJ0aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgfVxuICB9XG59XG5cbmlvbi1idXR0b25zIHtcbiAgaW9uLWJ1dHRvbiB7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgIGhlaWdodDogNDRweDtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_player_pages_dashboard_dashboard_page_ts.js.map