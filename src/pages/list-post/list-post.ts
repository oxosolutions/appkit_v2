import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController , ModalController,Platform ,NavParams } from 'ionic-angular';
import  {ContactUsPage} from '../contact-us/contact-us';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
import { PostDetailPage } from '../post-detail/post-detail';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the ListPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-post',
  templateUrl: 'list-post.html',
})
export class ListPostPage{
name:any;
Db;
loading:any;
database;
resultData:any;
metadata:any; 
post=[]; 

	constructor(public sqlite: SQLite,public navParams: NavParams,public navCtrl: NavController, public loadingctrl:LoadingController , private modalctrl:ModalController, public dbprovider:DatabaseProvider) {
	}
	getData(){
	   this.selectData().then(result=>{
         this.resultData=result;
         console.log(this.resultData.metadata);
         console.log(this.resultData.Post);

      })
	}
	refreshPage(){
		
       this.dbprovider.DeleteAll().then(result=>{       
          this.navCtrl.setRoot(MyApp);
          //this.datacall();
         
       });
	}
	
	selectData(){
		let i;
		return new Promise((resolve,reject)=>{
			this.dbprovider.SelectMeta('Meta').then((result)=>{
           	this.metadata=result;
           	this.dbprovider.SelectPost('posts').then((resultpost:any)=>{
           		this.post=(resultpost);
           		console.log(this.post);
           		let collection=[];
	           	collection['metadata']=this.metadata;
	           	collection['Post']=this.post;
  					resolve(collection);
           	})
         })
		})
	}
	detailpost(id){
		let d;
		this.navCtrl.push(PostDetailPage, {'id': id});
		//this.navCtrl.push(ProductDetailsPage, {'id': id});
	}
	ionViewDidLoad() {
	 this.getData();
	}

}
