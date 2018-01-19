import { Component } from '@angular/core';
//import  {ProductDetailsPage} from '../product-details/product-details';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
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
	
  constructor(public navCtrl: NavController, public viewctrl:ViewController, public navParams: NavParams) {
  		

  }
  
  back(){
   
    this.navCtrl.pop();

  }

}
