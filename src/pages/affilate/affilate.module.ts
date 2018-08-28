import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AffilatePage } from './affilate';
import { DetailPage } from '../detail/detail';


@NgModule({
  declarations: [
    AffilatePage,
    DetailPage
  ],
  imports: [
    IonicPageModule.forChild(AffilatePage),
  ],
})
export class AffilatePageModule {}
