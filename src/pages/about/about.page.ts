import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'AboutPage'
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.page.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad About');
  }

  public goToHomePage() {
    this.navCtrl.popToRoot();
  }

}
