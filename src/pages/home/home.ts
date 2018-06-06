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
    dashboardPage:any;
  constructor(public events: Events,public sqlite: SQLite,public platform:Platform,public navParams: NavParams,public navCtrl: NavController, public loadingctrl:LoadingController , private modalctrl:ModalController, public dbprovider:DatabaseProvider) {
  }  
  getData(){
    this.selectData().then(result=>{
       this.resultData=result;
       this.resultData.apppages=JSON.parse(localStorage.getItem('appPages'));
       this.resultData.slughome=JSON.parse(localStorage.getItem('dashboardpage'));
       if(this.resultData.AppkitPage==null){
          this.events.publish('user:created',[]); 
       }else{
          this.events.publish('user:created', this.resultData.AppkitPage); 
       }
       console.log(this.resultData.slughome);
        
    });
  }
  selectData(){
    return new Promise((resolve,reject)=>{
        let i;
        this.dbprovider.SelectSettings('Settings').then((resultsetting:any)=>{ 
          console.log(resultsetting);
         let dashboardPage=resultsetting.andriod_app_front_page;
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
                  if(resultpages[i].slug==dashboardPage){
                       this.slughome=resultpages[i];
                        localStorage.setItem("dashboardpage",JSON.stringify(this.slughome));
                       console.log(this.slughome);
                  }
                  if(resultpages[i].id==this.Pagesid){
                      this.apppages=resultpages[i];
                      this.localpages=this.apppages;
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
       }); 
    })
  }
  refreshPage(){
    this.dbprovider.DeleteAll().then(result=>{ 
      this.localpages=null;
      localStorage.setItem("appPages",this.localpages); 
       localStorage.setItem("dashboardpage",null); 
      this.navCtrl.setRoot(MyApp);
    });
  }
  ionViewDidLoad(){
    this.getData();         
  }
   
}

