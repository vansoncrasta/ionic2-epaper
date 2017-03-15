import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewPaperPage } from '../index';
import { EPaperService } from '../../providers/index';

@Component({
  selector: 'page-my-epapers',
  templateUrl: 'my-epapers.page.html'
})
export class MyEPapersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public ePaperService:EPaperService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEpapersPage');
  }

  goToEPaper(){
    this.navCtrl.push(ViewPaperPage);
  }

  downloadEPaper(){
    this.ePaperService
      .downloadEPaper()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );

  }

}
