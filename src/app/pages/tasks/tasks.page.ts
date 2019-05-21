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
        this.settingsService.mockStorageVariables();
        this.settingsService.getStorageVariables();
    }

    ngOnInit() {
        // this.settingsService.mockStorageVariables();
        // this.settingsService.getStorageVariables();
/*        this.tasks = this.httpGetTasks();
        console.log(this.tasks);*/
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

/*    createTask(event: any) {
        // use a html toast to return success message
        const obj = this;
        this.createTaskDialogRef = this.addTaskDialog.open(CreateTaskDialogComponent, {
            data: {
                summary: null,
                description: null,
                projectKey: this.settingsService.getProjectName(),
                sprintId: this.settingsService.getSprintId()
            }
        });

        this.createTaskDialogRef.afterClosed().subscribe(taskData => {
            if (taskData) {
                this.plannedTaskService.create(taskData).subscribe(res => {
                    const newPlannedTask = new Task(res.id, res.summary, res.description, null, null, null, null, null, null, null, null, null);
                    this.plannedTasks.push(newPlannedTask);
                });
            }
        });
    }*/

    consoleLog() {
        console.log(this.plannedTasks);
    }
}
