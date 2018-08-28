import { Component } from '@angular/core';

import { AffilatePage } from '../affilate/affilate';
import { DirrectTeamPage } from '../dirrect-team/dirrect-team';
import { ClientPage } from '../client/client';
import { IonicPage, NavController, NavParams,App  } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AffilatePage;
  tab2Root = DirrectTeamPage;
  tab3Root = ClientPage;

  constructor(private navCtrl:NavController) {

  }

  switchTabs() {
    this.navCtrl.parent.select(2);
  }

  
}
