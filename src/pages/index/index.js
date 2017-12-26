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
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
// import {PracticeProvider} from '../../providers/practice/practice';
import { Events } from 'ionic-angular';
var IndexPage = /** @class */ (function () {
    function IndexPage(navCtrl, loadingctrl, events, navParams, serviceProvider) {
        this.navCtrl = navCtrl;
        this.loadingctrl = loadingctrl;
        this.events = events;
        this.navParams = navParams;
        this.serviceProvider = serviceProvider;
        this.AppkitPage = [];
        //this.events.publish('hello','paul','radha');
    }
    IndexPage.prototype.getData = function () {
        var _this = this;
        var pages = 'app_pages';
        var products = 'app_products';
        var metadata = 'meta_data';
        var dd = 'database';
        var loading = this.loadingctrl.create({
            content: "\n        <div class=\"custom-spinner-container\">\n        <ion-spinner name=\"circles\">Wait...</ion-spinner>\n        </div>"
        });
        loading.present();
        this.selectData(pages, products, metadata, dd).then(function (result) {
            loading.dismiss();
            _this.resultData = result;
            _this.resultData.AppkitProducts;
            if (_this.resultData.apppages != undefined) {
                //console.log(this.resultData.apppages);
            }
            console.log(_this.resultData.metadata.app_footer_content);
            //console.log(this.AppkitPage);
        }); //console.log(this.resultData);
    };
    IndexPage.prototype.selectData = function (pages, products, metadata, dd) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var i;
            _this.serviceProvider.SelectMeta(dd, metadata).then(function (result) {
                _this.metadata = result;
                _this.serviceProvider.SelectProducts(dd, products).then(function (result) {
                    _this.AppkitProducts = result;
                    _this.serviceProvider.SelectPages(dd, pages).then(function (result) {
                        _this.Pagesid = _this.navParams.get('id');
                        //console.log(result);
                        //let apppages=[];
                        for (i = 0; i < result.length; i++) {
                            _this.AppkitPage.push(result[i]);
                            if (result[i].id == _this.Pagesid) {
                                _this.apppages = result[i];
                                //console.log(apppages3.title);
                            }
                            if (result[i].slug == "home") {
                                _this.slughome = result[i];
                            }
                        }
                        var collection = {};
                        collection['metadata'] = _this.metadata;
                        collection['AppkitProducts'] = _this.AppkitProducts;
                        collection['AppkitPage'] = _this.AppkitPage;
                        collection['slughome'] = _this.slughome;
                        collection['apppages'] = _this.apppages;
                        resolve(collection);
                    });
                });
            });
        });
    };
    IndexPage.prototype.refreshPage = function () {
        console.log('refershing');
        var pages = 'app_pages';
        var products = 'app_products';
        var metadata = 'meta_data';
        var dd = 'database';
        var hh = [metadata, pages, products];
        // console.log(hh.length);
        for (var i = 0; i < hh.length; i++) {
            console.log(hh[i]);
            this.serviceProvider.DeleteAll(dd, hh[i]);
        }
    };
    IndexPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    IndexPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-index',
            templateUrl: 'index.html',
        }),
        __metadata("design:paramtypes", [NavController, LoadingController, Events, NavParams, ServiceProvider])
    ], IndexPage);
    return IndexPage;
}());
export { IndexPage };
//# sourceMappingURL=index.js.map