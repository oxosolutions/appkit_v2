import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
 //import {Network} from "@ionic-native";
import { TabsPage} from '../pages/tabs/tabs';
import { SidemenuPage } from '../pages/sidemenu/sidemenu';
import { IndexPage} from '../pages/index/index';
import { Http } from '@angular/http';
import { ServiceProvider } from '../providers/service/service';
import {PracticeProvider} from '../providers/practice/practice';
import { ProductPage } from '../pages/product/product';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController
  rootPage:any = TabsPage;
  @ViewChild('result') result:any;
  sqlstorage : any  = null ;
  pages5:any;
  pages6:any;
  record:any=0;
  app_pages1:any;
 // pages:any;
  product:any;
  public db :any;
  public openDatabase : any;
  


    constructor(public platform:Platform, statusBar: StatusBar,public storage: Storage, public sqlite:SQLite,splashScreen: SplashScreen,public apiProvider: ServiceProvider, public pracProvider : PracticeProvider ) {
        platform.ready().then(() => {
          statusBar.styleDefault();
          splashScreen.hide();
            platform.ready().then(() => {
                if(this.platform.is('cordova')){
                   // window.db = $cordovaSQLite.openDB({ name: "smaart.db", iosDatabaseLocation: 'default' }); //device
                    // console.log("Android");
                }else{
                   this.loadPeople();

                    this.db = (<any> window).openDatabase("test.db", '1', 'my', 1024 * 1024 * 100); // browser    
                    //this.pracProvider.create(this.db);
                   
                  }
                });
      
        });
    } //end of constructor

  
    loadPeople(){
      let pages = 'pages';
    this.pracProvider.load()
    .then(data => {
      this.record = data;
       // console.log(this.record);
       this.pracProvider.create(this.db, this.record, pages);
       this.pracProvider.insertQuery(this.db, this.record, pages);
       
     


      this.app_pages1=this.record.app_pages[0];
      // console.log(this.record);
       this.product=this.record.app_products[0];
      // console.log(this.product);
     
      
    });
  }

  // detailsPage1(){
  //   this.nav.push(IndexPage);
  // }

  products(id){
  this.nav.setRoot(ProductPage);
  }

  detailsPage(id){
    console.log(id);
    this.nav.setRoot(IndexPage, {'id': id});
  }
}