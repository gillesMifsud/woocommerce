import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';
import {DomSanitizationService} from '@angular/platform-browser';

@Pipe({name: 'safe'})
export class Safe {
  constructor(private sanitizer:DomSanitizationService){}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}