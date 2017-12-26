import { Component,ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductPage } from '../product/product';
import { HomePage } from '../home/home';
import { ServiceProvider } from '../../providers/service/service';
// import {PracticeProvider} from '../../providers/practice/practice';
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
db :any;  

   
constructor(public navCtrl: NavController, public loadingctrl: LoadingController, public events: Events, public navParams: NavParams, public serviceProvider : ServiceProvider) {
    this.db=this.serviceProvider.connection();
}


getData(){
  let pages = 'app_pages';
  let products = 'app_products';
  let metadata = 'meta_data';
  let dd = 'database';

  // let loading=this.loadingctrl.create({
  //   content: `
  //       <div class="custom-spinner-container">
  //       <ion-spinner name="circles">Wait...</ion-spinner>
  //       </div>`
  //  });
  // loading.present();
  // loading.dismiss();
  
  this.selectData(pages,products,metadata,dd).then(result=>{
    
    this.resultData=result;

    this.resultData.AppkitProducts;
    if(this.resultData.apppages!=undefined){
        console.log(this.resultData.apppages);
    }
     //console.log(this.resultData);
    //console.log(this.resultData.metadata.app_footer_content);
   // console.log(this.resultData.apppages);
    
  });//console.log(this.resultData);
}

selectData(pages,products,metadata,dd){
  return new Promise((resolve,reject)=>{
    let i;
    this.serviceProvider.SelectMeta(dd,metadata).then(result=>{
      this.metadata=result;
      this.serviceProvider.SelectProducts(dd,products).then(result=>{
        this.AppkitProducts=result; 
        this.serviceProvider.SelectPages(dd,pages).then((result:any)=>{
          console.log(result);
           this.Pagesid=this.navParams.get('id');
           console.log(result);
           //let apppages=[];
            for(i=0; i < result.length; i++){
              this.AppkitPage.push(result[i]);
              if(result[i].id==this.Pagesid){
                 this.apppages=result[i];
                 console.log(this.apppages);
              }  
              if(result[i].slug=="home-page"){
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

refreshPage(){
    console.log('refershing');
  let pages = 'app_pages';
  let products = 'app_products';
  let metadata = 'meta_data';
  let dd = 'database';
  let hh=[ pages, products, metadata];
  // console.log(hh.length);
  for(let i=0; i<hh.length; i++){
     this.serviceProvider.DeleteAll(this.db,hh[i]).then(result=>{

     });
  }
 
}

ionViewDidLoad() {
   this.getData(); 
   
}

}
