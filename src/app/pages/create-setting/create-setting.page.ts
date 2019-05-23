import {Component, OnInit, ViewChild} from '@angular/core';
import {Server, StorageService} from '../../services/storage.service';
import {IonList, Platform, ToastController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './create-setting.page.html',
  styleUrls: ['./create-setting.page.scss'],
})


export class CreateSettingPage implements OnInit {
  servers: Server[] = [];
  newServer: Server = <Server> {};
  serverId: string;

  @ViewChild('mylist')mylist: IonList;

  constructor(private activatedRoute: ActivatedRoute, private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadServers();
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.servers);
    this.serverId = id;
  }

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
