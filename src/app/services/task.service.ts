import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ConfigLoaderService } from '../config/configloader.service';
import { SettingsService } from './settings.service';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { Task } from '../models/task';
import { map } from 'rxjs/operators';

export interface PlannedTask {
  id: number;
  projectId: string;
  sprintId: string;
  summary: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

// BACKEND LOOKS LIKE THIS
// @app.route('/projects/plannedtasks/<project_key>/<sprint_id>', methods=['GET'])
// def get_plannedTasks(project_key, sprint_id):

export class TaskService {
  private mockedURL = '/assets/data/tasks.json';
  private projectBaseURL: string;

  constructor(private http: HttpClient,
              private settingsService: SettingsService,
              private messageService: MessageService)
   {
     this.projectBaseURL = `${this.settingsService.pyWallServer}/projects`;
     console.log('this.projectBaseURL 1: ' + this.projectBaseURL
    );
  }

  list(projectName: string, sprintId: string): Observable<any> {

    if (!this.settingsService.isMock()) {
      this.projectBaseURL = `${this.settingsService.pyWallServer}/projects`;
      console.log('this.projectBaseURL 2: ' + this.projectBaseURL);
      const targetURL = this.projectBaseURL + `/plannedtasks/${projectName}/${sprintId}`;
      console.log('targetURL: ' + targetURL);
      this.messageService.sendDebug(`PlannedTaskService get called on project ${projectName} and sprint ${sprintId}`);
      return this.http.get<Task[]>(targetURL).pipe(map(tasks => this.mapJsonToTask(tasks)));
    }

    return null;
  }

  create(data: Task) {
    if (!this.settingsService.isMock()) {
      const targetURL = this.projectBaseURL + `/plannedtasks`;
      this.messageService.sendDebug(`PlannedTaskService post called`);
      return this.http.post<any>(targetURL, Task);
    }

    return null;
  }

  delete(id: number) {
    if (!this.settingsService.isMock()) {
      const targetURL = this.projectBaseURL + `/plannedtasks/${id}`;
      this.messageService.sendDebug(`PlannedTaskService delete on task with ${id} called`);
      return this.http.delete<PlannedTask>(targetURL);
    }

    return null;
  }

  update(task: Task): Observable<any> {
    const data = {
      projectKey: this.settingsService.getProjectName(),
      sprintId: this.settingsService.getSprintId(),
      summary: task.summary,
      description: task.description
    };

    if (!this.settingsService.isMock()) {
      const targetURL = this.projectBaseURL + `/plannedtasks/${task.id}`;
      this.messageService.sendDebug(`PlannedTaskService PUT called`);
      return this.http.put<PlannedTask>(targetURL, data);
    }

    return null;
  }

  /**
   * this function is used to map json data to a task array
   * @param data
   * @returns {Userstory[]}
   */
  public mapJsonToTask(data: any): Task[] {
    const tasks = [];
    for (const val of data) {
      const task = new Task(val.id, val.summary, val.description, null, null, null, null, null, null, null, null, null);
      tasks.push(task);
    }
    return tasks;
  }

  getMockedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.mockedURL);
  }
}
