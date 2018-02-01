import { Component } from '@angular/core';
//import  {ProductDetailsPage} from '../product-details/product-details';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup,NgForm,FormControl} from '@angular/forms';
import { Http, Headers, RequestOptions} from '@angular/http';
import {ToastController , LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',

})
export class ContactUsPage {

	option:any;
  firstname: '';
  name : '';
  mobile : '';
  department : '';
  message : '';
  nameError : any;
  mobileError : any;
  departmentError : any;
  messageError : any;
  firstnameValidator:any;
  loginForm: FormGroup;
  submitAttempt: boolean = false;

  public htmlImageFromCamera: string;
  constructor(private camera: Camera, private formBuilder: FormBuilder,public toastctrl:ToastController, public loaderctrl:LoadingController,public http: Http, public navCtrl: NavController, public viewctrl:ViewController, public navParams: NavParams) {
           
  }
  takePicture(){
        console.log('take picture');
        let options = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
          //saveToPhotoAlbum: false

        };

        this.camera.getPicture(options)
         .then((imageData)=>{
           console.log('end take picture');
            this.htmlImageFromCamera = "data:image/jpeg;base64," + imageData;
            
          })
          .catch(err=>{
            console.log(err);
            alert(err);
          })
      }

  ionViewWillEnter(){
    this.loginForm=this.formBuilder.group({
      // if(this.form)
      firstname:['', Validators.compose([
                   Validators.minLength(3),
                   Validators.required,
                   Validators.pattern('^[a-zA-Z. ]*[a-zA-Z]{1,60}$'),           
                ])],
      message:['',Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
              ])],
      mobile:['',Validators.compose([
                Validators.minLength(10),
                Validators.maxLength(10),
                Validators.required,
              
              ])],
      department:['',Validators.compose([
                  Validators.required,
              ])],
        }); 
  }
  save(){
    this.submitAttempt = true;
    if(!this.loginForm.valid){
        console.log('not valid');
        this.loginForm;
    }else{

        console.log(this.loginForm.value);
        this.submit(this.loginForm.value.firstname,this.loginForm.value.mobile,this.loginForm.value.message,this.loginForm.value.department);

        // console.log(this.loginForm)
    }
  }
  submitLogin() 
    {
        let value=[];
        value=this.loginForm.value;
        if(value! =null && value!=undefined){
          console.log(value);
        console.log('Doing login..');
        }
        
    }
  back(){
    this.navCtrl.pop();
  }
  submit(firstname,mobileno,message,department){
    let loader =this.loaderctrl.create({
      content:'<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Submitting your Enquiry</div>',
    });
      loader.present();
      let toast=this.toastctrl.create({
        message:'Your Enquiry is Submitted',
        duration:4000,
        position:'top',
      });
      let form = new FormData();
      form.append('org_id','175');
      form.append('name',firstname);
      form.append('mobile',mobileno);
      form.append('message',message);
      form.append('department',department);
      form.append('token','0)9(8*7&6^5%');
      this.http.post("http://admin.scolm.com/api/send_complaint", form)
      .subscribe(data => {
        console.log(data);
        // this.firstname='';this.mobile = '';this.department = '';this.message = '';
        this.loginForm.reset()
         loader.dismiss();
        toast.present();
        console.log('submitted successfully');


        
      },error=>{
        console.log(error);
      });
      // showalert(data);
      return false;

  }
  reset(firstname,mobileno,message,department){
      firstname='';
      mobileno='';
      console.log('firstname'+firstname,mobileno);
   }

}
