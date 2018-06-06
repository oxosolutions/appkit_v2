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
import { IonicPage, NavController, LoadingController, ModalController, NavParams } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
import { PostDetailPage } from '../post-detail/post-detail';
import { MyApp } from '../../app/app.component';
/*

/**
 * Generated class for the ListPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListPostPage = /** @class */ (function () {
    function ListPostPage(sqlite, navParams, navCtrl, loadingctrl, modalctrl, dbprovider) {
        this.sqlite = sqlite;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.loadingctrl = loadingctrl;
        this.modalctrl = modalctrl;
        this.dbprovider = dbprovider;
        this.post = [];
    }
    ListPostPage.prototype.getData = function () {
        var _this = this;
        this.selectData().then(function (result) {
            _this.resultData = result;
            console.log(_this.resultData.content);
            // this.Component{}
            // this.styles= [
            _this.styles = _this.resultData.css;
            // ]
            console.log(_this.styles);
        });
    };
    ListPostPage.prototype.refreshPage = function () {
        var _this = this;
        this.dbprovider.DeleteAll().then(function (result) {
            _this.navCtrl.setRoot(MyApp);
            //this.datacall();
        });
    };
    ListPostPage.prototype.selectData = function () {
        var _this = this;
        var i;
        var structure = [];
        var postArchive = [];
        var single;
        var Css;
        var Archive;
        var ArcArray = [];
        var KeyPost = [];
        var OriginalReplaced = [];
        return new Promise(function (resolve, reject) {
            _this.dbprovider.SelectMeta('Meta').then(function (result) {
                _this.metadata = result;
                _this.dbprovider.SelectPost('posts').then(function (resultpost) {
                    _this.post = (resultpost);
                    //console.log(this.post);
                    _this.dbprovider.SelectPostArchive('postSetting').then(function (postArchive) {
                        single = postArchive[0];
                        Css = postArchive[2];
                        //console.log(Archive);
                        var content = [];
                        _this.post.forEach(function (value, key) {
                            Archive = postArchive[1];
                            var i;
                            var tempContent = [];
                            KeyPost = [];
                            Object.keys(value).forEach(function (keyValue, keyIndex) {
                                var data = value[keyValue];
                                tempContent.push(data);
                                KeyPost.push(keyValue);
                            });
                            //console.log(KeyPost);
                            //console.log(tempContent);
                            //Replaced data
                            var test = /{{([a-z0-9_-]+)}}/gi, matched;
                            while (matched = test.exec(Archive)) {
                                var json = matched[1];
                                ArcArray.push(json);
                            }
                            //Archive='';
                            console.log(ArcArray);
                            var replacedkey = '';
                            for (var i_1 = 0; i_1 < ArcArray.length; i_1++) {
                                replacedkey = '';
                                for (var j = 0; j < KeyPost.length; j++) {
                                    if (ArcArray[i_1] == KeyPost[j]) {
                                        //console.log(KeyPost[j]);
                                        //console.log('here');
                                        var data = value[ArcArray[i_1]];
                                        Archive = Archive.replace(ArcArray[i_1], data);
                                        Archive = Archive.replace(/{{/g, " ").replace(/}}/g, "");
                                        replacedkey = Archive;
                                    }
                                }
                            }
                            //console.log(replacedkey);
                            content.push(replacedkey);
                            ArcArray = [];
                            //console.log(typeof(content));
                        });
                        var collection = [];
                        collection['metadata'] = _this.metadata;
                        collection['Post'] = _this.post;
                        collection['content'] = content;
                        collection['css'] = Css;
                        resolve(collection);
                    });
                });
            });
        });
    };
    ListPostPage.prototype.detailpost = function (id) {
        var d;
        this.navCtrl.push(PostDetailPage, { 'id': id });
        //this.navCtrl.push(ProductDetailsPage, {'id': id});
    };
    ListPostPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    ListPostPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-list-post',
            templateUrl: 'list-post.html',
        }),
        __metadata("design:paramtypes", [SQLite, NavParams, NavController, LoadingController, ModalController, DatabaseProvider])
    ], ListPostPage);
    return ListPostPage;
}());
export { ListPostPage };
//# sourceMappingURL=list-post.js.map