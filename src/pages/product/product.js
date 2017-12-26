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
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
//import {PracticeProvider} from '../../providers/practice/practice';
import { ProductDetailPage } from '../product-detail/product-detail';
var ProductPage = /** @class */ (function () {
    function ProductPage(navCtrl, loadingctrl, navParams, serviceProvider) {
        this.navCtrl = navCtrl;
        this.loadingctrl = loadingctrl;
        this.navParams = navParams;
        this.serviceProvider = serviceProvider;
        this.AppkitPage = [];
    }
    ProductPage.prototype.getData = function () {
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
            // console.log(this.resultData.AppkitProducts);
        });
    };
    ProductPage.prototype.selectData = function (pages, products, metadata, dd) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var i;
            _this.serviceProvider.SelectMeta(dd, metadata).then(function (result) {
                _this.metadata = result;
                _this.serviceProvider.SelectProducts(dd, products).then(function (result) {
                    _this.AppkitProducts = result;
                    _this.serviceProvider.SelectPages(dd, pages).then(function (result) {
                        //this.AppkitPage=result;
                        // console.log(result.length > 0){
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
    ProductPage.prototype.detailProduct = function (id) {
        this.navCtrl.push(ProductDetailPage, { 'id': id });
    };
    ProductPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    ProductPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-product',
            templateUrl: 'product.html',
        }),
        __metadata("design:paramtypes", [NavController, LoadingController, NavParams, ServiceProvider])
    ], ProductPage);
    return ProductPage;
}());
export { ProductPage };
//# sourceMappingURL=product.js.map