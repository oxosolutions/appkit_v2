import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController , ModalController,Platform ,NavParams } from 'ionic-angular';
import  {ContactUsPage} from '../contact-us/contact-us';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
import { PostDetailPage } from '../post-detail/post-detail';
import { MyApp } from '../../app/app.component';
import { Pipe, PipeTransform } from '@angular/core';

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
styles?: string[];
styleUrls?: string[];
constructor(public sqlite: SQLite,public navParams: NavParams,public navCtrl: NavController, public loadingctrl:LoadingController , private modalctrl:ModalController, public dbprovider:DatabaseProvider) {     
}
	getData(){
	  this.selectData().then((result:any)=>{
     this.resultData=result;
      console.log(this.resultData);
      this.styles=this.resultData.css
     console.log(this.styles);
    })
	}
	refreshPage(){
   this.dbprovider.DeleteAll().then(result=>{       
      this.navCtrl.setRoot(MyApp);
   });
	}
	
	selectData(){
		let i;
		let structure=[];
		let postArchive=[];
		let single;
		let Css;
		let Archive;
		let ArcArray=[];
		let KeyPost=[];
		let OriginalReplaced=[];
		return new Promise((resolve,reject)=>{
			this.dbprovider.SelectMeta('Meta').then((result)=>{
           	this.metadata=result;
           	this.dbprovider.SelectPost('posts').then((resultpost:any)=>{
           		this.post=(resultpost);
           		console.log(this.post);
           		this.dbprovider.SelectPostArchive('postSetting').then((postArchive)=>{
           			single=postArchive[0];
           			Css=postArchive[2];
           			
           			//console.log(Archive);
		   			let content = [];
		            this.post.forEach(function(value, key){
           			Archive=postArchive[1];
		            	let i;
		            	let tempContent = [];
		            	KeyPost=[];
		            	Object.keys(value).forEach(function(keyValue, keyIndex){
		            		let data=value[keyValue];
		            		tempContent.push(data)
		            		KeyPost.push(keyValue);
		            		
						});
		            	//console.log(KeyPost);
		            	//console.log(tempContent);

		            	//Replaced data
		            	var test  = /{{([a-z0-9_-]+)}}/gi,
						matched;
				   		while(matched = test.exec(Archive)){
					       let json=matched[1];
					       ArcArray.push(json);
				   		}
				   		//Archive='';
				   		console.log(ArcArray); 
				   		let replacedkey = '';
				   		for (let i = 0; i < ArcArray.length; i++){
				   			replacedkey='';
					       	for(let j=0; j< KeyPost.length; j++){
					       		if(ArcArray[i]==KeyPost[j]){
					       			//console.log(KeyPost[j]);
					       			//console.log('here');
					    			let data=value[ArcArray[i]];
					    			Archive=Archive.replace(ArcArray[i], data)	
					    			Archive=Archive.replace(/{{/g, " ").replace(/}}/g, "");		    
					        		replacedkey = Archive;
					        	}
					       	}
						}
						//console.log(replacedkey);
						content.push(replacedkey);
						ArcArray=[];
						//console.log(typeof(content));
					});

	           		let collection=[];
		           	collection['metadata']=this.metadata;
		           	collection['Post']=this.post;
		           	collection['content']=content;
		           	collection['css']=Css
	  				resolve(collection);
           		})
           		
           	});
      });
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
