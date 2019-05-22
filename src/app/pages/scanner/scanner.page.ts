import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})

export class ScannerPage implements OnInit {
  scannedCode: string;
  scannedCodeArray: Array<string>;

  constructor(private barcodeScanner: BarcodeScanner, private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.scannedCodeArray = this.scannedCode.split(';');

      if (this.scannedCodeArray) {
        this.settingsService.projectName = this.scannedCodeArray[0];
        this.settingsService.pyWallServer = this.scannedCodeArray[1];
        this.settingsService.syncServer = this.scannedCodeArray[2];
        this.settingsService.sprintId = this.scannedCodeArray[3];
      }
    });
  }
}
