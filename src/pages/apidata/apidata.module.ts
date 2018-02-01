import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApidataPage } from './apidata';

@NgModule({
  declarations: [
    ApidataPage,
  ],
  imports: [
    IonicPageModule.forChild(ApidataPage),
  ],
})
export class ApidataPageModule {}
