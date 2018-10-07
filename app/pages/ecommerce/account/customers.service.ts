import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CustomerService {

  private _url = 'https://dev.luence.fr/wc-api/v3/';
  private _ck = 'ck_f9b777ce7d2800b5a392d1823a6b8f6a1364a8bc';
  private _cs = 'cs_6db21e5a27d27a8044c6d932cd5cf220b34d36f4';

  urlBase= '?consumer_key='+this._ck+'&consumer_secret='+this._cs;
  customers = 'customers';

  constructor (private _http: Http) {}

  getCustomers() : Observable<any> {
    let headers = new Headers();
    return this._http.get(this._url+this.customers+this.urlBase, {
      headers : headers
    }).map(res => res.json().customers);
  }

  getCustomersById(id) : Observable<any> {
    let headers = new Headers();
    return this._http.get(this._url+this.customers+'/email/'+id+this.urlBase, {
      headers : headers
    }).map(res => res.json().customer);
  }

  getOrderById(orderId) : Observable<any> {
    let headers = new Headers();
    return this._http.get(this._url+'orders/'+orderId+this.urlBase, {
      headers : headers
    }).map(res => res.json().order);
  }

  modifyCustomer(id,
    data: {
      customer: {
        email: string,
        first_name: string,
        last_name: string,
        billing_address: {
          first_name: string,
          last_name: string,
          company: string,
          address_1: string,
          city: string,
          postcode: string,
          email: string
        },
        shipping_address: {
          first_name: string,
          last_name: string,
          company: string,
          address_1: string,
          city: string,
          postcode: string
        }
      }
    }
  ): Observable<any> {
    const body = JSON.stringify(data);
    let headers = new Headers();
    console.log('body', body);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this._url+'customers/'+id+this.urlBase, body, {
      headers : headers
    }).map(res => res.json());
  }

    deleteCustomer(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this._url+'customers/'+id+this.urlBase, {
      headers : headers
    }).map(res => res.json());
  }
  
}
