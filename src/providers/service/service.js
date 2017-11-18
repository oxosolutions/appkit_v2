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
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServiceProvider = /** @class */ (function () {
    function ServiceProvider(http) {
        this.http = http;
        // data :any = '';
        this.handleError = 'api is not fetcing';
        this.userUrl = 'http://makemyfolio.com/api/android/';
        console.log('Hello ServiceProvider Provider');
    }
    // handleError(){
    // 	this.error= 'Api is not fetching';
    // }
    ServiceProvider.prototype.getUsersHttp = function () {
        return this.http.get(this.userUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    ServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], ServiceProvider);
    return ServiceProvider;
}());
export { ServiceProvider };
//# sourceMappingURL=service.js.map