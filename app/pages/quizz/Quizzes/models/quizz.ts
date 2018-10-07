import {QuizzItem} from './quizz-item';

export class Quizz {
  title;
  icon;
  score;
  items;
  currentItem;
  isCompleted;

  constructor(data) {
    this.title = data.title;
    this.icon = data.icon;
    this.score = 0;
    this.items = data.items;
    this.currentItem = this.items[0];
    this.isCompleted = false;
  };

  /* Handle cursor for current quizz item */
  next() {
    const index = this.items.indexOf(this.currentItem);
    if (index + 1 < this.items.length) {
      this.currentItem = this.items[index + 1];
    } else {
      this.isCompleted = true;
    }
  }

  /* Getters for current quizz item information */
  getCurrentId() {
    return this.currentItem.id;
  }
  getQuestion() {
    return this.currentItem.question;
  }
  getChoices() {
    return this.currentItem.choices;
  }
  isRight(answer) {
    return answer === this.currentItem.answer
  }
  getScore() {
    return this.score;
  }
  getGradingScale() {
    return this.items.length;
  }
  // Check for Perfect Score, then apply class green
  isPerfect() {
    if (this.score === this.items.length) {
      return true;
    }
  }

  submitAnswer(answer) {
    if (this.isRight(answer)) {
      ++this.score;
    }
    this.next();
  }

}
