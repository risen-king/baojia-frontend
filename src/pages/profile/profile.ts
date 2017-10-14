import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController  } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';


import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { ImgService }     from '../../providers/providers';
import { UserService }     from '../../providers/providers';
import { UserModel }     from '../../models/user-model';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  pageTitle: string = '个人信息';
  user: any;
  form: FormGroup;

 
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public userService: UserService,
      public modalCtrl: ModalController,
      public imgService: ImgService

  ) {

      if(!this.userService.hasLogin()){
          this.navCtrl.push('LoginPage');
      }
 
  }

  ionViewWillEnter() { 
      this.user = this.userService.getUser();  
  }

  logOut(){
    this.userService.logout();

    let modal = this.modalCtrl.create('LoginPage');
    modal.present();
  }

 
   

  getPicture() {

    this.imgService.getPictureHtml5()
        .subscribe(data=>{
  
           this.userService
                .uploadAvatar({"avatar":data})
                .map(res => res.json())
                .subscribe((data)=>{
                    console.log(data)
                    
                });

        } );


  }

  goCharge(){
    this.navCtrl.push('ChargePage');
  }


  goCredit(){
    this.navCtrl.push('MimeCreditPage');
  }



  goEmailEdit(){

    this.navCtrl.push('MineEmailEditPage');
  
  }

  goMobileEdit(){
    
    this.navCtrl.push('MineMobileEditPage');
   
  }

  goNicknameEdit(){
    this.navCtrl.push('MineNicknameEditPage');

  }

  goNameEdit(){

    this.navCtrl.push('MineNameEditPage');

  }



}
