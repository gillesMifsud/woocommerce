import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl, Control } from '@angular/common';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { FormService} from './form.service';
import { Home } from '../home/home';

@Component({
    templateUrl: 'build/pages/form/form.html',
    directives: [FORM_DIRECTIVES],
    providers: [FormService]
})

export class Form {

  contactForm: ControlGroup;
  company: AbstractControl;
  name: AbstractControl;
  prenom: AbstractControl;
  phone: AbstractControl;
  email: AbstractControl;
  message: AbstractControl;

  arrivee: AbstractControl;
  projet: AbstractControl;

  projets = [
    { id: 1, label: 'Site Internet' },
    { id: 2, label: 'Site Intranet/Extranet' },
    { id: 3, label: 'Développement PHP' },
    { id: 4, label: 'Développement C#' },
    { id: 5, label: 'Conception Base de Données' },
    { id: 6, label: 'Tiers Maintenance Applicative' },
    { id: 7, label: "Recrutement d'un collaborateur Handicapé" }
  ];
  arrivees = [
    { id: 1, label: 'Internet' },
    { id: 2, label: 'Recommandation' },
    { id: 3, label: 'Evênement' }
  ];

  response: string;
  value: any;
  submitted: boolean = false;

  constructor(public nav: NavController, fb: FormBuilder,
    private _http: Http, private _formService: FormService) {
        this.nav = nav;
        // New controlGroup instance
        this.contactForm = fb.group({
          // Validators Rules for each field
          // Champ XXX: ['', ...] correspondants au [ngFormControl]="XXX" de la vue HTML (inpput)
          name: ['', Validators.compose([Validators.required, Validators.minLength(3), this.checkFirstCharacterValidator])],
          prenom: ['', Validators.compose([Validators.minLength(3), this.checkFirstCharacterValidator])],
          company: ['', Validators.compose([Validators.required, Validators.minLength(3), this.checkFirstCharacterValidator])],
          projet: ['', Validators.required],
          arrivee: ['', Validators.required],
          phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
          email: ['', Validators.required],
          message: ['', Validators.compose([Validators.required, Validators.minLength(20)])]
        });

    this.name =     this.contactForm.controls['name'],
    this.prenom =   this.contactForm.controls['prenom'],
    this.company =  this.contactForm.controls['company'],
    this.projet =   this.contactForm.controls['projet'],
    this.arrivee =  this.contactForm.controls['arrivee'],
    this.phone =    this.contactForm.controls['phone'],
    this.email =    this.contactForm.controls['email'],
    this.message =  this.contactForm.controls['message']
  }

// Check if firt character is a number
  checkFirstCharacterValidator(control: Control): { [s: string]: boolean } {
      if (control.value.match(/^\d/)) {
          return { checkFirstCharacterValidator: true };
      }
  }
  // A la validation du formulaire, on passe les values et on donne leur type
  onSubmit(
    name:string,
    prenom:string,
    company:string,
    projet:string,
    arrivee:string,
    phone:string,
    email:string,
    message:string) {

    this._formService.sendMail({
        name:name, prenom:prenom,
        company:company, projet:projet,
        arrivee:arrivee, phone:phone,
        email:email, message:message})
      .subscribe(
        response => this.response = response,
        error => console.log(error)
      );
      this.submitted = true;
      window.alert('Mail envoyé avec succès');
      this.nav.pop(Home);
  }

  onGoHome() {
    this.nav.push(Home);
  }
}
