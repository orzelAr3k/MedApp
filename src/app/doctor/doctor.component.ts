import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  selected = new FormControl(0);
  DATA: Record<string, Appointment[]> = {};
  dateList: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Appointment {
  date: Date;
  hour: string, 
  doctor_name: string;
  doctor_surname: string;
  description: string, 
}