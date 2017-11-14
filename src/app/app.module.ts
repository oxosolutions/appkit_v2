import { BrowserModule } from '@angular/platform-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http ,HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { IndexPage } from '../pages/index/index';
import { SidemenuPage } from '../pages/sidemenu/sidemenu';
import { ServiceProvider } from '../providers/service/service';
import { PracticeProvider } from '../providers/practice/practice';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    SidemenuPage,
    IndexPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    SidemenuPage,
    IndexPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    PracticeProvider,
    SQLite
  ]
})
export class AppModule {}
  