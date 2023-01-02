import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { BannerComponent } from './components/home/banner/banner.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/products/product/product.component';
import { ProductSingleComponent } from './components/products/product-single/product-single.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BannerComponent,
    ProductsComponent,
    ProductComponent,
    ProductSingleComponent,
    CartComponent,
    SigninComponent,
    SignupComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
