import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';
import { UsersService } from 'src/app/core/models/users/users.service';
import { Appointment } from '../models/appointment';
import { User } from 'src/app/core/models/users/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MenuItem, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { AppointmentStates } from '../enums/appointment-states';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
  providers: [MessageService]
})
export class MyAppointmentsComponent implements OnInit {

  appointments:Appointment[]|undefined
  users:User[]|undefined
  currentUser:User|undefined

  searchStr:string = ''

  constructor(
    private _appointmentsService:AppointmentsService, 
    private _usersService:UsersService,
    private _authService:AuthService,
		private _loaderService:LoaderService
  ){
    this._loaderService.show()

    this._authService.currentUser$.subscribe(x => { 
      this.currentUser = x 

      this._appointmentsService.getByField('patientId', this.currentUser?.id ?? '').then(x => {
        this.appointments = x
        this._loaderService.hide()
  
        this.appointments.forEach(appointment => {
          this._usersService.getById(appointment.specialistId).subscribe(x => {
            appointment.specialist = x
          })
        })
      })
    })
  }

  ngOnInit(): void {
  }

  cancelAppointment(appointment:Appointment){
    appointment.status  = AppointmentStates.Canceled
    appointment.statusReason  = 'El turno fue cancelado por el paciente.'
    this._appointmentsService.update(appointment)
  }
}
