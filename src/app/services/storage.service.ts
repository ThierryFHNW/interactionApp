import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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

const SERVERS_KEY = 'my_servers';
const SELECTED_KEY = 'selectedServer';
const SELECTED_TASK = 'selectedTask';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
  }

  // SET SELECTED TASK
  setSelectedTask(task: PlannedTask) {
    this.storage.set(SELECTED_TASK, task);
  }

  // LOAD SELECTED TASK
  getSelectedTask(): Promise<PlannedTask> {
    return this.storage.get(SELECTED_TASK);
  }

  // SET SELECTED SERVER
  setSelectedServer(server: Server) {
      this.storage.set(SELECTED_KEY, server);
  }

  // LOAD SELECTED SERVER
  getSelectedServer(): Promise<Server> {
    return this.storage.get(SELECTED_KEY);
  }

  // SET SELECTED SERVER SPRINT ID
  setSelectedServerSprintId(sprintId: string) {
    this.getSelectedServer().then(server => {
      server.sprintId = sprintId;
      console.log("SERVER IS: " + server);
      this.storage.set(SELECTED_KEY, server).then(
          this.getSelectedServer
      );
    });
  }


  // CREATE
  addServer(server: Server): Promise<any> {
    return this.storage.get(SERVERS_KEY).then((servers: Server[]) => {
      if (servers) {
        servers.push(server);
        return this.storage.set(SERVERS_KEY, servers);
      } else {
        return this.storage.set(SERVERS_KEY, [server]);
      }
    });
  }

  // READ
  getServers(): Promise<Server[]> {
    return this.storage.get(SERVERS_KEY);
  }

  // UPDATE
  updateServer(server: Server): Promise<any> {
    return this.storage.get(SERVERS_KEY).then((servers: Server[]) => {
      if (!servers || servers.length === 0) {
        return null;
      }

      const newServers: Server[] = [];

      for (const i of servers) {
        if (i.id === server.id) {
          newServers.push(server);
        } else {
          newServers.push(i);
        }
      }

      return this.storage.set(SERVERS_KEY, newServers);
    });
  }

  // DELETE
  deleteServer(id: number): Promise<Server> {
    return this.storage.get(SERVERS_KEY).then((servers: Server[]) => {
      if (!servers || servers.length === 0) {
        return null;
      }

      const serversToKeep: Server[] = [];

      for (const i of servers) {
        if (i.id !== id) {
          serversToKeep.push(i);
        }
      }
      return this.storage.set(SERVERS_KEY, serversToKeep);
    });
  }

    // GET SERVER BY ID
    getServerById(id: number): Promise<Server> {
        return this.storage.get(SERVERS_KEY).then((servers: Server[]) => {
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
}
