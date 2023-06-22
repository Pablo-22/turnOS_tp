import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud/crud.service';
import { Appointment } from '../models/appointment';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  collectionName:string = 'appointments'

  constructor(private _crud:CrudService) {
  }

  getAll(){
    return this._crud.getAll(this.collectionName);
  }

  getById(id:string){
    return this._crud.getById(this.collectionName, id)
  }

  async getByField(fieldName:string, value:any){
    let availability:Appointment[] = []
    await this._crud.getByField(this.collectionName, fieldName, value).then(data => {
      data.forEach(x => {
        availability.push(this.parse(x))
      })
    })
    return availability
  }

  create(appointment:Appointment){
    return this._crud.create(this.collectionName, this.cleanAppointment(appointment));
  }

  update(appointment:Appointment){
    return this._crud.update(this.collectionName, this.cleanAppointment(appointment));
  }

  delete(appointmentId:string){
    return this._crud.delete(this.collectionName, appointmentId);
  }

  parse(data:DocumentData) : Appointment {
    const appointment = new Appointment()
    appointment.id = data['id']
    appointment.specialistId = data['specialistId']
    appointment.specialist = data['specialist']
    appointment.patientId = data['patientId']
    appointment.patient = data['patient']
    appointment.date = data['date']
    appointment.timeRange = data['timeRange']
    appointment.speciality = data['speciality']
    appointment.status = data['status']
    appointment.statusReason = data['statusReason']
    appointment.review = data['review']
    appointment.rating = data['rating']
    appointment.survey = data['survey']
    appointment.canceledReason = data['canceledReason']
    return appointment 
  }

  cleanAppointment(appointment:Appointment){
    return appointment
  }
}
