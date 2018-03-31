import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DataService } from '../../services/data.service';

import { GamePage } from '../game/games'
import { Channel } from '../home/channels/channel';

@Component({
  selector: 'page-channel',
  templateUrl: 'channels.html'
})
export class ChannelPage {

	subSettings: string = 'students';

	channels: Channel[];
	name: string;

	id: number;

  constructor(public navCtrl: NavController,
							private data: DataService,
							private loadingCtrl: LoadingController,
							private navParams: NavParams) {
			this.id = navParams.get('id');
			this.getChannel();
		}

		refresh() {
			this.getChannel();
			this.name = this.channels[0].name;
			if (this.channels[0].is_active)
				this.navCtrl.push(GamePage, {});
		}

		getChannel() {
			let loader = this.loadingCtrl.create({
				content: "Veuillez patienter ..."
			});
			loader.present();
			this.data.getChannel(this.id)
								.subscribe(
									data => {
										this.channels = data.body;
										loader.dismissAll();
									},
									error => {
										console.log(error)
										loader.dismissAll();
									}
								)
		}

}
