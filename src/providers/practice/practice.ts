import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the PracticeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class PracticeProvider {
  data :any;
  result:any;
  db:any;
  public query:any;
  //public db = window.db;
    slugs = [];
    slugproduct=[];
  constructor(public http: Http, public sqlite:SQLite) {

  }

metaQuery(db,record,tableName){
    let columns=[];
    let values =[];
    let tablekeys;
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
            })
         })  
    //}
    
}



insertProduct(db,record,tableName){
    let columns = [];
    let values =[];
    let slugdata;
    if(record!=''){
        for(let tableColumns in record.app_products[0]){
            columns.push(tableColumns)
            //console.log(columns);
        }
        //gettting values of product
        for(let productkey of record.app_products){
            let v=[];
            for(let key in productkey){
                let json=JSON.stringify(productkey[key]);
                v.push(json);
            }
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
                        } //console.log(slugdata);            
                    }
                   // console.log(slugdata.length);
                    if(this.slugproduct.length > 0){
                        this.productupdate(values,db,tableName, columns);
                    }
                }else{
                    //console.log('insert');
                     this.insertData(values,db,tableName, columns);
                }
            });
        }); 
   // }
    
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

insertQuery(db,record,tableName){
    let columns = [];
    let values = [];
    let slugdata;
    
    if(db != undefined){

        //get slugs of existing table
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
                      this.update(values,db,tableName, columns);
                    }
                }else{
                  this.insertData(values,db,tableName, columns);
                }
            });
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
            tx.executeSql('UPDATE '+tableName+' SET '+columns.join(' = ? ,')+' = ? where slug = ?', values[i] , (result)=>{         this.update(values,db, tableName, columns, i = i+1);
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
    db.transaction((tx)=>{
       //console.log('CREATE TABLE IF NOT EXISTS '+tableName+'('+columns.join(",")+') ');
       tx.executeSql('CREATE TABLE IF NOT EXISTS '+tableName+'('+columns.join(",")+') ');
    });
}




load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('http://aione.oxosolutions.com/api/android/')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data.data;
         // console.log(this.data);
          resolve(this.data);
        });
    });
  }






}
