import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController  } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';


import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/operator/map';


import { UserService,ImgService }     from '../../providers/providers';


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
  user: UserModel;
  form: FormGroup;

  cameraEnable: boolean = false;

  @ViewChild('fileInput') fileInput;

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

      console.log(this.user);
  }

  logOut(){
    this.userService.logout();

    let modal = this.modalCtrl.create('LoginPage');
    modal.present();
  }

 
   

  getPicture() {

        this.imgService.showPicActionSheet();
  }

  goCharge(){
    this.navCtrl.push('ChargePage');
  }



  editEmail(){

    this.navCtrl.push('ProfileEditPage',{type:'email'});
  
  }

  editMobile(){
    
    this.navCtrl.push('ProfileEditPage',{type:'mobile'});
   
  }

  editNickname(){
    this.navCtrl.push('ProfileEditPage',{type:'nickname'});

  }

  editUsername(){

    this.navCtrl.push('ProfileEditPage',{type:'username'});

  }



}
