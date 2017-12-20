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
AppkitPage=[];
resultData:any;
Pagesid:any;
slughome;
apppages;

   
constructor(public navCtrl: NavController, public loadingctrl: LoadingController, public events: Events, public navParams: NavParams, public pracProvider : PracticeProvider) {
    this.events.publish('hello','paul','radha');
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
  this.selectData(pages,products,metadata,dd).then(result=>{
    loading.dismiss();
    this.resultData=result;
    this.resultData.AppkitProducts;
    if(this.resultData.apppages!=undefined){
            console.log(this.resultData.apppages);
    }
    //console.log(this.resultData.slughome);
    //console.log(this.AppkitPage);
    
  });//console.log(this.resultData);
}

selectData(pages,products,metadata,dd){
  return new Promise((resolve,reject)=>{
    let i;
    this.pracProvider.SelectMeta(dd,metadata).then(result=>{
      this.metadata=result;
      this.pracProvider.SelectProducts(dd,products).then(result=>{
        this.AppkitProducts=result; 
        this.pracProvider.SelectPages(dd,pages).then(result=>{
          //this.AppkitPage=result;
         // console.log(result.length > 0){
           
           this.Pagesid=this.navParams.get('id');
           console.log(result);
           //let apppages=[];
            for(i=0; i < result.length; i++){
              this.AppkitPage.push(result[i]);
              if(result[i].id==this.Pagesid){
                 this.apppages=result[i];
                 //console.log(apppages3.title);
              }
              
              if(result[i].slug=="home"){
                this.slughome=result[i];
                 
              }
            }
          
          
          let collection = {};
          collection['metadata'] = this.metadata;
          collection['AppkitProducts'] = this.AppkitProducts;
          collection['AppkitPage'] = this.AppkitPage;
          collection['slughome'] =this.slughome;
          collection['apppages']=this.apppages;
          resolve(collection);
        });
      })
    });
  });
}

ionViewDidLoad() {
   this.getData(); 
   
}

}
