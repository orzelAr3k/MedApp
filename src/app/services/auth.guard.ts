import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, } from '@angular/router';
import { LoginStatusService } from './login-status.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginStatus: LoginStatusService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (!this.loginStatus.login_status || expectedRole !== this.loginStatus.role) {

      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
