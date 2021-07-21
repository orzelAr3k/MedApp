import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-timetable-dialog',
  templateUrl: './timetable-dialog.component.html',
  styleUrls: ['./timetable-dialog.component.scss']
})
export class TimetableDialogComponent implements OnInit {

  timeList: string[] = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  time_start = new FormControl();
  time_end = new FormControl();


  constructor(public dialogRef: MatDialogRef<TimetableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date_start: string, date_end: string, hour_start: string, hour_end: string }) { }

  ngOnInit(): void {
    this.calculateTime();  
  }

  onNoClick() {
    this.dialogRef.close();
  }

  calculateTime() {
    for (let i: number = 0; i < 24; i ++) {
      this.timeList.push(`${i}:00`)
      this.timeList.push(`${i}:30`)
    }
  }

}
