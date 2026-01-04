"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_super-admin_super-admin_routes_ts"],{

/***/ 5809:
/*!*************************************************************************!*\
  !*** ./src/app/platforms/super-admin/layout/super-admin-layout.page.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuperAdminLayoutPage: () => (/* binding */ SuperAdminLayoutPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
var _SuperAdminLayoutPage;






class SuperAdminLayoutPage {
  constructor(router) {
    this.router = router;
    (0,ionicons__WEBPACK_IMPORTED_MODULE_1__.a)({
      settingsOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.settingsOutline,
      personOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      gridOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.gridOutline,
      layersOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.layersOutline,
      statsChartOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.statsChartOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.peopleOutline,
      personAddOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personAddOutline,
      speedometerOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.speedometerOutline
    });
  }
  navigateTo(path) {
    this.router.navigate([path], {
      replaceUrl: true
    });
  }
}
_SuperAdminLayoutPage = SuperAdminLayoutPage;
_SuperAdminLayoutPage.ɵfac = function SuperAdminLayoutPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SuperAdminLayoutPage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
};
_SuperAdminLayoutPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _SuperAdminLayoutPage,
  selectors: [["app-super-admin-layout"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
  decls: 31,
  vars: 0,
  consts: [[1, "page-wrapper"], [1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], ["slot", "end"], [3, "click"], ["name", "person-outline", 1, "profile-icon"], ["slot", "bottom"], ["tab", "dashboard", "href", "/super-admin/dashboard"], ["name", "grid-outline"], ["tab", "metrics", "href", "/super-admin/metrics"], ["name", "speedometer-outline"], ["tab", "groups", "href", "/super-admin/groups"], ["name", "layers-outline"], ["tab", "predictions", "href", "/super-admin/predictions"], ["name", "stats-chart-outline"]],
  template: function SuperAdminLayoutPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "ion-header")(2, "ion-toolbar")(3, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SuperAdminLayoutPage_Template_div_click_3_listener() {
        return ctx.navigateTo("/super-admin/dashboard");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "ion-icon", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3)(6, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "SOTD");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Scores On The Doors");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "ion-buttons", 6)(11, "ion-button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SuperAdminLayoutPage_Template_ion_button_click_11_listener() {
        return ctx.navigateTo("/super-admin/settings");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "ion-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "ion-tabs")(14, "ion-tab-bar", 9)(15, "ion-tab-button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "ion-icon", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Dashboard");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "ion-tab-button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "ion-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Metrics");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "ion-tab-button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "ion-icon", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Groups & Users");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "ion-tab-button", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](28, "ion-icon", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "Predictions");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTabs, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTabBar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTabButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonButton, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
  styles: [".profile-button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n}\n\n.profile-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.settings-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin-bottom: 2px;\n}\n\n.page-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  cursor: pointer;\n}\n\n.football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.logo-sotd[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\n.logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n}\n\n.profile-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cGVyLWFkbWluLWxheW91dC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQURGOztBQUlBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7QUFERjs7QUFJQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUFERjs7QUFJQTtFQUNFLGVBQUE7QUFERiIsImZpbGUiOiJzdXBlci1hZG1pbi1sYXlvdXQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3VwZXIgQWRtaW4gTGF5b3V0IFN0eWxlc1xuXG4ucHJvZmlsZS1idXR0b24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDJweDtcbn1cblxuLnByb2ZpbGUtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLnNldHRpbmdzLWljb24ge1xuICBmb250LXNpemU6IDE2cHg7XG4gIG1hcmdpbi1ib3R0b206IDJweDsgLy8gQWxpZ24gd2l0aCBwZXJzb24gaWNvblxufVxuXG4ucGFnZS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmxvZ28tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5mb290YmFsbC1pY29uIHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuXG4ubG9nby10ZXh0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmxvZ28tc290ZCB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbn1cblxuLmxvZ28tc3VidGl0bGUge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbn1cblxuLnByb2ZpbGUtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3N1cGVyLWFkbWluL2xheW91dC9zdXBlci1hZG1pbi1sYXlvdXQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFERjs7QUFJQTtFQUNFLGVBQUE7RUFDQSwrQkFBQTtBQURGOztBQUlBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0FBREY7QUFDQSw0dERBQTR0RCIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN1cGVyIEFkbWluIExheW91dCBTdHlsZXNcblxuLnByb2ZpbGUtYnV0dG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAycHg7XG59XG5cbi5wcm9maWxlLWljb24ge1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbi5zZXR0aW5ncy1pY29uIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtYXJnaW4tYm90dG9tOiAycHg7IC8vIEFsaWduIHdpdGggcGVyc29uIGljb25cbn1cblxuLnBhZ2Utd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5sb2dvLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA4cHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZm9vdGJhbGwtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLmxvZ28tdGV4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5sb2dvLXNvdGQge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG59XG5cbi5sb2dvLXN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG59XG5cbi5wcm9maWxlLWljb24ge1xuICBmb250LXNpemU6IDIwcHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 6680:
/*!*************************************************************!*\
  !*** ./src/app/platforms/super-admin/super-admin.routes.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _layout_super_admin_layout_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/super-admin-layout.page */ 5809);
/* harmony import */ var _core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/guards/auth.guard */ 4978);


const routes = [
// Public routes - no authentication required
{
  path: 'register',
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_platforms_super-admin_pages_register_register_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/register/register.page */ 526)).then(m => m.SuperAdminRegisterPage)
}, {
  path: 'login',
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_platforms_super-admin_pages_login_login_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/login/login.page */ 6394)).then(m => m.SuperAdminLoginPage)
},
// Protected routes - require super-admin authentication
{
  path: '',
  component: _layout_super_admin_layout_page__WEBPACK_IMPORTED_MODULE_0__.SuperAdminLayoutPage,
  canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__.AuthGuard],
  data: {
    expectedRole: 'super-admin'
  },
  children: [{
    path: 'dashboard',
    loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_platforms_super-admin_pages_dashboard_dashboard_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/dashboard/dashboard.page */ 70)).then(m => m.DashboardPage),
    data: {
      preload: true
    }
  }, {
    path: 'metrics',
    loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_platforms_super-admin_pages_metrics_metrics_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/metrics/metrics.page */ 3301)).then(m => m.MetricsPage)
  }, {
    path: 'groups',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_platforms_super-admin_pages_users_users_page_ts"), __webpack_require__.e("src_app_platforms_super-admin_pages_groups_groups_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/groups/groups.page */ 2904)).then(m => m.GroupsPage),
    data: {
      preload: true
    }
  }, {
    path: 'predictions',
    loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_platforms_super-admin_pages_predictions_predictions_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/predictions/predictions.page */ 8846)).then(m => m.PredictionsPage),
    data: {
      preload: true
    }
  }, {
    path: 'users',
    loadComponent: () => __webpack_require__.e(/*! import() */ "default-src_app_platforms_super-admin_pages_users_users_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/users/users.page */ 7106)).then(m => m.UsersPage)
  }, {
    path: 'settings',
    loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_platforms_super-admin_pages_settings_settings_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/settings/settings.page */ 8078)).then(m => m.SettingsPage),
    data: {
      preload: true
    }
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }]
}];

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_super-admin_super-admin_routes_ts.js.map