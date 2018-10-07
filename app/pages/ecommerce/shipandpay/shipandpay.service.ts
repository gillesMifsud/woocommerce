import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ShipAndPayService {

  private _url = 'https://dev.luence.fr/wc-api/v3/';
  private _ck = 'ck_5bcaa9bc873fd861102fc90e3b58ec147be47b99';
  private _cs = 'cs_d458f7420e2e285721b6dbdc574b1a84e768737d';

  private validateCookieUrl = 'https://dev.luence.fr/api/user/validate_auth_cookie/?cookie=';

  urlBase= '?consumer_key='+this._ck+'&consumer_secret='+this._cs;
  order = 'orders';

  constructor (private _http: Http) {}

  validateCookie (cookie) {
    return this._http.get(this.validateCookieUrl+cookie)
    .map(res => res.json());
  }

  createOrder(
    data: {
      order: {
        payment_details: {
          method_id: string,
          method_title: string,
          paid: boolean
        },
        billing_address: {
          first_name: string,
          last_name: string,
          address_1: string,
          address_2: string,
          city: string,
          state: string,
          postcode: string,
          country: string,
          email: string,
          phone: string
        },
        shipping_address: {
          first_name: string,
          last_name: string,
          address_1: string,
          address_2: string,
          city: string,
          state: string,
          postcode: string,
          country: string
        },
        customer_id: string,
        line_items: Object,
        shipping_lines: [
          {
            method_id: string,
            method_title: string,
            total: number
          }
        ]
      }
    }
  ): Observable<any> {
    const body = JSON.stringify(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this._url+'orders'+this.urlBase, body, {
      headers : headers
    }).map(res => res.json());
  }

}
