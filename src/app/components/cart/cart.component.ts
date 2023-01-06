import { ICart } from '../shared/models/cart.model';
import { CartService } from './cart.service';
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
    this.cartService.getCart$().subscribe({
      next: (cart) => {
        this.cart = cart;
      },
    });
  }
}
