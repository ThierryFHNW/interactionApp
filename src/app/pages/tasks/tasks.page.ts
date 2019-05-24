import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import { Subscription, Observable } from 'rxjs/index';
import {Server, StorageService} from '../../services/storage.service';
import {TasksService} from '../../services/tasks.service';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
    private plannedTasks: Task[] = [];
    tasks: Observable<any>;
    selectedServer: Server = <Server> {};

    constructor(private storageService: StorageService, private tasksService: TasksService) {
        this.storageService.loadSelectedServer().then(server => {
            this.selectedServer = server;
            console.log('ConstructorCall: ' + this.selectedServer.projectName);
        });
    }

    ngOnInit() {
        console.log('ngOnInitCall: ' + this.selectedServer.projectName);
    }

    fetchData() {
        const obj = this;
        console.log(this.selectedServer.projectName + ' ' + this.selectedServer.sprintId)
        if (this.selectedServer.projectName && this.selectedServer.sprintId) {
           this.tasksService.list(this.selectedServer.projectName, this.selectedServer.sprintId)
                .subscribe(plannedTasks => {
                    this.plannedTasks = plannedTasks;
                    console.log("THIS.PLANNEDTASK: " + this.plannedTasks);
                    console.log("THIS.SELECTEDSERVER: " + this.selectedServer);
                });
        }
    }
}
