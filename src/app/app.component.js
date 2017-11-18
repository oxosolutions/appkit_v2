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
import { SQLite } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { ServiceProvider } from '../providers/service/service';
import { PracticeProvider } from '../providers/practice/practice';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, sqlite, apiProvider, pracProvider) {
        this.sqlite = sqlite;
        this.apiProvider = apiProvider;
        this.pracProvider = pracProvider;
        this.rootPage = TabsPage;
        this.Oxo = '';
        this.app_name = '';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        //sqlite
        //   this.sqlite.create({
        //     name : 'data.db',
        //     location : 'default'
        //   })
        //    .then((db: SQLiteObject) => {
        //   db.executeSql('create table danceMoves(name VARCHAR(32))', {})
        //     .then(() => console.log('Executed SQL'))
        //     .catch(e => console.log(e));
        // })
        // .catch(e => console.log(e));
        // end of sqlite
        //starting calling oxo api
        // this.pracProvider.listapi().subscribe((data) => {   
        //     this.result = JSON.parse(data['_body']).data;
        //     this.app_name = this.result;
        //     this.pages=this.app_name.app_pages;
        //       console.log(this.app_name);
        //     for(var j=0; j < this.pages.length;){
        //       this.pages0=this.pages[0];
        //     this.pages1=this.pages[1];
        //     this.pages2=this.pages[2];
        //     this.pages3=this.pages[3];
        //     this.pages4=this.pages[4];
        //     this.pages5=this.pages[5];
        //     this.pages6=this.pages[6];
        //      // console.log(this.pages1);
        //       j++;
        //     }
        //  }) //end of api calling
    } //end of constructor
    __decorate([
        ViewChild('result'),
        __metadata("design:type", Object)
    ], MyApp.prototype, "result", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, SQLite, ServiceProvider, PracticeProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map