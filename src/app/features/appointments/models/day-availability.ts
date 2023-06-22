import { Time } from "./time";
import { TimeRange } from "./time-range";

export class DayAvailability {
	dayIndex:number|undefined;
	range:TimeRange = new TimeRange();
	speciality:string = ''

	static overlaps(dayAvailability1: DayAvailability, dayAvailability2: DayAvailability) {
		if (dayAvailability1.speciality === dayAvailability2.speciality && dayAvailability1.dayIndex === dayAvailability2.dayIndex) {
			const range1 = dayAvailability1.range;
			const range2 = dayAvailability2.range;
			const start1 = range1.from.hours * 60 + range1.from.minutes;
			const end1 = range1.to.hours * 60 + range1.to.minutes;
			const start2 = range2.from.hours * 60 + range2.from.minutes;
			const end2 = range2.to.hours * 60 + range2.to.minutes;
			return (start1 <= end2 && end1 >= start2);
		}
		return false;
	}
}
/*
static overlaps(dayAvailability1:DayAvailability, dayAvailability2:DayAvailability){
	if (dayAvailability1.speciality == dayAvailability2.speciality && dayAvailability1.dayIndex == dayAvailability2.dayIndex) {
		// Logic to detect if dayAvailability1.range overlaps with dayAvailability2.range
		// Example: 
		// dayAvailability1.range.from.hours = 12
		// dayAvailability1.range.from.minutes = 00
		// dayAvailability1.range.to.hours = 18
		// dayAvailability1.range.to.minutes = 00

		// dayAvailability2.range.from.hours = 15
		// dayAvailability2.range.from.minutes = 00
		// dayAvailability2.range.to.hours = 18
		// dayAvailability2.range.to.minutes = 00

		//In this case, the output will be true, because the time ranges overlaps from 15:00 to 18:00 hs 
	}
}
*/