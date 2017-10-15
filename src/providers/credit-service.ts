import { Injectable } from '@angular/core';

//import { Observable }  from 'rxjs/Observable';
//import 'rxjs/add/observable/of';
//import 'rxjs/add/observable/empty';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

import { HttpService} from './http-service';

/*
  Generated class for the CreditServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CreditService {

  listUrl: string   = 'credits';

  constructor(
      public http: HttpService,
     
  ){
    //console.log('Hello CreditService Provider');
  }

  public getList(page:string = '') {
     
    let url = page ? page : this.listUrl;
   
    return this.http.get(url)
              .map( resp => {   
                  let _res = resp.json();
                  return _res;

              });
            
  }

}
