import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    console.log("Engine Start " + this.settingsService.projectName);
    console.log("Engine Start " + this.settingsService.pyWallServer);
    console.log("Engine Start " + this.settingsService.syncServer);
    console.log("Engine Start " + this.settingsService.sprintId);
  }



}
