import { Component , ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { BdmapService } from '../../providers/bdmap-service/bdmap-service';

/**
 * Generated class for the BdmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bdmap',
  templateUrl: 'bdmap.html',
})
export class BdmapPage {

  @ViewChild('container') container: ElementRef;

  public defaultPoint: BMap.Point = new BMap.Point(121.455066,31.028308);//紫竹科学园区
  public currentAddr:any;
  public startPoint:BMap.Point;
  public endPoint:BMap.Point;


  public searchResult: BMap.LocalResultPoi;

  public mapNav = {
      start:null,
      end:null,
      time:'',
      distance:''
  };

  public map: BMap.Map;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public modalCtrl: ModalController,
      public bdmapService: BdmapService
    ) {
      
      this.searchResult = <BMap.LocalResultPoi>this.navParams.get('item');
      
      if(this.searchResult){
         
            this.mapNav.end = this.searchResult.title;
            this.driving(this.searchResult.point)
    
     }

     
  }

  ngOnInit(){
     
      this.loadMap(); 
  }




  loadMap(){   
   
      let map = new BMap.Map(this.container.nativeElement); 
      map.centerAndZoom(this.defaultPoint, 15);
      map.enableScrollWheelZoom();  
    
      this.bdmapService
          .getCurrentPosition()
          .subscribe((point)=>{   
             
              this.startPoint = point;

              map.centerAndZoom(point, 15);
              map.panTo(point);

              // 创建标注
              var marker = new BMap.Marker(point);  
              map.addOverlay(marker);      
              marker.setAnimation(BMAP_ANIMATION_BOUNCE);  

          },(err)=>console.log(err));

      this.map = map;
    
        
    }

    //规划开车路线
    driving(endPoint){

        this.bdmapService.getCurrentPosition()
            .subscribe(point=>{
                  
                this.bdmapService.driving(point,endPoint,this.map)
                    .subscribe(data=>{
                        Object.assign(this.mapNav,data);
                        
                        console.log(this.mapNav);
                    
                    });
            
        }) 

    }


    //导航
    startNav(){
       
        // var myIcon =  new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
        //         //offset: new BMap.Size(0, -5),    //相当于CSS精灵
        //         imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
        //     });
        // var marker = new BMap.Marker(this.startPoint,{icon:myIcon});  // 创建标注
        // console.log(this.startPoint);
        // this.map.addOverlay(marker);

        // this.bdmapService
        //     .getCurrentPosition(2000)
        //     .subscribe((point)=>{
        //         console.log(point);
        //         //carMk.setPosition(point);    
        //     })

        

        this.bdmapService
          .getCurrentPosition()
          .subscribe((point)=>{

              this.bdmapService
                .getLocation(point)
                .subscribe((result: BMap.GeocoderResult)=>{
                      let origin      = `latlng:${point.lat},${point.lng}|name:${result.address}`;
                      let destination = `latlng:${this.searchResult.point.lat},${this.searchResult.point.lng}|name:${this.searchResult.title}`;

                      window.location.href = `bdapp://map/direction?origin=${origin}&destination=${destination}&mode=driving`;


                });


              
               

              

          },(err)=>console.log(err));
        
        

        
        
        
       
 
    }


    goSearch(){
        this.navCtrl.push('BdmapSearchPage',{"map":this.map});
    }

}
