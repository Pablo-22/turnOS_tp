import { DataEntity } from "src/app/core/models/dataEntity/data-entity";
import { Appointment } from "./appointment";
import { Patient } from "../../login/models/patient";
import { Specialist } from "../../login/models/specialist";

export class Measurement {
	name:string
	value:string
	unit:string

	constructor(name:string, unit:string, initialValue:string){
		this.name = name
		this.unit = unit
		this.value = initialValue
	}
}

export class ClinicalRecords extends DataEntity {
  record: any;
  [x: string]: any;
	appointmentId:string = ''
	appointment:Appointment|undefined

	patientId:string = ''
	patient:Patient|undefined

	specialistId:string = ''
	specialist:Specialist|undefined

	height:Measurement = new Measurement('altura', 'm', '')
	weight:Measurement = new Measurement('Peso', 'kg', '')
	temperature:Measurement = new Measurement('Temperatura', '°C', '')
	pressure:Measurement = new Measurement('Presión', 'mm Hg', '')

	dynamicMeasurements:Measurement[] = []
}
