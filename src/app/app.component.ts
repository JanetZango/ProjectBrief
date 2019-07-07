import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProjectProvider } from '../providers/project/project';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { ListPage } from '../pages/list/list';
import { AddProjectPage } from '../pages/add-project/add-project';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ,public hubs :ProjectProvider) {
    platform.ready().then(() => {

      hubs.checkOrgAuthState().then((data: any) => {
        if (data == 1) {
          this.rootPage = ListPage
        }
        else {
          this.rootPage = HomePage
        }
       })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

