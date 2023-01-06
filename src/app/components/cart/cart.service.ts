import { Subject } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AlertService } from '../shared/alert/alert.service';
import { ICart } from '../shared/models/cart.model';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly baseUrl = 'http://localhost:3001/';
  private readonly defualtCart: ICart = {
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
  };
  private cart$ = new Subject<ICart>();
  userId!: number | null;
  cart: ICart = this.defualtCart;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertService: AlertService
  ) {}
  setCart$() {
    this.cart$.next(this.cart);
  }
  getCart$() {
    return this.cart$.asObservable();
  }
  getCartFromLocalStorage() {
    return (
      JSON.parse(localStorage.getItem('cart') as string) || this.defualtCart
    );
  }
  setCart() {
    this.userId =
      this.authService.getUserIdFromLocalStorage() as unknown as number;
    if (this.userId) {
      this.getCartFromDB(this.userId);
    } else {
      this.cart = this.getCartFromLocalStorage() as ICart;
      this.setCart$();
    }
  }
  getPriceAfterDiscount(price: number, discount: number) {
    return Math.round(price - price * (discount / 100));
  }
  private increaseCartData(price: number, discount: number) {
    this.cart.totalPrice += this.getPriceAfterDiscount(price, discount);
    this.cart.totalQuantity += 1;
    if (!this.userId) localStorage.setItem('cart', JSON.stringify(this.cart));
    else this.putAuthCart();
  }
  private decreaseCartData(price: number, discount: number, quantity = 1) {
    const minusedPrice = quantity * this.getPriceAfterDiscount(price, discount);
    this.cart.totalPrice -= minusedPrice;
    this.cart.totalQuantity -= quantity;
    if (!this.userId) localStorage.setItem('cart', JSON.stringify(this.cart));
    else this.putAuthCart();
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
    if (this.userId) {
      this.postAuthCart();
    }
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
    if (productIndex === -1) return false;
    const product = this.cart.products[productIndex];
    product.quantity -= 1;
    if (product.quantity === 0) return this.removeProduct(id);
    const { price, discountPercentage } = product;
    this.decreaseCartData(price, discountPercentage);
    this.alertService.displayAlert('one item removed', '#080');
    return true;
  }
  doRemoveProduct(id: number) {
    const productIndex = this.cart.products.findIndex((p) => p.id == id);
    const { price, discountPercentage, quantity } =
      this.cart.products[productIndex];
    this.cart.products.splice(productIndex, 1);
    this.decreaseCartData(
      price,
      discountPercentage,
      quantity == 0 ? 1 : quantity
    );
    this.alertService.displayAlert(
      'product removed from cart',
      'var(--warnColor)'
    );

    return true;
  }
  removeProduct(id: number) {
    this.doRemoveProduct(id);
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
  getCartFromDB(userId: number) {
    this.http.get<ICart>(this.baseUrl + 'carts/' + userId).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.setCart$();
      },
      error: (err) => {
        this.cart.id = this.userId as number;
        this.setCart$();
      },
    });
  }
  putAuthCart() {
    this.http.put(this.baseUrl + 'carts/' + this.userId, this.cart).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
  postAuthCart() {
    this.http.post(this.baseUrl + 'carts/', this.cart).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
  deleteAuthCart() {
    this.http.delete(this.baseUrl + 'carts/' + this.userId).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
