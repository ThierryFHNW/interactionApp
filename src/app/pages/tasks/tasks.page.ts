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
    tasks: Observable<any>;
    taskObject: Task;

    constructor(private settingsService: SettingsService, private taskService: TaskService) {
        this.settingsService.getStorageVariables();
    }

    ngOnInit() {
        this.settingsService.getStorageVariables();
    }

    httpGetTasks(): Observable<any> {
        return this.taskService.list(this.settingsService.projectName, this.settingsService.sprintId);
    }

    fetchData() {
        const obj = this;
        if (this.settingsService.getProjectName() && this.settingsService.getSprintId()) {
           this.taskService.list(this.settingsService.getProjectName(), this.settingsService.getSprintId())
                .subscribe(plannedTasks => {
                    this.plannedTasks = plannedTasks;
                });
        }
    }

    consoleLog() {
        console.log("THIS.PLANNEDTASK: " + this.plannedTasks);
    }
}
