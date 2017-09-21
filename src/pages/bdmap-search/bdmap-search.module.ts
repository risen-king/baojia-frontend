import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BdmapSearchPage } from './bdmap-search';

@NgModule({
  declarations: [
    BdmapSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(BdmapSearchPage),
  ],
})
export class BdmapSearchPageModule {}
