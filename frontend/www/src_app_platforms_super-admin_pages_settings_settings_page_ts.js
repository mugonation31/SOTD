"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_super-admin_pages_settings_settings_page_ts"],{

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

/***/ 8078:
/*!***********************************************************************!*\
  !*** ./src/app/platforms/super-admin/pages/settings/settings.page.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsPage: () => (/* binding */ SettingsPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/toast.service */ 5423);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/auth.service */ 8010);

var _SettingsPage;










function SettingsPage_div_15_img_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "img", 39);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", ctx_r1.profile.profilePicture, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
  }
}
function SettingsPage_div_15_ion_icon_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-icon", 40);
  }
}
function SettingsPage_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "ion-card")(2, "ion-card-header")(3, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Super Admin Profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ion-card-content")(6, "div", 9)(7, "div", 10)(8, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, SettingsPage_div_15_img_9_Template, 1, 1, "img", 12)(10, SettingsPage_div_15_ion_icon_10_Template, 1, 0, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "input", 14, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function SettingsPage_div_15_Template_input_change_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.onFileSelected($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_15_Template_div_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const fileInput_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](12);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](fileInput_r3.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "ion-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 17)(16, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "p", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, "Super Administrator");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "ion-chip", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](21, "ion-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Full System Access");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "ion-list")(25, "ion-item")(26, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "ion-input", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_input_ngModelChange_28_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.profile.name, $event) || (ctx_r1.profile.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "ion-item")(30, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "ion-input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_input_ngModelChange_32_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.profile.email, $event) || (ctx_r1.profile.email = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "ion-item")(34, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](35, "Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "ion-input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_input_ngModelChange_36_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.profile.phone, $event) || (ctx_r1.profile.phone = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "ion-button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_15_Template_ion_button_click_37_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.updateProfile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](38, " Update Profile ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "ion-card")(40, "ion-card-header")(41, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](42, "ion-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](43, " System Overview ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "ion-card-content")(45, "ion-list")(46, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](47, "ion-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "ion-label")(49, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](50, "Total Groups");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](51, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](52);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](53, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](54, "ion-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](55, "ion-label")(56, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](57, "Total Players");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](58, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](61, "ion-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](62, "ion-label")(63, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](64, "Current Gameweek");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](65, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](66);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](67, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](68, "ion-icon", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](69, "ion-label")(70, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](71, "Predictions This Week");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](72, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](73);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](74, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](75, "ion-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](76, "ion-label")(77, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](78, "System Uptime");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](79, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](80);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](81, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](82, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](83, "ion-label")(84, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](85, "Last Backup");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](86, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](87);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](88, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](89, "ion-button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_15_Template_ion_button_click_89_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.backupSystem());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](90, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](91, " Backup System ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](92, "ion-card")(93, "ion-card-header")(94, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](95, "ion-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](96, " Security ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](97, "ion-card-content")(98, "ion-list")(99, "ion-item")(100, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](101, "Current Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](102, "ion-input", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_input_ngModelChange_102_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.passwordForm.current, $event) || (ctx_r1.passwordForm.current = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](103, "ion-item")(104, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](105, "New Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](106, "ion-input", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_input_ngModelChange_106_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.passwordForm.new, $event) || (ctx_r1.passwordForm.new = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](107, "ion-item")(108, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](109, "Confirm Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](110, "ion-input", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_input_ngModelChange_110_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.passwordForm.confirm, $event) || (ctx_r1.passwordForm.confirm = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](111, "ion-item", 34)(112, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](113, "Enable Two-Factor Authentication");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](114, "ion-toggle", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_toggle_ngModelChange_114_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.security.twoFactorEnabled, $event) || (ctx_r1.security.twoFactorEnabled = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ionChange", function SettingsPage_div_15_Template_ion_toggle_ionChange_114_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.toggleTwoFactor());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](115, "ion-button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_15_Template_ion_button_click_115_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.changePassword());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](116, "ion-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](117, " Change Password ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](118, "ion-button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_15_Template_ion_button_click_118_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](119, "ion-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](120, " Logout ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.profile.profilePicture);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r1.profile.profilePicture);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.profile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.profile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.profile.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.profile.phone);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r1.systemMetrics.totalGroups, " active groups");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r1.systemMetrics.totalPlayers, " registered players");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Week ", ctx_r1.systemMetrics.activeGameweek, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r1.systemMetrics.predictionsThisWeek, " submissions");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.systemMetrics.systemUptime);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](88, 16, ctx_r1.systemMetrics.lastBackup, "medium"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.passwordForm.current);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.passwordForm.new);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.passwordForm.confirm);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.security.twoFactorEnabled);
  }
}
function SettingsPage_div_16_ng_template_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-datetime", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_ng_template_73_Template_ion_datetime_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.predictionDeadlines.defaultTime, $event) || (ctx_r1.settings.predictionDeadlines.defaultTime = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.predictionDeadlines.defaultTime);
  }
}
function SettingsPage_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6)(1, "ion-card")(2, "ion-card-header")(3, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, " Game Rules ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-card-content")(7, "div", 42)(8, "div", 43)(9, "h4", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Match Settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "ion-item")(12, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "Matches Per Gameweek");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "ion-input", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "ion-note");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "Required predictions per week");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "div", 43)(18, "h4", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, "Points System");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "div", 46)(21, "ion-item")(22, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Home Win");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "ion-input", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_input_ngModelChange_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.scoring.homeWinPoints, $event) || (ctx_r1.settings.scoring.homeWinPoints = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "ion-item")(26, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, "Away Win");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "ion-input", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_input_ngModelChange_28_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.scoring.awayWinPoints, $event) || (ctx_r1.settings.scoring.awayWinPoints = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "ion-item")(30, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, "Draw");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "ion-input", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_input_ngModelChange_32_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.scoring.drawPoints, $event) || (ctx_r1.settings.scoring.drawPoints = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "ion-item")(34, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](35, "Correct Score");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "ion-input", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_input_ngModelChange_36_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.scoring.correctScorePoints, $event) || (ctx_r1.settings.scoring.correctScorePoints = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "div", 43)(38, "h4", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39, "Bonus Points");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "ion-item")(41, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](42, "Perfect Week Bonus");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "ion-input", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_input_ngModelChange_43_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.scoring.perfectWeekBonus, $event) || (ctx_r1.settings.scoring.perfectWeekBonus = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "ion-note");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](45, "Extra points for all correct predictions");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "ion-card")(47, "ion-card-header")(48, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](49, "ion-icon", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](50, " Special Events ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](51, "ion-card-content")(52, "ion-list")(53, "ion-item")(54, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](55, "Boxing Day - All Matches Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](56, "ion-toggle", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](57, "ion-item")(58, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](59, "Final Day - All Matches Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](60, "ion-toggle", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](61, "ion-card")(62, "ion-card-header")(63, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](64, "ion-icon", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](65, " Deadlines & Jokers ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](66, "ion-card-content")(67, "ion-list")(68, "ion-item")(69, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](70, "Default Deadline Time");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](71, "ion-datetime-button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](72, "ion-modal", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](73, SettingsPage_div_16_ng_template_73_Template, 1, 1, "ng-template");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](74, "ion-item")(75, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](76, "Reminder Hours Before Deadline");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](77, "ion-select", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_select_ngModelChange_77_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.predictionDeadlines.reminderHours, $event) || (ctx_r1.settings.predictionDeadlines.reminderHours = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](78, "ion-select-option", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](79, "1 hour");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](80, "ion-select-option", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](81, "2 hours");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](82, "ion-select-option", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](83, "4 hours");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](84, "ion-select-option", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](85, "12 hours");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](86, "ion-select-option", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](87, "24 hours");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](88, "ion-item")(89, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](90, "First Joker - Before Boxing Day");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](91, "ion-toggle", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](92, "ion-item")(93, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](94, "Second Joker - Before Final Day");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](95, "ion-toggle", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](96, "ion-item")(97, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](98, "Auto-apply Unused Jokers");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](99, "ion-toggle", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](100, "ion-card")(101, "ion-card-header")(102, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](103, "ion-icon", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](104, " Notifications ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](105, "ion-card-content")(106, "ion-list")(107, "ion-item")(108, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](109, "Enable Email Notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](110, "ion-toggle", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_toggle_ngModelChange_110_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.notifications.enableEmailNotifications, $event) || (ctx_r1.settings.notifications.enableEmailNotifications = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](111, "ion-item")(112, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](113, "Enable Push Notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](114, "ion-toggle", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_toggle_ngModelChange_114_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.notifications.enablePushNotifications, $event) || (ctx_r1.settings.notifications.enablePushNotifications = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](115, "ion-item")(116, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](117, "Notify Group Admins");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](118, "ion-toggle", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_toggle_ngModelChange_118_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.notifications.notifyAdminsBeforeDeadline, $event) || (ctx_r1.settings.notifications.notifyAdminsBeforeDeadline = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](119, "ion-item")(120, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](121, "Notify Players");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](122, "ion-toggle", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_toggle_ngModelChange_122_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.notifications.notifyPlayersBeforeDeadline, $event) || (ctx_r1.settings.notifications.notifyPlayersBeforeDeadline = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](123, "ion-card")(124, "ion-card-header")(125, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](126, "ion-icon", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](127, " Display Settings ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](128, "ion-card-content")(129, "ion-list")(130, "ion-item")(131, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](132, "Timezone");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](133, "ion-select", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_select_ngModelChange_133_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.display.timezone, $event) || (ctx_r1.settings.display.timezone = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](134, "ion-select-option", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](135, "UTC");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](136, "ion-select-option", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](137, "GMT (London)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](138, "ion-select-option", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](139, "EST (New York)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](140, "ion-item")(141, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](142, "Date Format");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](143, "ion-select", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_select_ngModelChange_143_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.display.dateFormat, $event) || (ctx_r1.settings.display.dateFormat = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](144, "ion-select-option", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](145, "DD/MM/YYYY");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](146, "ion-select-option", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](147, "MM/DD/YYYY");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](148, "ion-select-option", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](149, "YYYY-MM-DD");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](150, "ion-item")(151, "ion-label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](152, "Language");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](153, "ion-select", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_16_Template_ion_select_ngModelChange_153_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.settings.display.language, $event) || (ctx_r1.settings.display.language = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](154, "ion-select-option", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](155, "English");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](156, "ion-select-option", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](157, "Spanish");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](158, "ion-select-option", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](159, "French");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](160, "ion-button", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_16_Template_ion_button_click_160_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.saveSettings());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](161, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](162, " Save Settings ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.scoring.homeWinPoints);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.scoring.awayWinPoints);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.scoring.drawPoints);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.scoring.correctScorePoints);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.scoring.perfectWeekBonus);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("keepContentsMounted", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.predictionDeadlines.reminderHours);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.notifications.enableEmailNotifications);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.notifications.enablePushNotifications);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.notifications.notifyAdminsBeforeDeadline);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.notifications.notifyPlayersBeforeDeadline);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.display.timezone);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.display.dateFormat);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.settings.display.language);
  }
}
class SettingsPage {
  constructor(toastService, router, authService) {
    this.toastService = toastService;
    this.router = router;
    this.authService = authService;
    this.activeTab = 'profile';
    this.profile = {
      name: 'Super Admin',
      email: 'admin@example.com',
      phone: '',
      profilePicture: null
    };
    this.passwordForm = {
      current: '',
      new: '',
      confirm: ''
    };
    this.security = {
      twoFactorEnabled: false
    };
    this.systemMetrics = {
      totalGroups: 5,
      totalPlayers: 127,
      activeGameweek: 25,
      predictionsThisWeek: 98,
      systemUptime: '15 days, 7 hours',
      lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    };
    this.settings = {
      predictionDeadlines: {
        defaultTime: '11:30',
        reminderHours: 24,
        allowLateSubmissions: false
      },
      scoring: {
        homeWinPoints: 3,
        awayWinPoints: 4,
        drawPoints: 6,
        correctScorePoints: 3,
        perfectWeekBonus: 10
      },
      notifications: {
        enableEmailNotifications: true,
        enablePushNotifications: true,
        notifyAdminsBeforeDeadline: true,
        notifyPlayersBeforeDeadline: true
      },
      display: {
        timezone: 'GMT',
        dateFormat: 'DD/MM/YYYY',
        language: 'en'
      }
    };
    (0,ionicons__WEBPACK_IMPORTED_MODULE_5__.a)({
      personCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.personCircleOutline,
      settingsOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.settingsOutline,
      personOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.personOutline,
      cameraOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.cameraOutline,
      shieldOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.shieldOutline,
      statsChartOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.statsChartOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.peopleOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.footballOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.checkmarkCircleOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.timeOutline,
      saveOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.saveOutline,
      keyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.keyOutline,
      logOutOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.logOutOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trophyOutline,
      timerOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.timerOutline,
      notificationsCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.notificationsCircleOutline,
      globeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.globeOutline,
      notificationsOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.notificationsOutline,
      alertCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.alertCircleOutline,
      calendarOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.calendarOutline,
      mailOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.mailOutline
    });
  }
  onFileSelected(event) {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const input = event.target;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        // Validate file type
        if (!file.type.startsWith('image/')) {
          yield _this.toastService.showToast('Please select an image file', 'error');
          return;
        }
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          yield _this.toastService.showToast('Image size should be less than 5MB', 'error');
          return;
        }
        // Create preview
        const reader = new FileReader();
        reader.onload = e => {
          var _e$target;
          _this.profile.profilePicture = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.result;
        };
        reader.readAsDataURL(file);
      }
    })();
  }
  updateProfile() {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // TODO: Implement API call
        yield new Promise(resolve => setTimeout(resolve, 1000));
        yield _this2.toastService.showToast('Profile updated successfully', 'success');
      } catch (error) {
        yield _this2.toastService.showToast('Failed to update profile', 'error');
      }
    })();
  }
  changePassword() {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this3.passwordForm.current) {
        yield _this3.toastService.showToast('Please enter your current password', 'error');
        return;
      }
      if (!_this3.passwordForm.new) {
        yield _this3.toastService.showToast('Please enter a new password', 'error');
        return;
      }
      if (_this3.passwordForm.new !== _this3.passwordForm.confirm) {
        yield _this3.toastService.showToast('New passwords do not match', 'error');
        return;
      }
      try {
        // TODO: Implement API call
        yield new Promise(resolve => setTimeout(resolve, 1000));
        _this3.passwordForm = {
          current: '',
          new: '',
          confirm: ''
        };
        yield _this3.toastService.showToast('Password changed successfully', 'success');
      } catch (error) {
        yield _this3.toastService.showToast('Failed to change password', 'error');
      }
    })();
  }
  toggleTwoFactor() {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // TODO: Implement API call
        yield new Promise(resolve => setTimeout(resolve, 1000));
        const status = _this4.security.twoFactorEnabled ? 'enabled' : 'disabled';
        yield _this4.toastService.showToast(`Two-factor authentication ${status}`, 'success');
      } catch (error) {
        _this4.security.twoFactorEnabled = !_this4.security.twoFactorEnabled; // Revert on error
        yield _this4.toastService.showToast('Failed to update two-factor authentication', 'error');
      }
    })();
  }
  backupSystem() {
    var _this5 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // TODO: Implement API call
        yield new Promise(resolve => setTimeout(resolve, 1500));
        _this5.systemMetrics.lastBackup = new Date();
        yield _this5.toastService.showToast('System backup completed successfully', 'success');
      } catch (error) {
        yield _this5.toastService.showToast('Failed to backup system', 'error');
      }
    })();
  }
  logout() {
    var _this6 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Mark first login as complete since user is logging out from first-time page
        _this6.authService.markFirstLoginComplete();
        // Perform logout
        _this6.authService.logout();
        yield _this6.toastService.showToast('Logged out successfully', 'success');
        // Redirect to login page WITHOUT any returnUrl or query parameters
        // This ensures clean navigation and the logo will go to welcome page
        _this6.router.navigate(['/auth/login'], {
          replaceUrl: true,
          queryParams: {} // Clear any existing query parameters
        });
      } catch (error) {
        console.error('Logout error:', error);
        yield _this6.toastService.showToast('Error during logout', 'error');
      }
    })();
  }
  saveSettings() {
    var _this7 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // TODO: Implement API call to save settings
        yield _this7.toastService.showToast('Settings saved successfully', 'success');
      } catch (error) {
        yield _this7.toastService.showToast('Error saving settings', 'error');
      }
    })();
  }
}
_SettingsPage = SettingsPage;
_SettingsPage.ɵfac = function SettingsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SettingsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService));
};
_SettingsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _SettingsPage,
  selectors: [["app-settings"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
  decls: 17,
  vars: 3,
  consts: [["fileInput", ""], [3, "ngModelChange", "ngModel"], ["value", "profile"], ["name", "person-circle-outline"], ["value", "settings"], ["name", "settings-outline"], [1, "ion-padding"], [4, "ngIf"], ["class", "ion-padding", 4, "ngIf"], [1, "profile-header"], [1, "profile-picture-container"], [1, "profile-picture"], ["alt", "Profile picture", 3, "src", 4, "ngIf"], ["name", "person-outline", 4, "ngIf"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], [1, "camera-icon", 3, "click"], ["name", "camera-outline"], [1, "profile-info"], [1, "role"], ["color", "primary"], ["name", "shield-outline"], ["position", "stacked"], ["type", "email", 3, "ngModelChange", "ngModel"], ["type", "tel", 3, "ngModelChange", "ngModel"], ["expand", "block", 1, "ion-margin-top", 3, "click"], ["name", "stats-chart-outline"], ["name", "people-outline", "slot", "start"], ["name", "person-outline", "slot", "start"], ["name", "football-outline", "slot", "start"], ["name", "checkmark-circle-outline", "slot", "start"], ["name", "time-outline", "slot", "start"], ["name", "save-outline", "slot", "start"], ["expand", "block", "color", "tertiary", 1, "ion-margin-top", 3, "click"], ["type", "password", 3, "ngModelChange", "ngModel"], ["lines", "none"], [3, "ngModelChange", "ionChange", "ngModel"], ["name", "key-outline", "slot", "start"], ["expand", "block", "color", "danger", 1, "ion-margin-top", 3, "click"], ["name", "log-out-outline", "slot", "start"], ["alt", "Profile picture", 3, "src"], ["name", "person-outline"], ["name", "football-outline"], [1, "settings-grid"], [1, "settings-group"], [1, "settings-group-title"], ["type", "number", "value", "3", "readonly", ""], [1, "points-grid"], ["type", "number", 3, "ngModelChange", "ngModel"], ["name", "trophy-outline"], ["checked", "", "disabled", ""], ["name", "timer-outline"], ["datetime", "defaultDeadline"], [3, "keepContentsMounted"], ["value", "1"], ["value", "2"], ["value", "4"], ["value", "12"], ["value", "24"], ["name", "notifications-circle-outline"], ["name", "globe-outline"], ["value", "UTC"], ["value", "GMT"], ["value", "EST"], ["value", "DD/MM/YYYY"], ["value", "MM/DD/YYYY"], ["value", "YYYY-MM-DD"], ["value", "en"], ["value", "es"], ["value", "fr"], ["expand", "block", 1, "ion-margin-top", "ion-margin-bottom", 3, "click"], ["id", "defaultDeadline", "presentation", "time", 3, "ngModelChange", "ngModel"]],
  template: function SettingsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Profile & Settings");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-toolbar")(5, "ion-segment", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_Template_ion_segment_ngModelChange_5_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.activeTab, $event) || (ctx.activeTab = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-segment-button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "ion-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Profile");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-segment-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "Settings");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "ion-content", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, SettingsPage_div_15_Template, 121, 19, "div", 7)(16, SettingsPage_div_16_Template, 163, 14, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.activeTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.activeTab === "profile");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.activeTab === "settings");
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSegment, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSegmentButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonToggle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSelect, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSelectOption, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonDatetimeButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonDatetime, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonModal, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonChip, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonList, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonNote, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel],
  styles: ["ion-segment[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n\nion-card[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  margin-bottom: 1rem;\n}\n\nion-datetime[_ngcontent-%COMP%] {\n  margin: auto;\n}\n\n.profile-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 20px;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n  margin-bottom: 20px;\n}\n\n.profile-picture-container[_ngcontent-%COMP%] {\n  position: relative;\n  margin-right: 20px;\n  width: 100px;\n  height: 100px;\n}\n\n.profile-picture[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background: var(--ion-color-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  border: 1px solid var(--ion-color-medium-tint);\n}\n\n.profile-picture[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.profile-picture[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: var(--ion-color-medium);\n}\n\n.camera-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  background: white;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  border: 1px solid var(--ion-color-medium-tint);\n}\n\n.camera-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-medium);\n}\n\n.profile-info[_ngcontent-%COMP%] {\n  flex: 1;\n  padding-left: 8px;\n}\n\n.profile-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 24px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\n.role[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  margin: 0 0 12px 0;\n  font-size: 16px;\n  font-weight: 500;\n}\n\nion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  vertical-align: middle;\n  margin-right: 8px;\n}\n\n.settings-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n}\n\nion-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  border-radius: 12px;\n}\n\nion-card-header[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: var(--ion-color-light);\n  border-bottom: 1px solid var(--ion-color-light-shade);\n}\n\nion-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  font-size: 18px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\nion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n\nion-card-subtitle[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  color: var(--ion-color-medium);\n  font-size: 14px;\n}\n\n.settings-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.settings-section[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.settings-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\nion-item[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --inner-padding-end: 0;\n  margin-bottom: 12px;\n}\n\nion-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\nion-note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n  margin-top: 4px;\n}\n\nion-toggle[_ngcontent-%COMP%] {\n  padding-right: 0;\n}\n\n.save-button[_ngcontent-%COMP%] {\n  margin: 20px;\n}\n\n@media (max-width: 576px) {\n  ion-card-header[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  ion-card-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .settings-section[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n}\nion-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  border-radius: 8px;\n  box-shadow: none;\n  border: 1px solid var(--ion-color-light-shade);\n}\n\nion-card-header[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid var(--ion-color-light-shade);\n}\n\nion-card-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\nion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--ion-color-primary);\n}\n\nion-card-content[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --inner-padding-end: 0;\n  --background: transparent;\n  --border-color: var(--ion-color-light-shade);\n  margin-bottom: 8px;\n}\n\nion-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\nion-label[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--ion-color-dark);\n}\n\nion-input[_ngcontent-%COMP%], \nion-select[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  margin-top: 4px;\n}\n\nion-toggle[_ngcontent-%COMP%] {\n  padding-right: 0;\n}\n\nion-button[_ngcontent-%COMP%] {\n  margin: 32px 16px !important;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  font-weight: 500;\n}\n\n@media (max-width: 576px) {\n  ion-card-header[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  ion-card-content[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n}\n.settings-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.settings-group[_ngcontent-%COMP%] {\n  background: var(--ion-color-light-tint);\n  border-radius: 8px;\n  padding: 16px;\n}\n\n.settings-group-title[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.points-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 16px;\n}\n\n.points-grid[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\nion-note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n  margin-top: 4px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9DQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsOENBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLDhDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUFDRjs7QUFFQTtFQUNFLE9BQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQUNGOztBQUVBO0VBQ0UsOEJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0Usc0JBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxxREFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLCtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGFBQUE7RUFDRjtFQUVBO0lBQ0UsYUFBQTtFQUFGO0VBR0E7SUFDRSxtQkFBQTtFQURGO0FBQ0Y7QUFJQTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDhDQUFBO0FBRkY7O0FBS0E7RUFDRSxhQUFBO0VBQ0EscURBQUE7QUFGRjs7QUFLQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFGRjs7QUFLQTtFQUNFLGVBQUE7RUFDQSwrQkFBQTtBQUZGOztBQUtBO0VBQ0UsYUFBQTtBQUZGOztBQUtBO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsNENBQUE7RUFDQSxrQkFBQTtBQUZGOztBQUtBO0VBQ0UsZ0JBQUE7QUFGRjs7QUFLQTtFQUNFLFNBQUE7RUFDQSw0QkFBQTtBQUZGOztBQUtBOztFQUVFLGtCQUFBO0VBQ0EsZUFBQTtBQUZGOztBQUtBO0VBQ0UsZ0JBQUE7QUFGRjs7QUFLQTtFQUNFLDRCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0FBRkY7O0FBS0E7RUFDRTtJQUNFLGFBQUE7RUFGRjtFQUtBO0lBQ0UsYUFBQTtFQUhGO0FBQ0Y7QUFNQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUFKRjs7QUFPQTtFQUNFLHVDQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBSkY7O0FBT0E7RUFDRSw4QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQUpGOztBQU9BO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtBQUpGOztBQU9BO0VBQ0UsU0FBQTtBQUpGOztBQU9BO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtBQUpGIiwiZmlsZSI6InNldHRpbmdzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1zZWdtZW50IHtcclxuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbn1cclxuXHJcbmlvbi1jYXJkIHtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG59XHJcblxyXG5pb24taXRlbSB7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbn1cclxuXHJcbmlvbi1kYXRldGltZSB7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG59XHJcblxyXG4ucHJvZmlsZS1oZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5wcm9maWxlLXBpY3R1cmUtY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBoZWlnaHQ6IDEwMHB4O1xyXG59XHJcblxyXG4ucHJvZmlsZS1waWN0dXJlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLW1lZGl1bS10aW50KTtcclxufVxyXG5cclxuLnByb2ZpbGUtcGljdHVyZSBpbWcge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxufVxyXG5cclxuLnByb2ZpbGUtcGljdHVyZSBpb24taWNvbiB7XHJcbiAgZm9udC1zaXplOiA0OHB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxufVxyXG5cclxuLmNhbWVyYS1pY29uIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB3aWR0aDogMjRweDtcclxuICBoZWlnaHQ6IDI0cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXRpbnQpO1xyXG59XHJcblxyXG4uY2FtZXJhLWljb24gaW9uLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbn1cclxuXHJcbi5wcm9maWxlLWluZm8ge1xyXG4gIGZsZXg6IDE7XHJcbiAgcGFkZGluZy1sZWZ0OiA4cHg7XHJcbn1cclxuXHJcbi5wcm9maWxlLWluZm8gaDIge1xyXG4gIG1hcmdpbjogMCAwIDhweCAwO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbn1cclxuXHJcbi5yb2xlIHtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgbWFyZ2luOiAwIDAgMTJweCAwO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcblxyXG5pb24tY2FyZC10aXRsZSBpb24taWNvbiB7XHJcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICBtYXJnaW4tcmlnaHQ6IDhweDtcclxufVxyXG5cclxuLnNldHRpbmdzLWNvbnRhaW5lciB7XHJcbiAgbWF4LXdpZHRoOiA4MDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxufVxyXG5cclxuaW9uLWNhcmQge1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxufVxyXG5cclxuaW9uLWNhcmQtaGVhZGVyIHtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XHJcbn1cclxuXHJcbmlvbi1jYXJkLXRpdGxlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxufVxyXG5cclxuaW9uLWNhcmQtdGl0bGUgaW9uLWljb24ge1xyXG4gIG1hcmdpbi1yaWdodDogOHB4O1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG59XHJcblxyXG5pb24tY2FyZC1zdWJ0aXRsZSB7XHJcbiAgbWFyZ2luLXRvcDogNHB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5zZXR0aW5ncy1zZWN0aW9uIHtcclxuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xyXG59XHJcblxyXG4uc2V0dGluZ3Mtc2VjdGlvbjpsYXN0LWNoaWxkIHtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcblxyXG4uc2V0dGluZ3Mtc2VjdGlvbiBoMyB7XHJcbiAgbWFyZ2luOiAwIDAgMTJweCAwO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbn1cclxuXHJcbmlvbi1pdGVtIHtcclxuICAtLXBhZGRpbmctc3RhcnQ6IDA7XHJcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcclxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xyXG59XHJcblxyXG5pb24taXRlbTpsYXN0LWNoaWxkIHtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcblxyXG5pb24tbm90ZSB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICBtYXJnaW4tdG9wOiA0cHg7XHJcbn1cclxuXHJcbmlvbi10b2dnbGUge1xyXG4gIHBhZGRpbmctcmlnaHQ6IDA7XHJcbn1cclxuXHJcbi5zYXZlLWJ1dHRvbiB7XHJcbiAgbWFyZ2luOiAyMHB4O1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcclxuICBpb24tY2FyZC1oZWFkZXIge1xyXG4gICAgcGFkZGluZzogMTJweDtcclxuICB9XHJcblxyXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xyXG4gICAgcGFkZGluZzogMTZweDtcclxuICB9XHJcblxyXG4gIC5zZXR0aW5ncy1zZWN0aW9uIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG59XHJcblxyXG5pb24tY2FyZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgYm94LXNoYWRvdzogbm9uZTtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xyXG59XHJcblxyXG5pb24tY2FyZC1oZWFkZXIge1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XHJcbn1cclxuXHJcbmlvbi1jYXJkLXRpdGxlIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiA4cHg7XHJcbn1cclxuXHJcbmlvbi1jYXJkLXRpdGxlIGlvbi1pY29uIHtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxufVxyXG5cclxuaW9uLWNhcmQtY29udGVudCB7XHJcbiAgcGFkZGluZzogMTZweDtcclxufVxyXG5cclxuaW9uLWl0ZW0ge1xyXG4gIC0tcGFkZGluZy1zdGFydDogMDtcclxuICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xyXG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgLS1ib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcblxyXG5pb24taXRlbTpsYXN0LWNoaWxkIHtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcblxyXG5pb24tbGFiZWwge1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG59XHJcblxyXG5pb24taW5wdXQsXHJcbmlvbi1zZWxlY3Qge1xyXG4gIC0tcGFkZGluZy1zdGFydDogMDtcclxuICBtYXJnaW4tdG9wOiA0cHg7XHJcbn1cclxuXHJcbmlvbi10b2dnbGUge1xyXG4gIHBhZGRpbmctcmlnaHQ6IDA7XHJcbn1cclxuXHJcbmlvbi1idXR0b24ge1xyXG4gIG1hcmdpbjogMzJweCAxNnB4ICFpbXBvcnRhbnQ7XHJcbiAgLS1wYWRkaW5nLXRvcDogMTZweDtcclxuICAtLXBhZGRpbmctYm90dG9tOiAxNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xyXG4gIGlvbi1jYXJkLWhlYWRlciB7XHJcbiAgICBwYWRkaW5nOiAxMnB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLWNhcmQtY29udGVudCB7XHJcbiAgICBwYWRkaW5nOiAxMnB4O1xyXG4gIH1cclxufVxyXG5cclxuLnNldHRpbmdzLWdyaWQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDI0cHg7XHJcbn1cclxuXHJcbi5zZXR0aW5ncy1ncm91cCB7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG59XHJcblxyXG4uc2V0dGluZ3MtZ3JvdXAtdGl0bGUge1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBtYXJnaW46IDAgMCAxMnB4IDA7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBsZXR0ZXItc3BhY2luZzogMC41cHg7XHJcbn1cclxuXHJcbi5wb2ludHMtZ3JpZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDE0MHB4LCAxZnIpKTtcclxuICBnYXA6IDE2cHg7XHJcbn1cclxuXHJcbi5wb2ludHMtZ3JpZCBpb24taXRlbSB7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG5pb24tbm90ZSB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICBtYXJnaW4tdG9wOiA0cHg7XHJcbn1cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3N1cGVyLWFkbWluL3BhZ2VzL3NldHRpbmdzL3NldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9DQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsOENBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLDhDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7QUFDRjs7QUFFQTtFQUNFLE9BQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQUNGOztBQUVBO0VBQ0UsOEJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0Usc0JBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxxREFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLCtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGFBQUE7RUFDRjtFQUVBO0lBQ0UsYUFBQTtFQUFGO0VBR0E7SUFDRSxtQkFBQTtFQURGO0FBQ0Y7QUFJQTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDhDQUFBO0FBRkY7O0FBS0E7RUFDRSxhQUFBO0VBQ0EscURBQUE7QUFGRjs7QUFLQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFGRjs7QUFLQTtFQUNFLGVBQUE7RUFDQSwrQkFBQTtBQUZGOztBQUtBO0VBQ0UsYUFBQTtBQUZGOztBQUtBO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsNENBQUE7RUFDQSxrQkFBQTtBQUZGOztBQUtBO0VBQ0UsZ0JBQUE7QUFGRjs7QUFLQTtFQUNFLFNBQUE7RUFDQSw0QkFBQTtBQUZGOztBQUtBOztFQUVFLGtCQUFBO0VBQ0EsZUFBQTtBQUZGOztBQUtBO0VBQ0UsZ0JBQUE7QUFGRjs7QUFLQTtFQUNFLDRCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0FBRkY7O0FBS0E7RUFDRTtJQUNFLGFBQUE7RUFGRjtFQUtBO0lBQ0UsYUFBQTtFQUhGO0FBQ0Y7QUFNQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUFKRjs7QUFPQTtFQUNFLHVDQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBSkY7O0FBT0E7RUFDRSw4QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQUpGOztBQU9BO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtBQUpGOztBQU9BO0VBQ0UsU0FBQTtBQUpGOztBQU9BO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtBQUpGO0FBQ0EsdzZUQUF3NlQiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tc2VnbWVudCB7XHJcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG59XHJcblxyXG5pb24tY2FyZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxufVxyXG5cclxuaW9uLWl0ZW0ge1xyXG4gIC0tcGFkZGluZy1zdGFydDogMDtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG59XHJcblxyXG5pb24tZGF0ZXRpbWUge1xyXG4gIG1hcmdpbjogYXV0bztcclxufVxyXG5cclxuLnByb2ZpbGUtaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4ucHJvZmlsZS1waWN0dXJlLWNvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG1hcmdpbi1yaWdodDogMjBweDtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgaGVpZ2h0OiAxMDBweDtcclxufVxyXG5cclxuLnByb2ZpbGUtcGljdHVyZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1tZWRpdW0tdGludCk7XHJcbn1cclxuXHJcbi5wcm9maWxlLXBpY3R1cmUgaW1nIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbn1cclxuXHJcbi5wcm9maWxlLXBpY3R1cmUgaW9uLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogNDhweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbn1cclxuXHJcbi5jYW1lcmEtaWNvbiB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTogMDtcclxuICByaWdodDogMDtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgd2lkdGg6IDI0cHg7XHJcbiAgaGVpZ2h0OiAyNHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLW1lZGl1bS10aW50KTtcclxufVxyXG5cclxuLmNhbWVyYS1pY29uIGlvbi1pY29uIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG59XHJcblxyXG4ucHJvZmlsZS1pbmZvIHtcclxuICBmbGV4OiAxO1xyXG4gIHBhZGRpbmctbGVmdDogOHB4O1xyXG59XHJcblxyXG4ucHJvZmlsZS1pbmZvIGgyIHtcclxuICBtYXJnaW46IDAgMCA4cHggMDtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG59XHJcblxyXG4ucm9sZSB7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gIG1hcmdpbjogMCAwIDEycHggMDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuaW9uLWNhcmQtdGl0bGUgaW9uLWljb24ge1xyXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbn1cclxuXHJcbi5zZXR0aW5ncy1jb250YWluZXIge1xyXG4gIG1heC13aWR0aDogODAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbmlvbi1jYXJkIHtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbn1cclxuXHJcbmlvbi1jYXJkLWhlYWRlciB7XHJcbiAgcGFkZGluZzogMTZweDtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xyXG59XHJcblxyXG5pb24tY2FyZC10aXRsZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbn1cclxuXHJcbmlvbi1jYXJkLXRpdGxlIGlvbi1pY29uIHtcclxuICBtYXJnaW4tcmlnaHQ6IDhweDtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxufVxyXG5cclxuaW9uLWNhcmQtc3VidGl0bGUge1xyXG4gIG1hcmdpbi10b3A6IDRweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4uc2V0dGluZ3Mtc2VjdGlvbiB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcclxufVxyXG5cclxuLnNldHRpbmdzLXNlY3Rpb246bGFzdC1jaGlsZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMDtcclxufVxyXG5cclxuLnNldHRpbmdzLXNlY3Rpb24gaDMge1xyXG4gIG1hcmdpbjogMCAwIDEycHggMDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG59XHJcblxyXG5pb24taXRlbSB7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG4gIC0taW5uZXItcGFkZGluZy1lbmQ6IDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcclxufVxyXG5cclxuaW9uLWl0ZW06bGFzdC1jaGlsZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMDtcclxufVxyXG5cclxuaW9uLW5vdGUge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgbWFyZ2luLXRvcDogNHB4O1xyXG59XHJcblxyXG5pb24tdG9nZ2xlIHtcclxuICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG59XHJcblxyXG4uc2F2ZS1idXR0b24ge1xyXG4gIG1hcmdpbjogMjBweDtcclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XHJcbiAgaW9uLWNhcmQtaGVhZGVyIHtcclxuICAgIHBhZGRpbmc6IDEycHg7XHJcbiAgfVxyXG5cclxuICBpb24tY2FyZC1jb250ZW50IHtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgfVxyXG5cclxuICAuc2V0dGluZ3Mtc2VjdGlvbiB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIH1cclxufVxyXG5cclxuaW9uLWNhcmQge1xyXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcclxufVxyXG5cclxuaW9uLWNhcmQtaGVhZGVyIHtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xyXG59XHJcblxyXG5pb24tY2FyZC10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG5pb24tY2FyZC10aXRsZSBpb24taWNvbiB7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbn1cclxuXHJcbmlvbi1jYXJkLWNvbnRlbnQge1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbn1cclxuXHJcbmlvbi1pdGVtIHtcclxuICAtLXBhZGRpbmctc3RhcnQ6IDA7XHJcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcclxuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIC0tYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxufVxyXG5cclxuaW9uLWl0ZW06bGFzdC1jaGlsZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMDtcclxufVxyXG5cclxuaW9uLWxhYmVsIHtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxufVxyXG5cclxuaW9uLWlucHV0LFxyXG5pb24tc2VsZWN0IHtcclxuICAtLXBhZGRpbmctc3RhcnQ6IDA7XHJcbiAgbWFyZ2luLXRvcDogNHB4O1xyXG59XHJcblxyXG5pb24tdG9nZ2xlIHtcclxuICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG59XHJcblxyXG5pb24tYnV0dG9uIHtcclxuICBtYXJnaW46IDMycHggMTZweCAhaW1wb3J0YW50O1xyXG4gIC0tcGFkZGluZy10b3A6IDE2cHg7XHJcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTZweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcclxuICBpb24tY2FyZC1oZWFkZXIge1xyXG4gICAgcGFkZGluZzogMTJweDtcclxuICB9XHJcblxyXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xyXG4gICAgcGFkZGluZzogMTJweDtcclxuICB9XHJcbn1cclxuXHJcbi5zZXR0aW5ncy1ncmlkIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAyNHB4O1xyXG59XHJcblxyXG4uc2V0dGluZ3MtZ3JvdXAge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodC10aW50KTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgcGFkZGluZzogMTZweDtcclxufVxyXG5cclxuLnNldHRpbmdzLWdyb3VwLXRpdGxlIHtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbWFyZ2luOiAwIDAgMTJweCAwO1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xyXG59XHJcblxyXG4ucG9pbnRzLWdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxNDBweCwgMWZyKSk7XHJcbiAgZ2FwOiAxNnB4O1xyXG59XHJcblxyXG4ucG9pbnRzLWdyaWQgaW9uLWl0ZW0ge1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuaW9uLW5vdGUge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgbWFyZ2luLXRvcDogNHB4O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_super-admin_pages_settings_settings_page_ts.js.map