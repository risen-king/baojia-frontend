import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';

import { ProductListPage } from '../product-list/product-list';
 

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'ProductListPage';
  tab2Root = 'BdmapPage';
  tab3Root = 'ArticleListPage';
  tab4Root = 'LoginPage';

  constructor() {

  }
}
