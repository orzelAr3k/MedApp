import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginStatusService } from './../services/login-status.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.component.html',
  styleUrls: ['./my-appointment.component.scss']
})
export class MyAppointmentComponent implements OnInit {

  login_status!: boolean;
  role!: string;
  ID!: string;
  selected = new FormControl(0);
  DATA: Record<string, Appointment[]> = {};
  dateList: string[] = [];

  constructor(private loginStatusService: LoginStatusService,
    private patientService: PatientService,) { }

  ngOnInit(): void {
    this.login_status = this.loginStatusService.login_status;
    this.role = this.loginStatusService.role;
    this.ID = this.loginStatusService.ID;

    this.patientService.getPatientTimetable(this.ID).subscribe((data) => {
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