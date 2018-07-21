var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Platform, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
/*
  Generated class for the DatabaseProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(toast, network, http, platform, sqlite, loadingctrl) {
        //console.log('Hello DatabaseProvider Provider');
        this.toast = toast;
        this.network = network;
        this.http = http;
        this.platform = platform;
        this.sqlite = sqlite;
        this.loadingctrl = loadingctrl;
        this.slugs = [];
        this.AppkitProducts = [];
    }
    DatabaseProvider.prototype.displayNetworkUpdate = function (connectionState) {
        var networkType = this.network.type;
        this.toast.create({
            message: "You are now " + connectionState,
            // message: `You are now ${connectionState} via ${networkType}`,
            duration: 3000
        }).present();
    };
    DatabaseProvider.prototype.connection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.network.onConnect().subscribe(function (data) {
                // alert('network connected');
                console.log(data);
                _this.displayNetworkUpdate(data.type);
            }, function (error) { return console.error(error); });
            _this.network.onDisconnect().subscribe(function (data) {
                // alert('disconnect');
                console.log(data);
                _this.displayNetworkUpdate(data.type);
            }, function (error) { return console.error(error); });
            //console.log('connection refreshing');
            if (_this.platform.is('cordova')) {
                console.log('cordova platform');
                _this.sqlite.create({ name: 'appkit', location: 'default' }).then(function (data) {
                    console.log('sqlite platform');
                    _this.database = data;
                    _this.db = _this.database;
                    console.log(_this.db);
                    resolve(_this.db);
                    // this.createTable().then(()=>{
                    // });
                }, function (error) {
                    console.error("wrong database", error);
                });
            }
            else {
                _this.database = window.openDatabase("tuteAppBrowser", '1', 'my', 1024 * 1024 * 100);
                //console.log('on browser');
                //return this.db=this.database;
                _this.db = _this.database;
                resolve(_this.db);
                //   this.createTable().then((resut)=>{
                //   	//console.log(resut);
                // 		//console.log('contstructor create');
                // });
            }
        });
    };
    DatabaseProvider.prototype.ExecuteRun = function (query, valesData) {
        var _this = this;
        //console.log(this.database);
        return new Promise(function (resolve, reject) {
            if (query != undefined) {
                if (_this.platform.is('cordova')) {
                    _this.database.executeSql(query, valesData, function (result) {
                        resolve(result);
                    }, function (error) {
                        console.error(error);
                    });
                }
                else {
                    _this.database.transaction(function (tx) {
                        tx.executeSql(query, valesData, function (tx, result) {
                            resolve(result);
                        }, function (error) {
                            console.error(error);
                        });
                    });
                }
            }
        });
    };
    DatabaseProvider.prototype.delall = function () {
        if (this.platform.is('cordova')) {
            this.database.close();
        }
        else {
        }
    };
    DatabaseProvider.prototype.createTable = function () {
        var _this = this;
        var columns = [];
        var columnsproduct = [];
        var columnMeta = [];
        var columnPosts = [];
        var tableName;
        var tableNamepage;
        var tableNamepro;
        var tableNamepost;
        var postSettting = [];
        console.log('promise');
        return new Promise(function (resolve, reject) {
            _this.load().then(function (result) {
                _this.Apidata = result;
                if ("pages" in result) {
                    tableNamepage = "app_pages";
                    for (var app_keys in result.pages.data[0]) {
                        columns.push(app_keys + ' TEXT');
                    }
                    _this.query = 'CREATE TABLE IF NOT EXISTS ' + tableNamepage + '(' + columns.join(",") + ')';
                    _this.ExecuteRun(_this.query, []).then(function (resultpages) {
                        console.log('app_pages table created now go to insert query');
                        _this.insertPages(_this.database, _this.Apidata, tableNamepage).then(function (resultffff) {
                            console.log(resultffff);
                            if ("app_name" in result) {
                                for (var app_keys in result) {
                                    tableName = "Meta";
                                    if (typeof result[app_keys] != "object") {
                                        columnMeta.push(app_keys + ' TEXT');
                                    }
                                }
                                _this.query = 'CREATE TABLE IF NOT EXISTS ' + tableName + '(' + columnMeta.join(",") + ')';
                                _this.ExecuteRun(_this.query, []).then(function (data) {
                                    _this.metaQuery(_this.database, result, tableName).then(function (resultappkit) {
                                        console.log(resultappkit);
                                        //resolve(resultappkit);
                                        if ("products" in result) {
                                            tableNamepro = "app_products";
                                            for (var app_keys in result.products.data[0]) {
                                                columnsproduct.push(app_keys + ' TEXT');
                                            }
                                            _this.query = 'CREATE TABLE IF NOT EXISTS ' + tableNamepro + '(' + columnsproduct.join(",") + ')';
                                            _this.ExecuteRun(_this.query, []).then(function (resultproduct) {
                                                console.log(resultproduct);
                                                _this.insertProduct(_this.database, result, tableNamepro).then(function (productresul) {
                                                    console.log(productresul);
                                                    if ("posts" in result) {
                                                        tableNamepost = "posts";
                                                        for (var app_keys in result.posts.data[0]) {
                                                            columnPosts.push(app_keys + ' TEXT');
                                                        }
                                                        _this.query = 'CREATE TABLE IF NOT EXISTS ' + tableNamepost + '(' + columnPosts.join(",") + ')';
                                                        _this.ExecuteRun(_this.query, []).then(function (data) {
                                                            _this.insertpost(_this.database, result, tableNamepost).then(function (postresult) {
                                                                resolve(postresult);
                                                                if ("template_settings" in result.posts) {
                                                                    var tableName333_1;
                                                                    tableName333_1 = "postSetting";
                                                                    for (var app_keys in result.posts.template_settings) {
                                                                        postSettting.push(app_keys);
                                                                        //console.log(postSettting)
                                                                    }
                                                                    _this.query = 'create table if not exists ' + tableName333_1 + '(' + postSettting.join(",") + ')';
                                                                    _this.ExecuteRun(_this.query, []).then(function () {
                                                                        _this.insertPostSettting(_this.database, result, tableName333_1).then(function () {
                                                                        });
                                                                    });
                                                                }
                                                            });
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    });
                }
            });
        });
    };
    DatabaseProvider.prototype.insertPostSettting = function (db, record, tableName) {
        var _this = this;
        var columnsdata = [];
        var values = [];
        var json;
        return new Promise(function (resolve, reject) {
            for (var key in record.posts.template_settings) {
                columnsdata.push(key);
                json = record.posts.template_settings[key].replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
                values.push(json);
            }
            // console.log(columnsdata);
            // console.log(values);
            if (db != undefined) {
                _this.query = 'SELECT * from ' + tableName;
                _this.ExecuteRun(_this.query, []).then(function (postget) {
                    if (postget.rows.length > 0) {
                        console.log('update');
                    }
                    else {
                        console.log('insert');
                        _this.insertSetting(values, db, tableName, columnsdata).then(function () {
                        });
                    }
                });
            }
        });
    };
    DatabaseProvider.prototype.insertSetting = function (values, db, tableName, columns) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var i;
            var j;
            var resultKey;
            if (values != undefined) {
                var collectedData = [];
                var valuesArray = [];
                console.log(values);
                for (i = 0; i < values.length; i++) {
                    valuesArray.push('"' + values[i] + '"');
                }
                console.log(valuesArray);
                _this.query = 'INSERT INTO ' + tableName + ' ( ' + columns.join(',') + ' ) VALUES ' + '(' + valuesArray.join(',') + ')';
                console.log(_this.query);
                _this.ExecuteRun(_this.query, []).then(function (result) {
                    resolve(result);
                });
            }
        });
    };
    DatabaseProvider.prototype.Apitable = function () {
        var _this = this;
        var tablename;
        var columnsdata = [];
        return new Promise(function (resolve, reject) {
            _this.loadApi().then(function (result) {
                tablename = 'ApiData';
                var json;
                for (var key in result[0]) {
                    json = key.replace(/ /g, "_");
                    columnsdata.push(json + ' TEXT');
                }
                _this.query = 'create table if not exists ' + tablename + '(' + columnsdata.join(",") + ')';
                _this.ExecuteRun(_this.query, []).then(function (resultdata) {
                    _this.insertApi(_this.database, result, tablename).then(function (result) {
                        resolve(result);
                    });
                });
            });
        });
    };
    DatabaseProvider.prototype.insertApi = function (db, record, tableName) {
        var _this = this;
        var columns;
        var key2;
        var values = [];
        var columnsdata = [];
        return new Promise(function (resolve, reject) {
            for (var key3 in record[0]) {
                var json2 = key3.replace(/ /g, "_");
                columnsdata.push(json2);
            } //console.log(columnsdata);
            for (var key in record) {
                columns = record[key];
                var v = [];
                for (key2 in columns) {
                    //console.log(key2);
                    var json = columns[key2].replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;");
                    v.push(json);
                }
                //console.log(v);
                values.push(v);
            }
            console.log(values);
            if (db != undefined) {
                _this.query = 'SELECT * FROM ' + tableName;
                //console.log(this.query);
                _this.ExecuteRun(_this.query, []).then(function (result21) {
                    //console.log(result21);
                    if (result21.rows.length > 0) {
                        //console.log('del');
                        // this.query='Delete from '+tableName;
                        _this.query = 'DROP TABLE ' + tableName;
                        ;
                        _this.ExecuteRun(_this.query, []).then(function (result21) {
                            _this.Apitable().then(function (ll) {
                                //console.log(ll);
                                resolve('insert again query');
                            });
                        });
                    }
                    else {
                        console.log('insert');
                        _this.insertApidata(values, db, tableName, columnsdata).then(function (ll) {
                            //console.log(ll);
                            resolve('insert query');
                        });
                    }
                });
            }
        });
    };
    DatabaseProvider.prototype.insertApidata = function (values, db, tableName, columns) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var i;
            var j;
            var resultKey;
            if (values != undefined) {
                var collectedData = [];
                for (i = 0; i < values.length; i++) {
                    var valuesArray = [];
                    for (j = 0; j < values[i].length; j++) {
                        valuesArray.push('"' + values[i][j] + '"');
                    }
                    collectedData.push('(' + valuesArray.join(',') + ')');
                }
                _this.query = 'INSERT INTO ' + tableName + ' ( ' + columns.join(',') + ' ) VALUES ' + collectedData.join(',');
                //console.log(this.query);  
                _this.ExecuteRun(_this.query, []).then(function (result) {
                    resolve(result);
                });
            }
        });
    };
    DatabaseProvider.prototype.insertpost = function (db, record, tableName) {
        var _this = this;
        var columns = [];
        var values = [];
        var slugdata;
        return new Promise(function (resolve, reject) {
            for (var tableColumns in record.posts.data[0]) {
                columns.push(tableColumns);
            }
            for (var _i = 0, _a = record.posts.data; _i < _a.length; _i++) {
                var appData = _a[_i];
                var v = [];
                var w = [];
                for (var keys in appData) {
                    var json = void 0;
                    if (keys == 'id' || keys == 'show_in_menu') {
                        json = appData[keys];
                    }
                    else {
                        //json=appData[keys].replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                        json = appData[keys].replace(/&/g, "&amp;")
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;")
                            .replace(/"/g, "&quot;")
                            .replace(/'/g, "&#039;");
                    }
                    if (record.pages != undefined || appData != undefined) {
                        v.push(json);
                    }
                }
                values.push(v);
                //console.log(values);
            }
            if (db != undefined) {
                _this.query = 'SELECT slug FROM ' + tableName;
                _this.ExecuteRun(_this.query, []).then(function (result2) {
                    var slugdata;
                    if (result2.rows.length > 0) {
                        _this.query = 'Delete  from ' + tableName;
                        _this.ExecuteRun(_this.query, []).then(function (result) {
                            //console.log('deelteing app apges');
                            _this.insertpostdata(values, db, tableName, columns).then(function (ll) {
                                // console.log('delete andy then insert');
                                // console.log(ll);
                                resolve('update query');
                            });
                        });
                    }
                    else {
                        // console.log('insert post');
                        _this.insertpostdata(values, db, tableName, columns).then(function (ll) {
                            //console.log(ll);
                            resolve('insert query');
                        });
                    }
                });
            }
        });
    };
    DatabaseProvider.prototype.insertpostdata = function (values, db, tableName, columns) {
        var _this = this;
        console.log(columns);
        return new Promise(function (resolve, reject) {
            var i;
            var j;
            var resultKey;
            if (values != undefined) {
                var collectedData = [];
                for (i = 0; i < values.length; i++) {
                    var valuesArray = [];
                    for (j = 0; j < values[i].length; j++) {
                        valuesArray.push('"' + values[i][j] + '"');
                    }
                    collectedData.push('(' + valuesArray.join(',') + ')');
                }
                _this.query = 'INSERT INTO ' + tableName + ' ( ' + columns.join(',') + ' ) VALUES ' + collectedData.join(',');
                //console.log(this.query);  
                _this.ExecuteRun(_this.query, []).then(function (result) {
                    resolve(result);
                });
            }
        });
    };
    DatabaseProvider.prototype.insertProduct = function (db, record, tableName) {
        var _this = this;
        var columns = [];
        var values = [];
        var slugdata;
        return new Promise(function (resolve, error) {
            if (record != '') {
                for (var tableColumns in record.products.data[0]) {
                    columns.push(tableColumns);
                }
                for (var _i = 0, _a = record.products.data; _i < _a.length; _i++) {
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
                }
            }
            if (db != undefined) {
                _this.query = 'SELECT slug FROM ' + tableName;
                _this.ExecuteRun(_this.query, []).then(function (result1) {
                    if (result1.rows.length > 0) {
                        // this.update(values,db,tableName, columns);
                        _this.query = 'Delete  from ' + tableName;
                        _this.ExecuteRun(_this.query, []).then(function (result) {
                            //console.log('deelteing app apges');
                            _this.insertDataProduct(values, db, tableName, columns).then(function (ll) {
                                //console.log('delete andy then insert');
                                //console.log(ll);
                                resolve('update query');
                            });
                        });
                    }
                    else {
                        _this.insertDataProduct(values, db, tableName, columns).then(function (resultproduct) {
                            //console.log('insert here');
                            resolve(resultproduct);
                        });
                    }
                });
            }
        });
    };
    DatabaseProvider.prototype.insertDataProduct = function (values, db, tableName, columns) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var i;
            var j;
            var resultKey;
            if (values != undefined) {
                var collectedData = [];
                for (i = 0; i < values.length; i++) {
                    var valuesArray = [];
                    for (j = 0; j < values[i].length; j++) {
                        if (typeof values[i][j] != "object") {
                            valuesArray.push("'" + values[i][j] + "'");
                        }
                        else {
                            //console.log('object');
                        }
                    }
                    //console.log(valuesArray);
                    collectedData.push('(' + valuesArray.join(',') + ')');
                    //console.log(collectedData);
                }
                _this.query = 'INSERT INTO ' + tableName + ' ( ' + columns.join(',') + ' ) VALUES ' + collectedData.join(',');
                //console.log(this.query);	
                _this.ExecuteRun(_this.query, []).then(function (result) {
                    resolve(result);
                });
            }
        });
    };
    DatabaseProvider.prototype.metaQuery = function (db, record, tableName) {
        var _this = this;
        var columnMeta = [];
        var values = [];
        var tablekeys;
        return new Promise(function (resolve, error) {
            if (record != '') {
                for (var tablekeys_1 in record) {
                    if (typeof record[tablekeys_1] != "object") {
                        columnMeta.push(tablekeys_1);
                        values.push(record[tablekeys_1]);
                    }
                }
                _this.query = 'SELECT  app_domain FROM ' + tableName;
                _this.ExecuteRun('SELECT  app_domain FROM ' + tableName, []).then(function (result) {
                    //console.log(result);
                    if (result.rows.length > 0) {
                        //console.log('update');
                        var meta = void 0;
                        //console.log(result);
                        meta = result.rows.item(0).app_domain;
                        //console.log(meta);
                        var questionMarks = [];
                        for (var j = 0; j < values.length; j++) {
                            questionMarks.push("?");
                        }
                        values.push(meta);
                        _this.query = 'UPDATE ' + tableName + ' SET ' + columnMeta.join('=?, ') + ' = ? where app_domain = ?';
                        _this.ExecuteRun(_this.query, values).then(function (hh) {
                            var AppkitMeta;
                            //console.log(hh);
                            if (result.rows.length > 0) {
                                for (var i = 0; i < result.rows.item.length; i++) {
                                    AppkitMeta = result.rows.item(i);
                                }
                                resolve(AppkitMeta);
                            }
                        });
                    }
                    else {
                        //console.log('insert');
                        var questionMarks = [];
                        for (var j = 0; j < values.length; j++) {
                            questionMarks.push("?");
                        }
                        _this.query = 'INSERT INTO ' + tableName + '(' + columnMeta + ') VALUES (' + questionMarks + ')';
                        _this.ExecuteRun(_this.query, values).then(function (hh) {
                            //console.log(hh);
                            //let AppkitMeta;
                            //console.log(hh);
                            // if(result.rows.length>0){
                            //  for(let i=0; i < result.rows.length; i++){
                            //         AppkitMeta=result.rows.item(i);
                            //  }
                            // console.log(AppkitMeta); 
                            resolve(hh);
                            // }
                        });
                    }
                });
            }
        });
    };
    DatabaseProvider.prototype.insertPages = function (db, record, tableName) {
        var _this = this;
        var columns = [];
        var values = [];
        var slugdata;
        return new Promise(function (resolve, reject) {
            if (record != '') {
                //process columns form record variable
                for (var tableColumns in record.pages.data[0]) {
                    columns.push("'" + tableColumns + "'");
                }
                //process values from record variable
                if (record.pages.data.length > 0) {
                    if (record.pages.data != undefined) {
                        for (var _i = 0, _a = record.pages.data; _i < _a.length; _i++) {
                            var appData = _a[_i];
                            var v = [];
                            var w = [];
                            for (var keys in appData) {
                                var json = void 0;
                                if (keys == 'id' || keys == 'show_in_menu') {
                                    json = appData[keys];
                                }
                                else {
                                    //json=appData[keys].replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                                    json = appData[keys].replace(/&/g, "&amp;")
                                        .replace(/</g, "&lt;")
                                        .replace(/>/g, "&gt;")
                                        .replace(/"/g, "&quot;")
                                        .replace(/'/g, "&#039;");
                                }
                                //console.log(appData[keys]);
                                if (record.pages != undefined || appData != undefined) {
                                    v.push(json);
                                }
                            }
                            values.push(v);
                        }
                        // console.log(values);
                    }
                }
            }
            if (db != undefined) {
                _this.query = 'SELECT slug FROM ' + tableName;
                _this.ExecuteRun(_this.query, []).then(function (result1) {
                    //console.log(result1);
                    if (result1.rows.length > 0) {
                        for (var i = 0; i <= result1.rows.item.length; i++) {
                            if (result1.rows.item(i) != undefined) {
                                console.log('update if condition');
                                slugdata = _this.slugs.push(result1.rows.item(i).slug);
                            }
                        }
                        if (_this.slugs.length > 0) {
                            // this.update(values,db,tableName, columns).then((update)=>{
                            //    //console.log(update);
                            // });
                            _this.query = 'Delete  from ' + tableName;
                            _this.ExecuteRun(_this.query, []).then(function (result) {
                                _this.insertData2(values, db, tableName, columns).then(function (ll) {
                                    //	console.log('delete andy then insert');
                                    //	console.log(ll);
                                    resolve('update query');
                                    //console.log(ll);
                                });
                            });
                        }
                    }
                    else {
                        //.log('insert');
                        _this.insertData2(values, db, tableName, columns).then(function (ll) {
                            //console.log(ll);
                            resolve('insert query');
                        });
                    }
                });
            }
            // resolve('insert query');
        });
    };
    DatabaseProvider.prototype.insertData2 = function (values, db, tableName, columns) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var i;
            var j;
            var resultKey;
            if (values != undefined) {
                var collectedData = [];
                for (i = 0; i < values.length; i++) {
                    var valuesArray = [];
                    for (j = 0; j < values[i].length; j++) {
                        valuesArray.push('"' + values[i][j] + '"');
                    }
                    collectedData.push('(' + valuesArray.join(',') + ')');
                }
                _this.query = 'INSERT INTO ' + tableName + ' ( ' + columns.join(',') + ' ) VALUES ' + collectedData.join(',');
                // console.log(this.query);	
                _this.ExecuteRun(_this.query, []).then(function (result) {
                    resolve(result);
                });
            }
        });
    };
    DatabaseProvider.prototype.update = function (values, db, tableName, columns, i) {
        var _this = this;
        if (i === void 0) { i = 0; }
        //console.log('update');
        return new Promise(function (resolve, reject) {
            if (values[i] != undefined) {
                db.transaction(function (tx) {
                    values[i].push(_this.slugs[i]);
                    var questionMarks = [];
                    for (var j = 0; j < values[i].length; j++) {
                        questionMarks.push('?');
                    }
                    _this.query = 'UPDATE ' + tableName + ' SET ' + columns.join(' = ? ,') + ' = ? where slug = ?';
                    _this.ExecuteRun(_this.query, values[i]).then(function (result) {
                        resolve(result);
                        _this.update(values, db, tableName, columns, i = i + 1);
                    });
                });
            }
        });
    };
    DatabaseProvider.prototype.SelectPages = function (tableName) {
        var _this = this;
        var AppkitPage = [];
        var slughome;
        if (this.db != undefined) {
            var i = void 0;
            return new Promise(function (resolve, reject) {
                //console.log(tableName);
                _this.query = 'Select * from ' + tableName;
                _this.ExecuteRun(_this.query, []).then(function (resultpages) {
                    // for(let keypages in resultpages.rows[0]){
                    //   console.log(keypages);
                    //   console.log(resultpages.rows[0][keypages]);
                    // }
                    // console.log(resultpages.rows[0]);
                    resolve(resultpages);
                });
            });
        }
    };
    DatabaseProvider.prototype.SelectPostArchive = function (tableName) {
        var _this = this;
        var PostArc = [];
        var postStr = [];
        var single;
        var archive;
        var css;
        var js;
        return new Promise(function (resolve, reject) {
            _this.query = 'Select * from ' + tableName;
            // console.log(this.query);
            _this.ExecuteRun(_this.query, []).then(function (postArc) {
                //console.log(postArc.rows);
                for (var i = 0; i < postArc.rows.length; i++) {
                    postArc[i] = postArc.rows.item(i);
                    for (var key in postArc[i]) {
                        postArc[i][key] = postArc[i][key].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'");
                        postStr.push(postArc[i][key]);
                    }
                    //console.log(postStr);
                    resolve(postStr);
                }
            });
        });
    };
    DatabaseProvider.prototype.SelectPost = function (tableName) {
        var _this = this;
        var i;
        var Apppost = [];
        return new Promise(function (resolve, reject) {
            _this.query = 'Select * from ' + tableName;
            _this.ExecuteRun(_this.query, []).then(function (resultPost) {
                for (i = 0; i < resultPost.rows.length; i++) {
                    resultPost[i] = resultPost.rows.item(i);
                    for (var key in resultPost[i]) {
                        if (key == 'id' || key == 'show_in_menu') {
                            resultPost[i][key] = resultPost[i][key];
                            //.log(resultPost[i][key]);   
                        }
                        else {
                            resultPost[i][key] = resultPost[i][key].replace(/&lt;/g, "<")
                                .replace(/&gt;/g, ">")
                                .replace(/&quot;/g, '"')
                                .replace(/&#039;/g, "'");
                        }
                    }
                    Apppost.push(resultPost[i]);
                }
                //console.log(Apppost);
                resolve(Apppost);
            });
        });
    };
    DatabaseProvider.prototype.StringReplace = function (resultsData) {
        var i;
        var Apppost = [];
        return new Promise(function (resolve, reject) {
            for (i = 0; i < resultsData.rows.length; i++) {
                resultsData[i] = resultsData.rows.item(i);
                for (var key in resultsData[i]) {
                    if (key == 'id' || key == 'show_in_menu') {
                        resultsData[i][key] = resultsData[i][key];
                        //console.log(resultsData[i][key]);   
                    }
                    else {
                        resultsData[i][key] = resultsData[i][key].replace(/&lt;/g, "<")
                            .replace(/&gt;/g, ">")
                            .replace(/&quot;/g, '"')
                            .replace(/&#039;/g, "'");
                    }
                }
                Apppost.push(resultsData[i]);
            }
            resolve(Apppost);
        });
    };
    DatabaseProvider.prototype.SelectProducts = function (tableName) {
        var _this = this;
        var key;
        var i;
        var data = [];
        if (this.db != undefined) {
            //console.log('databasde product');
            return new Promise(function (resolve, reject) {
                _this.query = 'Select * from ' + tableName;
                _this.ExecuteRun(_this.query, []).then(function (resultproduct) {
                    //console.log(resultproduct);
                    _this.AppkitProducts = [];
                    for (i = 0; i < resultproduct.rows.length; i++) {
                        var temp = resultproduct.rows.item(i);
                        temp.product_attributes = JSON.parse(temp.product_attributes);
                        _this.AppkitProducts.push(temp);
                    }
                    //console.log(this.AppkitProducts); 
                    resolve(_this.AppkitProducts);
                });
            });
        }
    };
    DatabaseProvider.prototype.ProductDetail = function (tableName, id) {
        var _this = this;
        var productDetail;
        if (this.db != undefined) {
            return new Promise(function (resolve, reject) {
                _this.query = 'Select * from ' + tableName + ' where id = ' + id;
                //console.log('Select * from '+tableName + ' where id = '+ id);
                _this.ExecuteRun(_this.query, []).then(function (result) {
                    productDetail = result.rows.item(0);
                    productDetail.product_attributes = JSON.parse(productDetail.product_attributes);
                    //  console.log(productDetail);
                    resolve(productDetail);
                });
            });
        }
    };
    DatabaseProvider.prototype.PostDetail = function (tableName, id) {
        var _this = this;
        var postresult;
        return new Promise(function (resolve, reject) {
            _this.query = 'Select * from ' + tableName + ' where id =' + id;
            //console.log(this.query);
            _this.ExecuteRun(_this.query, []).then(function (result) {
                _this.StringReplace(result).then(function (resultreplace) {
                    //console.log(resultreplace[0]);
                    resolve(resultreplace[0]);
                });
            });
        });
    };
    DatabaseProvider.prototype.SelectMeta = function (tableName) {
        var _this = this;
        var AppkitMeta;
        if (this.db != null) {
            return new Promise(function (resolve, reject) {
                //console.log('here 1');
                _this.query = 'Select * from ' + tableName;
                _this.ExecuteRun(_this.query, []).then(function (result) {
                    //console.log(result.rows);
                    //resolve(result.rows);
                    if (result.rows.length > 0) {
                        for (var i = 0; i < result.rows.length; i++) {
                            AppkitMeta = result.rows.item(i);
                        }
                        //console.log(AppkitMeta);
                        resolve(AppkitMeta);
                    }
                });
            });
        }
    };
    DatabaseProvider.prototype.Apidataget = function (tableName) {
        var _this = this;
        var dataset = [];
        if (this.db != null) {
            return new Promise(function (resolve, reject) {
                _this.query = 'Select * from ' + tableName;
                _this.ExecuteRun(_this.query, []).then(function (result) {
                    //console.log(result.rows);
                    // if(result.rows.length>0){
                    //   for(let i=1; i < result.rows.length; i++){
                    //     let temp=result.rows.item(i);
                    //     dataset.push(temp)
                    //   }
                    //   console.log(dataset);
                    // }
                    resolve(result);
                });
            });
        }
    };
    DatabaseProvider.prototype.DeleteAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var i;
            var data = [];
            var hh = ['app_pages', 'app_products', 'Meta', 'ApiData', 'postSetting', 'posts'];
            console.log(hh.length);
            for (i = 0; i < hh.length; i++) {
                data.push(hh[i]);
                _this.query = 'DROP TABLE ' + hh[i];
                //console.log(this.query);
                _this.ExecuteRun(_this.query, []).then(function (result) {
                    resolve(result);
                });
            }
            // window.location.reload();
            // t
        });
    };
    DatabaseProvider.prototype.Apitable1 = function () {
        var _this = this;
        var tablename;
        var columnsdata = [];
        return new Promise(function (resolve, reject) {
            _this.loadApi().then(function (result) {
                //console.log(result);
                tablename = 'ApiData';
                var json;
                for (var key in result[0]) {
                    json = key.replace(/ /g, "_");
                    columnsdata.push(json + ' TEXT');
                    // console.log(columnsdata);
                }
                _this.query = 'Delete  from ' + tablename + '(' + columnsdata.join(",") + ')';
                //console.log(this.query);
                _this.ExecuteRun(_this.query, []).then(function (resultdata) {
                });
            });
        });
    };
    DatabaseProvider.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('http://aione.oxosolutions.com/api/android/').subscribe(function (data) {
                _this.Apidata = data.json().data;
                console.log(_this.Apidata);
                resolve(_this.Apidata);
            }, function (error) {
                console.error(error);
            });
        });
    };
    DatabaseProvider.prototype.loadApi = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('http://master.scolm.com/api/dataset/123456/3s1clNJqHOXhFbir1NFlpsx9s').subscribe(function (data) {
                _this.dataset = data.json();
                //console.log(this.dataset);
                resolve(_this.dataset);
            }, function (err) {
                console.error(err);
            });
        });
    };
    DatabaseProvider.prototype.ionViewDidLoad = function () {
        console.log('database ionview did load');
    };
    DatabaseProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ToastController, Network, Http, Platform, SQLite, LoadingController])
    ], DatabaseProvider);
    return DatabaseProvider;
}());
export { DatabaseProvider };
//# sourceMappingURL=database.js.map