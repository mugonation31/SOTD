"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["common"],{

/***/ 9620:
/*!************************************************!*\
  !*** ./src/app/core/utils/validation.utils.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMAIL_PATTERN: () => (/* binding */ EMAIL_PATTERN),
/* harmony export */   PASSWORD_PATTERN: () => (/* binding */ PASSWORD_PATTERN),
/* harmony export */   getPasswordErrors: () => (/* binding */ getPasswordErrors),
/* harmony export */   validateEmail: () => (/* binding */ validateEmail),
/* harmony export */   validatePassword: () => (/* binding */ validatePassword)
/* harmony export */ });
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
function validateEmail(email) {
  return EMAIL_PATTERN.test(email);
}
function validatePassword(password) {
  // Minimum 8 characters, at least one uppercase letter, one number, and one special character
  return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password);
}
function getPasswordErrors(password) {
  const errors = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }
  return errors;
}

/***/ }),

/***/ 5341:
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/user-greeting/user-greeting.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserGreetingComponent: () => (/* binding */ UserGreetingComponent)
/* harmony export */ });
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular/standalone */ 7241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var ionicons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ionicons */ 5846);
/* harmony import */ var ionicons_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ionicons/icons */ 7958);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);
var _UserGreetingComponent;






function UserGreetingComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1)(1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "ion-icon", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "ion-text", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.greeting);
  }
}
class UserGreetingComponent {
  constructor(authService) {
    this.authService = authService;
    this.greeting = '';
    (0,ionicons__WEBPACK_IMPORTED_MODULE_3__.a)({
      personCircleOutline: ionicons_icons__WEBPACK_IMPORTED_MODULE_0__.personCircleOutline
    });
  }
  ngOnInit() {
    this.greeting = this.authService.getPersonalizedGreeting();
  }
}
_UserGreetingComponent = UserGreetingComponent;
_UserGreetingComponent.ɵfac = function UserGreetingComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UserGreetingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService));
};
_UserGreetingComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _UserGreetingComponent,
  selectors: [["app-user-greeting"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
  decls: 1,
  vars: 1,
  consts: [["class", "greeting-container", 4, "ngIf"], [1, "greeting-container"], [1, "greeting-content"], ["name", "person-circle-outline", 1, "greeting-icon"], [1, "greeting-text"]],
  template: function UserGreetingComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, UserGreetingComponent_div_0_Template, 5, 1, "div", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.greeting);
    }
  },
  dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonText, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf],
  styles: [".greeting-container[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  background: linear-gradient(135deg, var(--ion-color-primary-tint) 0%, var(--ion-color-primary) 100%);\n  border-radius: 12px;\n  margin-bottom: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_slideInFade 0.6s ease-out;\n}\n\n.greeting-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.greeting-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n  opacity: 0.9;\n}\n\n.greeting-text[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0.5px;\n}\n\n@keyframes _ngcontent-%COMP%_slideInFade {\n  0% {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n\n@media (max-width: 576px) {\n  .greeting-container[_ngcontent-%COMP%] {\n    padding: 10px 14px;\n    margin-bottom: 12px;\n  }\n  .greeting-text[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .greeting-icon[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n}\n\n\n@media (prefers-color-scheme: dark) {\n  .greeting-container[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, var(--ion-color-primary-shade) 0%, var(--ion-color-primary-tint) 100%);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItZ3JlZXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNNO0VBQ0Usa0JBQUE7RUFDQSxvR0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSx3Q0FBQTtFQUNBLG9DQUFBO0FBQVI7O0FBR007RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBQVI7O0FBR007RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUFBUjs7QUFHTTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQUFSOztBQUdNO0VBQ0U7SUFDRSxVQUFBO0lBQ0EsNEJBQUE7RUFBUjtFQUVNO0lBQ0UsVUFBQTtJQUNBLHdCQUFBO0VBQVI7QUFDRjtBQUdNLHNCQUFBO0FBQ0E7RUFDRTtJQUNFLGtCQUFBO0lBQ0EsbUJBQUE7RUFEUjtFQUlNO0lBQ0UsZUFBQTtFQUZSO0VBS007SUFDRSxlQUFBO0VBSFI7QUFDRjtBQU1NLHNCQUFBO0FBQ0E7RUFDRTtJQUNFLDBHQUFBO0VBSlI7QUFDRiIsImZpbGUiOiJ1c2VyLWdyZWV0aW5nLmNvbXBvbmVudC50cyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgICAgLmdyZWV0aW5nLWNvbnRhaW5lciB7XG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taW9uLWNvbG9yLXByaW1hcnktdGludCkgMCUsIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAxMDAlKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgYW5pbWF0aW9uOiBzbGlkZUluRmFkZSAwLjZzIGVhc2Utb3V0O1xuICAgICAgfVxuXG4gICAgICAuZ3JlZXRpbmctY29udGVudCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogMTJweDtcbiAgICAgIH1cblxuICAgICAgLmdyZWV0aW5nLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgb3BhY2l0eTogMC45O1xuICAgICAgfVxuXG4gICAgICAuZ3JlZXRpbmctdGV4dCB7XG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2xpZGVJbkZhZGUge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwcHgpO1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJlc3BvbnNpdmUgZGVzaWduICovXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgICAgICAgLmdyZWV0aW5nLWNvbnRhaW5lciB7XG4gICAgICAgICAgcGFkZGluZzogMTBweCAxNHB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICAgIH1cblxuICAgICAgICAuZ3JlZXRpbmctdGV4dCB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmdyZWV0aW5nLWljb24ge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBEYXJrIG1vZGUgc3VwcG9ydCAqL1xuICAgICAgQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xuICAgICAgICAuZ3JlZXRpbmctY29udGFpbmVyIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZSkgMCUsIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQpIDEwMCUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvdXNlci1ncmVldGluZy91c2VyLWdyZWV0aW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDTTtFQUNFLGtCQUFBO0VBQ0Esb0dBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esd0NBQUE7RUFDQSxvQ0FBQTtBQUFSOztBQUdNO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQUFSOztBQUdNO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FBQVI7O0FBR007RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFBUjs7QUFHTTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDRCQUFBO0VBQVI7RUFFTTtJQUNFLFVBQUE7SUFDQSx3QkFBQTtFQUFSO0FBQ0Y7QUFHTSxzQkFBQTtBQUNBO0VBQ0U7SUFDRSxrQkFBQTtJQUNBLG1CQUFBO0VBRFI7RUFJTTtJQUNFLGVBQUE7RUFGUjtFQUtNO0lBQ0UsZUFBQTtFQUhSO0FBQ0Y7QUFNTSxzQkFBQTtBQUNBO0VBQ0U7SUFDRSwwR0FBQTtFQUpSO0FBQ0Y7QUFDQSx3dEZBQXd0RiIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgICAgLmdyZWV0aW5nLWNvbnRhaW5lciB7XG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taW9uLWNvbG9yLXByaW1hcnktdGludCkgMCUsIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAxMDAlKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgYW5pbWF0aW9uOiBzbGlkZUluRmFkZSAwLjZzIGVhc2Utb3V0O1xuICAgICAgfVxuXG4gICAgICAuZ3JlZXRpbmctY29udGVudCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogMTJweDtcbiAgICAgIH1cblxuICAgICAgLmdyZWV0aW5nLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgb3BhY2l0eTogMC45O1xuICAgICAgfVxuXG4gICAgICAuZ3JlZXRpbmctdGV4dCB7XG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2xpZGVJbkZhZGUge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwcHgpO1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJlc3BvbnNpdmUgZGVzaWduICovXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgICAgICAgLmdyZWV0aW5nLWNvbnRhaW5lciB7XG4gICAgICAgICAgcGFkZGluZzogMTBweCAxNHB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICAgIH1cblxuICAgICAgICAuZ3JlZXRpbmctdGV4dCB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmdyZWV0aW5nLWljb24ge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBEYXJrIG1vZGUgc3VwcG9ydCAqL1xuICAgICAgQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xuICAgICAgICAuZ3JlZXRpbmctY29udGFpbmVyIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZSkgMCUsIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQpIDEwMCUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=common.js.map