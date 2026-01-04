"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_player_pages_predictions_predictions_page_ts"],{

/***/ 4946:
/*!************************************************************************!*\
  !*** ./src/app/platforms/player/pages/predictions/predictions.page.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PredictionsPage: () => (/* binding */ PredictionsPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_mock_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/services/mock-data.service */ 8005);
var _PredictionsPage;









function PredictionsPage_div_19_ion_card_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-content")(2, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " No predictions submitted for the current gameweek. Visit the Matches tab to make your predictions. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}
function PredictionsPage_div_19_ion_card_2_ion_item_6_ion_badge_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-badge", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const pred_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" LIVE ", ctx_r1.getMatchTime(pred_r1.match), " ");
  }
}
function PredictionsPage_div_19_ion_card_2_ion_item_6_div_19_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "ion-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const pred_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", ctx_r1.getStatusIcon(pred_r1.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", pred_r1.points, " pts ");
  }
}
function PredictionsPage_div_19_ion_card_2_ion_item_6_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 29)(1, "div", 30)(2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, PredictionsPage_div_19_ion_card_2_ion_item_6_div_19_div_8_Template, 3, 2, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const pred_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", ctx_r1.getScoreClass(pred_r1.match));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.isMatchFinished(pred_r1.match) ? "FINAL SCORE" : "LIVE SCORE");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", (pred_r1.match.liveScore == null ? null : pred_r1.match.liveScore.home) || 0, " - ", (pred_r1.match.liveScore == null ? null : pred_r1.match.liveScore.away) || 0, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.getMatchTime(pred_r1.match));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.isMatchFinished(pred_r1.match) && pred_r1.points !== undefined);
  }
}
function PredictionsPage_div_19_ion_card_2_ion_item_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item")(1, "div", 16)(2, "div", 17)(3, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "ion-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, PredictionsPage_div_19_ion_card_2_ion_item_6_ion_badge_9_Template, 2, 1, "ion-badge", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 22)(11, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 24)(14, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "PREDICTION");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, PredictionsPage_div_19_ion_card_2_ion_item_6_div_19_Template, 9, 6, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const pred_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pred_r1.match.venue);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](8, 8, pred_r1.match.kickoff, "EEE d MMM, HH:mm"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.isMatchLive(pred_r1.match));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pred_r1.match.homeTeam);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", pred_r1.prediction.home, " - ", pred_r1.prediction.away, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pred_r1.match.awayTeam);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", pred_r1.match.liveScore == null ? null : pred_r1.match.liveScore.isLive);
  }
}
function PredictionsPage_div_19_ion_card_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-header")(2, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "ion-card-content")(5, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, PredictionsPage_div_19_ion_card_2_ion_item_6_Template, 20, 11, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Gameweek ", ctx_r1.currentGameweek, " Predictions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.currentPredictions);
  }
}
function PredictionsPage_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, PredictionsPage_div_19_ion_card_1_Template, 4, 0, "ion-card", 13)(2, PredictionsPage_div_19_ion_card_2_Template, 7, 2, "ion-card", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.currentPredictions.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.currentPredictions.length > 0);
  }
}
function PredictionsPage_div_20_ion_card_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-content")(2, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" No predictions found for Gameweek ", ctx_r1.selectedHistoryGameweek, ". ");
  }
}
function PredictionsPage_div_20_ion_card_10_ion_item_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item")(1, "div", 16)(2, "div", 17)(3, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "ion-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 22)(10, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 24)(13, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "PREDICTION");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 29)(19, "div", 41)(20, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "FINAL SCORE");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "FT");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](27, "ion-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const pred_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pred_r4.match.venue);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](8, 10, pred_r4.match.kickoff, "EEE d MMM, HH:mm"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pred_r4.match.homeTeam);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", pred_r4.prediction.home, " - ", pred_r4.prediction.away, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pred_r4.match.awayTeam);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", (pred_r4.match.finalScore == null ? null : pred_r4.match.finalScore.home) || 0, " - ", (pred_r4.match.finalScore == null ? null : pred_r4.match.finalScore.away) || 0, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", ctx_r1.getStatusIcon(pred_r4.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", pred_r4.points, " pts ");
  }
}
function PredictionsPage_div_20_ion_card_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-content")(2, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, PredictionsPage_div_20_ion_card_10_ion_item_3_Template, 29, 13, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.historicalPredictions);
  }
}
function PredictionsPage_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 36)(2, "ion-button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_div_20_Template_ion_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.navigateHistoryGameweek(1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 39)(5, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ion-button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_div_20_Template_ion_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.navigateHistoryGameweek(-1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "ion-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, PredictionsPage_div_20_ion_card_9_Template, 4, 1, "ion-card", 13)(10, PredictionsPage_div_20_ion_card_10_Template, 4, 1, "ion-card", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx_r1.canNavigateHistory("back"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Gameweek ", ctx_r1.selectedHistoryGameweek, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx_r1.canNavigateHistory("forward"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.historicalPredictions.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.historicalPredictions.length > 0);
  }
}
class PredictionsPage {
  constructor(router, mockDataService) {
    this.router = router;
    this.mockDataService = mockDataService;
    this.selectedSegment = 'current';
    this.currentPredictions = [];
    this.historicalPredictions = [];
    this.showNewPredictionsToast = false;
    this.selectedHistoryGameweek = 14; // Start with previous gameweek
    this.historicalGameweeks = []; // To track available historical gameweeks
    (0,ionicons__WEBPACK_IMPORTED_MODULE_3__.a)({
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      closeCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.closeCircleOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.timeOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.checkmarkCircleOutline,
      chevronBackOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronBackOutline,
      chevronForwardOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronForwardOutline,
      personOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personOutline
    });
    // Initialize current gameweek from MockDataService
    this.currentGameweek = this.mockDataService.getCurrentGameweek();
  }
  ionViewWillEnter() {
    this.loadPredictions();
    // Start live score updates
    this.startLiveScoreUpdates();
  }
  ionViewWillLeave() {
    // Clean up interval when leaving the page
    if (this.liveScoreUpdateInterval) {
      clearInterval(this.liveScoreUpdateInterval);
    }
  }
  loadPredictions() {
    // Load current predictions from MockDataService
    const previousCurrentCount = this.currentPredictions.length;
    // Get current gameweek predictions
    this.currentPredictions = this.mockDataService.getPlayerPredictions(this.currentGameweek);
    // Get available historical gameweeks from MockDataService
    this.historicalGameweeks = this.mockDataService.getAvailableHistoricalGameweeks();
    // If we have historical gameweeks, set the selected one
    if (this.historicalGameweeks.length > 0) {
      this.selectedHistoryGameweek = this.historicalGameweeks[0];
    }
    // Get predictions for selected historical gameweek
    this.updateHistoricalPredictions();
    // Show toast if new predictions were added
    if (this.currentPredictions.length > previousCurrentCount && previousCurrentCount > 0) {
      this.showNewPredictionsToast = true;
    }
  }
  updateHistoricalPredictions() {
    // Get historical predictions from MockDataService
    this.historicalPredictions = this.mockDataService.getHistoricalPredictions(this.selectedHistoryGameweek);
  }
  navigateHistoryGameweek(delta) {
    const currentIndex = this.historicalGameweeks.indexOf(this.selectedHistoryGameweek);
    const newIndex = currentIndex + delta;
    if (newIndex >= 0 && newIndex < this.historicalGameweeks.length) {
      this.selectedHistoryGameweek = this.historicalGameweeks[newIndex];
      this.updateHistoricalPredictions();
    }
  }
  canNavigateHistory(direction) {
    const currentIndex = this.historicalGameweeks.indexOf(this.selectedHistoryGameweek);
    return direction === 'back' ? currentIndex < this.historicalGameweeks.length - 1 : currentIndex > 0;
  }
  getStatusColor(status) {
    switch (status) {
      case 'correct':
        return 'success';
      case 'incorrect':
        return 'danger';
      default:
        return 'warning';
    }
  }
  getStatusIcon(status) {
    switch (status) {
      case 'correct':
        return 'checkmark-circle-outline';
      case 'incorrect':
        return 'close-circle-outline';
      default:
        return 'time-outline';
    }
  }
  startLiveScoreUpdates() {
    // Update live scores every minute
    this.liveScoreUpdateInterval = setInterval(() => {
      this.updateLiveScores();
    }, 60000); // 60000ms = 1 minute
    // Initial update
    this.updateLiveScores();
  }
  updateLiveScores() {
    // Update live scores using MockDataService
    this.mockDataService.updateLiveScores();
    // Reload current predictions with updated live scores
    this.currentPredictions = this.mockDataService.getPlayerPredictions(this.currentGameweek);
  }
  getMatchTime(match) {
    return this.mockDataService.getMatchTime(match);
  }
  isMatchFinished(match) {
    return this.mockDataService.isMatchFinished(match);
  }
  isMatchLive(match) {
    return this.mockDataService.isMatchLive(match);
  }
  getScoreClass(match) {
    if (this.isMatchFinished(match)) {
      return 'finished';
    }
    return 'live';
  }
  navigateTo(path) {
    this.router.navigate([path]);
  }
}
_PredictionsPage = PredictionsPage;
_PredictionsPage.ɵfac = function PredictionsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PredictionsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_mock_data_service__WEBPACK_IMPORTED_MODULE_1__.MockDataService));
};
_PredictionsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _PredictionsPage,
  selectors: [["app-predictions"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
  decls: 21,
  vars: 4,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], ["slot", "end"], [3, "click"], ["name", "person-outline", 1, "profile-icon"], [1, "ion-padding"], ["message", "New predictions loaded!", "duration", "2000", "color", "success", "position", "top", "icon", "checkmark-circle-outline", 3, "isOpen"], [1, "predictions-segment", 3, "ngModelChange", "ngModel"], ["value", "current"], ["value", "history"], [4, "ngIf"], [1, "no-predictions"], [4, "ngFor", "ngForOf"], [1, "prediction-item"], [1, "match-info"], [1, "venue-info"], [1, "match-time"], ["name", "time-outline"], ["color", "danger", "class", "live-badge", 4, "ngIf"], [1, "teams-score"], [1, "team", "home"], [1, "score", "prediction"], [1, "score-label"], [1, "team", "away"], ["class", "live-score-container", 4, "ngIf"], ["color", "danger", 1, "live-badge"], [1, "live-score-container"], [1, "score", 3, "ngClass"], [1, "live-score-value"], [1, "match-minute"], ["class", "points-badge", 4, "ngIf"], [1, "points-badge"], [3, "name"], [1, "gameweek-navigation"], ["fill", "clear", 1, "nav-button", 3, "click", "disabled"], ["slot", "icon-only", "name", "chevron-back-outline"], [1, "gameweek-title"], ["slot", "icon-only", "name", "chevron-forward-outline"], [1, "score", "finished"]],
  template: function PredictionsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_Template_div_click_2_listener() {
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
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_Template_ion_button_click_10_listener() {
        return ctx.navigateTo("/player/settings");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "ion-content", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "ion-toast", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "ion-segment", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PredictionsPage_Template_ion_segment_ngModelChange_14_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.selectedSegment, $event) || (ctx.selectedSegment = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "ion-segment-button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, " My Predictions ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "ion-segment-button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, " History ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, PredictionsPage_div_19_Template, 3, 2, "div", 13)(20, PredictionsPage_div_20_Template, 11, 5, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("isOpen", ctx.showNewPredictionsToast);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedSegment);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedSegment === "current");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedSegment === "history");
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSegment, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSegmentButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButtons, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToast],
  styles: [".logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  cursor: pointer;\n  min-height: 44px;\n}\n.logo-container[_ngcontent-%COMP%]   .football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1;\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-sotd[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n}\n\n.stats-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  text-align: center;\n}\n\n.stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.stat-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.stat-item[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  color: var(--ion-color-dark);\n}\n.stat-item[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-medium);\n}\n\n.predictions-segment[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  --background: var(--ion-color-light);\n  min-height: 48px;\n}\n.predictions-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {\n  min-height: 48px;\n  font-size: 16px;\n  font-weight: 500;\n}\n\n.gameweek-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 0 8px;\n}\n\n.nav-button[_ngcontent-%COMP%] {\n  --padding-start: 12px;\n  --padding-end: 12px;\n  height: 48px;\n  width: 48px;\n  --color: var(--ion-color-medium);\n  border-radius: 50%;\n}\n.nav-button[disabled][_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.nav-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n\n.gameweek-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.gameweek-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 22px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\nion-card[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.no-predictions[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 24px;\n  color: var(--ion-color-medium);\n  font-size: 18px;\n  line-height: 1.5;\n}\n\n.prediction-item[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 16px 0;\n}\n\n.match-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 8px;\n}\n\n.venue-info[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n  text-align: left;\n  line-height: 1.3;\n}\n\n.match-time[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 14px;\n  color: var(--ion-color-medium);\n  text-align: right;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.match-time[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.match-time[_ngcontent-%COMP%]   .live-badge[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  --border-radius: 12px;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n\n@keyframes _ngcontent-%COMP%_pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.7;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.teams-score[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin: 12px 0;\n  min-height: 48px;\n}\n\n.team[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 17px;\n  font-weight: 600;\n  line-height: 1.3;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.team.home[_ngcontent-%COMP%] {\n  text-align: right;\n  padding-right: 8px;\n}\n.team.away[_ngcontent-%COMP%] {\n  text-align: left;\n  padding-left: 8px;\n}\n\n.live-score-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: 12px;\n  padding: 0 16px;\n}\n\n.score[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n  min-width: 100px;\n  text-align: center;\n  padding: 12px 20px;\n  background-color: var(--ion-color-light);\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.score.prediction[_ngcontent-%COMP%] {\n  background-color: var(--ion-color-primary-contrast);\n  border: 2px solid var(--ion-color-primary);\n  color: var(--ion-color-primary);\n  margin: 0;\n  font-weight: 700;\n}\n.score.live[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(var(--ion-color-danger-rgb), 0.15), rgba(var(--ion-color-danger-rgb), 0.08));\n  border: 2px solid var(--ion-color-danger);\n  color: var(--ion-color-danger);\n  font-size: 18px;\n  min-width: 140px;\n  padding: 16px 24px;\n  margin: 12px 0;\n  box-shadow: 0 4px 16px rgba(var(--ion-color-danger-rgb), 0.2);\n}\n.score.live[_ngcontent-%COMP%]   .live-score-value[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 6px 0;\n}\n.score.live[_ngcontent-%COMP%]   .match-minute[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: var(--ion-color-danger);\n  margin-top: 4px;\n  font-weight: 600;\n}\n.score.finished[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(var(--ion-color-success-rgb), 0.15), rgba(var(--ion-color-success-rgb), 0.08));\n  border: 2px solid var(--ion-color-success);\n  color: var(--ion-color-success);\n  font-size: 18px;\n  min-width: 140px;\n  padding: 16px 24px;\n  margin: 12px 0;\n  box-shadow: 0 4px 16px rgba(var(--ion-color-success-rgb), 0.2);\n}\n.score.finished[_ngcontent-%COMP%]   .live-score-value[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 6px 0;\n}\n.score.finished[_ngcontent-%COMP%]   .match-minute[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: var(--ion-color-success);\n  margin-top: 4px;\n  font-weight: 600;\n}\n.score.finished[_ngcontent-%COMP%]   .points-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  margin-top: 12px;\n  padding-top: 12px;\n  border-top: 1px solid rgba(var(--ion-color-success-rgb), 0.2);\n  font-size: 16px;\n  font-weight: 700;\n  min-height: 32px;\n}\n.score.finished[_ngcontent-%COMP%]   .points-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-right: 2px;\n}\n.score[_ngcontent-%COMP%]   .score-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  margin-bottom: 6px;\n  color: inherit;\n  opacity: 0.8;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  --min-height: 80px;\n}\nion-item[_ngcontent-%COMP%]:not(:last-child) {\n  --border-width: 0 0 1px 0;\n  --border-color: var(--ion-color-light-shade);\n}\n\n@media (max-width: 768px) {\n  .teams-score[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .team[_ngcontent-%COMP%] {\n    font-size: 16px;\n    white-space: normal;\n    overflow: visible;\n  }\n  .team.home[_ngcontent-%COMP%], .team.away[_ngcontent-%COMP%] {\n    padding: 0 4px;\n  }\n  .score[_ngcontent-%COMP%] {\n    min-width: 90px;\n    padding: 10px 16px;\n    font-size: 18px;\n  }\n  .score.live[_ngcontent-%COMP%], .score.finished[_ngcontent-%COMP%] {\n    min-width: 120px;\n    padding: 14px 20px;\n  }\n  .score.live[_ngcontent-%COMP%]   .live-score-value[_ngcontent-%COMP%], .score.finished[_ngcontent-%COMP%]   .live-score-value[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .match-info[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n  }\n  .match-time[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,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O0lBQ0UsY0FBQTtFQWpDSjtFQXFDQTtJQUNFLGVBQUE7SUFDQSxrQkFBQTtJQUNBLGVBQUE7RUFuQ0Y7RUFxQ0U7SUFDRSxnQkFBQTtJQUNBLGtCQUFBO0VBbkNKO0VBcUNJO0lBQ0UsZUFBQTtFQW5DTjtFQXdDQTtJQUNFLHNCQUFBO0lBQ0EsdUJBQUE7SUFDQSxRQUFBO0VBdENGO0VBeUNBO0lBQ0UsbUJBQUE7SUFDQSxtQkFBQTtFQXZDRjtBQUNGIiwiZmlsZSI6InByZWRpY3Rpb25zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExvZ28gU3R5bGVzXG4ubG9nby1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogOHB4IDE2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgLy8gSW1wcm92ZSB0b3VjaCB0YXJnZXQgZm9yIG1vYmlsZVxuICBtaW4taGVpZ2h0OiA0NHB4O1xuXG4gIC5mb290YmFsbC1pY29uIHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gIC5sb2dvLXRleHQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBsaW5lLWhlaWdodDogMTtcblxuICAgIC5sb2dvLXNvdGQge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgfVxuXG4gICAgLmxvZ28tc3VidGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyBQcmVkaWN0aW9ucyBTdHlsZXNcblxuLnN0YXRzLWNhcmQge1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuXG4uc3RhdHMtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gIGdhcDogMTZweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uc3RhdC1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgfVxuXG4gIC5zdGF0LXZhbHVlIHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxuXG4gIC5zdGF0LWxhYmVsIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICB9XG59XG5cbi5wcmVkaWN0aW9ucy1zZWdtZW50IHtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAvLyBJbXByb3ZlIG1vYmlsZSB0b3VjaCB0YXJnZXRzXG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gIFxuICBpb24tc2VnbWVudC1idXR0b24ge1xuICAgIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cbn1cblxuLmdhbWV3ZWVrLW5hdmlnYXRpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIHBhZGRpbmc6IDAgOHB4O1xufVxuXG4ubmF2LWJ1dHRvbiB7XG4gIC0tcGFkZGluZy1zdGFydDogMTJweDtcbiAgLS1wYWRkaW5nLWVuZDogMTJweDtcbiAgaGVpZ2h0OiA0OHB4OyAvLyBJbmNyZWFzZWQgZnJvbSAzNnB4IGZvciBiZXR0ZXIgbW9iaWxlIHRvdWNoXG4gIHdpZHRoOiA0OHB4O1xuICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuXG4gICZbZGlzYWJsZWRdIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAyOHB4OyAvLyBTbGlnaHRseSBsYXJnZXIgZm9yIG1vYmlsZVxuICB9XG59XG5cbi5nYW1ld2Vlay10aXRsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuXG4gIGgyIHtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC1zaXplOiAyMnB4OyAvLyBJbmNyZWFzZWQgZm9yIG1vYmlsZSByZWFkYWJpbGl0eVxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxufVxuXG5pb24tY2FyZCB7XG4gIG1hcmdpbjogMCAwIDE2cHggMDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLm5vLXByZWRpY3Rpb25zIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiA0OHB4IDI0cHg7IC8vIEluY3JlYXNlZCBwYWRkaW5nIGZvciBtb2JpbGVcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBmb250LXNpemU6IDE4cHg7IC8vIEluY3JlYXNlZCBmcm9tIDE2cHhcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuLy8gTmV3IHN0eWxlcyBmb3IgY3VycmVudCBnYW1ld2VlayBwcmVkaWN0aW9uc1xuLnByZWRpY3Rpb24taXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEycHg7IC8vIEluY3JlYXNlZCBmcm9tIDhweFxuICBwYWRkaW5nOiAxNnB4IDA7IC8vIEluY3JlYXNlZCBmcm9tIDhweFxufVxuXG4ubWF0Y2gtaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7IC8vIENoYW5nZWQgZnJvbSBjZW50ZXIgZm9yIGJldHRlciBtb2JpbGUgbGF5b3V0XG4gIG1hcmdpbi1ib3R0b206IDhweDsgLy8gSW5jcmVhc2VkIGZyb20gNHB4XG59XG5cbi52ZW51ZS1pbmZvIHtcbiAgZm9udC1zaXplOiAxNXB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxNHB4XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGxpbmUtaGVpZ2h0OiAxLjM7XG59XG5cbi5tYXRjaC10aW1lIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgLy8gU3RhY2sgZWxlbWVudHMgdmVydGljYWxseSBvbiBtb2JpbGVcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cblxuICAubGl2ZS1iYWRnZSB7XG4gICAgbWFyZ2luLXRvcDogNHB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIC0tYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICBhbmltYXRpb246IHB1bHNlIDJzIGluZmluaXRlO1xuICB9XG59XG5cbi8vIExpdmUgYmFkZ2UgYW5pbWF0aW9uXG5Aa2V5ZnJhbWVzIHB1bHNlIHtcbiAgMCUgeyBvcGFjaXR5OiAxOyB9XG4gIDUwJSB7IG9wYWNpdHk6IDAuNzsgfVxuICAxMDAlIHsgb3BhY2l0eTogMTsgfVxufVxuXG4udGVhbXMtc2NvcmUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTZweDsgLy8gSW5jcmVhc2VkIGZyb20gMTJweFxuICBtYXJnaW46IDEycHggMDsgLy8gSW5jcmVhc2VkIGZyb20gOHB4XG4gIG1pbi1oZWlnaHQ6IDQ4cHg7IC8vIEVuc3VyZSBtaW5pbXVtIHRvdWNoIHRhcmdldFxufVxuXG4udGVhbSB7XG4gIGZsZXg6IDE7XG4gIGZvbnQtc2l6ZTogMTdweDsgLy8gSW5jcmVhc2VkIGZyb20gMTZweFxuICBmb250LXdlaWdodDogNjAwOyAvLyBJbmNyZWFzZWQgZnJvbSA1MDBcbiAgbGluZS1oZWlnaHQ6IDEuMztcbiAgXG4gIC8vIEJldHRlciB0ZXh0IHRydW5jYXRpb24gZm9yIG1vYmlsZVxuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuICAmLmhvbWUge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcbiAgfVxuXG4gICYuYXdheSB7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBwYWRkaW5nLWxlZnQ6IDhweDtcbiAgfVxufVxuXG4ubGl2ZS1zY29yZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMTJweDsgLy8gSW5jcmVhc2VkIGZyb20gOHB4XG4gIHBhZGRpbmc6IDAgMTZweDtcbn1cblxuLnNjb3JlIHtcbiAgZm9udC1zaXplOiAyMHB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxOHB4XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1pbi13aWR0aDogMTAwcHg7IC8vIEluY3JlYXNlZCBmcm9tIDgwcHhcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAxMnB4IDIwcHg7IC8vIEluY3JlYXNlZCBwYWRkaW5nXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7IC8vIEluY3JlYXNlZCBib3JkZXIgcmFkaXVzXG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xuXG4gICYucHJlZGljdGlvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICB9XG5cbiAgJi5saXZlIHtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC4xNSksIHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjA4KSk7XG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBtaW4td2lkdGg6IDE0MHB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxMjBweFxuICAgIHBhZGRpbmc6IDE2cHggMjRweDsgLy8gSW5jcmVhc2VkIHBhZGRpbmdcbiAgICBtYXJnaW46IDEycHggMDsgLy8gSW5jcmVhc2VkIG1hcmdpblxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDE2cHggcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMik7XG5cbiAgICAubGl2ZS1zY29yZS12YWx1ZSB7XG4gICAgICBmb250LXNpemU6IDIycHg7IC8vIEluY3JlYXNlZCBmcm9tIDE4cHhcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBtYXJnaW46IDZweCAwOyAvLyBJbmNyZWFzZWQgZnJvbSA0cHhcbiAgICB9XG5cbiAgICAubWF0Y2gtbWludXRlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTVweDsgLy8gSW5jcmVhc2VkIGZyb20gMTRweFxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICAgICAgbWFyZ2luLXRvcDogNHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB9XG4gIH1cblxuICAmLmZpbmlzaGVkIHtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCByZ2JhKHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLXJnYiksIDAuMTUpLCByZ2JhKHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLXJnYiksIDAuMDgpKTtcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgbWluLXdpZHRoOiAxNDBweDsgLy8gSW5jcmVhc2VkIGZyb20gMTIwcHhcbiAgICBwYWRkaW5nOiAxNnB4IDI0cHg7IC8vIEluY3JlYXNlZCBwYWRkaW5nXG4gICAgbWFyZ2luOiAxMnB4IDA7IC8vIEluY3JlYXNlZCBtYXJnaW5cbiAgICBib3gtc2hhZG93OiAwIDRweCAxNnB4IHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4yKTtcblxuICAgIC5saXZlLXNjb3JlLXZhbHVlIHtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDsgLy8gSW5jcmVhc2VkIGZyb20gMThweFxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIG1hcmdpbjogNnB4IDA7IC8vIEluY3JlYXNlZCBmcm9tIDRweFxuICAgIH1cblxuICAgIC5tYXRjaC1taW51dGUge1xuICAgICAgZm9udC1zaXplOiAxNXB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxNHB4XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICAgICAgbWFyZ2luLXRvcDogNHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB9XG5cbiAgICAucG9pbnRzLWJhZGdlIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBnYXA6IDZweDsgLy8gSW5jcmVhc2VkIGZyb20gNHB4XG4gICAgICBtYXJnaW4tdG9wOiAxMnB4OyAvLyBJbmNyZWFzZWQgZnJvbSA4cHhcbiAgICAgIHBhZGRpbmctdG9wOiAxMnB4OyAvLyBJbmNyZWFzZWQgZnJvbSA4cHhcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLXJnYiksIDAuMik7XG4gICAgICBmb250LXNpemU6IDE2cHg7IC8vIEluY3JlYXNlZCBmcm9tIDE0cHhcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7IC8vIEluY3JlYXNlZCBmcm9tIDYwMFxuICAgICAgbWluLWhlaWdodDogMzJweDsgLy8gRW5zdXJlIHRvdWNoIHRhcmdldFxuXG4gICAgICBpb24taWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDsgLy8gSW5jcmVhc2VkIGZyb20gMTZweFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDJweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuc2NvcmUtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTFweDsgLy8gSW5jcmVhc2VkIGZyb20gMTBweFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7IC8vIEluY3JlYXNlZCBmcm9tIDUwMFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuOHB4OyAvLyBJbmNyZWFzZWQgZnJvbSAwLjVweFxuICAgIG1hcmdpbi1ib3R0b206IDZweDsgLy8gSW5jcmVhc2VkIGZyb20gNHB4XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgb3BhY2l0eTogMC44O1xuICB9XG59XG5cbmlvbi1pdGVtIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAyMHB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxNnB4XG4gIC0tcGFkZGluZy1lbmQ6IDIwcHg7IC8vIEluY3JlYXNlZCBmcm9tIDE2cHhcbiAgLS1wYWRkaW5nLXRvcDogMTZweDsgLy8gSW5jcmVhc2VkIGZyb20gMTJweFxuICAtLXBhZGRpbmctYm90dG9tOiAxNnB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxMnB4XG4gIC0tbWluLWhlaWdodDogODBweDsgLy8gRW5zdXJlIGFkZXF1YXRlIHRvdWNoIHRhcmdldFxuXG4gICY6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgLS1ib3JkZXItd2lkdGg6IDAgMCAxcHggMDtcbiAgICAtLWJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgfVxufVxuXG4vLyBNb2JpbGUtc3BlY2lmaWMgaW1wcm92ZW1lbnRzXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnRlYW1zLXNjb3JlIHtcbiAgICBnYXA6IDEycHg7XG4gIH1cbiAgXG4gIC50ZWFtIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgXG4gICAgLy8gQWxsb3cgdGV4dCB0byB3cmFwIG9uIHZlcnkgc21hbGwgc2NyZWVuc1xuICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgXG4gICAgJi5ob21lLCAmLmF3YXkge1xuICAgICAgcGFkZGluZzogMCA0cHg7XG4gICAgfVxuICB9XG4gIFxuICAuc2NvcmUge1xuICAgIG1pbi13aWR0aDogOTBweDtcbiAgICBwYWRkaW5nOiAxMHB4IDE2cHg7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIFxuICAgICYubGl2ZSwgJi5maW5pc2hlZCB7XG4gICAgICBtaW4td2lkdGg6IDEyMHB4O1xuICAgICAgcGFkZGluZzogMTRweCAyMHB4O1xuICAgICAgXG4gICAgICAubGl2ZS1zY29yZS12YWx1ZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC5tYXRjaC1pbmZvIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGdhcDogOHB4O1xuICB9XG4gIFxuICAubWF0Y2gtdGltZSB7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3BsYXllci9wYWdlcy9wcmVkaWN0aW9ucy9wcmVkaWN0aW9ucy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBRUEsZ0JBQUE7QUFERjtBQUdFO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0FBREo7QUFJRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7QUFGSjtBQUlJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFGTjtBQUtJO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBSE47O0FBVUE7RUFDRSxtQkFBQTtBQVBGOztBQVVBO0VBQ0UsYUFBQTtFQUNBLHFDQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBUEY7O0FBVUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFQRjtBQVNFO0VBQ0UsZUFBQTtBQVBKO0FBVUU7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSw0QkFBQTtBQVJKO0FBV0U7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUFUSjs7QUFhQTtFQUNFLG1CQUFBO0VBQ0Esb0NBQUE7RUFFQSxnQkFBQTtBQVhGO0FBYUU7RUFDRSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQVhKOztBQWVBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUFaRjs7QUFlQTtFQUNFLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7QUFaRjtBQWNFO0VBQ0UsWUFBQTtBQVpKO0FBZUU7RUFDRSxlQUFBO0FBYko7O0FBaUJBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBZEY7QUFnQkU7RUFDRSxTQUFB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RUE5QkY7RUFpQ0E7SUFDRSxlQUFBO0lBR0EsbUJBQUE7SUFDQSxpQkFBQTtFQWpDRjtFQW1DRTtJQUNFLGNBQUE7RUFqQ0o7RUFxQ0E7SUFDRSxlQUFBO0lBQ0Esa0JBQUE7SUFDQSxlQUFBO0VBbkNGO0VBcUNFO0lBQ0UsZ0JBQUE7SUFDQSxrQkFBQTtFQW5DSjtFQXFDSTtJQUNFLGVBQUE7RUFuQ047RUF3Q0E7SUFDRSxzQkFBQTtJQUNBLHVCQUFBO0lBQ0EsUUFBQTtFQXRDRjtFQXlDQTtJQUNFLG1CQUFBO0lBQ0EsbUJBQUE7RUF2Q0Y7QUFDRjtBQUNBLDR1ZEFBNHVkIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTG9nbyBTdHlsZXNcbi5sb2dvLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA4cHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAvLyBJbXByb3ZlIHRvdWNoIHRhcmdldCBmb3IgbW9iaWxlXG4gIG1pbi1oZWlnaHQ6IDQ0cHg7XG5cbiAgLmZvb3RiYWxsLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICB9XG5cbiAgLmxvZ28tdGV4dCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGxpbmUtaGVpZ2h0OiAxO1xuXG4gICAgLmxvZ28tc290ZCB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICB9XG5cbiAgICAubG9nby1zdWJ0aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgfVxuICB9XG59XG5cbi8vIFByZWRpY3Rpb25zIFN0eWxlc1xuXG4uc3RhdHMtY2FyZCB7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG5cbi5zdGF0cy1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcbiAgZ2FwOiAxNnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zdGF0LWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICB9XG5cbiAgLnN0YXQtdmFsdWUge1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB9XG5cbiAgLnN0YXQtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIH1cbn1cblxuLnByZWRpY3Rpb25zLXNlZ21lbnQge1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIC8vIEltcHJvdmUgbW9iaWxlIHRvdWNoIHRhcmdldHNcbiAgbWluLWhlaWdodDogNDhweDtcbiAgXG4gIGlvbi1zZWdtZW50LWJ1dHRvbiB7XG4gICAgbWluLWhlaWdodDogNDhweDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxufVxuXG4uZ2FtZXdlZWstbmF2aWdhdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgcGFkZGluZzogMCA4cHg7XG59XG5cbi5uYXYtYnV0dG9uIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxMnB4O1xuICAtLXBhZGRpbmctZW5kOiAxMnB4O1xuICBoZWlnaHQ6IDQ4cHg7IC8vIEluY3JlYXNlZCBmcm9tIDM2cHggZm9yIGJldHRlciBtb2JpbGUgdG91Y2hcbiAgd2lkdGg6IDQ4cHg7XG4gIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG5cbiAgJltkaXNhYmxlZF0ge1xuICAgIG9wYWNpdHk6IDAuNTtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDI4cHg7IC8vIFNsaWdodGx5IGxhcmdlciBmb3IgbW9iaWxlXG4gIH1cbn1cblxuLmdhbWV3ZWVrLXRpdGxlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG5cbiAgaDIge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDIycHg7IC8vIEluY3JlYXNlZCBmb3IgbW9iaWxlIHJlYWRhYmlsaXR5XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB9XG59XG5cbmlvbi1jYXJkIHtcbiAgbWFyZ2luOiAwIDAgMTZweCAwO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ubm8tcHJlZGljdGlvbnMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDQ4cHggMjRweDsgLy8gSW5jcmVhc2VkIHBhZGRpbmcgZm9yIG1vYmlsZVxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIGZvbnQtc2l6ZTogMThweDsgLy8gSW5jcmVhc2VkIGZyb20gMTZweFxuICBsaW5lLWhlaWdodDogMS41O1xufVxuXG4vLyBOZXcgc3R5bGVzIGZvciBjdXJyZW50IGdhbWV3ZWVrIHByZWRpY3Rpb25zXG4ucHJlZGljdGlvbi1pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTJweDsgLy8gSW5jcmVhc2VkIGZyb20gOHB4XG4gIHBhZGRpbmc6IDE2cHggMDsgLy8gSW5jcmVhc2VkIGZyb20gOHB4XG59XG5cbi5tYXRjaC1pbmZvIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDsgLy8gQ2hhbmdlZCBmcm9tIGNlbnRlciBmb3IgYmV0dGVyIG1vYmlsZSBsYXlvdXRcbiAgbWFyZ2luLWJvdHRvbTogOHB4OyAvLyBJbmNyZWFzZWQgZnJvbSA0cHhcbn1cblxuLnZlbnVlLWluZm8ge1xuICBmb250LXNpemU6IDE1cHg7IC8vIEluY3JlYXNlZCBmcm9tIDE0cHhcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgbGluZS1oZWlnaHQ6IDEuMztcbn1cblxuLm1hdGNoLXRpbWUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAvLyBTdGFjayBlbGVtZW50cyB2ZXJ0aWNhbGx5IG9uIG1vYmlsZVxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuXG4gIC5saXZlLWJhZGdlIHtcbiAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgIGFuaW1hdGlvbjogcHVsc2UgMnMgaW5maW5pdGU7XG4gIH1cbn1cblxuLy8gTGl2ZSBiYWRnZSBhbmltYXRpb25cbkBrZXlmcmFtZXMgcHVsc2Uge1xuICAwJSB7IG9wYWNpdHk6IDE7IH1cbiAgNTAlIHsgb3BhY2l0eTogMC43OyB9XG4gIDEwMCUgeyBvcGFjaXR5OiAxOyB9XG59XG5cbi50ZWFtcy1zY29yZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxNnB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxMnB4XG4gIG1hcmdpbjogMTJweCAwOyAvLyBJbmNyZWFzZWQgZnJvbSA4cHhcbiAgbWluLWhlaWdodDogNDhweDsgLy8gRW5zdXJlIG1pbmltdW0gdG91Y2ggdGFyZ2V0XG59XG5cbi50ZWFtIHtcbiAgZmxleDogMTtcbiAgZm9udC1zaXplOiAxN3B4OyAvLyBJbmNyZWFzZWQgZnJvbSAxNnB4XG4gIGZvbnQtd2VpZ2h0OiA2MDA7IC8vIEluY3JlYXNlZCBmcm9tIDUwMFxuICBsaW5lLWhlaWdodDogMS4zO1xuICBcbiAgLy8gQmV0dGVyIHRleHQgdHJ1bmNhdGlvbiBmb3IgbW9iaWxlXG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG4gICYuaG9tZSB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgcGFkZGluZy1yaWdodDogOHB4O1xuICB9XG5cbiAgJi5hd2F5IHtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIHBhZGRpbmctbGVmdDogOHB4O1xuICB9XG59XG5cbi5saXZlLXNjb3JlLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tdG9wOiAxMnB4OyAvLyBJbmNyZWFzZWQgZnJvbSA4cHhcbiAgcGFkZGluZzogMCAxNnB4O1xufVxuXG4uc2NvcmUge1xuICBmb250LXNpemU6IDIwcHg7IC8vIEluY3JlYXNlZCBmcm9tIDE4cHhcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWluLXdpZHRoOiAxMDBweDsgLy8gSW5jcmVhc2VkIGZyb20gODBweFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEycHggMjBweDsgLy8gSW5jcmVhc2VkIHBhZGRpbmdcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDsgLy8gSW5jcmVhc2VkIGJvcmRlciByYWRpdXNcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XG5cbiAgJi5wcmVkaWN0aW9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIH1cblxuICAmLmxpdmUge1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjE1KSwgcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMDgpKTtcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIG1pbi13aWR0aDogMTQwcHg7IC8vIEluY3JlYXNlZCBmcm9tIDEyMHB4XG4gICAgcGFkZGluZzogMTZweCAyNHB4OyAvLyBJbmNyZWFzZWQgcGFkZGluZ1xuICAgIG1hcmdpbjogMTJweCAwOyAvLyBJbmNyZWFzZWQgbWFyZ2luXG4gICAgYm94LXNoYWRvdzogMCA0cHggMTZweCByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC4yKTtcblxuICAgIC5saXZlLXNjb3JlLXZhbHVlIHtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDsgLy8gSW5jcmVhc2VkIGZyb20gMThweFxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIG1hcmdpbjogNnB4IDA7IC8vIEluY3JlYXNlZCBmcm9tIDRweFxuICAgIH1cblxuICAgIC5tYXRjaC1taW51dGUge1xuICAgICAgZm9udC1zaXplOiAxNXB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxNHB4XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG4gICAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgIH1cbiAgfVxuXG4gICYuZmluaXNoZWQge1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4xNSksIHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4wOCkpO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBtaW4td2lkdGg6IDE0MHB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxMjBweFxuICAgIHBhZGRpbmc6IDE2cHggMjRweDsgLy8gSW5jcmVhc2VkIHBhZGRpbmdcbiAgICBtYXJnaW46IDEycHggMDsgLy8gSW5jcmVhc2VkIG1hcmdpblxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDE2cHggcmdiYSh2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2IpLCAwLjIpO1xuXG4gICAgLmxpdmUtc2NvcmUtdmFsdWUge1xuICAgICAgZm9udC1zaXplOiAyMnB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxOHB4XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbWFyZ2luOiA2cHggMDsgLy8gSW5jcmVhc2VkIGZyb20gNHB4XG4gICAgfVxuXG4gICAgLm1hdGNoLW1pbnV0ZSB7XG4gICAgICBmb250LXNpemU6IDE1cHg7IC8vIEluY3JlYXNlZCBmcm9tIDE0cHhcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgIH1cblxuICAgIC5wb2ludHMtYmFkZ2Uge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGdhcDogNnB4OyAvLyBJbmNyZWFzZWQgZnJvbSA0cHhcbiAgICAgIG1hcmdpbi10b3A6IDEycHg7IC8vIEluY3JlYXNlZCBmcm9tIDhweFxuICAgICAgcGFkZGluZy10b3A6IDEycHg7IC8vIEluY3JlYXNlZCBmcm9tIDhweFxuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4yKTtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDsgLy8gSW5jcmVhc2VkIGZyb20gMTRweFxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDsgLy8gSW5jcmVhc2VkIGZyb20gNjAwXG4gICAgICBtaW4taGVpZ2h0OiAzMnB4OyAvLyBFbnN1cmUgdG91Y2ggdGFyZ2V0XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxNnB4XG4gICAgICAgIG1hcmdpbi1yaWdodDogMnB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5zY29yZS1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAxMXB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxMHB4XG4gICAgZm9udC13ZWlnaHQ6IDYwMDsgLy8gSW5jcmVhc2VkIGZyb20gNTAwXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBsZXR0ZXItc3BhY2luZzogMC44cHg7IC8vIEluY3JlYXNlZCBmcm9tIDAuNXB4XG4gICAgbWFyZ2luLWJvdHRvbTogNnB4OyAvLyBJbmNyZWFzZWQgZnJvbSA0cHhcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICBvcGFjaXR5OiAwLjg7XG4gIH1cbn1cblxuaW9uLWl0ZW0ge1xuICAtLXBhZGRpbmctc3RhcnQ6IDIwcHg7IC8vIEluY3JlYXNlZCBmcm9tIDE2cHhcbiAgLS1wYWRkaW5nLWVuZDogMjBweDsgLy8gSW5jcmVhc2VkIGZyb20gMTZweFxuICAtLXBhZGRpbmctdG9wOiAxNnB4OyAvLyBJbmNyZWFzZWQgZnJvbSAxMnB4XG4gIC0tcGFkZGluZy1ib3R0b206IDE2cHg7IC8vIEluY3JlYXNlZCBmcm9tIDEycHhcbiAgLS1taW4taGVpZ2h0OiA4MHB4OyAvLyBFbnN1cmUgYWRlcXVhdGUgdG91Y2ggdGFyZ2V0XG5cbiAgJjpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICAtLWJvcmRlci13aWR0aDogMCAwIDFweCAwO1xuICAgIC0tYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICB9XG59XG5cbi8vIE1vYmlsZS1zcGVjaWZpYyBpbXByb3ZlbWVudHNcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAudGVhbXMtc2NvcmUge1xuICAgIGdhcDogMTJweDtcbiAgfVxuICBcbiAgLnRlYW0ge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBcbiAgICAvLyBBbGxvdyB0ZXh0IHRvIHdyYXAgb24gdmVyeSBzbWFsbCBzY3JlZW5zXG4gICAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgICBcbiAgICAmLmhvbWUsICYuYXdheSB7XG4gICAgICBwYWRkaW5nOiAwIDRweDtcbiAgICB9XG4gIH1cbiAgXG4gIC5zY29yZSB7XG4gICAgbWluLXdpZHRoOiA5MHB4O1xuICAgIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgXG4gICAgJi5saXZlLCAmLmZpbmlzaGVkIHtcbiAgICAgIG1pbi13aWR0aDogMTIwcHg7XG4gICAgICBwYWRkaW5nOiAxNHB4IDIwcHg7XG4gICAgICBcbiAgICAgIC5saXZlLXNjb3JlLXZhbHVlIHtcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLm1hdGNoLWluZm8ge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgZ2FwOiA4cHg7XG4gIH1cbiAgXG4gIC5tYXRjaC10aW1lIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_player_pages_predictions_predictions_page_ts.js.map