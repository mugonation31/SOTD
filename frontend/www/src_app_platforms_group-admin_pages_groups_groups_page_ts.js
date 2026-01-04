"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_group-admin_pages_groups_groups_page_ts"],{

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

/***/ 4392:
/*!*******************************************************************!*\
  !*** ./src/app/platforms/group-admin/pages/groups/groups.page.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupsPage: () => (/* binding */ GroupsPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/toast.service */ 5423);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_group_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/group.service */ 9699);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/services/auth.service */ 8010);

var _GroupsPage;












function GroupsPage_div_9_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 26)(1, "div", 27)(2, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Entry Fee");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 28)(5, "div", 29)(6, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "\u00A31");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "ion-range", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function GroupsPage_div_9_div_29_Template_ion_range_ionChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onEntryFeeChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "\u00A3100");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 32)(12, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "\u00A3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "ion-input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionInput", function GroupsPage_div_9_div_29_Template_ion_input_ionInput_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onManualFeeInput($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "p", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16, "Set entry fee between \u00A31 and \u00A3100");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "p", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18, "Prize breakdown can be configured after group creation when you know the final member count.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("min", 1)("max", 100)("step", 1)("snaps", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("min", 1)("max", 100);
  }
}
function GroupsPage_div_9_ion_spinner_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-spinner");
  }
}
function GroupsPage_div_9_span_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Create Group");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function GroupsPage_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7)(1, "ion-card", 8)(2, "ion-card-header", 9)(3, "ion-card-title", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Create Your Group");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Set up your prediction group");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "ion-card-content", 12)(8, "form", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngSubmit", function GroupsPage_div_9_Template_form_ngSubmit_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.createGroup());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 14)(10, "ion-item", 15)(11, "ion-label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Group Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "ion-input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 14)(15, "div", 18)(16, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_div_9_Template_div_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.selectGroupType("casual"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div", 20)(18, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "CASUAL GROUP");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "PLAY FOR BRAGGING RIGHTS");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_div_9_Template_div_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.selectGroupType("prize"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](24, "ion-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26, "PRIZE GROUP");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "PLAY FOR CASH PRIZES");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](29, GroupsPage_div_9_div_29_Template, 19, 6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "div", 24)(31, "ion-button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](32, GroupsPage_div_9_ion_spinner_32_Template, 1, 0, "ion-spinner", 5)(33, GroupsPage_div_9_span_33_Template, 2, 0, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx_r1.groupForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("clearInput", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("selected", ((tmp_3_0 = ctx_r1.groupForm.get("type")) == null ? null : tmp_3_0.value) === "casual");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("selected", ((tmp_4_0 = ctx_r1.groupForm.get("type")) == null ? null : tmp_4_0.value) === "prize");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ((tmp_5_0 = ctx_r1.groupForm.get("type")) == null ? null : tmp_5_0.value) === "prize");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx_r1.groupForm.valid || ctx_r1.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r1.isLoading);
  }
}
function GroupsPage_ion_card_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-header")(2, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Welcome to Group Admin");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-card-content")(5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, " You haven't created any groups yet. Click the \"Create Group\" button above to get started! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
}
function GroupsPage_ion_card_11_div_5_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" Entry Fee: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](3, 1, group_r5.entryFee, "GBP"), " ");
  }
}
function GroupsPage_ion_card_11_div_5_span_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" ", group_r5.paidMembers, "/", group_r5.memberCount, " Paid ");
  }
}
function GroupsPage_ion_card_11_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 38)(1, "div", 39)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-badge", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 41)(7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "ion-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "ion-icon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](13, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, GroupsPage_ion_card_11_div_5_span_14_Template, 4, 4, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 44)(16, "div", 45)(17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "ion-button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ion_card_11_div_5_Template_ion_button_click_19_listener() {
      const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.copyGroupCode(group_r5.code));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](20, "ion-icon", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "div", 48)(22, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](23, "ion-icon", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](25, GroupsPage_ion_card_11_div_5_span_25_Template, 3, 2, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "div", 50)(27, "ion-button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ion_card_11_div_5_Template_ion_button_click_27_listener() {
      const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.viewGroupLeaderboard(group_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](28, "ion-icon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29, " LEADERBOARD ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "ion-button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ion_card_11_div_5_Template_ion_button_click_30_listener() {
      const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.showGroupDetails(group_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](31, "ion-icon", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](32, " MANAGE ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "ion-button", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ion_card_11_div_5_Template_ion_button_click_33_listener() {
      const group_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.deleteGroup(group_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](34, "ion-icon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](35, " DELETE ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const group_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](group_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("color", group_r5.type === "prize" ? "primary" : "medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", group_r5.type === "prize" ? "Prize Group" : "Casual Group", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" Admin: ", group_r5.adminName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" Created: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](13, 9, group_r5.createdAt, "medium"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", group_r5.type === "prize");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Group Code: ", group_r5.code, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", group_r5.memberCount, " Members ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", group_r5.type === "prize");
  }
}
function GroupsPage_ion_card_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-header")(2, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "My Groups");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-card-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, GroupsPage_ion_card_11_div_5_Template, 36, 12, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.groups);
  }
}
function GroupsPage_ng_template_13_ion_segment_button_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-segment-button", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Prizes");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function GroupsPage_ng_template_13_div_19_ion_item_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item")(1, "ion-label")(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-badge", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-badge", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-buttons", 57)(14, "ion-button", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_19_ion_item_3_Template_ion_button_click_14_listener() {
      const member_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.manageMemberRole(member_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](15, "ion-icon", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "ion-button", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_19_ion_item_3_Template_ion_button_click_16_listener() {
      const member_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleMemberStatus(member_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](17, "ion-icon", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "ion-button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_19_ion_item_3_Template_ion_button_click_18_listener() {
      const member_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.removeMember(member_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](19, "ion-icon", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const member_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](member_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](member_r9.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Joined: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 9, member_r9.joinedAt), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("color", member_r9.role === "admin" ? "warning" : "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", member_r9.role, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("color", member_r9.status === "active" ? "success" : "medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", member_r9.status, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", member_r9.role === "admin" ? "arrow-down-outline" : "arrow-up-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", member_r9.status === "active" ? "lock-open-outline" : "lock-closed-outline");
  }
}
function GroupsPage_ng_template_13_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "ion-searchbar", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function GroupsPage_ng_template_13_div_19_Template_ion_searchbar_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.searchTerm, $event) || (ctx_r1.searchTerm = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionInput", function GroupsPage_ng_template_13_div_19_Template_ion_searchbar_ionInput_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.filterMembers());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, GroupsPage_ng_template_13_div_19_ion_item_3_Template, 20, 11, "ion-item", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.searchTerm);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.filteredMembers);
  }
}
function GroupsPage_ng_template_13_div_20_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "span", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Configuration Locked");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-button", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_20_div_31_Template_ion_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.editLockedPrizeBreakdown());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "ion-icon", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, " Edit ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function GroupsPage_ng_template_13_div_20_p_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Set percentage distribution for prize positions. Total must equal 100%. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function GroupsPage_ng_template_13_div_20_p_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Prize breakdown is configured and locked. Click \"Edit\" to make changes. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function GroupsPage_ng_template_13_div_20_div_34_div_1_ion_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-button", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_20_div_34_div_1_ion_button_4_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r12);
      const i_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.removePrizePosition(i_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function GroupsPage_ng_template_13_div_20_div_34_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 101)(1, "div", 102)(2, "span", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, GroupsPage_ng_template_13_div_20_div_34_div_1_ion_button_4_Template, 2, 0, "ion-button", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 105)(6, "div", 106)(7, "ion-input", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function GroupsPage_ng_template_13_div_20_div_34_div_1_Template_ion_input_ngModelChange_7_listener($event) {
      const position_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r11).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](position_r14.percentage, $event) || (position_r14.percentage = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionInput", function GroupsPage_ng_template_13_div_20_div_34_div_1_Template_ion_input_ionInput_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r11);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onPercentageChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "span", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 109)(11, "span", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Prize:");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "span", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](15, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const position_r14 = ctx.$implicit;
    const i_r13 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx_r1.getPositionLabel(i_r13 + 1), " Place");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.prizePositions.length > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", position_r14.percentage);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("min", 1)("max", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](15, 6, ctx_r1.calculatePositionPrize(position_r14.percentage), "GBP"));
  }
}
function GroupsPage_ng_template_13_div_20_div_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, GroupsPage_ng_template_13_div_20_div_34_div_1_Template, 16, 9, "div", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.prizePositions);
  }
}
function GroupsPage_ng_template_13_div_20_div_35_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 115)(1, "div", 116)(2, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 118)(5, "span", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "span", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](9, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const position_r15 = ctx.$implicit;
    const i_r16 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx_r1.getPositionLabel(i_r16 + 1), " Place");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", position_r15.percentage, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](9, 3, ctx_r1.calculatePositionPrize(position_r15.percentage), "GBP"));
  }
}
function GroupsPage_ng_template_13_div_20_div_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, GroupsPage_ng_template_13_div_20_div_35_div_1_Template, 10, 6, "div", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.prizePositions);
  }
}
function GroupsPage_ng_template_13_div_20_div_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 121)(1, "ion-button", 122);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_20_div_36_Template_ion_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r17);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.addPrizePosition());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "ion-icon", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " Add Position ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 124)(5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "ion-icon", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r1.prizePositions.length >= 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("invalid", ctx_r1.getTotalPercentage() !== 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Total: ", ctx_r1.getTotalPercentage(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", ctx_r1.getTotalPercentage() === 100 ? "checkmark-circle-outline" : "warning-outline")("color", ctx_r1.getTotalPercentage() === 100 ? "success" : "warning");
  }
}
function GroupsPage_ng_template_13_div_20_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 126)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Quick Presets");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 127)(4, "ion-button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_20_div_37_Template_ion_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.applyPreset("winner-takes-all"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, " Winner Takes All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_20_div_37_Template_ion_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.applyPreset("70-30"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, " 70% / 30% ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "ion-button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_20_div_37_Template_ion_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.applyPreset("50-30-20"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, " 50% / 30% / 20% ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_20_div_37_Template_ion_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.applyPreset("equal-split"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, " Equal Split ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
}
function GroupsPage_ng_template_13_div_20_div_38_ion_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-button", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_20_div_38_ion_button_4_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r20);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.cancelEditLockedBreakdown());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, " Cancel Changes ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function GroupsPage_ng_template_13_div_20_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 129)(1, "ion-button", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_div_20_div_38_Template_ion_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r19);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.savePrizeBreakdown());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "ion-icon", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " Save Prize Breakdown ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, GroupsPage_ng_template_13_div_20_div_38_ion_button_4_Template, 3, 0, "ion-button", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r1.getTotalPercentage() !== 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.isEditingLockedBreakdown);
  }
}
function GroupsPage_ng_template_13_div_20_div_39_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 138)(1, "div", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](7, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const position_r21 = ctx.$implicit;
    const i_r22 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassMap"](ctx_r1.getPositionClass(i_r22 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r1.getPositionLabel(i_r22 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", position_r21.percentage, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](7, 5, ctx_r1.calculatePositionPrize(position_r21.percentage), "GBP"));
  }
}
function GroupsPage_ng_template_13_div_20_div_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 135)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Prize Distribution Preview");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, GroupsPage_ng_template_13_div_20_div_39_div_4_Template, 8, 8, "div", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.prizePositions);
  }
}
function GroupsPage_ng_template_13_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 74)(1, "div", 75)(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Prize Pool Overview");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 76)(5, "div", 77)(6, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "Entry Fee:");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](10, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 77)(12, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "Total Members:");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div", 77)(17, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18, "Paid Members:");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "div", 80)(22, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, "Total Prize Pool:");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](26, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "div", 81)(28, "div", 82)(29, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, "Prize Breakdown Configuration");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, GroupsPage_ng_template_13_div_20_div_31_Template, 7, 0, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](32, GroupsPage_ng_template_13_div_20_p_32_Template, 2, 0, "p", 84)(33, GroupsPage_ng_template_13_div_20_p_33_Template, 2, 0, "p", 85)(34, GroupsPage_ng_template_13_div_20_div_34_Template, 2, 1, "div", 86)(35, GroupsPage_ng_template_13_div_20_div_35_Template, 2, 1, "div", 87)(36, GroupsPage_ng_template_13_div_20_div_36_Template, 8, 6, "div", 88)(37, GroupsPage_ng_template_13_div_20_div_37_Template, 12, 0, "div", 89)(38, GroupsPage_ng_template_13_div_20_div_38_Template, 5, 2, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](39, GroupsPage_ng_template_13_div_20_div_39_Template, 5, 1, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](10, 14, ctx_r1.selectedGroup == null ? null : ctx_r1.selectedGroup.entryFee, "GBP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r1.selectedGroup == null ? null : ctx_r1.selectedGroup.memberCount);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", ctx_r1.selectedGroup == null ? null : ctx_r1.selectedGroup.paidMembers, "/", ctx_r1.selectedGroup == null ? null : ctx_r1.selectedGroup.memberCount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](26, 17, ctx_r1.calculateTotalPrizePool(), "GBP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.isPrizeBreakdownLocked() && !ctx_r1.isEditingLockedBreakdown);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r1.isPrizeBreakdownLocked() || ctx_r1.isEditingLockedBreakdown);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.isPrizeBreakdownLocked() && !ctx_r1.isEditingLockedBreakdown);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.canEditPrizeBreakdown());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.isPrizeBreakdownLocked() && !ctx_r1.isEditingLockedBreakdown);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.canEditPrizeBreakdown());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.canEditPrizeBreakdown());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.canEditPrizeBreakdown());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.getTotalPercentage() === 100);
  }
}
function GroupsPage_ng_template_13_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "ion-list")(2, "ion-item")(3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Allow Player Invites");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-toggle", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function GroupsPage_ng_template_13_div_21_Template_ion_toggle_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.selectedGroup.settings.allowPlayerInvites, $event) || (ctx_r1.selectedGroup.settings.allowPlayerInvites = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function GroupsPage_ng_template_13_div_21_Template_ion_toggle_ionChange_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.saveSettings());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-item")(7, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "Auto-approve Joins");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-toggle", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function GroupsPage_ng_template_13_div_21_Template_ion_toggle_ngModelChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.selectedGroup.settings.autoApproveJoins, $event) || (ctx_r1.selectedGroup.settings.autoApproveJoins = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function GroupsPage_ng_template_13_div_21_Template_ion_toggle_ionChange_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.saveSettings());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-item")(11, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Show Leaderboard");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-toggle", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function GroupsPage_ng_template_13_div_21_Template_ion_toggle_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.selectedGroup.settings.showLeaderboard, $event) || (ctx_r1.selectedGroup.settings.showLeaderboard = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function GroupsPage_ng_template_13_div_21_Template_ion_toggle_ionChange_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.saveSettings());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "ion-item")(15, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16, "Allow Member Chat");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "ion-toggle", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function GroupsPage_ng_template_13_div_21_Template_ion_toggle_ngModelChange_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.selectedGroup.settings.allowMemberChat, $event) || (ctx_r1.selectedGroup.settings.allowMemberChat = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function GroupsPage_ng_template_13_div_21_Template_ion_toggle_ionChange_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.saveSettings());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.selectedGroup.settings.allowPlayerInvites);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.selectedGroup.settings.autoApproveJoins);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.selectedGroup.settings.showLeaderboard);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.selectedGroup.settings.allowMemberChat);
  }
}
function GroupsPage_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-buttons", 57)(5, "ion-button", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_ng_template_13_Template_ion_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.selectedGroup = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "ion-icon", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "ion-toolbar")(8, "ion-segment", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function GroupsPage_ng_template_13_Template_ion_segment_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.selectedTab, $event) || (ctx_r1.selectedTab = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-segment-button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "ion-icon", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Members");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, GroupsPage_ng_template_13_ion_segment_button_13_Template, 4, 0, "ion-segment-button", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "ion-segment-button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](15, "ion-icon", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "Settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "ion-content", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](19, GroupsPage_ng_template_13_div_19_Template, 4, 2, "div", 5)(20, GroupsPage_ng_template_13_div_20_Template, 40, 20, "div", 65)(21, GroupsPage_ng_template_13_div_21_Template, 18, 4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r1.selectedGroup == null ? null : ctx_r1.selectedGroup.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.selectedTab);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", (ctx_r1.selectedGroup == null ? null : ctx_r1.selectedGroup.type) === "prize");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.selectedTab === "members");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.selectedTab === "prizes" && (ctx_r1.selectedGroup == null ? null : ctx_r1.selectedGroup.type) === "prize");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.selectedTab === "settings");
  }
}
class GroupsPage {
  constructor(fb, toastService, router, alertController, groupService, authService) {
    this.fb = fb;
    this.toastService = toastService;
    this.router = router;
    this.alertController = alertController;
    this.groupService = groupService;
    this.authService = authService;
    this.isLoading = false;
    this.isCreateModalOpen = false;
    this.groups = [];
    this.selectedGroup = null;
    this.selectedTab = 'members';
    this.searchTerm = '';
    this.filteredMembers = [];
    this.entryFeeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    this.currentMemberCount = 0;
    this.prizePositions = [{
      percentage: 100
    }];
    this.isEditingLockedBreakdown = false;
    this.currentAdmin = {
      id: '',
      name: '',
      email: '',
      members: []
    };
    (0,ionicons__WEBPACK_IMPORTED_MODULE_6__.a)({
      cashOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.cashOutline,
      bugOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.bugOutline,
      personOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.personOutline,
      calendarOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.calendarOutline,
      copyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.copyOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.peopleOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.checkmarkCircleOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trophyOutline,
      eyeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.eyeOutline,
      trashOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trashOutline,
      closeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.closeOutline,
      settingsOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.settingsOutline,
      lockClosedOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.lockClosedOutline,
      createOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.createOutline,
      addOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.addOutline,
      checkmarkOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.checkmarkOutline,
      personAddOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.personAddOutline,
      personRemoveOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.personRemoveOutline,
      lockOpenOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.lockOpenOutline,
      removeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.removeOutline,
      warningOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.warningOutline
    });
    this.initForm();
    this.loadGroups();
  }
  ngOnInit() {
    this.initCurrentAdmin();
    this.initForm();
    this.loadGroups();
    // Check if this is a first-time group admin and mark first login complete
    this.handleFirstTimeUser();
    // Subscribe to group updates for real-time member changes
    this.subscription = this.groupService.groups$.subscribe(() => {
      this.loadGroups();
      // If a group is currently selected, refresh its data
      if (this.selectedGroup) {
        const updatedGroup = this.groups.find(g => g.id === this.selectedGroup.id);
        if (updatedGroup) {
          this.selectedGroup = updatedGroup;
          this.filteredMembers = [...updatedGroup.members];
        }
      }
    });
  }
  ngOnDestroy() {
    var _this$subscription;
    (_this$subscription = this.subscription) === null || _this$subscription === void 0 || _this$subscription.unsubscribe();
  }
  handleFirstTimeUser() {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Check if this is a first-time user
      if (_this.authService.isFirstTimeUser()) {
        console.log('🆕 GroupsPage: First-time group admin detected - marking login as complete');
        try {
          yield _this.authService.markFirstLoginComplete();
          console.log('✅ GroupsPage: First login marked complete for group admin');
        } catch (error) {
          console.error('❌ GroupsPage: Error marking first login complete:', error);
        }
      }
    })();
  }
  initCurrentAdmin() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentAdmin = {
        id: currentUser.id,
        name: currentUser.firstName && currentUser.lastName ? `${currentUser.firstName} ${currentUser.lastName}` : currentUser.username,
        email: currentUser.email || '',
        members: []
      };
    }
  }
  initForm() {
    var _this$groupForm$get;
    this.groupForm = this.fb.group({
      name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.minLength(3)]],
      type: ['casual', _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      entryFee: [{
        value: 10,
        disabled: true
      }],
      settings: this.fb.group({
        allowPlayerInvites: [true],
        autoApproveJoins: [false],
        showLeaderboard: [true],
        allowMemberChat: [true]
      })
    });
    // Listen to type changes to enable/disable entry fee
    (_this$groupForm$get = this.groupForm.get('type')) === null || _this$groupForm$get === void 0 || _this$groupForm$get.valueChanges.subscribe(type => {
      const entryFeeControl = this.groupForm.get('entryFee');
      if (type === 'prize') {
        entryFeeControl === null || entryFeeControl === void 0 || entryFeeControl.enable();
      } else {
        entryFeeControl === null || entryFeeControl === void 0 || entryFeeControl.disable();
      }
    });
  }
  loadGroups() {
    // Only load groups where the current user is an admin
    this.groups = this.groupService.getAdminGroups();
    // Ensure memberCount is synced with actual members array length
    this.groups = this.groups.map(group => ({
      ...group,
      memberCount: group.members.length
    }));
  }
  onGroupTypeChange() {
    var _this$groupForm$get2, _this$groupForm$get6;
    const type = (_this$groupForm$get2 = this.groupForm.get('type')) === null || _this$groupForm$get2 === void 0 ? void 0 : _this$groupForm$get2.value;
    if (type === 'casual') {
      var _this$groupForm$get3, _this$groupForm$get4;
      (_this$groupForm$get3 = this.groupForm.get('entryFee')) === null || _this$groupForm$get3 === void 0 || _this$groupForm$get3.setValue(null);
      (_this$groupForm$get4 = this.groupForm.get('entryFee')) === null || _this$groupForm$get4 === void 0 || _this$groupForm$get4.clearValidators();
    } else {
      var _this$groupForm$get5;
      (_this$groupForm$get5 = this.groupForm.get('entryFee')) === null || _this$groupForm$get5 === void 0 || _this$groupForm$get5.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required);
    }
    (_this$groupForm$get6 = this.groupForm.get('entryFee')) === null || _this$groupForm$get6 === void 0 || _this$groupForm$get6.updateValueAndValidity();
  }
  selectGroupType(type) {
    this.groupForm.patchValue({
      type
    });
    this.onGroupTypeChange();
  }
  createGroup() {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.groupForm.valid) {
        try {
          _this2.isLoading = true;
          const formValue = _this2.groupForm.value;
          // Use GroupService createGroup method
          const createGroupData = {
            name: formValue.name,
            description: '',
            // Add description if needed
            entryFee: formValue.type === 'prize' ? formValue.entryFee : 0,
            isPrivate: false // Add privacy setting if needed
          };
          // Create group using GroupService
          _this2.groupService.createGroup(createGroupData).subscribe({
            next: function () {
              var _ref = (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (newGroup) {
                // Show success message and close modal
                _this2.toastService.showToast(`Group "${newGroup.name}" created successfully! Code: ${newGroup.code}`, 'success');
                // Reset form to clean state and close create form
                _this2.resetCreateForm();
                _this2.isCreateModalOpen = false;
                // Groups will be reloaded automatically via subscription
              });
              return function next(_x) {
                return _ref.apply(this, arguments);
              };
            }(),
            error: error => {
              console.error('Error creating group:', error);
              _this2.toastService.showToast('Failed to create group. Please try again.', 'danger');
            },
            complete: () => {
              _this2.isLoading = false;
            }
          });
        } catch (error) {
          console.error('Error creating group:', error);
          yield _this2.toastService.showToast('Failed to create group. Please try again.', 'danger');
          _this2.isLoading = false;
        }
      } else {
        yield _this2.toastService.showToast('Please fill in all required fields.', 'warning');
      }
    })();
  }
  generateGroupCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
  copyCode(event, code) {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.stopPropagation(); // Prevent group details from opening
      try {
        yield navigator.clipboard.writeText(code);
        yield _this3.toastService.showToast('Group code copied to clipboard', 'success');
      } catch (error) {
        yield _this3.toastService.showToast('Error copying code', 'error');
      }
    })();
  }
  showGroupDetails(group) {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _this4$selectedGroup$;
      // Get the latest group data from the service to ensure we have current members
      const latestGroup = _this4.groupService.getAllGroups().find(g => g.id === group.id);
      _this4.selectedGroup = latestGroup || group;
      _this4.filteredMembers = [..._this4.selectedGroup.members];
      // Load existing prize breakdown if available
      if ((_this4$selectedGroup$ = _this4.selectedGroup.prizeBreakdown) !== null && _this4$selectedGroup$ !== void 0 && _this4$selectedGroup$.positions) {
        _this4.prizePositions = [..._this4.selectedGroup.prizeBreakdown.positions];
      } else {
        // Reset to default if no existing breakdown
        _this4.prizePositions = [{
          percentage: 100
        }];
      }
      // Reset edit state
      _this4.isEditingLockedBreakdown = false;
    })();
  }
  filterMembers() {
    if (!this.selectedGroup) return;
    const term = this.searchTerm.toLowerCase();
    this.filteredMembers = this.selectedGroup.members.filter(member => member.name.toLowerCase().includes(term) || member.email.toLowerCase().includes(term));
  }
  manageMemberRole(member) {
    var _this5 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const isPromotion = member.role === 'player';
      const action = isPromotion ? 'promote' : 'demote';
      const newRole = isPromotion ? 'admin' : 'player';
      try {
        // Mock API call
        yield new Promise(resolve => setTimeout(resolve, 500));
        // Update member's role
        member.role = newRole;
        // Update the filteredMembers array to reflect the change
        _this5.filteredMembers = _this5.filteredMembers.map(m => m.id === member.id ? {
          ...m,
          role: newRole
        } : m);
        // Update the selected group's members array
        if (_this5.selectedGroup) {
          _this5.selectedGroup.members = _this5.selectedGroup.members.map(m => m.id === member.id ? {
            ...m,
            role: newRole
          } : m);
        }
        yield _this5.toastService.showToast(`Member ${action}d to ${newRole} successfully`, 'success');
      } catch (error) {
        console.error(`Error ${action}ing member:`, error);
        yield _this5.toastService.showToast(`Failed to ${action} member. Please try again.`, 'danger');
        // Revert the role change in case of error
        member.role = isPromotion ? 'player' : 'admin';
      }
    })();
  }
  removeMember(member) {
    var _this6 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Mock API call
        yield new Promise(resolve => setTimeout(resolve, 1000));
        if (_this6.selectedGroup) {
          _this6.selectedGroup.members = _this6.selectedGroup.members.filter(m => m.id !== member.id);
          _this6.selectedGroup.memberCount--;
        }
        yield _this6.toastService.showToast('Member removed successfully', 'success');
      } catch (error) {
        yield _this6.toastService.showToast('Failed to remove member', 'error');
      }
    })();
  }
  toggleMemberStatus(member) {
    var _this7 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // Mock API call
        yield new Promise(resolve => setTimeout(resolve, 1000));
        member.status = member.status === 'active' ? 'inactive' : 'active';
        yield _this7.toastService.showToast(`Member ${member.status === 'active' ? 'activated' : 'deactivated'}`, 'success');
      } catch (error) {
        yield _this7.toastService.showToast('Failed to update member status', 'error');
      }
    })();
  }
  saveSettings() {
    var _this8 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this8.selectedGroup) return;
      try {
        // Mock API call
        yield new Promise(resolve => setTimeout(resolve, 1000));
        yield _this8.toastService.showToast('Settings saved successfully', 'success');
      } catch (error) {
        yield _this8.toastService.showToast('Failed to save settings', 'error');
      }
    })();
  }
  onEntryFeeChange(event) {
    const value = event.detail.value;
    // Ensure the value is a multiple of 5
    const roundedValue = Math.round(value / 5) * 5;
    this.groupForm.patchValue({
      entryFee: roundedValue
    }, {
      emitEvent: false
    });
  }
  onManualFeeInput(event) {
    let value = event.detail.value;
    // Allow empty value
    if (value === '' || value === null) {
      this.groupForm.patchValue({
        entryFee: null
      }, {
        emitEvent: false
      });
      const input = event.target;
      input.classList.remove('has-value');
      return;
    }
    // Convert to number and validate
    value = Number(value);
    if (value < 1) value = 1;
    if (value > 100) value = 100;
    const input = event.target;
    input.classList.add('has-value');
    this.groupForm.patchValue({
      entryFee: value
    }, {
      emitEvent: false
    });
  }
  copyGroupCode(code) {
    var _this9 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield navigator.clipboard.writeText(code);
        yield _this9.toastService.showToast('Group code copied to clipboard', 'success');
      } catch (error) {
        yield _this9.toastService.showToast('Failed to copy code', 'error');
      }
    })();
  }
  viewGroupDetails(group) {
    this.selectedGroup = group;
    // You could also navigate to a details view or show a modal
    // this.router.navigate(['/group-admin/groups', group.id]);
  }
  deleteGroup(group) {
    var _this0 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this0.alertController.create({
        header: 'Delete Group',
        subHeader: `Are you sure you want to delete "${group.name}"?`,
        message: 'This action cannot be undone. All group data including members and predictions will be permanently deleted.',
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          role: 'destructive',
          handler: function () {
            var _ref2 = (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
              try {
                var _this0$selectedGroup;
                // Delete group from storage
                _this0.groupService.deleteGroup(group.id);
                // Update local groups array
                _this0.groups = _this0.groups.filter(g => g.id !== group.id);
                // Clear selected group if it was the deleted one
                if (((_this0$selectedGroup = _this0.selectedGroup) === null || _this0$selectedGroup === void 0 ? void 0 : _this0$selectedGroup.id) === group.id) {
                  _this0.selectedGroup = null;
                }
                yield _this0.toastService.showToast('Group deleted successfully', 'success');
              } catch (error) {
                console.error('Error deleting group:', error);
                yield _this0.toastService.showToast('Failed to delete group. Please try again.', 'danger');
              }
            });
            return function handler() {
              return _ref2.apply(this, arguments);
            };
          }()
        }]
      });
      yield alert.present();
    })();
  }
  viewGroupMembers(group) {
    // Get the latest group data from the service to ensure we have current members
    const latestGroup = this.groupService.getAllGroups().find(g => g.id === group.id);
    this.selectedGroup = latestGroup || group;
    this.selectedTab = 'members';
    this.filteredMembers = [...this.selectedGroup.members];
  }
  viewGroupLeaderboard(group) {
    this.router.navigate(['/group-admin/groups', group.id, 'leaderboard']);
  }
  // Reset form to clean default state
  resetCreateForm() {
    this.groupForm.reset({
      name: '',
      type: 'casual',
      entryFee: 10,
      // Clean default starting value
      settings: {
        allowPlayerInvites: true,
        autoApproveJoins: false,
        showLeaderboard: true,
        allowMemberChat: true
      }
    });
    // Ensure entry fee control state is properly reset
    const entryFeeControl = this.groupForm.get('entryFee');
    if (entryFeeControl) {
      entryFeeControl.disable(); // Start with casual (disabled state)
    }
    // Trigger change detection to ensure UI is updated
    this.onGroupTypeChange();
  }
  // Add method to handle create button click
  toggleCreateForm() {
    if (this.isCreateModalOpen) {
      // Close the form
      this.isCreateModalOpen = false;
    } else {
      // Reset form before showing with clean state
      this.resetCreateForm();
      this.isCreateModalOpen = true;
    }
  }
  // Prize Management Methods
  calculateTotalPrizePool() {
    if (!this.selectedGroup || this.selectedGroup.type !== 'prize') return 0;
    return (this.selectedGroup.entryFee || 0) * (this.selectedGroup.paidMembers || 0);
  }
  calculatePositionPrize(percentage) {
    const totalPool = this.calculateTotalPrizePool();
    return totalPool * percentage / 100;
  }
  getTotalPercentage() {
    return this.prizePositions.reduce((total, position) => total + (position.percentage || 0), 0);
  }
  onPercentageChange() {
    // Trigger change detection for total percentage
  }
  addPrizePosition() {
    if (this.prizePositions.length < 10) {
      this.prizePositions.push({
        percentage: 0
      });
    }
  }
  removePrizePosition(index) {
    if (this.prizePositions.length > 1) {
      this.prizePositions.splice(index, 1);
    }
  }
  getPositionLabel(position) {
    const suffixes = ['st', 'nd', 'rd'];
    const suffix = position <= 3 ? suffixes[position - 1] : 'th';
    return `${position}${suffix}`;
  }
  getPositionClass(position) {
    switch (position) {
      case 1:
        return 'first-place';
      case 2:
        return 'second-place';
      case 3:
        return 'third-place';
      default:
        return 'other-place';
    }
  }
  applyPreset(preset) {
    var _this$selectedGroup;
    switch (preset) {
      case 'winner-takes-all':
        this.prizePositions = [{
          percentage: 100
        }];
        break;
      case '70-30':
        this.prizePositions = [{
          percentage: 70
        }, {
          percentage: 30
        }];
        break;
      case '50-30-20':
        this.prizePositions = [{
          percentage: 50
        }, {
          percentage: 30
        }, {
          percentage: 20
        }];
        break;
      case 'equal-split':
        const memberCount = ((_this$selectedGroup = this.selectedGroup) === null || _this$selectedGroup === void 0 ? void 0 : _this$selectedGroup.memberCount) || 1;
        const equalPercentage = Math.floor(100 / Math.min(memberCount, 5));
        const positions = Math.min(memberCount, 5);
        this.prizePositions = Array(positions).fill(null).map(() => ({
          percentage: equalPercentage
        }));
        // Adjust for rounding
        const remainder = 100 - equalPercentage * positions;
        if (remainder > 0) {
          this.prizePositions[0].percentage += remainder;
        }
        break;
    }
  }
  savePrizeBreakdown() {
    var _this1 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this1.getTotalPercentage() !== 100) {
        yield _this1.toastService.showToast('Prize percentages must total exactly 100%', 'warning');
        return;
      }
      try {
        if (_this1.selectedGroup) {
          // Save the prize breakdown and lock it
          _this1.selectedGroup.prizeBreakdown = {
            positions: [..._this1.prizePositions],
            isLocked: true,
            lockedAt: new Date()
          };
          // Reset edit state
          _this1.isEditingLockedBreakdown = false;
          // Here you would save the prize breakdown to your backend/storage
          // For now, we'll just show a success message
          yield _this1.toastService.showToast('Prize breakdown saved and locked successfully!', 'success');
        }
      } catch (error) {
        console.error('Error saving prize breakdown:', error);
        yield _this1.toastService.showToast('Failed to save prize breakdown. Please try again.', 'danger');
      }
    })();
  }
  isPrizeBreakdownLocked() {
    var _this$selectedGroup$p, _this$selectedGroup2;
    return (_this$selectedGroup$p = (_this$selectedGroup2 = this.selectedGroup) === null || _this$selectedGroup2 === void 0 || (_this$selectedGroup2 = _this$selectedGroup2.prizeBreakdown) === null || _this$selectedGroup2 === void 0 ? void 0 : _this$selectedGroup2.isLocked) !== null && _this$selectedGroup$p !== void 0 ? _this$selectedGroup$p : false;
  }
  canEditPrizeBreakdown() {
    return !this.isPrizeBreakdownLocked() || this.isEditingLockedBreakdown;
  }
  editLockedPrizeBreakdown() {
    var _this10 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this10.alertController.create({
        header: 'Edit Prize Configuration',
        message: 'Are you sure you want to edit this locked configuration?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Edit',
          handler: () => {
            var _this10$selectedGroup;
            _this10.isEditingLockedBreakdown = true;
            // Load existing breakdown for editing
            if ((_this10$selectedGroup = _this10.selectedGroup) !== null && _this10$selectedGroup !== void 0 && (_this10$selectedGroup = _this10$selectedGroup.prizeBreakdown) !== null && _this10$selectedGroup !== void 0 && _this10$selectedGroup.positions) {
              _this10.prizePositions = [..._this10.selectedGroup.prizeBreakdown.positions];
            }
          }
        }]
      });
      yield alert.present();
    })();
  }
  cancelEditLockedBreakdown() {
    var _this$selectedGroup3;
    this.isEditingLockedBreakdown = false;
    // Restore original positions
    if ((_this$selectedGroup3 = this.selectedGroup) !== null && _this$selectedGroup3 !== void 0 && (_this$selectedGroup3 = _this$selectedGroup3.prizeBreakdown) !== null && _this$selectedGroup3 !== void 0 && _this$selectedGroup3.positions) {
      this.prizePositions = [...this.selectedGroup.prizeBreakdown.positions];
    }
  }
}
_GroupsPage = GroupsPage;
_GroupsPage.ɵfac = function GroupsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GroupsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_group_service__WEBPACK_IMPORTED_MODULE_3__.GroupService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService));
};
_GroupsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _GroupsPage,
  selectors: [["app-groups"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
  decls: 14,
  vars: 5,
  consts: [[1, "ion-padding"], [1, "create-group-container"], ["fill", "solid", "color", "primary", 1, "create-group-btn", 3, "click"], ["slot", "start", 3, "name"], ["class", "create-group-form", 4, "ngIf"], [4, "ngIf"], [3, "didDismiss", "isOpen"], [1, "create-group-form"], [1, "form-card"], [1, "form-header"], [1, "form-title"], [1, "form-subtitle"], [1, "form-content"], [3, "ngSubmit", "formGroup"], [1, "form-field"], ["lines", "none", 1, "name-input"], ["position", "stacked"], ["formControlName", "name", "placeholder", "Enter a memorable name for your group", 3, "clearInput"], [1, "group-type-selection"], [1, "type-option", 3, "click"], [1, "type-content"], [1, "type-option", "prize-option", 3, "click"], ["name", "cash-outline", 1, "prize-icon"], ["class", "form-field entry-fee-section", 4, "ngIf"], [1, "form-actions"], ["expand", "block", "type", "submit", 1, "create-button", 3, "disabled"], [1, "form-field", "entry-fee-section"], [1, "entry-fee-header"], [1, "fee-controls"], [1, "fee-range"], [1, "fee-label"], ["formControlName", "entryFee", 1, "fee-slider", 3, "ionChange", "min", "max", "step", "snaps"], [1, "fee-input-container"], [1, "currency-symbol"], ["type", "number", "formControlName", "entryFee", 1, "fee-input", 3, "ionInput", "min", "max"], [1, "fee-description"], [1, "prize-note"], ["class", "group-list-item", 4, "ngFor", "ngForOf"], [1, "group-list-item"], [1, "group-info"], [1, "group-type-badge", 3, "color"], [1, "group-meta"], ["name", "person-outline"], ["name", "calendar-outline"], [1, "group-stats"], [1, "group-code"], ["fill", "clear", 3, "click"], ["name", "copy-outline"], [1, "member-stats"], ["name", "people-outline"], [1, "group-actions"], ["slot", "start", "name", "trophy-outline"], ["slot", "start", "name", "eye-outline"], ["fill", "clear", "color", "danger", 3, "click"], ["slot", "start", "name", "trash-outline"], ["name", "cash-outline"], ["name", "checkmark-circle-outline"], ["slot", "end"], [3, "click"], ["name", "close-outline"], [3, "ngModelChange", "ngModel"], ["value", "members"], ["value", "prizes", 4, "ngIf"], ["value", "settings"], ["name", "settings-outline"], ["class", "prize-management", 4, "ngIf"], ["value", "prizes"], ["name", "trophy-outline"], ["placeholder", "Search members", 3, "ngModelChange", "ionInput", "ngModel"], [4, "ngFor", "ngForOf"], ["slot", "end", 3, "color"], [3, "name"], ["color", "danger", 3, "click"], ["name", "trash-outline"], [1, "prize-management"], [1, "prize-overview"], [1, "pool-stats"], [1, "stat-item"], [1, "label"], [1, "value"], [1, "stat-item", "total-pool"], [1, "prize-breakdown-config"], [1, "config-header"], ["class", "config-status", 4, "ngIf"], ["class", "config-description", 4, "ngIf"], ["class", "config-description locked-description", 4, "ngIf"], ["class", "prize-positions", 4, "ngIf"], ["class", "prize-positions-locked", 4, "ngIf"], ["class", "config-actions", 4, "ngIf"], ["class", "quick-presets", 4, "ngIf"], ["class", "save-actions", 4, "ngIf"], ["class", "prize-preview", 4, "ngIf"], [1, "config-status"], ["name", "lock-closed-outline", "color", "success"], [1, "status-text"], ["fill", "clear", "size", "small", 1, "edit-locked-btn", 3, "click"], ["slot", "start", "name", "create-outline"], [1, "config-description"], [1, "config-description", "locked-description"], [1, "prize-positions"], ["class", "position-config", 4, "ngFor", "ngForOf"], [1, "position-config"], [1, "position-header"], [1, "position-number"], ["fill", "clear", "color", "danger", "size", "small", 3, "click", 4, "ngIf"], [1, "position-inputs"], [1, "percentage-input"], ["type", "number", "placeholder", "0", 3, "ngModelChange", "ionInput", "ngModel", "min", "max"], [1, "percentage-symbol"], [1, "prize-amount"], [1, "amount-label"], [1, "amount-value"], ["fill", "clear", "color", "danger", "size", "small", 3, "click"], [1, "prize-positions-locked"], ["class", "locked-position", 4, "ngFor", "ngForOf"], [1, "locked-position"], [1, "position-info"], [1, "position-label"], [1, "position-details"], [1, "percentage"], [1, "amount"], [1, "config-actions"], ["fill", "outline", 3, "click", "disabled"], ["slot", "start", "name", "add-outline"], [1, "percentage-total"], [3, "name", "color"], [1, "quick-presets"], [1, "preset-buttons"], ["fill", "outline", "size", "small", 3, "click"], [1, "save-actions"], ["expand", "block", 3, "click", "disabled"], ["slot", "start", "name", "checkmark-outline"], ["expand", "block", "fill", "outline", "color", "medium", 3, "click", 4, "ngIf"], ["expand", "block", "fill", "outline", "color", "medium", 3, "click"], ["slot", "start", "name", "close-outline"], [1, "prize-preview"], [1, "preview-cards"], ["class", "preview-card", 3, "class", 4, "ngFor", "ngForOf"], [1, "preview-card"], [1, "position-percentage"], [1, "position-prize"], [3, "ngModelChange", "ionChange", "ngModel"]],
  template: function GroupsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "My Groups");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-content", 0)(5, "div", 1)(6, "ion-button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GroupsPage_Template_ion_button_click_6_listener() {
        return ctx.toggleCreateForm();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "ion-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, " Create New Group ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, GroupsPage_div_9_Template, 34, 10, "div", 4)(10, GroupsPage_ion_card_10_Template, 7, 0, "ion-card", 5)(11, GroupsPage_ion_card_11_Template, 6, 1, "ion-card", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-modal", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("didDismiss", function GroupsPage_Template_ion_modal_didDismiss_12_listener() {
        return ctx.selectedGroup = null;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, GroupsPage_ng_template_13_Template, 22, 6, "ng-template");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", ctx.isCreateModalOpen ? "remove-outline" : "add-outline");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isCreateModalOpen);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.groups.length === 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.groups.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("isOpen", !!ctx.selectedGroup);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonSpinner, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonList, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonModal, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonButtons, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonSegment, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonSegmentButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonSearchbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonToggle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_9__.IonRange, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CurrencyPipe],
  styles: [".group-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n  margin-bottom: 16px;\n  padding: 8px 0;\n}\n\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--ion-color-medium);\n  cursor: pointer;\n  transition: color 0.2s ease;\n}\n.info-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.info-item[_ngcontent-%COMP%]   .members[_ngcontent-%COMP%], \n.info-item[_ngcontent-%COMP%]   .leaderboard[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  font-weight: 500;\n}\n.info-item[_ngcontent-%COMP%]   .members[_ngcontent-%COMP%]:hover, \n.info-item[_ngcontent-%COMP%]   .leaderboard[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.group-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n  border-top: 1px solid var(--ion-color-light);\n  padding-top: 16px;\n  margin-top: 8px;\n}\n\nion-card[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  border-radius: 16px;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);\n}\nion-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\nion-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n}\nion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 16px;\n}\nion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --inner-padding-end: 0;\n  margin-bottom: 16px;\n}\nion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%] {\n  margin: 20px 0;\n}\nion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-button[type=submit][_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n\n.settings-section[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.settings-section[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%] {\n  padding-left: 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\nion-modal[_ngcontent-%COMP%] {\n  --height: 80%;\n  --border-radius: 16px;\n}\nion-modal[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]:first-of-type {\n  --background: var(--ion-color-primary);\n  --color: var(--ion-color-primary-contrast);\n}\nion-modal[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\nion-modal[_ngcontent-%COMP%]   ion-searchbar[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\nion-modal[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%] {\n  background: transparent;\n}\nion-modal[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n  margin-bottom: 0.5rem;\n  border-radius: 8px;\n}\nion-modal[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-bottom: 4px;\n}\nion-modal[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n  margin: 2px 0;\n}\nion-modal[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\nion-modal[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n\nion-item[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  --background: transparent;\n}\n\nion-badge[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n\nion-segment[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n\nion-searchbar[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n.settings-section[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n\nion-toggle[_ngcontent-%COMP%] {\n  padding-right: 1rem;\n}\n\n.role-button[_ngcontent-%COMP%] {\n  transition: all 0.3s ease;\n}\n.role-button.admin-role[_ngcontent-%COMP%] {\n  color: var(--ion-color-warning);\n}\n\n@keyframes _ngcontent-%COMP%_roleChange {\n  0% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.2);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.role-changed[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_roleChange 0.5s ease;\n}\n\n.create-group-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 24px;\n  padding: 0 8px;\n}\n\n.create-group-btn[_ngcontent-%COMP%] {\n  --border-radius: 12px;\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  --border-width: 0 !important;\n  --border-style: none !important;\n  --border-color: transparent !important;\n  --background: var(--ion-color-primary);\n  --color: var(--ion-color-primary-contrast);\n  --box-shadow: none;\n  --ripple-color: transparent;\n  font-weight: 600;\n  text-transform: none;\n  letter-spacing: 0.5px;\n  box-shadow: 0 4px 12px rgba(var(--ion-color-primary-rgb), 0.3);\n  transition: all 0.3s ease;\n  border: none !important;\n  outline: none !important;\n  overflow: hidden;\n  border-radius: 12px;\n}\n.create-group-btn[_ngcontent-%COMP%]::part(native) {\n  border: none !important;\n  outline: none !important;\n  background: var(--ion-color-primary) !important;\n  border-radius: 12px !important;\n  box-shadow: none !important;\n  overflow: hidden;\n}\n.create-group-btn[_ngcontent-%COMP%]::before, .create-group-btn[_ngcontent-%COMP%]::after {\n  display: none !important;\n}\n.create-group-btn[_ngcontent-%COMP%]   .button-native[_ngcontent-%COMP%] {\n  border: none !important;\n  outline: none !important;\n  background: var(--ion-color-primary) !important;\n  border-radius: 12px !important;\n  overflow: hidden;\n}\n.create-group-btn[_ngcontent-%COMP%]:hover {\n  --background: var(--ion-color-primary-shade) !important;\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(var(--ion-color-primary-rgb), 0.4);\n}\n.create-group-btn[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n  --background: var(--ion-color-primary-shade) !important;\n}\n.create-group-btn[_ngcontent-%COMP%]:focus {\n  --background: var(--ion-color-primary) !important;\n}\n.create-group-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  font-size: 18px;\n}\n\n.create-group-card[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n  border-radius: 16px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n\nion-card-header[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n  color: white;\n  border-radius: 16px 16px 0 0;\n}\n\nion-card-title[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 1.5rem;\n  font-weight: 600;\n}\n\nion-card-subtitle[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n}\n\n.group-type-selection[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n}\n\n.segment-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem;\n}\n\n.segment-text[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.segment-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 600;\n}\n.segment-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  opacity: 0.8;\n}\n\n.entry-fee-section[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n  padding: 1rem;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n}\n.entry-fee-section[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --padding-start: 0;\n  --inner-padding-end: 0;\n}\n.entry-fee-section[_ngcontent-%COMP%]   .fee-selector[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin: 1rem 0;\n}\n.entry-fee-section[_ngcontent-%COMP%]   .range-container[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0 0.5rem;\n}\n.entry-fee-section[_ngcontent-%COMP%]   .fee-range[_ngcontent-%COMP%] {\n  --bar-height: 4px;\n  --bar-border-radius: 2px;\n  --knob-size: 20px;\n  --pin-background: var(--ion-color-primary);\n  --pin-color: white;\n  --bar-background: var(--ion-color-medium-tint);\n  --bar-background-active: var(--ion-color-primary);\n}\n.entry-fee-section[_ngcontent-%COMP%]   .manual-fee-input[_ngcontent-%COMP%] {\n  width: 120px;\n  display: flex;\n  align-items: center;\n  background: white;\n  border-radius: 8px;\n  border: 1px solid var(--ion-color-medium-shade);\n  overflow: hidden;\n}\n.entry-fee-section[_ngcontent-%COMP%]   .manual-fee-input[_ngcontent-%COMP%]   .currency-symbol[_ngcontent-%COMP%] {\n  padding: 8px 4px 8px 8px;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n}\n.entry-fee-section[_ngcontent-%COMP%]   .manual-fee-input[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  --padding-start: 0;\n  --padding-end: 8px;\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.entry-fee-section[_ngcontent-%COMP%]   ion-note[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  color: var(--ion-color-medium);\n  font-size: 0.875rem;\n}\n\n.prize-breakdown[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 1rem;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n}\n\n.current-pool[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid var(--ion-color-light-shade);\n}\n.current-pool[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n  color: var(--ion-color-medium);\n}\n\n.pool-total[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-dark) !important;\n  font-size: 1.1rem;\n}\n\n.prize-items[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  gap: 1rem;\n}\n\n.prize-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n.prize-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\nion-badge[color=gold][_ngcontent-%COMP%] {\n  --background: #ffd700;\n  --color: #000;\n}\nion-badge[color=silver][_ngcontent-%COMP%] {\n  --background: #c0c0c0;\n  --color: #000;\n}\nion-badge[color=bronze][_ngcontent-%COMP%] {\n  --background: #cd7f32;\n  --color: #fff;\n}\n\n.prize-note[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  text-align: center;\n}\n\n.group-name-input[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n\n.create-button[_ngcontent-%COMP%] {\n  --border-radius: 8px;\n  height: 48px;\n}\n\n.fee-selector[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin: 1rem 0;\n  width: 100%;\n}\n\n.range-container[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0 0.5rem;\n}\n\n.fee-range[_ngcontent-%COMP%] {\n  --bar-height: 3px;\n  --bar-border-radius: 2px;\n  --knob-size: 20px;\n  --knob-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  --pin-background: var(--ion-color-primary);\n  --pin-color: var(--ion-color-primary-contrast);\n  --bar-background: var(--ion-color-light-shade);\n  --bar-background-active: var(--ion-color-primary);\n  --knob-background: var(--ion-color-primary);\n  --knob-border-radius: 50%;\n}\n.fee-range[_ngcontent-%COMP%]::part(tick) {\n  background: var(--ion-color-medium);\n  width: 1px;\n  height: 8px;\n}\n.fee-range[_ngcontent-%COMP%]::part(tick-active) {\n  background: var(--ion-color-primary);\n}\n\n.range-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n}\n\n.manual-fee-input[_ngcontent-%COMP%] {\n  width: 90px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n  border: 1px solid var(--ion-color-light-shade);\n}\n\n.currency-symbol[_ngcontent-%COMP%] {\n  padding-left: 8px;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n  font-size: 0.95rem;\n}\n\n.fee-input[_ngcontent-%COMP%] {\n  --background: transparent;\n  --border-radius: 8px;\n  --padding-start: 4px;\n  --padding-end: 8px;\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  --placeholder-color: var(--ion-color-medium);\n  --placeholder-opacity: 0.6;\n  --placeholder-font-weight: 400;\n  font-size: 0.95rem;\n  font-weight: 500;\n}\n.fee-input[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%] {\n  -webkit-appearance: textfield;\n          appearance: textfield;\n  -moz-appearance: textfield;\n}\n.fee-input[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button, .fee-input[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.fee-input[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::part(clear-button) {\n  color: var(--ion-color-medium);\n  opacity: 0.7;\n}\n.fee-input[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::part(clear-button):hover {\n  opacity: 1;\n}\n\n.group-details[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n\n.details-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1.5rem;\n}\n\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.detail-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n}\n.detail-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n}\n\n.group-code[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n\n.code-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.code[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 1.2rem !important;\n  letter-spacing: 2px;\n  background: var(--ion-color-light);\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n}\n\n.group-list-item[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1rem;\n  border-bottom: 1px solid var(--ion-color-light-shade);\n}\n.group-list-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.group-list-item[_ngcontent-%COMP%]   .group-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n.group-list-item[_ngcontent-%COMP%]   .group-info[_ngcontent-%COMP%]   .group-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  align-items: center;\n}\n.group-list-item[_ngcontent-%COMP%]   .group-info[_ngcontent-%COMP%]   .group-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n}\n.group-list-item[_ngcontent-%COMP%]   .group-info[_ngcontent-%COMP%]   .group-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.group-list-item[_ngcontent-%COMP%]   .group-info[_ngcontent-%COMP%]   .group-stats[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 0.5rem;\n}\n.group-list-item[_ngcontent-%COMP%]   .group-info[_ngcontent-%COMP%]   .group-stats[_ngcontent-%COMP%]   .group-code[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-family: monospace;\n  background: var(--ion-color-light);\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n}\n.group-list-item[_ngcontent-%COMP%]   .group-info[_ngcontent-%COMP%]   .group-stats[_ngcontent-%COMP%]   .member-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n}\n.group-list-item[_ngcontent-%COMP%]   .group-info[_ngcontent-%COMP%]   .group-stats[_ngcontent-%COMP%]   .member-stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  color: var(--ion-color-medium);\n  font-size: 0.9rem;\n}\n.group-list-item[_ngcontent-%COMP%]   .group-info[_ngcontent-%COMP%]   .group-stats[_ngcontent-%COMP%]   .member-stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.group-list-item[_ngcontent-%COMP%]   .group-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 1rem;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--ion-color-light-shade);\n}\n\n.group-main-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n\n.group-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-top: 0.5rem;\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n}\n.group-meta[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-right: 4px;\n  vertical-align: middle;\n  font-size: 16px;\n}\n\n.group-details[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid var(--ion-color-light-shade);\n}\n\n.group-code-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.group-code-section[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n}\n.group-code-section[_ngcontent-%COMP%]   .code[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 600;\n  letter-spacing: 1px;\n  background: var(--ion-color-light);\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n}\n\n.group-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n  margin-top: 0.5rem;\n  color: var(--ion-color-medium);\n}\n.group-stats[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-right: 0.25rem;\n  vertical-align: middle;\n}\n\n.group-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 1rem;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --padding-start: 1rem;\n  --padding-end: 1rem;\n  --inner-padding-end: 0;\n}\n\n.group-fee[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--ion-color-success);\n}\n\n.group-admin[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n\n.members[_ngcontent-%COMP%], \n.leaderboard[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: var(--ion-color-medium);\n  cursor: pointer;\n  transition: color 0.2s ease;\n}\n.members[_ngcontent-%COMP%]:hover, \n.leaderboard[_ngcontent-%COMP%]:hover {\n  color: var(--ion-color-primary);\n}\n.members[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.leaderboard[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n\nion-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\nion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 4px;\n  --padding-end: 4px;\n  height: 35px;\n}\nion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  opacity: 1;\n}\nion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n\nion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --background: var(--ion-color-primary);\n  --color: var(--ion-color-primary-contrast);\n  --border-radius: 8px;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  margin-right: 16px;\n  font-weight: 500;\n}\n\n.create-group-btn[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n[_nghost-%COMP%]   ion-content[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n[_nghost-%COMP%]   .create-group-btn[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n  --background: var(--ion-color-primary);\n  --color: var(--ion-color-primary-contrast);\n  font-weight: 500;\n  text-transform: none;\n  font-size: 1rem;\n}\n[_nghost-%COMP%]   .create-group-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  margin-right: 0.5rem;\n}\n\n.create-group-form[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  margin-bottom: 32px;\n}\n.create-group-form[_ngcontent-%COMP%]   .form-card[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  border: none;\n  background: white;\n}\n.create-group-form[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-primary-shade));\n  color: white;\n  text-align: center;\n  padding: 32px 24px;\n}\n.create-group-form[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]   .form-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  margin: 0;\n  color: white;\n}\n.create-group-form[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]   .form-subtitle[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 8px 0 0 0;\n  opacity: 0.9;\n  color: white;\n  font-weight: 400;\n}\n.create-group-form[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%] {\n  padding: 32px 24px;\n  background: white;\n}\n.create-group-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.create-group-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.create-group-form[_ngcontent-%COMP%]   .name-input[_ngcontent-%COMP%] {\n  --background: #f8f9fa;\n  --border-radius: 12px;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --inner-padding-end: 0;\n  border: 2px solid transparent;\n  transition: all 0.3s ease;\n}\n.create-group-form[_ngcontent-%COMP%]   .name-input.ion-focused[_ngcontent-%COMP%] {\n  --background: white;\n  border-color: var(--ion-color-primary);\n  box-shadow: 0 0 0 3px rgba(var(--ion-color-primary-rgb), 0.1);\n}\n.create-group-form[_ngcontent-%COMP%]   .name-input[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-dark);\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 8px;\n}\n.create-group-form[_ngcontent-%COMP%]   .name-input[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  --color: var(--ion-color-dark);\n  --placeholder-color: var(--ion-color-medium);\n  font-size: 16px;\n  font-weight: 500;\n}\n.create-group-form[_ngcontent-%COMP%]   .group-type-selection[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.create-group-form[_ngcontent-%COMP%]   .group-type-selection[_ngcontent-%COMP%]   .type-option[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 2px solid #e9ecef;\n  border-radius: 12px;\n  padding: 24px 20px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  text-align: center;\n  position: relative;\n}\n.create-group-form[_ngcontent-%COMP%]   .group-type-selection[_ngcontent-%COMP%]   .type-option[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n}\n.create-group-form[_ngcontent-%COMP%]   .group-type-selection[_ngcontent-%COMP%]   .type-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--ion-color-primary);\n  background: rgba(var(--ion-color-primary-rgb), 0.05);\n  box-shadow: 0 0 0 3px rgba(var(--ion-color-primary-rgb), 0.1);\n}\n.create-group-form[_ngcontent-%COMP%]   .group-type-selection[_ngcontent-%COMP%]   .type-option.prize-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--ion-color-primary);\n  background: linear-gradient(135deg, rgba(var(--ion-color-primary-rgb), 0.1), rgba(var(--ion-color-primary-rgb), 0.05));\n}\n.create-group-form[_ngcontent-%COMP%]   .group-type-selection[_ngcontent-%COMP%]   .type-option[_ngcontent-%COMP%]   .type-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  margin: 0 0 4px 0;\n  color: var(--ion-color-dark);\n  letter-spacing: 0.5px;\n}\n.create-group-form[_ngcontent-%COMP%]   .group-type-selection[_ngcontent-%COMP%]   .type-option[_ngcontent-%COMP%]   .type-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 0;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n  letter-spacing: 0.3px;\n}\n.create-group-form[_ngcontent-%COMP%]   .group-type-selection[_ngcontent-%COMP%]   .type-option[_ngcontent-%COMP%]   .type-content[_ngcontent-%COMP%]   .prize-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n  margin-bottom: 8px;\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-radius: 16px;\n  padding: 24px;\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .entry-fee-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .entry-fee-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  margin: 0;\n  color: var(--ion-color-dark);\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .fee-controls[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .fee-controls[_ngcontent-%COMP%]   .fee-range[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .fee-controls[_ngcontent-%COMP%]   .fee-range[_ngcontent-%COMP%]   .fee-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--ion-color-medium);\n  min-width: 32px;\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .fee-controls[_ngcontent-%COMP%]   .fee-range[_ngcontent-%COMP%]   .fee-slider[_ngcontent-%COMP%] {\n  flex: 1;\n  --bar-height: 6px;\n  --bar-background: #e9ecef;\n  --bar-background-active: var(--ion-color-primary);\n  --knob-background: var(--ion-color-primary);\n  --knob-size: 24px;\n  --knob-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .fee-controls[_ngcontent-%COMP%]   .fee-input-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  background: white;\n  border: 2px solid #e9ecef;\n  border-radius: 8px;\n  padding: 0;\n  width: -moz-fit-content;\n  width: fit-content;\n  margin: 0 auto;\n  transition: all 0.3s ease;\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .fee-controls[_ngcontent-%COMP%]   .fee-input-container[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--ion-color-primary);\n  box-shadow: 0 0 0 3px rgba(var(--ion-color-primary-rgb), 0.1);\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .fee-controls[_ngcontent-%COMP%]   .fee-input-container[_ngcontent-%COMP%]   .currency-symbol[_ngcontent-%COMP%] {\n  padding: 12px 8px 12px 16px;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--ion-color-dark);\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .fee-controls[_ngcontent-%COMP%]   .fee-input-container[_ngcontent-%COMP%]   .fee-input[_ngcontent-%COMP%] {\n  --background: transparent;\n  --padding-start: 0;\n  --padding-end: 16px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  width: 80px;\n  font-size: 16px;\n  font-weight: 600;\n  text-align: center;\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .fee-description[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--ion-color-medium);\n  font-size: 14px;\n  margin: 0 0 24px 0;\n  font-style: italic;\n}\n.create-group-form[_ngcontent-%COMP%]   .entry-fee-section[_ngcontent-%COMP%]   .prize-note[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-medium);\n  text-align: center;\n  margin: 16px 0 0 0;\n  font-style: italic;\n  line-height: 1.4;\n  padding: 16px;\n  background: rgba(var(--ion-color-primary-rgb), 0.05);\n  border-radius: 8px;\n  border-left: 4px solid var(--ion-color-primary);\n}\n.create-group-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%] {\n  margin-top: 32px;\n}\n.create-group-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .create-button[_ngcontent-%COMP%] {\n  --background: var(--ion-color-primary);\n  --color: white;\n  --border-radius: 12px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  font-size: 16px;\n  font-weight: 700;\n  text-transform: none;\n  letter-spacing: 0.5px;\n  box-shadow: 0 4px 16px rgba(var(--ion-color-primary-rgb), 0.3);\n  transition: all 0.3s ease;\n}\n.create-group-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .create-button[_ngcontent-%COMP%]:hover {\n  --background: var(--ion-color-primary-shade);\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(var(--ion-color-primary-rgb), 0.4);\n}\n.create-group-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .create-button[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.create-group-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .create-button[disabled][_ngcontent-%COMP%] {\n  opacity: 0.6;\n  transform: none;\n  box-shadow: none;\n}\n\n.prize-management[_ngcontent-%COMP%]   .prize-overview[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-radius: 12px;\n  padding: 24px;\n  margin-bottom: 24px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-overview[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  color: var(--ion-color-dark);\n  font-size: 18px;\n  font-weight: 700;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-overview[_ngcontent-%COMP%]   .pool-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-overview[_ngcontent-%COMP%]   .pool-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 0;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-overview[_ngcontent-%COMP%]   .pool-stats[_ngcontent-%COMP%]   .stat-item.total-pool[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  border-top: 2px solid var(--ion-color-primary);\n  margin-top: 16px;\n  padding-top: 16px;\n  font-weight: 700;\n  font-size: 16px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-overview[_ngcontent-%COMP%]   .pool-stats[_ngcontent-%COMP%]   .stat-item.total-pool[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  font-size: 18px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-overview[_ngcontent-%COMP%]   .pool-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 14px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-overview[_ngcontent-%COMP%]   .pool-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: var(--ion-color-dark);\n  font-weight: 600;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  margin-bottom: 24px;\n  border: 1px solid #e9ecef;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--ion-color-dark);\n  font-size: 18px;\n  font-weight: 700;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-header[_ngcontent-%COMP%]   .config-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #e8f5e8;\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: 1px solid #c3e6c3;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-header[_ngcontent-%COMP%]   .config-status[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-header[_ngcontent-%COMP%]   .config-status[_ngcontent-%COMP%]   .status-text[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n  font-weight: 600;\n  font-size: 14px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-header[_ngcontent-%COMP%]   .config-status[_ngcontent-%COMP%]   .edit-locked-btn[_ngcontent-%COMP%] {\n  --padding-start: 8px;\n  --padding-end: 8px;\n  --padding-top: 4px;\n  --padding-bottom: 4px;\n  font-size: 12px;\n  margin-left: 8px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-description[_ngcontent-%COMP%] {\n  margin: 0 0 24px 0;\n  color: var(--ion-color-medium);\n  font-size: 14px;\n  font-style: italic;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-description.locked-description[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n  background: #f0f9f0;\n  padding: 12px 16px;\n  border-radius: 8px;\n  border-left: 4px solid var(--ion-color-success);\n  font-style: normal;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  border: 1px solid #e9ecef;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%]   .position-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%]   .position-header[_ngcontent-%COMP%]   .position-number[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  font-size: 14px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%]   .position-inputs[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%]   .position-inputs[_ngcontent-%COMP%]   .percentage-input[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  background: white;\n  border: 2px solid #e9ecef;\n  border-radius: 8px;\n  padding: 0;\n  width: 120px;\n  transition: all 0.3s ease;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%]   .position-inputs[_ngcontent-%COMP%]   .percentage-input[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--ion-color-primary);\n  box-shadow: 0 0 0 3px rgba(var(--ion-color-primary-rgb), 0.1);\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%]   .position-inputs[_ngcontent-%COMP%]   .percentage-input[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  --background: transparent;\n  --padding-start: 12px;\n  --padding-end: 4px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  flex: 1;\n  font-weight: 600;\n  text-align: center;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%]   .position-inputs[_ngcontent-%COMP%]   .percentage-input[_ngcontent-%COMP%]   .percentage-symbol[_ngcontent-%COMP%] {\n  padding-right: 12px;\n  font-weight: 700;\n  color: var(--ion-color-dark);\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%]   .position-inputs[_ngcontent-%COMP%]   .prize-amount[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%]   .position-inputs[_ngcontent-%COMP%]   .prize-amount[_ngcontent-%COMP%]   .amount-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 14px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions[_ngcontent-%COMP%]   .position-config[_ngcontent-%COMP%]   .position-inputs[_ngcontent-%COMP%]   .prize-amount[_ngcontent-%COMP%]   .amount-value[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  font-weight: 700;\n  font-size: 16px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 24px 0;\n  padding-top: 16px;\n  border-top: 1px solid #e9ecef;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-actions[_ngcontent-%COMP%]   .percentage-total[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-actions[_ngcontent-%COMP%]   .percentage-total.invalid[_ngcontent-%COMP%] {\n  color: var(--ion-color-warning);\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .config-actions[_ngcontent-%COMP%]   .percentage-total[_ngcontent-%COMP%]:not(.invalid) {\n  color: var(--ion-color-success);\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .quick-presets[_ngcontent-%COMP%] {\n  margin: 24px 0;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .quick-presets[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  color: var(--ion-color-dark);\n  font-size: 16px;\n  font-weight: 600;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .quick-presets[_ngcontent-%COMP%]   .preset-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .quick-presets[_ngcontent-%COMP%]   .preset-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --border-radius: 20px;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  font-size: 12px;\n  text-transform: none;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .save-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --border-radius: 12px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  font-weight: 600;\n  text-transform: none;\n  margin-bottom: 8px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .save-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions-locked[_ngcontent-%COMP%]   .locked-position[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  border: 1px solid #e9ecef;\n  border-left: 4px solid var(--ion-color-success);\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions-locked[_ngcontent-%COMP%]   .locked-position[_ngcontent-%COMP%]   .position-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions-locked[_ngcontent-%COMP%]   .locked-position[_ngcontent-%COMP%]   .position-info[_ngcontent-%COMP%]   .position-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  font-size: 14px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions-locked[_ngcontent-%COMP%]   .locked-position[_ngcontent-%COMP%]   .position-info[_ngcontent-%COMP%]   .position-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions-locked[_ngcontent-%COMP%]   .locked-position[_ngcontent-%COMP%]   .position-info[_ngcontent-%COMP%]   .position-details[_ngcontent-%COMP%]   .percentage[_ngcontent-%COMP%] {\n  background: var(--ion-color-success);\n  color: white;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-weight: 600;\n  font-size: 14px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-breakdown-config[_ngcontent-%COMP%]   .prize-positions-locked[_ngcontent-%COMP%]   .locked-position[_ngcontent-%COMP%]   .position-info[_ngcontent-%COMP%]   .position-details[_ngcontent-%COMP%]   .amount[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  font-weight: 700;\n  font-size: 16px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  border: 1px solid #e9ecef;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 20px 0;\n  color: var(--ion-color-dark);\n  font-size: 18px;\n  font-weight: 700;\n  text-align: center;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   .preview-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  justify-content: center;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   .preview-cards[_ngcontent-%COMP%]   .preview-card[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 120px;\n  max-width: 150px;\n  background: #f8f9fa;\n  border-radius: 12px;\n  padding: 20px 16px;\n  text-align: center;\n  border: 2px solid #e9ecef;\n  transition: all 0.3s ease;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   .preview-cards[_ngcontent-%COMP%]   .preview-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   .preview-cards[_ngcontent-%COMP%]   .preview-card.first-place[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ffd700, #ffed4e);\n  color: #8b5a00;\n  border-color: #ffd700;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   .preview-cards[_ngcontent-%COMP%]   .preview-card.second-place[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #c0c0c0, #d4d4d4);\n  color: #4a4a4a;\n  border-color: #c0c0c0;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   .preview-cards[_ngcontent-%COMP%]   .preview-card.third-place[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #cd7f32, #e69c5a);\n  color: #5d3a1a;\n  border-color: #cd7f32;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   .preview-cards[_ngcontent-%COMP%]   .preview-card.other-place[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #6c757d, #868e96);\n  color: white;\n  border-color: #6c757d;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   .preview-cards[_ngcontent-%COMP%]   .preview-card[_ngcontent-%COMP%]   .position-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  margin-bottom: 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   .preview-cards[_ngcontent-%COMP%]   .preview-card[_ngcontent-%COMP%]   .position-percentage[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin-bottom: 4px;\n}\n.prize-management[_ngcontent-%COMP%]   .prize-preview[_ngcontent-%COMP%]   .preview-cards[_ngcontent-%COMP%]   .preview-card[_ngcontent-%COMP%]   .position-prize[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n}\n/*# sourceMappingURL=data:application/json;base64,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Q0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7QUF6TFI7QUEyTFE7RUFDRSwyQkFBQTtFQUNBLHlDQUFBO0FBekxWO0FBNExRO0VBQ0UscURBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7QUExTFY7QUE2TFE7RUFDRSxxREFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtBQTNMVjtBQThMUTtFQUNFLHFEQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0FBNUxWO0FBK0xRO0VBQ0UscURBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7QUE3TFY7QUFnTVE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUE5TFY7QUFpTVE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQS9MVjtBQWtNUTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQWhNViIsImZpbGUiOiJncm91cHMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmdyb3VwLWluZm8ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgcGFkZGluZzogOHB4IDA7XG59XG5cbi5pbmZvLWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICB9XG5cbiAgLm1lbWJlcnMsXG4gIC5sZWFkZXJib2FyZCB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICB9XG4gIH1cbn1cblxuLmdyb3VwLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDhweDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIHBhZGRpbmctdG9wOiAxNnB4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG59XG5cbmlvbi1jYXJkIHtcbiAgbWFyZ2luOiAxNnB4IDA7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDZweCAtMXB4IHJnYigwIDAgMCAvIDAuMSksIDAgMnB4IDRweCAtMnB4IHJnYigwIDAgMCAvIDAuMSk7XG5cbiAgaW9uLWNhcmQtaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmc6IDE2cHg7XG5cbiAgICBpb24tY2FyZC10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgIH1cbiAgfVxuXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDE2cHg7XG5cbiAgICBpb24taXRlbSB7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gICAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICB9XG5cbiAgICBpb24tc2VnbWVudCB7XG4gICAgICBtYXJnaW46IDIwcHggMDtcbiAgICB9XG5cbiAgICBpb24tYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0ge1xuICAgICAgbWFyZ2luLXRvcDogMjRweDtcbiAgICB9XG4gIH1cbn1cblxuLy8gTW9kYWwgc3R5bGVzXG4uc2V0dGluZ3Mtc2VjdGlvbiB7XG4gIG1hcmdpbi10b3A6IDI0cHg7XG5cbiAgaW9uLWxpc3QtaGVhZGVyIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxufVxuXG5pb24tbW9kYWwge1xuICAtLWhlaWdodDogODAlO1xuICAtLWJvcmRlci1yYWRpdXM6IDE2cHg7XG5cbiAgaW9uLWhlYWRlciB7XG4gICAgaW9uLXRvb2xiYXI6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgICB9XG4gIH1cblxuICBpb24tc2VnbWVudCB7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICB9XG5cbiAgaW9uLXNlYXJjaGJhciB7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgfVxuXG4gIGlvbi1saXN0IHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblxuICAgIGlvbi1pdGVtIHtcbiAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcblxuICAgICAgaW9uLWxhYmVsIHtcbiAgICAgICAgaDIge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgcCB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICAgIG1hcmdpbjogMnB4IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW9uLWJhZGdlIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgICB9XG5cbiAgICAgIGlvbi1idXR0b25zIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuaW9uLWl0ZW0ge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG5pb24tYmFkZ2Uge1xuICBtYXJnaW4tcmlnaHQ6IDhweDtcbn1cblxuaW9uLXNlZ21lbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG59XG5cbmlvbi1zZWFyY2hiYXIge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4uc2V0dGluZ3Mtc2VjdGlvbiB7XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG59XG5cbmlvbi10b2dnbGUge1xuICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xufVxuXG4ucm9sZS1idXR0b24ge1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuXG4gICYuYWRtaW4tcm9sZSB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHJvbGVDaGFuZ2Uge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG59XG5cbi5yb2xlLWNoYW5nZWQge1xuICBhbmltYXRpb246IHJvbGVDaGFuZ2UgMC41cyBlYXNlO1xufVxuXG4vLyBDcmVhdGUgR3JvdXAgQnV0dG9uIENvbnRhaW5lclxuLmNyZWF0ZS1ncm91cC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBwYWRkaW5nOiAwIDhweDtcbn1cblxuLmNyZWF0ZS1ncm91cC1idG4ge1xuICAtLWJvcmRlci1yYWRpdXM6IDEycHg7XG4gIC0tcGFkZGluZy1zdGFydDogMjBweDtcbiAgLS1wYWRkaW5nLWVuZDogMjBweDtcbiAgLS1wYWRkaW5nLXRvcDogMTJweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgLS1ib3JkZXItd2lkdGg6IDAgIWltcG9ydGFudDtcbiAgLS1ib3JkZXItc3R5bGU6IG5vbmUgIWltcG9ydGFudDtcbiAgLS1ib3JkZXItY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gIC0tYm94LXNoYWRvdzogbm9uZTtcbiAgLS1yaXBwbGUtY29sb3I6IHRyYW5zcGFyZW50O1xuICBmb250LXdlaWdodDogNjAwO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4zKTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7XG4gIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcblxuICAmOjpwYXJ0KG5hdGl2ZSkge1xuICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50O1xuICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4ICFpbXBvcnRhbnQ7XG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cblxuICAmOjpiZWZvcmUsXG4gICY6OmFmdGVyIHtcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuYnV0dG9uLW5hdGl2ZSB7XG4gICAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7XG4gICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAhaW1wb3J0YW50O1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHggIWltcG9ydGFudDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZSkgIWltcG9ydGFudDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gICAgYm94LXNoYWRvdzogMCA2cHggMTZweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuNCk7XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGUpICFpbXBvcnRhbnQ7XG4gIH1cblxuICAmOmZvY3VzIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAhaW1wb3J0YW50O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxufVxuXG4uY3JlYXRlLWdyb3VwLWNhcmQge1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuaW9uLWNhcmQtaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHggMTZweCAwIDA7XG59XG5cbmlvbi1jYXJkLXRpdGxlIHtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuaW9uLWNhcmQtc3VidGl0bGUge1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xufVxuXG4uZ3JvdXAtdHlwZS1zZWxlY3Rpb24ge1xuICBtYXJnaW46IDEuNXJlbSAwO1xufVxuXG4uc2VnbWVudC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuLnNlZ21lbnQtdGV4dCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG5cbiAgaDMge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxuXG4gIHAge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICBvcGFjaXR5OiAwLjg7XG4gIH1cbn1cblxuLmVudHJ5LWZlZS1zZWN0aW9uIHtcbiAgbWFyZ2luOiAxLjVyZW0gMDtcbiAgcGFkZGluZzogMXJlbTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gIGlvbi1pdGVtIHtcbiAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIC0tcGFkZGluZy1zdGFydDogMDtcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xuICB9XG5cbiAgLmZlZS1zZWxlY3RvciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMXJlbTtcbiAgICBtYXJnaW46IDFyZW0gMDtcbiAgfVxuXG4gIC5yYW5nZS1jb250YWluZXIge1xuICAgIGZsZXg6IDE7XG4gICAgcGFkZGluZzogMCAwLjVyZW07XG4gIH1cblxuICAuZmVlLXJhbmdlIHtcbiAgICAtLWJhci1oZWlnaHQ6IDRweDtcbiAgICAtLWJhci1ib3JkZXItcmFkaXVzOiAycHg7XG4gICAgLS1rbm9iLXNpemU6IDIwcHg7XG4gICAgLS1waW4tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIC0tcGluLWNvbG9yOiB3aGl0ZTtcbiAgICAtLWJhci1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXRpbnQpO1xuICAgIC0tYmFyLWJhY2tncm91bmQtYWN0aXZlOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cblxuICAubWFudWFsLWZlZS1pbnB1dCB7XG4gICAgd2lkdGg6IDEyMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIC5jdXJyZW5jeS1zeW1ib2wge1xuICAgICAgcGFkZGluZzogOHB4IDRweCA4cHggOHB4O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICBpb24taW5wdXQge1xuICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgLS1wYWRkaW5nLXRvcDogOHB4O1xuICAgICAgLS1wYWRkaW5nLWJvdHRvbTogOHB4O1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG4gIH1cblxuICBpb24tbm90ZSB7XG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXNpemU6IDAuODc1cmVtO1xuICB9XG59XG5cbi5wcml6ZS1icmVha2Rvd24ge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBwYWRkaW5nOiAxcmVtO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbi5jdXJyZW50LXBvb2wge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIHBhZGRpbmctYm90dG9tOiAxcmVtO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcblxuICBwIHtcbiAgICBtYXJnaW46IDAuNXJlbSAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgfVxufVxuXG4ucG9vbC10b3RhbCB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyaykgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAxLjFyZW07XG59XG5cbi5wcml6ZS1pdGVtcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBnYXA6IDFyZW07XG59XG5cbi5wcml6ZS1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG5cbiAgc3BhbiB7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxufVxuXG5pb24tYmFkZ2Uge1xuICAmW2NvbG9yPSdnb2xkJ10ge1xuICAgIC0tYmFja2dyb3VuZDogI2ZmZDcwMDtcbiAgICAtLWNvbG9yOiAjMDAwO1xuICB9XG5cbiAgJltjb2xvcj0nc2lsdmVyJ10ge1xuICAgIC0tYmFja2dyb3VuZDogI2MwYzBjMDtcbiAgICAtLWNvbG9yOiAjMDAwO1xuICB9XG5cbiAgJltjb2xvcj0nYnJvbnplJ10ge1xuICAgIC0tYmFja2dyb3VuZDogI2NkN2YzMjtcbiAgICAtLWNvbG9yOiAjZmZmO1xuICB9XG59XG5cbi5wcml6ZS1ub3RlIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZ3JvdXAtbmFtZS1pbnB1dCB7XG4gIG1hcmdpbjogMS41cmVtIDA7XG59XG5cbi5mb3JtLWFjdGlvbnMge1xuICBtYXJnaW4tdG9wOiAycmVtO1xufVxuXG4uY3JlYXRlLWJ1dHRvbiB7XG4gIC0tYm9yZGVyLXJhZGl1czogOHB4O1xuICBoZWlnaHQ6IDQ4cHg7XG59XG5cbi5mZWUtc2VsZWN0b3Ige1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDFyZW07XG4gIG1hcmdpbjogMXJlbSAwO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnJhbmdlLWNvbnRhaW5lciB7XG4gIGZsZXg6IDE7XG4gIHBhZGRpbmc6IDAgMC41cmVtO1xufVxuXG4uZmVlLXJhbmdlIHtcbiAgLS1iYXItaGVpZ2h0OiAzcHg7XG4gIC0tYmFyLWJvcmRlci1yYWRpdXM6IDJweDtcbiAgLS1rbm9iLXNpemU6IDIwcHg7XG4gIC0ta25vYi1ib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAtLXBpbi1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIC0tcGluLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gIC0tYmFyLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gIC0tYmFyLWJhY2tncm91bmQtYWN0aXZlOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIC0ta25vYi1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIC0ta25vYi1ib3JkZXItcmFkaXVzOiA1MCU7XG5cbiAgJjo6cGFydCh0aWNrKSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgd2lkdGg6IDFweDtcbiAgICBoZWlnaHQ6IDhweDtcbiAgfVxuXG4gICY6OnBhcnQodGljay1hY3RpdmUpIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cbn1cblxuLnJhbmdlLWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjhyZW07XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbn1cblxuLm1hbnVhbC1mZWUtaW5wdXQge1xuICB3aWR0aDogOTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG59XG5cbi5jdXJyZW5jeS1zeW1ib2wge1xuICBwYWRkaW5nLWxlZnQ6IDhweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDAuOTVyZW07XG59XG5cbi5mZWUtaW5wdXQge1xuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAtLWJvcmRlci1yYWRpdXM6IDhweDtcbiAgLS1wYWRkaW5nLXN0YXJ0OiA0cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgLS1wYWRkaW5nLXRvcDogOHB4O1xuICAtLXBhZGRpbmctYm90dG9tOiA4cHg7XG4gIC0tcGxhY2Vob2xkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAtLXBsYWNlaG9sZGVyLW9wYWNpdHk6IDAuNjtcbiAgLS1wbGFjZWhvbGRlci1mb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG5cbiAgaW5wdXRbdHlwZT0nbnVtYmVyJ10ge1xuICAgICY6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sXG4gICAgJjo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG4gICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuXG4gICAgYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xuICAgIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xuICB9XG5cbiAgOjpwYXJ0KGNsZWFyLWJ1dHRvbikge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBvcGFjaXR5OiAwLjc7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICB9XG59XG5cbi5ncm91cC1kZXRhaWxzIHtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbn1cblxuLmRldGFpbHMtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjUwcHgsIDFmcikpO1xuICBnYXA6IDEuNXJlbTtcbn1cblxuLmRldGFpbC1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAwLjVyZW07XG5cbiAgbGFiZWwge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgfVxuXG4gIHAge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIH1cbn1cblxuLmdyb3VwLWNvZGUge1xuICBncmlkLWNvbHVtbjogMSAvIC0xO1xufVxuXG4uY29kZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDFyZW07XG59XG5cbi5jb2RlIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgZm9udC1zaXplOiAxLjJyZW0gIWltcG9ydGFudDtcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmdyb3VwLWxpc3QtaXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAxcmVtO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcblxuICAmOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gIH1cblxuICAuZ3JvdXAtaW5mbyB7XG4gICAgaDIge1xuICAgICAgbWFyZ2luOiAwIDAgMC41cmVtO1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgIH1cblxuICAgIC5ncm91cC1tZXRhIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBnYXA6IDFyZW07XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgICAgc3BhbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogMC4yNXJlbTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcblxuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmdyb3VwLXN0YXRzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgbWFyZ2luLXRvcDogMC41cmVtO1xuXG4gICAgICAuZ3JvdXAtY29kZSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogMC41cmVtO1xuICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgfVxuXG4gICAgICAubWVtYmVyLXN0YXRzIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZ2FwOiAxcmVtO1xuXG4gICAgICAgIHNwYW4ge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBnYXA6IDAuMjVyZW07XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuXG4gICAgICAgICAgaW9uLWljb24ge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5ncm91cC1hY3Rpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgZ2FwOiAwLjVyZW07XG4gICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICBwYWRkaW5nLXRvcDogMC41cmVtO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICB9XG59XG5cbi5ncm91cC1tYWluLWluZm8ge1xuICBoMiB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxufVxuXG4uZ3JvdXAtbWV0YSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMXJlbTtcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gIGlvbi1pY29uIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxufVxuXG4uZ3JvdXAtZGV0YWlscyB7XG4gIG1hcmdpbi10b3A6IDFyZW07XG4gIHBhZGRpbmctdG9wOiAxcmVtO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbn1cblxuLmdyb3VwLWNvZGUtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC41cmVtO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG5cbiAgLmxhYmVsIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIH1cblxuICAuY29kZSB7XG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIH1cbn1cblxuLmdyb3VwLXN0YXRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxLjVyZW07XG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gIGlvbi1pY29uIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDAuMjVyZW07XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgfVxufVxuXG4uZ3JvdXAtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIGdhcDogMC41cmVtO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xufVxuXG5pb24taXRlbSB7XG4gIC0tcGFkZGluZy1zdGFydDogMXJlbTtcbiAgLS1wYWRkaW5nLWVuZDogMXJlbTtcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcbn1cblxuLmdyb3VwLWZlZSB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG59XG5cbi5ncm91cC1hZG1pbiB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5tZW1iZXJzLFxuLmxlYWRlcmJvYXJkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzIGVhc2U7XG5cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgfVxufVxuXG5pb24tYnV0dG9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTJweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICBpb24tYnV0dG9uIHtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDRweDtcbiAgICAtLXBhZGRpbmctZW5kOiA0cHg7XG4gICAgaGVpZ2h0OiAzNXB4O1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgb3BhY2l0eTogMTtcblxuICAgICAgJjpob3ZlciB7XG4gICAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuaW9uLWhlYWRlciB7XG4gIGlvbi10b29sYmFyIHtcbiAgICBpb24tYnV0dG9ucyB7XG4gICAgICBpb24tYnV0dG9uIHtcbiAgICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgICAgICAgLS1ib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgICAgICAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNnB4O1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4uY3JlYXRlLWdyb3VwLWJ0biB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbjpob3N0IHtcbiAgaW9uLWNvbnRlbnQge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgfVxuXG4gIC5jcmVhdGUtZ3JvdXAtYnRuIHtcbiAgICBtYXJnaW46IDFyZW0gMDtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbiAgICB9XG4gIH1cblxuICAvLyAuLi4gcmVzdCBvZiBleGlzdGluZyBzdHlsZXMgLi4uXG59XG5cbi8vIE5ldyBDcmVhdGUgR3JvdXAgRm9ybSBTdHlsaW5nXG4uY3JlYXRlLWdyb3VwLWZvcm0ge1xuICBtYXJnaW4tdG9wOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAzMnB4O1xuICBcbiAgLmZvcm0tY2FyZCB7XG4gICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgfVxuXG4gIC5mb3JtLWhlYWRlciB7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZSkpO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMzJweCAyNHB4O1xuICAgIFxuICAgIC5mb3JtLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuICAgIFxuICAgIC5mb3JtLXN1YnRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIG1hcmdpbjogOHB4IDAgMCAwO1xuICAgICAgb3BhY2l0eTogMC45O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICB9XG4gIH1cblxuICAuZm9ybS1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAzMnB4IDI0cHg7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gIH1cblxuICAuZm9ybS1maWVsZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMzJweDtcbiAgICBcbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG4gIH1cblxuICAubmFtZS1pbnB1dCB7XG4gICAgLS1iYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgIC0tYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gICAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgXG4gICAgJi5pb24tZm9jdXNlZCB7XG4gICAgICAtLWJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjEpO1xuICAgIH1cbiAgICBcbiAgICBpb24tbGFiZWwge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgfVxuICAgIFxuICAgIGlvbi1pbnB1dCB7XG4gICAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAtLXBsYWNlaG9sZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuICB9XG5cbiAgLmdyb3VwLXR5cGUtc2VsZWN0aW9uIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbiAgICBnYXA6IDE2cHg7XG4gICAgXG4gICAgLnR5cGUtb3B0aW9uIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAjZTllY2VmO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIHBhZGRpbmc6IDI0cHggMjBweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBcbiAgICAgICY6aG92ZXIge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDE2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgfVxuICAgICAgXG4gICAgICAmLnNlbGVjdGVkIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4wNSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgICYucHJpemUtb3B0aW9uLnNlbGVjdGVkIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xKSwgcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjA1KSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC50eXBlLWNvbnRlbnQge1xuICAgICAgICBoMyB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgbWFyZ2luOiAwIDAgNHB4IDA7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHAge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAucHJpemUtaWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLmVudHJ5LWZlZS1zZWN0aW9uIHtcbiAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICBcbiAgICAuZW50cnktZmVlLWhlYWRlciB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAgICAgXG4gICAgICBoNCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAuZmVlLWNvbnRyb2xzIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgICBcbiAgICAgIC5mZWUtcmFuZ2Uge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBnYXA6IDE2cHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgIFxuICAgICAgICAuZmVlLWxhYmVsIHtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgICAgbWluLXdpZHRoOiAzMnB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAuZmVlLXNsaWRlciB7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICAtLWJhci1oZWlnaHQ6IDZweDtcbiAgICAgICAgICAtLWJhci1iYWNrZ3JvdW5kOiAjZTllY2VmO1xuICAgICAgICAgIC0tYmFyLWJhY2tncm91bmQtYWN0aXZlOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgLS1rbm9iLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAtLWtub2Itc2l6ZTogMjRweDtcbiAgICAgICAgICAtLWtub2ItYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICAuZmVlLWlucHV0LWNvbnRhaW5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjZTllY2VmO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICAgIFxuICAgICAgICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmN1cnJlbmN5LXN5bWJvbCB7XG4gICAgICAgICAgcGFkZGluZzogMTJweCA4cHggMTJweCAxNnB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5mZWUtaW5wdXQge1xuICAgICAgICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgICAgICAgIC0tcGFkZGluZy1lbmQ6IDE2cHg7XG4gICAgICAgICAgLS1wYWRkaW5nLXRvcDogMTJweDtcbiAgICAgICAgICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgICAgICAgIHdpZHRoOiA4MHB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAuZmVlLWRlc2NyaXB0aW9uIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIG1hcmdpbjogMCAwIDI0cHggMDtcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB9XG4gICAgXG4gICAgICAgICAucHJpemUtbm90ZSB7XG4gICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgbWFyZ2luOiAxNnB4IDAgMCAwO1xuICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjA1KTtcbiAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgIH1cbiAgfVxuXG4gIC5mb3JtLWFjdGlvbnMge1xuICAgIG1hcmdpbi10b3A6IDMycHg7XG4gICAgXG4gICAgLmNyZWF0ZS1idXR0b24ge1xuICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAtLWNvbG9yOiB3aGl0ZTtcbiAgICAgIC0tYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIC0tcGFkZGluZy10b3A6IDE2cHg7XG4gICAgICAtLXBhZGRpbmctYm90dG9tOiAxNnB4O1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTZweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMyk7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgICAgXG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZSk7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgICAgICAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuNCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgICY6YWN0aXZlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgfVxuICAgICAgXG4gICAgICAmW2Rpc2FibGVkXSB7XG4gICAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBQcml6ZSBNYW5hZ2VtZW50IFN0eWxpbmdcbi5wcml6ZS1tYW5hZ2VtZW50IHtcbiAgLnByaXplLW92ZXJ2aWV3IHtcbiAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAgIFxuICAgIGgzIHtcbiAgICAgIG1hcmdpbjogMCAwIDE2cHggMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgIH1cbiAgICBcbiAgICAucG9vbC1zdGF0cyB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgICBcbiAgICAgIC5zdGF0LWl0ZW0ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHBhZGRpbmc6IDEycHggMDtcbiAgICAgICAgXG4gICAgICAgICYudG90YWwtcG9vbCB7XG4gICAgICAgICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcbiAgICAgICAgICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICAgIG1hcmdpbi10b3A6IDE2cHg7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDE2cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgICAgXG4gICAgICAgICAgLnZhbHVlIHtcbiAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAubGFiZWwge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC52YWx1ZSB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICAucHJpemUtYnJlYWtkb3duLWNvbmZpZyB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICBwYWRkaW5nOiAyNHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U5ZWNlZjtcbiAgICBcbiAgICAuY29uZmlnLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgIFxuICAgICAgaDMge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmNvbmZpZy1zdGF0dXMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgYmFja2dyb3VuZDogI2U4ZjVlODtcbiAgICAgICAgcGFkZGluZzogOHB4IDE2cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjM2U2YzM7XG4gICAgICAgIFxuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAuc3RhdHVzLXRleHQge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5lZGl0LWxvY2tlZC1idG4ge1xuICAgICAgICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgICAgICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgICAgICAgICAtLXBhZGRpbmctdG9wOiA0cHg7XG4gICAgICAgICAgLS1wYWRkaW5nLWJvdHRvbTogNHB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogOHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC5jb25maWctZGVzY3JpcHRpb24ge1xuICAgICAgbWFyZ2luOiAwIDAgMjRweCAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgXG4gICAgICAmLmxvY2tlZC1kZXNjcmlwdGlvbiB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmMGY5ZjA7XG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAucHJpemUtcG9zaXRpb25zIHtcbiAgICAgIC5wb3NpdGlvbi1jb25maWcge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlOWVjZWY7XG4gICAgICAgIFxuICAgICAgICAucG9zaXRpb24taGVhZGVyIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICAgICAgXG4gICAgICAgICAgLnBvc2l0aW9uLW51bWJlciB7XG4gICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5wb3NpdGlvbi1pbnB1dHMge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgZ2FwOiAxNnB4O1xuICAgICAgICAgIFxuICAgICAgICAgIC5wZXJjZW50YWdlLWlucHV0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjZTllY2VmO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIHdpZHRoOiAxMjBweDtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICY6Zm9jdXMtd2l0aGluIHtcbiAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlvbi1pbnB1dCB7XG4gICAgICAgICAgICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICAgIC0tcGFkZGluZy1zdGFydDogMTJweDtcbiAgICAgICAgICAgICAgLS1wYWRkaW5nLWVuZDogNHB4O1xuICAgICAgICAgICAgICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAgICAgICAgICAgICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC5wZXJjZW50YWdlLXN5bWJvbCB7XG4gICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC5wcml6ZS1hbW91bnQge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLmFtb3VudC1sYWJlbCB7XG4gICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAuYW1vdW50LXZhbHVlIHtcbiAgICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAuY29uZmlnLWFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBtYXJnaW46IDI0cHggMDtcbiAgICAgIHBhZGRpbmctdG9wOiAxNnB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlOWVjZWY7XG4gICAgICBcbiAgICAgIC5wZXJjZW50YWdlLXRvdGFsIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ2FwOiA4cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIFxuICAgICAgICAmLmludmFsaWQge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICY6bm90KC5pbnZhbGlkKSB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAucXVpY2stcHJlc2V0cyB7XG4gICAgICBtYXJnaW46IDI0cHggMDtcbiAgICAgIFxuICAgICAgaDQge1xuICAgICAgICBtYXJnaW46IDAgMCAxMnB4IDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnByZXNldC1idXR0b25zIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgXG4gICAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAgIC0tYm9yZGVyLXJhZGl1czogMjBweDtcbiAgICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gICAgICAgICAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgICAgICAgICAtLXBhZGRpbmctdG9wOiA4cHg7XG4gICAgICAgICAgLS1wYWRkaW5nLWJvdHRvbTogOHB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAuc2F2ZS1hY3Rpb25zIHtcbiAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAtLWJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICAgIC0tcGFkZGluZy10b3A6IDE2cHg7XG4gICAgICAgIC0tcGFkZGluZy1ib3R0b206IDE2cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICAgIFxuICAgICAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLnByaXplLXBvc2l0aW9ucy1sb2NrZWQge1xuICAgICAgLmxvY2tlZC1wb3NpdGlvbiB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2U5ZWNlZjtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgICAgIFxuICAgICAgICAucG9zaXRpb24taW5mbyB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBcbiAgICAgICAgICAucG9zaXRpb24tbGFiZWwge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC5wb3NpdGlvbi1kZXRhaWxzIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgZ2FwOiAxNnB4O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAucGVyY2VudGFnZSB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICBwYWRkaW5nOiA0cHggMTJweDtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAuYW1vdW50IHtcbiAgICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLnByaXplLXByZXZpZXcge1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTllY2VmO1xuICAgIFxuICAgIGgzIHtcbiAgICAgIG1hcmdpbjogMCAwIDIwcHggMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cbiAgICBcbiAgICAucHJldmlldy1jYXJkcyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgZ2FwOiAxMnB4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBcbiAgICAgIC5wcmV2aWV3LWNhcmQge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBtaW4td2lkdGg6IDEyMHB4O1xuICAgICAgICBtYXgtd2lkdGg6IDE1MHB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgICBwYWRkaW5nOiAyMHB4IDE2cHg7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2U5ZWNlZjtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgICAgICAgXG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJi5maXJzdC1wbGFjZSB7XG4gICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmZDcwMCwgI2ZmZWQ0ZSk7XG4gICAgICAgICAgY29sb3I6ICM4YjVhMDA7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjZmZkNzAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAmLnNlY29uZC1wbGFjZSB7XG4gICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2MwYzBjMCwgI2Q0ZDRkNCk7XG4gICAgICAgICAgY29sb3I6ICM0YTRhNGE7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjYzBjMGMwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAmLnRoaXJkLXBsYWNlIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjY2Q3ZjMyLCAjZTY5YzVhKTtcbiAgICAgICAgICBjb2xvcjogIzVkM2ExYTtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICNjZDdmMzI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICYub3RoZXItcGxhY2Uge1xuICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2Yzc1N2QsICM4NjhlOTYpO1xuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICM2Yzc1N2Q7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5wb3NpdGlvbi1sYWJlbCB7XG4gICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAucG9zaXRpb24tcGVyY2VudGFnZSB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAucG9zaXRpb24tcHJpemUge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL2dyb3VwLWFkbWluL3BhZ2VzL2dyb3Vwcy9ncm91cHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0VBQ0EsMkJBQUE7QUFDRjtBQUNFO0VBQ0UsZUFBQTtBQUNKO0FBRUU7O0VBRUUsK0JBQUE7RUFDQSxnQkFBQTtBQUFKO0FBRUk7O0VBQ0UsMEJBQUE7QUFDTjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EseUJBQUE7RUFDQSw0Q0FBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQURGOztBQUlBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0ZBQUE7QUFERjtBQUdFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxhQUFBO0FBREo7QUFHSTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQUROO0FBS0U7RUFDRSxhQUFBO0FBSEo7QUFLSTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUhOO0FBTUk7RUFDRSxjQUFBO0FBSk47QUFPSTtFQUNFLGdCQUFBO0FBTE47O0FBV0E7RUFDRSxnQkFBQTtBQVJGO0FBVUU7RUFDRSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFSSjs7QUFZQTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtBQVRGO0FBWUk7RUFDRSxzQ0FBQTtFQUNBLDBDQUFBO0FBVk47QUFjRTtFQUNFLG9DQUFBO0FBWko7QUFlRTtFQUNFLG1CQUFBO0FBYko7QUFnQkU7RUFDRSx1QkFBQTtBQWRKO0FBZ0JJO0VBQ0Usb0NBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0FBZE47QUFpQlE7RUFDRSxnQkFBQTtF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QUNBLFNBQUE7RUFDQSx1QkFBQTtBQXpMTjtBQTJMTTtFQUNFLE9BQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQUFBO0FBekxSO0FBMkxRO0VBQ0UsMkJBQUE7RUFDQSx5Q0FBQTtBQXpMVjtBQTRMUTtFQUNFLHFEQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0FBMUxWO0FBNkxRO0VBQ0UscURBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7QUEzTFY7QUE4TFE7RUFDRSxxREFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtBQTVMVjtBQStMUTtFQUNFLHFEQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0FBN0xWO0FBZ01RO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0FBOUxWO0FBaU1RO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUEvTFY7QUFrTVE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7QUFoTVY7QUFHQSw0MnVEQUE0MnVEIiwic291cmNlc0NvbnRlbnQiOlsiLmdyb3VwLWluZm8ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgcGFkZGluZzogOHB4IDA7XG59XG5cbi5pbmZvLWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICB9XG5cbiAgLm1lbWJlcnMsXG4gIC5sZWFkZXJib2FyZCB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICB9XG4gIH1cbn1cblxuLmdyb3VwLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDhweDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIHBhZGRpbmctdG9wOiAxNnB4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG59XG5cbmlvbi1jYXJkIHtcbiAgbWFyZ2luOiAxNnB4IDA7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDZweCAtMXB4IHJnYigwIDAgMCAvIDAuMSksIDAgMnB4IDRweCAtMnB4IHJnYigwIDAgMCAvIDAuMSk7XG5cbiAgaW9uLWNhcmQtaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmc6IDE2cHg7XG5cbiAgICBpb24tY2FyZC10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgIH1cbiAgfVxuXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDE2cHg7XG5cbiAgICBpb24taXRlbSB7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gICAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICB9XG5cbiAgICBpb24tc2VnbWVudCB7XG4gICAgICBtYXJnaW46IDIwcHggMDtcbiAgICB9XG5cbiAgICBpb24tYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0ge1xuICAgICAgbWFyZ2luLXRvcDogMjRweDtcbiAgICB9XG4gIH1cbn1cblxuLy8gTW9kYWwgc3R5bGVzXG4uc2V0dGluZ3Mtc2VjdGlvbiB7XG4gIG1hcmdpbi10b3A6IDI0cHg7XG5cbiAgaW9uLWxpc3QtaGVhZGVyIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxufVxuXG5pb24tbW9kYWwge1xuICAtLWhlaWdodDogODAlO1xuICAtLWJvcmRlci1yYWRpdXM6IDE2cHg7XG5cbiAgaW9uLWhlYWRlciB7XG4gICAgaW9uLXRvb2xiYXI6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgICB9XG4gIH1cblxuICBpb24tc2VnbWVudCB7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICB9XG5cbiAgaW9uLXNlYXJjaGJhciB7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgfVxuXG4gIGlvbi1saXN0IHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblxuICAgIGlvbi1pdGVtIHtcbiAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcblxuICAgICAgaW9uLWxhYmVsIHtcbiAgICAgICAgaDIge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgcCB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICAgIG1hcmdpbjogMnB4IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW9uLWJhZGdlIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgICB9XG5cbiAgICAgIGlvbi1idXR0b25zIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuaW9uLWl0ZW0ge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG5pb24tYmFkZ2Uge1xuICBtYXJnaW4tcmlnaHQ6IDhweDtcbn1cblxuaW9uLXNlZ21lbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG59XG5cbmlvbi1zZWFyY2hiYXIge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4uc2V0dGluZ3Mtc2VjdGlvbiB7XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG59XG5cbmlvbi10b2dnbGUge1xuICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xufVxuXG4ucm9sZS1idXR0b24ge1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuXG4gICYuYWRtaW4tcm9sZSB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHJvbGVDaGFuZ2Uge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG59XG5cbi5yb2xlLWNoYW5nZWQge1xuICBhbmltYXRpb246IHJvbGVDaGFuZ2UgMC41cyBlYXNlO1xufVxuXG4vLyBDcmVhdGUgR3JvdXAgQnV0dG9uIENvbnRhaW5lclxuLmNyZWF0ZS1ncm91cC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBwYWRkaW5nOiAwIDhweDtcbn1cblxuLmNyZWF0ZS1ncm91cC1idG4ge1xuICAtLWJvcmRlci1yYWRpdXM6IDEycHg7XG4gIC0tcGFkZGluZy1zdGFydDogMjBweDtcbiAgLS1wYWRkaW5nLWVuZDogMjBweDtcbiAgLS1wYWRkaW5nLXRvcDogMTJweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgLS1ib3JkZXItd2lkdGg6IDAgIWltcG9ydGFudDtcbiAgLS1ib3JkZXItc3R5bGU6IG5vbmUgIWltcG9ydGFudDtcbiAgLS1ib3JkZXItY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gIC0tYm94LXNoYWRvdzogbm9uZTtcbiAgLS1yaXBwbGUtY29sb3I6IHRyYW5zcGFyZW50O1xuICBmb250LXdlaWdodDogNjAwO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4zKTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7XG4gIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcblxuICAmOjpwYXJ0KG5hdGl2ZSkge1xuICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50O1xuICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4ICFpbXBvcnRhbnQ7XG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cblxuICAmOjpiZWZvcmUsXG4gICY6OmFmdGVyIHtcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuYnV0dG9uLW5hdGl2ZSB7XG4gICAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7XG4gICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAhaW1wb3J0YW50O1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHggIWltcG9ydGFudDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZSkgIWltcG9ydGFudDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gICAgYm94LXNoYWRvdzogMCA2cHggMTZweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuNCk7XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGUpICFpbXBvcnRhbnQ7XG4gIH1cblxuICAmOmZvY3VzIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAhaW1wb3J0YW50O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxufVxuXG4uY3JlYXRlLWdyb3VwLWNhcmQge1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuaW9uLWNhcmQtaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHggMTZweCAwIDA7XG59XG5cbmlvbi1jYXJkLXRpdGxlIHtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuaW9uLWNhcmQtc3VidGl0bGUge1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xufVxuXG4uZ3JvdXAtdHlwZS1zZWxlY3Rpb24ge1xuICBtYXJnaW46IDEuNXJlbSAwO1xufVxuXG4uc2VnbWVudC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuLnNlZ21lbnQtdGV4dCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG5cbiAgaDMge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxuXG4gIHAge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICBvcGFjaXR5OiAwLjg7XG4gIH1cbn1cblxuLmVudHJ5LWZlZS1zZWN0aW9uIHtcbiAgbWFyZ2luOiAxLjVyZW0gMDtcbiAgcGFkZGluZzogMXJlbTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gIGlvbi1pdGVtIHtcbiAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIC0tcGFkZGluZy1zdGFydDogMDtcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xuICB9XG5cbiAgLmZlZS1zZWxlY3RvciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMXJlbTtcbiAgICBtYXJnaW46IDFyZW0gMDtcbiAgfVxuXG4gIC5yYW5nZS1jb250YWluZXIge1xuICAgIGZsZXg6IDE7XG4gICAgcGFkZGluZzogMCAwLjVyZW07XG4gIH1cblxuICAuZmVlLXJhbmdlIHtcbiAgICAtLWJhci1oZWlnaHQ6IDRweDtcbiAgICAtLWJhci1ib3JkZXItcmFkaXVzOiAycHg7XG4gICAgLS1rbm9iLXNpemU6IDIwcHg7XG4gICAgLS1waW4tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIC0tcGluLWNvbG9yOiB3aGl0ZTtcbiAgICAtLWJhci1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXRpbnQpO1xuICAgIC0tYmFyLWJhY2tncm91bmQtYWN0aXZlOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cblxuICAubWFudWFsLWZlZS1pbnB1dCB7XG4gICAgd2lkdGg6IDEyMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIC5jdXJyZW5jeS1zeW1ib2wge1xuICAgICAgcGFkZGluZzogOHB4IDRweCA4cHggOHB4O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICBpb24taW5wdXQge1xuICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgLS1wYWRkaW5nLXRvcDogOHB4O1xuICAgICAgLS1wYWRkaW5nLWJvdHRvbTogOHB4O1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG4gIH1cblxuICBpb24tbm90ZSB7XG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXNpemU6IDAuODc1cmVtO1xuICB9XG59XG5cbi5wcml6ZS1icmVha2Rvd24ge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBwYWRkaW5nOiAxcmVtO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbi5jdXJyZW50LXBvb2wge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIHBhZGRpbmctYm90dG9tOiAxcmVtO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcblxuICBwIHtcbiAgICBtYXJnaW46IDAuNXJlbSAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgfVxufVxuXG4ucG9vbC10b3RhbCB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyaykgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAxLjFyZW07XG59XG5cbi5wcml6ZS1pdGVtcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBnYXA6IDFyZW07XG59XG5cbi5wcml6ZS1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG5cbiAgc3BhbiB7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxufVxuXG5pb24tYmFkZ2Uge1xuICAmW2NvbG9yPSdnb2xkJ10ge1xuICAgIC0tYmFja2dyb3VuZDogI2ZmZDcwMDtcbiAgICAtLWNvbG9yOiAjMDAwO1xuICB9XG5cbiAgJltjb2xvcj0nc2lsdmVyJ10ge1xuICAgIC0tYmFja2dyb3VuZDogI2MwYzBjMDtcbiAgICAtLWNvbG9yOiAjMDAwO1xuICB9XG5cbiAgJltjb2xvcj0nYnJvbnplJ10ge1xuICAgIC0tYmFja2dyb3VuZDogI2NkN2YzMjtcbiAgICAtLWNvbG9yOiAjZmZmO1xuICB9XG59XG5cbi5wcml6ZS1ub3RlIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZ3JvdXAtbmFtZS1pbnB1dCB7XG4gIG1hcmdpbjogMS41cmVtIDA7XG59XG5cbi5mb3JtLWFjdGlvbnMge1xuICBtYXJnaW4tdG9wOiAycmVtO1xufVxuXG4uY3JlYXRlLWJ1dHRvbiB7XG4gIC0tYm9yZGVyLXJhZGl1czogOHB4O1xuICBoZWlnaHQ6IDQ4cHg7XG59XG5cbi5mZWUtc2VsZWN0b3Ige1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDFyZW07XG4gIG1hcmdpbjogMXJlbSAwO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnJhbmdlLWNvbnRhaW5lciB7XG4gIGZsZXg6IDE7XG4gIHBhZGRpbmc6IDAgMC41cmVtO1xufVxuXG4uZmVlLXJhbmdlIHtcbiAgLS1iYXItaGVpZ2h0OiAzcHg7XG4gIC0tYmFyLWJvcmRlci1yYWRpdXM6IDJweDtcbiAgLS1rbm9iLXNpemU6IDIwcHg7XG4gIC0ta25vYi1ib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAtLXBpbi1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIC0tcGluLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gIC0tYmFyLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gIC0tYmFyLWJhY2tncm91bmQtYWN0aXZlOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIC0ta25vYi1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIC0ta25vYi1ib3JkZXItcmFkaXVzOiA1MCU7XG5cbiAgJjo6cGFydCh0aWNrKSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgd2lkdGg6IDFweDtcbiAgICBoZWlnaHQ6IDhweDtcbiAgfVxuXG4gICY6OnBhcnQodGljay1hY3RpdmUpIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cbn1cblxuLnJhbmdlLWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjhyZW07XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbn1cblxuLm1hbnVhbC1mZWUtaW5wdXQge1xuICB3aWR0aDogOTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG59XG5cbi5jdXJyZW5jeS1zeW1ib2wge1xuICBwYWRkaW5nLWxlZnQ6IDhweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDAuOTVyZW07XG59XG5cbi5mZWUtaW5wdXQge1xuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAtLWJvcmRlci1yYWRpdXM6IDhweDtcbiAgLS1wYWRkaW5nLXN0YXJ0OiA0cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgLS1wYWRkaW5nLXRvcDogOHB4O1xuICAtLXBhZGRpbmctYm90dG9tOiA4cHg7XG4gIC0tcGxhY2Vob2xkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAtLXBsYWNlaG9sZGVyLW9wYWNpdHk6IDAuNjtcbiAgLS1wbGFjZWhvbGRlci1mb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG5cbiAgaW5wdXRbdHlwZT0nbnVtYmVyJ10ge1xuICAgICY6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sXG4gICAgJjo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG4gICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuXG4gICAgYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xuICAgIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xuICB9XG5cbiAgOjpwYXJ0KGNsZWFyLWJ1dHRvbikge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBvcGFjaXR5OiAwLjc7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICB9XG59XG5cbi5ncm91cC1kZXRhaWxzIHtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbn1cblxuLmRldGFpbHMtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjUwcHgsIDFmcikpO1xuICBnYXA6IDEuNXJlbTtcbn1cblxuLmRldGFpbC1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAwLjVyZW07XG5cbiAgbGFiZWwge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgfVxuXG4gIHAge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIH1cbn1cblxuLmdyb3VwLWNvZGUge1xuICBncmlkLWNvbHVtbjogMSAvIC0xO1xufVxuXG4uY29kZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDFyZW07XG59XG5cbi5jb2RlIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgZm9udC1zaXplOiAxLjJyZW0gIWltcG9ydGFudDtcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmdyb3VwLWxpc3QtaXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAxcmVtO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcblxuICAmOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gIH1cblxuICAuZ3JvdXAtaW5mbyB7XG4gICAgaDIge1xuICAgICAgbWFyZ2luOiAwIDAgMC41cmVtO1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgIH1cblxuICAgIC5ncm91cC1tZXRhIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBnYXA6IDFyZW07XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgICAgc3BhbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogMC4yNXJlbTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcblxuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmdyb3VwLXN0YXRzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgbWFyZ2luLXRvcDogMC41cmVtO1xuXG4gICAgICAuZ3JvdXAtY29kZSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogMC41cmVtO1xuICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgfVxuXG4gICAgICAubWVtYmVyLXN0YXRzIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZ2FwOiAxcmVtO1xuXG4gICAgICAgIHNwYW4ge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBnYXA6IDAuMjVyZW07XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuXG4gICAgICAgICAgaW9uLWljb24ge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5ncm91cC1hY3Rpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgZ2FwOiAwLjVyZW07XG4gICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICBwYWRkaW5nLXRvcDogMC41cmVtO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICB9XG59XG5cbi5ncm91cC1tYWluLWluZm8ge1xuICBoMiB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxufVxuXG4uZ3JvdXAtbWV0YSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMXJlbTtcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gIGlvbi1pY29uIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxufVxuXG4uZ3JvdXAtZGV0YWlscyB7XG4gIG1hcmdpbi10b3A6IDFyZW07XG4gIHBhZGRpbmctdG9wOiAxcmVtO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbn1cblxuLmdyb3VwLWNvZGUtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC41cmVtO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG5cbiAgLmxhYmVsIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIH1cblxuICAuY29kZSB7XG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIH1cbn1cblxuLmdyb3VwLXN0YXRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxLjVyZW07XG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gIGlvbi1pY29uIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDAuMjVyZW07XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgfVxufVxuXG4uZ3JvdXAtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIGdhcDogMC41cmVtO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xufVxuXG5pb24taXRlbSB7XG4gIC0tcGFkZGluZy1zdGFydDogMXJlbTtcbiAgLS1wYWRkaW5nLWVuZDogMXJlbTtcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcbn1cblxuLmdyb3VwLWZlZSB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG59XG5cbi5ncm91cC1hZG1pbiB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5tZW1iZXJzLFxuLmxlYWRlcmJvYXJkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzIGVhc2U7XG5cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgfVxufVxuXG5pb24tYnV0dG9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTJweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICBpb24tYnV0dG9uIHtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDRweDtcbiAgICAtLXBhZGRpbmctZW5kOiA0cHg7XG4gICAgaGVpZ2h0OiAzNXB4O1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgb3BhY2l0eTogMTtcblxuICAgICAgJjpob3ZlciB7XG4gICAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuaW9uLWhlYWRlciB7XG4gIGlvbi10b29sYmFyIHtcbiAgICBpb24tYnV0dG9ucyB7XG4gICAgICBpb24tYnV0dG9uIHtcbiAgICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgICAgICAgLS1ib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgICAgICAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNnB4O1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4uY3JlYXRlLWdyb3VwLWJ0biB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbjpob3N0IHtcbiAgaW9uLWNvbnRlbnQge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgfVxuXG4gIC5jcmVhdGUtZ3JvdXAtYnRuIHtcbiAgICBtYXJnaW46IDFyZW0gMDtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbiAgICB9XG4gIH1cblxuICAvLyAuLi4gcmVzdCBvZiBleGlzdGluZyBzdHlsZXMgLi4uXG59XG5cbi8vIE5ldyBDcmVhdGUgR3JvdXAgRm9ybSBTdHlsaW5nXG4uY3JlYXRlLWdyb3VwLWZvcm0ge1xuICBtYXJnaW4tdG9wOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAzMnB4O1xuICBcbiAgLmZvcm0tY2FyZCB7XG4gICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgfVxuXG4gIC5mb3JtLWhlYWRlciB7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZSkpO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMzJweCAyNHB4O1xuICAgIFxuICAgIC5mb3JtLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuICAgIFxuICAgIC5mb3JtLXN1YnRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIG1hcmdpbjogOHB4IDAgMCAwO1xuICAgICAgb3BhY2l0eTogMC45O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICB9XG4gIH1cblxuICAuZm9ybS1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAzMnB4IDI0cHg7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gIH1cblxuICAuZm9ybS1maWVsZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMzJweDtcbiAgICBcbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG4gIH1cblxuICAubmFtZS1pbnB1dCB7XG4gICAgLS1iYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgIC0tYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gICAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgXG4gICAgJi5pb24tZm9jdXNlZCB7XG4gICAgICAtLWJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjEpO1xuICAgIH1cbiAgICBcbiAgICBpb24tbGFiZWwge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgfVxuICAgIFxuICAgIGlvbi1pbnB1dCB7XG4gICAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAtLXBsYWNlaG9sZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuICB9XG5cbiAgLmdyb3VwLXR5cGUtc2VsZWN0aW9uIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbiAgICBnYXA6IDE2cHg7XG4gICAgXG4gICAgLnR5cGUtb3B0aW9uIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAjZTllY2VmO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIHBhZGRpbmc6IDI0cHggMjBweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBcbiAgICAgICY6aG92ZXIge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDE2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgfVxuICAgICAgXG4gICAgICAmLnNlbGVjdGVkIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4wNSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgICYucHJpemUtb3B0aW9uLnNlbGVjdGVkIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xKSwgcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjA1KSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC50eXBlLWNvbnRlbnQge1xuICAgICAgICBoMyB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgbWFyZ2luOiAwIDAgNHB4IDA7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHAge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAucHJpemUtaWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLmVudHJ5LWZlZS1zZWN0aW9uIHtcbiAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICBcbiAgICAuZW50cnktZmVlLWhlYWRlciB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAgICAgXG4gICAgICBoNCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAuZmVlLWNvbnRyb2xzIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgICBcbiAgICAgIC5mZWUtcmFuZ2Uge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBnYXA6IDE2cHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgIFxuICAgICAgICAuZmVlLWxhYmVsIHtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgICAgbWluLXdpZHRoOiAzMnB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAuZmVlLXNsaWRlciB7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICAtLWJhci1oZWlnaHQ6IDZweDtcbiAgICAgICAgICAtLWJhci1iYWNrZ3JvdW5kOiAjZTllY2VmO1xuICAgICAgICAgIC0tYmFyLWJhY2tncm91bmQtYWN0aXZlOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgLS1rbm9iLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAtLWtub2Itc2l6ZTogMjRweDtcbiAgICAgICAgICAtLWtub2ItYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICAuZmVlLWlucHV0LWNvbnRhaW5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjZTllY2VmO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICAgIFxuICAgICAgICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmN1cnJlbmN5LXN5bWJvbCB7XG4gICAgICAgICAgcGFkZGluZzogMTJweCA4cHggMTJweCAxNnB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5mZWUtaW5wdXQge1xuICAgICAgICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgICAgICAgIC0tcGFkZGluZy1lbmQ6IDE2cHg7XG4gICAgICAgICAgLS1wYWRkaW5nLXRvcDogMTJweDtcbiAgICAgICAgICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgICAgICAgIHdpZHRoOiA4MHB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAuZmVlLWRlc2NyaXB0aW9uIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIG1hcmdpbjogMCAwIDI0cHggMDtcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB9XG4gICAgXG4gICAgICAgICAucHJpemUtbm90ZSB7XG4gICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgbWFyZ2luOiAxNnB4IDAgMCAwO1xuICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjA1KTtcbiAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgIH1cbiAgfVxuXG4gIC5mb3JtLWFjdGlvbnMge1xuICAgIG1hcmdpbi10b3A6IDMycHg7XG4gICAgXG4gICAgLmNyZWF0ZS1idXR0b24ge1xuICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAtLWNvbG9yOiB3aGl0ZTtcbiAgICAgIC0tYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIC0tcGFkZGluZy10b3A6IDE2cHg7XG4gICAgICAtLXBhZGRpbmctYm90dG9tOiAxNnB4O1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTZweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMyk7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgICAgXG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZSk7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgICAgICAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuNCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgICY6YWN0aXZlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgfVxuICAgICAgXG4gICAgICAmW2Rpc2FibGVkXSB7XG4gICAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBQcml6ZSBNYW5hZ2VtZW50IFN0eWxpbmdcbi5wcml6ZS1tYW5hZ2VtZW50IHtcbiAgLnByaXplLW92ZXJ2aWV3IHtcbiAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAgIFxuICAgIGgzIHtcbiAgICAgIG1hcmdpbjogMCAwIDE2cHggMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgIH1cbiAgICBcbiAgICAucG9vbC1zdGF0cyB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgICBcbiAgICAgIC5zdGF0LWl0ZW0ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHBhZGRpbmc6IDEycHggMDtcbiAgICAgICAgXG4gICAgICAgICYudG90YWwtcG9vbCB7XG4gICAgICAgICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcbiAgICAgICAgICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICAgIG1hcmdpbi10b3A6IDE2cHg7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDE2cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgICAgXG4gICAgICAgICAgLnZhbHVlIHtcbiAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAubGFiZWwge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC52YWx1ZSB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICAucHJpemUtYnJlYWtkb3duLWNvbmZpZyB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICBwYWRkaW5nOiAyNHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U5ZWNlZjtcbiAgICBcbiAgICAuY29uZmlnLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgIFxuICAgICAgaDMge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmNvbmZpZy1zdGF0dXMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgYmFja2dyb3VuZDogI2U4ZjVlODtcbiAgICAgICAgcGFkZGluZzogOHB4IDE2cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjM2U2YzM7XG4gICAgICAgIFxuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAuc3RhdHVzLXRleHQge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5lZGl0LWxvY2tlZC1idG4ge1xuICAgICAgICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgICAgICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgICAgICAgICAtLXBhZGRpbmctdG9wOiA0cHg7XG4gICAgICAgICAgLS1wYWRkaW5nLWJvdHRvbTogNHB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogOHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC5jb25maWctZGVzY3JpcHRpb24ge1xuICAgICAgbWFyZ2luOiAwIDAgMjRweCAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgXG4gICAgICAmLmxvY2tlZC1kZXNjcmlwdGlvbiB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmMGY5ZjA7XG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAucHJpemUtcG9zaXRpb25zIHtcbiAgICAgIC5wb3NpdGlvbi1jb25maWcge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlOWVjZWY7XG4gICAgICAgIFxuICAgICAgICAucG9zaXRpb24taGVhZGVyIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICAgICAgXG4gICAgICAgICAgLnBvc2l0aW9uLW51bWJlciB7XG4gICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5wb3NpdGlvbi1pbnB1dHMge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgZ2FwOiAxNnB4O1xuICAgICAgICAgIFxuICAgICAgICAgIC5wZXJjZW50YWdlLWlucHV0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjZTllY2VmO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIHdpZHRoOiAxMjBweDtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICY6Zm9jdXMtd2l0aGluIHtcbiAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlvbi1pbnB1dCB7XG4gICAgICAgICAgICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICAgIC0tcGFkZGluZy1zdGFydDogMTJweDtcbiAgICAgICAgICAgICAgLS1wYWRkaW5nLWVuZDogNHB4O1xuICAgICAgICAgICAgICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAgICAgICAgICAgICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC5wZXJjZW50YWdlLXN5bWJvbCB7XG4gICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC5wcml6ZS1hbW91bnQge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLmFtb3VudC1sYWJlbCB7XG4gICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAuYW1vdW50LXZhbHVlIHtcbiAgICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAuY29uZmlnLWFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBtYXJnaW46IDI0cHggMDtcbiAgICAgIHBhZGRpbmctdG9wOiAxNnB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlOWVjZWY7XG4gICAgICBcbiAgICAgIC5wZXJjZW50YWdlLXRvdGFsIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ2FwOiA4cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIFxuICAgICAgICAmLmludmFsaWQge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICY6bm90KC5pbnZhbGlkKSB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAucXVpY2stcHJlc2V0cyB7XG4gICAgICBtYXJnaW46IDI0cHggMDtcbiAgICAgIFxuICAgICAgaDQge1xuICAgICAgICBtYXJnaW46IDAgMCAxMnB4IDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnByZXNldC1idXR0b25zIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgXG4gICAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAgIC0tYm9yZGVyLXJhZGl1czogMjBweDtcbiAgICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gICAgICAgICAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgICAgICAgICAtLXBhZGRpbmctdG9wOiA4cHg7XG4gICAgICAgICAgLS1wYWRkaW5nLWJvdHRvbTogOHB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAuc2F2ZS1hY3Rpb25zIHtcbiAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAtLWJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICAgIC0tcGFkZGluZy10b3A6IDE2cHg7XG4gICAgICAgIC0tcGFkZGluZy1ib3R0b206IDE2cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICAgIFxuICAgICAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLnByaXplLXBvc2l0aW9ucy1sb2NrZWQge1xuICAgICAgLmxvY2tlZC1wb3NpdGlvbiB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2U5ZWNlZjtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgICAgIFxuICAgICAgICAucG9zaXRpb24taW5mbyB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBcbiAgICAgICAgICAucG9zaXRpb24tbGFiZWwge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC5wb3NpdGlvbi1kZXRhaWxzIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgZ2FwOiAxNnB4O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAucGVyY2VudGFnZSB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICBwYWRkaW5nOiA0cHggMTJweDtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAuYW1vdW50IHtcbiAgICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLnByaXplLXByZXZpZXcge1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTllY2VmO1xuICAgIFxuICAgIGgzIHtcbiAgICAgIG1hcmdpbjogMCAwIDIwcHggMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cbiAgICBcbiAgICAucHJldmlldy1jYXJkcyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgZ2FwOiAxMnB4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBcbiAgICAgIC5wcmV2aWV3LWNhcmQge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBtaW4td2lkdGg6IDEyMHB4O1xuICAgICAgICBtYXgtd2lkdGg6IDE1MHB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgICBwYWRkaW5nOiAyMHB4IDE2cHg7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2U5ZWNlZjtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgICAgICAgXG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJi5maXJzdC1wbGFjZSB7XG4gICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmZDcwMCwgI2ZmZWQ0ZSk7XG4gICAgICAgICAgY29sb3I6ICM4YjVhMDA7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjZmZkNzAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAmLnNlY29uZC1wbGFjZSB7XG4gICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2MwYzBjMCwgI2Q0ZDRkNCk7XG4gICAgICAgICAgY29sb3I6ICM0YTRhNGE7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjYzBjMGMwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAmLnRoaXJkLXBsYWNlIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjY2Q3ZjMyLCAjZTY5YzVhKTtcbiAgICAgICAgICBjb2xvcjogIzVkM2ExYTtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICNjZDdmMzI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICYub3RoZXItcGxhY2Uge1xuICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2Yzc1N2QsICM4NjhlOTYpO1xuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICM2Yzc1N2Q7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5wb3NpdGlvbi1sYWJlbCB7XG4gICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAucG9zaXRpb24tcGVyY2VudGFnZSB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAucG9zaXRpb24tcHJpemUge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_group-admin_pages_groups_groups_page_ts.js.map