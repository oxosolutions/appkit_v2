var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPostPage } from '../pages/list-post/list-post';
import { ListPage } from '../pages/list/list';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { ListproductPage } from '../pages/listproduct/listproduct';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { PostDetailPage } from '../pages/post-detail/post-detail';
import { Network } from '@ionic-native/network';
import { ApidataPage } from '../pages/apidata/apidata';
import { Camera } from '@ionic-native/camera';
import { FilterPipe } from '../pipes/filter/filter';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ListPage,
                ContactUsPage,
                ListproductPage,
                ProductDetailsPage,
                ListPostPage,
                PostDetailPage,
                ApidataPage,
                FilterPipe
            ],
            imports: [
                BrowserModule,
                HttpModule,
                IonicModule.forRoot(MyApp),
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                ListPage,
                ContactUsPage,
                ListproductPage,
                ProductDetailsPage,
                ListPostPage,
                PostDetailPage,
                ApidataPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                DatabaseProvider,
                Network,
                SQLite,
                Camera
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map