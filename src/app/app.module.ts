import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AddSpecialistDialogComponent } from './admin-shell/add-specialist-dialog/add-specialist-dialog.component';
import { EditSpecialistDialogComponent } from './admin-shell/edit-specialist-dialog/edit-specialist-dialog.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TimetableDialogComponent } from './admin-shell/timetable/timetable-dialog/timetable-dialog.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AppointmentDialogComponent } from './search-page/appointment-dialog/appointment-dialog.component';
import { MyAppointmentComponent } from './my-appointment/my-appointment.component';

// import angular material
import { AngularMaterialModule } from './module/angular-material/angular-material.module';

//services
import { HttpClientModule } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { doctorReducer } from './Store/reducers/doctor.reducer';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    DoctorComponent,
    AddSpecialistDialogComponent,
    EditSpecialistDialogComponent,
    SignupPageComponent,
    LoginPageComponent,
    TimetableDialogComponent,
    SearchPageComponent,
    ErrorDialogComponent,
    AppointmentDialogComponent,
    MyAppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    StoreModule.forRoot({ doctorReducer: doctorReducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
  ],
  providers: [WebRequestService],
  bootstrap: [AppComponent],
  entryComponents: [AddSpecialistDialogComponent],
})
export class AppModule {}
