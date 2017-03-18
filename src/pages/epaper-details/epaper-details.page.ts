import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
  private todaysDate: any;
  private minDateForPicker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public epaperService: EPaperService, public loadingCtrl: LoadingController) {
    this.epaper = this.navParams.data;
    this.epaper.publishDate = new Date(2017, 2, 18);
    //toISOString() returns time in UTC. Add 6 hrs to compensate IST.
    this.todaysDate = moment(this.epaper.publishDate).add(6, 'hours').toISOString();
    //Only last 7 days of paper available.
    this.minDateForPicker = moment().subtract(7, 'day').toISOString();
    this.epaper.url = this.epaper.id + "/" + this.epaper.editionID + "/" + moment(this.epaper.publishDate).format("YYYY/MM/DD");
    console.log(this.epaper.url);
    console.log(this.todaysDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EPaperDetailsPage');
    this.getEPaperDetails();
  }

  public viewEPaper($event) {
    this.navCtrl.push(ViewEPaperPage, this.epaper);
  }

  // As of ionic 2.2.0 <ion-datetime> does not support Javascript date.
  // https://github.com/driftyco/ionic/issues/9348
  public setPublishDate() {
    this.epaper.publishDate = moment(this.todaysDate).toDate();
    this.epaper.url = this.epaper.id + "/" + this.epaper.editionID + "/" + moment(this.epaper.publishDate).format("YYYY/MM/DD");
    this.getEPaperDetails();
  }

  public goToHomePage() {
    this.navCtrl.popToRoot();
  }

  public getEPaperDetails() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...',
      //https://github.com/driftyco/ionic/issues/10046
      //Set to false.
      dismissOnPageChange: false
    });
    loading.present();
    this.epaperService.getEPaperDetails(this.epaper)
      .subscribe(
      (epaper) => {
        console.log(epaper);
        loading.dismiss();
        console.log("Complete");
      }, () => {
        loading.dismiss();
      });
  }

}
