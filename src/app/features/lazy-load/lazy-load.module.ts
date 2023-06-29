import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestAppointmentComponent } from '../appointments/request-appointment/request-appointment.component';
import { MyAppointmentsComponent } from '../appointments/my-appointments/my-appointments.component';
import { PatientsComponent } from '../patients/patients.component';
import { ReviewAppointmentComponent } from '../appointments/review-appointment/review-appointment.component';
import { SurveyComponent } from '../appointments/survey/survey.component';
import { NewClinicalRecordFormComponent } from '../appointments/new-clinical-record-form/new-clinical-record-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { PrimeNgModule } from 'src/app/core/prime-ng.module';
import { AppointmentsFilterPipe } from 'src/app/pipes/appointments-filter.pipe';
import { SpecialistFilterPipe } from 'src/app/pipes/specialist-filter.pipe';
import { ViewAppointmentReviewComponent } from '../appointments/view-appointment-review/view-appointment-review.component';
import { VisualizeClinicalRecordsComponent } from '../appointments/visualize-clinical-records/visualize-clinical-records.component';
import { UsersManagerComponent } from '../users-manager/users-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { LazyLoadRoutingModule } from './lazy-load-routing.module';


@NgModule({
  declarations: [
    RequestAppointmentComponent,
    MyAppointmentsComponent,
    PatientsComponent,
    ReviewAppointmentComponent,
    SurveyComponent,
    NewClinicalRecordFormComponent,
    ViewAppointmentReviewComponent,
    VisualizeClinicalRecordsComponent,
    UsersManagerComponent,
  ],
  imports: [
    CoreModule,
    PrimeNgModule,
    SharedModule,
    LazyLoadRoutingModule
  ]
})
export class LazyLoadModule { }
