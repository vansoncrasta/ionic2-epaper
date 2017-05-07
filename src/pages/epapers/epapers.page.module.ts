import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EPapersPage } from './epapers.page';

@NgModule({
  declarations: [
    EPapersPage,
  ],
  imports: [
    IonicPageModule.forChild(EPapersPage),
  ],
  exports: [
    EPapersPage
  ]
})
export class EPapersPageModule {
}
