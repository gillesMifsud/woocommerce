import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {QuizzPage} from './Quizzes/pages/quizz.page';
import topics from './data/topics';

@Component({
  templateUrl: 'build/pages/quizz/topics.html',
  providers: [QuizzPage]
})

export class TopicsPage {
  nav;
  topics;

  constructor(nav: NavController) {
    this.nav = nav;
    this.topics = topics;
  }

  startQuizz(topic) {
    this.nav.push(QuizzPage, {
      topicId: topic.id
    });
  }
}
