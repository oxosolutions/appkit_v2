import { Http } from '@angular/http';
import { Injectable , ViewChild} from '@angular/core';
import { HomePage } from '../../pages/home/home';
import {ListproductPage} from '../../pages/listproduct/listproduct';
import {ProductDetailsPage}from '../../pages/product-details/product-details';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Nav, Platform ,ToastController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { NavController } from "ionic-angular/index";
import { App } from "ionic-angular";
import { Network } from '@ionic-native/network';

@Injectable()
export class DatabaseProvider {
   private navCtrl: NavController;
public database:any;
public query:any;
db:any;
Apidata:any;
slugs = [];
dataset:any;
AppkitProducts=[];

constructor(private toast: ToastController,private network: Network,public http: Http, public platform:Platform, public sqlite:SQLite,public loadingctrl: LoadingController) {
}

  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: `You are now ${connectionState}`,
      duration: 3000
    }).present();
  }
  connection(){
    return new Promise((resolve,reject)=>{
      this.network.onConnect().subscribe(data => {
        // alert('network connected');
        this.displayNetworkUpdate(data.type);
      }, error => console.error(error));
      this.network.onDisconnect().subscribe(data => {
        this.displayNetworkUpdate(data.type);
      }, error => console.error(error));
      if(this.platform.is('cordova')){
        this.sqlite.create({name:'appkit', location:'default'}).then(( data: SQLiteObject) => { 
         this.database = data;
         this.db=this.database;
         resolve(this.db);
         },(error) => {
            console.error("wrong database", error);
        });
      }else{
        this.database = (<any> window).openDatabase("tuteAppBrowser", '1', 'my', 1024 * 1024 * 100); 
        this.db=this.database;
        resolve(this.db);  
      }
    })
  }

  ExecuteRun(query, valesData){
    return new Promise((resolve,reject)=>{
       if(query!=undefined){
          if(this.platform.is('cordova')){
             this.database.executeSql(query, valesData, (result:any) =>{
                resolve(result);
             },(error:any)=>{
                console.error(error);
                console.log(query);
             });
          }else{
            this.database.transaction((tx)=>{
              tx.executeSql(query, valesData, (tx,result:any)=>{
                 resolve(result);
              },(error:any)=>{
                 console.error(error);
                  console.log(query);
              });
            })
          }
       }
    })
  }
  delall(){
    if(this.platform.is('cordova')){
       this.database.close();
    }else{
       
    }
  }
   
  createTable(){        
    let columnPosts=[];
    let tableNamepost;
    return new Promise((resolve,reject)=>{ 
      this.load().then((result:any)=>{
         this.Apidata=result;
        this.pagesTable(result).then((resultpages:any)=>{
          this.metaTable(result).then((resultappkit:any)=>{console.log(resultappkit);
            this.productTable(result).then((productresul)=>{ console.log(productresul)
              this.postTable(result).then(()=>{  
                this.settingTable(result).then(()=>{
                  resolve("data");
                 // this.postsettingTable(result).then(()=>{
                   
                 //  })
                })
                
              }) 
            })    
                            
           })
        })
      });
    });
  }
  settingTable(result){
    let columns=[];
    return new Promise((resolve,reject)=>{
      //console.log(result);
      if("settings" in result){
        let tablename = "Settings";
        //console.log(result.settings);
        
        for(let app_keys in result.settings){
          columns.push(app_keys+ ' TEXT');
        }
        this.query='CREATE TABLE IF NOT EXISTS '+tablename+'('+columns.join(",")+')';
           this.ExecuteRun(this.query, []).then((resultpages:any)=>{
            this.settingQuery(this.database,result,tablename).then((ll)=>{
             resolve(ll);
            });
        });

      }
    })
  }
  settingQuery(db,record,tableName){
      let columnMeta=[];
       let values =[];
       let tablekeys;
       return new Promise((resolve,error)=>{
         if(record != ''){
            for(let tablekeys in record.settings){
                 if(typeof record.settings[tablekeys]!= "object"){
                    columnMeta.push(tablekeys);
                    values.push(record.settings[tablekeys]);
                 }
            }
            //console.log(values);
            this.query='SELECT  andriod_app_front_page FROM '+tableName;
            this.ExecuteRun('SELECT  andriod_app_front_page FROM '+tableName, []).then((result : any)=>{
               //console.log(result);
               if(result.rows.length > 0){
                  //console.log("less ")
                  let meta;
                 
                        meta=result.rows.item(0).andriod_app_front_page;
                       let questionMarks=[];
                       for(let j=0; j < values.length; j++){
                          questionMarks.push("?");
                       }
                       values.push(meta);
                       //console.log(meta);
                       this.query='UPDATE '+tableName +' SET '+ columnMeta.join('=?, ')+' = ? where andriod_app_front_page = ?';
                       this.ExecuteRun(this.query, values).then((hh)=>{
                        let AppkitMeta;
                       
                         if(result.rows.length>0){
                          for(let i=0; i < result.rows.item.length; i++){
                           
                                 AppkitMeta=result.rows.item(i)
                          }
                         
                          resolve(AppkitMeta);
                      }
                       });
               }else{
                 //console.log("greater");
                  let questionMarks=[];
                       for(let j = 0; j < values.length; j++){
                           questionMarks.push("?");
                       }
                       this.query='INSERT INTO '+tableName + '(' + columnMeta+ ') VALUES (' +questionMarks + ')';
                       //console.log(this.query);
                       //console.log(values);
                       this.ExecuteRun(this.query, values).then((hh)=>{
                          resolve(hh);
                    });
               }
            });
         }
       });
   }
  pagesTable(result){
    let columns=[];
    let tableNamepage:any;
    return new Promise((resolve,reject)=>{
      if("pages" in result){
        tableNamepage="app_pages";
        if(result.pages.data.length > 0){
          for(let app_keys in result.pages.data[0]){
            columns.push(app_keys+' TEXT');
          }
          this.query='CREATE TABLE IF NOT EXISTS '+tableNamepage+'('+columns.join(",")+')';
          this.ExecuteRun(this.query, []).then((resultpages:any)=>{
            this.insertPages(this.database, this.Apidata,tableNamepage).then((resultffff)=>{
              resolve(resultffff) ;         
            });
          });
        }else{
          resolve("not pages");
        }
      }     
    })
  }
  metaTable(result){
    let tableName:any;
    let columnMeta=[];
    return new Promise((resolve,reject)=>{
      if("app_name" in result){
        for(let app_keys in result){
            tableName="Meta";
            if(typeof result[app_keys]!= "object"){
                 columnMeta.push(app_keys + ' TEXT');
            }
        }
        this.query='CREATE TABLE IF NOT EXISTS '+tableName+'('+columnMeta.join(",")+')';
        this.ExecuteRun(this.query, []).then((data:any)=>{
          this.metaQuery(this.database,result,tableName).then((resultappkit)=>{
            //console.log(resultappkit);
             resolve(resultappkit);         
          }) 
        });
      }
    })
  }
  productTable(result){
    let tableNamepro;
    let columnsproduct=[];
    return new Promise((resolve,reject)=>{
      if("products" in result){
        tableNamepro="app_products";
        if(result.products.data.length > 0){
          for(let app_keys in result.products.data[0]){
          columnsproduct.push(app_keys+' TEXT');
          }
          this.query='CREATE TABLE IF NOT EXISTS '+tableNamepro+'('+columnsproduct.join(",")+')';
           this.ExecuteRun(this.query, []).then((resultproduct:any)=>{
              this.insertProduct(this.database,result,tableNamepro).then((productresul)=>{
                  localStorage.setItem("product","notNull");
                  resolve(productresul)
              });
          });
        }else{
          // if product list is zero
          localStorage.setItem("product","null");
          resolve("not product");
        }
        
      }
    })
  }
  postTable(result){
    let tableNamepost;
    let columnPosts=[];
    return new Promise((resolve,reject)=>{
      if("posts" in result){
        tableNamepost="posts";
        if(result.posts.data.length > 0){
          for(let app_keys in result.posts.data[0]){
            columnPosts.push(app_keys+ ' TEXT');
          }  
          this.query='CREATE TABLE IF NOT EXISTS '+tableNamepost+'('+columnPosts.join(",")+')';
          this.ExecuteRun(this.query, []).then((data:any)=>{
            this.insertpost(this.database,result,tableNamepost).then((postresult)=>{
              //console.log(postresult);
              //resolve(postresult);
              resolve();
             
            })
          });
        }else{
          resolve("no post");
        }
      }
    })
  }
  postsettingTable(result){
    let postSettting=[];
    console.log('postsetting');
    return new Promise((resolve,reject)=>{
      if("template_settings" in result.posts){
              let tableName333;
              tableName333="postSetting";
              for(let app_keys in result.posts.template_settings){
                postSettting.push(app_keys);
                // console.log(postSettting)
              }
              this.query='create table if not exists '+tableName333+'('+postSettting.join(",")+')';
              this.ExecuteRun(this.query,[]).then((postsetting:any)=>{
                 this.insertPostSettting(this.database,result,tableName333).then(()=>{

                 });
              });
      }  

    })
  }
  insertPostSettting(db,record,tableName){
    let columnsdata=[];
    let values=[];
    let json;
    return new Promise((resolve,reject)=>{
      for(let key in record.posts.template_settings){
       //console.log(key);
        json=record.posts.template_settings[key].replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
         //console.log(json);          
         values.push(json); 
         columnsdata.push(key);
        }
       
      // console.log(columnsdata);
      // console.log(values);
      if(db != undefined){
        this.query='SELECT * from '+tableName;
        this.ExecuteRun(this.query,[]).then((postget:any)=>{
        if(postget.rows.length > 0){
          // console.log('update');
        }else{
         // console.log('insert');
          this.insertSetting(values,db, tableName, columnsdata).then(()=>{

          });

        }
        })
      }

    })
  }
  insertSetting(values,db, tableName, columns){
      return new Promise((resolve,reject)=>{
        let i;
        let j;
        let resultKey;
        if(values != undefined){
          let collectedData = [];
            let valuesArray = [];
            //console.log(values);
          for(i=0; i < values.length; i++){
             valuesArray.push('"'+values[i]+'"');

          }
         // console.log(valuesArray);
                  
         this.query = 'INSERT INTO '+tableName+' ( '+columns.join(',')+' ) VALUES '+'('+valuesArray.join(',')+')' ;
       // console.log(this.query);  
          this.ExecuteRun(this.query, []).then((result:any)=>{
            resolve(result);
          })
        }
        
      });

   }
  Apitable(){
   let tablename:any;
    let columnsdata=[];
    return new Promise((resolve,reject)=>{
      this.loadApi().then((result:any)=>{
           tablename='ApiData';
           let json;
          for(let key in result[0]){  
            json=key.replace(/ /g, "_");
            columnsdata.push(json+' TEXT');
          }
          this.query='create table if not exists '+tablename+'('+columnsdata.join(",")+')';
          this.ExecuteRun(this.query,[]).then((resultdata:any)=>{
            this.insertApi(this.database, result,tablename).then((result:any)=>{
                    resolve(result);
            })
          })
      });
    });
  }
  insertApi(db,record,tableName){
    let columns;
    let key2;
    let values=[];
    let columnsdata=[];
    return new Promise((resolve,reject)=>{
      for(let key3 in record[0]){  
            let  json2=key3.replace(/ /g, "_");
            columnsdata.push(json2);
            
           
       }//console.log(columnsdata);
      for(let key in record){
        columns=record[key];
        let v=[];
        for( key2 in columns){
          //console.log(key2);
           let json=columns[key2].replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
                   
           v.push(json);
        }
        //console.log(v);
        values.push(v);
      }//console.log(values);
      if(db!=undefined){
        this.query='SELECT * FROM '+tableName;
        //console.log(this.query);
       
        this.ExecuteRun(this.query, []).then((result21:any)=>{
          //console.log(result21);
          if(result21.rows.length>0){
            //console.log('del');
           // this.query='Delete from '+tableName;
             this.query='DROP TABLE '+tableName;;
            this.ExecuteRun(this.query, []).then((result21:any)=>{
              this.Apitable().then((ll)=>{
                    //console.log(ll);
                     resolve('insert again query');
              });
            });
          }else{
            //console.log('insert');
            this.insertApidata(values,db,tableName, columnsdata).then((ll)=>{
                    //console.log(ll);
                     resolve('insert query');
            });
          }
        })
    }
    })
  }
  insertApidata(values,db, tableName, columns){
      return new Promise((resolve,reject)=>{
        let i;
        let j;
        let resultKey;
        if(values != undefined){
          let collectedData = [];
          for(i=0; i < values.length; i++){
            let valuesArray = [];
            for(j=0; j<values[i].length; j++){

              
              valuesArray.push('"'+values[i][j]+'"');

            }
            collectedData.push(
                '('+valuesArray.join(',')+')'
            );
          }
                  
         this.query = 'INSERT INTO '+tableName+' ( '+columns.join(',')+' ) VALUES '+collectedData.join(',') ;
          //console.log(this.query);  
          this.ExecuteRun(this.query, []).then((result:any)=>{
            resolve(result);
          })
        }
        
      });

   }
    insertpost(db,record,tableName){
      let columns=[];
      let values=[];
      let slugdata;
      return new Promise((resolve,reject)=>{
        for(let tableColumns in record.posts.data[0]){
            columns.push(tableColumns);
        }
        console.log(record.posts.data);
        for(let appData of record.posts.data){
          let v = [];
          let w=[];
          for(let keys in appData){
            let json;
            if(keys=='content'){
              json=appData[keys].replace(/&/g, "&amp;")
                              .replace(/</g, "&lt;")
                              .replace(/>/g, "&gt;")
                              .replace(/"/g, "&quot;")
                              .replace(/'/g, "&#039;");
                                         
            }else{
                json=appData[keys];   
            }
            if(record.pages != undefined || appData != undefined){
                v.push(json);
            }
          }
          values.push(v);
          //console.log(values);              
        }
        if(db!=undefined){
          this.query='SELECT slug FROM '+tableName;
          this.ExecuteRun(this.query, []).then((result2:any)=>{
            let slugdata;
            if(result2.rows.length>0){
              this.query='Delete  from '+tableName;
                     this.ExecuteRun(this.query,[]).then((result:any)=>{   
                        //console.log('deelteing app apges');
                        this.insertpostdata(values,db,tableName, columns).then((ll)=>{
                       // console.log('delete andy then insert');
                         // console.log(ll);
                          resolve('update query');
                        });
                     });
               
            }else{
             // console.log('insert post');
              this.insertpostdata(values,db,tableName, columns).then((ll)=>{
                    //console.log(ll);
                     resolve('insert query');
              });
            }
          })
        }
      })
    }

    insertpostdata(values,db, tableName, columns){
      //console.log(columns);
      return new Promise((resolve,reject)=>{
        let i;
        let j;
        let resultKey;
        if(values != undefined){
          let collectedData = [];
          for(i=0; i < values.length; i++){
            let valuesArray = [];
            for(j=0; j<values[i].length; j++){
              valuesArray.push('"'+values[i][j]+'"');
            }
            collectedData.push(
                '('+valuesArray.join(',')+')'
            );
          }      
          this.query = 'INSERT INTO '+tableName+' ( '+columns.join(',')+' ) VALUES '+collectedData.join(',') ;
         //console.log(this.query);  
          this.ExecuteRun(this.query, []).then((result:any)=>{
            resolve(result);
          })
        }
      });

   }                            
  insertProduct(db,record,tableName){
    let columns = [];
    let values =[];
    let slugdata;
    return new Promise((resolve,error)=>{
      if(record!=''){
        for(let tableColumns in record.products.data[0]){
              columns.push(tableColumns)
        }
        for(let productkey of record.products.data){
          let v=[];
          for(let key in productkey){
            let json;
              if(productkey[key] == null){    
                json=JSON.stringify(productkey[key]);
              }else{
                json=productkey[key];
              }
             v.push(json);
          }
          values.push(v);
        }//console.log(values);
      }
      if(db != undefined){
        this.query='SELECT slug FROM '+tableName;
        this.ExecuteRun(this.query, [] ).then((result1 : any)=>{
          if(result1.rows.length > 0){
            this.query='Delete  from '+tableName;
            this.ExecuteRun(this.query,[]).then((result:any)=>{   
              this.insertDataProduct(values,db,tableName, columns).then((ll)=>{
                resolve('update query');
              });
            });
          }else{
            this.insertDataProduct(values,db,tableName, columns).then((resultproduct)=>{
               resolve(resultproduct);
            });
          }
        })
      }
    });
  }
  insertDataProduct(values,db, tableName, columns){
    return new Promise((resolve,reject)=>{
      let i;
      let j;
      let resultKey;
     
      if(values != undefined){
        let collectedData = [];
        for(i=0; i < values.length; i++){
          let valuesArray = [];
          for(j=0; j<values[i].length; j++){

            if(typeof values[i][j]!= "object"){
              valuesArray.push("'"+values[i][j]+"'");
          }else{
              //console.log('object');
            }
          }
        //  console.log(valuesArray);
          collectedData.push('('+valuesArray.join(',')+')'
          );
          //console.log(collectedData);
        }
                
        this.query = 'INSERT INTO '+tableName+' ( '+columns.join(',')+' ) VALUES '+collectedData.join(',') ;
        //console.log(this.query);  
          this.ExecuteRun(this.query, []).then((result:any)=>{
            resolve(result);
          })
      }
      
    });
  }
   metaQuery(db,record,tableName){
      let columnMeta=[];
       let values =[];
       let tablekeys;
       return new Promise((resolve,error)=>{
         if(record != ''){
            for(let tablekeys in record){
                 if(typeof record[tablekeys]!= "object"){
                    columnMeta.push(tablekeys);
                    values.push(record[tablekeys]);
                 }
            }
            this.query='SELECT  app_domain FROM '+tableName;
            this.ExecuteRun('SELECT  app_domain FROM '+tableName, []).then((result : any)=>{
               //console.log(result);
               if(result.rows.length > 0){
                  //console.log('update');
                  let meta;
                  //console.log(result);
                        meta=result.rows.item(0).app_domain;
                        //console.log(meta);
                       let questionMarks=[];
                       for(let j=0; j < values.length; j++){
                          questionMarks.push("?");
                       }
                       values.push(meta);
                       this.query='UPDATE '+tableName +' SET '+ columnMeta.join('=?, ')+' = ? where app_domain = ?';
                       this.ExecuteRun(this.query, values).then((hh)=>{
                        let AppkitMeta;
                        //console.log(hh);
                         if(result.rows.length>0){
                          for(let i=0; i < result.rows.item.length; i++){
                           
                                 AppkitMeta=result.rows.item(i)
                          }
                         
                          resolve(AppkitMeta);
                      }
                       });
               }else{
                  //console.log('insert');
                  let questionMarks=[];
                       for(let j = 0; j < values.length; j++){
                           questionMarks.push("?");
                       }
                       this.query='INSERT INTO '+tableName + '(' + columnMeta+ ') VALUES (' +questionMarks + ')';
                       this.ExecuteRun(this.query, values).then((hh)=>{
                        //console.log(hh);
                        //let AppkitMeta;
                        //console.log(hh);
                         // if(result.rows.length>0){
                         //  for(let i=0; i < result.rows.length; i++){
                         //         AppkitMeta=result.rows.item(i);
                         //  }
                          // console.log(AppkitMeta); 
                          resolve(hh);
                     // }
                    });
               }
            });
         }
       });
   }
   insertPages(db,record,tableName){
      let columns = [];
       let values = [];
       let slugdata;
      return new Promise((resolve,reject)=>{
         if(record != ''){
               //process columns form record variable
                for(let tableColumns in record.pages.data[0]){
                    columns.push("'"+tableColumns+"'");
                }

               //process values from record variable
                if(record.pages.data.length > 0){
                    if(record.pages.data != undefined){
                        for(let appData of record.pages.data){

                            let v = [];
                             let w=[];
                            for(let keys in appData){
                              let json;

                              if(keys=='id' || keys =='show_in_menu'){
                                json=appData[keys];                             
                                
                              }else{
                                  //json=appData[keys].replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                                  json=appData[keys].replace(/&/g, "&amp;")
                                  .replace(/</g, "&lt;")
                                  .replace(/>/g, "&gt;")
                                  .replace(/"/g, "&quot;")
                                  .replace(/'/g, "&#039;");
                              }
                              //console.log(appData[keys]);
                                if(record.pages != undefined || appData != undefined){
                                    v.push(json);
                                }
                            }
                        values.push(v);
                            }
                       // console.log(values);
                    }
                }      
         }
         if(db != undefined){
            this.query='SELECT slug FROM '+tableName;
            this.ExecuteRun(this.query,[]).then((result1 : any)=>{
               //console.log(result1);
               if(result1.rows.length > 0){
                 
                  for (var i = 0; i < result1.rows.item.length ; i++) {
                          if(result1.rows.item(i) != undefined){
                            slugdata=this.slugs.push(result1.rows.item(i).slug);
                          }
                        }
                        if(this.slugs.length > 0){
                        // this.update(values,db,tableName, columns).then((update)=>{
                        //    //console.log(update);
                        // });
                        this.query='Delete  from '+tableName;
                       this.ExecuteRun(this.query,[]).then((result:any)=>{   
                          this.insertData2(values,db,tableName, columns).then((ll)=>{
                          resolve('update query');
                        });
                     });
                     }
               }else{
                 //.log('insert');
                   this.insertData2(values,db,tableName, columns).then((ll)=>{
                     //console.log(ll);
                     resolve('insert query');
                    
                  });
               }

            });
         }
         // resolve('insert query');
      })
   }
    insertData2(values,db, tableName, columns){
    return new Promise((resolve,reject)=>{
      let i;
      let j;
      let resultKey;
      if(values != undefined){
        let collectedData = [];
        for(i=0; i < values.length; i++){
          let valuesArray = [];
          for(j=0; j<values[i].length; j++){

            
            valuesArray.push('"'+values[i][j]+'"');

          }
          collectedData.push(
              '('+valuesArray.join(',')+')'
          );
        }
                
        this.query = 'INSERT INTO '+tableName+' ( '+columns.join(',')+' ) VALUES '+collectedData.join(',') ;
       // console.log(this.query);  
        this.ExecuteRun(this.query, []).then((result:any)=>{
          resolve(result);
        })
      }
      
    });

   }

  
   update(values,db, tableName, columns, i = 0){
      //console.log('update');
      return new Promise((resolve,reject)=>{
       if(values[i] != undefined){
           db.transaction((tx) => {
               values[i].push(this.slugs[i]);
               let questionMarks = [];
               for(let j = 0; j< values[i].length; j++){
                 questionMarks.push('?');
               }  
               this.query = 'UPDATE '+tableName+' SET '+columns.join(' = ? ,')+' = ? where slug = ?';
              this.ExecuteRun(this.query, values[i]).then((result)=>{
               resolve(result);
               this.update(values,db, tableName, columns, i = i+1);
              });
           })
       }
   });
   }
   SelectSettings(tableName){
     return new Promise((resolve,reject)=>{
       if(this.db!=undefined){
         this.query='Select * from '+tableName;
         this.ExecuteRun(this.query,[]).then((resultSetting:any)=>{
           //console.log(resultSetting.rows.item(0));
           resolve(resultSetting.rows.item(0));
         })
       }
     })
   }
   SelectPages(tableName){
      let AppkitPage=[];
      let slughome;
       if(this.db!=undefined){
          let i;
           return new Promise((resolve,reject)=>{
            //console.log(tableName);
            //
            let selectBulkTable=[]
             let query1="SELECT name FROM sqlite_master WHERE type = 'table' ";
             this.ExecuteRun(query1,[]).then((resulttable:any)=>{ console.log(resulttable);
              for(let i=0; i < resulttable.rows.length; i++){
                let temp=resulttable.rows.item(i);
                selectBulkTable.push(temp.name);
            }; 
            //console.log(selectBulkTable);
            //check table exits or not 
            if(selectBulkTable.indexOf(tableName)== -1){
              resolve("not exist");
            }else{
              this.query='Select * from '+tableName;
              this.ExecuteRun(this.query,[]).then((resultpages:any)=>{
                resolve(resultpages);
              })
            }
          }); 
         });    
       }
   }
  SelectPostArchive(tableName){
    let PostArc=[];
    let postStr=[];
    let single;
      let archive;
      let css;
      let js;
    return new Promise((resolve,reject)=>{
      this.query='Select * from '+tableName;
     // console.log(this.query);
      this.ExecuteRun(this.query,[]).then((postArc:any)=>{
        //console.log(postArc.rows);
        for(let i=0; i< postArc.rows.length; i++){
          postArc[i]= postArc.rows.item(i);
          for(let key in postArc[i]){
            postArc[i][key]=postArc[i][key].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'");
            postStr.push(postArc[i][key]);
          }
          //console.log(postStr);
          resolve(postStr);
        }
      })
    })
  }
SelectPost(tableName){
  let i;
  let Apppost=[];
  return new Promise((resolve,reject)=>{
    this.query='Select * from '+tableName;
    this.ExecuteRun(this.query,[]).then((resultPost:any)=>{
      for(i=0; i< resultPost.rows.length; i++){
        resultPost[i]=resultPost.rows.item(i);
        for(let key in resultPost[i]){
         if(key=='id' || key =='show_in_menu'){
           resultPost[i][key]=resultPost[i][key]; 
           //.log(resultPost[i][key]);   
         }else{
           resultPost[i][key]=resultPost[i][key].replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'");
         }
         }
         Apppost.push(resultPost[i]);
        }
        //console.log(Apppost);
        resolve(Apppost);
    })
  })
}
StringReplace(resultsData){
  let i;
  let Apppost=[];
  return new Promise((resolve,reject)=>{
      for(i=0; i< resultsData.rows.length;i++){
        resultsData[i]=resultsData.rows.item(i);
        for(let key in resultsData[i]){
         if(key=='id' || key =='show_in_menu'){
           resultsData[i][key]=resultsData[i][key]; 
           //console.log(resultsData[i][key]);   
         }else{
           resultsData[i][key]=resultsData[i][key].replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'");
        }
        }
         Apppost.push(resultsData[i]);
        } resolve(Apppost);
      
  })
}
SelectProducts(tableName){
    let key;
    let i;
   let data = [];
    if(this.db!=undefined){
      //console.log('databasde product');
        return new Promise((resolve,reject)=>{
         this.query='Select * from '+tableName;
           this.ExecuteRun(this.query,[]).then((resultproduct:any)=>{
                  //console.log(resultproduct);
                  this.AppkitProducts=[];
                 
                  for(i = 0; i < resultproduct.rows.length; i++){
                     let temp = resultproduct.rows.item(i);
                     temp.product_attributes = JSON.parse(temp.product_attributes);
                     this.AppkitProducts.push(temp)
                  }  
                  //console.log(this.AppkitProducts); 
                 resolve(this.AppkitProducts);
          })
            
        })
        
    }
}
ProductDetail(tableName,id){
    let productDetail;
    if(this.db!=undefined){
        return new Promise((resolve,reject)=>{
         this.query='Select * from '+tableName + ' where id = '+ id;
         //console.log('Select * from '+tableName + ' where id = '+ id);
           this.ExecuteRun(this.query,[]).then((result:any)=>{
              productDetail=result.rows.item(0);
           productDetail.product_attributes=JSON.parse(productDetail.product_attributes);
         //  console.log(productDetail);
          resolve(productDetail);
          })
            
        })
    }
}
PostDetail(tableName,id){
  let postresult;
  return new Promise((resolve,reject)=>{
    this.query='Select * from '+ tableName + ' where id ='+id;
    //console.log(this.query);
    this.ExecuteRun(this.query,[]).then((result:any)=>{
      this.StringReplace(result).then((resultreplace)=>{
        //console.log(resultreplace[0]);
        resolve(resultreplace[0]);
      });
    })
  })
}

   SelectMeta(tableName){
      let AppkitMeta;
       if(this.db!=null){
           return new Promise((resolve,reject)=>{
                  //console.log('here 1');
                  this.query='Select * from '+tableName;
                  this.ExecuteRun(this.query,[]).then((result:any)=>{
                     //console.log(result.rows);
                     //resolve(result.rows);
                      if(result.rows.length>0){
                          for(let i=0; i < result.rows.length; i++){
                                 AppkitMeta=result.rows.item(i);
                          }
                              //console.log(AppkitMeta);
                          resolve(AppkitMeta);
                      }
                   });

     
           });
       }
   }
  Apidataget(tableName){
    let dataset=[];
    if(this.db!=null){
       return new Promise((resolve,reject)=>{
       this.query='Select * from '+ tableName;
       this.ExecuteRun(this.query,[]).then((result:any)=>{
         //console.log(result.rows);
          // if(result.rows.length>0){
          //   for(let i=1; i < result.rows.length; i++){
          //     let temp=result.rows.item(i);
          //     dataset.push(temp)
          //   }
          //   console.log(dataset);
          // }
          resolve(result);
       })
      })
    }
      
  }
   DeleteAll(){    
     console.log('delete');
      return new Promise((resolve,reject)=>{
         let i;
         let data=[];
         let selectBulkTable=[];
          let hh=['app_pages', 'app_products', 'Meta', 'ApiData','postSetting','posts'];
          //console.log(hh.length);
           this.query="SELECT name FROM sqlite_master WHERE type = 'table' ";
           //console.log(this.query);
            this.ExecuteRun(this.query , []).then((result:any)=>{
                for(let i=0; i < result.rows.length; i++){
                let temp=result.rows.item(i);
                selectBulkTable.push(temp.name);
                }; 
                //console.log(selectBulkTable);
                 for( i=0; i < selectBulkTable.length; i++){
                  data.push(hh  [i]);
                  this.query='DROP Table IF  EXISTS ' + selectBulkTable[i];
                  //console.log(this.query);
                  this.ExecuteRun(this.query,[]).then((result:any)=>{ 
                     resolve(result);
                  });
                }
              })

         // window.location.reload();
         // t
      });
   }
 Apitable1(){
   let tablename:any;
    let columnsdata=[];
    return new Promise((resolve,reject)=>{
      this.loadApi().then((result:any)=>{
          //console.log(result);
           tablename='ApiData';
           let json;
          for(let key in result[0]){  
            json=key.replace(/ /g, "_");
            columnsdata.push(json+' TEXT');
           // console.log(columnsdata);
           
          }
          this.query='Delete  from '+tablename+'('+columnsdata.join(",")+')';
          //console.log(this.query);
          this.ExecuteRun(this.query,[]).then((resultdata:any)=>{
           
          })
      });
    });
  }
   load(){
      return new Promise ((resolve,reject)=>{
         this.http.get('http://aione.oxosolutions.com/api/android/').subscribe(data=>{
            this.Apidata=data.json().data;
            console.log(this.Apidata);
            resolve(this.Apidata);
            
         },error=>{
            console.error(error);
         })
      })
   }
  loadApi(){
    return new Promise((resolve,reject)=>{
      this.http.get('http://master.scolm.com/api/dataset/123456/3s1clNJqHOXhFbir1NFlpsx9s').subscribe((data)=>{
        this.dataset=data.json();
        //console.log(this.dataset);
        resolve(this.dataset);
      },(err)=>{
        console.error(err);
      })
    })
  }
   ionViewDidLoad(){
   console.log('database ionview did load')
   }
}