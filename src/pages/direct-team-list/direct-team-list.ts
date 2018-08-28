import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Events } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import firebase from 'firebase/app';
/**
 * Generated class for the DirectTeamListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-direct-team-list',
  templateUrl: 'direct-team-list.html',
})
export class DirectTeamListPage {

  ExpireMembers = [];
  numberOfValues = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider : AlertProvider,public events:Events) {

    this.dataProvider.getExpireMembers(this.ExpireMembers);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectTeamListPage');
  }

  delete(ExpireMember){
    
    this.dataProvider.popExpireMemberFromRegisterdUsers(ExpireMember);
    this.dataProvider.numbersAfterExpire(this.numberOfValues);
  
    this.events.publish('user:deleted',this.numberOfValues);

    firebase.database().ref().child('/user/'+ExpireMember.key).remove().then(function() {
      console.log("SUCCESS");
     
      var hidden = document.getElementById(ExpireMember.key);
      hidden.innerHTML = "Deleted";

    // this.dataProvider.returnNumbersOfValue(this.numberOfValues);

    });
  }

}
