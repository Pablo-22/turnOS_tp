import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/users/user';
import { UsersService } from 'src/app/core/models/users/users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { LoginInput } from './models/login-input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	emailInputStr: string = '';
	passwordInputStr: string = '';
	isUserLogged: boolean = false;

	allUsers:Observable<User[]> = new Observable<User[]>()

	constructor(private _auth : AuthService, private _router : Router, private _users:UsersService, private _loaderService:LoaderService) {
		this.allUsers = this._users.getAll()
	}

	ngOnInit(): void {
		this.isLogged();
	}

	isLogged(){
		this._auth.currentUser$.subscribe(res =>{
			if (res?.email) {
				this.isUserLogged = true;
			}
		});
	}

	async onLogin() {

		this._loaderService.show();

		if (!this.emailInputStr || !this.passwordInputStr) {
			this._loaderService.hide();
			return
		}

		let result = await this._users.getByField('email', this.emailInputStr)
		if (!result) {
			this._loaderService.hide();
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'No se encontró el email ingresado. Por favor, revise los datos e intente nuevamente',
			})
			return;
		}

		let user = result;

		if (['ADMIN', 'SPECIALIST'].includes(user.type) && !user.approvedProfile) {
			this._loaderService.hide();
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'No se ha podido loguear correctamente. Su perfil aún no ha sido aprobado por un administrador.',
			})
			return;
		}

		this._auth.login(this.emailInputStr, this.passwordInputStr).then((res: any)=>{
			if (res) {
				this._auth.getAuthCurrentUser().then(user => {
					if(user?.emailVerified){
						this.isLogged();
						this._loaderService.hide();
						Swal.fire({
							icon: 'success',
							title: '¡Hola de nuevo!',
							text: 'Has iniciado sesión correctamente'
						}).then(x => {
							this._router.navigate(['/']);
						})

					} else {
						user?.sendEmailVerification().then(() => {
							this._loaderService.hide();
							
							Swal.fire({
								icon: 'error',
								title: 'Error',
								text: 'No se ha podido iniciar sesión porque no se ha validado tu correo. Se envió un email a tu correo electrónico con las instrucciones para verificar tu cuenta. No olvides revisar la carpeta de spam'
							})

							this._auth.logOut();
						})
					}
				})
			} else {
				this._loaderService.hide();

				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'No se ha podido loguear correctamente. Por favor revise los datos ingresados e intente nuevamente.'
				})
			}
		});
	}

	onAutocomplete(user:LoginInput) {
		this.emailInputStr = user.email;
		this.passwordInputStr = user.password;
	}

}
