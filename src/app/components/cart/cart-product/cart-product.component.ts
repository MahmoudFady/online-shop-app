import { CartService } from './../cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent implements OnInit {
  @Input() product!: {
    id: number;
    thumbnail: string;
    title: string;
    brand: string;
    price: number;
    discountPercentage: number;
    quantity: number;
  };
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
  onIncreaseProductQuantity() {
    this.cartService.increaseProductQuantity(this.product.id);
  }
  onDecreaseProductQuantity() {
    this.cartService.decreaseProductQuantity(this.product.id);
  }
  onRemoveProduct() {
    this.cartService.removeProduct(this.product.id);
  }
  getProductTotalPriceAfterDiscount() {
    const { price, quantity, discountPercentage } = this.product;
    return quantity * Math.round(price - (price * discountPercentage) / 100);
  }
}
