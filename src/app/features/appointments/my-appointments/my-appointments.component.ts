import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';
import { UsersService } from 'src/app/core/models/users/users.service';
import { Appointment } from '../models/appointment';
import { User } from 'src/app/core/models/users/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MenuItem, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { AppointmentStates } from '../enums/appointment-states';
import { AppointmentUtils } from 'src/app/utils/appointment-utils';
import Swal from 'sweetalert2';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReviewAppointmentComponent } from '../review-appointment/review-appointment.component';
import { SurveyComponent } from '../survey/survey.component';
import { ViewAppointmentReviewComponent } from '../view-appointment-review/view-appointment-review.component';
import { NewClinicalRecordFormComponent } from '../new-clinical-record-form/new-clinical-record-form.component';
import { ClinicalRecords } from '../models/clinical-records';
import { ClinicalRecordsService } from '../services/clinical-records.service';
import { Timestamp } from '@angular/fire/firestore';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
  providers: [MessageService, DialogService, AppModule]
})
export class MyAppointmentsComponent implements OnInit {
  appointments: Appointment[] | undefined;
  users: User[] | undefined;
  currentUser: User | undefined;

  searchStr: string = '';

  items: MenuItem[] = []

  appointmentSelected:Appointment = new Appointment()

  dialog: DynamicDialogRef | undefined;

  constructor(
    private _appointmentsService: AppointmentsService,
    private _usersService: UsersService,
    private _authService: AuthService,
    private _loaderService: LoaderService,
    private _clinicalRecords: ClinicalRecordsService,
    public dialogService: DialogService, 
    public messageService: MessageService
  ) {
    this._loaderService.show();

    this._authService.currentUser$.subscribe((x) => {
    this.currentUser = x;

      if (x?.type == 'PATIENT') {

        this._appointmentsService
        .getByField('patientId', this.currentUser?.id ?? '')
        .then((x) => {
          this.appointments = x;
          this._loaderService.hide();

          this.appointments.sort((a, b) => { 
            return  (Object.assign(new Timestamp(0, 0), b.date).toMillis() + b.timeRange.from.hours) 
                    - ( Object.assign(new Timestamp(0, 0), a.date).toMillis() + a.timeRange.from.hours)
          })

          this.appointments.forEach((appointment) => {
            this._usersService
              .getById(appointment.specialistId)
              .subscribe((x) => {
                appointment.specialist = x;
              });
            
            this._clinicalRecords.getByField('appointmentId', appointment.id).then(x => {
              appointment.clinicalRecords = x[0]
            })
          });

        });
      } else if (x?.type == 'SPECIALIST'){
        this._appointmentsService
        .getByField('specialistId', this.currentUser?.id ?? '')
        .then((x) => {
          this.appointments = x;
          this._loaderService.hide();

          this.appointments.sort((a, b) => { 
            return  (Object.assign(new Timestamp(0, 0), b.date).toMillis() + b.timeRange.from.hours) 
                    - ( Object.assign(new Timestamp(0, 0), a.date).toMillis() + a.timeRange.from.hours)
          })

          this.appointments.forEach((appointment) => {
            this._usersService
              .getById(appointment.patientId)
              .subscribe((x) => {
                appointment.patient = x;
              });

            this._clinicalRecords.getByField('appointmentId', appointment.id).then(x => {
              appointment.clinicalRecords = x[0]
            })
          });
        });
      } else if (x?.type == 'ADMIN'){
        this._appointmentsService.getAll().subscribe(x => {
          this.appointments = x;
          this._loaderService.hide();

          this.appointments.sort((a, b) => { 
            return  (Object.assign(new Timestamp(0, 0), b.date).toMillis() + b.timeRange.from.hours) 
                    - ( Object.assign(new Timestamp(0, 0), a.date).toMillis() + a.timeRange.from.hours)
          })

          this.appointments.forEach((appointment) => {
            this._usersService
              .getById(appointment.patientId)
              .subscribe((x) => {
                appointment.patient = x;
              });

            this._usersService
              .getById(appointment.specialistId)
              .subscribe((x) => {
                appointment.specialist = x;
              });
            
            this._clinicalRecords.getByField('appointmentId', appointment.id).then(x => {
              appointment.clinicalRecords = x[0]
            })
          });
        })
      }
    })
  }

  ngOnInit(): void {}

  cancelAppointment() {
    const swal = Swal.mixin({
      customClass: {
        confirmButton: 'p-btn-danger',
        cancelButton: 'p-btn-primary',
        title: 'font-segoe',
        inputLabel: 'font-segoe'
      }
    })

    swal.fire({
      title: 'Cancelar turno',
      text:'¿Desea cancelar el turno? Esta acción no se puede deshacer.',
      inputLabel:'Coloque el motivo de la cancelación del turno',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Conservar turno',
      confirmButtonText: 'Cancelar turno',
    }).then(x => {
      if (x.isConfirmed) {
        this.appointmentSelected.canceledReason = x.value
        this.appointmentSelected.status = AppointmentStates.Canceled;
        this.appointmentSelected.statusReason = 'El turno fue cancelado por el paciente.';
        this._appointmentsService.update(this.appointmentSelected);
      }
    })
  }

  getStateText(status: AppointmentStates) {
    return AppointmentUtils.getAppointmentStateText(status);
  }

  getData(appointment:Appointment){
    this.appointmentSelected = appointment
    this.items = []

    if (this.currentUser?.type == 'PATIENT') {

      if (appointment.status == AppointmentStates.Completed) {
        if (!appointment.survey) {
          this.items.push(
            {
              label: 'Completar encuesta',
              icon: 'pi pi-pencil',
              command: () => {
                this.completeSurvey();
              },
            }
          )
        }

        if (appointment.review) {
          this.items.push(
            {
              label: 'Ver reseña',
              icon: 'pi pi-book',
              command: () => {
                this.viewReview();
              },
            } 
          )
        } else {
          this.items.push(
            {
              label: 'Calificar atención',
              icon: 'pi pi-star',
              command: () => {
                this.reviewAttention();
              },
            }
          )
        }
      } else if (![AppointmentStates.Rejected, AppointmentStates.Canceled].includes(appointment.status)){
        this.items.push(
          {
            label: 'Cancelar turno',
            icon: 'pi pi-times',
            command: () => {
              this.cancelAppointment();
            },
          }
        )
      }

    } else if (this.currentUser?.type == 'SPECIALIST'){
      if ([AppointmentStates.Created, AppointmentStates.Requested].includes(appointment.status)) {
        this.items.push(
          {
            label: 'Rechazar turno',
            icon: 'pi pi-times',
            command: () => {
              this.rejectAppointment();
            },
          },
          {
            label: 'Aceptar turno',
            icon: 'pi pi-check',
            command: () => {
              this.acceptAppointment();
            },
          }
        )
      } else if ([AppointmentStates.Accepted].includes(appointment.status)) {
        this.items.push(
          {
            label: 'Finalizar turno',
            icon: 'pi pi-check-square',
            command: () => {
              this.finishAppointment();
            },
          }
        )
      } else if ([AppointmentStates.Completed].includes(appointment.status) && !appointment.clinicalRecords?.id) {
        this.items.push(
          {
            label: 'Cargar historia clínica',
            icon: 'pi pi-check-square',
            command: () => {
              this.finishAppointment();
            },
          }
        )
      } 

      if (appointment.review) {
        this.items.push(
          {
            label: 'Ver reseña',
            icon: 'pi pi-book',
            command: () => {
              this.viewReview();
            },
          },
        )
      }
    } else if(this.currentUser?.type == 'ADMIN'){
      if (
        ![
          AppointmentStates.Rejected, 
          AppointmentStates.Canceled, 
          AppointmentStates.Accepted, 
          AppointmentStates.Completed
        ].includes(appointment.status)
      ){
        this.items.push(
          {
            label: 'Cancelar turno',
            icon: 'pi pi-times',
            command: () => {
              this.cancelAppointment();
            },
          }
        )
      }
    }

    if (this.items.length == 0) {
      this.items.push({ label: 'No hay acciones dispoinbles' })
    }
  }

  viewReview(): void {
    this.dialog = this.dialogService.open(ViewAppointmentReviewComponent, {
      header: 'Reseña',
      contentStyle: { overflow: 'auto' },
      data: this.appointmentSelected
    });
  }

  completeSurvey(): void {
    this.dialog = this.dialogService.open(SurveyComponent, {
      header: 'Completar encuesta',
      contentStyle: { overflow: 'auto' },
      data: this.appointmentSelected
    });

    this.dialog.onClose.subscribe((appointment:Appointment) => {
      this._appointmentsService.update(appointment)
    });
  }

  acceptAppointment(): void {
    this.appointmentSelected.status = AppointmentStates.Accepted;
    this.appointmentSelected.statusReason = 'El turno solicitado fue aceptado por el especialista.';
    this._appointmentsService.update(this.appointmentSelected);
  }

  reviewAttention(): void {
    this.dialog = this.dialogService.open(ReviewAppointmentComponent, {
      header: 'Calificar atención',
      contentStyle: { overflow: 'auto' },
      data: this.appointmentSelected
    });

    this.dialog.onClose.subscribe((appointment:Appointment) => {
      this._appointmentsService.update(appointment)
    });
  }

  rejectAppointment(): void {
    const swal = Swal.mixin({
      customClass: {
        confirmButton: 'p-btn-danger',
        cancelButton: 'p-btn-primary',
        title: 'font-segoe',
        inputLabel: 'font-segoe'
      }
    })

    swal.fire({
      title: 'Rechazar turno',
      text:'¿Desea rechazar el turno? Esta acción no se puede deshacer.',
      inputLabel:'Coloque el motivo del rechazo del turno',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Conservar turno',
      confirmButtonText: 'Rechazar turno',
    }).then(x => {
      if (x.isConfirmed) {
        this.appointmentSelected.canceledReason = x.value
        this.appointmentSelected.status = AppointmentStates.Rejected;
        this.appointmentSelected.statusReason = 'El turno fue rechazado por el especialista.';
        this._appointmentsService.update(this.appointmentSelected);
      }
    })
  }

  finishAppointment(): void {
    this.dialog = this.dialogService.open(NewClinicalRecordFormComponent, {
      header: 'Cargar datos del paciente',
      contentStyle: { overflow: 'auto' },
      data: this.appointmentSelected
    });

    this.dialog.onClose.subscribe((result:ClinicalRecords) => {
      this.appointmentSelected.clinicalRecords = result
      if (result.id && this.appointmentSelected.status != AppointmentStates.Completed) {
        this.appointmentSelected.status = AppointmentStates.Completed;
        this.appointmentSelected.statusReason = 'El turno fue marcado como completado por el especialista.';
        this._appointmentsService.update(this.appointmentSelected);
      }
    });    
  }
}
