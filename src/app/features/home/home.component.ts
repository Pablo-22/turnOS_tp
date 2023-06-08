import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/users/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	UserLogged:boolean = false;
  	currentUser:User|undefined

	constructor(private _auth:AuthService) {
		this._auth.currentUser$.subscribe(x => {
			if (x?.email) {
				this.UserLogged = true;
        this.currentUser = x
			} else {
				this.UserLogged = false;
			}
		})
	}

	ngOnInit(): void {
	}

	haveAdminAccess(){
		if (this.UserLogged && this.currentUser?.type == 'ADMIN') {
			return true;
		}
		return false;
	}

}
