import {Injectable} from '@angular/core';
import {Toast} from 'ionic-angular';
import {Storage, SqlStorage} from 'ionic-angular';

@Injectable()
export class BasketItem {
  rowid: number;
  userId: string;
  articleNumber: string;
  email: string;
  quantity: number;
  createdAt: string;
  articleName: string;
  articlePicture: string;
  articlePrice: number;

  constructor(
    rowid: number,
    userId: string,
    articleNumber: string,
    email: string,
    quantity: number,
    createdAt: string,
    articleName: string,
    articlePicture: string,
    articlePrice: number)
    {
      this.rowid = rowid;
      this.userId = userId;
      this.articleNumber = articleNumber;
      this.email = email;
      this.quantity = quantity;
      this.createdAt = createdAt;
      this.articleName = articleName;
      this.articlePicture = articlePicture;
      this.articlePrice = articlePrice;
    }
  }


  @Injectable()
  export class BasketService {
    storage: Storage = null;
    basketItems: BasketItem[];

    constructor()
    {
      // Init an empty DB if it does not exist by now!
      this.storage = new Storage(SqlStorage);
      this.storage.query('CREATE TABLE IF NOT EXISTS basketUser (userId INTEGER, email TEXT, articleNumber INTEGER, quantity INTEGER, createdAt DATE, articleName TEXT, articlePicture TEXT, articlePrice INTEGER)');
    }

    public setBasketItem(userId, email, articleNumber, quantity, createdAt, articleName, articlePicture, articlePrice) {
      this.storage.query("INSERT INTO basketUser (userId, email, articleNumber, quantity, createdAt, articleName, articlePicture, articlePrice) VALUES (?,?,?,?,?,?,?,?)",[userId, email, articleNumber, quantity, createdAt, articleName, articlePicture, articlePrice]);
    }

    // Get all items from basket
    public getBasketItems() {
      return this.storage.query('SELECT rowid, * FROM basketUser');
    }

    // Clean basketUser table
    public cleanBasket() {
      return this.storage.query('DELETE FROM basketUser');
    }

    // Get all users from cookieUser table
    public getUsers() {
      return this.storage.query('SELECT * FROM cookieUser');
    }

    // Remove rowid
    public remove(rowid) {
      return this.storage.query('DELETE FROM basketUser WHERE rowid=?', [rowid]);
    }

    // update row quantity if articleNumber already in
    public updateRowidQuantity(articleNumber, quantity, rowid) {
      return this.storage.query('UPDATE basketUser SET quantity = \"' + quantity + '\" WHERE articleNumber = \"' + articleNumber + '\" AND rowid = \"' + rowid + '\"');
    }

    public returnTotal() {
      return this.storage.query('SELECT TOTAL(quantity*articlePrice) FROM basketUser');
    }

    public returnProductsInBasket() {
      return this.storage.query('SELECT rowId FROM basketUser')
    }

  }
