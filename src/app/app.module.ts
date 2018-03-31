import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Ng2CableModule } from 'ng2-cable';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChannelPage } from '../pages/channel/channels';
import { UsersPage } from '../pages/home/users/users';
import { GamePage } from '../pages/game/games';
import { DataService } from '../services/data.service';

@NgModule({
  declarations: [
    MyApp,
		HomePage,
    ChannelPage,
		UsersPage,
		GamePage,
  ],
  imports: [
    BrowserModule,
		HttpModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp, {
      backButtonText: 'Retour',
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    }),
		Ng2CableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
		HomePage,
    ChannelPage,
		UsersPage,
		GamePage,
  ],
  providers: [
		DataService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
