import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/operator/map';


import { UserService }     from '../../providers/user-service/user-service';
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
      //public camera: Camera,
      public userService: UserService,

  ) {

      if(!this.userService.hasLogin()){
          this.navCtrl.push('LoginPage');
      }
 
  }

  ionViewWillEnter() { 

      this.user = this.userService.getUser();

      console.log(this.user);
  }

 
   

  getPicture() {

    
        let patch = () => {
            //this.user.avatar = dataUrl;
            //this.form.patchValue({ "file": dataUrl });
        }
    
        let dataUrl = new Subject<string>();

        dataUrl.subscribe((data)=>{
            this.user.avatar = data;
        });

        // if( this.cameraEnable ){
        //     this.camera.getPicture({
        //       destinationType: this.camera.DestinationType.DATA_URL,
        //       targetWidth: 96,
        //       targetHeight: 96
        //     }).then((data) => {

        //         let _dataUrl = 'data:image/jpg;base64,' + data;
        //         dataUrl.next(_dataUrl)
              

        //     }, (err) => {
              
        //         alert('Unable to take photo');
        //     })

        //     return ;
        // }

    
 
        this.fileInput.nativeElement.click();

        this.fileInput.nativeElement.onchange = (event) => {

              let file = event.target.files[0];
              let postParams:FormData = new FormData();
              postParams.append("avatar", file);
        
              this.userService
                .uploadAvatar(postParams)
                .map(res => res.json())
                .subscribe();

                let reader = new FileReader();
                reader.onload = (readerEvent) => {
                      
                        //获取 dataUrl 编码的文件数据
                        let  _dataUrl = (readerEvent.target as any).result;
                        dataUrl.next(_dataUrl)
                      
                    };
                    
                reader.readAsDataURL(file); 
            
        }

     
  }

  processWebImage(event) {
    
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

  goCharge(){
    this.navCtrl.push('ChargePage');
  }

}
