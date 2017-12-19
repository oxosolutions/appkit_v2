var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { LoginPage } from '../login/login';
import { SQLite } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { PracticeProvider } from '../../providers/practice/practice';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, storage, sqlite, platform, pracProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.sqlite = sqlite;
        this.platform = platform;
        this.pracProvider = pracProvider;
        this.pages = 0;
        platform.ready().then(function () {
            if (_this.platform.is('cordova')) {
                console.log("on mobile");
                _this.sqlite.create({
                    name: 'test.db',
                    location: 'default'
                });
            }
            else {
                _this.setEmail();
                _this.getEmail();
                _this.check();
                _this.loadPeople();
                _this.storage.set('key', 'dkjdlfjdlf');
                // get value 
                _this.storage.get('key').then(function (val) {
                    console.log(val);
                });
                // this.db = openDatabase('Appkit', '1.0', 'Test DB', 2 * 1024 * 1024);
            }
        });
    }
    HomePage.prototype.loadPeople = function () {
        var _this = this;
        this.pracProvider.load()
            .then(function (data) {
            _this.pages = data;
            _this.app_pages1 = _this.pages.app_pages[0];
            console.log(_this.pages.app_pages);
        });
    };
    HomePage.prototype.check = function () {
        console.log("value is checked");
    };
    HomePage.prototype.setEmail = function () {
        this.storage.set('email', "readha@gmail.com");
    };
    //get the stored email
    HomePage.prototype.getEmail = function () {
        var _this = this;
        this.storage.get('email').then(function (Val) {
            _this.rrr = Val;
            console.log(_this.rrr);
        });
    };
    HomePage.prototype.pushPage = function () {
        // this.navCtrl.push( LoginPage );
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, Storage, SQLite, Platform, PracticeProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map