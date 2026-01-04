"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_player_pages_groups_groups_page_ts"],{

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

/***/ 9292:
/*!**************************************************************!*\
  !*** ./src/app/platforms/player/pages/groups/groups.page.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupsPage: () => (/* binding */ GroupsPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_group_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/group.service */ 9699);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/toast.service */ 5423);

var _GroupsPage;










const _c0 = () => [0, 0.5, 0.8];
function GroupsPage_div_19_div_1_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 28)(3, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Entry Fee");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const group_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\u00A3", group_r2.entryFee, "");
  }
}
function GroupsPage_div_19_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_div_19_div_1_Template_div_click_0_listener() {
      const group_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.viewGroupDetails(group_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 19)(2, "div", 20)(3, "h3", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "ion-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 23)(9, "ion-badge", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 25)(12, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](13, "ion-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 28)(15, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Members");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](20, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 28)(22, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Your Rank");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](26, GroupsPage_div_19_div_1_div_26_Template, 7, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "div", 33)(28, "ion-button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_div_19_div_1_Template_ion_button_click_28_listener($event) {
      const group_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      ctx_r2.viewGroupMembers(group_r2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](29, "ion-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30, " Members ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "ion-button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_div_19_div_1_Template_ion_button_click_31_listener($event) {
      const group_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      ctx_r2.viewGroupDetails(group_r2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](32, "ion-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](33, " Leaderboard ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const group_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](group_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Admin: ", group_r2.adminName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("color", group_r2.type === "prize" ? "warning" : "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", group_r2.type === "prize" ? "Prize Pool" : "Casual", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](group_r2.memberCount);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("#", ctx_r2.getUserPosition(group_r2), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", group_r2.type === "prize");
  }
}
function GroupsPage_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, GroupsPage_div_19_div_1_Template, 34, 7, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2.myGroups);
  }
}
function GroupsPage_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 38)(1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "No Groups Yet");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Join a group to compete with friends and colleagues in prediction challenges");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "ion-button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_div_20_Template_ion_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.openJoinModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " Join Your First Group ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function GroupsPage_ion_fab_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-fab", 42)(1, "ion-fab-button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_ion_fab_21_Template_ion_fab_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.openJoinModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-icon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function GroupsPage_ng_template_23_ion_note_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-note", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Group code must be 6 characters (letters and numbers only) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function GroupsPage_ng_template_23_ion_icon_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-icon", 56);
  }
}
function GroupsPage_ng_template_23_ion_icon_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-icon", 57);
  }
}
function GroupsPage_ng_template_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-content", 44)(1, "div", 45)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Join a Group");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_ng_template_23_Template_ion_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.closeJoinModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "ion-icon", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 48)(7, "p", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, " Enter the 6-character group code provided by the group admin ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-input", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function GroupsPage_ng_template_23_Template_ion_input_ngModelChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r2.joinCode, $event) || (ctx_r2.joinCode = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ionInput", function GroupsPage_ng_template_23_Template_ion_input_ionInput_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.onJoinCodeInput($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, GroupsPage_ng_template_23_ion_note_10_Template, 2, 0, "ion-note", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "ion-button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_ng_template_23_Template_ion_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.joinGroup());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, GroupsPage_ng_template_23_ion_icon_12_Template, 1, 0, "ion-icon", 53)(13, GroupsPage_ng_template_23_ion_icon_13_Template, 1, 0, "ion-icon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.joinCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r2.isJoining);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r2.joinCode && !ctx_r2.validateGroupCode(ctx_r2.joinCode));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx_r2.validateGroupCode(ctx_r2.joinCode) || ctx_r2.isJoining);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r2.isJoining);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r2.isJoining);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r2.isJoining ? "Joining..." : "Join Group", " ");
  }
}
class GroupsPage {
  constructor(router, groupService, toastService) {
    this.router = router;
    this.groupService = groupService;
    this.toastService = toastService;
    this.isJoinModalOpen = false;
    this.joinCode = '';
    this.isJoining = false;
    this.myGroups = [];
    (0,ionicons__WEBPACK_IMPORTED_MODULE_5__.a)({
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.peopleOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trophyOutline,
      personAddOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.personAddOutline,
      addOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.addOutline,
      closeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.closeOutline,
      enterOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.enterOutline,
      footballOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.footballOutline,
      personOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.personOutline,
      eyeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.eyeOutline,
      cashOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.cashOutline,
      hourglassOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.hourglassOutline
    });
  }
  ngOnInit() {
    this.loadUserGroups();
    // Subscribe to real-time group updates
    this.groupsSubscription = this.groupService.groups$.subscribe(() => {
      this.loadUserGroups();
    });
  }
  ngOnDestroy() {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
  }
  loadUserGroups() {
    this.myGroups = this.groupService.getUserGroups();
  }
  openJoinModal() {
    this.isJoinModalOpen = true;
    this.joinCode = '';
  }
  closeJoinModal() {
    this.isJoinModalOpen = false;
    this.joinCode = '';
  }
  onJoinCodeInput(event) {
    const value = event.target.value.toUpperCase();
    this.joinCode = value;
  }
  validateGroupCode(code) {
    const regex = /^[A-Z0-9]{6}$/;
    return regex.test(code);
  }
  joinGroup() {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.validateGroupCode(_this.joinCode) || _this.isJoining) return;
      _this.isJoining = true;
      try {
        const group = _this.groupService.findGroupByCode(_this.joinCode);
        if (!group) {
          yield _this.toastService.showToast('Group not found with that code', 'error');
          return;
        }
        const updatedGroup = _this.groupService.joinGroup(_this.joinCode);
        if (updatedGroup) {
          yield _this.toastService.showToast(`Successfully joined ${updatedGroup.name}!`, 'success');
          _this.closeJoinModal();
        }
      } catch (error) {
        let message = 'Error joining group';
        if (error instanceof Error) {
          message = error.message;
        }
        yield _this.toastService.showToast(message, 'error');
      } finally {
        _this.isJoining = false;
      }
    })();
  }
  viewGroupDetails(group) {
    // Navigate to group details/leaderboard
    this.router.navigate(['/player/standings'], {
      queryParams: {
        groupId: group.id
      }
    });
  }
  viewGroupMembers(group) {
    // Show group members in a modal or navigate to members page
  }
  getPositionSuffix(position) {
    if (position > 3 && position < 21) return 'th';
    switch (position % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  getUserPosition(group) {
    // TODO: Implement actual leaderboard position calculation
    return Math.floor(Math.random() * group.memberCount) + 1;
  }
  navigateTo(path) {
    this.router.navigate([path]);
  }
}
_GroupsPage = GroupsPage;
_GroupsPage.ɵfac = function GroupsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GroupsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_group_service__WEBPACK_IMPORTED_MODULE_2__.GroupService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService));
};
_GroupsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _GroupsPage,
  selectors: [["app-groups"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
  decls: 24,
  vars: 8,
  consts: [[1, "logo-container", 3, "click"], ["name", "football-outline", 1, "football-icon"], [1, "logo-text"], [1, "logo-sotd"], [1, "logo-subtitle"], ["slot", "end"], [3, "click"], ["name", "person-outline"], [1, "ion-padding"], [1, "groups-card"], [1, "section-title"], ["name", "people-outline"], ["class", "groups-list", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["slot", "fixed", "vertical", "bottom", "horizontal", "end", 4, "ngIf"], [3, "isOpen", "breakpoints", "initialBreakpoint"], [1, "groups-list"], ["class", "group-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "group-item", 3, "click"], [1, "group-header"], [1, "group-info"], [1, "group-name"], [1, "group-admin"], [1, "group-type"], [3, "color"], [1, "group-stats"], [1, "stat-item"], ["name", "people-outline", "color", "primary"], [1, "stat-info"], [1, "stat-value"], [1, "stat-label"], ["name", "trophy-outline", "color", "warning"], ["class", "stat-item", 4, "ngIf"], [1, "group-actions"], ["fill", "clear", "size", "small", 3, "click"], ["name", "people-outline", "slot", "start"], ["name", "eye-outline", "slot", "start"], ["name", "cash-outline", "color", "success"], [1, "empty-state"], [1, "empty-icon"], ["expand", "block", 1, "join-first-group-btn", 3, "click"], ["name", "person-add-outline", "slot", "start"], ["slot", "fixed", "vertical", "bottom", "horizontal", "end"], ["name", "add-outline"], [1, "modal-content"], [1, "modal-header"], ["fill", "clear", 3, "click"], ["name", "close-outline", "slot", "icon-only"], [1, "join-form"], [1, "modal-description"], ["label", "Group Code", "labelPlacement", "stacked", "placeholder", "Enter 6-character code", "maxlength", "6", 1, "join-input", 3, "ngModelChange", "ionInput", "ngModel", "disabled"], ["color", "danger", 4, "ngIf"], ["expand", "block", 1, "join-button", 3, "click", "disabled"], ["name", "enter-outline", "slot", "start", 4, "ngIf"], ["name", "hourglass-outline", "slot", "start", 4, "ngIf"], ["color", "danger"], ["name", "enter-outline", "slot", "start"], ["name", "hourglass-outline", "slot", "start"]],
  template: function GroupsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_Template_div_click_2_listener() {
        return ctx.navigateTo("/player/dashboard");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "ion-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 2)(5, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "SOTD");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Predict 3");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-buttons", 5)(10, "ion-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GroupsPage_Template_ion_button_click_10_listener() {
        return ctx.navigateTo("/player/settings");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "ion-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "ion-content", 8)(13, "ion-card", 9)(14, "ion-card-header")(15, "ion-card-title", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "ion-icon", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "ion-card-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, GroupsPage_div_19_Template, 2, 1, "div", 12)(20, GroupsPage_div_20_Template, 10, 0, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, GroupsPage_ion_fab_21_Template, 3, 0, "ion-fab", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "ion-modal", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](23, GroupsPage_ng_template_23_Template, 15, 7, "ng-template");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Your Groups (", ctx.myGroups.length, ") ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.myGroups.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.myGroups.length === 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.myGroups.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("isOpen", ctx.isJoinModalOpen)("breakpoints", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](7, _c0))("initialBreakpoint", 0.5);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonFab, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonFabButton, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonModal, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonInput, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonNote, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel],
  styles: ["ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.1rem;\n}\nion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n\n.group-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 8px 0;\n}\n\n.group-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n}\n.group-info[_ngcontent-%COMP%]   .admin[_ngcontent-%COMP%] {\n  margin: 4px 0 0 0;\n  font-size: 0.85rem;\n  color: var(--ion-color-medium);\n}\n\n.group-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.group-stats[_ngcontent-%COMP%]   .members[_ngcontent-%COMP%], \n.group-stats[_ngcontent-%COMP%]   .position[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n}\n.group-stats[_ngcontent-%COMP%]   .members[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.group-stats[_ngcontent-%COMP%]   .position[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n  text-align: center;\n  color: var(--ion-color-medium);\n}\n.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 500;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0 0 0;\n  font-size: 0.9rem;\n}\n\n.modal-content[_ngcontent-%COMP%] {\n  padding: 20px;\n  padding-bottom: 32px;\n}\n\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n\n.join-form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n}\n.join-form[_ngcontent-%COMP%]   .join-input[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  --background: var(--ion-color-light);\n  --border-radius: 8px;\n  --padding-start: 16px;\n  --padding-end: 16px;\n}\n.join-form[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  margin-bottom: 16px;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --inner-padding-end: 16px;\n}\nion-item[_ngcontent-%COMP%]:not(:last-child) {\n  --border-width: 0 0 1px 0;\n  --border-color: var(--ion-color-light);\n}\n\nion-content[_ngcontent-%COMP%] {\n  --padding-bottom: 120px;\n}\n\nion-card[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n}\n\nion-fab[_ngcontent-%COMP%] {\n  bottom: 56px;\n  margin-bottom: env(safe-area-inset-bottom);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3Vwcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7QUFGSjtBQUlJO0VBQ0UsaUJBQUE7QUFGTjs7QUFPQTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0VBQ0EsY0FBQTtBQUpGOztBQVFFO0VBQ0UsU0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBTEo7QUFRRTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtBQU5KOztBQVVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQVBGO0FBU0U7O0VBRUUsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsOEJBQUE7QUFQSjtBQVNJOztFQUNFLGVBQUE7QUFOTjs7QUFXQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtBQVJGO0FBVUU7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7QUFSSjtBQVdFO0VBQ0UsU0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFUSjtBQVlFO0VBQ0UsaUJBQUE7RUFDQSxpQkFBQTtBQVZKOztBQWVBO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0FBWkY7O0FBZUE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBWkY7QUFjRTtFQUNFLFNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBWko7O0FBaUJFO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLDhCQUFBO0FBZEo7QUFpQkU7RUFDRSxtQkFBQTtFQUNBLG9DQUFBO0VBQ0Esb0JBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0FBZko7QUFrQkU7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7QUFoQko7O0FBb0JBO0VBQ0UscUJBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBakJGO0FBbUJFO0VBQ0UseUJBQUE7RUFDQSxzQ0FBQTtBQWpCSjs7QUFxQkE7RUFDRSx1QkFBQTtBQWxCRjs7QUFxQkE7RUFDRSxrQkFBQTtBQWxCRjs7QUFxQkE7RUFDRSxZQUFBO0VBQ0EsMENBQUE7QUFsQkYiLCJmaWxlIjoiZ3JvdXBzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEdyb3VwcyBTdHlsZXNcclxuXHJcbmlvbi1jYXJkLWhlYWRlciB7XHJcbiAgaW9uLWNhcmQtdGl0bGUge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDhweDtcclxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG5cclxuICAgIGlvbi1pY29uIHtcclxuICAgICAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uZ3JvdXAtY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDhweCAwO1xyXG59XHJcblxyXG4uZ3JvdXAtaW5mbyB7XHJcbiAgaDIge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgfVxyXG5cclxuICAuYWRtaW4ge1xyXG4gICAgbWFyZ2luOiA0cHggMCAwIDA7XHJcbiAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgfVxyXG59XHJcblxyXG4uZ3JvdXAtc3RhdHMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDE2cHg7XHJcblxyXG4gIC5tZW1iZXJzLFxyXG4gIC5wb3NpdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogNnB4O1xyXG4gICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcblxyXG4gICAgaW9uLWljb24ge1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uZW1wdHktc3RhdGUge1xyXG4gIHBhZGRpbmc6IDMycHggMTZweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG5cclxuICBpb24taWNvbiB7XHJcbiAgICBmb250LXNpemU6IDQ4cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gIH1cclxuXHJcbiAgaDMge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gIH1cclxuXHJcbiAgcCB7XHJcbiAgICBtYXJnaW46IDhweCAwIDAgMDtcclxuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gIH1cclxufVxyXG5cclxuLy8gTW9kYWwgU3R5bGVzXHJcbi5tb2RhbC1jb250ZW50IHtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiAzMnB4O1xyXG59XHJcblxyXG4ubW9kYWwtaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcblxyXG4gIGgyIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcbn1cclxuXHJcbi5qb2luLWZvcm0ge1xyXG4gIHAge1xyXG4gICAgbWFyZ2luOiAwIDAgMTZweCAwO1xyXG4gICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgfVxyXG5cclxuICAuam9pbi1pbnB1dCB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gICAgLS1ib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XHJcbiAgICAtLXBhZGRpbmctZW5kOiAxNnB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLWJ1dHRvbiB7XHJcbiAgICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gIH1cclxufVxyXG5cclxuaW9uLWl0ZW0ge1xyXG4gIC0tcGFkZGluZy1zdGFydDogMTZweDtcclxuICAtLXBhZGRpbmctZW5kOiAxNnB4O1xyXG4gIC0taW5uZXItcGFkZGluZy1lbmQ6IDE2cHg7XHJcblxyXG4gICY6bm90KDpsYXN0LWNoaWxkKSB7XHJcbiAgICAtLWJvcmRlci13aWR0aDogMCAwIDFweCAwO1xyXG4gICAgLS1ib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgfVxyXG59XHJcblxyXG5pb24tY29udGVudCB7XHJcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTIwcHg7XHJcbn1cclxuXHJcbmlvbi1jYXJkIHtcclxuICBtYXJnaW46IDAgMCAxNnB4IDA7XHJcbn1cclxuXHJcbmlvbi1mYWIge1xyXG4gIGJvdHRvbTogNTZweDtcclxuICBtYXJnaW4tYm90dG9tOiBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSk7XHJcbn1cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3BsYXllci9wYWdlcy9ncm91cHMvZ3JvdXBzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtBQUZKO0FBSUk7RUFDRSxpQkFBQTtBQUZOOztBQU9BO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0FBSkY7O0FBUUU7RUFDRSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFMSjtBQVFFO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDhCQUFBO0FBTko7O0FBVUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBUEY7QUFTRTs7RUFFRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSw4QkFBQTtBQVBKO0FBU0k7O0VBQ0UsZUFBQTtBQU5OOztBQVdBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLDhCQUFBO0FBUkY7QUFVRTtFQUNFLGVBQUE7RUFDQSxtQkFBQTtBQVJKO0FBV0U7RUFDRSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQVRKO0FBWUU7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0FBVko7O0FBZUE7RUFDRSxhQUFBO0VBQ0Esb0JBQUE7QUFaRjs7QUFlQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFaRjtBQWNFO0VBQ0UsU0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFaSjs7QUFpQkU7RUFDRSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsOEJBQUE7QUFkSjtBQWlCRTtFQUNFLG1CQUFBO0VBQ0Esb0NBQUE7RUFDQSxvQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7QUFmSjtBQWtCRTtFQUNFLGVBQUE7RUFDQSxtQkFBQTtBQWhCSjs7QUFvQkE7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7QUFqQkY7QUFtQkU7RUFDRSx5QkFBQTtFQUNBLHNDQUFBO0FBakJKOztBQXFCQTtFQUNFLHVCQUFBO0FBbEJGOztBQXFCQTtFQUNFLGtCQUFBO0FBbEJGOztBQXFCQTtFQUNFLFlBQUE7RUFDQSwwQ0FBQTtBQWxCRjtBQUNBLDRuSkFBNG5KIiwic291cmNlc0NvbnRlbnQiOlsiLy8gR3JvdXBzIFN0eWxlc1xyXG5cclxuaW9uLWNhcmQtaGVhZGVyIHtcclxuICBpb24tY2FyZC10aXRsZSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogOHB4O1xyXG4gICAgZm9udC1zaXplOiAxLjFyZW07XHJcblxyXG4gICAgaW9uLWljb24ge1xyXG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5ncm91cC1jb250YWluZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDEycHg7XHJcbiAgcGFkZGluZzogOHB4IDA7XHJcbn1cclxuXHJcbi5ncm91cC1pbmZvIHtcclxuICBoMiB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICB9XHJcblxyXG4gIC5hZG1pbiB7XHJcbiAgICBtYXJnaW46IDRweCAwIDAgMDtcclxuICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICB9XHJcbn1cclxuXHJcbi5ncm91cC1zdGF0cyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMTZweDtcclxuXHJcbiAgLm1lbWJlcnMsXHJcbiAgLnBvc2l0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiA2cHg7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuXHJcbiAgICBpb24taWNvbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5lbXB0eS1zdGF0ZSB7XHJcbiAgcGFkZGluZzogMzJweCAxNnB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcblxyXG4gIGlvbi1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogNDhweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgfVxyXG5cclxuICBoMyB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgfVxyXG5cclxuICBwIHtcclxuICAgIG1hcmdpbjogOHB4IDAgMCAwO1xyXG4gICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgfVxyXG59XHJcblxyXG4vLyBNb2RhbCBTdHlsZXNcclxuLm1vZGFsLWNvbnRlbnQge1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDMycHg7XHJcbn1cclxuXHJcbi5tb2RhbC1oZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuXHJcbiAgaDIge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gIH1cclxufVxyXG5cclxuLmpvaW4tZm9ybSB7XHJcbiAgcCB7XHJcbiAgICBtYXJnaW46IDAgMCAxNnB4IDA7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICB9XHJcblxyXG4gIC5qb2luLWlucHV0IHtcclxuICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XHJcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgICAtLWJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMTZweDtcclxuICAgIC0tcGFkZGluZy1lbmQ6IDE2cHg7XHJcbiAgfVxyXG5cclxuICBpb24tYnV0dG9uIHtcclxuICAgIG1hcmdpbi10b3A6IDhweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgfVxyXG59XHJcblxyXG5pb24taXRlbSB7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xyXG4gIC0tcGFkZGluZy1lbmQ6IDE2cHg7XHJcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMTZweDtcclxuXHJcbiAgJjpub3QoOmxhc3QtY2hpbGQpIHtcclxuICAgIC0tYm9yZGVyLXdpZHRoOiAwIDAgMXB4IDA7XHJcbiAgICAtLWJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICB9XHJcbn1cclxuXHJcbmlvbi1jb250ZW50IHtcclxuICAtLXBhZGRpbmctYm90dG9tOiAxMjBweDtcclxufVxyXG5cclxuaW9uLWNhcmQge1xyXG4gIG1hcmdpbjogMCAwIDE2cHggMDtcclxufVxyXG5cclxuaW9uLWZhYiB7XHJcbiAgYm90dG9tOiA1NnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_player_pages_groups_groups_page_ts.js.map