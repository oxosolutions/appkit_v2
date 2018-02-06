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
//import  {ProductDetailsPage} from '../product-details/product-details';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { ToastController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ContactUsPage = /** @class */ (function () {
    function ContactUsPage(camera, formBuilder, toastctrl, loaderctrl, http, navCtrl, viewctrl, navParams) {
        this.camera = camera;
        this.formBuilder = formBuilder;
        this.toastctrl = toastctrl;
        this.loaderctrl = loaderctrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.viewctrl = viewctrl;
        this.navParams = navParams;
        this.submitAttempt = false;
    }
    ContactUsPage.prototype.takePicture = function () {
        var _this = this;
        console.log('take picture');
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientatin: true,
            targetWidth: 400,
            targetHeight: 250,
        };
        this.camera.getPicture(options)
            .then(function (imageData) {
            console.log('end take picture');
            _this.htmlImageFromCamera = "data:image/jpeg;base64," + imageData;
        })
            .catch(function (err) {
            console.log(err);
            alert(err);
        });
    };
    ContactUsPage.prototype.ionViewWillEnter = function () {
        this.loginForm = this.formBuilder.group({
            // if(this.form)
            firstname: ['', Validators.compose([
                    Validators.minLength(3),
                    Validators.required,
                    Validators.pattern('^[a-zA-Z. ]*[a-zA-Z]{1,60}$'),
                ])],
            message: ['', Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])],
            mobile: ['', Validators.compose([
                    Validators.minLength(10),
                    Validators.maxLength(10),
                    Validators.required,
                ])],
            department: ['', Validators.compose([
                    Validators.required,
                ])],
        });
    };
    ContactUsPage.prototype.save = function () {
        this.submitAttempt = true;
        if (!this.loginForm.valid) {
            console.log('not valid');
            this.loginForm;
        }
        else {
            console.log(this.loginForm.value);
            this.submit(this.loginForm.value.firstname, this.loginForm.value.mobile, this.loginForm.value.message, this.loginForm.value.department);
            // console.log(this.loginForm)
        }
    };
    ContactUsPage.prototype.submitLogin = function () {
        var value = [];
        value = this.loginForm.value;
        if (value = null && value != undefined) {
            console.log(value);
            console.log('Doing login..');
        }
    };
    ContactUsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ContactUsPage.prototype.submit = function (firstname, mobileno, message, department) {
        var _this = this;
        var loader = this.loaderctrl.create({
            content: '<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Submitting your Enquiry</div>',
        });
        loader.present();
        var toast = this.toastctrl.create({
            message: 'Your Enquiry is Submitted',
            duration: 4000,
            position: 'top',
        });
        var form = new FormData();
        form.append('org_id', '175');
        form.append('name', firstname);
        form.append('mobile', mobileno);
        form.append('message', message);
        form.append('department', department);
        form.append('token', '0)9(8*7&6^5%');
        this.http.post("http://admin.scolm.com/api/send_complaint", form)
            .subscribe(function (data) {
            console.log(data);
            // this.firstname='';this.mobile = '';this.department = '';this.message = '';
            _this.loginForm.reset();
            loader.dismiss();
            toast.present();
            console.log('submitted successfully');
        }, function (error) {
            console.log(error);
        });
        // showalert(data);
        return false;
    };
    ContactUsPage.prototype.reset = function (firstname, mobileno, message, department) {
        firstname = '';
        mobileno = '';
        console.log('firstname' + firstname, mobileno);
    };
    ContactUsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-contact-us',
            templateUrl: 'contact-us.html',
        }),
        __metadata("design:paramtypes", [Camera, FormBuilder, ToastController, LoadingController, Http, NavController, ViewController, NavParams])
    ], ContactUsPage);
    return ContactUsPage;
}());
export { ContactUsPage };
//# sourceMappingURL=contact-us.js.map