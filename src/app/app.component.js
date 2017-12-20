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
import { NavController } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import {Network} from "@ionic-native";
import { TabsPage } from '../pages/tabs/tabs';
import { IndexPage } from '../pages/index/index';
import { ServiceProvider } from '../providers/service/service';
import { PracticeProvider } from '../providers/practice/practice';
import { ProductPage } from '../pages/product/product';
import { Events } from 'ionic-angular';
var MyApp = /** @class */ (function () {
    function MyApp(platform, events, statusBar, storage, sqlite, splashScreen, apiProvider, pracProvider) {
        var _this = this;
        this.platform = platform;
        this.events = events;
        this.storage = storage;
        this.sqlite = sqlite;
        this.apiProvider = apiProvider;
        this.pracProvider = pracProvider;
        this.rootPage = TabsPage;
        this.sqlstorage = null;
        this.record = 0;
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            platform.ready().then(function () {
                if (_this.platform.is('cordova')) {
                    // window.db = $cordovaSQLite.openDB({ name: "smaart.db", iosDatabaseLocation: 'default' }); //device
                    // console.log("Android");
                }
                else {
                    _this.loadPeople();
                    _this.db = _this.pracProvider.connection();
                }
            });
        });
    } //end of constructor
    MyApp.prototype.loadPeople = function () {
        var _this = this;
        var pages = 'app_pages';
        var products = 'app_products';
        var meta_data = 'meta_data';
        var dd = 'database';
        this.pracProvider.load()
            .then(function (data) {
            _this.record = data;
            // console.log(this.record);
            //create query
            _this.pracProvider.create(dd, _this.record, pages);
            _this.pracProvider.create(dd, _this.record, products);
            _this.pracProvider.create(dd, _this.record, meta_data);
            //insert query 
            _this.pracProvider.insertQuery(_this.db, _this.record, pages);
            _this.pracProvider.insertProduct(_this.db, _this.record, products);
            _this.pracProvider.metaQuery(_this.db, _this.record, meta_data);
        });
    };
    MyApp.prototype.products = function (id) {
        this.nav.setRoot(ProductPage);
    };
    MyApp.prototype.detailsPage = function (id) {
        console.log(id);
        this.nav.setRoot(IndexPage, { 'id': id });
    };
    __decorate([
        ViewChild('content'),
        __metadata("design:type", NavController)
    ], MyApp.prototype, "nav", void 0);
    __decorate([
        ViewChild('result'),
        __metadata("design:type", Object)
    ], MyApp.prototype, "result", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, Events, StatusBar, Storage, SQLite, SplashScreen, ServiceProvider, PracticeProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map