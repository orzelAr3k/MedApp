import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AddSpecialistDialogComponent } from './admin-shell/add-specialist-dialog/add-specialist-dialog.component';
import { EditSpecialistDialogComponent } from './admin-shell/edit-specialist-dialog/edit-specialist-dialog.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TimetableComponent } from './admin-shell/timetable/timetable.component';
import { TimetableDialogComponent } from './admin-shell/timetable/timetable-dialog/timetable-dialog.component';
import { SearchPageComponent } from './search-page/search-page.component';

//import angular material
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

//services
import { HttpClientModule } from '@angular/common/http';
import { WebRequestService } from './web-request.service';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminShellComponent,
    HomeComponent,
    PatientComponent,
    DoctorComponent,
    AddSpecialistDialogComponent,
    EditSpecialistDialogComponent,
    SignupPageComponent,
    LoginPageComponent,
    TimetableComponent,
    TimetableDialogComponent,
    SearchPageComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatListModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [WebRequestService],
  bootstrap: [AppComponent],
  entryComponents: [AddSpecialistDialogComponent],
})
export class AppModule {}
