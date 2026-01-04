"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_player_pages_group-standings_group-standings_page_ts"],{

/***/ 4794:
/*!********************************************************************************!*\
  !*** ./src/app/platforms/player/pages/group-standings/group-standings.page.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupStandingsPage: () => (/* binding */ GroupStandingsPage)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_group_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/group.service */ 9699);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/auth.service */ 8010);
var _GroupStandingsPage;









function GroupStandingsPage_ion_title_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.group.name);
  }
}
function GroupStandingsPage_ion_card_6_ion_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-badge", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Your Position: #", ctx_r0.userPosition, " ");
  }
}
function GroupStandingsPage_ion_card_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-card", 18)(1, "ion-card-header")(2, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, GroupStandingsPage_ion_card_6_ion_badge_4_Template, 2, 1, "ion-badge", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 20)(6, "ion-badge", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "ion-badge", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.group.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.userPosition);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.group.memberCount, " members");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx_r0.group.type === "prize" ? "primary" : "secondary");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.group.type === "prize" ? "Prize Pool" : "Casual", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Code: ", ctx_r0.group.code, "");
  }
}
function GroupStandingsPage_div_29_ion_badge_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-badge", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "YOU");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function GroupStandingsPage_div_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 25)(1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "ion-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, GroupStandingsPage_div_29_ion_badge_6_Template, 2, 0, "ion-badge", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const player_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("current-user", ctx_r0.isCurrentUser(player_r2.userId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", player_r2.position, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", ctx_r0.getPositionIcon(ctx_r0.getPositionChange(player_r2.position, player_r2.previousPosition)))("color", ctx_r0.getPositionColor(ctx_r0.getPositionChange(player_r2.position, player_r2.previousPosition)));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", player_r2.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isCurrentUser(player_r2.userId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](player_r2.played);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](player_r2.correctScores);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](player_r2.correctResults);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", player_r2.jokerUsed, "/2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](player_r2.points);
  }
}
function GroupStandingsPage_div_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ion-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "No Standings Available");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Standings will appear once predictions are made.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
class GroupStandingsPage {
  constructor(router, route, groupService, authService) {
    this.router = router;
    this.route = route;
    this.groupService = groupService;
    this.authService = authService;
    this.groupId = '';
    this.currentUserId = null;
    this.group = null;
    this.standings = [];
    this.userPosition = null;
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.trophyOutline,
      arrowUpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.arrowUpOutline,
      arrowDownOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.arrowDownOutline,
      removeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.removeOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.peopleOutline,
      arrowBackOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.arrowBackOutline
    });
  }
  ngOnInit() {
    var _this$authService$get;
    this.groupId = this.route.snapshot.paramMap.get('groupId') || '';
    this.currentUserId = ((_this$authService$get = this.authService.getCurrentUser()) === null || _this$authService$get === void 0 ? void 0 : _this$authService$get.id) || null;
    this.loadGroupStandings();
    // Subscribe to group updates
    this.groupsSubscription = this.groupService.groups$.subscribe(() => {
      this.loadGroupStandings();
    });
  }
  ngOnDestroy() {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
  }
  loadGroupStandings() {
    // Use the new optimized method from group service
    const groupWithStandings = this.groupService.getGroupWithStandings(this.groupId);
    if (groupWithStandings) {
      this.group = groupWithStandings.group;
      this.standings = groupWithStandings.leaderboard;
      this.userPosition = groupWithStandings.userPosition;
    } else {
      // Group not found, navigate back
      this.router.navigate(['/player/standings']);
    }
  }
  getPositionChange(current, previous) {
    if (current === previous) return 'same';
    return current < previous ? 'up' : 'down';
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
  isCurrentUser(userId) {
    return userId === this.currentUserId;
  }
  goBack() {
    this.router.navigate(['/player/standings']);
  }
}
_GroupStandingsPage = GroupStandingsPage;
_GroupStandingsPage.ɵfac = function GroupStandingsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GroupStandingsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_group_service__WEBPACK_IMPORTED_MODULE_1__.GroupService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService));
};
_GroupStandingsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _GroupStandingsPage,
  selectors: [["app-group-standings"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 31,
  vars: 4,
  consts: [["slot", "start"], ["text", "Groups", "defaultHref", "/player/standings", 3, "click"], [4, "ngIf"], [1, "ion-padding"], ["class", "group-info-card", 4, "ngIf"], [1, "standings-card"], ["name", "trophy-outline"], [1, "table-header"], [1, "position-col"], [1, "name-col"], [1, "played-col"], [1, "scores-col"], [1, "results-col"], [1, "joker-col"], [1, "points-col"], [1, "table-body"], ["class", "table-row", 3, "current-user", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "group-info-card"], ["color", "primary", "class", "position-badge", 4, "ngIf"], [1, "group-details"], ["color", "medium"], [3, "color"], [1, "group-code"], ["color", "primary", 1, "position-badge"], [1, "table-row"], [1, "position-change-icon", 3, "name", "color"], ["color", "primary", "class", "you-badge", 4, "ngIf"], ["color", "primary", 1, "you-badge"], [1, "empty-state"], ["name", "people-outline", "size", "large", "color", "medium"]],
  template: function GroupStandingsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0)(3, "ion-back-button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function GroupStandingsPage_Template_ion_back_button_click_3_listener() {
        return ctx.goBack();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, GroupStandingsPage_ion_title_4_Template, 2, 1, "ion-title", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ion-content", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, GroupStandingsPage_ion_card_6_Template, 12, 6, "ion-card", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "ion-card", 5)(8, "ion-card-header")(9, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "ion-icon", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, " Leaderboard ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "ion-card-content")(13, "div", 7)(14, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Pos");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Name");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Played");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Scores");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Results");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "Joker");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "Points");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](29, GroupStandingsPage_div_29_Template, 17, 12, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](30, GroupStandingsPage_div_30_Template, 6, 0, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.group);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.group);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](23);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.standings);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.standings.length === 0);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonBackButton, _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf],
  styles: [".group-info-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.group-info-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.group-info-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px;\n  font-size: 1.3rem;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\n.group-info-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]   .position-badge[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.group-info-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .group-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.group-info-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .group-details[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.group-info-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .group-details[_ngcontent-%COMP%]   .group-code[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--ion-color-step-600);\n  font-family: \"SF Mono\", Consolas, \"Liberation Mono\", Menlo, monospace;\n  font-weight: 500;\n  background: var(--ion-color-light);\n  padding: 4px 8px;\n  border-radius: 6px;\n}\n\n.standings-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  padding: 20px 20px 16px 20px;\n}\n.standings-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n.standings-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n.standings-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 0;\n}\n\n.table-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 60px 1fr 70px 70px 70px 70px 80px;\n  gap: 8px;\n  padding: 12px 20px;\n  background: var(--ion-color-light);\n  border-bottom: 2px solid var(--ion-color-light-shade);\n  font-weight: 600;\n  font-size: 0.85rem;\n  color: var(--ion-color-step-600);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.table-body[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 60px 1fr 70px 70px 70px 70px 80px;\n  gap: 8px;\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--ion-color-light);\n  align-items: center;\n  transition: background-color 0.2s ease;\n}\n.table-body[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.table-body[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%]:hover {\n  background: var(--ion-color-light-tint);\n}\n.table-body[_ngcontent-%COMP%]   .table-row.current-user[_ngcontent-%COMP%] {\n  background: linear-gradient(90deg, rgba(var(--ion-color-primary-rgb), 0.08), transparent);\n  border-left: 4px solid var(--ion-color-primary);\n  font-weight: 500;\n}\n.table-body[_ngcontent-%COMP%]   .table-row.current-user[_ngcontent-%COMP%]   .you-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  margin-left: 8px;\n  padding: 2px 6px;\n}\n\n.position-col[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-weight: 600;\n}\n.position-col[_ngcontent-%COMP%]   .position-change-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\n.name-col[_ngcontent-%COMP%] {\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.played-col[_ngcontent-%COMP%], \n.scores-col[_ngcontent-%COMP%], \n.results-col[_ngcontent-%COMP%], \n.joker-col[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.9rem;\n}\n\n.points-col[_ngcontent-%COMP%] {\n  text-align: right;\n  font-weight: 600;\n  color: var(--ion-color-primary);\n  font-size: 1rem;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n}\n.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  opacity: 0.6;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  color: var(--ion-text-color);\n  font-weight: 600;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  gap: 12px;\n}\n.logo-container[_ngcontent-%COMP%]   .football-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--ion-color-primary);\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1;\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-sotd[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--ion-color-primary);\n  letter-spacing: 1px;\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n  margin-top: 2px;\n}\n\n@media (max-width: 768px) {\n  .table-header[_ngcontent-%COMP%], \n   .table-body[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {\n    grid-template-columns: 50px 1fr 50px 50px 50px 60px;\n    font-size: 0.8rem;\n  }\n  .scores-col[_ngcontent-%COMP%], \n   .results-col[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .group-info-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .group-info-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n  .standings-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n    padding: 16px 16px 12px 16px;\n  }\n  .table-header[_ngcontent-%COMP%], \n   .table-body[_ngcontent-%COMP%]   .table-row[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwLXN0YW5kaW5ncy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxtQkFBQTtBQURGO0FBR0U7RUFDRSxhQUFBO0FBREo7QUFHSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFETjtBQUdNO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBQURSO0FBS0k7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtBQUhOO0FBS007RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0FBSFI7QUFNTTtFQUNFLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxxRUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBSlI7O0FBV0U7RUFDRSw0QkFBQTtBQVJKO0FBVUk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQVJOO0FBVU07RUFDRSwrQkFBQTtBQVJSO0FBYUU7RUFDRSxVQUFBO0FBWEo7O0FBZ0JBO0VBQ0UsYUFBQTtFQUNBLHdEQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxxREFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQ0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFiRjs7QUFpQkU7RUFDRSxhQUFBO0VBQ0Esd0RBQUE7RUFDQSxRQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQ0FBQTtFQUNBLG1CQUFBO0VBQ0Esc0NBQUE7QUFkSjtBQWdCSTtFQUNFLG1CQUFBO0FBZE47QUFpQkk7RUFDRSx1Q0FBQTtBQWZOO0FBa0JJO0VBQ0UseUZBQUE7RUFDQSwrQ0FBQTtFQUNBLGdCQUFBO0FBaEJOO0FBa0JNO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBaEJSOztBQXVCQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtBQXBCRjtBQXNCRTtFQUNFLGVBQUE7QUFwQko7O0FBd0JBO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBckJGOztBQXdCQTs7OztFQUlFLGtCQUFBO0VBQ0EsaUJBQUE7QUFyQkY7O0FBd0JBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZUFBQTtBQXJCRjs7QUF5QkE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0FBdEJGO0FBd0JFO0VBQ0UsbUJBQUE7RUFDQSxZQUFBO0FBdEJKO0FBeUJFO0VBQ0UsaUJBQUE7RUFDQSw0QkFBQTtFQUNBLGdCQUFBO0FBdkJKO0FBMEJFO0VBQ0UsU0FBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7QUF4Qko7O0FBNkJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7QUExQkY7QUE0QkU7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUExQko7QUE2QkU7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FBM0JKO0FBNkJJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7RUFDQSxtQkFBQTtBQTNCTjtBQThCSTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQTVCTjs7QUFrQ0E7RUFDRTs7SUFFRSxtREFBQTtJQUNBLGlCQUFBO0VBL0JGO0VBa0NBOztJQUVFLGFBQUE7RUFoQ0Y7RUFtQ0E7SUFDRSxhQUFBO0VBakNGO0VBbUNFO0lBQ0UsaUJBQUE7RUFqQ0o7RUFxQ0E7SUFDRSw0QkFBQTtFQW5DRjtFQXNDQTs7SUFFRSxrQkFBQTtFQXBDRjtBQUNGIiwiZmlsZSI6Imdyb3VwLXN0YW5kaW5ncy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBHcm91cCBTdGFuZGluZ3MgUGFnZSBTdHlsZXNcblxuLmdyb3VwLWluZm8tY2FyZCB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIFxuICBpb24tY2FyZC1oZWFkZXIge1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgXG4gICAgaW9uLWNhcmQtdGl0bGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBnYXA6IDEycHg7XG4gICAgICBmb250LXNpemU6IDEuM3JlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgICAgXG4gICAgICAucG9zaXRpb24tYmFkZ2Uge1xuICAgICAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC5ncm91cC1kZXRhaWxzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAxMnB4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgXG4gICAgICBpb24tYmFkZ2Uge1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmdyb3VwLWNvZGUge1xuICAgICAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3RlcC02MDApO1xuICAgICAgICBmb250LWZhbWlseTogJ1NGIE1vbm8nLCBDb25zb2xhcywgJ0xpYmVyYXRpb24gTW9ubycsIE1lbmxvLCBtb25vc3BhY2U7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLnN0YW5kaW5ncy1jYXJkIHtcbiAgaW9uLWNhcmQtaGVhZGVyIHtcbiAgICBwYWRkaW5nOiAyMHB4IDIwcHggMTZweCAyMHB4O1xuICAgIFxuICAgIGlvbi1jYXJkLXRpdGxlIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBcbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbn1cblxuLy8gVGFibGUgU3R5bGVzXG4udGFibGUtaGVhZGVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA2MHB4IDFmciA3MHB4IDcwcHggNzBweCA3MHB4IDgwcHg7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiAxMnB4IDIwcHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3RlcC02MDApO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG59XG5cbi50YWJsZS1ib2R5IHtcbiAgLnRhYmxlLXJvdyB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDYwcHggMWZyIDcwcHggNzBweCA3MHB4IDcwcHggODBweDtcbiAgICBnYXA6IDhweDtcbiAgICBwYWRkaW5nOiAxNnB4IDIwcHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgZWFzZTtcblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBib3JkZXItYm90dG9tOiBub25lO1xuICAgIH1cbiAgICBcbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodC10aW50KTtcbiAgICB9XG4gICAgXG4gICAgJi5jdXJyZW50LXVzZXIge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMDgpLCB0cmFuc3BhcmVudCk7XG4gICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBcbiAgICAgIC55b3UtYmFkZ2Uge1xuICAgICAgICBmb250LXNpemU6IDAuN3JlbTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgICAgICAgcGFkZGluZzogMnB4IDZweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gQ29sdW1uIFN0eWxlc1xuLnBvc2l0aW9uLWNvbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBcbiAgLnBvc2l0aW9uLWNoYW5nZS1pY29uIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gIH1cbn1cblxuLm5hbWUtY29sIHtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5wbGF5ZWQtY29sLFxuLnNjb3Jlcy1jb2wsXG4ucmVzdWx0cy1jb2wsXG4uam9rZXItY29sIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDAuOXJlbTtcbn1cblxuLnBvaW50cy1jb2wge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4vLyBFbXB0eSBTdGF0ZVxuLmVtcHR5LXN0YXRlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiA2MHB4IDIwcHg7XG4gIFxuICBpb24taWNvbiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICBvcGFjaXR5OiAwLjY7XG4gIH1cbiAgXG4gIGgzIHtcbiAgICBtYXJnaW46IDAgMCA4cHggMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IpO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIH1cbiAgXG4gIHAge1xuICAgIG1hcmdpbjogMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gIH1cbn1cblxuLy8gTG9nbyBTdHlsZXMgKGZvciBoZWFkZXIpXG4ubG9nby1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGdhcDogMTJweDtcblxuICAuZm9vdGJhbGwtaWNvbiB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cblxuICAubG9nby10ZXh0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbGluZS1oZWlnaHQ6IDE7XG5cbiAgICAubG9nby1zb3RkIHtcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgICB9XG5cbiAgICAubG9nby1zdWJ0aXRsZSB7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyBSZXNwb25zaXZlIERlc2lnblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC50YWJsZS1oZWFkZXIsXG4gIC50YWJsZS1ib2R5IC50YWJsZS1yb3cge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNTBweCAxZnIgNTBweCA1MHB4IDUwcHggNjBweDtcbiAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgfVxuICBcbiAgLnNjb3Jlcy1jb2wsXG4gIC5yZXN1bHRzLWNvbCB7XG4gICAgZGlzcGxheTogbm9uZTsgLy8gSGlkZSBvbiBtb2JpbGUgZm9yIHNwYWNlXG4gIH1cbiAgXG4gIC5ncm91cC1pbmZvLWNhcmQgaW9uLWNhcmQtaGVhZGVyIHtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICAgIFxuICAgIGlvbi1jYXJkLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgIH1cbiAgfVxuICBcbiAgLnN0YW5kaW5ncy1jYXJkIGlvbi1jYXJkLWhlYWRlciB7XG4gICAgcGFkZGluZzogMTZweCAxNnB4IDEycHggMTZweDtcbiAgfVxuICBcbiAgLnRhYmxlLWhlYWRlcixcbiAgLnRhYmxlLWJvZHkgLnRhYmxlLXJvdyB7XG4gICAgcGFkZGluZzogMTJweCAxNnB4O1xuICB9XG59ICJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3BsYXllci9wYWdlcy9ncm91cC1zdGFuZGluZ3MvZ3JvdXAtc3RhbmRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLG1CQUFBO0FBREY7QUFHRTtFQUNFLGFBQUE7QUFESjtBQUdJO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUROO0FBR007RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBRFI7QUFLSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FBSE47QUFLTTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7QUFIUjtBQU1NO0VBQ0Usa0JBQUE7RUFDQSxnQ0FBQTtFQUNBLHFFQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFKUjs7QUFXRTtFQUNFLDRCQUFBO0FBUko7QUFVSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBUk47QUFVTTtFQUNFLCtCQUFBO0FBUlI7QUFhRTtFQUNFLFVBQUE7QUFYSjs7QUFnQkE7RUFDRSxhQUFBO0VBQ0Esd0RBQUE7RUFDQSxRQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQ0FBQTtFQUNBLHFEQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQWJGOztBQWlCRTtFQUNFLGFBQUE7RUFDQSx3REFBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLCtDQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQ0FBQTtBQWRKO0FBZ0JJO0VBQ0UsbUJBQUE7QUFkTjtBQWlCSTtFQUNFLHVDQUFBO0FBZk47QUFrQkk7RUFDRSx5RkFBQTtFQUNBLCtDQUFBO0VBQ0EsZ0JBQUE7QUFoQk47QUFrQk07RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFoQlI7O0FBdUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0FBcEJGO0FBc0JFO0VBQ0UsZUFBQTtBQXBCSjs7QUF3QkE7RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFyQkY7O0FBd0JBOzs7O0VBSUUsa0JBQUE7RUFDQSxpQkFBQTtBQXJCRjs7QUF3QkE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7RUFDQSxlQUFBO0FBckJGOztBQXlCQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7QUF0QkY7QUF3QkU7RUFDRSxtQkFBQTtFQUNBLFlBQUE7QUF0Qko7QUF5QkU7RUFDRSxpQkFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0JBQUE7QUF2Qko7QUEwQkU7RUFDRSxTQUFBO0VBQ0EsOEJBQUE7RUFDQSxpQkFBQTtBQXhCSjs7QUE2QkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtBQTFCRjtBQTRCRTtFQUNFLGVBQUE7RUFDQSwrQkFBQTtBQTFCSjtBQTZCRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7QUEzQko7QUE2Qkk7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtFQUNBLG1CQUFBO0FBM0JOO0FBOEJJO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBNUJOOztBQWtDQTtFQUNFOztJQUVFLG1EQUFBO0lBQ0EsaUJBQUE7RUEvQkY7RUFrQ0E7O0lBRUUsYUFBQTtFQWhDRjtFQW1DQTtJQUNFLGFBQUE7RUFqQ0Y7RUFtQ0U7SUFDRSxpQkFBQTtFQWpDSjtFQXFDQTtJQUNFLDRCQUFBO0VBbkNGO0VBc0NBOztJQUVFLGtCQUFBO0VBcENGO0FBQ0Y7QUFDQSxvc1FBQW9zUSIsInNvdXJjZXNDb250ZW50IjpbIi8vIEdyb3VwIFN0YW5kaW5ncyBQYWdlIFN0eWxlc1xuXG4uZ3JvdXAtaW5mby1jYXJkIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgXG4gIGlvbi1jYXJkLWhlYWRlciB7XG4gICAgcGFkZGluZzogMjBweDtcbiAgICBcbiAgICBpb24tY2FyZC10aXRsZSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGdhcDogMTJweDtcbiAgICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICBcbiAgICAgIC5wb3NpdGlvbi1iYWRnZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLmdyb3VwLWRldGFpbHMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDEycHg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBcbiAgICAgIGlvbi1iYWRnZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgfVxuICAgICAgXG4gICAgICAuZ3JvdXAtY29kZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdGVwLTYwMCk7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnU0YgTW9ubycsIENvbnNvbGFzLCAnTGliZXJhdGlvbiBNb25vJywgTWVubG8sIG1vbm9zcGFjZTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4uc3RhbmRpbmdzLWNhcmQge1xuICBpb24tY2FyZC1oZWFkZXIge1xuICAgIHBhZGRpbmc6IDIwcHggMjBweCAxNnB4IDIwcHg7XG4gICAgXG4gICAgaW9uLWNhcmQtdGl0bGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIFxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgaW9uLWNhcmQtY29udGVudCB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxufVxuXG4vLyBUYWJsZSBTdHlsZXNcbi50YWJsZS1oZWFkZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDYwcHggMWZyIDcwcHggNzBweCA3MHB4IDcwcHggODBweDtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDEycHggMjBweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdGVwLTYwMCk7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbn1cblxuLnRhYmxlLWJvZHkge1xuICAudGFibGUtcm93IHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNjBweCAxZnIgNzBweCA3MHB4IDcwcHggNzBweCA4MHB4O1xuICAgIGdhcDogOHB4O1xuICAgIHBhZGRpbmc6IDE2cHggMjBweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlO1xuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgfVxuICAgIFxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQpO1xuICAgIH1cbiAgICBcbiAgICAmLmN1cnJlbnQtdXNlciB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4wOCksIHRyYW5zcGFyZW50KTtcbiAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIFxuICAgICAgLnlvdS1iYWRnZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC43cmVtO1xuICAgICAgICBtYXJnaW4tbGVmdDogOHB4O1xuICAgICAgICBwYWRkaW5nOiAycHggNnB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBDb2x1bW4gU3R5bGVzXG4ucG9zaXRpb24tY29sIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIFxuICAucG9zaXRpb24tY2hhbmdlLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxufVxuXG4ubmFtZS1jb2wge1xuICBmb250LXdlaWdodDogNTAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbn1cblxuLnBsYXllZC1jb2wsXG4uc2NvcmVzLWNvbCxcbi5yZXN1bHRzLWNvbCxcbi5qb2tlci1jb2wge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xufVxuXG4ucG9pbnRzLWNvbCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbi8vIEVtcHR5IFN0YXRlXG4uZW1wdHktc3RhdGUge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDYwcHggMjBweDtcbiAgXG4gIGlvbi1pY29uIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAgIG9wYWNpdHk6IDAuNjtcbiAgfVxuICBcbiAgaDMge1xuICAgIG1hcmdpbjogMCAwIDhweCAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvcik7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxuICBcbiAgcCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgfVxufVxuXG4vLyBMb2dvIFN0eWxlcyAoZm9yIGhlYWRlcilcbi5sb2dvLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZ2FwOiAxMnB4O1xuXG4gIC5mb290YmFsbC1pY29uIHtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gIC5sb2dvLXRleHQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBsaW5lLWhlaWdodDogMTtcblxuICAgIC5sb2dvLXNvdGQge1xuICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICAgIH1cblxuICAgIC5sb2dvLXN1YnRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgfVxuICB9XG59XG5cbi8vIFJlc3BvbnNpdmUgRGVzaWduXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnRhYmxlLWhlYWRlcixcbiAgLnRhYmxlLWJvZHkgLnRhYmxlLXJvdyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1MHB4IDFmciA1MHB4IDUwcHggNTBweCA2MHB4O1xuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICB9XG4gIFxuICAuc2NvcmVzLWNvbCxcbiAgLnJlc3VsdHMtY29sIHtcbiAgICBkaXNwbGF5OiBub25lOyAvLyBIaWRlIG9uIG1vYmlsZSBmb3Igc3BhY2VcbiAgfVxuICBcbiAgLmdyb3VwLWluZm8tY2FyZCBpb24tY2FyZC1oZWFkZXIge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgXG4gICAgaW9uLWNhcmQtdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgfVxuICB9XG4gIFxuICAuc3RhbmRpbmdzLWNhcmQgaW9uLWNhcmQtaGVhZGVyIHtcbiAgICBwYWRkaW5nOiAxNnB4IDE2cHggMTJweCAxNnB4O1xuICB9XG4gIFxuICAudGFibGUtaGVhZGVyLFxuICAudGFibGUtYm9keSAudGFibGUtcm93IHtcbiAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIH1cbn0gIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_player_pages_group-standings_group-standings_page_ts.js.map