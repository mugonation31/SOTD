"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_group-admin_pages_groups_group-leaderboard_group-leaderboard_page_ts"],{

/***/ 1529:
/*!*************************************************!*\
  !*** ./src/app/core/services/season.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SeasonService: () => (/* binding */ SeasonService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
var _SeasonService;


class SeasonService {
  constructor() {
    this.seasonInfo = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject({
      currentGameweek: 0,
      totalGameweeks: 38,
      seasonStartDate: new Date('2024-08-10'),
      seasonEndDate: new Date('2025-05-19'),
      isSeasonStarted: false,
      isSeasonEnded: false
    });
    // Initialize season status
    this.updateSeasonStatus();
    // Update status every hour
    setInterval(() => this.updateSeasonStatus(), 3600000);
  }
  updateSeasonStatus() {
    const now = new Date();
    const currentInfo = this.seasonInfo.value;
    const isSeasonStarted = now >= currentInfo.seasonStartDate;
    const isSeasonEnded = now >= currentInfo.seasonEndDate;
    // Calculate current gameweek based on season progress
    let currentGameweek = 0;
    if (isSeasonStarted && !isSeasonEnded) {
      const totalDays = (currentInfo.seasonEndDate.getTime() - currentInfo.seasonStartDate.getTime()) / (1000 * 60 * 60 * 24);
      const daysElapsed = (now.getTime() - currentInfo.seasonStartDate.getTime()) / (1000 * 60 * 60 * 24);
      currentGameweek = Math.floor(daysElapsed / totalDays * currentInfo.totalGameweeks) + 1;
    } else if (isSeasonEnded) {
      currentGameweek = currentInfo.totalGameweeks;
    }
    this.seasonInfo.next({
      ...currentInfo,
      currentGameweek,
      isSeasonStarted,
      isSeasonEnded
    });
  }
  getSeasonInfo() {
    return this.seasonInfo.asObservable();
  }
  getCurrentGameweek() {
    return this.seasonInfo.value.currentGameweek;
  }
  isSeasonStarted() {
    return this.seasonInfo.value.isSeasonStarted;
  }
  isSeasonEnded() {
    return this.seasonInfo.value.isSeasonEnded;
  }
}
_SeasonService = SeasonService;
_SeasonService.ɵfac = function SeasonService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SeasonService)();
};
_SeasonService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _SeasonService,
  factory: _SeasonService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 7853:
/*!************************************************************************************************!*\
  !*** ./src/app/platforms/group-admin/pages/groups/group-leaderboard/group-leaderboard.page.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupLeaderboardPage: () => (/* binding */ GroupLeaderboardPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_season_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/season.service */ 1529);
/* harmony import */ var _core_services_group_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/group.service */ 9699);
var _GroupLeaderboardPage;








function GroupLeaderboardPage_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Season not started - Players listed alphabetically");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function GroupLeaderboardPage_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 14)(1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const entry_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](entry_r1.position);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](entry_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](entry_r1.played);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", entry_r1.jokerUsed, "/2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](entry_r1.totalPoints);
  }
}
class GroupLeaderboardPage {
  constructor(route, seasonService, router, groupService) {
    this.route = route;
    this.seasonService = seasonService;
    this.router = router;
    this.groupService = groupService;
    this.groupId = '';
    this.groupName = '';
    this.leaderboard = [];
    this.sortedLeaderboard = [];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.trophyOutline,
      arrowUpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.arrowUpOutline,
      arrowDownOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.arrowDownOutline,
      removeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.removeOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.timeOutline,
      chevronBackOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronBackOutline
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = params['id'];
      this.loadGroupData();
    });
    // Subscribe to group updates for real-time leaderboard updates
    this.groupsSubscription = this.groupService.groups$.subscribe(() => {
      this.loadGroupData();
    });
  }
  ngOnDestroy() {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
  }
  loadGroupData() {
    // Get the group data from GroupService
    const allGroups = this.groupService.getAllGroups();
    const group = allGroups.find(g => g.id === this.groupId);
    if (group) {
      this.groupName = group.name;
      // Get the leaderboard for this group
      const groupLeaderboard = this.groupService.getGroupLeaderboard(this.groupId);
      // Convert GroupLeaderboardEntry to our interface format
      this.leaderboard = groupLeaderboard.map(entry => ({
        position: entry.position,
        name: entry.name,
        played: entry.played,
        jokerUsed: entry.jokerUsed,
        totalPoints: entry.totalPoints
      }));
      this.sortLeaderboard();
    } else {
      // Group not found, navigate back
      this.router.navigate(['/group-admin/groups']);
    }
  }
  sortLeaderboard() {
    if (this.seasonService.isSeasonStarted()) {
      // Sort by points when season has started
      this.sortedLeaderboard = [...this.leaderboard].sort((a, b) => b.totalPoints - a.totalPoints);
    } else {
      // Sort alphabetically before season starts
      this.sortedLeaderboard = [...this.leaderboard].sort((a, b) => a.name.localeCompare(b.name));
    }
    // Update positions after sorting
    this.sortedLeaderboard = this.sortedLeaderboard.map((entry, index) => ({
      ...entry,
      position: index + 1
    }));
  }
  goBack() {
    this.router.navigate(['/group-admin/groups']);
  }
}
_GroupLeaderboardPage = GroupLeaderboardPage;
_GroupLeaderboardPage.ɵfac = function GroupLeaderboardPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GroupLeaderboardPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_season_service__WEBPACK_IMPORTED_MODULE_1__.SeasonService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_group_service__WEBPACK_IMPORTED_MODULE_2__.GroupService));
};
_GroupLeaderboardPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _GroupLeaderboardPage,
  selectors: [["app-group-leaderboard"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 26,
  vars: 3,
  consts: [["slot", "start"], ["text", "Groups", "defaultHref", "/group-admin/groups"], [1, "ion-padding"], ["class", "season-info", 4, "ngIf"], [1, "table-header"], [1, "position-col"], [1, "name-col"], [1, "gameweek-col"], [1, "joker-col"], [1, "points-col"], [1, "table-body"], ["class", "table-row", 4, "ngFor", "ngForOf"], [1, "season-info"], ["name", "information-circle-outline"], [1, "table-row"]],
  template: function GroupLeaderboardPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "ion-back-button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-content", 2)(7, "ion-card")(8, "ion-card-header")(9, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Current Standings");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, GroupLeaderboardPage_div_11_Template, 4, 0, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "ion-card-content")(13, "div", 4)(14, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Position");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Name");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Game Week");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Played Joker");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Points");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, GroupLeaderboardPage_div_25_Template, 11, 5, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx.groupName, " Leaderboard");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.seasonService.isSeasonStarted());
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.sortedLeaderboard);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonBackButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButtons, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf],
  styles: [".table-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 80px 1fr 100px 100px 80px;\n  padding: 12px 16px;\n  background: var(--ion-color-light);\n  font-weight: 600;\n  border-bottom: 2px solid var(--ion-color-medium);\n  gap: 16px;\n}\n\n.table-body[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 80px 1fr 100px 100px 80px;\n  padding: 12px 16px;\n  border-bottom: 1px solid var(--ion-color-light);\n  gap: 16px;\n  align-items: center;\n}\n.table-body[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:hover {\n  background: var(--ion-color-light-tint);\n}\n\n.position-col[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\n.name-col[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n\n.gameweek-col[_ngcontent-%COMP%], \n.joker-col[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.points-col[_ngcontent-%COMP%] {\n  text-align: right;\n  font-weight: 600;\n  color: var(--ion-color-primary);\n}\n\n.season-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 8px;\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n}\n.season-info[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n\nion-back-button[_ngcontent-%COMP%] {\n  display: block;\n  --color: var(--ion-color-primary);\n  --icon-font-size: 24px;\n  --padding-start: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwLWxlYWRlcmJvYXJkLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ007RUFDRSxhQUFBO0VBQ0EsZ0RBQUE7RUFDQSxrQkFBQTtFQUNBLGtDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnREFBQTtFQUNBLFNBQUE7QUFBUjs7QUFJUTtFQUNFLGFBQUE7RUFDQSxnREFBQTtFQUNBLGtCQUFBO0VBQ0EsK0NBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUFEVjtBQUdVO0VBQ0UsdUNBQUE7QUFEWjs7QUFNTTtFQUNFLGdCQUFBO0FBSFI7O0FBTU07RUFDRSxnQkFBQTtBQUhSOztBQU1NOztFQUVFLGtCQUFBO0FBSFI7O0FBTU07RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7QUFIUjs7QUFNTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsOEJBQUE7RUFDQSxpQkFBQTtBQUhSO0FBS1E7RUFDRSxpQkFBQTtBQUhWOztBQU9NO0VBQ0UsY0FBQTtFQUNBLGlDQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQUpSIiwiZmlsZSI6Imdyb3VwLWxlYWRlcmJvYXJkLnBhZ2UudHMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAgIC50YWJsZS1oZWFkZXIge1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDgwcHggMWZyIDEwMHB4IDEwMHB4IDgwcHg7XG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICBnYXA6IDE2cHg7XG4gICAgICB9XG5cbiAgICAgIC50YWJsZS1ib2R5IHtcbiAgICAgICAgLnRhYmxlLXJvdyB7XG4gICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDgwcHggMWZyIDEwMHB4IDEwMHB4IDgwcHg7XG4gICAgICAgICAgcGFkZGluZzogMTJweCAxNnB4O1xuICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgICAgIGdhcDogMTZweDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtdGludCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5wb3NpdGlvbi1jb2wge1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgfVxuXG4gICAgICAubmFtZS1jb2wge1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgfVxuXG4gICAgICAuZ2FtZXdlZWstY29sLFxuICAgICAgLmpva2VyLWNvbCB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLnBvaW50cy1jb2wge1xuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgLnNlYXNvbi1pbmZvIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ2FwOiA4cHg7XG4gICAgICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcblxuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW9uLWJhY2stYnV0dG9uIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgLS1pY29uLWZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgICAgfVxuICAgICJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2dyb3VwLWFkbWluL3BhZ2VzL2dyb3Vwcy9ncm91cC1sZWFkZXJib2FyZC9ncm91cC1sZWFkZXJib2FyZC5wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNNO0VBQ0UsYUFBQTtFQUNBLGdEQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0RBQUE7RUFDQSxTQUFBO0FBQVI7O0FBSVE7RUFDRSxhQUFBO0VBQ0EsZ0RBQUE7RUFDQSxrQkFBQTtFQUNBLCtDQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBRFY7QUFHVTtFQUNFLHVDQUFBO0FBRFo7O0FBTU07RUFDRSxnQkFBQTtBQUhSOztBQU1NO0VBQ0UsZ0JBQUE7QUFIUjs7QUFNTTs7RUFFRSxrQkFBQTtBQUhSOztBQU1NO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0FBSFI7O0FBTU07RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7QUFIUjtBQUtRO0VBQ0UsaUJBQUE7QUFIVjs7QUFPTTtFQUNFLGNBQUE7RUFDQSxpQ0FBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUFKUjtBQUNBLGdzRkFBZ3NGIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgICAudGFibGUtaGVhZGVyIHtcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA4MHB4IDFmciAxMDBweCAxMDBweCA4MHB4O1xuICAgICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgZ2FwOiAxNnB4O1xuICAgICAgfVxuXG4gICAgICAudGFibGUtYm9keSB7XG4gICAgICAgIC50YWJsZS1yb3cge1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA4MHB4IDFmciAxMDBweCAxMDBweCA4MHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgICAgICBnYXA6IDE2cHg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAucG9zaXRpb24tY29sIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cblxuICAgICAgLm5hbWUtY29sIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIH1cblxuICAgICAgLmdhbWV3ZWVrLWNvbCxcbiAgICAgIC5qb2tlci1jb2wge1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC5wb2ludHMtY29sIHtcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIC5zZWFzb24taW5mbyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogOHB4O1xuICAgICAgICBtYXJnaW4tdG9wOiA4cHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG5cbiAgICAgICAgaW9uLWljb24ge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlvbi1iYWNrLWJ1dHRvbiB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIC0taWNvbi1mb250LXNpemU6IDI0cHg7XG4gICAgICAgIC0tcGFkZGluZy1zdGFydDogMDtcbiAgICAgIH1cbiAgICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_group-admin_pages_groups_group-leaderboard_group-leaderboard_page_ts.js.map