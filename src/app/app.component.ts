import { CartService } from './components/cart/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.initialCart();
  }
}
