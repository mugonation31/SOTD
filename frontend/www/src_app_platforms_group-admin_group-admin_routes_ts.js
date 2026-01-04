"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_group-admin_group-admin_routes_ts"],{

/***/ 5476:
/*!*************************************************************!*\
  !*** ./src/app/platforms/group-admin/group-admin.routes.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _layout_group_admin_layout_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/group-admin-layout.page */ 3609);

const routes = [{
  path: '',
  component: _layout_group_admin_layout_page__WEBPACK_IMPORTED_MODULE_0__.GroupAdminLayoutPage,
  children: [{
    path: 'dashboard',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_services_group_service_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_platforms_group-admin_pages_dashboard_dashboard_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/dashboard/dashboard.page */ 8470)).then(m => m.DashboardPage)
  }, {
    path: 'members',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_services_group_service_ts"), __webpack_require__.e("src_app_platforms_group-admin_pages_members_members_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/members/members.page */ 3358)).then(m => m.MembersPage)
  }, {
    path: 'predictions',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_services_mock-data_service_ts"), __webpack_require__.e("src_app_platforms_group-admin_pages_predictions_predictions_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/predictions/predictions.page */ 1566)).then(m => m.PredictionsPage)
  }, {
    path: 'live',
    loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_platforms_group-admin_pages_live_live_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/live/live.page */ 6916)).then(m => m.LivePage)
  }, {
    path: 'groups',
    children: [{
      path: '',
      loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_services_group_service_ts"), __webpack_require__.e("src_app_platforms_group-admin_pages_groups_groups_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/groups/groups.page */ 4392)).then(m => m.GroupsPage)
    }, {
      path: ':id/leaderboard',
      loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_services_group_service_ts"), __webpack_require__.e("src_app_platforms_group-admin_pages_groups_group-leaderboard_group-leaderboard_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/groups/group-leaderboard/group-leaderboard.page */ 7853)).then(m => m.GroupLeaderboardPage)
    }]
  }, {
    path: 'leaderboard',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_core_services_group_service_ts"), __webpack_require__.e("src_app_platforms_group-admin_pages_leaderboard_leaderboard_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/leaderboard/leaderboard.page */ 7886)).then(m => m.LeaderboardPage)
  }, {
    path: 'settings',
    loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_platforms_group-admin_pages_settings_settings_page_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/settings/settings.page */ 5598)).then(m => m.SettingsPage)
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }]
}];

/***/ }),

/***/ 3609:
/*!*************************************************************************!*\
  !*** ./src/app/platforms/group-admin/layout/group-admin-layout.page.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupAdminLayoutPage: () => (/* binding */ GroupAdminLayoutPage)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
var _GroupAdminLayoutPage;






class GroupAdminLayoutPage {
  constructor(router) {
    this.router = router;
    (0,ionicons__WEBPACK_IMPORTED_MODULE_1__.a)({
      gridOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.gridOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.peopleOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.footballOutline,
      settingsOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.settingsOutline,
      peopleCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.peopleCircleOutline,
      personOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personOutline,
      eyeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.eyeOutline,
      addCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.addCircleOutline,
      calendarOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.calendarOutline,
      personCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personCircleOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.trophyOutline
    });
  }
  navigateTo(path) {
    this.router.navigate([path], {
      replaceUrl: true
    });
  }
}
_GroupAdminLayoutPage = GroupAdminLayoutPage;
_GroupAdminLayoutPage.ɵfac = function GroupAdminLayoutPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GroupAdminLayoutPage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
};
_GroupAdminLayoutPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _GroupAdminLayoutPage,
  selectors: [["app-group-admin-layout"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
  decls: 34,
  vars: 0,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], ["slot", "end"], [3, "click"], ["name", "person-outline", 1, "profile-icon"], ["slot", "bottom"], ["tab", "dashboard", "href", "/group-admin/dashboard"], ["name", "grid-outline"], ["tab", "members", "href", "/group-admin/members"], ["name", "people-outline"], ["tab", "predictions", "href", "/group-admin/predictions"], ["name", "football-outline"], ["tab", "live", "href", "/group-admin/live"], ["name", "eye-outline"], ["tab", "groups", "href", "/group-admin/groups"], ["name", "people-circle-outline"]],
  template: function GroupAdminLayoutPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function GroupAdminLayoutPage_Template_div_click_2_listener() {
        return ctx.navigateTo("/group-admin/dashboard");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 2)(5, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "SOTD");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "ion-buttons", 5)(10, "ion-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function GroupAdminLayoutPage_Template_ion_button_click_10_listener() {
        return ctx.navigateTo("/group-admin/settings");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "ion-tabs")(13, "ion-tab-bar", 8)(14, "ion-tab-button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "ion-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Dashboard");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "ion-tab-button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](19, "ion-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Members");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "ion-tab-button", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](23, "ion-icon", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Predictions");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "ion-tab-button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](27, "ion-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, "Live");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "ion-tab-button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](31, "ion-icon", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "Groups");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTabs, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTabBar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonTabButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonButton, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
  styles: [".header-logo[_ngcontent-%COMP%] {\n  height: 40px;\n  margin: 8px 16px;\n}\n\nion-toolbar[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --padding-end: 0;\n}\n\nion-title[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 500;\n}\n\n.profile-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  cursor: pointer;\n}\n\n.football-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.logo-sotd[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n\n.logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n  line-height: 1;\n}\n\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwLWFkbWluLWxheW91dC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUFERjs7QUFJQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7QUFERjs7QUFJQTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7QUFERjs7QUFJQTtFQUNFLGVBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFERjs7QUFJQTtFQUNFLGVBQUE7RUFDQSwrQkFBQTtBQURGOztBQUlBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsY0FBQTtBQURGOztBQUlBLGlDQUFBIiwiZmlsZSI6Imdyb3VwLWFkbWluLWxheW91dC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBHcm91cCBBZG1pbiBMYXlvdXQgU3R5bGVzXHJcblxyXG4uaGVhZGVyLWxvZ28ge1xyXG4gIGhlaWdodDogNDBweDtcclxuICBtYXJnaW46IDhweCAxNnB4O1xyXG59XHJcblxyXG5pb24tdG9vbGJhciB7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG4gIC0tcGFkZGluZy1lbmQ6IDA7XHJcbn1cclxuXHJcbmlvbi10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuLnByb2ZpbGUtaWNvbiB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcblxyXG4ubG9nby1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDhweDtcclxuICBwYWRkaW5nOiA4cHggMTZweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5mb290YmFsbC1pY29uIHtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxufVxyXG5cclxuLmxvZ28tdGV4dCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4ubG9nby1zb3RkIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBsaW5lLWhlaWdodDogMS4yO1xyXG59XHJcblxyXG4ubG9nby1zdWJ0aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICBsaW5lLWhlaWdodDogMTtcclxufVxyXG5cclxuLyogTW92ZSB0aGUgc3R5bGVzIGNvbnRlbnQgaGVyZSAqL1xyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2dyb3VwLWFkbWluL2xheW91dC9ncm91cC1hZG1pbi1sYXlvdXQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FBREY7O0FBSUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBREY7O0FBSUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFERjs7QUFJQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGNBQUE7QUFERjs7QUFJQSxpQ0FBQTtBQURBLHd4REFBd3hEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gR3JvdXAgQWRtaW4gTGF5b3V0IFN0eWxlc1xyXG5cclxuLmhlYWRlci1sb2dvIHtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbiAgbWFyZ2luOiA4cHggMTZweDtcclxufVxyXG5cclxuaW9uLXRvb2xiYXIge1xyXG4gIC0tcGFkZGluZy1zdGFydDogMDtcclxuICAtLXBhZGRpbmctZW5kOiAwO1xyXG59XHJcblxyXG5pb24tdGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuXHJcbi5wcm9maWxlLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG5cclxuLmxvZ28tY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiA4cHg7XHJcbiAgcGFkZGluZzogOHB4IDE2cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uZm9vdGJhbGwtaWNvbiB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbn1cclxuXHJcbi5sb2dvLXRleHQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5cclxuLmxvZ28tc290ZCB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbGluZS1oZWlnaHQ6IDEuMjtcclxufVxyXG5cclxuLmxvZ28tc3VidGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbn1cclxuXHJcbi8qIE1vdmUgdGhlIHN0eWxlcyBjb250ZW50IGhlcmUgKi9cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_group-admin_group-admin_routes_ts.js.map