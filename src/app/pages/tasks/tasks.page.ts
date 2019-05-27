import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {Server, StorageService} from '../../services/storage.service';
import {TasksService} from '../../services/tasks.service';
import {Router} from '@angular/router';
import {Platform, ToastController} from '@ionic/angular';
import {AlertService} from "../../services/alert.service";
import {Sprint} from "../../models/sprint";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: ['./tasks.page.scss'],
})
export class TasksPage {
    selectedServer: Server = <Server>{};
    sprints: Sprint[] = [];
    tasks: Task[] = [];
    tasksNewestFirst: Task[] = [];

    constructor(private router: Router, private alertService: AlertService, private toastController: ToastController, private storageService: StorageService, private plt: Platform, private tasksService: TasksService) {
    }

    ionViewWillEnter() {
        this.getSelectedServer();
    }

    // KEEP SELECTED SERVER WHEN LEAVING THE PAGE
    onSelectChange(selectedValue: any) {
        this.selectedServer.sprintId = selectedValue.detail.value;
        this.storageService.setSelectedServerSprintId(this.selectedServer.sprintId);
    }

    getSelectedServer() {
        this.storageService.getSelectedServer().then(server => {
            if (server) {
                console.log("Server" + JSON.stringify(server));
                this.selectedServer = server;
                if (!this.selectedServer.sprintId && this.selectedServer.projectName) {
                    this.tasksService.getSprints(this.selectedServer.projectName).subscribe(sprints => {
                        this.sprints = sprints;
                        this.tasksService.list(this.selectedServer.projectName, this.selectedServer.sprintId).subscribe(plannedTasks => {
                            console.log("IF PlannedTasks are: " + plannedTasks);
                            this.tasks = plannedTasks;
                            this.tasksNewestFirst = this.tasks.reverse();
                        });
                    });
                } else if (this.selectedServer.projectName) {
                    this.tasksService.list(this.selectedServer.projectName, this.selectedServer.sprintId).subscribe(plannedTasks => {
                        console.log("ELSE PlannedTasks are: " + plannedTasks);
                        this.tasks = plannedTasks;
                        this.tasksNewestFirst = this.tasks.reverse();
                    });
                }
            }
            console.log('ConstructorCall: ' + this.selectedServer.projectName);
        });
    }

    // NAVIGATE TO EDIT TASK SITE
    editTask(task: Task) {
        this.router.navigate(['/edit-task', task.id ]);
    }

    // NAVIGATE TO CREATE TASK SITE
    addTask() {
        this.router.navigate(['create-task']);
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
