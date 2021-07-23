import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
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
    'Laryngologia',
    'Kardiologia',
    'Foniatria',
    'Anestezjologia',
    'Ortopedia',
    'Dermatologia',
    'Endokrynologia',
    'Neurologia',
  ];

  timeList: string[] = [];

  constructor(fb: FormBuilder, private searchService: SearchService) {
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
    this.calculateTime();
  }

  sendData() {
    this.searchService.data = this.form.value;
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
}
