import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

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
    public loadingCtrl: LoadingController, public userSettingsService: UserSettingsService, public alertController: AlertController, public toastCtrl: ToastController) {

    this.epaper = this.navParams.data;
    console.log(this.epaper.publishDate);
    this.epaper.publishDate = new Date();
    //toISOString() returns time in UTC. Add 5.5 hrs to compensate IST.
    //TODO: Make Time Zone independent.
    this.publishDate = this.todaysDate = moment().add({ hours: 5, minutes: 30 }, 'hours').toISOString();
    //Only last 7 days of paper available.
    this.minDateForPicker = moment().subtract(7, 'day').toISOString();
    console.log(this.epaper.publishDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EPaperDetailsPage');
    this.getEPaperDetails();
    this.userSettingsService.isFavouriteEPaper(this.epaper).then(
      (data) => { this.isFavouriteEPaper = data ? true : false });
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
      }, (error) => {
        console.log(error);
        //reset the epaper details.
        this.epaperService.resetEPaper(this.epaper);
        this.loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'E-Paper not available. Please try later.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      );
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
    let alert = this.alertController.create({
      title: 'Remove Favourite',
      message: 'Do you want to remove the E-Paper from your Favourites?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            console.log('Un-Favourite clicked');
            this.userSettingsService.removeFavouriteEPaper(this.epaper).then(
              () => { this.isFavouriteEPaper = false; }
            );
          }
        }
      ]
    });
    alert.present();
  }

}
