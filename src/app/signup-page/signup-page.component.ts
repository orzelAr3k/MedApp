import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  form!: FormGroup;

  name = new FormControl();
  surname = new FormControl();
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl();
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      name: this.name.value,
      surname: this.surname.value,
      email: this.email.value,
      password: this.password.value,
    });
  }

  ngOnInit(): void {}
  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  signup() {
    this.authService.signup(this.form.value).subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
