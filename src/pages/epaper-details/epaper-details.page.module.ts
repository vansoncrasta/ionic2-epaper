import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EPaperDetailsPage } from './epaper-details.page';

@NgModule({
  declarations: [
    EPaperDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EPaperDetailsPage),
  ],
  exports: [
    EPaperDetailsPage
  ]
})
export class EPaperDetailsPageModule {}
