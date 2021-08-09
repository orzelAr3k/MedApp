import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from './../services/login-status.service';
import { SearchService } from '../services/search.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SpecializationService } from '../services/specialization.service';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  login_status!: boolean;
  role!: string;
  ID!: string;
  selected = new FormControl(0);
  DATA: Record<string, Appointment[]> = {};
  dateList: string[] = [];
  timeList: string[] = [];

  cityList!: string[];
  specializationList!: string[]
  form!: FormGroup;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  constructor(
    private loginStatusService: LoginStatusService,
    private searchService: SearchService,
    private specializationService: SpecializationService,
    private citiesService: CitiesService,
    fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.form = fb.group({
      city: '',
      specialization: '',
      timeStart: '',
      timeEnd: '',
      dateStart: '',
      dateEnd: '',
    });
  }

  ngOnInit(): void {
    this.login_status = this.loginStatusService.login_status;
    this.role = this.loginStatusService.role;
    this.ID = this.loginStatusService.ID;
    this.calculateTime();
    this.specializationService.getSpecializations().subscribe(specializationList => {
      this.specializationList = specializationList;
    })
    this.citiesService.getCities().subscribe(citiesList => {
      this.cityList = citiesList;
    })

    if (this.searchService.data == undefined) {
      this.searchService.data = this.form.value;
    }

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
          appointmentId: day._id,
          date: day.date,
          hour: day.hour,
          doctor_name: data.doctors[day.doctorId].name,
          doctor_surname: data.doctors[day.doctorId].surname,
          city: data.doctors[day.doctorId].city,
          specialization: data.doctors[day.doctorId].specialization,
          description: data.doctors[day.doctorId].description,
        });
      });
    });
  }

  calculateTime() {
    for (let i: number = 0; i < 24; i++) {
      if (i < 10) {
        this.timeList.push(`0${i}:00`);
        this.timeList.push(`0${i}:30`);
      } else {
        this.timeList.push(`${i}:00`);
        this.timeList.push(`${i}:30`);
      }
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

  makeAppointment(appointment: Appointment) {
    if (this.ID == '' || this.role !== "patient") {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        data: { text: "Błąd! Upewnij się że jesteś odpowiednio zalogowany!" }
      });
      dialogRef.afterClosed().subscribe();
    } else {
      const dialogRef = this.dialog.open(AppointmentDialogComponent, {
        width: '700px',
        height: '400px',
        data: {appointment, id: this.ID}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}
export interface Appointment {
  appointmentId: string;
  date: Date;
  hour: string;
  doctor_name: string;
  doctor_surname: string;
  city: string;
  specialization: string;
  description: string;
}
