import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Appointment } from '../models/appointment';
import { ClinicalRecords } from '../models/clinical-records';
import { ClinicalRecordsService } from '../services/clinical-records.service';
import { Timestamp } from '@angular/fire/firestore';


@Component({
  selector: 'app-clinical-records-dashboard',
  templateUrl: './clinical-records-dashboard.component.html',
  styleUrls: ['./clinical-records-dashboard.component.scss'],
})
export class ClinicalRecordsDashboardComponent {

  @Input()
	appointments:Appointment[] = []
  clinicalRecords:ClinicalRecords[] = []



  index:number = 0
  totalElements:number = 0

	showErrorMsg:boolean = false
	
	constructor(
		private _clinicalRecordsService:ClinicalRecordsService 
	){
    this.totalElements = this.appointments.length

    this.appointments.sort((a, b) => { 
      return  (Object.assign(new Timestamp(0, 0), b.date).toMillis() + b.timeRange.from.hours) 
              - ( Object.assign(new Timestamp(0, 0), a.date).toMillis() + a.timeRange.from.hours)
    })

    this.appointments.forEach(app => {
      this._clinicalRecordsService.getByField('appointmentId', app.id).then(x => {
        app.clinicalRecords = x[0]
      })
    })    
	}

  getDate(){
    return new Date()
  }
}
