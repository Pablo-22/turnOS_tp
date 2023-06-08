import { Timestamp } from "@angular/fire/firestore";
import { DataEntity } from "../../models/dataEntity/data-entity";

export class Log extends DataEntity {
	objectId:string = '';
	objectName:string = ''
	value:string = ''

	constructor(value:string, objectName:string, objectId:string, ){
		super();
		this.value = value;
		this.objectName = objectName; 
		this.objectId = objectId; 
	}
}
