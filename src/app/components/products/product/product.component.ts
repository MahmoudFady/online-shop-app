import { Subject } from 'rxjs';
import { CartService } from './../../cart/cart.service';
import { IProduct } from './../product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product!: IProduct;
  productQuantity!: number;
  isProductInCart = false;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    const productIndex = this.cartService
      .getCartProductsIdAndQuan()
      .findIndex((p) => p.id === this.product.id);
    this.isProductInCart = productIndex === -1 ? false : true;
    this.productQuantity =
      this.cartService.getCartProductsIdAndQuan()[productIndex]?.quantity;
  }
  onIncPooductQuan() {
    this.cartService.plusProudctQuantity(this.product.id);
    this.productQuantity += 1;
  }
  onDecrproductQuan() {
    this.cartService.minusProudctQuantity(this.product.id);
    this.productQuantity -= 1;
  }
  onAddProduct() {
    const { id, thumbnail, title, price } = this.product;
    this.cartService.addProduct({ id, thumbnail, title, price });
    this.isProductInCart = true;
    this.productQuantity = 1;
  }
}
