import {NavController, LoadingController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {WordpressService} from './wordpress.service';
import {DateString} from '../../pipes/date.pipe';
import {WordpressDetail} from './detail/wordpress.detail';
import {Safe} from '../../pipes/safe.pipe';

@Component({
  templateUrl: 'build/pages/wordpress/wordpress.html',
  providers: [WordpressService],
  pipes: [DateString, Safe]
})

export class Wordpress implements OnInit{

  response: string;

  constructor(
    public nav : NavController,
    private loadingController : LoadingController,
    private wordpressService : WordpressService) 
    {
      this.nav = nav;
    }
  // Load Wordpress
  ngOnInit() {
    this.getPosts();
    this.presentLoadingDefault();
  }

  getPosts() {
    this.wordpressService.getPosts()
      .subscribe(
      response => this.response = response,
      error => console.log(error));
  }

  presentLoadingDefault() {
    let loading = this.loadingController.create({
      content: 'Chargement...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 600);
  }

  toDetail(event, obj) {
    this.nav.push(WordpressDetail, {
      obj: obj
    });
  }

}
