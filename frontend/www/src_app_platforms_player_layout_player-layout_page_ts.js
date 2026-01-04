"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_player_layout_player-layout_page_ts"],{

/***/ 8695:
/*!***************************************************************!*\
  !*** ./src/app/platforms/player/layout/player-layout.page.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlayerLayoutPage: () => (/* binding */ PlayerLayoutPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
var _PlayerLayoutPage;





class PlayerLayoutPage {
  constructor() {
    (0,ionicons__WEBPACK_IMPORTED_MODULE_1__.a)({
      gridOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.gridOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      analyticsOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.analyticsOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.trophyOutline,
      peopleCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.peopleCircleOutline
    });
  }
}
_PlayerLayoutPage = PlayerLayoutPage;
_PlayerLayoutPage.ɵfac = function PlayerLayoutPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PlayerLayoutPage)();
};
_PlayerLayoutPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _PlayerLayoutPage,
  selectors: [["app-player-layout"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
  decls: 22,
  vars: 0,
  consts: [["slot", "bottom"], ["tab", "dashboard", "href", "/player/dashboard"], ["name", "grid-outline"], ["tab", "matches", "href", "/player/matches"], ["name", "football-outline"], ["tab", "predictions", "href", "/player/predictions"], ["name", "analytics-outline"], ["tab", "standings", "href", "/player/standings"], ["name", "trophy-outline"], ["tab", "join-group", "href", "/player/join-group"], ["name", "people-circle-outline"]],
  template: function PlayerLayoutPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-tabs")(1, "ion-tab-bar", 0)(2, "ion-tab-button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Dashboard");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "ion-tab-button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Matches");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "ion-tab-button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "ion-icon", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Predictions");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "ion-tab-button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "ion-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Standings");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "ion-tab-button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](19, "ion-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Join Group");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonTabs, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonTabBar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonTabButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGF5ZXItbGF5b3V0LnBhZ2Uuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3BsYXllci9sYXlvdXQvcGxheWVyLWxheW91dC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9LQUFvSyIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_player_layout_player-layout_page_ts.js.map