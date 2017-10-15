import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, RequestMethod, URLSearchParams,Headers } from '@angular/http';

import {Observable, TimeoutError} from "rxjs";
import 'rxjs/add/operator/map';


import { GlobalData } from './GlobalData';
import { REQUEST_URI,REQUEST_TIMEOUT } from './Constant';
import { SystemService } from './system-service';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpService {

  headers: Headers;
  defaultOptions: RequestOptions;
  url: string = REQUEST_URI;
  


  constructor(
    private http: Http,
    private systemService: SystemService,
    private globalData : GlobalData
  ) {
  
  }

  public request(url:string, options:RequestOptionsArgs): Observable<Response>{

    url = url.startsWith('http') ? url : REQUEST_URI + url;
    this.optionsAddToken(options);

    return Observable.create(observer => {
       console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);

       this.http.request(url, options).timeout(REQUEST_TIMEOUT).subscribe(res => {
            this.systemService.hideLoading();
            console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
            if(res['_body'] == ''){
               res['_body'] = null;
            }

            //let _res = res.json();

            observer.next(res);
       }, err => {
          this.requestFailed(url,options,err);
          observer.error(err);
       });

    });


  }

  private optionsAddToken(options: RequestOptionsArgs): void {
   
      let token = 'Bearer '+ this.globalData.token;

      if(options.headers) {
        options.headers.append('Authorization',token);
      }else{
        options.headers = new Headers({
            'Authorization':token
        });
      }
  }

  /**
   * 处理请求失败事件
   * @param url
   * @param options
   * @param err
   */
  private requestFailed(url: string, options: RequestOptionsArgs, err: Response): void {
    
    this.systemService.hideLoading();
    
    console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', err);
    
    if (err instanceof TimeoutError) {
      this.systemService.alert('请求超时,请稍后再试!');
      return;
    }

    if (!this.systemService.isConnecting()) {
      this.systemService.alert('请求失败，请连接网络');
      return;
    }
    
    let msg = '请求发生异常';
    try {
      let result = err.json();
      this.systemService.alert(result.message || msg);
    } catch (err) {
      let status = err.status;
      if (status === 0) {
        msg = '请求失败，请求响应出错';
      } else if (status === 404) {
        msg = '请求失败，未找到请求地址';
      } else if (status === 500) {
        msg = '请求失败，服务器出错，请稍后再试';
      }
      this.systemService.alert(msg);
      // this.logger.httpLog(err, msg, {
      //   url: url,
      //   status: status
      // });
    }

  }

  /**
   * 将对象转为查询参数
   * @param paramMap
   * @returns {URLSearchParams}
   */
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      // if (val instanceof Date) {
      //   val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      // }
      params.set(key, val);
    }
    return params;
  }

 

  public get(url: string, paramMap: any = null) : Observable<Response>{

     let options = new RequestOptions({
       method: RequestMethod.Get,
       search: HttpService. buildURLSearchParams(paramMap)
     });

     return this.request(url,options);
  }

   public post(url: string, body: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: body,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }));
  }

  public postFormData(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      search: HttpService.buildURLSearchParams(paramMap).toString(),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }));
  }

  public upload(url: string, paramMap: any = null){

    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      search: HttpService.buildURLSearchParams(paramMap),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'enctype':'multipart/form-data'
      })
    }));
 
  }

  public put(url: string, body: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Put,
      body: body
    }));
  }

  public delete(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Delete,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public patch(url: string, body: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Patch,
      body: body
    }));
  }

  public head(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Head,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public options(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Options,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

 
}
