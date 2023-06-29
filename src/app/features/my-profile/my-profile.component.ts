import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/users/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Patient } from '../login/models/patient';
import { Specialist } from '../login/models/specialist';
import { Timestamp } from '@angular/fire/firestore'
import { AppointmentsService } from '../appointments/services/appointments.service';
import { ClinicalRecordsService } from '../appointments/services/clinical-records.service';
import { MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualizeClinicalRecordsComponent } from '../appointments/visualize-clinical-records/visualize-clinical-records.component';
import { UsersService } from 'src/app/core/models/users/users.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Appointment } from '../appointments/models/appointment';
import { TimestampUtils } from 'src/app/core/utils/timestamp-utils';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [MessageService, DialogService]
})
export class MyProfileComponent {

	currentUser:User|undefined;
	currentSpecialist:Specialist|undefined;

	currentPatient:Patient|undefined;
	specialities:string[] = []
	selectedSpecialities:string[] = []
	filteredAppointments:Appointment[] = []
	
	dialog: DynamicDialogRef | undefined;
	
	@ViewChild('pdfContent') pdfContent!: ElementRef;


	constructor(
		private _auth:AuthService, 
		private _loaderService:LoaderService,
		private _appointmentsService:AppointmentsService,
		private _usersService:UsersService,
		private _clinicalRecordsService:ClinicalRecordsService,
		public dialogService: DialogService, 
		public messageService: MessageService,
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

						this.currentPatient.appointments.sort((a, b) => { 
							return  (Object.assign(new Timestamp(0, 0), b.date).toMillis() + b.timeRange.from.hours) 
									- ( Object.assign(new Timestamp(0, 0), a.date).toMillis() + a.timeRange.from.hours)
						  })

						this.currentPatient.appointments.forEach(app => {
							this._clinicalRecordsService.getByField('appointmentId', app.id).then(record => {
								app.clinicalRecords = record[0]
							})

							this._usersService.getById(app.specialistId).subscribe(spe => {
								app.specialist = spe
							})

							if (!this.specialities.includes(app.speciality)) {
								this.specialities.push(app.speciality)
							}
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
		let objTimestamp = Object.assign(new Timestamp(0, 0), timestamp)
		if (objTimestamp) {
			return TimestampUtils.getDateByTimestamp(objTimestamp);
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

	refreshSpecialities(){
		this.filteredAppointments = this.currentPatient?.appointments?.filter(x => { return this.selectedSpecialities.includes(x.speciality) }) ?? []
	}

	downloadClinicalRecords(){
		// Generar el PDF a partir del contenido del componente
		const component = this.pdfContent.nativeElement
		component.style.display = 'block'
		const pdf = new jsPDF.jsPDF();

		pdf.html(component.innerHTML).then(() => {
			pdf.save('fileName.pdf')
		});
		component.style.display = 'none'
	}  

	// NEW INPUT: return items as SelectItem
	get itemsAsSelectItems(): SelectItem [] {
		return this.specialities.map((item) => ({ label: item, value: item } as SelectItem));
  	}
}
