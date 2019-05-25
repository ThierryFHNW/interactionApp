import {Component, OnInit, ViewChild} from '@angular/core';
import { StorageService} from '../../services/storage.service';
import { Platform, ToastController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {Task} from '../../models/task';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})

export class EditTaskPage implements OnInit {
  public tasks: Task[] = [];
  editTask: Task = <Task> {};

  constructor(private activatedRoute: ActivatedRoute, private storageService: StorageService, private tasksService: TasksService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.getTaskByUrlParam();
    });
  }

  ngOnInit() {
    this.getTaskByUrlParam();
  }

  // USES URL ID TO GET SERVER DATA
  getTaskByUrlParam() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.tasksService.getTaskById(id).then(task => {
      console.log(task);
      this.editTask = task;
      console.log('editTaskID: ' + this.editTask.id);
      console.log('editTaskSummary: ' + this.editTask.summary);
      console.log('editTaskDescription: ' + this.editTask.description);
      console.log('editTaskEstimate: ' + this.editTask.estimate);
      // this.storageService.updateServer(task).then(task )
    });
  }

  // UPDATE
  updateTask() {
    // this.editTask.modified = Date.now();

    this.tasksService.update(this.editTask).subscribe( task => {
      this.showToast('Server updated!');
      this.loadTasks(); // Or update it inside the array directly
    });
  }

  // READ
  loadTasks() {
/*    this.tasksService.fetchTasks().then(servers => {
      this.servers = servers;
    });*/
  }

  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
