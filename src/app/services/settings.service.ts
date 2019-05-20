import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/index';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // when it exists in localStorage it becomes that value otherwise its null which is its default value anyway
  // TODO rename to projectKey
  pyWallServer = 'http://localhost:8000';
  syncServer = 'http://localhost:9091';
  projectName = 'AWDEMO';
  sprintId = '213';
  updateSubject = new Subject<void>();
  /**
   * if this is set to true the rest services should return local test data and not send update requests to the server
   * this setting can be used when jira is down
   */
  private mock = false;

  constructor(private storage: Storage) {  }

  setStorageVariables() {
    // setStorageVariables(projectName: string, pyWallServerURL: string, pySyncServerURL: string, sprintId: string) {
    this.storage.set('projectName', this.projectName);
    this.storage.set('pyWallServer', this.pyWallServer);
    this.storage.set('pySyncServer', this.syncServer);
    this.storage.set('sprintId', this.sprintId);
  }

  getStorageVariables2() {
    return this.storage.keys().then(keys => {
      Promise.all(keys.map(key => console.log(this.storage.get(key))));
    });

    /*return this.storage.keys()
        .then(keys => Promise.all(keys.map(k => this.storage.get(k))));*/
  }

  getStorageVariables() {
    this.storage.forEach( (storageValues ) => {
      console.log(storageValues);
    });
    this.storage.get('projectName').then(value => {
      this.projectName = value;
    });
    this.storage.get('pyWallServerURL').then(value => {
      this.pyWallServer = value;
    });
    this.storage.get('pySyncServerURL').then(value => {
      this.syncServer = value;
    });
    this.storage.get('sprintId').then(value => {
      this.sprintId = value;
    });
  }

  getProjectName(): string {
    return this.projectName;
  }

  getSprintId(): string {
    return this.sprintId;
  }

  isMock(): boolean {
    return this.mock;
  }

  /**
   * components can subscribe to this observable to be notified when settings change and they need to reload data
   * @returns {Observable<void>}
   */
  getUpdateObservable(): Observable<void> {
    return this.updateSubject.asObservable();
  }

  /**
   * this function will inform all listeners to the update observable
   * and saves the settings to local storage
   */
  emitSettingsUpdate(): void {
    this.updateSubject.next();
  }

  /**
   * Sets a new projectName and persists the new setting to localstorage
   */
  setProjectName(projectName: string): void {
    this.projectName = projectName;
    localStorage.setItem('projectName', this.projectName);
  }

  /**
   * Sets a new sprintId and persists the new setting to localstorage
   */
  setSprintId(sprintId: string): void {
    this.sprintId = sprintId;
    localStorage.setItem('sprintId', this.sprintId);
  }

  /*
  mockStorageVariables() {
      this.storage.set('pyWallServerURL', 'http://localhost:8000');
      this.storage.set('pySyncServerURL', 'http://localhost:9091');
      this.storage.set('projectName', 'AWDEMO');
      this.storage.set('sprintId', '213');
  }*/

}
