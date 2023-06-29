import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadRoutingModule } from './lazy-load-routing.module';
import { RequestAppointmentComponent } from '../appointments/request-appointment/request-appointment.component';
import { MyAppointmentsComponent } from '../appointments/my-appointments/my-appointments.component';
import { PatientsComponent } from '../patients/patients.component';
import { ReviewAppointmentComponent } from '../appointments/review-appointment/review-appointment.component';
import { SurveyComponent } from '../appointments/survey/survey.component';
import { NewClinicalRecordFormComponent } from '../appointments/new-clinical-record-form/new-clinical-record-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { PrimeNgModule } from 'src/app/core/prime-ng.module';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { AppointmentsFilterPipe } from 'src/app/pipes/appointments-filter.pipe';
import { SpecialistFilterPipe } from 'src/app/pipes/specialist-filter.pipe';
import { NewUserFormComponent } from 'src/app/components/new-user-form/new-user-form.component';
import { SpecialitiesListComponent } from 'src/app/components/specialities-list/specialities-list.component';
import { UsersDeckComponent } from 'src/app/components/users-deck/users-deck.component';
import { DayPipe } from 'src/app/pipes/day.pipe';
import { UserTypePipe } from 'src/app/pipes/user-type.pipe';
import { ClinicalRecordsDashboardComponent } from '../appointments/clinical-records-dashboard/clinical-records-dashboard.component';
import { SpecialistAvailabilityComponent } from '../appointments/specialist-availability/specialist-availability.component';
import { ViewAppointmentReviewComponent } from '../appointments/view-appointment-review/view-appointment-review.component';
import { VisualizeClinicalRecordsComponent } from '../appointments/visualize-clinical-records/visualize-clinical-records.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { UsersManagerComponent } from '../users-manager/users-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';


@NgModule({
  declarations: [
    RequestAppointmentComponent,
    MyAppointmentsComponent,
    PatientsComponent,
    ReviewAppointmentComponent,
    SurveyComponent,
    NewClinicalRecordFormComponent,
    AppointmentsFilterPipe,
    SpecialistFilterPipe,
    ViewAppointmentReviewComponent,
    SpecialistFilterPipe,
    VisualizeClinicalRecordsComponent,
    UsersManagerComponent,
  ],
  imports: [
    CoreModule,
    PrimeNgModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
		ReactiveFormsModule,
    HttpClientModule,
    AppModule
  ]
})
export class LazyLoadModule { }
