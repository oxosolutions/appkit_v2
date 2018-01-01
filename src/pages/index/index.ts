import { Component,ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductPage } from '../product/product';
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
loading:any;

   
constructor(public navCtrl: NavController, public loadingctrl: LoadingController, public events: Events, public navParams: NavParams, public serviceProvider : ServiceProvider) {
    //this.db=this.serviceProvider.connection();
}


getData(){
  let pages = 'app_pages';
  let products = 'app_products';
  let metadata = 'meta_data';
  let dd = 'database';

  
  
  this.selectData(pages,products,metadata,dd).then(result=>{
    console.log(result);
    this.resultData=result;
  
    if(this.resultData.apppages!=undefined){
      console.log(this.resultData.apppages);
    }
  
  });
}

selectData(pages,products,metadata,dd){
  return new Promise((resolve,reject)=>{
    let i;
      this.serviceProvider.SelectPages(dd,pages).then((result:any)=>{
           this.Pagesid=this.navParams.get('id');
          
            for(i=0; i < result.length; i++){
              this.AppkitPage.push(result[i]);
              if(result[i].id==this.Pagesid){
                 this.apppages=result[i];
                 console.log(this.apppages);
              } 
              //console.log('slug');
              //console.log(result[i].slug);
              if(result[i].slug=="home-page"){
                this.slughome=result[i];
              console.log(this.slughome);
              }
            }
         
          let collection = {};
         
          collection['AppkitPage'] = this.AppkitPage;
          collection['slughome'] =this.slughome;
         collection['apppages']=this.apppages;
         console.log(collection);
          resolve(collection);

        });
     })
   // });

  //});

}

refreshPage(){
    console.log('refershing');
  let pages = 'app_pages';
  let products = 'app_products';
  let metadata = 'meta_data';
  let dd = 'database';
  let hh=[ pages, products, metadata];
  for(let i=0; i<hh.length; i++){
    this.serviceProvider.DeleteAll(this.db,hh[i]).then(result=>{

     });
  }
 
}

ionViewDidLoad() {
  let load=this.loadingctrl.create({
    content:'index page..'
  });
  load.present();
   this.serviceProvider.insertAll('database').then((result)=>{
   console.log('index page'); 
   load.dismiss();
   this.getData();
       console.log(result);
   });
}

}
