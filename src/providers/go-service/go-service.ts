import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoServiceProvider {

  

  constructor(public http: HttpClient) {
    console.log('Hello GoServiceProvider Provider');
  }

}
