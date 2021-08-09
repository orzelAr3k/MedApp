import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableComponent } from 'src/app/admin-shell/timetable/timetable.component';
import { TimetableRoutingModule } from './timetable-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [TimetableComponent],
  imports: [CommonModule, TimetableRoutingModule, AngularMaterialModule],
})
export class TimetableModule {}
