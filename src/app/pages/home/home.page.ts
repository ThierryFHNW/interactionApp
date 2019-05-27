import { Component, OnInit } from '@angular/core';
import {Server, StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  selectedServer: Server = <Server> {};

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getSelectedServer().then(server => {
        this.selectedServer = server;
        console.log('Engine Start ' + this.selectedServer.projectName);
        console.log('Engine Start ' + this.selectedServer.pyWallServer);
        console.log('Engine Start ' + this.selectedServer.syncServer);
        console.log('Engine Start ' + this.selectedServer.sprintId);
    });
  }
}
