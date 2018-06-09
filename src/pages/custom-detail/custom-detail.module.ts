import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomDetailPage } from './custom-detail';

@NgModule({
  declarations: [
    CustomDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomDetailPage),
  ],
})
export class CustomDetailPageModule {}
