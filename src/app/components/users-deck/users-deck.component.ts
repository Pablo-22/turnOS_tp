import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/users/user';
import { LoginInput } from 'src/app/features/login/models/login-input';
import { Patient } from 'src/app/features/login/models/patient';
import { Specialist } from 'src/app/features/login/models/specialist';

@Component({
  selector: 'app-users-deck',
  templateUrl: './users-deck.component.html',
  styleUrls: ['./users-deck.component.scss']
})
export class UsersDeckComponent {

	@Output() userSelected = new EventEmitter<LoginInput>();

	@Input()
	users:Observable<User[]> = new Observable<User[]>()

	admins:User[] = []
	specialists:Specialist[] = []
	patients:Patient[] = []

	constructor() { }

	ngOnInit(): void {
		this.users.subscribe(x => {
			this.admins = this.getUsersOfType(x, 'ADMIN', 1);
			this.specialists = this.getUsersOfType(x, 'SPECIALIST', 2) as Specialist[]
			this.patients = this.getUsersOfType(x, 'PATIENT', 3) as Patient[]
		})
		
	}

	onUserSelected(user:User){
		let loginData = new LoginInput()
		loginData.email = user.email
		loginData.password = user.password
		this.userSelected.emit(loginData);
	}

	getUsersOfType(users:User[], type:'ADMIN'|'PATIENT'|'SPECIALIST' , amount:number){
		let filteredUsers = users.filter(user => { return user.type == type })
		let slicedUsers = filteredUsers.sort((a, b) => { 
			if (b < a) {
				return -1
			} else if (b > a) {
				return 1
			} else {
				return 0
			}
		}).slice(0, amount);

		return slicedUsers
	}
}
