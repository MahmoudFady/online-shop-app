import { ProductService } from './product.service';
import { IProduct } from '../shared/models/product.model';
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
  getProductByPagination(incr: number) {
    this.pageIndex = incr + this.pageIndex;
    this.productService.getProductsByPageIndex(this.pageIndex).subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }
}
