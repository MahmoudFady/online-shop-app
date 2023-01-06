"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService) {
        this.authService = authService;
        this.laoding = false;
        this.signupForm = new forms_1.FormGroup({
            id: new forms_1.FormControl(Math.random()),
            name: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.minLength(5)]),
            email: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
            phone: new forms_1.FormControl(null, [forms_1.Validators.required, this.validatePhoneNum]),
            address: new forms_1.FormGroup({
                country: new forms_1.FormControl(null, forms_1.Validators.required),
                state: new forms_1.FormControl(null, forms_1.Validators.required),
                city: new forms_1.FormControl(null, forms_1.Validators.required)
            }),
            password: new forms_1.FormControl(null, [forms_1.Validators.required])
        });
    }
    SignupComponent.prototype.ngOnInit = function () { };
    SignupComponent.prototype.getFormCtrl = function (name) {
        return this.signupForm.get(name);
    };
    SignupComponent.prototype.validatePhoneNum = function (ctrl) {
        var regex = new RegExp(/^((01)[0125][0-9]{8})$/);
        var value = ctrl.value;
        if (!regex.test(value)) {
            return { invalidPhoneNum: true };
        }
        return null;
    };
    SignupComponent.prototype.onSignup = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var user, isAccountDoesNotExist;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.laoding = true;
                        if (this.signupForm.invalid)
                            return [2 /*return*/];
                        user = this.signupForm.value;
                        return [4 /*yield*/, this.authService.isAccountDoesNotExist(user.email)];
                    case 1:
                        isAccountDoesNotExist = _b.sent();
                        if (!isAccountDoesNotExist) {
                            this.signupErrMsg = 'account already exist';
                            this.laoding = false;
                            (_a = this.getFormCtrl('email')) === null || _a === void 0 ? void 0 : _a.reset();
                            return [2 /*return*/];
                        }
                        this.authService.signup(user).subscribe({
                            next: function () {
                                _this.signupErrMsg = null;
                                _this.laoding = false;
                                console.log('signup success');
                                _this.authService.setupSuccessAuth(_this.signupForm.value.id);
                            },
                            error: function (err) {
                                _this.signupErrMsg = err.message;
                                _this.laoding = false;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['../auth-shared-style.css', './signup.component.css']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
