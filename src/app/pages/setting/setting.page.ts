import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';

export interface Setting {
  projectName: string;
  pyWallServer: string;
  syncServer: string;
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})


export class SettingPage implements OnInit {
  setting: Setting;
  projectName: string;
  pyWallServer: string;
  syncServer: string;


  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
  }

  createSetting() {
    console.log(this.projectName);
    this.setting.projectName = this.projectName;
    this.setting.pyWallServer = this.pyWallServer;
    this.setting.syncServer = this.syncServer;
    this.setting = new Setting();
    console.log(this.setting.projectName);
    console.log(this.setting[0]);
    // this.settingsService.setStorageVariablesParameters(this.projectName, this.pyWallServer, this.syncServer, '');
  }
}

