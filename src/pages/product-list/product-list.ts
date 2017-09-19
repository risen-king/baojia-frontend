import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

   doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite() {
    console.log('Begin async operation');

    return new Promise((resolve)=>{

        setTimeout(() => {
          for (let i = 0; i < 30; i++) {
              this.items.push( this.items.length );
          }

          console.log('Async operation has ended');
         
          resolve();

        }, 500);

    });

    
  }

}
