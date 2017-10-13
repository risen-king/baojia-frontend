import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Subject }          from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { ArticleService } from '../../providers/article-service';
import { ArticleModel } from '../../models/article-model';

/**
 * Generated class for the ArticleSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-search',
  templateUrl: 'article-search.html',
})
export class ArticleSearchPage {

  public pageTitle: string = '搜内容';

  public items: Array<ArticleModel>;
  public searchTermStream : Subject<any>;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public articleService: ArticleService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleSearchPage');
    this.searchTermStream = new Subject<string>();
       
       this.searchTermStream 
          .debounceTime(500)
          .distinctUntilChanged()
          .filter( term => {
               this.items = [];
               return term ? true : false;
          } )
          .switchMap(
              (term: string) => this.articleService.search(term)
          )
          .subscribe(
              data => this.items = data
          );
  }
  

  //search()方法通过subject的next()方法，将每个新搜索框的值添加到数据流中
  search(term:string) { 
   
      this.searchTermStream.next(term); 
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: ArticleModel) {
    this.navCtrl.push('ArticleDetailPage', {
      item: item
    });
  }

 

}
