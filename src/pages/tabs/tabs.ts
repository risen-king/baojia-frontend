import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';

import { ProductListPage } from '../product-list/product-list';
import { ArticleListPage } from '../article-list/article-list';
import { BdmapPage } from '../bdmap/bdmap';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProductListPage;
  tab2Root = BdmapPage;
  tab3Root = ArticleListPage;

  constructor() {

  }
}
