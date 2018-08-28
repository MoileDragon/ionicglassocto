import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { DomSanitizer } from '@angular/platform-browser';
import firebase from 'firebase/app';


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
   
  key ;
  temp = [];
  memberDetail= {};
  member_state ;
  goIndex : any;
  Godatakey : any;
  purchaseWithdraws = [];
  purchase = [];
  withdraw = [];
  rewards = [];
  allNumbers = [];
  rewardsClient = [];
  state = 0;
  rewardclient= [];
  rewardMonths = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:AlertProvider,private sanitizer: DomSanitizer,public events:Events) {
    this.key = navParams.get('param'); 
    console.log(this.key);

    this.temp = [];
    this.dataService.getUser(this.temp);
    console.log("----error----------------------------------------------");
    console.log(this.temp);


    this.purchaseWithdraws = [];
    this.rewardsClient = [];
    for(var i = 0;i < this.temp.length; i++){
      if (this.key == this.temp[i].key){
        var url = '';
        url = this.temp[i].img;
        url = 'data:image/bmp;base64,' + url;        
        this.temp[i].img  = this.sanitizer.bypassSecurityTrustResourceUrl(url);         
          this.memberDetail = this.temp[i];
          this.rewardsClient.push(this.temp[i]);
          this.member_state = this.temp[i].state_member;

          this.goIndex = Object.keys(this.temp[i].GO);
          console.log("goindexlength");
          console.log(this.goIndex.length);
          for(var k =0 ; k < this.goIndex.length; k++){

            this.Godatakey = Object.keys(this.temp[i].GO)[k];
            if(this.Godatakey != 'availableGO' && this.Godatakey != 'pendingGo' && this.Godatakey != 'totoalGO'){
              var  val = this.temp[i].GO[this.Godatakey]; 
              console.log(this.Godatakey);
              this.purchaseWithdraws.push(val);
              console.log(val);
            }
          }
      }
    }
    console.log(this.purchaseWithdraws);
    this.purchase = [];
    this.withdraw = [];
    this.rewards = [];
    this.rewardMonths = [];
    for(var j = 0; j < this.purchaseWithdraws.length; j++){
      if(this.purchaseWithdraws[j].method == "purchase"){
        this.purchase.push(this.purchaseWithdraws[j]);
      }else if (this.purchaseWithdraws[j].method == "withdraw") {
        this.withdraw.push(this.purchaseWithdraws[j]);
      } else {
        this.rewards.push(this.purchaseWithdraws[j]);
      }
    }
    console.log("this.purchase");
    console.log(this.purchase);

    this.rewardclient= [];
    var key = [];
    var monthKey = [];
    var goIndexDirectChild,p;
    var Godatakey,valDirectChild,m;
    var todayDate = new Date();
    if(this.rewardsClient[0].state_member == "1"){

        goIndexDirectChild = Object.keys(this.rewardsClient[0].coinSharingGO.directTeam);
        for(p =0 ; p < goIndexDirectChild.length; p++){
            Godatakey = Object.keys(this.rewardsClient[0].coinSharingGO.directTeam)[p];
            valDirectChild = this.rewardsClient[0].coinSharingGO.directTeam[Godatakey]; 
            console.log(valDirectChild);
            this.rewardclient.push(valDirectChild); 
            key.push(Godatakey);   
      
        }

        // reward at the client working for a month(at the point a month)
        var promotingDate =new Date (this.rewardsClient[0].promotingDate_direct);
        var timeDiff = Math.abs(todayDate.getTime() - promotingDate.getTime());
        var compdate = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var multiCompdate = Math.ceil(compdate/30);

        if(compdate == 30 * multiCompdate){   

          goIndexDirectChild = Object.keys(this.rewardsClient[0].comm.directTeam);
          for(p =0 ; p < goIndexDirectChild.length; p++){
            Godatakey = Object.keys(this.rewardsClient[0].comm.directTeam)[p];
            valDirectChild = this.rewardsClient[0].comm.directTeam[Godatakey]; 
            this.rewardMonths.push(valDirectChild);
            monthKey.push(Godatakey);   
          }
          for( m =0 ; m < this.rewardMonths.length; m++){
            this.rewardMonths[m].date = monthKey[m];
            this.rewardMonths[m].method = "RE..MONTH";
          }
        }

        console.log("this.rewardMonths");
        console.log(this.rewardMonths);
        // for Displaying  the reward at the view
        for( m =0 ; m < this.rewardclient.length; m++){
          this.rewardclient[m].date = key[m];
          this.rewardclient[m].method = "REWARD";
        }
       // In case of the Affiliate working for a month to reward 
    } else if (this.rewardsClient[0].state_member == "2") {
                  goIndexDirectChild = Object.keys(this.rewardsClient[0].coinSharingGO.Affiliate);
                  for(p =0 ; p < goIndexDirectChild.length; p++){
                      Godatakey = Object.keys(this.rewardsClient[0].coinSharingGO.Affiliate)[p];
                      valDirectChild = this.rewardsClient[0].coinSharingGO.Affiliate[Godatakey]; 
                      console.log(valDirectChild);
                      this.rewardclient.push(valDirectChild); 
                      key.push(Godatakey);   
                
                  }
                  for(m =0 ; m < this.rewardclient.length; m++){
                    this.rewardclient[m].date = key[m];
                    this.rewardclient[m].method = "REWARD";
                  }

                // reward at the client working for a month(at the point a month)
                    promotingDate =new Date (this.rewardsClient[0].promotingDate_affiliate);
                    timeDiff = Math.abs(todayDate.getTime() - promotingDate.getTime());
                    compdate = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    multiCompdate = Math.ceil(compdate/30);
               
                if(compdate == 30 * multiCompdate){   
        
                  goIndexDirectChild = Object.keys(this.rewardsClient[0].comm.Affiliate);
                  for(p =0 ; p < goIndexDirectChild.length; p++){
                    Godatakey = Object.keys(this.rewardsClient[0].comm.Affiliate)[p];
                    valDirectChild = this.rewardsClient[0].comm.Affiliate[Godatakey]; 
                    this.rewardMonths.push(valDirectChild);
                    monthKey.push(Godatakey);   
                  }
                  for( m =0 ; m < this.rewardMonths.length; m++){
                    this.rewardMonths[m].date = monthKey[m];
                    this.rewardMonths[m].method = "RE..MONTH";
                  }
                }
        
                console.log("this.rewardMonths");
                console.log(this.rewardMonths);
    

    } else {
      
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }


  // Promoting to the Direct Team from the Client
  promotingDirect(memberDetail){
      this.allNumbers = [];
      console.log(memberDetail.state_member);
      var todayDate = new Date();
     
      this.dataService.promoteToUpstate(memberDetail);
        console.log(memberDetail.key);

        firebase.database().ref().child('/user/' + memberDetail.key).update({
          state_member : '1',
          promotingDate_direct : todayDate,
        }).then(function() {
          console.log("SUCCESS");
          var hidden = document.getElementById(memberDetail.key);
          hidden.innerHTML = "Registered";
        });

        this.updateNumbers();
        console.log("update members");
        
        firebase.database().ref().child('/alarm_key/alarm_key').update({
          alarm_key : todayDate,
        }).then(function() {
          console.log("SUCCESS");

        });


    }
    

    // Promoting to the Affiliate from the Direct Team
    promotingAffiliate(memberDetail){
      this.allNumbers = [];
      var todayDate = new Date();
      this.dataService.promoteToUpstateAffilate(memberDetail);
      firebase.database().ref().child('/user/' + memberDetail.key).update({
        state_member : '2',
        promotingDate_affiliate : todayDate,
      }).then(function() {
        console.log("SUCCESS");
        var hidden = document.getElementById(memberDetail.key);
        hidden.innerHTML = "Registered";
        
      });
      this.updateNumbers();

      firebase.database().ref().child('/alarm_key/alarm_key').update({
        alarm_key : todayDate,
      }).then(function() {
        console.log("SUCCESS");

      });
    
    }

    updateNumbers(){
      this.dataService.numbersAfterExpire(this.allNumbers);
      this.events.publish('user:promoting',this.allNumbers);
    }


    showPurchase(e){
      this.state = 0;
    }

    showWithdraw(e){
      this.state = 1;
    }

    showReward(e){
      this.state = 2;
    }
}
