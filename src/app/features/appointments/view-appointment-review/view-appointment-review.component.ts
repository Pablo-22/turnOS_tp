import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-view-appointment-review',
  templateUrl: './view-appointment-review.component.html',
  styleUrls: ['./view-appointment-review.component.scss']
})
export class ViewAppointmentReviewComponent {

  appointment: Appointment = new Appointment()

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.appointment = this.config.data;
  }

}
