import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { ObjectID } from 'bson';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private webReqService: WebRequestService) { }

  getDoctorTimetable(id: ObjectID) {
    return this.webReqService.get(`doctor?id=${id}`, {});
  }
}
