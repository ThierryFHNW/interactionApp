import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {SettingsService} from '../../services/settings.service';
import {Task} from '../../models/task';
import { Subscription, Observable } from 'rxjs/index';


/*
import { FormBuilder } from "@angular/forms";
*/

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
    private plannedTasks: Task[] = [];
    private updateEvent: Subscription;
    private subscriptions: Subscription[] = [];
    private syncEvent: Subscription;
    private intervalSubscription: Subscription;

    pyWallServerURL: string;
    pySyncServerURL: string;
    projectName: string;
    sprintId: string;
    tasks: Observable<any>;

    constructor(private taskService: TaskService, private settingsService: SettingsService) {
        /* this.initializeTasks();*/
    }

    ngOnInit() {
        /*this.mockStorageVariables();
        this.getStorageVariables();
        this.initializeTasks();*/
        this.tasks = this.httpGetTasks();
        console.log(this.tasks);
    }

    httpGetTasks(): Observable<any> {
        return this.taskService.list(this.settingsService.projectName, this.settingsService.sprintId);
    }

    updateData() {
        const obj = this;
        if (this.settingsService.getProjectName() && this.settingsService.getSprintId()) {
           this.taskService.list(this.settingsService.getProjectName(), this.settingsService.getSprintId())
                .subscribe(plannedTasks => {
                    this.plannedTasks = plannedTasks;
                    // this.intervalSubscription = this.getIntervalSubscription();
                });
        }
    }

    consoleLog() {
        console.log(this.plannedTasks);
    }

    /*initializeTasks() {
        this.taskService.getTasks()
            .subscribe( data => this.tasks = data);
        console.log(this.tasks);
        console.log(this.tasks.values());
    }*/


    /*
    mockStorageVariables() {
        this.storage.set('pyWallServerURL', 'http://localhost:8000');
        this.storage.set('pySyncServerURL', 'http://localhost:9091');
        this.storage.set('projectName', 'AWDEMO');
        this.storage.set('sprintId', '213');
    }*/

}
