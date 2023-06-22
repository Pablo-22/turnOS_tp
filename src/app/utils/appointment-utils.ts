import { AppointmentStates } from "../features/appointments/enums/appointment-states";

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
}
