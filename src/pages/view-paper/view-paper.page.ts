import {Component} from '@angular/core';
import {NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import {PhotoViewer} from 'ionic-native';
import {File, Transfer} from 'ionic-native';
import * as moment from 'moment';
declare var cordova: any;

@Component({
  selector: 'page-view-paper',
  templateUrl: 'view-paper.page.html'
})
export class ViewPaperPage {
  storageDirectory: string = '';
  pdfUrl: string;
  zoom: number;
  zoomRange: number = 175;
  page: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController) {
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
      console.log(this.storageDirectory);
      this.viewPDF('test_1.PDF');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPaperPage');
    // this.downloadPDF("PDF_02");
    //this.viewPDF('test_1.PDF');
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

    this.createDirectory("UVANI/MAN/2017/02/26").then(
      () => {
        console.log("123");
      }
    );
  }

  createDirectory(path): Promise<any> {
    let pathSplit = path.split('/');
    let subPath = "";
    let promiseChain: Array<any> = [];

    for (var i = 0; i < pathSplit.length; i++) {
      console.log(subPath);
      promiseChain.push(this.createFolder(subPath, pathSplit[i]));
      subPath = subPath + "/" + pathSplit[i];
    }
    return Promise.all(promiseChain);
  }

  /*
   createFolder(path, dirName): Promise<any>{
   console.log("Find : " + this.storageDirectory + path + "/" + dirName);
   return File.checkDir(this.storageDirectory + path, dirName).then(
   (success) => {
   console.log("Dir found : " + this.storageDirectory + path + "/" + dirName);
   console.log(success);
   return Promise.resolve();
   },
   (error) => {
   console.log(error);
   console.log("Create : " + this.storageDirectory + path + "/" +dirName);
   return File.createDir(this.storageDirectory + path, dirName, false)
   .then(
   (success) => {
   console.log(success);
   console.log("Created : " + this.storageDirectory + path + "/" + dirName);
   },
   (error) => {
   console.log(error);
   console.log("Error : " + this.storageDirectory + path + "/" + dirName);
   }
   );
   }
   );
   }
   */
  createFolder(path, dirName): Promise<any> {
    return File.createDir(this.storageDirectory + path, dirName, true)
      .then(
        (success) => {
          console.log(success);
          console.log("Created : " + this.storageDirectory + path + "/" + dirName);
        },
        (error) => {
          console.log(error);
          console.log("Error : " + this.storageDirectory + path + "/" + dirName);
        }
      );
  }

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
        console.log("1234");
        if (PhotoViewer) // make sure it's loaded (works only on Android and iOS)
          console.log("12345");
        File.checkFile(this.storageDirectory, image)
          .then(() => {
            console.log("123456");
            PhotoViewer.show(this.storageDirectory + "/" + image, 'Test 123');
          });
      });
  }

  changeZoom() {
    console.log("zoomRange" + this.zoomRange);
    this.zoom = (200 - this.zoomRange) / 100;
    console.log("zoom" + this.zoom);
  }

  goToHomePage() {
    this.navCtrl.popToRoot();
  }

}
