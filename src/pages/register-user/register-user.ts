import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Events } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import firebase from 'firebase/app';

/**
 * Generated class for the RegisterUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  users = [];
  numberOfValues = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider : AlertProvider,public alertCtrl:AlertController,public events:Events) {
    this.users = [];
    this.dataProvider.getNewUser(this.users);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log(this.users);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
    
  }


  ionViewWillLeave(){
    
    
  };
  register(user,key,username,state_package){
    console.log(user);
    var setPackage = '';
    if(state_package == '0'){
        setPackage = '2';
    } else {
      setPackage = '3';
    }
    
    this.dataProvider.moveMember(user,setPackage,username,key);
    this.dataProvider.numbersAfterExpire(this.numberOfValues);
    console.log(this.numberOfValues);
    this.events.publish('user:created',this.numberOfValues);

    var indexDate = [];this.dataProvider.returnIndex(indexDate);
    
    var indexGo = indexDate[0];

    console.log("00000000000000000000000000000000000000");
    console.log(indexGo);
    console.log(key);
    
    firebase.database().ref().child('/user/' + key).update({

      state_package: setPackage,
      referralID_mine: username+key,


      }).then(function() {
        // Update successful.
        // Remove the record of registerd users in  the notification/sign 

          firebase.database().ref().child('/notification/sign/'+user.key1).remove().then(function() {
            console.log("SUCCESS");
           
            var hidden = document.getElementById(user.key1);
            hidden.innerHTML = "Registered";

          // this.dataProvider.returnNumbersOfValue(this.numberOfValues);

          });

          firebase.database().ref().child('/user/' + key + '/GO/' + indexGo).update({
            state_complete:'1',
          }).then(function() {
           // firebase.database().ref().child('/notification/purchase/'+user.key1).remove()
            });

      }, function(error) {
        // An error happened.
        console.log(error);
      });

     
  }

}
