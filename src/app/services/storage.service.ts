import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {forEach} from '@angular-devkit/schematics';

export interface Server {
  id: number;
  projectName: string;
  pyWallServer: string;
  syncServer: string;
  sprintId: string;
  modified: number;
}

const SERVERS_KEY = 'my_servers';
const SELECTED_KEY = 'selectedServer';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
  }

  // SET SELECTED SERVER
  setSelectedServer(server: Server) {
      this.storage.set(SELECTED_KEY, server);
  }

  // LOAD SELECTED SERVER
  loadSelectedServer(): Promise<Server> {
    return this.storage.get(SELECTED_KEY);
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
