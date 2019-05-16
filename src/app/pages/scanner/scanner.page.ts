import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})

export class ScannerPage implements OnInit {
  scannedCode: string;
  scannedCodeArray: Array<string>;

  constructor(private barcodeScanner: BarcodeScanner, private storageService: StorageService) {
  }

  ngOnInit() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.scannedCodeArray = this.scannedCode.split(';');

      if (this.scannedCodeArray) {
        this.storageService.project = this.scannedCodeArray[0];
        this.storageService.pyWall = this.scannedCodeArray[1];
        this.storageService.syncServer = this.scannedCodeArray[2];
        this.storageService.sprintId = this.scannedCodeArray[3];
        this.storageService.setStorageVariables();
        this.storageService.getStorageVariables();
      }
    });
  }



  getStorageVariables() {
  }
}

/*//FOR NATIVE API CALLS CHECK STATUS OF NATIVE ENVIRONMENT
this.platform.ready().then(() => {
if (this.platform.is('cordova')) {
  // make your native API calls
} else {
  // fallback to browser APIs
}
});*/



