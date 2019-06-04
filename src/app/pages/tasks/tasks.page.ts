import {Component, NgZone, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {Server, StorageService} from '../../services/storage.service';
import {TasksService} from '../../services/tasks.service';
import {Router} from '@angular/router';
import {Events, Platform} from '@ionic/angular';
import {AlertService} from '../../services/alert.service';
import {Sprint} from '../../models/sprint';
import {SharedService} from '../../services/shared.service';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
    selectedServer: Server = <Server>{};
    sprints: Sprint[] = [];
    tasks: Task[] = [];
    error: any;
    tasksNewestFirst: Task[] = [];
    message: string;

    constructor(public events: Events,
                private zone: NgZone,
                private router: Router,
                private alertService: AlertService,
                private storageService: StorageService,
                private plt: Platform,
                private tasksService: TasksService,
                private sharedService: SharedService
    ) {
        this.events.subscribe('updateScreen', () => {
            this.zone.run(() => {
                console.log('force update the screen');
            });
        });
    }

    ngOnInit() {
        this.sharedService.currentMessage.subscribe(message => {
            this.message = message;
        } );
        console.log(this.message);
        this.siblingsChangeMessage();
        console.log(this.message);
    }

    ionViewWillEnter() {
        this.storageService.getSelectedServer().then(server => {
            this.selectedServer = server;
            (!server.sprintId) ? this.getSprints(this.selectedServer) : this.getTasks(this.selectedServer);
        });
    }


    siblingsChangeMessage() {
        this.sharedService.changeMessage('Tasks changed the value');
    }

    // ON SPRINT SELECTION ADD SPRINT ID TO SELECTED SERVER AND GET TASKS
    onSelectChange(selectedSprintId: any) {
        this.storageService.setSelectedServerSprintId(selectedSprintId.detail.value)
            .then(server => {
                this.selectedServer = server;
                this.getTasks(this.selectedServer);
            });
    }

    getSprints(server: Server) {
        this.tasksService.getSprints(server.projectName).subscribe(sprints => {
            this.sprints = sprints;
        });
    }

    getTasks(server: Server) {
            if (!server) {
                console.log("TODO: ALERT Server needs to be selected");
            } else if (server.sprintId && server.projectName) {
                console.log("PERFECT - LOAD TASKS");
                this.tasksService.list(server.projectName, server.sprintId).subscribe(plannedTasks => {
                    this.tasks = plannedTasks;
                    this.tasksNewestFirst = this.tasks.reverse();
                    this.storageService.setTasks(this.tasks);
                });
            }
            this.events.publish('updateScreen');
    }

    // NAVIGATE TO EDIT TASK SITE
    editTask(task: Task) {
        this.router.navigate(['/edit-task', task.id]);
    }

    // NAVIGATE TO CREATE TASK SITE
    addTask() {
        this.router.navigate(['create-task']);
    }
}
