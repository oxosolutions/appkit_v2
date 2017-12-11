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
  constructor(public http: Http, public sqlite:SQLite) {

  } 

  runQuery(db,query,params,success,error){
    db.transaction((tx) => {
      
      for (let i in query) {
        tx.executeSql(query[i],params);
      }
      // this.db.executeSql(query,params).then((result)=>{
    //     success(result);
    // },(error)=>{
    //     error(error);
    // });
  });
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

                        }
                    }
                   // update tablename SET column = ?,cols= ? [values]
                   
                    if(this.slugs.length > 0){
                        //console.log(slugdata);
                        this.update(values,db,tableName, columns);
                        
                    }
                }else{
                    console.log("here");
                    this.insertData(values,db,tableName, columns);
                }
            });
        });

        if(record != ''){
            //process columns form record variable
                for(let tableColumns in record.app_pages[0]){
                    columns.push("'"+tableColumns+"'");
                }
                // console.log(columns);

            //process values from record variable
                if(record.app_pages.length > 0){
                    if(record.app_pages != undefined){
                        for(let appData of record.app_pages){
                                let v = [];
                            for(let keys in appData){
                                if(record.app_pages != undefined || appData != undefined){
                                    v.push("'"+appData[keys]+"'");
                                }
                            }
                                values.push(v);
                        }
                        console.log(values);
                    }
                }

            // if(slugs.length <= 1){

            //     console.log('first insert');
            //     this.insertData(values,db,tableName, columns);
            // }else{
            //     console.log('second inserted')
            // }
            
        }





    }
}


update(values,db, tableName, columns, i = 0){

    if(values[i] != undefined){
        //console.log(values[i]);
        db.transaction((tx) => {
             console.log(this.slugs[i]);
         console.log('UPDATE '+tableName+' SET '+columns.join(' = ? ,')+' = ? where slug = ?', ['1kdfj','2dd','3dd','4','5','6','7','8','9', this.slugs[i]]);
            tx.executeSql('UPDATE '+tableName+' SET '+columns.join(' = ? ,')+' = ? where slug = ?', ['1kdfj','2dd','3dd','4','5','6','7','8','9', this.slugs[i]] ,(result)=>{
                this.update(values,db, tableName, columns, i = i+1);
            });
        })

    }

 }
insertData(values,db, tableName, columns, i = 0){

    if(values[i] != undefined){
        db.transaction((tx) => {

            tx.executeSql('INSERT INTO '+tableName+' ( '+columns.join(',')+' ) VALUES ('+values[i].join(',')+')' , [] ,(result) => {
                this.insertData(values,db,tableName,columns,i = i+1);
            });
        })
    }

 }

 insertOrUpdateQuery(record, previousSlugs, value, tableName, columns, db, i = 0){



 }



    create(db,record,tableName){ 

        //let columns = [];
        let columns=[];
        let value = [];
        if(record != undefined){
           
           //columns to be made inn table
            for(let app_keys in record.app_pages[0]){
                columns.push(app_keys+' TEXT');
            }
             for(let app_pages of record.app_pages){
                let v = [];

                for(let key in app_pages){
                    v.push(app_pages[key]);
                }
                value.push(v);
            }

           // console.log('hello');
           // console.log(value);
            db.transaction((tx)=>{
                tx.executeSql('CREATE TABLE IF NOT EXISTS '+tableName+'('+columns.join(",")+') ');
            });

        }
    }

  insert(db){
    let query=[];
    let meta='INSERT INTO meta(app_directory, app_domain) VALUES (?,?)';
    let param=["dddd", "foobar"];
    query.push(meta);
    this.insertQuery(db,query,param);

  }

    // create(db){
  //   let query = [];
  //    let meta = 'CREATE TABLE IF NOT EXISTS meta ( app_directory TEXT, app_domain TEXT)';
  //   let apppage = 'CREATE TABLE IF NOT EXISTS apppage (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)';
  //   let  appproducts= 'CREATE TABLE IF NOT EXISTS appproducts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)';
   
  //   query.push(meta,apppage,appproducts);
  //   this.runQuery(db,query,[],(result)=>{
  //     console.log(result);
  //   },(error)=>{
  //       console.log(error);
  //   });
  //   console.log('hii data not');
  // }


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
