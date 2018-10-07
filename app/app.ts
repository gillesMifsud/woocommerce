import { Component, ViewChild } from '@angular/core';
import { App, Nav, ionicBootstrap, ToastController, Events, MenuController, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { Home } from './pages/home/home';
import { Form } from './pages/form/form';
import { Gallery } from './pages/gallery/gallery';
import { ListPage } from './pages/list/list';
import { Wordpress } from './pages/wordpress/wordpress';
import { AboutPage } from "./pages/about/about";
import { WooPage } from "./pages/ecommerce/woo/woo";
import { TopicsPage } from "./pages/quizz/topics";
import { WoocategoriesPage } from './pages/ecommerce/woocategories/woocategories';
import { RegisterPage } from './pages/ecommerce/register/register';
import { LoginPage } from './pages/ecommerce/login/login';
import { AccountPage } from './pages/ecommerce/account/account';
import { BasketPage } from './pages/ecommerce/basket/basket';
import { UserService, User } from './providers/user/user.service';
import { BasketService, BasketItem } from './providers/basket/basket.service';

interface PageObj {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'build/app.html',
  providers: [UserService, User, BasketService, BasketItem]
})

class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Accueil', component: Home, icon: 'md-home' },
    { title: 'Blog', component: Wordpress, icon: 'logo-wordpress' },
    { title: 'Compétences', component: ListPage, icon: 'md-list-box' },
    { title: 'Quizz', component: TopicsPage, icon: 'md-help-circle' },
    { title: 'Galerie', component: Gallery, icon: 'md-image' },
    { title: 'Contact', component: Form, icon: 'md-mail' },
    { title: 'A Propos', component: AboutPage, icon: 'md-globe' }
  ];
  loggedInPages: PageObj[] = [
    { title: 'Mon compte', component: AccountPage, icon: 'md-contact' },
    { title: 'Panier', component: BasketPage, icon: 'md-basket' },
    { title: 'Produits', component: WoocategoriesPage, icon: 'logo-euro' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Enregistrement', component: RegisterPage, icon: 'person-add' },
    { title: 'Connexion', component: LoginPage, icon: 'md-log-in' }
  ];
  
  rootPage: any = Home;

  loggedIn: boolean = false;

  constructor(
    private events: Events,
    platform: Platform,
    private toastController : ToastController,
    public basketService: BasketService,
    public userService: UserService)
    {
      this.isLogged();
      this.listenToLoginEvents();
      // console.log(this.events)

   /*   if (window.indexedDB) {
        console.log("I'm in WKWebView!");
      } else {
        console.log("I'm in UIWebView");
      }*/
      
      // Call any initial plugins when ready
      platform.ready().then(() => {
        StatusBar.styleDefault();
        Splashscreen.hide();
      });
      // End constructor
    }

    openPage(page: PageObj) {
      // the nav component was found using @ViewChild(Nav)
      // reset the nav to remove previous pages and only have this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }

    logout() {
      setTimeout(() => {
      this.events.publish('user:logout');
      this.userService.removeUser();
      this.basketService.cleanBasket();
      this.nav.setRoot(LoginPage);
        let toast = this.toastController.create({
          message: 'Deconnexion réussie',
          duration: 1000,
          position: 'middle'
        });
        toast.present();
      }, 1000);
    }

    listenToLoginEvents() {
      this.events.subscribe('user:login', () => {
        this.loggedIn = true;
      });

      this.events.subscribe('user:logout', () => {
        this.loggedIn = false;
      });
    }

     isLogged() {
       this.userService.getUsers().then(
         data => {
           if (data.res.rows.length == 1) {
             /*this.rootPage = AccountPage;*/
             this.loggedIn = true;
           }
           else
           {
             /*this.rootPage = LoginPage;*/
             this.loggedIn = false;
           }
         }
       )
     }

  }

  ionicBootstrap(MyApp,
    [UserService, User, BasketService, BasketItem],
    {backButtonText: 'Retour',backButtonIcon: 'ios-arrow-back'}
  );
