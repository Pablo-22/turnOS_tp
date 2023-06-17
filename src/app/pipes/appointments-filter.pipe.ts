import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from '../features/appointments/models/appointment';

@Pipe({
  name: 'appointmentsFilter'
})
export class AppointmentsFilterPipe implements PipeTransform {

  transform(value:Appointment[]|undefined, searchStr:string): Appointment[] {
    if (value) {
      return value.filter(x => { 
        const name = x.specialist?.name.toLowerCase() + '' + x.specialist?.surname.toLowerCase()
        const speciality = x.speciality.toLowerCase()
        const str = name + speciality
        return str.includes(searchStr.toLowerCase()) 
      });
    }
    return []
  }

}
