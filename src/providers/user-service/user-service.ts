import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/toPromise';

import { HttpServiceProvider as HttpService} from '../http-service/http-service';
import { CacheServiceProvider as CacheService} from '../cache-service/cache-service';

import { UserModel } from '../../models/user-model';
/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UserService {


  private _uCacheKey: string = 'user';

  private loginUrl:  string = 'users/login';
  private signupUrl: string = 'users/signup';
  private uploadUrl: string = 'users/upload';
  
  private updateUrl: string = 'users/'


 


  constructor(
      public http: HttpService,
      public cacheService: CacheService
  ) {

        

  }

 

  update(user: UserModel){
  
      user = Object.assign(this.getUser(),user);

      let id = user ? user.id : null;

      let updateUrl = this.updateUrl + id;
 
      let seq = this.http
                  .patch(updateUrl, user)
                  .share();

                  
      seq.map(res => res.json())
        .subscribe(
            res => {
                  if (res.status == 'success') {
                     
                  } 

                   //保存用户登陆信息
                    this.loginInner(res);
              }
          );

      return seq;

   

  }

   uploadAvatar(user){
       
        let seq = this.http
              .upload(this.uploadUrl, user)
              .share();

        seq.map(res => res.json())
        .subscribe(
           
            res => {
                  if (res.status == 'success') {
                      //保存用户登陆信息
                      this.loginInner(res.data);
                  } 
                  
            }
          );

        return seq;
      

  }


 
  login(user: UserModel) {
     
      let seq = this.http
                  .post(this.loginUrl, user)
                  .share();

                  
      seq.map(res => res.json())
        .subscribe(
            res => {
                  if (res.status == 'success') {
                      //保存用户登陆信息
                      this.loginInner(res.data);
                  } 
              }
          );

      return seq;
 
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(user) {
    
      let seq = this.http
                .post(this.signupUrl, user)
                .share();

      seq.map(res => res.json())
          .subscribe(
              res => {
                  //自动登陆
                  if (res.status == 'success') {
                      this.loginInner(res.data);
                  }
              }, 
              err => {
                  console.error('ERROR', err);
                  
              }
          );

      return seq;
 
  }

   


  hasLogin(){
      return this.getUser() ? true : false;
  }

  loginInner(user: UserModel){
        this.setUser(user);
  }

  /**
   *  退出
   */
  logout() {
      this.setUser(null);
  }


  //获取缓存中的用户信息
  getUser(){
      let userAccount = <UserModel>this.cacheService.read(this._uCacheKey);

      // if( userAccount && !userAccount.avatar ){
    //     userAccount.avatar = './assets/img/sarah-avatar.png.jpeg';
    // }
 
      return  userAccount;
  }

  


  //设置用户信息
  setUser(userAccount: UserModel){
 
      this.cacheService.write(this._uCacheKey, userAccount);
      
  }
  
  //获取用户令牌
  get token(): string {
      
      return this.getUser() ? this.getUser().access_token : null;
  }



}
