"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_welcome_welcome_page_ts"],{

/***/ 7093:
/*!***************************************************!*\
  !*** ./src/app/platforms/welcome/welcome.page.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WelcomePage: () => (/* binding */ WelcomePage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/auth.service */ 8010);
/* harmony import */ var _services_supabase_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/supabase.service */ 9692);
var _WelcomePage;








function WelcomePage_ion_col_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-col", 17)(1, "ion-card")(2, "ion-card-content")(3, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "ion-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const step_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", step_r1.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](step_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](step_r1.description);
  }
}
function WelcomePage_ion_col_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-col", 20)(1, "ion-card")(2, "ion-card-content")(3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "ion-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const feature_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", feature_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](feature_r2.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](feature_r2.description);
  }
}
class WelcomePage {
  constructor(router, authService, supabaseService) {
    this.router = router;
    this.authService = authService;
    this.supabaseService = supabaseService;
    this.howItWorks = [{
      icon: 'people-outline',
      title: 'Create or Join',
      description: 'Start a new group or join an existing one'
    }, {
      icon: 'football-outline',
      title: 'Make Predictions',
      description: 'Predict match outcomes for each gameweek'
    }, {
      icon: 'trophy-outline',
      title: 'Compete',
      description: 'Earn points and climb the leaderboard'
    }];
    this.features = [{
      icon: 'star-outline',
      title: 'Multiple Groups',
      description: 'Join different groups with friends or colleagues'
    }, {
      icon: 'cash-outline',
      title: 'Prize Pools',
      description: 'Optional entry fees and prize distributions'
    }];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.peopleOutline,
      personAddOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personAddOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.trophyOutline,
      starOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.starOutline,
      cashOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.cashOutline,
      logInOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.logInOutline
    });
  }
  ngOnInit() {
    // Check for hash fragments with access tokens
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      this.router.navigate(['/auth/reset-password']);
      return;
    }
    // Check for reset password tokens in query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const type = urlParams.get('type');
    if (token && type === 'recovery') {
      // Redirect to reset password page with the token
      this.router.navigate(['/auth/reset-password'], {
        queryParams: {
          token: token,
          type: type
        }
      });
      return;
    }
  }
  createGroup() {
    // ALWAYS force Group-Admin Journey regardless of current authentication
    // This ensures "Create a Group" always leads to group-admin flow
    this.router.navigate(['/auth/signup'], {
      queryParams: {
        role: 'group-admin',
        returnUrl: '/group-admin/groups',
        forceRole: 'true' // Force this role selection
      }
    });
  }
  joinGroup() {
    // ALWAYS force Player Journey regardless of current authentication
    // This ensures "Join a Group" always leads to player flow
    this.router.navigate(['/auth/signup'], {
      queryParams: {
        role: 'player',
        returnUrl: '/player/join-group',
        forceRole: 'true' // Force this role selection
      }
    });
  }
  login() {
    // Clear any existing session to allow fresh login
    // This ensures users can login as different users from welcome page
    console.log('🔄 Welcome: Clearing session before login');
    this.authService.clearSession();
    // Add a small delay to ensure session is cleared before navigation
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 100);
  }
}
_WelcomePage = WelcomePage;
_WelcomePage.ɵfac = function WelcomePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _WelcomePage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_supabase_service__WEBPACK_IMPORTED_MODULE_2__.SupabaseService));
};
_WelcomePage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _WelcomePage,
  selectors: [["app-welcome"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 46,
  vars: 2,
  consts: [[1, "logo-container"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], ["slot", "end"], [3, "click"], ["slot", "start", "name", "log-in-outline"], [1, "ion-padding"], [1, "welcome-container"], [1, "options-container"], ["name", "people-outline"], ["name", "person-add-outline"], [1, "how-it-works"], ["size", "12", "size-md", "4", 4, "ngFor", "ngForOf"], [1, "features"], ["size", "12", "size-md", "6", 4, "ngFor", "ngForOf"], ["size", "12", "size-md", "4"], [1, "step-icon"], [3, "name"], ["size", "12", "size-md", "6"], [1, "feature-icon"]],
  template: function WelcomePage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "ion-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2)(5, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "ion-buttons", 5)(10, "ion-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WelcomePage_Template_ion_button_click_10_listener() {
        return ctx.login();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, " Login ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "ion-content", 8)(14, "div", 9)(15, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Welcome to Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Choose how you'd like to get started:");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 10)(20, "ion-card", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WelcomePage_Template_ion_card_click_20_listener() {
        return ctx.createGroup();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "ion-card-header")(22, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](23, "ion-icon", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, " Create a Group ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "ion-card-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, " Create your own prediction group and invite others to join. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "ion-card", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WelcomePage_Template_ion_card_click_27_listener() {
        return ctx.joinGroup();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "ion-card-header")(29, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](30, "ion-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, " Join a Group ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "ion-card-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, " Join an existing prediction group using an invite code. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "section", 13)(35, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "How It Works");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "ion-grid")(38, "ion-row");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](39, WelcomePage_ion_col_39_Template, 9, 3, "ion-col", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "section", 15)(41, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42, "Features");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "ion-grid")(44, "ion-row");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](45, WelcomePage_ion_col_45_Template, 9, 3, "ion-col", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](39);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.howItWorks);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.features);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonGrid, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonRow, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCol, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButtons, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgFor],
  styles: ["ion-toolbar[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --padding-end: 0;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n}\n\n.football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.logo-sotd[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n\n.logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n  line-height: 1;\n}\n\n.welcome-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n  text-align: center;\n}\n.welcome-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  color: var(--ion-color-dark);\n}\n.welcome-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  margin: 3rem 0 2rem;\n}\n.welcome-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--ion-color-medium);\n  margin-bottom: 2rem;\n}\n\n.options-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 20px;\n  margin-bottom: 3rem;\n}\n.options-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  margin: 0;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n}\n.options-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n}\n.options-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 1.3rem;\n}\n.options-container[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: var(--ion-color-primary);\n}\n\n.how-it-works[_ngcontent-%COMP%], .features[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n  text-align: center;\n}\n.how-it-works[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .features[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n  color: var(--ion-color-dark);\n}\n.how-it-works[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%], .features[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  height: 100%;\n  margin: 0;\n  text-align: center;\n}\n.how-it-works[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .step-icon[_ngcontent-%COMP%], .how-it-works[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .feature-icon[_ngcontent-%COMP%], .features[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .step-icon[_ngcontent-%COMP%], .features[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .feature-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: var(--ion-color-primary);\n  margin-bottom: 1rem;\n}\n.how-it-works[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .features[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n  color: var(--ion-color-dark);\n}\n.how-it-works[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .features[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--ion-color-medium);\n  margin: 0;\n}\n\n@media (max-width: 768px) {\n  .welcome-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .welcome-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.8rem;\n  }\n  .how-it-works[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .features[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.6rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlbGNvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQUFGOztBQUdBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGNBQUE7QUFBRjs7QUFHQTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQUFGO0FBRUU7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLDRCQUFBO0FBQUo7QUFHRTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLG1CQUFBO0FBREo7QUFJRTtFQUNFLGlCQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtBQUZKOztBQU1BO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBSEY7QUFLRTtFQUNFLFNBQUE7RUFDQSxlQUFBO0VBQ0EsK0JBQUE7QUFISjtBQUtJO0VBQ0UsMkJBQUE7QUFITjtBQU1JO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGlCQUFBO0FBSk47QUFNTTtFQUNFLGlCQUFBO0VBQ0EsK0JBQUE7QUFKUjs7QUFVQTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7QUFQRjtBQVNFO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsNEJBQUE7QUFQSjtBQVVFO0VBQ0UsWUFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtBQVJKO0FBVUk7RUFDRSxpQkFBQTtFQUNBLCtCQUFBO0VBQ0EsbUJBQUE7QUFSTjtBQVdJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsNEJBQUE7QUFUTjtBQVlJO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtBQVZOOztBQWVBO0VBQ0U7SUFDRSxhQUFBO0VBWkY7RUFjRTtJQUNFLGlCQUFBO0VBWko7RUFpQkU7SUFDRSxpQkFBQTtFQWZKO0FBQ0YiLCJmaWxlIjoid2VsY29tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMb2dvIHN0eWxlc1xyXG5pb24tdG9vbGJhciB7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG4gIC0tcGFkZGluZy1lbmQ6IDA7XHJcbn1cclxuXHJcbi5sb2dvLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG4gIHBhZGRpbmc6IDhweCAxNnB4O1xyXG59XHJcblxyXG4uZm9vdGJhbGwtaWNvbiB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbn1cclxuXHJcbi5sb2dvLXRleHQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5cclxuLmxvZ28tc290ZCB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbGluZS1oZWlnaHQ6IDEuMjtcclxufVxyXG5cclxuLmxvZ28tc3VidGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbn1cclxuXHJcbi53ZWxjb21lLWNvbnRhaW5lciB7XHJcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogMjBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMnJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICB9XHJcblxyXG4gIGgyIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICBtYXJnaW46IDNyZW0gMCAycmVtO1xyXG4gIH1cclxuXHJcbiAgcCB7XHJcbiAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XHJcbiAgfVxyXG59XHJcblxyXG4ub3B0aW9ucy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyODBweCwgMWZyKSk7XHJcbiAgZ2FwOiAyMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XHJcblxyXG4gIGlvbi1jYXJkIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2U7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcclxuICAgIH1cclxuXHJcbiAgICBpb24tY2FyZC10aXRsZSB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGdhcDogMTBweDtcclxuICAgICAgZm9udC1zaXplOiAxLjNyZW07XHJcblxyXG4gICAgICBpb24taWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmhvdy1pdC13b3JrcywgLmZlYXR1cmVzIHtcclxuICBtYXJnaW4tYm90dG9tOiAzcmVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgaDIge1xyXG4gICAgZm9udC1zaXplOiAxLjhyZW07XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICB9XHJcblxyXG4gIGlvbi1jYXJkIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgICAuc3RlcC1pY29uLCAuZmVhdHVyZS1pY29uIHtcclxuICAgICAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICB9XHJcblxyXG4gICAgaDMge1xyXG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgfVxyXG5cclxuICAgIHAge1xyXG4gICAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLndlbGNvbWUtY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcblxyXG4gICAgaDEge1xyXG4gICAgICBmb250LXNpemU6IDEuOHJlbTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5ob3ctaXQtd29ya3MsIC5mZWF0dXJlcyB7XHJcbiAgICBoMiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS42cmVtO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3dlbGNvbWUvd2VsY29tZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7RUFDQSwrQkFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQUFGOztBQUdBO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsY0FBQTtBQUFGOztBQUdBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBQUY7QUFFRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7QUFBSjtBQUdFO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0EsbUJBQUE7QUFESjtBQUlFO0VBQ0UsaUJBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0FBRko7O0FBTUE7RUFDRSxhQUFBO0VBQ0EsMkRBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUFIRjtBQUtFO0VBQ0UsU0FBQTtFQUNBLGVBQUE7RUFDQSwrQkFBQTtBQUhKO0FBS0k7RUFDRSwyQkFBQTtBQUhOO0FBTUk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7QUFKTjtBQU1NO0VBQ0UsaUJBQUE7RUFDQSwrQkFBQTtBQUpSOztBQVVBO0VBQ0UsbUJBQUE7RUFDQSxrQkFBQTtBQVBGO0FBU0U7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSw0QkFBQTtBQVBKO0FBVUU7RUFDRSxZQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBUko7QUFVSTtFQUNFLGlCQUFBO0VBQ0EsK0JBQUE7RUFDQSxtQkFBQTtBQVJOO0FBV0k7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSw0QkFBQTtBQVROO0FBWUk7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0FBVk47O0FBZUE7RUFDRTtJQUNFLGFBQUE7RUFaRjtFQWNFO0lBQ0UsaUJBQUE7RUFaSjtFQWlCRTtJQUNFLGlCQUFBO0VBZko7QUFDRjtBQUNBLGc2SkFBZzZKIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTG9nbyBzdHlsZXNcclxuaW9uLXRvb2xiYXIge1xyXG4gIC0tcGFkZGluZy1zdGFydDogMDtcclxuICAtLXBhZGRpbmctZW5kOiAwO1xyXG59XHJcblxyXG4ubG9nby1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDhweDtcclxuICBwYWRkaW5nOiA4cHggMTZweDtcclxufVxyXG5cclxuLmZvb3RiYWxsLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG59XHJcblxyXG4ubG9nby10ZXh0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5sb2dvLXNvdGQge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjI7XHJcbn1cclxuXHJcbi5sb2dvLXN1YnRpdGxlIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG59XHJcblxyXG4ud2VsY29tZS1jb250YWluZXIge1xyXG4gIG1heC13aWR0aDogMTIwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICBoMSB7XHJcbiAgICBmb250LXNpemU6IDJyZW07XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgfVxyXG5cclxuICBoMiB7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgbWFyZ2luOiAzcmVtIDAgMnJlbTtcclxuICB9XHJcblxyXG4gIHAge1xyXG4gICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gIH1cclxufVxyXG5cclxuLm9wdGlvbnMtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjgwcHgsIDFmcikpO1xyXG4gIGdhcDogMjBweDtcclxuICBtYXJnaW4tYm90dG9tOiAzcmVtO1xyXG5cclxuICBpb24tY2FyZCB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW9uLWNhcmQtdGl0bGUge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBnYXA6IDEwcHg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xyXG5cclxuICAgICAgaW9uLWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5ob3ctaXQtd29ya3MsIC5mZWF0dXJlcyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogM3JlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gIGgyIHtcclxuICAgIGZvbnQtc2l6ZTogMS44cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgfVxyXG5cclxuICBpb24tY2FyZCB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gICAgLnN0ZXAtaWNvbiwgLmZlYXR1cmUtaWNvbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMi41cmVtO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgfVxyXG5cclxuICAgIGgzIHtcclxuICAgICAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgIH1cclxuXHJcbiAgICBwIHtcclxuICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC53ZWxjb21lLWNvbnRhaW5lciB7XHJcbiAgICBwYWRkaW5nOiAxNnB4O1xyXG5cclxuICAgIGgxIHtcclxuICAgICAgZm9udC1zaXplOiAxLjhyZW07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuaG93LWl0LXdvcmtzLCAuZmVhdHVyZXMge1xyXG4gICAgaDIge1xyXG4gICAgICBmb250LXNpemU6IDEuNnJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_welcome_welcome_page_ts.js.map