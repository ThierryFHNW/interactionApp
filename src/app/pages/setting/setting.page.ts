import {Component, OnInit, ViewChild} from '@angular/core';
import {Server, StorageService} from '../../services/storage.service';
import {IonList, Platform, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})


export class SettingPage implements OnInit {
  servers: Server[] = [];

  newServer: Server = <Server> {};

  @ViewChild('mylist')mylist: IonList;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadServers();
    });
  }

  ngOnInit(): void {}

  // CREATE
  addServer() {
    this.newServer.modified = Date.now();
    this.newServer.id = Date.now();

    this.storageService.addServer(this.newServer).then(server => {
      this.newServer = <Server>{};
      this.showToast('Server added!')
      this.loadServers(); // Or add it to the array directly
    });
  }

  // READ
  loadServers() {
    this.storageService.getServers().then(servers => {
      this.servers = servers;
    });
  }

  // UPDATE
  updateServer(server: Server) {
    server.projectName = `UPDATED: ${server.projectName}`;
    server.modified = Date.now();

    this.storageService.updateServer(server).then(server => {
      this.showToast('Server updated!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadServers(); // Or update it inside the array directly
    });
  }

  // DELETE
  deleteServer(server: Server) {
    this.storageService.deleteServer(server.id).then(server => {
      this.showToast('Server removed!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadServers(); // Or splice it from the array directly
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
