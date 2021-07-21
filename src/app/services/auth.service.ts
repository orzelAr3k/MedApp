import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from '../web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService) { }

  signup(payload: Object) {
    return this.webService.post('auth/signup', { payload });
  }

  login(payload: Object) {
    return this.webService.post('auth/login', { payload });
  }

}
