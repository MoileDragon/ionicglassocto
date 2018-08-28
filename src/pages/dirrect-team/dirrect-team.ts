import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import {FirstPage} from '../first/first';
import { AlertProvider } from '../../providers/alert/alert';
import {DetailPage} from '../detail/detail';
import { DomSanitizer } from '@angular/platform-browser';


/**
 * Generated class for the DirrectTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dirrect-team',
  templateUrl: 'dirrect-team.html',
})
export class DirrectTeamPage {

  temp = [];
  directTeams = [];

  constructor(private app: App,public navCtrl: NavController, public navParams: NavParams,public dataService:AlertProvider,private sanitizer: DomSanitizer) {
 
    this.dataService.getUser(this.temp);
 
    
    for(var i = 0;i<this.temp.length;i++){
      if(this.temp[i].state_member == '1'){
        var url = '';
          url = this.temp[i].img;
          url = 'data:image/bmp;base64,' + url;        
          this.temp[i].img  = this.sanitizer.bypassSecurityTrustResourceUrl(url);         
          this.directTeams.push(this.temp[i]);
      }
     
    }
    console.log(this.directTeams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirrectTeamPage');
  }


  goFirst(e){
    
    this.app.getRootNav().setRoot(FirstPage);
  }

  go(key){
    this.navCtrl.push(DetailPage,{param:key});  
  }
}
