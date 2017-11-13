import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { IndexPage} from '../index/index';
import { Http } from '@angular/http';
import { ServiceProvider } from '../../providers/service/service';
import {PracticeProvider} from '../../providers/practice/practice';


/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any 
  tab2Root: any
   tab3Root: any 
  result:any
  constructor(public navCtrl: NavController, public navParams: NavParams , public apiProvider: ServiceProvider, public pracProvider : PracticeProvider) {
  	this.tab1Root = HomePage;
    this.tab2Root = LoginPage;
    this.tab3Root = IndexPage;
    // this.apiProvider.listusers();
    // this.result=this.pracProvider.listapi();
    // this.apiProvider.listapi();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
  
}
