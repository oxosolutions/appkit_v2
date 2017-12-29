import { Component } from '@angular/core';
import { IonicPage,LoadingController, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
//import {PracticeProvider} from '../../providers/practice/practice';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

Object = Object;
resultData:any;
Pagesid:any;
public productDetail:any = [];
public productAttributes:any = [];
public objectkey='';
obj;


  constructor(public navCtrl: NavController,public loadingctrl: LoadingController, public serviceProvider : ServiceProvider, public navParams: NavParams) {
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
  this.selectData(pages,products,metadata,dd).then((result:any)=>{
    loading.dismiss();
    this.resultData=result;
    this.productAttributes = result.product_attributes;
    for ( this.obj of Object.keys(this.productAttributes!=undefined)) {
      for (this.objectkey in this.productAttributes) {
          //console.log("key:",this.objectkey, "value:", this.productAttributes[this.objectkey].value   );
      }  
    }
  });
}

selectData(pages,products,metadata,dd){
  return new Promise((resolve,reject)=>{
    let i;
    let id=this.navParams.get('id');
      this.serviceProvider.SelectProductDetail(dd,products,id).then(result=>{
        this.productDetail=result;
        console.log(this.productDetail); 
        resolve(this.productDetail);
        });
  })
    
}
  ionViewDidLoad() {
    this.getData();
  }
}
