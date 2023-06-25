import { Component } from '@angular/core';
import { User } from 'src/app/core/models/users/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Patient } from '../login/models/patient';
import { Specialist } from '../login/models/specialist';
import { Timestamp } from '@angular/fire/firestore'
import { AppointmentsService } from '../appointments/services/appointments.service';
import { ClinicalRecordsService } from '../appointments/services/clinical-records.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualizeClinicalRecordsComponent } from '../appointments/visualize-clinical-records/visualize-clinical-records.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [MessageService, DialogService]
})
export class MyProfileComponent {

	currentUser:User|undefined;
	currentPatient:Patient|undefined;
	currentSpecialist:Specialist|undefined;
	
	dialog: DynamicDialogRef | undefined;

	constructor(
		private _auth:AuthService, 
		private _loaderService:LoaderService,
		private _appointmentsService:AppointmentsService,
		private _clinicalRecordsService:ClinicalRecordsService,
		public dialogService: DialogService, 
		public messageService: MessageService
	) {
		this._loaderService.show()	
	}

	ngOnInit(): void {
		this._auth.currentUser$.subscribe(x => {
			this.currentUser = x as User;
			

			if (x?.type == 'PATIENT') {
				
				this.currentPatient = x as Patient;
				this._appointmentsService.getByField('patientId', this.currentPatient.id).then(appointments => {
					if (this.currentPatient) {
						this.currentPatient.appointments = appointments
						this.currentPatient.appointments.forEach(app => {
							this._clinicalRecordsService.getByField('appointmentId', app.id).then(record => {
								app.clinicalRecords = record[0]
							})
						})
					}
				})

				
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

	viewClinicalRecords(){
		if (this.currentPatient) {
			this.dialog = this.dialogService.open(VisualizeClinicalRecordsComponent, {
				header: 'Historia clínica',
				contentStyle: { overflow: 'auto' },
				data: this.currentPatient.appointments?? []
			  });
		}
	}
}
