import { Component, Input } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Appointment } from '../models/appointment';
import { ClinicalRecords, Measurement } from '../models/clinical-records';
import { ClinicalRecordsService } from '../services/clinical-records.service';

@Component({
  selector: 'app-visualize-clinical-records',
  templateUrl: './visualize-clinical-records.component.html',
  styleUrls: ['./visualize-clinical-records.component.scss']
})
export class VisualizeClinicalRecordsComponent {

	appointments:Appointment[] = []
  clinicalRecords:ClinicalRecords[] = []

  currentAppointment:Appointment = new Appointment()
  currentClinicalRecord:ClinicalRecords = new ClinicalRecords()
  index:number = 0
  totalElements:number = 0

	showErrorMsg:boolean = false
	
	constructor(
		public ref: DynamicDialogRef,
		public config:DynamicDialogConfig,
		private _clinicalRecordsService:ClinicalRecordsService 
	){
		this.appointments = this.config.data
    this.totalElements = this.appointments.length

    this.appointments.forEach(app => {
      this._clinicalRecordsService.getByField('appointmentId', app.id).then(x => {
        this.clinicalRecords.push(...x)
        console.log(this.clinicalRecords)
        this.getElement()
      })
    })    
	}

  onNext(){
    if (this.index == this.totalElements) {
      return
    }

    this.index++

    this.getElement()
  }

  onPrevious(){
    if (this.index == 0) {
      return
    }

    this.index--
    this.getElement()
  }

  getElement(){
    this.currentAppointment = this.appointments[this.index]
    this.currentClinicalRecord = this.clinicalRecords.filter(x => { 
      return x.appointmentId == this.currentAppointment.id
    })[0]
  }
}
