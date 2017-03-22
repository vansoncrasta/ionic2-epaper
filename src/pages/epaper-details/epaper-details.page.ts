import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { EPaperService, UserSettingsService } from '../../providers/index';
import { ViewEPaperPage } from '../index';
import { EPaper } from '../../models/index';
import * as moment from 'moment';

@Component({
  selector: 'page-epaper-details',
  templateUrl: 'epaper-details.page.html'
})
export class EPaperDetailsPage {
  private epaper: EPaper;
  //workaround as Java date will not work on Ionic Date Picker.
  private publishDate: any;
  private todaysDate: any;
  private minDateForPicker: any;
  private loading: any;
  private isFavouriteEPaper: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public epaperService: EPaperService,
    public loadingCtrl: LoadingController, public userSettingsService: UserSettingsService) {

    this.epaper = this.navParams.data;
    this.userSettingsService.isFavouriteEPaper(this.epaper).then(
      (data) => {
        console.log(data);
        this.isFavouriteEPaper = data ? true : false
      });

    this.epaper.publishDate = new Date();
    //toISOString() returns time in UTC. Add 6 hrs to compensate IST.
    this.todaysDate = moment().add(6, 'hours').toISOString();
    this.publishDate = moment().add(6, 'hours').toISOString();
    //Only last 7 days of paper available.
    this.minDateForPicker = moment().subtract(7, 'day').toISOString();
    console.log(this.publishDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EPaperDetailsPage');
    this.getEPaperDetails();

  }

  public viewEPaper() {
    this.navCtrl.push(ViewEPaperPage, this.epaper);
  }

  // As of ionic 2.2.0 <ion-datetime> does not support Javascript date.
  // https://github.com/driftyco/ionic/issues/9348
  public setPublishDate(publishDate) {
    this.epaper.publishDate = moment(publishDate).toDate();
    this.getEPaperDetails();
  }

  public goToHomePage() {
    this.navCtrl.popToRoot();
  }

  public getEPaperDetails() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
      //https://github.com/driftyco/ionic/issues/10046
      //Set to false.
      dismissOnPageChange: false
    });
    this.loading.present();
    this.epaperService.getEPaperDetails(this.epaper)
      .subscribe(
      (epaper) => {
        console.log(epaper);
        this.loading.dismiss();
        console.log("Complete");
      }, () => {
        this.loading.dismiss();
      });
  }

  ionViewWillUnload() {
    console.log("ionViewWillUnload");
    if (this.loading.instance) {
      this.loading.dismiss();
    }
  }

  public setFavouriteEPaper() {
    this.userSettingsService.setFavouriteEPaper(this.epaper).then(
      () => { this.isFavouriteEPaper = true; }
    );
  }

  public removeFavouriteEPaper() {
    this.userSettingsService.removeFavouriteEPaper(this.epaper).then(
      () => { this.isFavouriteEPaper = false; }
    );
  }

}
