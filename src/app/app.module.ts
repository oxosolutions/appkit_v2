import { BrowserModule } from '@angular/platform-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http ,HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { IndexPage } from '../pages/index/index';
import { ServiceProvider } from '../providers/service/service';
//import { PracticeProvider } from '../providers/practice/practice';
import { ProductPage } from '../pages/product/product';
import {ProductDetailPage} from '../pages/product-detail/product-detail';

@NgModule({
  declarations: [
    MyApp,
    TabsPage, 
    IndexPage,
    ProductPage,
    ProductDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    IndexPage,
    ProductPage,
    ProductDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
   // PracticeProvider,
    SQLite
  ]
})
export class AppModule {}
  
