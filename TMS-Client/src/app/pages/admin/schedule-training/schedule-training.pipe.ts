/* schedule-training.pipe.ts */
import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatTime'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    const parsedTime = new Date(`01/01/2000 ${value}`);
    return formatDate(parsedTime, '', 'en-US');  }
}
