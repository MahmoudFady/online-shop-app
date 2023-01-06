import { CartService } from './../cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../shared/models/user.model';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:3001/';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  isAccountDoesNotExist(email: string): Promise<Boolean> {
    const promise = new Promise<Boolean>((resolve, reject) => {
      this.http.get<IUser[]>(`${this.baseUrl}users?email=${email}`).subscribe({
        next: (response) => {
          const exist = response.length === 0 ? false : true;
          exist ? reject('email already exist') : resolve(true);
        },
        error: (err) => {
          reject(err.message);
        },
      });
    });

    return promise;
  }
  signup(user: IUser) {
    return this.http.post(`${this.baseUrl}users`, user);
  }
  signin(email: string, password: string) {
    return this.http.get<IUser[]>(
      `${this.baseUrl}users?email=${email}&&password=${password}`
    );
  }
  setupSuccessAuth(id: number) {
    localStorage.setItem('userId', JSON.stringify(id));
    this.router.navigate(['/user/cart']);
  }
  getUserIdFromLocalStorage() {
    return localStorage.getItem('userId') || null;
  }
}
