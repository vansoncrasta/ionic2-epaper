import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-epaper-details',
  templateUrl: 'epaper-details.page.html'
})
export class EPaperDetailsPage {

  private todaysDate: Date;
  private epaper: any = "";
  private edition: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.todaysDate = new Date();
    console.log(this.navParams);
    this.epaper = this.navParams.data.selectedEPaper;
    this.edition = this.navParams.data.selectedEdition;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EPaperDetailsPage');
  }

}
