import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ArticleService } from '../../providers/article-service';
import { ArticleModel } from '../../models/article-model';

/**
 * Generated class for the ArticleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {
  public pageTitle:string;

  public item: ArticleModel;
  

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public articleService: ArticleService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDetailPage');

    let item = this.navParams.get('item');
    let id = (item && item.id) ? item.id : 1;
    this.articleService
      .getArticle(id)
      .then((data)=>{

          this.item = data;
          this.pageTitle = data.title;

          return this.item;


      });
  }

}
