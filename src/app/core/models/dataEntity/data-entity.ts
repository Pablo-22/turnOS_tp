import { Timestamp } from "@angular/fire/firestore"
import { TimestampUtils } from "../../utils/timestamp-utils"

export class DataEntity {
	id:string = ''
	createdDate:Timestamp = TimestampUtils.getTimestampByDate(new Date())
}
