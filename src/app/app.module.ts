import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';


import { Camera } from "@ionic-native/camera";
import { ImagePicker } from "@ionic-native/image-picker";
import { File } from "@ionic-native/file";
import {Network} from "@ionic-native/network";
import {InAppBrowser} from "@ionic-native/in-app-browser";

 
import { TabsPage } from '../pages/tabs/tabs';
 
import { 
  HttpService,
  CacheService,
  ProductService,
  ImgService
 } from '../providers/providers';

import { NoticeService } from '../providers/providers';
import { SystemService } from '../providers/system-service';

 
import { BdmapService } from '../providers/bdmap-service/bdmap-service';
import { UserService } from '../providers/user-service/user-service';
import { CreditService } from '../providers/credit-service';
import { AdService } from '../providers/ad-service';

import { ArticleService } from '../providers/providers';

 
@NgModule({
  declarations: [
    MyApp,

    TabsPage,
 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
        preloadModules: true ,
        backButtonText: '',  
        iconMode: 'ios',  
        modalEnter: 'modal-slide-in',  
        modalLeave: 'modal-slide-out',  
        tabsPlacement: 'bottom',  
        pageTransition: 'ios' ,
        
    }),

    HttpModule,
    JsonpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
     
    TabsPage,
 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    Camera,
    ImagePicker,
    File,
    Network,
    InAppBrowser,


    SystemService,

 
    CacheService,
    HttpService,
    NoticeService,
    ImgService,
    
    ProductService,
    ArticleService,
    BdmapService,
    UserService,
    CreditService,
    AdService,
        
  ]
})
export class AppModule {}
