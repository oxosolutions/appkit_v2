import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductPage } from '../product/product';
import { HomePage } from '../home/home';
import { ServiceProvider } from '../../providers/service/service';
import {PracticeProvider} from '../../providers/practice/practice';
import { Events } from 'ionic-angular';


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
  name:string;
   
constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams, public pracProvider : PracticeProvider) {
    this.loadPeople();
    this.events.publish('hello','paul','radha');       
}


loadPeople(){
    this.pracProvider.load()
    .then(data => {
        this.record = data;
        this.app_pages1=this.record.app_pages[1];
        let pages=this.record.app_pages;
        this.product=this.record.app_products[0];
        let id=this.navParams.get('id')
        for(let i=0; i < pages.length; i++ ){
          if((pages[i].id)==id){
            this.pages5=this.record.app_pages[i];
          }else{
            
          }
        }
    });
}


  

ionViewDidLoad() {
   //console.log(this.name);
     console.log('ionViewDidLoad IndexPage');
}

}
