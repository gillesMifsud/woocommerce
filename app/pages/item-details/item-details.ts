import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
  templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(private nav: NavController, navParams: NavParams) {
    this.selectedItem = navParams.get('item');
  }
}
