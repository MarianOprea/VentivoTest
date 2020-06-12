import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, merge } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginSub: Subscription;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);
  hide = true;
  credentialsInvalid = false;

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  ngOnInit(): void {
    merge(
      this.emailFormControl.valueChanges,
      this.passwordFormControl.valueChanges
    ).subscribe(res => this.credentialsInvalid = false);
  }

  login() {
    this.loginSub = this.auth
      .login({
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      })
      .subscribe({
        next: (res) => this.router.navigate(['/']),
        error: (err) => this.credentialsInvalid = true,
      });
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
