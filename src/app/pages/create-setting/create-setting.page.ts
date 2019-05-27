import {Component, OnInit, ViewChild} from '@angular/core';
import {Server, StorageService} from '../../services/storage.service';
import {IonList, Platform, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-create-setting',
    templateUrl: './create-setting.page.html',
    styleUrls: ['./create-setting.page.scss'],
})

/* TODO: 1. If two settings are exactly the same
   TODO: 2. Show Settings with same Title differently
   TODO: 3.
*/
export class CreateSettingPage {
    servers: Server[] = [];
    newServer: Server = <Server>{};

    constructor(private activatedRoute: ActivatedRoute, private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    }

    ionViewWillEnter() {
            this.loadServers();
    }


    // CREATE
    createServer() {
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

    // Helper
    async showToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
}
