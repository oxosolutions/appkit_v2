import { Component } from '@angular/core';
//import  {ProductDetailsPage} from '../product-details/product-details';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup,NgForm,FormControl} from '@angular/forms';
import { Http, Headers, RequestOptions} from '@angular/http';
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
  constructor(private formBuilder: FormBuilder,public http: Http, public navCtrl: NavController, public viewctrl:ViewController, public navParams: NavParams) {
      this.ionViewDidLoad();
      this.loginForm=this.formBuilder.group({
      firstname:['', Validators.compose([
                   Validators.minLength(5),
                   Validators.required             
                ])],
      message:['',Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
              ])],
      mobile:['',Validators.compose([
                Validators.minLength(10),
                Validators.required
              ])],
      department:['',Validators.compose([
                  Validators.required,
              ])]

    });
  }
  ionViewDidLoad(){
    
   
  }
  save(){
    this.submitAttempt = true;
    console.log('save form');
  //   if(!this.loginForm.valid){
  //       this.signupSlider.slideTo(0);
  //   }else{
  //       console.log(this.loginForm.value);
  //   }
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
      let form = new FormData();
      form.append('org_id','175');
      form.append('name',firstname);
      form.append('mobile',mobileno);
      form.append('message',message);
      form.append('department',department);
      form.append('token','0)9(8*7&6^5%');
      // this.http.post("http://admin.scolm.com/api/send_complaint", form)
      // .subscribe(data => {
      //   console.log(data);
      //   this.name='';this.mobile = '';this.department = '';this.message = '';
      
      // },error=>{
      //   console.log(error);
      // });

  }
  reset(firstname,mobileno,message,department){
      firstname='';
      mobileno='';
      console.log('firstname'+firstname,mobileno);
   }

}
