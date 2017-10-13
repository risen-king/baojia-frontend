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

    this.getList();
  }

  getList(pageUrl:string|null = '') {
   
    return this.creditService
            .getList(pageUrl)
            .then( data =>  {
                    console.log(data);
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
  

      return this.getList(this.nextPage)
            .then(data => this.items = this.items.concat(data) );
 
      
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);

    setTimeout(() => {
      //console.log('Async operation has ended');

      this.getList(); 

      refresher.complete();
    }, 2000);
  }

  

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item) {
    /*empty */
  }


}
