import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Quizz} from '../models/quizz';
import {QuizzResultsPage} from './quizz-results.page';
import quizzes from '../../data/quizzes';

@Component({
  templateUrl: 'build/pages/quizz/Quizzes/templates/quizz.page.html',
})

export class QuizzPage {
  nav;
  quizz;

  constructor(nav: NavController, params: NavParams) {
    this.nav = nav;
    // Load the quizz with passed topicId from the params.get (import{NavParams})
    this.quizz = this.loadQuizz(params.get('topicId'));
  }

  loadQuizz(topicId) {
    // cont quizz = data (import quizzes from '../../data/quizzes';)
    const quizz = quizzes.filter((quizz) => {
      return quizz.topicId === topicId;
    })[0];
    return new Quizz(quizz);
  }

  test() {
    console.log(this.quizz);
  }

  onSubmit(event, answer) {
    this.quizz.submitAnswer(answer);
    if (this.quizz.isCompleted) {
      this.nav.setRoot(QuizzResultsPage, {
        quizz: this.quizz
      });
    }
  }

}
