(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["main"],{

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/core */ 4070);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_supabase_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/supabase.service */ 9692);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/services/auth.service */ 8010);
/* harmony import */ var _core_services_deep_link_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/services/deep-link.service */ 7097);

var _AppComponent;







class AppComponent {
  constructor(supabaseService, authService, deepLinkService, router) {
    this.supabaseService = supabaseService;
    this.authService = authService;
    this.deepLinkService = deepLinkService;
    this.router = router;
    this.isNative = _capacitor_core__WEBPACK_IMPORTED_MODULE_1__.Capacitor.isNativePlatform();
  }
  ngOnInit() {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log('🚀 App initializing...');
      // Initialize deep link service (this will set up listeners for native platforms)
      // The DeepLinkService constructor already handles initialization
      // Handle session restoration
      yield _this.initializeSession();
      console.log('✅ App initialization complete');
    })();
  }
  /**
   * Initialize session on app startup
   */
  initializeSession() {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        console.log('🔄 Initializing session...');
        // For web platform, check if there are auth tokens in the URL
        if (!_this2.isNative) {
          const hasTokensInUrl = _this2.supabaseService.hasAuthTokensInUrl();
          if (hasTokensInUrl) {
            console.log('🔗 Found auth tokens in URL, processing...');
            const success = yield _this2.supabaseService.setSessionFromUrl();
            if (success) {
              console.log('✅ Session restored from URL tokens');
              return;
            }
          }
        }
        // Check if we have an existing session
        const session = _this2.supabaseService.currentSession;
        const user = _this2.supabaseService.currentUser;
        if (session && user) {
          console.log('✅ Existing session found, user is authenticated');
          // Handle session restoration in AuthService
          yield _this2.authService.handleSessionRestoration();
        } else {
          console.log('ℹ️ No existing session found');
        }
      } catch (error) {
        console.error('❌ Error initializing session:', error);
      }
    })();
  }
  /**
   * Sync AuthService with SupabaseService state
   */
  syncAuthService() {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const user = _this3.supabaseService.currentUser;
        const profile = _this3.supabaseService.currentProfile;
        if (user && profile) {
          // Convert Supabase profile to AuthResponse format for AuthService
          const authResponse = {
            token: 'supabase-session-token',
            user: {
              id: profile.id,
              email: profile.email,
              role: profile.role,
              username: profile.username,
              firstName: profile.first_name,
              lastName: profile.last_name
            }
          };
          // Update AuthService state
          _this3.authService['currentUserSubject'].next(authResponse);
          console.log('✅ AuthService synced with Supabase session');
        }
      } catch (error) {
        console.error('❌ Error syncing AuthService:', error);
      }
    })();
  }
}
_AppComponent = AppComponent;
_AppComponent.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_supabase_service__WEBPACK_IMPORTED_MODULE_2__.SupabaseService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_deep_link_service__WEBPACK_IMPORTED_MODULE_4__.DeepLinkService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
};
_AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _AppComponent,
  selectors: [["app-root"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
  decls: 1,
  vars: 0,
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterOutlet],
  encapsulation: 2
});

/***/ }),

/***/ 289:
/*!*******************************!*\
  !*** ./src/app/app.config.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appConfig: () => (/* binding */ appConfig)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.routes */ 2181);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/services/auth.service */ 8010);
/* harmony import */ var _core_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/interceptors/error.interceptor */ 9446);
/* harmony import */ var _core_services_cross_platform_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/services/cross-platform-storage.service */ 1220);
/* harmony import */ var _core_services_deep_link_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/services/deep-link.service */ 7097);









const appConfig = {
  providers: [(0,_angular_router__WEBPACK_IMPORTED_MODULE_5__.provideRouter)(_app_routes__WEBPACK_IMPORTED_MODULE_0__.routes), (0,_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.provideHttpClient)(), (0,_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.provideIonicAngular)(), _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService, _core_services_cross_platform_storage_service__WEBPACK_IMPORTED_MODULE_3__.CrossPlatformStorageService, _core_services_deep_link_service__WEBPACK_IMPORTED_MODULE_4__.DeepLinkService, {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HTTP_INTERCEPTORS,
    useClass: _core_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_2__.ErrorInterceptor,
    multi: true
  }]
};

/***/ }),

/***/ 2181:
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/guards/auth.guard */ 4978);
/* harmony import */ var _debug_auth_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug-auth.page */ 6799);


const routes = [{
  path: 'debug-auth',
  component: _debug_auth_page__WEBPACK_IMPORTED_MODULE_1__.DebugAuthPage
}, {
  path: 'welcome',
  canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.NoAuthGuard],
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_platforms_welcome_welcome_routes_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./platforms/welcome/welcome.routes */ 396)).then(m => m.routes)
}, {
  path: 'auth',
  canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.NoAuthGuard],
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_platforms_auth_auth_routes_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./platforms/auth/auth.routes */ 1862)).then(m => m.routes)
}, {
  path: 'player',
  canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    expectedRole: 'player'
  },
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_platforms_player_player_routes_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./platforms/player/player.routes */ 3276)).then(m => m.routes)
}, {
  path: 'group-admin',
  canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    expectedRole: 'group-admin'
  },
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("src_app_platforms_group-admin_group-admin_routes_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./platforms/group-admin/group-admin.routes */ 5476)).then(m => m.routes)
},
// Super-admin routes - split into public and protected
{
  path: 'super-admin',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("src_app_platforms_super-admin_super-admin_routes_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./platforms/super-admin/super-admin.routes */ 6680)).then(m => m.routes)
}, {
  path: '',
  redirectTo: 'welcome',
  pathMatch: 'full'
},
// Fallback route for any unmatched paths
{
  path: '**',
  redirectTo: 'auth/login'
}];

/***/ }),

/***/ 4978:
/*!*******************************************!*\
  !*** ./src/app/core/guards/auth.guard.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuard: () => (/* binding */ AuthGuard),
/* harmony export */   NoAuthGuard: () => (/* binding */ NoAuthGuard)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 4334);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 8010);
var _AuthGuard, _NoAuthGuard;




class AuthGuard {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }
  getLoginRoute(expectedRole) {
    switch (expectedRole) {
      case 'super-admin':
        return '/super-admin/login';
      default:
        return '/auth/login';
    }
  }
  canActivate(route) {
    return this.authService.currentUser.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(authResponse => {
      try {
        var _route$data;
        // Get expected role from route data
        const expectedRole = (_route$data = route.data) === null || _route$data === void 0 ? void 0 : _route$data['expectedRole'];
        // Check if user is authenticated using the reactive state
        if (!authResponse || !authResponse.user) {
          const loginRoute = this.getLoginRoute(expectedRole);
          this.router.navigate([loginRoute]);
          return false;
        }
        // Get user role from the auth response
        const userRole = authResponse.user.role;
        // If no expected role is specified, just check if user is authenticated
        if (!expectedRole) {
          return true;
        }
        // Check if user role matches expected role
        if (userRole === expectedRole) {
          return true;
        }
        // Role mismatch - redirect to appropriate login
        const loginRoute = this.getLoginRoute(expectedRole);
        this.router.navigate([loginRoute]);
        return false;
      } catch (error) {
        var _route$data2;
        // Error parsing user data - redirect to default login
        const loginRoute = this.getLoginRoute((_route$data2 = route.data) === null || _route$data2 === void 0 ? void 0 : _route$data2['expectedRole']);
        console.error('AuthGuard: Error getting user data, redirecting to login:', error);
        this.router.navigate([loginRoute]);
        return false;
      }
    }));
  }
}
_AuthGuard = AuthGuard;
_AuthGuard.ɵfac = function AuthGuard_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
};
_AuthGuard.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _AuthGuard,
  factory: _AuthGuard.ɵfac,
  providedIn: 'root'
});
class NoAuthGuard {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }
  canActivate(route) {
    return this.authService.currentUser.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(authResponse => {
      try {
        var _route$routeConfig;
        // Special case: Allow access to reset-password page even for authenticated users
        if (((_route$routeConfig = route.routeConfig) === null || _route$routeConfig === void 0 ? void 0 : _route$routeConfig.path) === 'reset-password') {
          return true;
        }
        // Also check the full URL path for reset-password
        const currentUrl = this.router.url;
        if (currentUrl.includes('reset-password')) {
          return true;
        }
        if (!authResponse || !authResponse.user) {
          return true; // No authenticated user, allow access to public routes
        }
        // User is authenticated, redirect to their appropriate route
        const userRole = authResponse.user.role;
        // For Supabase users, we'll use the first-time route logic from AuthService
        // Check if this is a first login by looking at the user data
        const isFirstLogin = this.authService.isFirstTimeUser();
        if (isFirstLogin) {
          // First time user - redirect to first-time routes
          switch (userRole) {
            case 'super-admin':
              this.router.navigate(['/super-admin/dashboard']);
              break;
            case 'group-admin':
              this.router.navigate(['/group-admin/groups']);
              break;
            case 'player':
              this.router.navigate(['/player/join-group']);
              break;
            default:
              this.router.navigate(['/welcome']);
          }
        } else {
          // Returning user - redirect to dashboard
          switch (userRole) {
            case 'super-admin':
              this.router.navigate(['/super-admin/dashboard']);
              break;
            case 'group-admin':
              this.router.navigate(['/group-admin/dashboard']);
              break;
            case 'player':
              this.router.navigate(['/player/dashboard']);
              break;
            default:
              this.router.navigate(['/welcome']);
          }
        }
        return false;
      } catch (error) {
        console.error('NoAuthGuard: Error getting user data:', error);
        return true; // Allow access to public routes if there's an error
      }
    }));
  }
}
_NoAuthGuard = NoAuthGuard;
_NoAuthGuard.ɵfac = function NoAuthGuard_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NoAuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
};
_NoAuthGuard.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _NoAuthGuard,
  factory: _NoAuthGuard.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 9446:
/*!********************************************************!*\
  !*** ./src/app/core/interceptors/error.interceptor.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorInterceptor: () => (/* binding */ ErrorInterceptor)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 7919);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
var _ErrorInterceptor;




class ErrorInterceptor {
  constructor(router) {
    this.router = router;
  }
  intercept(request, next) {
    return next.handle(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.catchError)(error => {
      if (error.status === 0) {
        // Backend is unreachable
        console.error('Backend service is unavailable');
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)(() => error);
    }));
  }
}
_ErrorInterceptor = ErrorInterceptor;
_ErrorInterceptor.ɵfac = function ErrorInterceptor_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ErrorInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
};
_ErrorInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _ErrorInterceptor,
  factory: _ErrorInterceptor.ɵfac
});

/***/ }),

/***/ 8010:
/*!***********************************************!*\
  !*** ./src/app/core/services/auth.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 4334);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _services_supabase_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/supabase.service */ 9692);

var _AuthService;






// Storage Keys - Centralized for easy management
const STORAGE_KEYS = {
  CURRENT_USER: 'sotd_current_user',
  LAST_ACTIVITY: 'sotd_lastActivity',
  SESSION_ID: 'sotd_session_id',
  USE_SUPABASE: 'useSupabase' // Toggle between mock and Supabase
};
// Session management constants
const SESSION_STORAGE_KEY = 'sotd_session_sync';
const SESSION_CHECK_INTERVAL = 5000; // Check every 5 seconds for cross-tab sync (less aggressive)
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
class AuthService {
  constructor(http, supabaseService) {
    this.http = http;
    this.supabaseService = supabaseService;
    this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl;
    this.currentSessionId = '';
    this.loginAttempts = new Map();
    this.useSupabase = true; // Default to Supabase
    this.sessionRestorationInProgress = false;
    this.isInitialized = false;
    this.isHandlingCrossTabEvent = false; // Prevent infinite loops
    this.loginInProgress = false; // Track active login process
    this.lastBroadcastTime = 0; // Throttle broadcasts
    this.BROADCAST_THROTTLE_MS = 1000; // Minimum 1 second between broadcasts
    // Generate unique session ID for this tab
    this.currentSessionId = this.generateSessionId();
    this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null);
    this.currentUser = this.currentUserSubject.asObservable();
    // Initialize auth system
    this.initializeAuth();
  }
  // Cleanup resources
  ngOnDestroy() {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
    }
    if (this.crossTabTimer) {
      clearInterval(this.crossTabTimer);
    }
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }
  // Quick debug method to force complete first login for current user (callable from console)
  debugForceCompleteFirstLogin() {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log('🔧 Debug: Force completing first login for current user...');
      try {
        yield _this.markFirstLoginComplete();
        console.log('✅ Debug: First login completion attempted');
        // Wait and check again
        setTimeout(() => {
          const isFirstTime = _this.isFirstTimeUser();
          console.log('🔍 Debug: After forced completion, isFirstTimeUser:', isFirstTime);
        }, 2000);
      } catch (error) {
        console.error('❌ Debug: Error forcing first login completion:', error);
      }
    })();
  }
  // Debug method to manually clear auth locks
  debugClearAuthLocks() {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log('🔧 Debug: Manually clearing auth locks...');
      try {
        // Access the private method through the supabase service
        yield _this2.supabaseService.clearAuthLocks();
        console.log('✅ Debug: Auth locks clearing attempted');
      } catch (error) {
        console.error('❌ Debug: Error clearing auth locks:', error);
      }
    })();
  }
  initializeAuth() {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.isInitialized) return;
      console.log('🔄 AuthService: Initializing auth system...');
      try {
        // Check if we should use Supabase (default to true)
        _this3.useSupabase = localStorage.getItem(STORAGE_KEYS.USE_SUPABASE) !== 'false';
        if (_this3.useSupabase) {
          localStorage.setItem(STORAGE_KEYS.USE_SUPABASE, 'true');
        }
        // Store session ID for cross-tab communication
        localStorage.setItem(STORAGE_KEYS.SESSION_ID, _this3.currentSessionId);
        if (_this3.useSupabase) {
          yield _this3.initializeSupabaseAuth();
        } else {
          _this3.initializeSessionTimer();
        }
        // Initialize cross-tab session synchronization
        _this3.initializeCrossTabSync();
        // Check for existing session
        yield _this3.restoreSession();
        _this3.isInitialized = true;
        console.log('✅ AuthService: Auth system initialized');
      } catch (error) {
        console.error('❌ AuthService: Failed to initialize auth system:', error);
        _this3.isInitialized = true; // Still mark as initialized to prevent retry loops
      }
    })();
  }
  initializeSupabaseAuth() {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Subscribe to Supabase auth state changes
      _this4.supabaseService.user$.subscribe(user => {
        _this4.handleSupabaseAuthStateChange(user);
      });
    })();
  }
  handleSupabaseAuthStateChange(user) {
    var _this5 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (user) {
        _this5.sessionRestorationInProgress = true;
        try {
          // Get profile data
          _this5.supabaseService.profile$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe(profile => {
            if (profile) {
              const authResponse = {
                token: `supabase-session-${Date.now()}`,
                user: {
                  id: profile.id,
                  email: profile.email,
                  role: profile.role,
                  username: profile.username,
                  firstName: profile.first_name,
                  lastName: profile.last_name
                }
              };
              _this5.setAuthenticatedUser(authResponse);
              console.log('✅ AuthService: User session restored', {
                userId: user.id,
                role: profile.role,
                firstLogin: profile.first_login
              });
            }
            _this5.sessionRestorationInProgress = false;
          });
        } catch (error) {
          console.error('❌ AuthService: Error handling auth state change:', error);
          _this5.sessionRestorationInProgress = false;
        }
      } else {
        // User logged out - clear session silently if not in an active login/restore process
        if (!_this5.sessionRestorationInProgress && !_this5.loginInProgress) {
          _this5.clearAuthenticatedUserInternal();
          console.log('ℹ️ AuthService: User session cleared');
        }
      }
    })();
  }
  // Enable Supabase authentication
  enableSupabaseAuth() {
    this.useSupabase = true;
    localStorage.setItem(STORAGE_KEYS.USE_SUPABASE, 'true');
  }
  // Disable Supabase authentication (for development)
  disableSupabaseAuth() {
    this.useSupabase = false;
    localStorage.setItem(STORAGE_KEYS.USE_SUPABASE, 'false');
  }
  // Session ID generation for cross-tab sync
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  // Cross-tab session synchronization
  initializeCrossTabSync() {
    // Listen for storage changes from other tabs
    window.addEventListener('storage', this.handleStorageChange.bind(this));
    // Periodically check for session changes
    this.crossTabTimer = setInterval(() => {
      this.checkCrossTabSession();
    }, SESSION_CHECK_INTERVAL);
  }
  handleStorageChange(event) {
    if (event.key === SESSION_STORAGE_KEY && !this.isHandlingCrossTabEvent) {
      const sessionData = event.newValue;
      if (sessionData) {
        try {
          const {
            action,
            sessionId
          } = JSON.parse(sessionData);
          // Ignore events from this tab
          if (sessionId === this.currentSessionId) return;
          // Set flag to prevent recursive calls
          this.isHandlingCrossTabEvent = true;
          switch (action) {
            case 'login':
              console.log('🔄 AuthService: Cross-tab login detected');
              this.restoreSession();
              break;
            case 'logout':
              console.log('🔄 AuthService: Cross-tab logout detected');
              // Clear local state without broadcasting to prevent loops
              this.clearAuthenticatedUserInternal();
              break;
          }
        } catch (error) {
          console.error('❌ AuthService: Error parsing cross-tab session data:', error);
        } finally {
          // Clear flag after a short delay
          setTimeout(() => {
            this.isHandlingCrossTabEvent = false;
          }, 100);
        }
      }
    }
  }
  checkCrossTabSession() {
    // Skip if already handling cross-tab events to prevent loops
    if (this.isHandlingCrossTabEvent || this.loginInProgress) return;
    const currentUser = this.currentUserValue;
    const storedUser = this.getStoredUser();
    // Check if session state differs between tabs
    if (!currentUser && storedUser) {
      console.log('🔄 AuthService: Session found in storage, restoring...');
      this.sessionRestorationInProgress = true;
      this.currentUserSubject.next(storedUser);
      this.sessionRestorationInProgress = false;
    } else if (currentUser && !storedUser) {
      console.log('🔄 AuthService: Session cleared in storage, clearing local...');
      this.currentUserSubject.next(null);
    }
    // If both are the same, do nothing (no need to log every time)
  }
  // Centralized session management
  setAuthenticatedUser(authResponse) {
    var _currentUser$user;
    // Check if this is the same user to prevent duplicate broadcasts
    const currentUser = this.currentUserValue;
    const isSameUser = (currentUser === null || currentUser === void 0 || (_currentUser$user = currentUser.user) === null || _currentUser$user === void 0 ? void 0 : _currentUser$user.id) === authResponse.user.id;
    // Check if user data has actually changed
    const userDataChanged = !currentUser || currentUser.user.id !== authResponse.user.id || currentUser.user.email !== authResponse.user.email || currentUser.user.role !== authResponse.user.role;
    // Update reactive state
    this.currentUserSubject.next(authResponse);
    // Store in localStorage
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(authResponse));
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
    // Only broadcast if this is a genuinely new/different user login (not session restoration)
    if (userDataChanged && !this.sessionRestorationInProgress && !this.loginInProgress) {
      this.broadcastSessionChange('login');
      console.log('📡 AuthService: Broadcasting new user login');
    } else {
      console.log('ℹ️ AuthService: Skipping broadcast - user data unchanged or in progress');
    }
    console.log('✅ AuthService: User authenticated and session stored');
  }
  clearAuthenticatedUser() {
    // Clear reactive state first
    this.currentUserSubject.next(null);
    // Clear all session storage
    this.clearUserStorage();
    // Notify other tabs (only if not handling cross-tab event)
    if (!this.isHandlingCrossTabEvent) {
      this.broadcastSessionChange('logout');
    }
    console.log('✅ AuthService: User session cleared completely');
  }
  // Internal method that clears user without broadcasting (for cross-tab events)
  clearAuthenticatedUserInternal() {
    // Clear reactive state first
    this.currentUserSubject.next(null);
    // Clear all session storage
    this.clearUserStorage();
    // Do NOT broadcast to prevent loops
    console.log('✅ AuthService: User session cleared internally (cross-tab)');
  }
  broadcastSessionChange(action) {
    // Don't broadcast if we're handling a cross-tab event
    if (this.isHandlingCrossTabEvent) return;
    // Throttle broadcasts to prevent spam
    const now = Date.now();
    if (now - this.lastBroadcastTime < this.BROADCAST_THROTTLE_MS) {
      console.log(`⏱️ AuthService: Throttling ${action} broadcast (too soon)`);
      return;
    }
    this.lastBroadcastTime = now;
    const sessionData = {
      action,
      sessionId: this.currentSessionId,
      timestamp: Date.now()
    };
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
      console.log(`📡 AuthService: Broadcasting ${action} to other tabs`);
      // Clean up broadcast data after a short delay
      setTimeout(() => {
        try {
          const currentData = localStorage.getItem(SESSION_STORAGE_KEY);
          if (currentData === JSON.stringify(sessionData)) {
            localStorage.removeItem(SESSION_STORAGE_KEY);
          }
        } catch (error) {
          // Ignore cleanup errors
        }
      }, 500);
    } catch (error) {
      console.error('❌ AuthService: Error broadcasting session change:', error);
    }
  }
  clearUserStorage() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.LAST_ACTIVITY);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    // Clean up any legacy storage keys
    const legacyKeys = ['user', 'pendingUserData', 'isFirstLogin'];
    legacyKeys.forEach(key => localStorage.removeItem(key));
    // Clean up any pending signup data
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('pending') || key.startsWith('sotd_temp_')) {
        localStorage.removeItem(key);
      }
    });
  }
  restoreSession() {
    var _this6 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const storedUser = _this6.getStoredUser();
        if (storedUser && _this6.isSessionValid()) {
          _this6.currentUserSubject.next(storedUser);
          console.log('✅ AuthService: Session restored successfully');
        } else {
          console.log('ℹ️ AuthService: No valid session to restore');
        }
      } catch (error) {
        console.error('❌ AuthService: Error restoring session:', error);
      }
    })();
  }
  isSessionValid() {
    const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
    if (!lastActivity) return false;
    const timeSinceLastActivity = Date.now() - Number(lastActivity);
    return timeSinceLastActivity <= SESSION_TIMEOUT;
  }
  getStoredUser() {
    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!storedUser) return null;
    try {
      const user = JSON.parse(storedUser);
      const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
      if (lastActivity && Date.now() - Number(lastActivity) > SESSION_TIMEOUT) {
        this.clearUserStorage();
        return null;
      }
      // Ensure the stored user has the correct AuthResponse structure
      if (user && user.user && user.token) {
        return user;
      }
      // If it's in the old User format, convert it to AuthResponse format
      if (user && user.role && !user.user) {
        return {
          token: 'mock-jwt-token',
          user: {
            id: user.id || 'mock-id',
            email: user.email || 'mock@example.com',
            role: user.role,
            username: user.username || 'User',
            firstName: user.firstName || 'Unknown',
            lastName: user.lastName || 'User'
          }
        };
      }
      return null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      this.clearUserStorage();
      return null;
    }
  }
  initializeSessionTimer() {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
    }
    this.sessionTimer = setInterval(() => {
      const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
      if (lastActivity && Date.now() - Number(lastActivity) > SESSION_TIMEOUT) {
        this.logout();
      }
    }, 60000); // Check every minute
  }
  updateLastActivity() {
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
  }
  checkLoginAttempts(email) {
    const attempts = this.loginAttempts.get(email);
    if (attempts !== null && attempts !== void 0 && attempts.lockoutUntil && Date.now() < attempts.lockoutUntil) {
      throw new Error(`Account locked. Try again after ${new Date(attempts.lockoutUntil).toLocaleTimeString()}`);
    }
    const attemptCount = (attempts === null || attempts === void 0 ? void 0 : attempts.count) || 0;
    if (attemptCount >= MAX_LOGIN_ATTEMPTS) {
      const lockoutUntil = Date.now() + LOCKOUT_DURATION;
      this.loginAttempts.set(email, {
        count: 0,
        lockoutUntil
      });
      throw new Error(`Too many login attempts. Account locked until ${new Date(lockoutUntil).toLocaleTimeString()}`);
    }
    return true;
  }
  get currentUserValue() {
    return this.currentUserSubject.value;
  }
  login(loginData) {
    if (this.useSupabase) {
      return this.loginWithSupabase(loginData);
    } else {
      return this.loginWithMock(loginData);
    }
  }
  loginWithSupabase(loginData) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_5__.Observable(subscriber => {
      // First, check if user is already authenticated
      const currentUser = this.currentUserValue;
      if (currentUser && currentUser.user.email === loginData.email) {
        console.log('✅ AuthService: User already authenticated, skipping login');
        subscriber.next(currentUser);
        subscriber.complete();
        return;
      }
      // Check if there's an existing Supabase session
      const supabaseUser = this.supabaseService.currentUser;
      if (supabaseUser && supabaseUser.email === loginData.email) {
        console.log('✅ AuthService: Found existing Supabase session, using it');
        this.handleExistingSupabaseSession(supabaseUser, subscriber);
        return;
      }
      // If session restoration is in progress, wait for it
      if (this.sessionRestorationInProgress) {
        console.log('⏳ AuthService: Session restoration in progress, waiting...');
        const checkInterval = setInterval(() => {
          if (!this.sessionRestorationInProgress) {
            clearInterval(checkInterval);
            const restoredUser = this.currentUserValue;
            if (restoredUser && restoredUser.user.email === loginData.email) {
              console.log('✅ AuthService: Session restoration completed, using restored user');
              subscriber.next(restoredUser);
              subscriber.complete();
              return;
            }
          }
        }, 100);
        // Fallback timeout for session restoration
        setTimeout(() => {
          clearInterval(checkInterval);
          if (this.sessionRestorationInProgress) {
            console.log('⚠️ AuthService: Session restoration timeout, proceeding with manual login');
            this.performSupabaseLogin(loginData, subscriber);
          }
        }, 5000);
        return;
      }
      // Proceed with manual login
      this.performSupabaseLogin(loginData, subscriber);
    });
  }
  handleExistingSupabaseSession(supabaseUser, subscriber) {
    var _this7 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        console.log('🔍 AuthService: Handling existing Supabase session...');
        // Get profile data for the existing user
        const profileResult = yield _this7.supabaseService.client.from('profiles').select('*').eq('id', supabaseUser.id).single();
        if (profileResult.error) {
          var _supabaseUser$email;
          console.log('⚠️ Profile not found for existing user, creating fallback profile');
          const userMetadata = supabaseUser.user_metadata || {};
          const fallbackResponse = {
            token: 'existing-session-token',
            user: {
              id: supabaseUser.id,
              email: supabaseUser.email || 'unknown@example.com',
              role: userMetadata.role || 'player',
              username: userMetadata.username || ((_supabaseUser$email = supabaseUser.email) === null || _supabaseUser$email === void 0 ? void 0 : _supabaseUser$email.split('@')[0]) || 'user',
              firstName: userMetadata.first_name || 'User',
              lastName: userMetadata.last_name || 'User'
            }
          };
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(fallbackResponse));
          _this7.currentUserSubject.next(fallbackResponse);
          subscriber.next(fallbackResponse);
          subscriber.complete();
          return;
        }
        const profile = profileResult.data;
        const authResponse = {
          token: 'existing-session-token',
          user: {
            id: profile.id,
            email: profile.email,
            role: profile.role,
            username: profile.username,
            firstName: profile.first_name,
            lastName: profile.last_name
          }
        };
        _this7.setAuthenticatedUser(authResponse);
        subscriber.next(authResponse);
        subscriber.complete();
      } catch (error) {
        console.error('❌ Error handling existing Supabase session:', error);
        subscriber.error(error);
      }
    })();
  }
  performSupabaseLogin(loginData, subscriber) {
    var _this8 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        console.log('🔍 AuthService: Starting Supabase login...');
        _this8.loginInProgress = true;
        // Clear any existing session state silently (without cross-tab broadcast)
        _this8.clearAuthenticatedUserInternal();
        console.log('🔍 AuthService: Calling supabaseService.signIn...');
        // Add timeout wrapper to prevent hanging on NavigatorLockAcquireTimeoutError
        const signInPromise = _this8.supabaseService.signIn(loginData.email, loginData.password);
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('SignIn timeout')), 45000); // 45 second timeout to account for lock clearing
        });
        let result;
        try {
          var _result$user;
          result = yield Promise.race([signInPromise, timeoutPromise]);
          console.log('✅ AuthService: Supabase signIn completed:', result);
          console.log('🔍 AuthService: About to fetch profile for user:', (_result$user = result.user) === null || _result$user === void 0 ? void 0 : _result$user.id);
        } catch (signInError) {
          console.error('❌ AuthService: SignIn failed or timed out:', signInError);
          _this8.loginInProgress = false;
          // Don't create fallback response - let the error propagate
          subscriber.error(signInError);
          return;
        }
        // Create AuthResponse directly from Supabase result
        if (result.user && result.session) {
          // Fetch profile data directly from Supabase
          try {
            console.log('🔍 AuthService: Fetching profile from database...');
            const profileResult = yield _this8.supabaseService.client.from('profiles').select('*').eq('id', result.user.id).single();
            console.log('🔍 AuthService: Profile fetch result:', profileResult);
            if (profileResult.error) {
              console.log('⚠️ Profile not found for new user, creating fallback profile');
              // For new users without profiles, create a fallback response
              // Try to get username from user metadata first, then fallback to email prefix
              const userMetadata = result.user.user_metadata || {};
              const username = userMetadata.username || (result.user.email ? result.user.email.split('@')[0] : 'user');
              const firstName = userMetadata.first_name || 'User';
              const lastName = userMetadata.last_name || 'User';
              const role = userMetadata.role || 'player';
              const fallbackResponse = {
                token: result.session.access_token,
                user: {
                  id: result.user.id,
                  email: result.user.email || 'unknown@example.com',
                  role: role,
                  username: username,
                  firstName: firstName,
                  lastName: lastName
                }
              };
              // Store in localStorage for consistency
              localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(fallbackResponse));
              // Update reactive state
              _this8.currentUserSubject.next(fallbackResponse);
              subscriber.next(fallbackResponse);
              subscriber.complete();
              return;
            }
            const profile = profileResult.data;
            if (profile) {
              const authResponse = {
                token: result.session.access_token,
                user: {
                  id: profile.id,
                  email: profile.email,
                  role: profile.role,
                  username: profile.username,
                  firstName: profile.first_name,
                  lastName: profile.last_name
                }
              };
              // Store authenticated user with cross-tab sync
              _this8.setAuthenticatedUser(authResponse);
              _this8.loginInProgress = false;
              subscriber.next(authResponse);
              subscriber.complete();
            } else {
              console.log('⚠️ No profile data found, creating fallback profile');
              // Fallback for users with no profile data
              // Try to get username from user metadata first, then fallback to email prefix
              const userMetadata = result.user.user_metadata || {};
              const username = userMetadata.username || (result.user.email ? result.user.email.split('@')[0] : 'user');
              const firstName = userMetadata.first_name || 'User';
              const lastName = userMetadata.last_name || 'User';
              const role = userMetadata.role || 'player';
              const fallbackResponse = {
                token: result.session.access_token,
                user: {
                  id: result.user.id,
                  email: result.user.email || 'unknown@example.com',
                  role: role,
                  username: username,
                  firstName: firstName,
                  lastName: lastName
                }
              };
              localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(fallbackResponse));
              _this8.currentUserSubject.next(fallbackResponse);
              _this8.loginInProgress = false;
              subscriber.next(fallbackResponse);
              subscriber.complete();
            }
          } catch (error) {
            console.error('❌ Error fetching profile:', error);
            console.log('🔍 AuthService: Creating fallback profile due to fetch error');
            // Create fallback profile when profile fetch fails
            const userMetadata = result.user.user_metadata || {};
            const username = userMetadata.username || (result.user.email ? result.user.email.split('@')[0] : 'user');
            const firstName = userMetadata.first_name || 'User';
            const lastName = userMetadata.last_name || 'User';
            const role = userMetadata.role || 'player';
            const fallbackResponse = {
              token: result.session.access_token,
              user: {
                id: result.user.id,
                email: result.user.email || 'unknown@example.com',
                role: role,
                username: username,
                firstName: firstName,
                lastName: lastName
              }
            };
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(fallbackResponse));
            _this8.currentUserSubject.next(fallbackResponse);
            _this8.loginInProgress = false;
            subscriber.next(fallbackResponse);
            subscriber.complete();
          }
        } else {
          console.error('❌ Invalid Supabase login result');
          _this8.loginInProgress = false;
          subscriber.error(new Error('Invalid login result'));
        }
      } catch (error) {
        console.error('❌ Supabase login failed:', error);
        _this8.loginInProgress = false;
        subscriber.error(error);
      }
    })();
  }
  loginWithMock(loginData) {
    // For mock purposes, try to determine user data from stored signup data or use defaults
    let userRole = 'player';
    let username = 'User';
    let firstName = 'John';
    let lastName = 'Doe';
    // Check if we have stored user information from signup
    const storedRole = localStorage.getItem(`pendingRole_${loginData.email}`);
    const storedUsername = localStorage.getItem(`pendingUsername_${loginData.email}`);
    const storedFirstName = localStorage.getItem(`pendingFirstName_${loginData.email}`);
    const storedLastName = localStorage.getItem(`pendingLastName_${loginData.email}`);
    if (storedRole && ['player', 'group-admin', 'super-admin'].includes(storedRole)) {
      userRole = storedRole;
    }
    if (storedUsername) {
      username = storedUsername;
    }
    if (storedFirstName) {
      firstName = storedFirstName;
    }
    if (storedLastName) {
      lastName = storedLastName;
    }
    // Mock response for frontend development
    const mockResponse = {
      token: 'mock-jwt-token',
      user: {
        id: `user_${loginData.email.replace(/[^a-zA-Z0-9]/g, '_')}`,
        email: loginData.email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        role: userRole
      }
    };
    // Return mock response
    return new rxjs__WEBPACK_IMPORTED_MODULE_5__.Observable(subscriber => {
      setTimeout(() => {
        // Store in legacy format for compatibility
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(mockResponse));
        localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
        // Store in new format for AuthGuard
        const hasCompletedFirstLogin = localStorage.getItem(`firstLoginComplete_${mockResponse.user.email}`) === 'true';
        const isFirstLogin = !hasCompletedFirstLogin;
        // User object for mock login tracking
        const userForMock = {
          id: mockResponse.user.id,
          role: mockResponse.user.role,
          firstLogin: isFirstLogin,
          username: username,
          firstName: mockResponse.user.firstName,
          lastName: mockResponse.user.lastName,
          email: mockResponse.user.email
        };
        console.log('🔍 AuthService: Mock user created:', userForMock);
        // User is automatically stored via setAuthenticatedUser in Supabase flow
        console.log('ℹ️ AuthService: User registration completed');
        // Clean up the temporary signup storage after successful login
        localStorage.removeItem(`pendingRole_${loginData.email}`);
        localStorage.removeItem(`pendingUsername_${loginData.email}`);
        localStorage.removeItem(`pendingFirstName_${loginData.email}`);
        localStorage.removeItem(`pendingLastName_${loginData.email}`);
        this.currentUserSubject.next(mockResponse);
        subscriber.next(mockResponse);
        subscriber.complete();
      }, 500); // Simulate network delay
    });
  }
  signup(userData) {
    if (this.useSupabase) {
      return this.signupWithSupabase(userData);
    } else {
      return this.signupWithMock(userData);
    }
  }
  signupWithSupabase(userData) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_5__.Observable(subscriber => {
      this.supabaseService.signUp(userData.email, userData.password, {
        role: userData.role,
        username: userData.username || '',
        first_name: userData.firstName,
        last_name: userData.lastName
      }).then(result => {
        var _result$user2;
        // Create mock AuthResponse for consistency
        const authResponse = {
          token: 'supabase-signup-token',
          user: {
            id: ((_result$user2 = result.user) === null || _result$user2 === void 0 ? void 0 : _result$user2.id) || 'temp-id',
            email: userData.email,
            role: userData.role,
            username: userData.username || '',
            firstName: userData.firstName,
            lastName: userData.lastName
          }
        };
        subscriber.next(authResponse);
        subscriber.complete();
      }).catch(error => {
        console.error('Supabase signup failed:', error);
        subscriber.error(error);
      });
    });
  }
  signupWithMock(userData) {
    // Store the role and username temporarily for login (mock behavior)
    localStorage.setItem(`pendingRole_${userData.email}`, userData.role);
    localStorage.setItem(`pendingUsername_${userData.email}`, userData.username || '');
    localStorage.setItem(`pendingFirstName_${userData.email}`, userData.firstName);
    localStorage.setItem(`pendingLastName_${userData.email}`, userData.lastName);
    // Mock response for frontend development
    const mockResponse = {
      token: 'mock-jwt-token',
      user: {
        id: `user_${userData.email.replace(/[^a-zA-Z0-9]/g, '_')}`,
        email: userData.email,
        role: userData.role,
        username: userData.username || '',
        firstName: userData.firstName,
        lastName: userData.lastName
      }
    };
    // Return mock response - just return success without storing
    return new rxjs__WEBPACK_IMPORTED_MODULE_5__.Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(mockResponse);
        subscriber.complete();
      }, 500); // Simulate network delay
    });
  }
  logout() {
    console.log('🔄 AuthService: Starting logout process...');
    // Clear session timer first
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = null;
    }
    if (this.useSupabase) {
      // Clear local state immediately using the new method
      this.clearAuthenticatedUser();
      // Perform Supabase signOut with better error handling
      this.supabaseService.signOut().then(() => {
        console.log('✅ AuthService: Supabase logout completed successfully');
      }).catch(error => {
        console.warn('⚠️ AuthService: Supabase logout warning (local cleanup already done):', error.message);
        // Local cleanup already done, so this is acceptable
      });
    } else {
      this.clearAuthenticatedUser();
    }
    console.log('✅ AuthService: Logout process completed');
  }
  // Clear session and force fresh login
  clearSession() {
    console.log('🗞️ AuthService: Clearing session...');
    this.clearAuthenticatedUser();
    console.log('✅ AuthService: Session cleared');
  }
  // Silent logout without cross-tab broadcasting (for internal use)
  logoutSilent() {
    console.log('🔄 AuthService: Performing silent logout...');
    this.currentUserSubject.next(null);
    this.clearUserStorage();
    if (this.useSupabase) {
      this.supabaseService.signOut().catch(error => {
        console.error('❌ AuthService: Silent Supabase logout failed:', error);
      });
    }
    console.log('✅ AuthService: Silent logout completed');
  }
  // Method to mark first login as complete (called from first-time pages)
  markFirstLoginComplete() {
    var _this9 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log('🔄 AuthService: Marking first login as complete...');
      if (_this9.useSupabase) {
        var _currentUser$user2;
        const currentUser = _this9.currentUserValue;
        const supabaseUser = _this9.supabaseService.currentUser;
        if (!(currentUser !== null && currentUser !== void 0 && (_currentUser$user2 = currentUser.user) !== null && _currentUser$user2 !== void 0 && _currentUser$user2.id) || !(supabaseUser !== null && supabaseUser !== void 0 && supabaseUser.id)) {
          console.error('❌ AuthService: No authenticated user found');
          console.log('CurrentUser:', currentUser);
          console.log('SupabaseUser:', supabaseUser);
          throw new Error('No authenticated user found');
        }
        try {
          console.log('🔍 AuthService: Attempting to update first_login for user ID:', currentUser.user.id);
          console.log('🔍 AuthService: Supabase user ID:', supabaseUser.id);
          // Try the Supabase service method first
          yield _this9.supabaseService.markFirstLoginComplete(currentUser.user.id);
          console.log('✅ AuthService: Supabase service update completed');
          // Wait a moment for the profile observable to update
          yield new Promise(resolve => setTimeout(resolve, 500));
          // Force reload the profile from database
          yield _this9.forceReloadProfile();
          // Verify the update worked
          setTimeout(/*#__PURE__*/(0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
            yield _this9.forceReloadProfile(); // Reload again
            const profile = _this9.supabaseService.currentProfile;
            const isStillFirstTime = _this9.isFirstTimeUser();
            console.log('🔍 AuthService: After marking complete verification:');
            console.log('  - isFirstTimeUser:', isStillFirstTime);
            console.log('  - Profile first_login:', profile === null || profile === void 0 ? void 0 : profile.first_login);
            console.log('  - Profile email:', profile === null || profile === void 0 ? void 0 : profile.email);
            if (isStillFirstTime) {
              console.warn('⚠️ AuthService: First login status still shows as true - trying direct update');
              yield _this9.directUpdateFirstLoginStatus(currentUser.user.id);
            }
          }), 2000);
        } catch (error) {
          console.error('❌ AuthService: Failed to mark first login complete:', error);
          console.log('🔄 AuthService: Trying direct update method...');
          // Fallback: Try direct update (only if client is available)
          try {
            if (_this9.supabaseService.client) {
              yield _this9.directUpdateFirstLoginStatus(currentUser.user.id);
            } else {
              console.log('ℹ️ AuthService: No Supabase client available, skipping direct update');
            }
          } catch (directError) {
            console.error('❌ AuthService: Direct update also failed:', directError);
            // Don't re-throw in test environment without client
            if (_this9.supabaseService.client) {
              throw error;
            }
          }
        }
      } else {
        localStorage.setItem('isFirstLogin', 'false');
        console.log('✅ AuthService: First login marked complete in local storage');
      }
    })();
  }
  // Force reload profile from Supabase
  forceReloadProfile() {
    var _this0 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const user = _this0.supabaseService.currentUser;
      if (user !== null && user !== void 0 && user.id && _this0.supabaseService.client) {
        try {
          const {
            data: profile,
            error
          } = yield _this0.supabaseService.client.from('profiles').select('*').eq('id', user.id).single();
          if (!error && profile) {
            console.log('🔄 AuthService: Profile reloaded from database:', profile);
            console.log('🔍 AuthService: Updated first_login status:', profile.first_login);
            // Force the SupabaseService to refresh its profile observable
            yield _this0.supabaseService.refreshCurrentUserProfile();
          }
        } catch (error) {
          console.error('❌ AuthService: Error reloading profile:', error);
        }
      }
    })();
  }
  // Direct update method as fallback
  directUpdateFirstLoginStatus(userId) {
    var _this1 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this1.supabaseService.client) {
        console.log('ℹ️ AuthService: No Supabase client available for direct update');
        return;
      }
      try {
        console.log('🔧 AuthService: Direct database update for user:', userId);
        const {
          data,
          error
        } = yield _this1.supabaseService.client.from('profiles').update({
          first_login: false,
          updated_at: new Date().toISOString()
        }).eq('id', userId).select().single();
        if (error) {
          console.error('❌ AuthService: Direct update error:', error);
          throw error;
        }
        console.log('✅ AuthService: Direct update successful:', data);
        // Profile will be updated automatically by Supabase's realtime subscriptions
        console.log('🔄 AuthService: Profile update triggered, data:', data);
        yield _this1.forceReloadProfile(); // Double-check
      } catch (error) {
        console.error('❌ AuthService: Direct update failed:', error);
        throw error;
      }
    })();
  }
  isAuthenticated() {
    var _this$currentUserValu;
    return !!((_this$currentUserValu = this.currentUserValue) !== null && _this$currentUserValu !== void 0 && _this$currentUserValu.token);
  }
  isSuperAdmin() {
    var _this$currentUserValu2;
    return ((_this$currentUserValu2 = this.currentUserValue) === null || _this$currentUserValu2 === void 0 ? void 0 : _this$currentUserValu2.user.role) === 'super-admin';
  }
  getToken() {
    var _this$currentUserValu3;
    return ((_this$currentUserValu3 = this.currentUserValue) === null || _this$currentUserValu3 === void 0 ? void 0 : _this$currentUserValu3.token) || null;
  }
  // Updated to use new storage format
  isFirstTimeUser() {
    console.log('🔍 AuthService: Checking if user is first time...');
    console.log('🔍 AuthService: useSupabase:', this.useSupabase);
    if (this.useSupabase) {
      // For Supabase, check the current profile first
      const profile = this.supabaseService.currentProfile;
      console.log('🔍 AuthService: Current profile:', profile);
      // If profile is loaded, use its first_login value
      if (profile) {
        console.log('🔍 AuthService: Profile loaded - first_login status:', profile.first_login, 'for user:', profile.email);
        const isFirstTime = profile.first_login === true;
        console.log('🔍 AuthService: Returning isFirstTime:', isFirstTime);
        return isFirstTime;
      }
      // If profile is not loaded yet, try to get from user metadata as fallback
      const user = this.supabaseService.currentUser;
      console.log('🔍 AuthService: Current user:', user);
      if (user !== null && user !== void 0 && user.user_metadata) {
        console.log('⚠️ AuthService: Profile not loaded, checking user metadata:', user.user_metadata);
        // If first_login is explicitly false, return false; otherwise default to true for safety
        const isFirstTime = user.user_metadata['first_login'] !== false;
        console.log('🔍 AuthService: From user metadata, isFirstTime:', isFirstTime);
        return isFirstTime;
      }
      // If neither profile nor user metadata is available, default to true (first time)
      console.log('⚠️ AuthService: No profile or user metadata available, defaulting to first time user');
      return true;
    } else {
      // For mock users, check stored firstLogin flag (default to true for new users)
      const isFirstLogin = localStorage.getItem('isFirstLogin');
      console.log('🔍 AuthService: Mock mode - isFirstLogin localStorage:', isFirstLogin);
      const result = isFirstLogin === null || isFirstLogin === 'true';
      console.log('🔍 AuthService: Mock mode result:', result);
      return result;
    }
  }
  // Updated to use new storage format
  markUserAsReturning() {
    var _this$currentUserValu4;
    const user = (_this$currentUserValu4 = this.currentUserValue) === null || _this$currentUserValu4 === void 0 ? void 0 : _this$currentUserValu4.user;
    if (user) {
      // For mock users, the firstLogin state is now stored in localStorage
      console.log('🔄 AuthService: Setting first login complete for mock user');
    }
  }
  getUserRole() {
    var _this$currentUserValu5, _this$currentUserValu6;
    const user = (_this$currentUserValu5 = this.currentUserValue) === null || _this$currentUserValu5 === void 0 ? void 0 : _this$currentUserValu5.user;
    return (user === null || user === void 0 ? void 0 : user.role) || ((_this$currentUserValu6 = this.currentUserValue) === null || _this$currentUserValu6 === void 0 ? void 0 : _this$currentUserValu6.user.role) || null;
  }
  getDefaultDashboardRoute() {
    const role = this.getUserRole();
    switch (role) {
      case 'super-admin':
        return '/super-admin/dashboard';
      case 'group-admin':
        return '/group-admin/dashboard';
      case 'player':
        return '/player/dashboard';
      default:
        return '/welcome';
    }
  }
  // New method to get first-time routes
  getFirstTimeRoute() {
    const role = this.getUserRole();
    switch (role) {
      case 'group-admin':
        return '/group-admin/groups';
      case 'player':
        return '/player/join-group';
      case 'super-admin':
        return '/super-admin/dashboard';
      // Super admin always goes to dashboard
      default:
        return '/welcome';
    }
  }
  // Get user display name for greetings
  getUserDisplayName() {
    var _this$currentUserValu7;
    const user = (_this$currentUserValu7 = this.currentUserValue) === null || _this$currentUserValu7 === void 0 ? void 0 : _this$currentUserValu7.user;
    // Use username for greetings (always available since it's required)
    return (user === null || user === void 0 ? void 0 : user.username) || 'User';
  }
  // Get time-based greeting
  getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }
  // Get personalized greeting message using username
  getPersonalizedGreeting() {
    const username = this.getUserDisplayName();
    const timeGreeting = this.getTimeBasedGreeting();
    return `${timeGreeting}, ${username}!`;
  }
  // Public method to get current user data
  getCurrentUser() {
    var _this$currentUserValu8;
    const currentUser = (_this$currentUserValu8 = this.currentUserValue) === null || _this$currentUserValu8 === void 0 ? void 0 : _this$currentUserValu8.user;
    if (!currentUser) return null;
    // Convert AuthResponse.user to User interface
    return {
      id: currentUser.id,
      email: currentUser.email,
      role: currentUser.role,
      username: currentUser.username,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      firstLogin: this.isFirstTimeUser()
    };
  }
  /**
   * Complete user data cleanup - ensures proper user switching
   */
  clearAllUserData() {
    // Get all localStorage keys
    const allKeys = Object.keys(localStorage);
    // Remove all user-related keys
    allKeys.forEach(key => {
      if (key.startsWith('user') || key.startsWith('pending') || key.startsWith('firstLogin') || key.includes('admin') || key === 'lastActivity' || key === 'isFirstLogin' || key === 'pendingUserData' || key.startsWith('sb-') ||
      // Supabase keys
      key.includes('supabase')) {
        localStorage.removeItem(key);
      }
    });
    // Clear session storage as well
    sessionStorage.clear();
    // Clear the current user subject
    this.currentUserSubject.next(null);
  }
  /**
   * Emergency auth reset - resolves Supabase lock conflicts
   */
  emergencyAuthReset() {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    // Reset current user
    this.currentUserSubject.next(null);
    // Clear session timer
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = null;
    }
  }
  /**
   * Clear Supabase auth locks and state
   */
  clearAuthLocks() {
    var _this10 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log('🔧 AuthService: Clearing Supabase locks...');
      // Clear local state first
      _this10.currentUserSubject.next(null);
      localStorage.clear();
      sessionStorage.clear();
      // Try to clear Supabase locks more aggressively
      try {
        // Clear any existing Supabase session
        yield _this10.supabaseService.client.auth.signOut();
      } catch (e) {
        // Ignore errors
      }
      // Try to clear the lock manually
      try {
        if ('locks' in navigator) {
          yield navigator.locks.query().then(locks => {
            locks.forEach(lock => {
              if (lock.name.includes('sb-') || lock.name.includes('supabase')) {
                console.log('🔧 AuthService: Found Supabase lock, attempting to release...');
              }
            });
          });
        }
      } catch (e) {
        // Ignore errors
      }
      // Wait a bit for locks to clear
      yield new Promise(resolve => setTimeout(resolve, 1000));
      console.log('✅ AuthService: Supabase locks cleared');
    })();
  }
  /**
   * Emergency reset to resolve NavigatorLockAcquireTimeoutError
   */
  emergencyReset() {
    var _this11 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log('🚨 AuthService: Performing emergency reset...');
      try {
        // Clear all storage
        localStorage.clear();
        sessionStorage.clear();
        // Clear current user state
        _this11.currentUserSubject.next(null);
        // Clear session timer
        if (_this11.sessionTimer) {
          clearInterval(_this11.sessionTimer);
          _this11.sessionTimer = null;
        }
        // Force enable Supabase
        _this11.useSupabase = true;
        localStorage.setItem(STORAGE_KEYS.USE_SUPABASE, 'true');
        // Wait for locks to clear
        yield new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ AuthService: Emergency reset complete');
      } catch (error) {
        console.error('❌ AuthService: Emergency reset failed:', error);
      }
    })();
  }
  /**
   * Reset password using Supabase
   */
  resetPassword(email) {
    return this.supabaseService.client.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:8100/auth/reset-password'
    });
  }
  /**
  * Set Supabase session from URL fragment tokens
  */
  setSessionFromFragment() {
    var _this12 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Parse the URL fragment to extract tokens
        const url = new URL(window.location.href);
        const hashParams = new URLSearchParams(url.hash.slice(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        if (!accessToken || !refreshToken) {
          console.error('Missing tokens in URL fragment');
          return false;
        }
        // Set the Supabase session with the tokens from URL fragment
        const {
          error
        } = yield _this12.supabaseService.client.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });
        if (error) {
          console.error('Failed to set Supabase session:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('Error setting Supabase session:', err);
        return false;
      }
    })();
  }
  /**
   * Handle automatic navigation after session restoration
   * This method should be called when the app starts and finds an existing session
   */
  handleSessionRestoration() {
    var _this13 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this13.useSupabase) {
        return;
      }
      try {
        const user = _this13.supabaseService.currentUser;
        const profile = _this13.supabaseService.currentProfile;
        if (user && profile) {
          console.log('🔄 AuthService: Handling session restoration navigation', {
            userId: user.id,
            role: profile.role,
            firstLogin: profile.first_login
          });
          // The navigation will be handled by the guards and routing system
          // We just need to ensure the AuthService state is properly set
          const authResponse = {
            token: 'supabase-session-token',
            user: {
              id: profile.id,
              email: profile.email,
              role: profile.role,
              username: profile.username,
              firstName: profile.first_name,
              lastName: profile.last_name
            }
          };
          _this13.setAuthenticatedUser(authResponse);
          console.log('✅ AuthService: Session restoration complete');
        }
      } catch (error) {
        console.error('❌ AuthService: Error during session restoration:', error);
      }
    })();
  }
  /**
   * Update password using Supabase reset token
   */
  updatePasswordWithTokens(newPassword) {
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Try multiple sources for the access token
        let accessToken = '';
        // First, try to get from URL fragment
        const url = new URL(window.location.href);
        const hashParams = new URLSearchParams(url.hash.slice(1));
        accessToken = hashParams.get('access_token') || '';
        // If not found in URL, try to get from localStorage (component might have stored it)
        if (!accessToken) {
          accessToken = localStorage.getItem('current_reset_token') || '';
        }
        // If still not found, try to get from session storage
        if (!accessToken) {
          accessToken = sessionStorage.getItem('current_reset_token') || '';
        }
        if (!accessToken) {
          console.error('No access token found in URL fragment, localStorage, or sessionStorage');
          return false;
        }
        // Use direct API call to update password
        const response = yield fetch(`${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.supabase.url}/auth/v1/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'apikey': _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.supabase.key
          },
          body: JSON.stringify({
            password: newPassword
          })
        });
        if (!response.ok) {
          const errorData = yield response.json().catch(() => ({}));
          console.error('Password update failed:', {
            status: response.status,
            statusText: response.statusText,
            error: errorData
          });
          return false;
        }
        return true;
      } catch (err) {
        console.error('Exception during password reset:', err);
        // Handle NavigatorLockAcquireTimeoutError gracefully - it's usually not fatal
        if (err instanceof Error && err.message.includes('NavigatorLockAcquireTimeoutError')) {
          // Continue with the flow as this error doesn't necessarily mean the operation failed
          return true;
        }
        return false;
      }
    })();
  }
  // Debug method to manually fix a user's first_login status
  debugFixUserFirstLoginStatus(_x) {
    var _this14 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (email, shouldBeFirstTime = false) {
      if (!_this14.useSupabase) {
        console.log('⚠️ AuthService: Debug method only works with Supabase');
        return false;
      }
      try {
        console.log(`🔧 AuthService: Setting first_login=${shouldBeFirstTime} for user: ${email}`);
        const {
          error
        } = yield _this14.supabaseService.client.from('profiles').update({
          first_login: shouldBeFirstTime,
          updated_at: new Date().toISOString()
        }).eq('email', email);
        if (error) {
          console.error(`❌ AuthService: Error updating user ${email}:`, error);
          return false;
        }
        console.log(`✅ AuthService: Successfully updated user ${email} first_login status`);
        // If this is the current user, force a profile refresh
        const currentUser = _this14.currentUserValue;
        if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.user.email) === email) {
          console.log('🔄 AuthService: Refreshing current user profile...');
          // The Supabase service should automatically update the profile via its subscription
          setTimeout(() => {
            const updatedStatus = _this14.isFirstTimeUser();
            console.log('🔍 AuthService: Current user updated first_login status:', updatedStatus);
          }, 1000);
        }
        return true;
      } catch (error) {
        console.error(`❌ AuthService: Error in debugFixUserFirstLoginStatus:`, error);
        return false;
      }
    }).apply(this, arguments);
  }
}
_AuthService = AuthService;
_AuthService.ɵfac = function AuthService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_services_supabase_service__WEBPACK_IMPORTED_MODULE_2__.SupabaseService));
};
_AuthService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: _AuthService,
  factory: _AuthService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 1220:
/*!*****************************************************************!*\
  !*** ./src/app/core/services/cross-platform-storage.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CrossPlatformStorageService: () => (/* binding */ CrossPlatformStorageService)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _capacitor_preferences__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/preferences */ 6493);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 4070);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);

var _CrossPlatformStorageService;



/**
 * Cross-platform storage service that uses:
 * - Capacitor Preferences for native platforms (iOS/Android)
 * - localStorage for web platform
 */
class CrossPlatformStorageService {
  constructor() {
    this.isNative = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform();
  }
  /**
   * Set a value in storage
   */
  set(key, value) {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const stringValue = JSON.stringify(value);
      if (_this.isNative) {
        yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_1__.Preferences.set({
          key,
          value: stringValue
        });
      } else {
        localStorage.setItem(key, stringValue);
      }
    })();
  }
  /**
   * Get a value from storage
   */
  get(key) {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        let value;
        if (_this2.isNative) {
          const result = yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_1__.Preferences.get({
            key
          });
          value = result.value;
        } else {
          value = localStorage.getItem(key);
        }
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error(`Error getting value for key ${key}:`, error);
        return null;
      }
    })();
  }
  /**
   * Remove a value from storage
   */
  remove(key) {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.isNative) {
        yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_1__.Preferences.remove({
          key
        });
      } else {
        localStorage.removeItem(key);
      }
    })();
  }
  /**
   * Clear all storage
   */
  clear() {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this4.isNative) {
        yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_1__.Preferences.clear();
      } else {
        localStorage.clear();
      }
    })();
  }
  /**
   * Get all keys from storage
   */
  keys() {
    var _this5 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this5.isNative) {
        const result = yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_1__.Preferences.keys();
        return result.keys;
      } else {
        return Object.keys(localStorage);
      }
    })();
  }
  /**
   * Check if a key exists in storage
   */
  has(key) {
    var _this6 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const value = yield _this6.get(key);
      return value !== null;
    })();
  }
  /**
   * Get multiple values at once
   */
  getMultiple(keys) {
    var _this7 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const result = {};
      for (const key of keys) {
        result[key] = yield _this7.get(key);
      }
      return result;
    })();
  }
  /**
   * Set multiple values at once
   */
  setMultiple(keyValuePairs) {
    var _this8 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const promises = Object.entries(keyValuePairs).map(([key, value]) => _this8.set(key, value));
      yield Promise.all(promises);
    })();
  }
  /**
   * Remove multiple keys at once
   */
  removeMultiple(keys) {
    var _this9 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const promises = keys.map(key => _this9.remove(key));
      yield Promise.all(promises);
    })();
  }
}
_CrossPlatformStorageService = CrossPlatformStorageService;
_CrossPlatformStorageService.ɵfac = function CrossPlatformStorageService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CrossPlatformStorageService)();
};
_CrossPlatformStorageService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _CrossPlatformStorageService,
  factory: _CrossPlatformStorageService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 7097:
/*!****************************************************!*\
  !*** ./src/app/core/services/deep-link.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeepLinkService: () => (/* binding */ DeepLinkService)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _capacitor_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/app */ 9326);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 4070);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_supabase_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/supabase.service */ 9692);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);

var _DeepLinkService;





/**
 * Service to handle deep links for authentication flows
 * Primarily used for email confirmation on native platforms
 */
class DeepLinkService {
  constructor(supabaseService, router) {
    this.supabaseService = supabaseService;
    this.router = router;
    this.isNative = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform();
    this.initializeDeepLinkListener();
  }
  /**
   * Initialize deep link listener for native platforms
   */
  initializeDeepLinkListener() {
    var _this = this;
    if (!this.isNative) {
      console.log('🌐 Web platform detected - deep link listener not needed');
      return;
    }
    console.log('📱 Native platform detected - initializing deep link listener');
    // Listen for app state changes and deep links
    _capacitor_app__WEBPACK_IMPORTED_MODULE_1__.App.addListener('appStateChange', ({
      isActive
    }) => {
      console.log('📱 App state changed. Is active?', isActive);
    });
    // Listen for deep links when app is already running
    _capacitor_app__WEBPACK_IMPORTED_MODULE_1__.App.addListener('appUrlOpen', /*#__PURE__*/function () {
      var _ref = (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (event) {
        console.log('🔗 Deep link received:', event.url);
        yield _this.handleDeepLink(event.url);
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    // Check for initial deep link when app starts
    this.checkInitialDeepLink();
  }
  /**
   * Check for initial deep link when app starts
   */
  checkInitialDeepLink() {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const launchUrl = yield _capacitor_app__WEBPACK_IMPORTED_MODULE_1__.App.getLaunchUrl();
        if (launchUrl && launchUrl.url) {
          console.log('🚀 Initial deep link detected:', launchUrl.url);
          yield _this2.handleDeepLink(launchUrl.url);
        }
      } catch (error) {
        // No initial deep link or error getting it
        console.log('🚀 No initial deep link detected');
      }
    })();
  }
  /**
   * Handle incoming deep link
   */
  handleDeepLink(url) {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        console.log('🔗 Processing deep link:', url);
        // Check if this is an auth-related deep link
        if (_this3.isAuthDeepLink(url)) {
          const success = yield _this3.supabaseService.handleDeepLinkSession(url);
          if (success) {
            console.log('✅ Auth deep link processed successfully');
            // Navigate to appropriate page after successful auth
            yield _this3.navigateAfterAuth();
          } else {
            console.error('❌ Failed to process auth deep link');
            // Navigate to error page or login
            _this3.router.navigate(['/auth/login'], {
              queryParams: {
                error: 'auth_failed'
              }
            });
          }
        } else {
          console.log('🔗 Non-auth deep link, handling as regular navigation');
          // Handle other types of deep links here if needed
        }
      } catch (error) {
        console.error('❌ Error handling deep link:', error);
        // Navigate to error page or login
        _this3.router.navigate(['/auth/login'], {
          queryParams: {
            error: 'deep_link_failed'
          }
        });
      }
    })();
  }
  /**
   * Check if the deep link is auth-related
   */
  isAuthDeepLink(url) {
    return url.includes('access_token') && url.includes('refresh_token');
  }
  /**
   * Navigate to appropriate page after successful authentication
   */
  navigateAfterAuth() {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Wait a moment for the session to be fully established
        yield new Promise(resolve => setTimeout(resolve, 1000));
        // Get the current user to determine where to navigate
        const user = _this4.supabaseService.currentUser;
        const profile = _this4.supabaseService.currentProfile;
        if (user && profile) {
          // Navigate based on user role and first login status
          if (profile.first_login) {
            // First time user
            switch (profile.role) {
              case 'group-admin':
                _this4.router.navigate(['/group-admin/groups']);
                break;
              case 'player':
                _this4.router.navigate(['/player/join-group']);
                break;
              case 'super-admin':
                _this4.router.navigate(['/super-admin/dashboard']);
                break;
              default:
                _this4.router.navigate(['/welcome']);
            }
          } else {
            // Returning user - go to dashboard
            switch (profile.role) {
              case 'group-admin':
                _this4.router.navigate(['/group-admin/dashboard']);
                break;
              case 'player':
                _this4.router.navigate(['/player/dashboard']);
                break;
              case 'super-admin':
                _this4.router.navigate(['/super-admin/dashboard']);
                break;
              default:
                _this4.router.navigate(['/welcome']);
            }
          }
        } else {
          // Fallback to welcome page
          _this4.router.navigate(['/welcome']);
        }
      } catch (error) {
        console.error('❌ Error navigating after auth:', error);
        _this4.router.navigate(['/welcome']);
      }
    })();
  }
  /**
   * Manually trigger deep link handling (useful for testing)
   */
  handleUrl(url) {
    var _this5 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this5.handleDeepLink(url);
    })();
  }
}
_DeepLinkService = DeepLinkService;
_DeepLinkService.ɵfac = function DeepLinkService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DeepLinkService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_supabase_service__WEBPACK_IMPORTED_MODULE_3__.SupabaseService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
};
_DeepLinkService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: _DeepLinkService,
  factory: _DeepLinkService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 6799:
/*!************************************!*\
  !*** ./src/app/debug-auth.page.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DebugAuthPage: () => (/* binding */ DebugAuthPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/services/auth.service */ 8010);
/* harmony import */ var _services_supabase_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/supabase.service */ 9692);

var _DebugAuthPage;







class DebugAuthPage {
  constructor(authService, supabaseService) {
    this.authService = authService;
    this.supabaseService = supabaseService;
    this.authMode = 'Mock';
    this.supabaseUser = null;
    this.supabaseSession = null;
    this.authServiceUser = null;
    this.status = 'Ready';
    this.testEmail = 'vofal40476@knilok.com';
    this.testPassword = '';
    this.updateStatus();
  }
  updateStatus() {
    // Check auth mode
    const useSupabase = localStorage.getItem('useSupabase') === 'true';
    this.authMode = useSupabase ? 'Supabase' : 'Mock';
    // Get current users
    this.supabaseUser = this.supabaseService.currentUser;
    this.supabaseSession = this.supabaseService.currentSession;
    this.authServiceUser = this.authService.currentUserValue;
  }
  enableSupabase() {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.status = 'Enabling Supabase...';
      _this.authService.enableSupabaseAuth();
      yield new Promise(resolve => setTimeout(resolve, 1000));
      _this.updateStatus();
      _this.status = 'Supabase enabled!';
    })();
  }
  clearLocks() {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.status = 'Clearing locks...';
      yield _this2.authService.clearAuthLocks();
      yield new Promise(resolve => setTimeout(resolve, 2000));
      _this2.updateStatus();
      _this2.status = 'Locks cleared!';
    })();
  }
  emergencyReset() {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.status = 'Emergency reset...';
      yield _this3.authService.emergencyReset();
      yield new Promise(resolve => setTimeout(resolve, 3000));
      _this3.updateStatus();
      _this3.status = 'Emergency reset complete!';
    })();
  }
  testLogin() {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this4.testEmail || !_this4.testPassword) {
        _this4.status = 'Please enter email and password';
        return;
      }
      _this4.status = 'Testing login...';
      try {
        const result = yield _this4.authService.login({
          email: _this4.testEmail,
          password: _this4.testPassword,
          securityQuestion: '',
          securityAnswer: ''
        }).toPromise();
        _this4.updateStatus();
        _this4.status = `Login successful! User: ${result === null || result === void 0 ? void 0 : result.user.email}`;
      } catch (error) {
        _this4.status = `Login failed: ${error}`;
        console.error('Login error:', error);
      }
    })();
  }
}
_DebugAuthPage = DebugAuthPage;
_DebugAuthPage.ɵfac = function DebugAuthPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DebugAuthPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_supabase_service__WEBPACK_IMPORTED_MODULE_2__.SupabaseService));
};
_DebugAuthPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _DebugAuthPage,
  selectors: [["app-debug-auth"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 53,
  vars: 7,
  consts: [[1, "ion-padding"], ["color", "primary"], [2, "margin-top", "20px"], ["color", "primary", "fill", "outline", 3, "click"], ["color", "warning", "fill", "outline", 3, "click"], ["color", "danger", "fill", "outline", 3, "click"], ["color", "success", "fill", "outline", 3, "click"], ["position", "stacked"], ["placeholder", "vofal40476@knilok.com", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "Your password", 3, "ngModelChange", "ngModel"], ["color", "medium"]],
  template: function DebugAuthPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Debug Authentication");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-content", 0)(5, "ion-card")(6, "ion-card-content")(7, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Authentication Debug Panel");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "ion-item")(10, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Current Auth Mode:");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "ion-text", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "ion-item")(15, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Supabase User:");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "ion-text", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "ion-item")(20, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Supabase Session:");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "ion-text", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "ion-item")(25, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "AuthService User:");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "ion-text", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 2)(30, "ion-button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DebugAuthPage_Template_ion_button_click_30_listener() {
        return ctx.enableSupabase();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, " Enable Supabase Auth ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "ion-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DebugAuthPage_Template_ion_button_click_32_listener() {
        return ctx.clearLocks();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, " Clear Auth Locks ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "ion-button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DebugAuthPage_Template_ion_button_click_34_listener() {
        return ctx.emergencyReset();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, " Emergency Reset ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "ion-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DebugAuthPage_Template_ion_button_click_36_listener() {
        return ctx.testLogin();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, " Test Login ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 2)(39, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "Test Login");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "ion-item")(42, "ion-label", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "Email");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "ion-input", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function DebugAuthPage_Template_ion_input_ngModelChange_44_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.testEmail, $event) || (ctx.testEmail = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "ion-item")(46, "ion-label", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Password");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "ion-input", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function DebugAuthPage_Template_ion_input_ngModelChange_48_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.testPassword, $event) || (ctx.testPassword = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "div", 2)(50, "ion-text", 10)(51, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](52);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.authMode);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.supabaseUser ? ctx.supabaseUser.email : "None");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.supabaseSession ? "Active" : "None");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.authServiceUser ? ctx.authServiceUser.user.email : "None");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.testEmail);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.testPassword);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Status: ", ctx.status, "");
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonText, _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel],
  encapsulation: 2
});

/***/ }),

/***/ 9692:
/*!**********************************************!*\
  !*** ./src/app/services/supabase.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SupabaseService: () => (/* binding */ SupabaseService)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @supabase/supabase-js */ 2014);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_cross_platform_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/services/cross-platform-storage.service */ 1220);

var _SupabaseService;





class SupabaseService {
  constructor(storageService) {
    var _this = this;
    this.storageService = storageService;
    this.currentUser$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null);
    this.currentSession$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null);
    this.currentProfile$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null);
    // Initialize Supabase client with better error handling
    try {
      this.supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_4__.createClient)(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.supabase.url, _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.supabase.key, {
        auth: {
          persistSession: true,
          // Enable session persistence for proper auth state
          autoRefreshToken: true,
          // Enable auto refresh for seamless experience
          detectSessionInUrl: true,
          // Enable automatic session detection
          storage: {
            getItem: function () {
              var _ref = (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (key) {
                try {
                  return yield _this.storageService.get(key);
                } catch (error) {
                  console.warn(`⚠️ SupabaseService: Error getting item ${key}:`, error);
                  return null;
                }
              });
              return function getItem(_x) {
                return _ref.apply(this, arguments);
              };
            }(),
            setItem: function () {
              var _ref2 = (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (key, value) {
                try {
                  yield _this.storageService.set(key, value);
                } catch (error) {
                  console.warn(`⚠️ SupabaseService: Error setting item ${key}:`, error);
                }
              });
              return function setItem(_x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }(),
            removeItem: function () {
              var _ref3 = (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (key) {
                try {
                  yield _this.storageService.remove(key);
                } catch (error) {
                  console.warn(`⚠️ SupabaseService: Error removing item ${key}:`, error);
                }
              });
              return function removeItem(_x4) {
                return _ref3.apply(this, arguments);
              };
            }()
          }
        }
      });
      // Initialize auth state
      this.initializeAuth();
    } catch (error) {
      console.error('❌ SupabaseService: Failed to initialize Supabase client:', error);
    }
  }
  initializeAuth() {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.supabase) {
        console.error('❌ SupabaseService: Supabase client not initialized');
        return;
      }
      try {
        // Get initial session
        const {
          data: {
            session
          }
        } = yield _this2.supabase.auth.getSession();
        _this2.currentSession$.next(session);
        _this2.currentUser$.next((session === null || session === void 0 ? void 0 : session.user) || null);
        // Load profile if user exists
        if (session !== null && session !== void 0 && session.user) {
          yield _this2.loadUserProfile(session.user.id);
        }
        // Listen for auth changes
        _this2.supabase.auth.onAuthStateChange(/*#__PURE__*/function () {
          var _ref4 = (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (event, session) {
            _this2.currentSession$.next(session);
            _this2.currentUser$.next((session === null || session === void 0 ? void 0 : session.user) || null);
            if (session !== null && session !== void 0 && session.user) {
              yield _this2.loadUserProfile(session.user.id);
            } else {
              _this2.currentProfile$.next(null);
            }
          });
          return function (_x5, _x6) {
            return _ref4.apply(this, arguments);
          };
        }());
      } catch (error) {
        console.error('❌ SupabaseService: Error initializing auth:', error);
      }
    })();
  }
  loadUserProfile(userId) {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this3.supabase) {
        console.error('❌ SupabaseService: Supabase client not initialized');
        return;
      }
      try {
        const {
          data: profile,
          error
        } = yield _this3.supabase.from('profiles').select('*').eq('id', userId).single();
        if (error) {
          console.error('Error loading user profile:', error);
          return;
        }
        _this3.currentProfile$.next(profile);
      } catch (error) {
        console.error('Error in loadUserProfile:', error);
      }
    })();
  }
  // Getters for reactive state
  get client() {
    return this.supabase;
  }
  get user$() {
    return this.currentUser$.asObservable();
  }
  get session$() {
    return this.currentSession$.asObservable();
  }
  get profile$() {
    return this.currentProfile$.asObservable();
  }
  get currentUser() {
    return this.currentUser$.value;
  }
  get currentSession() {
    return this.currentSession$.value;
  }
  get currentProfile() {
    return this.currentProfile$.value;
  }
  // Authentication Methods
  signUp(email, password, metadata, redirectTo // optional; fallback to current origin
  ) {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Determine the appropriate redirect URL based on platform
        const defaultRedirectUrl = redirectTo !== null && redirectTo !== void 0 ? redirectTo : _this4.getDefaultRedirectUrl();
        const {
          data,
          error
        } = yield _this4.supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
            // store profile metadata on the user
            emailRedirectTo: defaultRedirectUrl
          }
        });
        if (error) {
          console.error('Auth signup error:', error);
          throw error;
        }
        // Create profile after successful signup (non-blocking)
        if (data.user) {
          // Don't await - let it run in background
          _this4.createProfile(data.user.id, {
            email,
            ...metadata,
            first_login: true
            // the following will be set in createProfile() anyway:
            // created_at / updated_at
          }).catch(error => {
            console.error('Profile creation failed:', error);
          });
        }
        return data;
      } catch (error) {
        console.error('SignUp failed:', error);
        throw error;
      }
    })();
  }
  /**
   * Clear any existing Navigator LockManager locks for Supabase auth
   * This helps prevent NavigatorLockAcquireTimeoutError
   */
  clearAuthLocks() {
    var _this5 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        console.log('🔧 SupabaseService: Clearing existing auth locks...');
        // Check if Navigator LockManager is available
        if (typeof navigator !== 'undefined' && 'locks' in navigator) {
          var _lockState$held;
          // Get currently held locks
          const lockState = yield navigator.locks.query();
          // Look for Supabase auth-related locks
          const authLocks = (_lockState$held = lockState.held) === null || _lockState$held === void 0 ? void 0 : _lockState$held.filter(lock => lock.name && (lock.name.includes('auth-token') || lock.name.includes('supabase') || lock.name.includes('sb-')));
          if (authLocks && authLocks.length > 0) {
            console.log('🔧 SupabaseService: Found existing auth locks:', authLocks.map(l => l.name));
            // Wait a bit for any ongoing operations to complete
            yield new Promise(resolve => setTimeout(resolve, 100));
            // Sign out to release any existing locks
            try {
              yield _this5.supabase.auth.signOut({
                scope: 'local'
              });
              console.log('🔧 SupabaseService: Local signOut completed to release locks');
            } catch (signOutError) {
              console.log('🔧 SupabaseService: SignOut error (expected):', signOutError);
            }
            // Wait a bit more for locks to be released
            yield new Promise(resolve => setTimeout(resolve, 200));
          } else {
            console.log('🔧 SupabaseService: No auth locks found');
          }
        } else {
          console.log('🔧 SupabaseService: Navigator LockManager not available');
        }
      } catch (error) {
        console.error('❌ SupabaseService: Error clearing auth locks:', error);
        // Don't throw - continue with sign in attempt
      }
    })();
  }
  signIn(email, password) {
    var _this6 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this6.supabase) {
        throw new Error('Supabase client not initialized');
      }
      console.log('🔍 SupabaseService: Starting signIn...');
      console.log('🔍 SupabaseService: Supabase URL:', _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.supabase.url);
      console.log('🔍 SupabaseService: Supabase Key (first 20 chars):', _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.supabase.key.substring(0, 20) + '...');
      // Retry mechanism for NavigatorLockAcquireTimeoutError
      const maxRetries = 3;
      let lastError;
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`🔍 SupabaseService: Sign-in attempt ${attempt}/${maxRetries}`);
          if (attempt > 1) {
            // Clear any existing auth locks before retry
            yield _this6.clearAuthLocks();
            // Wait between retries with exponential backoff
            const delay = Math.min(1000 * Math.pow(2, attempt - 2), 5000); // 1s, 2s, 4s max
            console.log(`⏳ SupabaseService: Waiting ${delay}ms before retry...`);
            yield new Promise(resolve => setTimeout(resolve, delay));
          }
          console.log('🔍 SupabaseService: Calling supabase.auth.signInWithPassword...');
          // Don't clear existing session - let Supabase handle session management
          const {
            data,
            error
          } = yield _this6.supabase.auth.signInWithPassword({
            email,
            password
          });
          console.log('🔍 SupabaseService: SignIn response received');
          console.log('🔍 SupabaseService: Data:', data);
          console.log('🔍 SupabaseService: Error:', error);
          if (error) {
            console.error('❌ SupabaseService: SignIn error:', error);
            throw error;
          }
          console.log('✅ SupabaseService: SignIn successful:', data);
          return data;
        } catch (attemptError) {
          console.log(`🔍 SupabaseService: Attempt ${attempt} failed:`, attemptError);
          lastError = attemptError;
          // Check if this is a NavigatorLockAcquireTimeoutError
          const isLockError = attemptError instanceof Error && (attemptError.message.includes('NavigatorLockAcquireTimeoutError') || attemptError.message.includes('lock'));
          if (isLockError && attempt < maxRetries) {
            console.log(`⚠️ SupabaseService: Lock error on attempt ${attempt}, will retry...`);
            continue; // Try again
          }
          // If it's not a lock error, or we've exhausted retries, handle differently
          if (!isLockError || attempt === maxRetries) {
            // For lock errors on final attempt, try to get profile data directly
            if (isLockError) {
              console.log('⚠️ SupabaseService: Final attempt failed with lock error, trying direct profile fetch...');
              try {
                const {
                  data: profileData,
                  error: profileError
                } = yield _this6.supabase.from('profiles').select('*').eq('email', email).single();
                if (profileData && !profileError) {
                  console.log('✅ SupabaseService: Found profile data directly:', profileData);
                  return {
                    user: {
                      id: profileData.id,
                      email: profileData.email,
                      user_metadata: {
                        username: profileData.username,
                        first_name: profileData.first_name,
                        last_name: profileData.last_name,
                        role: profileData.role
                      }
                    },
                    session: {
                      access_token: 'fallback-token'
                    }
                  };
                }
              } catch (directError) {
                console.log('🔍 SupabaseService: Could not get profile data directly:', directError);
              }
            }
            // Re-throw the original error for non-lock errors or final attempt
            throw attemptError;
          }
        }
      }
      // If we get here, all retries failed
      console.error('❌ SupabaseService: All sign-in attempts failed');
      throw lastError;
    })();
  }
  signOut() {
    var _this7 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // First, clear local state to prevent race conditions
        _this7.currentUser$.next(null);
        _this7.currentSession$.next(null);
        _this7.currentProfile$.next(null);
        // Then perform Supabase signOut if client is available
        if (_this7.supabase) {
          const {
            error
          } = yield _this7.supabase.auth.signOut();
          if (error) {
            console.error('Auth signOut error:', error);
            throw error;
          }
        }
      } catch (error) {
        console.error('signOut failed:', error);
        // Continue with local cleanup even if Supabase signOut fails
      }
      // Ensure local state is cleared (in case it wasn't cleared above)
      _this7.currentUser$.next(null);
      _this7.currentSession$.next(null);
      _this7.currentProfile$.next(null);
    })();
  }
  // Profile Management
  createProfile(userId, profileData) {
    var _this8 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const {
          data,
          error
        } = yield _this8.supabase.from('profiles').insert([{
          id: userId,
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]).select().single();
        if (error) {
          console.error('Profile creation error:', error);
          throw error;
        }
        return data;
      } catch (error) {
        console.error('Profile creation failed:', error);
        throw error;
      }
    })();
  }
  updateProfile(userId, updates) {
    var _this9 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        data,
        error
      } = yield _this9.supabase.from('profiles').update({
        ...updates,
        updated_at: new Date().toISOString()
      }).eq('id', userId).select().single();
      if (error) throw error;
      return data;
    })();
  }
  // Mark first login as complete
  markFirstLoginComplete(userId) {
    var _this0 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const {
          data,
          error
        } = yield _this0.supabase.from('profiles').update({
          first_login: false,
          updated_at: new Date().toISOString()
        }).eq('id', userId).select().single();
        if (error) {
          console.error('Error marking first login complete:', error);
          throw error;
        }
        // Update the current profile in memory
        if (_this0.currentProfile$.value) {
          _this0.currentProfile$.next({
            ..._this0.currentProfile$.value,
            first_login: false
          });
        }
        console.log('✅ First login marked as complete for user:', userId);
        return data;
      } catch (error) {
        console.error('Failed to mark first login complete:', error);
        throw error;
      }
    })();
  }
  // Public method to refresh current user profile
  refreshCurrentUserProfile() {
    var _this1 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const currentUser = _this1.currentUser;
      if (currentUser !== null && currentUser !== void 0 && currentUser.id) {
        yield _this1.loadUserProfile(currentUser.id);
        console.log('🔄 SupabaseService: Current user profile refreshed');
      }
    })();
  }
  // Group Management
  createGroup(groupData) {
    var _this10 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        data,
        error
      } = yield _this10.supabase.from('groups').insert([{
        ...groupData,
        current_members: 1,
        // Admin counts as first member
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]).select().single();
      if (error) throw error;
      return data;
    })();
  }
  joinGroup(groupCode, userId) {
    var _this11 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // First, find the group by code
      const {
        data: group,
        error: groupError
      } = yield _this11.supabase.from('groups').select('*').eq('code', groupCode).single();
      if (groupError) throw groupError;
      // Check if user is already a member
      const {
        data: existingMember
      } = yield _this11.supabase.from('group_members').select('*').eq('group_id', group.id).eq('user_id', userId).single();
      if (existingMember) {
        throw new Error('User is already a member of this group');
      }
      // Add user to group
      const {
        data,
        error
      } = yield _this11.supabase.from('group_members').insert([{
        group_id: group.id,
        user_id: userId,
        joined_at: new Date().toISOString(),
        total_points: 0
      }]).select().single();
      if (error) throw error;
      // Update group member count
      yield _this11.supabase.from('groups').update({
        current_members: group.current_members + 1,
        updated_at: new Date().toISOString()
      }).eq('id', group.id);
      return data;
    })();
  }
  // Prediction Management
  createPrediction(predictionData) {
    var _this12 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        data,
        error
      } = yield _this12.supabase.from('predictions').insert([{
        ...predictionData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]).select().single();
      if (error) throw error;
      return data;
    })();
  }
  updatePrediction(predictionId, updates) {
    var _this13 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        data,
        error
      } = yield _this13.supabase.from('predictions').update({
        ...updates,
        updated_at: new Date().toISOString()
      }).eq('id', predictionId).select().single();
      if (error) throw error;
      return data;
    })();
  }
  // Match Management
  getMatches(gameweek) {
    var _this14 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let query = _this14.supabase.from('matches').select('*').order('kickoff_time', {
        ascending: true
      });
      if (gameweek) {
        query = query.eq('gameweek', gameweek);
      }
      const {
        data,
        error
      } = yield query;
      if (error) throw error;
      return data;
    })();
  }
  // Utility Methods
  checkSuperAdminExists() {
    var _this15 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        data,
        error
      } = yield _this15.supabase.from('profiles').select('id').eq('role', 'super-admin').limit(1);
      if (error) throw error;
      return data.length > 0;
    })();
  }
  // Real-time Subscriptions
  subscribeToGroupUpdates(groupId, callback) {
    return this.supabase.channel(`group_${groupId}`).on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'group_members',
      filter: `group_id=eq.${groupId}`
    }, callback).subscribe();
  }
  subscribeToMatchUpdates(callback) {
    return this.supabase.channel('matches').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'matches'
    }, callback).subscribe();
  }
  /**
   * Get the default redirect URL based on platform
   */
  getDefaultRedirectUrl() {
    // For web, use the current origin
    if (typeof window !== 'undefined' && window.location) {
      return `${window.location.origin}/auth/email-confirmed`;
    }
    // For native platforms, use a custom scheme
    return 'io.ionic.starter://auth/email-confirmed';
  }
  /**
   * Handle deep link session exchange for email confirmation
   * This method should be called when the app receives a deep link with auth tokens
   */
  handleDeepLinkSession(url) {
    var _this16 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        console.log('🔗 Handling deep link session:', url);
        // Parse the URL to extract tokens
        const urlObj = new URL(url);
        const hashParams = new URLSearchParams(urlObj.hash.slice(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');
        if (!accessToken || !refreshToken) {
          console.error('❌ Missing tokens in deep link');
          return false;
        }
        // Set the session using the tokens from the deep link
        const {
          data,
          error
        } = yield _this16.supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });
        if (error) {
          console.error('❌ Failed to set session from deep link:', error);
          return false;
        }
        console.log('✅ Successfully set session from deep link');
        return true;
      } catch (error) {
        console.error('❌ Error handling deep link session:', error);
        return false;
      }
    })();
  }
  /**
   * Check if the current URL contains auth tokens (for web platform)
   */
  hasAuthTokensInUrl() {
    if (typeof window === 'undefined') return false;
    const hash = window.location.hash;
    return hash.includes('access_token') && hash.includes('refresh_token');
  }
  /**
   * Extract and set session from URL tokens (for web platform)
   */
  setSessionFromUrl() {
    var _this17 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this17.hasAuthTokensInUrl()) {
        return false;
      }
      const url = window.location.href;
      return yield _this17.handleDeepLinkSession(url);
    })();
  }
}
_SupabaseService = SupabaseService;
_SupabaseService.ɵfac = function SupabaseService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SupabaseService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_services_cross_platform_storage_service__WEBPACK_IMPORTED_MODULE_2__.CrossPlatformStorageService));
};
_SupabaseService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: _SupabaseService,
  factory: _SupabaseService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const isProduction = typeof ngDevMode !== 'undefined' ? !ngDevMode : false;
// Production configuration
const productionConfig = {
  production: true,
  supabase: {
    url: 'https://lmybyfrhzarxmantttki.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWJ5ZnJoemFyeG1hbnR0dGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk1MzAsImV4cCI6MjA2NzMyNTUzMH0.SkXjmFSBHQZp8Y74dnnNbwOwotJH3pX1OV6fIN4TFWQ'
  },
  apiUrl: 'https://api.example.com',
  encryptionKey: 'your-encryption-key-here'
};
// Development configuration
const developmentConfig = {
  production: false,
  supabase: {
    url: 'https://lmybyfrhzarxmantttki.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWJ5ZnJoemFyeG1hbnR0dGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk1MzAsImV4cCI6MjA2NzMyNTUzMH0.SkXjmFSBHQZp8Y74dnnNbwOwotJH3pX1OV6fIN4TFWQ'
  },
  apiUrl: 'http://localhost:3000',
  encryptionKey: 'dev-encryption-key'
};
const environment = isProduction ? productionConfig : developmentConfig;

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 92);
/* harmony import */ var _app_app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.config */ 289);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ 5312);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.enableProdMode)();
}
(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _app_app_config__WEBPACK_IMPORTED_MODULE_1__.appConfig).catch(err => console.error(err));

/***/ }),

/***/ 4140:
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/@stencil/core/internal/client/ lazy ^\.\/.*\.entry\.js.*$ include: \.entry\.js$ exclude: \.system\.entry\.js$ strict namespace object ***!
  \************************************************************************************************************************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 4140;
module.exports = webpackEmptyAsyncContext;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map