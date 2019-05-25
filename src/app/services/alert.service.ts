import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Server} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertController: AlertController) { }

  async alertScan(server: Server) {
    const alert = await this.alertController.create({
      header: 'Server Added!',
      message: JSON.stringify(server, null, 4),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
}


