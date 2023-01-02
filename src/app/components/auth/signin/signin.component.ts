import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth-shared-style.css', './signin.component.css'],
})
export class SigninComponent implements OnInit {
  loading = false;
  signinErrMsg!: string | null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  onSignin(f: NgForm) {
    if (f.invalid) return;
    this.loading = true;
    const { email, password } = f.value;
    this.authService
      .isAccountDoesNotExist(email)
      .then(() => {
        this.loading = false;
        this.signinErrMsg = "account doesn't exist";
      })
      .catch(() => {
        this.authService.signin(email, password).subscribe({
          next: (users) => {
            this.loading = false;
            if (users.length == 0) {
              this.signinErrMsg = 'wrong password';
              return;
            } else {
              this.signinErrMsg = null;
            }
          },
          error: (err) => {
            this.signinErrMsg = err.message;
            this.loading = false;
          },
        });
      });
  }
}
