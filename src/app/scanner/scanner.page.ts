import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  constructor(private qrScanner: QRScanner) {}

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



