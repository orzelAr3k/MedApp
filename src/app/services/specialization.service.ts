import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
  constructor(private webReqService: WebRequestService) {}

  getSpecializations() {
    return this.webReqService.get(`specializations`, {});
  }

  // payload = specializacja
  addSpecialization(payload: string) {
    return this.webReqService.post('specializations', { payload });
  }
}
