import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {TasksService} from '../../services/tasks.service';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  scannedCode: string;
  scannedCodeArray: Array<string>;
  pyWallServerURL: string;
  pySyncServerURL: string;
  projectName: string;
  sprintId: string;
  searchQuery = '';
  tasksName = [];
  tasks = [];

  constructor(private storage: Storage, private tasksService: TasksService, private formBuilder: FormBuilder) {
    this.initializeTasks();
  }

  initializeTasks() {
      this.tasksService.getTasks()
          .subscribe( data => this.tasks = data);
      console.log(this.tasks);
      console.log(this.tasks.values());
  }

  ngOnInit() {
    this.mockStorageVariables();
    this.getStorageVariables();
    this.initializeTasks();
  }

  mockStorageVariables() {
      this.storage.set('pyWallServerURL', 'http://localhost:8000');
      this.storage.set('pySyncServerURL', 'http://localhost:9091');
      this.storage.set('projectName', 'AWDEMO');
      this.storage.set('sprintId', '213');
  }

  getStorageVariables() {
    this.storage.forEach( (storageValues ) => {
      console.log(storageValues);
    });
    this.storage.get('pyWallServerURL').then(value => {
      this.pyWallServerURL = value;
    });
    this.storage.get('pySyncServerURL').then(value => {
      this.pySyncServerURL = value;
    });
    this.storage.get('projectName').then(value => {
      this.projectName = value;
    });
    this.storage.get('sprintId').then(value => {
      this.sprintId = value;
    });
  }

    /*
    ** Searchbar Implementation
    */
    searchTasks(ev: any) {
        console.log('SEARCHTASK');
        // Reset tasks back to all of the tasks
        this.initializeTasks();
        // set val to the val of the searchbar
        const val = ev.target.value;
        console.log(val);

        // if the value is an empty string don't filter the tasks
        if (val && val.trim() !== '') {
            this.tasks = this.tasks.filter((name) => {
                return (name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }
}
