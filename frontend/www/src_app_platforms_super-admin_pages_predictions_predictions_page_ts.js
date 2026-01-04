"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_super-admin_pages_predictions_predictions_page_ts"],{

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

/***/ 8846:
/*!*****************************************************************************!*\
  !*** ./src/app/platforms/super-admin/pages/predictions/predictions.page.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PredictionsPage: () => (/* binding */ PredictionsPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/toast.service */ 5423);

var _PredictionsPage;








function PredictionsPage_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 7)(2, "ion-card")(3, "ion-card-header")(4, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Prediction Platform Health Overview");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-card-content")(7, "div", 8)(8, "div", 9)(9, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "ion-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 12)(12, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Platform Health Score");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 9)(17, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 12)(20, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Weekly Engagement Rate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 9)(25, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](26, "ion-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 12)(28, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, "Platform Avg Accuracy");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 9)(33, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](34, "ion-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "div", 12)(36, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39, "Elite Predictors (90%+)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "div", 9)(41, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](42, "ion-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "div", 12)(44, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Need Support (<40%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "div", 9)(49, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](50, "ion-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "div", 12)(52, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](53);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](54, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](55, "Joker Optimization Rate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](56, "div", 18)(57, "ion-card")(58, "ion-card-header")(59, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "ion-card-content")(62, "div", 19)(63, "div", 20)(64, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](65, "Submissions:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](68, "ion-progress-bar", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "div", 20)(70, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](71, "Time Remaining:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](72, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](73);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](74, "div", 20)(75, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](76, "Late Submissions:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](77, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](78);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "div", 20)(80, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](81, "Quality Score:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](82, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](83);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "div", 24)(85, "ion-card")(86, "ion-card-header")(87, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](88, "Strategic Prediction Insights");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](89, "ion-card-content")(90, "div", 25)(91, "div", 26)(92, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93, "\uD83D\uDCC8 Trending Patterns");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](94, "p")(95, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](96, "Defensive Strategy Rise:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](97, " 65% increase in low-scoring predictions this week");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](98, "p")(99, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](100, "Joker Timing:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](101, " Peak usage shifts to high-value matches");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](102, "div", 26)(103, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](104, "\uD83C\uDFAF Accuracy Hotspots");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](105, "p")(106, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](107, "Best Performers:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](108, " Premier League predictions (78% accuracy)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](109, "p")(110, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](111, "Challenge Areas:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](112, " Europa League matches (52% accuracy)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](113, "div", 26)(114, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](115, "\u26A1 Engagement Drivers");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "p")(117, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](118, "High Stakes:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](119, " Derby matches drive 23% more engagement");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](120, "p")(121, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](122, "Social Factor:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](123, " Group rivalry increases participation by 31%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getPlatformHealthScore(), "/100");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getPredictionEngagementRate(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getAveragePredictionAccuracy(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.getTopPerformersCount());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.getUnderperformersCount());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getJokerOptimizationRate(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Current Gameweek ", ctx_r0.currentGameweek, " - Live Monitoring");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", ctx_r0.getCurrentSubmissions(), "/", ctx_r0.getTotalActivePlayers(), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx_r0.getSubmissionProgress())("color", ctx_r0.getSubmissionProgressColor());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.getTimeRemaining());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.getLateSubmissions());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getAverageSubmissionQuality(), "/10");
  }
}
function PredictionsPage_div_21_ion_card_55_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-card", 37)(1, "ion-card-header")(2, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-card-content")(7, "div", 38)(8, "div", 39)(9, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Accuracy:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "ion-badge", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 39)(14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Strategy:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 39)(19, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Joker Efficiency:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 39)(24, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "Consistency:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const performer_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](performer_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](performer_r2.groupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", performer_r2.accuracy, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](performer_r2.strategy);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", performer_r2.jokerEfficiency, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", performer_r2.consistencyScore, "/10");
  }
}
function PredictionsPage_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 27)(2, "ion-card")(3, "ion-card-header")(4, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Platform Performance Distribution");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-card-content")(7, "div", 28)(8, "div", 29)(9, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "\uD83C\uDFC6 Elite Tier (90%+ Accuracy)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 30)(12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 31)(19, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "\uD83E\uDD47 Champion Tier (70-89%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 30)(22, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "div", 32)(29, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "\u2B50 Contender Tier (50-69%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "div", 30)(32, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 33)(39, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "\uD83D\uDCDA Developing Tier (<50%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "div", 30)(42, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "div", 34)(49, "ion-card")(50, "ion-card-header")(51, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](52, "Top Performers Deep Analytics");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "ion-card-content")(54, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](55, PredictionsPage_div_21_ion_card_55_Template, 28, 6, "ion-card", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getElitePredictors().length, " users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Avg: ", ctx_r0.getEliteAverageAccuracy(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Retention: ", ctx_r0.getEliteRetentionRate(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getChampionPredictors().length, " users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Avg: ", ctx_r0.getChampionAverageAccuracy(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Growth: ", ctx_r0.getChampionGrowthRate(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getContenderPredictors().length, " users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Avg: ", ctx_r0.getContenderAverageAccuracy(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Potential: ", ctx_r0.getContenderPotential(), "% upside");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getDevelopingPredictors().length, " users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Support Needed: ", ctx_r0.getDevelopingSupportCount(), " users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Intervention Ready: ", ctx_r0.getDevelopingInterventionCount(), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.getTopPerformers());
  }
}
function PredictionsPage_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 41)(2, "ion-card")(3, "ion-card-header")(4, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "User Prediction Behavior Intelligence");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-card-content")(7, "div", 42)(8, "div", 43)(9, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "\uD83D\uDD50 Submission Timing Patterns");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 44)(12, "div", 45)(13, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Early Birds (>48h before):");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 45)(18, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Strategic (24-48h):");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 45)(23, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "Last Minute (<2h):");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 43)(28, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, "\uD83C\uDFB2 Risk Profile Distribution");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 46)(31, "div", 47)(32, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, "Conservative Predictors");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, "Strategy: Safe bets, consistent performance");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 48)(39, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "Balanced Strategists");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, "Strategy: Mix of safe and bold predictions");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 49)(46, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "High-Risk Takers");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](50, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](51, "Strategy: Bold predictions, high variance");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "div", 43)(53, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, "\uD83C\uDCCF Joker Usage Intelligence");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "div", 50)(56, "div", 51)(57, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](58, "Optimal Timing:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "div", 51)(62, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](63, "Emotional Decisions:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](64, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](65);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "div", 51)(67, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](68, "Strategic Efficiency:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getEarlySubmitters(), "% - Higher accuracy");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getStrategicSubmitters(), "% - Best joker usage");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getLastMinuteSubmitters(), "% - Stress indicators");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getConservativePredictors(), "% of users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getBalancedPredictors(), "% of users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getAggressivePredictors(), "% of users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getOptimalJokerUsers(), "% use data-driven timing");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getEmotionalJokerUsers(), "% use team bias");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getJokerEfficiencyRate(), "% above-average performance");
  }
}
function PredictionsPage_div_23_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 60)(1, "div", 61)(2, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 62)(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Issue:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "p")(12, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Recommendation:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 63)(16, "ion-button", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PredictionsPage_div_23_div_12_Template_ion_button_click_16_listener() {
      const intervention_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.sendPredictionTips(intervention_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, " Send Tips ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "ion-button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PredictionsPage_div_23_div_12_Template_ion_button_click_18_listener() {
      const intervention_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.assignMentor(intervention_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, " Assign Mentor ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const intervention_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](intervention_r4.userName);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", intervention_r4.groupName, " - ", intervention_r4.currentAccuracy, "% accuracy");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", intervention_r4.issue, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", intervention_r4.recommendation, "");
  }
}
function PredictionsPage_div_23_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 60)(1, "div", 61)(2, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 62)(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Pattern:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "p")(12, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Suggested Action:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 63)(16, "ion-button", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PredictionsPage_div_23_div_17_Template_ion_button_click_16_listener() {
      const intervention_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.sendReEngagementCampaign(intervention_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, " Re-engage ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "ion-button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PredictionsPage_div_23_div_17_Template_ion_button_click_18_listener() {
      const intervention_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.offerIncentive(intervention_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, " Offer Incentive ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const intervention_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](intervention_r6.userName);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", intervention_r6.missedSubmissions, " missed submissions");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", intervention_r6.pattern, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", intervention_r6.action, "");
  }
}
function PredictionsPage_div_23_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 60)(1, "div", 61)(2, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 62)(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Opportunity:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "p")(12, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Strategy:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 63)(16, "ion-button", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PredictionsPage_div_23_div_22_Template_ion_button_click_16_listener() {
      const intervention_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.sendPersonalizedCoaching(intervention_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, " Personal Coach ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "ion-button", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PredictionsPage_div_23_div_22_Template_ion_button_click_18_listener() {
      const intervention_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.recommendStrategy(intervention_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, " Strategy Guide ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const intervention_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](intervention_r8.userName);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", intervention_r8.behaviorType, " - Optimization potential");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", intervention_r8.opportunity, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", intervention_r8.strategy, "");
  }
}
function PredictionsPage_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 52)(2, "ion-card")(3, "ion-card-header")(4, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "AI-Powered Intervention Center");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-card-content")(7, "div", 53)(8, "div", 54)(9, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, PredictionsPage_div_23_div_12_Template, 20, 5, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 54)(14, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, PredictionsPage_div_23_div_17_Template, 20, 4, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 54)(19, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, PredictionsPage_div_23_div_22_Template, 20, 4, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 57)(24, "ion-card")(25, "ion-card-header")(26, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "Intervention Impact Analytics");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "ion-card-content")(29, "div", 58)(30, "div", 59)(31, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "Success Rate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "div", 59)(36, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, "Engagement Boost");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "div", 59)(41, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42, "Accuracy Gains");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 59)(46, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Retention Impact");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\uD83D\uDCC8 Performance Enhancement (", ctx_r0.getPerformanceInterventions().length, " users)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.getPerformanceInterventions());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\uD83C\uDFAF Engagement Recovery (", ctx_r0.getEngagementInterventions().length, " users)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.getEngagementInterventions());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\uD83E\uDDE0 Behavioral Optimization (", ctx_r0.getBehaviorInterventions().length, " users)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.getBehaviorInterventions());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getInterventionSuccessRate(), "% of users show improvement");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getEngagementImprovement(), "% average engagement increase");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getAccuracyImprovement(), "% average accuracy improvement");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.getRetentionImprovement(), "% better retention rate");
  }
}
class PredictionsPage {
  constructor(toastService) {
    this.toastService = toastService;
    this.activeTab = 'analytics';
    this.currentGameweek = 15;
    // Platform Health Data
    this.platformHealth = {
      healthScore: 87,
      engagementRate: 78,
      averageAccuracy: 64,
      topPerformersCount: 23,
      underperformersCount: 45,
      jokerOptimizationRate: 71
    };
    // Submission Monitoring Data
    this.submissionData = {
      currentSubmissions: 128,
      totalActivePlayers: 156,
      timeRemaining: '2d 14h 32m',
      lateSubmissions: 12,
      averageSubmissionQuality: 7.8
    };
    // Performance Tiers Data
    this.performanceTiers = {
      elite: {
        users: Array(23).fill({}),
        averageAccuracy: 92,
        retentionRate: 96
      },
      champion: {
        users: Array(41).fill({}),
        averageAccuracy: 79,
        growthRate: 15
      },
      contender: {
        users: Array(67).fill({}),
        averageAccuracy: 58,
        potential: 22
      },
      developing: {
        users: Array(45).fill({}),
        supportCount: 32,
        interventionCount: 18
      }
    };
    // Top Performers Mock Data
    this.topPerformers = [{
      id: '1',
      name: 'Alex Rodriguez',
      groupName: 'Champions League Elite',
      accuracy: 94,
      strategy: 'Data-Driven Conservative',
      jokerEfficiency: 89,
      consistencyScore: 9.2
    }, {
      id: '2',
      name: 'Sarah Chen',
      groupName: 'Premier Predictions',
      accuracy: 91,
      strategy: 'Balanced Risk-Reward',
      jokerEfficiency: 92,
      consistencyScore: 8.7
    }, {
      id: '3',
      name: 'Michael Turner',
      groupName: 'Analytics FC',
      accuracy: 89,
      strategy: 'High-Risk High-Reward',
      jokerEfficiency: 78,
      consistencyScore: 8.9
    }];
    // Intervention Data
    this.interventionData = {
      performance: [{
        id: 'p1',
        userName: 'John Smith',
        groupName: 'Weekend Warriors',
        currentAccuracy: 38,
        issue: 'Consistently overestimating home advantage',
        recommendation: 'Focus on away team form analysis'
      }, {
        id: 'p2',
        userName: 'Emma Wilson',
        groupName: 'Football Fanatics',
        currentAccuracy: 42,
        issue: 'Poor joker timing strategy',
        recommendation: 'Use data-driven joker placement guide'
      }],
      engagement: [{
        id: 'e1',
        userName: 'David Brown',
        missedSubmissions: 4,
        pattern: 'Dropping engagement after losses',
        action: 'Send motivational content after difficult gameweeks'
      }, {
        id: 'e2',
        userName: 'Lisa Garcia',
        missedSubmissions: 3,
        pattern: 'Irregular submission timing',
        action: 'Personalized reminder schedule'
      }],
      behavior: [{
        id: 'b1',
        userName: 'Mark Johnson',
        behaviorType: 'Emotional Predictor',
        opportunity: 'Reduce bias toward favorite teams',
        strategy: 'Implement objective analysis framework'
      }, {
        id: 'b2',
        userName: 'Anna Lee',
        behaviorType: 'Conservative Over-Cautious',
        opportunity: 'Strategic risk-taking in high-confidence matches',
        strategy: 'Graduated risk exposure training'
      }]
    };
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.footballOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trophyOutline,
      starOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.starOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.timeOutline,
      alertCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.alertCircleOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.checkmarkCircleOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.peopleOutline,
      star: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.star,
      pulseOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.pulseOutline,
      trendingUpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trendingUpOutline,
      statsChartOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.statsChartOutline,
      warningOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.warningOutline,
      medicalOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.medicalOutline,
      sparklesOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.sparklesOutline
    });
  }
  ngOnInit() {
    // Initialize analytics data
  }
  // Platform Health Analytics Methods
  getPlatformHealthScore() {
    return this.platformHealth.healthScore;
  }
  getPredictionEngagementRate() {
    return this.platformHealth.engagementRate;
  }
  getAveragePredictionAccuracy() {
    return this.platformHealth.averageAccuracy;
  }
  getTopPerformersCount() {
    return this.platformHealth.topPerformersCount;
  }
  getUnderperformersCount() {
    return this.platformHealth.underperformersCount;
  }
  getJokerOptimizationRate() {
    return this.platformHealth.jokerOptimizationRate;
  }
  // Submission Monitoring Methods
  getCurrentSubmissions() {
    return this.submissionData.currentSubmissions;
  }
  getTotalActivePlayers() {
    return this.submissionData.totalActivePlayers;
  }
  getSubmissionProgress() {
    return this.submissionData.currentSubmissions / this.submissionData.totalActivePlayers;
  }
  getSubmissionProgressColor() {
    const progress = this.getSubmissionProgress();
    if (progress >= 0.8) return 'success';
    if (progress >= 0.6) return 'warning';
    return 'danger';
  }
  getTimeRemaining() {
    return this.submissionData.timeRemaining;
  }
  getLateSubmissions() {
    return this.submissionData.lateSubmissions;
  }
  getAverageSubmissionQuality() {
    return this.submissionData.averageSubmissionQuality;
  }
  // Performance Tier Methods
  getElitePredictors() {
    return this.performanceTiers.elite.users;
  }
  getEliteAverageAccuracy() {
    return this.performanceTiers.elite.averageAccuracy;
  }
  getEliteRetentionRate() {
    return this.performanceTiers.elite.retentionRate || 0;
  }
  getChampionPredictors() {
    return this.performanceTiers.champion.users;
  }
  getChampionAverageAccuracy() {
    return this.performanceTiers.champion.averageAccuracy;
  }
  getChampionGrowthRate() {
    return this.performanceTiers.champion.growthRate || 0;
  }
  getContenderPredictors() {
    return this.performanceTiers.contender.users;
  }
  getContenderAverageAccuracy() {
    return this.performanceTiers.contender.averageAccuracy;
  }
  getContenderPotential() {
    return this.performanceTiers.contender.potential || 0;
  }
  getDevelopingPredictors() {
    return this.performanceTiers.developing.users;
  }
  getDevelopingSupportCount() {
    return this.performanceTiers.developing.supportCount || 0;
  }
  getDevelopingInterventionCount() {
    return this.performanceTiers.developing.interventionCount || 0;
  }
  getTopPerformers() {
    return this.topPerformers;
  }
  // User Behavior Analytics Methods
  getEarlySubmitters() {
    return 32; // percentage
  }
  getStrategicSubmitters() {
    return 45; // percentage
  }
  getLastMinuteSubmitters() {
    return 23; // percentage
  }
  getConservativePredictors() {
    return 38; // percentage
  }
  getBalancedPredictors() {
    return 47; // percentage
  }
  getAggressivePredictors() {
    return 15; // percentage
  }
  getOptimalJokerUsers() {
    return 34; // percentage
  }
  getEmotionalJokerUsers() {
    return 41; // percentage
  }
  getJokerEfficiencyRate() {
    return 67; // percentage
  }
  // Intervention Methods
  getPerformanceInterventions() {
    return this.interventionData.performance;
  }
  getEngagementInterventions() {
    return this.interventionData.engagement;
  }
  getBehaviorInterventions() {
    return this.interventionData.behavior;
  }
  // Intervention Impact Methods
  getInterventionSuccessRate() {
    return 73; // percentage
  }
  getEngagementImprovement() {
    return 28; // percentage
  }
  getAccuracyImprovement() {
    return 15; // percentage
  }
  getRetentionImprovement() {
    return 34; // percentage
  }
  // Intervention Action Methods
  sendPredictionTips(intervention) {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.toastService.showToast(`Prediction tips sent to ${intervention.userName}`, 'success');
    })();
  }
  assignMentor(intervention) {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.toastService.showToast(`Mentor assigned to ${intervention.userName}`, 'success');
    })();
  }
  sendReEngagementCampaign(intervention) {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this3.toastService.showToast(`Re-engagement campaign sent to ${intervention.userName}`, 'success');
    })();
  }
  offerIncentive(intervention) {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this4.toastService.showToast(`Incentive offered to ${intervention.userName}`, 'success');
    })();
  }
  sendPersonalizedCoaching(intervention) {
    var _this5 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this5.toastService.showToast(`Personalized coaching sent to ${intervention.userName}`, 'success');
    })();
  }
  recommendStrategy(intervention) {
    var _this6 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this6.toastService.showToast(`Strategy guide recommended to ${intervention.userName}`, 'success');
    })();
  }
}
_PredictionsPage = PredictionsPage;
_PredictionsPage.ɵfac = function PredictionsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PredictionsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService));
};
_PredictionsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _PredictionsPage,
  selectors: [["app-predictions"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 24,
  vars: 5,
  consts: [["value", "analytics", 3, "ngModelChange", "ngModel"], ["value", "analytics"], ["value", "performance"], ["value", "behavior"], ["value", "interventions"], [1, "ion-padding"], [4, "ngIf"], [1, "platform-health"], [1, "health-metrics"], [1, "metric-item"], [1, "metric-icon"], ["name", "pulse-outline", "color", "primary"], [1, "metric-info"], ["name", "trending-up-outline", "color", "success"], ["name", "stats-chart-outline", "color", "secondary"], ["name", "trophy-outline", "color", "warning"], ["name", "warning-outline", "color", "danger"], ["name", "star-outline", "color", "tertiary"], [1, "submission-monitoring"], [1, "submission-stats"], [1, "submission-metric"], [1, "label"], [1, "value"], [3, "value", "color"], [1, "strategic-insights"], [1, "insights-grid"], [1, "insight-card"], [1, "performance-analytics"], [1, "performance-tiers"], [1, "tier", "elite"], [1, "tier-stats"], [1, "tier", "champion"], [1, "tier", "contender"], [1, "tier", "developing"], [1, "top-performers"], [1, "performers-grid"], ["class", "performer-card", 4, "ngFor", "ngForOf"], [1, "performer-card"], [1, "performer-stats"], [1, "stat-row"], ["color", "success"], [1, "behavior-patterns"], [1, "behavior-insights"], [1, "behavior-section"], [1, "timing-stats"], [1, "timing-item"], [1, "risk-profiles"], [1, "risk-item", "conservative"], [1, "risk-item", "balanced"], [1, "risk-item", "aggressive"], [1, "joker-intelligence"], [1, "joker-stat"], [1, "intervention-center"], [1, "intervention-categories"], [1, "intervention-category"], [1, "intervention-items"], ["class", "intervention-item", 4, "ngFor", "ngForOf"], [1, "intervention-impact"], [1, "impact-metrics"], [1, "impact-item"], [1, "intervention-item"], [1, "intervention-user"], [1, "intervention-recommendation"], [1, "intervention-actions"], ["size", "small", "fill", "outline", "color", "primary", 3, "click"], ["size", "small", "fill", "outline", "color", "secondary", 3, "click"], ["size", "small", "fill", "outline", "color", "warning", 3, "click"], ["size", "small", "fill", "outline", "color", "tertiary", 3, "click"], ["size", "small", "fill", "outline", "color", "success", 3, "click"]],
  template: function PredictionsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Prediction Intelligence & Analytics Center");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-toolbar")(5, "ion-segment", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function PredictionsPage_Template_ion_segment_ngModelChange_5_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.activeTab, $event) || (ctx.activeTab = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-segment-button", 1)(7, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Platform Analytics");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "ion-segment-button", 2)(10, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Performance Intelligence");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "ion-segment-button", 3)(13, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "User Behavior");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "ion-segment-button", 4)(16, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Smart Interventions");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "ion-content")(19, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, PredictionsPage_div_20_Template, 124, 14, "div", 6)(21, PredictionsPage_div_21_Template, 56, 13, "div", 6)(22, PredictionsPage_div_22_Template, 71, 9, "div", 6)(23, PredictionsPage_div_23_Template, 50, 10, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.activeTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.activeTab === "analytics");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.activeTab === "performance");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.activeTab === "behavior");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.activeTab === "interventions");
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardSubtitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSegment, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSegmentButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonProgressBar, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel],
  styles: [".platform-health[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.platform-health[_ngcontent-%COMP%]   .health-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n.platform-health[_ngcontent-%COMP%]   .health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 1rem;\n  background: var(--ion-color-light);\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.platform-health[_ngcontent-%COMP%]   .health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  margin-right: 1rem;\n}\n.platform-health[_ngcontent-%COMP%]   .health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.platform-health[_ngcontent-%COMP%]   .health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.platform-health[_ngcontent-%COMP%]   .health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.platform-health[_ngcontent-%COMP%]   .health-metrics[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0 0;\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n}\n\n.submission-monitoring[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.submission-monitoring[_ngcontent-%COMP%]   .submission-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\n.submission-monitoring[_ngcontent-%COMP%]   .submission-stats[_ngcontent-%COMP%]   .submission-metric[_ngcontent-%COMP%] {\n  padding: 1rem;\n  background: var(--ion-color-light-tint);\n  border-radius: 8px;\n}\n.submission-monitoring[_ngcontent-%COMP%]   .submission-stats[_ngcontent-%COMP%]   .submission-metric[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n  display: block;\n  margin-bottom: 0.5rem;\n}\n.submission-monitoring[_ngcontent-%COMP%]   .submission-stats[_ngcontent-%COMP%]   .submission-metric[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  display: block;\n  margin-bottom: 0.5rem;\n}\n.submission-monitoring[_ngcontent-%COMP%]   .submission-stats[_ngcontent-%COMP%]   .submission-metric[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%] {\n  height: 6px;\n  border-radius: 3px;\n}\n\n.strategic-insights[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.strategic-insights[_ngcontent-%COMP%]   .insights-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1rem;\n}\n.strategic-insights[_ngcontent-%COMP%]   .insights-grid[_ngcontent-%COMP%]   .insight-card[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\n  border-radius: 12px;\n  border-left: 4px solid var(--ion-color-primary);\n}\n.strategic-insights[_ngcontent-%COMP%]   .insights-grid[_ngcontent-%COMP%]   .insight-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  color: var(--ion-color-primary);\n  font-size: 1.1rem;\n  font-weight: 600;\n}\n.strategic-insights[_ngcontent-%COMP%]   .insights-grid[_ngcontent-%COMP%]   .insight-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n  font-size: 0.9rem;\n  line-height: 1.4;\n}\n.strategic-insights[_ngcontent-%COMP%]   .insights-grid[_ngcontent-%COMP%]   .insight-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--ion-color-dark);\n}\n\n.performance-analytics[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.performance-analytics[_ngcontent-%COMP%]   .performance-tiers[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n.performance-analytics[_ngcontent-%COMP%]   .performance-tiers[_ngcontent-%COMP%]   .tier[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-radius: 12px;\n  border-left: 6px solid;\n}\n.performance-analytics[_ngcontent-%COMP%]   .performance-tiers[_ngcontent-%COMP%]   .tier.elite[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);\n  border-left-color: #f39c12;\n}\n.performance-analytics[_ngcontent-%COMP%]   .performance-tiers[_ngcontent-%COMP%]   .tier.champion[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);\n  border-left-color: #17a2b8;\n}\n.performance-analytics[_ngcontent-%COMP%]   .performance-tiers[_ngcontent-%COMP%]   .tier.contender[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);\n  border-left-color: #28a745;\n}\n.performance-analytics[_ngcontent-%COMP%]   .performance-tiers[_ngcontent-%COMP%]   .tier.developing[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f8d7da 0%, #f1b0b7 100%);\n  border-left-color: #dc3545;\n}\n.performance-analytics[_ngcontent-%COMP%]   .performance-tiers[_ngcontent-%COMP%]   .tier[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n.performance-analytics[_ngcontent-%COMP%]   .performance-tiers[_ngcontent-%COMP%]   .tier[_ngcontent-%COMP%]   .tier-stats[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.performance-analytics[_ngcontent-%COMP%]   .performance-tiers[_ngcontent-%COMP%]   .tier[_ngcontent-%COMP%]   .tier-stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 20px;\n  font-size: 0.85rem;\n  font-weight: 500;\n}\n\n.top-performers[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 1rem;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-grid[_ngcontent-%COMP%]   .performer-card[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-grid[_ngcontent-%COMP%]   .performer-card[_ngcontent-%COMP%]   .performer-stats[_ngcontent-%COMP%]   .stat-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 0.75rem 0;\n}\n.top-performers[_ngcontent-%COMP%]   .performers-grid[_ngcontent-%COMP%]   .performer-card[_ngcontent-%COMP%]   .performer-stats[_ngcontent-%COMP%]   .stat-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  font-weight: 500;\n  color: var(--ion-color-medium);\n}\n.top-performers[_ngcontent-%COMP%]   .performers-grid[_ngcontent-%COMP%]   .performer-card[_ngcontent-%COMP%]   .performer-stats[_ngcontent-%COMP%]   .stat-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child, .top-performers[_ngcontent-%COMP%]   .performers-grid[_ngcontent-%COMP%]   .performer-card[_ngcontent-%COMP%]   .performer-stats[_ngcontent-%COMP%]   .stat-row[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  color: var(--ion-color-primary);\n  font-size: 1.1rem;\n  font-weight: 600;\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .timing-stats[_ngcontent-%COMP%]   .timing-item[_ngcontent-%COMP%], .behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .timing-stats[_ngcontent-%COMP%]   .joker-stat[_ngcontent-%COMP%], .behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .joker-intelligence[_ngcontent-%COMP%]   .timing-item[_ngcontent-%COMP%], .behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .joker-intelligence[_ngcontent-%COMP%]   .joker-stat[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.75rem;\n  margin: 0.5rem 0;\n  background: var(--ion-color-light-tint);\n  border-radius: 8px;\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .timing-stats[_ngcontent-%COMP%]   .timing-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child, .behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .timing-stats[_ngcontent-%COMP%]   .joker-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child, .behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .joker-intelligence[_ngcontent-%COMP%]   .timing-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child, .behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .joker-intelligence[_ngcontent-%COMP%]   .joker-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  font-weight: 500;\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .timing-stats[_ngcontent-%COMP%]   .timing-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child, .behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .timing-stats[_ngcontent-%COMP%]   .joker-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child, .behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .joker-intelligence[_ngcontent-%COMP%]   .timing-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child, .behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .joker-intelligence[_ngcontent-%COMP%]   .joker-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: var(--ion-color-medium);\n  font-weight: 600;\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .risk-profiles[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .risk-profiles[_ngcontent-%COMP%]   .risk-item[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-radius: 12px;\n  text-align: center;\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .risk-profiles[_ngcontent-%COMP%]   .risk-item.conservative[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .risk-profiles[_ngcontent-%COMP%]   .risk-item.balanced[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .risk-profiles[_ngcontent-%COMP%]   .risk-item.aggressive[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%);\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .risk-profiles[_ngcontent-%COMP%]   .risk-item[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .risk-profiles[_ngcontent-%COMP%]   .risk-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0;\n  font-size: 0.9rem;\n}\n.behavior-patterns[_ngcontent-%COMP%]   .behavior-insights[_ngcontent-%COMP%]   .behavior-section[_ngcontent-%COMP%]   .risk-profiles[_ngcontent-%COMP%]   .risk-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:first-of-type {\n  font-weight: 600;\n  color: var(--ion-color-primary);\n}\n\n.intervention-center[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.intervention-center[_ngcontent-%COMP%]   .intervention-categories[_ngcontent-%COMP%]   .intervention-category[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.intervention-center[_ngcontent-%COMP%]   .intervention-categories[_ngcontent-%COMP%]   .intervention-category[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  padding: 0.75rem 1rem;\n  background: var(--ion-color-primary-tint);\n  color: var(--ion-color-primary-contrast);\n  border-radius: 8px;\n  font-weight: 600;\n}\n.intervention-center[_ngcontent-%COMP%]   .intervention-categories[_ngcontent-%COMP%]   .intervention-category[_ngcontent-%COMP%]   .intervention-items[_ngcontent-%COMP%]   .intervention-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 2fr auto;\n  gap: 1rem;\n  padding: 1rem;\n  margin: 0.5rem 0;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n  border-left: 4px solid var(--ion-color-warning);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.intervention-center[_ngcontent-%COMP%]   .intervention-categories[_ngcontent-%COMP%]   .intervention-category[_ngcontent-%COMP%]   .intervention-items[_ngcontent-%COMP%]   .intervention-item[_ngcontent-%COMP%]   .intervention-user[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.intervention-center[_ngcontent-%COMP%]   .intervention-categories[_ngcontent-%COMP%]   .intervention-category[_ngcontent-%COMP%]   .intervention-items[_ngcontent-%COMP%]   .intervention-item[_ngcontent-%COMP%]   .intervention-user[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  color: var(--ion-color-medium);\n}\n.intervention-center[_ngcontent-%COMP%]   .intervention-categories[_ngcontent-%COMP%]   .intervention-category[_ngcontent-%COMP%]   .intervention-items[_ngcontent-%COMP%]   .intervention-item[_ngcontent-%COMP%]   .intervention-recommendation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0;\n  font-size: 0.9rem;\n}\n.intervention-center[_ngcontent-%COMP%]   .intervention-categories[_ngcontent-%COMP%]   .intervention-category[_ngcontent-%COMP%]   .intervention-items[_ngcontent-%COMP%]   .intervention-item[_ngcontent-%COMP%]   .intervention-recommendation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--ion-color-dark);\n}\n.intervention-center[_ngcontent-%COMP%]   .intervention-categories[_ngcontent-%COMP%]   .intervention-category[_ngcontent-%COMP%]   .intervention-items[_ngcontent-%COMP%]   .intervention-item[_ngcontent-%COMP%]   .intervention-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  align-items: flex-end;\n}\n.intervention-center[_ngcontent-%COMP%]   .intervention-categories[_ngcontent-%COMP%]   .intervention-category[_ngcontent-%COMP%]   .intervention-items[_ngcontent-%COMP%]   .intervention-item[_ngcontent-%COMP%]   .intervention-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 0.75rem;\n  --padding-end: 0.75rem;\n  font-size: 0.8rem;\n}\n\n.intervention-impact[_ngcontent-%COMP%]   .impact-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\n.intervention-impact[_ngcontent-%COMP%]   .impact-metrics[_ngcontent-%COMP%]   .impact-item[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\n  border-radius: 12px;\n  text-align: center;\n}\n.intervention-impact[_ngcontent-%COMP%]   .impact-metrics[_ngcontent-%COMP%]   .impact-item[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  color: var(--ion-color-primary);\n  font-weight: 600;\n}\n.intervention-impact[_ngcontent-%COMP%]   .impact-metrics[_ngcontent-%COMP%]   .impact-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n}\n\n@media (max-width: 768px) {\n  .health-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n  .submission-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n  .insights-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n  .performers-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n  .intervention-item[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n    gap: 0.75rem;\n  }\n  .intervention-item[_ngcontent-%COMP%]   .intervention-actions[_ngcontent-%COMP%] {\n    flex-direction: row !important;\n    align-items: center;\n  }\n}\n@media (max-width: 576px) {\n  .submission-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n  .tier-stats[_ngcontent-%COMP%] {\n    flex-direction: column !important;\n    gap: 0.5rem !important;\n  }\n  .risk-profiles[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n  .impact-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,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RkY7RUF5RkE7SUFDRSxxQ0FBQTtFQXZGRjtFQTBGQTtJQUNFLHFDQUFBO0lBQ0EsWUFBQTtFQXhGRjtFQTBGRTtJQUNFLDhCQUFBO0lBQ0EsbUJBQUE7RUF4Rko7QUFDRjtBQTRGQTtFQUNFO0lBQ0UscUNBQUE7RUExRkY7RUE2RkE7SUFDRSxpQ0FBQTtJQUNBLHNCQUFBO0VBM0ZGO0VBOEZBO0lBQ0UscUNBQUE7RUE1RkY7RUErRkE7SUFDRSxnREFBQTtFQTdGRjtBQUNGIiwiZmlsZSI6InByZWRpY3Rpb25zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFBsYXRmb3JtIFN0ZXdhcmQgUHJlZGljdGlvbiBBbmFseXRpY3MgU3R5bGVzXG4vLyBVc2UgZGVmYXVsdCBJb25pYyBzY3JvbGxpbmcgYmVoYXZpb3IgbGlrZSBkYXNoYm9hcmRcblxuLy8gUGxhdGZvcm0gSGVhbHRoIE92ZXJ2aWV3XG4ucGxhdGZvcm0taGVhbHRoIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBcbiAgLmhlYWx0aC1tZXRyaWNzIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjUwcHgsIDFmcikpO1xuICAgIGdhcDogMXJlbTtcbiAgICBcbiAgICAubWV0cmljLWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDFyZW07XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG5cbiAgICAgIC5tZXRyaWMtaWNvbiB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcbiAgICAgICAgXG4gICAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgLm1ldHJpYy1pbmZvIHtcbiAgZmxleDogMTtcbiAgICAgICAgXG4gICAgICAgIGgzIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwIHtcbiAgICAgICAgICBtYXJnaW46IDAuMjVyZW0gMCAwIDA7XG4gICAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIFN1Ym1pc3Npb24gTW9uaXRvcmluZ1xuLnN1Ym1pc3Npb24tbW9uaXRvcmluZyB7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgXG4gIC5zdWJtaXNzaW9uLXN0YXRzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XG4gIGdhcDogMXJlbTtcbiAgICBcbiAgICAuc3VibWlzc2lvbi1tZXRyaWMge1xuICBwYWRkaW5nOiAxcmVtO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBcbiAgICAgIC5sYWJlbCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICB9XG4gICAgICBcbiAgICAgIC52YWx1ZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpb24tcHJvZ3Jlc3MtYmFyIHtcbiAgICAgICAgaGVpZ2h0OiA2cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gU3RyYXRlZ2ljIEluc2lnaHRzXG4uc3RyYXRlZ2ljLWluc2lnaHRzIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBcbiAgLmluc2lnaHRzLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMzAwcHgsIDFmcikpO1xuICAgIGdhcDogMXJlbTtcbiAgICBcbiAgICAuaW5zaWdodC1jYXJkIHtcbiAgICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmOGY5ZmEgMCUsICNlOWVjZWYgMTAwJSk7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBcbiAgICAgIGg0IHtcbiAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgcCB7XG4gICAgICAgIG1hcmdpbjogMC41cmVtIDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgICBcbiAgICAgICAgc3Ryb25nIHtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xufVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBQZXJmb3JtYW5jZSBBbmFseXRpY3Ncbi5wZXJmb3JtYW5jZS1hbmFseXRpY3Mge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG4gIFxuICAucGVyZm9ybWFuY2UtdGllcnMge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ2FwOiAxcmVtO1xuICAgIFxuICAgIC50aWVyIHtcbiAgICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBib3JkZXItbGVmdDogNnB4IHNvbGlkO1xuICAgICAgXG4gICAgICAmLmVsaXRlIHtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmZjNjZCAwJSwgI2ZmZWFhNyAxMDAlKTtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICNmMzljMTI7XG4gICAgICB9XG4gICAgICBcbiAgICAgICYuY2hhbXBpb24ge1xuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZDFlY2YxIDAlLCAjYmVlNWViIDEwMCUpO1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogIzE3YTJiODtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgJi5jb250ZW5kZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZDRlZGRhIDAlLCAjYzNlNmNiIDEwMCUpO1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogIzI4YTc0NTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgJi5kZXZlbG9waW5nIHtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y4ZDdkYSAwJSwgI2YxYjBiNyAxMDAlKTtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICNkYzM1NDU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGgzIHtcbiAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnRpZXItc3RhdHMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgIGdhcDogMXJlbTtcbiAgICAgICAgXG4gICAgICAgIHNwYW4ge1xuICAgICAgICAgIHBhZGRpbmc6IDAuMjVyZW0gMC43NXJlbTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgICAgICAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBUb3AgUGVyZm9ybWVyc1xuLnRvcC1wZXJmb3JtZXJzIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBcbiAgLnBlcmZvcm1lcnMtZ3JpZCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDMyMHB4LCAxZnIpKTtcbiAgICBnYXA6IDFyZW07XG4gICAgXG4gICAgLnBlcmZvcm1lci1jYXJkIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIFxuICAgICAgLnBlcmZvcm1lci1zdGF0cyB7XG4gICAgICAgIC5zdGF0LXJvdyB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBtYXJnaW46IDAuNzVyZW0gMDtcbiAgICAgICAgICBcbiAgICAgICAgICBzcGFuOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbn1cblxuICAgICAgICAgIHNwYW46bGFzdC1jaGlsZCwgaW9uLWJhZGdlIHtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIEJlaGF2aW9yIFBhdHRlcm5zXG4uYmVoYXZpb3ItcGF0dGVybnMge1xuICAuYmVoYXZpb3ItaW5zaWdodHMge1xuICAgIC5iZWhhdmlvci1zZWN0aW9uIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gICAgICBcbiAgICAgIGg0IHtcbiAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnRpbWluZy1zdGF0cywgLmpva2VyLWludGVsbGlnZW5jZSB7XG4gICAgICAgIC50aW1pbmctaXRlbSwgLmpva2VyLXN0YXQge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNzVyZW07XG4gICAgICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtdGludCk7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICAgIFxuICAgICAgICAgIHNwYW46Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgc3BhbjpsYXN0LWNoaWxkIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbn1cblxuICAgICAgLnJpc2stcHJvZmlsZXMge1xuICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI1MHB4LCAxZnIpKTtcbiAgZ2FwOiAxcmVtO1xuICAgICAgICBcbiAgICAgICAgLnJpc2staXRlbSB7XG4gICAgICAgICAgcGFkZGluZzogMS41cmVtO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICBcbiAgICAgICAgICAmLmNvbnNlcnZhdGl2ZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZThmNWU4IDAlLCAjZDRlZGRhIDEwMCUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAmLmJhbGFuY2VkIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlM2YyZmQgMCUsICNiYmRlZmIgMTAwJSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgICYuYWdncmVzc2l2ZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmZmM2UwIDAlLCAjZmZjYzgwIDEwMCUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBoNSB7XG4gICAgICAgICAgICBtYXJnaW46IDAgMCAwLjVyZW0gMDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBwIHtcbiAgICAgICAgICAgIG1hcmdpbjogMC4yNXJlbSAwO1xuICAgICAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICY6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIEludGVydmVudGlvbiBDZW50ZXJcbi5pbnRlcnZlbnRpb24tY2VudGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBcbiAgLmludGVydmVudGlvbi1jYXRlZ29yaWVzIHtcbiAgICAuaW50ZXJ2ZW50aW9uLWNhdGVnb3J5IHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gICAgICBcbiAgICAgIGg0IHtcbiAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICBwYWRkaW5nOiAwLjc1cmVtIDFyZW07XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQpO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5pbnRlcnZlbnRpb24taXRlbXMge1xuICAgICAgICAuaW50ZXJ2ZW50aW9uLWl0ZW0ge1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMmZyIGF1dG87XG4gICAgICAgICAgZ2FwOiAxcmVtO1xuICAgICAgICAgIHBhZGRpbmc6IDFyZW07XG4gICAgICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcbiAgICAgICAgICBcbiAgICAgICAgICAuaW50ZXJ2ZW50aW9uLXVzZXIge1xuICAgICAgICAgICAgaDUge1xuICAgICAgICAgICAgICBtYXJnaW46IDAgMCAwLjI1cmVtIDA7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHAge1xuICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAuaW50ZXJ2ZW50aW9uLXJlY29tbWVuZGF0aW9uIHtcbiAgICAgICAgICAgIHAge1xuICAgICAgICAgICAgICBtYXJnaW46IDAuMjVyZW0gMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBzdHJvbmcge1xuICAgICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgLmludGVydmVudGlvbi1hY3Rpb25zIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgZ2FwOiAwLjVyZW07XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDAuNzVyZW07XG4gICAgICAgICAgICAgIC0tcGFkZGluZy1lbmQ6IDAuNzVyZW07XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBJbnRlcnZlbnRpb24gSW1wYWN0XG4uaW50ZXJ2ZW50aW9uLWltcGFjdCB7XG4gIC5pbXBhY3QtbWV0cmljcyB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKTtcbiAgICBnYXA6IDFyZW07XG4gICAgXG4gICAgLmltcGFjdC1pdGVtIHtcbiAgICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmOGY5ZmEgMCUsICNlOWVjZWYgMTAwJSk7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgXG4gICAgICBoNCB7XG4gICAgICAgIG1hcmdpbjogMCAwIDAuNXJlbSAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgfVxuICAgICAgXG4gICAgICBwIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBSZXNwb25zaXZlIERlc2lnblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5oZWFsdGgtbWV0cmljcyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcbiAgfVxuICBcbiAgLnN1Ym1pc3Npb24tc3RhdHMge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcikgIWltcG9ydGFudDtcbiAgfVxuICBcbiAgLmluc2lnaHRzLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyICFpbXBvcnRhbnQ7XG4gIH1cbiAgXG4gIC5wZXJmb3JtZXJzLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyICFpbXBvcnRhbnQ7XG4gIH1cbiAgXG4gIC5pbnRlcnZlbnRpb24taXRlbSB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcbiAgICBnYXA6IDAuNzVyZW07XG4gICAgXG4gICAgLmludGVydmVudGlvbi1hY3Rpb25zIHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3cgIWltcG9ydGFudDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAuc3VibWlzc2lvbi1zdGF0cyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcbiAgfVxuICBcbiAgLnRpZXItc3RhdHMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4gIWltcG9ydGFudDtcbiAgICBnYXA6IDAuNXJlbSAhaW1wb3J0YW50O1xuICB9XG4gIFxuICAucmlzay1wcm9maWxlcyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcbiAgfVxuICBcbiAgLmltcGFjdC1tZXRyaWNzIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpICFpbXBvcnRhbnQ7XG4gIH1cbn1cbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3N1cGVyLWFkbWluL3BhZ2VzL3ByZWRpY3Rpb25zL3ByZWRpY3Rpb25zLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtFQUNFLHFCQUFBO0FBSEY7QUFLRTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7QUFISjtBQUtJO0VBQ0YsYUFBQTtFQUNJLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGtDQUFBO0VBQ0EsbUJBQUE7RUFDQSx3Q0FBQTtBQUhOO0FBS007RUFDRSxrQkFBQTtBQUhSO0FBS1E7RUFDRSxlQUFBO0FBSFY7QUFPTTtFQUNKLE9BQUE7QUFMRjtBQU9RO0VBQ0UsU0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQUxWO0FBUVE7RUFDRSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsOEJBQUE7QUFOVjs7QUFjQTtFQUNFLHFCQUFBO0FBWEY7QUFhRTtFQUNBLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7QUFYRjtBQWFJO0VBQ0YsYUFBQTtFQUNJLHVDQUFBO0VBQ0osa0JBQUE7QUFYRjtBQWFNO0VBQ0UsaUJBQUE7RUFDQSw4QkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtBQVhSO0FBY007RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7QUFaUjtBQWVNO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0FBYlI7O0FBb0JBO0VBQ0UscUJBQUE7QUFqQkY7QUFtQkU7RUFDQSxhQUFBO0VBQ0UsMkRBQUE7RUFDQSxTQUFBO0FBakJKO0FBbUJJO0VBQ0UsZUFBQTtFQUNBLDZEQUFBO0VBQ0EsbUJBQUE7RUFDQSwrQ0FBQTtBQWpCTjtBQW1CTTtFQUNFLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBakJSO0FBb0JNO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBbEJS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SUFDRSxxQ0FBQTtFQXBGRjtFQXVGQTtJQUNFLGdEQUFBO0VBckZGO0VBd0ZBO0lBQ0UscUNBQUE7RUF0RkY7RUF5RkE7SUFDRSxxQ0FBQTtFQXZGRjtFQTBGQTtJQUNFLHFDQUFBO0lBQ0EsWUFBQTtFQXhGRjtFQTBGRTtJQUNFLDhCQUFBO0lBQ0EsbUJBQUE7RUF4Rko7QUFDRjtBQTRGQTtFQUNFO0lBQ0UscUNBQUE7RUExRkY7RUE2RkE7SUFDRSxpQ0FBQTtJQUNBLHNCQUFBO0VBM0ZGO0VBOEZBO0lBQ0UscUNBQUE7RUE1RkY7RUErRkE7SUFDRSxnREFBQTtFQTdGRjtBQUNGO0FBQ0Esd3JoQkFBd3JoQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFBsYXRmb3JtIFN0ZXdhcmQgUHJlZGljdGlvbiBBbmFseXRpY3MgU3R5bGVzXG4vLyBVc2UgZGVmYXVsdCBJb25pYyBzY3JvbGxpbmcgYmVoYXZpb3IgbGlrZSBkYXNoYm9hcmRcblxuLy8gUGxhdGZvcm0gSGVhbHRoIE92ZXJ2aWV3XG4ucGxhdGZvcm0taGVhbHRoIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBcbiAgLmhlYWx0aC1tZXRyaWNzIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjUwcHgsIDFmcikpO1xuICAgIGdhcDogMXJlbTtcbiAgICBcbiAgICAubWV0cmljLWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDFyZW07XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG5cbiAgICAgIC5tZXRyaWMtaWNvbiB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcbiAgICAgICAgXG4gICAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgLm1ldHJpYy1pbmZvIHtcbiAgZmxleDogMTtcbiAgICAgICAgXG4gICAgICAgIGgzIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwIHtcbiAgICAgICAgICBtYXJnaW46IDAuMjVyZW0gMCAwIDA7XG4gICAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIFN1Ym1pc3Npb24gTW9uaXRvcmluZ1xuLnN1Ym1pc3Npb24tbW9uaXRvcmluZyB7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgXG4gIC5zdWJtaXNzaW9uLXN0YXRzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XG4gIGdhcDogMXJlbTtcbiAgICBcbiAgICAuc3VibWlzc2lvbi1tZXRyaWMge1xuICBwYWRkaW5nOiAxcmVtO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBcbiAgICAgIC5sYWJlbCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICB9XG4gICAgICBcbiAgICAgIC52YWx1ZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpb24tcHJvZ3Jlc3MtYmFyIHtcbiAgICAgICAgaGVpZ2h0OiA2cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gU3RyYXRlZ2ljIEluc2lnaHRzXG4uc3RyYXRlZ2ljLWluc2lnaHRzIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBcbiAgLmluc2lnaHRzLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMzAwcHgsIDFmcikpO1xuICAgIGdhcDogMXJlbTtcbiAgICBcbiAgICAuaW5zaWdodC1jYXJkIHtcbiAgICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmOGY5ZmEgMCUsICNlOWVjZWYgMTAwJSk7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBcbiAgICAgIGg0IHtcbiAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgcCB7XG4gICAgICAgIG1hcmdpbjogMC41cmVtIDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgICBcbiAgICAgICAgc3Ryb25nIHtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xufVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBQZXJmb3JtYW5jZSBBbmFseXRpY3Ncbi5wZXJmb3JtYW5jZS1hbmFseXRpY3Mge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG4gIFxuICAucGVyZm9ybWFuY2UtdGllcnMge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ2FwOiAxcmVtO1xuICAgIFxuICAgIC50aWVyIHtcbiAgICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBib3JkZXItbGVmdDogNnB4IHNvbGlkO1xuICAgICAgXG4gICAgICAmLmVsaXRlIHtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmZjNjZCAwJSwgI2ZmZWFhNyAxMDAlKTtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICNmMzljMTI7XG4gICAgICB9XG4gICAgICBcbiAgICAgICYuY2hhbXBpb24ge1xuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZDFlY2YxIDAlLCAjYmVlNWViIDEwMCUpO1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogIzE3YTJiODtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgJi5jb250ZW5kZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZDRlZGRhIDAlLCAjYzNlNmNiIDEwMCUpO1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogIzI4YTc0NTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgJi5kZXZlbG9waW5nIHtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y4ZDdkYSAwJSwgI2YxYjBiNyAxMDAlKTtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICNkYzM1NDU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGgzIHtcbiAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnRpZXItc3RhdHMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgIGdhcDogMXJlbTtcbiAgICAgICAgXG4gICAgICAgIHNwYW4ge1xuICAgICAgICAgIHBhZGRpbmc6IDAuMjVyZW0gMC43NXJlbTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgICAgICAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBUb3AgUGVyZm9ybWVyc1xuLnRvcC1wZXJmb3JtZXJzIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBcbiAgLnBlcmZvcm1lcnMtZ3JpZCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDMyMHB4LCAxZnIpKTtcbiAgICBnYXA6IDFyZW07XG4gICAgXG4gICAgLnBlcmZvcm1lci1jYXJkIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIFxuICAgICAgLnBlcmZvcm1lci1zdGF0cyB7XG4gICAgICAgIC5zdGF0LXJvdyB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBtYXJnaW46IDAuNzVyZW0gMDtcbiAgICAgICAgICBcbiAgICAgICAgICBzcGFuOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbn1cblxuICAgICAgICAgIHNwYW46bGFzdC1jaGlsZCwgaW9uLWJhZGdlIHtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIEJlaGF2aW9yIFBhdHRlcm5zXG4uYmVoYXZpb3ItcGF0dGVybnMge1xuICAuYmVoYXZpb3ItaW5zaWdodHMge1xuICAgIC5iZWhhdmlvci1zZWN0aW9uIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gICAgICBcbiAgICAgIGg0IHtcbiAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnRpbWluZy1zdGF0cywgLmpva2VyLWludGVsbGlnZW5jZSB7XG4gICAgICAgIC50aW1pbmctaXRlbSwgLmpva2VyLXN0YXQge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNzVyZW07XG4gICAgICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtdGludCk7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICAgIFxuICAgICAgICAgIHNwYW46Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgc3BhbjpsYXN0LWNoaWxkIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbn1cblxuICAgICAgLnJpc2stcHJvZmlsZXMge1xuICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI1MHB4LCAxZnIpKTtcbiAgZ2FwOiAxcmVtO1xuICAgICAgICBcbiAgICAgICAgLnJpc2staXRlbSB7XG4gICAgICAgICAgcGFkZGluZzogMS41cmVtO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICBcbiAgICAgICAgICAmLmNvbnNlcnZhdGl2ZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZThmNWU4IDAlLCAjZDRlZGRhIDEwMCUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAmLmJhbGFuY2VkIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlM2YyZmQgMCUsICNiYmRlZmIgMTAwJSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgICYuYWdncmVzc2l2ZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmZmM2UwIDAlLCAjZmZjYzgwIDEwMCUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBoNSB7XG4gICAgICAgICAgICBtYXJnaW46IDAgMCAwLjVyZW0gMDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBwIHtcbiAgICAgICAgICAgIG1hcmdpbjogMC4yNXJlbSAwO1xuICAgICAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICY6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIEludGVydmVudGlvbiBDZW50ZXJcbi5pbnRlcnZlbnRpb24tY2VudGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBcbiAgLmludGVydmVudGlvbi1jYXRlZ29yaWVzIHtcbiAgICAuaW50ZXJ2ZW50aW9uLWNhdGVnb3J5IHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gICAgICBcbiAgICAgIGg0IHtcbiAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICBwYWRkaW5nOiAwLjc1cmVtIDFyZW07XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQpO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5pbnRlcnZlbnRpb24taXRlbXMge1xuICAgICAgICAuaW50ZXJ2ZW50aW9uLWl0ZW0ge1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMmZyIGF1dG87XG4gICAgICAgICAgZ2FwOiAxcmVtO1xuICAgICAgICAgIHBhZGRpbmc6IDFyZW07XG4gICAgICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcbiAgICAgICAgICBcbiAgICAgICAgICAuaW50ZXJ2ZW50aW9uLXVzZXIge1xuICAgICAgICAgICAgaDUge1xuICAgICAgICAgICAgICBtYXJnaW46IDAgMCAwLjI1cmVtIDA7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHAge1xuICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAuaW50ZXJ2ZW50aW9uLXJlY29tbWVuZGF0aW9uIHtcbiAgICAgICAgICAgIHAge1xuICAgICAgICAgICAgICBtYXJnaW46IDAuMjVyZW0gMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBzdHJvbmcge1xuICAgICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgLmludGVydmVudGlvbi1hY3Rpb25zIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgZ2FwOiAwLjVyZW07XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDAuNzVyZW07XG4gICAgICAgICAgICAgIC0tcGFkZGluZy1lbmQ6IDAuNzVyZW07XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBJbnRlcnZlbnRpb24gSW1wYWN0XG4uaW50ZXJ2ZW50aW9uLWltcGFjdCB7XG4gIC5pbXBhY3QtbWV0cmljcyB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKTtcbiAgICBnYXA6IDFyZW07XG4gICAgXG4gICAgLmltcGFjdC1pdGVtIHtcbiAgICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmOGY5ZmEgMCUsICNlOWVjZWYgMTAwJSk7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgXG4gICAgICBoNCB7XG4gICAgICAgIG1hcmdpbjogMCAwIDAuNXJlbSAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgfVxuICAgICAgXG4gICAgICBwIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBSZXNwb25zaXZlIERlc2lnblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5oZWFsdGgtbWV0cmljcyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcbiAgfVxuICBcbiAgLnN1Ym1pc3Npb24tc3RhdHMge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcikgIWltcG9ydGFudDtcbiAgfVxuICBcbiAgLmluc2lnaHRzLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyICFpbXBvcnRhbnQ7XG4gIH1cbiAgXG4gIC5wZXJmb3JtZXJzLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyICFpbXBvcnRhbnQ7XG4gIH1cbiAgXG4gIC5pbnRlcnZlbnRpb24taXRlbSB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcbiAgICBnYXA6IDAuNzVyZW07XG4gICAgXG4gICAgLmludGVydmVudGlvbi1hY3Rpb25zIHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3cgIWltcG9ydGFudDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAuc3VibWlzc2lvbi1zdGF0cyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcbiAgfVxuICBcbiAgLnRpZXItc3RhdHMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4gIWltcG9ydGFudDtcbiAgICBnYXA6IDAuNXJlbSAhaW1wb3J0YW50O1xuICB9XG4gIFxuICAucmlzay1wcm9maWxlcyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgIWltcG9ydGFudDtcbiAgfVxuICBcbiAgLmltcGFjdC1tZXRyaWNzIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpICFpbXBvcnRhbnQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_super-admin_pages_predictions_predictions_page_ts.js.map