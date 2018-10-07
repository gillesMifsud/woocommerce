import {NavController, ToastController, Events} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
import {LoginService} from './login.service';
import {AccountPage} from '../account/account';
import {UserService} from '../../../providers/user/user.service';
import {RegisterPage} from '../register/register';


@Component({
  templateUrl: 'build/pages/ecommerce/login/login.html',
  providers:[LoginService]
})

export class LoginPage implements OnInit{

  loginForm: ControlGroup;
  username: AbstractControl;
  password: AbstractControl;
  response: any;
  nonce: string;
  cookie: string;
  userId: number;
  email: string;

  constructor(
    private events: Events,
    private toastController : ToastController,
    public userService: UserService,
    public loginService: LoginService,
    public nav: NavController,
    fb: FormBuilder){
      this.loginForm = fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.username = this.loginForm.controls['username'];
      this.password = this.loginForm.controls['password'];
    }

    // on init : check alrady logged in and get the nonce from api
    ngOnInit() {
      // verify is a user already logged in
      this.restrict();
      this.loginService.getNonce()
      .subscribe(
        response => {
          this.response = response;
          this.nonce = response.nonce;
        },
        error => console.log(error));
    }

    restrict() {
      this.userService.getUsers().then(
        data => {
          if (data.res.rows.length == 1) {
            let toast = this.toastController.create({
              message: "Vous êtes déjà connecté",
              duration: 4000,
              showCloseButton: true,
              closeButtonText: 'ok'
            });
            toast.present();
            this.goToAccountPage();
            return true;
          } else {
            return false
          }
        }
      )
    }

    // login function
    login(username, password, nonce) {
      this.loginService.login(
        this.username.value,
        this.password.value,
        this.nonce)
        .subscribe(
          response => {
            this.response = response;
            this.cookie = response.cookie;
            // Check if returns a user json object
            if(response.user != null) {
              this.userId = response.user.id;
              this.email = response.user.email;
              if (this.response.status == 'ok') {
                this.userService.setCookie(this.cookie, this.userId, this.email, (Math.round(+new Date() / 1000)))
                if (this.cookie && this.userId) {
                  let toast = this.toastController.create({
                    message: 'Connexion réussie',
                    duration: 3000
                  });
                  toast.present();
                  this.events.publish('user:login');
                  this.goToAccountPage();
                }
              }
            }
          },
          error => console.log(error));
        }

    goToAccountPage() {
      this.nav.setRoot(AccountPage);
    }

    goToRegisterPage() {
      this.nav.setRoot(RegisterPage)
    }

}
