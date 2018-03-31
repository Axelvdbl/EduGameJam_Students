import { Component } from '@angular/core';
import { NavParams, NavController, ViewController, ToastController, LoadingController, Events, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})

export class UsersPage {

	firstname: string = '';
	lastname: string = '';
	channels_id: number;
  private student : FormGroup;
  constructor(private loadingCtrl: LoadingController,
							private toastCtrl: ToastController,
							public viewCtrl: ViewController,
							public navCtrl: NavController,
							public params: NavParams,
							private formBuilder: FormBuilder,
							private data: DataService,
							private events: Events,
							private alertCtrl: AlertController,
							private navParams: NavParams) {
		this.channels_id = navParams.get('channel_id');
  }

  ngOnInit(){
      this.student = this.formBuilder.group({
				firstname: ['', Validators.compose([Validators.required])],
        lastname: ['', Validators.compose([Validators.required])]
      });
  }

  submit(){
    this.postStudent();
  }

  postStudent(){
    let loader = this.loadingCtrl.create({
      content: "Veuillez patienter ..."
    });
    loader.present();
    this.data.postStudent(this.student.value, this.channels_id)
                    .subscribe(
                      success => {
														this.navCtrl.pop();
														this.presentToast('Élève créé avec succès')
														loader.dismissAll();
                    	},
                    	error => {
                        loader.dismissAll();
                      }
										)
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 10000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Fermer',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
