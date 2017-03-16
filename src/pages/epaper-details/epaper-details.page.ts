import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-epaper-details',
  templateUrl: 'epaper-details.page.html'
})
export class EPaperDetailsPage {

  private todaysDate: Date;
  private epaper: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.todaysDate = new Date();
    this.epaper = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EPaperDetailsPage');
  }

}
