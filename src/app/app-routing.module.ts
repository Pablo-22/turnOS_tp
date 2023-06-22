import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { SigninComponent } from './features/signin/signin.component';
import { UsersManagerComponent } from './features/users-manager/users-manager.component';
import { MyProfileComponent } from './features/my-profile/my-profile.component';
import { RequestAppointmentComponent } from './features/appointments/request-appointment/request-appointment.component';
import { MyAppointmentsComponent } from './features/appointments/my-appointments/my-appointments.component';
import { PatientsComponent } from './features/patients/patients.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signin', component:SigninComponent},
  {path: 'users-manager', component:UsersManagerComponent},
  {path: 'my-profile', component:MyProfileComponent},
  {path: 'request-appointment', component:RequestAppointmentComponent},
  {path: 'my-appointments', component:MyAppointmentsComponent},
  {path: 'patients', component:PatientsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
