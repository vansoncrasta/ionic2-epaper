import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewEPaperPage } from './view-epaper.page';

@NgModule({
  declarations: [
    ViewEPaperPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewEPaperPage),
  ],
  exports: [
    ViewEPaperPage
  ]
})
export class ViewEPaperPageModule {}
