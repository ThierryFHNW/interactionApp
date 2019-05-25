import {Component, OnInit, ViewChild} from '@angular/core';
import { Task } from '../../models/task';
import {IonList, Platform, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {TasksService} from '../../services/tasks.service';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.page.html',
    styleUrls: ['./create-task.page.scss'],
})

export class CreateTaskPage implements OnInit {
    tasks: Task[] = [];
    newTask: Task = {} as Task;
    taskId: string;

    @ViewChild('mylist') mylist: IonList;

    constructor(private activatedRoute: ActivatedRoute, private tasksService: TasksService, private plt: Platform, private toastController: ToastController) {
        this.plt.ready().then(() => {
            this.loadTasks();
        });
    }

    ngOnInit() {
    }

    // CREATE
    createTask() {
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
