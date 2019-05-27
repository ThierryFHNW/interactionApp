import {Component, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Server, StorageService} from '../../services/storage.service';
import {Platform, ToastController} from '@ionic/angular';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-scanner',
    templateUrl: './scanner.page.html',
    styleUrls: ['./scanner.page.scss'],
})

// TODO: 1. If two settings are exactly the same overwrite the other setting
export class ScannerPage {
    mock = true;
    servers: Server[] = [];
    newServer: Server = <Server>{};
    scannedCode: string;
    scannedCodeArray: string[];
    scannedCodeArrayMock = ['AWMM', 'http://localhost:8000', 'http://localhost:9091', '320'];
    scannedCodeArrayMock2 = ['AWTEST', 'http://fl-0-199.zhdk.cloud.switch.ch/dev-api', 'http://fl-0-199.zhdk.cloud.switch.ch/dev/sync-server/', '285'];

    constructor(private barcodeScanner: BarcodeScanner,
                private toastController: ToastController,
                private storageService: StorageService, private alertService: AlertService, private plt: Platform) {
    }

    ionViewWillEnter() {
        if (this.mock === true) {
            this.useScannerMock(this.scannedCodeArrayMock);
        } else {
            this.useScanner();
        }
    }

    useScannerMock(scannedCodeArrayMock: string[]) {
        if (scannedCodeArrayMock) {
            this.addServer(scannedCodeArrayMock);
        }
    }

    useScanner() {
        this.barcodeScanner.scan().then(barcodeData => {
            this.scannedCode = barcodeData.text;
            this.scannedCodeArray = this.scannedCode.split(';');
            this.addServer(this.scannedCodeArray);
        });
    }

    // CREATE
    addServer(scannedCodeArray: string[]) {
        if (scannedCodeArray) {
            this.newServer.projectName = this.scannedCodeArrayMock[0];
            this.newServer.pyWallServer = this.scannedCodeArrayMock[1];
            this.newServer.syncServer = this.scannedCodeArrayMock[2];
            this.newServer.sprintId = this.scannedCodeArrayMock[3];
            this.newServer.modified = Date.now();
            this.newServer.id = Date.now();

            this.storageService.addServer(this.newServer).then(server => {
                this.showToast('Server added!')
                this.loadServers(); // Or add it to the array directly
            });
        }
        this.storageService.setSelectedServer(this.newServer);
        this.alertService.alertScan(this.newServer);
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
