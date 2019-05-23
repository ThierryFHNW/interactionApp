import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/index';
import {Storage} from '@ionic/storage';
import {Setting} from '../models/setting';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    // when it exists in localStorage it becomes that value otherwise its null which is its default value anyway
    // TODO rename to projectKey
    setting: Setting;
    projectName: string;
    pyWallServer: string;
    syncServer: string;
    sprintId: string;
    updateSubject = new Subject<void>();

    constructor(private storage: Storage) {
        this.mockStorageVariables();
        this.getStorageVariables();
        // this.getStorageVariables();
    }

    // keys() returns a promise to get store values
    // length() to get number of stored values
    // ready() resolves if store is ready
    // set(key) returns a promise that resolves when key and value are set
    // get(key)
    mockStorageVariables() {
        this.storage.set('projectName', 'AWTEST');
        this.storage.set('pyWallServer', 'http://localhost:8000');
        this.storage.set('syncServer', 'http://localhost:9091');
        this.storage.set('sprintId', '285');
    }


    setStorageVariables() {
        // setStorageVariables(projectName: string, pyWallServer: string, pySyncServer: string, sprintId: string) {
        const p1 = this.storage.set('projectName', this.projectName);
        const p2 = this.storage.set('pyWallServer', this.pyWallServer);
        const p3 = this.storage.set('syncServer', this.syncServer);
        const p4 = this.storage.set('sprintId', this.sprintId);
        console.log('PromiseObject1: ' + p1);
        console.log('P2: ' + p2);
        console.log('P3: ' + p3);
        console.log('P4: ' + p4);
        Promise.all([p1, p2, p3, p4]).then(values => console.log(values));
    }

    setStorageVariablesParameters(projectName: string, pyWallServer: string, pySyncServer: string, sprintId: string) {
        this.storage.set('projectName', this.projectName);
        this.storage.set('pyWallServer', this.pyWallServer);
        this.storage.set('syncServer', this.syncServer);
        this.storage.set('sprintId', this.sprintId);
    }

    getStorageVariablesForEach() {
        this.storage.forEach((value, key, iterationNumber) => {
            console.log(iterationNumber + ', ' + key + ', ' + value);
        });
    }


    async getStorageVariables() {
        this.storage.forEach((storageValues) => {
            console.log(storageValues);
        });
        await this.storage.get('projectName').then(value => {
            this.projectName = value;
        });
        await this.storage.get('pyWallServer').then(value => {
            this.pyWallServer = value;
        });
        await this.storage.get('syncServer').then(value => {
            this.syncServer = value;
        });
        await this.storage.get('sprintId').then(value => {
            this.sprintId = value;
        });
    }

    getProjectName(): string {
        return this.projectName;
    }

    getSprintId(): string {
        return this.sprintId;
    }

    getPyWall(): string {
        console.log('this.pyWallServer ' + this.pyWallServer);
        return this.pyWallServer;
    }

    getSyncServer(): string {
        return this.syncServer;
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
        this.storage.set('projectName', this.projectName);
    }

    /**
     * Sets a new sprintId and persists the new setting to localstorage
     */
    setSprintId(sprintId: string): void {
        this.sprintId = sprintId;
        this.storage.set('sprintId', this.sprintId);
    }

}
