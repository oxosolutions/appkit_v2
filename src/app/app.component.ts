import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage} from '../pages/tabs/tabs';
import { SidemenuPage } from '../pages/sidemenu/sidemenu';
import { IndexPage} from '../pages/index/index';
import { Http } from '@angular/http';
import { ServiceProvider } from '../providers/service/service';
import {PracticeProvider} from '../providers/practice/practice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController
  rootPage:any = TabsPage;
  @ViewChild('result') result:any;
    darlic2: Array<String>;
  categoryId: number;
  value:any;
  value1:any;
  pages0:any;
  pages1:any;
  pages2:any;
  pages3:any;
  pages4:any;
  pages5:any;
  pages6:any;
  pages:any=0;
  app_pages1:any;
  
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private sqlite: SQLite, public apiProvider: ServiceProvider, public pracProvider : PracticeProvider ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.loadPeople();
    });

  
    } //end of constructor
    loadPeople(){
    this.pracProvider.load()
    .then(data => {
      this.pages = data;
      this.app_pages1=this.pages.app_pages[0];
      console.log(this.pages.app_pages);
      
    });
  }
  // detailsPage1(){
  //   this.nav.push(IndexPage);
  // }
   detailsPage(id){
    console.log(id);
    this.nav.push(IndexPage, {'id': id});
  }
}

