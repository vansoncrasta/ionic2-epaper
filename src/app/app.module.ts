import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {MyEPapersPage, ViewEPaperPage} from '../pages/index';
import {EPaperService} from '../providers/index';
import {PdfViewerComponent} from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    MyApp,
    MyEPapersPage,
    ViewEPaperPage,
    PdfViewerComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyEPapersPage,
    ViewEPaperPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EPaperService
  ]
})
export class AppModule {
}
