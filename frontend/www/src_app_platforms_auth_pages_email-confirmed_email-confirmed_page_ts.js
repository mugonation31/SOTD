"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_auth_pages_email-confirmed_email-confirmed_page_ts"],{

/***/ 8011:
/*!******************************************************************************!*\
  !*** ./src/app/platforms/auth/pages/email-confirmed/email-confirmed.page.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EmailConfirmedPage: () => (/* binding */ EmailConfirmedPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_supabase_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/supabase.service */ 9692);

var _EmailConfirmedPage;








class EmailConfirmedPage {
  constructor(router, supabaseService) {
    this.router = router;
    this.supabaseService = supabaseService;
    (0,ionicons__WEBPACK_IMPORTED_MODULE_3__.a)({
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.footballOutline,
      checkmarkCircle: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.checkmarkCircle,
      arrowBack: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.arrowBack,
      home: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.home,
      mail: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.mail
    });
  }
  ngOnInit() {
    this.handleEmailConfirmation();
  }
  handleEmailConfirmation() {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        console.log('📧 Handling email confirmation...');
        // Check if we have tokens in the URL fragment
        const url = new URL(window.location.href);
        const hashParams = new URLSearchParams(url.hash.slice(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        if (accessToken && refreshToken) {
          console.log('🔗 Found auth tokens in URL, processing session...');
          // Set the session using the tokens from the email confirmation
          const success = yield _this.supabaseService.handleDeepLinkSession(window.location.href);
          if (success) {
            console.log('✅ Email confirmation successful, session established');
            // The app will automatically navigate based on the user's role and first login status
            // through the routing guards and session restoration flow
          } else {
            console.error('❌ Failed to establish session from email confirmation');
          }
        } else {
          console.log('ℹ️ No auth tokens found in URL - user may need to login manually');
        }
      } catch (error) {
        console.error('❌ Error handling email confirmation:', error);
      }
    })();
  }
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
  goToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
_EmailConfirmedPage = EmailConfirmedPage;
_EmailConfirmedPage.ɵfac = function EmailConfirmedPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmailConfirmedPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_supabase_service__WEBPACK_IMPORTED_MODULE_2__.SupabaseService));
};
_EmailConfirmedPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _EmailConfirmedPage,
  selectors: [["app-email-confirmed"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
  decls: 28,
  vars: 0,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], [1, "ion-padding"], [1, "confirmation-container"], [1, "success-card"], [1, "success-content"], ["name", "checkmark-circle", 1, "success-icon"], [1, "action-buttons"], ["expand", "block", "fill", "solid", 3, "click"], ["name", "arrow-back", "slot", "start"], ["expand", "block", "fill", "outline", 3, "click"], ["name", "home", "slot", "start"]],
  template: function EmailConfirmedPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EmailConfirmedPage_Template_div_click_2_listener() {
        return ctx.goToWelcome();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "ion-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 2)(5, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "SOTD");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-content", 5)(10, "div", 6)(11, "ion-card", 7)(12, "ion-card-content")(13, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "ion-icon", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "Email Confirmed!");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Thank you for verifying your email address.");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "You can now return to the login page to sign in to your account.");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 10)(22, "ion-button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EmailConfirmedPage_Template_ion_button_click_22_listener() {
        return ctx.goToLogin();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](23, "ion-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24, " Return to Login ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "ion-button", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EmailConfirmedPage_Template_ion_button_click_25_listener() {
        return ctx.goToWelcome();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](26, "ion-icon", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, " Go to Home ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule],
  styles: [".confirmation-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 70vh;\n  padding: 20px;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  padding: 8px 16px;\n}\n.logo-container[_ngcontent-%COMP%]   .football-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--ion-color-primary);\n  margin-right: 12px;\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.1;\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-sotd[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--ion-color-primary);\n}\n.logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n}\n\n.success-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  margin: 0 0 30px 0;\n  border-radius: 16px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n}\n.success-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 40px 30px;\n}\n\n.success-content[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.success-content[_ngcontent-%COMP%]   .success-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  color: var(--ion-color-success);\n  margin-bottom: 20px;\n  display: block;\n}\n.success-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: var(--ion-color-primary);\n  margin: 0 0 16px 0;\n}\n.success-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--ion-color-dark);\n  line-height: 1.5;\n  margin: 0 0 12px 0;\n}\n.success-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.action-buttons[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.action-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  height: 48px;\n  font-weight: 600;\n  border-radius: 12px;\n}\n.action-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n@media (max-width: 576px) {\n  .confirmation-container[_ngcontent-%COMP%] {\n    min-height: 60vh;\n    padding: 16px;\n  }\n  .success-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n    padding: 30px 20px;\n  }\n  .success-content[_ngcontent-%COMP%]   .success-icon[_ngcontent-%COMP%] {\n    font-size: 56px;\n    margin-bottom: 16px;\n  }\n  .success-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n    margin-bottom: 12px;\n  }\n  .success-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtYWlsLWNvbmZpcm1lZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFDRjtBQUNFO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUVFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7QUFBSjtBQUVJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7QUFBTjtBQUdJO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsZ0JBQUE7QUFETjs7QUFNQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtBQUhGO0FBS0U7RUFDRSxrQkFBQTtBQUhKOztBQU9BO0VBQ0Usa0JBQUE7QUFKRjtBQU1FO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBSko7QUFPRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7QUFMSjtBQVFFO0VBQ0UsZUFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQU5KO0FBUUk7RUFDRSxnQkFBQTtBQU5OOztBQVdBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQVJGO0FBVUU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQVJKO0FBVUk7RUFDRSxlQUFBO0FBUk47O0FBY0E7RUFDRTtJQUNFLGdCQUFBO0lBQ0EsYUFBQTtFQVhGO0VBY0E7SUFDRSxrQkFBQTtFQVpGO0VBZ0JFO0lBQ0UsZUFBQTtJQUNBLG1CQUFBO0VBZEo7RUFpQkU7SUFDRSxlQUFBO0lBQ0EsbUJBQUE7RUFmSjtFQWtCRTtJQUNFLGVBQUE7RUFoQko7QUFDRiIsImZpbGUiOiJlbWFpbC1jb25maXJtZWQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbmZpcm1hdGlvbi1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogNzB2aDtcbiAgcGFkZGluZzogMjBweDtcbn1cblxuLmxvZ28tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiA4cHggMTZweDtcbiAgXG4gIC5mb290YmFsbC1pY29uIHtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gIH1cbiAgXG4gIC5sb2dvLXRleHQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBsaW5lLWhlaWdodDogMS4xO1xuICAgIFxuICAgIC5sb2dvLXNvdGQge1xuICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuICAgIFxuICAgIC5sb2dvLXN1YnRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuICB9XG59XG5cbi5zdWNjZXNzLWNhcmQge1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiA0MDBweDtcbiAgbWFyZ2luOiAwIDAgMzBweCAwO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDhweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDQwcHggMzBweDtcbiAgfVxufVxuXG4uc3VjY2Vzcy1jb250ZW50IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBcbiAgLnN1Y2Nlc3MtaWNvbiB7XG4gICAgZm9udC1zaXplOiA2NHB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICBcbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgbWFyZ2luOiAwIDAgMTZweCAwO1xuICB9XG4gIFxuICBwIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIG1hcmdpbjogMCAwIDEycHggMDtcbiAgICBcbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG4gIH1cbn1cblxuLmFjdGlvbi1idXR0b25zIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogNDAwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTJweDtcbiAgXG4gIGlvbi1idXR0b24ge1xuICAgIGhlaWdodDogNDhweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyBSZXNwb25zaXZlIGFkanVzdG1lbnRzXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgLmNvbmZpcm1hdGlvbi1jb250YWluZXIge1xuICAgIG1pbi1oZWlnaHQ6IDYwdmg7XG4gICAgcGFkZGluZzogMTZweDtcbiAgfVxuICBcbiAgLnN1Y2Nlc3MtY2FyZCBpb24tY2FyZC1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAzMHB4IDIwcHg7XG4gIH1cbiAgXG4gIC5zdWNjZXNzLWNvbnRlbnQge1xuICAgIC5zdWNjZXNzLWljb24ge1xuICAgICAgZm9udC1zaXplOiA1NnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICB9XG4gICAgXG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICB9XG4gICAgXG4gICAgcCB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICB9XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2F1dGgvcGFnZXMvZW1haWwtY29uZmlybWVkL2VtYWlsLWNvbmZpcm1lZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFDRjtBQUNFO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUVFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7QUFBSjtBQUVJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7QUFBTjtBQUdJO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsZ0JBQUE7QUFETjs7QUFNQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtBQUhGO0FBS0U7RUFDRSxrQkFBQTtBQUhKOztBQU9BO0VBQ0Usa0JBQUE7QUFKRjtBQU1FO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBSko7QUFPRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7QUFMSjtBQVFFO0VBQ0UsZUFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQU5KO0FBUUk7RUFDRSxnQkFBQTtBQU5OOztBQVdBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQVJGO0FBVUU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQVJKO0FBVUk7RUFDRSxlQUFBO0FBUk47O0FBY0E7RUFDRTtJQUNFLGdCQUFBO0lBQ0EsYUFBQTtFQVhGO0VBY0E7SUFDRSxrQkFBQTtFQVpGO0VBZ0JFO0lBQ0UsZUFBQTtJQUNBLG1CQUFBO0VBZEo7RUFpQkU7SUFDRSxlQUFBO0lBQ0EsbUJBQUE7RUFmSjtFQWtCRTtJQUNFLGVBQUE7RUFoQko7QUFDRjtBQUNBLG9uSUFBb25JIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbmZpcm1hdGlvbi1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogNzB2aDtcbiAgcGFkZGluZzogMjBweDtcbn1cblxuLmxvZ28tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiA4cHggMTZweDtcbiAgXG4gIC5mb290YmFsbC1pY29uIHtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gIH1cbiAgXG4gIC5sb2dvLXRleHQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBsaW5lLWhlaWdodDogMS4xO1xuICAgIFxuICAgIC5sb2dvLXNvdGQge1xuICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuICAgIFxuICAgIC5sb2dvLXN1YnRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuICB9XG59XG5cbi5zdWNjZXNzLWNhcmQge1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiA0MDBweDtcbiAgbWFyZ2luOiAwIDAgMzBweCAwO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDhweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDQwcHggMzBweDtcbiAgfVxufVxuXG4uc3VjY2Vzcy1jb250ZW50IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBcbiAgLnN1Y2Nlc3MtaWNvbiB7XG4gICAgZm9udC1zaXplOiA2NHB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICBcbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgbWFyZ2luOiAwIDAgMTZweCAwO1xuICB9XG4gIFxuICBwIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIG1hcmdpbjogMCAwIDEycHggMDtcbiAgICBcbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG4gIH1cbn1cblxuLmFjdGlvbi1idXR0b25zIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogNDAwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTJweDtcbiAgXG4gIGlvbi1idXR0b24ge1xuICAgIGhlaWdodDogNDhweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyBSZXNwb25zaXZlIGFkanVzdG1lbnRzXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgLmNvbmZpcm1hdGlvbi1jb250YWluZXIge1xuICAgIG1pbi1oZWlnaHQ6IDYwdmg7XG4gICAgcGFkZGluZzogMTZweDtcbiAgfVxuICBcbiAgLnN1Y2Nlc3MtY2FyZCBpb24tY2FyZC1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAzMHB4IDIwcHg7XG4gIH1cbiAgXG4gIC5zdWNjZXNzLWNvbnRlbnQge1xuICAgIC5zdWNjZXNzLWljb24ge1xuICAgICAgZm9udC1zaXplOiA1NnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICB9XG4gICAgXG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICB9XG4gICAgXG4gICAgcCB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_auth_pages_email-confirmed_email-confirmed_page_ts.js.map