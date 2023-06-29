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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyProfileComponent } from './features/my-profile/my-profile.component';
import { SpecialistAvailabilityComponent } from './features/appointments/specialist-availability/specialist-availability.component';
import { DayPipe } from './pipes/day.pipe';

import localeES from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { SpecialitiesListComponent } from './components/specialities-list/specialities-list.component';
import { ClinicalRecordsDashboardComponent } from './features/appointments/clinical-records-dashboard/clinical-records-dashboard.component'
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { SharedModule } from './shared/shared.module';
registerLocaleData(localeES, 'es')

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SigninComponent,
    UsersDeckComponent,
    MyProfileComponent,
    SpecialistAvailabilityComponent,
    DayPipe,
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
    HttpClientModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
