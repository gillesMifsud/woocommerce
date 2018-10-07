import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {LanguageSetting} from './language';
import {Http} from '@angular/http'


@Component({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [LanguageSetting]
})
export class SettingsPage {
  public selectCountry: any;
  public countries: any;
  select(country) {
    this.selectCountry = country
    // Also keep inside service
    this.setting.country = country;
  }
  constructor(private nav: NavController, private setting: LanguageSetting) {
    this.countries = setting.countries;
  }
}
