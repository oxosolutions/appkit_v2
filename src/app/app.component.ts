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
  pages5:any;
  pages6:any;
  record:any=0;
  app_pages1:any;
  pages:any;

  

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
      this.record = data;
      this.app_pages1=this.record.app_pages[0];
      console.log(this.record.app_pages);
      
    });
  }
  // detailsPage1(){
  //   this.nav.push(IndexPage);
  // }
  products(){

    this.nav.setRoot( LoginPage );
  
  }
   detailsPage(id){
    console.log(id);
    this.nav.setRoot(IndexPage, {'id': id});
  }
}

