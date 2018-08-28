import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert' 

import { ClientsListPage } from '../clients-list/clients-list';
import { DirectTeamListPage } from '../direct-team-list/direct-team-list';

/**
 * Generated class for the TokenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-token',
  templateUrl: 'token.html',
})
export class TokenPage {

  dataInicial: string;
  maxDate: string;
  affiliateGos = [];
  affiliateTotoalGos = 0;
  affiliatePendingGos = 0;
  affiliateAvailableGos = 0;
  affiliateLiteNumbers = 0;
  affiliateUnlimitedNumbers = 0;

  directTeamGos = [];
  directTeamTotoalGos = 0;
  directTeamPendingGos = 0;
  directTeamAvailable = 0
  directTeamLiteNumbers = 0;
  directTeamUnlimitedNumbers = 0;

  clientsGos = [];
  clientsTotoalGos = 0;
  ciientsPendingGos = 0;
  clientsAvailableGos = 0;
  clientsLiteNumbers = 0;
  clientsUnLimitedNumbers = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider : AlertProvider,public events:Events) {

    this.dataProvider.getAfilliateGos(this.affiliateGos);
    this.affiliateTotoalGos = this.affiliateGos[0];
    this.affiliatePendingGos = this.affiliateGos[1];
    this.affiliateAvailableGos = this.affiliateGos[2];
    this.affiliateLiteNumbers = this.affiliateGos[3];
    this.affiliateUnlimitedNumbers = this.affiliateGos[4];


    this.dataProvider.getDirectTeamsGos(this.directTeamGos);
    this.directTeamTotoalGos = this.directTeamGos[0];
    this.directTeamPendingGos = this.directTeamGos[1];
    this.directTeamAvailable = this.directTeamGos[2];
    this.directTeamLiteNumbers = this.directTeamGos[3];
    this.directTeamUnlimitedNumbers = this.directTeamGos[4];

    this.dataProvider.getCientsGos(this.clientsGos);
    this.clientsTotoalGos = this.clientsGos[0];
    this.ciientsPendingGos = this.clientsGos[1];
    this.clientsAvailableGos = this.clientsGos[2];
    this.clientsLiteNumbers = this.clientsGos[3];
    this.clientsUnLimitedNumbers = this.clientsGos[4];

  }
//  @ViewChild('datePicker') datePicker;
//      open() {
//          if (!this.dataInicial) {
//             this.dataInicial = new Date().toJSON().split('T')[0];
//              setTimeout(() => {
//                  this.datePicker.open();
//              }, 50)
//          } else {
//              this.datePicker.open();
//          }

//      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TokenPage');
  }


  goClientsList(e){
   // this.navCtrl.push(ClientsListPage);
  }

  goDirectTeamList(e){
     // this.navCtrl.push( DirectTeamListPage);
  }
 
}
