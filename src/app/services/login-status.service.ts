import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';


@Injectable({
  providedIn: 'root',
})
export class LoginStatusService{
 
  @LocalStorage('prop')
  public login_status!: boolean;

  @LocalStorage('role')
  public role!: string;

  @LocalStorage('id')
  public ID!: string;

  constructor() {}

  change_status() {
    this.login_status = !this.login_status;
    this.role = "";
    this.ID = "";
  }

}
