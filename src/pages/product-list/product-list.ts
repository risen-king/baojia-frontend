import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Observable }  from 'rxjs/Observable';

import { ProductService } from '../../providers/providers';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
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
       
      this.initProducts(); 
  }

  initProducts(page:string=''):void{
       
      this.productService
          .getList(page)
          .subscribe( data =>  {

              let result = this._handleData(data);
                   
              this.nextPage = result.nextPage;
              this.items    = result.items;

               
                    
              } 
          );

  }

 

   doInfinite() {

       this.productService
          .getList(this.nextPage)
          .subscribe(data => {

              let result = this._handleData(data); 

              this.nextPage = result.nextPage;
              this.items = this.items.concat(result.items);
          });

     
  }

  doRefresh(refresher) {
 
      this.productService
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
