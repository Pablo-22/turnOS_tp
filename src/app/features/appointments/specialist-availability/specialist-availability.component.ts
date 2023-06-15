import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SpecialistAvailability } from '../models/specialist-availability';
import { SpecialistsAvailabilityService } from '../services/specialists-availability.service';
import { Time } from '../models/time';
import { TimeRange } from '../models/time-range';
import { DayAvailability } from '../models/day-availability';
import Swal from 'sweetalert2';
import { Specialist } from '../../login/models/specialist';

@Component({
  selector: 'app-specialist-availability',
  templateUrl: './specialist-availability.component.html',
  styleUrls: ['./specialist-availability.component.scss']
})
export class SpecialistAvailabilityComponent {

	days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
	selectedDays:string[] = []

	specialities: string[] = []
	selectedSpecialities: string[] = []

	fromTime:string = ''
	toTime:string = ''

	currentUserAvailability:SpecialistAvailability = new SpecialistAvailability()

	constructor(
		private _auth:AuthService, 
		private _availabilityService:SpecialistsAvailabilityService
	) {
	}

	ngOnInit(): void {
		this._auth.currentUser$.subscribe(x => {
			if (x?.type == 'SPECIALIST') {
				var specialist = x as Specialist
				this.specialities = specialist.speciality
				
				if (this.specialities.length == 1) {
					this.selectedSpecialities = this.specialities
				}
			}

			this._availabilityService.getByField('specialistId', x?.id ?? '').then(y => {
				y.forEach((s:SpecialistAvailability) => {
					let newObj = Object.assign(new SpecialistAvailability, s)
					this.currentUserAvailability = newObj;
				})
			})
		})
	}

	onAdd(){
		if (!this.selectedDays || !this.selectedSpecialities) {
			Swal.fire({
				title: 'Error',
				text: 'Debe seleccionar al menos un día y una especialidad.',
				icon: 'error',
				confirmButtonText: 'Ok'
			}).then(x => {
				return 
			})
		}

		let isNewAvailability:boolean = this.currentUserAvailability.id? false : true;

		let from = new Time()
		from.setHours(parseInt(this.fromTime.split(':')[0]))
		from.setMinutes(parseInt(this.fromTime.split(':')[1]))

		let to = new Time()
		to.setHours(parseInt(this.toTime.split(':')[0]))
		to.setMinutes(parseInt(this.toTime.split(':')[1]))

		let timeRange = new TimeRange()
		timeRange.from = from;
		timeRange.to = to;

		if (from.isBiggerThan(to) || from.isEqualThan(to)) {
			Swal.fire({
				title: 'Error',
				text: 'El horario "desde" no puede ser mayor a "hasta", y tampoco pueden ser iguales.',
				icon: 'error',
				confirmButtonText: 'Ok'
			}).then(x => {
				return 
			})
		}

		

		this.selectedSpecialities.forEach(speciality => {

			let daysAvailability:DayAvailability[] = [] 
			this.selectedDays.forEach(selectedDay => {
				let dayIndex = this.days.indexOf(selectedDay)

				let dayAvailability = new DayAvailability()
				dayAvailability.dayIndex = dayIndex 
				dayAvailability.range = timeRange
				
				dayAvailability.speciality = speciality
				daysAvailability.push(JSON.parse(JSON.stringify(dayAvailability)));
			});
			this.currentUserAvailability.addAvailability(speciality, daysAvailability)

			this._auth.currentUser$.subscribe(x => {
				if (x) {
					this.currentUserAvailability.specialistId = x.id
					if (isNewAvailability) {
						this.currentUserAvailability.id = this._availabilityService.create(this.currentUserAvailability);
					} else {
						this._availabilityService.update(this.currentUserAvailability);
					}
				}
			})
		})
		this.selectedDays = []
	}
}
