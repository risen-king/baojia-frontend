import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observer } from 'rxjs'
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/observable/never';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/switchMap';
 




import { ActionSheetController } from "ionic-angular";

import {Camera, CameraOptions} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {File, FileEntry} from "@ionic-native/file";

import { SystemService } from './system-service';
import { NoticeService } from "./notice-service/notice-service";
import { UserService } from "./user-service/user-service";

import { IMAGE_SIZE, QUALITY_SIZE,} from "./Constant";




/*
  Generated class for the ImgServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImgService {

  
  constructor(
    private camera: Camera,
    private imagePicker: ImagePicker,
    private file: File,
    private actionSheetCtrl: ActionSheetController,
    private systemService: SystemService,
    private noticeService: NoticeService,
    private userService: UserService
  ) {
      console.log('Hello ImgService');

  }


  showPicActionSheet() {

        // if( !this.systemService.isMobile () ){

        //   return this.getPictureHtml5();
        // }

      return Observable.create((observer)=>{

          this.actionSheetCtrl.create({
              title: '选择',
              buttons: [
                {
                  text: '拍照',
                  handler: () => {
                    
                    this.getPictureByCamera()
                        .subscribe( (data)=>observer.next(data) );
                  }
                },
                {
                  text: '从手机相册选择',
                  handler: () => {
                    this.getPictureByPhotoLibrary()
                        .subscribe( (data)=>observer.next(data) );
                    
                    
                  }
                },
                {
                  text: 'H5',
                  handler: () => {
                        this.getPictureHtml5()
                            .subscribe( (data)=>observer.next(data) );
                       
                    
                  }
                },
                {
                  text: '取消',
                  role: 'cancel',
                  handler: () => {

                  }
                }
              ]
          }).present();

      });
 
    
  }

 

   

   /**
   * 使用cordova-plugin-camera获取照片
   * @param options
   */
  getPicture(options: CameraOptions = {}): Observable<string> {
    
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      destinationType: this.camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
      quality: QUALITY_SIZE,//图像质量，范围为0 - 100
      allowEdit: false,//选择图片前是否允许编辑
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: IMAGE_SIZE,//缩放图像的宽度（像素）
      targetHeight: IMAGE_SIZE,//缩放图像的高度（像素）
      saveToPhotoAlbum: false,//是否保存到相册
      correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
    }, options);


    return Observable.create(observer => {
      this.camera.getPicture(ops).then((imgData: string) => {
          if (ops.destinationType === this.camera.DestinationType.DATA_URL) {
            observer.next('data:image/jpg;base64,' + imgData);
          } else {
            observer.next(imgData);
          }
      }).catch(err => {
          if (err == 20) {
            //this.noticeService.alert('没有权限,请在设置中开启权限');
            return;
          }
          if (String(err).indexOf('cancel') != -1) {
            return;
          }
          //this.logger.log(err, '使用cordova-plugin-camera获取照片失败');
          //this.noticeService.alert('获取照片失败');
      });
    });
  };

  /**
   * 通过拍照获取照片
   * @param options
   */
  getPictureByCamera(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
    }, options);
    return this.getPicture(ops);
  };

  /**
   * 通过图库获取照片
   * @param options
   */
  getPictureByPhotoLibrary(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
    }, options);
    return this.getPicture(ops);
  };


  /**
   * 通过图库选择多图
   * @param options
   */
  getMultiplePicture(options = {}): Observable<any> {
    let that = this;
    let ops = Object.assign({
      maximumImagesCount: 6,
      width: IMAGE_SIZE,//缩放图像的宽度（像素）
      height: IMAGE_SIZE,//缩放图像的高度（像素）
      quality: QUALITY_SIZE//图像质量，范围为0 - 100
    }, options);
    return Observable.create(observer => {
      this.imagePicker.getPictures(ops).then(files => {
        let destinationType = options['destinationType'] || 0;//0:base64字符串,1:图片url
        if (destinationType === 1) {
          observer.next(files);
        } else {
          let imgBase64s = [];//base64字符串数组
          for (let fileUrl of files) {
            that.convertImgToBase64(fileUrl).subscribe(base64 => {
              imgBase64s.push(base64);
              if (imgBase64s.length === files.length) {
                observer.next(imgBase64s);
              }
            })
          }
        }
      }).catch(err => {
        //this.logger.log(err, '通过图库选择多图失败');
        //this.noticeService.alert('获取照片失败');
      });
    });
  };

  getPictureHtml5(): Observable<string>{
      
      //http://www.cnblogs.com/yuanlong1012/p/5127497.html

      let fileInput:any;
 
      if(document.getElementById('myUploadInput')){

          fileInput = document.getElementById('myUploadInput');

      }else{

          fileInput = document.createElement('input');
          fileInput.setAttribute('id', 'myUploadInput');
          fileInput.setAttribute('type', 'file');
          fileInput.setAttribute('name', 'file');
          document.body.appendChild(fileInput);
          fileInput.style.display = 'none';
          
      }

      fileInput.click();

      return Observable.create(observer => {

          fileInput.onchange = (e: Event) => {

              let file = (e.target as HTMLInputElement).files[0];

              const reader = new FileReader();
              reader.onload = (e: Event) => {
                    let dataUri = (e.target as FileReader).result;
                    observer.next(dataUri);
                    observer.complete()
                        
              }
              reader.readAsDataURL(file);
        } 
      });
 
  }

  private readFileInfo(file): Observable<string> {
    
    const reader = new FileReader();

    return Observable.create(observer => {

          reader.onload = (e: Event) => {
                let dataUrl = (e.target as FileReader).result;
                observer.next(dataUrl);
                observer.complete()
                    
          }

          reader.readAsDataURL(file); 

     });
    
  

  }


  /**
   * 根据图片绝对路径转化为base64字符串
   * @param path 绝对路径
   */
  convertImgToBase64(path: string): Observable<string> {
    return Observable.create(observer => {
      this.file.resolveLocalFilesystemUrl(path).then((fileEnter: FileEntry) => {
        fileEnter.file(file => {
          let reader = new FileReader();
          reader.onloadend = function (e) {
            observer.next(this.result);
          };
          reader.readAsDataURL(file);
        });
      }).catch(err => {
        //this.logger.log(err, '根据图片绝对路径转化为base64字符串失败');
      });
    });
  }

  dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
  }
    
  buildFormData(args:Object){
    let formData = new FormData();

    for(let key in args){
       formData.append(key,args[key]);
    }

    return formData;

  }


 

}
