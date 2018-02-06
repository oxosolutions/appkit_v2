import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {AutoCompleteService} from 'ionic2-auto-complete';
import 'rxjs/add/operator/map'

/*
  Generated class for the AutocompleteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteProvider implements AutoCompleteService {
  labelAttribute = "name";	
  constructor(private http:Http) {
    console.log('Hello AutocompleteProvider Provider');
  }
  getResults(keyword:string) {
    return this.http.get("https://restcountries.eu/rest/v1/name/"+keyword)
      .map(
        result =>
        {
          return result.json()
            .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) 
            	)
            
        });
  }

}
