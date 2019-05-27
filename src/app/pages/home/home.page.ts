import {Component, OnInit} from '@angular/core';
import {Server, StorageService} from '../../services/storage.service';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {
    selectedServer: Server = <Server>{};

    constructor(private storageService: StorageService, private plt: Platform) {
    }

    ionViewWillEnter() {
        this.storageService.getSelectedServer().then(server => {
            this.selectedServer = server;
            console.log('Engine Start ' + this.selectedServer.projectName);
            console.log('Engine Start ' + this.selectedServer.pyWallServer);
            console.log('Engine Start ' + this.selectedServer.syncServer);
            console.log('Engine Start ' + this.selectedServer.sprintId);
        });
    }
}
