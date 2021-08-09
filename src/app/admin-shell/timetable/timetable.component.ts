import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimetableDialogComponent } from './timetable-dialog/timetable-dialog.component';
import { TimelineService } from '../../services/timeline.service';
import { ObjectID } from 'bson';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  doctorId!: ObjectID;
  doctorName!: string;

  selected = new FormControl(0);

  DATA: Record<string, Appointment[]> = {};
  dateList: string[] = [];

  constructor(
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private timelineService: TimelineService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.doctorId = params.get('id');
    });

    this.timelineService.getTimeline(this.doctorId).subscribe((data) => {
      this.doctorName = data.doctorName.join(' ');
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
        this.DATA[date].push({appointmentId: day._id, date: day.date, hour: day.hour, name: day.patient, description: day.description, city: day.city})
      });
    });
  }

  addSchedule() {
    const dialogRef = this.dialog.open(TimetableDialogComponent, {
      width: '500px',
      height: '380px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.timelineService
          .addAppointment(this.doctorId, result)
          .subscribe((data) => {
            this.ngOnInit();
          });
      }
    });
  }

  deleteSchedule(appointment: Appointment) {
    this.timelineService.deleteAppointment(this.doctorId, appointment).subscribe((data) => {
      this.ngOnInit();
    });
  }
}