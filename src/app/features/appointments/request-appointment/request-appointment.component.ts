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

@Component({
  selector: 'app-request-appointment',
  templateUrl: './request-appointment.component.html',
  styleUrls: ['./request-appointment.component.scss']
})
export class RequestAppointmentComponent implements OnInit {
  tabs: MenuItem[] = [
    { label: 'Por especialista', icon: 'pi pi-user' },
    { label: 'Por especialidad', icon: 'pi pi-heart' },
  ]
  activeTab: MenuItem = this.tabs[0]
  
  specialists:Specialist[] = []
  specialities:string[] = []

  specialistSelected:Specialist = new Specialist()
  specialitySelected:string = 'Pediatría'

  appointmentsAvailable:Appointment[] = []
  appointmentSelected:Appointment|undefined

  currentUser:User|undefined
  
  constructor(
    private _usersService:UsersService, 
    private _availabilityService:SpecialistsAvailabilityService, 
    private _authService:AuthService,
    private _appointmentsService:AppointmentsService, 
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
          x.availability = availability[0]
        })

        x.speciality.forEach(speciality => {
          if (!this.specialities.includes(speciality)) {
            this.specialities.push(speciality)
          }
        })

      })
    })

    this._authService.currentUser$.subscribe(x => {
      this.currentUser = x
    })
  }

  onSpecialistSelected(specialist:Specialist){
    this.specialitySelected = ''
    this.specialistSelected = specialist
    this.showAppointments()
  }

  clearSelectedData(){
    this.appointmentsAvailable = []
    this.appointmentSelected = undefined
  }

  showAppointments(){
    this.clearSelectedData()

    if (this.specialistSelected && this.specialitySelected) {
      this.appointmentsAvailable = SpecialistAvailability.getAvailableAppointmentsBySpeciality(this.specialistSelected.availability, this.specialitySelected, 15)

      this._appointmentsService.getByField('specialistId', this.specialistSelected.id).then(x => {

        this.appointmentsAvailable = SpecialistAvailability.applyRestrictions(this.appointmentsAvailable, x)
      })
    }
  }

  onAppointmentSelected(appointment:Appointment){
    appointment.patientId = this.currentUser?.id ?? ''
    this.appointmentSelected = appointment
  }

  onAccept(){
    if (this.appointmentSelected) {
      this.appointmentSelected.status = 'Solicitado'
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
}
