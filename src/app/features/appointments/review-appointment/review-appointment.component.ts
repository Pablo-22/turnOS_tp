import { Component, EventEmitter, Input } from '@angular/core';
import { Appointment } from '../models/appointment';
import Swal from 'sweetalert2';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-review-appointment',
  templateUrl: './review-appointment.component.html',
  styleUrls: ['./review-appointment.component.scss']
})
export class ReviewAppointmentComponent {
  rating!:number
  review:string = ''
  showErrorMsg:boolean = false

  @Input()
  appointment:Appointment = new Appointment()

  constructor(public ref: DynamicDialogRef,public config:DynamicDialogConfig ){
    this.appointment = this.config.data
  }

  onSubmit(){
    if (this.rating && this.review) {
      this.appointment.review = this.review
      this.appointment.rating = this.rating
      this.showErrorMsg = false
      this.ref.close(this.appointment)
    }else {
      this.showErrorMsg = true
    }
  }
}
