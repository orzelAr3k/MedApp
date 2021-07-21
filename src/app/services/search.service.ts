import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  data!: any;

  constructor(private webReqService: WebRequestService) { 
  }

  findVisit() {
    console.log(this.data);
    return this.webReqService.get('search', this.data);
  }

}
