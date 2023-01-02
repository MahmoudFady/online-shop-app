import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: number;
  address: {
    country: string;
    state: string;
    city: string;
  };
  password: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:3001/';
  constructor(private http: HttpClient) {}
  isAccountDoesNotExist(email: string): Promise<Boolean> {
    const promise = new Promise<Boolean>((resolve, reject) => {
      this.http.get<IUser[]>(`${this.baseUrl}users?email=${email}`).subscribe({
        next: (response) => {
          if (response.length == 0) {
            resolve(true);
          }
          resolve(false);
        },
        error: (err) => {
          reject(false);
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
  getSavedUserId() {
    return (localStorage.getItem('userId') as unknown as number) || null;
  }
}
