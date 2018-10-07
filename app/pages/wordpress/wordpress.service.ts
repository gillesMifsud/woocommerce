import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WordpressService {

  private url = 'https://dev.luence.fr/wp-json/wp/v2/posts/';

  constructor(private http: Http) {}

  getPosts() {
    return this.http.get(this.url)
    .map(res => res.json());
  }

}
