import { Pipe, PipeTransform } from '@angular/core';
import { Specialist } from '../features/login/models/specialist';
import { StringUtils } from '../core/utils/string-utils';

@Pipe({
  name: 'specialistFilter'
})
export class SpecialistFilterPipe implements PipeTransform {

  transform(value:Specialist[]|undefined, searchStr:string): Specialist[] {
    if (value) {
      return value.filter(x => {
        return x.speciality.some(y => {return StringUtils.equals(y, searchStr) })
      });
    }
    return []
  }
}