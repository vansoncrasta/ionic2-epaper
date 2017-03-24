import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { EPapersPage, EPaperDetailsPage } from '../index';
import { UserSettingsService } from '../../providers/index';

@Component({
  selector: 'page-my-epapers',
  templateUrl: 'my-epapers.page.html'
})
export class MyEPapersPage {

  private favourites: any[] = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userSettingsService: UserSettingsService, public events: Events) {
    events.subscribe('favourite:updated', () => {
      console.log('Favourite Updated');
      this.favourites = [];
      this.userSettingsService.getAllFavouritesStorage().forEach((value, key, index) => {
        this.favourites.push(value);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEpapersPage');
    this.favourites = [];
    this.userSettingsService.getAllFavouritesStorage().forEach((value, key, index) => {
      this.favourites.push(value);
    });
  }

  goToEPapersPage() {
    this.navCtrl.push(EPapersPage);
  }

  epaperSelected($event, epaper) {
    this.navCtrl.push(EPaperDetailsPage, epaper);
  }

}
