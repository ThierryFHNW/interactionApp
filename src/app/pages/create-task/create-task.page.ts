import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from '../../models/task';
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
    newTask: Task = {} as Task;
    data: any = {} as any;
    selectedServer: Server = {} as Server;
    plannedTasks: Task[] = [];

    @ViewChild('mylist') mylist: IonList;

    constructor(private activatedRoute: ActivatedRoute, private storageService: StorageService, private tasksService: TasksService, private plt: Platform, private toastController: ToastController) {
        this.plt.ready().then(() => {
            this.loadTasks();
        });
    }

    ngOnInit() {
        this.getSelectedServer();
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
