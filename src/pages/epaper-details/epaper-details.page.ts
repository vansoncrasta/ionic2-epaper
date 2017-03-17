import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EPaperService } from '../../providers/index';
import { ViewEPaperPage } from '../index';
import { EPaper } from '../../models/index';
import * as moment from 'moment';

@Component({
  selector: 'page-epaper-details',
  templateUrl: 'epaper-details.page.html'
})
export class EPaperDetailsPage {
  private epaper: EPaper;

  constructor(public navCtrl: NavController, public navParams: NavParams, public epaperService: EPaperService) {
    this.epaper = this.navParams.data;
    this.epaper.publishDate = new Date(2017, 2, 17);
    this.epaper.url = this.epaper.id + "/" + this.epaper.editionID + "/" + moment(this.epaper.publishDate).format("YYYY/MM/DD");
    console.log(this.epaper.url);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EPaperDetailsPage');
    this.epaperService.getEPaperDetails(this.epaper)
      .subscribe(
      (result) => {
        console.log(result);
      });
  }

  public viewEPaper($event) {
    this.navCtrl.push(ViewEPaperPage, this.epaper);
  }

}
