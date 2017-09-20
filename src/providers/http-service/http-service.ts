import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  url: string = 'http://api.baojia.local/v1';

  constructor(public http: Http) {
    console.log('Hello HttpServiceProvider Provider');
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

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
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  upload(endpoint: string, body: any, options?: RequestOptions){
      

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
