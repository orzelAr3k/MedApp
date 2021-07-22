import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from './../services/login-status.service';
import { SearchService } from '../services/search.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

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

  form!: FormGroup;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  specialization = new FormControl();
  city = new FormControl();
  time = new FormControl();
  timeStart = new FormControl();
  timeEnd = new FormControl();
  dateStart = new FormControl();
  dateEnd = new FormControl();

  cityList: string[] = [
    'Kraków',
    'Warszawa',
    'Poznań',
    'Gdańsk',
    'Wrocław',
    'Zakopane',
  ];

  specializationList: string[] = [
    'Laryngolog',
    'Kardiolog',
    'Foniatra',
    'Anestezjolog',
    'Ortopeda',
    'Dermatolog',
    'Endokrynolog',
    'Neurolog',
  ];

  timeList: string[] = [];

  constructor(
    private loginStatusService: LoginStatusService,
    private searchService: SearchService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      city: this.city.value,
      specialization: this.specialization.value,
      timeStart: this.timeStart.value,
      timeEnd: this.timeEnd.value,
      dateStart: this.dateStart.value,
      dateEnd: this.dateEnd.value,
    });
  }

  ngOnInit(): void {
    this.login_status = this.loginStatusService.login_status;
    this.role = this.loginStatusService.role;
    this.calculateTime();

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
        this.DATA[date].push({
          date: day.date,
          hour: day.hour,
          doctor_name: data.doctors[day.doctorId].name,
          doctor_surname: data.doctors[day.doctorId].surname,
          city: data.doctors[day.doctorId].city,
          description: data.doctors[day.doctorId].description,
        });
      });
      console.log(this.DATA);
      this.dateList.sort();
    });
  }

  calculateTime() {
    for (let i: number = 0; i < 24; i++) {
      this.timeList.push(`${i}:00`);
      this.timeList.push(`${i}:30`);
    }
  }

  sendData() {
    this.searchService.data = this.form.value;
    this.ngOnInit();
  }

  logout() {
    this.loginStatusService.change_status();
    this.ngOnInit();
  }
}

export interface Appointment {
  date: Date;
  hour: string;
  doctor_name: string;
  doctor_surname: string;
  city: string;
  description: string;
}
