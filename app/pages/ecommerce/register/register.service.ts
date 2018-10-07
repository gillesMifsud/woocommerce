import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RegisterService {

  private _url = 'https://dev.luence.fr/wc-api/v3/';
  private _ck = 'ck_5bcaa9bc873fd861102fc90e3b58ec147be47b99';
  private _cs = 'cs_d458f7420e2e285721b6dbdc574b1a84e768737d';

  urlBase= '?consumer_key='+this._ck+'&consumer_secret='+this._cs;

  constructor (private _http: Http) {}

  register(
    data: {
    customer: {
      email: string,
      first_name: string,
      last_name: string,
      username: string,
      password: string
      billing_address: {
        first_name: string,
        last_name: string,
        company: string,
        address_1: string,
        address_2: string,
        city: string,
        state: string,
        postcode: string,
        country: string,
        email: string,
        phone: number
      },
      shipping_address: {
        first_name: string,
        last_name: string,
        company: string,
        address_1: string,
        address_2: string,
        city: string,
        state: string,
        postcode: string,
        country: string
      }
    }
  }
  ): Observable<any> {
    const body = JSON.stringify(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this._url+'customers'+this.urlBase, body, {
      headers : headers
    }).map(res => res.json());
  }
}








// var data = {
//   customer: {
//     email: 'john.doe@example.com',
//     first_name: 'John',
//     last_name: 'Doe',
//     username: 'john.doe',
//     billing_address: {
//       first_name: 'John',
//       last_name: 'Doe',
//       company: '',
//       address_1: '969 Market',
//       address_2: '',
//       city: 'San Francisco',
//       state: 'CA',
//       postcode: '94103',
//       country: 'US',
//       email: 'john.doe@example.com',
//       phone: '(555) 555-5555'
//     },
//     shipping_address: {
//       first_name: 'John',
//       last_name: 'Doe',
//       company: '',
//       address_1: '969 Market',
//       address_2: '',
//       city: 'San Francisco',
//       state: 'CA',
//       postcode: '94103',
//       country: 'US'
//     }
//   }
// };
