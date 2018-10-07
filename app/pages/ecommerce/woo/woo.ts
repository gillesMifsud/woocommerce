import {NavController, ToastController, NavParams} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {WooService} from './woo.service';
import {WoodetailPage} from '../woodetail/woodetail';
import {LoginPage} from '../login/login';
import {UserService} from '../../../providers/user/user.service';
import {BasketPage} from '../basket/basket';
import {BasketService} from '../../../providers/basket/basket.service';

@Component({
  templateUrl: 'build/pages/ecommerce/woo/woo.html',
  providers: [WooService]
})

export class WooPage implements OnInit{
  selectedItem: any;
  response: string;
  isLoading = true;
  private _wooService;
  totalItems: number = null;

  category: string;

  keyword: string;

  results;

  constructor(
    public nav:NavController,
    wooService:WooService,
    navparams:NavParams,
    private toastController : ToastController,
    public userService:UserService,
    public basketService: BasketService)
    {
      this.nav = nav;
      this._wooService = wooService;
      this.category = navparams.get('categoryId');

      this.keyword = '';
    }

  ngOnInit() {
    this.restrict();
    this.countBasketItems();
    this.getProducts();
  }

  getProducts() {
    if(!this.category)
    {
      this._wooService.getProducts()
      .subscribe(
        response => this.response = response,
        error => console.log(error));
        this.isLoading = false;
    }
    else if(this.category)
    {
      this._wooService.getProductsByCategory(this.category)
      .subscribe(
        response => this.response = response,
        error => console.log(error));
        this.isLoading = false;
      }
    }

    userPressedCancel() {
        this.results = this.getProducts();
        this.keyword = '';
    }

    keyHasBeenPressed(e) {
        if (e.keyIdentifier === 'Enter') {
            this._wooService.getProductsByCategory(this.keyword)
            .subscribe((response) => {
              this.response = response
            });
        }
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

  itemTapped(event, obj) {
    this.nav.push(WoodetailPage, {
      obj: obj
    });
  }

  goToLoginPage() {
    this.nav.push(LoginPage);
    this.nav.setRoot(LoginPage);
  }

  openBasket() {
    this.nav.push(BasketPage);
    this.nav.setRoot(BasketPage);
  }

}
