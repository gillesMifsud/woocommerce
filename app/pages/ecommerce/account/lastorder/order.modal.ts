import {ViewController, NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customers.service';
import {DateString} from '../../../../pipes/date.pipe';

@Component({
  templateUrl: 'build/pages/ecommerce/account/lastorder/order.html',
  providers: [CustomerService],
  pipes: [DateString]
})

export class OrderModal implements OnInit{

  response;

  constructor(public nav: NavController, params: NavParams,
    public viewCtrl: ViewController, private customerService:CustomerService) {
    this.response = params.data.response;
  }

  ngOnInit() {
      this.customerService.getOrderById(this.response)
          .subscribe(
              response => this.response = response,
              error => console.log(error));
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
