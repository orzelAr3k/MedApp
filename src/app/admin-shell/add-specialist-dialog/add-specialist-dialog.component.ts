import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { SpecializationService } from 'src/app/services/specialization.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-add-specialist-dialog',
  templateUrl: './add-specialist-dialog.component.html',
  styleUrls: ['./add-specialist-dialog.component.scss'],
})
export class AddSpecialistDialogComponent implements OnInit {
  form!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  specializationList!: string[];
  citiesList!: string[];

  constructor(
    fb: FormBuilder,
    private specializationService: SpecializationService,
    private citiesService: CitiesService,
    public dialogRef: MatDialogRef<AddSpecialistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SpecialistElement
  ) {
    this.form = fb.group({
      name: '',
      surname: '',
      specialization: '',
      description: '',
      city: '',
      email: this.email,
      password: '',
      spec: '',
    });
  }

  ngOnInit(): void {
    this.loadSpecializations();
    this.loadCities();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Błędny format e-mail';
    }

    return this.email.hasError('email') ? 'Błędy adres e-mail' : '';
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }

  loadSpecializations() {
    this.specializationService
      .getSpecializations()
      .subscribe((specializationList) => {
        this.specializationList = specializationList;
      });
  }

  addSpecialization() {
    if (this.form.value.spec !== '') {
      this.specializationService
        .addSpecialization(this.form.value.spec)
        .subscribe((result) => {
          if (result) {
            this.ngOnInit();
          }
        });
      this.form.value.spec = '';
    }
  }

  loadCities() {
    this.citiesService.getCities().subscribe((citiesList) => {
      this.citiesList = citiesList;
    });
  }

  addCity() {
    if (this.form.value.spec !== '') {
      this.citiesService
        .addCity(this.form.value.spec)
        .subscribe((result) => {
          if (result) {
            this.ngOnInit();
          }
        });
      this.form.value.spec = '';
    }
  }
}
