import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { AngularFireStorageReference } from '@angular/fire/compat/storage'
import { Timestamp } from '@angular/fire/firestore'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { User } from 'src/app/core/models/users/user'
import { UsersService } from 'src/app/core/models/users/users.service'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { CloudStorageService } from 'src/app/core/services/cloud-storage/cloud-storage.service'
import { LoaderService } from 'src/app/core/services/loader/loader.service'
import { Patient } from 'src/app/features/login/models/patient'
import { Specialist } from 'src/app/features/login/models/specialist'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss']
})
export class NewUserFormComponent {

	form: FormGroup

	@Input()
	userType:'SPECIALIST'|'ADMIN'|'PATIENT'|'' = ''

	@Input()
	showReturnButton:boolean = false

	@Output() onReturn = new EventEmitter<boolean>()

	specialities:string[] = ['Pediatría', 'Psicología', 'Oftalmología', 'Otorrinolaringología', 'Cardiología' ]
	specialitySelected:string[] = []

	    
	userBirthDate:string = new Date().toLocaleDateString('en-GB')
	
	@ViewChild('fileUploader') fileUploader: any
	userImages:File[] = []
	currentFileRef:AngularFireStorageReference | undefined


	constructor(
		private _auth:AuthService, 
		private _users:UsersService, 
		private _storage: CloudStorageService, 
		private _router: Router,
		private _loaderService:LoaderService
	) {
		this.form = new FormGroup({
			name: new FormControl('', [Validators.required] ),

			surname: new FormControl('', [Validators.required] ),

			dni: new FormControl('', [Validators.required, Validators.pattern(/^([0-9])*$/)] ), //REGEX: Only Numbers allowed
			healthInsurance: new FormControl({value: '', disabled: this.userType !== 'PATIENT'}, [Validators.required] ),
			email: new FormControl('', [Validators.required, Validators.email] ),
			password: new FormControl('', [Validators.required, Validators.minLength(8)] ),
		})
	}

	ngOnInit(): void {
	}

	ngOnChanges() {
		switch (this.userType) {
	
			case 'PATIENT':
				this.form.controls['healthInsurance'].enable()
				break
			default:
				this.form.controls['healthInsurance'].disable()
				break
		}
	}

	onRegister(){
		this._loaderService.show()
		const userBirthDate = moment(this.userBirthDate, "DD/MM/YYYY").toDate()
		if (userBirthDate.toString() == 'Invalid Date') {
			return
		}

		switch (this.userType) {
			case 'PATIENT': // PATIENT
				if (this.form.status != 'VALID' || this.userImages.length != 2) {
					this._loaderService.hide()

					Swal.fire({
						title: 'Error',
						text: 'Por favor revise los datos ingresados. Todos los campos son obligatorios',
						icon: 'error',
						confirmButtonText: 'Ok'
					})

					return
				}

				let patient = new Patient()
				patient.dni = this.form.controls['dni'].value
				patient.email = this.form.controls['email'].value
				patient.healthInsurance = this.form.controls['healthInsurance'].value
				patient.name = this.form.controls['name'].value
				patient.surname = this.form.controls['surname'].value
				patient.type = 'PATIENT'
				patient.password = this.form.controls['password'].value

				let pDate = moment(this.userBirthDate, "DD/MM/YYYY").toDate()
				pDate.setMinutes( pDate.getMinutes() + pDate.getTimezoneOffset() ) // Para corregir problemas de zona horaria
				pDate.setHours(0,0,0,0) // Setea el tiempo en 0

				patient.birthDate = Timestamp.fromDate(pDate)

				this._auth.signUp(patient).then(async x => {
					if (x) {

						// UPLOAD IMAGE
						for (const image of this.userImages) {
							const imgURL = await this._storage.uploadFile(image)
							let imgStr = imgURL as string
							x.images.push(imgStr)
						}

						this._users.update(x)
						// END UPLOAD IMAGE

						let createdUser = this._auth.getAuthCurrentUser()
						createdUser.then(x => {
							x?.sendEmailVerification().then(() => {
								this._loaderService.hide()

								Swal.fire({
									title: 'Registro completado',
									text: 'Se ha registrado tu cuenta. Se envió un email a tu correo electrónico con las instrucciones para verificar tu cuenta. No olvides revisar la carpeta de spam',
									icon: 'success',
									confirmButtonText: 'Ok'
								}).then(x => {
									this._router.navigate(['/login'])
								})


							}).catch(() => {
								this._loaderService.hide()

								Swal.fire({
									title: 'Error',
									text: 'No se ha podido enviar el email de verificación. Por favor revise los datos ingresados',
									icon: 'error',
									confirmButtonText: 'Ok'
								})
							})
						})
					} else {
						this._loaderService.hide()

						Swal.fire({
							title: 'Error',
							text: 'No se ha podido realizar el registro correctamente. Por favor verifique los datos ingresados. Puede que el email sea inválido o esté en uso.',
							icon: 'error',
							confirmButtonText: 'Ok'
						})
					}
				})
				break
			case 'SPECIALIST': // SPECIALIST

				if (this.form.status != 'VALID' || !this.specialitySelected || this.userImages.length != 1) {
					this._loaderService.hide()

					Swal.fire({
						title: 'Error',
						text: 'Por favor revise los datos ingresados. Todos los campos son obligatorios.',
						icon: 'error',
						confirmButtonText: 'Ok'
					})
					return
				}

				let specialist = new Specialist()
				specialist.dni = this.form.controls['dni'].value
				specialist.email = this.form.controls['email'].value
				specialist.speciality = this.specialitySelected
				specialist.name = this.form.controls['name'].value
				specialist.surname = this.form.controls['surname'].value
				specialist.type = 'SPECIALIST'
				specialist.password = this.form.controls['password'].value

				let sDate = moment(this.userBirthDate, "DD/MM/YYYY").toDate()
				sDate.setMinutes( sDate.getMinutes() + sDate.getTimezoneOffset() ) // Para corregir problemas de zona horaria
				sDate.setHours(0,0,0,0) // Setea el tiempo en 0

				specialist.birthDate = Timestamp.fromDate(sDate)

				this._auth.signUp(specialist).then(async x => {
					if (x) {

						// UPLOAD IMAGE
						for (const image of this.userImages) {
							const imgURL = await this._storage.uploadFile(image)
							let imgStr = imgURL as string
							x.images.push(imgStr)
						}

						this._users.update(x)
						// END UPLOAD IMAGE


						let createdUser = this._auth.getAuthCurrentUser()
						createdUser.then(x => {
							x?.sendEmailVerification().then(() => {
								this._loaderService.hide()

								Swal.fire({
									title: 'Registro completado',
									text: 'Se ha registrado tu cuenta. Se envió un email a tu correo electrónico con las instrucciones para verificar tu cuenta. No olvides revisar la carpeta de spam',
									icon: 'success',
									confirmButtonText: 'Ok'
								}).then(x => {
									this._router.navigate(['/login'])
								})

							}).catch(() => {
								this._loaderService.hide()

								Swal.fire({
									title: 'Error',
									text: 'No se ha podido enviar el email de verificación. Por favor revise los datos ingresados',
									icon: 'error',
									confirmButtonText: 'Ok'
								})
							})
						})
					} else {
						this._loaderService.hide()

						Swal.fire({
							title: 'Error',
							text: 'No se ha podido realizar el registro correctamente. Por favor verifique los datos ingresados. Puede que el email sea inválido o esté en uso.',
							icon: 'error',
							confirmButtonText: 'Ok'
						})
					}
				})
				break
			case 'ADMIN':
				if (this.form.status != 'VALID' || this.userImages.length != 1) {
					this._loaderService.hide()

					Swal.fire({
						title: 'Error',
						text: 'Por favor revise los datos ingresados. Todos los campos son obligatorios.',
						icon: 'error',
						confirmButtonText: 'Ok'
					})

					return
				}
				
				let admin = new User()
				admin.dni = this.form.controls['dni'].value
				admin.email = this.form.controls['email'].value
				admin.name = this.form.controls['name'].value
				admin.surname = this.form.controls['surname'].value
				admin.type = 'ADMIN'
				admin.password = this.form.controls['password'].value
				admin.approvedProfile = true

				let adminDate = new Date(this.userBirthDate)
				adminDate.setMinutes( adminDate.getMinutes() + adminDate.getTimezoneOffset() ) // Para corregir problemas de zona horaria
				adminDate.setHours(0,0,0,0) // Setea el tiempo en 0

				admin.birthDate = Timestamp.fromDate(adminDate)

				this._auth.signUp(admin).then(async x => {
					if (x) {

						// UPLOAD IMAGE
						for (const image of this.userImages) {
							const imgURL = await this._storage.uploadFile(image)
							let imgStr = imgURL as string
							x.images.push(imgStr)
						}

						this._users.update(x)
						// END UPLOAD IMAGE


						let createdUser = this._auth.getAuthCurrentUser()
						createdUser.then(x => {
							x?.sendEmailVerification().then(() => {
								this._loaderService.hide()

								Swal.fire({
									title: 'Registro completado',
									text: 'Se ha registrado tu cuenta. Se envió un email a tu correo electrónico con las instrucciones para verificar tu cuenta. No olvides revisar la carpeta de spam',
									icon: 'success',
									confirmButtonText: 'Ok'
								}).then(x => {
									this._router.navigate(['/login'])
								})

							}).catch(() => {
								this._loaderService.hide()

								Swal.fire({
									title: 'Error',
									text: 'No se ha podido enviar el email de verificación. Por favor revise los datos ingresados',
									icon: 'error',
									confirmButtonText: 'Ok'
								})
							})
						})
					} else {
						this._loaderService.hide()
						
						Swal.fire({
							title: 'Error',
							text: 'No se ha podido realizar el registro correctamente. Por favor verifique los datos ingresados. Puede que el email sea inválido o esté en uso.',
							icon: 'error',
							confirmButtonText: 'Ok'
						})
					}
				})
			break
		}
	}

	
	handleFileInput(files:File[]){
		this.userImages = []
		let maxFileSizeExceeded = false
		files.forEach(x => {
			if (x.size > 2000000) {
				maxFileSizeExceeded = true
			}
		})
		if (maxFileSizeExceeded) {
			Swal.fire({
				title: 'Error',
				text: 'Las imagenes no pueden exceder los 2 MB',
				icon: 'error',
				confirmButtonText: 'Ok'
			})
			this.fileUploader.clear()
			return
		}

		switch (this.userType) {
			case 'PATIENT': // PATIENT

				if (files.length != 2) {
					Swal.fire({
						title: 'Error',
						text: 'Debe seleccionar dos imágenes para completar el registro correctamente',
						icon: 'error',
						confirmButtonText: 'Ok'
					})
					this.fileUploader.clear()
					return
				}
				break
			default: // SPECIALIST, ADMIN

				if (files.length != 1) {
					Swal.fire({
						title: 'Error',
						text: 'Debe seleccionar una imagen para completar el registro correctamente',
						icon: 'error',
						confirmButtonText: 'Ok'
					})
					this.fileUploader.clear()
					return
				}
				break
		}

		files.forEach((file:File) => {
			this.userImages.push(file)
		})

	}

	removeFile(file:File){
		this.userImages = this.userImages.filter((img:File) => { return img !== file })
	}

	goBack(){
		this.onReturn.emit(true)
	}
}