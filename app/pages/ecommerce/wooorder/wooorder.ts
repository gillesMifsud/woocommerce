import {NavController, NavParams} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import 'rxjs/add/operator/map';
import {FORM_DIRECTIVES} from '@angular/common';
import {WooorderService} from './wooorderService';
import {BasketService, BasketItem} from '../../../providers/basket/basket.service';
import {ShipAndPayPage} from '../shipandpay/shipandpay';
import {BasketPage} from '../basket/basket';

@Component({
  templateUrl: 'build/pages/ecommerce/wooorder/wooorder.html',
  providers: [WooorderService],
  directives: [FORM_DIRECTIVES]
})

export class WooorderPage implements OnInit{
  private _wooorderService;
  response: string;
  isLoading = true;

  forfait: number = 10;
  totalReturn: number = null;

  basketItems: BasketItem[];
  totalItems: number = null;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public basketService: BasketService,
    public wooorderService:WooorderService)
    {
      this.nav = nav;
      this._wooorderService = wooorderService;
    }

    ngOnInit() {
      this.getProducts();
      this.getTotal();
      this.countBasketItems();
    }

    getTotal(){
      this.basketService.returnTotal().then(
        val => {
          let total = val.res.rows.item(0)["TOTAL(quantity*articlePrice)"];
          this.totalReturn = total;
          // console.log(val)
        }
      )
    }

    goToShipAndPay() {
      this.nav.setRoot(ShipAndPayPage);
    }

    countBasketItems() {
      this.basketService.returnProductsInBasket().then(
        val => {
          let productCount = val.res.rows.length;
          this.totalItems = productCount;
        }
      )
    }

    getProducts() {
      this.basketItems = [];
      this.basketService.getBasketItems().then(
        data => {
          this.basketItems = [];
          if (data.res.rows.length > 0) {
            for (var i = 0; i < data.res.rows.length; i++) {
              let item = data.res.rows.item(i);
              this.basketItems.push(new BasketItem(
                item.rowid,
                item.userId,
                item.articleNumber,
                item.email,
                item.quantity,
                item.createdAt,
                item.articleName,
                item.articlePicture,
                item.articlePrice));
                console.log(item.email);
              }
            }
          }
        )
      }

      openBasket() {
        this.nav.push(BasketPage);
      }
}
