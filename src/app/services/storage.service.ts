import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  scannedCode: string;
  scannedCodeArray: Array<string>;
  project: string;
  pyWall: string;
  syncServer: string;
  sprintId: string;

  constructor(private storage: Storage) {
    this.project = '';
    this.pyWall = '';
    this.syncServer = '';
    this.sprintId = '';
  }

  setStorageVariables() {
  // setStorageVariables(projectName: string, pyWallServerURL: string, pySyncServerURL: string, sprintId: string) {
    this.storage.set('projectName', this.project);
    this.storage.set('pyWallServerURL', this.pyWall);
    this.storage.set('pySyncServerURL', this.syncServer);
    this.storage.set('sprintId', this.sprintId);
  }

  getStorageVariables() {
    this.storage.forEach( (storageValues ) => {
      console.log(storageValues);
    });
    this.storage.get('projectName').then(value => {
      this.project = value;
    });
    this.storage.get('pyWallServerURL').then(value => {
      this.pyWall = value;
    });
    this.storage.get('pySyncServerURL').then(value => {
      this.syncServer = value;
    });
    this.storage.get('sprintId').then(value => {
      this.sprintId = value;
    });
  }
}
