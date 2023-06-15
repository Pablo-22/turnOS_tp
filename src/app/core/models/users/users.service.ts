import { Injectable } from '@angular/core';
import { CrudService } from '../../services/crud/crud.service';
import { DocumentData } from '@angular/fire/firestore';
import { User } from './user';
import { Specialist } from 'src/app/features/login/models/specialist';
import { Patient } from 'src/app/features/login/models/patient';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  collectionName:string = 'users'

  constructor(private _crud:CrudService) {
  }

  getAll(){
    return this._crud.getAll(this.collectionName);
  }

  getById(id:string){
    return this._crud.getById(this.collectionName, id)
  }

  async getByField(fieldName:string, value:any){
    let users:User[] = []
    await this._crud.getByField(this.collectionName, fieldName, value).then(usersData => {
      
      usersData.forEach(userData => {
        users.push(this.parse(userData))
      });
    })
    return users
  }

  create(user:User){
    return this._crud.create(this.collectionName, this.cleanUser(user));
  }

  update(user:User){
    return this._crud.update(this.collectionName, this.cleanUser(user));
  }

  delete(userId:string){
    return this._crud.delete(this.collectionName, userId);
  }

  parse(data:DocumentData) : User {
    if (data['type'] == 'SPECIALIST') {
      
      const specialist = new Specialist()
      specialist.id = data['id']
      specialist.email = data['email']
      specialist.password = data['password']
      specialist.name = data['name']
      specialist.surname = data['surname']
      specialist.birthDate = data['birthDate']
      specialist.type = data['type']
      specialist.approvedProfile = data['approvedProfile']
      specialist.images = data['images']
      specialist.speciality = data['speciality']
      return specialist
      
    } else if(data['type'] == 'PATIENT') {
      
      const patient = new Patient()
      patient.id = data['id']
      patient.email = data['email']
      patient.password = data['password']
      patient.name = data['name']
      patient.surname = data['surname']
      patient.birthDate = data['birthDate']
      patient.type = data['type']
      patient.approvedProfile = data['approvedProfile']
      patient.images = data['images'] 
      patient.healthInsurance = data['healthInsurance']
      return patient
    }
    
    const user = new User()
    user.id = data['id']
    user.email = data['email']
    user.password = data['password']
    user.name = data['name']
    user.surname = data['surname']
    user.birthDate = data['birthDate']
    user.type = data['type']
    user.approvedProfile = data['approvedProfile']
    user.images = data['images']
    return user
  }

  cleanUser(user:User){
    //user.userLogs = []
    //user.password = ''
    return user
  }
}
