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
  
 AppkitProducts:any;
 metadata:any;  
   
constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams, public pracProvider : PracticeProvider) {
    //this.loadPeople();
    this.events.publish('hello','paul','radha');
    this.getData();       
}

getData(){
  let pages = 'app_pages';
  let products = 'app_products';
  let metadata = 'meta_data';
  let dd = 'database';
  
 this.pracProvider.SelectMeta(dd,metadata).then(result=>{
     this.metadata=result;
     console.log(this.metadata);
 });
 this.pracProvider.SelectProducts(dd,products).then(result=>{
    this.AppkitProducts=result;
    console.log(this.AppkitProducts);
 })
 this.pracProvider.SelectPages(dd,pages).then(result=>{
    this.AppkitPage=result;
   console.log(this.AppkitPage);
 });
  
}


  

ionViewDidLoad() {
   //console.log(this.name);
     console.log('ionViewDidLoad IndexPage');
}

}
