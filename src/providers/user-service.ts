import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
//import 'rxjs/add/operator/toPromise';

import { GlobalData } from './GlobalData';
import { HttpService} from './http-service';
import { UserModel } from './../models/user-model';
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
 
    private updateUrl: string = 'users/';
    private loginUrl:  string = 'users/login';
    private logoutUrl: string = 'users/logout';
    private signupUrl: string = 'users/signup';
    private uploadUrl: string = 'users/upload';
    private smsUrl:    string = 'users/sms';
    

    constructor(
        private httpService: HttpService,
        private globalData: GlobalData,
    ) {

    }

    update(user: UserModel){
    
        user = Object.assign(this.getUser(),user);
        let id = user ? user.id : null;
        let updateUrl = this.updateUrl + id;
    
        let seq = this.httpService
                    .patch(updateUrl, user)
                    .share();
                    
        seq.map(res => res.json())
            .subscribe( res => this._loginInner(res));

        return seq;
    
    }


    uploadAvatar(user){
       
        let seq = this.httpService
              .post(this.uploadUrl, user)
              .share();

        seq.map(res => res.json())
            .subscribe( res => this._loginInner(res.data) );

        return seq;
      
    }

    signup(user) {
        
        let seq = this.httpService
                    .post(this.signupUrl, user)
                    .share();

        seq.map(res => res.json())
            .subscribe(
                res => {
                    this._loginInner(res.data);
                }, 
                err => {
                    console.error('ERROR', err);
                    
                }
            );

        return seq;
    
    }

    login(user: UserModel) {
        
        let seq = this.httpService
                    .post(this.loginUrl, user)
                    .share();
                    
        seq.map(res => res.json())
            .subscribe( 
                res => {
                    this._loginInner(res.data)
                },
                err => {
                    console.error('ERROR', err);
                    
                } 
            );

        return seq;
    
    }


    
    logout() {

        let seq = this.httpService
                    .get(this.logoutUrl)
                    .share();

        seq.subscribe( res => {
                this.setUser(null);
                 
            }
        );

        return seq;

    }


    getSmsCode(){
        return this.httpService
                .get(this.smsUrl)
                .map(data => data.json());
    }

     hasLogin(){
        return this.globalData.user ? true : false;
    }

    getUser():UserModel{
        return this.globalData.user;
    }

    setUser(account:UserModel){
        this.globalData.user = account;
    }

    private _loginInner(account: UserModel){
        this.globalData.user = account;
    }

    
 

}
