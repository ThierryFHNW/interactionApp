import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private socket: Socket) { }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  /*getMessage() {
    return this.socket
        .fromEvent('message')
        .map( data => data.msg );
  }*/

    /*this.connect = function(url, projectId) {
      var path = "";
      if(url.match(/\//g || []).length > 3) {
        var pathParts = url.split('/').slice(3);
        path = "/" + pathParts.join('/');
        url = url.replace(path, '');
      }
      console.log(path);
      console.log(url);
      var options = {path: path, transports: ["websocket"], reconnectionAttempts: 5, secure: true, rejectUnauthorized: false};
      socket = io(url, options);
      socket.connect();

      var roomInfo = JSON.stringify({projectId: projectId});
      socket.emit("persistenceRoom", roomInfo);
    };

    this.disconnect = function () {
      if (socket.connected) {
        socket.close();
      }
    };

    this.send = function(event, args) {
      if (socket.connected) {
        socket.emit(event, args);
      }
    };
  }*/
}
