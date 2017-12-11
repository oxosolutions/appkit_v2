import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ServiceProvider } from '../../providers/service/service';
import {PracticeProvider} from '../../providers/practice/practice';


/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  
pages5:any;
pages6:any;
record:any=0;
app_pages1:any;
pages:any;
product:any;
	

  constructor(public navCtrl: NavController, public navParams: NavParams, public pracProvider : PracticeProvider) {
  	this.loadPeople();  
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
      	//console.log(this.navParams.get('id'));
      	if((pages[i].id)==id){
  			this.pages5=this.record.app_pages[i];
        //console.log(this.pages5);
      		
      	}
      }
    });
	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

}
