import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Subject }          from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';


import { ProductService } from '../../providers/providers';

/**
 * Generated class for the ProductSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-search',
  templateUrl: 'product-search.html',
})
export class ProductSearchPage {

  items: Array<any>;
  searchTermStream : Subject<any>;
  

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private productService: ProductService) {

      this.searchTermStream = new Subject<string>();
 
       this.searchTermStream 
          .debounceTime(500)
          .distinctUntilChanged()
          .filter( term => {
               this.items = [];
               return term ? true : false;
          } )
          .switchMap(
              (term: string) => this.productService.search(term)
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
  openItem(item) {
      this.navCtrl.push('ProductDetailPage', {
        item: item
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSearchPage');
  }

}
