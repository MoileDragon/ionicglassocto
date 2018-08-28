import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirstPage } from '../pages/first/first';
import { MemberPage} from '../pages/member/member';
import { TokenPage } from '../pages/token/token';
import { TabsPage } from '../pages/tabs/tabs';
import { AffilatePage } from '../pages/affilate/affilate';
import { DirrectTeamPage } from '../pages/dirrect-team/dirrect-team';
import { ClientPage } from '../pages/client/client';
import { DetailPage } from '../pages/detail/detail';
import { RegisterUserPage } from '../pages/register-user/register-user';
import { PurchasePage } from '../pages/purchase/purchase';
import { WithdrawPage } from '../pages/withdraw/withdraw';
import { ClientsListPage } from '../pages/clients-list/clients-list';
import { DirectTeamListPage } from '../pages/direct-team-list/direct-team-list';

import { UpdateAffiliatePage } from '../pages/update-affiliate/update-affiliate';
import { UpdateDirrectTeamPage } from '../pages/update-dirrect-team/update-dirrect-team';
import { UpdateClientPage  } from  '../pages/update-client/update-client';
 



import { AlertProvider } from '../providers/alert/alert';
import { GoServiceProvider } from '../providers/go-service/go-service';



// export const config = {
//   apiKey: "AIzaSyAFkk-o3cbry2Tl6MbslcGc0lyRCkgs4w4",
//   authDomain: "glassocto-7b011.firebaseapp.com",
//   databaseURL: "https://glassocto-7b011.firebaseio.com",
//   projectId: "glassocto-7b011",
//   storageBucket: "",
//   messagingSenderId: "968606451937"
// };

export const config = {
  apiKey: "AIzaSyCDCYHjwRcNSSVnBTz5cbX_aI_dActGQbw",
  authDomain: "go-mobile-51ddb.firebaseapp.com",
  databaseURL: "https://go-mobile-51ddb.firebaseio.com",
  projectId: "go-mobile-51ddb",
  storageBucket: "go-mobile-51ddb.appspot.com",
  messagingSenderId: "611493570815"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FirstPage,
    MemberPage,
    TokenPage,
    TabsPage,
    AffilatePage,
    DirrectTeamPage,
    ClientPage,
    DetailPage,
    RegisterUserPage,
    PurchasePage,
    WithdrawPage,
    ClientsListPage,
    DirectTeamListPage,
    UpdateAffiliatePage,
    UpdateDirrectTeamPage,
    UpdateClientPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config)    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FirstPage,
    MemberPage,
    TokenPage,
    TabsPage,
    AffilatePage,
    DirrectTeamPage,
    ClientPage,
    DetailPage,
    RegisterUserPage,
    PurchasePage,
    WithdrawPage,
    ClientsListPage,
    DirectTeamListPage,
    UpdateAffiliatePage,
    UpdateDirrectTeamPage,
    UpdateClientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    GoServiceProvider,
 
  ]
})
export class AppModule {}
