import { User } from "src/app/core/models/users/user";
import { Appointment } from "../../appointments/models/appointment";

export class Patient extends User {
	healthInsurance:string = ''
	appointments:Appointment[]|undefined
}
