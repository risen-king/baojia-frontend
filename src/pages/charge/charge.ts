import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChargePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charge',
  templateUrl: 'charge.html',
})
export class ChargePage {
  public type:string = 'alipay';
  public count:number = 100;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChargePage');
  }

  swtichType($event){
     console.log($event.target)
  
  }

  get diagnostic(){
      return JSON.stringify({
        "type":this.type,
        "account":this.count
      });
      
  }



}
