import {NavController, ToastController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {BasketService, BasketItem} from '../../../providers/basket/basket.service';
import {UserService, User} from '../../../providers/user/user.service';
import {WooPage} from '../woo/woo';
import {WooorderPage} from '../wooorder/wooorder';
import {WoocategoriesPage} from '../woocategories/woocategories';
import {LoginPage} from '../login/login';
import {DateString} from '../../../pipes/date.pipe';

@Component({
  templateUrl: 'build/pages/ecommerce/basket/basket.html',
  pipes: [DateString]
})

export class BasketPage implements OnInit {

  basketItems: BasketItem[];
  hasProducts: boolean = false;
  totalItems: number = null;

  constructor(
    public nav: NavController,
    private toastController : ToastController,
    public basketService: BasketService,
    public userService:UserService) {}

  ngOnInit() {
    this.restrict();
    this.getProducts();
    this.countBasketItems();
  }

  countBasketItems() {
    this.basketService.returnProductsInBasket().then(
      val => {
        let productCount = val.res.rows.length;
        this.totalItems = productCount;
      }
    )
  }

  restrict() {
    this.userService.getUsers().then(
      data => {
        if (data.res.rows.length != 1) {
          let toast = this.toastController.create({
            message: "Vous devez d'abord vous connecter",
            duration: 3000
          });
          this.userService.removeUser();
          toast.present();
          this.goToLoginPage();
        }
      }
    )
  }

  goToLoginPage() {
    this.nav.push(LoginPage);
    this.nav.setRoot(LoginPage);
  }

  getProducts() {
    this.basketItems = [];
    this.basketService.getBasketItems().then(
      data => {
        this.basketItems = [];
        if (data.res.rows.length > 0) {
          this.hasProducts = true;
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
              // console.log(item)
          }
        }
      });
  }

  goToOrder() {
    this.nav.push(WooorderPage);
  }

  goToContinue() {
    // this.nav.push(WooPage);
    this.nav.setRoot(WoocategoriesPage);
  }

  remove(rowid) {
    this.basketService.remove(rowid);
    this.nav.setRoot(BasketPage);
    // console.log(rowid);
  }

  deleteBasket() {
    this.basketService.cleanBasket();
    this.nav.setRoot(BasketPage);
  }

}
