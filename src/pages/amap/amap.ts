import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ImgService }     from '../../providers/providers';

import {Camera, CameraOptions} from "@ionic-native/camera";

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
    public camera: Camera,
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

  getPicture(){

    //this.imgService.getPictureHtml5();
 

    // const  options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    // alert(options);

    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   this.url = 'data:image/jpeg;base64,' + imageData;
 
    // }, (err) => {
    // // Handle error
    // });
    
  }

 

}
