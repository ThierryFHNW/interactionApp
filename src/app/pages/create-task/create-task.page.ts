import {Component, OnInit, ViewChild} from '@angular/core';
import { Task } from '../../models/task';
import {IonList, Platform, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {TasksService} from '../../services/tasks.service';
import {Server, StorageService} from '../../services/storage.service';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.page.html',
    styleUrls: ['./create-task.page.scss'],
})

export class CreateTaskPage implements OnInit {
    tasks: Task[] = [];
    newTask: Task = {} as Task;
    data: any = {} as any;


    selectedServer: Server = <Server>{};
    plannedTasks: Task[] = [];

    @ViewChild('mylist') mylist: IonList;

    constructor(private activatedRoute: ActivatedRoute, private storageService: StorageService, private tasksService: TasksService, private plt: Platform, private toastController: ToastController) {
        this.plt.ready().then(() => {
            this.loadTasks();
        });
    }

    ngOnInit() {
        this.loadSelectedServer();
    }

    loadSelectedServer() {
        this.storageService.loadSelectedServer().then(server => {
            if (server) {
                this.selectedServer = server;
                console.log('SELECTED SERVER: ' + this.selectedServer.projectName);
            }
        });
    }

    // CREATE
    createTask() {
        // this.newTask.modified = Date.now();
        this.newTask.id = Date.now(); // needs to be changed to UUID
        console.log(this.newTask.summary);
        console.log(this.newTask.description);
        console.log(this.selectedServer.projectName);
        console.log(this.selectedServer.sprintId);
        this.data.projectKey = this.selectedServer.projectName;
        this.data.sprintId = this.selectedServer.sprintId;
        this.data.summary = this.newTask.summary;
        this.data.description = this.newTask.description;

        console.log(JSON.stringify(this.data));
        console.log(JSON.stringify(this.newTask));


        this.tasksService.create(this.data).subscribe(res => {
            const newPlannedTask = new Task(res.id, res.summary, res.description, null, null, null, null, null, null, null, null, null);
            this.plannedTasks.push(newPlannedTask);
            this.showToast('Task added!');
            this.loadTasks(); // Or add it to the array directly
        });
    }

    // CREATE
    createTaskBackup() {
        // this.newTask.modified = Date.now();
        this.newTask.id = Date.now(); // needs to be changed to UUID

        this.tasksService.create(this.newTask).subscribe(task => {
            this.newTask = {} as Task;
            this.showToast('Task added!');
            this.loadTasks(); // Or add it to the array directly
        });
    }

    // READ
    loadTasks() {
/*        this.tasksService.getTasks().then(tasks => {
            this.tasks = tasks;
        });*/
    }

    // Helper
    async showToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
}
