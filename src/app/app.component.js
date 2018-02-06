var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListproductPage } from '../pages/listproduct/listproduct';
import { DatabaseProvider } from '../providers/database/database';
import { Events } from 'ionic-angular';
import { ListPostPage } from '../pages/list-post/list-post';
import { Network } from '@ionic-native/network';
import { ApidataPage } from '../pages/apidata/apidata';
var MyApp = /** @class */ (function () {
    function MyApp(toast, network, events, platform, statusBar, loadingctrl, splashScreen, dbprovider) {
        this.toast = toast;
        this.network = network;
        this.events = events;
        this.platform = platform;
        this.statusBar = statusBar;
        this.loadingctrl = loadingctrl;
        this.splashScreen = splashScreen;
        this.dbprovider = dbprovider;
        this.AppkitPage = [];
        this.initializeApp();
        platform.registerBackButtonAction(function () {
            platform.exitApp();
        });
        console.log('component ts app');
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.getData = function () {
        var _this = this;
        //this.selectData().then(result=>{ 
        //   this.resultData=result;
        this.rootPage = HomePage;
        this.loading.dismiss();
        this.events.subscribe('user:created', function (user) {
            _this.homepage = user;
            console.log(_this.homepage);
        });
        //});
    };
    // selectData(){
    //    return new Promise((resolve,reject)=>{
    //       let i;
    //       this.dbprovider.SelectPages('app_pages').then((resultpages:any)=>{
    //          // console.log('select papges in componet');
    //          this.loading.dismiss();
    //          // console.log(resultpages);
    //          for(i=0; i < resultpages.rows.length; i++){
    //             resultpages[i] = resultpages.rows.item(i);
    //             this.AppkitPage.push(resultpages[i]);   
    //          }
    //          resolve(this.AppkitPage);
    //       });
    //    })
    // }
    MyApp.prototype.posts = function () {
        console.log('post');
        this.nav.setRoot(ListPostPage);
    };
    MyApp.prototype.detailsPage = function (id) {
        this.nav.setRoot(HomePage, { 'id': id });
    };
    MyApp.prototype.products = function () {
        this.nav.setRoot(ListproductPage);
    };
    MyApp.prototype.Apidata = function () {
        this.nav.setRoot(ApidataPage);
    };
    //  displayNetworkUpdate(connectionState: string){
    //   let networkType = this.network.type;
    //   this.toast.create({
    //     message: `You are now ${connectionState} via ${networkType}`,
    //     duration: 3000
    //   }).present();
    // }
    MyApp.prototype.ngOnInit = function () {
        //console.log('app component');
        var _this = this;
        this.loading = this.loadingctrl.create({
            content: 'wait..'
        });
        this.loading.present();
        this.dbprovider.connection().then(function (connection) {
            console.log(connection);
            _this.dbprovider.createTable().then(function (ddd) {
                console.log(ddd);
                //this.dbprovider.Apitable().then((api)=>{
                if (connection != null) {
                    _this.getData();
                }
                //})
                // this.getData();
            });
        });
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html',
            selector: 'app-user'
        }),
        __metadata("design:paramtypes", [ToastController, Network, Events, Platform, StatusBar, LoadingController, SplashScreen, DatabaseProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map