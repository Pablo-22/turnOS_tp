import { DataEntity } from "src/app/core/models/dataEntity/data-entity"
import { TimeRange } from "./time-range"
import { Timestamp } from "@angular/fire/firestore"
import { Specialist } from "../../login/models/specialist"
import { AppointmentStates } from "../enums/appointment-states"
import { Patient } from "../../login/models/patient"
import { Survey } from "./survey"
import { Speciality } from "../../signin/models/speciality"

export class Appointment extends DataEntity {
	specialistId:string = ''
	specialist?:Specialist
	patientId:string = ''
	patient?:Patient
	date:Timestamp = new Timestamp(0, 0)
	timeRange = new TimeRange()
	speciality:string = ''
	status:AppointmentStates = AppointmentStates.Created
	statusReason:string = ''
	canceledReason:string = ''
	survey:Survey|undefined
	rating:number = 0
	review:string = ''
}
