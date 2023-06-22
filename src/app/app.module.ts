import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './features/home/home.component';
import { PrimeNgModule } from './core/prime-ng.module';
import { LoginComponent } from './features/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersDeckComponent } from './components/users-deck/users-deck.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SigninComponent } from './features/signin/signin.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTypePipe } from './pipes/user-type.pipe';
import { UsersManagerComponent } from './features/users-manager/users-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { MyProfileComponent } from './features/my-profile/my-profile.component';
import { SpecialistAvailabilityComponent } from './features/appointments/specialist-availability/specialist-availability.component';
import { DayPipe } from './pipes/day.pipe';
import { TimePipe } from './pipes/time.pipe';
import { RequestAppointmentComponent } from './features/appointments/request-appointment/request-appointment.component';

import localeES from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { MyAppointmentsComponent } from './features/appointments/my-appointments/my-appointments.component';
import { AppointmentsFilterPipe } from './pipes/appointments-filter.pipe';
import { SurveyComponent } from './features/appointments/survey/survey.component';
import { ReviewAppointmentComponent } from './features/appointments/review-appointment/review-appointment.component';
import { ViewAppointmentReviewComponent } from './features/appointments/view-appointment-review/view-appointment-review.component';
import { SpecialitiesListComponent } from './components/specialities-list/specialities-list.component';
import { SpecialistFilterPipe } from './pipes/specialist-filter.pipe';
import { PatientsComponent } from './features/patients/patients.component'
registerLocaleData(localeES, 'es')

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    UsersDeckComponent,
    SigninComponent,
    NewUserFormComponent,
    UserTypePipe,
    UsersManagerComponent,
    MyProfileComponent,
    SpecialistAvailabilityComponent,
    DayPipe,
    TimePipe,
    RequestAppointmentComponent,
    MyAppointmentsComponent,
    AppointmentsFilterPipe,
    SurveyComponent,
    ReviewAppointmentComponent,
    ViewAppointmentReviewComponent,
    SpecialitiesListComponent,
    SpecialistFilterPipe,
    PatientsComponent,
  ],
  imports: [
    CoreModule,
    PrimeNgModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
		ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
