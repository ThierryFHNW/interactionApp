import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/index';
import {Storage} from '@ionic/storage';

export interface Setting {
    projectName: string;
    pyWallServer: string;
    syncServer: string;
}

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    // when it exists in localStorage it becomes that value otherwise its null which is its default value anyway
    // TODO rename to projectKey
    projectName: string;
    pyWallServer: string;
    syncServer: string;
    sprintId: string;
    updateSubject = new Subject<void>();

    constructor(private storage: Storage) {
        this.mockStorageVariables();
        // this.setStorageVariables();
        this.getStorageVariables();
    }

   mockStorageVariables() {
        this.storage.set('projectName', 'AWTEST');
        this.storage.set('pyWallServer', 'http://localhost:8000');
        this.storage.set('syncServer', 'http://localhost:9091');
        this.storage.set('sprintId', '285');
    }


    setStorageVariables() {
    // setStorageVariables(projectName: string, pyWallServer: string, pySyncServer: string, sprintId: string) {
        this.storage.set('projectName', this.projectName);
        this.storage.set('pyWallServer', this.pyWallServer);
        this.storage.set('syncServer', this.syncServer);
        if (!this.sprintId) {
            this.storage.set('sprintId', this.sprintId);
        }
    }

    setStorageVariablesParameters(projectName: string, pyWallServer: string, pySyncServer: string, sprintId: string) {
        this.storage.set('projectName', this.projectName);
        this.storage.set('pyWallServer', this.pyWallServer);
        this.storage.set('syncServer', this.syncServer);
        this.storage.set('sprintId', this.sprintId);
    }

/*    getStorageVariables2() {
        return this.storage.keys().then(keys => {
            Promise.all(keys.map(key => console.log(this.storage.get(key))));
        });*/

        /*return this.storage.keys()
            .then(keys => Promise.all(keys.map(k => this.storage.get(k))));
    }*/

    getStorageVariables() {
        this.storage.forEach((storageValues) => {
            console.log(storageValues);
        });
        this.storage.get('projectName').then(value => {
            this.projectName = value;
        });
        this.storage.get('pyWallServer').then(value => {
            this.pyWallServer = value;
        });
        this.storage.get('syncServer').then(value => {
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
        localStorage.setItem('projectName', this.projectName);
    }

    /**
     * Sets a new sprintId and persists the new setting to localstorage
     */
    setSprintId(sprintId: string): void {
        this.sprintId = sprintId;
        localStorage.setItem('sprintId', this.sprintId);
    }

}
