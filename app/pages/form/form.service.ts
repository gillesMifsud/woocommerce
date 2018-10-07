import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FormService {
  constructor (private _http: Http) {}

  // private _contactUrl = 'http://localhost:8888/Server/email.php';
  private _contactUrl = 'https://dev.luence.fr/email.php';

  sendMail(value: {
      name:string,
      prenom:string,
      company:string,
      projet:string,
      arrivee:string,
      phone:string,
      email:string,
      message:string}): Observable<any> {
    const body = JSON.stringify(value);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this._contactUrl, body, {
      headers : headers
    }).map(res => res.json());
  }
}
