import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make MyEPapersPage the root (or first) page
  rootPage: any = 'MyEPapersPage';

  constructor(platform: Platform, public menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /*
openPage(page) {
  // close the menu when clicking a link from the menu
  this.menu.close();
  // navigate to the new page if it is not the current page
  this.nav.setRoot(page.component);
}
*/

  public goToAboutPage() {
    this.nav.push('AboutPage');
  }
}
