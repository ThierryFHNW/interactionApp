import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'scanner', loadChildren: './pages/scanner/scanner.module#ScannerPageModule' },
  { path: 'tasks', loadChildren: './pages/tasks/tasks.module#TasksPageModule' },
  { path: 'task/:id', loadChildren: './pages/task/task.module#TaskPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'setting/:id', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'create-setting', loadChildren: './pages/create-setting/create-setting.module#CreateSettingPageModule' },
  { path: 'edit-setting/:id', loadChildren: './pages/edit-setting/edit-setting.module#EditSettingPageModule' },
  { path: 'edit-task/:id', loadChildren: './pages/edit-task/edit-task.module#EditTaskPageModule' },
  { path: 'create-task', loadChildren: './pages/create-task/create-task.module#CreateTaskPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
