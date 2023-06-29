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

import localeES from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { ViewAppointmentReviewComponent } from './features/appointments/view-appointment-review/view-appointment-review.component';
import { SpecialitiesListComponent } from './components/specialities-list/specialities-list.component';
import { SpecialistFilterPipe } from './pipes/specialist-filter.pipe';
import { VisualizeClinicalRecordsComponent } from './features/appointments/visualize-clinical-records/visualize-clinical-records.component';
import { ClinicalRecordsDashboardComponent } from './features/appointments/clinical-records-dashboard/clinical-records-dashboard.component'
registerLocaleData(localeES, 'es')

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SigninComponent,
    UsersDeckComponent,
    NewUserFormComponent,
    UserTypePipe,
    SpecialitiesListComponent,
    MyProfileComponent,
    SpecialistAvailabilityComponent,
    DayPipe,
    TimePipe,
    ClinicalRecordsDashboardComponent,
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
  exports: [
    TimePipe,
    UserTypePipe,
    NewUserFormComponent,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
