import { Injectable } from '@angular/core';
//import { Jsonp, URLSearchParams } from '@angular/http';

import { Observable }  from 'rxjs/Observable';
//import 'rxjs/add/observable/of';
//import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

import { HttpService} from './http-service';
 
//import { ArticleModel } from './../models/article-model';

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
    //public jsonp: Jsonp
    ) {
        console.log('Hello ArticleServiceProvider Provider');
    }



    getList(page:string|null = ''):Observable<any> {
        
        let url = page ? page : this.listUrl;
        
        return this.http.get(url)
                .map( resp => {
                    let _res = resp.json();

                    return _res;

                });
        
    }
  

    public getArticle(id: number){

        return this.http.get( 'articles/'+id )
            .map(resp => resp.json())
            .toPromise();

    }

    public search (term: string) {
        
        if(!term){
            return Observable.from([]);
        }

        let url = this.searchUrl + term;

        return this.http.get(url).map(resp => <any[]>resp.json().items);
    }

   

    //   search0 (term: string) {
    //       let wikiUrl = 'http://en.wikipedia.org/w/api.php';
        
    //       let queryString =`?search=${term}&action=opensearch&format=json&callback=JSONP_CALLBACK`;

    //       return this.jsonp
    //               .get(wikiUrl + queryString)
    //               .map(response => {
    //                     let _data = response.json()[1];
                        
    //                     let newsItems: Array<ArticleModel>;
    //                     newsItems = _data.map(item => {   
    //                                     let newsItem = new ArticleModel();
    //                                     newsItem.title = item;
    //                                     newsItem.thumb = '';
    //                                     return newsItem;
    
    //                                 });

    //                     return newsItems;

    //               });
    //   }



}
