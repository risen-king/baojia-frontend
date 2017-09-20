import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 

import { ProductService } from '../../providers/providers';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  public pageTitle: string = '市场走势';
  public error: string;

  public items : Array<any>;
  public nextPage : string = '';

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public productService:ProductService
    ) {
       
      this.getProducts(); 
  }

  getProducts(page:string=''):Promise<any>{
    return this.productService
            .getList(page)
            .then( data =>  {
                    
                    this.nextPage = data._links && data._links.next ? data._links.next.href : '';

                    this.items = data.items ? data.items : [] ;

                    return this.items;
                    
                  } 
            );
          
  }

   doInfinite() {
      console.log('Begin async operation');

      return this.getProducts(this.nextPage)
            .then(data => this.items = this.items.concat(data) );
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);

    setTimeout(() => {
      //console.log('Async operation has ended');

      this.getProducts(); 

      refresher.complete();
    }, 2000);
  }

 


 

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
      this.navCtrl.push('ProductDetailPage', {
          item: item
      });
  }

  goSearch(){
      this.navCtrl.push('ProductSearchPage');
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

   

}
