   import { Component } from '@angular/core';
   import { NavController,LoadingController , ModalController,Platform ,NavParams} from 'ionic-angular';
   import  {ContactUsPage} from '../contact-us/contact-us';
   import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
   import { DatabaseProvider } from '../../providers/database/database';
   import { MyApp } from '../../app/app.component';
   import { Events } from 'ionic-angular';
   import { Pipe, PipeTransform } from '@angular/core';

  @Component({
    templateUrl: 'home.html',
    selector: 'page-home',
  })
  export class HomePage {
    name:any;
    Db;
    slughome;
    AppkitProducts:any;
    metadata:any;  
    AppkitPage=[];
    resultData:any;
    loading:any;
    database;
    Pagesid:any;
    apppages:any;
    content:any;
    localpages:any;
  constructor(public events: Events,public sqlite: SQLite,public platform:Platform,public navParams: NavParams,public navCtrl: NavController, public loadingctrl:LoadingController , private modalctrl:ModalController, public dbprovider:DatabaseProvider) {
  }  
  getData(){
    this.selectData().then(result=>{
       this.resultData=result;
       console.log(this.resultData);
       console.log(this.resultData.AppkitPage);
       this.resultData.apppages=JSON.parse(localStorage.getItem('appPages'));
       console.log(this.resultData.apppages);
       
       if(this.resultData.AppkitPage==null){
          this.events.publish('user:created',[]); 
       }else{
          this.events.publish('user:created', this.resultData.AppkitPage); 
       }
      
       if(this.resultData.slughome != undefined){
           this.content=this.resultData.slughome.content; 
       }   
    });
  }
  selectData(){
      return new Promise((resolve,reject)=>{
          let i;
          this.dbprovider.SelectMeta('Meta').then((result)=>{
            
           this.metadata=result;
            this.dbprovider.SelectPages('app_pages').then((resultpages:any)=>{
               console.log(resultpages);
               this.Pagesid=this.navParams.get('id');
               console.log(this.Pagesid);
                if(resultpages != "not exist"){
                  for(i=0; i < resultpages.rows.length; i++){
                  resultpages[i] = resultpages.rows.item(i);
                   
                    for(let keypages in resultpages[i]){
                      let json:any;
                      if(keypages=='id' || keypages =='show_in_menu'){                           
                          resultpages[i][keypages]=resultpages[i][keypages];
                              //console.log(json);
                      }else{
                        resultpages[i][keypages]=resultpages[i][keypages].replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")
                        .replace(/&quot;/g, '"')
                        .replace(/&#039;/g, "'");
                      }
                    }
                     //console.log(resultpages[i]);
                    this.AppkitPage.push(resultpages[i]);
                    console.log(this.AppkitPage);
                    if(resultpages[i].slug=="home-page"){
                         this.slughome=resultpages[i];
                    }
                    if(resultpages[i].id==this.Pagesid){
                          this.apppages=resultpages[i];
                            this.localpages=this.apppages;
                            console.log(this.localpages);
                          localStorage.setItem("appPages",JSON.stringify(this.localpages));
                         console.log(this.apppages);
                    } 
                    console.log('ddkjfdfj');
                   //this.AppkitPage=resultpages;
                   let collection = [];
                   collection['slughome']=this.slughome;
                   collection['apppages']=this.apppages; 
                   collection['AppkitPage']=this.AppkitPage; 
                   collection['metadata']=this.metadata;   
                   console.log(collection);         
                    resolve(collection);
                    resolve(this.apppages);
                  }
                }
                else{
                  this.AppkitPage=null;
                   let collection = [];
                   collection['slughome']=this.slughome;
                   collection['apppages']=this.apppages; 
                   collection['AppkitPage']=this.AppkitPage; 
                   collection['metadata']=this.metadata;   
                   console.log(collection)   ;         
                  resolve(collection);
                  
                }
            });
         });
         
      })
  }

  refreshPage(){
    this.dbprovider.DeleteAll().then(result=>{ 
      this.localpages=null;
      localStorage.setItem("appPages",this.localpages); 
      this.navCtrl.setRoot(MyApp);
    });
  }
  ionViewDidLoad(){
    this.getData();         
  }
   
}

