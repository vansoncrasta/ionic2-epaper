import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewEPaperPage, EPaperDetailsPage, EPapersPage } from '../index';
import { EPaperService } from '../../providers/index';

@Component({
  selector: 'page-my-epapers',
  templateUrl: 'my-epapers.page.html'
})
export class MyEPapersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public ePaperService: EPaperService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEpapersPage');
  }

  goToEPaper() {
    this.navCtrl.push(ViewEPaperPage);
  }

  goToEPaperDetails() {
    this.navCtrl.push(EPaperDetailsPage);
  }

  goToEPapersPage() {
    this.navCtrl.push(EPapersPage);
  }

  downloadEPaper() {
    this.ePaperService
      .downloadEPaper()
      .subscribe(
      (response) => {
        console.log(response);
      }
      );

  }

}
