import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

 
import { Subject }          from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { BdmapService } from '../../providers/bdmap-service/bdmap-service';

/**
 * Generated class for the BdmapSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bdmap-search',
  templateUrl: 'bdmap-search.html',
})
export class BdmapSearchPage {

  public map : BMap.Map;
  public searchTermStream : Subject<any>;
  public items: Array<any>;

  constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public bdmapService: BdmapService
  ) {

      this.map = this.navParams.get('map');

      console.log(this.map);
      this.searchTermStream = new Subject<string>();
  }

  ionViewDidLoad() {
    
  }

  ngOnInit(){
       
      
      this.searchTermStream 
          .debounceTime(500)
          .distinctUntilChanged()
          .filter( term => {
              this.items = [];
              return term ? true : false;
          } )
          .switchMap( (term: string) => {
              return this.bdmapService.search(term,this.map);
          })
          .subscribe( data => this.items = data );

   }

  //search()方法通过subject的next()方法，将每个新搜索框的值添加到数据流中
  search(term:string) { 
      
      this.searchTermStream.next(term); 
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    
    this.navCtrl.push('BdmapPage', {
      item: item
    });
  }

}
