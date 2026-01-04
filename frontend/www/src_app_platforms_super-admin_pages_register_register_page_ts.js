"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_super-admin_pages_register_register_page_ts"],{

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

/***/ 526:
/*!***********************************************************************!*\
  !*** ./src/app/platforms/super-admin/pages/register/register.page.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuperAdminRegisterPage: () => (/* binding */ SuperAdminRegisterPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/services/toast.service */ 5423);

var _SuperAdminRegisterPage;










const _c0 = () => ["/super-admin/login"];
function SuperAdminRegisterPage_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ion-spinner", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-text")(3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Checking registration status...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}
function SuperAdminRegisterPage_div_6_ion_note_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getFieldError("firstName"), " ");
  }
}
function SuperAdminRegisterPage_div_6_ion_note_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getFieldError("lastName"), " ");
  }
}
function SuperAdminRegisterPage_div_6_ion_note_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getFieldError("username"), " ");
  }
}
function SuperAdminRegisterPage_div_6_ion_note_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getFieldError("email"), " ");
  }
}
function SuperAdminRegisterPage_div_6_ion_note_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getFieldError("password"), " ");
  }
}
function SuperAdminRegisterPage_div_6_ion_note_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getFieldError("confirmPassword"), " ");
  }
}
function SuperAdminRegisterPage_div_6_ion_note_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-note", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Passwords do not match ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SuperAdminRegisterPage_div_6_div_57_ion_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SuperAdminRegisterPage_div_6_div_57_ion_button_6_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.retryConnection());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Retry ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SuperAdminRegisterPage_div_6_div_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 29)(1, "ion-text", 30)(2, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, SuperAdminRegisterPage_div_6_div_57_ion_button_6_Template, 2, 0, "ion-button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.error.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.error.message);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.error.retry);
  }
}
function SuperAdminRegisterPage_div_6_ion_spinner_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "ion-spinner", 5);
  }
}
function SuperAdminRegisterPage_div_6_span_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Create Super Admin Account");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SuperAdminRegisterPage_div_6_span_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Creating Account...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SuperAdminRegisterPage_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "ion-card", 6)(2, "ion-card-header")(3, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Create Super Admin Account");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ion-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "One-time setup for Predict 3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "ion-card-content")(8, "div", 7)(9, "ion-text", 8)(10, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Set up the first Super Admin account to manage Predict 3's football prediction platform.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "form", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function SuperAdminRegisterPage_div_6_Template_form_ngSubmit_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.onSubmit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 10)(14, "ion-text")(15, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Personal Information");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "ion-item")(18, "ion-label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "First Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "ion-input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, SuperAdminRegisterPage_div_6_ion_note_21_Template, 2, 1, "ion-note", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "ion-item")(23, "ion-label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "Last Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](25, "ion-input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](26, SuperAdminRegisterPage_div_6_ion_note_26_Template, 2, 1, "ion-note", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "ion-item")(28, "ion-label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, "Username");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](30, "ion-input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, SuperAdminRegisterPage_div_6_ion_note_31_Template, 2, 1, "ion-note", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 10)(33, "ion-text")(34, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, "Account Information");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "ion-item")(37, "ion-label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](38, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](39, "ion-input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](40, SuperAdminRegisterPage_div_6_ion_note_40_Template, 2, 1, "ion-note", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "ion-item")(42, "ion-label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](44, "ion-input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](45, SuperAdminRegisterPage_div_6_ion_note_45_Template, 2, 1, "ion-note", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "ion-item")(47, "ion-label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](48, "Confirm Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](49, "ion-input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](50, SuperAdminRegisterPage_div_6_ion_note_50_Template, 2, 1, "ion-note", 13)(51, SuperAdminRegisterPage_div_6_ion_note_51_Template, 2, 0, "ion-note", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "div", 10)(53, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](54, "ion-checkbox", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](56, " I agree to the terms and conditions for managing Predict 3 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](57, SuperAdminRegisterPage_div_6_div_57_Template, 7, 3, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](58, "div", 21)(59, "ion-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](60, SuperAdminRegisterPage_div_6_ion_spinner_60_Template, 1, 0, "ion-spinner", 23)(61, SuperAdminRegisterPage_div_6_span_61_Template, 2, 0, "span", 2)(62, SuperAdminRegisterPage_div_6_span_62_Template, 2, 0, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "div", 24)(64, "ion-text", 8)(65, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, "Development Mode - Using Dummy Data");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](67, "ion-button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SuperAdminRegisterPage_div_6_Template_ion_button_click_67_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.resetRegistrationState());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](68, " Reset Registration State ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "div", 26)(70, "ion-text", 8)(71, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](72, "Already have a super admin account? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](74, "Login here");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx_r1.registrationForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx_r1.isFieldInvalid("firstName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isFieldInvalid("firstName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx_r1.isFieldInvalid("lastName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isFieldInvalid("lastName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx_r1.isFieldInvalid("username"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isFieldInvalid("username"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx_r1.isFieldInvalid("email"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isFieldInvalid("email"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx_r1.isFieldInvalid("password"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isFieldInvalid("password"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("ion-invalid", ctx_r1.isFieldInvalid("confirmPassword") || (ctx_r1.registrationForm.errors == null ? null : ctx_r1.registrationForm.errors["passwordMismatch"]));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isFieldInvalid("confirmPassword"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.registrationForm.errors == null ? null : ctx_r1.registrationForm.errors["passwordMismatch"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx_r1.registrationForm.invalid || ctx_r1.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r1.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](26, _c0));
  }
}
function SuperAdminRegisterPage_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 33)(1, "ion-card", 6)(2, "ion-card-header")(3, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Super Admin Already Exists");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ion-card-content")(6, "ion-text")(7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "A Super Admin account has already been created for Predict 3.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Please login with your existing credentials instead.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 21)(12, "ion-button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, " Go to Login ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](1, _c0));
  }
}
class SuperAdminRegisterPage {
  constructor(fb, authService, toastService, router) {
    this.fb = fb;
    this.authService = authService;
    this.toastService = toastService;
    this.router = router;
    this.isLoading = false;
    this.isCheckingExistingAdmin = true;
    this.superAdminExists = false;
    this.registrationForm = this.fb.group({
      firstName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(2)]],
      lastName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(2)]],
      username: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(3)]],
      email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email]],
      password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(8)]],
      confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]],
      acceptedTerms: [false, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  ngOnInit() {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.checkExistingSuperAdmin();
    })();
  }
  checkExistingSuperAdmin() {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this2.isCheckingExistingAdmin = true;
        // For development with dummy data, check localStorage
        // In production with Supabase, this would check the database
        const existingSuperAdmin = localStorage.getItem('superAdminCreated');
        _this2.superAdminExists = existingSuperAdmin === 'true';
        if (_this2.superAdminExists) {
          _this2.toastService.showToast('Super admin already exists. Please login instead.', 'warning');
          // Wait a moment then redirect
          setTimeout(() => {
            _this2.router.navigate(['/super-admin/login']);
          }, 2000);
        } else {}
      } catch (error) {
        console.error('Error checking super admin existence:', error);
        _this2.error = {
          title: 'Connection Error',
          message: 'Unable to check registration status. Please try again.',
          retry: true
        };
      } finally {
        _this2.isCheckingExistingAdmin = false;
      }
    })();
  }
  passwordMatchValidator(g) {
    var _g$get, _g$get2;
    return ((_g$get = g.get('password')) === null || _g$get === void 0 ? void 0 : _g$get.value) === ((_g$get2 = g.get('confirmPassword')) === null || _g$get2 === void 0 ? void 0 : _g$get2.value) ? null : {
      passwordMismatch: true
    };
  }
  onSubmit() {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.registrationForm.valid && !_this3.superAdminExists) {
        _this3.isLoading = true;
        _this3.error = undefined;
        try {
          const formData = _this3.registrationForm.value;
          // Use AuthService signup (which defaults to mock mode for development)
          const signupData = {
            email: formData.email,
            password: formData.password,
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: 'super-admin'
          };
          _this3.authService.signup(signupData).subscribe({
            next: response => {
              // Mark super admin as created (for dummy data mode)
              localStorage.setItem('superAdminCreated', 'true');
              // Show success message
              _this3.toastService.showToast(`Welcome to Predict 3! Super Admin account created successfully.`, 'success');
              // Auto-login after registration
              _this3.autoLoginAfterRegistration(formData.email, formData.password);
            },
            error: error => {
              console.error('❌ Super Admin Registration failed:', error);
              _this3.error = {
                title: 'Registration Failed',
                message: _this3.getErrorMessage(error),
                retry: true
              };
              _this3.isLoading = false;
            }
          });
        } catch (error) {
          console.error('❌ Super Admin Registration failed:', error);
          _this3.error = {
            title: 'Registration Failed',
            message: _this3.getErrorMessage(error),
            retry: true
          };
          _this3.isLoading = false;
        }
      }
    })();
  }
  autoLoginAfterRegistration(email, password) {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        var _this4$registrationFo, _this4$registrationFo2, _this4$registrationFo3;
        // Use the centralized AuthService for consistent login
        const loginData = {
          email,
          password,
          securityQuestion: 'N/A',
          securityAnswer: 'N/A'
        };
        // Set up the super-admin role for AuthService
        localStorage.setItem(`pendingRole_${email}`, 'super-admin');
        localStorage.setItem(`pendingUsername_${email}`, (_this4$registrationFo = _this4.registrationForm.get('username')) === null || _this4$registrationFo === void 0 ? void 0 : _this4$registrationFo.value);
        localStorage.setItem(`pendingFirstName_${email}`, (_this4$registrationFo2 = _this4.registrationForm.get('firstName')) === null || _this4$registrationFo2 === void 0 ? void 0 : _this4$registrationFo2.value);
        localStorage.setItem(`pendingLastName_${email}`, (_this4$registrationFo3 = _this4.registrationForm.get('lastName')) === null || _this4$registrationFo3 === void 0 ? void 0 : _this4$registrationFo3.value);
        // Login through AuthService
        _this4.authService.login(loginData).subscribe({
          next: response => {
            // Navigate to super-admin dashboard
            _this4.router.navigate(['/super-admin/dashboard']);
            _this4.toastService.showToast('Welcome to Predict 3! You are now logged in as Super Admin.', 'success');
          },
          error: error => {
            console.error('❌ Auto-login failed:', error);
            // If auto-login fails, redirect to login page
            _this4.toastService.showToast('Registration successful! Please login to continue.', 'success');
            _this4.router.navigate(['/super-admin/login']);
          }
        });
      } catch (error) {
        console.error('❌ Auto-login error:', error);
        // If auto-login fails, redirect to login page
        _this4.toastService.showToast('Registration successful! Please login to continue.', 'success');
        _this4.router.navigate(['/super-admin/login']);
      }
    })();
  }
  getErrorMessage(error) {
    var _error$message, _error$message2, _error$message3;
    if (error !== null && error !== void 0 && (_error$message = error.message) !== null && _error$message !== void 0 && _error$message.includes('already registered')) {
      return 'This email is already registered. Please use a different email or login instead.';
    }
    if (error !== null && error !== void 0 && (_error$message2 = error.message) !== null && _error$message2 !== void 0 && _error$message2.includes('invalid email')) {
      return 'Please enter a valid email address.';
    }
    if (error !== null && error !== void 0 && (_error$message3 = error.message) !== null && _error$message3 !== void 0 && _error$message3.includes('weak password')) {
      return 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers.';
    }
    return (error === null || error === void 0 ? void 0 : error.message) || 'An unexpected error occurred. Please try again.';
  }
  retryConnection() {
    this.error = undefined;
    this.checkExistingSuperAdmin();
  }
  // Field validation helpers
  isFieldInvalid(fieldName) {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  getFieldError(fieldName) {
    const field = this.registrationForm.get(fieldName);
    if (!field || !field.errors) return '';
    const errors = field.errors;
    if (errors['required']) return `${this.getFieldLabel(fieldName)} is required.`;
    if (errors['email']) return 'Please enter a valid email address.';
    if (errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${errors['minlength'].requiredLength} characters.`;
    if (errors['passwordMismatch']) return 'Passwords do not match.';
    return 'Invalid input.';
  }
  getFieldLabel(fieldName) {
    const labels = {
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password'
    };
    return labels[fieldName] || fieldName;
  }
  // Development helper - reset registration state
  resetRegistrationState() {
    localStorage.removeItem('superAdminCreated');
    this.checkExistingSuperAdmin();
  }
}
_SuperAdminRegisterPage = SuperAdminRegisterPage;
_SuperAdminRegisterPage.ɵfac = function SuperAdminRegisterPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SuperAdminRegisterPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
};
_SuperAdminRegisterPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _SuperAdminRegisterPage,
  selectors: [["app-super-admin-register"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 8,
  vars: 3,
  consts: [[1, "ion-padding"], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], ["class", "already-exists-container", 4, "ngIf"], [1, "loading-container"], ["name", "crescent"], [1, "auth-card"], [1, "auth-header"], ["color", "medium"], [3, "ngSubmit", "formGroup"], [1, "form-section"], ["position", "stacked"], ["type", "text", "formControlName", "firstName", "placeholder", "Enter your first name"], ["slot", "error", 4, "ngIf"], ["type", "text", "formControlName", "lastName", "placeholder", "Enter your last name"], ["type", "text", "formControlName", "username", "placeholder", "Choose a username"], ["type", "email", "formControlName", "email", "placeholder", "Enter your email"], ["type", "password", "formControlName", "password", "placeholder", "Create a secure password"], ["type", "password", "formControlName", "confirmPassword", "placeholder", "Confirm your password"], ["formControlName", "acceptedTerms", "slot", "start"], ["class", "error-container", 4, "ngIf"], [1, "auth-actions"], ["expand", "block", "type", "submit", 3, "disabled"], ["name", "crescent", 4, "ngIf"], [1, "debug-section", 2, "margin-top", "20px", "padding", "10px", "border-top", "1px solid var(--ion-color-light)"], ["fill", "outline", "color", "warning", "size", "small", 3, "click"], [1, "auth-footer"], [3, "routerLink"], ["slot", "error"], [1, "error-container"], ["color", "danger"], ["fill", "outline", "color", "danger", 3, "click", 4, "ngIf"], ["fill", "outline", "color", "danger", 3, "click"], [1, "already-exists-container"], ["expand", "block", 3, "routerLink"]],
  template: function SuperAdminRegisterPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Super Admin Registration - Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-content", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, SuperAdminRegisterPage_div_5_Template, 5, 0, "div", 1)(6, SuperAdminRegisterPage_div_6_Template, 75, 27, "div", 2)(7, SuperAdminRegisterPage_div_7_Template, 14, 2, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isCheckingExistingAdmin);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isCheckingExistingAdmin && !ctx.superAdminExists);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isCheckingExistingAdmin && ctx.superAdminExists);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardSubtitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonText, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonNote, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCheckbox, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonSpinner],
  styles: ["[_nghost-%COMP%]   ion-content[_ngcontent-%COMP%] {\n  --background: #f5f5f5;\n}\n[_nghost-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: 2rem auto;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n[_nghost-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n  padding: 1.5rem;\n}\n[_nghost-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--ion-color-primary-contrast);\n}\n[_nghost-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-subtitle[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary-contrast);\n  opacity: 0.8;\n  margin-top: 0.5rem;\n}\n[_nghost-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n[_nghost-%COMP%]   ion-item-group[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n[_nghost-%COMP%]   ion-item-divider[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  --background: transparent;\n  font-weight: 600;\n  font-size: 1.1rem;\n  border-bottom: 2px solid var(--ion-color-primary);\n  color: var(--ion-color-primary);\n}\n[_nghost-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --inner-padding-end: 0;\n  margin-bottom: 1rem;\n}\n[_nghost-%COMP%]   ion-checkbox[_ngcontent-%COMP%] {\n  margin-right: 1rem;\n}\n[_nghost-%COMP%]   .security-question-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 4px;\n}\n[_nghost-%COMP%]   ion-button[type=submit][_ngcontent-%COMP%] {\n  margin: 2rem 0 1rem;\n  height: 48px;\n  font-size: 1.1rem;\n  --border-radius: 8px;\n}\n[_nghost-%COMP%]   ion-note[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--ion-color-medium);\n  margin-top: 0.5rem;\n}\n@media (max-width: 768px) {\n  [_nghost-%COMP%]   ion-card[_ngcontent-%COMP%] {\n    margin: 1rem;\n    width: auto;\n  }\n  [_nghost-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLHFCQUFBO0FBQUo7QUFHRTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHdDQUFBO0FBREo7QUFJRTtFQUNFLG9DQUFBO0VBQ0Esd0NBQUE7RUFDQSxlQUFBO0FBRko7QUFJSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx3Q0FBQTtBQUZOO0FBS0k7RUFDRSx3Q0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUhOO0FBT0U7RUFDRSxhQUFBO0FBTEo7QUFRRTtFQUNFLG1CQUFBO0FBTko7QUFTRTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaURBQUE7RUFDQSwrQkFBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFSSjtBQVdFO0VBQ0Usa0JBQUE7QUFUSjtBQVlFO0VBQ0UscUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQVZKO0FBYUU7RUFDRSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FBWEo7QUFjRTtFQUNFLGtCQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtBQVpKO0FBZ0JFO0VBQ0U7SUFDRSxZQUFBO0lBQ0EsV0FBQTtFQWRKO0VBaUJFO0lBQ0UsYUFBQTtFQWZKO0FBQ0YiLCJmaWxlIjoicmVnaXN0ZXIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGlvbi1jb250ZW50IHtcclxuICAgIC0tYmFja2dyb3VuZDogI2Y1ZjVmNTtcclxuICB9XHJcblxyXG4gIGlvbi1jYXJkIHtcclxuICAgIG1heC13aWR0aDogNjAwcHg7XHJcbiAgICBtYXJnaW46IDJyZW0gYXV0bztcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgfVxyXG5cclxuICBpb24tY2FyZC1oZWFkZXIge1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcclxuICAgIHBhZGRpbmc6IDEuNXJlbTtcclxuXHJcbiAgICBpb24tY2FyZC10aXRsZSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGlvbi1jYXJkLXN1YnRpdGxlIHtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcclxuICAgICAgb3BhY2l0eTogMC44O1xyXG4gICAgICBtYXJnaW4tdG9wOiAwLjVyZW07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpb24tY2FyZC1jb250ZW50IHtcclxuICAgIHBhZGRpbmc6IDJyZW07XHJcbiAgfVxyXG5cclxuICBpb24taXRlbS1ncm91cCB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gIH1cclxuXHJcbiAgaW9uLWl0ZW0tZGl2aWRlciB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gIH1cclxuXHJcbiAgaW9uLWl0ZW0ge1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG4gICAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgfVxyXG5cclxuICBpb24tY2hlY2tib3gge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xyXG4gIH1cclxuXHJcbiAgLnNlY3VyaXR5LXF1ZXN0aW9uLWdyb3VwIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcclxuICAgIHBhZGRpbmc6IDFyZW07XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLWJ1dHRvblt0eXBlPVwic3VibWl0XCJdIHtcclxuICAgIG1hcmdpbjogMnJlbSAwIDFyZW07XHJcbiAgICBoZWlnaHQ6IDQ4cHg7XHJcbiAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgIC0tYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLW5vdGUge1xyXG4gICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xyXG4gIH1cclxuXHJcbiAgLy8gUmVzcG9uc2l2ZSBhZGp1c3RtZW50c1xyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgaW9uLWNhcmQge1xyXG4gICAgICBtYXJnaW46IDFyZW07XHJcbiAgICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgfVxyXG5cclxuICAgIGlvbi1jYXJkLWNvbnRlbnQge1xyXG4gICAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3N1cGVyLWFkbWluL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLHFCQUFBO0FBQUo7QUFHRTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHdDQUFBO0FBREo7QUFJRTtFQUNFLG9DQUFBO0VBQ0Esd0NBQUE7RUFDQSxlQUFBO0FBRko7QUFJSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx3Q0FBQTtBQUZOO0FBS0k7RUFDRSx3Q0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUhOO0FBT0U7RUFDRSxhQUFBO0FBTEo7QUFRRTtFQUNFLG1CQUFBO0FBTko7QUFTRTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaURBQUE7RUFDQSwrQkFBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFSSjtBQVdFO0VBQ0Usa0JBQUE7QUFUSjtBQVlFO0VBQ0UscUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQVZKO0FBYUU7RUFDRSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FBWEo7QUFjRTtFQUNFLGtCQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtBQVpKO0FBZ0JFO0VBQ0U7SUFDRSxZQUFBO0lBQ0EsV0FBQTtFQWRKO0VBaUJFO0lBQ0UsYUFBQTtFQWZKO0FBQ0Y7QUFDQSxvM0dBQW8zRyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBpb24tY29udGVudCB7XHJcbiAgICAtLWJhY2tncm91bmQ6ICNmNWY1ZjU7XHJcbiAgfVxyXG5cclxuICBpb24tY2FyZCB7XHJcbiAgICBtYXgtd2lkdGg6IDYwMHB4O1xyXG4gICAgbWFyZ2luOiAycmVtIGF1dG87XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIH1cclxuXHJcbiAgaW9uLWNhcmQtaGVhZGVyIHtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XHJcbiAgICBwYWRkaW5nOiAxLjVyZW07XHJcblxyXG4gICAgaW9uLWNhcmQtdGl0bGUge1xyXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBpb24tY2FyZC1zdWJ0aXRsZSB7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XHJcbiAgICAgIG9wYWNpdHk6IDAuODtcclxuICAgICAgbWFyZ2luLXRvcDogMC41cmVtO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW9uLWNhcmQtY29udGVudCB7XHJcbiAgICBwYWRkaW5nOiAycmVtO1xyXG4gIH1cclxuXHJcbiAgaW9uLWl0ZW0tZ3JvdXAge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxuICB9XHJcblxyXG4gIGlvbi1pdGVtLWRpdmlkZXIge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICB9XHJcblxyXG4gIGlvbi1pdGVtIHtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMDtcclxuICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDA7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIH1cclxuXHJcbiAgaW9uLWNoZWNrYm94IHtcclxuICAgIG1hcmdpbi1yaWdodDogMXJlbTtcclxuICB9XHJcblxyXG4gIC5zZWN1cml0eS1xdWVzdGlvbi1ncm91cCB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICB9XHJcblxyXG4gIGlvbi1idXR0b25bdHlwZT1cInN1Ym1pdFwiXSB7XHJcbiAgICBtYXJnaW46IDJyZW0gMCAxcmVtO1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICAtLWJvcmRlci1yYWRpdXM6IDhweDtcclxuICB9XHJcblxyXG4gIGlvbi1ub3RlIHtcclxuICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcclxuICB9XHJcblxyXG4gIC8vIFJlc3BvbnNpdmUgYWRqdXN0bWVudHNcclxuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgIGlvbi1jYXJkIHtcclxuICAgICAgbWFyZ2luOiAxcmVtO1xyXG4gICAgICB3aWR0aDogYXV0bztcclxuICAgIH1cclxuXHJcbiAgICBpb24tY2FyZC1jb250ZW50IHtcclxuICAgICAgcGFkZGluZzogMXJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_super-admin_pages_register_register_page_ts.js.map