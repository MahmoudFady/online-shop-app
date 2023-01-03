import { Subject } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AlertService } from '../shared/alert/alert.service';
import { ICart } from '../shared/models/cart.model';
@Injectable({ providedIn: 'root' })
export class CartService {
  cart: ICart = {
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
  };
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {}
  getSavedCart() {
    return (
      JSON.parse(localStorage.getItem('cart') as string) || {
        products: [],
        totalPrice: 0,
        totalQuantity: 0,
      }
    );
  }
  initialCart() {
    if (this.authService.getSavedUserId()) {
      return;
    }
    this.cart = this.getSavedCart() as ICart;
  }
  getPriceAfterDiscount(price: number, discount: number) {
    return Math.round(price - price * (discount / 100));
  }
  private increaseCartData(price: number, discount: number) {
    this.cart.totalPrice += this.getPriceAfterDiscount(price, discount);
    this.cart.totalQuantity += 1;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  private decreaseCartData(price: number, discount: number) {
    this.cart.totalPrice -= this.getPriceAfterDiscount(price, discount);
    this.cart.totalQuantity -= 1;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  pushProductToCart(product: {
    id: number;
    thumbnail: string;
    title: string;
    brand: string;
    price: number;
    discountPercentage: number;
  }) {
    this.cart.products.push({
      ...product,
      quantity: 1,
    });
    const { price, discountPercentage } = product;
    this.increaseCartData(price, discountPercentage);
    this.alertService.displayAlert('product added to cart', '#080');
  }
  increaseProductQuantity(id: number) {
    const productIndex = this.cart.products.findIndex((p) => p.id === id);
    if (productIndex === -1) return;
    const product = this.cart.products[productIndex];
    product.quantity += 1;
    const { price, discountPercentage } = product;
    this.increaseCartData(price, discountPercentage);
    this.alertService.displayAlert('one item added', '#080');
  }
  decreaseProductQuantity(id: number) {
    const productIndex = this.cart.products.findIndex((p) => p.id == id);
    if (productIndex === -1) return;
    const product = this.cart.products[productIndex];
    product.quantity -= 1;
    if (product.quantity === 0) {
      this.removeProduct(id);
      return;
    }
    const { price, discountPercentage } = product;
    this.decreaseCartData(price, discountPercentage);
    this.alertService.displayAlert('one item removed', '#080');
  }

  removeProduct(id: number) {
    const productIndex = this.cart.products.findIndex((p) => p.id == id);
    const { price, discountPercentage } = this.cart.products[productIndex];
    this.cart.products.splice(productIndex, 1);
    this.decreaseCartData(price, discountPercentage);
    this.alertService.displayAlert(
      'product removed from cart',
      'var(--warnColor)'
    );
  }
  getCart() {
    return this.cart;
  }
  getCartProductsIdAndQuan() {
    const products = this.cart.products.map((p) => {
      return { id: p.id, quantity: p.quantity };
    });
    return products;
  }
}
