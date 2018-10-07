import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({ name: 'dateString' })
export class DateString implements PipeTransform {
    transform(value: string, args: any[]): any {
        var parsedDate = Date.parse(value);
        if (isNaN(parsedDate)) {
            return "";
        }
        else {
            return new DatePipe().transform(new Date(parsedDate));
        }
    }
}
