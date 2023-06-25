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
        let str = name + speciality + x.rating + x.review + x.statusReason + x.status

        if (x.patient?.name) {
          str += x.patient?.name +  x.patient?.surname + x.patient?.email + x.patient?.dni
        }

        if (x.survey?.questions) {
          str += x.survey?.questions.map( x => { return x.answer } ).join()
        }

        if (x.clinicalRecords?.height.value) {
          str += x.clinicalRecords?.height.value + x.clinicalRecords?.weight.value
              + x.clinicalRecords?.pressure.value + x.clinicalRecords?.temperature.value
              + x.clinicalRecords?.dynamicMeasurements.map( x => { return x.value } ).join()
        }
        return StringUtils.containsString(str, searchStr) 
      });
    }
    return []
  }
}
