import {Injectable, ViewChild} from '@angular/core';
import {AlertController, IonList} from '@ionic/angular';
import {Server, StorageService} from './storage.service';
import {Router} from '@angular/router';
import {Sprint} from '../models/sprint';
import {ToastService} from "./toast.service";
import {TasksService} from "./tasks.service";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  scanString: string;

  // USE DOM ELEMENT TO
  @ViewChild('mylist') mylist: IonList;

  constructor(private storageService: StorageService,
              private tasksService: TasksService,
              private alertController: AlertController,
              private toastService: ToastService,
              private router: Router) { }

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

  async alertDeleteSetting(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Do you really want to delete the Server?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Confirm Okay');
            this.storageService.deleteServer(id).then(() => {
              this.toastService.showToast('Server removed!');
              this.router.navigate(['settings']);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async alertDeleteTask(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Do you really want to delete the Server?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Confirm Okay');
            this.tasksService.delete(id).then(() => {
              this.toastService.showToast('Task deleted!');
              this.router.navigate(['tasks']);
            });
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


