import {Component, ViewChild} from '@angular/core';
import {Server, StorageService} from '../../services/storage.service';
import {IonList, Platform} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from "../../services/toast.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.page.html',
  styleUrls: ['./edit-setting.page.scss'],
})

export class EditSettingPage {
  servers: Server[] = [];
  editServer: Server = <Server> {};

  constructor(private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService,
              private storageService: StorageService,
              private plt: Platform,
              private router: Router) {
  }

  ionViewWillEnter() {
    this.loadServers();
    this.getServerByUrlParam();
  }

  // USES URL ID TO GET SERVER DATA
  getServerByUrlParam() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.storageService.getServerById(id).then(server => {
      this.editServer = server;
    });
  }

  // UPDATE
  updateServer() {
    this.editServer.modified = Date.now();

    this.storageService.updateServer(this.editServer).then(servers => {
      console.log(servers);
      console.log(this.editServer);
      this.toastService.showToast('Server updated!');
      this.loadServers(); // Or update it inside the array directly
    });
  }

  // DELETE
  deleteServer(id: number) {
    this.alertService.alertDeleteSetting(id);
  }

  // READ
  loadServers() {
    this.storageService.getServers().then(servers => {
      this.servers = servers;
    });
  }
}
