import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams,Headers } from '@angular/http';
import 'rxjs/add/operator/map';


import { REQUEST_URI } from '../Constant';

import { UserService } from '../user-service/user-service';
import { CacheServiceProvider as CacheService} from '../cache-service/cache-service';
import { UserModel } from '../../models/user-model';



/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  headers: Headers;
  defaultOptions: RequestOptions;
  url: string = REQUEST_URI;
  


  constructor(
    public http: Http,
    public cacheService: CacheService
  ) {
 

      let user = <UserModel>this.cacheService.read('user');
      let token = user ? user.access_token  : '';
      
      this.headers = new Headers({
          'Authorization': token 
      });

      this.defaultOptions = new RequestOptions({headers:this.headers});

      //console.log('Hello HttpServiceProvider Provider');
  }

 



  get(endpoint: string, params?: any, options?: RequestOptions) {
     
    options = this.defaultOptions.merge(options);

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }


    let url = /^http/.test(endpoint) ?  endpoint : this.url + '/' + endpoint;

    return this.http.get( url, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {

    options = this.defaultOptions.merge(options);

    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {

    options = this.defaultOptions.merge(options);

    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {

    options = this.defaultOptions.merge(options);

    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {

    options = this.defaultOptions.merge(options);

    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  upload(endpoint: string, body: any, options?: RequestOptions){
    
      options = this.defaultOptions.merge(options);

      if(!options){
          options = new RequestOptions();
      } 
      
      if(!options.headers){
           options.headers = new Headers();
      }

      options.headers.append('enctype', 'multipart/form-data');

      return this.post(endpoint , body, options);
  }

}
