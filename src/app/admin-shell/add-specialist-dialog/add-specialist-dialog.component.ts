import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

//import modelu danych
import { SpecialistElement } from '../../model/specialist.model';

@Component({
  selector: 'app-add-specialist-dialog',
  templateUrl: './add-specialist-dialog.component.html',
  styleUrls: ['./add-specialist-dialog.component.scss'],
})
export class AddSpecialistDialogComponent implements OnInit {
  form!: FormGroup;

  name = new FormControl();
  surname = new FormControl();
  specialization = new FormControl();
  description = new FormControl();
  city = new FormControl();
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl();
  hide = true;

  specializationList: string[] = [
    'Alergologia',
    'Dermatologia',
    'Endokrynologia',
    'Kardiochirurgia',
    'Okulistyka',
    'Onkologia',
    'Ortopedia',
    'Pediatria',
    'Psychiatria',
  ];

  constructor(
    fb: FormBuilder,
    public dialogRef: MatDialogRef<AddSpecialistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SpecialistElement
  ) {
    this.form = fb.group({
      name: this.name.value,
      surname: this.surname.value,
      specialization: this.specialization.value,
      description: this.description.value,
      city: this.city.value,
      email: this.email.value,
      password: this.password.value,
    });
  }

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }
}
