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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { IndexPage } from '../index/index';
import { ServiceProvider } from '../../providers/service/service';
import { PracticeProvider } from '../../providers/practice/practice';
import { Events } from 'ionic-angular';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, events, navParams, apiProvider, pracProvider) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.navParams = navParams;
        this.apiProvider = apiProvider;
        this.pracProvider = pracProvider;
        this.tab1Root = HomePage;
        //this.tab2Root = LoginPage;
        this.tab3Root = IndexPage;
        // this.apiProvider.listusers();
        // this.result=this.pracProvider.listapi();
        // this.apiProvider.listapi();
        this.events.subscribe('hello', function (name, name2) {
            console.log(name, name2);
        });
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TabsPage');
    };
    TabsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-tabs',
            templateUrl: 'tabs.html',
        }),
        __metadata("design:paramtypes", [NavController, Events, NavParams, ServiceProvider, PracticeProvider])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.js.map