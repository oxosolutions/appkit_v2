import { Component,ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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
//import {PracticeProvider} from '../providers/practice/practice';
import { ProductPage } from '../pages/product/product';
import { Events } from 'ionic-angular';
import {ProductDetailPage} from '../pages/product-detail/product-detail';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController
  // rootPage:any = TabsPage;
  rootPage:any=IndexPage;
  @ViewChild('result') result:any;
record:any=0;
db :any;  
AppkitProducts:any;
metadata:any;  
AppkitPage:any;
resultData:any;

    constructor(public platform:Platform, public loadingctrl: LoadingController, public events:Events, statusBar: StatusBar,public storage: Storage, public sqlite:SQLite,splashScreen: SplashScreen,public apiProvider: ServiceProvider, public serviceProvider : ServiceProvider ) {
        platform.ready().then(() => {
          statusBar.styleDefault();
          splashScreen.hide();
            platform.ready().then(() => {
                if(this.platform.is('cordova')){
                   // window.db = $cordovaSQLite.openDB({ name: "smaart.db", iosDatabaseLocation: 'default' }); //device
                    // console.log("Android");
                }else{
                  this.loadPeople();
                  this.db=this.serviceProvider.connection();
                    
                }
            });
        });
    } //end of constructor



getData(){
  let pages = 'app_pages';
  let products = 'app_products';
  let metadata = 'meta_data';
  let dd = 'database';

  let loading=this.loadingctrl.create({
    content: `
        <div class="custom-spinner-container">
        <ion-spinner name="circles">loader...</ion-spinner>
        </div>`
   });
  loading.present();

  this.selectData(pages,products,metadata,dd).then(result=>{
    console.log(result);  
    this.resultData=result;
    loading.dismiss();
    this.resultData.AppkitProducts;
 //  console.log(this.resultData.AppkitPage.length);
   
  });//console.log(this.resultData);
}

selectData(pages,products,metadata,dd){
  return new Promise((resolve,reject)=>{
    this.serviceProvider.SelectMeta(dd,metadata).then(result=>{
      this.metadata=result;
      this.serviceProvider.SelectProducts(dd,products).then(result=>{
        this.AppkitProducts=result; 
        this.serviceProvider.SelectPages(dd,pages).then(result=>{
          this.AppkitPage=result;
          let collection = {};
          collection['metadata'] = this.metadata;
          collection['AppkitProducts'] = this.AppkitProducts;
          collection['AppkitPage'] = this.AppkitPage;
          resolve(collection);
        });
      })
    });
  });
}

   
  loadPeople(){  
    let pages = 'app_pages';
    let products = 'app_products';
    let meta_data='meta_data';
    let dd='database';

    this.serviceProvider.load()
    .then(data => {
      this.record = data;
      // console.log(this.record);
       //create query
       this.serviceProvider.create(dd, this.record, pages);
       this.serviceProvider.create(dd, this.record, products);
       this.serviceProvider.create(dd, this.record, meta_data);
       
      //insert query 
      this.serviceProvider.insertQuery(this.db, this.record, pages);
      this.serviceProvider.insertProduct(this.db, this.record, products);
      this.serviceProvider.metaQuery(this.db, this.record , meta_data );
      
    });
  }

  
  products(id){
  this.nav.setRoot(ProductPage);
  }

  detailsPage(id){
    //console.log(id);
    this.nav.setRoot(IndexPage, {'id': id});
  }
  ngOnInit(){
  console.log('app component');
  this.getData();
}
  
}