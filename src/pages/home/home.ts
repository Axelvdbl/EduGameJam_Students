import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController, App, ModalController, Events } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { Ng2Cable } from "ng2-cable";
import { Http } from '@angular/http';

import { Channel } from './channels/channel';
import { ChannelPage } from '../channel/channels';
import { User } from './users/user';
import { UsersPage } from './users/users';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
	providers:[DatePipe]
})
export class HomePage {

	subSettings: string = 'home';

	channels: Channel[];

  constructor(public navCtrl: NavController,
							private data: DataService,
							private loadingCtrl: LoadingController,
							private modalCtrl: ModalController) {
		this.getChannels();
  }

	getChannels() {
		let loader = this.loadingCtrl.create({
			content: "Veuillez patienter ..."
		});
		loader.present();
		this.data.getChannels()
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

	presentUserModal(id, name) {
			let modal = this.modalCtrl.create(UsersPage, {channel_id: id});
			modal.onDidDismiss(data => {
				this.navCtrl.push(ChannelPage, {name: name, id: id});
			});
			modal.present();
		}

}
