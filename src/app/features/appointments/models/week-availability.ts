import { TimestampUtils } from "src/app/core/utils/timestamp-utils";
import { Appointment } from "./appointment";
import { DayAvailability } from "./day-availability"
import { SpecialistAvailability } from "./specialist-availability";
import { Time } from "./time";

export class WeekAvailability {
	speciality:string = ''
	daysAvailability:DayAvailability[] = []

	getAvailableAppointments(numberOfDays:number, specialistId:string = ''){
		let i = 0;
		let auxDay = new Date()

		let appointments:Appointment[] = []

		while (i < numberOfDays) {
			// Busco la disponibilidad que tiene el día
			let auxDaysAvailability = this.daysAvailability.filter(x => {
				return x.dayIndex == auxDay.getDay()
			})

			// Para la disponibilidad encontrada, busco los intervalos de 30 minutos
			auxDaysAvailability.forEach(dayAvailability => {
				let shifts = dayAvailability.range.getIntervals(30);

				// Creo un turno por cada intervalo
				shifts.forEach( shift => {
					let newAppointment = new Appointment()
					newAppointment.date = TimestampUtils.getTimestampByDate(new Date(auxDay.getTime()))
					newAppointment.timeRange = shift
					newAppointment.speciality = this.speciality
					newAppointment.specialistId = specialistId
					appointments.push(JSON.parse(JSON.stringify(newAppointment)));
				})
			})

			// Pasa al día siguiente
			auxDay.setDate(auxDay.getDate() + 1)
			i++
		}

		return appointments;
	}


	static getAvailableAppointments(weekAvailability:WeekAvailability, numberOfDays:number, specialistId:string = ''){
		let i = 0;
		let auxDay = new Date()

		let appointments:Appointment[] = []

		while (i < numberOfDays) {
			// Busco la disponibilidad que tiene el día
			let auxDaysAvailability = weekAvailability.daysAvailability.filter(x => {
				return x.dayIndex == auxDay.getDay()
			})

			// Para la disponibilidad encontrada, busco los intervalos de 30 minutos
			auxDaysAvailability.forEach(dayAvailability => {
				let shifts = Time.getIntervals(dayAvailability.range.from, dayAvailability.range.to, 30);

				// Creo un turno por cada intervalo
				shifts.forEach( shift => {
					let newAppointment = new Appointment()
					auxDay.setHours(0,0,0,0); // Setea el tiempo en 0
					newAppointment.date = TimestampUtils.getTimestampByDate(new Date(auxDay.getTime()))
					newAppointment.timeRange = shift
					newAppointment.specialistId = specialistId
					newAppointment.speciality = weekAvailability.speciality
					appointments.push(JSON.parse(JSON.stringify(newAppointment)));
				})
			})

			// Pasa al día siguiente
			auxDay.setDate(auxDay.getDate() + 1)
			i++
		}

		return appointments;
	}
}
