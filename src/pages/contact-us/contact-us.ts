import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
//import  {ProductDetailsPage} from '../product-details/product-details';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup,NgForm,FormControl} from '@angular/forms';
import { Http, Headers, RequestOptions} from '@angular/http';
import {ToastController , LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import {} from '@types/googlemaps'; 

import { AutocompleteProvider } from '../../providers/autocomplete/autocomplete';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
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
export class ContactUsPage  {
  @ViewChild("search")
  public searchElementRef: ElementRef;

  public places: ElementRef;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

	option:any;
  // latitude;
  // longitude;
  // firstname: '';
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
  map:any;
  public htmlImageFromCamera: string;
 
  constructor(
 private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public completeTestService: AutocompleteProvider,private geolocation: Geolocation,private googleMaps: GoogleMaps,private camera: Camera, private formBuilder: FormBuilder,public toastctrl:ToastController, public loaderctrl:LoadingController,public http: Http, public navCtrl: NavController, public viewctrl:ViewController, public navParams: NavParams) {
    //this.location();

  }
  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
 
  location(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
     console.log(resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
  }
  Map(){
    let input = document.getElementById('googlePlaces').getElementsByTagName('input')[0];
    let autocomplete = new google.maps.places.Autocomplete(input,{types:   ['geocode']});
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
       // retrieve the place object for your use
      let place = autocomplete.getPlace();
    });


//       let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
//   types: ["address"]
// });


  }
    takePicture(){
        console.log('take picture');
        let options = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientatin: true,
          targetWidth: 400,
          targetHeight: 250,
          // saveToPhotoAlbum: false
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
        duration:900,
        position:'bottom',
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
