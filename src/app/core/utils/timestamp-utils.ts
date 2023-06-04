import { Timestamp } from "@angular/fire/firestore";

export abstract class TimestampUtils {
	public static getDateByTimestamp(timestamp: Timestamp){
		if (timestamp instanceof Timestamp) {
			return timestamp.toDate().toISOString().split('T')[0];
		}
		return ''
	}

	public static getTimestampByStringDate(StrDate:string){
		let date = new Date(StrDate);
		date.setMinutes( date.getMinutes() + date.getTimezoneOffset() ); // Para corregir problemas de zona horaria
		date.setHours(0,0,0,0); // Setea el tiempo en 0

		return Timestamp.fromDate(date);
	}

	public static getTimestampByDate(date:Date){
		date.setMinutes( date.getMinutes() + date.getTimezoneOffset() ); // Para corregir problemas de zona horaria
		date.setHours(0,0,0,0); // Setea el tiempo en 0

		return Timestamp.fromDate(date);
	}
}
