import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PracticeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PracticeProvider {
  data :any[];
  constructor(public http: Http) {
    console.log('Hello PracticeProvider Provider');
  } 
      
  listapi(){
    let data = this.http.get('http://makemyfolio.com/api/android/')
    //   .subscribe(data3=> {
    //     console.log(JSON.parse(data3['_body']));
    //     // console.log(data3);
       
    // });
 //console.log(data);
      return data;

  }

}
