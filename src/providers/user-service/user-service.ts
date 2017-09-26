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

  private _user: UserModel;
  private _uCacheKey: string = 'user';

  private loginUrl:  string = 'users/login';
  private signupUrl: string = 'users/signup';
  private uploadUrl: string = 'users/upload';


  constructor(
      public http: HttpService,
      public cacheService: CacheService
  ) {

  }

  //获取缓存中的用户信息
  get user() { 

    let userAccount = <UserModel>this.cacheService.read(this._uCacheKey);

    if( userAccount && !userAccount.avatar ){
        userAccount.avatar = './assets/img/sarah-avatar.png.jpeg';
    }
     
    return  userAccount;
  }


  //设置用户信息
  set user(userAccount: UserModel){
 
      this.cacheService.write(this._uCacheKey, userAccount);
      
  }
  
  //获取用户令牌
  get token(): string {
      return this.user ? this.user.access_token : null;
  }

  update(user: UserModel){
      
      let _user = this.user;
      
      this.user = Object.assign(_user,user);

      return true;

  }

   uploadAvatar(user){
     
    return this.http
              .upload(this.uploadUrl, user);

  }

   /**
   * Log the user out, which forgets the session
   */
  logout() {
      this.user = null;
  }


  hasLogin(){
      return this.user ? true : false;
  }


  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(user: UserModel) {
     
      let seq = this.http
                  .post(this.loginUrl, user)
                  .share();

                  
      seq.map(res => res.json())
        .subscribe(
            res => {

                  if (res.status == 'success') {
                      //保存用户登陆信息
                      this.user = res.data;  
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
                  // If the API returned a successful response, mark the user as logged in
                  if (res.status == 'success') {
                      this.user = res.data; 
                  }
              }, 
              err => {
                  console.error('ERROR', err);
                  
              }
          );

      return seq;
 
  }



 

 


}
