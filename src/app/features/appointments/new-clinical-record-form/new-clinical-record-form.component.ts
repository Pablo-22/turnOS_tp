import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Appointment } from '../models/appointment';
import { Survey } from '../models/survey';
import { ClinicalRecords, Measurement } from '../models/clinical-records';
import { ClinicalRecordsService } from '../services/clinical-records.service';

@Component({
  selector: 'app-new-clinical-record-form',
  templateUrl: './new-clinical-record-form.component.html',
  styleUrls: ['./new-clinical-record-form.component.scss']
})
export class NewClinicalRecordFormComponent {
	
	@Input()
	appointment:Appointment = new Appointment()

  	clinicalRecords:ClinicalRecords = new ClinicalRecords()

	showErrorMsg:boolean = false
	
	constructor(
		public ref: DynamicDialogRef,
		public config:DynamicDialogConfig,
		private _clinicalRecordsService:ClinicalRecordsService 
	){
		this.appointment = this.config.data
	}

	onSubmit(){
		if (!this.appointment.id) {
			return
		}

		if (
			this.clinicalRecords.height.value == '' 
			|| this.clinicalRecords.weight.value == ''
			|| this.clinicalRecords.pressure.value == '' 
			|| this.clinicalRecords.temperature.value == '' 
			|| this.clinicalRecords.dynamicMeasurements.some(x => { return x.name == '' || x.value == '' })
		) {
			this.showErrorMsg = true
			return
		}
		this.showErrorMsg = false

		this.clinicalRecords.appointmentId = this.appointment.id
		this._clinicalRecordsService.create(this.clinicalRecords)
		this.ref.close(this.clinicalRecords)
	}

	onAddDynamicMeasurement(){
		if (this.clinicalRecords.dynamicMeasurements.length < 3) {
			this.clinicalRecords.dynamicMeasurements.push(new Measurement("", "", ""))
		}
	}

	deleteDynamicMeasurement(index:number){
		this.clinicalRecords.dynamicMeasurements.splice(index, 1)
	}
}
