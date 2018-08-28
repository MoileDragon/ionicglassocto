// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {
  
  // all users(registered user and user that will be registered)
  users = [];

  // new user in notification(user that will be registered)
  newUsers = [];

  // real registered users
  registeredUsers = [];

  // Not registered users
  unRegisterdUsers = [];

  // purchase data 

  purchase = [];

 // withdraw data
  withdraw = [];

  // when the new user is registered, for the purchase the state_complete variable set the true and return the Key(date).Then variale 

  IndexDate;

// purchase key in the users for the state_complete
 gopurchasekey = [];

 withdrawlength = [];


// withdraw key in the users for the state_complete
 gowithdrawkey = [];
 purchaselength = [];

 // Expire members ------------------/

 expireUsers = [];
 numberOfExpireUsers = 0;

 // Various type Gos-----------------------//

 availableGo = 0;
 pedingGo = 0;
 totalGo = 0;

 // State content for the totally state

 tempState = [];

  numberOfTotalMembers = 0;
  numberOfRealLoginMembers = 0;
  numberOfUnlimitedMembers = 0;
  numberOfLiteMembers = 0;
  numberOfNotifiMembers = 0;


  realnumberOfTotalMembers = 0;
  realnumberOfRealLoginMembers = 0;
  realnumberOfUnlimitedMembers = 0;
  realnumberOfLiteMembers = 0;
  realnumberOfNotifiMembers = 0;




  constructor() {
    console.log('Hello AlertProvider Provider');
  }



// for Get the all users.
  setUser(user){
    console.log("--------Registerd Users-----------");
     
     this.users.push(user) 
     console.log(this.users);
 }


 getUser(user){

  var tempLength = this.registeredUsers.length;

  for(var i = 0; i < tempLength; i++){

    user[i] = this.registeredUsers[i];
    
  }
}

// for getting the data of Purchase from the firebase 
setPurchase(data){
  console.log("--------purchase-----------");
  this.purchase.push(data);
  console.log( this.purchase);
}


getPurchaseslength(data){

  if(this.purchase.length != 0){
    data[0] = this.purchase.length;
  } else{
    data[0] = 0;
  }
}

getPurchases(data){
  var length =  this.purchase.length;

  for (var i = 0; i < length; i++){
    data[i] = this.purchase[i];
  }
}

//for getting the data of withdraw from the firebase
setWithdraw(data){

  console.log("--------withdraw-----------");
  this.withdraw.push(data);
  console.log( this.withdraw);
}

getWithdrawslength(data){

  if(this.withdraw.length != 0){
    data[0] = this.withdraw.length;
  }
  else{
    data[0] = 0;
  }
  
 }
 
 getWithdraws(data){

   var length =  this.withdraw.length;
   for (var i = 0; i < length; i++){
     data[i] = this.withdraw[i];
   }
 }
 


 // for sign up  the New Users
 setNewUser(user){
  
  this.newUsers.push(user) ;
  console.log("--------setNewUser-----------");
  console.log( this.newUsers);
}

getNewUser(user){

   for(let i = 0; i < this.newUsers.length; i++){
    user[i] = this.unRegisterdUsers[i];
  }  
   
}

// get the total state from the firebase

setTotalState(state){
  this.tempState.push(state);
  console.log("---------totalState----------");
  console.log(this.tempState);
}

getTotalState(state){
  for(let i = 0; i < this.tempState.length; i++){
    state[i] = this.tempState[i];
  } 
}


// Formatting the NewUser and User
formatAllDatas(){
  this.users = [];
  this.newUsers = [];
  this.registeredUsers = [];
  this.unRegisterdUsers = [];
  this.users = [];
  this.newUsers = [];
  this.registeredUsers = [];
  this.unRegisterdUsers = [];
  this.purchase = [];
  this.withdraw =[];
  this.tempState = [];
  this.withdrawlength ;
  this. IndexDate;
  this. numberOfTotalMembers = 0;
  this.numberOfRealLoginMembers = 0;
  this.numberOfUnlimitedMembers = 0;
  this.numberOfLiteMembers = 0;
  this.numberOfNotifiMembers = 0;
}








 numberOfMember(members){

  this.numberOfTotalMembers =  this.users.length;
  this.numberOfNotifiMembers = this.newUsers.length;
  this.numberOfRealLoginMembers =  this.numberOfTotalMembers - this.numberOfNotifiMembers;
  this.numberOfUnlimitedMembers = 0;
  this.numberOfLiteMembers = 0;
  this.unRegisterdUsers = [];
  this.registeredUsers = [];  
  var tempNewUser;
  var flag = 0;
  for(var i = 0;i < this.numberOfTotalMembers; i++){
    for(var j = 0; j < this.numberOfNotifiMembers ;j++){
      if(this.users[i].username == this.newUsers[j].username){
          tempNewUser = this.users[i];
          tempNewUser.key1 = this.newUsers[j].key;
          tempNewUser.btcaddress = this.newUsers[j].btcaddress;
          tempNewUser.amount = this.newUsers[j].amount;
          this.unRegisterdUsers.push(tempNewUser);
          flag = 1;
      }
    }

    if(flag != 1){
      if(this.users[i].state_package == '2'){
        this.numberOfLiteMembers ++;
       }
       this.registeredUsers.push(this.users[i]);  
    }
    flag = 0;
  }
//affiliate and direct team and client numbers
var tempAffiliateNumbers = 0;
var tempDirectNumbers = 0;
var tempClientNumbers = 0;
  for(var k = 0 ;k < this.registeredUsers.length; k++){
    if(this.registeredUsers[k].state_member == "0"){
      tempClientNumbers++;
    }
    if(this.registeredUsers[k].state_member == "1"){
      tempDirectNumbers++;
    }    
    if(this.registeredUsers[k].state_member == "2"){
      tempAffiliateNumbers++;
    }    
  }
  this.numberOfUnlimitedMembers = this.numberOfRealLoginMembers - this.numberOfLiteMembers;

  members[0] = this.registeredUsers.length;
  members[1] = this.numberOfLiteMembers;
  members[2] = this.numberOfUnlimitedMembers;
  members[3] = this.unRegisterdUsers.length; 
  members[4] = tempAffiliateNumbers;
  members[5] = tempDirectNumbers;
  members[6] = tempClientNumbers;
  


   console.log("Before ------------------- button");
   console.log(this.users);
   console.log(this.unRegisterdUsers.length);
   console.log(this.registeredUsers.length);
   console.log(this.unRegisterdUsers);
   console.log(this.registeredUsers);
   console.log(this.newUsers);
   console.log("Before -------------+++++++++++++++++------ button");
}  


expireMembers(){
  this.numberOfExpireUsers = 0;
  this.expireUsers = [];
  var todayDate = new Date();
  var startDate ;
  for (var i = 0; i < this.registeredUsers.length ; i++){
   
    startDate = this.registeredUsers[i].date_start;
    var tempDate = startDate.split("/");
    startDate =new Date(tempDate[1] + "/" + tempDate [0] + "/" + tempDate[2]);

    var timeDiff = Math.abs(todayDate.getTime() - startDate.getTime());
    var compdate = Math.ceil(timeDiff / (1000 * 3600 * 24));

    console.log(this.registeredUsers[i].date_start);
    if(compdate > 365){
      this.expireUsers.push(this.registeredUsers[i]);
      this.numberOfExpireUsers ++;

    }
  }
  console.log(this.numberOfExpireUsers);
  return this.numberOfExpireUsers;
}


getExpireMembers(members){
  var tempLength = this.expireUsers.length;

  for(var i = 0; i < tempLength; i++){

    members[i] = this.expireUsers[i];
    
  }
}

// Deleting the expire member from the registered users using the key.
popExpireMemberFromRegisterdUsers(member){
  var regMembersLength = this.registeredUsers.length;
  var tempArray = [];
  for(var i = 0; i < regMembersLength; i++){
    var temp = this.registeredUsers[i];
    if(member.key != temp.key){
      tempArray.push(temp);
    }
  }
  this.registeredUsers = [];
  this.registeredUsers = tempArray;
}


// Get the members After excute the popExpireMemberFromRegisterdUsers function

numbersAfterExpire(value){
  console.log("test the registeredUsers");
  console.log(this.registeredUsers);
  var tempRegisteredUsers = this.registeredUsers.length;
  var tempUnRegisteredUser = this.unRegisterdUsers.length;
  var tempLiteMember = 0;
  var tempUnlimited = 0;
  var tempClientNumbers  = 0;
  var tempDirectNumbers = 0;
  var tempAffiliateNumbers = 0;

  for(var i = 0 ;i < tempRegisteredUsers; i++){
    if(this.registeredUsers[i].state_package == '2'){
      tempLiteMember++;
    }
    if(this.registeredUsers[i].state_member == "0"){
      tempClientNumbers++;
    }
    if(this.registeredUsers[i].state_member == "1"){
      tempDirectNumbers++;
    }    
    if(this.registeredUsers[i].state_member == "2"){
      tempAffiliateNumbers++;
    }    
  }
  tempUnlimited = tempRegisteredUsers - tempLiteMember;

  value[0] = tempRegisteredUsers ;
  value[1] = tempUnlimited ;
  value[2] = tempLiteMember;
  value[3] = tempUnRegisteredUser ;
  value[4] = tempAffiliateNumbers ;
  value[5] = tempDirectNumbers ;
  value[6] = tempClientNumbers ;

  console.log("test the value");
  console.log(value); 
  
}

// returnNumbersOfValue(value){
//   value[0] = this.numberOfRealLoginMembers ;
//   value[1] = this.numberOfUnlimitedMembers ;
//   value[2] = this.numberOfLiteMembers;
//   value[3] = this.numberOfNotifiMembers ;
//   console.log("test the value");
//   console.log(value); 
//  }



moveMember(userone,setPackage,username,key){
    var temp;
    var tempArray = [];
    this.numberOfLiteMembers = 0;
    this.numberOfNotifiMembers = 0;
    this.numberOfRealLoginMembers = 0;
    this.numberOfUnlimitedMembers = 0;
    var goIndex;
  
    console.log("After push the unRegister=======================");
    console.log(this.unRegisterdUsers);

    // length of the unRegister in the User record
    var unRegisterdUsersLength = this.unRegisterdUsers.length;

    for(var i = 0; i < unRegisterdUsersLength; i++){

      temp = this.unRegisterdUsers.shift();
  
        
      if(userone.key == temp.key){
          temp.state_package = '';
          temp.state_package = setPackage;
          temp.referralID_mine = username + key;
        this.registeredUsers.push(temp);
        
      }else{
          tempArray.push(temp);
      }
    }
    this.unRegisterdUsers =[];
    this.unRegisterdUsers = tempArray;




// length of the registered user in the User record

    this.numberOfRealLoginMembers = this.registeredUsers.length;

    for(var j = 0; j < this.numberOfRealLoginMembers; j++){

      if(this.registeredUsers[j].state_package == '2'){

          this.numberOfLiteMembers ++;
     }

      if(this.registeredUsers[j].key == key){
        
          console.log("++++++++GOGOGO++++++");
          goIndex = Object.keys(this.registeredUsers[j].GO)[0];
          var val = this.registeredUsers[j].GO[goIndex]; 
          val["state_complete"] = 1;
          console.log(val);
        // console.log(Object.values(this.registeredUsers[j].GO));
          console.log (goIndex);
          this.IndexDate = goIndex;
      }
    
    }

  // New User update of the notification / Sign   
    var tempArrayNewUsers = [];
    var lengthNewUser = this.newUsers.length;

    for(var k = 0; k<lengthNewUser; k++){
   
      var tempNewUsers = this.newUsers.shift();
      console.log(tempNewUsers);
       if(userone.key1 != tempNewUsers.key){
        tempArrayNewUsers.push(tempNewUsers);
       }
    }
  
    this.newUsers = [];
    this.newUsers = tempArrayNewUsers;
    this.numberOfRealLoginMembers = this.registeredUsers.length;
    this.numberOfUnlimitedMembers = this.numberOfRealLoginMembers - this.numberOfLiteMembers;
    this.numberOfNotifiMembers = this.unRegisterdUsers.length;
    console.log("---------------------newUser--------------------");
    console.log(this.newUsers);
    console.log(this.registeredUsers);
    console.log(this.unRegisterdUsers);

  }




   // for return the Index of GO`date Index of the  new user 
   returnIndex(indexDate){
      indexDate[0] = this.IndexDate;
   } 



   getOnePurchase(purchase){

   var goIndex ;
   var Godatakey;
   this.gopurchasekey =[];
   this.numberOfRealLoginMembers = this.registeredUsers.length;

    console.log("+purchase+++++++GOGOGO++++++purchase");
    console.log(purchase);
    for(var j = 0; j < this.numberOfRealLoginMembers; j++){

     if(this.registeredUsers[j].username == purchase.username){
      console.log(this.registeredUsers[j]);
      this.gopurchasekey.push(this.registeredUsers[j].key);

        goIndex = Object.keys(this.registeredUsers[j].GO);

        for(var k =0 ; k < goIndex.length; k++){
          Godatakey = Object.keys(this.registeredUsers[j].GO)[k];
          var  val = this.registeredUsers[j].GO[Godatakey]; 
          console.log(val);
          if(val.showdate == purchase.showdate){
            val.state_complete = '1';
            this.gopurchasekey.push(Godatakey); ;
            console.log(this.gopurchasekey);
          
          }
        }
      }
    }
    var tempArrayPurchase = [];
    var tempSize = this.purchase.length;
    for(var i = 0;i< tempSize; i++){
      var temp =  this.purchase.shift();
      if(temp.key != purchase.key){
        tempArrayPurchase.push(temp);
      }
    }
      this.purchase = [];
      this.purchase = tempArrayPurchase;
      this.purchaselength[0] = this.purchase.length;
   

  }

  returnKeyPurchase(data){
    for(var k = 0; k < this.gopurchasekey.length; k++){
      data[k] = this.gopurchasekey[k];
    }
  }

// for get the Url key of the Withdraw and users` key and remove the one data from the withdraw datas.
  getOneWithdraw(withdraw){
    var onlyKey = withdraw.key;
    var goIndex ;
    var Godatakey;
    this.gowithdrawkey =[];
     this.numberOfRealLoginMembers = this.registeredUsers.length;
 
     console.log("withdraw+++++++GOGOGO++++++withdraw");
     console.log(withdraw);
     for(var j = 0; j < this.numberOfRealLoginMembers; j++){
 
      if(this.registeredUsers[j].username == withdraw.username){
    //   console.log(this.registeredUsers[j]);
       this.gowithdrawkey.push(this.registeredUsers[j].key);
 
         goIndex = Object.keys(this.registeredUsers[j].GO);
 
         for(var k =0 ; k < goIndex.length; k++){
           Godatakey = Object.keys(this.registeredUsers[j].GO)[k];
           var  val = this.registeredUsers[j].GO[Godatakey]; 
     //      console.log(val);
           if(val.showdate == withdraw.showdate){
             val.state_complete = '1';
             this.gowithdrawkey.push(Godatakey); ;
             console.log(this.gowithdrawkey);
           
           }
         }
       }
     }
     console.log("this.withdrawlength[0]");
     
     var tempArrayPurchase = [];
     var tempSize = this.withdraw.length;
     for(var i = 0;i< tempSize; i++){
       var temp =  this.withdraw.shift();
       if(temp.key != onlyKey){
         tempArrayPurchase.push(temp);
       }
    }
   // console.log(tempArrayPurchase);
       this.withdraw = [];
       this.withdraw = tempArrayPurchase;
       this.withdrawlength[0] = this.withdraw.length;

     
  }

  returnKeyWithdraw(data){
    for(var k = 0; k < this.gowithdrawkey.length; k++){
      data[k] = this.gowithdrawkey[k];
    }
  }
  //------------------for the Show the various gos in the first page-------------------------------------//
  getVariousTypeGo(data){
    this.totalGo = 0;
    this.pedingGo = 0;
    this.availableGo = 0;
    var usersLength = this.registeredUsers.length;
    if(usersLength == 0){
      data[0] = 0;
      data[1] = 0;
      data[2] = 0;
    }else{
      for(var i = 0; i < usersLength ;i++ ){
        this.totalGo = this.totalGo + parseInt(this.registeredUsers[i].GO.totoalGO, 10);
        this.pedingGo = this.pedingGo + parseInt(this.registeredUsers[i].GO.pendingGo,10);
        this.availableGo = this.availableGo + parseInt(this.registeredUsers[i].GO.availableGO,10);

      }
      data[0] = this.totalGo;
      data[1] = this.pedingGo;
      data[2] = this.availableGo;

    }
  }
 // for the Gos of the token page showing all the Gos
    getAfilliateGos(data){
      var totalGo = 0;
      var pedingGo = 0;
      var availableGo = 0;
      var liteNumbers = 0 ;
      var unlimitedNumbers = 0;
      var usersLength = this.registeredUsers.length;
      if(usersLength == 0){
        data[0] = 0;
        data[1] = 0;
        data[2] = 0;
      }else{
      for(var i = 0; i < usersLength ;i++ ){
          if(this.registeredUsers[i].state_member == '2'){
            totalGo = totalGo + parseInt(this.registeredUsers[i].GO.totoalGO, 10);
            pedingGo = pedingGo + parseInt(this.registeredUsers[i].GO.pendingGo,10);
            availableGo = availableGo + parseInt(this.registeredUsers[i].GO.availableGO,10);
            if(this.registeredUsers[i].state_package == '2'){
              liteNumbers ++;
            }else{
              unlimitedNumbers ++;
            }
          }
        }
        data[0] = totalGo;
        data[1] = pedingGo;
        data[2] = availableGo;
        data[3] = liteNumbers;
        data[4] = unlimitedNumbers;
      }
    } 
    getDirectTeamsGos(data){
      var totalGo = 0;
      var pedingGo = 0;
      var availableGo = 0;
      var liteNumbers = 0 ;
      var unlimitedNumbers = 0;
      var usersLength = this.registeredUsers.length;
      if(usersLength == 0){
        data[0] = 0;
        data[1] = 0;
        data[2] = 0;
      }else{
      for(var i = 0; i < usersLength ;i++ ){
        if(this.registeredUsers[i].state_member == '1'){
          totalGo = totalGo + parseInt(this.registeredUsers[i].GO.totoalGO, 10);
          pedingGo = pedingGo + parseInt(this.registeredUsers[i].GO.pendingGo,10);
          availableGo = availableGo + parseInt(this.registeredUsers[i].GO.availableGO,10);
          if(this.registeredUsers[i].state_package == '2'){
            liteNumbers ++;
          }else{
            unlimitedNumbers ++;
          }
        }

        
      }  
        data[0] = totalGo;
        data[1] = pedingGo;
        data[2] = availableGo;
        data[3] = liteNumbers;
        data[4] = unlimitedNumbers;
      }
    }
    getCientsGos(data){
      var totalGo = 0;
      var pedingGo = 0;
      var availableGo = 0;
      var liteNumbers = 0 ;
      var unlimitedNumbers = 0;
      var usersLength = this.registeredUsers.length;
      if(usersLength == 0){
        data[0] = 0;
        data[1] = 0;
        data[2] = 0;
      }else{
        for(var i = 0; i < usersLength ;i++ ){
          if(this.registeredUsers[i].state_member == '0'){
            totalGo = totalGo + parseInt(this.registeredUsers[i].GO.totoalGO, 10);
            pedingGo = pedingGo + parseInt(this.registeredUsers[i].GO.pendingGo,10);
            availableGo = availableGo + parseInt(this.registeredUsers[i].GO.availableGO,10);
            if(this.registeredUsers[i].state_package == '2'){
              liteNumbers ++;
            }else{
              unlimitedNumbers ++;
            }
          }
        }
          data[0] = totalGo;
          data[1] = pedingGo;
          data[2] = availableGo;
          data[3] = liteNumbers;
          data[4] = unlimitedNumbers;
      }  
    }

    // When the promoting button on the detail page for  Updating member_state to the Direct Team state.
    promoteToUpstate(member){
      var templength = this.registeredUsers.length;
      for(var i = 0; i < templength; i++){
        if(member.username == this.registeredUsers[i].username){
          this.registeredUsers[i].state_member = '1';
        } 
      }

      console.log("promoteToUpstate function");
      console.log(this.registeredUsers);
    }
    promoteToUpstateAffilate(member){
      var templength = this.registeredUsers.length;
      for(var i = 0; i < templength; i++){
        if(member.username == this.registeredUsers[i].username){
          this.registeredUsers[i].state_member = '2';
        } 
      }

      console.log("promoteToUpstate function");
      console.log(this.registeredUsers);
    }


}