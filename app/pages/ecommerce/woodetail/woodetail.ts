import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Component, Inject, OnInit} from '@angular/core';
import {WooorderPage} from '../wooorder/wooorder';
import {WoocategoriesPage} from '../woocategories/woocategories';
import {BasketService} from '../../../providers/basket/basket.service';
import {UserService} from '../../../providers/user/user.service';
import {BasketPage} from '../basket/basket';

@Component({
  templateUrl: 'build/pages/ecommerce/woodetail/woodetail.html',
})

export class WoodetailPage implements OnInit{
  selectedItem: any;
  quantity: number = 1;
  userId: number = null;
  userEmail: string = '';
  totalItems: number = null;

  constructor(
    public nav: NavController,
    private toastController : ToastController,
    navParams: NavParams,
    public basketService: BasketService,
    public userService: UserService)
    {
      this.nav = nav;
      // obj : coming from Woopage
      this.selectedItem = navParams.get('obj');
    }

  ngOnInit() {
    this.countBasketItems();
  }

  continueShop() {
    this.nav.setRoot(WoocategoriesPage);
  }

  countBasketItems() {
    this.basketService.returnProductsInBasket().then(
      val => {
        let productCount = val.res.rows.length;
        this.totalItems = productCount;
      }
    )
  }

  checkout() {
    this.nav.push(WooorderPage);
    // this.nav.setRoot(WooorderPage);
  }

  openBasket() {
    this.nav.push(BasketPage);
    this.nav.setRoot(BasketPage);
  }

  addQuantity() {
    this.quantity++;
  }

  minusQuantity() {
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  getUser() {
    this.userService.getUsers().then(
      data => {
        this.userId = data.res.rows.item(0).userId;
        this.userEmail = data.res.rows.item(0).email;
      }
    )
  }

  addToBasket(articleNumber, quantity, articleName, articlePicture, articlePrice) {
    this.getUser();
    this.basketService.getBasketItems().then(
      data => {
        if(data.res.rows.length == 0)
        {
          this.basketService.setBasketItem(
            this.userId,
            this.userEmail,
            articleNumber,
            quantity,
            (Math.round(+new Date() / 1000)),
            articleName,
            articlePicture,
            articlePrice);

          let toast = this.toastController.create({
            message: 'Produit ajouté au panier',
            duration: 3000
          });
          toast.present();
          this.totalItems++;
        }
        else if(data.res.rows.length > 0 )
        {
          let articleTrouve = false;
          for (var i = 0; i < data.res.rows.length; i++)
          {
            let rowId = data.res.rows.item(i).rowid;
            let dbArticleNumber = data.res.rows.item(i).articleNumber;
            let dbQuantity = data.res.rows.item(i).quantity;
            console.log("mis a jour", dbArticleNumber);
            if(dbArticleNumber === articleNumber)
            {
              this.basketService.updateRowidQuantity(articleNumber, dbQuantity+quantity, rowId)
              let toast = this.toastController.create({
                message: 'Produit mis à jour',
                duration: 3000
              });
              toast.present();
              articleTrouve = true;
              break;
            }
          }
          if(!articleTrouve)
          {
            this.basketService.setBasketItem(
              this.userId,
              this.userEmail,
              articleNumber,
              quantity,
              (Math.round(+new Date() / 1000)),
              articleName,
              articlePicture,
              articlePrice);

            let toast = this.toastController.create({
              message: 'Nouveau produit ajouté au panier',
              duration: 3000
            });
            toast.present();
            this.totalItems++;
          }
        }
      }
    )
  }

}
