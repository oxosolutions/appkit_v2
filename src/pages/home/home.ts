import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SQLite } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public sqlite:SQLite, public platform:Platform) {
  	


  	 	platform.ready().then(() => {
  	 // 	if(this.platform.is('mobileweb')){
  		// 	console.log('on browser');

  		// }         
  		if(this.platform.is('cordova')){
  			console.log("on mobile");
  			this.sqlite.create({
		  		name: 'test.db',
		  		location : 'default'
	  		});

  		}else{
  			var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
			db.transaction(function (tx) {  
			   tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
			});
  		}
        });




  	
  }
  pushPage(){
    this.navCtrl.push( LoginPage );
  }


}
