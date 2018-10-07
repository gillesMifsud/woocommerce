import {NavController, ToastController, LoadingController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {WooCategoriesService} from './woocategories.service';
import {WooPage} from '../woo/woo';
import {LoginPage} from '../login/login';
import {UserService} from '../../../providers/user/user.service';
import {BasketPage} from '../basket/basket';
import {BasketService} from '../../../providers/basket/basket.service';

@Component({
  templateUrl: 'build/pages/ecommerce/woocategories/woocategories.html',
  providers: [WooCategoriesService]
})

export class WoocategoriesPage implements OnInit{
  category: any;
  response: string;
  isLoading = true;
  totalItems: number = null;

  constructor(
    public nav: NavController,
    private loadingController : LoadingController,
    private toastController : ToastController,
    public userService: UserService,
    public basketService: BasketService,
    public woocategoriesService: WooCategoriesService)
    {
      this.nav = nav;
    }

  ngOnInit() {
    // Loading message
    this.presentLoadingDefault();
    // Check user logged (in db)
    this.restrict();
    this.countBasketItems();
    this.woocategoriesService.getCategories()
    .subscribe(
        response => this.response = response,
        error => console.log(error));
        this.isLoading = false;
  }

  presentLoadingDefault() {
    let loading = this.loadingController.create({
      content: 'Chargement des catégories...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
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

  viewProdutsFromCat($event, categoryId) {
    this.nav.push(WooPage,
      {
        categoryId: categoryId
      }
    );
  }

  goToLoginPage() {
    this.nav.push(LoginPage);
    this.nav.setRoot(LoginPage);
  }

  openBasket() {
    this.nav.push(BasketPage);
    this.nav.setRoot(BasketPage);
  }

  goToWooPage() {
    this.nav.push(WooPage);
  }

}
