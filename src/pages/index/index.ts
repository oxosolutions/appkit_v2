import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { ServiceProvider } from '../../providers/service/service';
import {PracticeProvider} from '../../providers/practice/practice';


@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
	
  pages5:any;
	pages6:any;
	record:any=0;
	app_pages1:any;
  pages:any;
  product:any;
	 
  constructor(public navCtrl: NavController, public navParams: NavParams, public pracProvider : PracticeProvider) {
  	this.loadPeople();
  	 //console.log(this.navParams.get('id'));
  }
   loadPeople(){
    this.pracProvider.load()
    .then(data => {
      this.record = data;
     
      this.app_pages1=this.record.app_pages[1];
       console.log(this.app_pages1);
      let pages=this.record.app_pages;
      this.product=this.record.app_products[0];
      console.log(this.product);
      let id=this.navParams.get('id')
      for(let i=0; i < pages.length; i++ ){
      	console.log(pages[i].id);
      	console.log(this.navParams.get('id'));
      	if((pages[i].id)==id){
  			this.pages5=this.record.app_pages[i];
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
