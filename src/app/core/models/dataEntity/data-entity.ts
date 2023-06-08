import { Timestamp } from "@angular/fire/firestore"

export class DataEntity {
	id:string = ''
	createdDate:Timestamp = new Timestamp(0,0)
}
