import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from '../../models/task';
import {IonList, Platform} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {TasksService} from '../../services/tasks.service';
import {Server, StorageService} from '../../services/storage.service';
import {ToastService} from "../../services/toast.service";

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.page.html',
    styleUrls: ['./create-task.page.scss'],
})

// TODO: CHECK IF MULTIPLE DEVICES CAN SEND AT THE SAME TIME, ELSE WE NEED A BETTER ID ARCHITECTURE LIKE UUID
export class CreateTaskPage {
    newTask: Task = {} as Task;
    data: any = {} as any;
    selectedServer: Server = {} as Server;
    plannedTasks: Task[] = [];

    @ViewChild('mylist') mylist: IonList;
    @ViewChild('focusName') focusName;
    @ViewChild('focusDescription') focusDescription;


    constructor(private activatedRoute: ActivatedRoute, private toastService: ToastService, private storageService: StorageService, private tasksService: TasksService, private plt: Platform) {
    }

    ionViewWillEnter() {
        this.getSelectedServer();
    }

    ionViewDidEnter() {
        this.focusName.setFocus();
    }

    goToDescription() {
        this.focusDescription.setFocus();
    }

    getSelectedServer() {
        this.storageService.getSelectedServer().then(server => {
            if (server) {
                this.selectedServer = server;
                console.log('SELECTED SERVER: ' + this.selectedServer.projectName);
            }
        });
    }

    // CREATE
    createTask() {
        this.data.projectKey = this.selectedServer.projectName;
        this.data.sprintId = this.selectedServer.sprintId;
        this.data.summary = this.newTask.summary;
        this.data.description = this.newTask.description;
        console.log(JSON.stringify(this.data));

        this.tasksService.create(this.data).subscribe(res => {
            const newPlannedTask = new Task(res.id, res.summary, res.description, null, null, null, null, null, null, null, null, null);
            this.plannedTasks.push(newPlannedTask);
            this.toastService.showToast('Task added!');
            this.newTask = <Task>{};

            this.focusName.setFocus();
        });
    }
}
