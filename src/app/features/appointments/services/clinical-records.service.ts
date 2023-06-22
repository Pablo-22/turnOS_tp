import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase-admin/firestore';
import { CrudService } from 'src/app/core/services/crud/crud.service';
import { ClinicalRecords } from '../models/clinical-records';

@Injectable({
  providedIn: 'root'
})
export class ClinicalRecordsService {

  collectionName:string = 'clinicalRecords'

  constructor(private _crud:CrudService) {
  }

  getAll(){
    return this._crud.getAll(this.collectionName);
  }

  getById(id:string){
    return this._crud.getById(this.collectionName, id)
  }

  async getByField(fieldName:string, value:any){
    let availability:ClinicalRecords[] = []
    await this._crud.getByField(this.collectionName, fieldName, value).then(data => {
      data.forEach(x => {
        availability.push(this.parse(x))
      })
    })
    return availability
  }

  create(clinicalRecords:ClinicalRecords){
    return this._crud.create(this.collectionName, this.cleanClinicalRecords(clinicalRecords));
  }

  update(clinicalRecords:ClinicalRecords){
    return this._crud.update(this.collectionName, this.cleanClinicalRecords(clinicalRecords));
  }

  delete(clinicalRecordsId:string){
    return this._crud.delete(this.collectionName, clinicalRecordsId);
  }

  parse(data:DocumentData) : ClinicalRecords {
    const clinicalRecords = new ClinicalRecords()
    clinicalRecords.id = data['id']
    clinicalRecords.specialistId = data['specialistId']
    clinicalRecords.specialist = data['specialist']
    clinicalRecords.patientId = data['patientId']
    clinicalRecords.patient = data['patient']
    clinicalRecords.appointmentId = data['appointmentId']
    clinicalRecords.appointment = data['appointment']
    clinicalRecords.height = data['height']
    clinicalRecords.weight = data['weight']
    clinicalRecords.temperature = data['temperature']
    clinicalRecords.pressure = data['pressure']
    clinicalRecords.dynamicMeasurements = data['dynamicMeasurements']

    return clinicalRecords 
  }

  cleanClinicalRecords(clinicalRecords:ClinicalRecords){
    return clinicalRecords
  }
}
