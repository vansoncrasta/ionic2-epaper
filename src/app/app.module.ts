import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MyEPapersPage, ViewEPaperPage, EPaperDetailsPage, EPapersPage } from '../pages/index';
import { EPaperService } from '../providers/index';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';

@NgModule({
  declarations: [
    MyApp,
    MyEPapersPage,
    ViewEPaperPage,
    EPaperDetailsPage,
    EPapersPage,
    PdfViewerComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyEPapersPage,
    EPaperDetailsPage,
    EPapersPage,
    ViewEPaperPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EPaperService
  ]
})
export class AppModule { }
