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
export class TasksPage implements OnInit {
    selectedServer: Server = <Server>{};
    sprints: Sprint[] = [];

    constructor(private router: Router, private alertService: AlertService, private toastController: ToastController, private storageService: StorageService, private plt: Platform, private tasksService: TasksService) {
        this.plt.ready().then(() => {
            this.loadSelectedServer();
        });
    }

    ngOnInit() {
        this.loadSelectedServer();
        console.log('ngOnInitCall: ' + this.selectedServer.projectName);
    }

    // KEEP SELECTED SERVER WHEN LEAVING THE PAGE
    onSelectChange(selectedValue: any) {
        this.selectedServer.sprintId = selectedValue.detail.value;
        this.storageService.setSelectedServerSprintId(this.selectedServer.sprintId);
    }

    loadSelectedServer() {
        this.storageService.loadSelectedServer().then(server => {
            if (server) {
                console.log("Server" + server);
                this.selectedServer = server;
                if (!this.selectedServer.sprintId && this.selectedServer.projectName) {
                        this.tasksService.getSprints(this.selectedServer.projectName).subscribe(sprints => {
                            this.sprints = sprints;
                            // this.alertService.alertSelectedServerHasNoSprint(sprints);
                        });
                } else {
                    this.tasksService.fetchTasks();
                }
            }
            console.log('ConstructorCall: ' + this.selectedServer.projectName);
        });
    }

    // NAVIGATE TO EDIT SITE
    editTask(task: Task) {
        this.router.navigate(['/edit-task', task.id ]);
    }

    // NAVIGATE TO CREATE SITE
    addTask() {
        this.router.navigate(['create-task']);
    }

    /**
    * Load all Sprints of a specific Project.
    */
/*    loadSprintsForProject(projectName: string): void {
        this.sprintService.getSprints(projectName).subscribe(fetchedSprints => {
            this.sprints = fetchedSprints;
            // Reverse so we have to most recently created sprint on top
            this.sprints.reverse();
            // check if sprint is set in dropdown
            if (this.selectedSprintId !== null) {
                // add sprint when page is loaded or sprint dropdown changed
                this.sprintService.getSprintById(this.selectedSprintId).subscribe(existSprint => {
                    if (existSprint === null) {
                        this.selectedSprint = this.sprints.find(x => x.id === this.selectedSprintId);
                        this.selectedSprint.projectId = this.projectId;
                        // save sprint in database if not contain, sprint id is unique
                        this.sprintService.addSprint(this.selectedSprint).subscribe(sprint => {
                        });
                    }
                });
            }
        });
    }*/

    // Helper
    async showToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
}
