import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from '../features/appointments/models/appointment';
import { StringUtils } from '../core/utils/string-utils';

@Pipe({
  name: 'appointmentsFilter'
})
export class AppointmentsFilterPipe implements PipeTransform {

  transform(value:Appointment[]|undefined, searchStr:string): Appointment[] {
    if (value) {
      return value.filter(x => { 
        const name = x.specialist?.name + '' + x.specialist?.surname
        const speciality = x.speciality
        const str = name + speciality
        return StringUtils.containsString(str, searchStr) 
      });
    }
    return []
  }
}
