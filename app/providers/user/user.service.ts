import {Injectable} from '@angular/core';
import {Toast} from 'ionic-angular';
import {Storage, SqlStorage} from 'ionic-angular';
import {LoginPage} from '../../pages/ecommerce/login/login';
import {AccountPage} from '../../pages/ecommerce/account/account';

@Injectable()
export class User {
userId: string;
cookie: string;
email: string;
createdAt: string;

constructor(
  userId: string,
  cookie: string,
  email: string,
  createdAt: string) {
    this.userId = userId;
    this.cookie = cookie;
    this.email = email;
    this.createdAt = createdAt
  }
}

@Injectable()
export class UserService {
  storage: Storage = null;
  users: User[];
  userId : string;
  data:any;

  // Init an empty DB if it does not exist by now!
  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS cookieUser (userId INTEGER, cookie TEXT, email TEXT, createdAt DATE)');
  }
  // https://forum.ionicframework.com/t/accessing-database/46449/6
  // http://ionicframework.com/docs/v2/2.0.0-alpha.40/api/platform/storage/SqlStorage/
  // https://devdactic.com/ionic-2-sqlstorage/

  setCookie(cookie, userId, email, createdAt) {
    this.storage.query("INSERT INTO cookieUser (cookie, userId, email, createdAt) VALUES (?,?,?,?)",[cookie, userId, email, createdAt]);
  }

  // Get cookie @ userId of our DB
  public getUsers() {
    return this.storage.query('SELECT * FROM cookieUser');
  }

  // Clean cookieUser table
  public removeUser() {
    return this.storage.query('DELETE FROM cookieUser');
  }

  // Returns ID of active logged in user
  public getActiveUserId() {
    return this.getUsers().then(
      data => {
        let item = data.res.rows.item(0).userId;
        return item;
        // console.log(item);
      }
    )
  }

}
