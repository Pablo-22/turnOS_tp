import { Component, Input } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Appointment } from '../models/appointment';
import { ClinicalRecords, Measurement } from '../models/clinical-records';
import { ClinicalRecordsService } from '../services/clinical-records.service';
import { Timestamp } from '@angular/fire/firestore';

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

    this.appointments.sort((b, a) => { 
      return  (Object.assign(new Timestamp(0, 0), a.date).toMillis() + a.timeRange.from.hours) 
              - ( Object.assign(new Timestamp(0, 0), b.date).toMillis() + b.timeRange.from.hours)
    })

    this.appointments.forEach(app => {
      this._clinicalRecordsService.getByField('appointmentId', app.id).then(x => {
        this.clinicalRecords.push(...x)
        this.getElement()
      })
    })    
	}

  onNext(){
    if (this.index == this.totalElements - 1) {
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
