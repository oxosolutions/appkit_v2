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
  sidemenu:any;
  customPost:any;

  constructor(public events: Events,public sqlite: SQLite,public platform:Platform,public navParams: NavParams,public navCtrl: NavController, public loadingctrl:LoadingController , private modalctrl:ModalController, public dbprovider:DatabaseProvider) {
  }  
  getData(){
    this.selectData().then(result=>{
      this.resultData=result;
      this.resultData.apppages=JSON.parse(localStorage.getItem('appPages'));
      this.resultData.slughome=JSON.parse(localStorage.getItem('dashboardpage'));
      if(this.resultData.AppkitPage==null){
        this.events.publish('user:created','',this.resultData.sidemenu,this.resultData.customPost); 
      }else{
        this.events.publish('user:created', this.resultData.AppkitPage,this.resultData.sidemenu,this.resultData.customPost); 
      }
      //console.log(this.resultData.customPost);   
    });
  }
  selectData(){
    return new Promise((resolve,reject)=>{
        let i;
        let component:any;
        component=JSON.parse(localStorage.getItem('customPost'));
        // console.log(component);
        this.SelectCustomPost(component).then((post:any)=>{
          this.customPost=post
          //console.log(this.customPost);
          this.dbprovider.SelectSettings('Settings').then((resultsetting:any)=>{ 
          this.sidemenu=resultsetting.andriod_app_menu_title;
          let dashboardPage=resultsetting.andriod_app_front_page;
          this.dbprovider.SelectMeta('Meta').then((result)=>{ 
           this.metadata=result;
            this.dbprovider.SelectPages('app_pages').then((resultpages:any)=>{
               //console.log(resultpages);
               this.Pagesid=this.navParams.get('id');  //console.log(this.Pagesid);
                //if pages not exist
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
                    //console.log(this.AppkitPage);
                    if(resultpages[i].slug==dashboardPage){
                         this.slughome=resultpages[i];
                          localStorage.setItem("dashboardpage",JSON.stringify(this.slughome));
                         //console.log(this.slughome);
                    }
                    if(resultpages[i].id==this.Pagesid){
                        this.apppages=resultpages[i];
                        this.localpages=this.apppages;
                        localStorage.setItem("appPages",JSON.stringify(this.localpages));
                       // console.log(this.apppages);
                    } 
                   //this.AppkitPage=resultpages;
                   let collection = [];
                   collection['slughome']=this.slughome;
                   collection['apppages']=this.apppages; 
                   collection['AppkitPage']=this.AppkitPage; 
                   collection['metadata']=this.metadata;   
                   collection['sidemenu']=this.sidemenu;
                   collection['customPost']=this.customPost;
                   //console.log(collection);         
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
                   collection['sidemenu']=this.sidemenu; 
                   collection['customPost']=this.customPost;
                   //console.log(collection)   ;         
                  resolve(collection);
                }
            });
          }); 
        })
      }); 
    })
  }
  SelectCustomPost(component){
    let forloop=0;
    let data:any=[];
    return new Promise((resolve,reject)=>{
      component.forEach((key,value)=>{
        let query='Select * from '+ key;
        this.dbprovider.ExecuteRun(query,[]).then((result:any)=>{
          this.dbprovider.mobileListArray(result).then((resultList:any)=>{
            data.push(resultList);
            forloop++;
            if(forloop==component.length){
              resolve(data);
            }  
          });
        })
      })
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

