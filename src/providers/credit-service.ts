import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { HttpServiceProvider as HttpService} from './http-service/http-service';
import { CacheServiceProvider as CacheService} from './cache-service/cache-service';

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
      public cache: CacheService,
     
  ){
    console.log('Hello CreditService Provider');
  }

  public getList(pageUrl:string|null = '') {
     
    let url:string;

    if(pageUrl === null){
        return   Observable.empty().toPromise();
    }else{
       url = pageUrl ? pageUrl : this.listUrl;
    }

  
    return this.http.get(url)
              .map( resp => {
                  
                  let _res = resp.json();

                  this.cache.write(url, _res);
                  
                  return _res;

              }).toPromise();
              
        
         
  }

}
