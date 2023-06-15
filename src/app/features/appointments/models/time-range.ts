import { Time } from "./time";

export class TimeRange {
	from:Time = new Time();
	to:Time = new Time();

	getDuration(): Time|undefined {
		return Time.timeInterval(this.from, this.to);
	}

	getIntervals(minutes:number){
		return Time.getIntervals(this.from, this.to, minutes);
	}

	static IsBetween(outter:TimeRange, inner:TimeRange){
		outter = Object.assign(new TimeRange, outter);
		inner = Object.assign(new TimeRange, inner);

		outter.from = Object.assign(new Time, outter.from);
		outter.to = Object.assign(new Time, outter.to);

		inner.from = Object.assign(new Time, inner.from);
		inner.to = Object.assign(new Time, inner.to);

		if (
			(inner.from.isBiggerThan(outter.from) || inner.from.isEqualThan(outter.from) )
			&& (outter.to.isBiggerThan(inner.to) || outter.from.isEqualThan(inner.to) )
		) {
			return true
		}
		return false
	}
}
