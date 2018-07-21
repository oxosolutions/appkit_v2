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
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the ApidataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ApidataPage = /** @class */ (function () {
    function ApidataPage(navCtrl, navParams, dbprovider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbprovider = dbprovider;
        this.Object = Object;
    }
    ApidataPage.prototype.camera = function () {
        console.log('camera clicked');
    };
    ApidataPage.prototype.ionViewDidLoad = function () {
        this.dbprovider.Apidataget('Apidata').then(function (result) {
            var dataset = [];
            var object1 = {};
            if (result.rows.length > 0) {
                for (var i = 1; i < result.rows.length; i++) {
                    var temp = result.rows.item(i);
                    dataset.push(temp);
                }
                //array of replace data
                var content = [];
                dataset.forEach(function (value, key) {
                    var i;
                    var tempContent = [];
                    Object.keys(value).forEach(function (keyValue, keyIndex) {
                        var data = value[keyValue];
                        tempContent.push(data);
                    });
                    console.log(tempContent);
                    var tesst = '<div class="child"><h1>{{Gender}}</h1><h2>{{Designation}}</h2><p>{{Department}}</p></div>';
                    var ii = [];
                    var test = /{{([a-z0-9]+)}}/gi, matched;
                    while (matched = test.exec(tesst)) {
                        var json = matched[1];
                        ii.push(json);
                    }
                    //  console.log(ii);
                    for (var i_1 = 0; i_1 < ii.length; i_1++) {
                        while (tesst.indexOf(ii[i_1]) !== -1) {
                            tesst = tesst.replace(ii[i_1], tempContent[i_1]);
                        }
                    }
                    console.log(tesst);
                });
            }
        });
    };
    ApidataPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-apidata',
            templateUrl: 'apidata.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DatabaseProvider])
    ], ApidataPage);
    return ApidataPage;
}());
export { ApidataPage };
//# sourceMappingURL=apidata.js.map