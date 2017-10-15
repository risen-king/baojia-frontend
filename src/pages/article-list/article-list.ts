import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';

import { ArticleService } from '../../providers/article-service';
import { AdService } from '../../providers/ad-service';

 

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
  public items: any[];
  public ads: any[];

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
      public adService: AdService,
    ) {
      
        
           
  }

  ionViewDidLoad() {

    this.initArticles();

    this.getAds();
  }

  initArticles() {
   
    return this.articleService
            .getList()
            .subscribe( data =>  {

                let result = this._handleData(data);
                    
                this.nextPage = result.nextPage;
                this.items    = result.items;
                    
              } 
          );
         
          
  }

  

  doInfinite(infiniteScroll) {
     
      this.articleService
        .getList(this.nextPage)
        .subscribe(data => {

              let result = this._handleData(data); 

              this.nextPage = result.nextPage;
              this.items = this.items.concat(result.items);
          });

       
      
  }
 


   doRefresh(refresher) {
 
      this.articleService
          .getList()
          .subscribe( data =>  {    
                
              let result = this._handleData(data);
                   
              this.nextPage = result.nextPage;
              this.items    = result.items;

              refresher.complete();
                    
          });
  }

   private _handleData(data):any{
      let _nextPage = data._links && data._links.next ? data._links.next.href : '';
      let _items    =  data.items ? data.items : [] ;

      return {
        nextPage : _nextPage,
        items : _items
      };
  }



  getAds(){
    this.adService.getList().subscribe(
      (data)=>{
        this.ads = data.items;
        
      }
    );
  }

  

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    this.navCtrl.push('ArticleDetailPage', {
      item: item
    });
  }

  goSearch(){
      this.navCtrl.push('ArticleSearchPage');
  }

}
