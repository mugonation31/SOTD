"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_group-admin_pages_live_live_page_ts"],{

/***/ 6916:
/*!***************************************************************!*\
  !*** ./src/app/platforms/group-admin/pages/live/live.page.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LivePage: () => (/* binding */ LivePage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
var _LivePage;







function LivePage_div_12_ion_card_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-content")(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "No matches scheduled for today.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
}
function LivePage_div_12_ion_card_2_ion_item_6_ion_badge_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-badge", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const match_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" LIVE ", ctx_r1.getMatchTime(match_r1), " ");
  }
}
function LivePage_div_12_ion_card_2_ion_item_6_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " - vs - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LivePage_div_12_ion_card_2_ion_item_6_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const match_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", (match_r1.liveScore == null ? null : match_r1.liveScore.home) || 0, " - ", (match_r1.liveScore == null ? null : match_r1.liveScore.away) || 0, " ");
  }
}
function LivePage_div_12_ion_card_2_ion_item_6_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const match_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", (match_r1.finalScore == null ? null : match_r1.finalScore.home) || 0, " - ", (match_r1.finalScore == null ? null : match_r1.finalScore.away) || 0, " ");
  }
}
function LivePage_div_12_ion_card_2_ion_item_6_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const match_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.getMatchTime(match_r1), " ");
  }
}
function LivePage_div_12_ion_card_2_ion_item_6_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " FT ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LivePage_div_12_ion_card_2_ion_item_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item")(1, "div", 7)(2, "div", 8)(3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "ion-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, LivePage_div_12_ion_card_2_ion_item_6_ion_badge_9_Template, 2, 1, "ion-badge", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 13)(11, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 15)(14, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, LivePage_div_12_ion_card_2_ion_item_6_div_16_Template, 2, 0, "div", 17)(17, LivePage_div_12_ion_card_2_ion_item_6_div_17_Template, 2, 2, "div", 17)(18, LivePage_div_12_ion_card_2_ion_item_6_div_18_Template, 2, 2, "div", 17)(19, LivePage_div_12_ion_card_2_ion_item_6_div_19_Template, 2, 1, "div", 18)(20, LivePage_div_12_ion_card_2_ion_item_6_div_20_Template, 2, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const match_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](match_r1.venue);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](8, 12, match_r1.kickoff, "EEE d MMM, HH:mm"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.isMatchLive(match_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](match_r1.homeTeam);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx_r1.getScoreClass(match_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.getMatchStatus(match_r1), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", match_r1.status === "scheduled");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", match_r1.status === "live");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", match_r1.status === "finished");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", match_r1.status === "live");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", match_r1.status === "finished");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](match_r1.awayTeam);
  }
}
function LivePage_div_12_ion_card_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-header")(2, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Today's Matches");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ion-card-content")(5, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, LivePage_div_12_ion_card_2_ion_item_6_Template, 23, 15, "ion-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.currentMatches);
  }
}
function LivePage_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LivePage_div_12_ion_card_1_Template, 4, 0, "ion-card", 4)(2, LivePage_div_12_ion_card_2_Template, 7, 1, "ion-card", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.currentMatches.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.currentMatches.length > 0);
  }
}
function LivePage_div_13_ion_card_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-content")(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" No matches found for Gameweek ", ctx_r1.selectedHistoryGameweek, ". ");
  }
}
function LivePage_div_13_ion_card_10_ion_item_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item")(1, "div", 7)(2, "div", 8)(3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "ion-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 13)(10, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 28)(13, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "FINAL SCORE");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "FT");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const match_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](match_r4.venue);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](8, 6, match_r4.kickoff, "EEE d MMM, HH:mm"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](match_r4.homeTeam);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", (match_r4.finalScore == null ? null : match_r4.finalScore.home) || 0, " - ", (match_r4.finalScore == null ? null : match_r4.finalScore.away) || 0, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](match_r4.awayTeam);
  }
}
function LivePage_div_13_ion_card_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-content")(2, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, LivePage_div_13_ion_card_10_ion_item_3_Template, 21, 9, "ion-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.historicalMatches);
  }
}
function LivePage_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "div", 23)(2, "ion-button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LivePage_div_13_Template_ion_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.navigateHistoryGameweek(-1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "ion-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 26)(5, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ion-button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LivePage_div_13_Template_ion_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.navigateHistoryGameweek(1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "ion-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, LivePage_div_13_ion_card_9_Template, 4, 1, "ion-card", 4)(10, LivePage_div_13_ion_card_10_Template, 4, 1, "ion-card", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r1.canNavigateHistory("back"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Gameweek ", ctx_r1.selectedHistoryGameweek, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r1.canNavigateHistory("forward"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.historicalMatches.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.historicalMatches.length > 0);
  }
}
class LivePage {
  constructor() {
    this.selectedSegment = 'current';
    this.currentMatches = [];
    this.historicalMatches = [];
    this.selectedHistoryGameweek = 14;
    this.historicalGameweeks = [];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_2__.a)({
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.timeOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      chevronBackOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronBackOutline,
      chevronForwardOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.chevronForwardOutline
    });
  }
  ngOnInit() {
    this.loadMatches();
    this.startLiveScoreUpdates();
  }
  ngOnDestroy() {
    if (this.liveScoreUpdateInterval) {
      clearInterval(this.liveScoreUpdateInterval);
    }
  }
  loadMatches() {
    // Mock current matches data
    const mockCurrentMatches = [{
      id: 1,
      gameweek: 15,
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      kickoff: '2024-01-20T15:00:00',
      venue: 'Old Trafford',
      status: 'live',
      liveScore: {
        home: 2,
        away: 1,
        isLive: true,
        minute: 67
      }
    }, {
      id: 2,
      gameweek: 15,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      kickoff: '2024-01-20T17:30:00',
      venue: 'Emirates Stadium',
      status: 'scheduled'
    }, {
      id: 3,
      gameweek: 15,
      homeTeam: 'Manchester City',
      awayTeam: 'Tottenham',
      kickoff: '2024-01-20T20:00:00',
      venue: 'Etihad Stadium',
      status: 'scheduled'
    }];
    this.currentMatches = mockCurrentMatches;
    // Mock historical matches data
    const mockHistoricalMatches = [{
      id: 1,
      gameweek: 14,
      homeTeam: 'Arsenal',
      awayTeam: 'Brighton',
      kickoff: '2024-01-17T19:45:00',
      venue: 'Emirates Stadium',
      status: 'finished',
      finalScore: {
        home: 2,
        away: 1
      }
    }, {
      id: 2,
      gameweek: 14,
      homeTeam: 'Brentford',
      awayTeam: 'Chelsea',
      kickoff: '2024-01-17T20:00:00',
      venue: 'Gtech Community Stadium',
      status: 'finished',
      finalScore: {
        home: 0,
        away: 2
      }
    }, {
      id: 3,
      gameweek: 14,
      homeTeam: 'Manchester City',
      awayTeam: 'Tottenham',
      kickoff: '2024-01-17T20:15:00',
      venue: 'Etihad Stadium',
      status: 'finished',
      finalScore: {
        home: 3,
        away: 3
      }
    }];
    this.historicalMatches = mockHistoricalMatches;
    this.historicalGameweeks = [14, 13, 12, 11, 10];
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
    // In a real application, this would make an API call
    // For now, we'll just update the mock data
    this.currentMatches = this.currentMatches.map(match => {
      if (match.status === 'live') {
        return {
          ...match,
          liveScore: {
            ...match.liveScore,
            minute: this.calculateMatchMinute(match.kickoff)
          }
        };
      }
      if (this.shouldStartMatch(match)) {
        return {
          ...match,
          status: 'live',
          liveScore: {
            home: 0,
            away: 0,
            isLive: true,
            minute: 1
          }
        };
      }
      if (this.shouldFinishMatch(match)) {
        const finalScore = match.liveScore || {
          home: 0,
          away: 0
        };
        return {
          ...match,
          status: 'finished',
          finalScore: {
            home: finalScore.home,
            away: finalScore.away
          }
        };
      }
      return match;
    });
  }
  shouldStartMatch(match) {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    return match.status === 'scheduled' && now >= kickoff;
  }
  shouldFinishMatch(match) {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    return match.status === 'live' && now >= new Date(kickoff.getTime() + 2 * 60 * 60 * 1000);
  }
  calculateMatchMinute(kickoff) {
    const kickoffTime = new Date(kickoff);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - kickoffTime.getTime()) / 60000);
    // Handle half time (45-60 minutes shows as 45+)
    if (diffInMinutes >= 45 && diffInMinutes < 60) {
      return 45;
    }
    // Handle full time (90+ minutes)
    if (diffInMinutes >= 90) {
      return 90;
    }
    // Handle second half (subtract 15 minutes for half time)
    if (diffInMinutes > 60) {
      return diffInMinutes - 15;
    }
    return diffInMinutes;
  }
  getMatchTime(match) {
    var _match$liveScore;
    if (match.status !== 'live' || !((_match$liveScore = match.liveScore) !== null && _match$liveScore !== void 0 && _match$liveScore.isLive)) return '';
    const minute = match.liveScore.minute;
    const additionalTime = match.liveScore.additionalTime;
    if (minute === 45 && additionalTime) {
      return `45+${additionalTime}'`;
    }
    if (minute === 90 && additionalTime) {
      return `90+${additionalTime}'`;
    }
    return `${minute}'`;
  }
  getMatchStatus(match) {
    switch (match.status) {
      case 'scheduled':
        return 'SCHEDULED';
      case 'live':
        return 'LIVE';
      case 'finished':
        return 'FINAL SCORE';
      default:
        return '';
    }
  }
  getScoreClass(match) {
    return match.status;
  }
  isMatchLive(match) {
    return match.status === 'live';
  }
  navigateHistoryGameweek(delta) {
    const currentIndex = this.historicalGameweeks.indexOf(this.selectedHistoryGameweek);
    const newIndex = currentIndex + delta;
    if (newIndex >= 0 && newIndex < this.historicalGameweeks.length) {
      this.selectedHistoryGameweek = this.historicalGameweeks[newIndex];
      // In a real app, this would fetch the matches for the selected gameweek
      // For now, we'll just keep the same matches
    }
  }
  canNavigateHistory(direction) {
    const currentIndex = this.historicalGameweeks.indexOf(this.selectedHistoryGameweek);
    return direction === 'back' ? currentIndex < this.historicalGameweeks.length - 1 : currentIndex > 0;
  }
}
_LivePage = LivePage;
_LivePage.ɵfac = function LivePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LivePage)();
};
_LivePage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _LivePage,
  selectors: [["app-live"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
  decls: 14,
  vars: 3,
  consts: [[1, "ion-padding"], [1, "scores-segment", 3, "ngModelChange", "ngModel"], ["value", "current"], ["value", "history"], [4, "ngIf"], [1, "no-matches"], [4, "ngFor", "ngForOf"], [1, "match-item"], [1, "match-info"], [1, "venue-info"], [1, "match-time"], ["name", "time-outline"], ["color", "danger", "class", "live-badge", 4, "ngIf"], [1, "teams-score"], [1, "team", "home"], [1, "score", 3, "ngClass"], [1, "score-label"], ["class", "score-value", 4, "ngIf"], ["class", "match-minute", 4, "ngIf"], [1, "team", "away"], ["color", "danger", 1, "live-badge"], [1, "score-value"], [1, "match-minute"], [1, "gameweek-navigation"], ["fill", "clear", 1, "nav-button", 3, "click", "disabled"], ["slot", "icon-only", "name", "chevron-back-outline"], [1, "gameweek-title"], ["slot", "icon-only", "name", "chevron-forward-outline"], [1, "score", "finished"]],
  template: function LivePage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Live Scores");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ion-content", 0)(5, "ion-segment", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function LivePage_Template_ion_segment_ngModelChange_5_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.selectedSegment, $event) || (ctx.selectedSegment = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "ion-segment-button", 2)(7, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Current Matches");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "ion-segment-button", 3)(10, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "History");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, LivePage_div_12_Template, 3, 2, "div", 4)(13, LivePage_div_13_Template, 11, 5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedSegment);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.selectedSegment === "current");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.selectedSegment === "history");
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonSegment, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonSegmentButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonButton, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
  styles: [".scores-segment[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  --background: var(--ion-color-light);\n}\n\n.gameweek-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 0 8px;\n}\n\n.nav-button[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  height: 36px;\n  --color: var(--ion-color-medium);\n}\n.nav-button[disabled][_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.nav-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n\n.gameweek-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.gameweek-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\n.no-matches[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px 16px;\n  color: var(--ion-color-medium);\n  font-size: 16px;\n}\n\n.match-item[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 8px 0;\n}\n\n.match-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 4px;\n}\n\n.venue-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-medium);\n}\n\n.match-time[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 14px;\n  color: var(--ion-color-medium);\n}\n.match-time[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.match-time[_ngcontent-%COMP%]   .live-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  padding: 4px 6px;\n  margin-left: 6px;\n}\n\n.teams-score[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin: 8px 0;\n}\n\n.team[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 16px;\n  font-weight: 500;\n}\n.team.home[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.team.away[_ngcontent-%COMP%] {\n  text-align: left;\n}\n\n.score[_ngcontent-%COMP%] {\n  min-width: 120px;\n  padding: 8px 16px;\n  border-radius: 8px;\n  text-align: center;\n}\n.score.scheduled[_ngcontent-%COMP%] {\n  background: var(--ion-color-light);\n  color: var(--ion-color-medium);\n}\n.score.live[_ngcontent-%COMP%] {\n  background-color: rgba(var(--ion-color-danger-rgb), 0.08);\n  color: var(--ion-color-danger);\n}\n.score.finished[_ngcontent-%COMP%] {\n  background-color: rgba(var(--ion-color-success-rgb), 0.08);\n  color: var(--ion-color-success);\n}\n.score[_ngcontent-%COMP%]   .score-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px;\n}\n.score[_ngcontent-%COMP%]   .score-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  margin: 4px 0;\n}\n.score[_ngcontent-%COMP%]   .match-minute[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin-top: 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpdmUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQUE7RUFDQSxvQ0FBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsZ0NBQUE7QUFDRjtBQUNFO0VBQ0UsWUFBQTtBQUNKO0FBRUU7RUFDRSxlQUFBO0FBQUo7O0FBSUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFERjtBQUdFO0VBQ0UsU0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBREo7O0FBS0E7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0FBRkY7O0FBS0E7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtFQUNBLGNBQUE7QUFGRjs7QUFLQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFGRjs7QUFLQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtBQUZGOztBQUtBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtBQUZGO0FBSUU7RUFDRSxlQUFBO0FBRko7QUFLRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBSEo7O0FBT0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0FBSkY7O0FBT0E7RUFDRSxPQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBSkY7QUFNRTtFQUNFLGlCQUFBO0FBSko7QUFPRTtFQUNFLGdCQUFBO0FBTEo7O0FBU0E7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQU5GO0FBUUU7RUFDRSxrQ0FBQTtFQUNBLDhCQUFBO0FBTko7QUFTRTtFQUNFLHlEQUFBO0VBQ0EsOEJBQUE7QUFQSjtBQVVFO0VBQ0UsMERBQUE7RUFDQSwrQkFBQTtBQVJKO0FBV0U7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFUSjtBQVlFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtBQVZKO0FBYUU7RUFDRSxlQUFBO0VBQ0EsZUFBQTtBQVhKIiwiZmlsZSI6ImxpdmUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNjb3Jlcy1zZWdtZW50IHtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xufVxuXG4uZ2FtZXdlZWstbmF2aWdhdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgcGFkZGluZzogMCA4cHg7XG59XG5cbi5uYXYtYnV0dG9uIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgaGVpZ2h0OiAzNnB4O1xuICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcblxuICAmW2Rpc2FibGVkXSB7XG4gICAgb3BhY2l0eTogMC41O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgfVxufVxuXG4uZ2FtZXdlZWstdGl0bGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcblxuICBoMiB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIH1cbn1cblxuLm5vLW1hdGNoZXMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDMycHggMTZweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5tYXRjaC1pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA4cHggMDtcbn1cblxuLm1hdGNoLWluZm8ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cblxuLnZlbnVlLWluZm8ge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbn1cblxuLm1hdGNoLXRpbWUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuXG4gIC5saXZlLWJhZGdlIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgcGFkZGluZzogNHB4IDZweDtcbiAgICBtYXJnaW4tbGVmdDogNnB4O1xuICB9XG59XG5cbi50ZWFtcy1zY29yZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW46IDhweCAwO1xufVxuXG4udGVhbSB7XG4gIGZsZXg6IDE7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcblxuICAmLmhvbWUge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICB9XG5cbiAgJi5hd2F5IHtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB9XG59XG5cbi5zY29yZSB7XG4gIG1pbi13aWR0aDogMTIwcHg7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAmLnNjaGVkdWxlZCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIH1cblxuICAmLmxpdmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjA4KTtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG4gIH1cblxuICAmLmZpbmlzaGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLXJnYiksIDAuMDgpO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIH1cblxuICAuc2NvcmUtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgfVxuXG4gIC5zY29yZS12YWx1ZSB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgbWFyZ2luOiA0cHggMDtcbiAgfVxuXG4gIC5tYXRjaC1taW51dGUge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBtYXJnaW4tdG9wOiAycHg7XG4gIH1cbn0gIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2dyb3VwLWFkbWluL3BhZ2VzL2xpdmUvbGl2ZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtFQUNBLG9DQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxnQ0FBQTtBQUNGO0FBQ0U7RUFDRSxZQUFBO0FBQ0o7QUFFRTtFQUNFLGVBQUE7QUFBSjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQURGO0FBR0U7RUFDRSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFESjs7QUFLQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QUFGRjs7QUFLQTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0VBQ0EsY0FBQTtBQUZGOztBQUtBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQUZGOztBQUtBO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBRkY7O0FBS0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLDhCQUFBO0FBRkY7QUFJRTtFQUNFLGVBQUE7QUFGSjtBQUtFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFISjs7QUFPQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7QUFKRjs7QUFPQTtFQUNFLE9BQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFKRjtBQU1FO0VBQ0UsaUJBQUE7QUFKSjtBQU9FO0VBQ0UsZ0JBQUE7QUFMSjs7QUFTQTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FBTkY7QUFRRTtFQUNFLGtDQUFBO0VBQ0EsOEJBQUE7QUFOSjtBQVNFO0VBQ0UseURBQUE7RUFDQSw4QkFBQTtBQVBKO0FBVUU7RUFDRSwwREFBQTtFQUNBLCtCQUFBO0FBUko7QUFXRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtBQVRKO0FBWUU7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0FBVko7QUFhRTtFQUNFLGVBQUE7RUFDQSxlQUFBO0FBWEo7QUFDQSw0c0pBQTRzSiIsInNvdXJjZXNDb250ZW50IjpbIi5zY29yZXMtc2VnbWVudCB7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbn1cblxuLmdhbWV3ZWVrLW5hdmlnYXRpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIHBhZGRpbmc6IDAgOHB4O1xufVxuXG4ubmF2LWJ1dHRvbiB7XG4gIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAtLXBhZGRpbmctZW5kOiA4cHg7XG4gIGhlaWdodDogMzZweDtcbiAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG5cbiAgJltkaXNhYmxlZF0ge1xuICAgIG9wYWNpdHk6IDAuNTtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gIH1cbn1cblxuLmdhbWV3ZWVrLXRpdGxlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG5cbiAgaDIge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB9XG59XG5cbi5uby1tYXRjaGVzIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAzMnB4IDE2cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4ubWF0Y2gtaXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogOHB4IDA7XG59XG5cbi5tYXRjaC1pbmZvIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG59XG5cbi52ZW51ZS1pbmZvIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG59XG5cbi5tYXRjaC10aW1lIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cblxuICAubGl2ZS1iYWRnZSB7XG4gICAgZm9udC1zaXplOiAxMHB4O1xuICAgIHBhZGRpbmc6IDRweCA2cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgfVxufVxuXG4udGVhbXMtc2NvcmUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luOiA4cHggMDtcbn1cblxuLnRlYW0ge1xuICBmbGV4OiAxO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG5cbiAgJi5ob21lIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgfVxuXG4gICYuYXdheSB7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgfVxufVxuXG4uc2NvcmUge1xuICBtaW4td2lkdGg6IDEyMHB4O1xuICBwYWRkaW5nOiA4cHggMTZweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgJi5zY2hlZHVsZWQge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICB9XG5cbiAgJi5saXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC4wOCk7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICB9XG5cbiAgJi5maW5pc2hlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2IpLCAwLjA4KTtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICB9XG5cbiAgLnNjb3JlLWxhYmVsIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIH1cblxuICAuc2NvcmUtdmFsdWUge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIG1hcmdpbjogNHB4IDA7XG4gIH1cblxuICAubWF0Y2gtbWludXRlIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgbWFyZ2luLXRvcDogMnB4O1xuICB9XG59ICJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_group-admin_pages_live_live_page_ts.js.map