"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.baseUrl = 'http://localhost:3001/';
    }
    AuthService.prototype.isAccountDoesNotExist = function (email) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.baseUrl + "users?email=" + email).subscribe({
                next: function (response) {
                    var exist = response.length === 0 ? false : true;
                    exist ? reject('email already exist') : resolve(true);
                },
                error: function (err) {
                    reject(err.message);
                }
            });
        });
        return promise;
    };
    AuthService.prototype.signup = function (user) {
        return this.http.post(this.baseUrl + "users", user);
    };
    AuthService.prototype.signin = function (email, password) {
        return this.http.get(this.baseUrl + "users?email=" + email + "&&password=" + password);
    };
    AuthService.prototype.setupSuccessAuth = function (id) {
        localStorage.setItem('userId', JSON.stringify(id));
        this.router.navigate(['/user/cart']);
    };
    AuthService.prototype.getUserIdFromLocalStorage = function () {
        return localStorage.getItem('userId') || null;
    };
    AuthService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
