import { IProduct } from './product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:3001/';
  products: any[] = [];
  constructor(private http: HttpClient) {}
  getProductsByPageIndex(pageIndex = 1) {
    return this.http.get<IProduct[]>(
      this.baseUrl + 'products?_limit=12&_page=' + pageIndex
    );
  }
}
