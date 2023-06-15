import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud/crud.service';
import { SpecialistAvailability } from '../models/specialist-availability';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SpecialistsAvailabilityService {

  collectionName:string = 'availability'

  constructor(private _crud:CrudService) {
  }

  getAll(){
    return this._crud.getAll(this.collectionName);
  }

  getById(id:string){
    return this._crud.getById(this.collectionName, id)
  }

  async getByField(fieldName:string, value:any){
    let availability:SpecialistAvailability[] = []
    await this._crud.getByField(this.collectionName, fieldName, value).then(data => {
      data.forEach(x => {
        availability.push(this.parse(x))
      })
    })
    return availability
  }

  create(specialistAvailability:SpecialistAvailability){
    return this._crud.create(this.collectionName, this.cleanSpecialistAvailability(specialistAvailability));
  }

  update(specialistAvailability:SpecialistAvailability){
    return this._crud.update(this.collectionName, this.cleanSpecialistAvailability(specialistAvailability));
  }

  delete(specialistAvailabilityId:string){
    return this._crud.delete(this.collectionName, specialistAvailabilityId);
  }

  parse(data:DocumentData) : SpecialistAvailability {
    const specialistAvailability = new SpecialistAvailability()
    specialistAvailability.id = data['id']
    specialistAvailability.specialistId = data['specialistId']
    specialistAvailability.weekAvailability = data['weekAvailability']
    return specialistAvailability 
  }

  cleanSpecialistAvailability(specialistAvailability:SpecialistAvailability){
    return specialistAvailability
  }
}
