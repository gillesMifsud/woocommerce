import {NavController, NavParams} from 'ionic-angular';
import {TopicsPage} from '../../topics';
import {Home} from '../../../home/home';
import {Component} from '@angular/core';

@Component({
  templateUrl: 'build/pages/quizz/Quizzes/templates/quizz-results.page.html',
})

export class QuizzResultsPage {
  nav;
  quizz;
  visible:boolean = false;

  constructor(nav: NavController, params: NavParams) {
    this.quizz = params.get('quizz');
    this.nav = nav;
    // this.nav.pop();
  }

  onHomeClicked(event) {
    this.nav.pop(TopicsPage);
    this.nav.setRoot(TopicsPage);
  }

  onGoHome(event){
    this.nav.pop(Home);
    this.nav.setRoot(Home);
  }

  toggle() {
    this.visible = !this.visible;
  }
}
