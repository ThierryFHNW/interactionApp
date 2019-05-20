import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';


/*
import { FormBuilder } from "@angular/forms";
*/

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
    scannedCode: string;
    scannedCodeArray: Array<string>;
    pyWallServerURL: string;
    pySyncServerURL: string;
    projectName: string;
    sprintId: string;
    searchQuery = '';
    taskName = [];
    tasks = [];

    constructor(private taskService: TaskService) {
        /*this.initializeTasks();*/
    }

    httpRequest() {

    }


    /*initializeTasks() {
        this.taskService.getTasks()
            .subscribe( data => this.tasks = data);
        console.log(this.tasks);
        console.log(this.tasks.values());
    }*/

    ngOnInit() {
        /*this.mockStorageVariables();
        this.getStorageVariables();
        this.initializeTasks();*/
    }

    /*
    mockStorageVariables() {
        this.storage.set('pyWallServerURL', 'http://localhost:8000');
        this.storage.set('pySyncServerURL', 'http://localhost:9091');
        this.storage.set('projectName', 'AWDEMO');
        this.storage.set('sprintId', '213');
    }*/

}
