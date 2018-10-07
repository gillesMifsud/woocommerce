import {NavController, Slides} from 'ionic-angular';
import {Component} from '@angular/core';
import {Form} from "../form/form";
import {AboutPage} from '../about/about';

@Component({
    templateUrl: 'build/pages/home/home.html'
})

export class Home {

  constructor(private nav: NavController) {}

  goToContactPage() {
    this.nav.push(Form);
  }

  goToAboutPage() {
    this.nav.push(AboutPage);
  }

}
