import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Server, StorageService} from './storage.service';
import {Router} from '@angular/router';
import {Sprint} from '../models/sprint';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  scanString: string;
  inputs: any[] = [];

  constructor(private storageService: StorageService, private alertController: AlertController, private router: Router) { }

  async alertScan(server: Server) {
    this.scanString = JSON.stringify(server, null, 4).replace(/[{}"]/g, '');
    const alert = await this.alertController.create({
      header: 'Server Added!',
      message: this.scanString,
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

  /*async alertSelectedServerHasNoSprint(sprints: Sprint[]) {
    sprints.forEach((value) => {
      const data = {
        name: value.name,
        type: 'radio',
        label: value.name,
        value: value.id,
      };
      this.inputs.push(data);
    })
    this.inputs.forEach(value => console.log("INPUTSFOREACH: " + value));

    const alert = await this.alertController.create({
      header: 'Select Sprint',
      inputs: this.inputs ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.storageService.setSelectedServerSprintId("sprintId");
          }
        }
      ]
    });

    await alert.present();
  }*/

}


