import { Component,ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductPage } from '../product/product';
import { HomePage } from '../home/home';
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
AppkitPage:any;
   
constructor(public navCtrl: NavController, public loadingctrl: LoadingController, public events: Events, public navParams: NavParams, public pracProvider : PracticeProvider) {
    //this.loadPeople();
    this.events.publish('hello','paul','radha');
    this.getData();       
}

getData(){
  let pages = 'app_pages';
  let products = 'app_products';
  let metadata = 'meta_data';
  let dd = 'database';

let loading=this.loadingctrl.create({
  content: `
      <div class="custom-spinner-container">
      <ion-spinner name="circles">Wait...</ion-spinner>
      </div>`
 });
loading.present();


     
    //return new Promise((resolve, reject)=>{
      this.pracProvider.SelectMeta(dd,metadata).then(result=>{
      this.metadata=result;
      });
      this.pracProvider.SelectProducts(dd,products).then(result=>{
      this.AppkitProducts=result;
      console.log(this.AppkitProducts);
      })
      this.pracProvider.SelectPages(dd,pages).then(result=>{
      this.AppkitPage=result;
      console.log(this.AppkitPage);
      });

   
  // DataLoad(){
  //   this.alldata();
  //   // this.alldata().then(result1=>{
  //   //   loading.dismiss();
  //   // });

  // } 
}




  

ionViewDidLoad() {
   //console.log(this.name);
     console.log('ionViewDidLoad IndexPage');
}

}
