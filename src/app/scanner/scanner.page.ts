import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
    qrData = null;
    createdCode = null;
    scannedCode = null;
    scannedCodeArray: Array<string> = null;
    constructor(private barcodeScanner: BarcodeScanner) {
    }

  createCode() {
    this.createdCode = this.qrData;
    console.log(this.createdCode);
  }

  scanCode() {
        this.barcodeScanner.scan().then(barcodeData => {
            this.scannedCode = barcodeData.text;
            this.scannedCodeArray = this.scannedCode.split(';', this.scannedCodeArray.length);
        });
  }

// Optionally request the permission early
  ngOnInit() {
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



