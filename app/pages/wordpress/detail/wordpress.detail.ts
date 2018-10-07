import {NavController, NavParams} from 'ionic-angular';
import {Component, Inject, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {WordpressService} from './../wordpress.service';
import {DateString} from '../../../pipes/date.pipe';
import {Safe} from '../../../pipes/safe.pipe';


@Component({
  templateUrl: 'build/pages/wordpress/detail/wordpress.detail.html',
  providers: [WordpressService],
  pipes: [DateString, Safe]
})

export class WordpressDetail{
  obj: any;
  constructor(private nav: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.obj = navParams.get('obj');
  }
}
