import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AsyncPipe } from '@angular/common';


/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
	// data :any = '';
	 handleError : any = 'api is not fetcing';
	private userUrl = 'http://makemyfolio.com/api/android/';
	
	constructor( public http: Http ) {
	    console.log('Hello ServiceProvider Provider');
	}

	// handleError(){
	// 	this.error= 'Api is not fetching';
	// }


  getUsersHttp(): Promise<ServiceProvider[]> {
    return this.http.get(this.userUrl)
      .toPromise()
     .then(response => response.json().data as ServiceProvider[])
      .catch(this.handleError);
  }


	// listusers(){

	// 	 this.http.get('http://makemyfolio.com/api/android/')
	// 	// .then(jj => console.log(data));

	// 	.then((data)=>{
	// 		console.log(JSON.parse(data['_body']));
	// 	});
	// }


	// listapi(){
	// 	this.http.get('https://jsonplaceholder.typicode.com/posts')
	// 		.subscribe(data2=>{
	// 			console.log(JSON.parse(data2['_body']));
	// 		})

	// }
	
	// https://jsonplaceholder.typicode.com/posts

}
