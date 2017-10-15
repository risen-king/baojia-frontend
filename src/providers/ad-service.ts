import { Injectable } from '@angular/core';
//import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpService} from './http-service';
 

/*
  Generated class for the AdServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdService {

  listUrl: string   = 'ads';

  constructor(
    public http: HttpService,
     
  ) {
      //console.log('Hello AdService Provider');
  }


  public getList(placleid:number=1) {
     
    let url:string = this.listUrl;
 
    return this.http.get(url)
              .map( resp => {
                  let _res = resp.json();
                   
                  return _res;

              });
    
  }

}
