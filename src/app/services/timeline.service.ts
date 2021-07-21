import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { ObjectID } from 'bson';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  constructor(private webReqService: WebRequestService) {}

  getTimeline(_id: ObjectID) {
    return this.webReqService.get(`timetable?id=${_id}`, {});
  }

  addAppointment(_id: ObjectID, payload: Object) {
    return this.webReqService.post(`timetable?id=${_id}`, { payload });
  }

  deleteAppointment(_id: ObjectID, payload: Object) {
    return this.webReqService.delete(`timetable?id=${_id}`, { payload });
  }
}
