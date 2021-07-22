import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginStatusService } from '../services/login-status.service';

import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl();
  hide = true;

  constructor( private authService: AuthService, private loginStatusService: LoginStatusService,
    private router: Router, fb: FormBuilder, public dialog: MatDialog,) {
      this.form = fb.group({
        email: this.email.value,
        password: this.password.value,
      })
    }

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login() {
    this.authService.login(this.form.value).subscribe((res) => {
      if (res.info === true && res.person === "patient") {
        this.loginStatusService.login_status = res.info;
        this.loginStatusService.role = res.person;
        this.loginStatusService.ID = res.patientId;
        this.router.navigate(['']);
      } else if (res.info === true && res.person === "doctor"){
        this.loginStatusService.login_status = res.info;
        this.loginStatusService.role = res.person;
        this.loginStatusService.ID = res.doctorId;
        this.router.navigate(['home/lekarz']);
      } else {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: '400px',
        });
        dialogRef.afterClosed().subscribe();
      }
    })
  }
}