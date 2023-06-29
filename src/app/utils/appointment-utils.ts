import { AppointmentStates } from "../features/appointments/enums/appointment-states";
import { Time } from "../features/appointments/models/time";

export class AppointmentUtils {

	public static getAppointmentStateText(status:AppointmentStates):string {
		switch (status) {
			case AppointmentStates.Created:
				return 'Creado'
				break;
			case AppointmentStates.Requested:
				return 'Solicitado'
				break;
			case AppointmentStates.Accepted:
				return 'Aceptado'
				break;
			case AppointmentStates.Completed:
				return 'Completado'
				break;
			case AppointmentStates.Rejected:
				return 'Rechazado'
				break;
			case AppointmentStates.Canceled:
				return 'Cancelado'
				break;
			default:
				return 'Inválido'
			break;
		}
	}

	public static parseTime(time:Time): string {
		let finalString = ''
		if (time.hours < 10) {
		  finalString += '0' + time.hours
		}else {
		  finalString += time.hours
		}
	  
		finalString += ':'
	  
		if (time.minutes < 10) {
		  finalString += '0' + time.minutes
		}else {
		  finalString += time.minutes
		}
		
		return finalString;
	}
}
