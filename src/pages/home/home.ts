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

  public db;

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

    			this.db = openDatabase('Appkit', '1.0', 'Test DB', 2 * 1024 * 1024);

           


    			// this.db.transaction(function (tx) {  
    			//    tx.executeSql('CREATE TABLE IF NOT EXISTS Users (id unique, username)');
       //       tx.executeSql('INSERT INTO Users (id, username) VALUES (1, "foobar")');
       //       tx.executeSql('INSERT INTO Users (id, username) VALUES (2, "HEDER")');
             
    			// });
    		}
    });




  	
  }



  pushPage(){
    this.navCtrl.push( LoginPage );
  }
  create(){
    this.db.transaction((tx) => {
       tx.executeSql("CREATE TABLE IF NOT EXISTS attendance (id, firstname)");
    });
    console.log('Created');
  }
  insert(){
    this.db.transaction((tx)=>{
      tx.executeSql('INSERT INTO attendance (id, firstname) VALUES (1, "foobar")');
     console.log('data is inserted');
    });
  }
  select(){
    this.db.transaction((tx)=>{
      tx.executeSql('SELECT * FROM attendance',[],function(tx,result){
          if(result.rows.length > 0){
            for(var i=0; i < result.rows.length; i++ ){
             // console.log(result.rows);
             var data=result.rows.item(i);
             console.log(data.id);
              //console.log(result.rows.item(i).id);
            }
           
          }
      });
     
    })
  }
   

 
}  
