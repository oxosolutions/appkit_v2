import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomPage} from '../../pages/custom/custom';

@IonicPage()
@Component({
  selector: 'page-custom-detail',
  templateUrl: 'custom-detail.html',
})
export class CustomDetailPage {
	customDetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams){
  }
  ionViewDidLoad(){
    this.customDetails=this.navParams.get('data');
    console.log(this.customDetails);
  }

}
