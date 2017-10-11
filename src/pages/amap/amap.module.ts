import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmapPage } from './amap';

@NgModule({
  declarations: [
    AmapPage,
  ],
  imports: [
    IonicPageModule.forChild(AmapPage),
  ],
})
export class AmapPageModule {}
