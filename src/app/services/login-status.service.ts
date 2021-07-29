import { Injectable } from '@angular/core';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';


@Injectable({
  providedIn: 'root',
})
export class LoginStatusService{
 
  @SessionStorage('prop')
  public login_status!: boolean;

  @SessionStorage('role')
  public role!: string;

  @SessionStorage('id')
  public ID!: string;

  constructor() {}

  change_status() {
    this.login_status = !this.login_status;
    this.role = "";
    this.ID = "";
  }

}
