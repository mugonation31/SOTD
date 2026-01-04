"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_core_services_mock-data_service_ts"],{

/***/ 8005:
/*!****************************************************!*\
  !*** ./src/app/core/services/mock-data.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MockDataService: () => (/* binding */ MockDataService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _scoring_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scoring.service */ 593);
var _MockDataService;



class MockDataService {
  constructor(scoringService) {
    this.scoringService = scoringService;
    this.STORAGE_KEYS = {
      PLAYER_PREDICTIONS: 'playerPredictions',
      HISTORICAL_PREDICTIONS: 'historicalPredictions',
      HISTORICAL_MATCHES: 'historicalMatches',
      GROUP_ADMIN_PREDICTIONS: 'groupAdminPredictions'
    };
    // Current season data
    this.currentGameweek = 15;
    this.currentSeason = '2023-24';
    // Reactive subjects for real-time updates
    this.predictionsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
    this.gameweeksSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
    this.initializeMockData();
  }
  // ====================================
  // 🔄 SUPABASE INTEGRATION POINTS
  // ====================================
  // When ready to connect Supabase, replace these methods:
  // - getMatchesForGameweek() -> supabase.from('matches').select()
  // - savePredictions() -> supabase.from('predictions').upsert()
  // - getPlayerPredictions() -> supabase.from('predictions').select()
  // - updateMatchResults() -> supabase.from('matches').update()
  /**
   * Get current gameweek number
   */
  getCurrentGameweek() {
    return this.currentGameweek;
  }
  /**
   * Get matches for a specific gameweek
   */
  getMatchesForGameweek(gameweek) {
    const gameweekData = this.getGameweekData(gameweek);
    return gameweekData ? gameweekData.matches : [];
  }
  /**
   * Get current gameweek data
   */
  getCurrentGameweekData() {
    return this.getGameweekData(this.currentGameweek) || this.createEmptyGameweek(this.currentGameweek);
  }
  /**
   * Get historical gameweeks with data
   */
  getAvailableHistoricalGameweeks() {
    const historical = this.getStoredData(this.STORAGE_KEYS.HISTORICAL_PREDICTIONS);
    const gameweeks = historical.map(pred => Number(pred.gameweek));
    return Array.from(new Set(gameweeks)).sort((a, b) => b - a);
  }
  /**
   * Get player predictions for current gameweek
   */
  getPlayerPredictions(gameweek) {
    const targetGameweek = gameweek || this.currentGameweek;
    const stored = this.getStoredData(this.STORAGE_KEYS.PLAYER_PREDICTIONS);
    const gameweekData = stored.find(submission => submission.gameweek === targetGameweek);
    return gameweekData ? gameweekData.predictions : [];
  }
  /**
   * Save player predictions
   */
  savePredictions(predictions) {
    if (predictions.length === 0) return;
    const gameweek = predictions[0].gameweek;
    const stored = this.getStoredData(this.STORAGE_KEYS.PLAYER_PREDICTIONS);
    // Remove existing predictions for this gameweek
    const filtered = stored.filter(submission => submission.gameweek !== gameweek);
    // Add new predictions
    filtered.push({
      gameweek,
      predictions,
      submittedAt: new Date().toISOString()
    });
    this.setStoredData(this.STORAGE_KEYS.PLAYER_PREDICTIONS, filtered);
    this.predictionsSubject.next(predictions);
  }
  /**
   * Get historical predictions
   */
  getHistoricalPredictions(gameweek) {
    const historical = this.getStoredData(this.STORAGE_KEYS.HISTORICAL_PREDICTIONS);
    const gameweekData = historical.find(pred => pred.gameweek === gameweek);
    if (!gameweekData) return [];
    // Calculate points and status for historical predictions
    return gameweekData.predictions.map(pred => {
      if (pred.match.finalScore) {
        const isCorrect = pred.prediction.home === pred.match.finalScore.home && pred.prediction.away === pred.match.finalScore.away;
        return {
          ...pred,
          points: this.scoringService.calculatePoints([{
            prediction: pred.prediction,
            actual: pred.match.finalScore,
            isJokerRound: false
          }]),
          status: isCorrect ? 'correct' : 'incorrect'
        };
      }
      return pred;
    });
  }
  /**
   * Get all group admin predictions for a gameweek
   */
  getGroupAdminPredictions(gameweek) {
    // This would come from Supabase in real implementation
    return this.generateSampleGroupPredictions(gameweek);
  }
  /**
   * Update live scores for matches
   */
  updateLiveScores() {
    // TODO: Replace with real API call to get live EPL scores
    const currentPredictions = this.getPlayerPredictions();
    const updatedPredictions = currentPredictions.map(pred => {
      if (this.isMatchLive(pred.match)) {
        pred.match.liveScore = this.generateMockLiveScore(pred.match);
      }
      return pred;
    });
    if (updatedPredictions.length > 0) {
      this.savePredictions(updatedPredictions);
    }
  }
  /**
   * Check if match is currently live
   */
  isMatchLive(match) {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    return now >= kickoff && now <= new Date(kickoff.getTime() + 2 * 60 * 60 * 1000);
  }
  /**
   * Check if match is finished
   */
  isMatchFinished(match) {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    return now > new Date(kickoff.getTime() + 2 * 60 * 60 * 1000);
  }
  /**
   * Get match time display
   */
  getMatchTime(match) {
    var _match$liveScore;
    if (!((_match$liveScore = match.liveScore) !== null && _match$liveScore !== void 0 && _match$liveScore.isLive)) return '';
    if (this.isMatchFinished(match)) {
      return 'FT';
    }
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
  // ====================================
  // 🏗️ PRIVATE HELPER METHODS
  // ====================================
  initializeMockData() {
    // Initialize historical predictions if not exists
    if (!this.hasStoredData(this.STORAGE_KEYS.HISTORICAL_PREDICTIONS)) {
      this.setStoredData(this.STORAGE_KEYS.HISTORICAL_PREDICTIONS, this.generateHistoricalPredictions());
    }
  }
  getGameweekData(gameweek) {
    const gameweeks = this.generateGameweeks();
    return gameweeks.find(gw => gw.number === gameweek) || null;
  }
  createEmptyGameweek(gameweek) {
    return {
      number: gameweek,
      isSpecial: false,
      status: 'active',
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
      // 24 hours from now
      matches: []
    };
  }
  generateGameweeks() {
    // Mock EPL gameweeks - in real app this comes from Supabase
    return [{
      number: 15,
      isSpecial: false,
      status: 'active',
      deadline: new Date('2024-01-20T11:30:00'),
      matches: this.generateMatchesForGameweek(15)
    }, {
      number: 16,
      isSpecial: true,
      specialType: 'christmas',
      status: 'pending',
      deadline: new Date('2024-01-27T11:30:00'),
      matches: this.generateMatchesForGameweek(16)
    }, {
      number: 14,
      isSpecial: false,
      status: 'completed',
      deadline: new Date('2024-01-13T11:30:00'),
      matches: this.generateMatchesForGameweek(14)
    }];
  }
  generateMatchesForGameweek(gameweek) {
    const teams = this.getPremierLeagueTeams();
    const venues = this.getPremierLeagueVenues();
    // Generate realistic fixture list for gameweek
    const fixtures = this.getFixturesForGameweek(gameweek);
    return fixtures.map((fixture, index) => ({
      id: gameweek * 100 + index + 1,
      gameweek,
      homeTeam: fixture.home,
      awayTeam: fixture.away,
      venue: venues[fixture.home] || 'Stadium',
      kickoff: this.getKickoffTime(gameweek, index),
      homeScore: null,
      awayScore: null,
      status: 'scheduled'
    }));
  }
  getPremierLeagueTeams() {
    return ['Arsenal', 'Aston Villa', 'Brighton', 'Burnley', 'Chelsea', 'Crystal Palace', 'Everton', 'Fulham', 'Liverpool', 'Luton Town', 'Manchester City', 'Manchester United', 'Newcastle', 'Nottingham Forest', 'Sheffield United', 'Tottenham', 'West Ham', 'Wolves', 'Bournemouth', 'Brentford'];
  }
  getPremierLeagueVenues() {
    return {
      'Arsenal': 'Emirates Stadium',
      'Aston Villa': 'Villa Park',
      'Brighton': 'Amex Stadium',
      'Burnley': 'Turf Moor',
      'Chelsea': 'Stamford Bridge',
      'Crystal Palace': 'Selhurst Park',
      'Everton': 'Goodison Park',
      'Fulham': 'Craven Cottage',
      'Liverpool': 'Anfield',
      'Luton Town': 'Kenilworth Road',
      'Manchester City': 'Etihad Stadium',
      'Manchester United': 'Old Trafford',
      'Newcastle': 'St. James Park',
      'Nottingham Forest': 'City Ground',
      'Sheffield United': 'Bramall Lane',
      'Tottenham': 'Tottenham Hotspur Stadium',
      'West Ham': 'London Stadium',
      'Wolves': 'Molineux',
      'Bournemouth': 'Vitality Stadium',
      'Brentford': 'Gtech Community Stadium'
    };
  }
  getFixturesForGameweek(gameweek) {
    // Mock fixture generation - in real app this comes from API
    const fixtures = [{
      home: 'Manchester United',
      away: 'Liverpool'
    }, {
      home: 'Arsenal',
      away: 'Chelsea'
    }, {
      home: 'Manchester City',
      away: 'Tottenham'
    }, {
      home: 'Newcastle',
      away: 'Aston Villa'
    }, {
      home: 'Brighton',
      away: 'Crystal Palace'
    }, {
      home: 'Brentford',
      away: 'Nottingham Forest'
    }, {
      home: 'Sheffield United',
      away: 'West Ham'
    }, {
      home: 'Bournemouth',
      away: 'Luton Town'
    }, {
      home: 'Wolves',
      away: 'Everton'
    }, {
      home: 'Burnley',
      away: 'Fulham'
    }];
    return fixtures;
  }
  getKickoffTime(gameweek, matchIndex) {
    const baseDate = new Date('2024-01-20T15:00:00');
    const matchDate = new Date(baseDate.getTime() + (gameweek - 15) * 7 * 24 * 60 * 60 * 1000);
    // Vary kickoff times realistically
    const kickoffTimes = ['15:00', '17:30', '20:00'];
    const timeIndex = matchIndex % kickoffTimes.length;
    const [hours, minutes] = kickoffTimes[timeIndex].split(':');
    matchDate.setHours(parseInt(hours), parseInt(minutes));
    return matchDate.toISOString();
  }
  generateMockLiveScore(match) {
    return {
      home: Math.floor(Math.random() * 4),
      away: Math.floor(Math.random() * 4),
      isLive: true,
      minute: 45 + Math.floor(Math.random() * 45),
      additionalTime: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : undefined
    };
  }
  generateHistoricalPredictions() {
    return [{
      gameweek: 14,
      predictions: [{
        id: 1,
        gameweek: 14,
        match: {
          homeTeam: 'Arsenal',
          awayTeam: 'Brighton',
          kickoff: '2024-01-17T19:45:00',
          venue: 'Emirates Stadium',
          finalScore: {
            home: 2,
            away: 1
          }
        },
        prediction: {
          home: 2,
          away: 1
        },
        status: 'correct'
      }, {
        id: 2,
        gameweek: 14,
        match: {
          homeTeam: 'Brentford',
          awayTeam: 'Chelsea',
          kickoff: '2024-01-17T20:00:00',
          venue: 'Gtech Community Stadium',
          finalScore: {
            home: 0,
            away: 2
          }
        },
        prediction: {
          home: 1,
          away: 1
        },
        status: 'incorrect'
      }]
    }];
  }
  generateSampleGroupPredictions(gameweek) {
    return [{
      playerName: 'John Smith',
      avatar: 'assets/avatars/john.jpg',
      totalPoints: 156,
      jokerUsed: true,
      predictions: [{
        id: 1,
        gameweek,
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
      }]
    }];
  }
  getStoredData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }
  setStoredData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  hasStoredData(key) {
    return localStorage.getItem(key) !== null;
  }
}
_MockDataService = MockDataService;
_MockDataService.ɵfac = function MockDataService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MockDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_scoring_service__WEBPACK_IMPORTED_MODULE_0__.ScoringService));
};
_MockDataService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _MockDataService,
  factory: _MockDataService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 593:
/*!**************************************************!*\
  !*** ./src/app/core/services/scoring.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScoringService: () => (/* binding */ ScoringService)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 6196);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _season_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./season.service */ 1529);

var _ScoringService;



class ScoringService {
  constructor(seasonService) {
    this.seasonService = seasonService;
  }
  calculatePoints(predictions) {
    var _predictions$;
    let totalPoints = 0;
    let correctScores = 0;
    predictions.forEach(prediction => {
      // Calculate base points for correct result
      const basePoints = this.calculateBasePoints(prediction.prediction, prediction.actual);
      // Add points for correct score
      if (this.isCorrectScore(prediction.prediction, prediction.actual)) {
        totalPoints += 3;
        correctScores++;
      }
      // Add base points
      totalPoints += basePoints;
    });
    // Add bonus for 3 perfect scores
    if (correctScores === 3) {
      totalPoints += 10;
    }
    // Double points if joker used
    if ((_predictions$ = predictions[0]) !== null && _predictions$ !== void 0 && _predictions$.isJokerRound) {
      totalPoints *= 2;
    }
    return totalPoints;
  }
  calculateBasePoints(prediction, actual) {
    const predictionResult = this.getMatchResult(prediction);
    const actualResult = this.getMatchResult(actual);
    if (predictionResult !== actualResult) {
      return 0;
    }
    switch (actualResult) {
      case 'HOME_WIN':
        return 3;
      case 'AWAY_WIN':
        return 4;
      case 'DRAW':
        return 6;
      default:
        return 0;
    }
  }
  getMatchResult(result) {
    if (result.homeScore > result.awayScore) return 'HOME_WIN';
    if (result.homeScore < result.awayScore) return 'AWAY_WIN';
    return 'DRAW';
  }
  isCorrectScore(prediction, actual) {
    return prediction.homeScore === actual.homeScore && prediction.awayScore === actual.awayScore;
  }
  isBoxingDay(date) {
    return date.getMonth() === 11 && date.getDate() === 26;
  }
  isFinalDay(date) {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const seasonInfo = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.firstValueFrom)(_this.seasonService.getSeasonInfo());
      // Check if the date is the final day of the season
      return date.toDateString() === new Date(seasonInfo.seasonEndDate).toDateString();
    })();
  }
  shouldForceJokerUse(date, jokersUsed) {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (jokersUsed >= 2) return false;
      const isBeforeBoxingDay = date < new Date('2023-12-26');
      const isAfterBoxingDay = date > new Date('2023-12-26');
      const isFinalRound = yield _this2.isFinalDay(date);
      // Force first joker before Boxing Day
      if (jokersUsed === 0 && !isBeforeBoxingDay) return true;
      // Force second joker before final round
      if (jokersUsed === 1 && isAfterBoxingDay && !isFinalRound) return true;
      return false;
    })();
  }
}
_ScoringService = ScoringService;
_ScoringService.ɵfac = function ScoringService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ScoringService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_season_service__WEBPACK_IMPORTED_MODULE_1__.SeasonService));
};
_ScoringService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _ScoringService,
  factory: _ScoringService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 1529:
/*!*************************************************!*\
  !*** ./src/app/core/services/season.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SeasonService: () => (/* binding */ SeasonService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
var _SeasonService;


class SeasonService {
  constructor() {
    this.seasonInfo = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject({
      currentGameweek: 0,
      totalGameweeks: 38,
      seasonStartDate: new Date('2024-08-10'),
      seasonEndDate: new Date('2025-05-19'),
      isSeasonStarted: false,
      isSeasonEnded: false
    });
    // Initialize season status
    this.updateSeasonStatus();
    // Update status every hour
    setInterval(() => this.updateSeasonStatus(), 3600000);
  }
  updateSeasonStatus() {
    const now = new Date();
    const currentInfo = this.seasonInfo.value;
    const isSeasonStarted = now >= currentInfo.seasonStartDate;
    const isSeasonEnded = now >= currentInfo.seasonEndDate;
    // Calculate current gameweek based on season progress
    let currentGameweek = 0;
    if (isSeasonStarted && !isSeasonEnded) {
      const totalDays = (currentInfo.seasonEndDate.getTime() - currentInfo.seasonStartDate.getTime()) / (1000 * 60 * 60 * 24);
      const daysElapsed = (now.getTime() - currentInfo.seasonStartDate.getTime()) / (1000 * 60 * 60 * 24);
      currentGameweek = Math.floor(daysElapsed / totalDays * currentInfo.totalGameweeks) + 1;
    } else if (isSeasonEnded) {
      currentGameweek = currentInfo.totalGameweeks;
    }
    this.seasonInfo.next({
      ...currentInfo,
      currentGameweek,
      isSeasonStarted,
      isSeasonEnded
    });
  }
  getSeasonInfo() {
    return this.seasonInfo.asObservable();
  }
  getCurrentGameweek() {
    return this.seasonInfo.value.currentGameweek;
  }
  isSeasonStarted() {
    return this.seasonInfo.value.isSeasonStarted;
  }
  isSeasonEnded() {
    return this.seasonInfo.value.isSeasonEnded;
  }
}
_SeasonService = SeasonService;
_SeasonService.ɵfac = function SeasonService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SeasonService)();
};
_SeasonService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _SeasonService,
  factory: _SeasonService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 6196:
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/firstValueFrom.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   firstValueFrom: () => (/* binding */ firstValueFrom)
/* harmony export */ });
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/EmptyError */ 3335);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ 9285);


function firstValueFrom(source, config) {
  const hasConfig = typeof config === 'object';
  return new Promise((resolve, reject) => {
    const subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
      next: value => {
        resolve(value);
        subscriber.unsubscribe();
      },
      error: reject,
      complete: () => {
        if (hasConfig) {
          resolve(config.defaultValue);
        } else {
          reject(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__.EmptyError());
        }
      }
    });
    source.subscribe(subscriber);
  });
}

/***/ })

}]);
//# sourceMappingURL=default-src_app_core_services_mock-data_service_ts.js.map