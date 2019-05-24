import {Component, OnInit, ViewChild} from '@angular/core';
import {Server, StorageService} from '../../services/storage.service';
import {IonList, Platform, ToastController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './edit-setting.page.html',
  styleUrls: ['./edit-setting.page.scss'],
})

export class EditSettingPage implements OnInit {
  servers: Server[] = [];
  editServer: Server = <Server> {};

  constructor(private activatedRoute: ActivatedRoute, private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadServers();
    });
  }

  ngOnInit() {
    this.getServerByUrlParam();
  }

  // USES URL ID TO GET SERVER DATA
  getServerByUrlParam() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.storageService.getServerById(id).then(server => {
      this.editServer = server;
      console.log('editServerID: ' + this.editServer.id);
      console.log('editServerID: ' + this.editServer.projectName);
      console.log('editServerID: ' + this.editServer.pyWallServer);
      console.log('editServerID: ' + this.editServer.syncServer);
      // this.storageService.updateServer(server).then(server )
    });
  }

  // UPDATE
  updateServer() {
    this.editServer.modified = Date.now();

    this.storageService.updateServer(this.editServer).then(server => {
      this.showToast('Server updated!');
      this.loadServers(); // Or update it inside the array directly
    });
  }

  // READ
  loadServers() {
    this.storageService.getServers().then(servers => {
      this.servers = servers;
    });
  }

  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
