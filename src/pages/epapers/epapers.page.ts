import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {EPaperDetailsPage} from '../index';
import {EPaperService} from '../../providers/index';

@Component({
  selector: 'page-epapers',
  templateUrl: 'epapers.page.html'
})
export class EPapersPage {

  private epapers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public epaperService: EPaperService, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EPapersPage');

    let loading = this.loadingCtrl.create({
      content: 'Loading E-Papers...'
    });
    loading.present();

    this.epaperService.getAllEPapers()
      .subscribe(
        (result) => {
          console.log(result);
          this.epapers = result;
          loading.dismiss();
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        }
      );
  }

  epaperSelected($event, epaper, edition) {
    this.navCtrl.push(EPaperDetailsPage, {selectedEPaper: epaper, selectedEdition: edition});
  }

}
