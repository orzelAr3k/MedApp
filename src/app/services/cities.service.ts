import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private webReqService: WebRequestService) { }

  getCities() {
    return this.webReqService.get(`cities`, {});
  }

  //payload = miasto
  addCity(payload: string) {
    return this.webReqService.post('cities', { payload });
  }
}
