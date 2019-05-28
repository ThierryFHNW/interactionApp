import {Component} from '@angular/core';
import {Server, StorageService} from '../../services/storage.service';
import {IonList, Platform, } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from "../../services/toast.service";

@Component({
    selector: 'app-create-setting',
    templateUrl: './create-setting.page.html',
    styleUrls: ['./create-setting.page.scss'],
})

/* TODO: 1. If two settings are exactly the same
   TODO: 2. If two setttings have the same title, how to differ?
   TODO: 3. Form validation
*/
export class CreateSettingPage {
    servers: Server[] = [];
    newServer: Server = <Server>{};

    constructor(private activatedRoute: ActivatedRoute,
                private toastService: ToastService,
                private storageService: StorageService,
                private plt: Platform) {
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
            this.toastService.showToast('Server added!')
            this.loadServers(); // Or add it to the array directly
        });
    }

    // GET SERVERS
    loadServers() {
        this.storageService.getServers().then(servers => {
            this.servers = servers;
        });
    }
}
