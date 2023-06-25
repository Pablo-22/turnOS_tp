import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Specialist } from '../../login/models/specialist';
import { UsersService } from 'src/app/core/models/users/users.service';
import { SpecialistsAvailabilityService } from '../services/specialists-availability.service';
import { Appointment } from '../models/appointment';
import { SpecialistAvailability } from '../models/specialist-availability';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/core/models/users/user';
import { AppointmentsService } from '../services/appointments.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { AppointmentStates } from '../enums/appointment-states';
import { Speciality } from '../../signin/models/speciality';
import { SpecialitiesService } from '../../signin/specialities.service';
import { Patient } from '../../login/models/patient';

@Component({
  selector: 'app-request-appointment',
  templateUrl: './request-appointment.component.html',
  styleUrls: ['./request-appointment.component.scss']
})
export class RequestAppointmentComponent implements OnInit {
  tabs: MenuItem[] = [
    { label: 'Especialidad', icon: 'pi pi-heart' },
    { label: 'Especialista', icon: 'pi pi-user' },
    { label: 'Paciente', icon: 'pi pi-user' },
  ]
  activeTab: MenuItem = this.tabs[0]
  
  specialists:Specialist[] = []
  specialities:Speciality[] = []
  patients:Patient[] = []

  specialistSelected:Specialist = new Specialist()
  specialitySelected:Speciality = new Speciality()
  patientSelected:Patient = new Patient()

  appointmentsAvailable:Appointment[] = []
  appointmentSelected:Appointment|undefined

  currentUser:User|undefined
  
  constructor(
    private _usersService:UsersService, 
    private _availabilityService:SpecialistsAvailabilityService, 
    private _authService:AuthService,
    private _appointmentsService:AppointmentsService, 
    private _specialitiesService:SpecialitiesService, 
		private _router: Router,
		private _loaderService:LoaderService
  ){

  }

  ngOnInit() {
    this._loaderService.show()

    this._usersService.getByField('type', 'SPECIALIST').then(specialists => {
      this.specialists = specialists as Specialist[]
      this._loaderService.hide()
      this.specialists.forEach(x => {
        this._availabilityService.getByField('specialistId', x.id).then(availability => {
          console.log(x, x.id)
          console.log(availability)
          x.availability = availability[0]
        })
      })

      this._specialitiesService.getAll().subscribe(x => {
        this.specialities = x
      })
    })

    this._authService.currentUser$.subscribe(x => {
      this.currentUser = x
      if (this.currentUser?.type == 'ADMIN') {
        this._usersService.getByField('type', 'PATIENT').then(patients => {
          this.patients = patients as Patient[]
        })
      }
    })
  }

  onSpecialistSelected(specialist:Specialist){
    this.specialistSelected = specialist
    this.showAppointments()

    if (this.currentUser?.type == 'ADMIN') {
      this.activeTab = this.tabs[2]
    }
  }

  onPatientSelected(patient:Patient){
    this.patientSelected = patient
  }

  onSpecialitySelected(speciality:Speciality){
    this.specialitySelected = speciality
    this.specialistSelected = new Specialist()
    this.activeTab = this.tabs[1]
  }

  clearSelectedData(){
    this.appointmentsAvailable = []
    this.appointmentSelected = undefined
  }

  showAppointments(){
    this.clearSelectedData()

    if (this.specialistSelected && this.specialitySelected) {
      console.log(this.specialistSelected)
      this.appointmentsAvailable = SpecialistAvailability.getAvailableAppointmentsBySpeciality(this.specialistSelected.availability, this.specialitySelected.name, 15)

      this._appointmentsService.getByField('specialistId', this.specialistSelected.id).then(x => {
        this.appointmentsAvailable = SpecialistAvailability.applyRestrictions(this.appointmentsAvailable, x)
      })
    }
  }

  onAppointmentSelected(appointment:Appointment){
    if (this.currentUser?.type == 'ADMIN') {
      appointment.patientId = this.patientSelected?.id ?? ''
    }else {
      appointment.patientId = this.currentUser?.id ?? ''
    }
    this.appointmentSelected = appointment
  }

  onAccept(){
    if (this.appointmentSelected && this.appointmentSelected.patientId) {
      this.appointmentSelected.status = AppointmentStates.Requested
      this.appointmentSelected.statusReason = 'El turno fue solicitado por el paciente. Está pendiente de aceptar por el especialista.'
      this._appointmentsService.create(this.appointmentSelected)

      Swal.fire({
        title: 'Turno Solicitado',
        text: 'El turno fue solicitado. Ahora el especialista debe aceptarlo.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(x => {
        this._router.navigate(['/my-appointments'])
      })
    }
  }

  onFilterReset(){
    this.specialitySelected = new Speciality()
    this.specialistSelected = new Specialist()
    this.patientSelected = new Patient()
    this.appointmentSelected = undefined
    this.appointmentsAvailable = []
    this.activeTab = this.tabs[0]
  }
}
