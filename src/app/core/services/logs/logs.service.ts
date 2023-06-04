import { Injectable } from '@angular/core';
import { Log } from './log';
import { AuthService } from '../auth/auth.service';
import { CrudService } from '../crud/crud.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  collectionName:string = 'logs'
  userSubscription: Subscription = new Subscription;

  constructor(private _auth : AuthService, private _crud : CrudService) { }

  userLog(value:string){
    const userSubscription = this._auth.currentUser$.subscribe(user => {
      const log = new Log(value, 'user', user?.id?? '')
      this._crud.create(this.collectionName, log)
      this.userSubscription.unsubscribe()
    });
  }

  log(value:string, objectName:string, objectId:string){
    const log = new Log(value, objectName, objectId)
    this._crud.create(this.collectionName, log)
  }
}
