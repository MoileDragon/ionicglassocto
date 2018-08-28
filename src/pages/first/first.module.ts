import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstPage } from './first';
import { MemberPage } from '../member/member';
import { TokenPage } from '../token/token';
import {TabsPage} from '../tabs/tabs';


@NgModule({
  declarations: [
    FirstPage,
    MemberPage,
    TokenPage,
    TabsPage
  ],
  imports: [
    IonicPageModule.forChild(FirstPage),
  ],
})
export class FirstPageModule {}
