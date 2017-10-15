import { Injectable } from '@angular/core';

import { CacheServiceProvider as CacheService} from './cache-service/cache-service';

import { UserModel } from './../models/user-model';
 
/*
  Generated class for the SystemServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalData {

  constructor(
        private cacheService: CacheService,
    ) {

    }

  private _user:UserModel|null;

  private _uCacheKey: string = 'user';

  
  get user():UserModel{

      if(!this._user){
        this._user = this.cacheService.read(this._uCacheKey)
      } 

      return this._user;
  }
  
  set user(account:UserModel) {
      this._user = account;
      this.cacheService.write(this._uCacheKey,this._user);

  }

  get token(): string {

    return this.user ? this.user.access_token : null;
  }

 

}
