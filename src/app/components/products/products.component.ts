import { ProductService } from './product.service';
import { IProduct } from './product.model';
import { Component } from '@angular/core';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  pageIndex = 1;
  products: IProduct[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProductsByPageIndex(this.pageIndex).subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }
  getProducts(inc: number) {
    this.pageIndex = inc + this.pageIndex;
    this.productService.getProductsByPageIndex(this.pageIndex).subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }
}
