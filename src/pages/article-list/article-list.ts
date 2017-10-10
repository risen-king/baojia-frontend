import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';

import { ArticleServiceProvider as ArticleService } from '../../providers/article-service/article-service';

import { ArticleModel } from '../../models/article-model';

/**
 * Generated class for the ArticleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-article-list',
  templateUrl: 'article-list.html',
})
export class ArticleListPage {

  public pageTitle: string = '最新资讯';
  public nextPage : string = '';
  public items: ArticleModel[];

  @ViewChild('mySlider') slider:Slides;

   mySlideOptions={
      autoplay:2000,
      initialSlide:0,
      pager:true,
      loop:true,
      speed:300
  };
  

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public articleService: ArticleService,
    ) {
      
        
           
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleListPage');

    this.getArticles();
  }

  getArticles(pageUrl:string|null = '') {
   
    return this.articleService
            .getList(pageUrl)
            .then( data =>  {
                    this.nextPage = data._links && data._links.next ? data._links.next.href : null;
                    this.items = data.items ? data.items : [] ;  
                    return this.items;
                  } 
            );
         
          
  }

  doInfinite(infiniteScroll) {
      console.log('Begin async operation');

      if(this.nextPage === null ){
         infiniteScroll.enable(false);

      }
  

      return this.getArticles(this.nextPage)
            .then(data => this.items = this.items.concat(data) );
 
      
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);

    setTimeout(() => {
      //console.log('Async operation has ended');

      this.getArticles(); 

      refresher.complete();
    }, 2000);
  }

  

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: ArticleModel) {
    this.navCtrl.push('ArticleDetailPage', {
      item: item
    });
  }

  goSearch(){
      this.navCtrl.push('ArticleSearchPage');
  }

}
