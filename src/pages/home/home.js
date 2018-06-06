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
import { NavController, LoadingController, ModalController, Platform, NavParams } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
import { MyApp } from '../../app/app.component';
import { Events } from 'ionic-angular';
var HomePage = /** @class */ (function () {
    function HomePage(events, sqlite, platform, navParams, navCtrl, loadingctrl, modalctrl, dbprovider) {
        // this.dbprovider.connection();
        // this.dbprovider.connection().then((connection)=>{
        //    this.Db=connection;
        // });
        this.events = events;
        this.sqlite = sqlite;
        this.platform = platform;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.loadingctrl = loadingctrl;
        this.modalctrl = modalctrl;
        this.dbprovider = dbprovider;
        this.AppkitPage = [];
    }
    HomePage.prototype.createUser = function () {
        console.log('User created!');
        // this.events.publish('user:created', 'peoperles');
    };
    HomePage.prototype.getData = function () {
        var _this = this;
        this.selectData().then(function (result) {
            _this.resultData = result;
            if (_this.resultData.apppages != undefined) {
            }
            // console.log(this.resultData.apppages);
            _this.events.publish('user:created', _this.resultData.AppkitPage);
            _this.content = _this.resultData.slughome.content;
            console.log(_this.resultData.AppkitPage);
            //this.inject=this.resultData.slughome;
        });
    };
    HomePage.prototype.selectData = function () {
        var _this = this;
        //console.log('select page call from  home')
        return new Promise(function (resolve, reject) {
            var i;
            // console.log('event select');
            _this.dbprovider.SelectMeta('Meta').then(function (result) {
                _this.metadata = result;
                // console.log(this.metadata);
                _this.dbprovider.SelectPages('app_pages').then(function (resultpages) {
                    console.log(resultpages);
                    _this.Pagesid = _this.navParams.get('id');
                    for (i = 0; i < resultpages.rows.length; i++) {
                        resultpages[i] = resultpages.rows.item(i);
                        for (var keypages in resultpages[i]) {
                            var json = void 0;
                            if (keypages == 'id' || keypages == 'show_in_menu') {
                                resultpages[i][keypages] = resultpages[i][keypages];
                                //console.log(json);
                            }
                            else {
                                resultpages[i][keypages] = resultpages[i][keypages].replace(/&lt;/g, "<")
                                    .replace(/&gt;/g, ">")
                                    .replace(/&quot;/g, '"')
                                    .replace(/&#039;/g, "'");
                            }
                        }
                        //console.log(resultpages[i]);
                        _this.AppkitPage.push(resultpages[i]);
                        console.log(_this.AppkitPage);
                        if (resultpages[i].slug == "home-page") {
                            _this.slughome = resultpages[i];
                        }
                        if (resultpages[i].id == _this.Pagesid) {
                            _this.apppages = resultpages[i];
                            //  console.log(this.apppages);
                        }
                    }
                    //  console.log('ddkjfdfj');
                    //this.AppkitPage=resultpages;
                    var collection = [];
                    collection['slughome'] = _this.slughome;
                    collection['apppages'] = _this.apppages;
                    collection['AppkitPage'] = _this.AppkitPage;
                    collection['metadata'] = _this.metadata;
                    resolve(collection);
                    resolve(_this.slughome);
                });
            });
        });
    };
    HomePage.prototype.refreshPage = function () {
        //window.location.reload();
        // this.dbprovider.delall().then((result)=>{
        var _this = this;
        // });
        //   this.loading=this.loadingctrl.create({
        //           content:'index page..'
        //    });
        // this.loading.present();
        this.dbprovider.DeleteAll().then(function (result) {
            //this.dbprovider.Apitable1().then((dd)=>{
            _this.navCtrl.setRoot(MyApp);
            // })
            //this.datacall();
        });
    };
    // datacall(){
    //    console.log('data on index');
    //       this.loading=this.loadingctrl.create({
    //            content:'index page..'
    //       });
    //       //this.loading.present();
    //               this.dbprovider.connection().then((ddd)=>{
    //             console.log(this.Db);
    //             //console.log('index page get function');
    //             this.getData();
    //         });
    // }
    HomePage.prototype.ionViewDidLoad = function () {
        var tesst = '<div class="child"><h1>{{EmployeeName}}</h1><h2>{{hobbies}}</h2><span>{{heading}}</span><p>{{desiganation}}</p></div>';
        var test = /{{([a-z0-9]+)}}/gi, 
        // let data=test;
        matched;
        var ii = [];
        var kk;
        var j;
        var tesst3;
        while (matched = test.exec(tesst)) {
            var json = matched[1];
            ii.push(json);
        }
        var valuesreplace = ['rajivsingh', 'rajeevgmail.com', 'Male', 'teacher'];
        var original = [];
        var match;
        for (var i = 0; i < ii.length; i++) {
            // console.log(ii[i]);
            for (j = i; j <= i; j++) {
                valuesreplace[j] = ii[i].replace(/(.*)/, valuesreplace[j]);
                // console.log(valuesreplace[j]);
                tesst = tesst.replace(ii[i], valuesreplace[j]);
                tesst3 = tesst.replace(/{{/g, " ").replace(/}}/g, "");
            }
        }
        //console.log(kk);
        console.log(tesst3);
        this.getData();
    };
    HomePage = __decorate([
        Component({
            templateUrl: 'home.html',
            selector: 'page-home',
        }),
        __metadata("design:paramtypes", [Events, SQLite, Platform, NavParams, NavController, LoadingController, ModalController, DatabaseProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map