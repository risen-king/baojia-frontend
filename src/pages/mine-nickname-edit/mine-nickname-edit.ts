import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { FormBuilder, FormGroup,Validators } from '@angular/forms';
//import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { UserService }     from '../../providers/providers';
import { NoticeService }   from '../../providers/notice-service/notice-service';

 
/**
 * Generated class for the MineNicknameEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine-nickname-edit',
  templateUrl: 'mine-nickname-edit.html',
})
export class MineNicknameEditPage {

  public pageTitle: string  = '修改昵称';
  public profileForm: FormGroup;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public userService: UserService,
      public noticeService: NoticeService
  ) {

    this.initForm();
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad MineNicknameEditPage');
  }

  get user (){
     return this.userService.getUser();
  }

  initForm(){
 

        this.profileForm = this.formBuilder.group({
            nickname: ['', Validators.compose([
                                Validators.required, 
                                Validators.minLength(3), Validators.maxLength(11), 
                            ])
                    ]
        
        });
      
      this.profileForm.patchValue(this.user);

  }

  submitForm(data, _event) {
    
    _event.preventDefault();
    console.log(data);
    this.userService
        .update(data)
        .subscribe((res)=>{
            this.navCtrl.pop();
        });
 
  }


}
