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
    user.password = ''
    user.userLogs = []
    return this._crud.create(this.collectionName, user);
  }

  update(user:User){
    user.password = ''
    user.userLogs = []
    return this._crud.update(this.collectionName, user);
  }

  delete(userId:string){
    return this._crud.delete(this.collectionName, userId);
  }

  parse(data:DocumentData) : User {
    const user = new User()
    user.id = data[0]['id']
    user.email = data[0]['email']
    return user 
  }
}
