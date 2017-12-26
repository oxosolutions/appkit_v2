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
import { SQLite } from '@ionic-native/sqlite';
/*
  Generated class for the PracticeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PracticeProvider = /** @class */ (function () {
    function PracticeProvider(http, sqlite) {
        this.http = http;
        this.sqlite = sqlite;
        //public db = window.db;
        this.slugs = [];
        this.slugproduct = [];
        this.AppkitPages = [];
        this.AppkitProducts = [];
        this.connection();
    }
    PracticeProvider.prototype.connection = function () {
        // let db;
        return this.db = window.openDatabase("test.db", '1', 'my', 1024 * 1024 * 100);
    };
    PracticeProvider.prototype.metaQuery = function (db, record, tableName) {
        var columns = [];
        var values = [];
        var tablekeys;
        for (var tablekeys_1 in record) {
            if (typeof record[tablekeys_1] != "object") {
                columns.push(tablekeys_1);
                values.push(record[tablekeys_1]);
            }
        }
        //if(db! = undefined){
        db.transaction(function (tx) {
            tx.executeSql('SELECT  app_domain FROM ' + tableName, [], function (tx, result) {
                if (result.rows.length > 0) {
                    //console.log(result);
                    var meta = void 0;
                    meta = result.rows[0].app_domain;
                    var questionMarks = [];
                    for (var j = 0; j < values.length; j++) {
                        questionMarks.push("?");
                    }
                    values.push(meta);
                    db.transaction(function (tx) {
                        tx.executeSql('UPDATE ' + tableName + ' SET ' + columns.join('=?, ') + ' = ? where app_domain = ?', values, function (result) {
                        });
                    });
                }
                else {
                    var questionMarks_1 = [];
                    for (var j = 0; j < values.length; j++) {
                        questionMarks_1.push("?");
                    }
                    db.transaction(function (tx) {
                        tx.executeSql('INSERT INTO ' + tableName + '(' + columns + ') VALUES (' + questionMarks_1 + ')', values);
                    });
                }
            });
        });
        //}
    };
    PracticeProvider.prototype.insertProduct = function (db, record, tableName) {
        var _this = this;
        var columns = [];
        var values = [];
        var slugdata;
        if (record != '') {
            for (var tableColumns in record.app_products[0]) {
                columns.push(tableColumns);
                //console.log(columns);
            }
            //gettting values of product
            for (var _i = 0, _a = record.app_products; _i < _a.length; _i++) {
                var productkey = _a[_i];
                var v = [];
                for (var key in productkey) {
                    var json = void 0;
                    if (key == 'product_attributes') {
                        json = JSON.stringify(productkey[key]);
                    }
                    else {
                        json = productkey[key];
                    }
                    v.push(json);
                } //console.log(v);
                values.push(v);
            } //console.log(values);
        }
        //if(db! = undefined){
        db.transaction(function (tx) {
            tx.executeSql('SELECT slug FROM ' + tableName, [], function (tx, result) {
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        if (result.rows[i] != undefined) {
                            slugdata = _this.slugproduct.push(result.rows[i].slug);
                        } //console.log(this.slugproduct);            
                    }
                    // console.log(slugdata.length);
                    if (_this.slugproduct.length > 0) {
                        _this.productupdate(values, db, tableName, columns);
                    }
                }
                else {
                    //console.log('insert');
                    _this.insertData(values, db, tableName, columns);
                }
            });
        });
        // }
    };
    PracticeProvider.prototype.productupdate = function (values, db, tableName, columns, i) {
        var _this = this;
        if (i === void 0) { i = 0; }
        if (values[i] != undefined) {
            db.transaction(function (tx) {
                //console.log(this.slugproduct[i]);
                values[i].push(_this.slugproduct[i]);
                var questionMarks = [];
                for (var j = 0; j < values[i].length; j++) {
                    questionMarks.push('?');
                }
                tx.executeSql('UPDATE ' + tableName + ' SET ' + columns.join(' = ? ,') + ' = ? where slug = ?', values[i], function (result) {
                    _this.productupdate(values, db, tableName, columns, i = i + 1);
                });
            });
        }
    };
    PracticeProvider.prototype.insertQuery = function (db, record, tableName) {
        var _this = this;
        var columns = [];
        var values = [];
        var slugdata;
        if (db != undefined) {
            //get slugs of existing table
            db.transaction(function (tx) {
                tx.executeSql('SELECT slug FROM ' + tableName, [], function (tx, result1) {
                    if (result1.rows.length > 0) {
                        for (var i = 0; i <= result1.rows.length; i++) {
                            if (result1.rows[i] != undefined) {
                                slugdata = _this.slugs.push(result1.rows[i].slug);
                                //console.log(this.slugs);
                            }
                        }
                        //console.log(slugdata);
                        if (_this.slugs.length > 0) {
                            _this.update(values, db, tableName, columns);
                        }
                    }
                    else {
                        _this.insertData(values, db, tableName, columns);
                    }
                });
            });
            if (record != '') {
                //process columns form record variable
                for (var tableColumns in record.app_pages[0]) {
                    columns.push("'" + tableColumns + "'");
                }
                //process values from record variable
                if (record.app_pages.length > 0) {
                    if (record.app_pages != undefined) {
                        for (var _i = 0, _a = record.app_pages; _i < _a.length; _i++) {
                            var appData = _a[_i];
                            var v = [];
                            var w = [];
                            for (var keys in appData) {
                                if (record.app_pages != undefined || appData != undefined) {
                                    v.push(appData[keys]);
                                }
                            }
                            values.push(v);
                        }
                        //console.log(values);
                    }
                }
            }
        }
    };
    PracticeProvider.prototype.update = function (values, db, tableName, columns, i) {
        var _this = this;
        if (i === void 0) { i = 0; }
        //console.log('pages');
        if (values[i] != undefined) {
            // console.log(this.slugs);
            db.transaction(function (tx) {
                values[i].push(_this.slugs[i]);
                var questionMarks = [];
                for (var j = 0; j < values[i].length; j++) {
                    questionMarks.push('?');
                }
                tx.executeSql('UPDATE ' + tableName + ' SET ' + columns.join(' = ? ,') + ' = ? where slug = ?', values[i], function (result) {
                    _this.update(values, db, tableName, columns, i = i + 1);
                });
            });
        }
    };
    PracticeProvider.prototype.insertData = function (values, db, tableName, columns, i) {
        var _this = this;
        if (i === void 0) { i = 0; }
        if (values[i] != undefined) {
            var questionMarks_2 = [];
            for (var j = 0; j < values[i].length; j++) {
                questionMarks_2.push('?');
            }
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO ' + tableName + ' ( ' + columns.join(',') + ' ) VALUES (' + questionMarks_2.join(',') + ')', values[i], function (result) {
                    _this.insertData(values, db, tableName, columns, i = i + 1);
                });
            });
        }
    };
    PracticeProvider.prototype.create = function (db, record, tableName) {
        //console.log(tableName);
        //let columns = [];
        var columns = [];
        if (record != undefined) {
            //columns to be made inn table
            if (tableName == 'app_pages') {
                for (var app_keys in record.app_pages[0]) {
                    columns.push(app_keys + ' TEXT');
                }
            }
            else if (tableName == 'app_products') {
                for (var app_keys in record.app_products[0]) {
                    columns.push(app_keys + ' TEXT');
                }
            }
            else if (tableName == 'meta_data') {
                for (var app_keys in record) {
                    if (typeof record[app_keys] != "object") {
                        columns.push(app_keys + ' TEXT');
                    }
                }
            }
        }
        this.db.transaction(function (tx) {
            //console.log('CREATE TABLE IF NOT EXISTS '+tableName+'('+columns.join(",")+') ');
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + '(' + columns.join(",") + ') ');
        });
    };
    PracticeProvider.prototype.SelectPages = function (db, tableName) {
        var _this = this;
        if (this.db != undefined) {
            return new Promise(function (resolve, reject) {
                _this.db.transaction(function (tx) {
                    tx.executeSql('Select * from ' + tableName, [], function (tx, resultPages) {
                        var i = 0;
                        _this.AppkitPages = [];
                        if (resultPages.rows.length > 0) {
                            // for(let i=0; i < result.rows.length; i++){
                            //     this.AppkitPages.push(result.rows[i]);
                            // }
                            //console.log(resultPages);
                            resolve(resultPages.rows);
                        }
                    });
                });
                ;
            });
        }
    };
    PracticeProvider.prototype.SelectProducts = function (db, tableName) {
        var _this = this;
        var key;
        var i;
        var data = [];
        if (this.db != undefined) {
            return new Promise(function (resolve, reject) {
                _this.db.transaction(function (tx) {
                    tx.executeSql('Select * from ' + tableName, [], function (tx, result) {
                        _this.AppkitProducts = [];
                        for (i = 0; i < result.rows.length; i++) {
                            var temp = result.rows[i];
                            temp.product_attributes = JSON.parse(temp.product_attributes);
                            //console.log(temp.product_attributes);
                            //console.log(temp.product_attributes.value);
                            _this.AppkitProducts.push(temp);
                        }
                        //console.log(this.AppkitProducts); 
                        resolve(_this.AppkitProducts);
                    });
                });
            });
        }
    };
    PracticeProvider.prototype.SelectProductDetail = function (db, tableName, id) {
        var _this = this;
        var productDetail;
        console.log(tableName);
        if (this.db != undefined) {
            return new Promise(function (resolve, reject) {
                _this.db.transaction(function (tx) {
                    //console.log('Select * from ' + tableName + ' where id = '+ id);
                    tx.executeSql('Select * from ' + tableName + ' where id = ' + id, [], function (tx, result) {
                        productDetail = result.rows[0];
                        productDetail.product_attributes = JSON.parse(productDetail.product_attributes);
                        resolve(productDetail);
                    });
                });
            });
        }
    };
    PracticeProvider.prototype.SelectMeta = function (db, tableName) {
        var _this = this;
        if (this.db != undefined) {
            return new Promise(function (resolve, reject) {
                _this.db.transaction(function (tx) {
                    tx.executeSql('Select * from ' + tableName, [], function (tx, result) {
                        if (result.rows.length > 0) {
                            for (var i = 0; i < result.rows.length; i++) {
                                _this.AppkitMeta = result.rows[i];
                                //console.log(this.AppkitMeta);
                            }
                            resolve(_this.AppkitMeta);
                        }
                    });
                });
                ;
            });
        }
    };
    PracticeProvider.prototype.load = function () {
        var _this = this;
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        return new Promise(function (resolve) {
            _this.http.get('http://aione.oxosolutions.com/api/android/')
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                // we've got back the raw data, now generate the core schedule data
                // and save the data for later reference
                _this.data = data.data;
                // console.log(this.data);
                resolve(_this.data);
            });
        });
    };
    PracticeProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, SQLite])
    ], PracticeProvider);
    return PracticeProvider;
}());
export { PracticeProvider };
//# sourceMappingURL=practice.js.map