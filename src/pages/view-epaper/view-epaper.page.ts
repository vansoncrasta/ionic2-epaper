import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { File, Transfer } from 'ionic-native';
import { EPaperService } from '../../providers/index';
import { EPaper } from '../../models/index';
import * as moment from 'moment';
declare var cordova: any;

@Component({
  selector: 'page-view-epaper',
  templateUrl: 'view-epaper.page.html'
})
export class ViewEPaperPage {
  private storageDirectory: string = '';
  private fileDirectory: string = "";
  private fileNamePrefix: string = "";
  private epaper: EPaper;

  //PDF Viewver variables
  private pdfUrl: string;
  private zoom: number;
  private selectedZoom: number = 185;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController, public epaperService: EPaperService, public loadingCtrl: LoadingController) {

    this.epaper = this.navParams.data;

    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is('cordova')) {
        return false;
      }
      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if (this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
      this.fileDirectory = this.storageDirectory + "/" + this.epaper.url + "/";
      this.fileNamePrefix = moment(this.epaper.publishDate).format("YYYYMMDD") + "_";
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPaperPage');

    this.platform.ready().then(() => {
      console.log("Calling download service");
      let loading = this.loadingCtrl.create({
        content: 'Loading...'
      });
      loading.present();
      this.epaperService.createDirectory(this.storageDirectory, this.epaper.url).then(
        (success) => {
          console.log("Directory Created");
          //Download the first page and close the loading component.
          this.epaperService.downloadEPaperPagePDF(this.epaper.url, this.fileDirectory, this.fileNamePrefix + "1")
            .then(
            (success) => {
              console.log("Download complete");
              loading.dismiss();
              this.viewEPaperPDF(this.fileNamePrefix + "1");
            },
            (failure) => {
              console.log("Error in downloading file");
              loading.dismiss();
            }
            );
        });
    });
  }

  public viewEPaperPDF(filename: string) {
    console.log("Viewing PDF" + this.fileDirectory + filename + ".PDF");
    this.pdfUrl = this.fileDirectory + filename + ".PDF";
    this.changeZoom();
    console.log(this.pdfUrl);
  }

  downloadPDF(image) {
    this.platform.ready().then(() => {

      const fileTransfer = new Transfer();
      let url = 'https://erelego.com/eNewspaper/News/UVANI/MAN/2017/02/26/20170226_2.PDF';
      fileTransfer.download(url, this.storageDirectory + image).then((entry) => {
        console.log('download complete: ' + entry.toURL());

        const alertSuccess = this.alertCtrl.create({
          title: `Download Succeeded!`,
          subTitle: `${image} was successfully downloaded to: ${entry.toURL()}`,
          buttons: ['Ok']
        });

        alertSuccess.present();


      }, (error) => {
        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          subTitle: `${image} was not successfully downloaded. Error code: ${error.code}`,
          buttons: ['Ok']
        });

        alertFailure.present();
      });

    });
  }

  viewPDF(pdf): any {
    this.pdfUrl = this.storageDirectory + "/" + pdf;
    this.changeZoom();
    console.log(this.pdfUrl);
    let date_1: Date = new Date();
    console.log(moment(date_1).format("YYYY/MM/DD"));
  }

  changeZoom() {
    console.log("zoomRange" + this.selectedZoom);
    this.zoom = (200 - this.selectedZoom) / 100;
    console.log("zoom" + this.zoom);
  }

  goToHomePage() {
    this.navCtrl.popToRoot();
  }

  /* 
  //PhotoViewer is commented as PhotoViewer shows the downloaded pdf outside the app.
  retrieveImage(image) {
    File.checkFile(this.storageDirectory, image)
      .then(() => {
        const alertSuccess = this.alertCtrl.create({
          title: `File retrieval Succeeded!`,
          subTitle: `${image} was successfully retrieved from: ${this.storageDirectory}`,
          buttons: ['Ok']
        });
        return alertSuccess.present();
      })
      .catch((err) => {
        const alertFailure = this.alertCtrl.create({
          title: `File retrieval Failed!`,
          subTitle: `${image} was not successfully retrieved. Error Code: ${err.code}`,
          buttons: ['Ok']
        });
        return alertFailure.present();
      });
  }
  viewPaper(image) {
    console.log("123");
    this.platform.ready()
      .then(() => {
        const fileTransfer = new Transfer();
        let url = "https://erelego.com/eNewspaper/News/UVANI/MAN/2017/03/17/20170317_1.jpeg";
        console.log(url);
        fileTransfer.download(url, this.storageDirectory + image).then(
          (success) => {
            console.log("Download Successful");
            console.log("1234");
            if (PhotoViewer) // make sure it's loaded (works only on Android and iOS)
              console.log("12345");
            File.checkFile(this.storageDirectory, image)
              .then(() => {
                console.log("123456");
                PhotoViewer.show(this.storageDirectory + "/" + image, 'Test 123');
              });
          });
      });
  }
*/
}
