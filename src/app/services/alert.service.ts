import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Server} from './storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  objectString: string;
  constructor(private alertController: AlertController, private router: Router) { }

  async alertScan(server: Server) {
    this.objectString = JSON.stringify(server, null, 4).replace(/[{}"]/g, '');
    const alert = await this.alertController.create({
      header: 'Server Added!',
      message: this.objectString,
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            console.log('Navigate Home');
            this.router.navigate(['home']);
          }
        }
      ]
    });
    await alert.present();
  }
}


