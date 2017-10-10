import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';

import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';

import { UserService }     from '../../providers/user-service/user-service';
import { NoticeService }   from '../../providers/notice-service/notice-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    defaultHistory: ['ProfilePage']
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  
})
export class LoginPage {
  pageTitle:string = '登陆';
  loginForm: FormGroup;
  

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public toastCtrl: ToastController,
      public userService: UserService,
      public noticeService: NoticeService,
      public modalCtrl: ModalController

  ) {
       
      this.initForm();

      if(this.userService.hasLogin()){

        this.navCtrl.push('ProfilePage');
        return ;
      }
      
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  initForm(){
      this.loginForm = this.formBuilder.group({
          login: ['', Validators.compose([
                              Validators.minLength(3), Validators.maxLength(11), 
                              Validators.required, 
                              Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$") 
                            ])
                ],
          password: ['', Validators.compose([Validators.required, Validators.minLength(6)]) ]
      });
  }

  get mobileMsg(){
    
    let loginCtr = this.loginForm.controls['login'];

    if( !loginCtr.touched ){
        return '';
    }
    
    if(  loginCtr.hasError('required') ){
         return   '* 请输入用户名';
    }
    
    if(  
        loginCtr.hasError('minlength')|| 
        loginCtr.hasError('maxlength')||
        loginCtr.hasError('pattern') 
    ){

          return  '* 请输入正确的电话号码';
        
      }
    
     
  }


  get passwordMsg(){
    
    let passwordCtr = this.loginForm.controls['password'];

    if(!passwordCtr.touched){
        return '';
    }

    if(  passwordCtr.hasError('required') ){
        return '* 请输入密码';
    } 

    if(  
        passwordCtr.hasError('minlength')|| 
        passwordCtr.hasError('maxlength')||
        passwordCtr.hasError('pattern') 
    ){
          return '* 密码长度最少为六位';
        
    } 
 
  }

  

  // Attempt to login in through our User service
  doLogin(user, _event) {
    console.log(user);

    _event.preventDefault();

    this.userService.login(user).map(res => res.json())
        .subscribe( resp => {

            if(resp.status === 'error'){
                return this.noticeService.showToast( resp.message,'top' );
            }

            let modal = this.modalCtrl.create('TabsPage');
            modal.present();


            //this.navCtrl.push('ProfilePage');

        });

  
  }

  signup() {
      this.navCtrl.push('SignupPage');
  }
  
   

}
