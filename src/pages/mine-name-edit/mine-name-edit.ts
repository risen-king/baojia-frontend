import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { UserService }     from '../../providers/user-service/user-service';
import { NoticeService }   from '../../providers/notice-service/notice-service';

import { UserModel }     from '../../models/user-model';

/**
 * Generated class for the MineNameEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine-name-edit',
  templateUrl: 'mine-name-edit.html',
})
export class MineNameEditPage {

  public pageTitle: string  = '修改用户名';
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
    console.log('ionViewDidLoad MineNameEditPage');
    
  }

  get user (){
     return this.userService.getUser();
  }

  initForm(){
 

        this.profileForm = this.formBuilder.group({
            username: ['', Validators.compose([
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
