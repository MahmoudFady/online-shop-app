import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth-shared-style.css', './signup.component.css'],
})
export class SignupComponent implements OnInit {
  laoding = false;
  signupErrMsg!: string | null;
  signupForm: FormGroup = new FormGroup({
    id: new FormControl(Math.random()),
    name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, this.validatePhoneNum]),
    address: new FormGroup({
      country: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
    }),
    password: new FormControl(null, [Validators.required]),
  });
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  getFormCtrl(name: string) {
    return this.signupForm.get(name);
  }
  validatePhoneNum(ctrl: FormControl): { [k: string]: boolean } | null {
    const regex = new RegExp(/^((01)[0125][0-9]{8})$/);
    const value = ctrl.value;
    if (!regex.test(value)) {
      return { invalidPhoneNum: true };
    }
    return null;
  }
  async onSignup() {
    this.laoding = true;
    if (this.signupForm.invalid) return;
    const user = this.signupForm.value;
    const isAccountDoesNotExist = await this.authService.isAccountDoesNotExist(
      user.email
    );
    if (!isAccountDoesNotExist) {
      this.signupErrMsg = 'account already exist';
      this.laoding = false;
      this.getFormCtrl('email')?.reset();
      return;
    }
    this.authService.signup(user).subscribe({
      next: () => {
        this.signupErrMsg = null;
        this.laoding = false;
        console.log('signup success');

        this.authService.setupSuccessAuth(this.signupForm.value.id);
      },
      error: (err) => {
        this.signupErrMsg = err.message;
        this.laoding = false;
      },
    });
  }
}
