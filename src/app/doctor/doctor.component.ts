import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginStatusService } from './../services/login-status.service';
import { DoctorService } from '../services/doctor.service';
import { ObjectID } from 'bson';



@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  login_status!: boolean;
  role!: string;
  ID!: string;
  selected = new FormControl(0);
  DATA: Record<string, Appointment[]> = {};
  dateList: string[] = [];


  constructor(private loginStatusService: LoginStatusService,
    private doctorService: DoctorService,) { }

  ngOnInit(): void {
    this.login_status = this.loginStatusService.login_status;
    this.role = this.loginStatusService.role;
    this.ID = this.loginStatusService.ID;

    this.doctorService.getDoctorTimetable(this.ID).subscribe((data) => {
      this.dateList.length = 0;
      this.DATA = {};

      data.forEach((day: any) => {
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
          patient_name: day.patient,
          description: day.description,
        });
      });
    });
  }

  cancelAppointment(appointment: Appointment) {
    this.doctorService.cancelAppointment(appointment.appointmentId).subscribe(() => {
      this.ngOnInit();
    });
  }

}

export interface Appointment {
  appointmentId: string;
  date: Date;
  hour: string;
  patient_name: string;
  description: string;
}