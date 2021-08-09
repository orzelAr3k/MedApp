import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { SpecializationService } from '../services/specialization.service';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  form!: FormGroup;
  cityList!: string[];
  specializationList!: string[];
  timeList: string[] = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  
  constructor(
    private specializationService: SpecializationService,
    private citiesService: CitiesService,
    fb: FormBuilder,
    private searchService: SearchService
  ) {
    this.form = fb.group({
      city: '',
      specialization: '',
      spec: '',
      timeStart: '',
      timeEnd: '',
      dateStart: '',
      dateEnd: '',
    });
  }

  ngOnInit(): void {
    this.calculateTime();
    this.specializationService.getSpecializations().subscribe(specializationList => {
      this.specializationList = specializationList;
    })
    this.citiesService.getCities().subscribe(citiesList => {
      this.cityList = citiesList;
    })
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
