"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var CartService = /** @class */ (function () {
    function CartService(http, authService, alertService) {
        this.http = http;
        this.authService = authService;
        this.alertService = alertService;
        this.baseUrl = 'http://localhost:3001/';
        this.defualtCart = {
            products: [],
            totalPrice: 0,
            totalQuantity: 0
        };
        this.cart$ = new rxjs_1.Subject();
        this.cart = this.defualtCart;
    }
    CartService.prototype.setCart$ = function () {
        this.cart$.next(this.cart);
    };
    CartService.prototype.getCart$ = function () {
        return this.cart$.asObservable();
    };
    CartService.prototype.getCartFromLocalStorage = function () {
        return (JSON.parse(localStorage.getItem('cart')) || this.defualtCart);
    };
    CartService.prototype.setCart = function () {
        this.userId =
            this.authService.getUserIdFromLocalStorage();
        if (this.userId) {
            this.getCartFromDB(this.userId);
        }
        else {
            this.cart = this.getCartFromLocalStorage();
            this.setCart$();
        }
    };
    CartService.prototype.getPriceAfterDiscount = function (price, discount) {
        return Math.round(price - price * (discount / 100));
    };
    CartService.prototype.increaseCartData = function (price, discount) {
        this.cart.totalPrice += this.getPriceAfterDiscount(price, discount);
        this.cart.totalQuantity += 1;
        if (!this.userId)
            localStorage.setItem('cart', JSON.stringify(this.cart));
        else
            this.putAuthCart();
    };
    CartService.prototype.decreaseCartData = function (price, discount, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var minusedPrice = quantity * this.getPriceAfterDiscount(price, discount);
        this.cart.totalPrice -= minusedPrice;
        this.cart.totalQuantity -= quantity;
        if (!this.userId)
            localStorage.setItem('cart', JSON.stringify(this.cart));
        else
            this.putAuthCart();
    };
    CartService.prototype.pushProductToCart = function (product) {
        this.cart.products.push(__assign(__assign({}, product), { quantity: 1 }));
        var price = product.price, discountPercentage = product.discountPercentage;
        this.increaseCartData(price, discountPercentage);
        this.alertService.displayAlert('product added to cart', '#080');
        if (this.userId) {
            this.postAuthCart();
        }
    };
    CartService.prototype.increaseProductQuantity = function (id) {
        var productIndex = this.cart.products.findIndex(function (p) { return p.id === id; });
        if (productIndex === -1)
            return;
        var product = this.cart.products[productIndex];
        product.quantity += 1;
        var price = product.price, discountPercentage = product.discountPercentage;
        this.increaseCartData(price, discountPercentage);
        this.alertService.displayAlert('one item added', '#080');
    };
    CartService.prototype.decreaseProductQuantity = function (id) {
        var productIndex = this.cart.products.findIndex(function (p) { return p.id == id; });
        if (productIndex === -1)
            return false;
        var product = this.cart.products[productIndex];
        product.quantity -= 1;
        if (product.quantity === 0)
            return this.removeProduct(id);
        var price = product.price, discountPercentage = product.discountPercentage;
        this.decreaseCartData(price, discountPercentage);
        this.alertService.displayAlert('one item removed', '#080');
        return true;
    };
    CartService.prototype.doRemoveProduct = function (id) {
        var productIndex = this.cart.products.findIndex(function (p) { return p.id == id; });
        var _a = this.cart.products[productIndex], price = _a.price, discountPercentage = _a.discountPercentage, quantity = _a.quantity;
        this.cart.products.splice(productIndex, 1);
        this.decreaseCartData(price, discountPercentage, quantity == 0 ? 1 : quantity);
        this.alertService.displayAlert('product removed from cart', 'var(--warnColor)');
        return true;
    };
    CartService.prototype.removeProduct = function (id) {
        this.doRemoveProduct(id);
    };
    CartService.prototype.getCart = function () {
        return this.cart;
    };
    CartService.prototype.getCartProductsIdAndQuan = function () {
        var products = this.cart.products.map(function (p) {
            return { id: p.id, quantity: p.quantity };
        });
        return products;
    };
    CartService.prototype.getCartFromDB = function (userId) {
        var _this = this;
        this.http.get(this.baseUrl + 'carts/' + userId).subscribe({
            next: function (cart) {
                _this.cart = cart;
                _this.setCart$();
            },
            error: function (err) {
                _this.cart.id = _this.userId;
                _this.setCart$();
            }
        });
    };
    CartService.prototype.putAuthCart = function () {
        this.http.put(this.baseUrl + 'carts/' + this.userId, this.cart).subscribe({
            next: function (res) {
                console.log(res);
            }
        });
    };
    CartService.prototype.postAuthCart = function () {
        this.http.post(this.baseUrl + 'carts/', this.cart).subscribe({
            next: function (res) {
                console.log(res);
            }
        });
    };
    CartService.prototype.deleteAuthCart = function () {
        this.http["delete"](this.baseUrl + 'carts/' + this.userId).subscribe({
            next: function (res) {
                console.log(res);
            }
        });
    };
    CartService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
