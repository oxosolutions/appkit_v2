import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import {PracticeProvider} from '../../providers/practice/practice';
import {ServiceProvider} from '../../providers/service/service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	@ViewChild('result') result:any;
		Oxo:any='';
	app_name:any= '';
	//pages:any;
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
	pages:any=0;
	 
  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider:ServiceProvider, public pracProvider : PracticeProvider) {
  	    //without promise
	    // let categoryId = 1;
	  this.pracProvider.listapi().subscribe((data) => {
	  	
	      this.result = JSON.parse(data['_body']).data;
	      this.app_name = this.result;
	      this.pages=this.app_name.app_pages;
	      	//console.log(this.app_name);
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

    	// with promise
	  //  let env = this;
	    //env.Oxo=env.serviceProvider.getUsersHttp();
	    //setTimeout(function(){
	    //	env.darlic=env.Oxo['__zone_symbol__value'];
	    	// env.darlic2=JSON.parse(env.userUrl['body'])
	    //	env.darlic2=env.darlic.app_pages[categoryId];
	    //	console.log(env.darlic2);
	    //},2900);
	   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
