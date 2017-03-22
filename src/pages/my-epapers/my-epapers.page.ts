import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EPapersPage, EPaperDetailsPage } from '../index';
import { EPaperService, UserSettingsService } from '../../providers/index';

@Component({
  selector: 'page-my-epapers',
  templateUrl: 'my-epapers.page.html'
})
export class MyEPapersPage {

  private favourites: any[] = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ePaperService: EPaperService, public userSettingsService: UserSettingsService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEpapersPage');
  }

  ionViewDidEnter() {    
    this.favourites = [];
    this.userSettingsService.getAllFavouritesStorage().forEach((value, key, index) => {      
      console.log("This is the value: " + value)
      console.log("from the key: " + key)
      console.log("Index is: " + index)
      this.favourites.push(value);
      console.log(this.favourites);
    });
  }

  goToEPapersPage() {
    this.navCtrl.push(EPapersPage);
  }

  epaperSelected($event, epaper) {
    this.navCtrl.push(EPaperDetailsPage, epaper);
  }

  /*
    viewPaper(){
      this.navCtrl.push(ViewEPaperPage);
    }
  */
}
