import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { IonicStorageModule } from '@ionic/storage';
//3rd Party
import { PdfViewerComponent } from 'ng2-pdf-viewer';
//Local
import { MyEPapersPage, ViewEPaperPage, EPaperDetailsPage, EPapersPage } from '../pages/index';
import { EPaperService, UserSettingsService } from '../providers/index';

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
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    EPaperService,
    UserSettingsService
  ]
})
export class AppModule { }
