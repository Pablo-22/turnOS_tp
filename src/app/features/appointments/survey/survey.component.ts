import { Component, EventEmitter, Input } from '@angular/core';
import { Appointment } from '../models/appointment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Survey } from '../models/survey';
import { Specialist } from '../../login/models/specialist';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {
	@Input()
	appointment:Appointment = new Appointment()

	survey:Survey = new Survey()
	showErrorMsg:boolean = false
	
	constructor(public ref: DynamicDialogRef,public config:DynamicDialogConfig ){
		this.appointment = this.config.data

		this.survey = {
			appointmentId: this.appointment.id,
			specialistId: this.appointment.specialistId,
			patientId: this.appointment.patientId,
			questions: [
				{ question: '¿Cómo calificaría la amabilidad del personal de la clínica durante su visita?', answer: '' },
				{ question: '¿La clínica cumplió con sus expectativas en cuanto a la puntualidad de su turno?', answer: '' },
				{ question: '¿Está satisfecho con la explicación que recibió sobre su diagnóstico y tratamiento?', answer: '' },
				{ question: '¿La limpieza y organización de la clínica fueron adecuadas para usted?', answer: '' },
				{ question: '¿Recomendaría esta clínica a sus amigos y familiares?', answer: '' },
			]
		}
	}

	onSubmit(){
		if (this.survey.questions.some(x => { return x.answer == '' })) {
			this.showErrorMsg = true
			return
		}
		this.showErrorMsg = false
		this.appointment.survey = this.survey
		this.ref.close(this.appointment)
	}
}
