import { Component } from '@angular/core';
import { User } from 'src/app/core/models/users/user';
import { UsersService } from 'src/app/core/models/users/users.service';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent {

	users: User[] = [];

	constructor(private _users:UsersService) { }

	ngOnInit(): void {
		this._users.getAll().subscribe(result => {
			this.users = result;
		})
	}

	updateUserStatus(user:User){
		this._users.update(user);
	}
}