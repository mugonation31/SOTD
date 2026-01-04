"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_group-admin_pages_dashboard_dashboard_page_ts"],{

/***/ 5423:
/*!************************************************!*\
  !*** ./src/app/core/services/toast.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastService: () => (/* binding */ ToastService)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);

var _ToastService;


class ToastService {
  constructor(toastController) {
    this.toastController = toastController;
  }
  showToast(_x) {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (message, type = 'success', duration = 3000) {
      // Convert 'error' type to 'danger' for Ionic color scheme
      const color = type === 'error' ? 'danger' : type;
      const toast = yield _this.toastController.create({
        message,
        color,
        duration,
        position: 'bottom'
      });
      yield toast.present();
    }).apply(this, arguments);
  }
}
_ToastService = ToastService;
_ToastService.ɵfac = function ToastService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ToastService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_2__.ToastController));
};
_ToastService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _ToastService,
  factory: _ToastService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 8470:
/*!*************************************************************************!*\
  !*** ./src/app/platforms/group-admin/pages/dashboard/dashboard.page.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardPage: () => (/* binding */ DashboardPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _shared_components_user_greeting_user_greeting_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/components/user-greeting/user-greeting.component */ 5341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/toast.service */ 5423);
/* harmony import */ var _core_services_group_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/services/group.service */ 9699);

var _DashboardPage;










function DashboardPage_ion_card_53_div_7_ion_badge_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-badge", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Action Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function DashboardPage_ion_card_53_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 78)(1, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "ion-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 80)(4, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 83)(9, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, DashboardPage_ion_card_53_div_7_ion_badge_12_Template, 2, 0, "ion-badge", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const alert_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassMap"](alert_r1.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", alert_r1.type === "celebration" ? "sparkles-outline" : alert_r1.type === "member_risk" ? "warning-outline" : "alert-circle-outline")("color", ctx_r1.getPriorityColor(alert_r1.priority));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](alert_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](alert_r1.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](11, 8, alert_r1.timestamp, "short"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", alert_r1.actionRequired);
  }
}
function DashboardPage_ion_card_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-card", 74)(1, "ion-card-header")(2, "ion-card-title", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-icon", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, " Smart Community Alerts ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-card-content")(6, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, DashboardPage_ion_card_53_div_7_Template, 13, 11, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.communityAlerts);
  }
}
function DashboardPage_div_64_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, " Joker used ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function DashboardPage_div_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 87)(1, "div", 88)(2, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 91)(7, "span", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "ion-icon", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, DashboardPage_div_64_span_10_Template, 3, 0, "span", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const player_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](player_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("+", player_r3.weekPoints, " pts");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", player_r3.correctPredictions, " correct ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", player_r3.usedJoker);
  }
}
function DashboardPage_ion_card_86_div_7_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 112)(1, "ion-button", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const member_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", member_r4.recommendedAction, " ");
  }
}
function DashboardPage_ion_card_86_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 101)(1, "div", 102)(2, "div", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-badge", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 105)(8, "div", 106)(9, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Engagement");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "ion-progress-bar", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 110)(16, "div", 29)(17, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18, "Predictions");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "div", 29)(22, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, "Accuracy");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "div", 29)(27, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "Last Active");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, DashboardPage_ion_card_86_div_7_div_31_Template, 3, 1, "div", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const member_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](member_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("color", ctx_r1.getRiskLevelColor(member_r4.riskLevel));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 10, member_r4.riskLevel), " Risk ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", member_r4.engagementScore / 100)("color", member_r4.engagementScore > 80 ? "success" : member_r4.engagementScore > 60 ? "warning" : "danger");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](member_r4.engagementScore);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](member_r4.predictionsSubmitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", member_r4.averageAccuracy, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](member_r4.lastActivity);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", member_r4.recommendedAction);
  }
}
function DashboardPage_ion_card_86_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-card", 96)(1, "ion-card-header")(2, "ion-card-title", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-icon", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, " Smart Member Insights ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-card-content")(6, "div", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, DashboardPage_ion_card_86_div_7_Template, 32, 12, "div", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "ion-button", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, " View All Member Insights ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.memberInsights.slice(0, 4));
  }
}
function DashboardPage_div_94_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 114)(1, "div", 115)(2, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "ion-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "span", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 119)(9, "span", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "span", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 122);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](15, "ion-progress-bar", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const insight_r5 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](insight_r5.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", ctx_r1.getTrendIcon(insight_r5.trend))("color", insight_r5.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("color", "var(--ion-color-" + insight_r5.color + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" ", insight_r5.percentage > 0 ? "+" : "", "", insight_r5.percentage, "% ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", insight_r5.currentValue, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("vs ", insight_r5.previousValue, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](insight_r5.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", insight_r5.currentValue / 100)("color", insight_r5.color);
  }
}
function DashboardPage_div_113_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 126)(1, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function DashboardPage_div_113_div_4_Template_ion_button_click_3_listener() {
      const member_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.sendReminder(member_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "ion-icon", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const member_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](member_r7.name);
  }
}
function DashboardPage_div_113_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 123)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Yet to Submit");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, DashboardPage_div_113_div_4_Template, 5, 1, "div", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.currentGameweek.pendingMembers);
  }
}
function DashboardPage_div_175_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 139)(1, "ion-badge", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "ion-icon", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " Almost there! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function DashboardPage_div_175_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 129)(1, "div", 130)(2, "div", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "ion-progress-bar", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "span", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "ion-icon", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](16, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, DashboardPage_div_175_div_17_Template, 4, 0, "div", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const milestone_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](milestone_r8.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", milestone_r8.current, "/", milestone_r8.target, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](milestone_r8.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", milestone_r8.progress / 100)("color", milestone_r8.progress > 80 ? "success" : milestone_r8.progress > 50 ? "primary" : "warning");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", milestone_r8.progress, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Est. completion: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](16, 9, milestone_r8.estimatedCompletion, "shortDate"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", milestone_r8.progress > 90);
  }
}
class DashboardPage {
  constructor(router, toastService, groupService) {
    this.router = router;
    this.toastService = toastService;
    this.groupService = groupService;
    // Existing properties - keeping all current functionality
    this.topPerformers = [];
    this.currentGameweek = {
      number: 15,
      deadline: '2024-01-20T11:30:00',
      submittedCount: 0,
      totalMembers: 0,
      allSubmitted: false,
      pendingMembers: []
    };
    this.groupStats = {
      activeMembers: 0,
      totalMembers: 0,
      prizePool: 0,
      paidMembers: 0,
      jokersAvailable: 0,
      jokersUsed: 0,
      engagementRate: 0,
      averagePoints: 0,
      perfectScores: 0
    };
    // New Community Intelligence properties
    this.communityHealth = {
      healthScore: 85,
      engagementTrend: 'rising',
      participationRate: 87,
      retentionRate: 92,
      socialInteractionIndex: 78,
      predictionQualityScore: 83
    };
    this.memberInsights = [];
    this.communityAlerts = [];
    this.engagementInsights = [];
    this.communityMilestones = [];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_6__.a)({
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trophyOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.checkmarkCircleOutline,
      star: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.star,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.footballOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.timeOutline,
      mailOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.mailOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.peopleOutline,
      cashOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.cashOutline,
      starOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.starOutline,
      statsChartOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.statsChartOutline,
      flashOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.flashOutline,
      eyeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.eyeOutline,
      peopleCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.peopleCircleOutline,
      pulseOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.pulseOutline,
      trendingUpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trendingUpOutline,
      trendingDownOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trendingDownOutline,
      warningOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.warningOutline,
      alertCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.alertCircleOutline,
      shieldCheckmarkOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.shieldCheckmarkOutline,
      chatbubbleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.chatbubbleOutline,
      sparklesOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.sparklesOutline,
      medalOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.medalOutline
    });
  }
  ngOnInit() {
    this.loadRealGroupData();
    this.subscribeToGroupUpdates();
    // Initialize Community Intelligence data
    this.initializeCommunityIntelligence();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  loadRealGroupData() {
    const adminGroups = this.groupService.getAdminGroups();
    // Calculate real group statistics (existing functionality)
    this.calculateGroupStats(adminGroups);
    this.calculateTopPerformers(adminGroups);
    this.calculateGameweekStatus(adminGroups);
    // Calculate Community Intelligence data (new functionality)
    this.calculateCommunityHealth(adminGroups);
    this.generateMemberInsights(adminGroups);
    this.generateCommunityAlerts(adminGroups);
  }
  subscribeToGroupUpdates() {
    this.subscription = this.groupService.groups$.subscribe(() => {
      this.loadRealGroupData();
    });
  }
  calculateGroupStats(groups) {
    let totalMembers = 0;
    let activeMembers = 0;
    let prizePool = 0;
    let paidMembers = 0;
    groups.forEach(group => {
      totalMembers += group.members.length;
      activeMembers += group.members.filter(m => m.status === 'active').length;
      if (group.type === 'prize') {
        prizePool += (group.entryFee || 0) * (group.paidMembers || 0);
        paidMembers += group.paidMembers || 0;
      }
    });
    this.groupStats = {
      activeMembers,
      totalMembers,
      prizePool,
      paidMembers,
      jokersAvailable: totalMembers * 2,
      // Assuming 2 jokers per member
      jokersUsed: Math.floor(totalMembers * 0.6),
      // Mock calculation
      engagementRate: totalMembers > 0 ? Math.round(activeMembers / totalMembers * 100) : 0,
      averagePoints: 12.5,
      // Mock - would come from real leaderboard data
      perfectScores: Math.floor(totalMembers * 0.2) // Mock calculation
    };
  }
  calculateTopPerformers(groups) {
    // Extract all members from all groups and their leaderboard data
    const allPerformers = [];
    groups.forEach(group => {
      if (group.leaderboard && group.leaderboard.length > 0) {
        group.leaderboard.slice(0, 3).forEach(entry => {
          allPerformers.push({
            name: entry.name,
            weekPoints: entry.points || Math.floor(Math.random() * 20) + 10,
            correctPredictions: Math.floor(Math.random() * 3) + 1,
            usedJoker: Math.random() > 0.7
          });
        });
      }
    });
    // If no leaderboard data, create mock data from group members
    if (allPerformers.length === 0 && groups.length > 0) {
      const allMembers = groups.flatMap(group => group.members);
      allMembers.slice(0, 3).forEach(member => {
        allPerformers.push({
          name: member.name,
          weekPoints: Math.floor(Math.random() * 20) + 10,
          correctPredictions: Math.floor(Math.random() * 3) + 1,
          usedJoker: Math.random() > 0.7
        });
      });
    }
    this.topPerformers = allPerformers.slice(0, 3);
  }
  calculateGameweekStatus(groups) {
    const totalMembers = groups.reduce((sum, group) => sum + group.members.length, 0);
    const submittedCount = Math.floor(totalMembers * 0.7); // Mock calculation
    // Get pending members from all groups
    const pendingMembers = [];
    groups.forEach(group => {
      group.members.slice(0, Math.floor(group.members.length * 0.3)).forEach(member => {
        pendingMembers.push({
          id: member.id,
          name: member.name,
          email: member.email
        });
      });
    });
    this.currentGameweek = {
      number: 15,
      deadline: '2024-01-20T11:30:00',
      submittedCount,
      totalMembers,
      allSubmitted: submittedCount === totalMembers,
      pendingMembers: pendingMembers.slice(0, 4) // Limit to 4 for display
    };
  }
  sendReminder(member) {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Mock API call to send reminder
        yield new Promise(resolve => setTimeout(resolve, 1000));
        yield _this.toastService.showToast(`Reminder sent to ${member.name}`, 'success');
      } catch (error) {
        yield _this.toastService.showToast('Failed to send reminder', 'danger');
      }
    })();
  }
  // Community Intelligence Methods
  initializeCommunityIntelligence() {
    this.initializeEngagementInsights();
    this.initializeCommunityMilestones();
  }
  calculateCommunityHealth(groups) {
    const totalMembers = groups.reduce((sum, group) => sum + group.members.length, 0);
    const activeMembers = groups.reduce((sum, group) => sum + group.members.filter(m => m.status === 'active').length, 0);
    // Calculate health metrics based on real data
    const participationRate = totalMembers > 0 ? Math.round(activeMembers / totalMembers * 100) : 0;
    const engagementTrend = participationRate > 85 ? 'rising' : participationRate > 70 ? 'stable' : 'declining';
    this.communityHealth = {
      healthScore: Math.min(95, Math.max(60, participationRate + Math.floor(Math.random() * 15))),
      engagementTrend,
      participationRate,
      retentionRate: Math.min(98, participationRate + Math.floor(Math.random() * 10)),
      socialInteractionIndex: Math.floor(Math.random() * 30) + 65,
      predictionQualityScore: Math.floor(Math.random() * 20) + 75
    };
  }
  generateMemberInsights(groups) {
    const insights = [];
    groups.forEach(group => {
      group.members.slice(0, 8).forEach((member, index) => {
        const engagementScore = Math.floor(Math.random() * 40) + 60;
        const riskLevel = engagementScore < 70 ? 'high' : engagementScore < 85 ? 'medium' : 'low';
        insights.push({
          id: member.id || `member-${index}`,
          name: member.name,
          engagementScore,
          riskLevel,
          participationTrend: Math.random() > 0.7 ? 'improving' : Math.random() > 0.5 ? 'stable' : 'declining',
          lastActivity: this.getRandomLastActivity(),
          predictionsSubmitted: Math.floor(Math.random() * 15) + 10,
          averageAccuracy: Math.floor(Math.random() * 30) + 60,
          socialInteractions: Math.floor(Math.random() * 20) + 5,
          recommendedAction: riskLevel === 'high' ? 'Send engagement boost' : riskLevel === 'medium' ? 'Monitor closely' : undefined
        });
      });
    });
    this.memberInsights = insights.slice(0, 6); // Show top 6 insights
  }
  generateCommunityAlerts(groups) {
    const alerts = [];
    const now = new Date();
    // Generate sample alerts based on community health
    if (this.communityHealth.engagementTrend === 'declining') {
      alerts.push({
        id: 'alert-1',
        type: 'engagement_drop',
        priority: 'high',
        title: 'Engagement Declining',
        description: 'Community engagement has dropped 15% this week',
        actionRequired: true,
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString()
      });
    }
    // Add celebration alerts for milestones
    if (this.communityHealth.healthScore > 90) {
      alerts.push({
        id: 'alert-2',
        type: 'celebration',
        priority: 'medium',
        title: 'Community Thriving!',
        description: 'Your community health score reached 90+',
        actionRequired: false,
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString()
      });
    }
    // Add member risk alerts
    const highRiskMembers = this.memberInsights.filter(m => m.riskLevel === 'high');
    if (highRiskMembers.length > 0) {
      alerts.push({
        id: 'alert-3',
        type: 'member_risk',
        priority: 'medium',
        title: `${highRiskMembers.length} Members at Risk`,
        description: 'Some members need engagement support',
        actionRequired: true,
        memberAffected: highRiskMembers[0].name,
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString()
      });
    }
    this.communityAlerts = alerts;
  }
  initializeEngagementInsights() {
    this.engagementInsights = [{
      category: 'Prediction Submissions',
      currentValue: 87,
      previousValue: 82,
      trend: 'up',
      percentage: 6,
      description: 'Weekly submission rate improved',
      color: 'success'
    }, {
      category: 'Member Interaction',
      currentValue: 78,
      previousValue: 80,
      trend: 'down',
      percentage: -3,
      description: 'Social interactions slightly down',
      color: 'warning'
    }, {
      category: 'Accuracy Average',
      currentValue: 83,
      previousValue: 83,
      trend: 'stable',
      percentage: 0,
      description: 'Prediction quality maintained',
      color: 'medium'
    }, {
      category: 'Retention Rate',
      currentValue: 92,
      previousValue: 89,
      trend: 'up',
      percentage: 3,
      description: 'Member retention improving',
      color: 'success'
    }];
  }
  initializeCommunityMilestones() {
    this.communityMilestones = [{
      id: 'milestone-1',
      title: '100 Active Members',
      description: 'Reach 100 active participating members',
      progress: 78,
      target: 100,
      current: 78,
      estimatedCompletion: '2024-02-15'
    }, {
      id: 'milestone-2',
      title: '90% Participation Rate',
      description: 'Achieve 90% weekly participation',
      progress: 87,
      target: 90,
      current: 87,
      estimatedCompletion: '2024-01-30'
    }, {
      id: 'milestone-3',
      title: 'Community Champion',
      description: 'Maintain 95+ health score for 30 days',
      progress: 60,
      target: 30,
      current: 18,
      estimatedCompletion: '2024-02-20'
    }];
  }
  getRandomLastActivity() {
    const activities = ['2 hours ago', '5 hours ago', '1 day ago', '2 days ago', '3 days ago', '1 week ago'];
    return activities[Math.floor(Math.random() * activities.length)];
  }
  // Helper methods for Community Intelligence display
  getCommunityHealthColor() {
    if (this.communityHealth.healthScore >= 85) return 'success';
    if (this.communityHealth.healthScore >= 70) return 'warning';
    return 'danger';
  }
  getTrendIcon(trend) {
    switch (trend) {
      case 'up':
      case 'rising':
      case 'improving':
        return 'trending-up-outline';
      case 'down':
      case 'declining':
        return 'trending-down-outline';
      default:
        return 'pulse-outline';
    }
  }
  getTrendColor(trend) {
    switch (trend) {
      case 'up':
      case 'rising':
      case 'improving':
        return 'success';
      case 'down':
      case 'declining':
        return 'danger';
      default:
        return 'medium';
    }
  }
  getRiskLevelColor(riskLevel) {
    switch (riskLevel) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'medium';
    }
  }
  getPriorityColor(priority) {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'medium';
    }
  }
}
_DashboardPage = DashboardPage;
_DashboardPage.ɵfac = function DashboardPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_group_service__WEBPACK_IMPORTED_MODULE_4__.GroupService));
};
_DashboardPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _DashboardPage,
  selectors: [["app-dashboard"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
  decls: 192,
  vars: 45,
  consts: [[1, "ion-padding"], [1, "community-health-card"], [1, "section-title"], ["name", "pulse-outline"], [1, "health-overview"], [1, "health-score"], [1, "score-circle"], [1, "score-value"], [1, "score-label"], [1, "health-trend"], [3, "name", "color"], [1, "trend-label"], [1, "health-metrics"], [1, "metric-item"], [1, "metric-header"], [1, "metric-label"], [1, "metric-value"], ["color", "primary", 3, "value"], ["color", "success", 3, "value"], ["color", "secondary", 3, "value"], ["color", "tertiary", 3, "value"], ["class", "alerts-card", 4, "ngIf"], [1, "performance-card"], ["name", "trophy-outline"], [1, "top-performers"], [1, "performers-list"], ["class", "performer-item", 4, "ngFor", "ngForOf"], [1, "points-distribution"], [1, "distribution-stats"], [1, "stat-item"], [1, "value"], [1, "label"], ["expand", "block", "fill", "clear", "routerLink", "/group-admin/leaderboard"], ["class", "member-insights-card", 4, "ngIf"], [1, "engagement-insights-card"], ["name", "stats-chart-outline"], [1, "engagement-grid"], ["class", "engagement-item", 4, "ngFor", "ngForOf"], [1, "gameweek-card"], ["name", "football-outline"], [1, "deadline-info"], ["name", "time-outline"], [1, "submission-progress"], [1, "progress-header"], [1, "progress-text"], [1, "progress-bar"], [1, "progress-fill"], ["class", "pending-submissions", 4, "ngIf"], ["expand", "block", "routerLink", "/group-admin/predictions", 3, "color"], ["slot", "start", 3, "name"], [1, "stats-grid"], ["size", "12", "size-md", "6", "size-lg", "3"], [1, "stat-card"], [1, "stat-icon"], ["name", "people-outline", "color", "primary"], [1, "stat-info"], [1, "stat-value"], [1, "stat-label"], ["name", "cash-outline", "color", "success"], ["name", "star-outline", "color", "warning"], ["name", "stats-chart-outline", "color", "tertiary"], [1, "milestones-card"], ["name", "medal-outline"], [1, "milestones-grid"], ["class", "milestone-item", 4, "ngFor", "ngForOf"], [1, "actions-card"], ["name", "flash-outline"], [1, "quick-actions"], ["color", "primary", "routerLink", "/group-admin/predictions"], ["name", "football-outline", "slot", "start"], ["color", "success", "routerLink", "/group-admin/live"], ["name", "eye-outline", "slot", "start"], ["color", "warning", "routerLink", "/group-admin/groups"], ["name", "people-outline", "slot", "start"], [1, "alerts-card"], ["name", "alert-circle-outline"], [1, "alerts-list"], ["class", "alert-item", 3, "class", 4, "ngFor", "ngForOf"], [1, "alert-item"], [1, "alert-icon"], [1, "alert-content"], [1, "alert-title"], [1, "alert-description"], [1, "alert-meta"], [1, "timestamp"], ["color", "warning", "size", "small", 4, "ngIf"], ["color", "warning", "size", "small"], [1, "performer-item"], [1, "performer-info"], [1, "name"], [1, "points"], [1, "performance-details"], [1, "detail"], ["name", "checkmark-circle-outline"], ["class", "detail", 4, "ngIf"], ["name", "star"], [1, "member-insights-card"], ["name", "people-outline"], [1, "insights-grid"], ["class", "insight-card", 4, "ngFor", "ngForOf"], ["expand", "block", "fill", "clear", "routerLink", "/group-admin/members"], [1, "insight-card"], [1, "member-header"], [1, "member-name"], ["size", "small", 3, "color"], [1, "member-metrics"], [1, "metric-row"], [1, "metric-bar"], [3, "value", "color"], [1, "metric-score"], [1, "member-stats"], ["class", "member-action", 4, "ngIf"], [1, "member-action"], ["size", "small", "fill", "outline", "color", "primary"], [1, "engagement-item"], [1, "engagement-header"], [1, "category"], [1, "trend-indicator"], [1, "percentage"], [1, "engagement-value"], [1, "current-value"], [1, "previous-value"], [1, "engagement-description"], [1, "pending-submissions"], [1, "pending-list"], ["class", "pending-member", 4, "ngFor", "ngForOf"], [1, "pending-member"], ["fill", "clear", "size", "small", 3, "click"], ["name", "mail-outline", "slot", "icon-only"], [1, "milestone-item"], [1, "milestone-header"], [1, "milestone-title"], [1, "milestone-progress-text"], [1, "milestone-description"], [1, "milestone-progress"], [1, "progress-percentage"], [1, "milestone-eta"], ["name", "time-outline", "color", "medium"], ["class", "milestone-actions", 4, "ngIf"], [1, "milestone-actions"], ["color", "success", 1, "celebration-badge"], ["name", "sparkles-outline"]],
  template: function DashboardPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Community Leadership Hub");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-content", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "app-user-greeting");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-card", 1)(7, "ion-card-header")(8, "ion-card-title", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "ion-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, " Community Health Analytics ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-card-content")(12, "div", 4)(13, "div", 5)(14, "div", 6)(15, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18, "Health Score");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](20, "ion-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "span", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](23, "titlecase");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "div", 12)(25, "div", 13)(26, "div", 14)(27, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "Participation Rate");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](31, "ion-progress-bar", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "div", 13)(33, "div", 14)(34, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](35, "Retention Rate");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](37);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](38, "ion-progress-bar", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](39, "div", 13)(40, "div", 14)(41, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](42, "Social Interaction");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](43, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](44);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](45, "ion-progress-bar", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](46, "div", 13)(47, "div", 14)(48, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](49, "Prediction Quality");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](50, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](51);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](52, "ion-progress-bar", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](53, DashboardPage_ion_card_53_Template, 8, 1, "ion-card", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](54, "ion-card", 22)(55, "ion-card-header")(56, "ion-card-title", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](57, "ion-icon", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](58, " Group Performance ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](59, "ion-card-content")(60, "div", 24)(61, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](62, "Top Performers This Week");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](63, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](64, DashboardPage_div_64_Template, 11, 4, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](65, "div", 27)(66, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](67, "Points Distribution");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](68, "div", 28)(69, "div", 29)(70, "span", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](71);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](72, "span", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](73, "Avg Points");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](74, "div", 29)(75, "span", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](76);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](77, "span", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](78, "Perfect Scores");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](79, "div", 29)(80, "span", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](81);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](82, "span", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](83, "Jokers Used");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](84, "ion-button", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](85, " View Full Leaderboard ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](86, DashboardPage_ion_card_86_Template, 10, 1, "ion-card", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](87, "ion-card", 34)(88, "ion-card-header")(89, "ion-card-title", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](90, "ion-icon", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](91, " Engagement Intelligence ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](92, "ion-card-content")(93, "div", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](94, DashboardPage_div_94_Template, 16, 12, "div", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](95, "ion-card", 38)(96, "ion-card-header")(97, "ion-card-title", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](98, "ion-icon", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](99);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](100, "ion-card-subtitle", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](101, "ion-icon", 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](102);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](103, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](104, "ion-card-content")(105, "div", 42)(106, "div", 43)(107, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](108, "Prediction Submissions");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](109, "span", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](110);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](111, "div", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](112, "div", 46);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](113, DashboardPage_div_113_Template, 5, 1, "div", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](114, "ion-button", 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](115, "ion-icon", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](116);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](117, "ion-grid", 50)(118, "ion-row")(119, "ion-col", 51)(120, "ion-card", 52)(121, "ion-card-content")(122, "div", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](123, "ion-icon", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](124, "div", 55)(125, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](126, "Active Members");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](127, "p", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](128);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](129, "p", 57);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](130);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](131, "ion-col", 51)(132, "ion-card", 52)(133, "ion-card-content")(134, "div", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](135, "ion-icon", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](136, "div", 55)(137, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](138, "Prize Pool");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](139, "p", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](140);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](141, "currency");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](142, "p", 57);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](143);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](144, "ion-col", 51)(145, "ion-card", 52)(146, "ion-card-content")(147, "div", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](148, "ion-icon", 59);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](149, "div", 55)(150, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](151, "Joker Status");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](152, "p", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](153);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](154, "p", 57);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](155, "Available Jokers");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](156, "ion-col", 51)(157, "ion-card", 52)(158, "ion-card-content")(159, "div", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](160, "ion-icon", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](161, "div", 55)(162, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](163, "Engagement");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](164, "p", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](165);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](166, "p", 57);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](167, "Weekly Participation");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](168, "ion-card", 61)(169, "ion-card-header")(170, "ion-card-title", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](171, "ion-icon", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](172, " Community Milestones ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](173, "ion-card-content")(174, "div", 63);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](175, DashboardPage_div_175_Template, 18, 12, "div", 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](176, "ion-card", 65)(177, "ion-card-header")(178, "ion-card-title", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](179, "ion-icon", 66);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](180, " Quick Actions ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](181, "ion-card-content")(182, "div", 67)(183, "ion-button", 68);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](184, "ion-icon", 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](185, " MANAGE PREDICTIONS ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](186, "ion-button", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](187, "ion-icon", 71);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](188, " LIVE SCORES ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](189, "ion-button", 72);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](190, "ion-icon", 73);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](191, " MANAGE GROUP ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.communityHealth.healthScore);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", ctx.getTrendIcon(ctx.communityHealth.engagementTrend))("color", ctx.getTrendColor(ctx.communityHealth.engagementTrend));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](23, 37, ctx.communityHealth.engagementTrend));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx.communityHealth.participationRate, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.communityHealth.participationRate / 100);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx.communityHealth.retentionRate, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.communityHealth.retentionRate / 100);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx.communityHealth.socialInteractionIndex, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.communityHealth.socialInteractionIndex / 100);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx.communityHealth.predictionQualityScore, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.communityHealth.predictionQualityScore / 100);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.communityAlerts.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.topPerformers);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.groupStats.averagePoints);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.groupStats.perfectScores);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.groupStats.jokersUsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.memberInsights.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.engagementInsights);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" Gameweek ", ctx.currentGameweek.number, " Status ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" Deadline: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](103, 39, ctx.currentGameweek.deadline, "medium"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", ctx.currentGameweek.submittedCount, "/", ctx.currentGameweek.totalMembers, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("width", ctx.currentGameweek.submittedCount / ctx.currentGameweek.totalMembers * 100, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.currentGameweek.pendingMembers.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("color", ctx.currentGameweek.allSubmitted ? "success" : "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", ctx.currentGameweek.allSubmitted ? "eye-outline" : "football-outline");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx.currentGameweek.allSubmitted ? "View All Predictions" : "Manage Predictions", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.groupStats.activeMembers);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx.groupStats.totalMembers, " Total Members");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](141, 42, ctx.groupStats.prizePool, "GBP"));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", ctx.groupStats.paidMembers, "/", ctx.groupStats.totalMembers, " Paid");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.groupStats.jokersAvailable);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx.groupStats.engagementRate, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.communityMilestones);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCardSubtitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonGrid, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonRow, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCol, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonProgressBar, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_9__.DatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_9__.CurrencyPipe, _angular_common__WEBPACK_IMPORTED_MODULE_9__.TitleCasePipe, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _shared_components_user_greeting_user_greeting_component__WEBPACK_IMPORTED_MODULE_2__.UserGreetingComponent],
  styles: [".dashboard-container[_ngcontent-%COMP%] {\n  padding: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\nion-card[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  border-radius: 16px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  background: #ffffff;\n}\nion-card.performance-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-warning);\n}\nion-card.gameweek-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-primary);\n}\nion-card.actions-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-tertiary);\n}\n\nion-card-header[_ngcontent-%COMP%] {\n  padding: 16px;\n}\nion-card-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\nion-card-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n}\n\n.top-performers[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.top-performers[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  color: var(--ion-color-dark);\n  font-size: 1rem;\n  font-weight: 500;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-list[_ngcontent-%COMP%]   .performer-item[_ngcontent-%COMP%] {\n  background: var(--ion-color-light);\n  padding: 12px;\n  border-radius: 8px;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-list[_ngcontent-%COMP%]   .performer-item[_ngcontent-%COMP%]   .performer-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-list[_ngcontent-%COMP%]   .performer-item[_ngcontent-%COMP%]   .performer-info[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-list[_ngcontent-%COMP%]   .performer-item[_ngcontent-%COMP%]   .performer-info[_ngcontent-%COMP%]   .points[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n  font-weight: 600;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-list[_ngcontent-%COMP%]   .performer-item[_ngcontent-%COMP%]   .performance-details[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-list[_ngcontent-%COMP%]   .performer-item[_ngcontent-%COMP%]   .performance-details[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n}\n.top-performers[_ngcontent-%COMP%]   .performers-list[_ngcontent-%COMP%]   .performer-item[_ngcontent-%COMP%]   .performance-details[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--ion-color-success);\n}\n.top-performers[_ngcontent-%COMP%]   .performers-list[_ngcontent-%COMP%]   .performer-item[_ngcontent-%COMP%]   .performance-details[_ngcontent-%COMP%]   .detail[_ngcontent-%COMP%]   ion-icon[name=star][_ngcontent-%COMP%] {\n  color: var(--ion-color-warning);\n}\n\n.points-distribution[_ngcontent-%COMP%] {\n  background: var(--ion-color-light);\n  padding: 16px;\n  border-radius: 12px;\n  margin-bottom: 16px;\n}\n.points-distribution[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  color: var(--ion-color-dark);\n  font-size: 1rem;\n  font-weight: 500;\n}\n.points-distribution[_ngcontent-%COMP%]   .distribution-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  text-align: center;\n}\n.points-distribution[_ngcontent-%COMP%]   .distribution-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.4rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  margin-bottom: 4px;\n}\n.points-distribution[_ngcontent-%COMP%]   .distribution-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n}\n\n.deadline-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--ion-color-danger);\n  margin-top: 8px;\n  font-size: 0.9rem;\n}\n.deadline-info[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n\n.submission-progress[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.submission-progress[_ngcontent-%COMP%]   .progress-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.submission-progress[_ngcontent-%COMP%]   .progress-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.submission-progress[_ngcontent-%COMP%]   .progress-header[_ngcontent-%COMP%]   .progress-text[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-primary);\n}\n.submission-progress[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  height: 8px;\n  background: var(--ion-color-light);\n  border-radius: 4px;\n  overflow: hidden;\n}\n.submission-progress[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]   .progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--ion-color-primary);\n  border-radius: 4px;\n  transition: width 0.3s ease;\n}\n\n.pending-submissions[_ngcontent-%COMP%] {\n  background: var(--ion-color-light);\n  padding: 16px;\n  border-radius: 12px;\n  margin-bottom: 20px;\n}\n.pending-submissions[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.pending-submissions[_ngcontent-%COMP%]   .pending-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.pending-submissions[_ngcontent-%COMP%]   .pending-list[_ngcontent-%COMP%]   .pending-member[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 12px;\n  background: white;\n  border-radius: 8px;\n}\n.pending-submissions[_ngcontent-%COMP%]   .pending-list[_ngcontent-%COMP%]   .pending-member[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.pending-submissions[_ngcontent-%COMP%]   .pending-list[_ngcontent-%COMP%]   .pending-member[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n}\n\n.stats-grid[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  margin: 8px;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n  height: 100%;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background: var(--ion-color-light);\n  border-radius: 50%;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n}\n\n.quick-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.quick-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  margin: 0;\n  height: 48px;\n  --border-radius: 8px;\n}\n\n@media (max-width: 768px) {\n  .distribution-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n  .distribution-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]:last-child {\n    grid-column: span 2;\n  }\n  .stats-grid[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {\n    margin-bottom: 8px;\n  }\n}\n@media (max-width: 576px) {\n  .performer-item[_ngcontent-%COMP%]   .performance-details[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .distribution-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n    gap: 12px !important;\n  }\n  .distribution-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {\n    padding: 8px;\n    background: white;\n    border-radius: 8px;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .stat-card[_ngcontent-%COMP%], \n   .activity-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%], \n   .group-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n    background: var(--ion-color-step-100);\n  }\n}\n.community-health-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-success);\n  margin-bottom: 20px;\n}\n\n.health-overview[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.health-score[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px;\n  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\n  border-radius: 12px;\n}\n.health-score[_ngcontent-%COMP%]   .score-circle[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--ion-color-success) 0%, var(--ion-color-success-shade) 100%);\n  color: white;\n}\n.health-score[_ngcontent-%COMP%]   .score-circle[_ngcontent-%COMP%]   .score-value[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  line-height: 1;\n}\n.health-score[_ngcontent-%COMP%]   .score-circle[_ngcontent-%COMP%]   .score-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  opacity: 0.9;\n}\n.health-score[_ngcontent-%COMP%]   .health-trend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.health-score[_ngcontent-%COMP%]   .health-trend[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.health-score[_ngcontent-%COMP%]   .health-trend[_ngcontent-%COMP%]   .trend-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  text-transform: capitalize;\n}\n\n.health-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n.health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n}\n.health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-header[_ngcontent-%COMP%]   .metric-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--ion-color-dark);\n}\n.health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-header[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-primary);\n}\n.health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%] {\n  height: 8px;\n  border-radius: 4px;\n}\n\n.alerts-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-warning);\n}\n\n.alerts-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.alert-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px;\n  border-radius: 8px;\n  transition: background-color 0.2s ease;\n}\n.alert-item.celebration[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);\n}\n.alert-item.member_risk[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);\n}\n.alert-item.engagement_drop[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f8d7da 0%, #f1b0b7 100%);\n}\n.alert-item[_ngcontent-%COMP%]   .alert-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.8);\n}\n.alert-item[_ngcontent-%COMP%]   .alert-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.alert-item[_ngcontent-%COMP%]   .alert-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.alert-item[_ngcontent-%COMP%]   .alert-content[_ngcontent-%COMP%]   .alert-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  margin-bottom: 4px;\n}\n.alert-item[_ngcontent-%COMP%]   .alert-content[_ngcontent-%COMP%]   .alert-description[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n  line-height: 1.4;\n  margin-bottom: 8px;\n}\n.alert-item[_ngcontent-%COMP%]   .alert-content[_ngcontent-%COMP%]   .alert-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.alert-item[_ngcontent-%COMP%]   .alert-content[_ngcontent-%COMP%]   .alert-meta[_ngcontent-%COMP%]   .timestamp[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n}\n\n.member-insights-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-secondary);\n}\n\n.insights-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.insight-card[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: var(--ion-color-light);\n  border-radius: 12px;\n  border: 1px solid var(--ion-color-light-shade);\n}\n.insight-card[_ngcontent-%COMP%]   .member-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.insight-card[_ngcontent-%COMP%]   .member-header[_ngcontent-%COMP%]   .member-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.insight-card[_ngcontent-%COMP%]   .member-metrics[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.insight-card[_ngcontent-%COMP%]   .member-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.insight-card[_ngcontent-%COMP%]   .member-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]   .metric-label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n  min-width: 80px;\n}\n.insight-card[_ngcontent-%COMP%]   .member-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]   .metric-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.insight-card[_ngcontent-%COMP%]   .member-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]   .metric-bar[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 6px;\n  border-radius: 3px;\n}\n.insight-card[_ngcontent-%COMP%]   .member-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]   .metric-bar[_ngcontent-%COMP%]   .metric-score[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  font-size: 0.9rem;\n  min-width: 30px;\n}\n.insight-card[_ngcontent-%COMP%]   .member-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.insight-card[_ngcontent-%COMP%]   .member-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 8px;\n  background: rgba(255, 255, 255, 0.8);\n  border-radius: 6px;\n}\n.insight-card[_ngcontent-%COMP%]   .member-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: var(--ion-color-medium);\n  display: block;\n  margin-bottom: 2px;\n}\n.insight-card[_ngcontent-%COMP%]   .member-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.insight-card[_ngcontent-%COMP%]   .member-action[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.insight-card[_ngcontent-%COMP%]   .member-action[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 12px;\n  --padding-end: 12px;\n  height: 44px;\n  font-size: 0.8rem;\n}\n\n.engagement-insights-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-tertiary);\n}\n\n.engagement-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n}\n\n.engagement-item[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: var(--ion-color-light);\n  border-radius: 12px;\n  border: 1px solid var(--ion-color-light-shade);\n}\n.engagement-item[_ngcontent-%COMP%]   .engagement-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.engagement-item[_ngcontent-%COMP%]   .engagement-header[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  font-size: 0.9rem;\n}\n.engagement-item[_ngcontent-%COMP%]   .engagement-header[_ngcontent-%COMP%]   .trend-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.engagement-item[_ngcontent-%COMP%]   .engagement-header[_ngcontent-%COMP%]   .trend-indicator[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.engagement-item[_ngcontent-%COMP%]   .engagement-header[_ngcontent-%COMP%]   .trend-indicator[_ngcontent-%COMP%]   .percentage[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.engagement-item[_ngcontent-%COMP%]   .engagement-value[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.engagement-item[_ngcontent-%COMP%]   .engagement-value[_ngcontent-%COMP%]   .current-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--ion-color-dark);\n}\n.engagement-item[_ngcontent-%COMP%]   .engagement-value[_ngcontent-%COMP%]   .previous-value[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n  margin-left: 8px;\n}\n.engagement-item[_ngcontent-%COMP%]   .engagement-description[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n  margin-bottom: 12px;\n  line-height: 1.4;\n}\n.engagement-item[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%] {\n  height: 6px;\n  border-radius: 3px;\n}\n\n.milestones-card[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-warning);\n}\n\n.milestones-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 20px;\n}\n\n.milestone-item[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\n  border-radius: 12px;\n  border: 1px solid var(--ion-color-light-shade);\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 8px;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   .milestone-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  font-size: 1rem;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-header[_ngcontent-%COMP%]   .milestone-progress-text[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ion-color-primary);\n  font-weight: 600;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-description[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n  line-height: 1.4;\n  margin-bottom: 16px;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-progress[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-progress[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 8px;\n  border-radius: 4px;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-progress[_ngcontent-%COMP%]   .progress-percentage[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  min-width: 40px;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-eta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--ion-color-medium);\n  font-size: 0.8rem;\n  margin-bottom: 12px;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-eta[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-actions[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-actions[_ngcontent-%COMP%]   .celebration-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 12px;\n}\n.milestone-item[_ngcontent-%COMP%]   .milestone-actions[_ngcontent-%COMP%]   .celebration-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n\n@media (max-width: 768px) {\n  .health-overview[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n  .health-score[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    text-align: center;\n  }\n  .health-score[_ngcontent-%COMP%]   .score-circle[_ngcontent-%COMP%] {\n    width: 80px;\n    height: 80px;\n  }\n  .health-score[_ngcontent-%COMP%]   .score-circle[_ngcontent-%COMP%]   .score-value[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .health-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .insights-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .engagement-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .milestones-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .member-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 4px;\n  }\n  .alert-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n  }\n  .alert-item[_ngcontent-%COMP%]   .alert-icon[_ngcontent-%COMP%] {\n    align-self: center;\n  }\n}\n@media (max-width: 576px) {\n  .milestone-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n    align-items: flex-start;\n  }\n  .engagement-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n  }\n  .health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .milestone-progress[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .milestone-progress[_ngcontent-%COMP%]   .progress-percentage[_ngcontent-%COMP%] {\n    align-self: flex-end;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FBQUY7O0FBSUE7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMENBQUE7RUFDQSxtQkFBQTtBQURGO0FBR0U7RUFDRSwrQ0FBQTtBQURKO0FBSUU7RUFDRSwrQ0FBQTtBQUZKO0FBS0U7RUFDRSxnREFBQTtBQUhKOztBQVFBO0VBQ0UsYUFBQTtBQUxGO0FBT0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQUxKO0FBT0k7RUFDRSxpQkFBQTtBQUxOOztBQVdBO0VBQ0UsbUJBQUE7QUFSRjtBQVVFO0VBQ0Usa0JBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQVJKO0FBV0U7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBVEo7QUFXSTtFQUNFLGtDQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBVE47QUFXTTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFUUjtBQVdRO0VBQ0UsZ0JBQUE7QUFUVjtBQVlRO0VBQ0UsK0JBQUE7RUFDQSxnQkFBQTtBQVZWO0FBY007RUFDRSxhQUFBO0VBQ0EsU0FBQTtBQVpSO0FBY1E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSw4QkFBQTtBQVpWO0FBY1U7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUFaWjtBQWNZO0VBQ0UsK0JBQUE7QUFaZDs7QUFzQkE7RUFDRSxrQ0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBbkJGO0FBcUJFO0VBQ0Usa0JBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQW5CSjtBQXNCRTtFQUNFLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLFNBQUE7RUFDQSxrQkFB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RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBdEhKO0FBd0hJO0VBQ0UsaUJBQUE7QUF0SE47QUEwSEU7RUFDRSxrQkFBQTtBQXhISjtBQTBISTtFQUNFLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7QUF4SE47QUEwSE07RUFDRSxpQkFBQTtBQXhIUjs7QUErSEE7RUFDRTtJQUNFLFNBQUE7RUE1SEY7RUErSEE7SUFDRSxzQkFBQTtJQUNBLFNBQUE7SUFDQSxrQkFBQTtFQTdIRjtFQStIRTtJQUNFLFdBQUE7SUFDQSxZQUFBO0VBN0hKO0VBK0hJO0lBQ0UsaUJBQUE7RUE3SE47RUFrSUE7SUFDRSwwQkFBQTtFQWhJRjtFQW1JQTtJQUNFLDBCQUFBO0VBaklGO0VBb0lBO0lBQ0UsMEJBQUE7RUFsSUY7RUFxSUE7SUFDRSwwQkFBQTtFQW5JRjtFQXNJQTtJQUNFLDBCQUFBO0lBQ0EsUUFBQTtFQXBJRjtFQXVJQTtJQUNFLHNCQUFBO0lBQ0Esa0JBQUE7RUFySUY7RUF1SUU7SUFDRSxrQkFBQTtFQXJJSjtBQUNGO0FBeUlBO0VBQ0U7SUFDRSxzQkFBQTtJQUNBLFFBQUE7SUFDQSx1QkFBQTtFQXZJRjtFQTBJQTtJQUNFLHNCQUFBO0lBQ0EsdUJBQUE7SUFDQSxRQUFBO0VBeElGO0VBMklBO0lBQ0UsYUFBQTtFQXpJRjtFQTRJQTtJQUNFLHNCQUFBO0lBQ0EsUUFBQTtFQTFJRjtFQTRJRTtJQUNFLG9CQUFBO0VBMUlKO0FBQ0YiLCJmaWxlIjoiZGFzaGJvYXJkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERhc2hib2FyZCBMYXlvdXRcbi5kYXNoYm9hcmQtY29udGFpbmVyIHtcbiAgcGFkZGluZzogMTZweDtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4vLyBDYXJkIFN0eWxlc1xuaW9uLWNhcmQge1xuICBtYXJnaW46IDAgMCAxNnB4IDA7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcblxuICAmLnBlcmZvcm1hbmNlLWNhcmQge1xuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xuICB9XG5cbiAgJi5nYW1ld2Vlay1jYXJkIHtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gICYuYWN0aW9ucy1jYXJkIHtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG4gIH1cbn1cblxuLy8gQ2FyZCBIZWFkZXJzXG5pb24tY2FyZC1oZWFkZXIge1xuICBwYWRkaW5nOiAxNnB4O1xuXG4gIC5zZWN0aW9uLXRpdGxlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICAgIH1cbiAgfVxufVxuXG4vLyBUb3AgUGVyZm9ybWVycyBTZWN0aW9uXG4udG9wLXBlcmZvcm1lcnMge1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuXG4gIGg0IHtcbiAgICBtYXJnaW46IDAgMCAxNnB4IDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIC5wZXJmb3JtZXJzLWxpc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDEycHg7XG5cbiAgICAucGVyZm9ybWVyLWl0ZW0ge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG5cbiAgICAgIC5wZXJmb3JtZXItaW5mbyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuXG4gICAgICAgIC5uYW1lIHtcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLnBvaW50cyB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5wZXJmb3JtYW5jZS1kZXRhaWxzIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZ2FwOiAxNnB4O1xuXG4gICAgICAgIC5kZXRhaWwge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBnYXA6IDRweDtcbiAgICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG5cbiAgICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAmW25hbWU9XCJzdGFyXCJdIHtcbiAgICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gUG9pbnRzIERpc3RyaWJ1dGlvblxuLnBvaW50cy1kaXN0cmlidXRpb24ge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBwYWRkaW5nOiAxNnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuXG4gIGg0IHtcbiAgICBtYXJnaW46IDAgMCAxNnB4IDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIC5kaXN0cmlidXRpb24tc3RhdHMge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcbiAgICBnYXA6IDE2cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgLnN0YXQtaXRlbSB7XG4gICAgICAudmFsdWUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1zaXplOiAxLjRyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICAgIH1cblxuICAgICAgLmxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gR2FtZXdlZWsgU3RhdHVzXG4uZGVhZGxpbmUtaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgZm9udC1zaXplOiAwLjlyZW07XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICB9XG59XG5cbi5zdWJtaXNzaW9uLXByb2dyZXNzIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcblxuICAucHJvZ3Jlc3MtaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcblxuICAgIGg0IHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuXG4gICAgLnByb2dyZXNzLXRleHQge1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuICB9XG5cbiAgLnByb2dyZXNzLWJhciB7XG4gICAgaGVpZ2h0OiA4cHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIC5wcm9ncmVzcy1maWxsIHtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIHRyYW5zaXRpb246IHdpZHRoIDAuM3MgZWFzZTtcbiAgICB9XG4gIH1cbn1cblxuLnBlbmRpbmctc3VibWlzc2lvbnMge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBwYWRkaW5nOiAxNnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuXG4gIGg0IHtcbiAgICBtYXJnaW46IDAgMCAxMnB4IDA7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cblxuICAucGVuZGluZy1saXN0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiA4cHg7XG5cbiAgICAucGVuZGluZy1tZW1iZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gICAgICAubmFtZSB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICB9XG5cbiAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBTdGF0cyBHcmlkXG4uc3RhdHMtZ3JpZCB7XG4gIGlvbi1jYXJkIHtcbiAgICBtYXJnaW46IDhweDtcbiAgfVxuXG4gIC5zdGF0LWNhcmQge1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgIH1cblxuICAgIC5zdGF0LWljb24ge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLnN0YXQtaW5mbyB7XG4gICAgICBmbGV4OiAxO1xuXG4gICAgICBoMyB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cblxuICAgICAgLnN0YXQtdmFsdWUge1xuICAgICAgICBtYXJnaW46IDRweCAwO1xuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIH1cblxuICAgICAgLnN0YXQtbGFiZWwge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIFF1aWNrIEFjdGlvbnNcbi5xdWljay1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMnB4O1xuXG4gIGlvbi1idXR0b24ge1xuICAgIG1hcmdpbjogMDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgLS1ib3JkZXItcmFkaXVzOiA4cHg7XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2ZSBBZGp1c3RtZW50c1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5kaXN0cmlidXRpb24tc3RhdHMge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcikgIWltcG9ydGFudDtcblxuICAgIC5zdGF0LWl0ZW06bGFzdC1jaGlsZCB7XG4gICAgICBncmlkLWNvbHVtbjogc3BhbiAyO1xuICAgIH1cbiAgfVxuXG4gIC5zdGF0cy1ncmlkIGlvbi1jb2wge1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgLnBlcmZvcm1lci1pdGVtIC5wZXJmb3JtYW5jZS1kZXRhaWxzIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogOHB4O1xuICB9XG5cbiAgLmRpc3RyaWJ1dGlvbi1zdGF0cyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcbiAgICBnYXA6IDEycHggIWltcG9ydGFudDtcblxuICAgIC5zdGF0LWl0ZW0ge1xuICAgICAgcGFkZGluZzogOHB4O1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgfVxuICB9XG59XG5cbi8vIERhcmsgTW9kZSBBZGp1c3RtZW50c1xuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xuICAuc3RhdC1jYXJkLFxuICAuYWN0aXZpdHktY2FyZCBpb24tY2FyZC1oZWFkZXIsXG4gIC5ncm91cC1jYXJkIGlvbi1jYXJkLWhlYWRlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMTAwKTtcbiAgfVxufVxuXG4vLyA9PT09PSBDT01NVU5JVFkgSU5URUxMSUdFTkNFIFNUWUxFUyA9PT09PVxuXG4vLyBDb21tdW5pdHkgSGVhbHRoIEFuYWx5dGljcyBDYXJkXG4uY29tbXVuaXR5LWhlYWx0aC1jYXJkIHtcbiAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5oZWFsdGgtb3ZlcnZpZXcge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDI0cHg7XG59XG5cbi5oZWFsdGgtc2NvcmUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmOGY5ZmEgMCUsICNlOWVjZWYgMTAwJSk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIFxuICAuc2NvcmUtY2lyY2xlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwcHg7XG4gICAgaGVpZ2h0OiAxMDBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpIDAlLCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZSkgMTAwJSk7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIFxuICAgIC5zY29yZS12YWx1ZSB7XG4gICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgfVxuICAgIFxuICAgIC5zY29yZS1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIG9wYWNpdHk6IDAuOTtcbiAgICB9XG4gIH1cbiAgXG4gIC5oZWFsdGgtdHJlbmQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIFxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICB9XG4gICAgXG4gICAgLnRyZW5kLWxhYmVsIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgICB9XG4gIH1cbn1cblxuLmhlYWx0aC1tZXRyaWNzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XG4gIGdhcDogMTZweDtcbiAgXG4gIC5tZXRyaWMtaXRlbSB7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBcbiAgICAubWV0cmljLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgIFxuICAgICAgLm1ldHJpYy1sYWJlbCB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5tZXRyaWMtdmFsdWUge1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpb24tcHJvZ3Jlc3MtYmFyIHtcbiAgICAgIGhlaWdodDogOHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyBTbWFydCBDb21tdW5pdHkgQWxlcnRzIENhcmRcbi5hbGVydHMtY2FyZCB7XG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xufVxuXG4uYWxlcnRzLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEycHg7XG59XG5cbi5hbGVydC1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTZweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgZWFzZTtcbiAgXG4gICYuY2VsZWJyYXRpb24ge1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlOGY1ZTggMCUsICNkNGVkZGEgMTAwJSk7XG4gIH1cbiAgXG4gICYubWVtYmVyX3Jpc2sge1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZmYzY2QgMCUsICNmZmVhYTcgMTAwJSk7XG4gIH1cbiAgXG4gICYuZW5nYWdlbWVudF9kcm9wIHtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjhkN2RhIDAlLCAjZjFiMGI3IDEwMCUpO1xuICB9XG4gIFxuICAuYWxlcnQtaWNvbiB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICAgIFxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIH1cbiAgfVxuICBcbiAgLmFsZXJ0LWNvbnRlbnQge1xuICAgIGZsZXg6IDE7XG4gICAgXG4gICAgLmFsZXJ0LXRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgIH1cbiAgICBcbiAgICAuYWxlcnQtZGVzY3JpcHRpb24ge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgIH1cbiAgICBcbiAgICAuYWxlcnQtbWV0YSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgXG4gICAgICAudGltZXN0YW1wIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gU21hcnQgTWVtYmVyIEluc2lnaHRzIENhcmRcbi5tZW1iZXItaW5zaWdodHMtY2FyZCB7XG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG59XG5cbi5pbnNpZ2h0cy1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyODBweCwgMWZyKSk7XG4gIGdhcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmluc2lnaHQtY2FyZCB7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gIFxuICAubWVtYmVyLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAgIFxuICAgIC5tZW1iZXItbmFtZSB7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICB9XG4gIH1cbiAgXG4gIC5tZW1iZXItbWV0cmljcyB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICBcbiAgICAubWV0cmljLXJvdyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMTJweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICBcbiAgICAgIC5tZXRyaWMtbGFiZWwge1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICBtaW4td2lkdGg6IDgwcHg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5tZXRyaWMtYmFyIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ2FwOiA4cHg7XG4gICAgICAgIFxuICAgICAgICBpb24tcHJvZ3Jlc3MtYmFyIHtcbiAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgIGhlaWdodDogNnB4O1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLm1ldHJpYy1zY29yZSB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICAgIG1pbi13aWR0aDogMzBweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLm1lbWJlci1zdGF0cyB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xuICAgIGdhcDogOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgXG4gICAgLnN0YXQtaXRlbSB7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA4cHg7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCk7XG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgICBcbiAgICAgIC5zdGF0LWxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjdyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnN0YXQtdmFsdWUge1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC5tZW1iZXItYWN0aW9uIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgXG4gICAgaW9uLWJ1dHRvbiB7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDEycHg7XG4gICAgICAtLXBhZGRpbmctZW5kOiAxMnB4O1xuICAgICAgaGVpZ2h0OiA0NHB4O1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgfVxuICB9XG59XG5cbi8vIEVuZ2FnZW1lbnQgSW50ZWxsaWdlbmNlIENhcmRcbi5lbmdhZ2VtZW50LWluc2lnaHRzLWNhcmQge1xuICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG59XG5cbi5lbmdhZ2VtZW50LWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI1MHB4LCAxZnIpKTtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uZW5nYWdlbWVudC1pdGVtIHtcbiAgcGFkZGluZzogMTZweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgXG4gIC5lbmdhZ2VtZW50LWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgIFxuICAgIC5jYXRlZ29yeSB7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIH1cbiAgICBcbiAgICAudHJlbmQtaW5kaWNhdG9yIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBcbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgfVxuICAgICAgXG4gICAgICAucGVyY2VudGFnZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLmVuZ2FnZW1lbnQtdmFsdWUge1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBcbiAgICAuY3VycmVudC12YWx1ZSB7XG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgIH1cbiAgICBcbiAgICAucHJldmlvdXMtdmFsdWUge1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICBtYXJnaW4tbGVmdDogOHB4O1xuICAgIH1cbiAgfVxuICBcbiAgLmVuZ2FnZW1lbnQtZGVzY3JpcHRpb24ge1xuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gIH1cbiAgXG4gIGlvbi1wcm9ncmVzcy1iYXIge1xuICAgIGhlaWdodDogNnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgfVxufVxuXG4vLyBDb21tdW5pdHkgTWlsZXN0b25lcyBDYXJkXG4ubWlsZXN0b25lcy1jYXJkIHtcbiAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XG59XG5cbi5taWxlc3RvbmVzLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDMwMHB4LCAxZnIpKTtcbiAgZ2FwOiAyMHB4O1xufVxuXG4ubWlsZXN0b25lLWl0ZW0ge1xuICBwYWRkaW5nOiAyMHB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjhmOWZhIDAlLCAjZTllY2VmIDEwMCUpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICBcbiAgLm1pbGVzdG9uZS1oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBcbiAgICAubWlsZXN0b25lLXRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgIH1cbiAgICBcbiAgICAubWlsZXN0b25lLXByb2dyZXNzLXRleHQge1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB9XG4gIH1cbiAgXG4gIC5taWxlc3RvbmUtZGVzY3JpcHRpb24ge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICBsaW5lLWhlaWdodDogMS40O1xuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIH1cbiAgXG4gIC5taWxlc3RvbmUtcHJvZ3Jlc3Mge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEycHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICBcbiAgICBpb24tcHJvZ3Jlc3MtYmFyIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBoZWlnaHQ6IDhweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICB9XG4gICAgXG4gICAgLnByb2dyZXNzLXBlcmNlbnRhZ2Uge1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIG1pbi13aWR0aDogNDBweDtcbiAgICB9XG4gIH1cbiAgXG4gIC5taWxlc3RvbmUtZXRhIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA2cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgfVxuICB9XG4gIFxuICAubWlsZXN0b25lLWFjdGlvbnMge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBcbiAgICAuY2VsZWJyYXRpb24tYmFkZ2Uge1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBwYWRkaW5nOiA2cHggMTJweDtcbiAgICAgIFxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gTW9iaWxlIFJlc3BvbnNpdmUgQWRqdXN0bWVudHMgZm9yIENvbW11bml0eSBJbnRlbGxpZ2VuY2VcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuaGVhbHRoLW92ZXJ2aWV3IHtcbiAgICBnYXA6IDE2cHg7XG4gIH1cbiAgXG4gIC5oZWFsdGgtc2NvcmUge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAxNnB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBcbiAgICAuc2NvcmUtY2lyY2xlIHtcbiAgICAgIHdpZHRoOiA4MHB4O1xuICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgXG4gICAgICAuc2NvcmUtdmFsdWUge1xuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC5oZWFsdGgtbWV0cmljcyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbiAgXG4gIC5pbnNpZ2h0cy1ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxuICBcbiAgLmVuZ2FnZW1lbnQtZ3JpZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbiAgXG4gIC5taWxlc3RvbmVzLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG4gIFxuICAubWVtYmVyLXN0YXRzIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgICBnYXA6IDRweDtcbiAgfVxuICBcbiAgLmFsZXJ0LWl0ZW0ge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIFxuICAgIC5hbGVydC1pY29uIHtcbiAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICB9XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XG4gIC5taWxlc3RvbmUtaGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogOHB4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICB9XG4gIFxuICAuZW5nYWdlbWVudC1oZWFkZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgZ2FwOiA4cHg7XG4gIH1cbiAgXG4gIC5oZWFsdGgtbWV0cmljcyAubWV0cmljLWl0ZW0ge1xuICAgIHBhZGRpbmc6IDEycHg7XG4gIH1cbiAgXG4gIC5taWxlc3RvbmUtcHJvZ3Jlc3Mge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiA4cHg7XG4gICAgXG4gICAgLnByb2dyZXNzLXBlcmNlbnRhZ2Uge1xuICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gICAgfVxuICB9XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2dyb3VwLWFkbWluL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQUFGOztBQUlBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLDBDQUFBO0VBQ0EsbUJBQUE7QUFERjtBQUdFO0VBQ0UsK0NBQUE7QUFESjtBQUlFO0VBQ0UsK0NBQUE7QUFGSjtBQUtFO0VBQ0UsZ0RBQUE7QUFISjs7QUFRQTtFQUNFLGFBQUE7QUFMRjtBQU9FO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFMSjtBQU9JO0VBQ0UsaUJBQUE7QUFMTjs7QUFXQTtFQUNFLG1CQUFBO0FBUkY7QUFVRTtFQUNFLGtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFSSjtBQVdFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQVRKO0FBV0k7RUFDRSxrQ0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQVROO0FBV007RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBVFI7QUFXUTtFQUNFLGdCQUFBO0FBVFY7QUFZUTtFQUNFLCtCQUFBO0VBQ0EsZ0JBQUE7QUFWVjtBQWNNO0VBQ0UsYUFBQTtFQUNBLFNBQUE7QUFaUjtBQWNRO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsOEJBQUE7QUFaVjtBQWNVO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0FBWlo7QUFjWTtFQUNFLCtCQUFBO0FBWmQ7O0FBc0JBO0VBQ0Usa0NBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQW5CRjtBQXFCRTtFQUNFLGtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxlQUFBO0VBQ0Es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QUFBO0FBcEhOO0FBd0hFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQXRISjtBQXdISTtFQUNFLGlCQUFBO0FBdEhOO0FBMEhFO0VBQ0Usa0JBQUE7QUF4SEo7QUEwSEk7RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0FBeEhOO0FBMEhNO0VBQ0UsaUJBQUE7QUF4SFI7O0FBK0hBO0VBQ0U7SUFDRSxTQUFBO0VBNUhGO0VBK0hBO0lBQ0Usc0JBQUE7SUFDQSxTQUFBO0lBQ0Esa0JBQUE7RUE3SEY7RUErSEU7SUFDRSxXQUFBO0lBQ0EsWUFBQTtFQTdISjtFQStISTtJQUNFLGlCQUFBO0VBN0hOO0VBa0lBO0lBQ0UsMEJBQUE7RUFoSUY7RUFtSUE7SUFDRSwwQkFBQTtFQWpJRjtFQW9JQTtJQUNFLDBCQUFBO0VBbElGO0VBcUlBO0lBQ0UsMEJBQUE7RUFuSUY7RUFzSUE7SUFDRSwwQkFBQTtJQUNBLFFBQUE7RUFwSUY7RUF1SUE7SUFDRSxzQkFBQTtJQUNBLGtCQUFBO0VBcklGO0VBdUlFO0lBQ0Usa0JBQUE7RUFySUo7QUFDRjtBQXlJQTtFQUNFO0lBQ0Usc0JBQUE7SUFDQSxRQUFBO0lBQ0EsdUJBQUE7RUF2SUY7RUEwSUE7SUFDRSxzQkFBQTtJQUNBLHVCQUFBO0lBQ0EsUUFBQTtFQXhJRjtFQTJJQTtJQUNFLGFBQUE7RUF6SUY7RUE0SUE7SUFDRSxzQkFBQTtJQUNBLFFBQUE7RUExSUY7RUE0SUU7SUFDRSxvQkFBQTtFQTFJSjtBQUNGO0FBQ0EsZ3E2QkFBZ3E2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIERhc2hib2FyZCBMYXlvdXRcbi5kYXNoYm9hcmQtY29udGFpbmVyIHtcbiAgcGFkZGluZzogMTZweDtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4vLyBDYXJkIFN0eWxlc1xuaW9uLWNhcmQge1xuICBtYXJnaW46IDAgMCAxNnB4IDA7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcblxuICAmLnBlcmZvcm1hbmNlLWNhcmQge1xuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xuICB9XG5cbiAgJi5nYW1ld2Vlay1jYXJkIHtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gICYuYWN0aW9ucy1jYXJkIHtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG4gIH1cbn1cblxuLy8gQ2FyZCBIZWFkZXJzXG5pb24tY2FyZC1oZWFkZXIge1xuICBwYWRkaW5nOiAxNnB4O1xuXG4gIC5zZWN0aW9uLXRpdGxlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICAgIH1cbiAgfVxufVxuXG4vLyBUb3AgUGVyZm9ybWVycyBTZWN0aW9uXG4udG9wLXBlcmZvcm1lcnMge1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuXG4gIGg0IHtcbiAgICBtYXJnaW46IDAgMCAxNnB4IDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIC5wZXJmb3JtZXJzLWxpc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDEycHg7XG5cbiAgICAucGVyZm9ybWVyLWl0ZW0ge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG5cbiAgICAgIC5wZXJmb3JtZXItaW5mbyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuXG4gICAgICAgIC5uYW1lIHtcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLnBvaW50cyB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5wZXJmb3JtYW5jZS1kZXRhaWxzIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZ2FwOiAxNnB4O1xuXG4gICAgICAgIC5kZXRhaWwge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBnYXA6IDRweDtcbiAgICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG5cbiAgICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAmW25hbWU9XCJzdGFyXCJdIHtcbiAgICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gUG9pbnRzIERpc3RyaWJ1dGlvblxuLnBvaW50cy1kaXN0cmlidXRpb24ge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBwYWRkaW5nOiAxNnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuXG4gIGg0IHtcbiAgICBtYXJnaW46IDAgMCAxNnB4IDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIC5kaXN0cmlidXRpb24tc3RhdHMge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcbiAgICBnYXA6IDE2cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgLnN0YXQtaXRlbSB7XG4gICAgICAudmFsdWUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1zaXplOiAxLjRyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICAgIH1cblxuICAgICAgLmxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gR2FtZXdlZWsgU3RhdHVzXG4uZGVhZGxpbmUtaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgZm9udC1zaXplOiAwLjlyZW07XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICB9XG59XG5cbi5zdWJtaXNzaW9uLXByb2dyZXNzIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcblxuICAucHJvZ3Jlc3MtaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcblxuICAgIGg0IHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuXG4gICAgLnByb2dyZXNzLXRleHQge1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuICB9XG5cbiAgLnByb2dyZXNzLWJhciB7XG4gICAgaGVpZ2h0OiA4cHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIC5wcm9ncmVzcy1maWxsIHtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIHRyYW5zaXRpb246IHdpZHRoIDAuM3MgZWFzZTtcbiAgICB9XG4gIH1cbn1cblxuLnBlbmRpbmctc3VibWlzc2lvbnMge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBwYWRkaW5nOiAxNnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuXG4gIGg0IHtcbiAgICBtYXJnaW46IDAgMCAxMnB4IDA7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cblxuICAucGVuZGluZy1saXN0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiA4cHg7XG5cbiAgICAucGVuZGluZy1tZW1iZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gICAgICAubmFtZSB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICB9XG5cbiAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBTdGF0cyBHcmlkXG4uc3RhdHMtZ3JpZCB7XG4gIGlvbi1jYXJkIHtcbiAgICBtYXJnaW46IDhweDtcbiAgfVxuXG4gIC5zdGF0LWNhcmQge1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgIH1cblxuICAgIC5zdGF0LWljb24ge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLnN0YXQtaW5mbyB7XG4gICAgICBmbGV4OiAxO1xuXG4gICAgICBoMyB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cblxuICAgICAgLnN0YXQtdmFsdWUge1xuICAgICAgICBtYXJnaW46IDRweCAwO1xuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIH1cblxuICAgICAgLnN0YXQtbGFiZWwge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIFF1aWNrIEFjdGlvbnNcbi5xdWljay1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMnB4O1xuXG4gIGlvbi1idXR0b24ge1xuICAgIG1hcmdpbjogMDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgLS1ib3JkZXItcmFkaXVzOiA4cHg7XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2ZSBBZGp1c3RtZW50c1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5kaXN0cmlidXRpb24tc3RhdHMge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcikgIWltcG9ydGFudDtcblxuICAgIC5zdGF0LWl0ZW06bGFzdC1jaGlsZCB7XG4gICAgICBncmlkLWNvbHVtbjogc3BhbiAyO1xuICAgIH1cbiAgfVxuXG4gIC5zdGF0cy1ncmlkIGlvbi1jb2wge1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgLnBlcmZvcm1lci1pdGVtIC5wZXJmb3JtYW5jZS1kZXRhaWxzIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogOHB4O1xuICB9XG5cbiAgLmRpc3RyaWJ1dGlvbi1zdGF0cyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcbiAgICBnYXA6IDEycHggIWltcG9ydGFudDtcblxuICAgIC5zdGF0LWl0ZW0ge1xuICAgICAgcGFkZGluZzogOHB4O1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgfVxuICB9XG59XG5cbi8vIERhcmsgTW9kZSBBZGp1c3RtZW50c1xuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xuICAuc3RhdC1jYXJkLFxuICAuYWN0aXZpdHktY2FyZCBpb24tY2FyZC1oZWFkZXIsXG4gIC5ncm91cC1jYXJkIGlvbi1jYXJkLWhlYWRlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMTAwKTtcbiAgfVxufVxuXG4vLyA9PT09PSBDT01NVU5JVFkgSU5URUxMSUdFTkNFIFNUWUxFUyA9PT09PVxuXG4vLyBDb21tdW5pdHkgSGVhbHRoIEFuYWx5dGljcyBDYXJkXG4uY29tbXVuaXR5LWhlYWx0aC1jYXJkIHtcbiAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5oZWFsdGgtb3ZlcnZpZXcge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDI0cHg7XG59XG5cbi5oZWFsdGgtc2NvcmUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmOGY5ZmEgMCUsICNlOWVjZWYgMTAwJSk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIFxuICAuc2NvcmUtY2lyY2xlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwcHg7XG4gICAgaGVpZ2h0OiAxMDBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpIDAlLCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZSkgMTAwJSk7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIFxuICAgIC5zY29yZS12YWx1ZSB7XG4gICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgfVxuICAgIFxuICAgIC5zY29yZS1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIG9wYWNpdHk6IDAuOTtcbiAgICB9XG4gIH1cbiAgXG4gIC5oZWFsdGgtdHJlbmQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIFxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICB9XG4gICAgXG4gICAgLnRyZW5kLWxhYmVsIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgICB9XG4gIH1cbn1cblxuLmhlYWx0aC1tZXRyaWNzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XG4gIGdhcDogMTZweDtcbiAgXG4gIC5tZXRyaWMtaXRlbSB7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBcbiAgICAubWV0cmljLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgIFxuICAgICAgLm1ldHJpYy1sYWJlbCB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5tZXRyaWMtdmFsdWUge1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpb24tcHJvZ3Jlc3MtYmFyIHtcbiAgICAgIGhlaWdodDogOHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyBTbWFydCBDb21tdW5pdHkgQWxlcnRzIENhcmRcbi5hbGVydHMtY2FyZCB7XG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xufVxuXG4uYWxlcnRzLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEycHg7XG59XG5cbi5hbGVydC1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTZweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgZWFzZTtcbiAgXG4gICYuY2VsZWJyYXRpb24ge1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlOGY1ZTggMCUsICNkNGVkZGEgMTAwJSk7XG4gIH1cbiAgXG4gICYubWVtYmVyX3Jpc2sge1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZmYzY2QgMCUsICNmZmVhYTcgMTAwJSk7XG4gIH1cbiAgXG4gICYuZW5nYWdlbWVudF9kcm9wIHtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjhkN2RhIDAlLCAjZjFiMGI3IDEwMCUpO1xuICB9XG4gIFxuICAuYWxlcnQtaWNvbiB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICAgIFxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIH1cbiAgfVxuICBcbiAgLmFsZXJ0LWNvbnRlbnQge1xuICAgIGZsZXg6IDE7XG4gICAgXG4gICAgLmFsZXJ0LXRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgIH1cbiAgICBcbiAgICAuYWxlcnQtZGVzY3JpcHRpb24ge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgIH1cbiAgICBcbiAgICAuYWxlcnQtbWV0YSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgXG4gICAgICAudGltZXN0YW1wIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gU21hcnQgTWVtYmVyIEluc2lnaHRzIENhcmRcbi5tZW1iZXItaW5zaWdodHMtY2FyZCB7XG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG59XG5cbi5pbnNpZ2h0cy1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyODBweCwgMWZyKSk7XG4gIGdhcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmluc2lnaHQtY2FyZCB7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gIFxuICAubWVtYmVyLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAgIFxuICAgIC5tZW1iZXItbmFtZSB7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICB9XG4gIH1cbiAgXG4gIC5tZW1iZXItbWV0cmljcyB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICBcbiAgICAubWV0cmljLXJvdyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMTJweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICBcbiAgICAgIC5tZXRyaWMtbGFiZWwge1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICBtaW4td2lkdGg6IDgwcHg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5tZXRyaWMtYmFyIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ2FwOiA4cHg7XG4gICAgICAgIFxuICAgICAgICBpb24tcHJvZ3Jlc3MtYmFyIHtcbiAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgIGhlaWdodDogNnB4O1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLm1ldHJpYy1zY29yZSB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICAgIG1pbi13aWR0aDogMzBweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLm1lbWJlci1zdGF0cyB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xuICAgIGdhcDogOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgXG4gICAgLnN0YXQtaXRlbSB7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA4cHg7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCk7XG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgICBcbiAgICAgIC5zdGF0LWxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjdyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnN0YXQtdmFsdWUge1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC5tZW1iZXItYWN0aW9uIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgXG4gICAgaW9uLWJ1dHRvbiB7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDEycHg7XG4gICAgICAtLXBhZGRpbmctZW5kOiAxMnB4O1xuICAgICAgaGVpZ2h0OiA0NHB4O1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgfVxuICB9XG59XG5cbi8vIEVuZ2FnZW1lbnQgSW50ZWxsaWdlbmNlIENhcmRcbi5lbmdhZ2VtZW50LWluc2lnaHRzLWNhcmQge1xuICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG59XG5cbi5lbmdhZ2VtZW50LWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI1MHB4LCAxZnIpKTtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uZW5nYWdlbWVudC1pdGVtIHtcbiAgcGFkZGluZzogMTZweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgXG4gIC5lbmdhZ2VtZW50LWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgIFxuICAgIC5jYXRlZ29yeSB7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIH1cbiAgICBcbiAgICAudHJlbmQtaW5kaWNhdG9yIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBcbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgfVxuICAgICAgXG4gICAgICAucGVyY2VudGFnZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLmVuZ2FnZW1lbnQtdmFsdWUge1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBcbiAgICAuY3VycmVudC12YWx1ZSB7XG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgIH1cbiAgICBcbiAgICAucHJldmlvdXMtdmFsdWUge1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICBtYXJnaW4tbGVmdDogOHB4O1xuICAgIH1cbiAgfVxuICBcbiAgLmVuZ2FnZW1lbnQtZGVzY3JpcHRpb24ge1xuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gIH1cbiAgXG4gIGlvbi1wcm9ncmVzcy1iYXIge1xuICAgIGhlaWdodDogNnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgfVxufVxuXG4vLyBDb21tdW5pdHkgTWlsZXN0b25lcyBDYXJkXG4ubWlsZXN0b25lcy1jYXJkIHtcbiAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XG59XG5cbi5taWxlc3RvbmVzLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDMwMHB4LCAxZnIpKTtcbiAgZ2FwOiAyMHB4O1xufVxuXG4ubWlsZXN0b25lLWl0ZW0ge1xuICBwYWRkaW5nOiAyMHB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjhmOWZhIDAlLCAjZTllY2VmIDEwMCUpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICBcbiAgLm1pbGVzdG9uZS1oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBcbiAgICAubWlsZXN0b25lLXRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgIH1cbiAgICBcbiAgICAubWlsZXN0b25lLXByb2dyZXNzLXRleHQge1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB9XG4gIH1cbiAgXG4gIC5taWxlc3RvbmUtZGVzY3JpcHRpb24ge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICBsaW5lLWhlaWdodDogMS40O1xuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIH1cbiAgXG4gIC5taWxlc3RvbmUtcHJvZ3Jlc3Mge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEycHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICBcbiAgICBpb24tcHJvZ3Jlc3MtYmFyIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBoZWlnaHQ6IDhweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICB9XG4gICAgXG4gICAgLnByb2dyZXNzLXBlcmNlbnRhZ2Uge1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIG1pbi13aWR0aDogNDBweDtcbiAgICB9XG4gIH1cbiAgXG4gIC5taWxlc3RvbmUtZXRhIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA2cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgfVxuICB9XG4gIFxuICAubWlsZXN0b25lLWFjdGlvbnMge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBcbiAgICAuY2VsZWJyYXRpb24tYmFkZ2Uge1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBwYWRkaW5nOiA2cHggMTJweDtcbiAgICAgIFxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gTW9iaWxlIFJlc3BvbnNpdmUgQWRqdXN0bWVudHMgZm9yIENvbW11bml0eSBJbnRlbGxpZ2VuY2VcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuaGVhbHRoLW92ZXJ2aWV3IHtcbiAgICBnYXA6IDE2cHg7XG4gIH1cbiAgXG4gIC5oZWFsdGgtc2NvcmUge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAxNnB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBcbiAgICAuc2NvcmUtY2lyY2xlIHtcbiAgICAgIHdpZHRoOiA4MHB4O1xuICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgXG4gICAgICAuc2NvcmUtdmFsdWUge1xuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC5oZWFsdGgtbWV0cmljcyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbiAgXG4gIC5pbnNpZ2h0cy1ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxuICBcbiAgLmVuZ2FnZW1lbnQtZ3JpZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbiAgXG4gIC5taWxlc3RvbmVzLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG4gIFxuICAubWVtYmVyLXN0YXRzIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgICBnYXA6IDRweDtcbiAgfVxuICBcbiAgLmFsZXJ0LWl0ZW0ge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIFxuICAgIC5hbGVydC1pY29uIHtcbiAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICB9XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XG4gIC5taWxlc3RvbmUtaGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogOHB4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICB9XG4gIFxuICAuZW5nYWdlbWVudC1oZWFkZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgZ2FwOiA4cHg7XG4gIH1cbiAgXG4gIC5oZWFsdGgtbWV0cmljcyAubWV0cmljLWl0ZW0ge1xuICAgIHBhZGRpbmc6IDEycHg7XG4gIH1cbiAgXG4gIC5taWxlc3RvbmUtcHJvZ3Jlc3Mge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiA4cHg7XG4gICAgXG4gICAgLnByb2dyZXNzLXBlcmNlbnRhZ2Uge1xuICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_group-admin_pages_dashboard_dashboard_page_ts.js.map