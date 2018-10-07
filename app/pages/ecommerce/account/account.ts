import {NavController, ModalController, ToastController, Events, LoadingController, AlertController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../providers/user/user.service';
import {BasketService} from '../../../providers/basket/basket.service';
import {CustomerService} from './customers.service';
import {OrderModal} from './lastorder/order.modal';
import {DateString} from '../../../pipes/date.pipe';
import {LoginPage} from '../login/login';
import {BasketPage} from '../basket/basket';
import {ModifyAccountPage} from './modify/modifyAccount';

@Component({
  templateUrl: 'build/pages/ecommerce/account/account.html',
  providers:[UserService, CustomerService, BasketService],
  pipes: [DateString]
})

export class AccountPage implements OnInit {

  loggedIn: boolean = false;
  response:any;
  lastOrderId;
  totalItems: number = null;

  constructor(
    public nav : NavController,
    private events : Events,
    private loadingController : LoadingController,
    private alertController : AlertController,
    private toastController : ToastController,
    private modalController : ModalController,
    public userService : UserService,
    public customerService : CustomerService,
    public basketService : BasketService) {}

  ngOnInit() {
    this.presentLoadingDefault();
    this.restrict();
    this.getUserInfos();
    this.countBasketItems();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  presentLoadingDefault() {
    let loading = this.loadingController.create({
      content: 'Récupération du profil...'
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
          toast.present(toast);
          this.goToLoginPage();
        }
      }
    )
  }

  goToLoginPage() {
    this.nav.push(LoginPage);
    this.nav.setRoot(LoginPage);
  }

  getUserInfos() {
    this.userService.getUsers().then(
      data => {
        if (data.res.rows.length > 0) {
          let item = data.res.rows.item(0).email;
          this.customerService.getCustomersById(item)
          .subscribe(
            response => {
              this.response = response;
              this.lastOrderId = response.last_order_id},
              error => console.log(error)
            );
          }
        }
      );
    }

    getOrderById(value) {
      this.customerService.getOrderById(this.lastOrderId)
      .subscribe(
        response => this.response = response,
        error => console.log(error));
      }

    // Last order modal view
    openLastOrder(response) {
      let modal = this.modalController.create(OrderModal, {
        response: response
      });
      modal.present(modal);
    }

    // // Modify account infos form MODAL
    // openModifyCustomer(customerEmail) {
    //   let modal = Modal.create(ModifyModal, {
    //     customerEmail: customerEmail
    //   });
    //   this.nav.present(modal);
    // }

    openModifyCustomer(customerEmail) {
      this.nav.push(ModifyAccountPage, {
        customerEmail: customerEmail
      });
    }

    // logout function
    logout() {
      this.events.publish('user:logout');
      this.userService.removeUser();
      this.basketService.cleanBasket();
      let toast = this.toastController.create({
        message: "Deconnexion réussie",
        duration: 3000
      });
      toast.present(toast);
      this.goToLoginPage();
    }

    openBasket() {
      this.nav.setRoot(BasketPage);
    }

    deleteAccountConfirm(id) {
    let confirm = this.alertController.create({
      title: 'Supprimer votre compte?',
      message: 'Attention toutes vos données seront perdues',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Annulé la suppression');
          }
        },
        {
          text: 'Valider',
          handler: () => {
            this.customerService.deleteCustomer(id)
            .subscribe(
              response => this.response = response,
              error => console.log(error));
            console.log('Validé la suppression de' ,id);
          }
        }
      ]
    });
    confirm.present();
  }

}
