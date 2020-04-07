import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordVisible: boolean;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.passwordVisible = false;

    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    });
  }

  ngOnInit(): void {
    this.sharedService.stopLoader();
  }

  switchPasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onLogin() {
    this.sharedService.startLoader('Logging in');
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

}
