import { User } from "src/app/core/models/users/user";
import { DayAvailability } from "../../appointments/models/day-availability";
import { SpecialistAvailability } from "../../appointments/models/specialist-availability";

export class Specialist extends User  {
	speciality:string[] = []
	availability:SpecialistAvailability = new SpecialistAvailability()
}
