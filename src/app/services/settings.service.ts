import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: any;
  constructor() { }

  saveSettings = () => {
    window.localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings = () => {
    this.settings = JSON.parse(window.localStorage.getItem('settings'));
    if (this.settings === null) {
      this.settings = {
        configurations: {},
        default: 0
      };
    }
  }

  getSettings = () => {
    this.loadSettings();
    return this.settings;
  }

  getDefaultConfiguration = () => {
    if (this.settings) {
      return this.settings.default;
    }
  }

  setDefaultConfiguration = (id) => {
    this.settings.default = id;
    this.saveSettings();
  }

  add = (configuration) => {
    console.log(this.settings);
    console.log(this.settings.configurations);
    configuration.id = new Date().getTime();
    configuration.url = configuration.server + '/projects/' + configuration.project + '/widgets/gallery/images/';
    this.settings.configurations[configuration.id] = configuration;
    this.saveSettings();
  }

  edit = (configuration) => {
    const conf = this.settings.configurations[configuration.id];
    conf.server = configuration.server;
    conf.project = configuration.project;
    conf.url = conf.server + '/projects/' + conf.project + '/widgets/gallery/images/';
    conf.syncServer = configuration.syncServer;
    conf.user = configuration.user;
    this.saveSettings();
  }

  remove = (configuration) => {
    delete this.settings.configurations[configuration.id];
    this.saveSettings();
  }

  // loadSettings();
}
