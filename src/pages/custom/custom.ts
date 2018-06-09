import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomDetailPage} from '../../pages/custom-detail/custom-detail';

@IonicPage()
@Component({
  selector: 'page-custom',
  templateUrl: 'custom.html',
})
export class CustomPage {
	custom:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.custom=this.navParams.get('data');
    console.log(this.custom);
  }
  detail(data){
  	console.log(data);
  	this.navCtrl.push(CustomDetailPage,{'data':data});
  }

}
