import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud/crud.service';
import { Speciality } from './models/speciality';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SpecialitiesService {

  collectionName:string = 'specialities'

  constructor(private _crud:CrudService) {
  }

  getAll(){
    return this._crud.getAll(this.collectionName);
  }

  getById(id:string){
    return this._crud.getById(this.collectionName, id)
  }

  async getByField(fieldName:string, value:any){
    let availability:Speciality[] = []
    await this._crud.getByField(this.collectionName, fieldName, value).then(data => {
      data.forEach(x => {
        availability.push(this.parse(x))
      })
    })
    return availability
  }

  create(speciality:Speciality){
    return this._crud.create(this.collectionName, this.cleanSpeciality(speciality));
  }

  update(speciality:Speciality){
    return this._crud.update(this.collectionName, this.cleanSpeciality(speciality));
  }

  delete(specialityId:string){
    return this._crud.delete(this.collectionName, specialityId);
  }

  parse(data:DocumentData) : Speciality {
    const speciality = new Speciality()
    speciality.id = data['id']
    speciality.name = data['name']
    speciality.image = data['image']
    return speciality 
  }

  cleanSpeciality(speciality:Speciality){
    return speciality
  }
}
