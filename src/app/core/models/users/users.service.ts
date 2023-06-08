import { Injectable } from '@angular/core';
import { CrudService } from '../../services/crud/crud.service';
import { DocumentData } from '@angular/fire/firestore';
import { User } from './user';

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
    let user:User = new User()
    await this._crud.getByField(this.collectionName, fieldName, value).then(userData => {
      user = this.parse(userData)
    })
    return user
  }

  create(user:User){
    console.log(this.cleanUser(user))
    return this._crud.create(this.collectionName, this.cleanUser(user));
  }

  update(user:User){
    return this._crud.update(this.collectionName, this.cleanUser(user));
  }

  delete(userId:string){
    return this._crud.delete(this.collectionName, userId);
  }

  parse(data:DocumentData) : User {
    const user = new User()
    user.id = data[0]['id']
    user.email = data[0]['email']
    user.password = data[0]['password']
    user.name = data[0]['name']
    user.surname = data[0]['surname']
    user.birthDate = data[0]['birthDate']
    user.type = data[0]['type']
    user.approvedProfile = data[0]['approvedProfile']
    user.images = data[0]['images']
    return user 
  }

  cleanUser(user:User){
    //user.userLogs = []
    //user.password = ''
    return user
  }
}
