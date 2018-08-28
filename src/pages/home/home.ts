
import { Component } from '@angular/core';
import { NavController,AlertController, Nav ,LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase/app';

import { FirstPage }  from '../first/first';
import { AlertProvider } from '../../providers/alert/alert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    data = {
      username  :'',
      password : ''
    }
    items:Observable<any[]>;
    key = '';
    // for the log in.
    userInfo = [];
    ref = firebase.database().ref('login/');

    // for the All pachages
    usersInfo = [];
    refuser = firebase.database().ref('user/');

    // for the new users  

    newUserInfo = [];
    refNewUser = firebase.database().ref('notification/sign/');

    state=0;  // variable for either the login or sign up
  
    user = {
      adminName:'',
      adminPass:''
    }
    // real package and litepackage and unlimitedpackage so on
    packages = [];

    // for the Purchase 
    purchase = [];
    refPurchase = firebase.database().ref('notification/purchase/');

    // for the Withdraw

    withdraw = [];
    refWithdraw = firebase.database().ref('notification/withdraw/');

    loading :any;

    // for the get the totally changed state
    totalState = [];
    refTotalState = firebase.database().ref('alarm_key/');

  constructor(public navCtrl: NavController,public db: AngularFireDatabase,public alertCtrl: AlertController,public alertProvider:AlertProvider,public loadingCtrl: LoadingController) {
       
      this.loading = this.loadingCtrl.create({
      content: "Connecting with firebase...",
     
    });

        this.loading.present();   
        
        this.state=0;
        this.alertProvider.formatAllDatas();
        this.ref.on('value', resp => {
        this.userInfo = [];
        this.userInfo = this.snapshotToArray(resp);

      //  console.log(this.userInfo[0].password);
    
      });

        this.refTotalState.once('value',resp => {
          this.totalState = [];  
          this.totalState = this.snapshotToArray0(resp);
      
      });



        this.refuser.once('value',resp => {
        this.usersInfo = [];
        this.usersInfo = this.snapshotToArray1(resp);
     
      
      });

        this.refNewUser.once('value',resp => {
        this.usersInfo = [];
        this.usersInfo = this.snapshotToArray2(resp);
        
      });


        this.refPurchase.once('value',resp => {
        this.purchase = [];
        this.purchase = this.snapshotToArray3(resp);
        
      });

        this.refWithdraw.once('value',resp => {
        this.purchase = [];
        this.purchase = this.snapshotToArray4(resp);

        this.loading.dismiss();
        console.log(this.totalState);
      
      });

      

  }
  

 snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
        
    });

    return returnArr;
};
  

// Read the State from the firebase
snapshotToArray0 = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
      this.alertProvider.setTotalState(item);
  });

  return returnArr;
};


snapshotToArray1 = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
      this.alertProvider.setUser(item);
  });

  return returnArr;
};

snapshotToArray2 = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
      this.alertProvider.setNewUser(item);
   
   
  });

  return returnArr;
};


// for the purchase 
snapshotToArray3 = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
      this.alertProvider.setPurchase(item);
  });

  return returnArr;
};


// for the Withdraw 
snapshotToArray4 = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
      this.alertProvider.setWithdraw(item);
  });

  return returnArr;
};


login(e){
 
    if(this.userInfo[0].username == undefined){
      const alert = this.alertCtrl.create({
        title: 'Failed Downloading',
        subTitle: 'Please try again for downloadin from the firebase',
        buttons: ['OK']
      });
      alert.present();
    }

    if ((this.user.adminName == this.userInfo[0].username) && (this.user.adminPass == this.userInfo[0].password))
    {

    //  this.alertProvider.numberOfMember(this.packages);
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
   //   console.log(this.packages);
      this.navCtrl.push(FirstPage); 

      this.user = {
        adminName:'',
        adminPass:''
      };
    } 
    else
    { 
      const alert = this.alertCtrl.create({
        title: 'Confirm the Password',
        subTitle: 'Your password is not correct.Please enter the correct password',
        buttons: ['OK']
      });
      alert.present();
      this.user = {
        adminName:'',
        adminPass:''
      };
    }
       
  }

  signUp(e){

      this.state = 1;
  }



  Register(e){

    if(this.data.username == this.userInfo[0].username){
      firebase.database().ref().child('/login/'+this.userInfo[0].key).update({

        password : this.data.password,
      })
        
        this.navCtrl.push(FirstPage); 
        this.data ={ username  :'',
                      password : ''};
        this.state = 0;


    }
    else{
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Please enter the correct email',
        buttons: ['OK']
      });
      alert.present();
    }

  }

}