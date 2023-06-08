import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/users/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoaderService, LoaderState } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

	currentUser: User | undefined;

	displaySideBar:boolean = false;
	UserLogged:boolean = false;

	loading:boolean = false;



	constructor(private _auth:AuthService, private _loaderService:LoaderService, private _router:Router) {
		this._auth.currentUser$.subscribe(x => {
			if (x?.email) {
				this.UserLogged = true;
			} else {
				this.UserLogged = false;
			}
		})

		this._loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.loading = state.show;
            });
		
		this.checkAdminAccess();
	}

	ngOnInit(): void {

	}

	onLogOut(){
		this._auth.logOut();
		this._router.navigate(['/']);

	}

	checkAdminAccess(){
		this._auth.currentUser$.subscribe(x => {
			this.currentUser = x
		})
	}
}
