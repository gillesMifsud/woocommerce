import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WooService {

    private _url = 'https://dev.luence.fr/wc-api/v3/';
    private _ck = 'ck_5bcaa9bc873fd861102fc90e3b58ec147be47b99';
    private _cs = 'cs_d458f7420e2e285721b6dbdc574b1a84e768737d';

    urlBase = '?consumer_key='+this._ck+'&consumer_secret='+this._cs;
    urlBase2 = '&consumer_key='+this._ck+'&consumer_secret='+this._cs;
    products = 'products';

    constructor (private _http: Http) {}

    getProducts() : Observable<any> {
        let headers = new Headers();
        return this._http.get(this._url+this.products+this.urlBase, {
          headers : headers
        }).map(res => res.json().products);
    }

    getProductsByCategory(category) {
      let headers = new Headers();
      return this._http.get(this._url+'products?filter[category]='+category+this.urlBase2, {
        headers : headers
      }).map(res => res.json().products);
    }

}
