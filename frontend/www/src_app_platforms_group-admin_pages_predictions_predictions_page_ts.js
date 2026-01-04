"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_group-admin_pages_predictions_predictions_page_ts"],{

/***/ 1566:
/*!*****************************************************************************!*\
  !*** ./src/app/platforms/group-admin/pages/predictions/predictions.page.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PredictionsPage: () => (/* binding */ PredictionsPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_mock_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/services/mock-data.service */ 8005);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
var _PredictionsPage;









const _c0 = () => ["OK"];
function PredictionsPage_div_21_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "ion-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 35)(10, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 37)(13, "input", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PredictionsPage_div_21_div_23_Template_input_ngModelChange_13_listener($event) {
      const match_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](match_r4.homeScore, $event) || (match_r4.homeScore = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function PredictionsPage_div_21_div_23_Template_input_input_13_listener() {
      const match_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.onScoreChange(match_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "input", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PredictionsPage_div_21_div_23_Template_input_ngModelChange_16_listener($event) {
      const match_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](match_r4.awayScore, $event) || (match_r4.awayScore = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function PredictionsPage_div_21_div_23_Template_input_input_16_listener() {
      const match_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.onScoreChange(match_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const match_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", match_r4.venue, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](8, 6, match_r4.kickoff, "EEEE d MMM HH:mm"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.getShortTeamName(match_r4.homeTeam));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", match_r4.homeScore);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", match_r4.awayScore);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.getShortTeamName(match_r4.awayTeam));
  }
}
function PredictionsPage_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 15)(2, "ion-button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_div_21_Template_ion_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.navigateGameweek(-1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 18)(5, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ion-badge", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Predict 3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "ion-button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_div_21_Template_ion_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.navigateGameweek(1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "ion-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 21)(12, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "ion-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](16, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "ion-button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_div_21_Template_ion_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.resetPredictions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "ion-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, " RESET ALL ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, " Make any 3 predictions for this game week ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, PredictionsPage_div_21_div_23_Template, 19, 9, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "ion-button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_div_21_Template_ion_button_click_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.onSubmitPredictions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, " Submit Predictions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.currentGameWeek.number <= 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Game Week ", ctx_r1.currentGameWeek.number, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.currentGameWeek.number >= 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Deadline: ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](16, 6, ctx_r1.currentGameWeek.deadline, "MMM d, yyyy, h:mm a"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.currentGameWeek.matches);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx_r1.canSubmit);
  }
}
function PredictionsPage_div_22_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "ion-icon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.getSpecialWeekLabel(ctx_r1.selectedGameweek.specialType), " ");
  }
}
function PredictionsPage_div_22_ion_card_25_ion_avatar_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-avatar");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const player_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", player_r6.avatar, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
  }
}
function PredictionsPage_div_22_ion_card_25_ion_chip_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-chip", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "ion-icon", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Joker Used");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function PredictionsPage_div_22_ion_card_25_div_14_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 76)(1, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 78)(4, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "ion-icon", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Score");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "ion-icon", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Result");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const pred_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("high-points", (pred_r7.points || 0) >= 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", pred_r7.points, " pts ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", pred_r7.isCorrectScore ? "checkmark-circle" : "close-circle")("color", pred_r7.isCorrectScore ? "success" : "medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", pred_r7.isCorrectResult ? "checkmark-circle" : "close-circle")("color", pred_r7.isCorrectResult ? "success" : "medium");
  }
}
function PredictionsPage_div_22_ion_card_25_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 67)(1, "div", 68)(2, "div", 69)(3, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 71)(9, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, PredictionsPage_div_22_ion_card_25_div_14_div_15_Template, 12, 7, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_9_0;
    const pred_r7 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pred_r7.venue);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](7, 9, pred_r7.kickoff, "EEE d MMM, HH:mm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pred_r7.homeTeam);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("pending", !pred_r7.homeScore && !pred_r7.awayScore);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", (tmp_9_0 = pred_r7.homeScore) !== null && tmp_9_0 !== undefined ? tmp_9_0 : "-", " - ", (tmp_9_0 = pred_r7.awayScore) !== null && tmp_9_0 !== undefined ? tmp_9_0 : "-", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](pred_r7.awayTeam);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.selectedGameweek.status === "completed");
  }
}
function PredictionsPage_div_22_ion_card_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-card", 55)(1, "ion-card-header")(2, "div", 56)(3, "div", 57)(4, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, PredictionsPage_div_22_ion_card_25_ion_avatar_5_Template, 2, 1, "ion-avatar", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, PredictionsPage_div_22_ion_card_25_ion_chip_8_Template, 4, 0, "ion-chip", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 60)(10, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "ion-card-content")(13, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, PredictionsPage_div_22_ion_card_25_div_14_Template, 16, 12, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const player_r6 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", player_r6.avatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](player_r6.playerName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", player_r6.jokerUsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Total Points: ", player_r6.totalPoints, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("special-week", ctx_r1.selectedGameweek.isSpecial);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", player_r6.predictions);
  }
}
function PredictionsPage_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 40)(1, "div", 41)(2, "ion-button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_div_22_Template_ion_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.previousGameweek());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 18)(5, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ion-chip", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, PredictionsPage_div_22_div_10_Template, 3, 1, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "ion-button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_div_22_Template_ion_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.nextGameweek());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "ion-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 46)(14, "ion-searchbar", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PredictionsPage_div_22_Template_ion_searchbar_ngModelChange_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r1.searchTerm, $event) || (ctx_r1.searchTerm = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ionInput", function PredictionsPage_div_22_Template_ion_searchbar_ionInput_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.filterPredictions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "ion-select", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PredictionsPage_div_22_Template_ion_select_ngModelChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r1.filterStatus, $event) || (ctx_r1.filterStatus = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ionChange", function PredictionsPage_div_22_Template_ion_select_ionChange_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.filterPredictions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "ion-select-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "All Predictions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "ion-select-option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "My Predictions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "ion-select-option", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Submitted");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "ion-select-option", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Pending");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](25, PredictionsPage_div_22_ion_card_25_Template, 15, 7, "ion-card", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.currentGameweekIndex === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Gameweek ", ctx_r1.selectedGameweek.number, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", ctx_r1.getGameweekStatusColor(ctx_r1.selectedGameweek.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](9, 9, ctx_r1.selectedGameweek.status), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.selectedGameweek.isSpecial);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.currentGameweekIndex === ctx_r1.gameweeks.length - 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.searchTerm);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.filterStatus);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.filteredPredictions);
  }
}
class PredictionsPage {
  constructor(mockDataService, router) {
    this.mockDataService = mockDataService;
    this.router = router;
    this.selectedTab = 'my';
    this.selectedSegment = 'current';
    this.searchTerm = '';
    this.filterStatus = 'all';
    this.currentGameweekIndex = 0;
    this.gameweeks = [];
    this.filteredPredictions = [];
    this.allPredictions = [];
    this.showTooManyPredictionsWarning = false;
    this.pastPredictions = [];
    this.canSubmit = false;
    this.selectedPredictionCount = 0;
    this.currentMatches = [];
    this.historicalMatches = [];
    this.selectedHistoryGameweek = 14;
    this.historicalGameweeks = [];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_3__.a)({
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      personOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personOutline,
      chevronBackOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronBackOutline,
      chevronForwardOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronForwardOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.timeOutline,
      refreshOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.refreshOutline,
      chevronBack: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronBack,
      star: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.star,
      chevronForward: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronForward,
      informationCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.informationCircleOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.checkmarkCircleOutline,
      checkmarkCircle: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.checkmarkCircle,
      closeCircle: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.closeCircle,
      alertCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.alertCircleOutline,
      closeCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.closeCircleOutline
    });
    // Initialize current gameweek from MockDataService
    this.currentGameweek = this.mockDataService.getCurrentGameweek();
    this.gameweeks = this.getSampleGameweeks();
    this.selectedGameweek = this.gameweeks[0];
    this.allPredictions = [];
    this.filteredPredictions = [];
    this.currentGameWeek = this.mockDataService.getCurrentGameweekData();
    this.pastPredictions = [];
  }
  ngOnInit() {
    this.loadGameweekPredictions();
  }
  tabChanged() {
    if (this.selectedTab === 'all') {
      this.filterPredictions();
    }
  }
  onScoreChange(match) {
    // Ensure scores are numbers or null
    match.homeScore = match.homeScore === null || match.homeScore === undefined || match.homeScore.toString() === '' ? null : Number(match.homeScore);
    match.awayScore = match.awayScore === null || match.awayScore === undefined || match.awayScore.toString() === '' ? null : Number(match.awayScore);
    // Count valid predictions (both home and away scores are filled)
    const validPredictions = this.currentGameWeek.matches.filter(m => m.homeScore !== null && m.awayScore !== null).length;
    // Show warning if more than 3 predictions in regular gameweek
    this.showTooManyPredictionsWarning = !this.currentGameWeek.isSpecial && validPredictions > 3;
    // Update submit button state
    if (this.currentGameWeek.isSpecial) {
      // All matches must be predicted in special gameweeks
      this.canSubmit = validPredictions === this.currentGameWeek.matches.length;
    } else {
      // Exactly 3 predictions required in regular gameweeks
      this.canSubmit = validPredictions === 3;
    }
    // For debugging
  }
  getSampleCurrentGameWeek() {
    return {
      number: 15,
      isSpecial: false,
      status: 'active',
      deadline: new Date('2024-01-20T11:30:00'),
      matches: [{
        id: 1,
        gameweek: 15,
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        homeScore: null,
        awayScore: null,
        venue: 'Old Trafford',
        kickoff: '2024-01-20T15:00:00',
        status: 'scheduled'
      }, {
        id: 2,
        gameweek: 15,
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        homeScore: null,
        awayScore: null,
        venue: 'Emirates Stadium',
        kickoff: '2024-01-20T17:30:00',
        status: 'scheduled'
      }, {
        id: 3,
        gameweek: 15,
        homeTeam: 'Manchester City',
        awayTeam: 'Tottenham',
        homeScore: null,
        awayScore: null,
        venue: 'Etihad Stadium',
        kickoff: '2024-01-20T20:00:00',
        status: 'scheduled'
      }, {
        id: 4,
        gameweek: 15,
        homeTeam: 'Newcastle',
        awayTeam: 'Aston Villa',
        homeScore: null,
        awayScore: null,
        venue: 'St. James Park',
        kickoff: '2024-01-20T15:00:00',
        status: 'scheduled'
      }, {
        id: 5,
        gameweek: 15,
        homeTeam: 'Brighton',
        awayTeam: 'Crystal Palace',
        homeScore: null,
        awayScore: null,
        venue: 'Amex Stadium',
        kickoff: '2024-01-20T15:00:00',
        status: 'scheduled'
      }, {
        id: 6,
        gameweek: 15,
        homeTeam: 'Brentford',
        awayTeam: 'Nottingham Forest',
        homeScore: null,
        awayScore: null,
        venue: 'Gtech Community Stadium',
        kickoff: '2024-01-20T15:00:00',
        status: 'scheduled'
      }, {
        id: 7,
        gameweek: 15,
        homeTeam: 'Sheffield United',
        awayTeam: 'West Ham',
        homeScore: null,
        awayScore: null,
        venue: 'Bramall Lane',
        kickoff: '2024-01-20T15:00:00',
        status: 'scheduled'
      }, {
        id: 8,
        gameweek: 15,
        homeTeam: 'Bournemouth',
        awayTeam: 'Luton Town',
        homeScore: null,
        awayScore: null,
        venue: 'Vitality Stadium',
        kickoff: '2024-01-20T15:00:00',
        status: 'scheduled'
      }, {
        id: 9,
        gameweek: 15,
        homeTeam: 'Wolves',
        awayTeam: 'Everton',
        homeScore: null,
        awayScore: null,
        venue: 'Molineux',
        kickoff: '2024-01-20T15:00:00',
        status: 'scheduled'
      }, {
        id: 10,
        gameweek: 15,
        homeTeam: 'Burnley',
        awayTeam: 'Fulham',
        homeScore: null,
        awayScore: null,
        venue: 'Turf Moor',
        kickoff: '2024-01-20T15:00:00',
        status: 'scheduled'
      }]
    };
  }
  previousGameweek() {
    if (this.currentGameweekIndex > 0) {
      this.currentGameweekIndex--;
      this.selectedGameweek = this.gameweeks[this.currentGameweekIndex];
      this.loadGameweekPredictions();
    }
  }
  nextGameweek() {
    if (this.currentGameweekIndex < this.gameweeks.length - 1) {
      this.currentGameweekIndex++;
      this.selectedGameweek = this.gameweeks[this.currentGameweekIndex];
      this.loadGameweekPredictions();
    }
  }
  getGameweekStatusColor(status) {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'primary';
      default:
        return 'medium';
    }
  }
  getSpecialWeekLabel(type) {
    if (!type) return 'Special Week';
    switch (type) {
      case 'christmas':
        return 'Christmas Special';
      case 'endOfSeason':
        return 'End of Season Special';
      default:
        return 'Special Week';
    }
  }
  filterPredictions() {
    this.filteredPredictions = this.allPredictions.filter(player => {
      const nameMatch = player.playerName.toLowerCase().includes(this.searchTerm.toLowerCase());
      let statusMatch = true;
      switch (this.filterStatus) {
        case 'my':
          statusMatch = player.isCurrentUser === true;
          break;
        case 'submitted':
          statusMatch = player.predictions.length > 0;
          break;
        case 'pending':
          statusMatch = player.predictions.length === 0;
          break;
        default:
          // 'all'
          statusMatch = true;
      }
      return nameMatch && statusMatch;
    });
  }
  onSubmitPredictions() {
    // Get only the matches that have predictions
    const predictedMatches = this.currentGameWeek.matches.filter(match => match.homeScore !== null && match.awayScore !== null).map(match => ({
      ...match,
      points: 0,
      isCorrectScore: false,
      isCorrectResult: false
    }));
    // Create a prediction entry for the current user
    const currentUserPrediction = {
      playerName: 'You (Group Admin)',
      // This should come from auth service in real implementation
      isCurrentUser: true,
      totalPoints: 0,
      jokerUsed: false,
      predictions: predictedMatches
    };
    // Add to all predictions if not exists, or update if exists
    const existingUserIndex = this.allPredictions.findIndex(p => p.isCurrentUser);
    if (existingUserIndex >= 0) {
      this.allPredictions[existingUserIndex] = currentUserPrediction;
    } else {
      this.allPredictions.unshift(currentUserPrediction);
    }
    // Store the predictions in pastPredictions
    this.pastPredictions = [...predictedMatches];
    // Reset all match scores
    this.currentGameWeek.matches.forEach(match => {
      match.homeScore = null;
      match.awayScore = null;
    });
    // Reset submit button state
    this.canSubmit = false;
    // Force UI update
    this.filterPredictions();
  }
  resetPredictions() {
    // Reset all match scores
    this.currentGameWeek.matches.forEach(match => {
      match.homeScore = null;
      match.awayScore = null;
    });
    // Reset states
    this.canSubmit = false;
    this.showTooManyPredictionsWarning = false;
  }
  loadGameweekPredictions() {
    // Load group admin predictions from MockDataService
    this.allPredictions = this.mockDataService.getGroupAdminPredictions(this.selectedGameweek.number);
    this.filterPredictions();
  }
  getSampleGameweeks() {
    return [{
      number: 15,
      isSpecial: false,
      status: 'active',
      deadline: new Date('2024-01-20T11:30:00'),
      matches: []
    }, {
      number: 16,
      isSpecial: true,
      specialType: 'christmas',
      status: 'pending',
      deadline: new Date('2024-01-27T11:30:00'),
      matches: []
    }];
  }
  getSamplePredictions() {
    return [{
      playerName: 'John Smith',
      avatar: 'assets/avatars/john.jpg',
      totalPoints: 156,
      jokerUsed: true,
      predictions: [{
        id: 1,
        gameweek: 15,
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        homeScore: 2,
        awayScore: 1,
        venue: 'Old Trafford',
        kickoff: '2024-01-20T15:00:00',
        points: 9,
        isCorrectScore: true,
        isCorrectResult: true,
        status: 'finished'
      }, {
        id: 2,
        gameweek: 15,
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        homeScore: 1,
        awayScore: 1,
        venue: 'Emirates Stadium',
        kickoff: '2024-01-20T17:30:00',
        points: 6,
        isCorrectScore: false,
        isCorrectResult: true,
        status: 'finished'
      }, {
        id: 3,
        gameweek: 15,
        homeTeam: 'Manchester City',
        awayTeam: 'Tottenham',
        homeScore: 3,
        awayScore: 0,
        venue: 'Etihad Stadium',
        kickoff: '2024-01-20T20:00:00',
        points: 0,
        isCorrectScore: false,
        isCorrectResult: false,
        status: 'finished'
      }]
    }, {
      playerName: 'Sarah Johnson',
      avatar: 'assets/avatars/sarah.jpg',
      totalPoints: 178,
      jokerUsed: false,
      predictions: [{
        id: 1,
        gameweek: 15,
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        homeScore: 1,
        awayScore: 2,
        venue: 'Old Trafford',
        kickoff: '2024-01-20T15:00:00',
        points: 6,
        isCorrectScore: false,
        isCorrectResult: true,
        status: 'finished'
      }, {
        id: 2,
        gameweek: 15,
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        homeScore: 2,
        awayScore: 2,
        venue: 'Emirates Stadium',
        kickoff: '2024-01-20T17:30:00',
        points: 9,
        isCorrectScore: true,
        isCorrectResult: true,
        status: 'finished'
      }, {
        id: 3,
        gameweek: 15,
        homeTeam: 'Manchester City',
        awayTeam: 'Tottenham',
        homeScore: 4,
        awayScore: 1,
        venue: 'Etihad Stadium',
        kickoff: '2024-01-20T20:00:00',
        points: 6,
        isCorrectScore: false,
        isCorrectResult: true,
        status: 'finished'
      }]
    }];
  }
  navigateGameweek(delta) {
    const newGameweek = this.currentGameWeek.number + delta;
    if (newGameweek >= 1 && newGameweek <= 38) {
      // TODO: Load gameweek data from service
      this.currentGameWeek = {
        ...this.currentGameWeek,
        number: newGameweek
      };
      this.loadGameweekMatches(newGameweek);
    }
  }
  loadGameweekMatches(gameweek) {
    // TODO: Implement service call to load matches for the gameweek
  }
  ionViewWillEnter() {
    this.loadMatches();
    // Start live score updates
    this.startLiveScoreUpdates();
  }
  ionViewWillLeave() {
    // Clean up interval when leaving the page
    if (this.liveScoreUpdateInterval) {
      clearInterval(this.liveScoreUpdateInterval);
    }
  }
  loadMatches() {
    // Load current matches from MockDataService
    this.currentMatches = this.mockDataService.getMatchesForGameweek(this.currentGameweek);
    // Get available historical gameweeks from MockDataService
    this.historicalGameweeks = this.mockDataService.getAvailableHistoricalGameweeks();
    // If we have historical gameweeks, set the selected one
    if (this.historicalGameweeks.length > 0) {
      this.selectedHistoryGameweek = this.historicalGameweeks[0];
    }
    // Get matches for selected historical gameweek
    this.updateHistoricalMatches();
  }
  updateHistoricalMatches() {
    // Get historical matches from MockDataService
    this.historicalMatches = this.mockDataService.getMatchesForGameweek(this.selectedHistoryGameweek);
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
    // Reload current matches with updated live scores
    this.currentMatches = this.mockDataService.getMatchesForGameweek(this.currentGameweek);
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
    if (this.isMatchLive(match)) {
      return 'live';
    }
    return 'scheduled';
  }
  navigateHistoryGameweek(delta) {
    const currentIndex = this.historicalGameweeks.indexOf(this.selectedHistoryGameweek);
    const newIndex = currentIndex + delta;
    if (newIndex >= 0 && newIndex < this.historicalGameweeks.length) {
      this.selectedHistoryGameweek = this.historicalGameweeks[newIndex];
      this.updateHistoricalMatches();
    }
  }
  canNavigateHistory(direction) {
    const currentIndex = this.historicalGameweeks.indexOf(this.selectedHistoryGameweek);
    return direction === 'back' ? currentIndex < this.historicalGameweeks.length - 1 : currentIndex > 0;
  }
  getShortTeamName(teamName) {
    // Common team name abbreviations for better mobile display
    const abbreviations = {
      'Manchester United': 'Man Utd',
      'Manchester City': 'Man City',
      'Liverpool': 'Liverpool',
      'Arsenal': 'Arsenal',
      'Chelsea': 'Chelsea',
      'Tottenham': 'Spurs',
      'Newcastle': 'Newcastle',
      'Brighton': 'Brighton',
      'West Ham': 'West Ham',
      'Crystal Palace': 'Palace',
      'Aston Villa': 'Villa',
      'Sheffield United': 'Sheffield',
      'Wolverhampton': 'Wolves',
      'Leicester City': 'Leicester',
      'Everton': 'Everton',
      'Leeds United': 'Leeds',
      'Burnley': 'Burnley',
      'Southampton': 'Saints',
      'Watford': 'Watford',
      'Norwich City': 'Norwich',
      'Brentford': 'Brentford',
      'Fulham': 'Fulham',
      'Bournemouth': 'Bournemouth',
      'Nottingham Forest': 'Forest',
      'Luton Town': 'Luton'
    };
    // Return abbreviation if available, otherwise use first word or limit to 10 chars
    if (abbreviations[teamName]) {
      return abbreviations[teamName];
    }
    // If no abbreviation found, take first word or limit length
    const firstWord = teamName.split(' ')[0];
    return firstWord.length <= 10 ? firstWord : teamName.substring(0, 10);
  }
  navigateTo(path) {
    this.router.navigate([path]);
  }
  validateScore(match, isHome, event) {
    const value = event.detail.value;
    if (value === '') {
      if (isHome) {
        match.homeScore = null;
      } else {
        match.awayScore = null;
      }
      this.onScoreChange(match);
      return;
    }
    const score = parseInt(value, 10);
    if (isNaN(score) || score < 0 || score > 99) {
      if (isHome) {
        match.homeScore = null;
      } else {
        match.awayScore = null;
      }
    } else {
      if (isHome) {
        match.homeScore = score;
      } else {
        match.awayScore = score;
      }
    }
    this.onScoreChange(match);
  }
}
_PredictionsPage = PredictionsPage;
_PredictionsPage.ɵfac = function PredictionsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PredictionsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_mock_data_service__WEBPACK_IMPORTED_MODULE_1__.MockDataService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
_PredictionsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _PredictionsPage,
  selectors: [["app-predictions"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
  decls: 24,
  vars: 6,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], ["slot", "end"], [3, "click"], ["name", "person-outline"], [3, "ngModelChange", "ionChange", "ngModel"], ["value", "my"], ["value", "all"], [1, "ion-padding"], [4, "ngIf"], ["class", "content-wrapper all-predictions", 4, "ngIf"], ["header", "Warning", "message", "You can't make more than 3 predictions for this game week", 3, "didDismiss", "isOpen", "buttons"], [1, "gameweek-header"], ["fill", "clear", 3, "click", "disabled"], ["name", "chevron-back-outline"], [1, "gameweek-info"], ["color", "primary"], ["name", "chevron-forward-outline"], [1, "deadline-info-header"], [1, "deadline-text"], ["name", "time-outline"], ["fill", "clear", "size", "small", 3, "click"], ["name", "refresh-outline", "slot", "start"], [1, "selection-info-text"], [1, "match-cards"], ["class", "match-card", 4, "ngFor", "ngForOf"], ["expand", "block", 1, "submit-button", 3, "click", "disabled"], [1, "match-card"], [1, "match-header"], [1, "venue"], ["name", "footballOutline"], [1, "kickoff"], [1, "match-prediction"], [1, "team-name"], [1, "score-inputs"], ["type", "tel", "maxlength", "2", "placeholder", "-", 1, "score-input", 3, "ngModelChange", "input", "ngModel"], [1, "separator"], [1, "content-wrapper", "all-predictions"], [1, "gameweek-navigation"], ["name", "chevron-back"], [3, "color"], ["class", "special-indicator", 4, "ngIf"], ["name", "chevron-forward"], [1, "search-filter"], ["placeholder", "Search players...", 1, "player-search", 3, "ngModelChange", "ionInput", "ngModel"], ["placeholder", "Filter by status", "interface", "popover", 3, "ngModelChange", "ionChange", "ngModel"], ["value", "submitted"], ["value", "pending"], [1, "players-list"], ["class", "player-card", 4, "ngFor", "ngForOf"], [1, "special-indicator"], ["name", "star", "color", "warning"], [1, "player-card"], [1, "player-header"], [1, "name-section"], [1, "name-and-avatar"], ["color", "warning", 4, "ngIf"], [1, "player-info"], [1, "total-points"], [1, "predictions-grid"], ["class", "prediction-item", 4, "ngFor", "ngForOf"], ["alt", "avatar", 3, "src"], ["color", "warning"], ["name", "star"], [1, "prediction-item"], [1, "match-info"], [1, "venue-info"], [1, "venue-name"], [1, "teams-score"], [1, "team", "home"], [1, "score"], [1, "team", "away"], ["class", "prediction-result", 4, "ngIf"], [1, "prediction-result"], [1, "points"], [1, "accuracy"], [1, "accuracy-item"], [3, "name", "color"]],
  template: function PredictionsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PredictionsPage_Template_div_click_2_listener() {
        return ctx.navigateTo("/group-admin/dashboard");
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
        return ctx.navigateTo("/group-admin/settings");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "ion-toolbar")(13, "ion-segment", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PredictionsPage_Template_ion_segment_ngModelChange_13_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.selectedTab, $event) || (ctx.selectedTab = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ionChange", function PredictionsPage_Template_ion_segment_ionChange_13_listener() {
        return ctx.tabChanged();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "ion-segment-button", 9)(15, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Make Predictions");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "ion-segment-button", 10)(18, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "All Predictions");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "ion-content", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, PredictionsPage_div_21_Template, 26, 9, "div", 12)(22, PredictionsPage_div_22_Template, 26, 11, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "ion-alert", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("didDismiss", function PredictionsPage_Template_ion_alert_didDismiss_23_listener() {
        return ctx.showTooManyPredictionsWarning = false;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedTab === "my");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedTab === "all");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("isOpen", ctx.showTooManyPredictionsWarning)("buttons", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](5, _c0));
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSegment, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSegmentButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.TitleCasePipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgFor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonChip, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonAvatar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSearchbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSelect, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSelectOption, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonAlert],
  styles: [".logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  cursor: pointer;\n}\n.logo-container[_ngcontent-%COMP%]   .football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1;\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-sotd[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n}\n\nion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  height: 36px;\n}\nion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--ion-color-medium);\n}\n\n.gameweek-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 16px;\n  margin-bottom: 20px;\n}\n.gameweek-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  --color: var(--ion-color-medium);\n}\n.gameweek-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.gameweek-header[_ngcontent-%COMP%]   ion-button[disabled][_ngcontent-%COMP%] {\n  opacity: 0.3;\n}\n.gameweek-header[_ngcontent-%COMP%]   .gameweek-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.gameweek-header[_ngcontent-%COMP%]   .gameweek-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.gameweek-header[_ngcontent-%COMP%]   .gameweek-info[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  padding: 4px 8px;\n}\n\n.deadline-info-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 16px;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n  margin-bottom: 12px;\n}\n.deadline-info-header[_ngcontent-%COMP%]   .deadline-text[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n}\n.deadline-info-header[_ngcontent-%COMP%]   .deadline-text[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--ion-color-medium);\n}\n.deadline-info-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --color: var(--ion-color-medium);\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n\n.selection-info-text[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--ion-color-medium);\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n\n.match-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.match-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  padding: 16px;\n  border: 1px solid var(--ion-color-light-shade);\n}\n\n.match-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.match-header[_ngcontent-%COMP%]   .venue[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n}\n.match-header[_ngcontent-%COMP%]   .venue[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-medium);\n}\n.match-header[_ngcontent-%COMP%]   .kickoff[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  color: var(--ion-color-medium);\n}\n.match-header[_ngcontent-%COMP%]   .kickoff[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\n.match-prediction[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n.match-prediction[_ngcontent-%COMP%]   .team-name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 16px;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n}\n.match-prediction[_ngcontent-%COMP%]   .team-name[_ngcontent-%COMP%]:first-child {\n  text-align: right;\n}\n.match-prediction[_ngcontent-%COMP%]   .team-name[_ngcontent-%COMP%]:last-child {\n  text-align: left;\n}\n.match-prediction[_ngcontent-%COMP%]   .score-inputs[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  justify-content: center;\n}\n.match-prediction[_ngcontent-%COMP%]   .score-inputs[_ngcontent-%COMP%]   .score-input[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  text-align: center;\n  border: 1px solid var(--ion-color-light-shade);\n  border-radius: 4px;\n  background: var(--ion-color-light);\n  font-size: 16px;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n}\n.match-prediction[_ngcontent-%COMP%]   .score-inputs[_ngcontent-%COMP%]   .score-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--ion-color-primary);\n  box-shadow: 0 0 0 2px rgba(var(--ion-color-primary-rgb), 0.2);\n}\n.match-prediction[_ngcontent-%COMP%]   .score-inputs[_ngcontent-%COMP%]   .score-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--ion-color-medium);\n}\n.match-prediction[_ngcontent-%COMP%]   .score-inputs[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  color: var(--ion-color-medium);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  margin: 20px 16px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  --border-radius: 8px;\n  font-weight: 500;\n  font-size: 16px;\n}\n.submit-button[disabled][_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n\n.all-predictions[_ngcontent-%COMP%]   .gameweek-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e0e0e0;\n}\n.all-predictions[_ngcontent-%COMP%]   .gameweek-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.all-predictions[_ngcontent-%COMP%]   .search-filter[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 16px;\n  background: #f8f9fa;\n  border-radius: 4px;\n  margin-bottom: 16px;\n  gap: 16px;\n}\n.all-predictions[_ngcontent-%COMP%]   .search-filter[_ngcontent-%COMP%]   .player-search[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 500px;\n}\n.all-predictions[_ngcontent-%COMP%]   .search-filter[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {\n  min-width: 150px;\n}\n.all-predictions[_ngcontent-%COMP%]   .players-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.all-predictions[_ngcontent-%COMP%]   .player-card[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n  overflow: hidden;\n  margin-bottom: 16px;\n}\n.all-predictions[_ngcontent-%COMP%]   .player-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 8px;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e0e0e0;\n  gap: 6px;\n}\n.all-predictions[_ngcontent-%COMP%]   .name-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n.all-predictions[_ngcontent-%COMP%]   .name-and-avatar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.all-predictions[_ngcontent-%COMP%]   .name-and-avatar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.all-predictions[_ngcontent-%COMP%]   .name-and-avatar[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n}\n.all-predictions[_ngcontent-%COMP%]   .player-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n}\n.all-predictions[_ngcontent-%COMP%]   .total-points[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  font-size: 0.8125rem;\n}\n.all-predictions[_ngcontent-%COMP%]   .prediction-item[_ngcontent-%COMP%] {\n  padding: 12px;\n  border-bottom: 1px solid #f0f0f0;\n}\n.all-predictions[_ngcontent-%COMP%]   .prediction-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.all-predictions[_ngcontent-%COMP%]   .venue-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.all-predictions[_ngcontent-%COMP%]   .venue-info[_ngcontent-%COMP%]   .venue-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--ion-color-medium);\n}\n.all-predictions[_ngcontent-%COMP%]   .venue-info[_ngcontent-%COMP%]   .kickoff[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--ion-color-medium);\n}\n.all-predictions[_ngcontent-%COMP%]   .teams-score[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n.all-predictions[_ngcontent-%COMP%]   .teams-score[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 14px;\n  font-weight: 500;\n}\n.all-predictions[_ngcontent-%COMP%]   .teams-score[_ngcontent-%COMP%]   .team.home[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.all-predictions[_ngcontent-%COMP%]   .teams-score[_ngcontent-%COMP%]   .team.away[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.all-predictions[_ngcontent-%COMP%]   .teams-score[_ngcontent-%COMP%]   .score[_ngcontent-%COMP%] {\n  min-width: 60px;\n  text-align: center;\n  font-size: 16px;\n  font-weight: 600;\n  padding: 4px 8px;\n  background: #f8f9fa;\n  border-radius: 4px;\n}\n.all-predictions[_ngcontent-%COMP%]   .teams-score[_ngcontent-%COMP%]   .score.pending[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n}\n.all-predictions[_ngcontent-%COMP%]   .prediction-result[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 8px;\n  padding-top: 8px;\n  border-top: 1px solid #f0f0f0;\n}\n.all-predictions[_ngcontent-%COMP%]   .points[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--ion-color-medium);\n  padding: 4px 8px;\n  border-radius: 4px;\n  background: #f8f9fa;\n}\n.all-predictions[_ngcontent-%COMP%]   .points.high-points[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n  background: rgba(var(--ion-color-success-rgb), 0.1);\n}\n.all-predictions[_ngcontent-%COMP%]   .accuracy[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.all-predictions[_ngcontent-%COMP%]   .accuracy-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  color: var(--ion-color-medium);\n}\n.all-predictions[_ngcontent-%COMP%]   .accuracy-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.all-predictions[_ngcontent-%COMP%]   .accuracy-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 2px;\n}\n.all-predictions[_ngcontent-%COMP%]   .special-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--ion-color-warning);\n  font-size: 12px;\n  font-weight: 500;\n}\n.all-predictions[_ngcontent-%COMP%]   .special-indicator[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWRpY3Rpb25zLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFGRjtBQUlFO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0FBRko7QUFLRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7QUFISjtBQUtJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFITjtBQU1JO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBSk47O0FBV0k7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQVJOO0FBVU07RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUFSUjs7QUFlQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQVpGO0FBY0U7RUFDRSxvQkFBQTtFQUNGLGtCQUFBO0VBQ0EsZ0NBQUE7QUFaRjtBQWNJO0VBQ0UsZUFBQTtBQVpOO0FBZUU7RUFDRSxZQUFBO0FBYko7QUFpQkU7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNFLFFBQUE7QUFmSjtBQWlCRTtFQUNFLFNBQUE7RUFDRSxlQUFBO0VBQ0YsZ0JBQUE7RUFDQSw0QkFBQTtBQWZKO0FBa0JJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFoQk47O0FBc0JBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQW5CRjtBQXFCRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDRiw0QkFBQTtBQW5CRjtBQXFCSTtFQUNFLGVBQUE7RUFDRiw4QkFBQTtBQW5CSjtBQXVCRTtFQUNFLGdDQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7QUFy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QUFBO0VBQ0EsZ0JBQUE7RUFDQSw4QkFBQTtBQXZETjtBQTBERTtFQUNJLGVBQUE7RUFDRiw4QkFBQTtBQXhESjtBQTRERTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQTFESjtBQTRERTtFQUNJLE9BQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUExRE47QUE0REk7RUFDRSxpQkFBQTtBQTFETjtBQTZESTtFQUNFLGdCQUFBO0FBM0ROO0FBK0RJO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBN0ROO0FBK0RNO0VBQ0UsOEJBQUE7QUE3RFI7QUFrRUU7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDZCQUFBO0FBaEVKO0FBbUVFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFqRUo7QUFtRUk7RUFDRSwrQkFBQTtFQUNBLG1EQUFBO0FBakVOO0FBcUVFO0VBQ0UsYUFBQTtFQUNBLFNBQUE7QUFuRUo7QUFzRUU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLDhCQUFBO0FBcEVKO0FBc0VJO0VBQ0UsZUFBQTtBQXBFTjtBQXVFSTtFQUNFLGVBQUE7QUFyRU47QUF5RUU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsK0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUF2RUo7QUF5RUk7RUFDRSxlQUFBO0FBdkVOIiwiZmlsZSI6InByZWRpY3Rpb25zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEV4YWN0IHN0eWxpbmcgdG8gbWF0Y2ggdGhlIHNjcmVlbnNob3RcblxuLy8gSGVhZGVyIGFuZCBsb2dvIHN0eWxlc1xuLmxvZ28tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgLmZvb3RiYWxsLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICB9XG5cbiAgLmxvZ28tdGV4dCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGxpbmUtaGVpZ2h0OiAxO1xuXG4gICAgLmxvZ28tc290ZCB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICB9XG5cbiAgICAubG9nby1zdWJ0aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgfVxuICB9XG59XG5cbmlvbi10b29sYmFyIHtcbiAgaW9uLWJ1dHRvbnMge1xuICAgIGlvbi1idXR0b24ge1xuICAgICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgICAtLXBhZGRpbmctZW5kOiA4cHg7XG4gICAgICBoZWlnaHQ6IDM2cHg7XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIEdhbWV3ZWVrIGhlYWRlciB3aXRoIG5hdmlnYXRpb25cbi5nYW1ld2Vlay1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDIwcHggMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcblxuICBpb24tYnV0dG9uIHtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBcbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgfVxuXG4gICZbZGlzYWJsZWRdIHtcbiAgICBvcGFjaXR5OiAwLjM7XG4gIH1cbiAgfVxuXG4gIC5nYW1ld2Vlay1pbmZvIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcblxuICBoMiB7XG4gICAgbWFyZ2luOiAwO1xuICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICB9XG5cbiAgICBpb24tYmFkZ2Uge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgfVxuICB9XG59XG5cbi8vIERlYWRsaW5lIGluZm8gaGVhZGVyXG4uZGVhZGxpbmUtaW5mby1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuXG4gIC5kZWFkbGluZS10ZXh0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgfVxuXG4gIGlvbi1idXR0b24ge1xuICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIH1cbn1cblxuLnNlbGVjdGlvbi1pbmZvLXRleHQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4vLyBNYXRjaCBjYXJkc1xuLm1hdGNoLWNhcmRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxNnB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4ubWF0Y2gtY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG59XG5cbi5tYXRjaC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG5cbiAgLnZlbnVlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA2cHg7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gIH1cblxuICAua2lja29mZiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogNnB4O1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICB9XG59XG5cbi5tYXRjaC1wcmVkaWN0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDE2cHg7XG5cbiAgLnRlYW0tbmFtZSB7XG4gICAgZmxleDogMTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgIFxuICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgfVxuICAgIFxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIH1cbiAgfVxuXG4gIC5zY29yZS1pbnB1dHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAgIC5zY29yZS1pbnB1dCB7XG4gICAgICB3aWR0aDogNDBweDtcbiAgICAgIGhlaWdodDogNDBweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG5cbiAgICAgICY6Zm9jdXMge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4yKTtcbiAgICAgIH1cblxuICAgICAgJjo6cGxhY2Vob2xkZXIge1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLnNlcGFyYXRvciB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyBTdWJtaXQgYnV0dG9uXG4uc3VibWl0LWJ1dHRvbiB7XG4gIG1hcmdpbjogMjBweCAxNnB4O1xuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAtLWJvcmRlci1yYWRpdXM6IDhweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAxNnB4O1xuXG4gICZbZGlzYWJsZWRdIHtcbiAgICBvcGFjaXR5OiAwLjY7XG4gIH1cbn1cblxuLy8gQWxsIFByZWRpY3Rpb25zIFRhYiBTdHlsZXNcbi5hbGwtcHJlZGljdGlvbnMge1xuICAuZ2FtZXdlZWstbmF2aWdhdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XG4gIH1cblxuICAuZ2FtZXdlZWstaW5mbyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMTZweDtcbiAgfVxuXG4gIC5zZWFyY2gtZmlsdGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICBnYXA6IDE2cHg7XG5cbiAgICAucGxheWVyLXNlYXJjaCB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgbWF4LXdpZHRoOiA1MDBweDtcbiAgICB9XG5cbiAgICBpb24tc2VsZWN0IHtcbiAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgfVxuICB9XG5cbiAgLnBsYXllcnMtbGlzdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogMTZweDtcbiAgfVxuXG4gIC5wbGF5ZXItY2FyZCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICB9XG5cbiAgLnBsYXllci1oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nOiA4cHg7XG4gICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcbiAgICBnYXA6IDZweDtcbiAgfVxuXG4gIC5uYW1lLXNlY3Rpb24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAubmFtZS1hbmQtYXZhdGFyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEycHg7XG5cbiAgICBoMyB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBmb250LXNpemU6IDEuMTI1cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB9XG5cbiAgICBpb24tYXZhdGFyIHtcbiAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgIH1cbiAgfVxuXG4gIC5wbGF5ZXItaW5mbyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAudG90YWwtcG9pbnRzIHtcbiAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICB9XG5cbiAgLnByZWRpY3Rpb24taXRlbSB7XG4gICAgcGFkZGluZzogMTJweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmMDtcbiAgICBcbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAudmVudWUtaW5mbyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG5cbiAgICAudmVudWUtbmFtZSB7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cblxuICAua2lja29mZiB7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgfVxuXG4gIC50ZWFtcy1zY29yZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDE2cHg7XG5cbiAgLnRlYW0ge1xuICAgICAgZmxleDogMTtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgXG4gICAgJi5ob21lIHtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIH1cbiAgICBcbiAgICAmLmF3YXkge1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICB9XG4gIH1cblxuICAgIC5zY29yZSB7XG4gICAgICBtaW4td2lkdGg6IDYwcHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG5cbiAgICAgICYucGVuZGluZyB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAucHJlZGljdGlvbi1yZXN1bHQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIHBhZGRpbmctdG9wOiA4cHg7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjA7XG4gIH1cblxuICAucG9pbnRzIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgcGFkZGluZzogNHB4IDhweDtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcblxuICAgICYuaGlnaC1wb2ludHMge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4xKTtcbiAgICB9XG4gIH1cblxuICAuYWNjdXJhY3kge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiAxNnB4O1xuICB9XG5cbiAgLmFjY3VyYWN5LWl0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDRweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgIH1cblxuICAgIHNwYW4ge1xuICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgIH1cbiAgfVxuXG4gIC5zcGVjaWFsLWluZGljYXRvciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgfVxuICB9XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2dyb3VwLWFkbWluL3BhZ2VzL3ByZWRpY3Rpb25zL3ByZWRpY3Rpb25zLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFGRjtBQUlFO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0FBRko7QUFLRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7QUFISjtBQUtJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFITjtBQU1JO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBSk47O0FBV0k7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQVJOO0FBVU07RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUFSUjs7QUFlQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQVpGO0FBY0U7RUFDRSxvQkFBQTtFQUNGLGtCQUFBO0VBQ0EsZ0NBQUE7QUFaRjtBQWNJO0VBQ0UsZUFBQTtBQVpOO0FBZUU7RUFDRSxZQUFBO0FBYko7QUFpQkU7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNFLFFBQUE7QUFmSjtBQWlCRTtFQUNFLFNBQUE7RUFDRSxlQUFBO0VBQ0YsZ0JBQUE7RUFDQSw0QkFBQTtBQWZKO0FBa0JJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFoQk47O0FBc0JBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQW5CRjtBQXFCRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDRiw0QkFBQTtBQW5CRjtBQXFCSTtFQUNFLGVBQUE7RUFDRiw4QkFB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QUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUF2REo7QUF5REk7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4QkFBQTtBQXZETjtBQTBERTtFQUNJLGVBQUE7RUFDRiw4QkFBQTtBQXhESjtBQTRERTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQTFESjtBQTRERTtFQUNJLE9BQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUExRE47QUE0REk7RUFDRSxpQkFBQTtBQTFETjtBQTZESTtFQUNFLGdCQUFBO0FBM0ROO0FBK0RJO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBN0ROO0FBK0RNO0VBQ0UsOEJBQUE7QUE3RFI7QUFrRUU7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDZCQUFBO0FBaEVKO0FBbUVFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFqRUo7QUFtRUk7RUFDRSwrQkFBQTtFQUNBLG1EQUFBO0FBakVOO0FBcUVFO0VBQ0UsYUFBQTtFQUNBLFNBQUE7QUFuRUo7QUFzRUU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLDhCQUFBO0FBcEVKO0FBc0VJO0VBQ0UsZUFBQTtBQXBFTjtBQXVFSTtFQUNFLGVBQUE7QUFyRU47QUF5RUU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsK0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUF2RUo7QUF5RUk7RUFDRSxlQUFBO0FBdkVOO0FBQ0EsNDVlQUE0NWUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeGFjdCBzdHlsaW5nIHRvIG1hdGNoIHRoZSBzY3JlZW5zaG90XG5cbi8vIEhlYWRlciBhbmQgbG9nbyBzdHlsZXNcbi5sb2dvLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA4cHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gIC5mb290YmFsbC1pY29uIHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gIC5sb2dvLXRleHQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBsaW5lLWhlaWdodDogMTtcblxuICAgIC5sb2dvLXNvdGQge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgfVxuXG4gICAgLmxvZ28tc3VidGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgfVxufVxuXG5pb24tdG9vbGJhciB7XG4gIGlvbi1idXR0b25zIHtcbiAgICBpb24tYnV0dG9uIHtcbiAgICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgaGVpZ2h0OiAzNnB4O1xuXG4gICAgICBpb24taWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBHYW1ld2VlayBoZWFkZXIgd2l0aCBuYXZpZ2F0aW9uXG4uZ2FtZXdlZWstaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAyMHB4IDE2cHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG5cbiAgaW9uLWJ1dHRvbiB7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgIH1cblxuICAmW2Rpc2FibGVkXSB7XG4gICAgb3BhY2l0eTogMC4zO1xuICB9XG4gIH1cblxuICAuZ2FtZXdlZWstaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG5cbiAgaDIge1xuICAgIG1hcmdpbjogMDtcbiAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgfVxuXG4gICAgaW9uLWJhZGdlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyBEZWFkbGluZSBpbmZvIGhlYWRlclxuLmRlYWRsaW5lLWluZm8taGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcblxuICAuZGVhZGxpbmUtdGV4dCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gIH1cblxuICBpb24tYnV0dG9uIHtcbiAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICB9XG59XG5cbi5zZWxlY3Rpb24taW5mby10ZXh0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLy8gTWF0Y2ggY2FyZHNcbi5tYXRjaC1jYXJkcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLm1hdGNoLWNhcmQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICBwYWRkaW5nOiAxNnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xufVxuXG4ubWF0Y2gtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuXG4gIC52ZW51ZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogNnB4O1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgfVxuICB9XG5cbiAgLmtpY2tvZmYge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDZweDtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbiAgfVxufVxuXG4ubWF0Y2gtcHJlZGljdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxNnB4O1xuXG4gIC50ZWFtLW5hbWUge1xuICAgIGZsZXg6IDE7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICBcbiAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIH1cbiAgICBcbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICB9XG4gIH1cblxuICAuc2NvcmUtaW5wdXRzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgICAuc2NvcmUtaW5wdXQge1xuICAgICAgd2lkdGg6IDQwcHg7XG4gICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuXG4gICAgICAmOmZvY3VzIHtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMik7XG4gICAgICB9XG5cbiAgICAgICY6OnBsYWNlaG9sZGVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5zZXBhcmF0b3Ige1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gU3VibWl0IGJ1dHRvblxuLnN1Ym1pdC1idXR0b24ge1xuICBtYXJnaW46IDIwcHggMTZweDtcbiAgLS1wYWRkaW5nLXRvcDogMTJweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgLS1ib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMTZweDtcblxuICAmW2Rpc2FibGVkXSB7XG4gICAgb3BhY2l0eTogMC42O1xuICB9XG59XG5cbi8vIEFsbCBQcmVkaWN0aW9ucyBUYWIgU3R5bGVzXG4uYWxsLXByZWRpY3Rpb25zIHtcbiAgLmdhbWV3ZWVrLW5hdmlnYXRpb24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xuICB9XG5cbiAgLmdhbWV3ZWVrLWluZm8ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDE2cHg7XG4gIH1cblxuICAuc2VhcmNoLWZpbHRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgZ2FwOiAxNnB4O1xuXG4gICAgLnBsYXllci1zZWFyY2gge1xuICAgICAgZmxleDogMTtcbiAgICAgIG1heC13aWR0aDogNTAwcHg7XG4gICAgfVxuXG4gICAgaW9uLXNlbGVjdCB7XG4gICAgICBtaW4td2lkdGg6IDE1MHB4O1xuICAgIH1cbiAgfVxuXG4gIC5wbGF5ZXJzLWxpc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDE2cHg7XG4gIH1cblxuICAucGxheWVyLWNhcmQge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMGUwZTA7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgfVxuXG4gIC5wbGF5ZXItaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcGFkZGluZzogOHB4O1xuICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XG4gICAgZ2FwOiA2cHg7XG4gIH1cblxuICAubmFtZS1zZWN0aW9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLm5hbWUtYW5kLWF2YXRhciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiAxMnB4O1xuXG4gICAgaDMge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgZm9udC1zaXplOiAxLjEyNXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgfVxuXG4gICAgaW9uLWF2YXRhciB7XG4gICAgICB3aWR0aDogNDBweDtcbiAgICAgIGhlaWdodDogNDBweDtcbiAgICB9XG4gIH1cblxuICAucGxheWVyLWluZm8ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLnRvdGFsLXBvaW50cyB7XG4gICAgcGFkZGluZzogMnB4IDhweDtcbiAgICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgfVxuXG4gIC5wcmVkaWN0aW9uLWl0ZW0ge1xuICAgIHBhZGRpbmc6IDEycHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjA7XG4gICAgXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgLnZlbnVlLWluZm8ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuXG4gICAgLnZlbnVlLW5hbWUge1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG5cbiAgLmtpY2tvZmYge1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gIH1cblxuICAudGVhbXMtc2NvcmUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiAxNnB4O1xuXG4gIC50ZWFtIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIFxuICAgICYuaG9tZSB7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICB9XG4gICAgXG4gICAgJi5hd2F5IHtcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgfVxuICB9XG5cbiAgICAuc2NvcmUge1xuICAgICAgbWluLXdpZHRoOiA2MHB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuXG4gICAgICAmLnBlbmRpbmcge1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLnByZWRpY3Rpb24tcmVzdWx0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICBwYWRkaW5nLXRvcDogOHB4O1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGYwO1xuICB9XG5cbiAgLnBvaW50cyB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG5cbiAgICAmLmhpZ2gtcG9pbnRzIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLXJnYiksIDAuMSk7XG4gICAgfVxuICB9XG5cbiAgLmFjY3VyYWN5IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogMTZweDtcbiAgfVxuXG4gIC5hY2N1cmFjeS1pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA0cHg7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICB9XG5cbiAgICBzcGFuIHtcbiAgICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICB9XG4gIH1cblxuICAuc3BlY2lhbC1pbmRpY2F0b3Ige1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_group-admin_pages_predictions_predictions_page_ts.js.map