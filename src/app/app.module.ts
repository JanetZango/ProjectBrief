import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Card } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProjectProvider } from '../providers/project/project';
import { SignupPage } from '../pages/signup/signup';
import { ListPage } from '../pages/list/list';
import { AddProjectPage } from '../pages/add-project/add-project';
import { ViewProjectPage } from '../pages/view-project/view-project';
import { Stripe } from '@ionic-native/stripe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DocumentViewer } from '@ionic-native/document-viewer';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    ListPage,
    AddProjectPage,
    ViewProjectPage,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    ListPage,
    AddProjectPage,
    ViewProjectPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Stripe,
    HttpClient,
    DocumentViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectProvider
  ]
})
export class AppModule {}
