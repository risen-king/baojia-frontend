import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule, JsonpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { ProductListPage } from '../pages/product-list/product-list';


import { HttpService,CacheService,ProductService } from '../providers/providers';
import { ArticleServiceProvider } from '../providers/article-service/article-service';
import { BdmapService } from '../providers/bdmap-service/bdmap-service';
import { UserService } from '../providers/user-service/user-service';
import { NoticeService } from '../providers/notice-service/notice-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    ProductListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
        backButtonText: '',  
        iconMode: 'ios',  
        modalEnter: 'modal-slide-in',  
        modalLeave: 'modal-slide-out',  
        tabsPlacement: 'bottom',  
        pageTransition: 'ios'  
    }),

    HttpModule,
    JsonpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    ProductListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
 
    CacheService,
    HttpService,
    ProductService,
    ArticleServiceProvider,
    BdmapService,
    UserService,
    NoticeService,
    
  ]
})
export class AppModule {}
