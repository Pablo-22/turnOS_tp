import { Component } from '@angular/core';
import { AppointmentsService } from '../appointments/services/appointments.service';
import { UsersService } from 'src/app/core/models/users/users.service';
import { ClinicalRecordsService } from '../appointments/services/clinical-records.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ClinicalRecords } from '../appointments/models/clinical-records';
import { Patient } from '../login/models/patient';
import { Appointment } from '../appointments/models/appointment';
import { Specialist } from '../login/models/specialist';
import { filter } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Timestamp } from '@angular/fire/firestore';
import { AppointmentStates } from '../appointments/enums/appointment-states';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ReviewAppointmentComponent } from '../appointments/review-appointment/review-appointment.component';
import { NewClinicalRecordFormComponent } from '../appointments/new-clinical-record-form/new-clinical-record-form.component';
import { VisualizeClinicalRecordsComponent } from '../appointments/visualize-clinical-records/visualize-clinical-records.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers: [MessageService, DialogService]
})
export class PatientsComponent {

  records:ClinicalRecords[] = []
  patients:Patient[] = []
  appointments:Appointment[] = []

  patientSelected:Patient|undefined
  appointmentsFiltered:Appointment[] = []
  currentAppointment:Appointment = new Appointment()

  dialog: DynamicDialogRef | undefined;

  constructor(
    private _appointmentsService:AppointmentsService,
    private _usersService:UsersService,
    private _clinicalRecordsService:ClinicalRecordsService,
    private _authService:AuthService,
    private _loaderService:LoaderService,
    public dialogService: DialogService, 
    public messageService: MessageService
  ){
    
    this._loaderService.show()

    this._authService.currentUser$.subscribe(currentUser => {
      this._appointmentsService.getByField('specialistId', currentUser?.id ?? '').then(appointments => { 
        this.appointments = appointments 

        this._loaderService.hide()


        this.appointments.forEach(appointment => {
          if (appointment.status == AppointmentStates.Completed) {
            this._usersService.getById(appointment.patientId).subscribe((patient:Patient) => { 
              appointment.patient = patient
  
              const pPatient = this.patients.filter(p => { return p.id == patient.id })[0]
  
                if (pPatient) {
                  pPatient.appointments?.push(appointment)
                } else {
                  patient.appointments = []
                  patient.appointments.push(appointment)
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
          }
        })
      })   
    })
  }


  onPatientSelected(patient:Patient){
    this.patientSelected = patient
    this.appointmentsFiltered = this.appointments.filter(x => { return x.patientId == this.patientSelected?.id })

    this.dialog = this.dialogService.open(VisualizeClinicalRecordsComponent, {
      header: 'Historia clínica',
      contentStyle: { overflow: 'auto' },
      data: this.patientSelected.appointments?? []
    });
  }

  onFilterReset(){
    this.patientSelected = undefined
  }

  getLastAppointments(appointments:Appointment[]){
    appointments.sort((b, a) => { 
      return  (Object.assign(new Timestamp(0, 0), a.date).toMillis() + a.timeRange.from.hours) 
              - ( Object.assign(new Timestamp(0, 0), b.date).toMillis() + b.timeRange.from.hours)
    })
    return appointments.slice(0, 3)
  }
}