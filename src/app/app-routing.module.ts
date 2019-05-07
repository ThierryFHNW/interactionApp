import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'tasks', loadChildren: './tasks/tasks.module#TasksPageModule' },
  { path: 'tasks/:value', loadChildren: './task/task.module#TaskPageModule' },
  { path: 'scanner', loadChildren: './scanner/scanner.module#ScannerPageModule' },  { path: 'project', loadChildren: './project/project.module#ProjectPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
