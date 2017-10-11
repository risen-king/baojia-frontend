import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MineSettingPage } from './mine-setting';

@NgModule({
  declarations: [
    MineSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(MineSettingPage),
  ],
})
export class MineSettingPageModule {}
