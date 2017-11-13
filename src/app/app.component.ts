import { Component,ViewChild } from '@angular/core';
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
 
  rootPage:any = TabsPage;
  @ViewChild('result') result:any;
    Oxo:any='';
  app_name:any= '';
  pages:any;
  darlic:any;
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
  
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public apiProvider: ServiceProvider, public pracProvider : PracticeProvider ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pracProvider.listapi().subscribe((data) => {
      
        this.result = JSON.parse(data['_body']).data;
        this.app_name = this.result;
        this.pages=this.app_name.app_pages;
          console.log(this.app_name);

        for(var j=0; j < this.pages.length;){
          this.pages0=this.pages[0];
        this.pages1=this.pages[1];
        this.pages2=this.pages[2];
        this.pages3=this.pages[3];
        this.pages4=this.pages[4];
        this.pages5=this.pages[5];
        this.pages6=this.pages[6];
         // console.log(this.pages1);
          j++;

        }
        // console.log(this.pages);
   })

  }
  // go_to_login(){
  // this.nav.setRoot(LoginPage)
  // }
}

