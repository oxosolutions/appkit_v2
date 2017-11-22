import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { ServiceProvider } from '../../providers/service/service';
import {PracticeProvider} from '../../providers/practice/practice';


/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
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

	app_pages1:any;
	 
  constructor(public navCtrl: NavController, public navParams: NavParams, public pracProvider : PracticeProvider) {
  	this.loadPeople();
  	 //console.log(this.navParams.get('id'));
  }
   loadPeople(){
    this.pracProvider.load()
    .then(data => {
      this.pages = data;
     
      this.app_pages1=this.pages.app_pages[1];
       console.log(this.app_pages1);
      let pages2=this.pages.app_pages;
      let id=this.navParams.get('id')
      for(let i=0; i < pages2.length; i++ ){
      	console.log(pages2[i].id);
      	console.log(this.navParams.get('id'));
      	if((pages2[i].id)==id){
  			this.pages5=this.pages.app_pages[i];
        console.log(this.pages5);
      		console.log('yes');
      		console.log(this.pages5.title);
      	}else{
      		console.log('no');
      	}

      }

      // console.log(this.)

      // console.log(this.pages.app_pages[i].id);
      // this.getByID(pages2);
      

    });
	}


	// getByID(pages2){
	// 	console.log(pages2);
	// 	for()
	// }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

}
