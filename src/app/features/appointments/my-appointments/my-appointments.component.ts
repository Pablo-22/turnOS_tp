import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';
import { UsersService } from 'src/app/core/models/users/users.service';
import { Appointment } from '../models/appointment';
import { User } from 'src/app/core/models/users/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MenuItem, MessageService } from 'primeng/api';

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
  items: MenuItem[];

  constructor(
    private _appointmentsService:AppointmentsService, 
    private _usersService:UsersService,
    private _authService:AuthService,
  ){
    this.items = [
      {
        label: 'Acciones',
        items: [
          {
            label: 'Cancelar turno',
            icon: 'pi pi-cancel',
            command: () => {
              console.log('hola');
            },
          },
        ]
      }
    ]



    this._authService.currentUser$.subscribe(x => { 
      this.currentUser = x 

      this._appointmentsService.getByField('patientId', this.currentUser?.id ?? '').then(x => {
        this.appointments = x
        console.log(x)
  
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
}
