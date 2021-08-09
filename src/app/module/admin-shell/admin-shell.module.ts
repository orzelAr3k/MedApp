import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminShellComponent } from 'src/app/admin-shell/admin-shell.component';
import { AdminShellRoutingModule } from './admin-shell-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [AdminShellComponent],
  imports: [
    CommonModule,
    AdminShellRoutingModule,
    AngularMaterialModule,
  ]
})
export class AdminShellModule { }
