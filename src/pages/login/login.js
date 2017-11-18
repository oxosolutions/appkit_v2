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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PracticeProvider } from '../../providers/practice/practice';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, serviceProvider, pracProvider) {
        //without promise
        // let categoryId = 1;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serviceProvider = serviceProvider;
        this.pracProvider = pracProvider;
        this.Oxo = '';
        this.app_name = '';
        this.pages = 0;
        this.pages = this.pracProvider.listapi();
        this.result = this.pages;
        console.log(this.result);
        // this.pracProvider.listapi().subscribe((data) => {
        //     this.result = JSON.parse(data['_body']).data;
        //     this.app_name = this.result;
        //     this.pages=this.app_name.app_pages;
        //     	//console.log(this.app_name);
        //     for(var j=0; j < this.pages.length;){
        //     	this.pages0=this.pages[0];
        // 		this.pages1=this.pages[1];
        // 		this.pages2=this.pages[2];
        // 		this.pages3=this.pages[3];
        // 		this.pages4=this.pages[4];
        // 		this.pages5=this.pages[5];
        // 		this.pages6=this.pages[6];
        // 		 // console.log(this.pages1);
        //     	j++;
        //     }
        //  	 // console.log(this.pages);
        // })
        //  	// with promise
        //  let env = this;
        //env.Oxo=env.serviceProvider.getUsersHttp();
        //setTimeout(function(){
        //	env.darlic=env.Oxo['__zone_symbol__value'];
        // env.darlic2=JSON.parse(env.userUrl['body'])
        //	env.darlic2=env.darlic.app_pages[categoryId];
        //	console.log(env.darlic2);
        //},2900);
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    __decorate([
        ViewChild('result'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "result", void 0);
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ServiceProvider, PracticeProvider])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map