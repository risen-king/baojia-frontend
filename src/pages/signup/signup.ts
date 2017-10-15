import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

import { UserService }     from '../../providers/providers';
import { NoticeService }   from '../../providers/notice-service/notice-service';

import { SMS_TIME,SMS_TITLE }     from '../../providers/Constant';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  //页面标题
  public pageTitle: string = '注册';
  public signupForm: FormGroup;

  
 

  public sms = {
      code : '',     //验证码
      title:SMS_TITLE,//点击获取验证码按钮显示的文字
      active:true    //点击获取验证码按钮是否激活

  };


  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public userService: UserService,
      public noticeService: NoticeService,
  ) {
        this.initForm();
      
  }

   

  initForm(){

      this.signupForm = this.formBuilder.group({
            mobile: ['', Validators.compose([
                              Validators.minLength(3), 
                              Validators.maxLength(11), 
                              Validators.required, 
                              Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$") 
                            ])
                    ],
            
            password: ['', Validators.compose([
                              Validators.minLength(3),
                               Validators.maxLength(11), 
                              Validators.required, 
                            ])
                    ],

            repassword: ['', Validators.compose([
                              Validators.minLength(3), 
                              Validators.maxLength(11), 
                              Validators.required, 
                            ])
                    ],
            code: ['', Validators.compose([
                              Validators.required,
                              Validators.minLength(3), 
                              Validators.maxLength(6), 
                                
                            ])
                    ]
      
        });

      
  }

  //操作
  doSignup(data) {

     console.log(data)

     if(data.code != this.sms.code){
         this.noticeService.showToast('验证码错误',NoticeService.TOAST_POS_MIDDLE);
         return ;
     } 
    

    this.userService
        .signup(data)
        .map(res => res.json())
        .subscribe( 
            res => {
                this.navCtrl.pop();
            },
            err => {
                this.noticeService.showToast(err,NoticeService.TOAST_POS_MIDDLE);
            }
        );
  }

 

  //获取验证码
  getCode(event){
   
      this.userService
        .getSmsCode()
        .subscribe((res)=>{
            this.sms.code = res.data
            console.log(res);

             Observable
                .timer(100,1000)
                .take(SMS_TIME + 1)
                .subscribe(ticker => {

                    if( SMS_TIME > ticker ){
                        this.sms.active = false;
                        this.sms.title = (SMS_TIME - ticker )+ ' s'
                    }else{
                        
                        this.sms.active = true;
                        this.sms.title = SMS_TITLE;

                }
            
            });
 
        });

   
  }

 

}
