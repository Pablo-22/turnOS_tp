import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAppointmentsComponent } from '../appointments/my-appointments/my-appointments.component';
import { RequestAppointmentComponent } from '../appointments/request-appointment/request-appointment.component';
import { PatientsComponent } from '../patients/patients.component';

const routes: Routes = [
  
  {path: 'request-appointment', component:RequestAppointmentComponent},
  {path: 'my-appointments', component:MyAppointmentsComponent},
  {path: 'patients', component:PatientsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyLoadRoutingModule { }
