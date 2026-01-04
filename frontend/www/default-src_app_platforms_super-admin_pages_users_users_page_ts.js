"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_platforms_super-admin_pages_users_users_page_ts"],{

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

/***/ 7106:
/*!*****************************************************************!*\
  !*** ./src/app/platforms/super-admin/pages/users/users.page.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsersPage: () => (/* binding */ UsersPage)
/* harmony export */ });
/* harmony import */ var _home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/toast.service */ 5423);

var _UsersPage;








function UsersPage_ion_header_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Platform User Management");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-toolbar")(5, "ion-segment", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function UsersPage_ion_header_0_Template_ion_segment_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx_r1.activeTab, $event) || (ctx_r1.activeTab = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-segment-button", 5)(7, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Group Admins");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "ion-segment-button", 6)(10, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "All Users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.activeTab);
  }
}
function UsersPage_ion_content_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainer"](0);
  }
}
function UsersPage_ion_content_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-content")(1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, UsersPage_ion_content_2_ng_container_2_Template, 1, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const mainContent_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngTemplateOutlet", mainContent_r3);
  }
}
function UsersPage_div_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainer"](0);
  }
}
function UsersPage_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, UsersPage_div_3_ng_container_1_Template, 1, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const mainContent_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngTemplateOutlet", mainContent_r3);
  }
}
function UsersPage_ng_template_4_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11)(1, "ion-segment", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function UsersPage_ng_template_4_div_0_Template_ion_segment_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx_r1.activeTab, $event) || (ctx_r1.activeTab = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-segment-button", 5)(3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Group Admins");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ion-segment-button", 6)(6, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "All Users");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.activeTab);
  }
}
function UsersPage_ng_template_4_div_2_ion_card_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-card", 15)(1, "ion-card-header")(2, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-card-content")(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Health Score:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "p")(12, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Groups Managed:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "p")(16, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Status:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "ion-badge", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const admin_r5 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](admin_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](admin_r5.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (admin_r5.health == null ? null : admin_r5.health.score) || "N/A", "/100");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (admin_r5.performance == null ? null : admin_r5.performance.groupsManaged) || 0, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx_r1.getAdminHealthStatusColor((admin_r5.health == null ? null : admin_r5.health.status) || "unknown"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (admin_r5.health == null ? null : admin_r5.health.status) || "Unknown", " ");
  }
}
function UsersPage_ng_template_4_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 12)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "\uD83C\uDFAF Group Admins Management");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p")(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Total Group Admins:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "p")(9, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Average Health Score:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "p")(13, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Admins Needing Attention:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, UsersPage_ng_template_4_div_2_ion_card_17_Template, 20, 6, "ion-card", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](18, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getGroupAdmins().length, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getAverageAdminHealth(), "/100");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getAdminsNeedingAttention().length, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind3"](18, 4, ctx_r1.getGroupAdmins(), 0, 6));
  }
}
function UsersPage_ng_template_4_div_3_ion_card_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-card", 20)(1, "ion-card-header")(2, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-card-content")(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Health Score:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "p")(12, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Days on Platform:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "p")(16, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Status:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "ion-badge", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const user_r6 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](user_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](user_r6.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (user_r6.userHealth == null ? null : user_r6.userHealth.score) || "N/A", "/100");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (user_r6.userLifecycle == null ? null : user_r6.userLifecycle.daysOnPlatform) || 0, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", ctx_r1.getUserHealthStatusColor((user_r6.userHealth == null ? null : user_r6.userHealth.status) || "unknown"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (user_r6.userHealth == null ? null : user_r6.userHealth.status) || "Unknown", " ");
  }
}
function UsersPage_ng_template_4_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 17)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "\uD83D\uDC65 Platform Users Management");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p")(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Total Platform Users:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "p")(9, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Average User Health:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "p")(13, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Users Needing Attention:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, UsersPage_ng_template_4_div_3_ion_card_17_Template, 20, 6, "ion-card", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](18, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getPlatformUsers().length, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getAverageUserHealth(), "/100");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.getUsersNeedingAttention().length, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind3"](18, 4, ctx_r1.getPlatformUsers(), 0, 6));
  }
}
function UsersPage_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, UsersPage_ng_template_4_div_0_Template, 8, 1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, UsersPage_ng_template_4_div_2_Template, 19, 8, "div", 1)(3, UsersPage_ng_template_4_div_3_Template, 19, 8, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.embedded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.activeTab === "admins");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.activeTab === "all");
  }
}
class UsersPage {
  constructor(toastService) {
    this.toastService = toastService;
    this.embedded = false; // When true, hides the header for embedded use
    this.activeTab = 'admins';
    this.searchTerm = '';
    this.users = [];
    this.filteredUsers = [];
    this.selectedAdmin = null;
    (0,ionicons__WEBPACK_IMPORTED_MODULE_4__.a)({
      banOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.banOutline,
      checkmarkCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.checkmarkCircleOutline,
      starOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.starOutline,
      trendingUpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trendingUpOutline,
      trendingDownOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trendingDownOutline,
      peopleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.peopleOutline,
      chatboxOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.chatboxOutline,
      schoolOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.schoolOutline,
      medicalOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.medicalOutline,
      sparklesOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.sparklesOutline,
      warningOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.warningOutline,
      alertCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.alertCircleOutline,
      pulseOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.pulseOutline,
      timeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.timeOutline,
      statsChartOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.statsChartOutline,
      eyeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.eyeOutline,
      flashOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.flashOutline,
      // New icons for user management
      shieldOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.shieldOutline,
      calendarOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.calendarOutline,
      trophyOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.trophyOutline,
      flagOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.flagOutline,
      rocketOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.rocketOutline,
      mailOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.mailOutline,
      megaphoneOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.megaphoneOutline,
      removeOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.removeOutline,
      helpOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_1__.helpOutline
    });
  }
  ngOnInit() {
    this.loadMockUsers();
  }
  loadMockUsers() {
    this.users = [{
      id: '1',
      name: 'John Super',
      email: 'super@example.com',
      role: 'super-admin',
      status: 'active',
      joinedAt: new Date('2024-01-01')
    }, {
      id: '2',
      name: 'Sarah Champion',
      email: 'sarah.champion@example.com',
      role: 'group-admin',
      status: 'active',
      joinedAt: new Date('2024-01-15'),
      performance: {
        effectivenessScore: 94,
        groupsManaged: 3,
        averageGroupHealth: 92,
        memberSatisfactionRate: 96,
        issueResolutionTime: 2.5,
        engagementLevel: 'very-high',
        leadershipStyle: 'collaborative'
      },
      health: {
        score: 95,
        status: 'excellent',
        burnoutRisk: 'low',
        workloadLevel: 'moderate',
        lastActiveDate: new Date('2024-03-20'),
        alerts: []
      },
      lifecycle: {
        daysAsAdmin: 65,
        onboardingProgress: 100,
        skillLevel: 'expert',
        trainingCompletionRate: 95,
        careerPhase: 'peak',
        retentionRisk: 'low'
      },
      support: {
        coachingSessionsCompleted: 8,
        supportTicketsResolved: 15,
        mentoringParticipation: true,
        resourcesAccessed: ['Leadership Training', 'Conflict Resolution', 'Group Dynamics'],
        improvementPlanActive: false
      }
    }, {
      id: '3',
      name: 'Mike Steady',
      email: 'mike.steady@example.com',
      role: 'group-admin',
      status: 'active',
      joinedAt: new Date('2024-02-01'),
      performance: {
        effectivenessScore: 78,
        groupsManaged: 2,
        averageGroupHealth: 75,
        memberSatisfactionRate: 82,
        issueResolutionTime: 6,
        engagementLevel: 'high',
        leadershipStyle: 'supportive'
      },
      health: {
        score: 82,
        status: 'good',
        burnoutRisk: 'low',
        workloadLevel: 'moderate',
        lastActiveDate: new Date('2024-03-19'),
        alerts: []
      },
      lifecycle: {
        daysAsAdmin: 48,
        onboardingProgress: 90,
        skillLevel: 'proficient',
        trainingCompletionRate: 75,
        careerPhase: 'growth',
        retentionRisk: 'low'
      },
      support: {
        coachingSessionsCompleted: 4,
        supportTicketsResolved: 8,
        mentoringParticipation: false,
        resourcesAccessed: ['Basic Training', 'Group Management'],
        improvementPlanActive: false
      }
    }, {
      id: '4',
      name: 'Lisa Struggling',
      email: 'lisa.struggling@example.com',
      role: 'group-admin',
      status: 'active',
      joinedAt: new Date('2024-02-15'),
      performance: {
        effectivenessScore: 62,
        groupsManaged: 2,
        averageGroupHealth: 58,
        memberSatisfactionRate: 64,
        issueResolutionTime: 12,
        engagementLevel: 'medium',
        leadershipStyle: 'directive'
      },
      health: {
        score: 68,
        status: 'fair',
        burnoutRisk: 'medium',
        workloadLevel: 'heavy',
        lastActiveDate: new Date('2024-03-18'),
        alerts: ['Declining group performance detected']
      },
      lifecycle: {
        daysAsAdmin: 35,
        onboardingProgress: 70,
        skillLevel: 'developing',
        trainingCompletionRate: 60,
        careerPhase: 'onboarding',
        retentionRisk: 'medium'
      },
      support: {
        coachingSessionsCompleted: 2,
        supportTicketsResolved: 3,
        mentoringParticipation: false,
        resourcesAccessed: ['Basic Training'],
        improvementPlanActive: true
      }
    }, {
      id: '5',
      name: 'Tom Overwhelmed',
      email: 'tom.overwhelmed@example.com',
      role: 'group-admin',
      status: 'active',
      joinedAt: new Date('2024-01-20'),
      performance: {
        effectivenessScore: 45,
        groupsManaged: 4,
        averageGroupHealth: 42,
        memberSatisfactionRate: 48,
        issueResolutionTime: 24,
        engagementLevel: 'low',
        leadershipStyle: 'delegative'
      },
      health: {
        score: 38,
        status: 'poor',
        burnoutRisk: 'high',
        workloadLevel: 'excessive',
        lastActiveDate: new Date('2024-03-16'),
        alerts: ['Multiple group complaints', 'Extended absence periods', 'Low response rate']
      },
      lifecycle: {
        daysAsAdmin: 60,
        onboardingProgress: 85,
        skillLevel: 'developing',
        trainingCompletionRate: 40,
        careerPhase: 'plateau',
        retentionRisk: 'high'
      },
      support: {
        coachingSessionsCompleted: 1,
        supportTicketsResolved: 1,
        mentoringParticipation: false,
        resourcesAccessed: ['Basic Training'],
        improvementPlanActive: true
      }
    }, {
      id: '6',
      name: 'Emma Disengaged',
      email: 'emma.disengaged@example.com',
      role: 'group-admin',
      status: 'active',
      joinedAt: new Date('2024-01-05'),
      performance: {
        effectivenessScore: 25,
        groupsManaged: 2,
        averageGroupHealth: 28,
        memberSatisfactionRate: 22,
        issueResolutionTime: 48,
        engagementLevel: 'very-low',
        leadershipStyle: 'delegative'
      },
      health: {
        score: 25,
        status: 'critical',
        burnoutRisk: 'critical',
        workloadLevel: 'light',
        lastActiveDate: new Date('2024-03-12'),
        alerts: ['Admin abandonment risk', 'Groups requesting new admin', 'No activity for 8 days']
      },
      lifecycle: {
        daysAsAdmin: 75,
        onboardingProgress: 60,
        skillLevel: 'novice',
        trainingCompletionRate: 20,
        careerPhase: 'decline',
        retentionRisk: 'critical'
      },
      support: {
        coachingSessionsCompleted: 0,
        supportTicketsResolved: 0,
        mentoringParticipation: false,
        resourcesAccessed: [],
        improvementPlanActive: true
      }
    }, {
      id: '7',
      name: 'Alex PowerUser',
      email: 'alex.poweruser@example.com',
      role: 'player',
      status: 'active',
      joinedAt: new Date('2023-08-15'),
      engagement: {
        dailyActiveRate: 95,
        weeklyActiveRate: 100,
        sessionDuration: 25,
        predictionsPerWeek: 18,
        groupParticipation: 4,
        featureUsage: {
          predictions: 98,
          leaderboards: 90,
          groupInteraction: 85,
          jokerUsage: 95
        },
        lastActiveDate: new Date('2024-03-20')
      },
      userLifecycle: {
        stage: 'established',
        daysOnPlatform: 218,
        onboardingProgress: 100,
        engagementTrend: 'stable',
        retentionRisk: 'low',
        lifetimeValue: 950,
        churnProbability: 5
      },
      userHealth: {
        score: 95,
        status: 'excellent',
        satisfactionRate: 96,
        supportTickets: 1,
        flaggedBehavior: [],
        platformExperience: 'seamless'
      },
      behavior: {
        predictionAccuracy: 78,
        competitiveness: 'very-high',
        socialEngagement: 'high',
        platformUsage: 'mixed',
        peakActivityTime: 'evening',
        preferredFeatures: ['Predictions', 'Leaderboards', 'Group Chat']
      }
    }, {
      id: '8',
      name: 'Jordan NewUser',
      email: 'jordan.new@example.com',
      role: 'player',
      status: 'active',
      joinedAt: new Date('2024-03-01'),
      engagement: {
        dailyActiveRate: 70,
        weeklyActiveRate: 85,
        sessionDuration: 18,
        predictionsPerWeek: 12,
        groupParticipation: 2,
        featureUsage: {
          predictions: 75,
          leaderboards: 45,
          groupInteraction: 30,
          jokerUsage: 60
        },
        lastActiveDate: new Date('2024-03-19')
      },
      userLifecycle: {
        stage: 'growing',
        daysOnPlatform: 19,
        onboardingProgress: 85,
        engagementTrend: 'increasing',
        retentionRisk: 'low',
        lifetimeValue: 420,
        churnProbability: 15
      },
      userHealth: {
        score: 82,
        status: 'good',
        satisfactionRate: 85,
        supportTickets: 0,
        flaggedBehavior: [],
        platformExperience: 'good'
      },
      behavior: {
        predictionAccuracy: 65,
        competitiveness: 'high',
        socialEngagement: 'medium',
        platformUsage: 'mobile',
        peakActivityTime: 'afternoon',
        preferredFeatures: ['Predictions', 'Mobile App']
      }
    }, {
      id: '9',
      name: 'Sam AtRisk',
      email: 'sam.atrisk@example.com',
      role: 'player',
      status: 'active',
      joinedAt: new Date('2024-01-10'),
      engagement: {
        dailyActiveRate: 35,
        weeklyActiveRate: 60,
        sessionDuration: 8,
        predictionsPerWeek: 5,
        groupParticipation: 1,
        featureUsage: {
          predictions: 40,
          leaderboards: 20,
          groupInteraction: 15,
          jokerUsage: 25
        },
        lastActiveDate: new Date('2024-03-17')
      },
      userLifecycle: {
        stage: 'at-risk',
        daysOnPlatform: 70,
        onboardingProgress: 65,
        engagementTrend: 'declining',
        retentionRisk: 'high',
        lifetimeValue: 180,
        churnProbability: 75
      },
      userHealth: {
        score: 45,
        status: 'poor',
        satisfactionRate: 55,
        supportTickets: 2,
        flaggedBehavior: ['Low engagement', 'Missed predictions'],
        platformExperience: 'adequate'
      },
      behavior: {
        predictionAccuracy: 52,
        competitiveness: 'low',
        socialEngagement: 'low',
        platformUsage: 'web',
        peakActivityTime: 'morning',
        preferredFeatures: ['Basic Predictions']
      }
    }, {
      id: '10',
      name: 'Casey Churning',
      email: 'casey.churning@example.com',
      role: 'player',
      status: 'active',
      joinedAt: new Date('2023-12-01'),
      engagement: {
        dailyActiveRate: 10,
        weeklyActiveRate: 25,
        sessionDuration: 3,
        predictionsPerWeek: 1,
        groupParticipation: 0,
        featureUsage: {
          predictions: 15,
          leaderboards: 5,
          groupInteraction: 0,
          jokerUsage: 10
        },
        lastActiveDate: new Date('2024-03-14')
      },
      userLifecycle: {
        stage: 'churning',
        daysOnPlatform: 110,
        onboardingProgress: 45,
        engagementTrend: 'critical',
        retentionRisk: 'critical',
        lifetimeValue: 85,
        churnProbability: 95
      },
      userHealth: {
        score: 20,
        status: 'critical',
        satisfactionRate: 30,
        supportTickets: 3,
        flaggedBehavior: ['Minimal engagement', 'Long absence periods', 'Support complaints'],
        platformExperience: 'poor'
      },
      behavior: {
        predictionAccuracy: 45,
        competitiveness: 'very-low',
        socialEngagement: 'very-low',
        platformUsage: 'web',
        peakActivityTime: 'night',
        preferredFeatures: []
      }
    }, {
      id: '11',
      name: 'Riley Casual',
      email: 'riley.casual@example.com',
      role: 'player',
      status: 'active',
      joinedAt: new Date('2024-02-14'),
      engagement: {
        dailyActiveRate: 55,
        weeklyActiveRate: 75,
        sessionDuration: 12,
        predictionsPerWeek: 8,
        groupParticipation: 1,
        featureUsage: {
          predictions: 60,
          leaderboards: 35,
          groupInteraction: 25,
          jokerUsage: 40
        },
        lastActiveDate: new Date('2024-03-18')
      },
      userLifecycle: {
        stage: 'established',
        daysOnPlatform: 35,
        onboardingProgress: 90,
        engagementTrend: 'stable',
        retentionRisk: 'medium',
        lifetimeValue: 320,
        churnProbability: 35
      },
      userHealth: {
        score: 72,
        status: 'good',
        satisfactionRate: 78,
        supportTickets: 0,
        flaggedBehavior: [],
        platformExperience: 'good'
      },
      behavior: {
        predictionAccuracy: 68,
        competitiveness: 'medium',
        socialEngagement: 'medium',
        platformUsage: 'mobile',
        peakActivityTime: 'evening',
        preferredFeatures: ['Predictions', 'Mobile Notifications']
      }
    }, {
      id: '12',
      name: 'Player Inactive',
      email: 'player.inactive@example.com',
      role: 'player',
      status: 'inactive',
      joinedAt: new Date('2024-02-01'),
      userLifecycle: {
        stage: 'dormant',
        daysOnPlatform: 48,
        onboardingProgress: 25,
        engagementTrend: 'critical',
        retentionRisk: 'critical',
        lifetimeValue: 15,
        churnProbability: 100
      },
      userHealth: {
        score: 5,
        status: 'critical',
        satisfactionRate: 10,
        supportTickets: 1,
        flaggedBehavior: ['Account abandoned', 'Never completed onboarding'],
        platformExperience: 'problematic'
      }
    }];
    this.filterUsers();
  }
  filterUsers() {
    let filtered = [...this.users];
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term) || user.role.toLowerCase().includes(term));
    }
    this.filteredUsers = filtered;
  }
  toggleUserStatus(user) {
    var _this = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (user.role === 'super-admin') {
        yield _this.toastService.showToast('Cannot modify super admin status', 'error');
        return;
      }
      try {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        yield _this.toastService.showToast(`User ${user.status === 'active' ? 'activated' : 'deactivated'} successfully`, 'success');
      } catch (error) {
        yield _this.toastService.showToast('Error updating user status', 'error');
      }
    })();
  }
  // Admin Health Helper Methods
  getAdminHealthStatusColor(status) {
    switch (status) {
      case 'excellent':
        return 'success';
      case 'good':
        return 'primary';
      case 'fair':
        return 'warning';
      case 'poor':
        return 'danger';
      case 'critical':
        return 'danger';
      default:
        return 'medium';
    }
  }
  getBurnoutRiskColor(risk) {
    switch (risk) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      case 'critical':
        return 'danger';
      default:
        return 'medium';
    }
  }
  getEngagementLevelColor(level) {
    switch (level) {
      case 'very-high':
        return 'success';
      case 'high':
        return 'primary';
      case 'medium':
        return 'warning';
      case 'low':
        return 'danger';
      case 'very-low':
        return 'danger';
      default:
        return 'medium';
    }
  }
  getRetentionRiskColor(risk) {
    switch (risk) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      case 'critical':
        return 'danger';
      default:
        return 'medium';
    }
  }
  getSkillLevelColor(level) {
    switch (level) {
      case 'expert':
        return 'success';
      case 'proficient':
        return 'primary';
      case 'developing':
        return 'warning';
      case 'novice':
        return 'tertiary';
      default:
        return 'medium';
    }
  }
  getHealthIcon(status) {
    switch (status) {
      case 'excellent':
        return 'checkmark-circle-outline';
      case 'good':
        return 'checkmark-circle-outline';
      case 'fair':
        return 'warning-outline';
      case 'poor':
        return 'alert-circle-outline';
      case 'critical':
        return 'medical-outline';
      default:
        return 'pulse-outline';
    }
  }
  // Admin Analytics Methods
  getGroupAdmins() {
    const admins = this.users.filter(user => user.role === 'group-admin');
    return admins;
  }
  getAdminsNeedingAttention() {
    return this.getGroupAdmins().filter(admin => {
      var _admin$health, _admin$health2, _admin$health3, _admin$health4, _admin$health5;
      return ((_admin$health = admin.health) === null || _admin$health === void 0 ? void 0 : _admin$health.status) === 'poor' || ((_admin$health2 = admin.health) === null || _admin$health2 === void 0 ? void 0 : _admin$health2.status) === 'critical' || ((_admin$health3 = admin.health) === null || _admin$health3 === void 0 ? void 0 : _admin$health3.burnoutRisk) === 'high' || ((_admin$health4 = admin.health) === null || _admin$health4 === void 0 ? void 0 : _admin$health4.burnoutRisk) === 'critical' || ((_admin$health5 = admin.health) === null || _admin$health5 === void 0 ? void 0 : _admin$health5.alerts) && admin.health.alerts.length > 0;
    });
  }
  getHighPerformingAdmins() {
    return this.getGroupAdmins().filter(admin => {
      var _admin$health6, _admin$performance;
      return ((_admin$health6 = admin.health) === null || _admin$health6 === void 0 ? void 0 : _admin$health6.status) === 'excellent' && ((_admin$performance = admin.performance) === null || _admin$performance === void 0 ? void 0 : _admin$performance.effectivenessScore) && admin.performance.effectivenessScore > 85;
    });
  }
  getAverageAdminHealth() {
    const admins = this.getGroupAdmins();
    if (admins.length === 0) return 0;
    const total = admins.reduce((sum, admin) => {
      var _admin$health7;
      return sum + (((_admin$health7 = admin.health) === null || _admin$health7 === void 0 ? void 0 : _admin$health7.score) || 0);
    }, 0);
    return Math.round(total / admins.length);
  }
  getAverageEffectivenessScore() {
    const admins = this.getGroupAdmins();
    if (admins.length === 0) return 0;
    const total = admins.reduce((sum, admin) => {
      var _admin$performance2;
      return sum + (((_admin$performance2 = admin.performance) === null || _admin$performance2 === void 0 ? void 0 : _admin$performance2.effectivenessScore) || 0);
    }, 0);
    return Math.round(total / admins.length);
  }
  getTotalGroupsManaged() {
    return this.getGroupAdmins().reduce((sum, admin) => {
      var _admin$performance3;
      return sum + (((_admin$performance3 = admin.performance) === null || _admin$performance3 === void 0 ? void 0 : _admin$performance3.groupsManaged) || 0);
    }, 0);
  }
  getAdminsInTraining() {
    return this.getGroupAdmins().filter(admin => {
      var _admin$lifecycle, _admin$support;
      return ((_admin$lifecycle = admin.lifecycle) === null || _admin$lifecycle === void 0 ? void 0 : _admin$lifecycle.careerPhase) === 'onboarding' || ((_admin$support = admin.support) === null || _admin$support === void 0 ? void 0 : _admin$support.improvementPlanActive);
    }).length;
  }
  // Steward Intervention Tools
  sendAdminAlert(admin, alertType) {
    var _this2 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this2.toastService.showToast(`Alert sent to ${admin.name}: ${alertType}`, 'success');
      } catch (error) {
        yield _this2.toastService.showToast('Error sending alert', 'error');
      }
    })();
  }
  scheduleCoaching(admin) {
    var _this3 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this3.toastService.showToast(`Coaching session scheduled for ${admin.name}`, 'success');
      } catch (error) {
        yield _this3.toastService.showToast('Error scheduling coaching', 'error');
      }
    })();
  }
  startImprovementPlan(admin) {
    var _this4 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        if (admin.support) {
          admin.support.improvementPlanActive = true;
        }
        yield _this4.toastService.showToast(`Improvement plan activated for ${admin.name}`, 'success');
      } catch (error) {
        yield _this4.toastService.showToast('Error starting improvement plan', 'error');
      }
    })();
  }
  assignMentor(admin) {
    var _this5 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        if (admin.support) {
          admin.support.mentoringParticipation = true;
        }
        yield _this5.toastService.showToast(`Mentor assigned to ${admin.name}`, 'success');
      } catch (error) {
        yield _this5.toastService.showToast('Error assigning mentor', 'error');
      }
    })();
  }
  recognizeAdmin(admin) {
    var _this6 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this6.toastService.showToast(`Recognition award sent to ${admin.name}`, 'success');
      } catch (error) {
        yield _this6.toastService.showToast('Error sending recognition', 'error');
      }
    })();
  }
  // Utility Methods
  viewAdminDetails(admin) {
    this.selectedAdmin = admin;
  }
  formatDaysAsAdmin(days) {
    if (days < 7) return `${days} days`;
    const weeks = Math.floor(days / 7);
    if (weeks < 8) return `${weeks} weeks`;
    const months = Math.floor(days / 30);
    return `${months} months`;
  }
  formatResolutionTime(hours) {
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  }
  // Platform User Analytics Methods
  getPlatformUsers() {
    const users = this.users.filter(user => user.role === 'player');
    return users;
  }
  getUsersNeedingAttention() {
    return this.getPlatformUsers().filter(user => {
      var _user$userHealth, _user$userHealth2, _user$userLifecycle, _user$userLifecycle2, _user$userLifecycle3, _user$userLifecycle4;
      return ((_user$userHealth = user.userHealth) === null || _user$userHealth === void 0 ? void 0 : _user$userHealth.status) === 'poor' || ((_user$userHealth2 = user.userHealth) === null || _user$userHealth2 === void 0 ? void 0 : _user$userHealth2.status) === 'critical' || ((_user$userLifecycle = user.userLifecycle) === null || _user$userLifecycle === void 0 ? void 0 : _user$userLifecycle.retentionRisk) === 'high' || ((_user$userLifecycle2 = user.userLifecycle) === null || _user$userLifecycle2 === void 0 ? void 0 : _user$userLifecycle2.retentionRisk) === 'critical' || ((_user$userLifecycle3 = user.userLifecycle) === null || _user$userLifecycle3 === void 0 ? void 0 : _user$userLifecycle3.stage) === 'churning' || ((_user$userLifecycle4 = user.userLifecycle) === null || _user$userLifecycle4 === void 0 ? void 0 : _user$userLifecycle4.stage) === 'at-risk';
    });
  }
  getHighValueUsers() {
    return this.getPlatformUsers().filter(user => {
      var _user$userHealth3, _user$userLifecycle5;
      return ((_user$userHealth3 = user.userHealth) === null || _user$userHealth3 === void 0 ? void 0 : _user$userHealth3.status) === 'excellent' && ((_user$userLifecycle5 = user.userLifecycle) === null || _user$userLifecycle5 === void 0 ? void 0 : _user$userLifecycle5.lifetimeValue) && user.userLifecycle.lifetimeValue > 800;
    });
  }
  getNewUsers() {
    return this.getPlatformUsers().filter(user => {
      var _user$userLifecycle6, _user$userLifecycle7;
      return ((_user$userLifecycle6 = user.userLifecycle) === null || _user$userLifecycle6 === void 0 ? void 0 : _user$userLifecycle6.stage) === 'new' || ((_user$userLifecycle7 = user.userLifecycle) === null || _user$userLifecycle7 === void 0 ? void 0 : _user$userLifecycle7.daysOnPlatform) && user.userLifecycle.daysOnPlatform < 30;
    });
  }
  getActiveUsers() {
    return this.getPlatformUsers().filter(user => {
      var _user$userLifecycle8, _user$userLifecycle9;
      return user.status === 'active' && ((_user$userLifecycle8 = user.userLifecycle) === null || _user$userLifecycle8 === void 0 ? void 0 : _user$userLifecycle8.stage) !== 'dormant' && ((_user$userLifecycle9 = user.userLifecycle) === null || _user$userLifecycle9 === void 0 ? void 0 : _user$userLifecycle9.stage) !== 'churning';
    });
  }
  getAverageUserHealth() {
    const users = this.getPlatformUsers();
    if (users.length === 0) return 0;
    const total = users.reduce((sum, user) => {
      var _user$userHealth4;
      return sum + (((_user$userHealth4 = user.userHealth) === null || _user$userHealth4 === void 0 ? void 0 : _user$userHealth4.score) || 0);
    }, 0);
    return Math.round(total / users.length);
  }
  getAverageEngagementRate() {
    const users = this.getPlatformUsers();
    if (users.length === 0) return 0;
    const total = users.reduce((sum, user) => {
      var _user$engagement;
      return sum + (((_user$engagement = user.engagement) === null || _user$engagement === void 0 ? void 0 : _user$engagement.weeklyActiveRate) || 0);
    }, 0);
    return Math.round(total / users.length);
  }
  getTotalPlatformUsers() {
    return this.getPlatformUsers().length;
  }
  getRetentionRate() {
    const users = this.getPlatformUsers();
    const retainedUsers = users.filter(user => {
      var _user$userLifecycle0, _user$userLifecycle1;
      return ((_user$userLifecycle0 = user.userLifecycle) === null || _user$userLifecycle0 === void 0 ? void 0 : _user$userLifecycle0.retentionRisk) === 'low' || ((_user$userLifecycle1 = user.userLifecycle) === null || _user$userLifecycle1 === void 0 ? void 0 : _user$userLifecycle1.retentionRisk) === 'medium';
    });
    return users.length > 0 ? Math.round(retainedUsers.length / users.length * 100) : 0;
  }
  // User Health Helper Methods
  getUserHealthStatusColor(status) {
    switch (status) {
      case 'excellent':
        return 'success';
      case 'good':
        return 'primary';
      case 'fair':
        return 'warning';
      case 'poor':
        return 'danger';
      case 'critical':
        return 'danger';
      default:
        return 'medium';
    }
  }
  getUserLifecycleStageColor(stage) {
    switch (stage) {
      case 'new':
        return 'tertiary';
      case 'growing':
        return 'secondary';
      case 'established':
        return 'success';
      case 'at-risk':
        return 'warning';
      case 'churning':
        return 'danger';
      case 'dormant':
        return 'dark';
      default:
        return 'medium';
    }
  }
  getEngagementTrendIcon(trend) {
    switch (trend) {
      case 'increasing':
        return 'trending-up-outline';
      case 'stable':
        return 'remove-outline';
      case 'declining':
        return 'trending-down-outline';
      case 'critical':
        return 'alert-circle-outline';
      default:
        return 'help-outline';
    }
  }
  getEngagementTrendColor(trend) {
    switch (trend) {
      case 'increasing':
        return 'success';
      case 'stable':
        return 'primary';
      case 'declining':
        return 'warning';
      case 'critical':
        return 'danger';
      default:
        return 'medium';
    }
  }
  // Platform Steward Intervention Tools
  engageUser(user) {
    var _this7 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this7.toastService.showToast(`Engagement campaign initiated for ${user.name}`, 'success');
      } catch (error) {
        yield _this7.toastService.showToast('Error initiating engagement campaign', 'error');
      }
    })();
  }
  scheduleUserSupport(user) {
    var _this8 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this8.toastService.showToast(`Support session scheduled for ${user.name}`, 'success');
      } catch (error) {
        yield _this8.toastService.showToast('Error scheduling support', 'error');
      }
    })();
  }
  sendUserRetentionCampaign(user) {
    var _this9 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this9.toastService.showToast(`Retention campaign sent to ${user.name}`, 'success');
      } catch (error) {
        yield _this9.toastService.showToast('Error sending retention campaign', 'error');
      }
    })();
  }
  flagUserForReview(user) {
    var _this0 = this;
    return (0,_home_simbamugoz_workspace_SOTD_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this0.toastService.showToast(`${user.name} flagged for platform review`, 'success');
      } catch (error) {
        yield _this0.toastService.showToast('Error flagging user', 'error');
      }
    })();
  }
  // Utility Methods for User Management
  formatLifetimeValue(value) {
    if (value < 100) return `${value}`;
    if (value < 1000) return `${value}`;
    return `${(value / 1000).toFixed(1)}k`;
  }
  formatDaysOnPlatform(days) {
    if (days < 7) return `${days} days`;
    const weeks = Math.floor(days / 7);
    if (weeks < 8) return `${weeks} weeks`;
    const months = Math.floor(days / 30);
    return `${months} months`;
  }
  formatSessionDuration(minutes) {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  getChurnProbabilityClass(user) {
    var _user$userLifecycle10;
    const churnProbability = ((_user$userLifecycle10 = user.userLifecycle) === null || _user$userLifecycle10 === void 0 ? void 0 : _user$userLifecycle10.churnProbability) || 0;
    if (churnProbability > 70) return 'churn-high';
    if (churnProbability > 40) return 'churn-medium';
    return 'churn-low';
  }
  hasFlaggedBehavior(user) {
    var _user$userHealth5;
    return !!((_user$userHealth5 = user.userHealth) !== null && _user$userHealth5 !== void 0 && (_user$userHealth5 = _user$userHealth5.flaggedBehavior) !== null && _user$userHealth5 !== void 0 && _user$userHealth5.length && user.userHealth.flaggedBehavior.length > 0);
  }
}
_UsersPage = UsersPage;
_UsersPage.ɵfac = function UsersPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UsersPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService));
};
_UsersPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _UsersPage,
  selectors: [["app-users"]],
  inputs: {
    embedded: "embedded"
  },
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
  decls: 6,
  vars: 4,
  consts: [["mainContent", ""], [4, "ngIf"], [3, "ngClass"], ["class", "content-wrapper", 4, "ngIf"], ["value", "admins", 3, "ngModelChange", "ngModel"], ["value", "admins"], ["value", "all"], [1, "content-wrapper"], [4, "ngTemplateOutlet"], ["class", "embedded-segment", 4, "ngIf"], [1, "ion-padding"], [1, "embedded-segment"], [2, "background", "#e8f5e8", "padding", "20px", "border-radius", "8px", "margin-bottom", "20px"], [1, "admin-cards"], ["class", "admin-card", 4, "ngFor", "ngForOf"], [1, "admin-card"], [3, "color"], [2, "background", "#e3f2fd", "padding", "20px", "border-radius", "8px", "margin-bottom", "20px"], [1, "user-cards"], ["class", "user-card", 4, "ngFor", "ngForOf"], [1, "user-card"]],
  template: function UsersPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, UsersPage_ion_header_0_Template, 12, 1, "ion-header", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, UsersPage_ion_content_2_Template, 3, 1, "ion-content", 1)(3, UsersPage_div_3_Template, 2, 1, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, UsersPage_ng_template_4_Template, 4, 3, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.embedded);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx.embedded ? "embedded-content" : "standalone-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.embedded);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.embedded);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCard, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardHeader, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardTitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardSubtitle, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonCardContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonBadge, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSegment, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_5__.IonSegmentButton, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.SlicePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgTemplateOutlet],
  styles: ["[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  width: 100%;\n  min-height: 100vh;\n}\n\n.embedded-content[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n\n.standalone-content[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n\n.embedded-segment[_ngcontent-%COMP%] {\n  background: var(--ion-color-light);\n  border-bottom: 1px solid var(--ion-color-light-shade);\n  margin-bottom: 1rem;\n  padding: 1rem;\n}\n.embedded-segment[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  margin: 0 auto;\n}\n\n.admin-cards[_ngcontent-%COMP%], .user-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1rem;\n  margin-top: 1rem;\n}\n\n.admin-card[_ngcontent-%COMP%], .user-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.admin-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%], .user-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  padding-bottom: 0.5rem;\n}\n.admin-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%], .user-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding-top: 0.5rem;\n}\n.admin-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .user-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n  font-size: 0.9rem;\n}\n\n[_nghost-%COMP%]   ion-content[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n\n.admin-overview[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.admin-overview[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.admin-overview[_ngcontent-%COMP%]   .overview-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 1rem;\n}\n.admin-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n  background: var(--ion-color-step-50);\n  border-radius: 8px;\n  border-left: 4px solid var(--ion-color-primary);\n}\n.admin-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  padding: 0.75rem;\n  border-radius: 50%;\n  background: var(--ion-color-primary-tint);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 3rem;\n  height: 3rem;\n}\n.admin-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.admin-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--ion-color-dark);\n}\n.admin-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--ion-color-medium);\n  font-size: 0.85rem;\n}\n\n.search-filters[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.search-filters[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n}\n\n.admin-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n\n.admin-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.admin-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\n}\n.admin-card.health-excellent[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-success);\n}\n.admin-card.health-good[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-primary);\n}\n.admin-card.health-fair[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-warning);\n}\n.admin-card.health-poor[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-danger);\n}\n.admin-card.health-critical[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-danger);\n  box-shadow: 0 0 0 2px rgba(var(--ion-color-danger-rgb), 0.2);\n}\n.admin-card[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.admin-card[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%]   .admin-title[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.admin-card[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%]   .admin-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.admin-card[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%]   .admin-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  color: var(--ion-color-medium);\n}\n.admin-card[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%]   .health-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-width: 80px;\n  justify-content: flex-end;\n}\n.admin-card[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%]   .health-indicator[_ngcontent-%COMP%]   .health-icon[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n}\n.admin-card[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%]   .health-indicator[_ngcontent-%COMP%]   .health-score[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--ion-color-medium-shade);\n}\n.admin-card[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n  background: var(--ion-color-step-50);\n  border-radius: 8px;\n}\n.admin-card[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%]   .status-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 0.5rem;\n  flex-wrap: wrap;\n}\n.admin-card[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%]   .effectiveness-rate[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.admin-card[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%]   .effectiveness-rate[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: var(--ion-color-medium-shade);\n  min-width: 110px;\n}\n.admin-card[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%]   .effectiveness-rate[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 6px;\n  border-radius: 3px;\n}\n.admin-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.admin-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n}\n.admin-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.admin-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  color: var(--ion-color-medium-shade);\n}\n.admin-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.admin-card[_ngcontent-%COMP%]   .lifecycle-info[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n  background: var(--ion-color-step-25);\n  border-radius: 6px;\n}\n.admin-card[_ngcontent-%COMP%]   .lifecycle-info[_ngcontent-%COMP%]   .lifecycle-metric[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.admin-card[_ngcontent-%COMP%]   .lifecycle-info[_ngcontent-%COMP%]   .lifecycle-metric[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.admin-card[_ngcontent-%COMP%]   .lifecycle-info[_ngcontent-%COMP%]   .lifecycle-metric[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n}\n.admin-card[_ngcontent-%COMP%]   .lifecycle-info[_ngcontent-%COMP%]   .lifecycle-metric[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.admin-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%], \n.admin-card[_ngcontent-%COMP%]   .support-status[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n  border-radius: 8px;\n}\n.admin-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.admin-card[_ngcontent-%COMP%]   .support-status[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-size: 0.85rem;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.admin-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%]   .alert-items[_ngcontent-%COMP%], \n.admin-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%]   .support-items[_ngcontent-%COMP%], \n.admin-card[_ngcontent-%COMP%]   .support-status[_ngcontent-%COMP%]   .alert-items[_ngcontent-%COMP%], \n.admin-card[_ngcontent-%COMP%]   .support-status[_ngcontent-%COMP%]   .support-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n.admin-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%]   .alert-items[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%], \n.admin-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%]   .support-items[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%], \n.admin-card[_ngcontent-%COMP%]   .support-status[_ngcontent-%COMP%]   .alert-items[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%], \n.admin-card[_ngcontent-%COMP%]   .support-status[_ngcontent-%COMP%]   .support-items[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.75rem;\n  height: 26px;\n}\n.admin-card[_ngcontent-%COMP%]   .alerts-section[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-warning-rgb), 0.1);\n  border: 1px solid rgba(var(--ion-color-warning-rgb), 0.2);\n}\n.admin-card[_ngcontent-%COMP%]   .support-status[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-primary-rgb), 0.1);\n  border: 1px solid rgba(var(--ion-color-primary-rgb), 0.2);\n}\n.admin-card[_ngcontent-%COMP%]   .steward-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  justify-content: flex-end;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--ion-color-light-shade);\n}\n.admin-card[_ngcontent-%COMP%]   .steward-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 6px;\n  --padding-end: 6px;\n  margin: 0;\n  font-size: 0.9rem;\n}\n\nion-modal[_ngcontent-%COMP%]   .health-details[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .performance-metrics[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .support-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\nion-modal[_ngcontent-%COMP%]   .health-metric[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .support-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  background: var(--ion-color-step-50);\n  border-radius: 8px;\n  border-left: 4px solid var(--ion-color-primary);\n}\nion-modal[_ngcontent-%COMP%]   .health-metric[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .support-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 0.85rem;\n  font-weight: 500;\n}\nion-modal[_ngcontent-%COMP%]   .health-metric[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], \nion-modal[_ngcontent-%COMP%]   .support-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  font-size: 0.9rem;\n}\n\n.performance-excellent[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%]   .admin-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n}\n\n.performance-poor[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%]   .admin-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--ion-color-danger);\n}\n\n.burnout-high[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%], \n.burnout-critical[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-danger-rgb), 0.1);\n  border: 1px solid rgba(var(--ion-color-danger-rgb), 0.2);\n}\n\n@media (max-width: 768px) {\n  .admin-overview[_ngcontent-%COMP%]   .overview-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  }\n  .admin-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .admin-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    min-width: 2.5rem;\n    height: 2.5rem;\n  }\n  .admin-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .admin-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .admin-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .admin-card[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n    align-items: flex-start;\n  }\n  .admin-card[_ngcontent-%COMP%]   .admin-header[_ngcontent-%COMP%]   .health-indicator[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .admin-card[_ngcontent-%COMP%]   .key-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.25rem;\n    align-items: flex-start;\n  }\n  ion-modal[_ngcontent-%COMP%]   .health-details[_ngcontent-%COMP%], \n   ion-modal[_ngcontent-%COMP%]   .performance-metrics[_ngcontent-%COMP%], \n   ion-modal[_ngcontent-%COMP%]   .support-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.admin-card.needs-attention[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulse-attention 2s infinite;\n}\n\n@keyframes _ngcontent-%COMP%_pulse-attention {\n  0% {\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  }\n  50% {\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 3px rgba(var(--ion-color-warning-rgb), 0.3);\n  }\n  100% {\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .admin-card.health-critical[_ngcontent-%COMP%] {\n    box-shadow: 0 0 0 2px rgba(var(--ion-color-danger-rgb), 0.4);\n  }\n  .burnout-high[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%], \n   .burnout-critical[_ngcontent-%COMP%]   .health-status-bar[_ngcontent-%COMP%] {\n    background: rgba(var(--ion-color-danger-rgb), 0.2);\n  }\n}\n.user-overview[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.user-overview[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.user-overview[_ngcontent-%COMP%]   .overview-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 1rem;\n}\n.user-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n  background: var(--ion-color-step-50);\n  border-radius: 8px;\n  border-left: 4px solid var(--ion-color-primary);\n}\n.user-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  padding: 0.75rem;\n  border-radius: 50%;\n  background: var(--ion-color-primary-tint);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 3rem;\n  height: 3rem;\n}\n.user-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.user-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--ion-color-dark);\n}\n.user-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--ion-color-medium);\n  font-size: 0.85rem;\n}\n\n.users-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n\n.user-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.user-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\n}\n.user-card.health-excellent[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-success);\n}\n.user-card.health-good[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-primary);\n}\n.user-card.health-fair[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-warning);\n}\n.user-card.health-poor[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-danger);\n}\n.user-card.health-critical[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--ion-color-danger);\n  box-shadow: 0 0 0 2px rgba(var(--ion-color-danger-rgb), 0.2);\n}\n.user-card[_ngcontent-%COMP%]   .user-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.user-card[_ngcontent-%COMP%]   .user-header[_ngcontent-%COMP%]   .user-title[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.user-card[_ngcontent-%COMP%]   .user-header[_ngcontent-%COMP%]   .user-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.user-card[_ngcontent-%COMP%]   .user-header[_ngcontent-%COMP%]   .user-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  color: var(--ion-color-medium);\n}\n.user-card[_ngcontent-%COMP%]   .user-header[_ngcontent-%COMP%]   .user-indicators[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.25rem;\n}\n.user-card[_ngcontent-%COMP%]   .user-header[_ngcontent-%COMP%]   .user-indicators[_ngcontent-%COMP%]   .health-score[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--ion-color-medium-shade);\n}\n.user-card[_ngcontent-%COMP%]   .user-status-bar[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n  background: var(--ion-color-step-50);\n  border-radius: 8px;\n}\n.user-card[_ngcontent-%COMP%]   .user-status-bar[_ngcontent-%COMP%]   .status-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 0.5rem;\n  flex-wrap: wrap;\n}\n.user-card[_ngcontent-%COMP%]   .user-status-bar[_ngcontent-%COMP%]   .engagement-trend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: var(--ion-color-medium-shade);\n}\n.user-card[_ngcontent-%COMP%]   .user-status-bar[_ngcontent-%COMP%]   .engagement-trend[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.user-card[_ngcontent-%COMP%]   .user-metrics[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.user-card[_ngcontent-%COMP%]   .user-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n}\n.user-card[_ngcontent-%COMP%]   .user-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.user-card[_ngcontent-%COMP%]   .user-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  color: var(--ion-color-medium-shade);\n}\n.user-card[_ngcontent-%COMP%]   .user-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.user-card[_ngcontent-%COMP%]   .usage-insights[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n  background: var(--ion-color-step-25);\n  border-radius: 6px;\n}\n.user-card[_ngcontent-%COMP%]   .usage-insights[_ngcontent-%COMP%]   .usage-metric[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.user-card[_ngcontent-%COMP%]   .usage-insights[_ngcontent-%COMP%]   .usage-metric[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.user-card[_ngcontent-%COMP%]   .usage-insights[_ngcontent-%COMP%]   .usage-metric[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n}\n.user-card[_ngcontent-%COMP%]   .usage-insights[_ngcontent-%COMP%]   .usage-metric[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n}\n.user-card[_ngcontent-%COMP%]   .usage-insights[_ngcontent-%COMP%]   .usage-metric[_ngcontent-%COMP%]   .value.churn-high[_ngcontent-%COMP%] {\n  color: var(--ion-color-danger);\n}\n.user-card[_ngcontent-%COMP%]   .usage-insights[_ngcontent-%COMP%]   .usage-metric[_ngcontent-%COMP%]   .value.churn-medium[_ngcontent-%COMP%] {\n  color: var(--ion-color-warning);\n}\n.user-card[_ngcontent-%COMP%]   .usage-insights[_ngcontent-%COMP%]   .usage-metric[_ngcontent-%COMP%]   .value.churn-low[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n}\n.user-card[_ngcontent-%COMP%]   .behavior-alerts[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n  background: rgba(var(--ion-color-warning-rgb), 0.1);\n  border: 1px solid rgba(var(--ion-color-warning-rgb), 0.2);\n  border-radius: 8px;\n}\n.user-card[_ngcontent-%COMP%]   .behavior-alerts[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-size: 0.85rem;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.user-card[_ngcontent-%COMP%]   .behavior-alerts[_ngcontent-%COMP%]   .alert-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n.user-card[_ngcontent-%COMP%]   .behavior-alerts[_ngcontent-%COMP%]   .alert-items[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.75rem;\n  height: 26px;\n}\n.user-card[_ngcontent-%COMP%]   .steward-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  justify-content: flex-end;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--ion-color-light-shade);\n}\n.user-card[_ngcontent-%COMP%]   .steward-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 6px;\n  --padding-end: 6px;\n  margin: 0;\n  font-size: 0.9rem;\n}\n\n.lifecycle-new[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-tertiary-rgb), 0.1);\n  border-color: var(--ion-color-tertiary);\n}\n\n.lifecycle-growing[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-secondary-rgb), 0.1);\n  border-color: var(--ion-color-secondary);\n}\n\n.lifecycle-established[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-success-rgb), 0.1);\n  border-color: var(--ion-color-success);\n}\n\n.lifecycle-at-risk[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-warning-rgb), 0.1);\n  border-color: var(--ion-color-warning);\n}\n\n.lifecycle-churning[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-danger-rgb), 0.1);\n  border-color: var(--ion-color-danger);\n}\n\n.lifecycle-dormant[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-dark-rgb), 0.1);\n  border-color: var(--ion-color-dark);\n}\n\n@media (max-width: 768px) {\n  .user-overview[_ngcontent-%COMP%]   .overview-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  }\n  .user-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .user-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    min-width: 2.5rem;\n    height: 2.5rem;\n  }\n  .user-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .user-overview[_ngcontent-%COMP%]   .metric-item[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .users-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .user-card[_ngcontent-%COMP%]   .user-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n    align-items: flex-start;\n  }\n  .user-card[_ngcontent-%COMP%]   .user-header[_ngcontent-%COMP%]   .user-indicators[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .user-card[_ngcontent-%COMP%]   .user-metrics[_ngcontent-%COMP%]   .metric-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.25rem;\n    align-items: flex-start;\n  }\n}\n.user-card.needs-attention[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulse-attention 2s infinite;\n}\n\n.user-card.high-value[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(var(--ion-color-success-rgb), 0.05), rgba(var(--ion-color-primary-rgb), 0.05));\n}\n\n.user-card.at-risk[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-warning-rgb), 0.03);\n}\n\n.user-card.churning[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-danger-rgb), 0.03);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FBQUY7O0FBS0U7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQUZKOztBQVFFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUFMSjs7QUFVQTtFQUNFLGtDQUFBO0VBQ0EscURBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7QUFQRjtBQVNFO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQVBKOztBQVlBO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FBVEY7O0FBWUE7RUFDRSxtQkFBQTtFQUNBLHdDQUFBO0FBVEY7QUFXRTtFQUNFLHNCQUFBO0FBVEo7QUFZRTtFQUNFLG1CQUFBO0FBVko7QUFZSTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7QUFWTjs7QUFnQkU7RUFDRSxvQ0FBQTtBQWJKOztBQWtCQTtFQUNFLG1CQUFBO0FBZkY7QUFpQkU7RUFDRSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSx3Q0FBQTtBQWZKO0FBa0JFO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtBQWhCSjtBQW1CRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtFQUNBLCtDQUFBO0FBakJKO0FBbUJJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5Q0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUFqQk47QUFvQkk7RUFDRSxPQUFBO0FBbEJOO0FBb0JNO0VBQ0UscUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFsQlI7QUFxQk07RUFDRSxTQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtBQW5CUjs7QUEwQkE7RUFDRSxtQkFBQTtBQXZCRjtBQXlCRTtFQUNFLFNBQUE7RUFDQSxtQkFBQTtBQXZCSjs7QUE0QkE7RUFDRSxhQUFBO0VBQ0EsMkRBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUF6QkY7O0FBNEJBO0VBQ0UsU0FBQTtFQUNBLG1CQUFBO0VBQ0Esd0NBQUE7RUFDQSxxREFBQTtBQXpCRjtBQTJCRTtFQUNFLDJCQUFBO0VBQ0EsMENBQUE7QUF6Qko7QUE2QkU7RUFDRSwrQ0FBQTtBQTNCSjtBQThCRTtFQUNFLCtDQUFBO0FBNUJKO0FBK0JFO0VBQ0UsK0NBQUE7QUE3Qko7QUFnQ0U7RUFDRSw4Q0FBQTtBQTlCSjtBQWlDRTtFQUNFLDhDQUFBO0VBQ0EsNERBQUE7QUEvQko7QUFrQ0U7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSx1QkFBQTtFQUNBLHFCQUFBO0FBaENKO0FBa0NJO0VBQ0UsT0FBQTtBQWhDTjtBQWtDTTtFQUNFLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBaENSO0FBbUNNO0VBQ0UsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsOEJBQUE7QUFqQ1I7QUFxQ0k7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBbkNOO0FBcUNNO0VBQ0UsaUJBQUE7QUFuQ1I7QUFzQ007RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7QUFwQ1I7QUF5Q0U7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtBQXZDSjtBQXlDSTtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0FBdkNOO0FBMENJO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQXhDTjtBQTBDTTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGdCQUFBO0FBeENSO0FBMkNNO0VBQ0UsT0FBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQXpDUjtBQThDRTtFQUNFLG1CQUFBO0FBNUNKO0FBOENJO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EscUJBQUE7QUE1Q047QUE4Q007RUFDRSxnQkFBQTtBQTVDUjtBQStDTTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLG9DQUFBO0FBN0NSO0FBK0NRO0VBQ0UsaUJBQUE7QUE3Q1Y7QUFtREU7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtBQWpESjtBQW1ESTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7QUFqRE47QUFtRE07RUFDRSxnQkFBQTtBQWpEUjtBQW9ETTtFQUNFLGlCQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQkFBQTtBQWxEUjtBQXFETTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQW5EUjtBQXdERTs7RUFFRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUF0REo7QUF3REk7O0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQXJETjtBQXdESTs7OztFQUVFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQXBETjtBQXNETTs7OztFQUNFLFNBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUFqRFI7QUFzREU7RUFDRSxtREFBQTtFQUNBLHlEQUFBO0FBcERKO0FBdURFO0VBQ0UsbURBQUE7RUFDQSx5REFBQTtBQXJESjtBQXdERTtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtEQUFBO0FBdERKO0FBd0RJO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtBQXRETjs7QUE2REU7OztFQUdFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7QUExREo7QUE2REU7OztFQUdFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsK0NBQUE7QUEzREo7QUE2REk7OztFQUNFLDhCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQXpETjtBQTRESTs7O0VBQ0UsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGlCQUFBO0FBeEROOztBQStERTtFQUNFLCtCQUFBO0FBNURKOztBQWlFRTtFQUNFLDhCQUFBO0FBOURKOztBQXFFRTs7RUFDRSxrREFBQTtFQUNBLHdEQUFBO0FBakVKOztBQXNFQTtFQUVJO0lBQ0UsMkRBQUE7RUFwRUo7RUF1RUU7SUFDRSxnQkFBQTtFQXJFSjtFQXVFSTtJQUNFLGlCQUFBO0lBQ0EsaUJBQUE7SUFDQSxjQUFBO0VBckVOO0VBeUVNO0lBQ0UsaUJBQUE7RUF2RVI7RUEwRU07SUFDRSxpQkFBQTtFQXhFUjtFQThFQTtJQUNFLDBCQUFBO0VBNUVGO0VBZ0ZFO0lBQ0Usc0JBQUE7SUFDQSxXQUFBO0lBQ0EsdUJBQUE7RUE5RUo7RUFnRkk7SUFDRSwyQkFBQTtFQTlFTjtFQW1GSTtJQUNFLHNCQUFBO0lBQ0EsWUFBQTtJQUNBLHVCQUFBO0VBakZOO0VBdUZFOzs7SUFHRSwwQkFBQTtFQXJGSjtBQUNGO0FBMEZBO0VBQ0Usc0NBQUE7QUF4RkY7O0FBMkZBO0VBQ0U7SUFDRSx3Q0FBQTtFQXhGRjtFQTBGQTtJQUNFLDJGQUFBO0VBeEZGO0VBMEZBO0lBQ0Usd0NBQUE7RUF4RkY7QUFDRjtBQTRGQTtFQUVJO0lBQ0UsNERBQUE7RUEzRko7RUFpR0U7O0lBQ0Usa0RBQUE7RUE5Rko7QUFDRjtBQW1HQTtFQUNFLG1CQUFBO0FBakdGO0FBbUdFO0VBQ0UsU0FBQTtFQUNBLG1CQUFBO0VBQ0Esd0NBQUE7QUFqR0o7QUFvR0U7RUFDRSxhQUFBO0VBQ0EsMkRBQUE7RUFDQSxTQUFBO0FBbEdKO0FBcUdFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsK0NBQUE7QUFuR0o7QUFxR0k7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlDQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQW5HTjtBQXNHSTtFQUNFLE9BQUE7QUFwR047QUFzR007RUFDRSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQXBHUjtBQXVHTTtFQUNFLFNBQUE7RUFDQSw4QkFBQTtFQUNBLGtCQUFBO0FBckdSOztBQTRHQTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQXpHRjs7QUE0R0E7RUFDRSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSx3Q0FBQTtFQUNBLHFEQUFBO0FBekdGO0FBMkdFO0VBQ0UsMkJBQUE7RUFDQSwwQ0FBQTtBQXpHSjtBQTZHRTtFQUNFLCtDQUFBO0FBM0dKO0FBOEdFO0VBQ0UsK0NBQUE7QUE1R0o7QUErR0U7RUFDRSwrQ0FBQTtBQTdHSjtBQWdIRTtFQUNFLDhDQUFBO0FBOUdKO0FBaUhFO0VBQ0UsOENBQUE7RUFDQSw0REFBQTtBQS9HSjtBQWtIRTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7QUFoSEo7QUFrSEk7RUFDRSxPQUFBO0FBaEhOO0FBa0hNO0VBQ0UscUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFoSFI7QUFtSE07RUFDRSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtBQWpIUjtBQXFISTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtBQW5ITjtBQXFITTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtBQW5IUjtBQXdIRTtFQUNFLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0FBdEhKO0FBd0hJO0VBQ0UsYUFBQTtFQUNBLFdBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7QUF0SE47QUF5SEk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG9DQUFBO0FBdkhOO0FBeUhNO0VBQ0UsZUFBQTtBQXZIUjtBQTRIRTtFQUNFLG1CQUFBO0FBMUhKO0FBNEhJO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EscUJBQUE7QUExSE47QUE0SE07RUFDRSxnQkFBQTtBQTFIUjtBQTZITTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLG9DQUFBO0FBM0hSO0FBNkhRO0VBQ0UsaUJBQUE7QUEzSFY7QUFpSUU7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtBQS9ISjtBQWlJSTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7QUEvSE47QUFpSU07RUFDRSxnQkFBQTtBQS9IUjtBQWtJTTtFQUNFLGlCQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQkFBQTtBQWhJUjtBQW1JTTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQWpJUjtBQW1JUTtFQUNFLDhCQUFBO0FBaklWO0FBb0lRO0VBQ0UsK0JBQUE7QUFsSVY7QUFxSVE7RUFDRSwrQkFBQTtBQW5JVjtBQXlJRTtFQUNFLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtREFBQTtFQUNBLHlEQUFBO0VBQ0Esa0JBQUE7QUF2SUo7QUF5SUk7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBdklOO0FBMElJO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FBeElOO0FBMElNO0VBQ0UsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQXhJUjtBQTZJRTtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtEQUFBO0FBM0lKO0FBNklJO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtBQTNJTjs7QUFpSkE7RUFDRSxvREFBQTtFQUNBLHVDQUFBO0FBOUlGOztBQWlKQTtFQUNFLHFEQUFBO0VBQ0Esd0NBQUE7QUE5SUY7O0FBaUpBO0VBQ0UsbURBQUE7RUFDQSxzQ0FBQTtBQTlJRjs7QUFpSkE7RUFDRSxtREFBQTtFQUNBLHNDQUFBO0FBOUlGOztBQWlKQTtFQUNFLGtEQUFBO0VBQ0EscUNBQUE7QUE5SUY7O0FBaUpBO0VBQ0UsZ0RBQUE7RUFDQSxtQ0FBQTtBQTlJRjs7QUFrSkE7RUFFSTtJQUNFLDJEQUFBO0VBaEpKO0VBbUpFO0lBQ0UsZ0JBQUE7RUFqSko7RUFtSkk7SUFDRSxpQkFBQTtJQUNBLGlCQUFBO0lBQ0EsY0FBQTtFQWpKTjtFQXFKTTtJQUNFLGlCQUFBO0VBbkpSO0VBc0pNO0lBQ0UsaUJBQUE7RUFwSlI7RUEwSkE7SUFDRSwwQkFBQTtFQXhKRjtFQTRKRTtJQUNFLHNCQUFBO0lBQ0EsV0FBQTtJQUNBLHVCQUFBO0VBMUpKO0VBNEpJO0lBQ0UsdUJBQUE7RUExSk47RUErSkk7SUFDRSxzQkFBQTtJQUNBLFlBQUE7SUFDQSx1QkFBQTtFQTdKTjtBQUNGO0FBbUtBO0VBQ0Usc0NBQUE7QUFqS0Y7O0FBb0tBO0VBQ0UsdUhBQUE7QUFqS0Y7O0FBb0tBO0VBQ0Usb0RBQUE7QUFqS0Y7O0FBb0tBO0VBQ0UsbURBQUE7QUFqS0YiLCJmaWxlIjoidXNlcnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW5pdGlhbCBzdHlsZXMgZm9yIHVzZXJzXHJcbjpob3N0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWluLWhlaWdodDogMTAwdmg7XHJcbn1cclxuXHJcbi8vIEVtYmVkZGVkIGNvbnRlbnQgc3R5bGluZ1xyXG4uZW1iZWRkZWQtY29udGVudCB7XHJcbiAgLmNvbnRlbnQtd3JhcHBlciB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFN0YW5kYWxvbmUgY29udGVudCBzdHlsaW5nICBcclxuLnN0YW5kYWxvbmUtY29udGVudCB7XHJcbiAgLmNvbnRlbnQtd3JhcHBlciB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbn1cclxuXHJcbi8vIEVtYmVkZGVkIHNlZ21lbnQgc3R5bGluZ1xyXG4uZW1iZWRkZWQtc2VnbWVudCB7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgXHJcbiAgaW9uLXNlZ21lbnQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDYXJkIGxheW91dHNcclxuLmFkbWluLWNhcmRzLCAudXNlci1jYXJkcyB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDMwMHB4LCAxZnIpKTtcclxuICBnYXA6IDFyZW07XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxufVxyXG5cclxuLmFkbWluLWNhcmQsIC51c2VyLWNhcmQge1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBcclxuICBpb24tY2FyZC1oZWFkZXIge1xyXG4gICAgcGFkZGluZy1ib3R0b206IDAuNXJlbTtcclxuICB9XHJcbiAgXHJcbiAgaW9uLWNhcmQtY29udGVudCB7XHJcbiAgICBwYWRkaW5nLXRvcDogMC41cmVtO1xyXG4gICAgXHJcbiAgICBwIHtcclxuICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcclxuICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG46aG9zdCB7XHJcbiAgaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQWRtaW4gSGVhbHRoIE92ZXJ2aWV3XHJcbi5hZG1pbi1vdmVydmlldyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgaW9uLWNhcmQge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgfVxyXG5cclxuICAub3ZlcnZpZXctbWV0cmljcyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxODBweCwgMWZyKSk7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgfVxyXG5cclxuICAubWV0cmljLWl0ZW0ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcblxyXG4gICAgLm1ldHJpYy1pY29uIHtcclxuICAgICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQpO1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgbWluLXdpZHRoOiAzcmVtO1xyXG4gICAgICBoZWlnaHQ6IDNyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLm1ldHJpYy1pbmZvIHtcclxuICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgIGgzIHtcclxuICAgICAgICBtYXJnaW46IDAgMCAwLjI1cmVtIDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjRyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gU2VhcmNoIGFuZCBGaWx0ZXJzXHJcbi5zZWFyY2gtZmlsdGVycyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgaW9uLWNhcmQge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICB9XHJcbn1cclxuXHJcbi8vIEFkbWluIEdyaWRcclxuLmFkbWluLWdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgzODBweCwgMWZyKSk7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XHJcbn1cclxuXHJcbi5hZG1pbi1jYXJkIHtcclxuICBtYXJnaW46IDA7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBib3gtc2hhZG93OiAwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcclxuICAgIGJveC1zaGFkb3c6IDAgNnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcclxuICB9XHJcblxyXG4gIC8vIEhlYWx0aC1iYXNlZCBzdHlsaW5nXHJcbiAgJi5oZWFsdGgtZXhjZWxsZW50IHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gIH1cclxuXHJcbiAgJi5oZWFsdGgtZ29vZCB7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICB9XHJcblxyXG4gICYuaGVhbHRoLWZhaXIge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XHJcbiAgfVxyXG5cclxuICAmLmhlYWx0aC1wb29yIHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgfVxyXG5cclxuICAmLmhlYWx0aC1jcml0aWNhbCB7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjIpO1xyXG4gIH1cclxuXHJcbiAgLmFkbWluLWhlYWRlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcblxyXG4gICAgLmFkbWluLXRpdGxlIHtcclxuICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgIGgyIHtcclxuICAgICAgICBtYXJnaW46IDAgMCAwLjI1cmVtIDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5oZWFsdGgtaW5kaWNhdG9yIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICAgIG1pbi13aWR0aDogODBweDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuXHJcbiAgICAgIC5oZWFsdGgtaWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjRyZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5oZWFsdGgtc2NvcmUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmhlYWx0aC1zdGF0dXMtYmFyIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuICAgIC5zdGF0dXMtaW5mbyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIH1cclxuXHJcbiAgICAuZWZmZWN0aXZlbmVzcy1yYXRlIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjc1cmVtO1xyXG5cclxuICAgICAgc3BhbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XHJcbiAgICAgICAgbWluLXdpZHRoOiAxMTBweDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaW9uLXByb2dyZXNzLWJhciB7XHJcbiAgICAgICAgZmxleDogMTtcclxuICAgICAgICBoZWlnaHQ6IDZweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5rZXktbWV0cmljcyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG5cclxuICAgIC5tZXRyaWMtcm93IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcblxyXG4gICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5tZXRyaWMge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBnYXA6IDAuNHJlbTtcclxuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XHJcblxyXG4gICAgICAgIGlvbi1pY29uIHtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmxpZmVjeWNsZS1pbmZvIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG5cclxuICAgIC5saWZlY3ljbGUtbWV0cmljIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcblxyXG4gICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5sYWJlbCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWxlcnRzLXNlY3Rpb24sXHJcbiAgLnN1cHBvcnQtc3RhdHVzIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuICAgIGg0IHtcclxuICAgICAgbWFyZ2luOiAwIDAgMC41cmVtIDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLmFsZXJ0LWl0ZW1zLFxyXG4gICAgLnN1cHBvcnQtaXRlbXMge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgIGdhcDogMC40cmVtO1xyXG5cclxuICAgICAgaW9uLWNoaXAge1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICBmb250LXNpemU6IDAuNzVyZW07XHJcbiAgICAgICAgaGVpZ2h0OiAyNnB4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWxlcnRzLXNlY3Rpb24ge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjEpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjIpO1xyXG4gIH1cclxuXHJcbiAgLnN1cHBvcnQtc3RhdHVzIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xKTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4yKTtcclxuICB9XHJcblxyXG4gIC5zdGV3YXJkLWFjdGlvbnMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGdhcDogMC40cmVtO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAgIHBhZGRpbmctdG9wOiAwLjVyZW07XHJcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcclxuXHJcbiAgICBpb24tYnV0dG9uIHtcclxuICAgICAgLS1wYWRkaW5nLXN0YXJ0OiA2cHg7XHJcbiAgICAgIC0tcGFkZGluZy1lbmQ6IDZweDtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEVuaGFuY2VkIE1vZGFsIFN0eWxpbmdcclxuaW9uLW1vZGFsIHtcclxuICAuaGVhbHRoLWRldGFpbHMsXHJcbiAgLnBlcmZvcm1hbmNlLW1ldHJpY3MsXHJcbiAgLnN1cHBvcnQtbWV0cmljcyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgfVxyXG5cclxuICAuaGVhbHRoLW1ldHJpYyxcclxuICAubWV0cmljLWl0ZW0sXHJcbiAgLnN1cHBvcnQtaXRlbSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC01MCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuXHJcbiAgICAubGFiZWwge1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIH1cclxuXHJcbiAgICAudmFsdWUge1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEFkbWluIFBlcmZvcm1hbmNlIEluZGljYXRvcnNcclxuLnBlcmZvcm1hbmNlLWV4Y2VsbGVudCB7XHJcbiAgLmFkbWluLWhlYWRlciAuYWRtaW4tdGl0bGUgaDIge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICB9XHJcbn1cclxuXHJcbi5wZXJmb3JtYW5jZS1wb29yIHtcclxuICAuYWRtaW4taGVhZGVyIC5hZG1pbi10aXRsZSBoMiB7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBCdXJub3V0IFJpc2sgSW5kaWNhdG9yc1xyXG4uYnVybm91dC1oaWdoLFxyXG4uYnVybm91dC1jcml0aWNhbCB7XHJcbiAgLmhlYWx0aC1zdGF0dXMtYmFyIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjEpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZXNwb25zaXZlIERlc2lnblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuYWRtaW4tb3ZlcnZpZXcge1xyXG4gICAgLm92ZXJ2aWV3LW1ldHJpY3Mge1xyXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDE1MHB4LCAxZnIpKTtcclxuICAgIH1cclxuXHJcbiAgICAubWV0cmljLWl0ZW0ge1xyXG4gICAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG5cclxuICAgICAgLm1ldHJpYy1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgICAgICBtaW4td2lkdGg6IDIuNXJlbTtcclxuICAgICAgICBoZWlnaHQ6IDIuNXJlbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLm1ldHJpYy1pbmZvIHtcclxuICAgICAgICBoMyB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHAge1xyXG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWRtaW4tZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcblxyXG4gIC5hZG1pbi1jYXJkIHtcclxuICAgIC5hZG1pbi1oZWFkZXIge1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBnYXA6IDAuNXJlbTtcclxuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcblxyXG4gICAgICAuaGVhbHRoLWluZGljYXRvciB7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmtleS1tZXRyaWNzIHtcclxuICAgICAgLm1ldHJpYy1yb3cge1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgZ2FwOiAwLjI1cmVtO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpb24tbW9kYWwge1xyXG4gICAgLmhlYWx0aC1kZXRhaWxzLFxyXG4gICAgLnBlcmZvcm1hbmNlLW1ldHJpY3MsXHJcbiAgICAuc3VwcG9ydC1tZXRyaWNzIHtcclxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBTcGVjaWFsIFN0YXRlc1xyXG4uYWRtaW4tY2FyZC5uZWVkcy1hdHRlbnRpb24ge1xyXG4gIGFuaW1hdGlvbjogcHVsc2UtYXR0ZW50aW9uIDJzIGluZmluaXRlO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHB1bHNlLWF0dGVudGlvbiB7XHJcbiAgMCUge1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICB9XHJcbiAgNTAlIHtcclxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgMCAwIDNweCByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDAuMyk7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIERhcmsgbW9kZSBzdXBwb3J0XHJcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcclxuICAuYWRtaW4tY2FyZCB7XHJcbiAgICAmLmhlYWx0aC1jcml0aWNhbCB7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC40KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5idXJub3V0LWhpZ2gsXHJcbiAgLmJ1cm5vdXQtY3JpdGljYWwge1xyXG4gICAgLmhlYWx0aC1zdGF0dXMtYmFyIHtcclxuICAgICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBQbGF0Zm9ybSBVc2VyIE1hbmFnZW1lbnQgQ2VudGVyIFN0eWxlc1xyXG4udXNlci1vdmVydmlldyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgaW9uLWNhcmQge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgfVxyXG5cclxuICAub3ZlcnZpZXctbWV0cmljcyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxODBweCwgMWZyKSk7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgfVxyXG5cclxuICAubWV0cmljLWl0ZW0ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcblxyXG4gICAgLm1ldHJpYy1pY29uIHtcclxuICAgICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQpO1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgbWluLXdpZHRoOiAzcmVtO1xyXG4gICAgICBoZWlnaHQ6IDNyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLm1ldHJpYy1pbmZvIHtcclxuICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgIGgzIHtcclxuICAgICAgICBtYXJnaW46IDAgMCAwLjI1cmVtIDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjRyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gUGxhdGZvcm0gVXNlcnMgR3JpZFxyXG4udXNlcnMtZ3JpZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDM4MHB4LCAxZnIpKTtcclxuICBnYXA6IDFyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxufVxyXG5cclxuLnVzZXItY2FyZCB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLCBib3gtc2hhZG93IDAuMnMgZWFzZTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XHJcbiAgICBib3gtc2hhZG93OiAwIDZweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XHJcbiAgfVxyXG5cclxuICAvLyBIZWFsdGgtYmFzZWQgc3R5bGluZyBmb3IgdXNlcnNcclxuICAmLmhlYWx0aC1leGNlbGxlbnQge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgfVxyXG5cclxuICAmLmhlYWx0aC1nb29kIHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gIH1cclxuXHJcbiAgJi5oZWFsdGgtZmFpciB7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcclxuICB9XHJcblxyXG4gICYuaGVhbHRoLXBvb3Ige1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICB9XHJcblxyXG4gICYuaGVhbHRoLWNyaXRpY2FsIHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMik7XHJcbiAgfVxyXG5cclxuICAudXNlci1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG5cclxuICAgIC51c2VyLXRpdGxlIHtcclxuICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgIGgyIHtcclxuICAgICAgICBtYXJnaW46IDAgMCAwLjI1cmVtIDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC51c2VyLWluZGljYXRvcnMge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgICAgIGdhcDogMC4yNXJlbTtcclxuXHJcbiAgICAgIC5oZWFsdGgtc2NvcmUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAudXNlci1zdGF0dXMtYmFyIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuICAgIC5zdGF0dXMtaW5mbyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIH1cclxuXHJcbiAgICAuZW5nYWdlbWVudC10cmVuZCB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlKTtcclxuXHJcbiAgICAgIGlvbi1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC51c2VyLW1ldHJpY3Mge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgICAubWV0cmljLXJvdyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG5cclxuICAgICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAubWV0cmljIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgZ2FwOiAwLjRyZW07XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xyXG5cclxuICAgICAgICBpb24taWNvbiB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC51c2FnZS1pbnNpZ2h0cyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgcGFkZGluZzogMC43NXJlbTtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTI1KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuXHJcbiAgICAudXNhZ2UtbWV0cmljIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcblxyXG4gICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5sYWJlbCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG5cclxuICAgICAgICAmLmNodXJuLWhpZ2gge1xyXG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5jaHVybi1tZWRpdW0ge1xyXG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuY2h1cm4tbG93IHtcclxuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYmVoYXZpb3ItYWxlcnRzIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjEpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjIpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuICAgIGg0IHtcclxuICAgICAgbWFyZ2luOiAwIDAgMC41cmVtIDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLmFsZXJ0LWl0ZW1zIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgICBnYXA6IDAuNHJlbTtcclxuXHJcbiAgICAgIGlvbi1jaGlwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjc1cmVtO1xyXG4gICAgICAgIGhlaWdodDogMjZweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnN0ZXdhcmQtYWN0aW9ucyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZ2FwOiAwLjRyZW07XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgcGFkZGluZy10b3A6IDAuNXJlbTtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xyXG5cclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDZweDtcclxuICAgICAgLS1wYWRkaW5nLWVuZDogNnB4O1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gVXNlciBMaWZlY3ljbGUgU3RhZ2UgQ29sb3JzXHJcbi5saWZlY3ljbGUtbmV3IHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2IpLCAwLjEpO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcclxufVxyXG5cclxuLmxpZmVjeWNsZS1ncm93aW5nIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiKSwgMC4xKTtcclxuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xyXG59XHJcblxyXG4ubGlmZWN5Y2xlLWVzdGFibGlzaGVkIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLXJnYiksIDAuMSk7XHJcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbn1cclxuXHJcbi5saWZlY3ljbGUtYXQtcmlzayB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjEpO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xyXG59XHJcblxyXG4ubGlmZWN5Y2xlLWNodXJuaW5nIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC4xKTtcclxuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG59XHJcblxyXG4ubGlmZWN5Y2xlLWRvcm1hbnQge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhcmstcmdiKSwgMC4xKTtcclxuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxufVxyXG5cclxuLy8gUmVzcG9uc2l2ZSBEZXNpZ24gZm9yIFVzZXIgTWFuYWdlbWVudFxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAudXNlci1vdmVydmlldyB7XHJcbiAgICAub3ZlcnZpZXctbWV0cmljcyB7XHJcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMTUwcHgsIDFmcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC5tZXRyaWMtaXRlbSB7XHJcbiAgICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcblxyXG4gICAgICAubWV0cmljLWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgICAgIG1pbi13aWR0aDogMi41cmVtO1xyXG4gICAgICAgIGhlaWdodDogMi41cmVtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAubWV0cmljLWluZm8ge1xyXG4gICAgICAgIGgzIHtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcCB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC51c2Vycy1ncmlkIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xyXG4gIH1cclxuXHJcbiAgLnVzZXItY2FyZCB7XHJcbiAgICAudXNlci1oZWFkZXIge1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBnYXA6IDAuNXJlbTtcclxuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcblxyXG4gICAgICAudXNlci1pbmRpY2F0b3JzIHtcclxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC51c2VyLW1ldHJpY3Mge1xyXG4gICAgICAubWV0cmljLXJvdyB7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBnYXA6IDAuMjVyZW07XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFNwZWNpYWwgVXNlciBTdGF0ZXNcclxuLnVzZXItY2FyZC5uZWVkcy1hdHRlbnRpb24ge1xyXG4gIGFuaW1hdGlvbjogcHVsc2UtYXR0ZW50aW9uIDJzIGluZmluaXRlO1xyXG59XHJcblxyXG4udXNlci1jYXJkLmhpZ2gtdmFsdWUge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4wNSksIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4wNSkpO1xyXG59XHJcblxyXG4udXNlci1jYXJkLmF0LXJpc2sge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiKSwgMC4wMyk7XHJcbn1cclxuXHJcbi51c2VyLWNhcmQuY2h1cm5pbmcge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjAzKTtcclxufVxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGxhdGZvcm1zL3N1cGVyLWFkbWluL3BhZ2VzL3VzZXJzL3VzZXJzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FBQUY7O0FBS0U7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQUZKOztBQVFFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUFMSjs7QUFVQTtFQUNFLGtDQUFBO0VBQ0EscURBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7QUFQRjtBQVNFO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQVBKOztBQVlBO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FBVEY7O0FBWUE7RUFDRSxtQkFBQTtFQUNBLHdDQUFBO0FBVEY7QUFXRTtFQUNFLHNCQUFBO0FBVEo7QUFZRTtFQUNFLG1CQUFBO0FBVko7QUFZSTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7QUFWTjs7QUFnQkU7RUFDRSxvQ0FBQTtBQWJKOztBQWtCQTtFQUNFLG1CQUFBO0FBZkY7QUFpQkU7RUFDRSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSx3Q0FBQTtBQWZKO0FBa0JFO0VBQ0UsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtBQWhCSjtBQW1CRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtFQUNBLCtDQUFBO0FBakJKO0FBbUJJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5Q0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUFqQk47QUFvQkk7RUFDRSxPQUFBO0FBbEJOO0FBb0JNO0VBQ0UscUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUFsQlI7QUFxQk07RUFD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QTNJTjs7QUFpSkE7RUFDRSxvREFBQTtFQUNBLHVDQUFBO0FBOUlGOztBQWlKQTtFQUNFLHFEQUFBO0VBQ0Esd0NBQUE7QUE5SUY7O0FBaUpBO0VBQ0UsbURBQUE7RUFDQSxzQ0FBQTtBQTlJRjs7QUFpSkE7RUFDRSxtREFBQTtFQUNBLHNDQUFBO0FBOUlGOztBQWlKQTtFQUNFLGtEQUFBO0VBQ0EscUNBQUE7QUE5SUY7O0FBaUpBO0VBQ0UsZ0RBQUE7RUFDQSxtQ0FBQTtBQTlJRjs7QUFrSkE7RUFFSTtJQUNFLDJEQUFBO0VBaEpKO0VBbUpFO0lBQ0UsZ0JBQUE7RUFqSko7RUFtSkk7SUFDRSxpQkFBQTtJQUNBLGlCQUFBO0lBQ0EsY0FBQTtFQWpKTjtFQXFKTTtJQUNFLGlCQUFBO0VBbkpSO0VBc0pNO0lBQ0UsaUJBQUE7RUFwSlI7RUEwSkE7SUFDRSwwQkFBQTtFQXhKRjtFQTRKRTtJQUNFLHNCQUFBO0lBQ0EsV0FBQTtJQUNBLHVCQUFBO0VBMUpKO0VBNEpJO0lBQ0UsdUJBQUE7RUExSk47RUErSkk7SUFDRSxzQkFBQTtJQUNBLFlBQUE7SUFDQSx1QkFBQTtFQTdKTjtBQUNGO0FBbUtBO0VBQ0Usc0NBQUE7QUFqS0Y7O0FBb0tBO0VBQ0UsdUhBQUE7QUFqS0Y7O0FBb0tBO0VBQ0Usb0RBQUE7QUFqS0Y7O0FBb0tBO0VBQ0UsbURBQUE7QUFqS0Y7QUFDQSxnbmlDQUFnbmlDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW5pdGlhbCBzdHlsZXMgZm9yIHVzZXJzXHJcbjpob3N0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWluLWhlaWdodDogMTAwdmg7XHJcbn1cclxuXHJcbi8vIEVtYmVkZGVkIGNvbnRlbnQgc3R5bGluZ1xyXG4uZW1iZWRkZWQtY29udGVudCB7XHJcbiAgLmNvbnRlbnQtd3JhcHBlciB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFN0YW5kYWxvbmUgY29udGVudCBzdHlsaW5nICBcclxuLnN0YW5kYWxvbmUtY29udGVudCB7XHJcbiAgLmNvbnRlbnQtd3JhcHBlciB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbn1cclxuXHJcbi8vIEVtYmVkZGVkIHNlZ21lbnQgc3R5bGluZ1xyXG4uZW1iZWRkZWQtc2VnbWVudCB7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgXHJcbiAgaW9uLXNlZ21lbnQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDYXJkIGxheW91dHNcclxuLmFkbWluLWNhcmRzLCAudXNlci1jYXJkcyB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDMwMHB4LCAxZnIpKTtcclxuICBnYXA6IDFyZW07XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxufVxyXG5cclxuLmFkbWluLWNhcmQsIC51c2VyLWNhcmQge1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBcclxuICBpb24tY2FyZC1oZWFkZXIge1xyXG4gICAgcGFkZGluZy1ib3R0b206IDAuNXJlbTtcclxuICB9XHJcbiAgXHJcbiAgaW9uLWNhcmQtY29udGVudCB7XHJcbiAgICBwYWRkaW5nLXRvcDogMC41cmVtO1xyXG4gICAgXHJcbiAgICBwIHtcclxuICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcclxuICAgICAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG46aG9zdCB7XHJcbiAgaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQWRtaW4gSGVhbHRoIE92ZXJ2aWV3XHJcbi5hZG1pbi1vdmVydmlldyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgaW9uLWNhcmQge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgfVxyXG5cclxuICAub3ZlcnZpZXctbWV0cmljcyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxODBweCwgMWZyKSk7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgfVxyXG5cclxuICAubWV0cmljLWl0ZW0ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcblxyXG4gICAgLm1ldHJpYy1pY29uIHtcclxuICAgICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQpO1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgbWluLXdpZHRoOiAzcmVtO1xyXG4gICAgICBoZWlnaHQ6IDNyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLm1ldHJpYy1pbmZvIHtcclxuICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgIGgzIHtcclxuICAgICAgICBtYXJnaW46IDAgMCAwLjI1cmVtIDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjRyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gU2VhcmNoIGFuZCBGaWx0ZXJzXHJcbi5zZWFyY2gtZmlsdGVycyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgaW9uLWNhcmQge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICB9XHJcbn1cclxuXHJcbi8vIEFkbWluIEdyaWRcclxuLmFkbWluLWdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgzODBweCwgMWZyKSk7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XHJcbn1cclxuXHJcbi5hZG1pbi1jYXJkIHtcclxuICBtYXJnaW46IDA7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBib3gtc2hhZG93OiAwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcclxuICAgIGJveC1zaGFkb3c6IDAgNnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcclxuICB9XHJcblxyXG4gIC8vIEhlYWx0aC1iYXNlZCBzdHlsaW5nXHJcbiAgJi5oZWFsdGgtZXhjZWxsZW50IHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gIH1cclxuXHJcbiAgJi5oZWFsdGgtZ29vZCB7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICB9XHJcblxyXG4gICYuaGVhbHRoLWZhaXIge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XHJcbiAgfVxyXG5cclxuICAmLmhlYWx0aC1wb29yIHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgfVxyXG5cclxuICAmLmhlYWx0aC1jcml0aWNhbCB7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjIpO1xyXG4gIH1cclxuXHJcbiAgLmFkbWluLWhlYWRlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcblxyXG4gICAgLmFkbWluLXRpdGxlIHtcclxuICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgIGgyIHtcclxuICAgICAgICBtYXJnaW46IDAgMCAwLjI1cmVtIDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5oZWFsdGgtaW5kaWNhdG9yIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICAgIG1pbi13aWR0aDogODBweDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuXHJcbiAgICAgIC5oZWFsdGgtaWNvbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjRyZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5oZWFsdGgtc2NvcmUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmhlYWx0aC1zdGF0dXMtYmFyIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuICAgIC5zdGF0dXMtaW5mbyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIH1cclxuXHJcbiAgICAuZWZmZWN0aXZlbmVzcy1yYXRlIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjc1cmVtO1xyXG5cclxuICAgICAgc3BhbiB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XHJcbiAgICAgICAgbWluLXdpZHRoOiAxMTBweDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaW9uLXByb2dyZXNzLWJhciB7XHJcbiAgICAgICAgZmxleDogMTtcclxuICAgICAgICBoZWlnaHQ6IDZweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5rZXktbWV0cmljcyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG5cclxuICAgIC5tZXRyaWMtcm93IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcblxyXG4gICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5tZXRyaWMge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBnYXA6IDAuNHJlbTtcclxuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XHJcblxyXG4gICAgICAgIGlvbi1pY29uIHtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmxpZmVjeWNsZS1pbmZvIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG5cclxuICAgIC5saWZlY3ljbGUtbWV0cmljIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcblxyXG4gICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5sYWJlbCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWxlcnRzLXNlY3Rpb24sXHJcbiAgLnN1cHBvcnQtc3RhdHVzIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuICAgIGg0IHtcclxuICAgICAgbWFyZ2luOiAwIDAgMC41cmVtIDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLmFsZXJ0LWl0ZW1zLFxyXG4gICAgLnN1cHBvcnQtaXRlbXMge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgIGdhcDogMC40cmVtO1xyXG5cclxuICAgICAgaW9uLWNoaXAge1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICBmb250LXNpemU6IDAuNzVyZW07XHJcbiAgICAgICAgaGVpZ2h0OiAyNnB4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWxlcnRzLXNlY3Rpb24ge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjEpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjIpO1xyXG4gIH1cclxuXHJcbiAgLnN1cHBvcnQtc3RhdHVzIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xKTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4yKTtcclxuICB9XHJcblxyXG4gIC5zdGV3YXJkLWFjdGlvbnMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGdhcDogMC40cmVtO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAgIHBhZGRpbmctdG9wOiAwLjVyZW07XHJcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcclxuXHJcbiAgICBpb24tYnV0dG9uIHtcclxuICAgICAgLS1wYWRkaW5nLXN0YXJ0OiA2cHg7XHJcbiAgICAgIC0tcGFkZGluZy1lbmQ6IDZweDtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEVuaGFuY2VkIE1vZGFsIFN0eWxpbmdcclxuaW9uLW1vZGFsIHtcclxuICAuaGVhbHRoLWRldGFpbHMsXHJcbiAgLnBlcmZvcm1hbmNlLW1ldHJpY3MsXHJcbiAgLnN1cHBvcnQtbWV0cmljcyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgfVxyXG5cclxuICAuaGVhbHRoLW1ldHJpYyxcclxuICAubWV0cmljLWl0ZW0sXHJcbiAgLnN1cHBvcnQtaXRlbSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC01MCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuXHJcbiAgICAubGFiZWwge1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIH1cclxuXHJcbiAgICAudmFsdWUge1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEFkbWluIFBlcmZvcm1hbmNlIEluZGljYXRvcnNcclxuLnBlcmZvcm1hbmNlLWV4Y2VsbGVudCB7XHJcbiAgLmFkbWluLWhlYWRlciAuYWRtaW4tdGl0bGUgaDIge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICB9XHJcbn1cclxuXHJcbi5wZXJmb3JtYW5jZS1wb29yIHtcclxuICAuYWRtaW4taGVhZGVyIC5hZG1pbi10aXRsZSBoMiB7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBCdXJub3V0IFJpc2sgSW5kaWNhdG9yc1xyXG4uYnVybm91dC1oaWdoLFxyXG4uYnVybm91dC1jcml0aWNhbCB7XHJcbiAgLmhlYWx0aC1zdGF0dXMtYmFyIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjEpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZXNwb25zaXZlIERlc2lnblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuYWRtaW4tb3ZlcnZpZXcge1xyXG4gICAgLm92ZXJ2aWV3LW1ldHJpY3Mge1xyXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDE1MHB4LCAxZnIpKTtcclxuICAgIH1cclxuXHJcbiAgICAubWV0cmljLWl0ZW0ge1xyXG4gICAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG5cclxuICAgICAgLm1ldHJpYy1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgICAgICBtaW4td2lkdGg6IDIuNXJlbTtcclxuICAgICAgICBoZWlnaHQ6IDIuNXJlbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLm1ldHJpYy1pbmZvIHtcclxuICAgICAgICBoMyB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHAge1xyXG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWRtaW4tZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcblxyXG4gIC5hZG1pbi1jYXJkIHtcclxuICAgIC5hZG1pbi1oZWFkZXIge1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBnYXA6IDAuNXJlbTtcclxuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcblxyXG4gICAgICAuaGVhbHRoLWluZGljYXRvciB7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmtleS1tZXRyaWNzIHtcclxuICAgICAgLm1ldHJpYy1yb3cge1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgZ2FwOiAwLjI1cmVtO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpb24tbW9kYWwge1xyXG4gICAgLmhlYWx0aC1kZXRhaWxzLFxyXG4gICAgLnBlcmZvcm1hbmNlLW1ldHJpY3MsXHJcbiAgICAuc3VwcG9ydC1tZXRyaWNzIHtcclxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBTcGVjaWFsIFN0YXRlc1xyXG4uYWRtaW4tY2FyZC5uZWVkcy1hdHRlbnRpb24ge1xyXG4gIGFuaW1hdGlvbjogcHVsc2UtYXR0ZW50aW9uIDJzIGluZmluaXRlO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHB1bHNlLWF0dGVudGlvbiB7XHJcbiAgMCUge1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICB9XHJcbiAgNTAlIHtcclxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgMCAwIDNweCByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDAuMyk7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIERhcmsgbW9kZSBzdXBwb3J0XHJcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcclxuICAuYWRtaW4tY2FyZCB7XHJcbiAgICAmLmhlYWx0aC1jcml0aWNhbCB7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC40KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5idXJub3V0LWhpZ2gsXHJcbiAgLmJ1cm5vdXQtY3JpdGljYWwge1xyXG4gICAgLmhlYWx0aC1zdGF0dXMtYmFyIHtcclxuICAgICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBQbGF0Zm9ybSBVc2VyIE1hbmFnZW1lbnQgQ2VudGVyIFN0eWxlc1xyXG4udXNlci1vdmVydmlldyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgaW9uLWNhcmQge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgfVxyXG5cclxuICAub3ZlcnZpZXctbWV0cmljcyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxODBweCwgMWZyKSk7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgfVxyXG5cclxuICAubWV0cmljLWl0ZW0ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcblxyXG4gICAgLm1ldHJpYy1pY29uIHtcclxuICAgICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQpO1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgbWluLXdpZHRoOiAzcmVtO1xyXG4gICAgICBoZWlnaHQ6IDNyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLm1ldHJpYy1pbmZvIHtcclxuICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgIGgzIHtcclxuICAgICAgICBtYXJnaW46IDAgMCAwLjI1cmVtIDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjRyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gUGxhdGZvcm0gVXNlcnMgR3JpZFxyXG4udXNlcnMtZ3JpZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDM4MHB4LCAxZnIpKTtcclxuICBnYXA6IDFyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxufVxyXG5cclxuLnVzZXItY2FyZCB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLCBib3gtc2hhZG93IDAuMnMgZWFzZTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XHJcbiAgICBib3gtc2hhZG93OiAwIDZweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XHJcbiAgfVxyXG5cclxuICAvLyBIZWFsdGgtYmFzZWQgc3R5bGluZyBmb3IgdXNlcnNcclxuICAmLmhlYWx0aC1leGNlbGxlbnQge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgfVxyXG5cclxuICAmLmhlYWx0aC1nb29kIHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gIH1cclxuXHJcbiAgJi5oZWFsdGgtZmFpciB7XHJcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcclxuICB9XHJcblxyXG4gICYuaGVhbHRoLXBvb3Ige1xyXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICB9XHJcblxyXG4gICYuaGVhbHRoLWNyaXRpY2FsIHtcclxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMik7XHJcbiAgfVxyXG5cclxuICAudXNlci1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG5cclxuICAgIC51c2VyLXRpdGxlIHtcclxuICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgIGgyIHtcclxuICAgICAgICBtYXJnaW46IDAgMCAwLjI1cmVtIDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC51c2VyLWluZGljYXRvcnMge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgICAgIGdhcDogMC4yNXJlbTtcclxuXHJcbiAgICAgIC5oZWFsdGgtc2NvcmUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAudXNlci1zdGF0dXMtYmFyIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTApO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuICAgIC5zdGF0dXMtaW5mbyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIH1cclxuXHJcbiAgICAuZW5nYWdlbWVudC10cmVuZCB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGdhcDogMC41cmVtO1xyXG4gICAgICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlKTtcclxuXHJcbiAgICAgIGlvbi1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC51c2VyLW1ldHJpY3Mge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgICAubWV0cmljLXJvdyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG5cclxuICAgICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAubWV0cmljIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgZ2FwOiAwLjRyZW07XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xyXG5cclxuICAgICAgICBpb24taWNvbiB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC51c2FnZS1pbnNpZ2h0cyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgcGFkZGluZzogMC43NXJlbTtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTI1KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuXHJcbiAgICAudXNhZ2UtbWV0cmljIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcblxyXG4gICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5sYWJlbCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC52YWx1ZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG5cclxuICAgICAgICAmLmNodXJuLWhpZ2gge1xyXG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5jaHVybi1tZWRpdW0ge1xyXG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuY2h1cm4tbG93IHtcclxuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYmVoYXZpb3ItYWxlcnRzIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjEpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjIpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5cclxuICAgIGg0IHtcclxuICAgICAgbWFyZ2luOiAwIDAgMC41cmVtIDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLmFsZXJ0LWl0ZW1zIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgICBnYXA6IDAuNHJlbTtcclxuXHJcbiAgICAgIGlvbi1jaGlwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjc1cmVtO1xyXG4gICAgICAgIGhlaWdodDogMjZweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnN0ZXdhcmQtYWN0aW9ucyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZ2FwOiAwLjRyZW07XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgcGFkZGluZy10b3A6IDAuNXJlbTtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xyXG5cclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDZweDtcclxuICAgICAgLS1wYWRkaW5nLWVuZDogNnB4O1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gVXNlciBMaWZlY3ljbGUgU3RhZ2UgQ29sb3JzXHJcbi5saWZlY3ljbGUtbmV3IHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2IpLCAwLjEpO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcclxufVxyXG5cclxuLmxpZmVjeWNsZS1ncm93aW5nIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiKSwgMC4xKTtcclxuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xyXG59XHJcblxyXG4ubGlmZWN5Y2xlLWVzdGFibGlzaGVkIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLXJnYiksIDAuMSk7XHJcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbn1cclxuXHJcbi5saWZlY3ljbGUtYXQtcmlzayB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjEpO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xyXG59XHJcblxyXG4ubGlmZWN5Y2xlLWNodXJuaW5nIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1kYW5nZXItcmdiKSwgMC4xKTtcclxuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG59XHJcblxyXG4ubGlmZWN5Y2xlLWRvcm1hbnQge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhcmstcmdiKSwgMC4xKTtcclxuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxufVxyXG5cclxuLy8gUmVzcG9uc2l2ZSBEZXNpZ24gZm9yIFVzZXIgTWFuYWdlbWVudFxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAudXNlci1vdmVydmlldyB7XHJcbiAgICAub3ZlcnZpZXctbWV0cmljcyB7XHJcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMTUwcHgsIDFmcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC5tZXRyaWMtaXRlbSB7XHJcbiAgICAgIHBhZGRpbmc6IDAuNzVyZW07XHJcblxyXG4gICAgICAubWV0cmljLWljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgICAgIG1pbi13aWR0aDogMi41cmVtO1xyXG4gICAgICAgIGhlaWdodDogMi41cmVtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAubWV0cmljLWluZm8ge1xyXG4gICAgICAgIGgzIHtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcCB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC51c2Vycy1ncmlkIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xyXG4gIH1cclxuXHJcbiAgLnVzZXItY2FyZCB7XHJcbiAgICAudXNlci1oZWFkZXIge1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBnYXA6IDAuNXJlbTtcclxuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcblxyXG4gICAgICAudXNlci1pbmRpY2F0b3JzIHtcclxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC51c2VyLW1ldHJpY3Mge1xyXG4gICAgICAubWV0cmljLXJvdyB7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBnYXA6IDAuMjVyZW07XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFNwZWNpYWwgVXNlciBTdGF0ZXNcclxuLnVzZXItY2FyZC5uZWVkcy1hdHRlbnRpb24ge1xyXG4gIGFuaW1hdGlvbjogcHVsc2UtYXR0ZW50aW9uIDJzIGluZmluaXRlO1xyXG59XHJcblxyXG4udXNlci1jYXJkLmhpZ2gtdmFsdWUge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4wNSksIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4wNSkpO1xyXG59XHJcblxyXG4udXNlci1jYXJkLmF0LXJpc2sge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiKSwgMC4wMyk7XHJcbn1cclxuXHJcbi51c2VyLWNhcmQuY2h1cm5pbmcge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjAzKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=default-src_app_platforms_super-admin_pages_users_users_page_ts.js.map