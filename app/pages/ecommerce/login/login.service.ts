import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class LoginService {

  private nonceUrl = 'https://dev.luence.fr/api/get_nonce/?controller=user&method=generate_auth_cookie';
  private cookieUrlBase = 'https://dev.luence.fr/api/user/generate_auth_cookie/?nonce=';

  constructor(private http:Http) {}

  getNonce() {
    var nonce = this.http.get(this.nonceUrl).map(res => res.json());
    return nonce;
  }

  login(username, password, nonce) {
    return this.http.get(this.cookieUrlBase+nonce+'&username='+username+'&password='+password)
    .map(res => res.json());
  }

}
