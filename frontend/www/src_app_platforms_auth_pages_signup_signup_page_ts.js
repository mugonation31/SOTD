"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_auth_pages_signup_signup_page_ts"],{

/***/ 7499:
/*!*******************************************!*\
  !*** ./src/app/core/utils/error.utils.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractErrorMessage: () => (/* binding */ extractErrorMessage),
/* harmony export */   getUserFriendlyErrorMessage: () => (/* binding */ getUserFriendlyErrorMessage),
/* harmony export */   isNetworkError: () => (/* binding */ isNetworkError),
/* harmony export */   isSupabaseAuthError: () => (/* binding */ isSupabaseAuthError),
/* harmony export */   isSupabaseDatabaseError: () => (/* binding */ isSupabaseDatabaseError)
/* harmony export */ });
/**
 * Error handling utilities for extracting meaningful error messages
 * from various error object structures (Supabase, HTTP, Network, etc.)
 */
/**
 * Recursively extracts the most meaningful error message from a complex error object
 * @param error - The error object to extract message from
 * @param maxDepth - Maximum recursion depth to prevent infinite loops
 * @returns The most meaningful error message found
 */
function extractErrorMessage(error, maxDepth = 5) {
  if (!error || maxDepth <= 0) {
    return 'Signup failed. Please try again.';
  }
  // Handle Error instances
  if (error instanceof Error) {
    return error.message || 'An unexpected error occurred.';
  }
  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }
  // Handle null/undefined
  if (error === null || error === undefined) {
    return 'Signup failed. Please try again.';
  }
  // Priority order for error message extraction
  const messageSources = [
  // Supabase specific error structures (highest priority)
  () => error.details, () => error.hint,
  // Deep nested error structures
  () => {
    var _error$error;
    return (_error$error = error.error) === null || _error$error === void 0 || (_error$error = _error$error.error) === null || _error$error === void 0 || (_error$error = _error$error.error) === null || _error$error === void 0 ? void 0 : _error$error.message;
  }, () => {
    var _error$error2;
    return (_error$error2 = error.error) === null || _error$error2 === void 0 || (_error$error2 = _error$error2.error) === null || _error$error2 === void 0 ? void 0 : _error$error2.message;
  }, () => {
    var _error$error3;
    return (_error$error3 = error.error) === null || _error$error3 === void 0 ? void 0 : _error$error3.message;
  },
  // Direct message properties
  () => error.message,
  // HTTP error structures
  () => {
    var _error$error4;
    return (_error$error4 = error.error) === null || _error$error4 === void 0 || (_error$error4 = _error$error4.error) === null || _error$error4 === void 0 ? void 0 : _error$error4.message;
  }, () => {
    var _error$error5;
    return (_error$error5 = error.error) === null || _error$error5 === void 0 ? void 0 : _error$error5.message;
  }];
  // Try each message source in priority order
  for (const getMessage of messageSources) {
    try {
      const message = getMessage();
      if (message && typeof message === 'string' && message.trim()) {
        return message.trim();
      }
    } catch (e) {
      // Continue to next source if this one fails
      continue;
    }
  }
  // If no message found, try to extract from nested objects recursively
  if (typeof error === 'object') {
    for (const key in error) {
      if (error.hasOwnProperty(key) && typeof error[key] === 'object') {
        const nestedMessage = extractErrorMessage(error[key], maxDepth - 1);
        if (nestedMessage && nestedMessage !== 'Signup failed. Please try again.') {
          return nestedMessage;
        }
      }
    }
  }
  // Fallback message
  return 'Signup failed. Please try again.';
}
/**
 * Determines if an error is a network-related error
 * @param error - The error object to check
 * @returns True if it's a network error
 */
function isNetworkError(error) {
  if (!error) return false;
  const networkErrorPatterns = ['Network Error', 'Failed to fetch', 'Request timeout', 'Connection refused', 'ENOTFOUND', 'ECONNREFUSED', 'ETIMEDOUT'];
  const errorMessage = extractErrorMessage(error).toLowerCase();
  return networkErrorPatterns.some(pattern => errorMessage.includes(pattern.toLowerCase()));
}
/**
 * Determines if an error is a Supabase authentication error
 * @param error - The error object to check
 * @returns True if it's a Supabase auth error
 */
function isSupabaseAuthError(error) {
  if (!error) return false;
  const authErrorPatterns = ['User already registered', 'Invalid email', 'Password should be at least', 'Email not confirmed', 'AuthApiError'];
  const errorMessage = extractErrorMessage(error).toLowerCase();
  return authErrorPatterns.some(pattern => errorMessage.includes(pattern.toLowerCase()));
}
/**
 * Determines if an error is a Supabase database error
 * @param error - The error object to check
 * @returns True if it's a Supabase database error
 */
function isSupabaseDatabaseError(error) {
  if (!error) return false;
  const dbErrorPatterns = ['duplicate key value violates unique constraint', 'violates not-null constraint', 'violates check constraint', 'PostgrestError', '23505',
  // Unique constraint violation
  '23502',
  // Not null constraint violation
  '23514' // Check constraint violation
  ];
  const errorMessage = extractErrorMessage(error).toLowerCase();
  return dbErrorPatterns.some(pattern => errorMessage.includes(pattern.toLowerCase()));
}
/**
 * Gets a user-friendly error message based on the error type
 * @param error - The error object
 * @returns A user-friendly error message
 */
function getUserFriendlyErrorMessage(error) {
  const message = extractErrorMessage(error);
  // If we already have a good message, return it
  if (message && message !== 'Signup failed. Please try again.') {
    return message;
  }
  // Provide specific messages based on error type
  if (isNetworkError(error)) {
    return 'Network connection error. Please check your internet connection and try again.';
  }
  if (isSupabaseAuthError(error)) {
    return 'Authentication error. Please check your information and try again.';
  }
  if (isSupabaseDatabaseError(error)) {
    return 'Database error. Please try again or contact support if the problem persists.';
  }
  // Default fallback
  return 'Signup failed. Please try again.';
}

/***/ }),

/***/ 5829:
/*!************************************************************!*\
  !*** ./src/app/platforms/auth/pages/signup/signup.page.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignupPage: () => (/* binding */ SignupPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _core_utils_error_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/utils/error.utils */ 7499);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/services/auth.service */ 8010);
var _SignupPage;











function SignupPage_ion_item_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item")(1, "ion-select", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SignupPage_ion_item_19_Template_ion_select_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx_r1.signupData.role, $event) || (ctx_r1.signupData.role = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-select-option", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Player - Join prediction groups");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-select-option", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Group Admin - Create and manage groups");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.signupData.role);
  }
}
function SignupPage_ion_note_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.validationErrors.username, " ");
  }
}
function SignupPage_ion_note_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.validationErrors.firstName, " ");
  }
}
function SignupPage_ion_note_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.validationErrors.lastName, " ");
  }
}
function SignupPage_ion_note_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.validationErrors.email, " ");
  }
}
function SignupPage_ion_note_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.validationErrors.password, " ");
  }
}
function SignupPage_div_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 37)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, " Minimum 8 characters ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, " At least one uppercase letter ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, " At least one number ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, " At least one special character ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("valid", ctx_r1.passwordCriteria.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", ctx_r1.passwordCriteria.length ? "checkmark-circle" : "ellipse-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("valid", ctx_r1.passwordCriteria.uppercase);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", ctx_r1.passwordCriteria.uppercase ? "checkmark-circle" : "ellipse-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("valid", ctx_r1.passwordCriteria.number);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", ctx_r1.passwordCriteria.number ? "checkmark-circle" : "ellipse-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("valid", ctx_r1.passwordCriteria.special);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", ctx_r1.passwordCriteria.special ? "checkmark-circle" : "ellipse-outline");
  }
}
function SignupPage_ion_note_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.validationErrors.confirmPassword, " ");
  }
}
function SignupPage_ion_note_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.validationErrors.acceptedTerms, " ");
  }
}
function SignupPage_span_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Create Account");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SignupPage_span_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Creating Account...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class SignupPage {
  get canSubmit() {
    const hasAllFields = Boolean(this.signupData.username && this.signupData.firstName && this.signupData.lastName && this.signupData.email && this.signupData.password && this.signupData.confirmPassword && this.signupData.acceptedTerms);
    const hasNoErrors = Boolean(!this.validationErrors.username && !this.validationErrors.firstName && !this.validationErrors.lastName && !this.validationErrors.email && !this.validationErrors.password && !this.validationErrors.confirmPassword && !this.validationErrors.acceptedTerms);
    const isPasswordValid = this.isPasswordValid();
    return hasAllFields && hasNoErrors && isPasswordValid;
  }
  constructor(authService, router, route) {
    this.authService = authService;
    this.router = router;
    this.route = route;
    this.signupData = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'player',
      acceptedTerms: false
    };
    this.validationErrors = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: ''
    };
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.isLoading = false;
    this.returnUrl = '/welcome';
    this.isRoleForced = false; // Track if role selection was forced from welcome page
    this.passwordCriteria = {
      length: false,
      uppercase: false,
      number: false,
      special: false
    };
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      eye: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.eye,
      eyeOff: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.eyeOff,
      checkmarkCircle: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.checkmarkCircle,
      ellipseOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.ellipseOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.peopleOutline,
      personAddOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personAddOutline
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const requiredRole = params['role'];
      const returnUrl = params['returnUrl'] || '/welcome';
      const forceRole = params['forceRole'] === 'true';
      this.returnUrl = returnUrl;
      this.isRoleForced = forceRole;
      // Set the role based on the query parameter
      if (requiredRole) {
        this.signupData.role = requiredRole;
      }
      // If forceRole is true, always logout current user and force new signup
      // This ensures clean session separation between different user roles
      if (forceRole && this.authService.isAuthenticated()) {
        this.authService.logoutSilent();
        // Continue with signup flow after silent logout
      }
      // Check if user is already authenticated with the correct role
      if (this.authService.isAuthenticated() && !forceRole) {
        const currentRole = this.authService.getUserRole();
        if (currentRole === requiredRole || requiredRole === 'group-admin' && currentRole === 'super-admin') {
          // User has the required role, redirect to destination
          this.router.navigate([returnUrl], {
            replaceUrl: true
          });
          return;
        }
      }
    });
    // Don't trigger validation on init - let users fill fields first
    // this.validateAllFields();
  }
  validateAllFields() {
    this.validateRequired('username', this.signupData.username);
    this.validateRequired('firstName', this.signupData.firstName);
    this.validateRequired('lastName', this.signupData.lastName);
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();
    this.validateAcceptedTerms();
  }
  validateRequired(field, value) {
    if (!value) {
      this.validationErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    } else {
      this.validationErrors[field] = '';
    }
  }
  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!this.signupData.email) {
      this.validationErrors.email = 'Email is required';
    } else if (!emailPattern.test(this.signupData.email)) {
      this.validationErrors.email = 'Please enter a valid email address';
    } else {
      this.validationErrors.email = '';
    }
  }
  validatePassword() {
    const password = this.signupData.password;
    // Update criteria checks
    this.passwordCriteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    if (!password) {
      this.validationErrors.password = 'Password is required';
    } else if (!this.isPasswordValid()) {
      this.validationErrors.password = 'Password does not meet all requirements';
    } else {
      this.validationErrors.password = '';
    }
    this.validateConfirmPassword();
  }
  isPasswordValid() {
    return Object.values(this.passwordCriteria).every(criterion => criterion);
  }
  validateConfirmPassword() {
    if (!this.signupData.confirmPassword) {
      this.validationErrors.confirmPassword = 'Please confirm your password';
    } else if (this.signupData.password !== this.signupData.confirmPassword) {
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
  onSignup() {
    this.validateRequired('username', this.signupData.username);
    this.validateRequired('firstName', this.signupData.firstName);
    this.validateRequired('lastName', this.signupData.lastName);
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();
    this.validateAcceptedTerms();
    if (!this.canSubmit || this.isLoading) {
      return;
    }
    this.isLoading = true;
    const {
      confirmPassword,
      acceptedTerms,
      ...signupPayload
    } = this.signupData;
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (this.isLoading) {
        console.error('Signup timeout - taking too long');
        this.isLoading = false;
        alert('Signup is taking longer than expected. Please try again.');
      }
    }, 30000); // 30 second timeout
    this.authService.signup(signupPayload).subscribe({
      next: response => {
        clearTimeout(timeoutId); // Clear the timeout
        this.isLoading = false;
        // Add a small delay to ensure the loading state is visible
        setTimeout(() => {
          // After successful signup, redirect to login with email confirmation message
          const queryParams = {
            returnUrl: this.returnUrl,
            role: this.signupData.role,
            email: this.signupData.email,
            pendingConfirmation: 'true'
          };
          this.router.navigate(['/auth/login'], {
            queryParams
          });
        }, 500);
      },
      error: error => {
        console.error('Signup error:', error);
        clearTimeout(timeoutId); // Clear the timeout
        this.isLoading = false;
        // Use the new error handling utility to extract meaningful error messages
        const errorMessage = (0,_core_utils_error_utils__WEBPACK_IMPORTED_MODULE_1__.extractErrorMessage)(error);
        alert(errorMessage);
      }
    });
  }
  validateAcceptedTerms() {
    if (!this.signupData.acceptedTerms) {
      this.validationErrors.acceptedTerms = 'You must accept the Terms and Conditions to continue';
    } else {
      this.validationErrors.acceptedTerms = '';
    }
  }
  openTerms(event) {
    event.preventDefault();
    // TODO: Open Terms and Conditions modal or page
  }
  openPrivacy(event) {
    event.preventDefault();
    // TODO: Open Privacy Policy modal or page
  }
  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
_SignupPage = SignupPage;
_SignupPage.ɵfac = function SignupPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SignupPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute));
};
_SignupPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _SignupPage,
  selectors: [["app-signup"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 65,
  vars: 35,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], [1, "ion-padding"], [1, "auth-card"], [1, "auth-header"], [3, "ngSubmit"], [1, "auth-form"], [4, "ngIf"], ["placeholder", "Username", "name", "username", "required", "", "type", "text", 3, "ngModelChange", "ionInput", "ngModel"], ["slot", "error", 4, "ngIf"], ["placeholder", "First Name", "name", "firstName", "required", "", "type", "text", 3, "ngModelChange", "ionInput", "ngModel"], ["placeholder", "Last Name", "name", "lastName", "required", "", "type", "text", 3, "ngModelChange", "ionBlur", "ngModel"], ["placeholder", "Email", "name", "email", "required", "", "type", "email", 3, "ngModelChange", "ionInput", "ngModel"], ["placeholder", "Password", "name", "password", "required", "", 3, "ngModelChange", "ionInput", "ngModel", "type"], ["fill", "clear", "slot", "end", 3, "click"], [3, "name"], ["class", "password-requirements", 4, "ngIf"], ["placeholder", "Confirm Password", "name", "confirmPassword", "required", "", 3, "ngModelChange", "ionInput", "ngModel", "type"], [1, "terms-section"], [1, "terms-container"], ["name", "acceptedTerms", 3, "ngModelChange", "ionChange", "ngModel"], [1, "terms-text"], ["href", "#", 3, "click"], ["color", "danger", "class", "terms-error", 4, "ngIf"], [1, "auth-actions"], ["expand", "block", "type", "submit", 3, "disabled"], [1, "auth-footer"], [1, "auth-link"], ["color", "medium"], ["routerLink", "/auth/login"], ["placeholder", "Select Account Type", "name", "role", "required", "", 3, "ngModelChange", "ngModel"], ["value", "player"], ["value", "group-admin"], ["slot", "error"], [1, "password-requirements"], ["color", "danger", 1, "terms-error"]],
  template: function SignupPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SignupPage_Template_div_click_2_listener() {
        return ctx.navigateToWelcome();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "ion-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2)(5, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "SOTD");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "ion-content", 5)(10, "ion-card", 6)(11, "ion-card-content")(12, "div", 7)(13, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Create Account");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Join us and start predicting matches");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "form", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function SignupPage_Template_form_ngSubmit_17_listener() {
        return ctx.onSignup();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "ion-list", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, SignupPage_ion_item_19_Template, 6, 1, "ion-item", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "ion-item")(21, "ion-input", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SignupPage_Template_ion_input_ngModelChange_21_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.signupData.username, $event) || (ctx.signupData.username = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionInput", function SignupPage_Template_ion_input_ionInput_21_listener() {
        return ctx.validateRequired("username", ctx.signupData.username);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, SignupPage_ion_note_22_Template, 2, 1, "ion-note", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "ion-item")(24, "ion-input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SignupPage_Template_ion_input_ngModelChange_24_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.signupData.firstName, $event) || (ctx.signupData.firstName = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionInput", function SignupPage_Template_ion_input_ionInput_24_listener() {
        return ctx.validateRequired("firstName", ctx.signupData.firstName);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, SignupPage_ion_note_25_Template, 2, 1, "ion-note", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "ion-item")(27, "ion-input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SignupPage_Template_ion_input_ngModelChange_27_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.signupData.lastName, $event) || (ctx.signupData.lastName = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionBlur", function SignupPage_Template_ion_input_ionBlur_27_listener() {
        return ctx.validateRequired("lastName", ctx.signupData.lastName);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](28, SignupPage_ion_note_28_Template, 2, 1, "ion-note", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "ion-item")(30, "ion-input", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SignupPage_Template_ion_input_ngModelChange_30_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.signupData.email, $event) || (ctx.signupData.email = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionInput", function SignupPage_Template_ion_input_ionInput_30_listener() {
        return ctx.validateEmail();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, SignupPage_ion_note_31_Template, 2, 1, "ion-note", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "ion-item")(33, "ion-input", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SignupPage_Template_ion_input_ngModelChange_33_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.signupData.password, $event) || (ctx.signupData.password = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionInput", function SignupPage_Template_ion_input_ionInput_33_listener() {
        return ctx.validatePassword();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "ion-button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SignupPage_Template_ion_button_click_34_listener() {
        return ctx.togglePasswordVisibility();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](35, "ion-icon", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](36, SignupPage_ion_note_36_Template, 2, 1, "ion-note", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](37, SignupPage_div_37_Template, 13, 12, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "ion-item")(39, "ion-input", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SignupPage_Template_ion_input_ngModelChange_39_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.signupData.confirmPassword, $event) || (ctx.signupData.confirmPassword = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionInput", function SignupPage_Template_ion_input_ionInput_39_listener() {
        return ctx.validateConfirmPassword();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "ion-button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SignupPage_Template_ion_button_click_40_listener() {
        return ctx.toggleConfirmPasswordVisibility();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](41, "ion-icon", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](42, SignupPage_ion_note_42_Template, 2, 1, "ion-note", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "div", 21)(44, "div", 22)(45, "ion-checkbox", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SignupPage_Template_ion_checkbox_ngModelChange_45_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.signupData.acceptedTerms, $event) || (ctx.signupData.acceptedTerms = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionChange", function SignupPage_Template_ion_checkbox_ionChange_45_listener() {
        return ctx.validateAcceptedTerms();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "div", 24)(47, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](48, "I agree to the ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "a", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SignupPage_Template_a_click_49_listener($event) {
        return ctx.openTerms($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, "Terms and Conditions");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](51, " and ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "a", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SignupPage_Template_a_click_52_listener($event) {
        return ctx.openPrivacy($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](53, "Privacy Policy");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](54, SignupPage_ion_note_54_Template, 2, 1, "ion-note", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "div", 27)(56, "ion-button", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](57, SignupPage_span_57_Template, 2, 0, "span", 10)(58, SignupPage_span_58_Template, 2, 0, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "div", 29)(60, "div", 30)(61, "ion-text", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](62, " Already have an account? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "a", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](64, "Login");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isRoleForced);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx.validationErrors.username);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.signupData.username);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.validationErrors.username);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx.validationErrors.firstName);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.signupData.firstName);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.validationErrors.firstName);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx.validationErrors.lastName);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.signupData.lastName);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.validationErrors.lastName);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx.validationErrors.email);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.signupData.email);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.validationErrors.email);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx.validationErrors.password);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.signupData.password);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("type", ctx.showPassword ? "text" : "password");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", ctx.showPassword ? "eye-off" : "eye");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.validationErrors.password);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.signupData.password.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx.validationErrors.confirmPassword);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.signupData.confirmPassword);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("type", ctx.showConfirmPassword ? "text" : "password");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", ctx.showConfirmPassword ? "eye-off" : "eye");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.validationErrors.confirmPassword);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.signupData.acceptedTerms);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.validationErrors.acceptedTerms);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.canSubmit || ctx.isLoading);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isLoading);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLoading);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonText, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonSelect, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonSelectOption, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonNote, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_6__.IonCheckbox, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgForm, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf],
  styles: [".auth-card[_ngcontent-%COMP%] {\n  max-width: 400px;\n  margin: 0 auto;\n  box-shadow: none;\n  background: transparent;\n}\n\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  margin-bottom: 8px;\n  color: var(--ion-color-dark);\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  margin: 0;\n}\n\n.auth-form[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  padding: 0.5rem;\n}\n.auth-form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: white;\n  --border-color: transparent;\n  --border-radius: 8px;\n  --highlight-height: 0;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  --inner-padding-end: 8px;\n  height: 48px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  margin: 0 4px 16px 4px;\n}\n.auth-form[_ngcontent-%COMP%]   ion-item.ion-invalid[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n.auth-form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.auth-form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --background: transparent;\n  --color: var(--ion-color-dark);\n  --placeholder-color: var(--ion-color-medium);\n}\n.auth-form[_ngcontent-%COMP%]   ion-note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 4px 8px;\n}\n\n.auth-actions[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n}\n.auth-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.auth-footer[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  margin: 2.5rem 0;\n  text-align: center;\n  gap: 1rem;\n}\n.auth-footer[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]::before, .auth-footer[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]::after {\n  content: \"\";\n  flex: 1;\n  height: 1px;\n  background: var(--ion-color-light-shade);\n}\n.auth-footer[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  white-space: nowrap;\n}\n.auth-footer[_ngcontent-%COMP%]   .social-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.auth-footer[_ngcontent-%COMP%]   .social-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --padding-end: 0;\n  width: 40px;\n  height: 40px;\n  --border-radius: 50%;\n  --background: var(--ion-color-light);\n}\n.auth-footer[_ngcontent-%COMP%]   .social-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.auth-footer[_ngcontent-%COMP%]   .auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  text-decoration: none;\n  font-weight: 500;\n  margin-left: 4px;\n}\n\n.password-requirements[_ngcontent-%COMP%] {\n  margin: 4px 8px 12px;\n  padding: 8px 12px;\n  border-radius: 4px;\n  font-size: 13px;\n}\n.password-requirements[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin: 4px 0;\n  color: var(--ion-color-medium);\n  transition: color 0.2s ease;\n}\n.password-requirements[_ngcontent-%COMP%]   div.valid[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n}\n.password-requirements[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  font-size: 16px;\n  min-width: 16px;\n}\n\n.terms-section[_ngcontent-%COMP%] {\n  margin: 20px 4px 16px 4px;\n}\n.terms-section[_ngcontent-%COMP%]   .terms-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  padding: 16px;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.terms-section[_ngcontent-%COMP%]   .terms-container[_ngcontent-%COMP%]   ion-checkbox[_ngcontent-%COMP%] {\n  margin-right: 14px;\n  margin-top: 2px;\n  flex-shrink: 0;\n}\n.terms-section[_ngcontent-%COMP%]   .terms-container[_ngcontent-%COMP%]   .terms-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.terms-section[_ngcontent-%COMP%]   .terms-container[_ngcontent-%COMP%]   .terms-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.5;\n  color: var(--ion-color-dark);\n  display: block;\n}\n.terms-section[_ngcontent-%COMP%]   .terms-container[_ngcontent-%COMP%]   .terms-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n.terms-section[_ngcontent-%COMP%]   .terms-container[_ngcontent-%COMP%]   .terms-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.terms-section[_ngcontent-%COMP%]   .terms-error[_ngcontent-%COMP%] {\n  display: block;\n  margin: 8px 16px 0;\n  font-size: 12px;\n  font-weight: 500;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --padding-end: 0;\n}\nion-item[_ngcontent-%COMP%]   ion-button[slot=end][_ngcontent-%COMP%] {\n  margin: 0;\n  height: 100%;\n  --padding-end: 4px;\n  --padding-start: 4px;\n}\n\nion-toolbar[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --padding-end: 0;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  cursor: pointer;\n  transition: opacity 0.2s ease;\n}\n.logo-container[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n\n.football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.logo-sotd[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n\n.logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n  line-height: 1;\n}\n\n@media (max-width: 576px) {\n  .auth-card[_ngcontent-%COMP%] {\n    box-shadow: none;\n    background: transparent;\n    margin: 0;\n    padding: 0;\n  }\n  ion-content[_ngcontent-%COMP%] {\n    --padding-start: 16px;\n    --padding-end: 16px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ251cC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7QUFDRTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7QUFDSjtBQUVFO0VBQ0UsOEJBQUE7RUFDQSxTQUFBO0FBQUo7O0FBSUE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBREY7QUFHRTtFQUNFLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxvQkFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLHlDQUFBO0VBQ0Esc0JBQUE7QUFESjtBQUdJO0VBQ0Usb0NBQUE7QUFETjtBQUlJO0VBQ0UsZ0JBQUE7QUFGTjtBQUtJO0VBQ0Usb0JBQUE7RUFDQSx5QkFBQTtFQUNBLDhCQUFBO0VBQ0EsNENBQUE7QUFITjtBQU9FO0VBQ0UsZUFBQTtFQUNBLGVBQUE7QUFMSjs7QUFTQTtFQUNFLGdCQUFBO0FBTkY7QUFRRTtFQUNFLFNBQUE7QUFOSjs7QUFVQTtFQUNFLGtCQUFBO0FBUEY7QUFTRTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7QUFQSjtBQVNJO0VBRUUsV0FBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0Esd0NBQUE7QUFSTjtBQVdJO0VBQ0UsOEJBQUE7RUFDQSxtQkFBQTtBQVROO0FBYUU7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EscUJBQUE7QUFYSjtBQWFJO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQ0FBQTtBQVhOO0FBYU07RUFDRSxlQUFBO0FBWFI7QUFpQkk7RUFDRSwrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQWZOOztBQW9CQTtFQUNFLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFqQkY7QUFtQkU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSwyQkFBQTtBQWpCSjtBQW1CSTtFQUNFLCtCQUFBO0FBakJOO0FBb0JJO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQWxCTjs7QUF1QkE7RUFDRSx5QkFBQTtBQXBCRjtBQXNCRTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxrQ0FBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7QUFwQko7QUFzQkk7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBcEJOO0FBdUJJO0VBQ0UsT0FBQTtBQXJCTjtBQXVCTTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0EsY0FBQTtBQXJCUjtBQXVCUTtFQUNFLCtCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtBQXJCVjtBQXVCVTtFQUNFLDBCQUFBO0FBckJaO0FBNEJFO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBMUJKOztBQThCQTtFQUNFLGdCQUFBO0FBM0JGO0FBNkJFO0VBQ0UsU0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0FBM0JKOztBQWdDQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7QUE3QkY7O0FBZ0NBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLDZCQUFBO0FBN0JGO0FBK0JFO0VBQ0UsWUFBQTtBQTdCSjs7QUFpQ0E7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUE5QkY7O0FBaUNBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FBOUJGOztBQWlDQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBOUJGOztBQWlDQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGNBQUE7QUE5QkY7O0FBa0NBO0VBQ0U7SUFDRSxnQkFBQTtJQUNBLHVCQUFBO0lBQ0EsU0FBQTtJQUNBLFVBQUE7RUEvQkY7RUFrQ0E7SUFDRSxxQkFBQTtJQUNBLG1CQUFBO0VBaENGO0FBQ0YiLCJmaWxlIjoic2lnbnVwLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hdXRoLWNhcmQge1xuICBtYXgtd2lkdGg6IDQwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG5cbi5hdXRoLWhlYWRlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB9XG5cbiAgcCB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG4uYXV0aC1mb3JtIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgcGFkZGluZzogMC41cmVtO1xuXG4gIGlvbi1pdGVtIHtcbiAgICAtLWJhY2tncm91bmQ6IHdoaXRlO1xuICAgIC0tYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAtLWJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAtLWhpZ2hsaWdodC1oZWlnaHQ6IDA7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDhweDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gICAgbWFyZ2luOiAwIDRweCAxNnB4IDRweDtcblxuICAgICYuaW9uLWludmFsaWQge1xuICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIH1cblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cblxuICAgIGlvbi1pbnB1dCB7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAtLXBsYWNlaG9sZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gIH1cblxuICBpb24tbm90ZSB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIG1hcmdpbjogNHB4IDhweDtcbiAgfVxufVxuXG4uYXV0aC1hY3Rpb25zIHtcbiAgbWFyZ2luOiAxLjVyZW0gMDtcblxuICBpb24tYnV0dG9uIHtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLmF1dGgtZm9vdGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gIC5kaXZpZGVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbjogMi41cmVtIDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGdhcDogMXJlbTtcblxuICAgICY6OmJlZm9yZSxcbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgZmxleDogMTtcbiAgICAgIGhlaWdodDogMXB4O1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgICB9XG5cbiAgICBzcGFuIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgfVxuICB9XG5cbiAgLnNvY2lhbC1idXR0b25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGdhcDogMXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG5cbiAgICBpb24tYnV0dG9uIHtcbiAgICAgIC0tcGFkZGluZy1zdGFydDogMDtcbiAgICAgIC0tcGFkZGluZy1lbmQ6IDA7XG4gICAgICB3aWR0aDogNDBweDtcbiAgICAgIGhlaWdodDogNDBweDtcbiAgICAgIC0tYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuXG4gICAgICBpb24taWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuYXV0aC1saW5rIHtcbiAgICBhIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgICB9XG4gIH1cbn1cblxuLnBhc3N3b3JkLXJlcXVpcmVtZW50cyB7XG4gIG1hcmdpbjogNHB4IDhweCAxMnB4O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDEzcHg7XG5cbiAgZGl2IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luOiA0cHggMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlO1xuXG4gICAgJi52YWxpZCB7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICAgIH1cblxuICAgIGlvbi1pY29uIHtcbiAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgbWluLXdpZHRoOiAxNnB4O1xuICAgIH1cbiAgfVxufVxuXG4udGVybXMtc2VjdGlvbiB7XG4gIG1hcmdpbjogMjBweCA0cHggMTZweCA0cHg7XG4gIFxuICAudGVybXMtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gICAgXG4gICAgaW9uLWNoZWNrYm94IHtcbiAgICAgIG1hcmdpbi1yaWdodDogMTRweDtcbiAgICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cbiAgICBcbiAgICAudGVybXMtdGV4dCB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgXG4gICAgICBzcGFuIHtcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgXG4gICAgICAgIGEge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgXG4gICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC50ZXJtcy1lcnJvciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luOiA4cHggMTZweCAwO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG59XG5cbmlvbi1pdGVtIHtcbiAgLS1wYWRkaW5nLWVuZDogMDtcblxuICBpb24tYnV0dG9uW3Nsb3Q9XCJlbmRcIl0ge1xuICAgIG1hcmdpbjogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLS1wYWRkaW5nLWVuZDogNHB4O1xuICAgIC0tcGFkZGluZy1zdGFydDogNHB4O1xuICB9XG59XG5cbi8vIExvZ28gc3R5bGVzXG5pb24tdG9vbGJhciB7XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbn1cblxuLmxvZ28tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlO1xuXG4gICY6aG92ZXIge1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxufVxuXG4uZm9vdGJhbGwtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLmxvZ28tdGV4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5sb2dvLXNvdGQge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG59XG5cbi5sb2dvLXN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4vLyBSZXNwb25zaXZlIGFkanVzdG1lbnRzXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgLmF1dGgtY2FyZCB7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIGlvbi1jb250ZW50IHtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gICAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgfVxufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2F1dGgvcGFnZXMvc2lnbnVwL3NpZ251cC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7QUFDRTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7QUFDSjtBQUVFO0VBQ0UsOEJBQUE7RUFDQSxTQUFBO0FBQUo7O0FBSUE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBREY7QUFHRTtFQUNFLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxvQkFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLHlDQUFBO0VBQ0Esc0JBQUE7QUFESjtBQUdJO0VBQ0Usb0NBQUE7QUFETjtBQUlJO0VBQ0UsZ0JBQUE7QUFGTjtBQUtJO0VBQ0Usb0JBQUE7RUFDQSx5QkFBQTtFQUNBLDhCQUFBO0VBQ0EsNENBQUE7QUFITjtBQU9FO0VBQ0UsZUFBQTtFQUNBLGVBQUE7QUFMSjs7QUFTQTtFQUNFLGdCQUFBO0FBTkY7QUFRRTtFQUNFLFNBQUE7QUFOSjs7QUFVQTtFQUNFLGtCQUFBO0FBUEY7QUFTRTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7QUFQSjtBQVNJO0VBRUUsV0FBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0Esd0NBQUE7QUFSTjtBQVdJO0VBQ0UsOEJBQUE7RUFDQSxtQkFBQTtBQVROO0FBYUU7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EscUJBQUE7QUFYSjtBQWFJO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQ0FBQTtBQVhOO0FBYU07RUFDRSxlQUFBO0FBWFI7QUFpQkk7RUFDRSwrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQWZOOztBQW9CQTtFQUNFLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFqQkY7QUFtQkU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSwyQkFBQTtBQWpCSjtBQW1CSTtFQUNFLCtCQUFBO0FBakJOO0FBb0JJO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQWxCTjs7QUF1QkE7RUFDRSx5QkFBQTtBQXBCRjtBQXNCRTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxrQ0FBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7QUFwQko7QUFzQkk7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBcEJOO0FBdUJJO0VBQ0UsT0FBQTtBQXJCTjtBQXVCTTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0EsY0FBQTtBQXJCUjtBQXVCUTtFQUNFLCtCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtBQXJCVjtBQXVCVTtFQUNFLDBCQUFBO0FBckJaO0FBNEJFO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBMUJKOztBQThCQTtFQUNFLGdCQUFBO0FBM0JGO0FBNkJFO0VBQ0UsU0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0FBM0JKOztBQWdDQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7QUE3QkY7O0FBZ0NBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLDZCQUFBO0FBN0JGO0FBK0JFO0VBQ0UsWUFBQTtBQTdCSjs7QUFpQ0E7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUE5QkY7O0FBaUNBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FBOUJGOztBQWlDQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBOUJGOztBQWlDQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGNBQUE7QUE5QkY7O0FBa0NBO0VBQ0U7SUFDRSxnQkFBQTtJQUNBLHVCQUFBO0lBQ0EsU0FBQTtJQUNBLFVBQUE7RUEvQkY7RUFrQ0E7SUFDRSxxQkFBQTtJQUNBLG1CQUFBO0VBaENGO0FBQ0Y7QUFDQSx3bVJBQXdtUiIsInNvdXJjZXNDb250ZW50IjpbIi5hdXRoLWNhcmQge1xuICBtYXgtd2lkdGg6IDQwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG5cbi5hdXRoLWhlYWRlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB9XG5cbiAgcCB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG4uYXV0aC1mb3JtIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgcGFkZGluZzogMC41cmVtO1xuXG4gIGlvbi1pdGVtIHtcbiAgICAtLWJhY2tncm91bmQ6IHdoaXRlO1xuICAgIC0tYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAtLWJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAtLWhpZ2hsaWdodC1oZWlnaHQ6IDA7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDhweDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gICAgbWFyZ2luOiAwIDRweCAxNnB4IDRweDtcblxuICAgICYuaW9uLWludmFsaWQge1xuICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIH1cblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cblxuICAgIGlvbi1pbnB1dCB7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAtLXBsYWNlaG9sZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gIH1cblxuICBpb24tbm90ZSB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIG1hcmdpbjogNHB4IDhweDtcbiAgfVxufVxuXG4uYXV0aC1hY3Rpb25zIHtcbiAgbWFyZ2luOiAxLjVyZW0gMDtcblxuICBpb24tYnV0dG9uIHtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLmF1dGgtZm9vdGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gIC5kaXZpZGVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbjogMi41cmVtIDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGdhcDogMXJlbTtcblxuICAgICY6OmJlZm9yZSxcbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgZmxleDogMTtcbiAgICAgIGhlaWdodDogMXB4O1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgICB9XG5cbiAgICBzcGFuIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgfVxuICB9XG5cbiAgLnNvY2lhbC1idXR0b25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGdhcDogMXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG5cbiAgICBpb24tYnV0dG9uIHtcbiAgICAgIC0tcGFkZGluZy1zdGFydDogMDtcbiAgICAgIC0tcGFkZGluZy1lbmQ6IDA7XG4gICAgICB3aWR0aDogNDBweDtcbiAgICAgIGhlaWdodDogNDBweDtcbiAgICAgIC0tYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuXG4gICAgICBpb24taWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuYXV0aC1saW5rIHtcbiAgICBhIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgICB9XG4gIH1cbn1cblxuLnBhc3N3b3JkLXJlcXVpcmVtZW50cyB7XG4gIG1hcmdpbjogNHB4IDhweCAxMnB4O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDEzcHg7XG5cbiAgZGl2IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luOiA0cHggMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlO1xuXG4gICAgJi52YWxpZCB7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICAgIH1cblxuICAgIGlvbi1pY29uIHtcbiAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgbWluLXdpZHRoOiAxNnB4O1xuICAgIH1cbiAgfVxufVxuXG4udGVybXMtc2VjdGlvbiB7XG4gIG1hcmdpbjogMjBweCA0cHggMTZweCA0cHg7XG4gIFxuICAudGVybXMtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gICAgXG4gICAgaW9uLWNoZWNrYm94IHtcbiAgICAgIG1hcmdpbi1yaWdodDogMTRweDtcbiAgICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cbiAgICBcbiAgICAudGVybXMtdGV4dCB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgXG4gICAgICBzcGFuIHtcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgXG4gICAgICAgIGEge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgXG4gICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC50ZXJtcy1lcnJvciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luOiA4cHggMTZweCAwO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG59XG5cbmlvbi1pdGVtIHtcbiAgLS1wYWRkaW5nLWVuZDogMDtcblxuICBpb24tYnV0dG9uW3Nsb3Q9XCJlbmRcIl0ge1xuICAgIG1hcmdpbjogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLS1wYWRkaW5nLWVuZDogNHB4O1xuICAgIC0tcGFkZGluZy1zdGFydDogNHB4O1xuICB9XG59XG5cbi8vIExvZ28gc3R5bGVzXG5pb24tdG9vbGJhciB7XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbn1cblxuLmxvZ28tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlO1xuXG4gICY6aG92ZXIge1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxufVxuXG4uZm9vdGJhbGwtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLmxvZ28tdGV4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5sb2dvLXNvdGQge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG59XG5cbi5sb2dvLXN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4vLyBSZXNwb25zaXZlIGFkanVzdG1lbnRzXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgLmF1dGgtY2FyZCB7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIGlvbi1jb250ZW50IHtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gICAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_auth_pages_signup_signup_page_ts.js.map