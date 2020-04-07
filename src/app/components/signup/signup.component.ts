import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  regForm: FormGroup;
  passwordVisible: boolean;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.passwordVisible = false;

    this.regForm = new FormGroup({
      name: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required
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
  }

  switchPasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onRegister() {
    this.sharedService.startLoader('Registering user');
    this.authService.createUser(
      this.regForm.value.name,
      this.regForm.value.email,
      this.regForm.value.password,
    );
  }
}
