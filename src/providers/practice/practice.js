var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the PracticeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PracticeProvider = /** @class */ (function () {
    function PracticeProvider(http) {
        this.http = http;
        console.log('Hello PracticeProvider Provider');
    }
    //   listapi(){
    //     this.http.get('http://makemyfolio.com/api/android/')
    //     //   .subscribe(data3=> {
    //     //     console.log(JSON.parse(data3['_body']));
    //     //     // console.log(data3);
    //     // });
    //  //console.log(data);
    // .subscribe(data2 => {
    //    //this.data4 =JSON.parse(data2['_body']).data;
    //     this.data4 =data2.json().body.data;
    //   //console.log(JSON.parse(data2['_body']).data);
    // });
    //  console.log(this.data4);
    //  return this.data4
    //      // return data2;
    //   }
    PracticeProvider.prototype.listapi = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://makemyfolio.com/api/android/')
                .subscribe(function (data2) {
                _this.data4 = JSON.parse(data2['_body']).data;
                resolve(_this.data4);
                console.log(_this.data4);
            });
        });
    };
    PracticeProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], PracticeProvider);
    return PracticeProvider;
}());
export { PracticeProvider };
//# sourceMappingURL=practice.js.map