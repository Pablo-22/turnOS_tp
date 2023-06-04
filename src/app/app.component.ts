import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isUserLogged: boolean = false
  currentUserEmail:string = ''

  constructor(private _auth: AuthService, private _router:Router){
    this._auth.currentUser$.subscribe(x => {
      if (x?.email) {
        this.isUserLogged = true
        this.currentUserEmail = x.email
      }else {
        this.isUserLogged = false
        this.currentUserEmail = ''
      }
    })
  }

  onLogOut(){
    this._auth.logOut()
    this._router.navigate(['/'])
  }
}
