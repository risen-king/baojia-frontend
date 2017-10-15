import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { UserService }     from '../../providers/providers';
import { NoticeService }   from '../../providers/notice-service/notice-service';


/**
 * Generated class for the MineMobileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine-mobile-edit',
  templateUrl: 'mine-mobile-edit.html',
})
export class MineMobileEditPage {

   //页面标题
  public pageTitle: string  = '修改手机';
  public profileForm: FormGroup;

  //点击获取验证码按钮显示的文字
  public codeButtonTitle:string = '发送验证码';
  //点击获取验证码按钮是否激活
  public codeButtonActive: boolean = true;

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
    console.log('ionViewDidLoad MineMobileEditPage');
  }


  

  get user (){
     return this.userService.getUser();
  }

  initForm(){
 

        this.profileForm = this.formBuilder.group({
            mobile: ['', Validators.compose([
                                Validators.minLength(3), Validators.maxLength(11), 
                                Validators.required, 
                                Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$") 
                            ])
                    ],
            code: ['', Validators.compose([
                                Validators.required,
                                Validators.minLength(3), Validators.maxLength(6), 
                                
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
            //this.initForm(this.editType);
            this.navCtrl.pop();
        });
 
  }
  
  //获取验证码
  getCode(event){
      let _title =  this.codeButtonTitle;

      let timer = Observable.timer(100,1000);

      let totalCount = 60;
      
      timer.subscribe(t => {
          totalCount = totalCount - 1;
          if( totalCount > 0){
              this.codeButtonActive = false;
              this.codeButtonTitle = totalCount + ' s'
          }else{
              
              timer.subscribe();
              
              this.codeButtonActive = true;
              this.codeButtonTitle = _title;
          }

          
      });
   
  }

}
