import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { EPaperService } from '../../providers/index';
import { EPaper } from '../../models/index';
import * as moment from 'moment';
declare var cordova: any;
import { ThemeableBrowser } from 'ionic-native';

@Component({
  selector: 'page-view-epaper',
  templateUrl: 'view-epaper.page.html'
})
export class ViewEPaperPage {

  /*
  private storageDirectory: string = '';
  private fileDirectory: string = "";
  private fileNamePrefix: string = "";
  
  private loading: any;
  private currentPage: number = 1;
  private googleUrlPrefix = 'https://docs.google.com/gview?embedded=true&url=';

  //PDF Viewver variables
  private pdfUrl: string;
  private zoom: number;
  private selectedZoom: number = 175;
*/
  private epaper: EPaper;
  private noOfPages: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController, public epaperService: EPaperService, public loadingCtrl: LoadingController) {

    this.epaper = this.navParams.data;
    var i = 1;
    while (this.noOfPages.push(i++) < this.epaper.noOfPages);
    console.log(this.noOfPages);
  }

  goToPage(pageNumber) {
    console.log(pageNumber);
    let pageUrl = this.epaper.remoteUrl + pageNumber + ".jpeg";
    console.log(pageUrl);

    let themeableBrowserOptions = {
      toolbar: {
        height: 50,
        color: '#387ef5'
      },
      title: {
        color: '#f4f4f4',
        showPageTitle: true,
        staticText: 'Page ' + pageNumber
      },
      backButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
      },
      customButtons: [
        {
          image: 'reload',
          imagePressed: 'share_pressed',
          align: 'right',
          event: 'reloadPressed'
        }
      ],
      backButtonCanClose: true,
      fullscreen: false,
      clearcache: true,
      clearsessioncache: true
    };

    let browser = cordova.ThemeableBrowser.open(pageUrl, '_blank', themeableBrowserOptions);
    browser.addEventListener('backPressed', function (e) {
      console.log('back_pressed');
      browser.close();
    }).addEventListener('reloadPressed', function (e) {
      console.log('reload_pressed');
      browser.reload();
    }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function (e) {
      console.error(e.message);
    }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function (e) {
      console.log(e.message);
    });
  }
  /*
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
    //Set Default zoom
    //this.changeZoom();
  });
  */

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPaperPage');
    /*
        this.platform.ready().then(() => {
          console.log("Calling download service");
          this.loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: false
          });
          this.loading.present();
          this.epaperService.createDirectory(this.storageDirectory, this.epaper.url).then(
            (success) => {
              console.log("Directory Created");
              //Download the first page and close the loading component.
              this.epaperService.downloadEPaperPdfPages(this.epaper.url, this.fileDirectory, this.fileNamePrefix, 1, 1)
                .then(
                (success) => {
                  console.log("Page 1 Download complete");
                  this.viewEPaperPDF(this.fileNamePrefix + "1");
                  //dismiss loader after pdf load, check pdfLoadComplete()
                  //Attempt to download other pages in the background.
                  this.epaperService.downloadEPaperPdfPages(this.epaper.url, this.fileDirectory, this.fileNamePrefix, 2, this.epaper.noOfPages).then(
                    (success) => { console.log("All Load complete") }
                  );
                },
                (error) => {
                  console.log("Error in downloading file");
                  this.loading.dismiss();
                  const alertFailure = this.alertCtrl.create({
                    title: `Download Failed!`,
                    subTitle: `File was not successfully downloaded. Error code: ${error.code}`,
                    buttons: ['Ok']
                  });
                  alertFailure.present();
                }
                );
            });
        });
    
        */

    /*
        let options = {
          statusbar: {
            color: '#ffffffff'
          },
          toolbar: {
            height: 44,
            color: '#387ef5'
          },
          title: {
            color: '#003264ff',
            showPageTitle: true
          },
          backButton: {
            image: 'back',
            imagePressed: 'back_pressed',
            align: 'left',
            event: 'backPressed'
          },
          forwardButton: {
            image: 'forward',
            imagePressed: 'forward_pressed',
            align: 'right',
            event: 'forwardPressed'
          },
          closeButton: {
            image: 'close',
            imagePressed: 'close_pressed',
            align: 'left',
            event: 'closePressed'
          },
          customButtons: [
            {
              image: 'share',
              imagePressed: 'share_pressed',
              align: 'right',
              event: 'sharePressed'
            }
          ],
          menu: {
            image: 'menu',
            imagePressed: 'menu_pressed',
            title: 'Test',
            cancel: 'Cancel',
            align: 'right',
            items: [
              {
                event: 'helloPressed',
                label: 'Hello World!'
              },
              {
                event: 'testPressed',
                label: 'Test!'
              }
            ]
          },
          backButtonCanClose: true,
          fullscreen: false,
          clearcache: true,
          clearsessioncache: true
        };
        //let tempLocation = 'https://erelego.com/eNewspaper/News/UVANI/MAN/2017/03/21/20170321_1.PDF';
        let tempLocation = 'https://erelego.com/eNewspaper/News/UVANI/MAN/2017/03/21/20170321_1.jpeg';
        //let browser = cordova.ThemeableBrowser.open(this.googleUrlPrefix + encodeURIComponent(tempLocation), '_blank', options);
        let browser = cordova.ThemeableBrowser.open(tempLocation, '_blank', options);
    
        browser.addEventListener('backPressed', function (e) {
          alert('back pressed');
        }).addEventListener('helloPressed', function (e) {
          console.log('hello pressed');
          /*
          tempLocation = 'https://erelego.com/eNewspaper/News/UVANI/MAN/2017/03/21/20170321_2.jpeg';
          console.log('hello pressed: ' + tempLocation);
          //browser.reload();
          browser.executeScript({
            code: `var img=document.querySelector('img'); 
                   console.log(img);
                   var newImage="http://cordova.apache.org/images/cordova_bot.png?" + new Date().getTime();
                   console.log(newImage);
                   img.src=newImage;
                   `
          }, function (values) {
            alert(values);
            alert("Image Element Successfully Hijacked");
          });
         // browser.reload();
    
        }).addEventListener('forward_pressed', function (e) {
          alert('forward_pressed');
        }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function (e) {
          console.error(e.message);
        }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function (e) {
          console.log(e.message);
        });
    */
  }

  ionViewWillUnload() {
    console.log("ionViewWillUnload");
    //If loading component is not closed. Close it. Required on hardware back button.
    //if (this.loading.instance) {
    //this.loading.dismiss();
    //}
  }

  goToHomePage() {
    this.navCtrl.popToRoot();
  }
  /*
  public changePage(pageNumber) {
    console.log(pageNumber);
    console.log(this.fileNamePrefix + pageNumber);
    this.viewEPaperPDF(this.fileNamePrefix + pageNumber);
    this.currentPage = pageNumber;
  }
 
  public viewEPaperPDF(filename: string) {
    if (!this.loading.instance) {
      console.log("Loading called from view");
      this.loading = this.loadingCtrl.create({
        content: 'Loading...',
        dismissOnPageChange: false
      });
      this.loading.present();
    }
    console.log("Viewing PDF" + this.fileDirectory + filename + ".PDF");
    this.pdfUrl = this.fileDirectory + filename + ".PDF";
    console.log(this.pdfUrl);
  }
 
  changeZoom() {
    console.log("zoomRange" + this.selectedZoom);
    this.zoom = (200 - this.selectedZoom) / 100;
    console.log("zoom" + this.zoom);
  }
 
  public pdfLoadComplete($event) {
    console.log("Load Complete");
    if (this.loading.instance) {
      console.log("Closing Loading Component");
      this.loading.dismiss();
    }
  }
 
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
*/
}
