import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { EPapersPage, EPaperDetailsPage } from '../index';
import { UserSettingsService } from '../../providers/index';
import { EPaper } from '../../models/index';

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
        this.favourites.push(JSON.parse(value));
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEpapersPage');
    this.favourites = [];
    this.userSettingsService.getAllFavouritesStorage().forEach((value, key, index) => {
      this.favourites.push(JSON.parse(value));
    });
  }

  goToEPapersPage() {
    this.navCtrl.push(EPapersPage);
  }

  epaperSelected($event, epaper) {
    let selectedEPaper: EPaper = new EPaper();
    selectedEPaper.id = epaper.id;
    selectedEPaper.name = epaper.name;
    selectedEPaper.editionID = epaper.editionID;
    selectedEPaper.editionName = epaper.editionName;
    this.navCtrl.push(EPaperDetailsPage, selectedEPaper);
  }

}
