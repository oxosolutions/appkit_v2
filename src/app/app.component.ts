import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,LoadingController,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  {ContactUsPage} from '../pages/contact-us/contact-us';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ProductDetailsPage}from '../pages/product-details/product-details';
import {ListproductPage} from '../pages/listproduct/listproduct';
import {SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { Events } from 'ionic-angular';
import { ListPostPage } from '../pages/list-post/list-post';
import { PostDetailPage } from '../pages/post-detail/post-detail';
import { Network } from '@ionic-native/network';
import {ApidataPage} from'../pages/apidata/apidata';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker } from '@ionic-native/google-maps';

@Component({
  templateUrl: 'app.html',
  selector:'app-user'
})
export class MyApp {
   @ViewChild(Nav) nav: Nav;
   Db;
   rootPage:any;
   name:any;
   slughome;
   AppkitProducts:any;
   metadata:any;  
   AppkitPage=[];
   resultData:any;
   loading:any;
   homepage:any;
   database;
   listproduct;
  constructor(private toast: ToastController, private network: Network,public events: Events,public platform: Platform, public statusBar: StatusBar,public loadingctrl:LoadingController, public splashScreen: SplashScreen,public dbprovider:DatabaseProvider) {
      this.initializeApp();
      platform.registerBackButtonAction(() => {
          platform.exitApp(); 
      });
      console.log('component ts app');
     
  }
  initializeApp() {
      this.platform.ready().then(() => {
         this.statusBar.styleDefault();
         this.splashScreen.hide();
         this.detail();
      });
      
  }
  getData(){
    this.rootPage = HomePage;
    this.events.subscribe('user:created', (user) => {
            this.homepage=user;
            // console.log(this.homepage);
            this.loading.dismiss();
    }); 
  }
   posts(){
     console.log('post');
     this.nav.setRoot(ListPostPage)
   }
   detailsPage(id){
      this.nav.setRoot(HomePage, {'id': id});
   }
   products(){

      this.nav.setRoot(ListproductPage);
   }
   Apidata(){
     this.nav.setRoot(ApidataPage);
   }

   detail(){
     this.loading=this.loadingctrl.create({
              content:'wait..'
     });
     this.loading.present();
    this.dbprovider.connection().then((connection)=>{
       
      this.dbprovider.createTable().then((ddd)=>{
        console.log(ddd);
      
          if(connection !=null){
           this.getData();
          }
       
      });
    });
  }
  
}
