import { CartService, ICart } from './cart.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: ICart;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }
  onAddProduct(id: number, price: number) {
    this.cartService.addProduct({
      id,
      thumbnail: '',
      title: '',
      price,
    });
  }
  onDeleteProduct(id: number) {
    this.cartService.removeProduct(id);
  }
}
