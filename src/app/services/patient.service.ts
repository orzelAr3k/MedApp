import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private webReqService: WebRequestService) { }

  getPatientTimetable(id: string) {
    return this.webReqService.get(`patient?id=${id}`, {});
  }

  cancelAppointment(payload: Object) {
    return this.webReqService.patch(`patient`, { payload })
  }
}
