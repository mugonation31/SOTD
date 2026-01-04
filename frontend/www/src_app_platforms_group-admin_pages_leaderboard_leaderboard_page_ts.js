"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_group-admin_pages_leaderboard_leaderboard_page_ts"],{

/***/ 7886:
/*!*****************************************************************************!*\
  !*** ./src/app/platforms/group-admin/pages/leaderboard/leaderboard.page.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LeaderboardPage: () => (/* binding */ LeaderboardPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_group_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/group.service */ 9699);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/auth.service */ 8010);
var _LeaderboardPage;








function LeaderboardPage_p_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", ctx_r0.groupStandings.length, " group", ctx_r0.groupStandings.length === 1 ? "" : "s", " managed");
  }
}
function LeaderboardPage_ion_card_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-card", 12)(1, "ion-card-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "No Groups Created");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Create your first group to see leaderboards!");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "ion-button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LeaderboardPage_ion_card_17_Template_ion_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.createNewGroup());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "ion-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, " Create Group ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}
function LeaderboardPage_ion_list_18_ion_item_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LeaderboardPage_ion_list_18_ion_item_1_Template_ion_item_click_0_listener() {
      const groupStanding_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.viewGroupLeaderboard(groupStanding_r4.group.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 18)(2, "div", 19)(3, "h3", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 21)(6, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "p", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 25)(13, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Admin");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](17, "ion-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const groupStanding_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](groupStanding_r4.group.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", groupStanding_r4.group.memberCount, " members");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("prize", groupStanding_r4.group.type === "prize");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", groupStanding_r4.group.type === "prize" ? "Prize Pool" : "Casual", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Code: ", groupStanding_r4.group.code, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", groupStanding_r4.group.memberCount, " ", groupStanding_r4.group.memberCount === 1 ? "player" : "players", "");
  }
}
function LeaderboardPage_ion_list_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, LeaderboardPage_ion_list_18_ion_item_1_Template, 18, 8, "ion-item", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.groupStandings)("ngForTrackBy", ctx_r0.trackByGroupId);
  }
}
class LeaderboardPage {
  constructor(router, groupService, authService) {
    this.router = router;
    this.groupService = groupService;
    this.authService = authService;
    this.currentUserId = null;
    this.groupStandings = [];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      personOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.peopleOutline,
      chevronForwardOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronForwardOutline,
      addOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.addOutline
    });
  }
  ngOnInit() {
    var _this$authService$get;
    this.currentUserId = ((_this$authService$get = this.authService.getCurrentUser()) === null || _this$authService$get === void 0 ? void 0 : _this$authService$get.id) || null;
    this.loadGroupStandings();
    // Subscribe to group updates for real-time member count and standings updates
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
    const groupsWithLeaderboards = this.groupService.getAdminGroupsWithLeaderboards();
    this.groupStandings = groupsWithLeaderboards.map(item => {
      // Use the centralized conversion function from the service
      const convertedLeaderboard = this.groupService.convertToStandings(item.leaderboard);
      // Ensure member count is synced with actual members
      const actualMemberCount = item.group.members.length;
      return {
        group: {
          id: item.group.id,
          name: item.group.name,
          code: item.group.code,
          memberCount: actualMemberCount,
          // Use actual member count
          type: item.group.type
        },
        leaderboard: convertedLeaderboard,
        adminPosition: item.adminPosition
      };
    });
  }
  // Track by function for better performance when rendering groups
  trackByGroupId(index, item) {
    return item.group.id;
  }
  viewGroupLeaderboard(groupId) {
    this.router.navigate(['/group-admin/groups', groupId, 'leaderboard']);
  }
  navigateTo(path) {
    this.router.navigate([path]);
  }
  createNewGroup() {
    this.router.navigate(['/group-admin/groups']);
  }
}
_LeaderboardPage = LeaderboardPage;
_LeaderboardPage.ɵfac = function LeaderboardPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LeaderboardPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_group_service__WEBPACK_IMPORTED_MODULE_1__.GroupService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService));
};
_LeaderboardPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _LeaderboardPage,
  selectors: [["app-leaderboard"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 19,
  vars: 3,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], ["slot", "end"], [3, "click"], ["name", "person-outline"], [1, "ion-padding"], [1, "page-header"], [4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "empty-state"], ["name", "people-outline", "size", "large", "color", "medium"], ["fill", "outline", 3, "click"], ["name", "add-outline", "slot", "start"], ["button", "", "class", "group-item", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["button", "", 1, "group-item", 3, "click"], [1, "group-content"], [1, "group-main"], [1, "group-name"], [1, "group-details"], [1, "member-count"], [1, "group-type"], [1, "group-code"], [1, "admin-info"], [1, "admin-label"], [1, "member-stats"], ["name", "chevron-forward-outline", "slot", "end", "color", "medium"]],
  template: function LeaderboardPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LeaderboardPage_Template_div_click_2_listener() {
        return ctx.navigateTo("/group-admin/dashboard");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "ion-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2)(5, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "SOTD");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "ion-buttons", 5)(10, "ion-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LeaderboardPage_Template_ion_button_click_10_listener() {
        return ctx.navigateTo("/group-admin/settings");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "ion-content", 8)(13, "div", 9)(14, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "My Groups");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, LeaderboardPage_p_16_Template, 2, 2, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, LeaderboardPage_ion_card_17_Template, 10, 0, "ion-card", 11)(18, LeaderboardPage_ion_list_18_Template, 2, 2, "ion-list", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.groupStandings.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.groupStandings.length === 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.groupStandings.length > 0);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButton, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf],
  styles: [".logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  transition: opacity 0.2s ease;\n}\n.logo-container[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n\n.football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1;\n}\n\n.logo-sotd[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\n.logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n}\n\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n  color: var(--ion-color-dark);\n}\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--ion-color-medium);\n  font-size: 16px;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 40px;\n  border-radius: 12px;\n}\n.empty-state[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 40px 24px;\n}\n.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  opacity: 0.6;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n  color: var(--ion-color-dark);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 24px 0;\n  color: var(--ion-color-medium);\n  font-size: 16px;\n  line-height: 1.5;\n}\n\n.group-item[_ngcontent-%COMP%] {\n  --border-radius: 12px;\n  --background: white;\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  margin-bottom: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  transition: all 0.2s ease;\n}\n.group-item[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\n  transform: translateY(-1px);\n}\n.group-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.group-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  gap: 16px;\n}\n\n.group-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.group-name[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n  color: var(--ion-color-dark);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.group-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 4px;\n}\n\n.member-count[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n}\n\n.group-type[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 4px 8px;\n  border-radius: 6px;\n  background: var(--ion-color-light);\n  color: var(--ion-color-medium);\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.group-type.prize[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n  color: white;\n}\n\n.group-code[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-medium);\n  margin: 0;\n  font-family: \"Courier New\", monospace;\n  font-weight: 500;\n}\n\n.admin-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  min-width: 80px;\n}\n\n.admin-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-primary);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px;\n}\n\n.member-stats[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlYWRlcmJvYXJkLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsNkJBQUE7QUFBRjtBQUVFO0VBQ0UsWUFBQTtBQUFKOztBQUlBO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBREY7O0FBS0E7RUFDRSxtQkFBQTtBQUZGO0FBSUU7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLDRCQUFBO0FBRko7QUFLRTtFQUNFLFNBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QUFISjs7QUFRQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUxGO0FBT0U7RUFDRSxrQkFBQTtBQUxKO0FBUUU7RUFDRSxtQkFBQTtFQUNBLFlBQUE7QUFOSjtBQVNFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSw0QkFBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBUko7O0FBYUE7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlDQUFBO0VBQ0EseUJBQUE7QUFWRjtBQVlFO0VBQ0UsMENBQUE7RUFDQSwyQkFBQTtBQVZKO0FBYUU7RUFDRSxnQkFBQTtBQVhKOztBQWVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtBQVpGOztBQWVBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7QUFaRjs7QUFlQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFaRjs7QUFlQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtBQVpGOztBQWVBO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsZ0JBQUE7QUFaRjs7QUFlQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSw4QkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQVpGO0FBY0U7RUFDRSxvQ0FBQTtFQUNBLFlBQUE7QUFaSjs7QUFnQkE7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0VBQ0EscUNBQUE7RUFDQSxnQkFBQTtBQWJGOztBQWdCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBYkY7O0FBZ0JBO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFiRjs7QUFnQkE7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQkFBQTtBQWJGIiwiZmlsZSI6ImxlYWRlcmJvYXJkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEhlYWRlciBzdHlsZXNcbi5sb2dvLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlO1xuXG4gICY6aG92ZXIge1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxufVxuXG4uZm9vdGJhbGwtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLmxvZ28tdGV4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4ubG9nby1zb3RkIHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xufVxuXG4ubG9nby1zdWJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xufVxuXG4vLyBQYWdlIGhlYWRlclxuLnBhZ2UtaGVhZGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgXG4gIGgxIHtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBtYXJnaW46IDAgMCA4cHggMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB9XG4gIFxuICBwIHtcbiAgICBtYXJnaW46IDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxufVxuXG4vLyBFbXB0eSBzdGF0ZVxuLmVtcHR5LXN0YXRlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBcbiAgaW9uLWNhcmQtY29udGVudCB7XG4gICAgcGFkZGluZzogNDBweCAyNHB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgb3BhY2l0eTogMC42O1xuICB9XG4gIFxuICBoMyB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgbWFyZ2luOiAwIDAgOHB4IDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxuICBcbiAgcCB7XG4gICAgbWFyZ2luOiAwIDAgMjRweCAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgfVxufVxuXG4vLyBHcm91cCBpdGVtIHN0eWxlc1xuLmdyb3VwLWl0ZW0ge1xuICAtLWJvcmRlci1yYWRpdXM6IDEycHg7XG4gIC0tYmFja2dyb3VuZDogd2hpdGU7XG4gIC0tcGFkZGluZy1zdGFydDogMjBweDtcbiAgLS1wYWRkaW5nLWVuZDogMjBweDtcbiAgLS1wYWRkaW5nLXRvcDogMTZweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG4gIFxuICAmOmhvdmVyIHtcbiAgICBib3gtc2hhZG93OiAwIDRweCAxNnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xuICB9XG4gIFxuICAmOmxhc3QtY2hpbGQge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cbn1cblxuLmdyb3VwLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAlO1xuICBnYXA6IDE2cHg7XG59XG5cbi5ncm91cC1tYWluIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uZ3JvdXAtbmFtZSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luOiAwIDAgOHB4IDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uZ3JvdXAtZGV0YWlscyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4ubWVtYmVyLWNvdW50IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5ncm91cC10eXBlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBwYWRkaW5nOiA0cHggOHB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICBcbiAgJi5wcml6ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxufVxuXG4uZ3JvdXAtY29kZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBtYXJnaW46IDA7XG4gIGZvbnQtZmFtaWx5OiAnQ291cmllciBOZXcnLCBtb25vc3BhY2U7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5hZG1pbi1pbmZvIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtaW4td2lkdGg6IDgwcHg7XG59XG5cbi5hZG1pbi1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG59XG5cbi5tZW1iZXItc3RhdHMge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn0gIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2dyb3VwLWFkbWluL3BhZ2VzL2xlYWRlcmJvYXJkL2xlYWRlcmJvYXJkLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsNkJBQUE7QUFBRjtBQUVFO0VBQ0UsWUFBQTtBQUFKOztBQUlBO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBREY7O0FBS0E7RUFDRSxtQkFBQTtBQUZGO0FBSUU7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLDRCQUFBO0FBRko7QUFLRTtFQUNFLFNBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QUFISjs7QUFRQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUxGO0FBT0U7RUFDRSxrQkFBQTtBQUxKO0FBUUU7RUFDRSxtQkFBQTtFQUNBLFlBQUE7QUFOSjtBQVNFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSw0QkFBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBUko7O0FBYUE7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlDQUFBO0VBQ0EseUJBQUE7QUFWRjtBQVlFO0VBQ0UsMENBQUE7RUFDQSwyQkFBQTtBQVZKO0FBYUU7RUFDRSxnQkFBQTtBQVhKOztBQWVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtBQVpGOztBQWVBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7QUFaRjs7QUFlQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFaRjs7QUFlQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtBQVpGOztBQWVBO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsZ0JBQUE7QUFaRjs7QUFlQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSw4QkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQVpGO0FBY0U7RUFDRSxvQ0FBQTtFQUNBLFlBQUE7QUFaSjs7QUFnQkE7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0VBQ0EscUNBQUE7RUFDQSxnQkFBQTtBQWJGOztBQWdCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBYkY7O0FBZ0JBO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFiRjs7QUFnQkE7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQkFBQTtBQWJGO0FBQ0EsZ25NQUFnbk0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBIZWFkZXIgc3R5bGVzXG4ubG9nby1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZTtcblxuICAmOmhvdmVyIHtcbiAgICBvcGFjaXR5OiAwLjg7XG4gIH1cbn1cblxuLmZvb3RiYWxsLWljb24ge1xuICBmb250LXNpemU6IDI0cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG5cbi5sb2dvLXRleHQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBsaW5lLWhlaWdodDogMTtcbn1cblxuLmxvZ28tc290ZCB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbn1cblxuLmxvZ28tc3VidGl0bGUge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbn1cblxuLy8gUGFnZSBoZWFkZXJcbi5wYWdlLWhlYWRlciB7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIFxuICBoMSB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgbWFyZ2luOiAwIDAgOHB4IDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxuICBcbiAgcCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cbn1cblxuLy8gRW1wdHkgc3RhdGVcbi5lbXB0eS1zdGF0ZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNDBweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDQwcHggMjRweDtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAgIG9wYWNpdHk6IDAuNjtcbiAgfVxuICBcbiAgaDMge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIG1hcmdpbjogMCAwIDhweCAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIH1cbiAgXG4gIHAge1xuICAgIG1hcmdpbjogMCAwIDI0cHggMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIH1cbn1cblxuLy8gR3JvdXAgaXRlbSBzdHlsZXNcbi5ncm91cC1pdGVtIHtcbiAgLS1ib3JkZXItcmFkaXVzOiAxMnB4O1xuICAtLWJhY2tncm91bmQ6IHdoaXRlO1xuICAtLXBhZGRpbmctc3RhcnQ6IDIwcHg7XG4gIC0tcGFkZGluZy1lbmQ6IDIwcHg7XG4gIC0tcGFkZGluZy10b3A6IDE2cHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDE2cHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuICBcbiAgJjpob3ZlciB7XG4gICAgYm94LXNoYWRvdzogMCA0cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXB4KTtcbiAgfVxuICBcbiAgJjpsYXN0LWNoaWxkIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG59XG5cbi5ncm91cC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uZ3JvdXAtbWFpbiB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLmdyb3VwLW5hbWUge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbjogMCAwIDhweCAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLmdyb3VwLWRldGFpbHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cblxuLm1lbWJlci1jb3VudCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uZ3JvdXAtdHlwZSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgcGFkZGluZzogNHB4IDhweDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgXG4gICYucHJpemUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cbn1cblxuLmdyb3VwLWNvZGUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgbWFyZ2luOiAwO1xuICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uYWRtaW4taW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWluLXdpZHRoOiA4MHB4O1xufVxuXG4uYWRtaW4tbGFiZWwge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4ubWVtYmVyLXN0YXRzIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59ICJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_group-admin_pages_leaderboard_leaderboard_page_ts.js.map