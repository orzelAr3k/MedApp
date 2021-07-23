import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { HomeComponent } from './home/home.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TimetableComponent } from './admin-shell/timetable/timetable.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MyAppointmentComponent } from './my-appointment/my-appointment.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/pacjent', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'pacjent', component: PatientComponent },
      { path: 'lekarz', component: DoctorComponent },
      { path: 'myappointment', component: MyAppointmentComponent },
    ],
  },
  { path: 'shell', component: AdminShellComponent},
  { path: 'shell/timetable/:id', component: TimetableComponent }, 
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'search', component: SearchPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
