import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'scanner', loadChildren: './pages/scanner/scanner.module#ScannerPageModule' },
  { path: 'tasks', loadChildren: './pages/tasks/tasks.module#TasksPageModule' },
  { path: 'task', loadChildren: './pages/task/task.module#TaskPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'playground', loadChildren: './pages/playground/playground.module#PlaygroundPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
