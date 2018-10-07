import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {CustomerService} from '../account/customers.service';
import {UserService} from '../../../providers/user/user.service';
import {BasketService} from '../../../providers/basket/basket.service';
import {ModifyAccountPage} from '../account/modify/modifyAccount';
import {ShipAndPayService} from './shipandpay.service';
import {AccountPage} from '../account/account';
import {BasketPage} from '../basket/basket';
import {Home} from '../../home/home';

@Component({
  templateUrl: 'build/pages/ecommerce/shipandpay/shipandpay.html',
  providers: [CustomerService, ShipAndPayService]
})

export class ShipAndPayPage implements OnInit{

  response;
  status;
  valid:boolean = false;
  cookie: string = '';
  activeUser;
  cookieIsValid: boolean = false;
  line_items = [];
  messageOK: boolean = false;
  totalItems: number = null;

  validateOrder: boolean = false;

  constructor(
    public nav: NavController,
    private loadingController : LoadingController,
    private alertController : AlertController,
    public customerService: CustomerService,
    public userService: UserService,
    public basketService: BasketService,
    public shipAndPayService: ShipAndPayService) {}

    ngOnInit() {
      this.getActiveUserInfo();
      this.countBasketItems();
    }

    goToAccount() {
      setTimeout(() => {
        this.nav.setRoot(AccountPage);
      }, 1000);
    }

    goToHome() {
      this.nav.setRoot(Home);
    }

    countBasketItems() {
      this.basketService.returnProductsInBasket().then(
        val => {
          let productCount = val.res.rows.length;
          this.totalItems = productCount;
        }
      )
    }

    // Returns infos from active logged in user with its ID
    getActiveUserInfo() {
      this.userService.getUsers().then(
        data => {
          this.activeUser = data.res.rows.item(0).email;
          this.customerService.getCustomersById(this.activeUser)
          .subscribe(
            response => this.response = response,
            error => console.log(error));
          }
        )
      }

    // Modify account infos form
    openModifyCustomer(customerEmail) {
      this.nav.push(ModifyAccountPage, {
        customerEmail: customerEmail
      }),
      console.log(customerEmail)
    }

    // Get cookie from storage and check if is valid
    // (compare with the one from the server when logged in)
    validateAuthCookie() {
      this.userService.getUsers().then(
        data => {
          if (data.res.rows.length === 1)
          {
            this.cookie = data.res.rows.item(0).cookie
            this.shipAndPayService.validateCookie(this.cookie)
            .subscribe(
              response => {
                this.response = response;
                this.valid = response.valid;
                this.status = response.status,
                console.log(this.status, this.valid)
                if (this.status == 'ok' && this.valid === true)
                {
                  this.cookieIsValid = true;
                }
              },
              error => console.log(error)
            );
          }
          else
          {
            this.cookieIsValid = false;
            console.log("Invalid cookie")
          }
        }
      )
    }

    openBasket() {
      this.nav.push(BasketPage);
    }

    // Send order
    validateAndPay(first_name, last_name, address_1, city, postcode, email, id)
    {
      this.validateAuthCookie();

      if (this.cookieIsValid = true)
      {
        console.log("cookieIsValid = ", this.cookieIsValid)

        this.basketService.getBasketItems().then(
          data => {
            this.line_items = [];
            for (var i = 0; i < data.res.rows.length; i++) {
              let newLine =
              {
                product_id : data.res.rows.item(i).articleNumber,
                quantity : data.res.rows.item(i).quantity
              };
              this.line_items.push(newLine);
            }
            // Create orderLines Object
            var orderLines = this.line_items;
            console.log(orderLines);

            // if (this.checkPayment() === true {
            //   this.isPaid === true
            // }

            if(orderLines !== undefined)
            {
              this.shipAndPayService.createOrder(
                {
                  order:
                  {
                    payment_details: {
                      method_id: 'PayPal',
                      method_title: 'PayPal',
                      paid: true
                    },
                    billing_address: {
                      first_name: first_name,
                      last_name: last_name,
                      address_1: address_1,
                      address_2: '',
                      city: city,
                      state: '',
                      postcode: postcode,
                      country: 'FR',
                      email: email,
                      phone: ''
                    },
                    shipping_address: {
                      first_name: first_name,
                      last_name: last_name,
                      address_1: address_1,
                      address_2: '',
                      city: city,
                      state: '',
                      postcode: postcode,
                      country: 'FR'
                    },
                    customer_id: id,
                    line_items: orderLines, // Previous created object of line_items
                    shipping_lines: [
                      {
                        method_id: 'livraison-standard',
                        method_title: 'Livraison standard',
                        total: 10
                      }
                    ]
                  }
                }
              )
              .subscribe(
                response => this.response = response,
                error => console.log(error)
              );
              // Clean basket when order OK
              this.validateOrder = true;
              this.basketService.cleanBasket();
              // Loading
              let loading = this.loadingController.create({
                content: "Validation de la commande...",
                duration: 800
              });
              loading.present()
            }
            else
            {
              console.log("orderLines: ", orderLines)
            }
          }
        )
      }
    }

}
