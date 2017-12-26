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
/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductDetailPage = /** @class */ (function () {
    function ProductDetailPage(navCtrl, loadingctrl, serviceProvider, navParams) {
        this.navCtrl = navCtrl;
        this.loadingctrl = loadingctrl;
        this.serviceProvider = serviceProvider;
        this.navParams = navParams;
        this.Object = Object;
        this.productDetail = [];
        this.productAttributes = [];
        this.objectkey = '';
    }
    ProductDetailPage.prototype.getData = function () {
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
            _this.productAttributes = result.product_attributes;
            for (var _i = 0, _a = Object.keys(_this.productAttributes); _i < _a.length; _i++) {
                _this.obj = _a[_i];
                for (_this.objectkey in _this.productAttributes) {
                    //console.log("key:",this.objectkey, "value:", this.productAttributes[this.objectkey].value   );
                }
            }
        });
    };
    ProductDetailPage.prototype.selectData = function (pages, products, metadata, dd) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var i;
            var id = _this.navParams.get('id');
            _this.serviceProvider.SelectProductDetail(dd, products, id).then(function (result) {
                _this.productDetail = result;
                resolve(_this.productDetail);
            });
        });
    };
    ProductDetailPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    ProductDetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-product-detail',
            templateUrl: 'product-detail.html',
        }),
        __metadata("design:paramtypes", [NavController, LoadingController, ServiceProvider, NavParams])
    ], ProductDetailPage);
    return ProductDetailPage;
}());
export { ProductDetailPage };
//# sourceMappingURL=product-detail.js.map