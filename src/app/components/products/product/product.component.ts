import { Subject } from 'rxjs';
import { CartService } from './../../cart/cart.service';
import { IProduct } from '../../shared/models/product.model';
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
    this.cartService.increaseProductQuantity(this.product.id);
    this.productQuantity += 1;
  }
  onDecrproductQuan() {
    this.cartService.decreaseProductQuantity(this.product.id);
    this.productQuantity -= 1;
  }
  onAddProduct() {
    const { id, thumbnail, title, price, brand, discountPercentage } =
      this.product;
    this.cartService.pushProductToCart({
      id,
      thumbnail,
      title,
      brand,
      price,
      discountPercentage,
    });
    this.isProductInCart = true;
    this.productQuantity = 1;
  }
}
