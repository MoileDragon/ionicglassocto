import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App  } from 'ionic-angular';
import {DetailPage} from '../detail/detail';
import {FirstPage} from '../first/first';
import { AlertProvider } from '../../providers/alert/alert';
import { DomSanitizer } from '@angular/platform-browser';







/**
 * Generated class for the AffilatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-affilate',
  templateUrl: 'affilate.html',
})
export class AffilatePage {

  temp = [];
  affilates = [];

  constructor(private app: App,public navCtrl: NavController, public navParams: NavParams,public dataService:AlertProvider,private sanitizer: DomSanitizer) {
 
    this.dataService.getUser(this.temp);
    console.log("========================");
    
    for(var i = 0;i<this.temp.length;i++){
      if(this.temp[i].state_member == '0'){
        var url = '';
          url = this.temp[i].img;
          url = 'data:image/bmp;base64,' + url;        
          this.temp[i].img  = this.sanitizer.bypassSecurityTrustResourceUrl(url);         
          this.affilates.push(this.temp[i]);
      }
     
    }
    console.log(this.affilates);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AffilatePage');
  }
 
  go(key){

    this.navCtrl.push(DetailPage,{param:key});  

  }

  goFirst(e){

    this.app.getRootNav().setRoot(FirstPage);
  }


}
