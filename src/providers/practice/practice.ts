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
  data :any;
  result:any;
  constructor(public http: Http) {
    console.log('Hello PracticeProvider Provider');
  } 
      
//   listapi(){
//      var url = 'http://makemyfolio.com/api/android/'

//      var response = this.http.get(url).map(res => res.json());
//      console.log(response);
// return response;
//  //      .subscribe((data) => {
      
//  //     this.result = JSON.parse(data['_body']).data;
    
//  //    });
//  //       console.log(this.data);
//  // //console.log(data);
//  //     // return this.data;

//   }

 load() {
  if (this.data) {
    // already loaded data
    return Promise.resolve(this.data);
  }

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get('http://makemyfolio.com/api/android/')
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data.data;
        resolve(this.data);
      });
  });
}

}
