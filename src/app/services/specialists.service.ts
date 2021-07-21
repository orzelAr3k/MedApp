import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { ObjectID } from 'bson';

//import modelu danych
import { SpecialistElement } from '../model/specialist.model';

@Injectable({
  providedIn: 'root',
})
export class SpecialistsService {
  constructor(private webReqService: WebRequestService) {}

  getListOfSpecialists() {
    return this.webReqService.get('specialists', {});
  }

  addNewSpecialists(payload: Object) {
    return this.webReqService.post('specialists', { payload });
  }

  changeSpecialists(payload: Object, _id: ObjectID) {
    return this.webReqService.patch(`specialists?id=${_id}`, { payload });
  }

  deleteSpecialist(_id: ObjectID) {
    return this.webReqService.delete(`specialists?id=${_id}`);
  }
}
