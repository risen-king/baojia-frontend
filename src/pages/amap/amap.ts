import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ImgService }     from '../../providers/providers';


/**
 * Generated class for the AmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var LocationPlugin; 

@IonicPage()
@Component({
  selector: 'page-amap',
  templateUrl: 'amap.html',
})
export class AmapPage {
  
  url :string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public imgService: ImgService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AmapPage');

     
  }


  
  getLocation(){ 
    LocationPlugin.getLocation(data => { 
        alert(JSON.stringify(data)) 
      }, msg => { 
        alert(JSON.stringify(msg))
      });
   }

 
 

}
