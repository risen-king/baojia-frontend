import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

import { UserService }     from '../../providers/user-service/user-service';
import { NoticeService }   from '../../providers/notice-service/notice-service';

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

  //点击获取验证码按钮显示的文字
  public codeButtonTitle:string = '发送验证码';
  //点击获取验证码按钮是否激活
  public codeButtonActive: boolean = true;

  public submitButtonStatus:boolean = false;

  private signupErrorString: string = 'SIGNUP_ERROR';

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public userService: UserService,
      public noticeService: NoticeService,
  ) {

      
  }

  ngOnInit(): void {
      this.initForm();
  }


  initForm(){

      this.signupForm = this.formBuilder.group({
            mobile: ['', Validators.compose([
                              Validators.minLength(3), Validators.maxLength(11), 
                              Validators.required, 
                              Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$") 
                            ])
                    ],
            
            password: ['', Validators.compose([
                              Validators.minLength(3), Validators.maxLength(11), 
                              Validators.required, 
                            ])
                    ],

            repassword: ['', Validators.compose([
                              Validators.minLength(3), Validators.maxLength(11), 
                              Validators.required, 
                            ])
                    ],
            code: ['', Validators.compose([
                              Validators.required,
                              Validators.minLength(3), Validators.maxLength(6), 
                                
                            ])
                    ]
      
        });

      
  }

  //操作
  doSignup(data) {

    this.userService
        .signup(data)
        .map(res => res.json())
        .subscribe( res => {
            if(res.status ==='error'){
                this.noticeService.showToast(res.message,NoticeService.TOAST_POS_MIDDLE);
            }
            console.log(res)

            //this.navCtrl.pop();
        });
  }

 

  //获取验证码
  getCode(event){
      
      let totalCount = 30;
      let _title =  this.codeButtonTitle;
      

      let timer = Observable.timer(100,1000).take(totalCount+1);

      timer.subscribe(x => {
          
          let diff =  totalCount - x ;

          if( diff > 0 ){
              this.codeButtonActive = false;
              this.codeButtonTitle = (totalCount - x )+ ' s'
          }else{
               
              this.codeButtonActive = true;
              this.codeButtonTitle = _title;

              this.submitButtonStatus = true;
          }
          
          console.log(diff);

          
      });

   
  }

 

}
