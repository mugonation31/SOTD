"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_player_pages_standings_standings_page_ts"],{

/***/ 3694:
/*!********************************************************************!*\
  !*** ./src/app/platforms/player/pages/standings/standings.page.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StandingsPage: () => (/* binding */ StandingsPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_group_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/group.service */ 9699);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/auth.service */ 8010);
var _StandingsPage;









function StandingsPage_p_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", ctx_r0.groupStandings.length, " group", ctx_r0.groupStandings.length === 1 ? "" : "s", " joined");
  }
}
function StandingsPage_ion_card_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-card", 12)(1, "ion-card-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "No Groups Joined");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Join a group to see your standings!");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "ion-button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function StandingsPage_ion_card_17_Template_ion_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.navigateTo("/player/join-group"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "ion-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, " Join a Group ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}
function StandingsPage_ion_list_18_ion_item_1_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 27)(1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Your Position");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const groupStanding_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("#", groupStanding_r4.userPosition, "");
  }
}
function StandingsPage_ion_list_18_ion_item_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function StandingsPage_ion_list_18_ion_item_1_Template_ion_item_click_0_listener() {
      const groupStanding_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.viewGroupStandings(groupStanding_r4.group.id));
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
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, StandingsPage_ion_list_18_ion_item_1_div_12_Template, 5, 1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](13, "ion-icon", 26);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", groupStanding_r4.userPosition);
  }
}
function StandingsPage_ion_list_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, StandingsPage_ion_list_18_ion_item_1_Template, 14, 7, "ion-item", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.groupStandings)("ngForTrackBy", ctx_r0.trackByGroupId);
  }
}
class StandingsPage {
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
      personAddOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personAddOutline,
      chevronForwardOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronForwardOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.trophyOutline,
      arrowUpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.arrowUpOutline,
      arrowDownOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.arrowDownOutline,
      removeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.removeOutline
    });
  }
  ngOnInit() {
    var _this$authService$get;
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
    this.groupStandings = this.groupService.getUserGroupsWithStandings();
  }
  // Track by function for better performance when rendering groups
  trackByGroupId(index, item) {
    return item.group.id;
  }
  viewGroupStandings(groupId) {
    this.router.navigate(['/player/group-standings', groupId]);
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
  navigateTo(path) {
    this.router.navigate([path]);
  }
}
_StandingsPage = StandingsPage;
_StandingsPage.ɵfac = function StandingsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StandingsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_group_service__WEBPACK_IMPORTED_MODULE_1__.GroupService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService));
};
_StandingsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _StandingsPage,
  selectors: [["app-standings"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 19,
  vars: 3,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], ["slot", "end"], [3, "click"], ["name", "person-outline"], [1, "ion-padding"], [1, "page-header"], [4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "empty-state"], ["name", "people-outline", "size", "large", "color", "medium"], ["fill", "outline", 3, "click"], ["name", "person-add-outline", "slot", "start"], ["button", "", "class", "group-item", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["button", "", 1, "group-item", 3, "click"], [1, "group-content"], [1, "group-main"], [1, "group-name"], [1, "group-details"], [1, "member-count"], [1, "group-type"], [1, "group-code"], ["class", "user-position", 4, "ngIf"], ["name", "chevron-forward-outline", "slot", "end", "color", "medium"], [1, "user-position"], [1, "position-number"], [1, "position-label"]],
  template: function StandingsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function StandingsPage_Template_div_click_2_listener() {
        return ctx.navigateTo("/player/dashboard");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "ion-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2)(5, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "SOTD");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "ion-buttons", 5)(10, "ion-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function StandingsPage_Template_ion_button_click_10_listener() {
        return ctx.navigateTo("/player/settings");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "ion-content", 8)(13, "div", 9)(14, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "My Groups");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, StandingsPage_p_16_Template, 2, 2, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, StandingsPage_ion_card_17_Template, 10, 0, "ion-card", 11)(18, StandingsPage_ion_list_18_Template, 2, 2, "ion-list", 10);
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
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButton],
  styles: [".page-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: 2rem;\n  font-weight: 700;\n  color: var(--ion-text-color);\n  letter-spacing: -0.5px;\n}\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--ion-color-step-600);\n  font-size: 1rem;\n  font-weight: 500;\n}\n\n.empty-state[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n}\n.empty-state[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  color: var(--ion-text-color);\n}\n.empty-state[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 20px 0;\n  color: var(--ion-color-medium);\n}\n\nion-list[_ngcontent-%COMP%] {\n  background: transparent;\n}\nion-list[_ngcontent-%COMP%]   ion-item.group-item[_ngcontent-%COMP%] {\n  --background: var(--ion-background-color);\n  --border-radius: 12px;\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --min-height: 88px;\n  margin-bottom: 16px;\n  border: 1px solid var(--ion-color-light-shade);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\nion-list[_ngcontent-%COMP%]   ion-item.group-item[_ngcontent-%COMP%]:hover {\n  --background: var(--ion-color-light-tint);\n  border-color: var(--ion-color-medium-tint);\n}\nion-list[_ngcontent-%COMP%]   ion-item.group-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.group-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  gap: 16px;\n}\n\n.group-main[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.group-main[_ngcontent-%COMP%]   .group-name[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: var(--ion-text-color);\n  line-height: 1.3;\n}\n.group-main[_ngcontent-%COMP%]   .group-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 4px;\n}\n.group-main[_ngcontent-%COMP%]   .group-details[_ngcontent-%COMP%]   .member-count[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--ion-color-medium);\n}\n.group-main[_ngcontent-%COMP%]   .group-details[_ngcontent-%COMP%]   .group-type[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  padding: 4px 10px;\n  border-radius: 16px;\n  font-weight: 600;\n  background: var(--ion-color-light);\n  color: var(--ion-color-dark);\n  border: 1px solid var(--ion-color-medium-tint);\n}\n.group-main[_ngcontent-%COMP%]   .group-details[_ngcontent-%COMP%]   .group-type.prize[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n  color: white;\n  border: 1px solid var(--ion-color-primary-shade);\n}\n.group-main[_ngcontent-%COMP%]   .group-code[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  color: var(--ion-color-step-600);\n  font-family: \"SF Mono\", Consolas, \"Liberation Mono\", Menlo, monospace;\n  font-weight: 500;\n  background: var(--ion-color-light);\n  padding: 2px 8px;\n  border-radius: 6px;\n  display: inline-block;\n}\n\n.user-position[_ngcontent-%COMP%] {\n  text-align: center;\n  min-width: 60px;\n}\n.user-position[_ngcontent-%COMP%]   .position-number[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 700;\n  color: var(--ion-color-primary);\n  line-height: 1;\n  display: block;\n}\n.user-position[_ngcontent-%COMP%]   .position-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--ion-color-step-600);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  font-weight: 500;\n  margin-top: 2px;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  cursor: pointer;\n}\n.logo-container[_ngcontent-%COMP%]   .football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1;\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-sotd[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n}\n\nion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  height: 36px;\n}\nion-buttons[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--ion-color-medium);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YW5kaW5ncy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FBREY7QUFHRTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSxzQkFBQTtBQURKO0FBSUU7RUFDRSxTQUFBO0VBQ0EsZ0NBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFGSjs7QUFPRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7QUFKSjtBQU1JO0VBQ0UsbUJBQUE7QUFKTjtBQU9JO0VBQ0UsaUJBQUE7RUFDQSw0QkFBQTtBQUxOO0FBUUk7RUFDRSxrQkFBQTtFQUNBLDhCQUFBO0FBTk47O0FBV0E7RUFDRSx1QkFBQTtBQVJGO0FBVUU7RUFDRSx5Q0FBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSw4Q0FBQTtFQUNBLHdDQUFBO0FBUko7QUFVSTtFQUNFLHlDQUFBO0VBQ0EsMENBQUE7QUFSTjtBQVdJO0VBQ0UsZ0JBQUE7QUFUTjs7QUFjQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7QUFYRjs7QUFjQTtFQUNFLE9BQUE7QUFYRjtBQWFFO0VBQ0UsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQkFBQTtBQVhKO0FBY0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUFaSjtBQWNJO0VBQ0Usa0JBQUE7RUFDQSw4QkFBQTtBQVpOO0FBZUk7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtDQUFBO0VBQ0EsNEJBQUE7RUFDQSw4Q0FBQTtBQWJOO0FBZU07RUFDRSxvQ0FBQTtFQUNBLFlBQUE7RUFDQSxnREFBQTtBQWJSO0FBa0JFO0VBQ0UsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxxRUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7QUFoQko7O0FBb0JBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0FBakJGO0FBbUJFO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7QUFqQko7QUFvQkU7RUFDRSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQWxCSjs7QUF5QkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBdEJGO0FBd0JFO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0FBdEJKO0FBeUJFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtBQXZCSjtBQXlCSTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBdkJOO0FBMEJJO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBeEJOOztBQThCRTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBM0JKO0FBOEJFO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBNUJKIiwiZmlsZSI6InN0YW5kaW5ncy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDbGVhbiBHcm91cHMgTGlzdCBTdHlsZXNcclxuXHJcbi5wYWdlLWhlYWRlciB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDMycHg7XHJcbiAgXHJcbiAgaDEge1xyXG4gICAgbWFyZ2luOiAwIDAgMTJweCAwO1xyXG4gICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvcik7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogLTAuNXB4O1xyXG4gIH1cclxuICBcclxuICBwIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3RlcC02MDApO1xyXG4gICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICB9XHJcbn1cclxuXHJcbi5lbXB0eS1zdGF0ZSB7XHJcbiAgaW9uLWNhcmQtY29udGVudCB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiA0MHB4IDIwcHg7XHJcbiAgICBcclxuICAgIGlvbi1pY29uIHtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaDMge1xyXG4gICAgICBtYXJnaW46IDAgMCA4cHggMDtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcCB7XHJcbiAgICAgIG1hcmdpbjogMCAwIDIwcHggMDtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuaW9uLWxpc3Qge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIFxyXG4gIGlvbi1pdGVtLmdyb3VwLWl0ZW0ge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tYmFja2dyb3VuZC1jb2xvcik7XHJcbiAgICAtLWJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDIwcHg7XHJcbiAgICAtLXBhZGRpbmctZW5kOiAyMHB4O1xyXG4gICAgLS1taW4taGVpZ2h0OiA4OHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtdGludCk7XHJcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS10aW50KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5ncm91cC1jb250ZW50IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGdhcDogMTZweDtcclxufVxyXG5cclxuLmdyb3VwLW1haW4ge1xyXG4gIGZsZXg6IDE7XHJcbiAgXHJcbiAgLmdyb3VwLW5hbWUge1xyXG4gICAgbWFyZ2luOiAwIDAgOHB4IDA7XHJcbiAgICBmb250LXNpemU6IDEuMnJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IpO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuMztcclxuICB9XHJcbiAgXHJcbiAgLmdyb3VwLWRldGFpbHMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDEycHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA0cHg7XHJcbiAgICBcclxuICAgIC5tZW1iZXItY291bnQge1xyXG4gICAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmdyb3VwLXR5cGUge1xyXG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgICAgcGFkZGluZzogNHB4IDEwcHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1tZWRpdW0tdGludCk7XHJcbiAgICAgIFxyXG4gICAgICAmLnByaXplIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAuZ3JvdXAtY29kZSB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNjAwKTtcclxuICAgIGZvbnQtZmFtaWx5OiAnU0YgTW9ubycsIENvbnNvbGFzLCAnTGliZXJhdGlvbiBNb25vJywgTWVubG8sIG1vbm9zcGFjZTtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gICAgcGFkZGluZzogMnB4IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICB9XHJcbn1cclxuXHJcbi51c2VyLXBvc2l0aW9uIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWluLXdpZHRoOiA2MHB4O1xyXG4gIFxyXG4gIC5wb3NpdGlvbi1udW1iZXIge1xyXG4gICAgZm9udC1zaXplOiAxLjZyZW07XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG4gIFxyXG4gIC5wb3NpdGlvbi1sYWJlbCB7XHJcbiAgICBmb250LXNpemU6IDAuNzVyZW07XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNjAwKTtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgbWFyZ2luLXRvcDogMnB4O1xyXG4gIH1cclxufVxyXG5cclxuLy8gQWxsIG9sZCBzdHlsZXMgcmVtb3ZlZCAtIHVzaW5nIGNsZWFuIGxpc3QgZGVzaWduXHJcblxyXG4vLyBMb2dvIFN0eWxlc1xyXG4ubG9nby1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDhweDtcclxuICBwYWRkaW5nOiA4cHggMTZweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG4gIC5mb290YmFsbC1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgfVxyXG5cclxuICAubG9nby10ZXh0IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgbGluZS1oZWlnaHQ6IDE7XHJcblxyXG4gICAgLmxvZ28tc290ZCB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgIH1cclxuXHJcbiAgICAubG9nby1zdWJ0aXRsZSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuaW9uLWJ1dHRvbnMge1xyXG4gIGlvbi1idXR0b24ge1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XHJcbiAgICAtLXBhZGRpbmctZW5kOiA4cHg7XHJcbiAgICBoZWlnaHQ6IDM2cHg7XHJcbiAgfVxyXG5cclxuICBpb24taWNvbiB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3BsYXllci9wYWdlcy9zdGFuZGluZ3Mvc3RhbmRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7QUFERjtBQUdFO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLHNCQUFBO0FBREo7QUFJRTtFQUNFLFNBQUE7RUFDQSxnQ0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQUZKOztBQU9FO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtBQUpKO0FBTUk7RUFDRSxtQkFBQTtBQUpOO0FBT0k7RUFDRSxpQkFBQTtFQUNBLDRCQUFBO0FBTE47QUFRSTtFQUNFLGtCQUFBO0VBQ0EsOEJBQUE7QUFOTjs7QUFXQTtFQUNFLHVCQUFBO0FBUkY7QUFVRTtFQUNFLHlDQUFBO0VBQ0EscUJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLDhDQUFBO0VBQ0Esd0NBQUE7QUFSSjtBQVVJO0VBQ0UseUNBQUE7RUFDQSwwQ0FBQTtBQVJOO0FBV0k7RUFDRSxnQkFBQTtBQVROOztBQWNBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtBQVhGOztBQWNBO0VBQ0UsT0FBQTtBQVhGO0FBYUU7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGdCQUFBO0FBWEo7QUFjRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtBQVpKO0FBY0k7RUFDRSxrQkFBQTtFQUNBLDhCQUFBO0FBWk47QUFlSTtFQUNFLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0NBQUE7RUFDQSw0QkFBQTtFQUNBLDhDQUFBO0FBYk47QUFlTTtFQUNFLG9DQUFBO0VBQ0EsWUFBQTtFQUNBLGdEQUFBO0FBYlI7QUFrQkU7RUFDRSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQ0FBQTtFQUNBLHFFQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtBQWhCSjs7QUFvQkE7RUFDRSxrQkFBQTtFQUNBLGVBQUE7QUFqQkY7QUFtQkU7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtBQWpCSjtBQW9CRTtFQUNFLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBbEJKOztBQXlCQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUF0QkY7QUF3QkU7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUF0Qko7QUF5QkU7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FBdkJKO0FBeUJJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUF2Qk47QUEwQkk7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUF4Qk47O0FBOEJFO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUEzQko7QUE4QkU7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUE1Qko7QUFDQSw0M09BQTQzTyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENsZWFuIEdyb3VwcyBMaXN0IFN0eWxlc1xyXG5cclxuLnBhZ2UtaGVhZGVyIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcclxuICBcclxuICBoMSB7XHJcbiAgICBtYXJnaW46IDAgMCAxMnB4IDA7XHJcbiAgICBmb250LXNpemU6IDJyZW07XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yKTtcclxuICAgIGxldHRlci1zcGFjaW5nOiAtMC41cHg7XHJcbiAgfVxyXG4gIFxyXG4gIHAge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdGVwLTYwMCk7XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gIH1cclxufVxyXG5cclxuLmVtcHR5LXN0YXRlIHtcclxuICBpb24tY2FyZC1jb250ZW50IHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDQwcHggMjBweDtcclxuICAgIFxyXG4gICAgaW9uLWljb24ge1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoMyB7XHJcbiAgICAgIG1hcmdpbjogMCAwIDhweCAwO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwIHtcclxuICAgICAgbWFyZ2luOiAwIDAgMjBweCAwO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5pb24tbGlzdCB7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgXHJcbiAgaW9uLWl0ZW0uZ3JvdXAtaXRlbSB7XHJcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yKTtcclxuICAgIC0tYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMjBweDtcclxuICAgIC0tcGFkZGluZy1lbmQ6IDIwcHg7XHJcbiAgICAtLW1pbi1oZWlnaHQ6IDg4cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICBcclxuICAgICY6aG92ZXIge1xyXG4gICAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodC10aW50KTtcclxuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXRpbnQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmdyb3VwLWNvbnRlbnQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZ2FwOiAxNnB4O1xyXG59XHJcblxyXG4uZ3JvdXAtbWFpbiB7XHJcbiAgZmxleDogMTtcclxuICBcclxuICAuZ3JvdXAtbmFtZSB7XHJcbiAgICBtYXJnaW46IDAgMCA4cHggMDtcclxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvcik7XHJcbiAgICBsaW5lLWhlaWdodDogMS4zO1xyXG4gIH1cclxuICBcclxuICAuZ3JvdXAtZGV0YWlscyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMTJweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDRweDtcclxuICAgIFxyXG4gICAgLm1lbWJlci1jb3VudCB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuZ3JvdXAtdHlwZSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG4gICAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLW1lZGl1bS10aW50KTtcclxuICAgICAgXHJcbiAgICAgICYucHJpemUge1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC5ncm91cC1jb2RlIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3RlcC02MDApO1xyXG4gICAgZm9udC1mYW1pbHk6ICdTRiBNb25vJywgQ29uc29sYXMsICdMaWJlcmF0aW9uIE1vbm8nLCBNZW5sbywgbW9ub3NwYWNlO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgICBwYWRkaW5nOiAycHggOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIH1cclxufVxyXG5cclxuLnVzZXItcG9zaXRpb24ge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtaW4td2lkdGg6IDYwcHg7XHJcbiAgXHJcbiAgLnBvc2l0aW9uLW51bWJlciB7XHJcbiAgICBmb250LXNpemU6IDEuNnJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgbGluZS1oZWlnaHQ6IDE7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcbiAgXHJcbiAgLnBvc2l0aW9uLWxhYmVsIHtcclxuICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3RlcC02MDApO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBtYXJnaW4tdG9wOiAycHg7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBBbGwgb2xkIHN0eWxlcyByZW1vdmVkIC0gdXNpbmcgY2xlYW4gbGlzdCBkZXNpZ25cclxuXHJcbi8vIExvZ28gU3R5bGVzXHJcbi5sb2dvLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG4gIHBhZGRpbmc6IDhweCAxNnB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuXHJcbiAgLmZvb3RiYWxsLWljb24ge1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICB9XHJcblxyXG4gIC5sb2dvLXRleHQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBsaW5lLWhlaWdodDogMTtcclxuXHJcbiAgICAubG9nby1zb3RkIHtcclxuICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgfVxyXG5cclxuICAgIC5sb2dvLXN1YnRpdGxlIHtcclxuICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5pb24tYnV0dG9ucyB7XHJcbiAgaW9uLWJ1dHRvbiB7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcclxuICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcclxuICAgIGhlaWdodDogMzZweDtcclxuICB9XHJcblxyXG4gIGlvbi1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_player_pages_standings_standings_page_ts.js.map