import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MyAppointmentComponent } from './my-appointment/my-appointment.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home/pacjent', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'pacjent', component: PatientComponent },
      { path: 'lekarz', component: DoctorComponent, canActivate: [AuthGuard], data: { expectedRole: 'doctor'} },
      { path: 'myappointment', component: MyAppointmentComponent, canActivate: [AuthGuard], data: { expectedRole: 'patient'} },
      { path: 'search', component: SearchPageComponent },
    ],
  },
  { path: 'shell', loadChildren: () => import('./module/admin-shell/admin-shell.module').then(m => m.AdminShellModule), canActivate: [AuthGuard], data: { expectedRole: 'admin'} },
  { path: 'shell/timetable/:id', loadChildren: () => import('./module/timetable/timetable.module').then(m => m.TimetableModule) }, 
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'search', component: SearchPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
