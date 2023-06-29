import { Component } from '@angular/core';
import { User } from 'src/app/core/models/users/user';
import { UsersService } from 'src/app/core/models/users/users.service';
import { AppointmentsService } from '../appointments/services/appointments.service';
import { ClinicalRecordsService } from '../appointments/services/clinical-records.service';
import { Patient } from '../login/models/patient';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualizeClinicalRecordsComponent } from '../appointments/visualize-clinical-records/visualize-clinical-records.component';
import * as XLSX from 'xlsx'; 
import { TimestampUtils } from 'src/app/core/utils/timestamp-utils';
import { Timestamp } from '@angular/fire/firestore';
import { AppointmentUtils } from 'src/app/utils/appointment-utils';
import { Specialist } from '../login/models/specialist';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss'],
  providers: [MessageService, DialogService]
})
export class UsersManagerComponent {

	users: User[] = []
	patients:Patient[] = []

	dialog: DynamicDialogRef | undefined;

	constructor(
		private _users:UsersService,
		private _appointmentsService:AppointmentsService,
		private _clinicalRecordsService:ClinicalRecordsService,
		private _loaderService:LoaderService,
		public dialogService: DialogService, 
		public messageService: MessageService
	) { }

	ngOnInit(): void {
		this._loaderService.show()
		this._users.getAll().subscribe(result => {
			this.users = result.map(x => { return this._users.parse(x) })
			this.patients = this.users.filter(x => { return x.type == 'PATIENT' }) as Patient[]
			
			this._loaderService.hide()

			this.patients.forEach((patient:Patient) => {
				this._appointmentsService.getByField('patientId', patient.id).then(appointment => {
					patient.appointments?.push(...appointment)
					patient.appointments?.forEach(app => {
						this._clinicalRecordsService.getByField('appointmentId', app.id).then(cli => {
							app.clinicalRecords = cli[0]
						})

						app.specialist = this.users.filter(x => { return x.id == app.specialistId })[0] as Specialist
					})
				})
			})
		})
	}

	updateUserStatus(user:User){
		this._users.update(user);
	}

	viewClinicalRecords(user:User){
		const patient = user as Patient
		this.dialog = this.dialogService.open(VisualizeClinicalRecordsComponent, {
			header: 'Historia clínica',
			contentStyle: { overflow: 'auto' },
			data: patient.appointments?? []
		});
	}

	onDownloadRecords(user:Patient){
		let excelDataSource: any[] = [];

		user.appointments?.forEach(appointment => {
			let row = {
				Paciente: user.name + " " + user.surname,
				FechaTurno: TimestampUtils.getDateByTimestamp(Object.assign(new Timestamp(0, 0), appointment.date)),
				HoraDesde: AppointmentUtils.parseTime(appointment.timeRange.from),
				HoraHasta: AppointmentUtils.parseTime(appointment.timeRange.to),
				Especialista: appointment.specialist?.name + " " + appointment.specialist?.surname,
				Especialidad: appointment.speciality,
				Status: AppointmentUtils.getAppointmentStateText(appointment.status),
				RazonStatus: appointment.statusReason
			};

			excelDataSource.push(row);
		});

		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelDataSource);
		const workbook: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
		XLSX.writeFile(workbook, user.name + user.surname + '.xlsx');
	}

	downloadUsersExcel(){
		let excelDataSource: any[] = [];

		this.users.forEach(user => {
			let row = {
				Nombre: user.name,
				Apellido: user.surname,
				Perfil: user.type,
				DNI: user.dni,
				Imagenes: user.images.join("\n"),
				Nacimiento: TimestampUtils.getDateByTimestamp(user.birthDate).toString(),
				PerfilAprobado: user.approvedProfile
			};

			excelDataSource.push(row);
		});

		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelDataSource);
		const workbook: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
		XLSX.writeFile(workbook, 'turnOS-users.xlsx');
	}
}