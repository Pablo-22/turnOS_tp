import { DataEntity } from "../dataEntity/data-entity";
import { Log } from "../../services/logs/log";
import { Timestamp } from "@angular/fire/firestore";

export class User extends DataEntity {
	email:string = ''
	password:string = ''
	userLogs:Log[] = []
	type:'SPECIALIST'|'PATIENT'|'ADMIN'|'' = ''
	name:string = ''
	surname:string = ''
	birthDate:Timestamp = new Timestamp(0,0)
	dni:string = ''
	approvedProfile:boolean = false
	images: string[] = []

	constructor(){
	  	super()
	}
}