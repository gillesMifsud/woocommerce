import {NavController, Slides} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
    templateUrl: 'build/pages/gallery/gallery.html'
})

export class Gallery {

  constructor(public nav: NavController) {
    this.nav = nav;
  }

}
