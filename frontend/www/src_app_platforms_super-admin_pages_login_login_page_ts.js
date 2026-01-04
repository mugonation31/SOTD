"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_super-admin_pages_login_login_page_ts"],{

/***/ 6394:
/*!*****************************************************************!*\
  !*** ./src/app/platforms/super-admin/pages/login/login.page.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuperAdminLoginPage: () => (/* binding */ SuperAdminLoginPage)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/services/auth.service */ 8010);
var _SuperAdminLoginPage;









const _c0 = () => ["/super-admin/register"];
function SuperAdminLoginPage_ion_note_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-note", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Email is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SuperAdminLoginPage_ion_note_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-note", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Password is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class SuperAdminLoginPage {
  constructor(fb, authService, router) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.isLoading = false;
    this.loginForm = this.fb.group({
      email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.email]],
      password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]]
    });
  }
  ngOnInit() {}
  onSubmit() {
    if (this.loginForm.valid) {
      var _this$loginForm$get, _this$loginForm$get2;
      this.isLoading = true;
      // Get form values
      const loginData = {
        email: (_this$loginForm$get = this.loginForm.get('email')) === null || _this$loginForm$get === void 0 ? void 0 : _this$loginForm$get.value,
        password: (_this$loginForm$get2 = this.loginForm.get('password')) === null || _this$loginForm$get2 === void 0 ? void 0 : _this$loginForm$get2.value,
        securityQuestion: '',
        // No longer needed but kept for compatibility
        securityAnswer: '' // No longer needed but kept for compatibility
      };
      // For super-admin login, we need to set up the proper role first
      // Store the super-admin role so the AuthService can pick it up
      localStorage.setItem(`pendingRole_${loginData.email}`, 'super-admin');
      localStorage.setItem(`pendingUsername_${loginData.email}`, 'SuperAdmin');
      localStorage.setItem(`pendingFirstName_${loginData.email}`, 'Super');
      localStorage.setItem(`pendingLastName_${loginData.email}`, 'Admin');
      // Use the centralized AuthService for login
      this.authService.login(loginData).subscribe({
        next: response => {
          // Navigate to super-admin dashboard
          this.router.navigate(['/super-admin/dashboard']);
          this.isLoading = false;
        },
        error: error => {
          var _error$error;
          console.error('Super admin login failed:', error);
          this.isLoading = false;
          // Provide user feedback instead of just console logging
          const errorMessage = (error === null || error === void 0 || (_error$error = error.error) === null || _error$error === void 0 ? void 0 : _error$error.message) || (error === null || error === void 0 ? void 0 : error.message) || 'Login failed. Please check your credentials and try again.';
          alert(errorMessage);
        }
      });
    }
  }
}
_SuperAdminLoginPage = SuperAdminLoginPage;
_SuperAdminLoginPage.ɵfac = function SuperAdminLoginPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SuperAdminLoginPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
};
_SuperAdminLoginPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _SuperAdminLoginPage,
  selectors: [["app-super-admin-login"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
  decls: 29,
  vars: 11,
  consts: [[1, "ion-padding"], [1, "auth-card"], [1, "auth-header"], [3, "ngSubmit", "formGroup"], [1, "auth-form"], ["type", "email", "formControlName", "email", "placeholder", "Email"], ["slot", "error", 4, "ngIf"], ["type", "password", "formControlName", "password", "placeholder", "Password"], [1, "auth-actions"], ["expand", "block", "type", "submit", 3, "disabled"], [1, "auth-footer"], [1, "auth-link"], ["color", "medium"], [3, "routerLink"], ["slot", "error"]],
  template: function SuperAdminLoginPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Super Admin Login");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ion-content", 0)(5, "ion-card", 1)(6, "ion-card-content")(7, "div", 2)(8, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Super Admin Access");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Login to manage the system");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "form", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function SuperAdminLoginPage_Template_form_ngSubmit_12_listener() {
        return ctx.onSubmit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "ion-list", 4)(14, "ion-item");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "ion-input", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, SuperAdminLoginPage_ion_note_16_Template, 2, 0, "ion-note", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "ion-item");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "ion-input", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, SuperAdminLoginPage_ion_note_19_Template, 2, 0, "ion-note", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 8)(21, "ion-button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 10)(24, "div", 11)(25, "ion-text", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, " Need to register as Super Admin? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "a", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "Register");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.loginForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("ion-invalid", ((tmp_1_0 = ctx.loginForm.get("email")) == null ? null : tmp_1_0.touched) && ((tmp_1_0 = ctx.loginForm.get("email")) == null ? null : tmp_1_0.errors));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ((tmp_2_0 = ctx.loginForm.get("email")) == null ? null : tmp_2_0.touched) && ((tmp_2_0 = ctx.loginForm.get("email")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("ion-invalid", ((tmp_3_0 = ctx.loginForm.get("password")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx.loginForm.get("password")) == null ? null : tmp_3_0.errors));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ((tmp_4_0 = ctx.loginForm.get("password")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx.loginForm.get("password")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["required"]));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.loginForm.invalid || ctx.isLoading);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.isLoading ? "Logging in..." : "Login", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](10, _c0));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonText, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonNote],
  styles: ["[_nghost-%COMP%]   ion-content[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n[_nghost-%COMP%]   .auth-card[_ngcontent-%COMP%] {\n  max-width: 500px;\n  margin: 2rem auto;\n  border-radius: 16px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n[_nghost-%COMP%]   .auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n[_nghost-%COMP%]   .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n  color: var(--ion-color-dark);\n}\n[_nghost-%COMP%]   .auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  margin: 0;\n}\n[_nghost-%COMP%]   .auth-form[_ngcontent-%COMP%] {\n  background: transparent;\n  margin-bottom: 1.5rem;\n}\n[_nghost-%COMP%]   .auth-form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --border-color: rgba(0, 0, 0, 0.1);\n  --border-width: 1px;\n  --border-style: solid;\n  --border-radius: 4px;\n  --padding-start: 12px;\n  margin-bottom: 1rem;\n}\n[_nghost-%COMP%]   .auth-form[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  font-size: 1rem;\n}\n[_nghost-%COMP%]   .auth-actions[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n[_nghost-%COMP%]   .auth-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  margin: 0;\n  height: 48px;\n  --border-radius: 4px;\n  font-weight: 600;\n}\n[_nghost-%COMP%]   .auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n}\n[_nghost-%COMP%]   .auth-footer[_ngcontent-%COMP%]   .auth-link[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n[_nghost-%COMP%]   .auth-footer[_ngcontent-%COMP%]   .auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  text-decoration: none;\n  font-weight: 500;\n  margin-left: 0.5rem;\n}\n[_nghost-%COMP%]   .auth-footer[_ngcontent-%COMP%]   .auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLG9DQUFBO0FBQUo7QUFHRTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHlDQUFBO0FBREo7QUFJRTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7QUFGSjtBQUlJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsNEJBQUE7QUFGTjtBQUtJO0VBQ0UsOEJBQUE7RUFDQSxTQUFBO0FBSE47QUFPRTtFQUNFLHVCQUFBO0VBQ0EscUJBQUE7QUFMSjtBQU9JO0VBQ0UseUJBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7QUFMTjtBQVFJO0VBQ0Usb0JBQUE7RUFDQSxlQUFBO0FBTk47QUFVRTtFQUNFLHFCQUFBO0FBUko7QUFVSTtFQUNFLFNBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQVJOO0FBWUU7RUFDRSxrQkFBQTtBQVZKO0FBWUk7RUFDRSxnQkFBQTtBQVZOO0FBWU07RUFDRSwrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQVZSO0FBWVE7RUFDRSwwQkFBQTtBQVZWIiwiZmlsZSI6ImxvZ2luLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBpb24tY29udGVudCB7XHJcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgfVxyXG5cclxuICAuYXV0aC1jYXJkIHtcclxuICAgIG1heC13aWR0aDogNTAwcHg7XHJcbiAgICBtYXJnaW46IDJyZW0gYXV0bztcclxuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICB9XHJcblxyXG4gIC5hdXRoLWhlYWRlciB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG5cclxuICAgIGgxIHtcclxuICAgICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgIH1cclxuXHJcbiAgICBwIHtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYXV0aC1mb3JtIHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xyXG5cclxuICAgIGlvbi1pdGVtIHtcclxuICAgICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgICAgLS1ib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgICAgLS1ib3JkZXItd2lkdGg6IDFweDtcclxuICAgICAgLS1ib3JkZXItc3R5bGU6IHNvbGlkO1xyXG4gICAgICAtLWJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAxMnB4O1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgfVxyXG5cclxuICAgIGlvbi1pbnB1dCB7XHJcbiAgICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xyXG4gICAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYXV0aC1hY3Rpb25zIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcclxuXHJcbiAgICBpb24tYnV0dG9uIHtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBoZWlnaHQ6IDQ4cHg7XHJcbiAgICAgIC0tYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmF1dGgtZm9vdGVyIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgICAuYXV0aC1saW5rIHtcclxuICAgICAgbWFyZ2luLXRvcDogMXJlbTtcclxuXHJcbiAgICAgIGEge1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcclxuXHJcbiAgICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3N1cGVyLWFkbWluL3BhZ2VzL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLG9DQUFBO0FBQUo7QUFHRTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHlDQUFBO0FBREo7QUFJRTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7QUFGSjtBQUlJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsNEJBQUE7QUFGTjtBQUtJO0VBQ0UsOEJBQUE7RUFDQSxTQUFBO0FBSE47QUFPRTtFQUNFLHVCQUFBO0VBQ0EscUJBQUE7QUFMSjtBQU9JO0VBQ0UseUJBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7QUFMTjtBQVFJO0VBQ0Usb0JBQUE7RUFDQSxlQUFBO0FBTk47QUFVRTtFQUNFLHFCQUFBO0FBUko7QUFVSTtFQUNFLFNBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQVJOO0FBWUU7RUFDRSxrQkFBQTtBQVZKO0FBWUk7RUFDRSxnQkFBQTtBQVZOO0FBWU07RUFDRSwrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQVZSO0FBWVE7RUFDRSwwQkFBQTtBQVZWO0FBQ0EsbzhGQUFvOEYiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIH1cclxuXHJcbiAgLmF1dGgtY2FyZCB7XHJcbiAgICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gICAgbWFyZ2luOiAycmVtIGF1dG87XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgfVxyXG5cclxuICAuYXV0aC1oZWFkZXIge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxuXHJcbiAgICBoMSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICB9XHJcblxyXG4gICAgcCB7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmF1dGgtZm9ybSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcclxuXHJcbiAgICBpb24taXRlbSB7XHJcbiAgICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgICAgIC0tYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICAgIC0tYm9yZGVyLXdpZHRoOiAxcHg7XHJcbiAgICAgIC0tYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgICAgLS1ib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgIC0tcGFkZGluZy1zdGFydDogMTJweDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIH1cclxuXHJcbiAgICBpb24taW5wdXQge1xyXG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcclxuICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmF1dGgtYWN0aW9ucyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XHJcblxyXG4gICAgaW9uLWJ1dHRvbiB7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgICAtLWJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5hdXRoLWZvb3RlciB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gICAgLmF1dGgtbGluayB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDFyZW07XHJcblxyXG4gICAgICBhIHtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwLjVyZW07XHJcblxyXG4gICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_super-admin_pages_login_login_page_ts.js.map