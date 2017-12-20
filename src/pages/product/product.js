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
import { PracticeProvider } from '../../providers/practice/practice';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductPage = /** @class */ (function () {
    function ProductPage(navCtrl, navParams, pracProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pracProvider = pracProvider;
        this.record = 0;
        this.loadPeople();
    }
    ProductPage.prototype.loadPeople = function () {
        var _this = this;
        this.pracProvider.load()
            .then(function (data) {
            _this.record = data;
            _this.app_pages1 = _this.record.app_pages[1];
            console.log(_this.app_pages1);
            var pages = _this.record.app_pages;
            _this.product = _this.record.app_products[0];
            console.log(_this.product);
            var id = _this.navParams.get('id');
            for (var i = 0; i < pages.length; i++) {
                //console.log(this.navParams.get('id'));
                if ((pages[i].id) == id) {
                    _this.pages5 = _this.record.app_pages[i];
                    //console.log(this.pages5);
                }
            }
        });
    };
    ProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductPage');
    };
    ProductPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-product',
            templateUrl: 'product.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, PracticeProvider])
    ], ProductPage);
    return ProductPage;
}());
export { ProductPage };
//# sourceMappingURL=product.js.map