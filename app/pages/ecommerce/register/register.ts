import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Component, Inject, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl, Control } from '@angular/common';
import {RegisterService} from './register.service';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/ecommerce/register/register.html',
  providers: [RegisterService],
  directives: [FORM_DIRECTIVES],
})
export class RegisterPage {
  // Forms values
  registerForm: ControlGroup;
  username: AbstractControl;
  password: AbstractControl;
  password_confirmed: AbstractControl;
  email: AbstractControl;
  last_name: AbstractControl;
  first_name: AbstractControl;
  phone: AbstractControl;
  address_1: AbstractControl;
  postcode: AbstractControl;
  city: AbstractControl;
  response: string;

  constructor(
    public nav: NavController, 
    private toastController : ToastController,
    navParams: NavParams,
    private registerService:RegisterService,
    fb: FormBuilder) {
      this.nav = nav;
      this.registerService = registerService;
      this.registerForm = fb.group({
        username: ['',Validators.compose([Validators.required, Validators.minLength(8)])],
        email: ['', Validators.required],
        password: ['',Validators.compose([Validators.required, Validators.minLength(8)])],
        password_confirmed: ['',Validators.compose([Validators.required, Validators.minLength(8)])],
        last_name: ['',Validators.compose([Validators.required, Validators.minLength(2)])],
        first_name: ['',Validators.compose([Validators.minLength(2)])],
        phone: ['',],
        address_1: ['',Validators.compose([Validators.required, Validators.minLength(5)])],
        postcode: ['',Validators.compose([Validators.required, Validators.minLength(5)])],
        city: ['',Validators.compose([Validators.required, Validators.minLength(2)])],
      });
      this.username =     this.registerForm.controls['username'],
      this.email =  this.registerForm.controls['email'],
      this.password =  this.registerForm.controls['password'],
      this.password_confirmed =  this.registerForm.controls['password_confirmed'],
      this.last_name =  this.registerForm.controls['last_name'],
      this.first_name =  this.registerForm.controls['first_name'],
      this.phone =    this.registerForm.controls['phone'],
      this.address_1 =    this.registerForm.controls['address_1'],
      this.postcode =  this.registerForm.controls['postcode'],
      this.city =  this.registerForm.controls['city']
    }
    // onSubmit(values) {
    //   console.log(values);
    // }
    onSubmit(
      data: {
        customer: {
          email: string,
          first_name: string,
          last_name: string,
          username: string,
          password: string,
          billing_address: {
            first_name: string,
            last_name: string,
            company: string,
            address_1: string,
            address_2: string,
            city: string,
            state: string,
            postcode: string,
            country: string,
            email: string,
            phone: string
          },
          shipping_address: {
            first_name: string,
            last_name: string,
            company: string,
            address_1: string,
            address_2: string,
            city: string,
            state: string,
            postcode: string,
            country: string
          }
        }
      }
    ) {
      this.registerService.register(
        data = {
          customer: {
            email: this.email.value,
            first_name: this.first_name.value,
            last_name: this.last_name.value,
            username: this.username.value,
            password: this.password.value,
            billing_address: {
              first_name: this.first_name.value,
              last_name: this.last_name.value,
              company: '',
              address_1: this.address_1.value,
              address_2: '',
              city: this.city.value,
              state: '',
              postcode: this.postcode.value,
              country: 'FR',
              email: this.email.value,
              phone: this.phone.value
            },
            shipping_address: {
              first_name: this.first_name.value,
              last_name: this.last_name.value,
              company: '',
              address_1: this.address_1.value,
              address_2: '',
              city: this.city.value,
              state: '',
              postcode: this.postcode.value,
              country: 'FR'
            }
          }
        }
      )
      .subscribe(
        response => this.response = response,
        error => console.log(error)
      );
      let toast = this.toastController.create({
        message: 'Enregistrement réussi!',
        duration: 3000
      });
      toast.present();
      /*window.alert('Envoyé avec succès');*/
      this.nav.setRoot(LoginPage);
    }
  }
