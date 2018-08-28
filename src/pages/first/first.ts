import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,LoadingController, AlertController } from 'ionic-angular';
import { MemberPage }  from '../member/member';
import { TokenPage } from '../token/token';
import {TabsPage} from '../tabs/tabs';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';
import { AlertProvider } from '../../providers/alert/alert';
import { RegisterUserPage } from '../register-user/register-user';
import { PurchasePage } from '../purchase/purchase';
import { WithdrawPage } from '../withdraw/withdraw';
import { DetailPage } from '../detail/detail';
import { DirectTeamListPage } from '../direct-team-list/direct-team-list';

import {UpdateAffiliatePage }  from '../update-affiliate/update-affiliate';
import { UpdateDirrectTeamPage }  from '../update-dirrect-team/update-dirrect-team';
import { UpdateClientPage }  from  '../update-client/update-client';



/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {


  

/*  Defining the Numbers of member */

 totalMember = 0;
 liteMember = 0;
 unMember = 0;
 affiliateNumber = 0;
 directTeamNumber = 0;
 clientNumber = 0;

 newMember = 0; 
 
 members = [];
 
 numberPurchase = [];
 purchases = 0;

 numberWithdraw = [];
 withdraws = 0;

 numberGo = [];
 tototalGo = 0;
 pendingGo = 0;
 availableGo = 0;

  public press: number = 0;

  //for the Direct member that work for 1 month(Comm coin and hosting)
  goHostingDirectTeam = [];

  
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase,public dataService:AlertProvider,public events:Events,public loadingCtrl: LoadingController,public alertCtrl:AlertController) {

    // var initstate = this.navParams.get('params');
    // console.log("I am a members");
    // console.log(initstate);



    console.log("Here is starting point");
    this.dataService.numberOfMember(this.members);
    this.totalMember = this.members[0];
    this.liteMember = this.members[1];
    this.unMember = this.members[2];
    this.newMember = this.members[3];
    this.affiliateNumber = this.members[4];
    this.directTeamNumber = this.members[5];
    this.clientNumber = this.members[6];

    this.members = [];
    var hahaha = this.dataService.expireMembers();
   // console.log(hahaha);
  
        if(hahaha >0) {
         
          const alert = this.alertCtrl.create({      
            title: '1 YEAR',
            subTitle: 'Please check the following Members',
            buttons: [
              {
                text: 'Cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'OK',
                handler: data => {
                  // DirectTeamListPage is the ExpireMembers Page.(direct-team-list)
                  this.navCtrl.push(DirectTeamListPage);
                }
              }
            ]
          });
          alert.present();
        
    }
    this.dataService.getPurchaseslength(this.numberPurchase);
    this.purchases = this.numberPurchase[0];

    this.dataService.getWithdrawslength(this.numberWithdraw);
    this.withdraws = this.numberWithdraw[0];
   
    this.dataService.getVariousTypeGo(this.numberGo);
    
    this.tototalGo = this.numberGo[0];
    this.pendingGo = this.numberGo[1];
    this.availableGo = this.numberGo[2];

// Every Month hosting and Go calculate for the direct Team and Affiliate and Client
    this.goHostingDirectTeam = [];
    var temp = 0;
    var commGO = 0;
    this.dataService.getUser(this.goHostingDirectTeam);
    var templength = this.goHostingDirectTeam.length;
    var todayDate = new Date();
    var p,a;
    var pendingGOs = 0;
    var dd = todayDate.getDate();
    var strdd = dd.toString();
    var mm = todayDate.getMonth()+1; //January is 0!
    var strmm = mm.toString();

    var yyyy = todayDate.getFullYear();
    if(dd<10){
      strdd='0'+strdd;
    } 
    if(mm<10){
      strmm='0'+strmm;
    } 
    var dayKey = strdd + '-' + strmm + '-' + yyyy;
    var rewardsDate = strdd + '/'  +strmm + '/' + yyyy;

    for (var i = 0; i < templength; i++){

      //In the case of  Direct Team
        if(this.goHostingDirectTeam[i].state_member == '1'){
          pendingGOs = 0;
          var promotingDate =new Date (this.goHostingDirectTeam[i].promotingDate_direct);
         
          var timeDiff = Math.abs(todayDate.getTime() - promotingDate.getTime());
          var compdate = Math.ceil(timeDiff / (1000 * 3600 * 24));
          var multiCompdate = Math.ceil(compdate/30);
          // var tempUrl = todayDate.toDateString();
          console.log("The date is 30 days");
          console.log(compdate);
          console.log(multiCompdate);

          if(compdate == 30 * multiCompdate){        //1*30, 2*30,3*30 etc...
            for (var j = 0; j < templength; j++){

              if(this.goHostingDirectTeam[j].state_member == '0' && this.goHostingDirectTeam[i].referralID_mine == this.goHostingDirectTeam[j].referralID_parent){
                  if(this.goHostingDirectTeam[j].state_package =='3'){
                      temp = temp + 300 * 0.15;
                      commGO = commGO + this.goHostingDirectTeam[j].GO.totoalGO * 0.05;
                  }else{
                    temp = temp + 100 * 0.15;
                    commGO = commGO + this.goHostingDirectTeam[j].GO.totoalGO * 0.05;
                  }
              }
            }
            
            firebase.database().ref().child('/user/' + this.goHostingDirectTeam[i].key + '/comm/directTeam/' + dayKey).update({
              commHosting : temp,
              commGO : commGO,
              state : '0',
              }).then(function() {
                  console.log("SUCCESS");
                  temp = 0;
                  commGO = 0;
            });

          }
          for(m = 0; m < templength; m++){
            var puchaseChildDirectGOs = [];
            if(this.goHostingDirectTeam[i].referralID_mine == this.goHostingDirectTeam[m].referralID_parent){

              var goIndexDirectChild = Object.keys(this.goHostingDirectTeam[m].GO);
              for(p =0 ; p < goIndexDirectChild.length; p++){
                Godatakey = Object.keys(this.goHostingDirectTeam[m].GO)[p];
                var  valDirectChild = this.goHostingDirectTeam[m].GO[Godatakey]; 
                if(valDirectChild.method == "purchase" && valDirectChild.state_complete == "1"){
                  puchaseChildDirectGOs.push(valDirectChild);    
                }
              }
              // console.log("puchaseChildClientGOs");
              // console.log(puchaseChildClientGOs);
              for(a = 0; a < puchaseChildDirectGOs.length; a++){

                var purchaseStartDateChildDirect = puchaseChildDirectGOs[a].date;
                var tempDateDirect = purchaseStartDateChildDirect.split("/");
                var purchaseRealDateDirect =new Date(tempDateDirect[1] + "/" + tempDateDirect [0] + "/" + tempDateDirect[2]);
                var timeDifferDirect = Math.abs(todayDate.getTime() - purchaseRealDateDirect.getTime());
                compareDate = Math.ceil(timeDifferDirect / (1000 * 3600 * 24));
    
                if(compareDate < 31 && compareDate > 0){
                  pendingGOs = pendingGOs + puchaseChildDirectGOs[a].amount*0.0003;
                }
              }
            }
          }
          pendingGOs =  (Math.round(pendingGOs * 1000))/1000 
          firebase.database().ref().child('/user/' + this.goHostingDirectTeam[i].key +'/coinSharingGO/directTeam/' + dayKey).update({
            coinsharingGO : pendingGOs.toString(),
            state : '0',
            }).then(function() {
                console.log("SUCCESS");
                pendingGOs = 0;
               
          });


        }
      // In the case of Affiliate
        if(this.goHostingDirectTeam[i].state_member == '2'){
             pendingGOs = 0;
             promotingDate =new Date (this.goHostingDirectTeam[i].promotingDate_affiliate);
         
             timeDiff = Math.abs(todayDate.getTime() - promotingDate.getTime());
             compdate = Math.ceil(timeDiff / (1000 * 3600 * 24));
             multiCompdate = Math.ceil(compdate/30);
         

          if(compdate == 30 * multiCompdate){        //1*30, 2*30,3*30 etc...
            for (var k = 0; k < templength; k++){
              console.log("The date is 30 days");
              console.log("The date is 30 days--------");
              if(this.goHostingDirectTeam[i].referralID_mine == this.goHostingDirectTeam[k].referralID_parent){
                  if(this.goHostingDirectTeam[k].state_package =='3'){
                      temp = temp + 300 * 0.25;
                      commGO = commGO + this.goHostingDirectTeam[k].GO.totoalGO * 0.1;
                  }else{
                    temp = temp + 100 * 0.25;
                    commGO = commGO + this.goHostingDirectTeam[k].GO.totoalGO * 0.1;
                  }
              }
            }
            
            firebase.database().ref().child('/user/' + this.goHostingDirectTeam[i].key + '/comm/Affiliate/' + dayKey).update({
              commHosting : temp,
              commGO : commGO,
              state : '0',
              }).then(function() {
                  console.log("SUCCESS");
                  temp = 0;
                  commGO = 0;
            });

          }

          for(m = 0; m < templength; m++){
            var puchaseChildClientGOs = [];
            if(this.goHostingDirectTeam[i].referralID_mine == this.goHostingDirectTeam[m].referralID_parent){

              var goIndexClientChild = Object.keys(this.goHostingDirectTeam[m].GO);
              for(p =0 ; p < goIndexClientChild.length; p++){
                Godatakey = Object.keys(this.goHostingDirectTeam[m].GO)[p];
                var  valClientChild = this.goHostingDirectTeam[m].GO[Godatakey]; 
                if(valClientChild.method == "purchase" && valClientChild.state_complete == "1"){
                  puchaseChildClientGOs.push(valClientChild);    
                }
              }
              // console.log("puchaseChildClientGOs");
              // console.log(puchaseChildClientGOs);
              for(a = 0; a < puchaseChildClientGOs.length; a++){

                var purchaseStartDateChildClient = puchaseChildClientGOs[a].date;
                var tempDateChildDirect = purchaseStartDateChildClient.split("/");
                var purchaseRealDateChild1 =new Date(tempDateChildDirect[1] + "/" + tempDateChildDirect [0] + "/" + tempDateChildDirect[2]);
                var timeDifferChild1 = Math.abs(todayDate.getTime() - purchaseRealDateChild1.getTime());
                compareDate = Math.ceil(timeDifferChild1 / (1000 * 3600 * 24));
    
                if(compareDate < 31 && compareDate > 0){
                  pendingGOs = pendingGOs + puchaseChildClientGOs[a].amount*0.0003;
                }
              }
            }
          }
          pendingGOs =  (Math.round(pendingGOs * 1000))/1000 
          firebase.database().ref().child('/user/' + this.goHostingDirectTeam[i].key +'/coinSharingGO/Affiliate/' + dayKey).update({
            coinsharingGO : pendingGOs.toString(),
            state : '0',
            }).then(function() {
                console.log("SUCCESS");
                pendingGOs = 0;
               
          });


        }
      // Client 
          var purchaseGOs = [];
          var compareDate ;
          pendingGOs = 0 ;
          var m ;
          var goIndex = Object.keys(this.goHostingDirectTeam[i].GO);
          var Godatakey ;
          for(m =0 ; m < goIndex.length; m++){
            Godatakey = Object.keys(this.goHostingDirectTeam[i].GO)[m];
            var  val = this.goHostingDirectTeam[i].GO[Godatakey]; 
            if(val.method == "purchase" && val.state_complete == "1"){
              purchaseGOs.push(val);    
            }
          }
          console.log("===========GOing index==========");
          console.log(purchaseGOs);
          for(var n = 0; n < purchaseGOs.length; n++){

            var purchaseStartDate = purchaseGOs[n].date;
            var tempDate = purchaseStartDate.split("/");
            var purchaseRealDate =new Date(tempDate[1] + "/" + tempDate [0] + "/" + tempDate[2]);
            var timeDiffer = Math.abs(todayDate.getTime() - purchaseRealDate.getTime());
            compareDate = Math.ceil(timeDiffer / (1000 * 3600 * 24));

            if(compareDate < 31 && compareDate > 0){
              pendingGOs = pendingGOs + purchaseGOs[n].amount*0.001;
            }
          }
          
          for(m = 0; m < templength; m++){
            var puchaseChildGOs = [];
            if(this.goHostingDirectTeam[i].referralID_mine == this.goHostingDirectTeam[m].referralID_parent){

              var goIndexChild = Object.keys(this.goHostingDirectTeam[m].GO);
              for(p =0 ; p < goIndexChild.length; p++){
                Godatakey = Object.keys(this.goHostingDirectTeam[m].GO)[p];
                var  valChild = this.goHostingDirectTeam[m].GO[Godatakey]; 
                if(valChild.method == "purchase" && valChild.state_complete == "1"){
                  puchaseChildGOs.push(valChild);    
                }
              }
              console.log("puchaseChildGOs");
              console.log(puchaseChildGOs);
              for(a = 0; a < puchaseChildGOs.length; a++){

                var purchaseStartDateChild = puchaseChildGOs[a].date;
                var tempDateChild = purchaseStartDateChild.split("/");
                var purchaseRealDateChild =new Date(tempDateChild[1] + "/" + tempDateChild [0] + "/" + tempDateChild[2]);
                var timeDifferChild = Math.abs(todayDate.getTime() - purchaseRealDateChild.getTime());
                compareDate = Math.ceil(timeDifferChild / (1000 * 3600 * 24));
    
                if(compareDate < 31 && compareDate > 0){
                  pendingGOs = pendingGOs + puchaseChildGOs[a].amount*0.0003;
                }
              }
            }
          }

          console.log(pendingGOs);
          
          firebase.database().ref().child('/user/'+ this.goHostingDirectTeam[i].key + '/GO/' + dayKey).update({
            amount : pendingGOs.toString(),
            date : rewardsDate,
            method:'reward',
            state_complete : '1',
            }).then(function() {
                console.log("SUCCESS");
                pendingGOs = 0;
                
          });



    }


    var count = 10;
    var tempmember = [];
    var updatestate = 0;
    var tempnumberPurchase = [];
    var tempnumberWithdraw = [];
    var tempnumberGo =[];
    
    var self = this;
    setInterval(function () {
      var loading;
       loading = loadingCtrl.create({
        content: "Downloading the Data...",
       
      });
      if (count > 0) {

        tempmember = [];
        tempnumberPurchase= [];
        tempnumberWithdraw = [];
        tempnumberGo =[];

        // 
        var initestate = [];
        dataService.getTotalState(initestate);

      
        var returnArrState = [];
        var totalStateRef = firebase.database().ref("alarm_key/");
        totalStateRef.once("value", (function(snapshot) {
             snapshot.forEach(function(childSnapshot) {
                 var item = childSnapshot.val();
                 item.key = childSnapshot.key;
                 returnArrState.push(item);
          });
         
          if( initestate[0].alarm_key != returnArrState[0].alarm_key )
          {
             // for update the users data .................................//
             loading.present();

             console.log("downloading the data");
             dataService.formatAllDatas();

              console.log("init and update is not equal");
              dataService.setTotalState(returnArrState[0]);




      
              var users = firebase.database().ref("user/");
              users.once("value", (function(snapshot) {
                  var returnArr = [];
                  snapshot.forEach(function(childSnapshot) {
                    
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
            
                    returnArr.push(item);
                    dataService.setUser(item);
                    console.log("............users...............");
                    console.log(returnArr);
                });

                console.log("............tempmember0...............");
                dataService.numberOfMember(tempmember);
                console.log("............tempmember0...............");
                console.log(tempmember);
                return returnArr;    
      
              }));

              // for New user of notification / Sign 
              var newUser = firebase.database().ref('notification/sign/');
              newUser.once("value", (function(snapshot) {
                  var returnArr = [];
                  snapshot.forEach(function(childSnapshot) {
                    
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
            
                    returnArr.push(item);
                    dataService.setNewUser(item);
                    console.log("............NewUser...............");
                    console.log(returnArr);
                });
                console.log("............tempmember...............");
                dataService.numberOfMember(tempmember);
                console.log("............tempmember...............");
                console.log(tempmember);
                return returnArr;    

              
              }));

              // for New user of notification / Purchase 
              var purchase = firebase.database().ref('notification/purchase/');
              purchase.once("value", (function(snapshot) {
                  var returnArr = [];
                  snapshot.forEach(function(childSnapshot) {
                    
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
            
                    returnArr.push(item);
                    dataService.setPurchase(item);
                    console.log("............Purchase...............");
                    console.log(returnArr);
                });
                return returnArr;      
              
              }));

                // for New user of notification / Withdraw 
                var sss = 0;
                var withdraw = firebase.database().ref('notification/withdraw/');
                withdraw.once("value", (function(snapshot) {
                      var returnArr = [];
                    snapshot.forEach(function(childSnapshot) {
                      
                      var item = childSnapshot.val();
                      item.key = childSnapshot.key;
              
                      returnArr.push(item);
                      dataService.setWithdraw(item);
                      console.log("............Withdraw...............");
                      console.log(returnArr);
                  });
                  sss = 1;
                  console.log("............tempmember3...............");
                  dataService.numberOfMember(tempmember);
                  console.log("............ console.log( self.totalMember);...............");
                  console.log(tempmember);
           
                  self.totalMember = tempmember[0];
                  self.liteMember = tempmember[1];
                  self.unMember = tempmember[2];
                  self.newMember = tempmember[3];
                  self.affiliateNumber = tempmember[4];
                  self.directTeamNumber = tempmember[5];
                  self.clientNumber = tempmember[6];

                  dataService.getPurchaseslength(tempnumberPurchase);
                  self.purchases = tempnumberPurchase[0];
              
                  dataService.getWithdrawslength(tempnumberWithdraw);
                  self.withdraws = tempnumberPurchase[0];
                 
                  dataService.getVariousTypeGo(tempnumberGo);
                  
                  self.tototalGo = tempnumberGo[0];
                  self.pendingGo = tempnumberGo[1];
                  self.availableGo = tempnumberGo[2];
                  console.log( self.totalMember);
                  return returnArr;     
                 
                  // dataService.numberOfMember(temlmember);
            
                }));
              

                loading.dismiss().then(() => {
                  console.log("............loading dismiss...............");
                  // dataService.numberOfMember(tempmember);
                  // console.log(tempmember);
                 
              
                });
                
        }

          return returnArrState;   
      }));

      this.goHostingDirectTeam = [];
      var temp = 0;
      var commGO = 0;
      dataService.getUser(this.goHostingDirectTeam);
      var templength = this.goHostingDirectTeam.length;
      var todayDate = new Date();
      var p,a;
      var pendingGOs = 0;
      var dd = todayDate.getDate();
      var strdd = dd.toString();
      var mm = todayDate.getMonth()+1; //January is 0!
      var strmm = mm.toString();
  
      var yyyy = todayDate.getFullYear();
      if(dd<10){
        strdd='0'+strdd;
      } 
      if(mm<10){
        strmm='0'+strmm;
      } 
      var dayKey = strdd + '-' + strmm + '-' + yyyy;
      var rewardsDate = strdd + '/'  +strmm + '/' + yyyy;
  
      for (var i = 0; i < templength; i++){
  
        //In the case of  Direct Team
          if(this.goHostingDirectTeam[i].state_member == '1'){
            pendingGOs = 0;
            var promotingDate =new Date (this.goHostingDirectTeam[i].promotingDate_direct);
           
            var timeDiff = Math.abs(todayDate.getTime() - promotingDate.getTime());
            var compdate = Math.ceil(timeDiff / (1000 * 3600 * 24));
            var multiCompdate = Math.ceil(compdate/30);
            // var tempUrl = todayDate.toDateString();
            console.log("The date is 30 days");
            console.log(compdate);
            console.log(multiCompdate);
  
            if(compdate == 30 * multiCompdate){        //1*30, 2*30,3*30 etc...
              for (var j = 0; j < templength; j++){
  
                if(this.goHostingDirectTeam[j].state_member == '0' && this.goHostingDirectTeam[i].referralID_mine == this.goHostingDirectTeam[j].referralID_parent){
                    if(this.goHostingDirectTeam[j].state_package =='3'){
                        temp = temp + 300 * 0.15;
                        commGO = commGO + this.goHostingDirectTeam[j].GO.totoalGO * 0.05;
                    }else{
                      temp = temp + 100 * 0.15;
                      commGO = commGO + this.goHostingDirectTeam[j].GO.totoalGO * 0.05;
                    }
                }
              }
              commGO = (Math.round(commGO * 10000)) / 10000;
              firebase.database().ref().child('/user/' + this.goHostingDirectTeam[i].key + '/comm/directTeam/' + dayKey).update({
                commHosting : temp,
                commGO : commGO,
                state : '0',
                }).then(function() {
                    console.log("SUCCESS");
                    temp = 0;
                    commGO = 0;
              });
  
            }
            for(m = 0; m < templength; m++){
              var puchaseChildDirectGOs = [];
              if(this.goHostingDirectTeam[i].referralID_mine == this.goHostingDirectTeam[m].referralID_parent){
  
                var goIndexDirectChild = Object.keys(this.goHostingDirectTeam[m].GO);
                for(p =0 ; p < goIndexDirectChild.length; p++){
                  Godatakey = Object.keys(this.goHostingDirectTeam[m].GO)[p];
                  var  valDirectChild = this.goHostingDirectTeam[m].GO[Godatakey]; 
                  if(valDirectChild.method == "purchase" && valDirectChild.state_complete == "1"){
                    puchaseChildDirectGOs.push(valDirectChild);    
                  }
                }
                // console.log("puchaseChildClientGOs");
                // console.log(puchaseChildClientGOs);
                for(a = 0; a < puchaseChildDirectGOs.length; a++){
  
                  var purchaseStartDateChildDirect = puchaseChildDirectGOs[a].date;
                  var tempDateDirect = purchaseStartDateChildDirect.split("/");
                  var purchaseRealDateDirect =new Date(tempDateDirect[1] + "/" + tempDateDirect [0] + "/" + tempDateDirect[2]);
                  var timeDifferDirect = Math.abs(todayDate.getTime() - purchaseRealDateDirect.getTime());
                  compareDate = Math.ceil(timeDifferDirect / (1000 * 3600 * 24));
                  // 0.015% Daily coin Sharing GO
                  if(compareDate < 31 && compareDate > 0){
                    pendingGOs = pendingGOs + puchaseChildDirectGOs[a].amount*0.00015;
                  }
                }
              }
            }
            pendingGOs =  (Math.round(pendingGOs * 1000))/1000 
            firebase.database().ref().child('/user/' + this.goHostingDirectTeam[i].key +'/coinSharingGO/directTeam/' + dayKey).update({
              coinsharingGO : pendingGOs.toString(),
              state : '0',
              }).then(function() {
                  console.log("SUCCESS");
                  pendingGOs = 0;
                 
            });
  
  
          }
        // In the case of Affiliate
          if(this.goHostingDirectTeam[i].state_member == '2'){
               pendingGOs = 0;
               promotingDate =new Date (this.goHostingDirectTeam[i].promotingDate_affiliate);
           
               timeDiff = Math.abs(todayDate.getTime() - promotingDate.getTime());
               compdate = Math.ceil(timeDiff / (1000 * 3600 * 24));
               multiCompdate = Math.ceil(compdate/30);
           
  
            if(compdate == 30 * multiCompdate){        //1*30, 2*30,3*30 etc...
              for (var k = 0; k < templength; k++){
                console.log("The date is 30 days");
                console.log("The date is 30 days--------");
                if(this.goHostingDirectTeam[i].referralID_mine == this.goHostingDirectTeam[k].referralID_parent){
                    if(this.goHostingDirectTeam[k].state_package =='3'){
                        temp = temp + 300 * 0.25;
                        commGO = commGO + this.goHostingDirectTeam[k].GO.totoalGO * 0.1;
                    }else{
                      temp = temp + 100 * 0.25;
                      commGO = commGO + this.goHostingDirectTeam[k].GO.totoalGO * 0.1;
                    }
                }
              }
              commGO = (Math.round(commGO*10000))/10000;
              firebase.database().ref().child('/user/' + this.goHostingDirectTeam[i].key + '/comm/Affiliate/' + dayKey).update({
                commHosting : temp,
                commGO : commGO,
                state : '0',
                }).then(function() {
                    console.log("SUCCESS");
                    temp = 0;
                    commGO = 0;
              });
  
            }
  
            for(m = 0; m < templength; m++){
              var puchaseChildClientGOs = [];
              if(this.goHostingDirectTeam[i].referralID_mine == this.goHostingDirectTeam[m].referralID_parent){
  
                var goIndexClientChild = Object.keys(this.goHostingDirectTeam[m].GO);
                for(p =0 ; p < goIndexClientChild.length; p++){
                  Godatakey = Object.keys(this.goHostingDirectTeam[m].GO)[p];
                  var  valClientChild = this.goHostingDirectTeam[m].GO[Godatakey]; 
                  if(valClientChild.method == "purchase" && valClientChild.state_complete == "1"){
                    puchaseChildClientGOs.push(valClientChild);    
                  }
                }
                // console.log("puchaseChildClientGOs");
                // console.log(puchaseChildClientGOs);
                for(a = 0; a < puchaseChildClientGOs.length; a++){
  
                  var purchaseStartDateChildClient = puchaseChildClientGOs[a].date;
                  var tempDateChildDirect = purchaseStartDateChildClient.split("/");
                  var purchaseRealDateChild1 =new Date(tempDateChildDirect[1] + "/" + tempDateChildDirect [0] + "/" + tempDateChildDirect[2]);
                  var timeDifferChild1 = Math.abs(todayDate.getTime() - purchaseRealDateChild1.getTime());
                  compareDate = Math.ceil(timeDifferChild1 / (1000 * 3600 * 24));
      
                  if(compareDate < 31 && compareDate > 0){
                    pendingGOs = pendingGOs + puchaseChildClientGOs[a].amount*0.0003;
                  }
                }
              }
            }
            pendingGOs =  (Math.round(pendingGOs * 1000))/1000 
            firebase.database().ref().child('/user/' + this.goHostingDirectTeam[i].key +'/coinSharingGO/Affiliate/' + dayKey).update({
              coinsharingGO : pendingGOs.toString(),
              state : '0',
              }).then(function() {
                  console.log("SUCCESS");
                  pendingGOs = 0;
                 
            });
  
  
          }
        // Client 
            var purchaseGOs = [];
            var compareDate ;
            pendingGOs = 0 ;
            var m ;
            var goIndex = Object.keys(this.goHostingDirectTeam[i].GO);
            var Godatakey ;
            for(m =0 ; m < goIndex.length; m++){
              Godatakey = Object.keys(this.goHostingDirectTeam[i].GO)[m];
              var  val = this.goHostingDirectTeam[i].GO[Godatakey]; 
              if(val.method == "purchase" && val.state_complete == "1"){
                purchaseGOs.push(val);    
              }
            }
            console.log("===========GOing index==========");
            console.log(purchaseGOs);
            for(var n = 0; n < purchaseGOs.length; n++){
  
              var purchaseStartDate = purchaseGOs[n].date;
              var tempDate = purchaseStartDate.split("/");
              var purchaseRealDate =new Date(tempDate[1] + "/" + tempDate [0] + "/" + tempDate[2]);
              var timeDiffer = Math.abs(todayDate.getTime() - purchaseRealDate.getTime());
              compareDate = Math.ceil(timeDiffer / (1000 * 3600 * 24));
  
              if(compareDate < 31 && compareDate > 0){
                pendingGOs = pendingGOs + purchaseGOs[n].amount*0.001;
              }
            }
            
            for(m = 0; m < templength; m++){
              var puchaseChildGOs = [];
              if(this.goHostingDirectTeam[i].referralID_mine == this.goHostingDirectTeam[m].referralID_parent){
  
                var goIndexChild = Object.keys(this.goHostingDirectTeam[m].GO);
                for(p =0 ; p < goIndexChild.length; p++){
                  Godatakey = Object.keys(this.goHostingDirectTeam[m].GO)[p];
                  var  valChild = this.goHostingDirectTeam[m].GO[Godatakey]; 
                  if(valChild.method == "purchase" && valChild.state_complete == "1"){
                    puchaseChildGOs.push(valChild);    
                  }
                }
                console.log("puchaseChildGOs");
                console.log(puchaseChildGOs);
                for(a = 0; a < puchaseChildGOs.length; a++){
  
                  var purchaseStartDateChild = puchaseChildGOs[a].date;
                  var tempDateChild = purchaseStartDateChild.split("/");
                  var purchaseRealDateChild =new Date(tempDateChild[1] + "/" + tempDateChild [0] + "/" + tempDateChild[2]);
                  var timeDifferChild = Math.abs(todayDate.getTime() - purchaseRealDateChild.getTime());
                  compareDate = Math.ceil(timeDifferChild / (1000 * 3600 * 24));
      
                  if(compareDate < 31 && compareDate > 0){
                    pendingGOs = pendingGOs + puchaseChildGOs[a].amount*0.0003;
                  }
                }
              }
            }
  
            console.log(pendingGOs);
            
            firebase.database().ref().child('/user/'+ this.goHostingDirectTeam[i].key + '/GO/' + dayKey).update({
              amount : pendingGOs.toString(),
              date : rewardsDate,
              method:'reward',
              state_complete : '1',
              }).then(function() {
                  console.log("SUCCESS");
                  pendingGOs = 0;
                  
            });
          }

      count--;
      console.log(count);


    } else {
        count = 10;
      }
    }, 5000); 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  
    this.events.subscribe('user:created', (data,massge) =>{
      console.log(data); //  Hello from page1!
   
    this.totalMember = data[0];
    this.unMember = data[1];
    this.liteMember = data[2];
    this.newMember = data[3];
    this.affiliateNumber = data[4];
    this.directTeamNumber = data[5];
    this.clientNumber = data[6];
    
    });

    //After delete  expired members from the registered Array
    this.events.subscribe('user:deleted', (data,massge) =>{
      console.log(data); //  Hello from page1!
   
      this.totalMember = data[0];
      this.unMember = data[1];
      this.liteMember = data[2];
      this.newMember = data[3];
      this.affiliateNumber = data[4];
      this.directTeamNumber = data[5];
      this.clientNumber = data[6];
   });

   // After the promoting Affiliate or DirectTeam get the their numbers
   this.events.subscribe('user:promoting', (data) =>{
    console.log(data); //  Hello from page1!
 
    this.totalMember = data[0];
    this.unMember = data[1];
    this.liteMember = data[2];
    this.newMember = data[3];
    this.affiliateNumber = data[4];
    this.directTeamNumber = data[5];
    this.clientNumber = data[6];
 });


    // Updated purchase numbers
    this.events.subscribe('user:purchase', (data,massge) =>{
      console.log(data); //  Hello from page1!
   
    this.purchases = data[0];
   });

       // Updated withdraw numbers
       this.events.subscribe('user:withdraw', (data,massge) =>{
        console.log(data); //  Hello from page1!
     
      this.withdraws = data[0];
     });



  }


  
// Showing the members according to the Level
  tapEvent(e) {
      console.log("Member Mangement");
      this.navCtrl.push(TabsPage);  
  }

  // for the management of GO
  pressEvent(e) {
    console.log("Token Mangement");
    this.navCtrl.push(TokenPage);
  
  }

  // Register Page(for the new User )
  tempRegister(e){

    this.navCtrl.push(RegisterUserPage);
    
  }
  // Go to the Purchase Page
  goPurchase(e){
    this.navCtrl.push(PurchasePage);
  }

  // Go to the Withdraw Page
  goWithdraw(e){
    this.navCtrl.push(WithdrawPage);
  }

  goAffiliate(e){
    this.navCtrl.push(UpdateAffiliatePage);
  }

  goDreactTeam(e){
    this.navCtrl.push(UpdateDirrectTeamPage);
  }

  goClient(e){
    this.navCtrl.push(UpdateClientPage);
  }
}
