import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEPapersPage } from './my-epapers.page';

@NgModule({
  declarations: [
    MyEPapersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyEPapersPage),
  ],
  exports: [
    MyEPapersPage
  ]
})
export class MyEPapersPageModule {}
