import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { CreditService } from '../../providers/credit-service';

/**
 * Generated class for the MimeCreditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mime-credit',
  templateUrl: 'mime-credit.html',
})
export class MimeCreditPage {

  pageTitle: string = '积分明细';
  public nextPage : string = '';
  public items: any[];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public creditService : CreditService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MimeCreditPage');

    this.initCredits();
  }

  initCredits(pageUrl:string|null = '') {
   
    return this.creditService
            .getList()
            .subscribe( data =>  {
                    let result = this._handleData(data);
                    this.nextPage = result.nextPage;
                    this.items    = result.items;
                  } 
            );
         
          
  }

  doInfinite(infiniteScroll) {
      console.log('Begin async operation');

      if(this.nextPage === null ){
         infiniteScroll.enable(false);
      }else{
          this.creditService
          .getList(this.nextPage)
          .subscribe(data => {

              let result = this._handleData(data); 

              this.nextPage = result.nextPage;
              this.items = this.items.concat(result.items);
          });
      }
  
 
 
      
  }

  doRefresh(refresher) {
 
      this.creditService
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
  openItem(item) {
    /*empty */
  }


}
