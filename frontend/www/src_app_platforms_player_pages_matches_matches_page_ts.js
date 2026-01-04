"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_player_pages_matches_matches_page_ts"],{

/***/ 9402:
/*!****************************************************************!*\
  !*** ./src/app/platforms/player/pages/matches/matches.page.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatchesPage: () => (/* binding */ MatchesPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);

var _MatchesPage;








function MatchesPage_div_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 31)(1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "ion-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "You can't make more than 3 predictions for this game week");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}
function MatchesPage_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 34)(1, "div", 35)(2, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "ion-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 39)(10, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 41)(13, "input", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function MatchesPage_div_41_Template_input_ngModelChange_13_listener($event) {
      const match_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](match_r2.prediction.homeScore, $event) || (match_r2.prediction.homeScore = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function MatchesPage_div_41_Template_input_ngModelChange_13_listener() {
      const match_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.onScoreChange(match_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "input", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function MatchesPage_div_41_Template_input_ngModelChange_16_listener($event) {
      const match_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](match_r2.prediction.awayScore, $event) || (match_r2.prediction.awayScore = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function MatchesPage_div_41_Template_input_ngModelChange_16_listener() {
      const match_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.onScoreChange(match_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const match_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", match_r2.venue, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](8, 6, match_r2.kickoff, "EEEE d MMM HH:mm"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](match_r2.homeTeam);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", match_r2.prediction.homeScore);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", match_r2.prediction.awayScore);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](match_r2.awayTeam);
  }
}
class MatchesPage {
  constructor(router) {
    this.router = router;
    this.currentGameweek = {
      number: 15,
      isSpecial: false,
      status: 'open',
      deadline: '2024-01-20T11:30:00',
      matches: []
    };
    this.matches = [{
      id: 1,
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      kickoff: '2024-01-20T15:00:00',
      venue: 'Old Trafford',
      prediction: {
        homeScore: null,
        awayScore: null
      }
    }, {
      id: 2,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      kickoff: '2024-01-20T17:30:00',
      venue: 'Emirates Stadium',
      prediction: {
        homeScore: null,
        awayScore: null
      }
    }, {
      id: 3,
      homeTeam: 'Manchester City',
      awayTeam: 'Tottenham',
      kickoff: '2024-01-20T20:00:00',
      venue: 'Etihad Stadium',
      prediction: {
        homeScore: null,
        awayScore: null
      }
    }, {
      id: 4,
      homeTeam: 'Newcastle',
      awayTeam: 'Aston Villa',
      kickoff: '2024-01-21T14:00:00',
      venue: 'St. James Park',
      prediction: {
        homeScore: null,
        awayScore: null
      }
    }, {
      id: 5,
      homeTeam: 'Brighton',
      awayTeam: 'Crystal Palace',
      kickoff: '2024-01-21T16:30:00',
      venue: 'Amex Stadium',
      prediction: {
        homeScore: null,
        awayScore: null
      }
    }, {
      id: 6,
      homeTeam: 'Brentford',
      awayTeam: 'Nottingham Forest',
      kickoff: '2024-01-21T14:00:00',
      venue: 'Gtech Community Stadium',
      prediction: {
        homeScore: null,
        awayScore: null
      }
    }, {
      id: 7,
      homeTeam: 'West Ham',
      awayTeam: 'Bournemouth',
      kickoff: '2024-01-21T14:00:00',
      venue: 'London Stadium',
      prediction: {
        homeScore: null,
        awayScore: null
      }
    }, {
      id: 8,
      homeTeam: 'Fulham',
      awayTeam: 'Everton',
      kickoff: '2024-01-21T14:00:00',
      venue: 'Craven Cottage',
      prediction: {
        homeScore: null,
        awayScore: null
      }
    }, {
      id: 9,
      homeTeam: 'Luton Town',
      awayTeam: 'Burnley',
      kickoff: '2024-01-21T14:00:00',
      venue: 'Kenilworth Road',
      prediction: {
        homeScore: null,
        awayScore: null
      }
    }, {
      id: 10,
      homeTeam: 'Sheffield United',
      awayTeam: 'Wolves',
      kickoff: '2024-01-21T14:00:00',
      venue: 'Bramall Lane',
      prediction: {
        homeScore: null,
        awayScore: null
      }
    }];
    this.showTooManyPredictionsWarning = false;
    this.selectedPredictionCount = 0;
    this.showSuccessToast = false;
    this.predictionsCompleted = false;
    (0,ionicons__WEBPACK_IMPORTED_MODULE_3__.a)({
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.timeOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.footballOutline,
      refreshOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.refreshOutline,
      alertCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.alertCircleOutline,
      chevronBackOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.chevronBackOutline,
      chevronForwardOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.chevronForwardOutline,
      personOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.personOutline
    });
    this.checkPredictionsStatus();
  }
  checkPredictionsStatus() {
    // Load stored predictions
    const storedPredictions = JSON.parse(localStorage.getItem('playerPredictions') || '[]');
    // Check if current gameweek predictions exist and are complete
    const currentGameweekPredictions = storedPredictions.find(submission => submission.gameweek === this.currentGameweek.number);
    if (currentGameweekPredictions) {
      const predictionCount = currentGameweekPredictions.predictions.length;
      this.predictionsCompleted = this.currentGameweek.isSpecial ? predictionCount === this.matches.length : predictionCount === 3;
    }
  }
  onScoreChange(match) {
    if (this.predictionsCompleted) {
      // Reset the score if predictions are completed
      match.prediction.homeScore = null;
      match.prediction.awayScore = null;
      this.showTooManyPredictionsWarning = true;
      return;
    }
    // Validate scores are numbers and within range
    if (match.prediction.homeScore !== null) {
      match.prediction.homeScore = Math.max(0, Math.min(99, match.prediction.homeScore));
    }
    if (match.prediction.awayScore !== null) {
      match.prediction.awayScore = Math.max(0, Math.min(99, match.prediction.awayScore));
    }
    // Count valid predictions
    this.updatePredictionCount();
  }
  updatePredictionCount() {
    this.selectedPredictionCount = this.matches.filter(match => match.prediction.homeScore !== null && match.prediction.awayScore !== null).length;
    // Show warning if more than 3 predictions in regular gameweek
    this.showTooManyPredictionsWarning = !this.currentGameweek.isSpecial && this.selectedPredictionCount > 3;
  }
  canSubmit() {
    if (this.predictionsCompleted) {
      return false;
    }
    if (this.currentGameweek.isSpecial) {
      return this.selectedPredictionCount === this.matches.length;
    } else {
      return this.selectedPredictionCount === 3;
    }
  }
  onSubmit() {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.predictionsCompleted) {
        return;
      }
      // Get matches with predictions
      const predictedMatches = _this.matches.filter(match => match.prediction.homeScore !== null && match.prediction.awayScore !== null);
      // Create prediction entry
      const submission = {
        gameweek: _this.currentGameweek.number,
        submittedAt: new Date().toISOString(),
        predictions: predictedMatches.map(match => ({
          id: match.id,
          gameweek: _this.currentGameweek.number,
          match: {
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            kickoff: match.kickoff,
            venue: match.venue
          },
          prediction: {
            home: match.prediction.homeScore,
            away: match.prediction.awayScore
          },
          status: 'pending'
        }))
      };
      // Store in localStorage (replacing any existing predictions for current gameweek)
      const storedPredictions = JSON.parse(localStorage.getItem('playerPredictions') || '[]');
      const updatedPredictions = storedPredictions.filter(pred => pred.gameweek !== _this.currentGameweek.number);
      updatedPredictions.push(submission);
      localStorage.setItem('playerPredictions', JSON.stringify(updatedPredictions));
      // Reset predictions and update status
      _this.resetPredictions();
      _this.predictionsCompleted = true;
      // Show success toast
      _this.showSuccessToast = true;
    })();
  }
  resetPredictions() {
    this.matches.forEach(match => {
      match.prediction.homeScore = null;
      match.prediction.awayScore = null;
    });
    this.selectedPredictionCount = 0;
    this.showTooManyPredictionsWarning = false;
  }
  navigateGameweek(delta) {
    const newGameweek = this.currentGameweek.number + delta;
    if (newGameweek >= 1 && newGameweek <= 38) {
      // Move current gameweek predictions to history if completed
      if (this.predictionsCompleted) {
        this.moveCurrentPredictionsToHistory();
      }
      // Update current gameweek
      this.currentGameweek = {
        ...this.currentGameweek,
        number: newGameweek
      };
      this.loadGameweekMatches(newGameweek);
      // Reset prediction status for new gameweek
      this.predictionsCompleted = false;
      this.resetPredictions();
    }
  }
  moveCurrentPredictionsToHistory() {
    const storedPredictions = JSON.parse(localStorage.getItem('playerPredictions') || '[]');
    const currentPredictions = storedPredictions.find(pred => pred.gameweek === this.currentGameweek.number);
    if (currentPredictions) {
      // Move to history
      const historicalPredictions = JSON.parse(localStorage.getItem('historicalPredictions') || '[]');
      historicalPredictions.push(currentPredictions);
      localStorage.setItem('historicalPredictions', JSON.stringify(historicalPredictions));
      // Remove from current predictions
      const updatedPredictions = storedPredictions.filter(pred => pred.gameweek !== this.currentGameweek.number);
      localStorage.setItem('playerPredictions', JSON.stringify(updatedPredictions));
    }
  }
  loadGameweekMatches(gameweek) {
    // TODO: Implement service call to load matches for the gameweek
  }
  navigateTo(path) {
    this.router.navigate([path]);
  }
}
_MatchesPage = MatchesPage;
_MatchesPage.ɵfac = function MatchesPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatchesPage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
_MatchesPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _MatchesPage,
  selectors: [["app-matches"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
  decls: 46,
  vars: 11,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], ["slot", "end"], [3, "click"], ["name", "person-outline"], [1, "ion-padding"], [1, "ion-justify-content-center"], ["size", "12", "size-md", "10", "size-lg", "8"], [1, "gameweek-navigation"], ["fill", "clear", 1, "nav-button", 3, "click", "disabled"], ["slot", "icon-only", "name", "chevron-back-outline"], [1, "gameweek-title"], ["color", "primary", 1, "prediction-badge"], ["slot", "icon-only", "name", "chevron-forward-outline"], [1, "deadline-card"], [1, "deadline-info"], [1, "deadline-section"], [1, "deadline"], ["name", "time-outline"], [1, "selection-info"], ["fill", "clear", 1, "reset-button", 3, "click"], ["name", "refresh-outline", "slot", "start"], ["class", "warning-container", 4, "ngIf"], [1, "matches-container"], ["class", "match-card", 4, "ngFor", "ngForOf"], [1, "submit-container"], ["expand", "block", 1, "submit-button", 3, "click", "disabled"], ["message", "Predictions submitted successfully! View them in the My Predictions tab.", "duration", "3000", "color", "success", "position", "top", "icon", "checkmark-circle-outline", 3, "isOpen"], [1, "warning-container"], [1, "warning-message"], ["name", "alert-circle-outline", "color", "danger"], [1, "match-card"], [1, "match-header"], [1, "venue"], ["name", "football-outline"], [1, "kickoff"], [1, "match-content"], [1, "team", "home"], [1, "score-inputs"], ["type", "number", "min", "0", "max", "99", "placeholder", "-", 1, "score-input", 3, "ngModelChange", "ngModel"], [1, "score-separator"], [1, "team", "away"]],
  template: function MatchesPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MatchesPage_Template_div_click_2_listener() {
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
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MatchesPage_Template_ion_button_click_10_listener() {
        return ctx.navigateTo("/player/settings");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "ion-content", 8)(13, "ion-grid")(14, "ion-row", 9)(15, "ion-col", 10)(16, "div", 11)(17, "ion-button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MatchesPage_Template_ion_button_click_17_listener() {
        return ctx.navigateGameweek(-1);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "ion-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 14)(20, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "ion-badge", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "ion-button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MatchesPage_Template_ion_button_click_24_listener() {
        return ctx.navigateGameweek(1);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "ion-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "ion-card", 17)(27, "ion-card-content")(28, "div", 18)(29, "div", 19)(30, "p", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](31, "ion-icon", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](33, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "p", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, " Make any 3 predictions for this game week ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "ion-button", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MatchesPage_Template_ion_button_click_36_listener() {
        return ctx.resetPredictions();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](37, "ion-icon", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, " RESET ALL ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](39, MatchesPage_div_39_Template, 5, 0, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](41, MatchesPage_div_41_Template, 19, 9, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "div", 28)(43, "ion-button", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MatchesPage_Template_ion_button_click_43_listener() {
        return ctx.onSubmit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, " Submit Predictions ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](45, "ion-toast", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.currentGameweek.number <= 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Game Week ", ctx.currentGameweek.number, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.currentGameweek.number >= 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Deadline: ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](33, 8, ctx.currentGameweek.deadline, "MMM d, yyyy, h:mm a"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showTooManyPredictionsWarning);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.matches);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx.canSubmit());
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("isOpen", ctx.showSuccessToast);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonGrid, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonRow, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCol, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButtons, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.MaxValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToast],
  styles: ["[_nghost-%COMP%] {\n  --page-margin: 16px;\n  --card-border-radius: 8px;\n  --card-background: #ffffff;\n}\n\nion-content[_ngcontent-%COMP%] {\n  --background: #f4f5f8;\n}\n\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 16px;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n}\n\n.football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.logo-sotd[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\n.logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n}\n\n.profile-button[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  font-size: 22px;\n  --color: var(--ion-color-medium);\n}\n\n.gameweek-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: var(--page-margin);\n}\n\n.nav-button[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  height: 36px;\n  --color: var(--ion-color-medium);\n}\n.nav-button[disabled][_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.nav-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n\n.gameweek-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.gameweek-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\n.prediction-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n\n.deadline-card[_ngcontent-%COMP%] {\n  margin-bottom: var(--page-margin);\n  border-radius: var(--card-border-radius);\n  box-shadow: none;\n  border: 1px solid var(--ion-color-light-shade);\n  background: var(--card-background);\n}\n\n.deadline-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 12px;\n}\n\n.deadline-section[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.deadline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 16px;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n  margin: 0 0 8px;\n}\n.deadline[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--ion-color-medium);\n}\n\n.selection-info[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 14px;\n  margin: 0;\n}\n\n.reset-button[_ngcontent-%COMP%] {\n  --color: var(--ion-color-medium);\n  text-transform: uppercase;\n  font-weight: 500;\n  font-size: 14px;\n  height: 36px;\n  margin: 0;\n}\n\n.matches-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n\n.match-card[_ngcontent-%COMP%] {\n  background: var(--card-background);\n  border: 1px solid var(--ion-color-light-shade);\n  border-radius: var(--card-border-radius);\n  overflow: hidden;\n}\n\n.match-header[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-light-rgb), 0.5);\n  padding: 12px var(--page-margin);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid var(--ion-color-light-shade);\n}\n\n.venue[_ngcontent-%COMP%], \n.kickoff[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 14px;\n  color: var(--ion-color-medium);\n}\n.venue[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.kickoff[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n\n.match-content[_ngcontent-%COMP%] {\n  padding: var(--page-margin);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--page-margin);\n}\n\n.team[_ngcontent-%COMP%] {\n  flex: 1;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n  font-size: 15px;\n}\n\n.home[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n.away[_ngcontent-%COMP%] {\n  text-align: left;\n}\n\n.score-inputs[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 120px;\n  justify-content: center;\n}\n\n.score-input[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  text-align: center;\n  border: 1px solid var(--ion-color-light-shade);\n  border-radius: 4px;\n  font-size: 16px;\n  color: var(--ion-color-dark);\n  background: rgba(var(--ion-color-light-rgb), 0.5);\n}\n.score-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--ion-color-medium);\n}\n.score-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--ion-color-primary);\n  background: var(--card-background);\n}\n\n.score-separator[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n}\n\n.submit-container[_ngcontent-%COMP%] {\n  padding: 0 var(--page-margin) 32px;\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  --border-radius: var(--card-border-radius);\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  font-weight: 600;\n  font-size: 16px;\n  margin: 0;\n}\n\n@media (max-width: 576px) {\n  [_nghost-%COMP%] {\n    --page-margin: 12px;\n  }\n  .match-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n    text-align: center;\n  }\n  .team[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .home[_ngcontent-%COMP%] {\n    order: 1;\n  }\n  .score-inputs[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .away[_ngcontent-%COMP%] {\n    order: 3;\n  }\n  .score-input[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n  }\n}\nion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  height: 36px;\n}\n\nion-buttons[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--ion-color-medium);\n}\n\n.warning-container[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  padding: 16px;\n  background: rgba(var(--ion-color-danger-rgb), 0.1);\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease-out;\n}\n\n.warning-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 12px 16px;\n  border-radius: 8px;\n  background: var(--ion-color-danger-contrast);\n  box-shadow: 0 2px 8px rgba(var(--ion-color-danger-rgb), 0.2);\n  border: 1px solid rgba(var(--ion-color-danger-rgb), 0.2);\n  color: var(--ion-color-danger-shade);\n  font-weight: 500;\n  font-size: 14px;\n}\n\n.warning-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  flex-shrink: 0;\n}\n\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    transform: translateY(-100%);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGNoZXMucGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDTTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSwwQkFBQTtBQUFSOztBQUdNO0VBQ0UscUJBQUE7QUFBUjs7QUFHTTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUFBUjs7QUFHTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0FBQVI7O0FBR007RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUFBUjs7QUFHTTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQUFSOztBQUdNO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFBUjs7QUFHTTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtBQUFSOztBQUdNO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtBQUFSOztBQUdNO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQ0FBQTtBQUFSOztBQUdNO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxnQ0FBQTtBQUFSO0FBRVE7RUFDRSxZQUFBO0FBQVY7QUFHUTtFQUNFLGVBQUE7QUFEVjs7QUFLTTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQUZSO0FBSVE7RUFDRSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFGVjs7QUFNTTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFIUjs7QUFNTTtFQUNFLGlDQUFBO0VBQ0Esd0NBQUE7RUFDQSxnQkFBQTtFQUNBLDhDQUFBO0VBQ0Esa0NBQUE7QUFIUjs7QUFNTTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFIUjs7QUFNTTtFQUNFLE9BQUE7QUFIUjs7QUFNTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7QUFIUjtBQUtRO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBSFY7O0FBT007RUFDRSw4QkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FBSlI7O0FBT007RUFDRSxnQ0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7QUFKUjs7QUFPTTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQUpSOztBQU9NO0VBQ0Usa0NBQUE7RUFDQSw4Q0FBQTtFQUNBLHdDQUFBO0VBQ0EsZ0JBQUE7QUFKUjs7QUFPTTtFQUNFLGlEQUFBO0VBQ0EsZ0NBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLHFEQUFBO0FBSlI7O0FBT007O0VBRUUsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtBQUpSO0FBTVE7O0VBQ0UsZUFBQTtBQUhWOztBQU9NO0VBQ0UsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0FBSlI7O0FBT007RUFDRSxPQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7QUFKUjs7QUFPTTtFQUNFLGlCQUFBO0FBSlI7O0FBT007RUFDRSxnQkFBQTtBQUpSOztBQU9NO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFKUjs7QUFPTTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSw4Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDRCQUFBO0VBQ0EsaURBQUE7QUFKUjtBQU1RO0VBQ0UsOEJBQUE7QUFKVjtBQU9RO0VBQ0UsYUFBQTtFQUNBLHNDQUFBO0VBQ0Esa0NBQUE7QUFMVjs7QUFTTTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGdCQUFBO0FBTlI7O0FBU007RUFDRSxrQ0FBQTtBQU5SOztBQVNNO0VBQ0UsMENBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtBQU5SOztBQVNNO0VBQ0U7SUFDRSxtQkFBQTtFQU5SO0VBU007SUFDRSxzQkFBQTtJQUNBLFNBQUE7SUFDQSxrQkFBQTtFQVBSO0VBVU07SUFDRSxrQkFBQTtFQVJSO0VBV007SUFDRSxRQUFBO0VBVFI7RUFZTTtJQUNFLFFBQUE7RUFWUjtFQWFNO0lBQ0UsUUFBQTtFQVhSO0VBY007SUFDRSxXQUFBO0lBQ0EsWUFBQTtFQVpSO0FBQ0Y7QUFlTTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBYlI7O0FBZ0JNO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBYlI7O0FBZ0JNO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0Esa0RBQUE7RUFDQSxrQ0FBQTtBQWJSOztBQWdCTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSw0Q0FBQTtFQUNBLDREQUFBO0VBQ0Esd0RBQUE7RUFDQSxvQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQWJSOztBQWdCTTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBYlI7O0FBZ0JNO0VBQ0U7SUFDRSw0QkFBQTtFQWJSO0VBZU07SUFDRSx3QkFBQTtFQWJSO0FBQ0YiLCJmaWxlIjoibWF0Y2hlcy5wYWdlLnRzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgICA6aG9zdCB7XG4gICAgICAgIC0tcGFnZS1tYXJnaW46IDE2cHg7XG4gICAgICAgIC0tY2FyZC1ib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIC0tY2FyZC1iYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgICAgfVxuXG4gICAgICBpb24tY29udGVudCB7XG4gICAgICAgIC0tYmFja2dyb3VuZDogI2Y0ZjVmODtcbiAgICAgIH1cblxuICAgICAgLmhlYWRlci1jb250ZW50IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBwYWRkaW5nOiA4cHggMTZweDtcbiAgICAgIH1cblxuICAgICAgLmxvZ28tY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ2FwOiA4cHg7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIH1cblxuICAgICAgLmZvb3RiYWxsLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICB9XG5cbiAgICAgIC5sb2dvLXRleHQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgfVxuXG4gICAgICAubG9nby1zb3RkIHtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgfVxuXG4gICAgICAubG9nby1zdWJ0aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgfVxuXG4gICAgICAucHJvZmlsZS1idXR0b24ge1xuICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgICBmb250LXNpemU6IDIycHg7XG4gICAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgfVxuXG4gICAgICAuZ2FtZXdlZWstbmF2aWdhdGlvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tcGFnZS1tYXJnaW4pO1xuICAgICAgfVxuXG4gICAgICAubmF2LWJ1dHRvbiB7XG4gICAgICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgICAgICAtLXBhZGRpbmctZW5kOiA4cHg7XG4gICAgICAgIGhlaWdodDogMzZweDtcbiAgICAgICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG5cbiAgICAgICAgJltkaXNhYmxlZF0ge1xuICAgICAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLmdhbWV3ZWVrLXRpdGxlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ2FwOiA4cHg7XG5cbiAgICAgICAgaDIge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5wcmVkaWN0aW9uLWJhZGdlIHtcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICB9XG5cbiAgICAgIC5kZWFkbGluZS1jYXJkIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tcGFnZS1tYXJnaW4pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jYXJkLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jYXJkLWJhY2tncm91bmQpO1xuICAgICAgfVxuXG4gICAgICAuZGVhZGxpbmUtaW5mbyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICB9XG5cbiAgICAgIC5kZWFkbGluZS1zZWN0aW9uIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgLmRlYWRsaW5lIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ2FwOiA4cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgbWFyZ2luOiAwIDAgOHB4O1xuXG4gICAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5zZWxlY3Rpb24taW5mbyB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICB9XG5cbiAgICAgIC5yZXNldC1idXR0b24ge1xuICAgICAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgIH1cblxuICAgICAgLm1hdGNoZXMtY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgZ2FwOiAxMnB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAgICAgfVxuXG4gICAgICAubWF0Y2gtY2FyZCB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWNhcmQtYmFja2dyb3VuZCk7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWNhcmQtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5tYXRjaC1oZWFkZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1saWdodC1yZ2IpLCAwLjUpO1xuICAgICAgICBwYWRkaW5nOiAxMnB4IHZhcigtLXBhZ2UtbWFyZ2luKTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgICAgIH1cblxuICAgICAgLnZlbnVlLFxuICAgICAgLmtpY2tvZmYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBnYXA6IDZweDtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG5cbiAgICAgICAgaW9uLWljb24ge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAubWF0Y2gtY29udGVudCB7XG4gICAgICAgIHBhZGRpbmc6IHZhcigtLXBhZ2UtbWFyZ2luKTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICBnYXA6IHZhcigtLXBhZ2UtbWFyZ2luKTtcbiAgICAgIH1cblxuICAgICAgLnRlYW0ge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICB9XG5cbiAgICAgIC5ob21lIHtcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICB9XG5cbiAgICAgIC5hd2F5IHtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgIH1cblxuICAgICAgLnNjb3JlLWlucHV0cyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogOHB4O1xuICAgICAgICBtaW4td2lkdGg6IDEyMHB4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLnNjb3JlLWlucHV0IHtcbiAgICAgICAgd2lkdGg6IDQ4cHg7XG4gICAgICAgIGhlaWdodDogNDhweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItbGlnaHQtcmdiKSwgMC41KTtcblxuICAgICAgICAmOjpwbGFjZWhvbGRlciB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jYXJkLWJhY2tncm91bmQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5zY29yZS1zZXBhcmF0b3Ige1xuICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIH1cblxuICAgICAgLnN1Ym1pdC1jb250YWluZXIge1xuICAgICAgICBwYWRkaW5nOiAwIHZhcigtLXBhZ2UtbWFyZ2luKSAzMnB4O1xuICAgICAgfVxuXG4gICAgICAuc3VibWl0LWJ1dHRvbiB7XG4gICAgICAgIC0tYm9yZGVyLXJhZGl1czogdmFyKC0tY2FyZC1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgLS1wYWRkaW5nLXRvcDogMTZweDtcbiAgICAgICAgLS1wYWRkaW5nLWJvdHRvbTogMTZweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgLS1wYWdlLW1hcmdpbjogMTJweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tYXRjaC1jb250ZW50IHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGdhcDogMTJweDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAudGVhbSB7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmhvbWUge1xuICAgICAgICAgIG9yZGVyOiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNjb3JlLWlucHV0cyB7XG4gICAgICAgICAgb3JkZXI6IDI7XG4gICAgICAgIH1cblxuICAgICAgICAuYXdheSB7XG4gICAgICAgICAgb3JkZXI6IDM7XG4gICAgICAgIH1cblxuICAgICAgICAuc2NvcmUtaW5wdXQge1xuICAgICAgICAgIHdpZHRoOiA0NHB4O1xuICAgICAgICAgIGhlaWdodDogNDRweDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpb24tYnV0dG9ucyBpb24tYnV0dG9uIHtcbiAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgICAgICAgaGVpZ2h0OiAzNnB4O1xuICAgICAgfVxuXG4gICAgICBpb24tYnV0dG9ucyBpb24taWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgfVxuXG4gICAgICAud2FybmluZy1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHotaW5kZXg6IDEwMDA7XG4gICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjEpO1xuICAgICAgICBhbmltYXRpb246IHNsaWRlRG93biAwLjNzIGVhc2Utb3V0O1xuICAgICAgfVxuXG4gICAgICAud2FybmluZy1tZXNzYWdlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGdhcDogOHB4O1xuICAgICAgICBtYXgtd2lkdGg6IDYwMHB4O1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgcGFkZGluZzogMTJweCAxNnB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMik7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjIpO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZSk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIH1cblxuICAgICAgLndhcm5pbmctbWVzc2FnZSBpb24taWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2xpZGVEb3duIHtcbiAgICAgICAgZnJvbSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcbiAgICAgICAgfVxuICAgICAgICB0byB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3BsYXllci9wYWdlcy9tYXRjaGVzL21hdGNoZXMucGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDTTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSwwQkFBQTtBQUFSOztBQUdNO0VBQ0UscUJBQUE7QUFBUjs7QUFHTTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUFBUjs7QUFHTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0FBQVI7O0FBR007RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUFBUjs7QUFHTTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQUFSOztBQUdNO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFBUjs7QUFHTTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtBQUFSOztBQUdNO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtBQUFSOztBQUdNO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQ0FBQTtBQUFSOztBQUdNO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxnQ0FBQTtBQUFSO0FBRVE7RUFDRSxZQUFBO0FBQVY7QUFHUTtFQUNFLGVBQUE7QUFEVjs7QUFLTTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQUZSO0FBSVE7RUFDRSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFGVjs7QUFNTTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFIUjs7QUFNTTtFQUNFLGlDQUFBO0VBQ0Esd0NBQUE7RUFDQSxnQkFBQTtFQUNBLDhDQUFBO0VBQ0Esa0NBQUE7QUFIUjs7QUFNTTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFIUjs7QUFNTTtFQUNFLE9BQUE7QUFIUjs7QUFNTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7QUFIUjtBQUtRO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBSFY7O0FBT007RUFDRSw4QkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FBSlI7O0FBT007RUFDRSxnQ0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7QUFKUjs7QUFPTTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQUpSOztBQU9NO0VBQ0Usa0NBQUE7RUFDQSw4Q0FBQTtFQUNBLHdDQUFBO0VBQ0EsZ0JBQUE7QUFKUjs7QUFPTTtFQUNFLGlEQUFBO0VBQ0EsZ0NBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLHFEQUFBO0FBSlI7O0FBT007O0VBRUUsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtBQUpSO0FBTVE7O0VBQ0UsZUFBQTtBQUhWOztBQU9NO0VBQ0UsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0FBSlI7O0FBT007RUFDRSxPQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7QUFKUjs7QUFPTTtFQUNFLGlCQUFBO0FBSlI7O0FBT007RUFDRSxnQkFBQTtBQUpSOztBQU9NO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFKUjs7QUFPTTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSw4Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDRCQUFBO0VBQ0EsaURBQUE7QUFKUjtBQU1RO0VBQ0UsOEJBQUE7QUFKVjtBQU9RO0VBQ0UsYUFBQTtFQUNBLHNDQUFBO0VBQ0Esa0NBQUE7QUFMVjs7QUFTTTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGdCQUFBO0FBTlI7O0FBU007RUFDRSxrQ0FBQTtBQU5SOztBQVNNO0VBQ0UsMENBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtBQU5SOztBQVNNO0VBQ0U7SUFDRSxtQkFBQTtFQU5SO0VBU007SUFDRSxzQkFBQTtJQUNBLFNBQUE7SUFDQSxrQkFBQTtFQVBSO0VBVU07SUFDRSxrQkFBQTtFQVJSO0VBV007SUFDRSxRQUFBO0VBVFI7RUFZTTtJQUNFLFFBQUE7RUFWUjtFQWFNO0lBQ0UsUUFBQTtFQVhSO0VBY007SUFDRSxXQUFBO0lBQ0EsWUFBQTtFQVpSO0FBQ0Y7QUFlTTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBYlI7O0FBZ0JNO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBYlI7O0FBZ0JNO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0Esa0RBQUE7RUFDQSxrQ0FBQTtBQWJSOztBQWdCTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSw0Q0FBQTtFQUNBLDREQUFBO0VBQ0Esd0RBQUE7RUFDQSxvQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQWJSOztBQWdCTTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBYlI7O0FBZ0JNO0VBQ0U7SUFDRSw0QkFBQTtFQWJSO0VBZU07SUFDRSx3QkFBQTtFQWJSO0FBQ0Y7QUFDQSw0bWFBQTRtYSIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgICAgOmhvc3Qge1xuICAgICAgICAtLXBhZ2UtbWFyZ2luOiAxNnB4O1xuICAgICAgICAtLWNhcmQtYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICAtLWNhcmQtYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICAgIH1cblxuICAgICAgaW9uLWNvbnRlbnQge1xuICAgICAgICAtLWJhY2tncm91bmQ6ICNmNGY1Zjg7XG4gICAgICB9XG5cbiAgICAgIC5oZWFkZXItY29udGVudCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZzogOHB4IDE2cHg7XG4gICAgICB9XG5cbiAgICAgIC5sb2dvLWNvbnRhaW5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogOHB4O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC5mb290YmFsbC1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICAubG9nby10ZXh0IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIH1cblxuICAgICAgLmxvZ28tc290ZCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIH1cblxuICAgICAgLmxvZ28tc3VidGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cblxuICAgICAgLnByb2ZpbGUtYnV0dG9uIHtcbiAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cblxuICAgICAgLmdhbWV3ZWVrLW5hdmlnYXRpb24ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IHZhcigtLXBhZ2UtbWFyZ2luKTtcbiAgICAgIH1cblxuICAgICAgLm5hdi1idXR0b24ge1xuICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gICAgICAgICZbZGlzYWJsZWRdIHtcbiAgICAgICAgICBvcGFjaXR5OiAwLjU7XG4gICAgICAgIH1cblxuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5nYW1ld2Vlay10aXRsZSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogOHB4O1xuXG4gICAgICAgIGgyIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAucHJlZGljdGlvbi1iYWRnZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgfVxuXG4gICAgICAuZGVhZGxpbmUtY2FyZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IHZhcigtLXBhZ2UtbWFyZ2luKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tY2FyZC1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tY2FyZC1iYWNrZ3JvdW5kKTtcbiAgICAgIH1cblxuICAgICAgLmRlYWRsaW5lLWluZm8ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgICAgfVxuXG4gICAgICAuZGVhZGxpbmUtc2VjdGlvbiB7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIC5kZWFkbGluZSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogOHB4O1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgIG1hcmdpbjogMCAwIDhweDtcblxuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAuc2VsZWN0aW9uLWluZm8ge1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgfVxuXG4gICAgICAucmVzZXQtYnV0dG9uIHtcbiAgICAgICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgaGVpZ2h0OiAzNnB4O1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICB9XG5cbiAgICAgIC5tYXRjaGVzLWNvbnRhaW5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGdhcDogMTJweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgICAgIH1cblxuICAgICAgLm1hdGNoLWNhcmQge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jYXJkLWJhY2tncm91bmQpO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1jYXJkLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuXG4gICAgICAubWF0Y2gtaGVhZGVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItbGlnaHQtcmdiKSwgMC41KTtcbiAgICAgICAgcGFkZGluZzogMTJweCB2YXIoLS1wYWdlLW1hcmdpbik7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gICAgICB9XG5cbiAgICAgIC52ZW51ZSxcbiAgICAgIC5raWNrb2ZmIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ2FwOiA2cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gICAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLm1hdGNoLWNvbnRlbnQge1xuICAgICAgICBwYWRkaW5nOiB2YXIoLS1wYWdlLW1hcmdpbik7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgZ2FwOiB2YXIoLS1wYWdlLW1hcmdpbik7XG4gICAgICB9XG5cbiAgICAgIC50ZWFtIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgfVxuXG4gICAgICAuaG9tZSB7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgfVxuXG4gICAgICAuYXdheSB7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICB9XG5cbiAgICAgIC5zY29yZS1pbnB1dHMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgbWluLXdpZHRoOiAxMjBweDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC5zY29yZS1pbnB1dCB7XG4gICAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWxpZ2h0LXJnYiksIDAuNSk7XG5cbiAgICAgICAgJjo6cGxhY2Vob2xkZXIge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tY2FyZC1iYWNrZ3JvdW5kKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAuc2NvcmUtc2VwYXJhdG9yIHtcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICB9XG5cbiAgICAgIC5zdWJtaXQtY29udGFpbmVyIHtcbiAgICAgICAgcGFkZGluZzogMCB2YXIoLS1wYWdlLW1hcmdpbikgMzJweDtcbiAgICAgIH1cblxuICAgICAgLnN1Ym1pdC1idXR0b24ge1xuICAgICAgICAtLWJvcmRlci1yYWRpdXM6IHZhcigtLWNhcmQtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIC0tcGFkZGluZy10b3A6IDE2cHg7XG4gICAgICAgIC0tcGFkZGluZy1ib3R0b206IDE2cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgIC0tcGFnZS1tYXJnaW46IDEycHg7XG4gICAgICAgIH1cblxuICAgICAgICAubWF0Y2gtY29udGVudCB7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBnYXA6IDEycHg7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRlYW0ge1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5ob21lIHtcbiAgICAgICAgICBvcmRlcjogMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zY29yZS1pbnB1dHMge1xuICAgICAgICAgIG9yZGVyOiAyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmF3YXkge1xuICAgICAgICAgIG9yZGVyOiAzO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNjb3JlLWlucHV0IHtcbiAgICAgICAgICB3aWR0aDogNDRweDtcbiAgICAgICAgICBoZWlnaHQ6IDQ0cHg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW9uLWJ1dHRvbnMgaW9uLWJ1dHRvbiB7XG4gICAgICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgICAgICAtLXBhZGRpbmctZW5kOiA4cHg7XG4gICAgICAgIGhlaWdodDogMzZweDtcbiAgICAgIH1cblxuICAgICAgaW9uLWJ1dHRvbnMgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cblxuICAgICAgLndhcm5pbmctY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgICBwYWRkaW5nOiAxNnB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC4xKTtcbiAgICAgICAgYW5pbWF0aW9uOiBzbGlkZURvd24gMC4zcyBlYXNlLW91dDtcbiAgICAgIH1cblxuICAgICAgLndhcm5pbmctbWVzc2FnZSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgbWF4LXdpZHRoOiA2MDBweDtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0KTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjIpO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC4yKTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXItc2hhZGUpO1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICB9XG5cbiAgICAgIC53YXJuaW5nLW1lc3NhZ2UgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNsaWRlRG93biB7XG4gICAgICAgIGZyb20ge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XG4gICAgICAgIH1cbiAgICAgICAgdG8ge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_player_pages_matches_matches_page_ts.js.map