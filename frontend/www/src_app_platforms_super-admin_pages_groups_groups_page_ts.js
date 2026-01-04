"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_super-admin_pages_groups_groups_page_ts"],{

/***/ 2904:
/*!*******************************************************************!*\
  !*** ./src/app/platforms/super-admin/pages/groups/groups.page.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupsPage: () => (/* binding */ GroupsPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _users_users_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../users/users.page */ 7106);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/toast.service */ 5423);

var _GroupsPage;









function GroupsPage_div_14_ion_card_45_div_45_ion_chip_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-chip", 50)(1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const alert_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](alert_r4);
  }
}
function GroupsPage_div_14_ion_card_45_div_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 47)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Alerts ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, GroupsPage_div_14_ion_card_45_div_45_ion_chip_5_Template, 3, 1, "ion-chip", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", group_r5.health.alerts);
  }
}
function GroupsPage_div_14_ion_card_45_div_46_ion_chip_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-chip", 55)(1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const risk_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](risk_r6);
  }
}
function GroupsPage_div_14_ion_card_45_div_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 51)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-icon", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Risk Factors ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, GroupsPage_div_14_ion_card_45_div_46_ion_chip_5_Template, 3, 1, "ion-chip", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", group_r5.lifecycle.riskFactors);
  }
}
function GroupsPage_div_14_ion_card_45_ion_button_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-button", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_div_14_ion_card_45_ion_button_50_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);
      const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.sendGroupAlert(group_r5, "Performance Check"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function GroupsPage_div_14_ion_card_45_ion_button_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-button", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_div_14_ion_card_45_ion_button_51_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r8);
      const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.scheduleIntervention(group_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function GroupsPage_div_14_ion_card_45_ion_button_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_div_14_ion_card_45_ion_button_52_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9);
      const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.boostGroup(group_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function GroupsPage_div_14_ion_card_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-card", 20)(1, "ion-card-header")(2, "div", 21)(3, "div", 22)(4, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-badge", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "ion-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "ion-card-content")(13, "div", 27)(14, "div", 28)(15, "ion-badge", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](17, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "ion-badge", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](20, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 30)(22, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](24, "ion-progress-bar", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "div", 32)(26, "div", 33)(27, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](28, "ion-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](32, "ion-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "div", 33)(36, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](37, "ion-icon", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](40, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](42, "ion-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](45, GroupsPage_div_14_ion_card_45_div_45_Template, 6, 1, "div", 39)(46, GroupsPage_div_14_ion_card_45_div_46_Template, 6, 1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](47, "div", 41)(48, "ion-button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_div_14_ion_card_45_Template_ion_button_click_48_listener() {
      const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.viewGroupDetails(group_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](49, "ion-icon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](50, GroupsPage_div_14_ion_card_45_ion_button_50_Template, 2, 0, "ion-button", 44)(51, GroupsPage_div_14_ion_card_45_ion_button_51_Template, 2, 0, "ion-button", 45)(52, GroupsPage_div_14_ion_card_45_ion_button_52_Template, 2, 0, "ion-button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const group_r5 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassMap"]("health-" + group_r5.health.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](group_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](group_r5.code);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", ctx_r1.getHealthIcon(group_r5.health.status))("color", ctx_r1.getHealthStatusColor(group_r5.health.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", group_r5.health.score, "/100");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("color", ctx_r1.getHealthStatusColor(group_r5.health.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](17, 25, group_r5.health.status), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("color", ctx_r1.getActivityLevelColor(group_r5.health.activityLevel));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](20, 27, group_r5.health.activityLevel), " Activity ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", group_r5.health.engagementRate, "% Engagement");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", group_r5.health.engagementRate / 100)("color", ctx_r1.getHealthStatusColor(group_r5.health.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", group_r5.memberCount, " Members");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", group_r5.performance.predictionAccuracy, "% Accuracy");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", ctx_r1.getGrowthTrendIcon(group_r5.performance.growthTrend))("color", ctx_r1.getGrowthTrendColor(group_r5.performance.growthTrend));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](40, 29, group_r5.performance.growthTrend), " Trend");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r1.formatDaysActive(group_r5.lifecycle.daysActive), " Active");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", group_r5.health.alerts.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", group_r5.lifecycle.riskFactors.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", group_r5.health.status === "fair" || group_r5.health.status === "poor");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", group_r5.health.status === "poor" || group_r5.health.status === "critical");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", group_r5.health.status === "excellent" || group_r5.health.status === "good");
  }
}
function GroupsPage_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 7)(2, "ion-card")(3, "ion-card-header")(4, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Platform Health Overview");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-card-content")(7, "div", 8)(8, "div", 9)(9, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "ion-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 12)(12, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "Average Group Health");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 9)(17, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](18, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 12)(20, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Total Active Users");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "div", 9)(25, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](26, "ion-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "div", 12)(28, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, "Groups Need Attention");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "div", 9)(33, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](34, "ion-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "div", 12)(36, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39, "High Performing Groups");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "div", 16)(41, "ion-card")(42, "ion-card-content")(43, "ion-searchbar", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function GroupsPage_div_14_Template_ion_searchbar_ngModelChange_43_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSearchTerm, $event) || (ctx_r1.groupSearchTerm = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ionInput", function GroupsPage_div_14_Template_ion_searchbar_ionInput_43_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.filterGroups());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](45, GroupsPage_div_14_ion_card_45_Template, 53, 31, "ion-card", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r1.getAverageGroupHealth(), "/100");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.getTotalActiveUsers());
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.getGroupsNeedingAttention().length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.getHighPerformingGroups().length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSearchTerm);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r1.filteredGroups);
  }
}
function GroupsPage_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-users", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("embedded", true);
  }
}
function GroupsPage_ng_template_17_ion_content_7_ion_item_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-item")(1, "ion-label")(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, " Role: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "ion-badge", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](12, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "ion-button", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_ng_template_17_ion_content_7_ion_item_61_Template_ion_button_click_13_listener() {
      const member_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.overrideAccess(member_r12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "ion-icon", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "ion-button", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_ng_template_17_ion_content_7_ion_item_61_Template_ion_button_click_15_listener() {
      const member_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.removeMember(member_r12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "ion-icon", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const member_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](member_r12.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](member_r12.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](member_r12.role);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Joined: ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](12, 4, member_r12.joinedAt), "");
  }
}
function GroupsPage_ng_template_17_ion_content_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-content", 3)(1, "ion-card")(2, "ion-card-header")(3, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Health Summary");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ion-card-content")(6, "div", 67)(7, "div", 68)(8, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Health Score:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 68)(13, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Status:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "ion-badge", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](17, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 68)(19, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Engagement Rate:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "div", 68)(24, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Last Activity:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](28, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "ion-card")(30, "ion-card-header")(31, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, "Performance Analytics");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "ion-card-content")(34, "div", 71)(35, "div", 9)(36, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37, "Prediction Accuracy:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "div", 9)(41, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](42, "Member Retention:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](45, "div", 9)(46, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](47, "Weekly Active Users:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "div", 9)(51, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](52, "Predictions per Week:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](53, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](54);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](55, "ion-card")(56, "ion-card-header")(57, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](58, "Members");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](59, "ion-card-content")(60, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](61, GroupsPage_ng_template_17_ion_content_7_ion_item_61_Template, 17, 6, "ion-item", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r1.selectedGroup.health.score, "/100");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("color", ctx_r1.getHealthStatusColor(ctx_r1.selectedGroup.health.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](17, 10, ctx_r1.selectedGroup.health.status), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r1.selectedGroup.health.engagementRate, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](28, 12, ctx_r1.selectedGroup.health.lastActivity, "short"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r1.selectedGroup.performance.predictionAccuracy, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r1.selectedGroup.performance.memberRetentionRate, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.selectedGroup.performance.weeklyActiveUsers);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.selectedGroup.performance.predictionsPerWeek);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r1.selectedGroup.members);
  }
}
function GroupsPage_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-buttons", 64)(5, "ion-button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_ng_template_17_Template_ion_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.selectedGroup = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, GroupsPage_ng_template_17_ion_content_7_Template, 62, 15, "ion-content", 66);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r1.selectedGroup == null ? null : ctx_r1.selectedGroup.name, " - Health Analysis");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.selectedGroup);
  }
}
class GroupsPage {
  constructor(toastService) {
    this.toastService = toastService;
    this.activeTab = 'groups';
    this.groupSearchTerm = '';
    this.filteredGroups = [];
    this.groups = [];
    this.selectedGroup = null;
    (0,ionicons__WEBPACK_IMPORTED_MODULE_5__.a)({
      eyeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.eyeOutline,
      trashOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.trashOutline,
      shieldOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.shieldOutline,
      warningOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.warningOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.checkmarkCircleOutline,
      alertCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.alertCircleOutline,
      trendingUpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.trendingUpOutline,
      trendingDownOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.trendingDownOutline,
      pulseOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.pulseOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.timeOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.peopleOutline,
      statsChartOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.statsChartOutline,
      medicalOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.medicalOutline,
      flashOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.flashOutline,
      sparklesOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_2__.sparklesOutline
    });
    this.loadMockGroups();
  }
  loadMockGroups() {
    this.groups = [{
      id: '1',
      name: 'Premier League A',
      code: 'PLA2024',
      adminName: 'John Admin',
      memberCount: 12,
      createdAt: new Date('2024-01-01'),
      members: [{
        id: '1',
        name: 'Player One',
        email: 'player1@example.com',
        joinedAt: new Date('2024-01-15'),
        status: 'active',
        role: 'player'
      }
      // ... more mock members
      ],
      health: {
        score: 95,
        status: 'excellent',
        activityLevel: 'very-high',
        engagementRate: 98,
        lastActivity: new Date('2024-03-20'),
        alerts: []
      },
      performance: {
        predictionAccuracy: 92,
        memberRetentionRate: 95,
        growthTrend: 'increasing',
        averageSessionDuration: 15,
        jokerUsageRate: 85,
        weeklyActiveUsers: 12,
        predictionsPerWeek: 100
      },
      lifecycle: {
        daysActive: 80,
        membershipTrend: [{
          week: '2024-03-10',
          count: 10
        }, {
          week: '2024-03-17',
          count: 12
        }, {
          week: '2024-03-24',
          count: 15
        }],
        peakMembership: 15,
        currentPhase: 'growth',
        riskFactors: []
      }
    }, {
      id: '2',
      name: 'Championship United',
      code: 'CHU2024',
      adminName: 'Sarah Manager',
      memberCount: 8,
      createdAt: new Date('2024-02-01'),
      members: [],
      health: {
        score: 82,
        status: 'good',
        activityLevel: 'high',
        engagementRate: 85,
        lastActivity: new Date('2024-03-19'),
        alerts: []
      },
      performance: {
        predictionAccuracy: 78,
        memberRetentionRate: 88,
        growthTrend: 'stable',
        averageSessionDuration: 12,
        jokerUsageRate: 75,
        weeklyActiveUsers: 7,
        predictionsPerWeek: 65
      },
      lifecycle: {
        daysActive: 48,
        membershipTrend: [{
          week: '2024-03-10',
          count: 8
        }, {
          week: '2024-03-17',
          count: 8
        }, {
          week: '2024-03-24',
          count: 8
        }],
        peakMembership: 10,
        currentPhase: 'stable',
        riskFactors: ['Low growth rate']
      }
    }, {
      id: '3',
      name: 'Football Friends',
      code: 'FF2024',
      adminName: 'Mike Captain',
      memberCount: 15,
      createdAt: new Date('2024-01-15'),
      members: [],
      health: {
        score: 68,
        status: 'fair',
        activityLevel: 'medium',
        engagementRate: 72,
        lastActivity: new Date('2024-03-18'),
        alerts: ['Declining activity detected']
      },
      performance: {
        predictionAccuracy: 65,
        memberRetentionRate: 78,
        growthTrend: 'decreasing',
        averageSessionDuration: 8,
        jokerUsageRate: 60,
        weeklyActiveUsers: 9,
        predictionsPerWeek: 45
      },
      lifecycle: {
        daysActive: 65,
        membershipTrend: [{
          week: '2024-03-10',
          count: 18
        }, {
          week: '2024-03-17',
          count: 16
        }, {
          week: '2024-03-24',
          count: 15
        }],
        peakMembership: 20,
        currentPhase: 'decline',
        riskFactors: ['Member attrition', 'Low prediction accuracy']
      }
    }, {
      id: '4',
      name: 'Weekend Warriors',
      code: 'WW2024',
      adminName: 'Lisa Coach',
      memberCount: 6,
      createdAt: new Date('2024-03-01'),
      members: [],
      health: {
        score: 45,
        status: 'poor',
        activityLevel: 'low',
        engagementRate: 45,
        lastActivity: new Date('2024-03-16'),
        alerts: ['Low engagement warning', 'Admin inactive for 4 days']
      },
      performance: {
        predictionAccuracy: 52,
        memberRetentionRate: 60,
        growthTrend: 'decreasing',
        averageSessionDuration: 5,
        jokerUsageRate: 35,
        weeklyActiveUsers: 3,
        predictionsPerWeek: 18
      },
      lifecycle: {
        daysActive: 20,
        membershipTrend: [{
          week: '2024-03-10',
          count: 8
        }, {
          week: '2024-03-17',
          count: 7
        }, {
          week: '2024-03-24',
          count: 6
        }],
        peakMembership: 10,
        currentPhase: 'decline',
        riskFactors: ['Admin disengagement', 'Low prediction quality', 'Member exodus']
      }
    }, {
      id: '5',
      name: 'Goal Diggers',
      code: 'GD2024',
      adminName: 'Tom Leader',
      memberCount: 3,
      createdAt: new Date('2024-02-20'),
      members: [],
      health: {
        score: 25,
        status: 'critical',
        activityLevel: 'very-low',
        engagementRate: 25,
        lastActivity: new Date('2024-03-12'),
        alerts: ['Group at risk of disbandment', 'No predictions in 7 days', 'Admin absent for 8 days']
      },
      performance: {
        predictionAccuracy: 38,
        memberRetentionRate: 30,
        growthTrend: 'decreasing',
        averageSessionDuration: 2,
        jokerUsageRate: 15,
        weeklyActiveUsers: 1,
        predictionsPerWeek: 5
      },
      lifecycle: {
        daysActive: 30,
        membershipTrend: [{
          week: '2024-03-10',
          count: 7
        }, {
          week: '2024-03-17',
          count: 5
        }, {
          week: '2024-03-24',
          count: 3
        }],
        peakMembership: 12,
        currentPhase: 'decline',
        riskFactors: ['Critical member loss', 'Admin abandonment', 'Zero engagement', 'Imminent disbandment']
      }
    }];
    this.filterGroups();
  }
  filterGroups() {
    let filtered = [...this.groups];
    if (this.groupSearchTerm) {
      const term = this.groupSearchTerm.toLowerCase();
      filtered = filtered.filter(group => group.name.toLowerCase().includes(term) || group.code.toLowerCase().includes(term) || group.adminName.toLowerCase().includes(term));
    }
    this.filteredGroups = filtered;
  }
  viewGroupDetails(group) {
    this.selectedGroup = group;
  }
  deleteGroup(group) {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (confirm(`Are you sure you want to delete group ${group.name}?`)) {
        try {
          _this.groups = _this.groups.filter(g => g.id !== group.id);
          _this.filterGroups();
          yield _this.toastService.showToast('Group deleted successfully', 'success');
        } catch (error) {
          yield _this.toastService.showToast('Error deleting group', 'error');
        }
      }
    })();
  }
  overrideAccess(member) {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (confirm(`Are you sure you want to override access for ${member.name}?`)) {
        try {
          member.role = member.role === 'admin' ? 'player' : 'admin';
          yield _this2.toastService.showToast(`Member role updated to ${member.role}`, 'success');
        } catch (error) {
          yield _this2.toastService.showToast('Error updating member role', 'error');
        }
      }
    })();
  }
  removeMember(member) {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (confirm(`Are you sure you want to remove ${member.name}?`)) {
        try {
          if (_this3.selectedGroup) {
            _this3.selectedGroup.members = _this3.selectedGroup.members.filter(m => m.id !== member.id);
            _this3.selectedGroup.memberCount--;
          }
          yield _this3.toastService.showToast('Member removed successfully', 'success');
        } catch (error) {
          yield _this3.toastService.showToast('Error removing member', 'error');
        }
      }
    })();
  }
  // Group Health Helper Methods
  getHealthStatusColor(status) {
    switch (status) {
      case 'excellent':
        return 'success';
      case 'good':
        return 'primary';
      case 'fair':
        return 'warning';
      case 'poor':
        return 'danger';
      case 'critical':
        return 'danger';
      default:
        return 'medium';
    }
  }
  getActivityLevelColor(level) {
    switch (level) {
      case 'very-high':
        return 'success';
      case 'high':
        return 'primary';
      case 'medium':
        return 'warning';
      case 'low':
        return 'danger';
      case 'very-low':
        return 'danger';
      default:
        return 'medium';
    }
  }
  getGrowthTrendColor(trend) {
    switch (trend) {
      case 'increasing':
        return 'success';
      case 'stable':
        return 'primary';
      case 'decreasing':
        return 'danger';
      default:
        return 'medium';
    }
  }
  getGrowthTrendIcon(trend) {
    switch (trend) {
      case 'increasing':
        return 'trending-up-outline';
      case 'stable':
        return 'pulse-outline';
      case 'decreasing':
        return 'trending-down-outline';
      default:
        return 'pulse-outline';
    }
  }
  getHealthIcon(status) {
    switch (status) {
      case 'excellent':
        return 'checkmark-circle-outline';
      case 'good':
        return 'checkmark-circle-outline';
      case 'fair':
        return 'warning-outline';
      case 'poor':
        return 'alert-circle-outline';
      case 'critical':
        return 'medical-outline';
      default:
        return 'pulse-outline';
    }
  }
  // Steward Intervention Tools
  sendGroupAlert(group, alertType) {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this4.toastService.showToast(`Alert sent to ${group.name} admin: ${alertType}`, 'success');
      } catch (error) {
        yield _this4.toastService.showToast('Error sending alert', 'error');
      }
    })();
  }
  scheduleIntervention(group) {
    var _this5 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this5.toastService.showToast(`Intervention scheduled for ${group.name}`, 'success');
      } catch (error) {
        yield _this5.toastService.showToast('Error scheduling intervention', 'error');
      }
    })();
  }
  boostGroup(group) {
    var _this6 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Simulate boosting group visibility/features
        yield _this6.toastService.showToast(`${group.name} has been boosted with enhanced features`, 'success');
      } catch (error) {
        yield _this6.toastService.showToast('Error boosting group', 'error');
      }
    })();
  }
  // Group Analysis Methods
  getGroupsNeedingAttention() {
    return this.groups.filter(group => group.health.status === 'poor' || group.health.status === 'critical' || group.health.alerts.length > 0);
  }
  getHighPerformingGroups() {
    return this.groups.filter(group => group.health.status === 'excellent' && group.performance.growthTrend === 'increasing');
  }
  getAverageGroupHealth() {
    const total = this.groups.reduce((sum, group) => sum + group.health.score, 0);
    return Math.round(total / this.groups.length);
  }
  getTotalActiveUsers() {
    return this.groups.reduce((sum, group) => sum + group.performance.weeklyActiveUsers, 0);
  }
  formatDaysActive(days) {
    if (days < 7) return `${days} days`;
    const weeks = Math.floor(days / 7);
    return `${weeks} weeks`;
  }
}
_GroupsPage = GroupsPage;
_GroupsPage.ɵfac = function GroupsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GroupsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService));
};
_GroupsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _GroupsPage,
  selectors: [["app-groups"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
  decls: 18,
  vars: 4,
  consts: [["value", "groups", 3, "ngModelChange", "ngModel"], ["value", "groups"], ["value", "users"], [1, "ion-padding"], [4, "ngIf"], ["class", "users-container", 4, "ngIf"], [3, "didDismiss", "isOpen"], [1, "health-overview"], [1, "overview-metrics"], [1, "metric-item"], [1, "metric-icon"], ["name", "pulse-outline", "color", "primary"], [1, "metric-info"], ["name", "people-outline", "color", "secondary"], ["name", "warning-outline", "color", "warning"], ["name", "sparkles-outline", "color", "success"], [1, "search-filters"], ["placeholder", "Search groups...", 3, "ngModelChange", "ionInput", "ngModel"], [1, "groups-grid"], ["class", "group-card", 3, "class", 4, "ngFor", "ngForOf"], [1, "group-card"], [1, "group-header"], [1, "group-title"], ["color", "medium"], [1, "health-indicator"], [1, "health-icon", 3, "name", "color"], [1, "health-score"], [1, "health-status-bar"], [1, "status-info"], [3, "color"], [1, "engagement-rate"], [3, "value", "color"], [1, "key-metrics"], [1, "metric-row"], [1, "metric"], ["name", "people-outline", "color", "primary"], ["name", "stats-chart-outline", "color", "secondary"], [3, "name", "color"], ["name", "time-outline", "color", "tertiary"], ["class", "alerts-section", 4, "ngIf"], ["class", "risk-factors", 4, "ngIf"], [1, "steward-actions"], ["fill", "clear", "size", "small", "title", "View Details", 3, "click"], ["name", "eye-outline"], ["fill", "clear", "size", "small", "color", "warning", "title", "Send Alert", 3, "click", 4, "ngIf"], ["fill", "clear", "size", "small", "color", "danger", "title", "Schedule Intervention", 3, "click", 4, "ngIf"], ["fill", "clear", "size", "small", "color", "success", "title", "Boost Group", 3, "click", 4, "ngIf"], [1, "alerts-section"], [1, "alert-items"], ["color", "warning", 4, "ngFor", "ngForOf"], ["color", "warning"], [1, "risk-factors"], ["name", "alert-circle-outline", "color", "danger"], [1, "risk-items"], ["color", "danger", 4, "ngFor", "ngForOf"], ["color", "danger"], ["fill", "clear", "size", "small", "color", "warning", "title", "Send Alert", 3, "click"], ["name", "warning-outline"], ["fill", "clear", "size", "small", "color", "danger", "title", "Schedule Intervention", 3, "click"], ["name", "medical-outline"], ["fill", "clear", "size", "small", "color", "success", "title", "Boost Group", 3, "click"], ["name", "flash-outline"], [1, "users-container"], [3, "embedded"], ["slot", "end"], [3, "click"], ["class", "ion-padding", 4, "ngIf"], [1, "health-details"], [1, "health-metric"], [1, "label"], [1, "value"], [1, "performance-metrics"], [4, "ngFor", "ngForOf"], ["color", "primary"], ["fill", "clear", "color", "warning", "title", "Override Role", 3, "click"], ["name", "shield-outline"], ["fill", "clear", "color", "danger", "title", "Remove from Group", 3, "click"], ["name", "trash-outline"]],
  template: function GroupsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Group Health & Performance Monitoring");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-toolbar")(5, "ion-segment", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function GroupsPage_Template_ion_segment_ngModelChange_5_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.activeTab, $event) || (ctx.activeTab = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-segment-button", 1)(7, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Groups Overview");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-segment-button", 2)(10, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "User Management");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "ion-content")(13, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, GroupsPage_div_14_Template, 46, 6, "div", 4)(15, GroupsPage_div_15_Template, 2, 1, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "ion-modal", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("didDismiss", function GroupsPage_Template_ion_modal_didDismiss_16_listener() {
        return ctx.selectedGroup = null;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, GroupsPage_ng_template_17_Template, 8, 2, "ng-template");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.activeTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.activeTab === "groups");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.activeTab === "users");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("isOpen", !!ctx.selectedGroup);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonSearchbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonModal, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonSegment, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonSegmentButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonProgressBar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonChip, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_7__.TitleCasePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _users_users_page__WEBPACK_IMPORTED_MODULE_1__.UsersPage],
  styles: ["[_nghost-%COMP%]   ion-content[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n\n.users-container[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  display: block;\n}\n.users-container[_ngcontent-%COMP%]   app-users[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  width: 100%;\n}\n\n.health-overview[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.health-overview[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.health-overview[_ngcontent-%COMP%]   .overview-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\n.health-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n  background: var(--ion-color-step-50);\n  border-radius: 8px;\n  border-left: 4px solid var(--ion-color-primary);\n}\n.health-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  padding: 0.75rem;\n  border-radius: 50%;\n  background: var(--ion-color-primary-tint);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 3rem;\n  height: 3rem;\n}\n.health-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.health-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--ion-color-dark);\n}\n.health-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n}\n\n.search-filters[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.search-filters[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n}\n\n.groups-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n\n.group-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.group-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\n}\n.group-card.health-excellent[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-success);\n}\n.group-card.health-good[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-primary);\n}\n.group-card.health-fair[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-warning);\n}\n.group-card.health-poor[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-danger);\n}\n.group-card.health-critical[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-danger);\n  box-shadow: 0 0 0 2px rgba(var(--ion-color-danger-rgb), 0.2);\n}\n.group-card[_ngcontent-%COMP%]   .group-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.group-card[_ngcontent-%COMP%]   .group-header[_ngcontent-%COMP%]   .group-title[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.group-card[_ngcontent-%COMP%]   .group-header[_ngcontent-%COMP%]   .group-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.group-card[_ngcontent-%COMP%]   .group-header[_ngcontent-%COMP%]   .health-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-width: 80px;\n  justify-content: flex-end;\n}\n.group-card[_ngcontent-%COMP%]   .group-header[_ngcontent-%COMP%]   .health-indicator[_ngcontent-%COMP%]   .health-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.group-card[_ngcontent-%COMP%]   .group-header[_ngcontent-%COMP%]   .health-indicator[_ngcontent-%COMP%]   .health-score[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--ion-color-medium-shade);\n}\n.group-card[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n  background: var(--ion-color-step-50);\n  border-radius: 8px;\n}\n.group-card[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%]   .status-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 0.5rem;\n  flex-wrap: wrap;\n}\n.group-card[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%]   .engagement-rate[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.group-card[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%]   .engagement-rate[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: var(--ion-color-medium-shade);\n  min-width: 120px;\n}\n.group-card[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%]   .engagement-rate[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 6px;\n  border-radius: 3px;\n}\n.group-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.group-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n}\n.group-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.group-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  color: var(--ion-color-medium-shade);\n}\n.group-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.group-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%], \n.group-card[_ngcontent-%COMP%]   .risk-factors[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n  border-radius: 8px;\n}\n.group-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.group-card[_ngcontent-%COMP%]   .risk-factors[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-size: 0.9rem;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.group-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%]   .alert-items[_ngcontent-%COMP%], \n.group-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%]   .risk-items[_ngcontent-%COMP%], \n.group-card[_ngcontent-%COMP%]   .risk-factors[_ngcontent-%COMP%]   .alert-items[_ngcontent-%COMP%], \n.group-card[_ngcontent-%COMP%]   .risk-factors[_ngcontent-%COMP%]   .risk-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.group-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%]   .alert-items[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%], \n.group-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%]   .risk-items[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%], \n.group-card[_ngcontent-%COMP%]   .risk-factors[_ngcontent-%COMP%]   .alert-items[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%], \n.group-card[_ngcontent-%COMP%]   .risk-factors[_ngcontent-%COMP%]   .risk-items[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  height: 28px;\n}\n.group-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-warning-rgb), 0.1);\n  border: 1px solid rgba(var(--ion-color-warning-rgb), 0.2);\n}\n.group-card[_ngcontent-%COMP%]   .risk-factors[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-danger-rgb), 0.1);\n  border: 1px solid rgba(var(--ion-color-danger-rgb), 0.2);\n}\n.group-card[_ngcontent-%COMP%]   .steward-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  justify-content: flex-end;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--ion-color-light-shade);\n}\n.group-card[_ngcontent-%COMP%]   .steward-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  margin: 0;\n}\n\nion-modal[_ngcontent-%COMP%]   .health-details[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .performance-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\nion-modal[_ngcontent-%COMP%]   .health-metric[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  background: var(--ion-color-step-50);\n  border-radius: 8px;\n  border-left: 4px solid var(--ion-color-primary);\n}\nion-modal[_ngcontent-%COMP%]   .health-metric[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n  font-weight: 500;\n}\nion-modal[_ngcontent-%COMP%]   .health-metric[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\n@media (max-width: 768px) {\n  .health-overview[_ngcontent-%COMP%]   .overview-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .health-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .health-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    min-width: 2.5rem;\n    height: 2.5rem;\n  }\n  .health-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .groups-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .group-card[_ngcontent-%COMP%]   .group-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n    align-items: flex-start;\n  }\n  .group-card[_ngcontent-%COMP%]   .group-header[_ngcontent-%COMP%]   .health-indicator[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .group-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.25rem;\n    align-items: flex-start;\n  }\n  ion-modal[_ngcontent-%COMP%]   .health-details[_ngcontent-%COMP%], \n   ion-modal[_ngcontent-%COMP%]   .performance-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .group-card.health-critical[_ngcontent-%COMP%] {\n    box-shadow: 0 0 0 2px rgba(var(--ion-color-danger-rgb), 0.4);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3Vwcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxvQ0FBQTtBQUFKOztBQUlBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0FBREY7QUFHRTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQURKOztBQU1BO0VBQ0UsbUJBQUE7QUFIRjtBQUtFO0VBQ0UsU0FBQTtFQUNBLG1CQUFBO0VBQ0Esd0NBQUE7QUFISjtBQU1FO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtBQUpKO0FBT0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLG9DQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQ0FBQTtBQUxKO0FBT0k7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlDQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQUxOO0FBUUk7RUFDRSxPQUFBO0FBTk47QUFRTTtFQUNFLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBTlI7QUFTTTtFQUNFLFNBQUE7RUFDQSw4QkFBQTtFQUNBLGlCQUFBO0FBUFI7O0FBY0E7RUFDRSxtQkFBQTtBQVhGO0FBYUU7RUFDRSxTQUFBO0VBQ0EsbUJBQUE7QUFYSjs7QUFnQkE7RUFDRSxhQUFBO0VBQ0EsMkRBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUFiRjs7QUFnQkE7RUFDRSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSx3Q0FBQTtFQUNBLHFEQUFBO0FBYkY7QUFlRTtFQUNFLDJCQUFBO0VBQ0EsMENBQUE7QUFiSjtBQWlCRTtFQUNFLCtDQUFBO0FBZko7QUFrQkU7RUFDRSwrQ0FBQTtBQWhCSjtBQW1CRTtFQUNFLCtDQUFBO0FBakJKO0FBb0JFO0VBQ0UsOENBQUE7QUFsQko7QUFxQkU7RUFDRSw4Q0FBQTtFQUNBLDREQUFBO0FBbkJKO0FBc0JFO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQkFBQTtBQXBCSjtBQXNCSTtFQUNFLE9BQUE7QUFwQk47QUFzQk07RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQXBCUjtBQXdCSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUF0Qk47QUF3Qk07RUFDRSxpQkFBQTtBQXRCUjtBQXlCTTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtBQXZCUjtBQTRCRTtFQUNFLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0FBMUJKO0FBNEJJO0VBQ0UsYUFBQTtFQUNBLFdBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7QUExQk47QUE2Qkk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBM0JOO0FBNkJNO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG9DQUFBO0VBQ0EsZ0JBQUE7QUEzQlI7QUE4Qk07RUFDRSxPQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBNUJSO0FBaUNFO0VBQ0UsbUJBQUE7QUEvQko7QUFpQ0k7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxxQkFBQTtBQS9CTjtBQWlDTTtFQUNFLGdCQUFBO0FBL0JSO0FBa0NNO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7QUFoQ1I7QUFrQ1E7RUFDRSxlQUFBO0FBaENWO0FBc0NFOztFQUVFLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQXBDSjtBQXNDSTs7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBbkNOO0FBc0NJOzs7O0VBRUUsYUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FBbENOO0FBb0NNOzs7O0VBQ0UsU0FBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQS9CUjtBQW9DRTtFQUNFLG1EQUFBO0VBQ0EseURBQUE7QUFsQ0o7QUFxQ0U7RUFDRSxrREFBQTtFQUNBLHdEQUFBO0FBbkNKO0FBc0NFO0VBQ0UsYUFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0RBQUE7QUFwQ0o7QUFzQ0k7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtBQXBDTjs7QUEyQ0U7O0VBRUUsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtBQXhDSjtBQTJDRTs7RUFFRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtFQUNBLCtDQUFBO0FBekNKO0FBMkNJOztFQUNFLDhCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQXhDTjtBQTJDSTs7RUFDRSxnQkFBQTtFQUNBLDRCQUFBO0FBeENOOztBQThDQTtFQUVJO0lBQ0UsMEJBQUE7RUE1Q0o7RUErQ0U7SUFDRSxnQkFBQTtFQTdDSjtFQStDSTtJQUNFLGlCQUFBO0lBQ0EsaUJBQUE7SUFDQSxjQUFBO0VBN0NOO0VBaURNO0lBQ0UsaUJBQUE7RUEvQ1I7RUFxREE7SUFDRSwwQkFBQTtFQW5ERjtFQXVERTtJQUNFLHNCQUFBO0lBQ0EsV0FBQTtJQUNBLHVCQUFBO0VBckRKO0VBdURJO0lBQ0UsMkJBQUE7RUFyRE47RUEwREk7SUFDRSxzQkFBQTtJQUNBLFlBQUE7SUFDQSx1QkFBQTtFQXhETjtFQThERTs7SUFFRSwwQkFBQTtFQTVESjtBQUNGO0FBaUVBO0VBRUk7SUFDRSw0REFBQTtFQWhFSjtBQUNGIiwiZmlsZSI6Imdyb3Vwcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIH1cclxufVxyXG5cclxuLnVzZXJzLWNvbnRhaW5lciB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIFxyXG4gIGFwcC11c2VycyB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxufVxyXG5cclxuLy8gUGxhdGZvcm0gSGVhbHRoIE92ZXJ2aWV3XHJcbi5oZWFsdGgtb3ZlcnZpZXcge1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcblxyXG4gIGlvbi1jYXJkIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIH1cclxuXHJcbiAgLm92ZXJ2aWV3LW1ldHJpY3Mge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjAwcHgsIDFmcikpO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gIH1cclxuXHJcbiAgLm1ldHJpYy1pdGVtIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gICAgcGFkZGluZzogMXJlbTtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTUwKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG5cclxuICAgIC5tZXRyaWMtaWNvbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcclxuICAgICAgcGFkZGluZzogMC43NXJlbTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS10aW50KTtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIG1pbi13aWR0aDogM3JlbTtcclxuICAgICAgaGVpZ2h0OiAzcmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5tZXRyaWMtaW5mbyB7XHJcbiAgICAgIGZsZXg6IDE7XHJcblxyXG4gICAgICBoMyB7XHJcbiAgICAgICAgbWFyZ2luOiAwIDAgMC4yNXJlbSAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcCB7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gU2VhcmNoIGFuZCBGaWx0ZXJzXHJcbi5zZWFyY2gtZmlsdGVycyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgaW9uLWNhcmQge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICB9XHJcbn1cclxuXHJcbi8vIEdyb3VwcyBHcmlkXHJcbi5ncm91cHMtZ3JpZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDM1MHB4LCAxZnIpKTtcclxuICBnYXA6IDFyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxufVxyXG5cclxuLmdyb3VwLWNhcmQge1xyXG4gIG1hcmdpbjogMDtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2U7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xyXG4gICAgYm94LXNoYWRvdzogMCA2cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xyXG4gIH1cclxuXHJcbiAgLy8gSGVhbHRoLWJhc2VkIHN0eWxpbmdcclxuICAmLmhlYWx0aC1leGNlbGxlbnQge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgfVxyXG5cclxuICAmLmhlYWx0aC1nb29kIHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gIH1cclxuXHJcbiAgJi5oZWFsdGgtZmFpciB7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcclxuICB9XHJcblxyXG4gICYuaGVhbHRoLXBvb3Ige1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICB9XHJcblxyXG4gICYuaGVhbHRoLWNyaXRpY2FsIHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMik7XHJcbiAgfVxyXG5cclxuICAuZ3JvdXAtaGVhZGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuXHJcbiAgICAuZ3JvdXAtdGl0bGUge1xyXG4gICAgICBmbGV4OiAxO1xyXG5cclxuICAgICAgaDIge1xyXG4gICAgICAgIG1hcmdpbjogMCAwIDAuNXJlbSAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5oZWFsdGgtaW5kaWNhdG9yIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICAgIG1pbi13aWR0aDogODBweDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuXHJcbiAgICAgIC5oZWFsdGgtaWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5oZWFsdGgtc2NvcmUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuaGVhbHRoLXN0YXR1cy1iYXIge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC01MCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcblxyXG4gICAgLnN0YXR1cy1pbmZvIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgfVxyXG5cclxuICAgIC5lbmdhZ2VtZW50LXJhdGUge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBnYXA6IDAuNzVyZW07XHJcblxyXG4gICAgICBzcGFuIHtcclxuICAgICAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XHJcbiAgICAgICAgbWluLXdpZHRoOiAxMjBweDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaW9uLXByb2dyZXNzLWJhciB7XHJcbiAgICAgICAgZmxleDogMTtcclxuICAgICAgICBoZWlnaHQ6IDZweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5rZXktbWV0cmljcyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG5cclxuICAgIC5tZXRyaWMtcm93IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcblxyXG4gICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5tZXRyaWMge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBnYXA6IDAuNXJlbTtcclxuICAgICAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xyXG5cclxuICAgICAgICBpb24taWNvbiB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWxlcnRzLXNlY3Rpb24sXHJcbiAgLnJpc2stZmFjdG9ycyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgcGFkZGluZzogMC43NXJlbTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuXHJcbiAgICBoNCB7XHJcbiAgICAgIG1hcmdpbjogMCAwIDAuNXJlbSAwO1xyXG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLmFsZXJ0LWl0ZW1zLFxyXG4gICAgLnJpc2staXRlbXMge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG5cclxuICAgICAgaW9uLWNoaXAge1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgICAgICBoZWlnaHQ6IDI4cHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5hbGVydHMtc2VjdGlvbiB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDAuMSk7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDAuMik7XHJcbiAgfVxyXG5cclxuICAucmlzay1mYWN0b3JzIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjEpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMik7XHJcbiAgfVxyXG5cclxuICAuc3Rld2FyZC1hY3Rpb25zIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgICBwYWRkaW5nLXRvcDogMC41cmVtO1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XHJcblxyXG4gICAgaW9uLWJ1dHRvbiB7XHJcbiAgICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xyXG4gICAgICAtLXBhZGRpbmctZW5kOiA4cHg7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEVuaGFuY2VkIE1vZGFsIFN0eWxpbmdcclxuaW9uLW1vZGFsIHtcclxuICAuaGVhbHRoLWRldGFpbHMsXHJcbiAgLnBlcmZvcm1hbmNlLW1ldHJpY3Mge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjAwcHgsIDFmcikpO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gIH1cclxuXHJcbiAgLmhlYWx0aC1tZXRyaWMsXHJcbiAgLm1ldHJpYy1pdGVtIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMC43NXJlbTtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTUwKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG5cclxuICAgIC5sYWJlbCB7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICB9XHJcblxyXG4gICAgLnZhbHVlIHtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFJlc3BvbnNpdmUgRGVzaWduXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5oZWFsdGgtb3ZlcnZpZXcge1xyXG4gICAgLm92ZXJ2aWV3LW1ldHJpY3Mge1xyXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICAgIH1cclxuXHJcbiAgICAubWV0cmljLWl0ZW0ge1xyXG4gICAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG5cclxuICAgICAgLm1ldHJpYy1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgICAgICBtaW4td2lkdGg6IDIuNXJlbTtcclxuICAgICAgICBoZWlnaHQ6IDIuNXJlbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLm1ldHJpYy1pbmZvIHtcclxuICAgICAgICBoMyB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5ncm91cHMtZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcblxyXG4gIC5ncm91cC1jYXJkIHtcclxuICAgIC5ncm91cC1oZWFkZXIge1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBnYXA6IDAuNXJlbTtcclxuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcblxyXG4gICAgICAuaGVhbHRoLWluZGljYXRvciB7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmtleS1tZXRyaWNzIHtcclxuICAgICAgLm1ldHJpYy1yb3cge1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgZ2FwOiAwLjI1cmVtO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpb24tbW9kYWwge1xyXG4gICAgLmhlYWx0aC1kZXRhaWxzLFxyXG4gICAgLnBlcmZvcm1hbmNlLW1ldHJpY3Mge1xyXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIERhcmsgbW9kZSBzdXBwb3J0XHJcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcclxuICAuZ3JvdXAtY2FyZCB7XHJcbiAgICAmLmhlYWx0aC1jcml0aWNhbCB7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC40KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3N1cGVyLWFkbWluL3BhZ2VzL2dyb3Vwcy9ncm91cHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0Usb0NBQUE7QUFBSjs7QUFJQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtBQURGO0FBR0U7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFESjs7QUFNQTtFQUNFLG1CQUFBO0FBSEY7QUFLRTtFQUNFLFNBQUE7RUFDQSxtQkFBQTtFQUNBLHdDQUFBO0FBSEo7QUFNRTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7QUFKSjtBQU9FO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsK0NBQUE7QUFMSjtBQU9JO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5Q0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUFMTjtBQVFJO0VBQ0UsT0FBQTtBQU5OO0FBUU07RUFDRSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQU5SO0FBU007RUFDRSxTQUFBO0VBQ0EsOEJBQUE7RUFDQSxpQkFBQTtBQVBSOztBQWNBO0VBQ0UsbUJBQUE7QUFYRjtBQWFFO0VBQ0UsU0FBQTtFQUNBLG1CQUFBO0FBWEo7O0FBZ0JBO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBYkY7O0FBZ0JBO0VBQ0UsU0FBQTtFQUNBLG1CQUFBO0VBQ0Esd0NBQUE7RUFDQSxxREFBQTtBQWJGO0FBZUU7RUFDRSwyQkFBQTtFQUNBLDBDQUFBO0FBYko7QUFpQkU7RUFDRSwrQ0FBQTtBQWZKO0FBa0JFO0VBQ0UsK0NBQUE7QUFoQko7QUFtQkU7RUFDRSwrQ0FBQTtBQWpCSjtBQW9CRTtFQUNFLDhDQUFBO0FBbEJKO0FBcUJFO0VBQ0UsOENBQUE7RUFDQSw0REFBQTtBQW5CSjtBQXNCRTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7QUFwQko7QUFzQkk7RUFDRSxPQUFBO0FBcEJOO0FBc0JNO0VBQ0Usb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFwQlI7QUF3Qkk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBdEJOO0FBd0JNO0VBQ0UsaUJBQUE7QUF0QlI7QUF5Qk07RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7QUF2QlI7QUE0QkU7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtBQTFCSjtBQTRCSTtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0FBMUJOO0FBNkJJO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQTNCTjtBQTZCTTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGdCQUFBO0FBM0JSO0FBOEJNO0VBQ0UsT0FBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQTVCUjtBQWlDRTtFQUNFLG1CQUFBO0FBL0JKO0FBaUNJO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EscUJBQUE7QUEvQk47QUFpQ007RUFDRSxnQkFBQTtBQS9CUjtBQWtDTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLG9DQUFBO0FBaENSO0FBa0NRO0VBQ0UsZUFBQTtBQWhDVjtBQXNDRTs7RUFFRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFwQ0o7QUFzQ0k7O0VBQ0Usb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQW5DTjtBQXNDSTs7OztFQUVFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQWxDTjtBQW9DTTs7OztFQUNFLFNBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7QUEvQlI7QUFvQ0U7RUFDRSxtREFBQTtFQUNBLHlEQUFBO0FBbENKO0FBcUNFO0VBQ0Usa0RBQUE7RUFDQSx3REFBQTtBQW5DSjtBQXNDRTtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtEQUFBO0FBcENKO0FBc0NJO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7QUFwQ047O0FBMkNFOztFQUVFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7QUF4Q0o7QUEyQ0U7O0VBRUUsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLG9DQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQ0FBQTtBQXpDSjtBQTJDSTs7RUFDRSw4QkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUF4Q047QUEyQ0k7O0VBQ0UsZ0JBQUE7RUFDQSw0QkFBQTtBQXhDTjs7QUE4Q0E7RUFFSTtJQUNFLDBCQUFBO0VBNUNKO0VBK0NFO0lBQ0UsZ0JBQUE7RUE3Q0o7RUErQ0k7SUFDRSxpQkFBQTtJQUNBLGlCQUFBO0lBQ0EsY0FBQTtFQTdDTjtFQWlETTtJQUNFLGlCQUFBO0VBL0NSO0VBcURBO0lBQ0UsMEJBQUE7RUFuREY7RUF1REU7SUFDRSxzQkFBQTtJQUNBLFdBQUE7SUFDQSx1QkFBQTtFQXJESjtFQXVESTtJQUNFLDJCQUFBO0VBckROO0VBMERJO0lBQ0Usc0JBQUE7SUFDQSxZQUFBO0lBQ0EsdUJBQUE7RUF4RE47RUE4REU7O0lBRUUsMEJBQUE7RUE1REo7QUFDRjtBQWlFQTtFQUVJO0lBQ0UsNERBQUE7RUFoRUo7QUFDRjtBQUNBLHdtYkFBd21iIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGlvbi1jb250ZW50IHtcclxuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICB9XHJcbn1cclxuXHJcbi51c2Vycy1jb250YWluZXIge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBcclxuICBhcHAtdXNlcnMge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFBsYXRmb3JtIEhlYWx0aCBPdmVydmlld1xyXG4uaGVhbHRoLW92ZXJ2aWV3IHtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG5cclxuICBpb24tY2FyZCB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICB9XHJcblxyXG4gIC5vdmVydmlldy1tZXRyaWNzIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKTtcclxuICAgIGdhcDogMXJlbTtcclxuICB9XHJcblxyXG4gIC5tZXRyaWMtaXRlbSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMXJlbTtcclxuICAgIHBhZGRpbmc6IDFyZW07XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC01MCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuXHJcbiAgICAubWV0cmljLWljb24ge1xyXG4gICAgICBmb250LXNpemU6IDJyZW07XHJcbiAgICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktdGludCk7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICBtaW4td2lkdGg6IDNyZW07XHJcbiAgICAgIGhlaWdodDogM3JlbTtcclxuICAgIH1cclxuXHJcbiAgICAubWV0cmljLWluZm8ge1xyXG4gICAgICBmbGV4OiAxO1xyXG5cclxuICAgICAgaDMge1xyXG4gICAgICAgIG1hcmdpbjogMCAwIDAuMjVyZW0gMDtcclxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHAge1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFNlYXJjaCBhbmQgRmlsdGVyc1xyXG4uc2VhcmNoLWZpbHRlcnMge1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcblxyXG4gIGlvbi1jYXJkIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBHcm91cHMgR3JpZFxyXG4uZ3JvdXBzLWdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgzNTBweCwgMWZyKSk7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XHJcbn1cclxuXHJcbi5ncm91cC1jYXJkIHtcclxuICBtYXJnaW46IDA7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBib3gtc2hhZG93OiAwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcclxuICAgIGJveC1zaGFkb3c6IDAgNnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcclxuICB9XHJcblxyXG4gIC8vIEhlYWx0aC1iYXNlZCBzdHlsaW5nXHJcbiAgJi5oZWFsdGgtZXhjZWxsZW50IHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gIH1cclxuXHJcbiAgJi5oZWFsdGgtZ29vZCB7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICB9XHJcblxyXG4gICYuaGVhbHRoLWZhaXIge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XHJcbiAgfVxyXG5cclxuICAmLmhlYWx0aC1wb29yIHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgfVxyXG5cclxuICAmLmhlYWx0aC1jcml0aWNhbCB7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjIpO1xyXG4gIH1cclxuXHJcbiAgLmdyb3VwLWhlYWRlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcblxyXG4gICAgLmdyb3VwLXRpdGxlIHtcclxuICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgIGgyIHtcclxuICAgICAgICBtYXJnaW46IDAgMCAwLjVyZW0gMDtcclxuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuaGVhbHRoLWluZGljYXRvciB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgICBtaW4td2lkdGg6IDgwcHg7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcblxyXG4gICAgICAuaGVhbHRoLWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuaGVhbHRoLXNjb3JlIHtcclxuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmhlYWx0aC1zdGF0dXMtYmFyIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuICAgIC5zdGF0dXMtaW5mbyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIH1cclxuXHJcbiAgICAuZW5nYWdlbWVudC1yYXRlIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjc1cmVtO1xyXG5cclxuICAgICAgc3BhbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xyXG4gICAgICAgIG1pbi13aWR0aDogMTIwcHg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlvbi1wcm9ncmVzcy1iYXIge1xyXG4gICAgICAgIGZsZXg6IDE7XHJcbiAgICAgICAgaGVpZ2h0OiA2cHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAua2V5LW1ldHJpY3Mge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgICAubWV0cmljLXJvdyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG5cclxuICAgICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAubWV0cmljIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlKTtcclxuXHJcbiAgICAgICAgaW9uLWljb24ge1xyXG4gICAgICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmFsZXJ0cy1zZWN0aW9uLFxyXG4gIC5yaXNrLWZhY3RvcnMge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcblxyXG4gICAgaDQge1xyXG4gICAgICBtYXJnaW46IDAgMCAwLjVyZW0gMDtcclxuICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5hbGVydC1pdGVtcyxcclxuICAgIC5yaXNrLWl0ZW1zIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgICBnYXA6IDAuNXJlbTtcclxuXHJcbiAgICAgIGlvbi1jaGlwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWxlcnRzLXNlY3Rpb24ge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjEpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjIpO1xyXG4gIH1cclxuXHJcbiAgLnJpc2stZmFjdG9ycyB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC4xKTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjIpO1xyXG4gIH1cclxuXHJcbiAgLnN0ZXdhcmQtYWN0aW9ucyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgcGFkZGluZy10b3A6IDAuNXJlbTtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xyXG5cclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcclxuICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBFbmhhbmNlZCBNb2RhbCBTdHlsaW5nXHJcbmlvbi1tb2RhbCB7XHJcbiAgLmhlYWx0aC1kZXRhaWxzLFxyXG4gIC5wZXJmb3JtYW5jZS1tZXRyaWNzIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKTtcclxuICAgIGdhcDogMXJlbTtcclxuICB9XHJcblxyXG4gIC5oZWFsdGgtbWV0cmljLFxyXG4gIC5tZXRyaWMtaXRlbSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC01MCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuXHJcbiAgICAubGFiZWwge1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgfVxyXG5cclxuICAgIC52YWx1ZSB7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZXNwb25zaXZlIERlc2lnblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuaGVhbHRoLW92ZXJ2aWV3IHtcclxuICAgIC5vdmVydmlldy1tZXRyaWNzIHtcclxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgICB9XHJcblxyXG4gICAgLm1ldHJpYy1pdGVtIHtcclxuICAgICAgcGFkZGluZzogMC43NXJlbTtcclxuXHJcbiAgICAgIC5tZXRyaWMtaWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICAgICAgbWluLXdpZHRoOiAyLjVyZW07XHJcbiAgICAgICAgaGVpZ2h0OiAyLjVyZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5tZXRyaWMtaW5mbyB7XHJcbiAgICAgICAgaDMge1xyXG4gICAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuZ3JvdXBzLWdyaWQge1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgfVxyXG5cclxuICAuZ3JvdXAtY2FyZCB7XHJcbiAgICAuZ3JvdXAtaGVhZGVyIHtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG5cclxuICAgICAgLmhlYWx0aC1pbmRpY2F0b3Ige1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5rZXktbWV0cmljcyB7XHJcbiAgICAgIC5tZXRyaWMtcm93IHtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGdhcDogMC4yNXJlbTtcclxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW9uLW1vZGFsIHtcclxuICAgIC5oZWFsdGgtZGV0YWlscyxcclxuICAgIC5wZXJmb3JtYW5jZS1tZXRyaWNzIHtcclxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBEYXJrIG1vZGUgc3VwcG9ydFxyXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XHJcbiAgLmdyb3VwLWNhcmQge1xyXG4gICAgJi5oZWFsdGgtY3JpdGljYWwge1xyXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuNCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_super-admin_pages_groups_groups_page_ts.js.map