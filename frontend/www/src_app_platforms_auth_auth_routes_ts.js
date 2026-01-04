"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_auth_auth_routes_ts"],{

/***/ 1862:
/*!***********************************************!*\
  !*** ./src/app/platforms/auth/auth.routes.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
const routes = [{
  path: '',
  children: [{
    path: 'login',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_platforms_auth_pages_login_login_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/login/login.page */ 9007)).then(m => m.LoginPage)
  }, {
    path: 'signup',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("src_app_platforms_auth_pages_signup_signup_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/signup/signup.page */ 5829)).then(m => m.SignupPage)
  }, {
    path: 'forgot-password',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("src_app_platforms_auth_pages_forgot-password_forgot-password_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/forgot-password/forgot-password.page */ 9163)).then(m => m.ForgotPasswordPage)
  }, {
    path: 'reset-password',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_platforms_auth_pages_reset-password_reset-password_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/reset-password/reset-password.page */ 6803)).then(m => m.ResetPasswordPage)
  }, {
    path: 'email-confirmed',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("src_app_platforms_auth_pages_email-confirmed_email-confirmed_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/email-confirmed/email-confirmed.page */ 8011)).then(m => m.EmailConfirmedPage)
  }, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }]
}];

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_auth_auth_routes_ts.js.map