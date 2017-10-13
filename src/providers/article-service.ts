import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { HttpServiceProvider as HttpService} from './http-service/http-service';
import { CacheServiceProvider as CacheService} from './cache-service/cache-service';
import { ArticleModel } from './../models/article-model';

/*
  Generated class for the ArticleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArticleService {

  listUrl: string   = 'articles';
  detailhUrl: string = 'articles/';
  searchUrl: string  = 'articles/search/';
  

  constructor(
    public http: HttpService,
    public cache: CacheService,
    public jsonp: Jsonp) {
        console.log('Hello ArticleServiceProvider Provider');
  }



  public getList(pageUrl:string|null = '') {
     
    let url:string;

    if(pageUrl === null){
        return   Observable.empty().toPromise();
    }else{
       url = pageUrl ? pageUrl : this.listUrl;
    }

    
    // let _data = this.cache.read( url ) as any[];
    // if( _data = null ){
    //     return   Observable.of(_data ).toPromise();
    // }
  

    return this.http.get(url)
              .map( resp => {
                  
                  let _res = resp.json();

                  this.cache.write(url, _res);
                  
                  return _res;

              }).toPromise();
              
        
         
  }

  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getArticle(id: number){

    return this.http.get( 'articles/'+id )
        .map(resp => <ArticleModel>resp.json())
        .toPromise();

  }

  search (term: string) {
      
      if(!term){
          return Observable.from([]);
      }

      let url = this.searchUrl + term;

      return this.http.get(url).map(resp => <any[]>resp.json().items);
  }

  search0 (term: string) {
      let wikiUrl = 'http://en.wikipedia.org/w/api.php';
      
      let queryString =`?search=${term}&action=opensearch&format=json&callback=JSONP_CALLBACK`;

      return this.jsonp
              .get(wikiUrl + queryString)
              .map(response => {
                    let _data = response.json()[1];
                    
                    let newsItems: Array<ArticleModel>;
                    newsItems = _data.map(item => {   
                                    let newsItem = new ArticleModel();
                                    newsItem.title = item;
                                    newsItem.thumb = '';
                                    return newsItem;
 
                                });

                    return newsItems;

              });
  }




}
