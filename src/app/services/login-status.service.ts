import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class LoginStatusService{
  @LocalStorage('prop')
  public login_status!: boolean;

  @LocalStorage('prop')
  public role!: string;

  public ID!: string

  constructor() {}

  change_status() {
    this.login_status = !this.login_status;
    this.role = "";
    this.ID = "";
  }

}
