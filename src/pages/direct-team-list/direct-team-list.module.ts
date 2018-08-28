import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectTeamListPage } from './direct-team-list';

@NgModule({
  declarations: [
    DirectTeamListPage,
  ],
  imports: [
    IonicPageModule.forChild(DirectTeamListPage),
  ],
})
export class DirectTeamListPageModule {}
