import {Component, OnInit, ViewChild} from '@angular/core';
import {Platform, IonList} from '@ionic/angular';
import {Server, StorageService} from '../../services/storage.service';
import {Router} from '@angular/router';
import {Task} from "../../models/task";
import {ToastService} from "../../services/toast.service";
import {AlertService} from "../../services/alert.service";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
// this is the controller now, no function in brackets
export class SettingsPage {
    servers: Server[] = [];
    serversNewestFirst: Server[] = [];
    selectedServer: Server = <Server>{};
    emptyTasks: Task[] = [];

    // USE DOM ELEMENT TO
    @ViewChild('mylist') mylist: IonList;

    constructor(private toastService: ToastService,
                private router: Router,
                private storageService: StorageService,
                private plt: Platform,
                private alertService: AlertService) {
    }

    ionViewWillEnter() {
        this.plt.ready().then(() => {
            this.mylist.closeSlidingItems();
            this.loadServers();
            this.onSelectLoad();
        });
    }

    // READ
    loadServers() {
        this.storageService.getServers().then(servers => {
            this.servers = servers;
            this.serversNewestFirst = this.servers.reverse();
        });
        this.storageService.getSelectedServer().then( server => {
            this.selectedServer = server;
        });
    }

    // KEEP SELECTED SERVER WHEN LEAVING THE PAGE
    onSelectChange(selectedValue: any) {
        this.selectedServer = <Server>{};
        this.storageService.setSelectedServer(selectedValue.detail.value).then(selectedServer => {
            this.selectedServer = selectedValue.detail.value;
            console.log('Set the selectedServer: ' + JSON.stringify(this.selectedServer));
            this.toastService.showToast(this.selectedServer.projectName + ' selected!');
            this.loadServers();
        });

        // RESET TASKS WHEN SELECTION IS CHANGED
        this.storageService.setTasks([]);
    }

    // LOAD SELECTED SERVER
    onSelectLoad() {
        this.storageService.getSelectedServer().then(server => {
                this.selectedServer = server;
                console.log("OnSelectLoad: " + this.selectedServer + this.selectedServer.projectName);
            }
        );
    }

    // NAVIGATE TO EDIT SITE
    editServer(server: Server) {
        this.mylist.closeSlidingItems();
        this.router.navigate(['/edit-setting', server.id]);
        // ngDestroy Somehow...();
    }

    // NAVIGATE TO CREATE SITE
    addServer() {
        this.mylist.closeSlidingItems();
        this.router.navigate(['create-setting']);
    }

    // DELETE SERVER - COULD BE REWRITTEN WITH ALERTSERVICE
    deleteServer(server: Server) {
        this.storageService.deleteServer(server.id).then(() => {
            this.toastService.showToast('Server removed!');
            this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
            this.loadServers(); // Or splice it from the array directly
        });
    }
}
