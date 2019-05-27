import {Component, OnInit, ViewChild} from '@angular/core';
import { StorageService} from '../../services/storage.service';
import { Platform} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {Task} from '../../models/task';
import {TasksService} from '../../services/tasks.service';
import {ToastService} from "../../services/toast.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})

export class EditTaskPage {
  tasks: Task[] = [];
  editTask: Task = <Task> {};

  constructor(private alertService: AlertService, private activatedRoute: ActivatedRoute, private toastService: ToastService, private storageService: StorageService, private tasksService: TasksService, private plt: Platform) {
  }

  ionViewWillEnter() {
    this.getTaskByUrlParam();
  }

  // USES URL ID TO GET SERVER DATA
  getTaskByUrlParam() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.storageService.getTaskById(id).then(task => this.editTask = task);

  }

  // DELETE
  deleteTask(id: number) {
    this.alertService.alertDeleteTask(id);
  }

  // UPDATE
  updateTask() {
    this.tasksService.update(this.editTask).subscribe( task => {
      this.toastService.showToast('Task updated!');
    });
  }
}
