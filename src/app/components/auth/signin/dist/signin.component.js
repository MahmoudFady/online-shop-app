"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SigninComponent = void 0;
var core_1 = require("@angular/core");
var SigninComponent = /** @class */ (function () {
    function SigninComponent(authService) {
        this.authService = authService;
        this.loading = false;
    }
    SigninComponent.prototype.ngOnInit = function () { };
    SigninComponent.prototype.onSignin = function (f) {
        var _this = this;
        if (f.invalid)
            return;
        var _a = f.value, email = _a.email, password = _a.password;
        this.loading = true;
        this.authService.signin(email, password).subscribe({
            next: function (users) {
                _this.loading = false;
                if (users.length === 0) {
                    _this.signinErrMsg = 'wrong email or password';
                    return;
                }
                _this.authService.setupSuccessAuth(users[0].id);
            }
        });
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            templateUrl: './signin.component.html',
            styleUrls: ['../auth-shared-style.css', './signin.component.css']
        })
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
