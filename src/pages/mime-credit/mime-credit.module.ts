import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MimeCreditPage } from './mime-credit';

@NgModule({
  declarations: [
    MimeCreditPage,
  ],
  imports: [
    IonicPageModule.forChild(MimeCreditPage),
  ],
})
export class MimeCreditPageModule {}
