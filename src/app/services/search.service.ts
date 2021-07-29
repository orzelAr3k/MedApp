import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  data!: any;

  constructor(private webReqService: WebRequestService) {}

  findVisit() {
    return this.webReqService.get('search', this.data);
  }

  makeAppointment(payload: Object) {
    return this.webReqService.patch('search', { payload });
  }
}
