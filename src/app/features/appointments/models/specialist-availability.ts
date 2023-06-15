import { DataEntity } from "src/app/core/models/dataEntity/data-entity";
import { Appointment } from "./appointment";
import { WeekAvailability } from "./week-availability";
import { DayAvailability } from "./day-availability";
import { TimeRange } from "./time-range";
import { TimestampUtils } from "src/app/core/utils/timestamp-utils";

export class SpecialistAvailability extends DataEntity {
	specialistId:string = ''
	weekAvailability:WeekAvailability[] = []

	getAllAvailableAppointments(daysInterval:number){
		let appointments:Appointment[] = []
		this.weekAvailability.forEach(x => {
			appointments.push(...x.getAvailableAppointments(daysInterval))
		})
		return appointments
	}

	getAvailableAppointmentsBySpeciality(speciality:string, daysInterval:number){
		let appointments:Appointment[] = []
		this.weekAvailability.forEach(x => {
			if (x.speciality == speciality) {
				appointments.push(...x.getAvailableAppointments(daysInterval))
			}
		})
		return appointments
	}

	static getAllAvailableAppointments(specialistAvailability:SpecialistAvailability, daysInterval:number){
		let appointments:Appointment[] = []
		specialistAvailability?.weekAvailability.forEach(x => {
			appointments.push(...WeekAvailability.getAvailableAppointments(x, daysInterval))
		})
		return appointments
	}

	static getAvailableAppointmentsBySpeciality(specialistAvailability:SpecialistAvailability, speciality:string, daysInterval:number){
		let appointments:Appointment[] = []
		specialistAvailability.weekAvailability.forEach(x => {
			if (x.speciality == speciality) {
				appointments.push(...WeekAvailability.getAvailableAppointments(x, daysInterval, specialistAvailability.specialistId))
			}
		})
		return appointments
	}

	static applyRestrictions(available:Appointment[], appointed:Appointment[]){
		let newArray = []

		return available.filter(appointment => {
			let reservedFlag = 0
			for (let index = 0; index < appointed.length; index++) {
				const x = appointed[index];

				if (
					TimestampUtils.getDateByTimestamp(x.date) == TimestampUtils.getDateByTimestamp(appointment.date) 
					&& x.specialistId == appointment.specialistId && TimeRange.IsBetween(appointment.timeRange, x.timeRange)
				) {
					reservedFlag = 1
					break;
				}
			}

			if (reservedFlag) {
				return false
			}
			return true
		})
	}

	addAvailability(speciality:string, daysAvailability:DayAvailability[]){
		let specialityAvailabilityExists = 0

		// Chequea si existe alguna disponibilidad semanal para esta especialidad
		this.weekAvailability.forEach(weekAvailability => {
			if (weekAvailability.speciality == speciality) {
				
				specialityAvailabilityExists = 1
				weekAvailability.daysAvailability.push(...daysAvailability)
			}
		})

		// Si no existe ninguna, crea una nueva
		if (specialityAvailabilityExists == 0) {
			let newAvailability = new WeekAvailability()

			newAvailability.speciality = speciality 
			newAvailability.daysAvailability.push(...daysAvailability)
			this.weekAvailability.push(newAvailability)
		}
	}
}
