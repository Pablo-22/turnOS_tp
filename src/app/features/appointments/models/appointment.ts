import { DataEntity } from "src/app/core/models/dataEntity/data-entity"
import { TimeRange } from "./time-range"
import { Timestamp } from "@angular/fire/firestore"
import { Specialist } from "../../login/models/specialist"

export class Appointment extends DataEntity {
	specialistId:string = ''
	specialist?:Specialist
	patientId:string = ''
	date:Timestamp = new Timestamp(0, 0)
	timeRange = new TimeRange()
	speciality:string = ''
	status:string = ''
	statusReason:string = ''
}