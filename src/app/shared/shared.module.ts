import { NgModule } from '@angular/core';
import { UserTypePipe } from '../pipes/user-type.pipe';
import { TimePipe } from '../pipes/time.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserFormComponent } from '../components/new-user-form/new-user-form.component';
import { PrimeNgModule } from '../core/prime-ng.module';
import { SpecialitiesListComponent } from '../components/specialities-list/specialities-list.component';
import { SpecialistFilterPipe } from '../pipes/specialist-filter.pipe';
import { AppointmentsFilterPipe } from '../pipes/appointments-filter.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
  ],
  declarations: [
    UserTypePipe,
    TimePipe,
    NewUserFormComponent,
    SpecialitiesListComponent,
    SpecialistFilterPipe,
    AppointmentsFilterPipe,
  ],
  exports: [
    UserTypePipe,
    TimePipe,
    CommonModule,
    FormsModule,
    NewUserFormComponent,
    SpecialitiesListComponent,
    SpecialistFilterPipe,
    AppointmentsFilterPipe,
  ]
})
export class SharedModule { }
