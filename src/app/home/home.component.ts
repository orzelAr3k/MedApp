import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from './../services/login-status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  login_status!: boolean
  role!: string;

  constructor(private loginStatusService: LoginStatusService) {}

  ngOnInit(): void {
    this.login_status = this.loginStatusService.login_status;
    this.role = this.loginStatusService.role;
  }

  logout() {
    this.loginStatusService.change_status();
    this.ngOnInit();
  }
}
