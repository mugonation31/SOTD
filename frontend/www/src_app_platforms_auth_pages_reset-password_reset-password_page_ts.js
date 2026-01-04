"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_auth_pages_reset-password_reset-password_page_ts"],{

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

/***/ 6803:
/*!****************************************************************************!*\
  !*** ./src/app/platforms/auth/pages/reset-password/reset-password.page.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResetPasswordPage: () => (/* binding */ ResetPasswordPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _core_utils_validation_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/utils/validation.utils */ 9620);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../core/services/toast.service */ 5423);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 5072);

var _ResetPasswordPage;











function ResetPasswordPage_ion_note_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-note", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.validationErrors.password, " ");
  }
}
function ResetPasswordPage_ion_note_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-note", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.validationErrors.confirmPassword, " ");
  }
}
function ResetPasswordPage_span_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Reset Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function ResetPasswordPage_span_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Resetting...");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
class ResetPasswordPage {
  get canSubmit() {
    return Boolean(this.resetData.password && this.resetData.confirmPassword && !this.validationErrors.password && !this.validationErrors.confirmPassword && this.accessToken);
  }
  constructor(authService, toastService, router, route) {
    this.authService = authService;
    this.toastService = toastService;
    this.router = router;
    this.route = route;
    this.resetData = {
      password: '',
      confirmPassword: ''
    };
    this.validationErrors = {
      password: '',
      confirmPassword: ''
    };
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.isLoading = false;
    this.accessToken = '';
    this.refreshToken = '';
    (0,ionicons__WEBPACK_IMPORTED_MODULE_6__.a)({
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.footballOutline,
      eye: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.eye,
      eyeOff: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.eyeOff
    });
  }
  ngOnInit() {
    // Clear any old test tokens
    localStorage.removeItem('test_reset_token');
    // Log the full URL for debugging
    // Extract access token from URL query parameters
    this.route.queryParams.subscribe(params => {
      if (!this.accessToken) {
        this.accessToken = params['code'] || params['access_token'] || params['token'] || params['reset_token'] || '';
        if (this.accessToken) {
          // Store token in localStorage for service access
          localStorage.setItem('current_reset_token', this.accessToken);
          this.validationErrors.password = '';
        } else {
          console.error('❌ ResetPasswordPage: No access token found in query params');
          this.validationErrors.password = 'Invalid reset link. Please request a new password reset.';
        }
      }
    });
    // Also check for token in URL hash fragment (Supabase sometimes sends it there)
    this.checkHashFragment();
    // Also check if token might be in the URL path itself
    this.checkUrlPathForToken();
    // Also check the raw URL for any token-like strings
    this.checkRawUrlForToken();
    // Also log the current route for debugging
    // Check if Supabase has auto-detected the session from URL fragment
    this.checkSupabaseSession();
  }
  checkSupabaseSession() {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const success = yield _this.authService.setSessionFromFragment();
        if (success) {} else {
          console.error('❌ Failed to establish Supabase session');
        }
      } catch (err) {
        console.error('❌ Error setting Supabase session:', err);
      }
    })();
  }
  checkUrlPathForToken() {
    // Sometimes Supabase puts the token in the URL path
    const pathSegments = this.router.url.split('/');
    // Look for segments that might be tokens (long strings)
    for (const segment of pathSegments) {
      if (segment.length > 50 && !this.accessToken) {
        this.accessToken = segment;
        // Store token in localStorage for service access
        localStorage.setItem('current_reset_token', segment);
        this.validationErrors.password = ''; // Clear any previous error
        break;
      }
    }
  }
  checkRawUrlForToken() {
    // Check the raw URL for any token-like patterns
    const fullUrl = window.location.href;
    // Look for common token patterns in the URL
    const tokenPatterns = [/[?&]token=([^&]+)/, /[?&]access_token=([^&]+)/, /[?&]code=([^&]+)/, /[?&]reset_token=([^&]+)/, /#access_token=([^&]+)/, /#token=([^&]+)/];
    for (const pattern of tokenPatterns) {
      const match = fullUrl.match(pattern);
      if (match && match[1] && !this.accessToken) {
        this.accessToken = decodeURIComponent(match[1]);
        // Store token in localStorage for service access
        localStorage.setItem('current_reset_token', decodeURIComponent(match[1]));
        this.validationErrors.password = '';
        break;
      }
    }
  }
  // TEMPORARY: For testing purposes
  // Remove this method in production
  setTestToken(token) {
    localStorage.setItem('test_reset_token', token);
    this.accessToken = token;
    this.validationErrors.password = '';
  }
  checkHashFragment() {
    // Check if there's a hash fragment with the access token
    const hash = window.location.hash;
    if (hash) {
      // Parse the hash fragment for access_token
      const hashParams = new URLSearchParams(hash.substring(1)); // Remove the # and parse
      const hashToken = hashParams.get('access_token');
      if (hashToken) {
        this.accessToken = hashToken;
        // Store token in localStorage for service access
        localStorage.setItem('current_reset_token', hashToken);
        // Also extract refresh token if present
        const refreshToken = hashParams.get('refresh_token');
        if (refreshToken) {
          this.refreshToken = refreshToken;
        }
        this.validationErrors.password = ''; // Clear any previous error
        return; // Exit early if we found the access token
      }
      // Also check for other possible token parameter names in hash
      const possibleTokens = ['code', 'token', 'reset_token', 'auth_token'];
      for (const param of possibleTokens) {
        const token = hashParams.get(param);
        if (token) {
          this.accessToken = token;
          // Store token in localStorage for service access
          localStorage.setItem('current_reset_token', token);
          this.validationErrors.password = ''; // Clear any previous error
          return;
        }
      }
    } else {}
  }
  validatePassword() {
    if (!this.resetData.password) {
      this.validationErrors.password = 'Password is required';
    } else if (!(0,_core_utils_validation_utils__WEBPACK_IMPORTED_MODULE_2__.validatePassword)(this.resetData.password)) {
      const errors = (0,_core_utils_validation_utils__WEBPACK_IMPORTED_MODULE_2__.getPasswordErrors)(this.resetData.password);
      this.validationErrors.password = errors.join(', ');
    } else {
      this.validationErrors.password = '';
    }
  }
  validateConfirmPassword() {
    if (!this.resetData.confirmPassword) {
      this.validationErrors.confirmPassword = 'Please confirm your password';
    } else if (this.resetData.password !== this.resetData.confirmPassword) {
      this.validationErrors.confirmPassword = 'Passwords do not match';
    } else {
      this.validationErrors.confirmPassword = '';
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  onSubmit() {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.validatePassword();
      _this2.validateConfirmPassword();
      if (!_this2.canSubmit || _this2.isLoading) {
        return;
      }
      _this2.isLoading = true;
      // Enable Supabase auth for password reset
      _this2.authService.enableSupabaseAuth();
      try {
        // Call AuthService.updatePasswordWithTokens with the new password
        const success = yield _this2.authService.updatePasswordWithTokens(_this2.resetData.password);
        if (success) {
          // Clean up stored token
          localStorage.removeItem('current_reset_token');
          // Show success message
          yield _this2.toastService.showToast('Password reset successful! You can now log in with your new password.', 'success');
          // Redirect to login page
          _this2.router.navigate(['/auth/login']);
        } else {
          throw new Error('Password update failed');
        }
      } catch (error) {
        console.error('Password reset error:', error);
        // Clean up stored token on error
        localStorage.removeItem('current_reset_token');
        // Show error message
        const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || 'Failed to reset password. Please try again.';
        yield _this2.toastService.showToast(errorMessage, 'error');
        // Set validation error for user feedback
        _this2.validationErrors.password = errorMessage;
      } finally {
        // Stop loading regardless of success or failure
        _this2.isLoading = false;
      }
    })();
  }
  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
_ResetPasswordPage = ResetPasswordPage;
_ResetPasswordPage.ɵfac = function ResetPasswordPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ResetPasswordPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_toast_service__WEBPACK_IMPORTED_MODULE_4__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute));
};
_ResetPasswordPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _ResetPasswordPage,
  selectors: [["app-reset-password"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
  decls: 33,
  vars: 15,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], [1, "ion-padding"], [1, "auth-card"], [1, "auth-header"], [3, "ngSubmit"], [1, "auth-form"], ["placeholder", "New Password", "name", "password", "required", "", 3, "ngModelChange", "ngModel", "type"], ["fill", "clear", "slot", "end", 3, "click"], [3, "name"], ["slot", "error", 4, "ngIf"], ["placeholder", "Confirm New Password", "name", "confirmPassword", "required", "", 3, "ngModelChange", "ngModel", "type"], [1, "auth-actions"], ["expand", "block", "type", "submit", 3, "disabled"], [4, "ngIf"], ["slot", "error"]],
  template: function ResetPasswordPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ResetPasswordPage_Template_div_click_2_listener() {
        return ctx.navigateToWelcome();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 2)(5, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "SOTD");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content", 5)(10, "ion-card", 6)(11, "ion-card-content")(12, "div", 7)(13, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, "Reset Password");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16, "Enter your new password");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "form", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngSubmit", function ResetPasswordPage_Template_form_ngSubmit_17_listener() {
        return ctx.onSubmit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "ion-list", 9)(19, "ion-item")(20, "ion-input", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function ResetPasswordPage_Template_ion_input_ngModelChange_20_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.resetData.password, $event) || (ctx.resetData.password = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function ResetPasswordPage_Template_ion_input_ngModelChange_20_listener() {
        return ctx.validatePassword();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "ion-button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ResetPasswordPage_Template_ion_button_click_21_listener() {
        return ctx.togglePasswordVisibility();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](22, "ion-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](23, ResetPasswordPage_ion_note_23_Template, 2, 1, "ion-note", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "ion-item")(25, "ion-input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function ResetPasswordPage_Template_ion_input_ngModelChange_25_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.resetData.confirmPassword, $event) || (ctx.resetData.confirmPassword = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function ResetPasswordPage_Template_ion_input_ngModelChange_25_listener() {
        return ctx.validateConfirmPassword();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "ion-button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ResetPasswordPage_Template_ion_button_click_26_listener() {
        return ctx.toggleConfirmPasswordVisibility();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](27, "ion-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](28, ResetPasswordPage_ion_note_28_Template, 2, 1, "ion-note", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "div", 15)(30, "ion-button", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, ResetPasswordPage_span_31_Template, 2, 0, "span", 17)(32, ResetPasswordPage_span_32_Template, 2, 0, "span", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](20);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("ion-invalid", ctx.validationErrors.password);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.resetData.password);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("type", ctx.showPassword ? "text" : "password");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", ctx.showPassword ? "eye-off" : "eye");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.validationErrors.password);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("ion-invalid", ctx.validationErrors.confirmPassword);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.resetData.confirmPassword);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("type", ctx.showConfirmPassword ? "text" : "password");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", ctx.showConfirmPassword ? "eye-off" : "eye");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.validationErrors.confirmPassword);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx.canSubmit || ctx.isLoading);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.isLoading);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isLoading);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_8__.IonNote, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgForm, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf],
  styles: [".login-container[_ngcontent-%COMP%], \n.signup-container[_ngcontent-%COMP%], \n.forgot-password-container[_ngcontent-%COMP%], \n.otp-container[_ngcontent-%COMP%] {\n  max-width: 400px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: var(--ion-color-dark);\n  margin-bottom: 8px;\n  text-align: center;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  text-align: center;\n  margin-bottom: 24px;\n}\n\nion-card[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-radius: 16px;\n}\nion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --inner-padding-end: 0;\n  --background: transparent;\n  --border-color: var(--ion-color-light);\n  margin-bottom: 16px;\n}\n\nion-button[expand=block][_ngcontent-%COMP%] {\n  margin-top: 24px;\n  margin-bottom: 24px;\n  --border-radius: 8px;\n  height: 48px;\n  font-weight: 600;\n}\n\n.social-signup[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.social-signup[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  position: relative;\n  margin: 24px 0;\n}\n.social-signup[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]::before, .social-signup[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  width: 25%;\n  height: 1px;\n  background-color: var(--ion-color-light);\n}\n.social-signup[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]::before {\n  left: 0;\n}\n.social-signup[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]::after {\n  right: 0;\n}\n\n.social-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.social-buttons[_ngcontent-%COMP%]   .social-button[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --padding-end: 0;\n  width: 48px;\n  height: 48px;\n}\n.social-buttons[_ngcontent-%COMP%]   .social-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n\n.login-link[_ngcontent-%COMP%], \n.signup-link[_ngcontent-%COMP%], \n.forgot-password[_ngcontent-%COMP%], \n.resend-link[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--ion-color-medium);\n}\n.login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.signup-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.resend-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  text-decoration: none;\n  font-weight: 500;\n  cursor: pointer;\n}\n.login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \n.signup-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \n.forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \n.resend-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.forgot-password[_ngcontent-%COMP%] {\n  text-align: right;\n  margin-top: -8px;\n  margin-bottom: 16px;\n}\n.forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  text-decoration: none;\n  font-weight: 500;\n  font-size: 0.9rem;\n  padding: 8px 0;\n  display: inline-block;\n}\n.forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n  opacity: 0.8;\n}\n\n@media (max-width: 480px) {\n  .login-container[_ngcontent-%COMP%], \n   .signup-container[_ngcontent-%COMP%], \n   .forgot-password-container[_ngcontent-%COMP%], \n   .otp-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .title[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n  }\n}\nion-toolbar[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --padding-end: 0;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n}\n\n.football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.logo-sotd[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n\n.logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n  line-height: 1;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  max-width: 400px;\n  margin: 0 auto;\n  box-shadow: none;\n  background: transparent;\n}\n\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  margin-bottom: 8px;\n  color: var(--ion-color-dark);\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  margin: 0;\n}\n\n.auth-form[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  padding: 0.5rem;\n}\n.auth-form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: white;\n  --border-color: transparent;\n  --border-radius: 8px;\n  --highlight-height: 0;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  --inner-padding-end: 8px;\n  height: 48px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  margin: 0 4px 16px 4px;\n}\n.auth-form[_ngcontent-%COMP%]   ion-item.ion-invalid[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n.auth-form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.auth-form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --background: transparent;\n  --color: var(--ion-color-dark);\n  --placeholder-color: var(--ion-color-medium);\n}\n.auth-form[_ngcontent-%COMP%]   ion-note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 4px 8px;\n}\n\n.auth-actions[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n}\n.auth-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.auth-footer[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  margin: 2.5rem 0;\n  text-align: center;\n  gap: 1rem;\n}\n.auth-footer[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]::before, .auth-footer[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]::after {\n  content: \"\";\n  flex: 1;\n  height: 1px;\n  background: var(--ion-color-light-shade);\n}\n.auth-footer[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  white-space: nowrap;\n}\n.auth-footer[_ngcontent-%COMP%]   .social-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.auth-footer[_ngcontent-%COMP%]   .social-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --padding-end: 0;\n  width: 40px;\n  height: 40px;\n  --border-radius: 50%;\n  --background: var(--ion-color-light);\n}\n.auth-footer[_ngcontent-%COMP%]   .social-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.auth-footer[_ngcontent-%COMP%]   .auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  text-decoration: none;\n  font-weight: 500;\n  margin-left: 4px;\n}\n\n@media (max-width: 576px) {\n  .auth-card[_ngcontent-%COMP%] {\n    box-shadow: none;\n    background: transparent;\n    margin: 0;\n    padding: 0;\n  }\n  ion-content[_ngcontent-%COMP%] {\n    --padding-start: 16px;\n    --padding-end: 16px;\n  }\n}\nion-toolbar[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --padding-end: 0;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  cursor: pointer;\n  transition: opacity 0.2s ease;\n}\n.logo-container[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n\n.football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.logo-sotd[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n\n.logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n  line-height: 1;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  max-width: 400px;\n  margin: 0 auto;\n  box-shadow: none;\n  background: transparent;\n}\n\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  margin-bottom: 8px;\n  color: var(--ion-color-dark);\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  margin: 0;\n}\n\n.auth-form[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  padding: 0.5rem;\n}\n.auth-form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: white;\n  --border-color: transparent;\n  --border-radius: 8px;\n  --highlight-height: 0;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  --inner-padding-end: 8px;\n  height: 48px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  margin: 0 4px 16px 4px;\n}\n.auth-form[_ngcontent-%COMP%]   ion-item.ion-invalid[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n.auth-form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.auth-form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --background: transparent;\n  --color: var(--ion-color-dark);\n  --placeholder-color: var(--ion-color-medium);\n}\n.auth-form[_ngcontent-%COMP%]   ion-note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 4px 8px;\n}\n\n.auth-actions[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n}\n.auth-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n@media (max-width: 576px) {\n  .auth-card[_ngcontent-%COMP%] {\n    box-shadow: none;\n    background: transparent;\n    margin: 0;\n    padding: 0;\n  }\n  ion-content[_ngcontent-%COMP%] {\n    --padding-start: 16px;\n    --padding-end: 16px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3N0eWxlcy9hdXRoLnNoYXJlZC5zY3NzIiwicmVzZXQtcGFzc3dvcmQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0VBSUUsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUNDRjs7QURFQTtFQUNFLHlDQUFBO0VBQ0EsbUJBQUE7QUNDRjtBRENFO0VBQ0UsYUFBQTtBQ0NKOztBREdBO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0Esc0NBQUE7RUFDQSxtQkFBQTtBQ0FGOztBREdBO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDQUY7O0FER0E7RUFDRSxrQkFBQTtBQ0FGO0FERUU7RUFDRSw4QkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQ0FKO0FERUk7RUFFRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSx3Q0FBQTtBQ0ROO0FESUk7RUFDRSxPQUFBO0FDRk47QURLSTtFQUNFLFFBQUE7QUNITjs7QURRQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQ0xGO0FET0U7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNMSjtBRE9JO0VBQ0UsZUFBQTtBQ0xOOztBRFVBOzs7O0VBSUUsa0JBQUE7RUFDQSw4QkFBQTtBQ1BGO0FEU0U7Ozs7RUFDRSwrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FDSko7QURNSTs7OztFQUNFLDBCQUFBO0FDRE47O0FETUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7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QTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtBQWtTSjtBQS9SRTtFQUNFLDhCQUFBO0VBQ0EsU0FBQTtBQWlTSjs7QUE3UkE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBZ1NGO0FBOVJFO0VBQ0UsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLG9CQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0JBQUE7RUFDQSxZQUFBO0VBQ0EseUNBQUE7RUFDQSxzQkFBQTtBQWdTSjtBQTlSSTtFQUNFLG9DQUFBO0FBZ1NOO0FBN1JJO0VBQ0UsZ0JBQUE7QUErUk47QUE1Ukk7RUFDRSxvQkFBQTtFQUNBLHlCQUFBO0VBQ0EsOEJBQUE7RUFDQSw0Q0FBQTtBQThSTjtBQTFSRTtFQUNFLGVBQUE7RUFDQSxlQUFBO0FBNFJKOztBQXhSQTtFQUNFLGdCQUFBO0FBMlJGO0FBelJFO0VBQ0UsU0FBQTtBQTJSSjs7QUF0UkE7RUFDRTtJQUNFLGdCQUFBO0lBQ0EsdUJBQUE7SUFDQSxTQUFBO0lBQ0EsVUFBQTtFQXlSRjtFQXRSQTtJQUNFLHFCQUFBO0lBQ0EsbUJBQUE7RUF3UkY7QUFDRiIsImZpbGUiOiJyZXNldC1wYXNzd29yZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9naW4tY29udGFpbmVyLFxuLnNpZ251cC1jb250YWluZXIsXG4uZm9yZ290LXBhc3N3b3JkLWNvbnRhaW5lcixcbi5vdHAtY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiA0MDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHBhZGRpbmc6IDIwcHg7XG59XG5cbi50aXRsZSB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zdWJ0aXRsZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xufVxuXG5pb24tY2FyZCB7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDI0cHg7XG4gIH1cbn1cblxuaW9uLWl0ZW0ge1xuICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gIC0taW5uZXItcGFkZGluZy1lbmQ6IDA7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIC0tYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuXG5pb24tYnV0dG9uW2V4cGFuZD1cImJsb2NrXCJdIHtcbiAgbWFyZ2luLXRvcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgLS1ib3JkZXItcmFkaXVzOiA4cHg7XG4gIGhlaWdodDogNDhweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnNvY2lhbC1zaWdudXAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgLmRpdmlkZXIge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luOiAyNHB4IDA7XG5cbiAgICAmOjpiZWZvcmUsXG4gICAgJjo6YWZ0ZXIge1xuICAgICAgY29udGVudDogXCJcIjtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgd2lkdGg6IDI1JTtcbiAgICAgIGhlaWdodDogMXB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICB9XG5cbiAgICAmOjpiZWZvcmUge1xuICAgICAgbGVmdDogMDtcbiAgICB9XG5cbiAgICAmOjphZnRlciB7XG4gICAgICByaWdodDogMDtcbiAgICB9XG4gIH1cbn1cblxuLnNvY2lhbC1idXR0b25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcblxuICAuc29jaWFsLWJ1dHRvbiB7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgIC0tcGFkZGluZy1lbmQ6IDA7XG4gICAgd2lkdGg6IDQ4cHg7XG4gICAgaGVpZ2h0OiA0OHB4O1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgIH1cbiAgfVxufVxuXG4ubG9naW4tbGluayxcbi5zaWdudXAtbGluayxcbi5mb3Jnb3QtcGFzc3dvcmQsXG4ucmVzZW5kLWxpbmsge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcblxuICBhIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICY6aG92ZXIge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICB9XG59XG5cbi5mb3Jnb3QtcGFzc3dvcmQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgbWFyZ2luLXRvcDogLThweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcblxuICBhIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIHBhZGRpbmc6IDhweCAwO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICAgICY6aG92ZXIge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICBvcGFjaXR5OiAwLjg7XG4gICAgfVxuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAubG9naW4tY29udGFpbmVyLFxuICAuc2lnbnVwLWNvbnRhaW5lcixcbiAgLmZvcmdvdC1wYXNzd29yZC1jb250YWluZXIsXG4gIC5vdHAtY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICB9XG5cbiAgLnRpdGxlIHtcbiAgICBmb250LXNpemU6IDEuNzVyZW07XG4gIH1cbn1cblxuaW9uLXRvb2xiYXIge1xuICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gIC0tcGFkZGluZy1lbmQ6IDA7XG59XG5cbi5sb2dvLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA4cHggMTZweDtcbn1cblxuLmZvb3RiYWxsLWljb24ge1xuICBmb250LXNpemU6IDI0cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG5cbi5sb2dvLXRleHQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4ubG9nby1zb3RkIHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBsaW5lLWhlaWdodDogMS4yO1xufVxuXG4ubG9nby1zdWJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBsaW5lLWhlaWdodDogMTtcbn1cblxuLmF1dGgtY2FyZCB7XG4gIG1heC13aWR0aDogNDAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBib3gtc2hhZG93OiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxuLmF1dGgtaGVhZGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xuXG4gIGgxIHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIH1cblxuICBwIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgbWFyZ2luOiAwO1xuICB9XG59XG5cbi5hdXRoLWZvcm0ge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBwYWRkaW5nOiAwLjVyZW07XG5cbiAgaW9uLWl0ZW0ge1xuICAgIC0tYmFja2dyb3VuZDogd2hpdGU7XG4gICAgLS1ib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIC0tYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIC0taGlnaGxpZ2h0LWhlaWdodDogMDtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAtLXBhZGRpbmctZW5kOiA4cHg7XG4gICAgLS1pbm5lci1wYWRkaW5nLWVuZDogOHB4O1xuICAgIGhlaWdodDogNDhweDtcbiAgICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcbiAgICBtYXJnaW46IDAgNHB4IDE2cHggNHB4O1xuXG4gICAgJi5pb24taW52YWxpZCB7XG4gICAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgfVxuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgfVxuXG4gICAgaW9uLWlucHV0IHtcbiAgICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIC0tcGxhY2Vob2xkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgfVxuXG4gIGlvbi1ub3RlIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbWFyZ2luOiA0cHggOHB4O1xuICB9XG59XG5cbi5hdXRoLWFjdGlvbnMge1xuICBtYXJnaW46IDEuNXJlbSAwO1xuXG4gIGlvbi1idXR0b24ge1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG4uYXV0aC1mb290ZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgLmRpdmlkZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luOiAyLjVyZW0gMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZ2FwOiAxcmVtO1xuXG4gICAgJjo6YmVmb3JlLFxuICAgICY6OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICBmbGV4OiAxO1xuICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICAgIH1cblxuICAgIHNwYW4ge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB9XG4gIH1cblxuICAuc29jaWFsLWJ1dHRvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZ2FwOiAxcmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcblxuICAgIGlvbi1idXR0b24ge1xuICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgICAgLS1wYWRkaW5nLWVuZDogMDtcbiAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgLS1ib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5hdXRoLWxpbmsge1xuICAgIGEge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBtYXJnaW4tbGVmdDogNHB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyBSZXNwb25zaXZlIGFkanVzdG1lbnRzXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgLmF1dGgtY2FyZCB7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIGlvbi1jb250ZW50IHtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gICAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgfVxufVxuIiwiQGltcG9ydCBcIi4uLy4uL3N0eWxlcy9hdXRoLnNoYXJlZC5zY3NzXCI7XG5cbi8vIExvZ28gc3R5bGVzXG5pb24tdG9vbGJhciB7XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbn1cblxuLmxvZ28tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlO1xuXG4gICY6aG92ZXIge1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxufVxuXG4uZm9vdGJhbGwtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLmxvZ28tdGV4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5sb2dvLXNvdGQge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG59XG5cbi5sb2dvLXN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4uYXV0aC1jYXJkIHtcbiAgbWF4LXdpZHRoOiA0MDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG4uYXV0aC1oZWFkZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG5cbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxuXG4gIHAge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLmF1dGgtZm9ybSB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIHBhZGRpbmc6IDAuNXJlbTtcblxuICBpb24taXRlbSB7XG4gICAgLS1iYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAtLWJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgLS1ib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgLS1oaWdobGlnaHQtaGVpZ2h0OiAwO1xuICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiA4cHg7XG4gICAgaGVpZ2h0OiA0OHB4O1xuICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xuICAgIG1hcmdpbjogMCA0cHggMTZweCA0cHg7XG5cbiAgICAmLmlvbi1pbnZhbGlkIHtcbiAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICB9XG5cbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG5cbiAgICBpb24taW5wdXQge1xuICAgICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgLS1wbGFjZWhvbGRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgfVxuICB9XG5cbiAgaW9uLW5vdGUge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBtYXJnaW46IDRweCA4cHg7XG4gIH1cbn1cblxuLmF1dGgtYWN0aW9ucyB7XG4gIG1hcmdpbjogMS41cmVtIDA7XG5cbiAgaW9uLWJ1dHRvbiB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG59XG5cbi8vIFJlc3BvbnNpdmUgYWRqdXN0bWVudHNcbkBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAuYXV0aC1jYXJkIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgaW9uLWNvbnRlbnQge1xuICAgIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuICB9XG59Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2F1dGgvc3R5bGVzL2F1dGguc2hhcmVkLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL3BsYXRmb3Jtcy9hdXRoL3BhZ2VzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztFQUlFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7QUNDRjs7QURFQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsOEJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FDQ0Y7O0FERUE7RUFDRSx5Q0FBQTtFQUNBLG1CQUFBO0FDQ0Y7QURDRTtFQUNFLGFBQUE7QUNDSjs7QURHQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLHNDQUFBO0VBQ0EsbUJBQUE7QUNBRjs7QURHQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0FGOztBREdBO0VBQ0Usa0JBQUE7QUNBRjtBREVFO0VBQ0UsOEJBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUNBSjtBREVJO0VBRUUsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0Esd0NBQUE7QUNETjtBRElJO0VBQ0UsT0FBQTtBQ0ZOO0FES0k7RUFDRSxRQUFBO0FDSE47O0FEUUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUNMRjtBRE9FO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDTEo7QURPSTtFQUNFLGVBQUE7QUNMTjs7QURVQTs7OztFQUlFLGtCQUFBO0VBQ0EsOEJBQUE7QUNQRjtBRFNFOzs7O0VBQ0UsK0JBQUE7RUFDQSxxQkFBQTtFQUNB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Q0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFrU0Y7O0FBL1JBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtBQWtTRjtBQWhTRTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7QUFrU0o7QUEvUkU7RUFDRSw4QkFBQTtFQUNBLFNBQUE7QUFpU0o7O0FBN1JBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQWdTRjtBQTlSRTtFQUNFLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxvQkFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLHlDQUFBO0VBQ0Esc0JBQUE7QUFnU0o7QUE5Ukk7RUFDRSxvQ0FBQTtBQWdTTjtBQTdSSTtFQUNFLGdCQUFBO0FBK1JOO0FBNVJJO0VBQ0Usb0JBQUE7RUFDQSx5QkFBQTtFQUNBLDhCQUFBO0VBQ0EsNENBQUE7QUE4Uk47QUExUkU7RUFDRSxlQUFBO0VBQ0EsZUFBQTtBQTRSSjs7QUF4UkE7RUFDRSxnQkFBQTtBQTJSRjtBQXpSRTtFQUNFLFNBQUE7QUEyUko7O0FBdFJBO0VBQ0U7SUFDRSxnQkFBQTtJQUNBLHVCQUFBO0lBQ0EsU0FBQTtJQUNBLFVBQUE7RUF5UkY7RUF0UkE7SUFDRSxxQkFBQTtJQUNBLG1CQUFBO0VBd1JGO0FBQ0Y7QUFDQSxvaWNBQW9pYyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dpbi1jb250YWluZXIsXG4uc2lnbnVwLWNvbnRhaW5lcixcbi5mb3Jnb3QtcGFzc3dvcmQtY29udGFpbmVyLFxuLm90cC1jb250YWluZXIge1xuICBtYXgtd2lkdGg6IDQwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgcGFkZGluZzogMjBweDtcbn1cblxuLnRpdGxlIHtcbiAgZm9udC1zaXplOiAycmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnN1YnRpdGxlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG59XG5cbmlvbi1jYXJkIHtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG5cbiAgaW9uLWNhcmQtY29udGVudCB7XG4gICAgcGFkZGluZzogMjRweDtcbiAgfVxufVxuXG5pb24taXRlbSB7XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgLS1ib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG5cbmlvbi1idXR0b25bZXhwYW5kPVwiYmxvY2tcIl0ge1xuICBtYXJnaW4tdG9wOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAtLWJvcmRlci1yYWRpdXM6IDhweDtcbiAgaGVpZ2h0OiA0OHB4O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uc29jaWFsLXNpZ251cCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAuZGl2aWRlciB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW46IDI0cHggMDtcblxuICAgICY6OmJlZm9yZSxcbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICB3aWR0aDogMjUlO1xuICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIH1cblxuICAgICY6OmJlZm9yZSB7XG4gICAgICBsZWZ0OiAwO1xuICAgIH1cblxuICAgICY6OmFmdGVyIHtcbiAgICAgIHJpZ2h0OiAwO1xuICAgIH1cbiAgfVxufVxuXG4uc29jaWFsLWJ1dHRvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxNnB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuXG4gIC5zb2NpYWwtYnV0dG9uIHtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gICAgLS1wYWRkaW5nLWVuZDogMDtcbiAgICB3aWR0aDogNDhweDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgfVxuICB9XG59XG5cbi5sb2dpbi1saW5rLFxuLnNpZ251cC1saW5rLFxuLmZvcmdvdC1wYXNzd29yZCxcbi5yZXNlbmQtbGluayB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gIGEge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICB9XG4gIH1cbn1cblxuLmZvcmdvdC1wYXNzd29yZCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBtYXJnaW4tdG9wOiAtOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuXG4gIGEge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgcGFkZGluZzogOHB4IDA7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgIG9wYWNpdHk6IDAuODtcbiAgICB9XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gIC5sb2dpbi1jb250YWluZXIsXG4gIC5zaWdudXAtY29udGFpbmVyLFxuICAuZm9yZ290LXBhc3N3b3JkLWNvbnRhaW5lcixcbiAgLm90cC1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gIH1cblxuICAudGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMS43NXJlbTtcbiAgfVxufVxuXG5pb24tdG9vbGJhciB7XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbn1cblxuLmxvZ28tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xufVxuXG4uZm9vdGJhbGwtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLmxvZ28tdGV4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5sb2dvLXNvdGQge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG59XG5cbi5sb2dvLXN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4uYXV0aC1jYXJkIHtcbiAgbWF4LXdpZHRoOiA0MDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG4uYXV0aC1oZWFkZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG5cbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxuXG4gIHAge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLmF1dGgtZm9ybSB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIHBhZGRpbmc6IDAuNXJlbTtcblxuICBpb24taXRlbSB7XG4gICAgLS1iYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAtLWJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgLS1ib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgLS1oaWdobGlnaHQtaGVpZ2h0OiAwO1xuICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiA4cHg7XG4gICAgaGVpZ2h0OiA0OHB4O1xuICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xuICAgIG1hcmdpbjogMCA0cHggMTZweCA0cHg7XG5cbiAgICAmLmlvbi1pbnZhbGlkIHtcbiAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICB9XG5cbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG5cbiAgICBpb24taW5wdXQge1xuICAgICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgLS1wbGFjZWhvbGRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgfVxuICB9XG5cbiAgaW9uLW5vdGUge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBtYXJnaW46IDRweCA4cHg7XG4gIH1cbn1cblxuLmF1dGgtYWN0aW9ucyB7XG4gIG1hcmdpbjogMS41cmVtIDA7XG5cbiAgaW9uLWJ1dHRvbiB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG59XG5cbi5hdXRoLWZvb3RlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAuZGl2aWRlciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW46IDIuNXJlbSAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBnYXA6IDFyZW07XG5cbiAgICAmOjpiZWZvcmUsXG4gICAgJjo6YWZ0ZXIge1xuICAgICAgY29udGVudDogXCJcIjtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBoZWlnaHQ6IDFweDtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gICAgfVxuXG4gICAgc3BhbiB7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIH1cbiAgfVxuXG4gIC5zb2NpYWwtYnV0dG9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBnYXA6IDFyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuXG4gICAgaW9uLWJ1dHRvbiB7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gICAgICAtLXBhZGRpbmctZW5kOiAwO1xuICAgICAgd2lkdGg6IDQwcHg7XG4gICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAtLWJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcblxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLmF1dGgtbGluayB7XG4gICAgYSB7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIG1hcmdpbi1sZWZ0OiA0cHg7XG4gICAgfVxuICB9XG59XG5cbi8vIFJlc3BvbnNpdmUgYWRqdXN0bWVudHNcbkBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAuYXV0aC1jYXJkIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgaW9uLWNvbnRlbnQge1xuICAgIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuICB9XG59XG4iLCJAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL2F1dGguc2hhcmVkLnNjc3NcIjtcblxuLy8gTG9nbyBzdHlsZXNcbmlvbi10b29sYmFyIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xufVxuXG4ubG9nby1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogOHB4IDE2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7XG5cbiAgJjpob3ZlciB7XG4gICAgb3BhY2l0eTogMC44O1xuICB9XG59XG5cbi5mb290YmFsbC1pY29uIHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuXG4ubG9nby10ZXh0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmxvZ28tc290ZCB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGluZS1oZWlnaHQ6IDEuMjtcbn1cblxuLmxvZ28tc3VidGl0bGUge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG5cbi5hdXRoLWNhcmQge1xuICBtYXgtd2lkdGg6IDQwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG5cbi5hdXRoLWhlYWRlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB9XG5cbiAgcCB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG4uYXV0aC1mb3JtIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgcGFkZGluZzogMC41cmVtO1xuXG4gIGlvbi1pdGVtIHtcbiAgICAtLWJhY2tncm91bmQ6IHdoaXRlO1xuICAgIC0tYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAtLWJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAtLWhpZ2hsaWdodC1oZWlnaHQ6IDA7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDhweDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gICAgbWFyZ2luOiAwIDRweCAxNnB4IDRweDtcblxuICAgICYuaW9uLWludmFsaWQge1xuICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIH1cblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cblxuICAgIGlvbi1pbnB1dCB7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAtLXBsYWNlaG9sZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gIH1cblxuICBpb24tbm90ZSB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIG1hcmdpbjogNHB4IDhweDtcbiAgfVxufVxuXG4uYXV0aC1hY3Rpb25zIHtcbiAgbWFyZ2luOiAxLjVyZW0gMDtcblxuICBpb24tYnV0dG9uIHtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2ZSBhZGp1c3RtZW50c1xuQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XG4gIC5hdXRoLWNhcmQge1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cblxuICBpb24tY29udGVudCB7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xuICAgIC0tcGFkZGluZy1lbmQ6IDE2cHg7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_auth_pages_reset-password_reset-password_page_ts.js.map