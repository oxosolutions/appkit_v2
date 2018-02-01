import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the ApidataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apidata',
  templateUrl: 'apidata.html',
})
export class ApidataPage {
	Object = Object;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dbprovider:DatabaseProvider) {
  }
  camera(){
  	console.log('camera clicked');
  }
  ionViewDidLoad() {
    this.dbprovider.Apidataget('Apidata').then((result:any)=>{
     	let dataset=[];
     	let object1={};
     	if(result.rows.length>0){
     		for(let i=1; i < result.rows.length; i++){
               let temp=result.rows.item(i);
               dataset.push(temp)
            }
            //array of replace data
            let content = [];
            dataset.forEach(function(value, key){
            	let i;
            	let tempContent = [];
            	Object.keys(value).forEach(function(keyValue, keyIndex){
            		let data=value[keyValue];
            		tempContent.push(data)
			});
            //console.log(tempContent);
			var tesst = '<div class="child"><h1>{{Gender}}</h1><h2>{{Designation}}</h2><p>{{Department}}</p></div>';
			let ii=[];
			var test  = /{{([a-z0-9]+)}}/gi,
			matched;
		    while(matched = test.exec(tesst)){
			       let json=matched[1];
			       ii.push(json);
		    }
		  	//  console.log(ii);
			for (let i = 0; i < ii.length; i++) {
		        while(tesst.indexOf(ii[i])!==-1){
		            tesst = tesst.replace(ii[i], tempContent[i]);
		        }
			}
			console.log(tesst);    	
            });
		}    
     	
    });
   
}
}
