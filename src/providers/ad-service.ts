import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { HttpServiceProvider as HttpService} from './http-service/http-service';
import { CacheServiceProvider as CacheService} from './cache-service/cache-service';

/*
  Generated class for the AdServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdService {

  listUrl: string   = 'ads';

  constructor(
    public http: HttpService,
    public cache: CacheService,
  ) {
    console.log('Hello AdService Provider');
  }


  public getList(placleid:number=1) {
     
    let url:string = this.listUrl;
 
    return this.http.get(url)
              .map( resp => {
                  let _res = resp.json();
                  this.cache.write(url, _res);
                  return _res;

              });
    
  }

}
