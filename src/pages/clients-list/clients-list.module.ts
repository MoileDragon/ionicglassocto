import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsListPage } from './clients-list';

@NgModule({
  declarations: [
    ClientsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientsListPage),
  ],
})
export class ClientsListPageModule {}
