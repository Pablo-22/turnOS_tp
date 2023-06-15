import { Component } from '@angular/core';
import { User } from 'src/app/core/models/users/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Patient } from '../login/models/patient';
import { Specialist } from '../login/models/specialist';
import { Timestamp } from '@angular/fire/firestore'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {

	currentUser:User|undefined;
	currentPatient:Patient|undefined;
	currentSpecialist:Specialist|undefined;

	constructor(private _auth:AuthService, private _loaderService:LoaderService) {
		this._loaderService.show()	
	}

	ngOnInit(): void {
		this._auth.currentUser$.subscribe(x => {
			this.currentUser = x as User;
			if (x?.type == 'PATIENT') {
				
				this.currentPatient = x as Patient;
			} else if(x?.type == 'SPECIALIST') {
				this.currentSpecialist = x as Specialist;
			}
			this._loaderService.hide();
		})
	}

	formatTimestampToDate(timestamp:Timestamp|undefined){
		if (timestamp && timestamp.constructor.name == 'Timestamp') {
			return timestamp.toDate();
		}
		return '';
	}
}
