import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { TimestampUtils } from './timestamp-utils';

@Pipe({
  name: 'timestampToStrDate'
})
export class TimestampToStrDatePipe implements PipeTransform {

  transform(value: Timestamp): string {
    return TimestampUtils.getDateByTimestamp(value);
  }
}
