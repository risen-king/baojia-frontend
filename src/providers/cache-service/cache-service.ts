import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the CacheServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CacheServiceProvider {

  constructor() {
    
  }

  write(key: string, value: any) {
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }

    read<T>(key: string): T {
        let value: string = localStorage.getItem(key);

        if (value && value != "undefined" && value != "null") {
            return <T>JSON.parse(value);
        }

        return null;
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    clear() {
        sessionStorage.clear();
    }

}
