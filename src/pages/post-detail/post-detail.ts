import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the PostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
  
})
export class PostDetailPage {
	resultdata:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public dbprovider:DatabaseProvider) {
    }
    getData(){
		this.selectData().then((result:any)=>{
	 		this.resultdata=result;
	 		console.log(this.resultdata.title);
		});
	}
	selectData(){
		return new Promise((resolve,reject)=>{
		   	 let i;
    		let id=this.navParams.get('id'); 
    		console.log(id);
    		this.dbprovider.PostDetail('posts',id).then((postDetail)=>{
    			console.log(postDetail);
    			resolve(postDetail);
    		
		 });
		})
	}
  ionViewDidLoad() {
    this.getData();	  		
  }

}
