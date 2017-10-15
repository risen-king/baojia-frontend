import { Injectable } from '@angular/core';

import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
 

//import { HttpService , CacheService  } from '../providers';
import { HttpService} from './http-service';
 
 
 

/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductService {

  listsUrl: string  = 'products';
  searchUrl: string = 'products/search/';
  pricesUrl: string = 'products/prices/';

  

    constructor(
            public httpService: HttpService
    ) {
            //console.log('Hello ProductServiceProvider Provider');
    }

    getList(page: string = '') :Observable<any>{
        
        let url = page ? page : this.listsUrl;

        return this.httpService
                .get(url)
                .map(resp => { 
                    let _res = resp.json();

                    //修改数据
                    _res.items.map(function(item,index){
                            let rand = Math.random()*(Math.random() > 0.5 ? 1:-1) ;
                            item.rate = Math.floor(rand*100) ;
                        
                            return item;
                    })

                    return  _res;
                });
                    
        
    }

 

    search (term: string) {
        
        if(!term){
            return Observable.from([]);
        }

        let url = this.searchUrl + term;

        return this.httpService.get(url).map(resp => <any[]>resp.json().items);
    }


    getPrices(params?: any){

        // let _data = this.cache.read(params.symbol);
        // if(_data){
        //     return Observable.of(_data);
        // }

        let url = this.pricesUrl + params.symbol;

        return this.httpService
                    .get(url)
                    .map(resp => {
                        let _data = resp.json();
                        //this.cache.write(params.symbol , _data)
                        return  _data;
                    });
    
    }



}
