import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
	 Apidata :any;
  result:any;
  db:any;
  database='database';
   apidata;
  public query:any;
  //public db = window.db;
    slugs = [];
    slugproduct=[];
    AppkitPages=[];
    AppkitProducts=[];
    AppkitMeta;
    connectionDb;
	 constructor(public platform:Platform,public http: Http, public sqlite:SQLite, public loadingctrl: LoadingController) {
    this.PlatformCheck()
  }

  PlatformCheck(){
   // return new Promise((resolve,reject)=>{
        this.platform.ready().then(() => {
                    if(this.platform.is('cordova')){
                        this.connectionDb = this.sqlite.create({name:"test.db",location:"default" }).then((db: SQLiteObject)=>{
                          this.db=db;
                          console.log(this.db);

                        });

                    if(this.platform.is('cordova')){
                        this.connectionDb = (<any> 'cordova').openDatabase("test.db", '1', 'my', 1024 * 1024 * 100);

                       // this.db=this.connectionDb;
                    }else{
                      this.connectionDb = (<any> window).openDatabase("test.db", '1', 'my', 1024 * 1024 * 100);
                      this.db=this.connectionDb;  
                    }
                });
       // resolve('true');
    //})
    
  }
  

  // ExecuteQuery(puriquery,){
  //   this.PlatformCheck().then(()=>{
  //     this.platform.ready().then(() => {
  //               if(this.platform.is('cordova')){
  //                    this.db.executeSql();
  //               }else{
  //                    this.db.transaction((tx)=>{
  //                       tx.executeSql( query,[],);
  //                   });
  //               }
  //           });
  //   })
    
  // }

SelectPages(db,tableName){

    if(this.db!=undefined){
        return new Promise((resolve,reject)=>{
          //this.ExecuteQuery('Select * from '+tableName);
            this.db.transaction((tx)=>{

                tx.executeSql('Select * from '+tableName, [], (tx,resultPages) =>{ 
                  let i=0;
                  this.AppkitPages=[];
                 // console.log(resultPages.rows);
                  resolve(resultPages.rows); 
                },(error,er)=>{
                    console.log(er);
                });
            });;
        })
        
    }
}
	// connection(){
 //    this.connectionDb = (<any> window).openDatabase("test.db", '1', 'my', 1024 * 1024 * 100);
 //    return this.db=this.connectionDb;
 //  }

metaQuery(db,record,tableName){
    let columns=[];
    let values =[];
    let tablekeys;
    return new Promise((resolve,error)=>{
    	for(let tablekeys in record){
        if(typeof record[tablekeys]!= "object"){
           columns.push(tablekeys);
           values.push(record[tablekeys]);
        }
    }
    //if(db! = undefined){
        db.transaction((tx)=>{
            tx.executeSql('SELECT  app_domain FROM '+tableName,[],(tx,result)=>{
                if(result.rows.length > 0){
                   //console.log(result);
                    let meta;
                    meta=result.rows[0].app_domain;
                    let questionMarks=[];
                    for(let j=0; j < values.length; j++){
                       questionMarks.push("?");
                    }
                    values.push(meta);
                    db.transaction((tx)=>{
                        tx.executeSql('UPDATE '+tableName +' SET '+ columns.join('=?, ')+' = ? where app_domain = ?', values, 
                           (result)=>{ 
                        });
                    })
                }else{
                    let questionMarks=[];
                    for(let j = 0; j < values.length; j++){
                        questionMarks.push("?");
                    }
                    db.transaction((tx)=>{
                        tx.executeSql('INSERT INTO '+tableName + '(' + columns+ ') VALUES (' +questionMarks + ')' ,values );
                    })
                }
               
                resolve(values);
            })
         })  
    //}
    
    })
    
}



insertProduct(db,record,tableName){

    let columns = [];
    let values =[];
    let slugdata;
    return new Promise((resolve,error)=>{
    	if(record!=''){
        for(let tableColumns in record.app_products[0]){
            columns.push(tableColumns)
            //console.log(columns);
        }
        //gettting values of product
        for(let productkey of record.app_products){
            let v=[];
            for(let key in productkey){
              let json;
                if(key=='product_attributes'){
                  json=JSON.stringify(productkey[key]);
                }else{
                  json=productkey[key];
                }
               v.push(json);
            }//console.log(v);
          values.push(v);
        }//console.log(values);
    }

    //if(db! = undefined){
     
        db.transaction((tx)=>{
            tx.executeSql('SELECT slug FROM '+tableName , [] , (tx , result) => {
                if(result.rows.length > 0){
                  
                    for(let i=0; i < result.rows.length; i++){
                        if(result.rows[i] != undefined){
                            slugdata=this.slugproduct.push(result.rows[i].slug);
                        } //console.log(this.slugproduct);            
                    }
                   // console.log(slugdata.length);
                    if(this.slugproduct.length > 0){
                        this.productupdate(values,db,tableName, columns);
                    }
                }else{
                    //console.log('insert');
                     this.insertData(values,db,tableName, columns);
                }
                resolve(values);
            });
        }); 
  // }
    
    });
    
}

productupdate(values,db, tableName, columns, i = 0){
    
    if(values[i] != undefined){
        db.transaction((tx) => {
            //console.log(this.slugproduct[i]);
        values[i].push(this.slugproduct[i]);
        let questionMarks = [];
        for(let j = 0; j< values[i].length; j++){
          questionMarks.push('?');
        }  
        tx.executeSql('UPDATE '+tableName+' SET '+columns.join(' = ? ,')+' = ? where slug = ?', values[i]
         , (result)=>{ 
                this.productupdate(values,db, tableName, columns, i = i+1);
            });
        })
    }
}


update(values,db, tableName, columns, i = 0){
    //console.log('pages');
    if(values[i] != undefined){
     // console.log(this.slugs);
        db.transaction((tx) => {
            values[i].push(this.slugs[i]);
            let questionMarks = [];
            for(let j = 0; j< values[i].length; j++){
              questionMarks.push('?');
            }  
            tx.executeSql('UPDATE '+tableName+' SET '+columns.join(' = ? ,')+' = ? where slug = ?', values[i] , (result)=>{  
            		//console.log(result); 
                   this.update(values,db, tableName, columns, i = i+1);
            });
        })
    }
}
insertData(values,db, tableName, columns, i = 0){
    if(values[i] != undefined){
        let questionMarks = [];
        for(let j = 0; j< values[i].length; j++){
           questionMarks.push('?');
        }
        db.transaction((tx) => {
        	
            tx.executeSql('INSERT INTO '+tableName+' ( '+columns.join(',')+' ) VALUES ('+questionMarks.join(',')+')' , values[i] ,(result) => {
            	//console.log(result);
                this.insertData(values,db,tableName,columns,i = i+1);
            });
        })
    }

 }

 
create(db,record,tableName){
//console.log(tableName);
//let columns = [];
let columns=[];
    if(record != undefined){
        //columns to be made inn table
       if(tableName== 'app_pages'){
            for(let app_keys in record.app_pages[0]){
                columns.push(app_keys+' TEXT');
            } 
        }else if(tableName == 'app_products'){
            for(let app_keys in record.app_products[0]){
                columns.push(app_keys+' TEXT');
            }
        }else if(tableName == 'meta_data'){
            for(let app_keys in record){
                if(typeof record[app_keys]!= "object"){
                    columns.push(app_keys + ' TEXT');
                }
            }
        } 
    }
    this.db.transaction((tx)=>{
      //console.log('CREATE TABLE IF NOT EXISTS '+tableName+'('+columns.join(",")+') ');
       tx.executeSql('CREATE TABLE IF NOT EXISTS '+tableName+'('+columns.join(",")+') ');
    });
}




SelectProducts(db,tableName){
  let key;
  let i;
   let data = [];
    if(this.db!=undefined){
        return new Promise((resolve,reject)=>{
            this.db.transaction((tx)=>{
               tx.executeSql('Select * from '+tableName, [], (tx,result) =>{ 
                  this.AppkitProducts=[];
                 
                  for(i = 0; i < result.rows.length; i++){
                     let temp = result.rows[i];
                     temp.product_attributes = JSON.parse(temp.product_attributes);
                     //console.log(temp.product_attributes);
                     //console.log(temp.product_attributes.value);
                     this.AppkitProducts.push(temp)
                  }  
                  //console.log(this.AppkitProducts); 
                  resolve(this.AppkitProducts);
               });
            });
        })
        
    }
}

SelectProductDetail(db,tableName,id){
  let productDetail;
  console.log(tableName);
  if(this.db!=undefined){
    return new Promise ((resolve,reject)=>{
      this.db.transaction((tx)=>{
        //console.log('Select * from ' + tableName + ' where id = '+ id);
        tx.executeSql('Select * from ' + tableName + ' where id = '+ id, [], (tx,result)=>{
           productDetail=result.rows[0];
           productDetail.product_attributes=JSON.parse(productDetail.product_attributes);
          resolve(productDetail);
        })
      })
    })
  }
}



SelectMeta(db,tableName){
    if(this.db!=undefined){
        return new Promise((resolve,reject)=>{
            this.db.transaction((tx)=>{
                tx.executeSql('Select * from '+tableName, [], (tx,result) =>{ 
                   if(result.rows.length>0){
                       for(let i=0; i < result.rows.length; i++){
                              this.AppkitMeta=result.rows[i];
                           //console.log(this.AppkitMeta);
                       }
                       resolve(this.AppkitMeta);
                   }
                });

            });;
        });
    }
}

DeleteAll(db,tableName){
	return new Promise((resolve,reject)=>{
		this.db.transaction((tx)=>{
		tx.executeSql('Delete  from '+tableName, [], (tx,result)=>{	
			if(result.rows.length>0){
				console.log('not deleted');
			}else{
				// let loading=this.loadingctrl.create({
			 //   	content: `
			 //        <div class="custom-spinner-container">
			 //        <ion-spinner name="circles">Wait...</ion-spinner>
			 //        </div>`
			 //  	 });
			 // 	loading.present();
  				this.refreshLoad().then(data=>{
					this.apidata=data;
					if(tableName=='app_pages'){
						this.insertQuery(db, this.apidata, tableName);
					}
					if(tableName=='meta_data'){
						this.metaQuery(db, this.apidata, tableName)
					}
					if(tableName=='app_products'){
						this.insertProduct(db,this.apidata,tableName)
					}
					//loading.dismiss();
					window.location.reload();
				});
			resolve(this.insertQuery);
			}
		})
	})
	})
	
}

insertQuery(db,record,tableName){
    let columns = [];
    let values = [];
    let slugdata;
   return new Promise((resolve, reject)=>{
   
    	if(db != undefined){
    		
        db.transaction((tx) => {
            tx.executeSql('SELECT slug FROM '+tableName , [] , (tx , result1) => {
            
                if(result1.rows.length > 0){
                    for (var i = 0; i <= result1.rows.length ; i++) {
                        if(result1.rows[i] != undefined){
                            slugdata=this.slugs.push(result1.rows[i].slug);
                            //console.log(this.slugs);
                        }
                    }
                   //console.log(slugdata);
                    if(this.slugs.length > 0){
                    	 // console.log('update app pages');
                      this.update(values,db,tableName, columns);

                    }
                }else{
                	//console.log('insert app pages');
                  this.insertData(values,db,tableName, columns);
                }
               // console.log(values);
            });
   			resolve(values);
        });

        if(record != ''){
            //process columns form record variable
                for(let tableColumns in record.app_pages[0]){
                    columns.push("'"+tableColumns+"'");
                }
            //process values from record variable
                if(record.app_pages.length > 0){
                    if(record.app_pages != undefined){
                        for(let appData of record.app_pages){

                            let v = [];
                             let w=[];
                            for(let keys in appData){
                                if(record.app_pages != undefined || appData != undefined){
                                    v.push(appData[keys]);
                                }
                            }
                        values.push(v);
                            }
                        //console.log(values);
                    }
                }      
        }
   	}
 	});
   
};

insertAll(db){
 let pages = 'app_pages';
 let products = 'app_products';
 let meta_data='meta_data';
 let dd='database';
 let insertpage;
 let insertproducts;
 let insertmeta;

	return new Promise((resolve, reject)=>{
		this.load().then((data)=>{
			this.apidata=data;
//console.log('pages');

         this.create(dd, this.apidata, pages);
         this.create(dd, this.apidata, products);
         this.create(dd, this.apidata, meta_data);

			  this.insertQuery(this.connectionDb, this.apidata, pages).then((result)=>{
			   	insertpage=result;
			   	this.insertProduct(this.connectionDb, this.apidata, products).then((result)=>{
			   		insertproducts=result;
			   		this.metaQuery(this.connectionDb, this.apidata , meta_data ).then((result)=>{
			   			insertmeta=result;
			   		
				   			let insertvalues={};
				   			insertvalues['insertpage']=insertpage;
				   			insertvalues['insertproducts']=insertproducts;
				   			insertvalues['insertmeta']=insertmeta;
				   			//console.log()
								resolve(insertvalues);

						});
			   	});
			  });
		})
	});
};

refreshLoad() {
    if (this.Apidata) {
      // already loaded data
      Promise.resolve(this.Apidata);
      // return added
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('http://aione.oxosolutions.com/api/android/')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.Apidata = data.data;
         // console.log(this.data);
          resolve(this.Apidata);
        });
    });
  }




load() {
    if (this.Apidata) {
      // already loaded data
    return  Promise.resolve(this.Apidata);
      // return added
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('http://aione.oxosolutions.com/api/android/')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.Apidata = data.data;
         // console.log(this.data);
          resolve(this.Apidata);
        });
    });
  }






}
