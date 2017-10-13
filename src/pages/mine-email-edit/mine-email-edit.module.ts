import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MineEmailEditPage } from './mine-email-edit';

@NgModule({
  declarations: [
    MineEmailEditPage,
  ],
  imports: [
    IonicPageModule.forChild(MineEmailEditPage),
  ],
})
export class MineEmailEditPageModule {}
