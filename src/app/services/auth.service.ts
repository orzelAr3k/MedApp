import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { Router } from '@angular/router';
import { LoginStatusService } from './login-status.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  constructor(private webService: WebRequestService, private loginStatus: LoginStatusService, public router: Router) {}

  // payload = { imię, nazwisko, email, hasło }
  signup(payload: Object) {
    return this.webService.post('auth/signup', { payload });
  }

  // payload = { email, hasło }
  login(payload: Object) {
    return this.webService.post('auth/login', { payload });
  }
}
