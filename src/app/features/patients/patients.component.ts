import { Component } from '@angular/core';
import { AppointmentsService } from '../appointments/services/appointments.service';
import { UsersService } from 'src/app/core/models/users/users.service';
import { ClinicalRecordsService } from '../appointments/services/clinical-records.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ClinicalRecords } from '../appointments/models/clinical-records';
import { Patient } from '../login/models/patient';
import { Appointment } from '../appointments/models/appointment';
import { Specialist } from '../login/models/specialist';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {

  records:ClinicalRecords[] = []
  patients:Patient[] = []
  appointments:Appointment[] = []
  patientSelected:Patient|undefined

  constructor(
    private _appointmentsService:AppointmentsService,
    private _usersService:UsersService,
    private _clinicalRecordsService:ClinicalRecordsService,
    private _authService:AuthService,
  ){
    this._authService.currentUser$.subscribe(currentUser => {
      this._appointmentsService.getByField('specialistId', currentUser?.id ?? '').then(appointments => { 
        this.appointments = appointments 

        this.appointments.forEach(appointment => {
          this._usersService.getById(appointment.patientId).subscribe(patient => { 
            appointment.patient = patient

            if (this.patients.some(x => x.id == patient.id) == false) {
              this.patients.push(patient)
            }

            this._clinicalRecordsService.getByField('appointmentId', appointment.id ?? '').then(records => {
              this.records = records
              records.forEach(record => {
                record.patient = patient
                record.appointment = appointment
                record.specialist = currentUser as Specialist
              })
            })
          })
        })
      })     
    })
  }


  onPatientSelected(patient:Patient){
    this.patientSelected = patient
  }

  onFilterReset(){
    this.patientSelected = undefined
  }
}