import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sprint } from '../../models/sprint';
/*
import { ProjectService } from '../../services/project.service';
import { SprintService } from '../../services/sprint.service';
import { SettingsService } from '../../services/settings.service';
import { PlannedTaskService } from '../../services/planned-task.service';
import {UserstoryConfirmationComponent} from '../../components/userstory-confirmation/userstory-confirmation.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {TaskConfirmationComponent} from '../../components/task-confirmation/task-confirmation.component';
import { SynchronizationService } from '../../services/synchronization.service';
*/


interface Task {
  projectKey: string;
  sprintId: string;
  summary: string;
  description: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  ngOnInit() {
  }
/*
  projects: string[];
  sprints: Sprint[];
  taskName: string;
  taskDescription: string;
  selectedProjectKey: string;
  selectedSprintId: number;
  task: Task;
  projectId;
  selectedSprint: Sprint;
  showProjectAndSprintSelection = false;
  private createdTaskConfirmationDialogRef: MatDialogRef<TaskConfirmationComponent>;

  constructor(
      private projectService: ProjectService,
      private sprintService: SprintService,
      private settingsService: SettingsService,
      private plannedtaskService: PlannedTaskService,
      private createdTaskConfirmationDialog: MatDialog,
      private synchronization: SynchronizationService
  ) {
  }

  ngOnInit() {
    this.task = { summary: '', description: '', projectKey: '', sprintId: '' };
    this.setCurrentProjectAndSprint();
    // this.setCurrentProjectAndSprint();
    // this.loadProjectAndSprintData();
  }


  setCurrentProjectAndSprint(): void {
    this.selectedProjectKey = this.settingsService.getProjectName();
    // TODO neccessary because Settingsservice treats sprint.id as a string
    this.selectedSprintId = parseInt(this.settingsService.getSprintId(), 10);
    if (this.selectedProjectKey === undefined || this.selectedProjectKey == null) {
      this.showProjectAndSprintSelection = true;
      this.loadProjectAndSprintData();
    }
  }

  /!**
   * Load all Projects to populate Project-Select-Options.
   * Load Sprints for current Project to populate the Sprint-Select-Options.
   *!/
  loadProjectAndSprintData(): void {
    this.projectService.getProjects().subscribe(fetchedProjects => {
      this.projects = fetchedProjects;
      this.saveProject(this.selectedProjectKey);
    });
  }

  saveProject(projectName: string): void {
    if (projectName) {
      this.projectService.getProjectByKey(projectName).subscribe(existProject => {
        if (existProject === null) {
          // save project in database if not contain, project key is unique
          this.projectService.saveProjectOnInitialisation(projectName).subscribe(project => {
            this.projectId = project['id'];
            // project is set call listeners for update
            this.settingsService.emitSettingsUpdate();
            this.loadSprintsForProject(this.selectedProjectKey);
          });
        } else {
          this.projectId = existProject['id'];
          this.loadSprintsForProject(this.selectedProjectKey);
        }
      });
    }
  }

  /!**
   * Load all Sprints of a specific Project.
   *!/
  loadSprintsForProject(projectName: string): void {
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
  }

  createTask() {
    this.task.projectKey = this.selectedProjectKey;
    this.task.sprintId = this.selectedSprintId.toString();
    this.task.summary = this.taskName;
    this.task.description = this.taskDescription;
    this.plannedtaskService.create(this.task).subscribe((data => {
      this.synchronization.sendEvent('updatePlannedTasks', data);
      console.log(data);
      this.openConfirmationDialog(this.taskName, this.taskDescription);
      this.taskName = '';
      this.taskDescription = '';
    }));
  }

  openConfirmationDialog(taskName: string, taskDescription: string) {
    this.createdTaskConfirmationDialogRef = this.createdTaskConfirmationDialog.open(TaskConfirmationComponent, {
      data: { name: taskName, description: taskDescription }
    });
  }
  */

}
