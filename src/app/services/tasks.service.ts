import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { ConfigLoaderService } from '../config/configloader.service';
import {Observable} from 'rxjs';
import {MessageService} from './message.service';
import {Task} from '../models/task';
import {map} from 'rxjs/operators';
import {Server, StorageService} from './storage.service';
import {HTTP} from '@ionic-native/http/ngx';
import { Sprint } from '../models/sprint';

export interface PlannedTask {
  id: number;
  projectId: string;
  sprintId: string;
  summary: string;
  description: string;
}

const EDIT_TASK = 'editTask';

@Injectable({
  providedIn: 'root'
})

// BACKEND LOOKS LIKE THIS
// @app.route('/projects/plannedtasks/<project_key>/<sprint_id>', methods=['GET'])
// def get_plannedTasks(project_key, sprint_id):

export class TasksService {
  private mockedURL = '/assets/data/tasks.json';
  private selectedServer: Server = <Server> {};
  private projectBaseURL: string;
  public tasks: Task[] = [];
  public tasksNewestFirst: Task[] = [];
  private sprints: Sprint[] = [];

  constructor(private httpNative: HTTP, private http: HttpClient,
              private storageService: StorageService,
              private messageService: MessageService) {
    this.getSelectedServer();
  }

  /**
   * returns an Array of all sprints from a specific project
   * @param {string} projectName
   * @returns {Observable<Sprint[]>}
   */
  getSprints(projectName: string): Observable<Sprint[]> {
    console.log('GET SPRINTS: this.projectBaseURL: ' + this.projectBaseURL);
    const targetURL = this.projectBaseURL + `/${projectName}/sprints`;
    console.log('targetURL: ' + targetURL);
    return this.http.get<Sprint[]>(targetURL).pipe(map(res => {
        return res;
      }));
  }

  // Maybe outsource Method and variables to StorageService
  getSelectedServer() {
    this.storageService.getSelectedServer().then(server => {
      this.selectedServer = server;
      this.projectBaseURL = `${this.selectedServer.pyWallServer}/projects`;
      console.log('Selected Server: ' + this.selectedServer.projectName);
      /*if (!this.selectedServer.sprintId) {
        this.getSprints(this.selectedServer.projectName);
      }*/
    });
  }

  fetchTasks() {
    const obj = this;
    console.log(this.selectedServer.projectName + ' ' + this.selectedServer.sprintId)
    if (this.selectedServer.projectName && this.selectedServer.sprintId) {
      this.tasks = [];
      this.list(this.selectedServer.projectName, this.selectedServer.sprintId)
          .subscribe(plannedTasks => {
            this.tasks = plannedTasks;
            this.tasksNewestFirst = this.tasks.reverse();
            console.log("THIS.PLANNEDTASK: " + JSON.stringify(this.tasks));
            console.log("THIS.SELECTEDSERVER: " + JSON.stringify(this.selectedServer));
          });
    }
  }

  // GET TASK BY ID -- Maybe return a Promise
  getTaskById(id: number): Promise<Task> {
    return new Promise<Task>((resolve, reject) => {
      resolve( this.tasks.find(task => task.id === id) );
    });
  }

  list(projectName: string, sprintId: string): Observable<any> {
    this.projectBaseURL = `${this.selectedServer.pyWallServer}/projects`;
    console.log('this.projectBaseURL 2: ' + this.projectBaseURL);
    const targetURL = this.projectBaseURL + `/plannedtasks/${projectName}/${sprintId}`;
    console.log('targetURL: ' + targetURL);
    this.messageService.sendDebug(`PlannedTaskService get called on project ${projectName} and sprint ${sprintId}`);
    return this.http.get<Task[]>(targetURL).pipe(map(tasks => this.mapJsonToTask(tasks)));
  }

  create(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const targetURL = this.projectBaseURL + `/plannedtasks`;
    this.messageService.sendDebug(`PlannedTaskService post called`);
    return this.http.post<any>(targetURL, data, httpOptions);
  }

  delete(id: number) {
    const targetURL = this.projectBaseURL + `/plannedtasks/${id}`;
    this.messageService.sendDebug(`PlannedTaskService delete on task with ${id} called`);
    return this.http.delete<PlannedTask>(targetURL);
  }

  update(task: Task): Observable<any> {
    const data = {
      projectKey: this.selectedServer.projectName,
      sprintId: this.selectedServer.sprintId,
      summary: task.summary,
      description: task.description
    };
    const targetURL = this.projectBaseURL + `/plannedtasks/${task.id}`;
    this.messageService.sendDebug(`PlannedTaskService PUT called`);
    return this.http.put<PlannedTask>(targetURL, data);
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

  createNative(data: Task): Observable<any> {
        const targetURL = this.projectBaseURL + `/plannedtasks`;
    this.messageService.sendDebug(`PlannedTaskService post called`);
    return this.http.post<any>(targetURL, Task);
  }

  getMockedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.mockedURL);
  }
}
