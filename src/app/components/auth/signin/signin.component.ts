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
    const { email, password } = f.value;
    this.loading = true;
    this.authService.signin(email, password).subscribe({
      next: (users) => {
        this.loading = false;
        if (users.length === 0) {
          this.signinErrMsg = 'wrong email or password';
          return;
        }
        this.authService.setupSuccessAuth(users[0].id);
      },
    });
  }
}
