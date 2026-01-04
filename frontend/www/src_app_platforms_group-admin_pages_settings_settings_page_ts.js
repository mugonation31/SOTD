"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_group-admin_pages_settings_settings_page_ts"],{

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

/***/ 5598:
/*!***********************************************************************!*\
  !*** ./src/app/platforms/group-admin/pages/settings/settings.page.ts ***!
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/toast.service */ 5423);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/auth.service */ 8010);

var _SettingsPage;










function SettingsPage_div_14_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", ctx_r1.profilePicture, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
  }
}
function SettingsPage_div_14_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-icon", 29);
  }
}
function SettingsPage_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "ion-card")(2, "ion-card-content")(3, "div", 9)(4, "div", 10)(5, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, SettingsPage_div_14_ng_container_6_Template, 2, 1, "ng-container", 12)(7, SettingsPage_div_14_ng_template_7_Template, 1, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_14_Template_div_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const fileInput_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](12);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](fileInput_r3.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "ion-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "input", 15, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function SettingsPage_div_14_Template_input_change_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.onFileSelected($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 16)(14, "ion-item")(15, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "ion-input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_14_Template_ion_input_ngModelChange_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.profile.name, $event) || (ctx_r1.profile.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "ion-item")(19, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "ion-input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_14_Template_ion_input_ngModelChange_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.profile.email, $event) || (ctx_r1.profile.email = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "ion-item")(23, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24, "Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "ion-input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_14_Template_ion_input_ngModelChange_25_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.profile.phone, $event) || (ctx_r1.profile.phone = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "ion-item")(27, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](28, "Role");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "ion-input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_14_Template_ion_input_ngModelChange_29_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.profile.role, $event) || (ctx_r1.profile.role = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "ion-item")(31, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, "Joined Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "ion-input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_14_Template_ion_input_ngModelChange_33_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.profile.joinedDate, $event) || (ctx_r1.profile.joinedDate = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "ion-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_14_Template_ion_button_click_34_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.updateProfile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](35, " Update Profile ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "ion-card")(37, "ion-card-header")(38, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](39, "ion-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](40, " Change Password ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "ion-card-content")(42, "div", 24)(43, "ion-item")(44, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](45, "Current Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "ion-input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_14_Template_ion_input_ngModelChange_46_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.passwordForm.current, $event) || (ctx_r1.passwordForm.current = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](47, "ion-item")(48, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49, "New Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "ion-input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_14_Template_ion_input_ngModelChange_50_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.passwordForm.new, $event) || (ctx_r1.passwordForm.new = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](51, "ion-item")(52, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](53, "Confirm New Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](54, "ion-input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_14_Template_ion_input_ngModelChange_54_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.passwordForm.confirm, $event) || (ctx_r1.passwordForm.confirm = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](55, "ion-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_14_Template_ion_button_click_55_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.changePassword());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](56, " Change Password ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](57, "ion-button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_14_Template_ion_button_click_57_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](58, "ion-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](59, " Logout ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const defaultProfileIcon_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](8);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.profilePicture)("ngIfElse", defaultProfileIcon_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.profile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.profile.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.profile.phone);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.profile.role);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.profile.joinedDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.passwordForm.current);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.passwordForm.new);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.passwordForm.confirm);
  }
}
function SettingsPage_div_15_div_37_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " (Must equal 100%) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function SettingsPage_div_15_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 42)(1, "ion-item")(2, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Correct Score (%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_div_37_Template_ion_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.customPoints.correctScore, $event) || (ctx_r1.groupSettings.customPoints.correctScore = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ionChange", function SettingsPage_div_15_div_37_Template_ion_input_ionChange_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.validatePointsTotal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ion-item")(6, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Correct Result (%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "ion-input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_div_37_Template_ion_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.customPoints.correctResult, $event) || (ctx_r1.groupSettings.customPoints.correctResult = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ionChange", function SettingsPage_div_15_div_37_Template_ion_input_ionChange_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.validatePointsTotal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-item")(10, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "Participation (%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "ion-input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_div_37_Template_ion_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.customPoints.participation, $event) || (ctx_r1.groupSettings.customPoints.participation = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ionChange", function SettingsPage_div_15_div_37_Template_ion_input_ionChange_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.validatePointsTotal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, SettingsPage_div_15_div_37_span_15_Template, 2, 0, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.customPoints.correctScore);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.customPoints.correctResult);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.customPoints.participation);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Total: ", ctx_r1.calculatePointsTotal(), "% ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.calculatePointsTotal() !== 100);
  }
}
function SettingsPage_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "ion-card")(2, "ion-card-header")(3, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "ion-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, " Group Settings ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-card-content")(7, "ion-item")(8, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Group Visibility");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-select", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_select_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.visibility, $event) || (ctx_r1.groupSettings.visibility = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "ion-select-option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Public (Searchable)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "ion-select-option", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Private (Code Only)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "ion-item")(16, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Show Leaderboard");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "ion-toggle", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_toggle_ngModelChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.showLeaderboard, $event) || (ctx_r1.groupSettings.showLeaderboard = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "ion-item")(20, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Enable Group Chat");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "ion-toggle", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_toggle_ngModelChange_22_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.enableGroupChat, $event) || (ctx_r1.groupSettings.enableGroupChat = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "ion-card")(24, "ion-card-header")(25, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](26, "ion-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, " Prediction Settings ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "ion-card-content")(29, "ion-item")(30, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, "Points Distribution");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "ion-select", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_select_ngModelChange_32_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.pointsSystem, $event) || (ctx_r1.groupSettings.pointsSystem = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ionChange", function SettingsPage_div_15_Template_ion_select_ionChange_32_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.onPointsSystemChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "ion-select-option", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](34, "Standard (60-30-10)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "ion-select-option", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](36, "Custom Split");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](37, SettingsPage_div_15_div_37_Template, 16, 5, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "ion-item")(39, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](40, "Joker Usage");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "ion-select", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_select_ngModelChange_41_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.jokerRules, $event) || (ctx_r1.groupSettings.jokerRules = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "ion-select-option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](43, "Once per season");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "ion-select-option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](45, "Twice per season");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "ion-card")(47, "ion-card-header")(48, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](49, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](50, " Notification Preferences ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](51, "ion-card-content")(52, "ion-item")(53, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](54, "Email Notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](55, "ion-toggle", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_toggle_ngModelChange_55_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.notificationPreferences.emailNotifications, $event) || (ctx_r1.groupSettings.notificationPreferences.emailNotifications = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](56, "ion-item")(57, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](58, "Prediction Reminders");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](59, "ion-toggle", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_toggle_ngModelChange_59_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.notificationPreferences.predictionReminders, $event) || (ctx_r1.groupSettings.notificationPreferences.predictionReminders = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "ion-item")(61, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](62, "Result Notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](63, "ion-toggle", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_toggle_ngModelChange_63_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.notificationPreferences.resultNotifications, $event) || (ctx_r1.groupSettings.notificationPreferences.resultNotifications = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](64, "ion-item")(65, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](66, "Member Updates");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](67, "ion-toggle", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_div_15_Template_ion_toggle_ngModelChange_67_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.groupSettings.notificationPreferences.memberUpdates, $event) || (ctx_r1.groupSettings.notificationPreferences.memberUpdates = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](68, "ion-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SettingsPage_div_15_Template_ion_button_click_68_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.saveSettings());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](69, " Save Settings ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.visibility);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.showLeaderboard);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.enableGroupChat);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.pointsSystem);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.groupSettings.pointsSystem === "custom");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.jokerRules);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.notificationPreferences.emailNotifications);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.notificationPreferences.predictionReminders);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.notificationPreferences.resultNotifications);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.groupSettings.notificationPreferences.memberUpdates);
  }
}
class SettingsPage {
  constructor(router, toastService, authService) {
    this.router = router;
    this.toastService = toastService;
    this.authService = authService;
    this.activeTab = 'profile';
    this.profilePicture = null;
    this.profile = {
      name: 'John Smith',
      email: 'john.smith@groupadmin.com',
      phone: '+44 7123 456789',
      role: 'Group Admin',
      joinedDate: '2024-01-01'
    };
    this.passwordForm = {
      current: '',
      new: '',
      confirm: ''
    };
    this.groupSettings = {
      visibility: 'public',
      showLeaderboard: true,
      enableGroupChat: false,
      pointsSystem: 'standard',
      customPoints: {
        correctScore: 60,
        correctResult: 30,
        participation: 10
      },
      jokerRules: 'once',
      notificationPreferences: {
        emailNotifications: true,
        predictionReminders: true,
        resultNotifications: true,
        memberUpdates: false
      }
    };
    (0,ionicons__WEBPACK_IMPORTED_MODULE_5__.a)({
      personCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.personCircleOutline,
      keyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.keyOutline,
      notificationsOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.notificationsOutline,
      globeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.globeOutline,
      mailOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.mailOutline,
      phonePortraitOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.phonePortraitOutline,
      logOutOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.logOutOutline,
      settingsOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.settingsOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.peopleOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.footballOutline,
      cameraOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.cameraOutline
    });
  }
  onFileSelected(event) {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _target$files;
      const target = event.target;
      const file = (_target$files = target.files) === null || _target$files === void 0 ? void 0 : _target$files[0];
      if (file) {
        try {
          // Validate file type
          if (!file.type.startsWith('image/')) {
            yield _this.toastService.showToast('Please select an image file', 'error');
            return;
          }
          // Validate file size (max 5MB)
          const maxSize = 5 * 1024 * 1024; // 5MB
          if (file.size > maxSize) {
            yield _this.toastService.showToast('File size must be less than 5MB', 'error');
            return;
          }
          // Show loading state
          yield _this.toastService.showToast('Uploading image...', 'success');
          // Simulate upload process
          yield _this.simulateUpload();
          // Create preview URL
          const reader = new FileReader();
          reader.onload = e => {
            var _e$target;
            _this.profilePicture = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.result;
          };
          reader.readAsDataURL(file);
          yield _this.toastService.showToast('Profile picture updated successfully!', 'success');
        } catch (error) {
          console.error('Error uploading file:', error);
          yield _this.toastService.showToast('Error uploading image. Please try again.', 'error');
        }
      }
    })();
  }
  simulateUpload() {
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Simulate network delay
      yield new Promise(resolve => setTimeout(resolve, 1000));
    })();
  }
  updateProfile() {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this2.toastService.showToast('Profile updated successfully!', 'success');
      } catch (error) {
        yield _this2.toastService.showToast('Error updating profile. Please try again.', 'error');
      }
    })();
  }
  changePassword() {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this3.passwordForm.current || !_this3.passwordForm.new || !_this3.passwordForm.confirm) {
        yield _this3.toastService.showToast('Please fill in all password fields', 'error');
        return;
      }
      if (_this3.passwordForm.new !== _this3.passwordForm.confirm) {
        yield _this3.toastService.showToast('New passwords do not match', 'error');
        return;
      }
      if (_this3.passwordForm.new.length < 8) {
        yield _this3.toastService.showToast('New password must be at least 8 characters', 'error');
        return;
      }
      try {
        // Simulate password change
        yield new Promise(resolve => setTimeout(resolve, 1000));
        yield _this3.toastService.showToast('Password changed successfully!', 'success');
        // Clear form
        _this3.passwordForm = {
          current: '',
          new: '',
          confirm: ''
        };
      } catch (error) {
        yield _this3.toastService.showToast('Error changing password. Please try again.', 'error');
      }
    })();
  }
  onPointsSystemChange() {
    if (this.groupSettings.pointsSystem === 'standard') {
      this.groupSettings.customPoints = {
        correctScore: 60,
        correctResult: 30,
        participation: 10
      };
    }
  }
  calculatePointsTotal() {
    return this.groupSettings.customPoints.correctScore + this.groupSettings.customPoints.correctResult + this.groupSettings.customPoints.participation;
  }
  validatePointsTotal() {
    const total = this.calculatePointsTotal();
    if (total !== 100) {}
  }
  saveSettings() {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Validate custom points if using custom system
        if (_this4.groupSettings.pointsSystem === 'custom') {
          const total = _this4.calculatePointsTotal();
          if (total !== 100) {
            yield _this4.toastService.showToast('Custom points must total 100%', 'error');
            return;
          }
        }
        // Simulate saving settings
        yield new Promise(resolve => setTimeout(resolve, 1000));
        yield _this4.toastService.showToast('Settings saved successfully!', 'success');
      } catch (error) {
        yield _this4.toastService.showToast('Error saving settings. Please try again.', 'error');
      }
    })();
  }
  logout() {
    var _this5 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this5.authService.logout();
        yield _this5.toastService.showToast('Logged out successfully', 'success');
        _this5.router.navigate(['/auth/login']);
      } catch (error) {
        yield _this5.toastService.showToast('Error logging out. Please try again.', 'error');
      }
    })();
  }
}
_SettingsPage = SettingsPage;
_SettingsPage.ɵfac = function SettingsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SettingsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService));
};
_SettingsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _SettingsPage,
  selectors: [["app-settings"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
  decls: 16,
  vars: 3,
  consts: [["defaultProfileIcon", ""], ["fileInput", ""], [1, "ion-padding"], [1, "ion-margin-bottom", 3, "ngModelChange", "ngModel"], ["value", "profile"], ["name", "person-circle-outline"], ["value", "settings"], ["name", "settings-outline"], [4, "ngIf"], [1, "profile-picture-section"], [1, "profile-picture-container"], [1, "profile-picture"], [4, "ngIf", "ngIfElse"], [1, "camera-icon", 3, "click"], ["name", "camera-outline"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], [1, "profile-info-section"], ["position", "stacked"], ["placeholder", "Your name", 3, "ngModelChange", "ngModel"], ["type", "email", "readonly", "", 3, "ngModelChange", "ngModel"], ["type", "tel", "placeholder", "Your phone number", 3, "ngModelChange", "ngModel"], ["readonly", "", 3, "ngModelChange", "ngModel"], ["expand", "block", 1, "ion-margin-top", 3, "click"], ["name", "key-outline"], [1, "form-section"], ["type", "password", 3, "ngModelChange", "ngModel"], ["expand", "block", "color", "danger", 1, "ion-margin-top", 3, "click"], ["name", "log-out-outline", "slot", "start"], ["alt", "Profile Picture", 3, "src"], ["name", "person-outline", 1, "default-profile-icon"], ["name", "people-outline"], [3, "ngModelChange", "ngModel"], ["value", "public"], ["value", "private"], ["name", "football-outline"], [3, "ngModelChange", "ionChange", "ngModel"], ["value", "standard"], ["value", "custom"], ["class", "custom-points", 4, "ngIf"], ["value", "once"], ["value", "twice"], ["name", "notifications-outline"], [1, "custom-points"], ["type", "number", "min", "0", "max", "100", 3, "ngModelChange", "ionChange", "ngModel"], [1, "points-total"], ["class", "error-text", 4, "ngIf"], [1, "error-text"]],
  template: function SettingsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Settings");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-content", 2)(5, "ion-segment", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SettingsPage_Template_ion_segment_ngModelChange_5_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.activeTab, $event) || (ctx.activeTab = $event);
        return $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-segment-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Profile");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-segment-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "Settings");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, SettingsPage_div_14_Template, 60, 10, "div", 8)(15, SettingsPage_div_15_Template, 70, 10, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.activeTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.activeTab === "profile");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.activeTab === "settings");
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonToggle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSelect, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSelectOption, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSegment, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSegmentButton, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel],
  styles: [".profile-picture-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 24px;\n}\n\n.profile-picture-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 120px;\n  height: 120px;\n}\n\n.profile-picture[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background: var(--ion-color-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  border: 1px solid var(--ion-color-medium-shade);\n}\n\n.profile-picture[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.default-profile-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: var(--ion-color-medium);\n}\n\n.camera-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  background: white;\n  border: 1px solid var(--ion-color-medium-shade);\n  border-radius: 50%;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.camera-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--ion-color-dark);\n}\n\n.profile-info-section[_ngcontent-%COMP%], \n.form-section[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --inner-padding-end: 0;\n  --background: transparent;\n  margin-bottom: 16px;\n}\n\nion-card[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  border-radius: 8px;\n  box-shadow: none;\n  border: 1px solid var(--ion-color-light-shade);\n}\n\nion-card-header[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid var(--ion-color-light-shade);\n}\n\nion-card-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\nion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--ion-color-primary);\n}\n\nion-button[_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\n\n@media (max-width: 576px) {\n  ion-card-header[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  ion-card-content[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n}\n.custom-points[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 16px;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n}\n\n.points-total[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n}\n\n.error-text[_ngcontent-%COMP%] {\n  color: var(--ion-color-danger);\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0NBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsK0NBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0Esd0NBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSw0QkFBQTtBQUNGOztBQUVBOztFQUVFLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4Q0FBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHFEQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBQTtFQUNGO0VBRUE7SUFDRSxhQUFBO0VBQUY7QUFDRjtBQUdBO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxrQkFBQTtBQURGOztBQUlBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBREY7O0FBSUE7RUFDRSw4QkFBQTtFQUNBLGVBQUE7QUFERiIsImZpbGUiOiJzZXR0aW5ncy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvZmlsZS1waWN0dXJlLXNlY3Rpb24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcclxufVxyXG5cclxuLnByb2ZpbGUtcGljdHVyZS1jb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB3aWR0aDogMTIwcHg7XHJcbiAgaGVpZ2h0OiAxMjBweDtcclxufVxyXG5cclxuLnByb2ZpbGUtcGljdHVyZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xyXG59XHJcblxyXG4ucHJvZmlsZS1waWN0dXJlIGltZyB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xyXG59XHJcblxyXG4uZGVmYXVsdC1wcm9maWxlLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogNDhweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbn1cclxuXHJcbi5jYW1lcmEtaWNvbiB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTogMDtcclxuICByaWdodDogMDtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlKTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgd2lkdGg6IDMycHg7XHJcbiAgaGVpZ2h0OiAzMnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxufVxyXG5cclxuLmNhbWVyYS1pY29uIGlvbi1pY29uIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxufVxyXG5cclxuLnByb2ZpbGUtaW5mby1zZWN0aW9uLFxyXG4uZm9ybS1zZWN0aW9uIHtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbmlvbi1pdGVtIHtcclxuICAtLXBhZGRpbmctc3RhcnQ6IDA7XHJcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcclxuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbn1cclxuXHJcbmlvbi1jYXJkIHtcclxuICBtYXJnaW46IDAgMCAxNnB4IDA7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcclxufVxyXG5cclxuaW9uLWNhcmQtaGVhZGVyIHtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xyXG59XHJcblxyXG5pb24tY2FyZC10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG5pb24tY2FyZC10aXRsZSBpb24taWNvbiB7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbn1cclxuXHJcbmlvbi1idXR0b24ge1xyXG4gIG1hcmdpbjogOHB4IDA7XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xyXG4gIGlvbi1jYXJkLWhlYWRlciB7XHJcbiAgICBwYWRkaW5nOiAxMnB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLWNhcmQtY29udGVudCB7XHJcbiAgICBwYWRkaW5nOiAxMnB4O1xyXG4gIH1cclxufVxyXG5cclxuLmN1c3RvbS1wb2ludHMge1xyXG4gIG1hcmdpbi10b3A6IDE2cHg7XHJcbiAgcGFkZGluZzogMTZweDtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxufVxyXG5cclxuLnBvaW50cy10b3RhbCB7XHJcbiAgbWFyZ2luLXRvcDogMTJweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbn1cclxuXHJcbi5lcnJvci10ZXh0IHtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2dyb3VwLWFkbWluL3BhZ2VzL3NldHRpbmdzL3NldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0NBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsK0NBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0Esd0NBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSw0QkFBQTtBQUNGOztBQUVBOztFQUVFLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4Q0FBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHFEQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBQTtFQUNGO0VBRUE7SUFDRSxhQUFBO0VBQUY7QUFDRjtBQUdBO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxrQkFBQTtBQURGOztBQUlBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBREY7O0FBSUE7RUFDRSw4QkFBQTtFQUNBLGVBQUE7QUFERjtBQUNBLHcvSUFBdy9JIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2ZpbGUtcGljdHVyZS1zZWN0aW9uIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XHJcbn1cclxuXHJcbi5wcm9maWxlLXBpY3R1cmUtY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgd2lkdGg6IDEyMHB4O1xyXG4gIGhlaWdodDogMTIwcHg7XHJcbn1cclxuXHJcbi5wcm9maWxlLXBpY3R1cmUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlKTtcclxufVxyXG5cclxuLnByb2ZpbGUtcGljdHVyZSBpbWcge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxufVxyXG5cclxuLmRlZmF1bHQtcHJvZmlsZS1pY29uIHtcclxuICBmb250LXNpemU6IDQ4cHg7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG59XHJcblxyXG4uY2FtZXJhLWljb24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBib3R0b206IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHdpZHRoOiAzMnB4O1xyXG4gIGhlaWdodDogMzJweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi5jYW1lcmEtaWNvbiBpb24taWNvbiB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbn1cclxuXHJcbi5wcm9maWxlLWluZm8tc2VjdGlvbixcclxuLmZvcm0tc2VjdGlvbiB7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG5pb24taXRlbSB7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG4gIC0taW5uZXItcGFkZGluZy1lbmQ6IDA7XHJcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG59XHJcblxyXG5pb24tY2FyZCB7XHJcbiAgbWFyZ2luOiAwIDAgMTZweCAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBib3gtc2hhZG93OiBub25lO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XHJcbn1cclxuXHJcbmlvbi1jYXJkLWhlYWRlciB7XHJcbiAgcGFkZGluZzogMTZweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcclxufVxyXG5cclxuaW9uLWNhcmQtdGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDhweDtcclxufVxyXG5cclxuaW9uLWNhcmQtdGl0bGUgaW9uLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG59XHJcblxyXG5pb24tYnV0dG9uIHtcclxuICBtYXJnaW46IDhweCAwO1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcclxuICBpb24tY2FyZC1oZWFkZXIge1xyXG4gICAgcGFkZGluZzogMTJweDtcclxuICB9XHJcblxyXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xyXG4gICAgcGFkZGluZzogMTJweDtcclxuICB9XHJcbn1cclxuXHJcbi5jdXN0b20tcG9pbnRzIHtcclxuICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbn1cclxuXHJcbi5wb2ludHMtdG90YWwge1xyXG4gIG1hcmdpbi10b3A6IDEycHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG59XHJcblxyXG4uZXJyb3ItdGV4dCB7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_group-admin_pages_settings_settings_page_ts.js.map