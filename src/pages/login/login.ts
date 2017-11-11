import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {PracticeProvider} from '../../providers/practice/practice';
import {ServiceProvider} from '../../providers/service/service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	@ViewChild('result') result:any;
		Oxo:any='';
	app_name:any= '';
	pages:any;
	darlic:any;
	darlic2: Array<String>;
	categoryId: number;
	value:any;
	value1:any;
	pages1:any;
	  appList: any[] = [ {
      "ID": "1",
      "url": 'app/Images/One.jpg'
   },

   {
      "ID": "2",
      "url": 'app/Images/Two.jpg'
   } ];

	
  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider:ServiceProvider, public pracProvider : PracticeProvider) {
  	// this.apiProvider.listusers();
    // this.result=this.pracProvider.data;
    // console.log(this.pracProvider.listapi());

// var json = [{
//     "id" : "1",
//     "name":"dd"
// },
// {
//     "id" : "2",
//      "name":"ee"
// },
// {
//     "id" : "3",
//      "name":"ww"
// },
// {
//     "id" : "4",
//      "name":"dd"
// }];

    for(var i = 0; i < this.appList.length; ) {
    this.value= this.appList[0];
    this.value1=this.appList[1];
    console.log(this.value.ID);
    i++;
}



	    //without promise
	     let categoryId = 1;
	  this.pracProvider.listapi().subscribe((data) => {
	  	
	      this.result = JSON.parse(data['_body']).data;
	      this.app_name = this.result;
	      this.pages=this.app_name.app_pages;
	      	console.log(this.pages.length);
	      for(var j=0; j < this.pages.length;){
	      	this.pages1=this.pages[0];
	      	       console.log(this.pages1.slug);
	      	j++;

	      }
	   	 // console.log(this.pages);
   })




	  // abc(){
	  // 	return new Promise((resolve)=>'')   
	  // }


    	// with promise
	    let env = this;
	    env.Oxo=env.serviceProvider.getUsersHttp();
	    setTimeout(function(){
	    	env.darlic=env.Oxo['__zone_symbol__value'];
	    	// env.darlic2=JSON.parse(env.userUrl['body'])
	    	env.darlic2=env.darlic.app_pages[categoryId];
	    	console.log(env.darlic2);
	    },2900);
	    // this.result=this.pracProvider.listapi();
	    // console.log(this.result);
	    // console.log(JSON.parse(this.result['_body']));


	  
	// console.log(JSON.parse(this.result['_body']));
    // console.log(JSON.stringifythis.result['_body']);
    // console.log('here i can see data correctly ' + JSON.stringify(this.result));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
