import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Task} from '../models/task';

export interface Server {
    id: number;
    projectName: string;
    pyWallServer: string;
    syncServer: string;
    sprintId: string;
    modified: number;
}

export interface PlannedTask {
    id: number;
    projectKey: string;
    sprintId: string;
    summary: string;
    description: string;
}

const SERVERS = 'servers';
const SELECTED_SERVER = 'selectedServer';
const TASKS = 'tasks';
const SELECTED_TASK = 'selectedTask';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: Storage) {
    }

    // GET ALL TASKS
    getTasks(): Promise<Task[]> {
        return this.storage.get(TASKS);
    }

    // CREATE TASKS
    setTasks(tasks: Task[]): Promise<any> {
        return this.storage.set(TASKS, tasks);
    }

    // SET SELECTED TASK
    setSelectedTask(task: Task) {
        this.storage.set(SELECTED_TASK, task);
    }

    // LOAD SELECTED TASK
    getSelectedTask(): Promise<Task> {
        return this.storage.get(SELECTED_TASK);
    }

    // GET TASK BY ID
    getTaskById(id: number): Promise<Task> {
        return this.storage.get(TASKS).then((tasks: Task[]) => {
            if (!tasks || tasks.length === 0) {
                return null;
            }
            for (const task of tasks) {
                if (task.id === id) {
                    console.log(task);
                    return task;
                }
            }
            return null;
        });
    }


    // SET SELECTED SERVER
    setSelectedServer(server: Server): Promise<Server> {
        return this.storage.set(SELECTED_SERVER, server);
    }

    // LOAD SELECTED SERVER
    getSelectedServer(): Promise<Server> {
        return this.storage.get(SELECTED_SERVER);
    }

    // SET SELECTED SERVER SPRINT ID
    setSelectedServerById(server: Server, sprintId: number): Promise<Server> {
        server.id = sprintId;
        return this.storage.set(SELECTED_SERVER, server);
    }

    setSelectedServerSprintId(sprintId: string): Promise<Server> {
        this.getSelectedServer().then(server => {
            if (server) {
                console.log("success");
                server.sprintId = sprintId;
                console.log(server.sprintId);
                return this.setSelectedServer(server);
            } else {
                return null;
            }
        });
        return this.getSelectedServer();
    }

    // CREATE SERVER
    addServer(server: Server): Promise<any> {
        return this.storage.get(SERVERS).then((servers: Server[]) => {
            if (servers) {
                servers.push(server);
                return this.storage.set(SERVERS, servers);
            } else {
                return this.storage.set(SERVERS, [server]);
            }
        });
    }

    // GET SERVERS
    getServers(): Promise<Server[]> {
        return this.storage.get(SERVERS);
    }

    // GET SERVER BY ID
    getServerById(id: number): Promise<Server> {
        return this.storage.get(SERVERS).then((servers: Server[]) => {
            if (!servers || servers.length === 0) {
                return null;
            }
            for (const server of servers) {
                if (server.id === id) {
                    console.log(server);
                    return server;
                }
            }
            return null;
        });
    }

    // UPDATE SERVER
    updateServer(server: Server): Promise<any> {
        console.log("storage: " + JSON.stringify(server));
        return this.storage.get(SERVERS).then((servers: Server[]) => {
            if (!servers || servers.length === 0) {
                return null;
            }

            const newServers: Server[] = [];

            for (const i of servers) {
                if (i.id === server.id) {
                    console.log(i.id + " " + server.id);
                }
                if (+i.id === server.id) {
                    console.log(+i.id)
                    newServers.push(server);
                    console.log("it is: " + server);
                    console.log("i.id: " + i.id);
                    console.log("server.id: " + server.id);
                    console.log(JSON.stringify(i));
                    console.log(JSON.stringify(server));
                } else {
                    newServers.push(i);
                }
                console.log(newServers);
            }

            return this.storage.set(SERVERS, newServers);
        });
    }

    // DELETE SERVER
    deleteServer(id: number): Promise<Server> {
        return this.storage.get(SERVERS).then((servers: Server[]) => {
            if (!servers || servers.length === 0) {
                return null;
            }

            const serversToKeep: Server[] = [];

            for (const i of servers) {
                if (i.id !== id) {
                    serversToKeep.push(i);
                }
            }
            return this.storage.set(SERVERS, serversToKeep);
        });
    }

    public mapJsonToTask(data: any): Task[] {
        const tasks = [];
        for (const val of data) {
            const task = new Task(val.id, val.summary, val.description, null, null, null, null, null, null, null, null, null);
            tasks.push(task);
        }
        return tasks;
    }
}
