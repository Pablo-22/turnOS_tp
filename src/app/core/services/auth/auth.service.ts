import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from 'src/app/core/models/users/user';
import Swal from 'sweetalert2';
import { UsersService } from '../../models/users/users.service';
import firebase from "@firebase/app-compat";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserAccessSubject = new BehaviorSubject<User|undefined>({} as User);
  currentUser$ = this.currentUserAccessSubject.asObservable();

  constructor(
    private _auth : AngularFireAuth, 
    private _usersService:UsersService,
    private _router:Router
  ) {
    this._auth.authState.subscribe(x => {
      if (x?.email) {
        this._usersService.getByField('email', x.email?? '').then(user => {
          this.currentUserAccessSubject.next(user[0]);
        });
      } else {
        this.currentUserAccessSubject.next(undefined);
      }
    })
  }

  async login(email: string, password: string){
    try{
      let result = await this._auth.signInWithEmailAndPassword(email, password);
  
      await this._usersService.getByField('email', email).then(user => {
        this.currentUserAccessSubject.next(user[0]);
      })

      return result;
    }
    catch(error) {
      Swal.fire({
        title: 'Error',
        text: "No se ha podido hacer ingresar correctamente. Por favor revise los datos ingresados. Error: " + error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return null;
    }
  }

  async loginGoogle(email: string, password: string){
		try{
			return await this._auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
		}
		catch(error) {
			Swal.fire({
        title: 'Error',
        text: "No se ha podido hacer ingresar correctamente. Error: " + error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
			return null;
		}
	}

  async signUp(user:User){
    try{
      let result:any = await this._auth.createUserWithEmailAndPassword(user.email, user.password);
  
      result = this._usersService.create(user);

      if (result) {
        await this._usersService.getByField('email', user.email).then(user => { 
          this.currentUserAccessSubject.next(user[0]);
        })
      }

      return user;
    }
    catch(error) {
      Swal.fire({
        title: 'Error',
        text: "No se ha podido registrar correctamente. Error: " + error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return undefined;
    }
  }

  async logOut(){
		this._auth.signOut();
	}

  authState(){
    return this._auth.authState
  }

  getAuthCurrentUser(){
    return this._auth.currentUser
  }
}
