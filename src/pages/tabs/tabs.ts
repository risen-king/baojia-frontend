import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';
//import { ProductListPage } from '../product-list/product-list';
 
// @IonicPage({
//   priority: 'high'
// })
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabRoots: Object[];

  tab1Root = 'ProductListPage';
  tab2Root = 'BdmapPage';
  tab3Root = 'ArticleListPage';
  tab4Root = 'LoginPage';


  constructor() {

    this.tabRoots = [
      {
        root: 'ProductListPage',
        tabTitle: '市场',
        tabIcon: 'ios-analytics-outline'
      },
      {
        root: 'BdmapPage',
        tabTitle: '导航',
        tabIcon: 'ios-compass-outline'
      },
      {
        root: 'ArticleListPage',
        tabTitle: '资讯',
        tabIcon: 'ios-book-outline'
      },
      {
        root: 'LoginPage',
        tabTitle: '我的',
        tabIcon: 'ios-person-outline'
      }

    ];

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}
