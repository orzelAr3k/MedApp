import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit {

  form!: FormGroup;
  description = new FormControl();

  constructor(private fb: FormBuilder ,public dialogRef: MatDialogRef<AppointmentDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any, private searchService: SearchService) { 
    this.form = this.fb.group({
      description: this.description.value,
    })
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  confirm() {
    this.searchService.makeAppointment({ appointmentId: this.data.appointment.appointmentId, patientId: this.data.id, description: this.form.value.description }).subscribe();
    this.dialogRef.close();
  }

}
