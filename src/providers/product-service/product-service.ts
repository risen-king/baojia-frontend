import { Injectable } from '@angular/core';

import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
 

//import { HttpService , CacheService  } from '../providers';
import { HttpServiceProvider as HttpService} from '../http-service/http-service';
import { CacheServiceProvider as CacheService} from '../cache-service/cache-service';
 


/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {

  listsUrl: string  = 'products';
  searchUrl: string = 'products/search/';
  pricesUrl: string = 'prices/index/';

  

  constructor(
        public http: HttpService,
        public cache: CacheService
    ) {
        console.log('Hello ProductServiceProvider Provider');
    }

  getList(page: string = '') :Promise<any>{
       
    let url = page ? page : this.listsUrl;
    
    let _data = this.cache.read( url ) as any[];

    if( _data = null ){
        return   Observable.of(_data ).toPromise();
    }


    return this.http.get(url)
                .toPromise()
                .then(resp => {
                        let _res = resp.json();
                        _res.items.map(function(item,index){
                            
                                let rand = Math.random()*(Math.random() > 0.5 ? 1:-1) ;
                                item.changed_rate = Math.floor(rand*100) ;
                            
                                return item;
                            })

                        this.cache.write(url, _res);

                        return  _res;
                })
                .catch(this.handleError);
      
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  search (term: string) {
      
      if(!term){
          return Observable.from([]);
      }

      let url = this.searchUrl + term;

      return this.http.get(url).map(resp => <any[]>resp.json().items);
  }


  getPrices(params?: any){

    let _data = this.cache.read(params.symbol);
    
    if(_data){

        return Observable.of(_data);

    }else{
        var url = this.pricesUrl + params.symbol;

        let seq = this.http.get(url)
                      .map(resp => {
                            let _data = resp.json();
                            this.cache.write(params.symbol , _data)
                            return  _data;
                      });
    
        
        return  seq;

    }

  }


}
