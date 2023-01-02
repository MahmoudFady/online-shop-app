import { AlertService } from './../alert/alert.service';
import { Subject } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
export interface ICart {
  userId?: number;
  totalPrice: number;
  totalQuantity: number;
  products: {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
    quantity: number;
  }[];
}
@Injectable({ providedIn: 'root' })
export class CartService {
  cart: ICart = {
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
  };
  cart$ = new Subject<ICart>();
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
    this.cart$.next(this.cart);
  }
  pushProductToCart(product: {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
  }) {
    this.cart.products.push({
      ...product,
      quantity: 1,
    });
    this.cart.totalPrice += product.price;
    this.cart.totalQuantity += 1;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart$.next(this.cart);
  }
  plusProudctQuantity(id: number) {
    const productIndex = this.cart.products.findIndex((p) => p.id === id);
    if (productIndex === -1) return;
    const products = this.cart.products;
    products[productIndex].quantity += 1;
    this.cart.totalPrice += products[productIndex].price;
    this.cart.totalQuantity += 1;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart$.next(this.cart);
    this.alertService.displayAlert('one item added', '#080');
  }
  minusProudctQuantity(id: number) {
    const productIndex = this.cart.products.findIndex((p) => p.id === id);
    if (productIndex === -1) return;
    const products = this.cart.products;
    products[productIndex].quantity -= 1;
    this.cart.totalPrice -= products[productIndex].price;
    this.cart.totalQuantity -= 1;
    if (products[productIndex].quantity === 0) {
      products.splice(productIndex, 1);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart$.next(this.cart);
    this.alertService.displayAlert('one item removed', 'var(--warnColor)');
  }
  addProduct(product: {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
  }) {
    const productIndex = this.cart.products.findIndex(
      (p) => p.id === product.id
    );
    if (productIndex == -1) {
      this.cart.products.push({ ...product, quantity: 1 });
    } else {
      this.cart.products[productIndex].quantity += 1;
    }
    this.cart.totalPrice += product.price;
    this.cart.totalQuantity += 1;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart$.next(this.cart);
    this.alertService.displayAlert('product add to cart', '#080');
  }
  removeProduct(id: number) {
    const productIndex = this.cart.products.findIndex((p) => p.id == id);
    this.cart.products[productIndex].quantity -= 1;
    this.cart.totalPrice -= this.cart.products[productIndex].price;
    this.cart.totalQuantity -= 1;
    if (this.cart.products[productIndex].quantity === 0) {
      this.cart.products.splice(productIndex, 1);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart$.next(this.cart);
    this.alertService.displayAlert('product removed', 'var(--warnColor)');
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
  getUpdatedCart() {
    return this.cart$.asObservable();
  }
}
