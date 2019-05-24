import {Component, OnInit, ViewChild} from '@angular/core';
import { Platform, ToastController, IonList } from '@ionic/angular';
import {Server, StorageService} from '../../services/storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
// this is the controller now, no function in brackets
export class SettingsPage implements OnInit {
    servers: Server[] = [];
    newServer: Server = <Server> {};
    selectedServer: Server = <Server> {};

    // USE DOM ELEMENT TO
    @ViewChild('mylist')mylist: IonList;

    constructor(private router: Router, private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
        this.plt.ready().then(() => {
            this.loadServers();
        });
    }

    ngOnInit(): void {
        this.mylist.closeSlidingItems();
        this.onSelectLoad();
    }

    // READ
    loadServers() {
        this.storageService.getServers().then(servers => {
            this.servers = servers;
        });
    }

    // KEEP SELECTED SERVER
    onSelectChange(selectedValue: any) {
        this.storageService.setSelectedServer(selectedValue.detail.value);
        this.selectedServer = selectedValue.detail.value;
        console.log('Set the selectedServer: ' + this.selectedServer + this.selectedServer.projectName);
    }

    // LOAD SELECTED SERVER
    onSelectLoad() {
        this.storageService.loadSelectedServer().then( server => {
                this.selectedServer = server;
                console.log("OnSelectLoad: " + this.selectedServer + this.selectedServer.projectName);
            }
        );
    }

    // NAVIGATE TO EDIT SITE
    editServer(server: Server) {
        this.mylist.closeSlidingItems();
        this.router.navigate(['/edit-setting', server.id ]);
    }

    // NAVIGATE TO CREATE SITE
    addServer() {
        this.mylist.closeSlidingItems();
        this.router.navigate(['create-setting']);
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
