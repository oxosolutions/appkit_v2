import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPostPage } from './list-post';

@NgModule({
  declarations: [
    ListPostPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPostPage),
  ],
})
export class ListPostPageModule {}
