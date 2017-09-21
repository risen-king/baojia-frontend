import { Injectable } from '@angular/core';
 
 

import { Subject }          from 'rxjs/Subject';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
 
import { CacheServiceProvider as CacheService} from '../cache-service/cache-service';


/*
  Generated class for the BdmapServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BdmapService {

  constructor(
      public storageService: CacheService) {
         
  }
  
  //获取当前经纬度
  getCurrentPosition(interval:number = 0) :Subject<any>{

        let subject = new Subject<any>();
         
        let fn = ()=>{

            let point = this.storageService.read('current_point')
             
            if(point){
                this.storageService.remove('current_point');
                subject.next(point);
                
                return  subject
            }


            let geolocation = new BMap.Geolocation();
            
            geolocation.getCurrentPosition( (rs: BMap.GeolocationResult) => {
                
                let status = geolocation.getStatus();
                
                if(status === BMAP_STATUS_SUCCESS){
                    subject.next(rs.point);
                    this.storageService.write('current_point',rs.point)
                }else{
                    //throw new Error("无法获取地理定位...");
                } 
                
        
            },{enableHighAccuracy: true} );

        }

        if(interval <= 0){
            fn();
        }else{
            setInterval(fn,interval)
        }
 
        return subject;
         
}

  //根据经纬度获取地址对象
  getLocation(point: BMap.Point) : Subject<BMap.GeocoderResult>{
        
      let subject = new Subject<BMap.GeocoderResult>();
        
      var geoc = new BMap.Geocoder(); 

      geoc.getLocation(point, (result:BMap.GeocoderResult)=> subject.next(result) );
       
      return subject;
  }

  search(term:string,map:BMap.Map) :Subject<any>{

      let  subject = new Subject<any>();
      
      let local = new BMap.LocalSearch(map, {
                onSearchComplete: ( results:any )=>{
                     
                    let _items = [];
                    let _total = results.getCurrentNumPois();
                    for (var i = 0; i < _total; i ++){      
                        _items.push(results.getPoi(i));      
                    }
                    subject.next(_items);   
                }
          });      
      
      local.search(term);

      return subject;
  }


  driving(startPoint:any,endPoint:any,map:any) :Subject<any>{

    let  subject = new Subject<any>();
    
    let  driving = new BMap.DrivingRoute(map, {
            renderOptions:{map: map, autoViewport: true},
            onSearchComplete: (results)=>{
                    if (driving.getStatus() != BMAP_STATUS_SUCCESS){
                        return ;
                    }
                    var plan = results.getPlan(0);

                    var data = {
                        distance:plan.getDistance(true),
                        time:plan.getDuration(true)
                    }
                    console.log(plan);

                    subject.next(data);
                }
                            
        });
    
    driving.search(startPoint, endPoint);
    return subject;

    
  }

}
