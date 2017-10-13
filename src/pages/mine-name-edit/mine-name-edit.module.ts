import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MineNameEditPage } from './mine-name-edit';

@NgModule({
  declarations: [
    MineNameEditPage,
  ],
  imports: [
    IonicPageModule.forChild(MineNameEditPage),
  ],
})
export class MineNameEditPageModule {}
