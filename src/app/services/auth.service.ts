import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { LoginStatusService } from './login-status.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate{
  constructor(private webService: WebRequestService, private loginStatus: LoginStatusService, public router: Router) {}

  signup(payload: Object) {
    return this.webService.post('auth/signup', { payload });
  }

  login(payload: Object) {
    return this.webService.post('auth/login', { payload });
  }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (!this.loginStatus.login_status || expectedRole !== this.loginStatus.role) {

      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
