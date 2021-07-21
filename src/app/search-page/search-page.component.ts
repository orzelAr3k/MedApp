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
  DATA: Record<string, Appointment[]> = {};
  dateList: string[] = [];

  constructor(
    private loginStatusService: LoginStatusService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.login_status = this.loginStatusService.login_status;
    this.role = this.loginStatusService.role;

    this.searchService.findVisit().subscribe((data) => {
      this.dateList.length = 0;
      this.DATA = {};

      data.day.forEach((day: any) => {
        let date = new Date(day.date).toLocaleDateString();
        if (!this.dateList.includes(date)) {
          this.dateList.push(date);
        }
        if (!this.DATA[date]) {
          this.DATA[date] = [];
        }
        this.DATA[date].push({date: day.date, hour: day.hour, patient: "", description: "" })
      });
    });
  }

  logout() {
    this.loginStatusService.change_status();
    this.ngOnInit();
  }
}

export interface Appointment {
  date: Date;
  hour: string, 
  patient: string, 
  description: string, 
}
