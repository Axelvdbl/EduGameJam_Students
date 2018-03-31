import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DataService } from '../../services/data.service';

import { Question } from './question/question';

@Component({
  selector: 'page-game',
  templateUrl: 'games.html'
})
export class GamePage {

	questions: Question[];
	index: number = 0;
	progress: number;
	progressBuff: number;
	end: boolean = false;
	title: string;

  constructor(public navCtrl: NavController,
							private data: DataService,
							private loadingCtrl: LoadingController,
							private navParams: NavParams) {
		this.getQuestions();
	}

	increm_index() {
		this.index++;
		if (this.index == this.questions.length) {
			this.end = true;
			return;
		}
		this.title = this.questions[this.index].title;
		this.init_percent();
	}

	init_percent() {
		this.progressBuff = Math.random() * (100 - 70) + 70;
		this.progressBuff = Math.round(this.progressBuff);
		if (this.questions[this.index].percent)
			this.progress = this.progressBuff;
		else
			this.progress = 100 - this.progressBuff;
	}

	getQuestions() {
		let loader = this.loadingCtrl.create({
			content: "Veuillez patienter ..."
		});
		loader.present();
		this.data.getQuestions()
							.subscribe(
								data => {
									this.questions = data.body;
									this.title = this.questions[this.index].title;
									this.init_percent();
									loader.dismissAll();
								},
								error => {
									console.log(error)
									loader.dismissAll();
								}
							)
	}
}
