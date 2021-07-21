import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from './../services/login-status.service';
import { SearchService } from '../services/search.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  login_status!: boolean;
  role!: string;


  selected = new FormControl(0);
  DATA: Appointment[] = [];
  dateList: string[] = [];

  constructor(
    private loginStatusService: LoginStatusService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.login_status = this.loginStatusService.login_status;
    this.role = this.loginStatusService.role;

    this.searchService.findVisit().subscribe((data) => {
      this.DATA.length = 0;
      this.dateList.length = 0;
      data.forEach((elem: any) => {
        let date = new Date(elem.date).toLocaleDateString();
        if (!this.dateList.includes(date)) {
          this.dateList.push(date);
        }

        this.DATA.push(elem);
      });
      console.log(this.dateList);
    });
  }

  logout() {
    this.loginStatusService.change_status();
    this.ngOnInit();
  }
}

export interface Appointment {
  date: Date;
  hours: Array<{ hour: string; patient: string; description: string }>;
}
