import {ViewController, NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customers.service';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
import 'rxjs/Rx';

@Component({
  templateUrl: 'build/pages/ecommerce/account/modify/modifyAccount.html',
  directives: [FORM_DIRECTIVES],
  providers: [CustomerService]
})

export class ModifyAccountPage implements OnInit{

  // Controls Form
  modifyForm: ControlGroup;
  first_name: AbstractControl;
  last_name: AbstractControl;
  email: AbstractControl;
  company: AbstractControl;
  address_1: AbstractControl;
  postcode: AbstractControl;
  city: AbstractControl;

  customerEmail;
  response;

  constructor(public nav: NavController,
    params: NavParams,
    fb: FormBuilder,
    public viewCtrl: ViewController,
    private customerService:CustomerService)
    {
      this.customerEmail = params.data.customerEmail;
      this.modifyForm = fb.group(
        {
        first_name: ['',Validators.compose([Validators.required, Validators.minLength(2)])],
        last_name: ['',Validators.compose([Validators.required, Validators.minLength(2)])],
        email: ['',Validators.compose([Validators.required, Validators.minLength(5)])],
        company: ['',Validators.compose([Validators.required, Validators.minLength(2)])],
        address_1: ['',Validators.compose([Validators.required, Validators.minLength(5)])],
        postcode: ['',Validators.compose([Validators.required, Validators.minLength(5)])],
        city: ['',Validators.compose([Validators.required, Validators.minLength(2)])],
        }
      );
      this.first_name =  this.modifyForm.controls['first_name'];
      this.last_name =  this.modifyForm.controls['last_name'];
      this.email =  this.modifyForm.controls['email'];
      this.company =    this.modifyForm.controls['company'];
      this.address_1 =    this.modifyForm.controls['address_1'];
      this.postcode =  this.modifyForm.controls['postcode'];
      this.city =  this.modifyForm.controls['city'];
    }

    ngOnInit() {
      this.customerService.getCustomersById(this.customerEmail)
      .subscribe(
        response => this.response = response,
        error => console.log(error));
      }

      close() {
        this.viewCtrl.dismiss();
      }

      onSubmit(id,
        data: {
          customer: {
            email: string,
            first_name: string,
            last_name: string,
            billing_address: {
              first_name: string,
              last_name: string,
              company: string,
              address_1: string,
              city: string,
              postcode: string,
              email: string
            },
            shipping_address: {
              first_name: string,
              last_name: string,
              company: string,
              address_1: string,
              city: string,
              postcode: string
            }
          }
        }
      ) {
        this.customerService.modifyCustomer(id,
          data = {
            customer: {
              email: this.email.value,
              first_name: this.first_name.value,
              last_name: this.last_name.value,
              billing_address: {
                first_name: this.first_name.value,
                last_name: this.last_name.value,
                company: this.company.value,
                address_1: this.address_1.value,
                city: this.city.value,
                postcode: this.postcode.value,
                email: this.email.value
              },
              shipping_address: {
                first_name: this.first_name.value,
                last_name: this.last_name.value,
                company: this.company.value,
                address_1: this.address_1.value,
                city: this.city.value,
                postcode: this.postcode.value
              }
            }
          }
        )
        .subscribe(
          response => this.response = response,
          error => console.log(error)
        )
        console.log('email',this.email.value);
      }
    }
